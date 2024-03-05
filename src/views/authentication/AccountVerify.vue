<template>
  <div-v-align>
    <container-with-brand-head blur="true" maxwmd="true">
      <section v-if="!emailSent"
               class="flex flex-col items-center space-y-2 py-2">
        <p class="text-center text-pretty text-lg">
          <b>{{ $t("accountVerify.accountVerifyMsg") }}</b>
        </p>
        <p class="text-center text-sm">
          {{ $t("accountVerify.accountVerifyMsg2") }}
        </p>
        <p class="!mt-6">{{ $t("accountVerify.resendEmailMsg")}}</p>
        <button-submit processing-id="account-verify-submit" @button-submit="resendEmail">
          {{ $t("accountVerify.resendEmailBtn") }}
        </button-submit>
      </section>
      <section v-else class="flex flex-col items-center dark:text-green-600">
        <icon-check width="75px" height="75px" />
        <p class="text-center dark:text-gray-50">
          {{ $t("accountVerify.verifyMailSent") }}
        </p>
      </section>
    </container-with-brand-head>
  </div-v-align>
</template>

<script>
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import DivVAlign from '@/components/containers/DivVAlign.vue'
import ContainerWithBrandHead from '@/components/containers/ContainerWithBrandHead.vue'
import { API } from '@/services/index.js'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'

export default {
  name: "AccountVerify",
  components: { ContainerWithBrandHead, DivVAlign, IconCheck, ButtonSubmit },

  data() {
    return {
      emailSent:false,
      timer: null
    }
  },

  mounted() {
    this.timer = setInterval(() => {
      this.checkVerifiedUser()
    }, 3000)
  },

  unmounted() {
    clearInterval(this.timer)
  },

  methods: {
    async checkVerifiedUser() {
      const response = await useUserStore().actionCheckAccountVerification()

      if(response){
        this.$router.push({name: 'MyGroups'})
      }
    },

    async resendEmail() {
      const response = await useUserStore().actionAccountVerify()

      removeIdFromProcessing("account-verify-submit")

      if(response){
        this.emailSent = true;
      }
    }
  }
}
</script>