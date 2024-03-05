import http from './api.js'

async function registerUser(newUser) {
  return await http.post("registrarse", newUser)
}

async function accountVerify() {
  return await http.get("verificar-cuenta")
}

async function checkAccountVerification() {
  return await http.get("comprobar-verificacion-cuenta")
}
async function loginUser(theUser) {
  return await http.post('iniciar-sesion', theUser)
}

async function loginUserWithGoogle(payload) {
  return await http.post('google-login', payload)
}

async function accountRecover(account) {
  return await http.post("recuperar-cuenta", account)
}

async function sendComment(comment) {
  return await http.post("enviar-sugerencia", comment)
}

async function deleteAccount() {
  return await http.get("eliminar-cuenta")
}

async function changePassword(changePasswordPayload) {
  return await http.post("cambiar-contrasena", changePasswordPayload)
}

async function changeAccountSettings(changeAccountSettingsPayload) {
    return await http.post("ajustes-cuenta", changeAccountSettingsPayload)
}

export default {
  registerUser,
  accountVerify,
  checkAccountVerification,
  loginUser,
  accountRecover,
  sendComment,
  deleteAccount,
  changePassword,
  changeAccountSettings,
  loginUserWithGoogle
}