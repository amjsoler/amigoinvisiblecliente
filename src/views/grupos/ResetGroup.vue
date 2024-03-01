<template>
  <a href="#"
     data-modal-target="reset-group-modal"
     data-modal-toggle="reset-group-modal"
     class="flex flex-row items-center justify-center px-4 py-2 space-x-1"
  >
    <repeat-icon />
    <span>{{ $t("resetGroup.resetGroupBtn")}}</span>
  </a>

  <full-screen-modal modal-id="reset-group-modal"
                     :modal-title="$t('resetGroup.modalTitle')"
                      :btn-yes="$t('resetGroup.modalYes')"
                      :btn-no="$t('resetGroup.modalNo')"
                     @btn-yes-clicked="resetGroupCallback"
  >
    <block-section class="space-y-2">
      <p>{{ $t("resetGroup.modalBody1") }}</p>
      <p class="font-semibold">{{ $t("resetGroup.modalBody2") }}</p>
      <p>{{ $t("resetGroup.modalBody3") }}</p>
      <form-group>
        <div class="flex flex-row items-center space-x-2">
          <label class="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" v-model="deleteParticipantsCheck" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ms-3 font-medium text-gray-900 dark:text-red-300">{{ $t("resetGroup.modalCheckbox") }}</span>
          </label>
        </div>
      </form-group>
    </block-section>
  </full-screen-modal>
</template>
<script>
import RepeatIcon from '@/components/icons/RepeatIcon.vue'
import FullScreenModal from '@/components/containers/FullScreenModal.vue'
import BlockSection from '@/components/containers/BlockSection.vue'
import { useGroupsStore } from '@/stores/groups.js'
import { closeEveryModal } from '@/helpers/Helpers.js'
import { useGeneralStore } from '@/stores/general.js'
import FormGroup from '@/components/forms/FormGroup.vue'

export default {
  name: "ResetGroup",
  components: { FormGroup, BlockSection, FullScreenModal, RepeatIcon },

  emits: ["group-reseted"],

  inject: ["groupId"],

  data() {
    return {
      deleteParticipantsCheck: false
    }
  },

  methods: {
    resetGroupCallback(){
      const response = useGroupsStore().actionResetGroup(this.groupId, this.deleteParticipantsCheck)

      if(response){
        this.$emit("group-reseted")
        closeEveryModal()
        useGeneralStore().actionShowAlert(this.$t("resetGroup.alertSuccess"), "success")
      }
    }
  }
}
</script>