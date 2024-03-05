<template>
  <footer id="footer-menu" class="z-10 fixed bottom-0 w-full h-16 flex flex-row justify-around bg-container-background
                border-t-2 border-input-background">
    <a href="#"
       class="flex flex-col items-center justify-center"
       @click.prevent="router().push({name: 'MyGroups'})">
      <users-icon />
      <span class="text-sm">
        {{ $t("footerMenu.myGroupsBtn") }}
      </span>
    </a>
    <a href="#"
       class="flex flex-col items-center justify-center"
       @click.prevent="router().push({name: 'MyAccount'})">
      <user-icon />
      <span class="text-sm">
        {{ $t("footerMenu.accountBtn") }}
      </span>
    </a>
  </footer>
</template>

<script>
import router from '@/router/index.js'
import UsersIcon from '@/components/icons/UsersIcon.vue'
import UserIcon from '@/components/icons/UserIcon.vue'

export default {
  name: "FooterMenu",
  components: { UserIcon, UsersIcon },
  methods: {
    router() {
      return router
    }
  },

}
</script>