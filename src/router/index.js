import { createRouter, createWebHistory } from 'vue-router'
import { useValidationStore } from '@/stores/validation.js'
import { useUserStore } from '@/stores/user.js'
import LoginUser from '@/views/authentication/LoginUser.vue'
import AccountRecovery from '@/views/authentication/AccountRecovery.vue'
import RegisterUser from '@/views/authentication/RegisterUser.vue'
import AccountVerify from '@/views/authentication/AccountVerify.vue'
import MyGroups from '@/views/grupos/MyGroups.vue'
import ForbiddenResource from '@/views/ForbiddenResource.vue'
import NotFoundResource from '@/views/NotFoundResource.vue'
import ShowGroup from '@/views/grupos/ShowGroup.vue'
import DeleteGroup from '@/views/grupos/DeleteGroup.vue'
import MyAccount from '@/views/user/MyAccount.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EnterUrl',
      redirect: () => {
        return {name: "MyGroups"}
      }
    },
    {
      path: "/login-user",
      name: "LoginUser",
      component: LoginUser,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register-user',
      name: 'RegisterUser',
      component: RegisterUser,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/account-verify',
      name: 'AccountVerify',
      component: AccountVerify,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account-recovery',
      name: 'AccountRecovery',
      component: AccountRecovery,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/my-groups',
      name: 'MyGroups',
      component: MyGroups,
      meta: {
        requiresAuth: true,
        footerMenu: true
      }
    },
    {
      path: '/my-groups/:id',
      name: 'ShowGroup',
      component: ShowGroup,
      meta: {
        requiresAuth: true,
        footerMenu: true
      }
    },
    {
      path: '/my-account',
      name: 'MyAccount',
      component: MyAccount,
      meta: {
        requiresAuth: true,
        footerMenu: true
      }
    },
    //TODO: Forbidden view
    {
      path: '/forbidden-resource',
      name: "ForbiddenResource",
      component: ForbiddenResource
    },

    //TODO: Not found view
    {
      path: '/not-found-resource',
      name: "NotFoundResource",
      component: NotFoundResource
    },

    //TODO: REMOVE
    {
      path: '/prueba-componente',
      name: "PruebaComponente",
      component: DeleteGroup
    }
  ]
})

router.beforeEach((to, from, next) => {
  //Vacío el store de validaciones
  useValidationStore().$reset()


  var primerRequires = false;

  //Comprobamos si la ruta de destino precisa autenticación
  if (!primerRequires && to.matched.some((record) => record.meta.requiresAuth)) {
    console.log("router/index.js: requiresAuth detected. Checking...");

    //Compruebo si hay token en el user, si lo hay, dejo seguir, si no, redirijo al login
    if(!useUserStore().user || !useUserStore().user.access_token){
      console.log("router/index.js: No hay token, redirijo al login")
      primerRequires = true;

      next({name: "LoginUser"});
    }
  }

  if (!primerRequires && to.matched.some((record) => record.meta.requiresGuest)) {
    console.log("router/index.js: requiresGuest detected. Checking...");

    if(useUserStore().user && useUserStore().user.access_token){
      console.log("router/index.js: Hay un token guardado, redirijo a GymClasses")
      primerRequires = true;

      next({name: "MyGroups"})
    }
  }

  if(!primerRequires){
    next();
  }
})

export default router
