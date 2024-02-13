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

        if(response) {
          useGroupsStore().$patch((state) => {
            state.groups.push(response.data)
            state.groups.sort((a, b) => {
              return (a.nombre < b.nombre) ? -1 : ((a.nombre > b.nombre) ? 1 : 0)
            })
          })
        }
      }catch(error) {
        return false
      }
    }
  }
})