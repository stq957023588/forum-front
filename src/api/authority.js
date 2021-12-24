import request from '@/utils/request'

export function getAuthorities(params) {
  return request({
    url: '/authority',
    method: 'get',
    params
  })
}

export function getRoleAuthority(params) {
  return request({
    url: '/role-authority',
    method: 'get',
    params
  })
}

export function updateAuthority(data) {
  return request({
    url: '/authority',
    method: 'put',
    data
  })
}

export function addAuthority(data) {
  return request({
    url: '/authority',
    method: 'post',
    data
  })
}

