<template>
  <div class="rounded-lg py-4 w-full"
       :class="{'dark:bg-gray-800': !blur,
                 'backdrop-blur': blur,
                 'px-8': !nopx}">
    <slot />
  </div>
</template>

<script>
export default {
  name: "BlockSection",
  props: {
    blur: {
      default: false
    },

    nopx: {
      default: false
    }
  }
}
</script>