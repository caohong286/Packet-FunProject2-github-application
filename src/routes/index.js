import repositories from './../pages/repositories/repositories.vue'
import user from './../pages/user/user.vue'


// export default[
//   {
//     path:'/repositories',
//     name:'repositories'
//     //,component:require('./../pages/repositores/repositores.vue')
//     ,component: require('./../pages/repositories/repositories.vue'),
//   },
//   {
//     path:'/user',
//     name:'user',
//     component:require('./../pages/user/user.vue')
//   },
//   {
//     path:'/',
//     redirect:'/repositories'
//   },
//   {
//     path:'/*',
//     redirect:'/repositories'
//   }
//
// ];


export default[
  {
    path:'/repositories',
    name:'repositories'
    ,component: repositories,
  },
  {
    path:'/user',
    name:'user',
    component:user
  },
  {
    path:'/',
    redirect:'/repositories'
  },
  {
    path:'/*',
    redirect:'/repositories'
  }

];
