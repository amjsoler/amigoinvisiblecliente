import http from "./api.js"

async function getMyGroups() {
  return await http.get("mis-grupos")
}

async function createGroup(newGroup) {
  return await http.post("grupos", newGroup)
}

async function deleteGroup(groupId) {
  return await http.delete("grupos/" + groupId)
}

async function inviteParticipant(groupId, newParticipant){
  return await http.post("grupos/" + groupId + "/integrantes", newParticipant)
}

async function massiveInvitation(groupId, newParticipants) {
  return await http.post("grupos/" + groupId + "/integrantes/creacion-masiva", newParticipants)
}

export default {
  getMyGroups,
  createGroup,
  deleteGroup,
  inviteParticipant,
  massiveInvitation
}