<template>
  <users-plus id="massive-invite-participants-button"
              data-modal-target="massive-invite-participants-modal"
              data-modal-toggle="massive-invite-participants-modal"
              class="size-10" />

  <full-screen-modal modal-id="massive-invite-participants-modal"
                     :modal-title="$t('showGroup.inviteMassiveParticipantsModalTitle')">
    <div class="p-4 md:p-5">
      <massive-invitation :group-id="groupId"
                          @massive-invitation-done="massiveInvitationDoneCallback"/>
    </div>
  </full-screen-modal>
</template>
<script>
import MassiveInvitation from '@/components/participants/MassiveInvitation.vue'
import FullScreenModal from '@/components/containers/FullScreenModal.vue'
import UsersPlus from '@/components/icons/UsersPlus.vue'
import { useGeneralStore } from '@/stores/general.js'
import { closeModalGivenId } from '@/helpers/Helpers.js'

export default {
  name: "MassiveInvite",
  components: { UsersPlus, FullScreenModal, MassiveInvitation },

  inject: ['groupId'],

  methods: {
    massiveInvitationDoneCallback() {
      //Muestro un alert informando que se enviaron las invitaciones
      useGeneralStore().actionShowAlert(this.$t('showGroup.massiveInvitationDone'), "success")

      //Cierro el modal
      closeModalGivenId("massive-invite-participants-modal")
    }
  }
}
</script>