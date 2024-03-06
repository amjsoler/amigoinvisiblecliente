<template>
    <section v-if="!group.fecha_autoasignacion">
      <users-group  class="size-10 border-2 rounded-lg"
                   data-modal-toggle="celebrate-assignments-modal"
                   data-modal-target="celebrate-assignments-modal"/>
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
    </section>
  <section v-else class="flex flex-col justify-center items-center">
    <p class="text-sm text-gray-200">Asignación programada:</p>
    <p class="text-md font-semibold text-white">{{ getDateFromString(group.fecha_autoasignacion) }} {{ getHourFromString(group.fecha_autoasignacion) }}</p>
  </section>
</template>

<script>
  import UsersGroup from '@/components/icons/UsersGroup.vue'
  import FullScreenModal from '@/components/containers/FullScreenModal.vue'
  import { useGroupsStore } from '@/stores/groups.js'
  import { closeEveryModal, getDateFromString, getHourFromString } from '@/helpers/Helpers.js'
  import { useGeneralStore } from '@/stores/general.js'

  export default {
    name: "CelebrateAssignments",
    components: {  FullScreenModal, UsersGroup },

    inject: ["groupId"],

    computed: {
        group() {
          return useGroupsStore().actionGetGroup(this.groupId)
        }
    },

    methods: {
      getHourFromString,
      getDateFromString,
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