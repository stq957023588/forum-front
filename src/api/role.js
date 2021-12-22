import request from '@/utils/request'

export function getRoles(params) {
  request({
    url: '/roles',
    method: 'get',
    params
  })
}
