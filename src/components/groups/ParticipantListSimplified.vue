<template>
  <ul class="flex flex-row pl-3 pt-3 flex-wrap">
    <li class="-ml-3 -mt-3" v-for="participant in participantsList" v-bind:key="participant.id">
      <logo-icon-participant :participant-name="participant.nombre" />
    </li>
  </ul>
</template>

<script>
import LogoIconParticipant from '@/components/participants/LogoIconParticipant.vue'

export default {
  name: "ParticipantListSimplified",
  components: { LogoIconParticipant },

  props: {
    participantsList: {
      required: true
    }
  }
}
</script>