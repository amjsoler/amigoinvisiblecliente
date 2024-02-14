<template>
  <form>
    <form-group>
      <span-label>{{ $t("sendComment.commentLabel")}}</span-label>
      <textarea v-model="texto" />
      <small-error field-name="texto" />
    </form-group>
    <form-group>
      <button-submit processing-id="send-comment-submit">
        {{ $t("sendComment")}}
      </button-submit>
    </form-group>
  </form>
</template>

<script>
//TODO
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import SmallError from '@/components/forms/SmallError.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'

export default {
  name: "SendComment",
  components: { ButtonSubmit, SmallError, SpanLabel, FormGroup },

  data() {
    return {
      texto: ""
    }
  }
}
</script>