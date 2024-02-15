import http from './api.js'

async function registerUser(newUser) {
  return await http.post("registrarse", newUser)
}

async function accountVerify() {
  return await http.get("verificar-cuenta")
}

async function loginUser(theUser) {
  return await http.post('iniciar-sesion', theUser)
}

async function accountRecover(account) {
  return await http.post("recuperar-cuenta", account)
}

async function sendComment(comment) {
  return await http.post("enviar-sugerencia", comment)
}

export default {
  registerUser,
  accountVerify,
  loginUser,
  accountRecover,
  sendComment
}