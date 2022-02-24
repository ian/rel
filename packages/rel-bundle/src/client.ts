import Cookies from "js-cookie"

const KEY = "_rel_auth_token"

export function getStoredToken() {
  return Cookies.get(KEY)
}

export function setStoredToken(tok) {
  Cookies.set(KEY, tok)
}
