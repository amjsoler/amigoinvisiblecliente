<template>
  <view-container class="space-y-8">
    <div>
      <h3 class="text-xl font-bold">{{ $t("myAccount.accountSettings") }}</h3>
      <block-section>
        <account-settings />
      </block-section>
    </div>

    <div>
      <h3 class="text-xl font-bold">{{ $t("myAccount.changePasswordTitle") }}</h3>
      <block-section>
        <change-password />
      </block-section>
    </div>

    <div>
      <h3 class="text-xl font-bold">{{ $t("myAccount.sendCommentTitle") }}</h3>
      <block-section>
        <send-comment />
      </block-section>
    </div>

    <div>
      <h3 class="text-xl font-bold">{{ $t("myAccount.deleteAccountTitle") }}</h3>
      <block-section>
        <account-delete />
      </block-section>
    </div>
  </view-container>
</template>

<script>
import ChangePassword from '@/views/user/ChangePassword.vue'
import AccountDelete from '@/views/user/AccountDelete.vue'
import SendComment from '@/views/user/SendComment.vue'
import AccountSettings from '@/views/user/AccountSettings.vue'
import ViewContainer from '@/components/containers/ViewContainer.vue'
import BlockSection from '@/components/containers/BlockSection.vue'

export default {
  name: "MyAccount",
  components: { BlockSection, ViewContainer, AccountSettings, SendComment, AccountDelete, ChangePassword }
}
</script>