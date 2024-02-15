<template>
  <teleport to="body">
    <div :id="modalId"
         tabindex="-1"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center
       items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-container-background">
          <button type="button"
                  class="closebtn absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg
                text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  :data-modal-hide="modalId"
          >
            <close-icon />
          </button>
          <slot />
          <div class="flex flex-row justify-center items-center">
            <button v-if="btnYes" @click.prevent.self="$emit('btnYesClicked')"
                    type="button"
                    class="text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300
                  dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              {{ btnYes }}
            </button>
            <button v-if="btnNo"
                    :data-modal-hide="modalId"
                    type="button"
                    class="text-gray-500 bg-white focus:ring-4 focus:outline-none focus:ring-gray-200
                  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900
                  focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white
                  dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              {{ btnNo }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import CloseIcon from '@/components/icons/CloseIcon.vue'

export default {
  name: "FullScreenModal",
  components: { CloseIcon },

  props: {
    modalId: {
      required: true
    },
    btnYes: String,
    btnNo: String,
    BtnOk: String
  },

  emits: ["btnYesClicked","btnNoClicked","btnOkClicked"]
}
</script>