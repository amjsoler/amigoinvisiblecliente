<template>
  <view-container>
    <block-section>
      <a class="flex flex-row items-center justify-center" href="#" @click.prevent="createFormVisibility = !createFormVisibility">
        <span>{{ $t("myGroups.createGroupBtn") }}</span><span><caret-down-filled /></span>
      </a>
      <create-group @group-created="createFormVisibility = !createFormVisibility" v-if="createFormVisibility" />
    </block-section>

    <block-section>
      <ul v-if="groups && groups.length !== 0">
        <li @click="router().push({name: 'ShowGroup', params: {id: group.id}})"
            v-for="group in groups" v-bind:key="group.id">
          <article>
            <header>
              {{ group.nombre }}
            </header>
            <body>

            </body>
            <footer v-if="group && group.integrantes_del_grupo && group.integrantes_del_grupo.length">
              {{ group.integrantes_del_grupo.length }}
            </footer>
          </article>
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