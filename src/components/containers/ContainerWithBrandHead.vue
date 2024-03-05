<template>
  <div class="mx-auto flex-grow flex flex-col items-center space-y-6 px-4"
      :class="{'max-w-md': maxwmd}">
    <logo-and-app-name-horizontal v-if="includeBrand === true" />
    <block-section :blur="blur">
      <slot />
    </block-section>
  </div>
</template>
<script>
import LogoAndAppNameHorizontal from '@/components/LogoAndAppNameHorizontal.vue'
import BlockSection from '@/components/containers/BlockSection.vue'

export default {
  components: { BlockSection, LogoAndAppNameHorizontal },
  props: {
    blur: {
      default: false
    },
    includeBrand: {
      default: true
    },
    maxwmd: {
      default: false
    }
  },

}
</script>