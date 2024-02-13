<template>
  <footer class="fixed bottom-0 w-full h-16 flex flex-row justify-around bg-container-background
                border-t-2 border-input-background">
    <a href="#"
       class="flex flex-col items-center justify-center"
       @click.prevent="router().push({name: 'MyGroups'})">
      <users-icon />
      <span class="text-sm">
        {{ $t("footerMenu.myGroupsBtn") }}
      </span>
    </a>
    <p>Cuenta de usuario<!--tODO--></p>
  </footer>
</template>

<script>
import router from '@/router/index.js'
import UsersIcon from '@/components/icons/UsersIcon.vue'

export default {
  name: "FooterMenu",
  components: { UsersIcon },
  methods: {
    router() {
      return router
    }
  },

}
</script>

<style>
  #routerview-cotainer {
    padding-bottom: 100px;
  }
</style>