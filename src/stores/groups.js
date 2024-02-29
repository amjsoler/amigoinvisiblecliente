import { defineStore } from 'pinia'
import { API } from '@/services/index.js'
import { useGeneralStore } from '@/stores/general.js'
import { i18n } from '@/lang/index.js'

export const useGroupsStore = defineStore("groups", {
  state: () => {
    return {
      groups: JSON.parse(localStorage.getItem("groups"))
    }
  },

  actions: {
    async actionGetMyGroups() {
      try {
        const response = await API.groups.getMyGroups()

        if(response){
          useGroupsStore().$patch({groups: response.data})
        }
      }catch(error){
        return false
      }
    },

    async actionCreateGroup(newGroup) {
      try {
        const response = await API.groups.createGroup(newGroup)
console.log(response)
        useGroupsStore().$patch((state) => {
          state.groups.push(response.data)
          state.groups.sort((a, b) => {
            return (a.nombre < b.nombre) ? -1 : ((a.nombre > b.nombre) ? 1 : 0)
          })
        })

        return true
      }catch(error) {
        return false
      }
    },

    actionGetGroup(groupId) {
      try {
        return this.groups.filter(item => item.id === parseInt(groupId)).at(0)
      }catch(error){
        return null
      }
    },

    async actionDeleteGroup(groupId){
      try {
        await API.groups.deleteGroup(groupId)

        this.groups.splice(this.groups.findIndex((element) => element.id === parseInt(groupId)), 1)

        return true
      }catch(error) {
        return false
      }
    },

    async actionInviteParticipant(groupId, newParticipant) {
      try {
        const response = await API.groups.inviteParticipant(groupId, newParticipant)

        this.actionGetGroup(groupId).integrantes_del_grupo.unshift(response.data)

        return true
      }catch(error) {
        return false
      }
    },

    async actionMassiveInvitation(groupId, newParticipants) {
      try {
        const response = await API.groups.massiveInvitation(groupId, newParticipants)

        this.actionGetGroup(groupId).integrantes_del_grupo = response.data.concat(this.actionGetGroup(groupId).integrantes_del_grupo)

        return true
      }catch(error) {
        return false
      }
    },

    async actionRemoveParticipant(groupId, participantId) {
      try {
        await API.groups.deleteParticipant(groupId, participantId)

        const indexToRemove = this.actionGetGroup(groupId).integrantes_del_grupo.findIndex(obj => obj.id === participantId)
        this.actionGetGroup(groupId).integrantes_del_grupo.splice(indexToRemove, 1)
      }catch(error) {
        return false
      }
    },

    async actionResendParticipantInvitation(groupId, participantId) {
      try {
        await API.groups.resendParticipantInvitation(groupId, participantId)

        useGeneralStore().actionShowAlert(i18n.global.t("resendParticipantInvitation"), "success")
        return true
      }catch(error) {
        return false
      }
    },

    async actionModifyGroup(groupId, groupPayload) {
      try {
        const response = await API.groups.modifyGroup(groupId, groupPayload)
        const index = this.groups.findIndex((element) => element.id === groupId)
        useGroupsStore().$patch((state) => {
          //recorro las propiedades del objeto que tengo en la respuesta
          Object.keys(response.data).forEach((key) => {
            //modifico la propiedad del grupo que se encuentra en el index de más arriba
            state.groups.at(index)[key] = response.data[key]
          })
        })

        return true
      }catch(error) {
        return false
      }
    },

    async actionCelebrateAssignments(groupId) {
      try {
        await API.groups.celebrateAssignments(groupId)

        useGroupsStore().$patch((state) => {
          state.groups.at(state.groups.findIndex((element) => element.id === groupId)).integrantes_asignados = true
        })

        return true
      } catch(error) {
        return false
      }
    }
  }
})