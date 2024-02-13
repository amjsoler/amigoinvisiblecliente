<template>
  My groups

  ---

  <create-group />

  ---
</template>

<script>
import { useGroupsStore } from '@/stores/groups.js'
import CreateGroup from '@/views/grupos/CreateGroup.vue'

export default {
  name: "MyGroups",
  components: { CreateGroup },

  mounted() {
    //Leo los grupos cuando entro a la sección
    useGroupsStore().actionGetMyGroups()
  }
}
</script>