/* eslint-disable no-undef */
import Vue from 'vue'
import { Message, Loading } from 'element-ui'
import crypto from '@/utils/crypto'


// import { push } from 'core-js/core/array'
const globalData = {
  install(Vue) {
    Vue.prototype.globalData = {
      _PAGESIZES: [20, 50, 100, 200], // 默认第一个是15
      _TABLELAYOUT: 'total, sizes, prev, pager, next, jumper',
      // uniqueNumReg: /^[a-zA-Z]([-_a-zA-Z0-9]{6,20})$/, // 字母/数字/下划线/横杠=>用户名、编号等唯一标识
      uniqueNumReg: /^[\w-]{3,20}$/, // 字母/数字/下划线/横杠，长度为3-20个字符=>用户名、编号等唯一标识，\w==>匹配字母、数字、下划线。等价于 [A-Za-z0-9_]
      telReg: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
      idCardReg:
        /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      emailReg: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      numReg: /^[0-9]*$/,
      enNameReg: /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/,
      letterReg: /^[a-zA-Z\d]+$/,
      bigLetterReg: /^[A-Z\d]+$/,
      landlineReg: /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
      effectiveNumReg: /^100$|^(\d|[1-9]\d)(\.\d+)*$/,

      LoadingOptions: {
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: '正在加载...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.3)', // 背景颜色
        target: '.sub-main', // 需要遮罩的区域
        body: true,
        customClass: 'mask', // 遮罩层新增类名
      },

      /**
       *
       * @param {*} api
       * @param {*} field   api[field]
       * @param {*} params  参数
       * @param {*} callback  successFn（） errorFn（）  catchFn（）
       */

      requestFn(api, field, params, callback) {
        api[field](params)
          .then((res) => {
            // 请求完成---------------------------------
            if (res.status) {
              // ------------成功回调
              if (callback && callback.successFn) {
                callback.successFn({ ...res.data, message: res.message })
              }
            } else {
              // ------------错误提示
              Message({
                type: 'error',
                message: res.message || '请求失败',
                dangerouslyUseHTMLString: true,
              })
              // ------------失败回调
              if (callback && callback.errorFn) {
                callback.errorFn({ ...res.data, message: res.message })
              }
            }
            // 请求完成---------------------------------
            if (callback && callback.completeFn) {
              callback.completeFn(res.data)
            }
          })
          .catch((res) => {
            Message({
              type: 'error',
              message: res.message || '请求异常，请刷新重试',
              dangerouslyUseHTMLString: true,
            })
            // ------------------catch回调
            if (callback && callback.catchFn) {
              catchFn({ ...res.data, message: res.message })
            }
          })
      },

      /**
       *
       * @param {*} uploadCatalog number，上传文件的的目录id
       * @param {*} fileName number，0：生成随机文件名，1：保留文件名称
       * @returns
       */
      uploadFn: (uploadCatalog, fileName) => {
        return `/api/eportal/upload/upload/${uploadCatalog}/${fileName}`
      },

      filePrefixUrl: 'http://dlhs.ofapp.net/',
      prefixFileUrlFn: (arr) => {
        const newArr = []

        if (arr) {
          arr.forEach((_el) => {
            newArr.push({
              ..._el,
              url: 'http://dlhs.ofapp.net/' + _el.url,
              fileUrl: _el.url,
            })
          })
          return newArr
        }
      },

      /**
       * 表单校验定位
       *  文本框-下拉框-单/多选-日期选择器-文件
       */
      formFocusPosition() {
        setTimeout(() => {
          const isError = document.getElementsByClassName('is-error')
          isError[0].querySelector('input').focus()
        }, 100)
      },

      /**
       * 
       * 参数加密
       * @param {*} that 调用该方法的实例对象
       * @param {*} path 路径
       * @param {*} params 参数，对象
       */
      navigationEncrypt(that, path, params) {
        let query = ''
        console.log('加密前的参数');
        console.log(params);
        if (params) {
          query = crypto.encrypt(JSON.stringify(params))
        }
        that.$router.push({
          path: path,
          query: {
            key: query
          }
        })
      },

      /**
       * 
       * 参数解密
       * @param {*} params 需要解密的参数
       * @returns 返回解密后的结果，对象
       */
      navigationDncrypt(params) {
        let query = {}
        if (params) {
          query = JSON.parse(crypto.decrypt(params))
        }
        console.log('解密后的参数');
        console.log(query);

        return query
      },
    }
  },
}

Vue.use(globalData)
