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

    <div class="flex flex-row space-x-4">
      <user-plus id="invite-participant-button"
                 data-modal-target="invite-participant-modal"
                 data-modal-toggle="invite-participant-modal"
                 v-if="checkIfUserIsAdminOfGroup(viewingGroup.id)"
                 class="size-10" />

      <teleport to="body">
        <div id="invite-participant-modal" tabindex="-1" aria-hidden="true"
             class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center
           items-center w-full md:inset-0 h-dvh  bg-opacity-5 bg-input-background max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ $t("showGroup.inviteParticipantModalTitle")}}
                </h3>
                <button id="invite-participant-close-button" type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200
              hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center
              dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="invite-participant-modal">
                  <close-icon />
                </button>
              </div>
              <!-- Modal body -->
              <div class="p-4 md:p-5">
                <invite-participant @participant-invited="closeInviteParticipantModal" :group-id="viewingGroup.id" />
              </div>
            </div>
          </div>
        </div>
      </teleport>

      <users-plus id="massive-invite-participants-button"
                  data-modal-target="massive-invite-participants-modal"
                  data-modal-toggle="massive-invite-participants-modal"
                  v-if="checkIfUserIsAdminOfGroup(viewingGroup.id)"
                  class="size-10" />

      <teleport to="body">
        <div id="massive-invite-participants-modal" tabindex="-1" aria-hidden="true"
             class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center
           items-center w-full md:inset-0 h-dvh  bg-opacity-5 bg-input-background max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ $t("showGroup.inviteMassiveParticipantsModalTitle")}}
                </h3>
                <button id="massive-invite-participants-close-button" type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200
              hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center
              dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="massive-invite-participants-modal">
                  <close-icon />
                </button>
              </div>
              <!-- Modal body -->
              <div class="p-4 md:p-5">
                <massive-invitation @massive-invitation-done="closeMassiveInviteModal"  :group-id="viewingGroup.id"/>
              </div>
            </div>
          </div>
        </div>
      </teleport>

      <link-icon @click="copyGroupLink" class="size-10"/>
    </div>
    <block-section>
      <participant-list-simplified :participants-list="viewingGroup.integrantes_del_grupo" />
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
import UserPlus from '@/components/icons/UserPlus.vue'
import InviteParticipant from '@/components/participants/InviteParticipant.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import UsersPlus from '@/components/icons/UsersPlus.vue'
import MassiveInvitation from '@/components/participants/MassiveInvitation.vue'
import LinkIcon from '@/components/icons/LinkIcon.vue'

export default {
  name: "ShowGroup",
  components: { LinkIcon, MassiveInvitation, UsersPlus, CloseIcon, InviteParticipant, UserPlus, CaretDownFilled, ViewContainer, GroupSettings, ParticipantListSimplified, GiftIcon, PigMoney, BlockSection },

  data() {
    return {
      viewingGroup: "",
      descVisible: false
    }
  },

  mounted() {
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
      groupId: this.viewingGroup.id
    }
  },

  methods: {
    checkIfUserIsAdminOfGroup,
    useUserStore,
    router() {
      return router
    }, useGroupsStore,
    closeInviteParticipantModal(){
      //Esto de abajo no se puede hacer programaticamente ya que flowbite tiene un bug y deja el modal-backdrop sin ocultar
      document.querySelector("#invite-participant-close-button").click()
    },

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