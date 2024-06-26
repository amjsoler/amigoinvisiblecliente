<template>
  <view-container>
    <div class="flex flex-row items-center">
      <h3 class="text-2xl font-bold flex-grow">{{viewingGroup.nombre}}</h3>
      <group-settings v-if="checkIfUserIsAdminOfGroup(viewingGroup.id)" />
    </div>

    <block-section class="flex flex-col space-y-4">
      <div class="flex flex-row justify-around">
        <div class="flex flex-row items-center space-x-2 text-sm">
          <pig-money class="text-gray-300 size-8"/>
          <p v-if="viewingGroup.precio_minimo">{{viewingGroup.precio_minimo}}€</p>
          <p v-else>{{ $t("showGroup.noPrecioMinimo")}}€</p>
          <p>-</p>
          <p v-if="viewingGroup.precio_maximo">{{viewingGroup.precio_maximo}}€</p>
          <p v-else>{{ $t("showGroup.noPrecioMaximo")}}</p>
        </div>
        <div>
          <p class="flex flex-row items-center space-x-2 text-sm">
            <gift-icon class="text-gray-300 size-8" />
            <span v-if="viewingGroup.tematica_regalos">{{viewingGroup.tematica_regalos}}</span>
            <span v-else>{{$t("showGroup.noTematicaRegalos")}}</span>
          </p>
        </div>
      </div>

      <div v-if="viewingGroup && viewingGroup.descripcion" class="space-y-4">
        <a class="flex flex-row items-center justify-center text-sm" href="#" @click.prevent="descVisible = !descVisible">
          <span>{{ $t("showGroup.showDesc") }}</span><span><caret-down-filled class="size-3" /></span>
        </a>
        <p class="" v-show="descVisible">
          {{ viewingGroup.descripcion }}
        </p>
      </div>
    </block-section>

    <!--Block to show the assigned participant when the admin lauches the assignments-->
    <block-section v-if="viewingGroup.integrantes_asignados" class="space-y-4">
      <div class="flex flex-col items-center justify-center">
        <p class="text-lg text-gray-300">Tu amigo invisible es</p>
        <p class="text-3xl font-bold ">Jorge</p>
      </div>
      <p class="text-red-300 text-center text-xs">(Ten en cuenta que puedes reutilizar el grupo para el proximo evento. Simplemente reinicialo desde los ajustes. Los integrantes se conservarán)</p>
    </block-section>

    <!-- Block to show the buttons to add participants, invite by email, copy the group link and celebrate the assignments -->
    <div v-if="checkIfUserIsAdminOfGroup(viewingGroup.id) && !viewingGroup.integrantes_asignados" class="flex flex-row space-x-4">
      <add-participant />
      <massive-invite />
      <link-icon @click="copyGroupLink" class="size-10"/>
      <span class="flex-grow"></span>
      <CelebrateAssignments />
    </div>

    <!-- Block to show the excepcions -->
    <div class="flex flex-row justify-center">
      <manage-exceptions />
    </div>

    <!-- Block to show the list of participants -->
    <block-section v-if="checkIfUserIsAdminOfGroup(viewingGroup.id) || !viewingGroup.integrantes_asignados">
      <participant-list-simplified />
    </block-section>
  </view-container>
</template>

<script>
import router from '@/router/index.js'
import { useGroupsStore } from '@/stores/groups.js'
import BlockSection from '@/components/containers/BlockSection.vue'
import PigMoney from '@/components/icons/PigMoney.vue'
import GiftIcon from '@/components/icons/GiftIcon.vue'
import ParticipantListSimplified from '@/components/groups/ParticipantListSimplified.vue'
import GroupSettings from '@/components/groups/GroupSettings.vue'
import ViewContainer from '@/components/containers/ViewContainer.vue'
import { useUserStore } from '@/stores/user.js'
import { checkIfUserIsAdminOfGroup } from '@/helpers/Helpers.js'
import { useGeneralStore } from '@/stores/general.js'
import CaretDownFilled from '@/components/icons/CaretDownFilled.vue'
import LinkIcon from '@/components/icons/LinkIcon.vue'
import AddParticipant from '@/components/groups/AddParticipant.vue'
import MassiveInvite from '@/components/groups/MassiveInvite.vue'
import CelebrateAssignments from '@/components/groups/CelebrateAssignments.vue'
import ManageExceptions from '@/components/groups/ManageExceptions.vue'
import { API } from '@/services/index.js'

export default {
  name: "ShowGroup",
  components: { ManageExceptions, CelebrateAssignments, MassiveInvite, AddParticipant, LinkIcon, CaretDownFilled, ViewContainer, GroupSettings, ParticipantListSimplified, GiftIcon, PigMoney, BlockSection },

  data() {
    return {
      viewingGroup: "",
      descVisible: false
    }
  },

  beforeMount() {
    const response = useGroupsStore().actionGetGroup(router.currentRoute.value.params.id)

    if(response === null){
      useGeneralStore().actionShowAlert(this.$t("showGroup.errorReadingGroup"), "danger")

      router.push({name: "MyGroups"})
    }
    else{
      this.viewingGroup = response
    }
  },

  async mounted() {
      const updatedGroup = await API.groups.getGroup(router.currentRoute.value.params.id)

    const groupIdAux = router.currentRoute.value.params.id
    const index = useGroupsStore().groups.findIndex((element) => element.id === groupIdAux)
    useGroupsStore().$patch((state) => {
      //recorro las propiedades del objeto que tengo en la respuesta
      Object.keys(updatedGroup.data).forEach((key) => {
        //modifico la propiedad del grupo que se encuentra en el index de más arriba
        state.groups.at(index)[key] = updatedGroup.data[key]
      })
    })
  },

  provide() {
    return {
      groupId: router.currentRoute.value.params.id
    }
  },

  methods: {
    checkIfUserIsAdminOfGroup,
    useUserStore,
    router() {
      return router
    }, useGroupsStore,

    closeMassiveInviteModal() {
      document.querySelector("#massive-invite-participants-close-button").click()
    },

    async copyGroupLink() {
      if(window.isSecureContext){
        const url = import.meta.env.VITE_BASE_BACK_URL + "grupos/"+this.viewingGroup.id+"/apuntarse/" + this.viewingGroup.hash
        try {
          await navigator.clipboard.writeText(url);
          useGeneralStore().actionShowAlert(this.$t("showGroup.groupLinkCopied"), "success")
        } catch (error) {
          console.error(error.message);
        }
      }else {
        console.log("No es seguro utilizar el portapapeles")
      }
    }
  },

}
</script>