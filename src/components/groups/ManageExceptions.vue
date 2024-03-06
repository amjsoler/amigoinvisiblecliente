<template>
  <section class="flex flex-row items-center justify-center space-x-1 text-lg text-white font-semibold cursor-pointer
                  bg-primary-600 px-4 py-2 rounded-lg"
            data-modal-toggle="manage-exceptions-modal"
            data-modal-target="manage-exceptions-modal">
    <user-minus class="size-8 font-semibold"/>
    <p>{{ $t("manageExceptions.titleBtn") }}</p>
  </section>

  <full-screen-modal modal-id="manage-exceptions-modal" :modal-title="$t('manageExceptions.modalTitle')">
    <ul>
      <li :class="{
        'labeled-gray': isExcludedTheGivenParticipantId(participant.id),
        'unlabeled-gray': !isExcludedTheGivenParticipantId(participant.id)
      }" v-for="participant in group.integrantes_del_grupo" :key="participant.id">
        <p v-if="participant.usuario !== actualUserId && !isExcludedTheGivenParticipantId(participant.id)" @click.prevent="addException(participant.id)">{{ participant.nombre }}</p>
        <p v-else-if="participant.usuario !== actualUserId && isExcludedTheGivenParticipantId(participant.id)" @click.prevent="removeException(participant.id)">{{ participant.nombre }}</p>
      </li>
    </ul>
  </full-screen-modal>
</template>

<script>
import UserMinus from '@/components/icons/UserMinus.vue'
import FullScreenModal from '@/components/containers/FullScreenModal.vue'
import { useGroupsStore } from '@/stores/groups.js'
import { useUserStore } from '@/stores/user.js'

export default {
  name: "ManageExceptions",
  components: { FullScreenModal, UserMinus },
  inject: ["groupId"],

  computed: {
    group() {
      return useGroupsStore().actionGetGroup(this.groupId)
    },

    actualUserId() {
      return useUserStore().user.id
    }
  },

  methods:{
    isExcludedTheGivenParticipantId(participantId){
      return useGroupsStore().actionGetGroup(this.groupId)
        .integrantes_del_grupo.at(useGroupsStore().actionGetGroup(this.groupId).integrantes_del_grupo.findIndex(item => item.usuario === useUserStore().user.id)).exclusiones_del_integrante.some(exception => exception.usuario_excluido === participantId)
    },

    async addException(participantId){
      await useGroupsStore().actionAddException(this.groupId, participantId)
    },

    async removeException(participantId){
      //Get exceptionId from the participantId
      const exceptionId = useGroupsStore().actionGetGroup(this.groupId)
        .integrantes_del_grupo.at(useGroupsStore().actionGetGroup(this.groupId).integrantes_del_grupo.findIndex(item => item.usuario === useUserStore().user.id)).exclusiones_del_integrante.find(exception => exception.usuario_excluido === participantId).id

      await useGroupsStore().actionRemoveException(this.groupId, exceptionId)
    }
  }
}
</script>

<style>
  .labeled-gray {
    color: #bdbdbd;
    text-decoration: line-through;
    transition: all .5s;
    animation: ease-in-out;
    animation-name: labeled-and-gray;
  }

  .unlabeled-gray {
    color: white;
    text-decoration: none;
    transition: all .5s;
    animation: reverse ease-in-out;
    animation-name: labeled-and-gray;
  }

  @keyframes labeled-and-gray {
    0% {
      color: white;
      opacity: 100%;
    }
    100% {
      color: #bdbdbd;
      opacity: 80%;
    }
  }
</style>