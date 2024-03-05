import { defineStore } from 'pinia'
import { API } from '@/services/index.js'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: JSON.parse(localStorage.getItem("user"))
    }
  },

  actions: {
    async actionRegister(newUser) {
      try {
        const response = await API.users.registerUser(newUser)
        useUserStore().$patch({user: response.data})

        return true
      }
      catch(error){
        return false
      }
    },

    async actionLogin(user) {
      try {
        const response = await API.users.loginUser(user)

        useUserStore().$patch({user: response.data})

        return true
      }catch(error) {
        return false
      }
    },

    async actionLoginWithGoogle(payload) {
      try {
        const response = await API.users.loginUserWithGoogle(payload)

        useUserStore().$patch({user: response.data})

        return true
      }catch(error) {
        return false
      }
    },

    async actionRecoverAccount(account) {
      try {
        await API.users.accountRecover(account)

        return true
      }catch(error) {
        return false
      }
    },

    async actionAccountVerify() {
      try {
        await API.users.accountVerify()

        return true
      }catch(error){
        return false
      }
    },

    async actionCheckAccountVerification() {
      try {
        const response = await API.users.checkAccountVerification()

        if(response.data.check){
          return true
        }else{
          return false
        }
      }catch(error){
        return false
      }
    },

    async actionSendComment(comment) {
      try {
        await API.users.sendComment(comment)

        return true
      }catch(error){
        return false
      }
    },

    async actionDeleteAccount() {
      try {
        await API.users.deleteAccount()
        useUserStore().user = {}
        return true
      }catch(error) {
        return false
      }
    },

    async actionChangePassword(changePasswordPayload) {
      try {
        await API.users.changePassword(changePasswordPayload)

        return true
      }catch(error) {
        return false
      }
    },

    async actionChangeAccountSettings(changeAccountSettingsPayload) {
      try {
        const response = await API.users.changeAccountSettings(changeAccountSettingsPayload)
        useUserStore().$patch({user: response.data})

        return true
      }catch(error) {
        return false
      }
    }
  }
})