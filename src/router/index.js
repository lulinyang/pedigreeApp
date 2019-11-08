import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/index',
			component: resolve => require(['@/view/home/home.vue'], resolve),
			children: [
				{
					path: '/home',
					component: resolve => require(['@/view/home/index/index.vue'], resolve),
				},
				{
					path: '/my',
					component: resolve => require(['@/view/home/my/index.vue'], resolve),
				},
				{
					path: '/conversation',
					component: resolve => require(['@/view/home/conversation/index.vue'], resolve),
				},
				{
					path: '/genealogy',
					component: resolve => require(['@/view/home/genealogy/index.vue'], resolve),
				},
				{
					path: '/message',
					component: resolve => require(['@/view/home/message/index.vue'], resolve),
				},
			]
		},
		
	]
})
