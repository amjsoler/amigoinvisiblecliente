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

export default {
  getMyGroups,
  createGroup,
  deleteGroup
}