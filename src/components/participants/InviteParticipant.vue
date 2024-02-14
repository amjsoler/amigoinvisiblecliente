<template>
  <form class="space-y-6">
    <form-group>
      <span-label>{{ $t("inviteParticipant.nameLabel") }}</span-label>
      <variable-input input-type="text" v-model="newParticipant.nombre" />
      <small-error field-name="nombre" />
    </form-group>
    <form-group>
      <span-label>{{ $t("inviteParticipant.emailLabel") }}</span-label>
      <variable-input input-type="text" v-model="newParticipant.correo" />
      <small-error field-name="correo" />
    </form-group>
    <form-group>
      <button-submit processing-id="invite-participant-submit" @button-submit="inviteParticipant">
        {{ $t("inviteParticipant.inviteParticipantBtn")}}
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
import { useGroupsStore } from '@/stores/groups.js'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'

export default {
  name: "InviteParticipant",

  components: { ButtonSubmit, SmallError, VariableInput, SpanLabel, FormGroup },

  props: {
    groupId: {
      required: true
    }
  },

  emits: ["participantInvited"],

  data() {
    return {
      newParticipant: this.initModel()
    }
  },

  methods: {
    initModel() {
      return {
        nombre: "",
        correo: ""
      }
    },

    inviteParticipant() {
      const response  = useGroupsStore().actionInviteParticipant(this.groupId, this.newParticipant)

      removeIdFromProcessing("invite-participant-submit")
      if(response){
        this.newParticipant = this.initModel()
        this.$emit("participantInvited")
      }
    }
  }
}
</script>