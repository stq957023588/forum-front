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

export function deleteRole(data) {
  return request({
    url: '/role',
    method: 'delete',
    data
  })
}

export function getUserRoles(params) {
  return request({
    url: '/user-role',
    method: 'get',
    params
  })
}

export function addUserRoles(data) {
  return request({
    url: '/user-role',
    method: 'post',
    data
  })
}

export function deleteUserRole(data) {
  return request({
    url: '/user-role',
    method: 'delete',
    data
  })
}

export function getReverseUserRoles(params) {
  return request({
    url: '/reverse-user-role',
    method: 'get',
    params
  })
}
