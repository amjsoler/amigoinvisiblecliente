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

      <div v-if="viewingGroup && viewingGroup.descripcion">
        <a class="flex flex-row items-center justify-center" href="#" @click.prevent="descVisible = !descVisible">
          <span>{{ $t("showGroup.showDesc") }}</span><span><caret-down-filled /></span>
        </a>
        <p class="bg-input-background" v-show="descVisible">
          {{ viewingGroup.descripcion }}
        </p>
      </div>
    </block-section>

    <div v-if="isAdmin" class="flex flex-row space-x-4">
      <add-participant />
      <massive-invite :viewing-group-id="viewingGroup.id" />
      <link-icon @click="copyGroupLink" class="size-10"/>
    </div>
    <block-section>
      <participant-list-simplified :group-admin="viewingGroup.administrador" :participants-list="viewingGroup.integrantes_del_grupo" />
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

export default {
  name: "ShowGroup",
  components: { MassiveInvite, AddParticipant, LinkIcon, CaretDownFilled, ViewContainer, GroupSettings, ParticipantListSimplified, GiftIcon, PigMoney, BlockSection },

  data() {
    return {
      viewingGroup: "",
      descVisible: false
    }
  },

  computed: {
    isAdmin() {
      return this.viewingGroup.administrador === useUserStore().user.id
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