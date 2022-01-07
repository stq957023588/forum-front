import request from '@/utils/request'
// 数据规则

export function getDataRule(params) {
  return request({
    url: '/data-rule',
    method: 'get',
    params
  })
}

export function addDataRule(data) {
  return request({
    url: '/data-rule',
    method: 'post',
    data
  })
}

export function updateDataRule(data) {
  return request({
    url: '/data-rule',
    method: 'put',
    data
  })
}
// 数据规则组

export function getDataRuleGroup(params) {
  return request({
    url: '/data-rule-group',
    method: 'get',
    params
  })
}

export function addDataRuleGroup(data) {
  return request({
    url: '/data-rule-group',
    method: 'post',
    data
  })
}

export function updateDataRuleGroup(data) {
  return request({
    url: '/data-rule-group',
    method: 'put',
    data
  })
}

export function getDataRuleGroupMember(params) {
  return request({
    url: '/data-rule-group-members',
    method: 'get',
    params
  })
}

export function getDataRuleSelection(params) {
  return request({
    url: '/data-rule-selection',
    method: 'get',
    params
  })
}

export function getDataRuleGroupSelection(params) {
  return request({
    url: '/data-rule-group-selection',
    method: 'get',
    params
  })
}

export function addDataRuleGroupMembers(data) {
  return request({
    url: '/data-rule-group-members',
    method: 'post',
    data
  })
}

export function deleteDataRuleGroupMembers(data) {
  return request({
    url: '/data-rule-group-members',
    method: 'delete',
    data
  })
}

export function getAuthorityDataRuleGroups(params) {
  return request({
    url: '/authority-data-rule-groups',
    method: 'get',
    params
  })
}

export function addAuthorityDataRuleGroups(data) {
  return request({
    url: '/authority-data-rule-groups',
    method: 'post',
    data
  })
}

export function deleteAuthorityDataRuleGroups(data) {
  return request({
    url: '/authority-data-rule-groups',
    method: 'delete',
    data
  })
}

export function getAuthorityDataRuleTree(params) {
  return request({
    url: '/authority-data-rule-tree',
    method: 'get',
    params
  })
}

export function saveRoleAuthorityDataRuleGroup(data) {
  return request({
    url: '/role-authority-data-rule-group',
    method: 'post',
    data
  })
}

export function getCheckedAuthorityDataRuleGroupTreeNodes(params) {
  return request({
    url: '/checked-authority-data-rule-group',
    method: 'get',
    params
  })
}
