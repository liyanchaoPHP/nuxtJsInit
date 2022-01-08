import cookie from '../utils/cookie'

export default function ({ app, req, route, store, redirect, next }) {
  // If the user is not authenticated
  let token = ''
  let expires = 0
  // const path = process.server ? req.path : route.path
  const path = route.path
  if (process.client) {
    // 获取cookie里面的token信息
    token = cookie.get('mbattoken')
    // 获取token存入时间
    expires = cookie.get('expires')
  } else {
    const serverCookie = cookie.getcookiesInServer(req)
    token = serverCookie.mbattoken
    expires = serverCookie.expires
  }
   //console.log('路径：'+path)
   //console.log('过期时间：'+expires)

  if (token === '' || token === undefined || token === null) {
    if (path !== '/login') {
      redirect('/login')
    }
  }else{
    if (path === '/login') {
      redirect('/')
    }
  }
}
