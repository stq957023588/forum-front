
const Mock = require('mockjs')

const data = Mock.mock([
  {
    path: '/nested',
    component: 'Layout',
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: '/nested/menu1/index', // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: '/nested/menu1/menu1-1/index',
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: '/nested/menu1/menu1-2/index',
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: '/nested/menu1/menu1-2/menu1-2-1/index',
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: '/nested/menu1/menu1-2/menu1-2-2/index',
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: '/nested/menu1/menu1-3/index',
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: '/nested/menu2/index',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: '/layout/index',
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
])

module.exports = [
  {
    url: '/role-menus',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: data
      }
    }
  }
]
