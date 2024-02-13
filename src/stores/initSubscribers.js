import { useUserStore } from '@/stores/user.js'
import { useGroupsStore } from '@/stores/groups.js'

const initSubscribers = () => {
  useUserStore().$subscribe((mutation, state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('user', JSON.stringify(state.user))
  })

  useGroupsStore().$subscribe((mutation, state) => {
    localStorage.setItem("groups", JSON.stringify(state.groups))
  })
}
export default initSubscribers
