<template>
  <div class="space-y-6">
    <form class="space-y-6">
      <form-group>
        <span-label>{{ $t("massiveInvitation.nameLabel")}}</span-label>
        <variable-input required="true" v-model="newParticipant.nombre" input-type="text" />
      </form-group>
      <form-group>
        <span-label>{{ $t("massiveInvitation.emailLabel")}}</span-label>
        <variable-input required="true" v-model="newParticipant.correo" input-type="email" />
      </form-group>
      <form-group>
        <button-submit @buttonSubmit="addParticipant">{{ $t("massiveInvitation.inviteParticipantsBtn")}}</button-submit>
      </form-group>
    </form>
    <div>
      <ul class="space-y-2">
        <li class="flex flex-row items-center" v-for="(participant,index) in integrantes" v-bind:key="participant.id">
          <p>{{ participant.nombre}} ({{participant.correo}})</p>
          <trash-x-icon class="text-red-300" @click="integrantes.splice(index, 1)" />
        </li>
      </ul>
    </div>
    <small v-if="useValidationStore().errors" class="text-red-600">
      {{ useValidationStore().message }}
    </small>
    <button-submit v-if="integrantes.length" processing-id="massive-invitation-submit" @button-submit="finishAndSendInvitations">
      {{ $t("massiveInvitation.finishInvitationbtn")}}
    </button-submit>
  </div>
</template>
<script>
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import VariableInput from '@/components/forms/inputs/VariableInput.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import TrashXIcon from '@/components/icons/TrashXIcon.vue'
import { useGroupsStore } from '@/stores/groups.js'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'
import { useValidationStore } from '@/stores/validation.js'

export default {
  name: "MassiveInvitation",
  components: { TrashXIcon, ButtonSubmit, VariableInput, SpanLabel, FormGroup },

  props: {
    groupId: {
      required: true
    }
  },

  emits: ["massiveInvitationDone"],

  data() {
    return {
      integrantes: [],
      newParticipant: this.initNewParticipant()
    }
  },

  methods: {
    useValidationStore,
    initNewParticipant() {
      return {
        nombre: "",
        correo: ""
      }
    },

    addParticipant() {
      this.integrantes.push(this.newParticipant)
      this.newParticipant = this.initNewParticipant()
    },

    async finishAndSendInvitations() {
      const response = await useGroupsStore().actionMassiveInvitation(this.groupId, {integrantes: this.integrantes})

      removeIdFromProcessing("massive-invitation-submit")

      if(response){
        this.newParticipant = this.initNewParticipant()
        this.integrantes = []
        this.$emit("massiveInvitationDone")
      }
    }
  }


}
</script>