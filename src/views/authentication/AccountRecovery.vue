<template>
  <div-v-align>
    <container-with-brand-head maxwmd="true">
      <section v-if="!emailSent"
               class="flex flex-col items-center space-y-6">
        <h1 class="text-2xl text-center font-semibold text-gray-800 dark:text-white">
          {{ $t("accountRecovery.title") }}
        </h1>
        <p class="text-center text-sm dark:text-gray-200">
          <b>{{ $t("accountRecovery.accountRecoverMsg") }}</b>
        </p>

        <form class="w-full space-y-6">
          <form-group>
            <span-label>{{ $t("accountRecovery.emailLabel")}}</span-label>
            <variable-input input-type="email" v-model="accountRecover.correo" />
            <small-error field-name="correo" />
          </form-group>
          <button-submit processing-id="account-recovery-submit" @button-submit="recoverAccout">
            {{ $t("accountRecovery.sendMailBtnSubmit")}}
          </button-submit>
        </form>
      </section>
      <section v-else class="flex flex-col items-center space-y-2 text-green-600">
        <icon-check width="75px" height="75px" />
        <p class="text-center font-semibold text-lg text-white">
          {{ $t("accountRecovery.emailSent") }}
        </p>
        <p class="text-center text-gray-200">
          {{ $t("accountRecovery.emailSent2") }}
        </p>
      </section>
    </container-with-brand-head>
  </div-v-align>
</template>

<script>
import IconCheck from '@/components/icons/IconCheck.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import SmallError from '@/components/forms/SmallError.vue'
import DivVAlign from '@/components/containers/DivVAlign.vue'
import ContainerWithBrandHead from '@/components/containers/ContainerWithBrandHead.vue'
import VariableInput from '@/components/forms/inputs/VariableInput.vue'
import { useUserStore } from '@/stores/user.js'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'

export default {
  name: "AccountRecovery",

  components: { VariableInput, ContainerWithBrandHead, DivVAlign, SmallError, SpanLabel, FormGroup, ButtonSubmit, IconCheck },

  data() {
    return {
      accountRecover: {
        correo: ""
      },
      emailSent: false,
    }
  },

  methods: {
    async recoverAccout(){
        const result = await useUserStore().actionRecoverAccount(this.accountRecover)

      if(result){
        this.emailSent = true
      }

      removeIdFromProcessing("account-recovery-submit")
    }
  }
}
</script>