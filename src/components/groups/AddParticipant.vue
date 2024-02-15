<template>
  <user-plus id="invite-participant-button"
             data-modal-target="invite-participant-modal"
             data-modal-toggle="invite-participant-modal"
             v-if="checkIfUserIsAdminOfGroup(viewingGroupId)"
             class="size-10" />
  <full-screen-modal modal-id="invite-participant-modal"
                     :modalTitle="$t('showGroup.inviteParticipantModalTitle')"
  >
    <div class="p-4 md:p-5">
      <invite-participant :group-id="viewingGroupId" />
    </div>
  </full-screen-modal>
</template>
<script>
import UserPlus from '@/components/icons/UserPlus.vue'
import { checkIfUserIsAdminOfGroup } from '@/helpers/Helpers.js'
import InviteParticipant from '@/components/participants/InviteParticipant.vue'
import FullScreenModal from '@/components/containers/FullScreenModal.vue'

export default {
  name: "AddParticipant",
  methods: { checkIfUserIsAdminOfGroup },
  components: { FullScreenModal, InviteParticipant, UserPlus },

  props: {
    viewingGroupId: {
      required: true
    },
  },
}
</script>