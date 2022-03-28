export default [
  {
    path: '',
    name: 'root',
    component: () => import('./Layout'),
    children: [
    ],
  },

  { path: '*', redirect: { name: 'root' } },
]
