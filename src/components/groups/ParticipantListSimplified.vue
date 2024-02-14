<template>
  <ul class="flex flex-row pl-3 pt-3 flex-wrap">
    <li class="-ml-3 -mt-3" v-for="participant in participantsList" v-bind:key="participant.id">
      <logo-icon-participant :participant="participant" />
    </li>
  </ul>
  <ul class="flex flex-col space-y-3">
    <li v-for="participant in participantsList" v-bind:key="participant.id">
      <div class="flex flex-row">
        <p class="flex-grow">{{participant.nombre}} ({{ participant.correo}})</p>
        <div class="flex flex-row space-x-3">
          <mail-forward class="text-primary-300" @click="resendParticipantInvitation(participant)" />
          <trash-x-icon class="text-red-300" @click="removeParticipant(participant)"/>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import LogoIconParticipant from '@/components/participants/LogoIconParticipant.vue'
import TrashXIcon from '@/components/icons/TrashXIcon.vue'
import MailForward from '@/components/icons/MailForward.vue'
import { useGroupsStore } from '@/stores/groups.js'

export default {
  name: "ParticipantListSimplified",
  components: { MailForward, TrashXIcon, LogoIconParticipant },

  props: {
    participantsList: {
      required: true
    }
  },

  methods: {
    removeParticipant(participant) {
      useGroupsStore().actionRemoveParticipant(participant.grupo, participant.id)
    },

    resendParticipantInvitation(participant){
      useGroupsStore().actionResendParticipantInvitation(participant.grupo, participant.id)
    }
  }
}
</script>