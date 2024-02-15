<template>
  <form class="space-y-6">
    <form-group>
      <span-label>{{ $t("sendComment.commentLabel")}}</span-label>
      <textarea class="w-full text-gray-300 rounded-lg bg-input-background" v-model="texto" />
      <small-error field-name="texto" />
    </form-group>
    <form-group>
      <button-submit processing-id="send-comment-submit" @button-submit="sendComment">
        {{ $t("sendComment.commentBtnSubmit")}}
      </button-submit>
    </form-group>
  </form>
</template>

<script>
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import SmallError from '@/components/forms/SmallError.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import { useUserStore } from '@/stores/user.js'
import { useGeneralStore } from '@/stores/general.js'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'

export default {
  name: "SendComment",
  components: { ButtonSubmit, SmallError, SpanLabel, FormGroup },

  emits: ["commentSent"],

  data() {
    return {
      texto: ""
    }
  },

  methods: {
    sendComment() {
      useUserStore().actionSendComment({texto: this.texto})

      removeIdFromProcessing("send-comment-submit")
      this.texto = ""
      useGeneralStore().actionShowAlert(this.$t("sendComment.alertSendCommentSuccess"), "success")
      this.$emit("commentSent")
    }
  }
}
</script>