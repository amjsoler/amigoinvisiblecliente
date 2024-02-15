<template>
  <users-plus id="massive-invite-participants-button"
              data-modal-target="massive-invite-participants-modal"
              data-modal-toggle="massive-invite-participants-modal"
              v-if="checkIfUserIsAdminOfGroup(viewingGroupId)"
              class="size-10" />

  <full-screen-modal modal-id="massive-invite-participants-modal" :modal-title="$t('showGroup.inviteMassiveParticipantsModalTitle')">
    <div class="p-4 md:p-5">
      <massive-invitation :group-id="viewingGroupId"/>
    </div>
  </full-screen-modal>
</template>
<script>
import MassiveInvitation from '@/components/participants/MassiveInvitation.vue'
import FullScreenModal from '@/components/containers/FullScreenModal.vue'
import UsersPlus from '@/components/icons/UsersPlus.vue'
import { checkIfUserIsAdminOfGroup } from '@/helpers/Helpers.js'

export default {
  name: "MassiveInvite",
  methods: { checkIfUserIsAdminOfGroup },
  components: { UsersPlus, FullScreenModal, MassiveInvitation },

  props: {
    viewingGroupId: {
      required: true,
    }
  }
}
</script>