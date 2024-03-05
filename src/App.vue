<template>
  <footer-menu v-if="requiresFooterMenu"/>
  <router-view v-slot="{ Component }" id="routerview-cotainer">
    <Transition name="view-transition">
      <component :is="Component" />
    </Transition>
  </router-view>
  <system-alert />
</template>

<style>
.view-transition-enter-active {
  animation: appear-from-right 0.2s;
  animation-delay: .2s;
}

.view-transition-leave-active {
  animation: disappear-to-left 0.2s;
}

@keyframes disappear-to-left {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-200px);
    opacity: 0;
  }
}

@keyframes appear-from-right {
  0% {
    transform: translateX(200px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

<script>
import SystemAlert from '@/components/SystemAlert.vue'
import FooterMenu from '@/components/FooterMenu.vue'
import router from '@/router/index.js'

export default {
  name: 'App',
  components: { FooterMenu, SystemAlert },

  computed: {
    requiresFooterMenu() {
      return router.currentRoute.value.meta.footerMenu
    }
  }
}

</script>