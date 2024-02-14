<template>
  <p class="border-2 border-white w-10 h-10
            rounded-full text-center font-bold text-2xl leading-9"
     :class="{
        'bg-red-500': participant.confirmado === 0,
        'bg-green-500': participant.confirmado === 1
      }"
  >
    {{ participant.nombre.slice(0, 1).toUpperCase() }}
  </p>
</template>
<script>
export default {
  props: {
    participant: {
      required: true
    }
  }
}
</script>