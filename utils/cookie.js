import Cookies from 'js-cookie'

export default {
    get(key) {
        return Cookies.get(key)
    },
    set(key, value) {
        // const inFifteenMinutes = new Date(new Date().getTime() + 6 * 60 * 60 * 1000) // 6个小时有效期
        return Cookies.set(key, value, {
            expires: 1, // 1天有效期
        })
    },
    remove(key) {
        return Cookies.remove(key)
    },
    getcookiesInServer(req) {
        // eslint-disable-next-line camelcase
        const service_cookie = {}
        req &&
            req.headers.cookie &&
            req.headers.cookie.split(';').forEach(function(val) {
                const parts = val.split('=')
                service_cookie[parts[0].trim()] = (parts[1] || '').trim()
            })
        return service_cookie
    },
}