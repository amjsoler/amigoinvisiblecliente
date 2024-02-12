import { useUserStore } from '@/stores/user.js'

const initSubscribers = () => {
  useUserStore().$subscribe((mutation, state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('user', JSON.stringify(state.user))
  })
}
export default initSubscribers
