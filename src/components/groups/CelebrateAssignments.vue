<template>
  <a href="#" class="flex flex-row items-center justify-center"
     data-modal-toggle="celebrate-assignments-modal"
     data-modal-target="celebrate-assignments-modal"
  >
    <users-group class="size-10" />
  </a>

  <full-screen-modal modal-id="celebrate-assignments-modal" :modal-title="$t('celebrateAssignments.modalTitle')"
                    :btn-yes="$t('celebrateAssignments.modalYes')"
                    :btn-no="$t('celebrateAssignments.modalNo')"
                     @btn-yes-clicked="celebrateAssignments"
  >
    <block-section class="my-4 space-y-4">
      <p>{{ $t('celebrateAssignments.modalBody1') }}</p>
      <p>{{ $t('celebrateAssignments.modalBody2') }}</p>
      <p>{{ $t('celebrateAssignments.modalBody3') }}</p>
    </block-section>
  </full-screen-modal>
</template>

<script>
  import UsersGroup from '@/components/icons/UsersGroup.vue'
  import FullScreenModal from '@/components/containers/FullScreenModal.vue'
  import BlockSection from '@/components/containers/BlockSection.vue'
  import { useGroupsStore } from '@/stores/groups.js'
  import { closeEveryModal } from '@/helpers/Helpers.js'
  import { useGeneralStore } from '@/stores/general.js'

  export default {
    name: "CelebrateAssignments",
    components: { BlockSection, FullScreenModal, UsersGroup },

    inject: ["groupId"],

    methods: {
      celebrateAssignments() {
        const response = useGroupsStore().actionCelebrateAssignments(this.groupId)

        if(response){
          closeEveryModal()

          useGeneralStore().actionShowAlert(this.$t('celebrateAssignments.alertSuccess'), "success")
        }
      }
    }
  }
</script>