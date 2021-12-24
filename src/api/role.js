import request from '@/utils/request'

export function getRoles(params) {
  return request({
    url: '/role',
    method: 'get',
    params
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}
export function updateRole(data) {
  return request({
    url: '/role',
    method: 'put',
    data
  })
}
