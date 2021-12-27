import request from '@/utils/request'

export function getRoleMenuTree(params) {
  return request({
    url: '/role-menu-tree',
    method: 'get'
  })
}

export function getMenuTree(params) {
  return request({
    url: '/menu-tree',
    method: 'get',
    params
  })
}

export function getMenus(params) {
  return request({
    url: '/menu',
    method: 'get',
    params
  })
}
export function updateMenu(data) {
  return request({
    url: '/menu',
    method: 'put',
    data
  })
}

export function addMenu(data) {
  return request({
    url: '/menu',
    method: 'post',
    data
  })
}

export function deleteMenu(data) {
  return request({
    url: '/menu',
    method: 'delete',
    data
  })
}

export function getRoleMenus(params) {
  return request({
    url: '/role-menu',
    method: 'get',
    params
  })
}

export function saveRoleMenus(data) {
  return request({
    url: '/role-menu',
    method: 'post',
    data
  })
}
