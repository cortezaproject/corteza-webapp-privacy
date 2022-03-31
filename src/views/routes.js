export default [
  {
    path: '',
    name: 'root',
    redirect: 'dashboard',
    component: () => import('./Layout'),
    children: [
      { name: 'dashboard', path: '/dashboard', component: () => import('./Privacy/Dashboard') },
      { name: 'data-overview', path: '/data-overview', component: () => import('./Privacy/DataOverview') },
      { name: 'data-overview.profile', path: '/data-overview/profile', component: () => import('./Privacy/DataOverview/Profile') },
      { name: 'data-overview.application', path: '/data-overview/application', component: () => import('./Privacy/DataOverview/Application') },
      { name: 'request.list', path: '/request/list', component: () => import('./Privacy/Request/List') },
      { name: 'request.export', path: '/request/export/:requestID?', component: () => import('./Privacy/Request/Export') },
      { name: 'request.deletion', path: '/request/deletion/:requestID?', component: () => import('./Privacy/Request/Deletion') },
    ],
  },

  { path: '*', redirect: { name: 'root' } },
]
