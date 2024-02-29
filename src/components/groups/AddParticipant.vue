<template>
  <user-plus id="invite-participant-button"
             data-modal-target="invite-participant-modal"
             data-modal-toggle="invite-participant-modal"
             class="size-10" />
  <full-screen-modal modal-id="invite-participant-modal"
                     :modalTitle="$t('showGroup.inviteParticipantModalTitle')"
  >
    <div class="p-4 md:p-5">
      <invite-participant @participant-invited="participantInvitedCallback" />
    </div>
  </full-screen-modal>
</template>
<script>
import UserPlus from '@/components/icons/UserPlus.vue'
import InviteParticipant from '@/components/participants/InviteParticipant.vue'
import FullScreenModal from '@/components/containers/FullScreenModal.vue'
import { closeModalGivenId } from '@/helpers/Helpers.js'
import { useGeneralStore } from '@/stores/general.js'

export default {
  name: "AddParticipant",
  components: { FullScreenModal, InviteParticipant, UserPlus },
  methods: { closeModalGivenId,
    participantInvitedCallback() {
      useGeneralStore().actionShowAlert(this.$t('showGroup.participantInvited'), "success")
      this.closeModalGivenId('invite-participant-modal')
    }
  },
}

</script>