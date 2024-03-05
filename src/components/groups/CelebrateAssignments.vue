<template>
  <a href="#" class="flex flex-row items-center justify-center"
     data-modal-toggle="celebrate-assignments-modal"
     data-modal-target="celebrate-assignments-modal"
  >
    <users-group class="size-10 border-2 rounded-lg bg-" />
  </a>

  <full-screen-modal modal-id="celebrate-assignments-modal" :modal-title="$t('celebrateAssignments.modalTitle')"
                    :btn-yes="$t('celebrateAssignments.modalYes')"
                    :btn-no="$t('celebrateAssignments.modalNo')"
                     @btn-yes-clicked="celebrateAssignments"
  >
    <div class="space-y-4">
      <p>{{ $t('celebrateAssignments.modalBody1') }}</p>
      <p>{{ $t('celebrateAssignments.modalBody2') }}</p>
      <p>{{ $t('celebrateAssignments.modalBody3') }}</p>
    </div>
  </full-screen-modal>
</template>

<script>
  import UsersGroup from '@/components/icons/UsersGroup.vue'
  import FullScreenModal from '@/components/containers/FullScreenModal.vue'
  import { useGroupsStore } from '@/stores/groups.js'
  import { closeEveryModal } from '@/helpers/Helpers.js'
  import { useGeneralStore } from '@/stores/general.js'

  export default {
    name: "CelebrateAssignments",
    components: {  FullScreenModal, UsersGroup },

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