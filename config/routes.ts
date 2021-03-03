export default [
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'list.question-list',
    icon: 'table',
    path: '/question',
    component: './question',
  },
  {
    path: '/question/modify',
    name: 'list.question-modify',
    icon: 'smile',
    component: './question/components/modify',
    hideInMenu: true,
  },

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
