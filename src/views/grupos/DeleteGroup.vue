<template>
  <a href="#"
     data-modal-target="delete-group-modal"
     data-modal-toggle="delete-group-modal"
     class="flex flex-row items-center justify-center px-4 py-2 space-x-1 text-red-300"
  >
    <trash-x-icon />
    <span>{{ $t("deleteGroup.deleteBtn")}}</span>
  </a>

  <teleport to="body">
    <div id="delete-group-modal"
         tabindex="-1"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center
       items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-container-background">
          <button type="button"
                  class="close-btn absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg
                text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="delete-group-modal"
          >
            <close-icon />
          </button>
          <div class="p-4 md:p-5 text-center" v-if="!reConfirm">
            <info-circle class="w-12 h-12 mx-auto mb-3" />
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {{ $t("deleteGroup.deleteMsg") }}
            </h3>
            <button @click.prevent.self="showConfirmation" type="button" class="text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
              {{ $t("deleteGroup.deleteYes") }}
            </button>
            <button data-modal-hide="delete-group-modal" type="button" class="text-gray-500 bg-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
              {{ $t("deleteGroup.deleteNo")}}
            </button>
          </div>
          <div v-else class="p-4 md:p-5 text-center">
            <info-circle class="w-12 h-12 mx-auto mb-3" />
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {{ $t("deleteGroup.deleteMsgConfirm") }}
            </h3>
            <button @click.prevent.self="deleteGroup" type="button" class="text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
              {{ $t("deleteGroup.deleteYes") }}
            </button>
            <button data-modal-hide="delete-group-modal" type="button" class="text-gray-500 bg-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
              {{ $t("deleteGroup.deleteNo")}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import TrashXIcon from '@/components/icons/TrashXIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import InfoCircle from '@/components/icons/InfoCircle.vue'
import { useGroupsStore } from '@/stores/groups.js'
import { useGeneralStore } from '@/stores/general.js'
import router from '@/router/index.js'
import { Modal } from 'flowbite'

export default {
  name: "DeleteGroup",
  components: { InfoCircle, CloseIcon, TrashXIcon },

  inject: ["groupId"],

  emits: ["groupDeleted"],

  data() {
    return {
      reConfirm: false
    }
  },

  methods: {
    deleteGroup() {
      const response = useGroupsStore().actionDeleteGroup(this.groupId)

      if(response) {
        useGeneralStore().actionShowAlert(this.$t("deleteGroup.deleteAlert"), "success")

        document.querySelector("#delete-group-modal .close-btn").click()

        this.$emit("groupDeleted")

        router.push({name: "MyGroups"})
      }
    },

    showConfirmation()
    {
      this.reConfirm = !this.reConfirm
    }
  }

}
</script>