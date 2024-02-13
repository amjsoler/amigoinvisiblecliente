import axios from 'axios'
import router from '@/router/index.js'
import { useValidationStore } from '@/stores/validation.js'
import { useUserStore } from '@/stores/user.js'
import { useGeneralStore } from '@/stores/general.js'
import { i18n } from '@/lang/index.js'

const instance = axios
  .create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
  })

  instance.interceptors.response.use(
    (response) => {
      if (response.status === 200) {
        //Si recibo 200, borro el array de errores y mensaje para que no afecte a las páginas
        console.log('main.js: Response captured: 200')

        useValidationStore().errors = []
        useValidationStore().message = ""
      }

      return response
    },
    (error) => {
      if(error.response.status === 401){
        console.log("main.js: Response error captured: 401. Delete access token and redirect to login");
        useUserStore().$patch({user: {access_token: null}})

        router.push({name: "LoginUser"})

        useGeneralStore().actionShowAlert(
          i18n.global.t("api401", "info")
        )
      }

      else if(error.response.status === 403){
        console.log("main.js: Response error captured: 403. Forbidden action");

        router.push({name: "ForbiddenResource"});
      }

      else if (error.response.status === 422) {
        console.log('main.js: Response error captured: 422')
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors &&
          error.response.data.message
        ) {
          useValidationStore().message = error.response.data.message
          useValidationStore().errors = error.response.data.errors
        }
      }
      else if(error.response.status === 460){
        console.log("main.js: Response error captured: 460. Cuenta no verificada, redirijo a la vista de verificación");
        router.push({name:"AccountVerify"});
      }
      else if(error.response.status === 462){
        console.log("main.js: Response error captured: 462. Contraseña no es correcta");

        useValidationStore().$reset()
        useValidationStore().message = error.response.data
        useValidationStore().errors.password = [error.response.data]
      }
      else if(error.response.status === 404){
        console.log("main.js: Response error captured: 404. Recurso no encontrado. Muestro la vista 404");

        router.push({name:"NotFoundResource"});
      }
      else {
        //Si no conozco el status del error que se devuelve, lo logueo en servidor y muestro un toast
        useGeneralStore().actionShowAlert(i18n.global.t("unknownError"), "danger")
      }

      return Promise.reject(error)
    }
  )

  instance.interceptors.request.use(function(config){
    if(useUserStore().user && useUserStore().user.access_token){
      config.headers.Authorization = "Bearer " + useUserStore().user.access_token
    }

    //TODO
    //Meto en los headers el token de firebase si es que lo tengo
    /*if(store.state.firebaseToken){
        config.headers.firebasetoken = store.state.firebaseToken
    }*/

    return config;
  }, function(error){
    return Promise.reject(error)
  })


export default instance