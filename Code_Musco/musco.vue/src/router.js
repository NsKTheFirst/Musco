import Vue from 'vue'
import Router from 'vue-router'
import auth from "./utils/auth";
import Accueil from './views/Accueil.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    // {
    //   path: '/annonce/:id',
    //   name: 'AnnonceDetail',
    //   component: () => import('./components/Annonces/AnnonceDetail.vue')
    // }

    {
      path: '/annonces',
      name: 'annonces',
      component: () => import('./components/Annonces/PageAnnonces')
    },

    {
      path: '/faq',
      name: 'faq',
      component: () => import('./components/Faq')
    },

    {
      path: '/mentions',
      name: 'mentions',
      component: () => import('./components/MentionsLegales')
    },

    {
      path: "/dashboard",
      name: "dashboard",
      beforeEnter: (to, from, next) => {
        if (!auth.getLocalToken()) next("/login");
        else next();
      },
      children: [
        {
          name: "my-dashboard",
          path: "me",
          component: () =>
            import(/* webpackChunkName: "dashboard-me" */ "./views/DashboardMe.vue")
        },
        {
          name: "user-manager",
          path: "manage-users",
          component: () =>
            import(/* webpackChunkName: "dashboard-users" */ "./views/DashboardUsersManager.vue")
        },
        // {
        //   name: "user-products",
        //   path: "manage-products",
        //   component: () =>
        //     import(/* webpackChunkName: "dashboard" */ "./views/DashboardProductsManager.vue")
        // }
      ],
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./views/Dashboard.vue")
    },
  ]
})
