// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: {
              title: 'menu.dashboard.analysis', keepAlive: false, hidden: true
            }
          },
          // 外部链接
          // {
          //   path: 'https://www.baidu.com/',
          //   name: 'Monitor',
          //   meta: { titl/e: 'menu.dashboard.monitor', target: '_blank' }
          // },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {
              title: 'menu.dashboard.workplace', keepAlive: true, hidden: true
            }
          }
        ]
      },
      // 信息上报
      {
        path: '/info',
        redirect: '/info/submissionCenter',
        component: RouteView,
        meta: { title: 'menu.info', icon: 'form', },
        children: [
          {
            path: '/info/submissionCenter',
            name: 'AnnualSubmissionCenter',
            component: () => import('@/views/info/infoSubmission/AnnualSubmissionCenter'),
            meta: { title: 'menu.info.infoSubmission', keepAlive: true, },
            // hidden: true
          },
          {
            path: '/info/PreviousReports',
            name: 'PreviousReports',
            component: () => import('@/views/info/PreviousReports/PreviousReports'),
            meta: { title: 'menu.info.previousReports', keepAlive: true, },
            // hidden: true
          },
          // {
          //   path: '/info/base-form',
          //   name: 'BaseForm',
          //   component: () => import('@/views/info/basicForm'),
          //   meta: { title: 'menu.info.basic-form', keepAlive: true, }
          // },
          // {
          //   path: '/info/step-form',
          //   name: 'StepForm',
          //   // redirect: '/info/advanced-form',
          //   component: () => import('@/views/info/stepForm/StepForm'),
          //   meta: { title: 'menu.info.step-form', keepAlive: true, }
          // },
          // {
          //   path: '/info/advanced-form',
          //   name: 'AdvanceForm',
          //   component: () => import('@/views/info/advancedForm/AdvancedForm'),
          //   meta: { title: 'menu.info.advanced-form', keepAlive: true, },
          //   hidden: true
          // },
          {
            path: '/info/submission',
            name: 'InfoSubmission',
            component: () => import('@/views/info/infoSubmission/infoSubmission'),
            meta: { title: 'menu.info.infoSubmission', keepAlive: true, },
            hidden: true
          },

        ]
      },
      // 碳币交易
      {
        path: '/trade',
        name: 'trade',
        component: RouteView,
        redirect: '/trade/table-list',
        meta: { title: 'menu.trade', icon: 'transaction', permission: ['trade'] },
        children: [
          {
            path: '/trade/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/trade/TableList'),
            meta: { title: 'menu.trade.table-list', keepAlive: true, permission: ['trade'] }
          },
          {
            path: '/trade/basic-list',
            name: 'BasicList',
            component: () => import('@/views/trade/BasicList'),
            meta: { title: 'menu.trade.basic-list', keepAlive: true, permission: ['trade'] }
          },
          {
            path: '/trade/card',
            name: 'CardList',
            component: () => import('@/views/trade/CardList'),
            meta: { title: 'menu.trade.card-list', keepAlive: true, permission: ['trade'] }
          },
          {
            path: '/trade/search',
            name: 'SearchList',
            component: () => import('@/views/trade/search/SearchLayout'),
            redirect: '/trade/search/article',
            meta: { title: 'menu.trade.search-list', keepAlive: true, permission: ['trade'] },
            children: [
              {
                path: '/trade/search/article',
                name: 'SearchArticles',
                component: () => import('../views/trade/search/Article'),
                meta: { title: 'menu.trade.search-list.articles', permission: ['trade'] }
              },
              {
                path: '/trade/search/project',
                name: 'SearchProjects',
                component: () => import('../views/trade/search/Projects'),
                meta: { title: 'menu.trade.search-list.projects', permission: ['trade'] }
              },
              {
                path: '/trade/search/application',
                name: 'SearchApplications',
                component: () => import('../views/trade/search/Applications'),
                meta: { title: 'menu.trade.search-list.applications', permission: ['trade'] }
              }
            ]
          }
        ]
      },

      // profile
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: RouteView,
      //   redirect: '/profile/basic',
      //   meta: { title: 'menu.profile', icon: 'profile', permission: ['profile'] },
      //   children: [
      //     {
      //       path: '/profile/basic',
      //       name: 'ProfileBasic',
      //       component: () => import('@/views/profile/basic'),
      //       meta: { title: 'menu.profile.basic', permission: ['profile'] }
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'ProfileAdvanced',
      //       component: () => import('@/views/profile/advanced/Advanced'),
      //       meta: { title: 'menu.profile.advanced', permission: ['profile'] }
      //     }
      //   ]
      // },

      // // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: RouteView,
      //   redirect: '/result/success',
      //   meta: { title: 'menu.result', icon: 'check-circle-o', permission: ['result'] },
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
      //       meta: { title: 'menu.result.success', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
      //       meta: { title: 'menu.result.fail', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      //     }
      //   ]
      // },

      // // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: 'menu.exception.not-find', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: 'menu.exception.server-error', permission: ['exception'] }
      //     }
      //   ]
      // },

      // account
      // {
      //   path: '/account',
      //   component: RouteView,
      //   redirect: '/account/settings',
      //   name: 'account',
      //   meta: { title: 'menu.account', icon: 'user', keepAlive: true, },
      //   children: [
      //     // {
      //     //   path: '/account/center',
      //     //   name: 'center',
      //     //   component: () => import('@/views/account/center'),
      //     //   meta: { title: 'menu.account.center', keepAlive: true, }
      //     // },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('@/views/account/settings/Index'),
      //       meta: { title: 'menu.account.settings', hideHeader: true, },
      //       redirect: '/account/settings/basic',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/account/settings/basic',
      //           name: 'BasicSettings',
      //           component: () => import('@/views/account/settings/BasicSetting'),
      //           meta: { title: 'account.settings.menuMap.basic', hidden: true, }
      //         },
      //         {
      //           path: '/account/settings/security',
      //           name: 'SecuritySettings',
      //           component: () => import('@/views/account/settings/Security'),
      //           meta: {
      //             title: 'account.settings.menuMap.security',
      //             hidden: true,
      //             keepAlive: true,

      //           }
      //         },
      //         {
      //           path: '/account/settings/custom',
      //           name: 'CustomSettings',
      //           component: () => import('@/views/account/settings/Custom'),
      //           meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, }
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           name: 'BindingSettings',
      //           component: () => import('@/views/account/settings/Binding'),
      //           meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, }
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           name: 'NotificationSettings',
      //           component: () => import('@/views/account/settings/Notification'),
      //           meta: {
      //             title: 'account.settings.menuMap.notification',
      //             hidden: true,
      //             keepAlive: true,

      //           }
      //         }
      //       ]
      //     }
      //   ]
      // },

      {
        path: '/account',
        // component: RouteView,
        component: () => import('@/views/account/settings/Index'),
        redirect: '/account/basic',
        name: 'account',
        meta: { title: 'menu.account', icon: 'user', keepAlive: true },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/account/basic',
            name: 'BasicSettings',
            component: () => import('@/views/account/settings/BasicSetting'),
            meta: { title: 'account.settings.menuMap.basic', hidden: true, }
          },
          {
            path: '/account/security',
            name: 'SecuritySettings',
            component: () => import('@/views/account/settings/Security'),
            meta: {
              title: 'account.settings.menuMap.security',
              hidden: true,
              keepAlive: true,

            }
          },
          {
            path: '/account/custom',
            name: 'CustomSettings',
            component: () => import('@/views/account/settings/Custom'),
            meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, }
          },
          {
            path: '/account/binding',
            name: 'BindingSettings',
            component: () => import('@/views/account/settings/Binding'),
            meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, }
          },
          {
            path: '/account/notification',
            name: 'NotificationSettings',
            component: () => import('@/views/account/settings/Notification'),
            meta: {
              title: 'account.settings.menuMap.notification',
              hidden: true,
              keepAlive: true,

            }
          }
        ]
      }

      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
