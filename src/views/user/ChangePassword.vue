<template>
  <form class="space-y-6">
    <form-group>
      <span-label>{{ $t("changePassword.actualPasswordLabel")}}</span-label>
      <variable-input input-type="password" v-model="changePasswordPayload.contrasenaActual"/>
      <small-error field-name="contrasenaActual" />
    </form-group>

    <form-group>
      <span-label>{{ $t("changePassword.newPasswordLabel")}}</span-label>
      <variable-input input-type="password" v-model="changePasswordPayload.nuevaContrasena"/>
      <small-error field-name="nuevaContrasena" />
    </form-group>

    <form-group>
      <span-label>{{ $t("changePassword.newPasswordConfirmationLabel")}}</span-label>
      <variable-input input-type="password" v-model="changePasswordPayload.nuevaContrasena_confirmation"/>
      <small-error field-name="nuevaContrasena_confirmation" />
    </form-group>

    <form-group>
      <button-submit processing-id="change-password-submit" @button-submit="changePassword">
        {{ $t("changePassword.btnSubmit") }}
      </button-submit>
    </form-group>
  </form>
</template>

<script>
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import VariableInput from '@/components/forms/inputs/VariableInput.vue'
import SmallError from '@/components/forms/SmallError.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import { useUserStore } from '@/stores/user.js'
import { useGeneralStore } from '@/stores/general.js'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'

export default {
  name: "ChangePassword",
  components: { ButtonSubmit, SmallError, VariableInput, SpanLabel, FormGroup },

  data() {
    return {
      changePasswordPayload: this.initChangePasswordPayload()
    }
  },

  methods: {
    initChangePasswordPayload() {
      return {
        contrasenaActual: "",
        nuevaContrasena: "",
        nuevaContrasena_confirmation: ""
      }
    },

    async changePassword() {
      const response = await useUserStore().actionChangePassword(this.changePasswordPayload)
      removeIdFromProcessing("hange-password-submit")

      if(response){
        this.changePasswordPayload = this.initChangePasswordPayload()
        useGeneralStore().actionShowAlert(this.$t("changePassword.alertSuccess"), "success")
      }
    }
  }
}
</script>