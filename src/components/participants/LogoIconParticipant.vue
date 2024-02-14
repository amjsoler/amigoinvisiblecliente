<template>
  <p class="bg-input-background border-2 border-white w-10 h-10 rounded-full text-center font-bold text-2xl leading-9" >{{ participantName.slice(0, 1).toUpperCase() }}</p>
</template>
<script>
export default {
  props: {
    participantName: {
      required: true
    }
  }
}
</script>