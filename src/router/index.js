import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieRouter from "./Movie"
import CinemaRouter from "./Cinema"
import MineRouter from "./Mine"
import AdminRouter from "./Admin"

Vue.use(VueRouter)


export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: 'maomao',
  routes: [
	MovieRouter,
	CinemaRouter,
	MineRouter,
	AdminRouter,
	{
		path: "/",
		redirect: '/movie'
	}
  ]
})
