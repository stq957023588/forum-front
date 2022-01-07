import request from '@/utils/request'

export function getWhiteList(params) {
  return request({
    url: '/white-list',
    method: 'get',
    params
  })
}

export function addWhiteList(data) {
  return request({
    url: '/white-list',
    method: 'post',
    data
  })
}

export function deleteWhiteList(data) {
  return request({
    url: '/white-list',
    method: 'delete',
    data
  })
}
