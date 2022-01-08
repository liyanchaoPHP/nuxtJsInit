import md5 from 'js-md5'

export default {
    paramSort(obj) {
        const newkey = Object.keys(obj).sort()
        const newObj = {}
        for (let i = 0; i < newkey.length; i++) {
            newObj[newkey[i]] = obj[newkey[i]]
        }
        return newObj
    },
    urlencode(param, key, encode) {
        if (param === null) return ''
        let paramStr = ''
        const t = typeof param
        if (t === 'string' || t === 'number' || t === 'boolean') {
            paramStr += '&' + key + '=' + (encode === null || encode ? param : param)
        } else {
            for (const i in param) {
                const k =
                    key === null || key === undefined ?
                    i :
                    key + (Array.isArray(param) ? '[' + i + ']' : '.' + i)
                param[i] = param[i] === null ? '' : param[i]
                paramStr += this.urlencode(param[i], k, encode)
            }
        }
        return paramStr
    },
    thqs(data) {

        const salt = '65DA9Y8DX36N2'
        const date = new Date()
        const time = Date.parse(date) / 1000
        const params = this.urlencode(this.paramSort(data)).substr(1)
        let hash = ''
        if (params === '') {
            hash = md5(`time=${time}&salt=${salt}`)
        } else {
            hash = md5(`${params}&time=${time}&salt=${salt}`)
        }

        const out = Object.assign(this.paramSort(data), {
            time,
            hash,
        })

        return out
    },
}