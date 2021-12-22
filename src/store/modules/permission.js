import { constantRoutes } from '@/router'
import { getRoleMenus } from '@/api/menu'
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const initDatabaseRoutes = menus => {
  for (let i = 0; i < menus.length; i++) {
    const component = menus[i].component
    if (component === 'Layout') {
      menus[i].component = Layout
    } else {
      menus[i].component = resolve => require([`@/views${component}`], resolve)
    }
    // menus[i].component = resolve => require([component], resolve)
    if (menus[i].children) {
      initDatabaseRoutes(menus[i].children)
    }
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      getRoleMenus().then(response => {
        initDatabaseRoutes(response.data)
        let accessedRoutes
        console.log(response.data)
        if (roles.includes('admin')) {
          accessedRoutes = response.data || []
        } else {
          accessedRoutes = filterAsyncRoutes(response.data, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
