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

async function deleteParticipant(groupId, participantId) {
  return await http.delete("/grupos/"+groupId+"/integrantes/" + participantId)
}

async function resendParticipantInvitation(groupId, participantId) {
  return await http.get("/grupos/"+groupId+"/integrantes/"+participantId+"/reenviar-correo-confirmacion")
}

async function modifyGroup(groupId, groupPayload) {
  return await http.post("grupos/" + groupId, groupPayload)
}

async function celebrateAssignments(groupId) {
  return await http.get(`/grupos/${groupId}/integrantes/celebrar-asignacion`)
}

async function resetGroup(groupId, reset_participants) {
  let payload = {}

  if(reset_participants){
    payload.reiniciar_participantes = true
  }

  return await http.post(`/grupos/${groupId}/reiniciar-grupo`, payload)
}

export default {
  getMyGroups,
  createGroup,
  deleteGroup,
  inviteParticipant,
  massiveInvitation,
  deleteParticipant,
  resendParticipantInvitation,
  modifyGroup,
  celebrateAssignments,
  resetGroup
}