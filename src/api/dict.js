import request from '@/utils/request'

export function getDictType(params) {
  return request({
    url: '/dict-type',
    method: 'get',
    params
  })
}

export function addDictType(data) {
  return request({
    url: '/dict-type',
    method: 'post',
    data
  })
}

export function updateDictType(data) {
  return request({
    url: '/dict-type',
    method: 'put',
    data
  })
}

export function deleteDictType(data) {
  return request({
    url: '/dict-type',
    method: 'delete',
    data
  })
}

export function getDict(params) {
  return request({
    url: '/dict',
    method: 'get',
    params
  })
}

export function addDict(data) {
  return request({
    url: '/dict',
    method: 'post',
    data
  })
}

export function updateDict(data) {
  return request({
    url: '/dict',
    method: 'put',
    data
  })
}

export function deleteDict(data) {
  return request({
    url: '/dict',
    method: 'delete',
    data
  })
}
