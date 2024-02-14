<template>
  <div class="flex flex-col">
    <account-settings />
    <change-password />
    <send-comment />
    <account-delete />
  </div>
</template>

<script>
import ChangePassword from '@/views/user/ChangePassword.vue'
import AccountDelete from '@/views/user/AccountDelete.vue'
import SendComment from '@/views/user/SendComment.vue'
import AccountSettings from '@/views/user/AccountSettings.vue'

export default {
  name: "MyAccount",
  components: { AccountSettings, SendComment, AccountDelete, ChangePassword }
}
</script>