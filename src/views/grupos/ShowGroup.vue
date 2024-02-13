<template>
  <div class="relative">
    <p class="absolute right-4 top-4 w-8 h-8">
      <group-settings />
    </p>
    <block-section class="flex flex-col">
      <h3>{{viewingGroup.nombre}}</h3>
      <textarea v-model="viewingGroup.descripcion" />
      <div class="flex flex-row">
        <pig-money/>
        {{viewingGroup.precio_minimo}}
        {{viewingGroup.precio_maximo}}
      </div>
      <div>
        <gift-icon /> {{viewingGroup.tematica_regalos}}
      </div>
    </block-section>

    <block-section>
      <participant-list-simplified :participants-list="viewingGroup.integrantes_del_grupo" />
    </block-section>
  </div>
</template>

<script>
import router from '@/router/index.js'
import { useGroupsStore } from '@/stores/groups.js'
import BlockSection from '@/components/containers/BlockSection.vue'
import PigMoney from '@/components/icons/PigMoney.vue'
import GiftIcon from '@/components/icons/GiftIcon.vue'
import ParticipantListSimplified from '@/components/authentication/groups/ParticipantListSimplified.vue'
import GroupSettings from '@/components/authentication/groups/GroupSettings.vue'

export default {
  name: "ShowGroup",
  components: { GroupSettings, ParticipantListSimplified, GiftIcon, PigMoney, BlockSection },

  data() {
    return {
      viewingGroup: useGroupsStore().actionGetGroup(router.currentRoute.value.params.id)
    }
  },

  provide() {
    return {
      groupId: this.viewingGroup.id
    }
  },

  methods: {
    router() {
      return router
    }, useGroupsStore },

}
</script>