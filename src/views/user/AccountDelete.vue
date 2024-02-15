<template>
  <button-submit class="!bg-red-600"
    data-modal-toggle="account-delete-modal"
     data-modal-target="account-delete-modal"
  >
    {{ $t("accountDelete.btnSubmit")}}
  </button-submit>

  <full-screen-modal modal-id="account-delete-modal"
                     :btn-yes="$t('accountDelete.modalBtnYes')"
                     :btn-no="$t('accountDelete.modalBtnNo')"
                     @btn-yes-clicked="deleteAccount"
  >
    <div class="p-4 md:p-5 text-center">
      <info-circle class="w-12 h-12 mx-auto mb-3" />
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        {{ $t("accountDelete.modalMsg1") }}
      </h3>
    </div>
  </full-screen-modal>
</template>

<script>
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'
import { useGeneralStore } from '@/stores/general.js'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import FullScreenModal from '@/components/containers/FullScreenModal.vue'
import InfoCircle from '@/components/icons/InfoCircle.vue'

export default {
  name: "AccountDelete",
  components: { InfoCircle, FullScreenModal, ButtonSubmit },

  methods: {
    async deleteAccount() {
      const response = await useUserStore().actionDeleteAccount()

      if(response){
        useGeneralStore().actionShowAlert(this.$t("accountDelete.alertSuccess"), "success")
        document.querySelector("#account-delete-modal .closebtn").click()
        router.push({name: "LoginUser"})
      }
    }
  }
}
</script>