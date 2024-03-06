import { useGeneralStore } from '@/stores/general.js'
import { useGroupsStore } from '@/stores/groups.js'
import { useUserStore } from '@/stores/user.js'

export const getDateFromString = (datetime) => {
  const date = new Date(datetime)

  return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
}

export const getHourFromString = (datetime) => {
  const date = new Date(datetime)

  return date.getHours()+":"+date.getMinutes().toString().padStart(2,'0')  + "H"
}

export const getDateAndHourFromString = (datetime) => {
  const date = new Date(datetime)

  return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() + " " + date.getHours()+":"+date.getMinutes().toString().padStart(2,'0') + "H"
}

export const getDateAndHourNow = () => {
  const date = new Date()

  return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() + " " + date.getHours()+":"+date.getMinutes().toString().padStart(2,'0') + "H"
}

export const getMonthLiteralAndTwoNumberYear = (datetime) => {
  const date = new Date(datetime)

  return getMonthLiteralGivenDate(date).substring(0,3) + "/" + (date.getFullYear()+"").substring(2)
}

export const getMonthLiteralGivenDate = (date) => {
  switch(date.getMonth()){
    case 0:
      return "enero"
      
    case 1:
      return "febrero"
      
    case 2:
      return "marzo"
      
    case 3:
      return "abril"
      
    case 4:
      return "mayo"
      
    case 5:
      return "junio"
      
    case 6:
      return "julio"

    case 7:
      return "agosto"
      
    case 8:
      return "septiembre"
      
    case 9:
      return "octubre"
      
    case 10:
      return "noviembre"
      
    case 11:
      return "diciembre"
  }
}

export function addIdToProcessing(elementId) {
  useGeneralStore().processing.push(elementId)
}

export function removeIdFromProcessing(elementId) {
  useGeneralStore().processing.splice(useGeneralStore().processing.indexOf(elementId), 1)
}

export function chedkIfIdExistsInProcessing(elementId) {
  return useGeneralStore().processing.indexOf(elementId) !== -1
}

export function checkIfUserIsAdminOfGroup(groupId) {
  var response = false

  if(useGroupsStore().groups && useUserStore().user)
  {
    const filteredGroups = useGroupsStore().groups.filter(item => item.id === groupId)

    if(filteredGroups.length === 1){
      if(filteredGroups.at(0).administrador === useUserStore().user.id){
        response = true
      }
    }
  }

  return response
}

export function closeModalGivenId(id) {
  console.log(id)
  document.querySelector('#'+id+' .closebtn').click()
}

export function closeEveryModal() {
  document.querySelectorAll('.modal .closebtn').forEach(element => {
    element.click()
  })
}