import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2d92d3f6 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _e39a59b6 = () => interopDefault(import('..\\pages\\editor.vue' /* webpackChunkName: "pages/editor" */))
const _5ad3d83e = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _fee513be = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _35f7254a = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _08ee70ca = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _2cf34c78 = () => interopDefault(import('..\\pages\\index\\index.vue' /* webpackChunkName: "pages/index/index" */))
const _749bdcf2 = () => interopDefault(import('..\\pages\\index\\articles.vue' /* webpackChunkName: "pages/index/articles" */))
const _2793faf6 = () => interopDefault(import('..\\pages\\index\\essence.vue' /* webpackChunkName: "pages/index/essence" */))
const _41d44bbe = () => interopDefault(import('..\\pages\\index\\school.vue' /* webpackChunkName: "pages/index/school" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _2d92d3f6,
    name: "about"
  }, {
    path: "/editor",
    component: _e39a59b6,
    name: "editor"
  }, {
    path: "/login",
    component: _5ad3d83e,
    name: "login"
  }, {
    path: "/profile",
    component: _fee513be,
    name: "profile"
  }, {
    path: "/register",
    component: _35f7254a,
    name: "register"
  }, {
    path: "/",
    component: _08ee70ca,
    children: [{
      path: "",
      component: _2cf34c78,
      name: "index"
    }, {
      path: "articles",
      component: _749bdcf2,
      name: "index-articles"
    }, {
      path: "essence",
      component: _2793faf6,
      name: "index-essence"
    }, {
      path: "school",
      component: _41d44bbe,
      name: "index-school"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
