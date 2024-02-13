import { defineStore } from 'pinia'
import { API } from '@/services/index.js'

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
console.log(response)
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
      }catch(error) {
        return false
      }
    }
  }
})