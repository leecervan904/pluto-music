import { showToast } from 'vant'

const hooks = {
  created (el, binding) {
    const { value } = binding
    el.addEventListener('click', function (e) {
      showToast({
        type: 'success',
        message: `${value} 功能正在开发中...`,
        className: 'toast--success'
      })
    })
  }
}

export default {
  name: 'coming',
  hooks
}
