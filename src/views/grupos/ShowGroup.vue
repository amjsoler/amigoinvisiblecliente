<template>
  <view-container>
    <div class="flex flex-row items-center">
      <h3 class="text-lg flex-grow">{{viewingGroup.nombre}}</h3>
      <group-settings v-if="checkIfUserIsAdminOfGroup(viewingGroup.id)" />
    </div>

    <block-section class="flex flex-col space-y-4">
      <textarea class="bg-input-background max-h-20" disabled v-model="viewingGroup.descripcion" />
      <div class="flex flex-row justify-around">
        <div class="flex flex-row items-center space-x-2">
          <pig-money class="text-gray-300"/>
          <p v-if="viewingGroup.precio_minimo">{{viewingGroup.precio_minimo}}€</p>
          <p v-else>{{ $t("showGroup.noPrecioMinimo")}}</p>
          <p>-</p>
          <p v-if="viewingGroup.precio_maximo">{{viewingGroup.precio_maximo}}</p>
          <p v-else>{{ $t("showGroup.noPrecioMaximo")}}</p>
        </div>
        <div>
          <p class="flex flex-row items-center space-x-2">
            <gift-icon />
            <span v-if="viewingGroup.tematica_regalos">{{viewingGroup.tematica_regalos}}</span>
            <span v-else>{{$t("showGroup.noTematicaRegalos")}}</span>
          </p>
        </div>
      </div>
    </block-section>

    <block-section>
      <participant-list-simplified :participants-list="viewingGroup.integrantes_del_grupo" />
    </block-section>
  </view-container>
</template>

<script>
import router from '@/router/index.js'
import { useGroupsStore } from '@/stores/groups.js'
import BlockSection from '@/components/containers/BlockSection.vue'
import PigMoney from '@/components/icons/PigMoney.vue'
import GiftIcon from '@/components/icons/GiftIcon.vue'
import ParticipantListSimplified from '@/components/authentication/groups/ParticipantListSimplified.vue'
import GroupSettings from '@/components/authentication/groups/GroupSettings.vue'
import ViewContainer from '@/components/containers/ViewContainer.vue'
import { useUserStore } from '@/stores/user.js'
import { checkIfUserIsAdminOfGroup } from '@/helpers/Helpers.js'
import { useGeneralStore } from '@/stores/general.js'

export default {
  name: "ShowGroup",
  components: { ViewContainer, GroupSettings, ParticipantListSimplified, GiftIcon, PigMoney, BlockSection },

  data() {
    return {
      viewingGroup: ""
    }
  },

  mounted() {
    const response = useGroupsStore().actionGetGroup(router.currentRoute.value.params.id)

    if(response === null){
      useGeneralStore().actionShowAlert(this.$t("showGroup.errorReadingGroup"), "danger")

      router.push({name: "MyGroups"})
    }
  },

  provide() {
    return {
      groupId: this.viewingGroup.id
    }
  },

  methods: {
    checkIfUserIsAdminOfGroup,
    useUserStore,
    router() {
      return router
    }, useGroupsStore },

}
</script>