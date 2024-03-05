<template>
  <view-container>
    <block-section>
      <p class="flex flex-row items-center justify-center w-full" @click.stop="createFormVisibility = !createFormVisibility">
        <span>{{ $t("myGroups.createGroupBtn") }}</span><span><caret-down-filled class="size-4 ml-1" /></span>
      </p>
      <create-group @group-created="createFormVisibility = !createFormVisibility" v-if="createFormVisibility" />
    </block-section>

    <block-section>
      <ul v-if="groups && groups.length !== 0" class="space-y-4">
        <li @click="router().push({name: 'ShowGroup', params: {id: group.id}})"
            v-for="(group, index) in groups" v-bind:key="group.id">
          <article>
            <header>
              <h3 class="text-xl">{{ group.nombre }}</h3>
            </header>
            <footer v-if="group && group.integrantes_del_grupo && group.integrantes_del_grupo.length">
              <!-- TODO Mostrar aquí también el estado del grupo (en reparto, asignaciones realizadas, etc) -->
              {{ group.integrantes_del_grupo.length }}
            </footer>
          </article>
          <div v-if="index !== groups.length - 1" class="border-b-2 border-gray-600 w-full mt-4"></div>
        </li>
      </ul>
      <div v-else class="text-center space-y-2">
        <chevron-up-top-icon class="mx-auto animate-bounce" />
        <h2 class="text-2xl text-pretty text-white">{{ $t("myGroups.noGroups")}}</h2>
        <h3 class="text-lg text-gray-300">{{ $t("myGroups.noGroups2")}}</h3>
      </div>
    </block-section>
  </view-container>
</template>

<script>
import { useGroupsStore } from '@/stores/groups.js'
import BlockSection from '@/components/containers/BlockSection.vue'
import { mapState } from 'pinia'
import CreateGroup from '@/views/grupos/CreateGroup.vue'
import CaretDownFilled from '@/components/icons/CaretDownFilled.vue'
import ViewContainer from '@/components/containers/ViewContainer.vue'
import ChevronUpTopIcon from '@/components/icons/ChevronUpTopIcon.vue'
import DropDownTransition from '@/components/transitions/DropDownTransition.vue'
import router from '@/router/index.js'

export default {
  name: "MyGroups",
  methods: {
    router() {
      return router
    }
  },

  components: { DropDownTransition, ChevronUpTopIcon, ViewContainer, CaretDownFilled, CreateGroup, BlockSection },

  data() {
    return {
      createFormVisibility: false
    }
  },

  computed: {
    ...mapState(useGroupsStore, {
      groups: 'groups'
    })
  },

  mounted() {
    //Leo los grupos cuando entro a la sección
    useGroupsStore().actionGetMyGroups()
  }
}
</script>