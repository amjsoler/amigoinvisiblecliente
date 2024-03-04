<template>
  <div-v-align>
    <container-with-brand-head>
      <h1 class="text-lg text-center font-bold dark:text-white mb-2">
        {{$t("LoginUser.title")}}
      </h1>
      <form class="space-y-6">
        <form-group>
          <span-label>{{$t("LoginUser.form.email")}}</span-label>
          <variable-input input-type="email" v-model="loginUser.email" />
          <small-error field-name="email"></small-error>
        </form-group>

        <form-group>
          <span-label>{{$t("LoginUser.form.password")}}</span-label>
          <variable-input input-type="password" v-model="loginUser.password" />
          <small-error field-name="password" />
        </form-group>

        <button-submit processing-id="login-user-submit" @button-submit="login">
          {{$t("LoginUser.form.btnsubmit")}}
        </button-submit>

        <div class="flex flex-row items-center justify-center">
          <GoogleLogin :callback="googleSignInCallback" />
        </div>

        <p class="text-sm font-light dark:text-gray-300 text-center">
          {{ $t("LoginUser.form.noaccount") }}
          <link-standard :destination="{name: 'RegisterUser'}">
            {{ $t("LoginUser.form.registerlink") }}
          </link-standard>
        </p>

        <p class="text-sm font-light text-center">
          <link-standard :destination="{name: 'AccountRecovery'}">
            {{$t("LoginUser.form.passrememberlink")}}
          </link-standard>
        </p>
      </form>
    </container-with-brand-head>
  </div-v-align>
</template>

<script>

import { useUserStore } from '@/stores/user'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import SmallError from '@/components/forms/SmallError.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import LinkStandard from '@/components/general/LinkStandard.vue'
import DivVAlign from '@/components/containers/DivVAlign.vue'
import ContainerWithBrandHead from '@/components/containers/ContainerWithBrandHead.vue'
import VariableInput from '@/components/forms/inputs/VariableInput.vue'
import router from '@/router/index.js'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'
import { GoogleLogin } from 'vue3-google-login'

export default {
  name: 'LoginUser',
  components: { GoogleLogin, VariableInput, ContainerWithBrandHead, DivVAlign, LinkStandard, ButtonSubmit, FormGroup, SmallError, SpanLabel },

  data() {
    return {
      loginUser: {
        email: "",
        password: ""
      }
    }
  },

  methods: {
    async login() {
      const result = await useUserStore().actionLogin(this.loginUser)

      removeIdFromProcessing('login-user-submit')

      if (result) {
        router.push({ name: 'MyGroups' })
      }
    },

    async googleSignInCallback(response) {
      const result = await useUserStore().actionLoginWithGoogle({ credential: response.credential})

      if(result) {
        router.push({ name: 'MyGroups' })
      }
    }
  }
}
</script>
