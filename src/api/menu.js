import request from '@/utils/request'

export function getRoleMenus(params) {
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

export function addMenu(params) {
  return request({
    url: '/menu',
    method: 'post',
    params
  })
}
