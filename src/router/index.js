import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = r => require.ensure([], () => r(require('@/components/login/login')), 'login');
const customerdetail = r => require.ensure([], () => r(require('@/components/customer/detail')), 'customerdetail');

const routes = [
	{
		path: '/login',
		component: login
	},
	{
		path: '/customer/detail',
		component: customerdetail,
		name: 'customerdetail',
		meta: []
	}
	// {
	// 	path: '/customer',
	// 	children: [{
	// 		path: '/detail',
	// 		component: customerdetail,
	// 		meta: [],
	// 	}]
	// }
]

export default new Router({
	mode: 'history',
	routes,
	strict: process.env.NODE_ENV !== 'production',
})