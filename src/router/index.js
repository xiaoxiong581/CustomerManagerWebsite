import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

const login = r => require.ensure([], () => r(require('@/components/common/login')), 'login');
const register = r => require.ensure([], () => r(require('@/components/common/register')), 'register');
const home = r => require.ensure([], () => r(require('@/components/common/home')), 'home');
const customerdetail = r => require.ensure([], () => r(require('@/components/customer/detail')), 'customerdetail');
const customerlist = r => require.ensure([], () => r(require('@/components/customer/list')), 'customerlist');

const routes = [
	{
		path: '/login',
		component: login,
		name: 'login'
	},
	{
		path: '/register',
		component: register,
		name: 'register'
	},
	{
		path: '/customer',
		component: home,
		name: 'home',
		meta: { requireAuth: true },
		children: [
			{
				path: '/detail',
				component: customerdetail,
				name: 'customerdetail',
				meta: { requireAuth: true, menu: ['用户管理', '用户详情'] }
			},
			{
				path: '/list',
				component: customerlist,
				name: 'customerlist',
				meta: { requireAuth: true, menu: ['用户管理', '用户列表'] }

			}
		]
	}
]

export default new Router({
	base: '/',
	mode: 'history',
	routes,
	strict: process.env.NODE_ENV !== 'production',
})