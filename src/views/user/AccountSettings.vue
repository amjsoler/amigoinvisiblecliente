<template>
  <form class="space-y-6">
    <form-group>
      <span-label>{{ $t("changeAccountSettings.nameLabel")}}</span-label>
      <variable-input input-type="text" v-model="changeAccountSettingsPayload.name"/>
      <small-error field-name="name" />
    </form-group>

    <div class="flex flex-row items-center [&>fieldset]:flex-grow">
      <form-group>
        <span-label>{{ $t("changeAccountSettings.alertasPorCorreoLabel")}}</span-label>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="changeAccountSettingsPayload.alertasporcorreo" value="" class="sr-only peer">
          <div class="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <small-error field-name="alertasporcorreo" />
      </form-group>

      <form-group>
        <span-label>{{ $t("changeAccountSettings.alertasPorNotificacionLabel")}}</span-label>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="changeAccountSettingsPayload.alertaspornotificacion" value="" class="sr-only peer">
          <div class="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <small-error field-name="alertaspornotificacion" />
      </form-group>
    </div>

    <form-group>
      <button-submit processing-id="account-settings-submit" @button-submit="changeAccountSettings">
        {{ $t("changeAccountSettings.btnSubmit") }}
      </button-submit>
    </form-group>
  </form>
</template>

<script>
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import VariableInput from '@/components/forms/inputs/VariableInput.vue'
import SmallError from '@/components/forms/SmallError.vue'
import { useUserStore } from '@/stores/user.js'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'
import { useGeneralStore } from '@/stores/general.js'

export default {
  name: "AccountSettings",
  components: { ButtonSubmit, SmallError, VariableInput, SpanLabel, FormGroup },

  data() {
    return {
      changeAccountSettingsPayload: {
        name: useUserStore().user.name,
        alertasporcorreo: useUserStore().user.alertasporcorreo,
        alertaspornotificacion: useUserStore().user.alertaspornotificacion
      }
    }
  },

  methods: {
    async changeAccountSettings() {
      const response = await useUserStore().actionChangeAccountSettings(this.changeAccountSettingsPayload)

      removeIdFromProcessing("account-settings-submit")

      if(response) {
        useGeneralStore().actionShowAlert(this.$t("changeAccountSettings.alertSuccess"), "success")
      }
    }
  }
}
</script>