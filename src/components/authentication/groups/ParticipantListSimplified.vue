<template>
  <ul class="flex flex-row">
    <li v-for="participant in participantsList" v-bind:key="participant.id">
      {{ participant.nombre }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "ParticipantListSimplified",

  props: {
    participantsList: {
      required: true
    }
  }
}
</script>