import Cookies from 'js-cookie'

export function getToken(tokenKey = 'sessionid') {
  return Cookies.get(tokenKey)
}

export function setToken (token, tokenKey = 'sessionid') {
  return Cookies.set(tokenKey, token)
}

export function removeToken (tokenKey = 'sessionid') {
  return Cookies.remove(tokenKey)
}