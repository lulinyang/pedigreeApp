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
					name: 'home',
					component: resolve => require(['@/view/home/index/index.vue'], resolve),
				},
				{
					path: '/my',
					name: 'my',
					component: resolve => require(['@/view/home/my/index.vue'], resolve),
				},
				{
					path: '/conversation',
					name: 'conversation',
					component: resolve => require(['@/view/home/conversation/index.vue'], resolve),
				},
				{
					path: '/genealogy',
					name: 'genealogy',
					component: resolve => require(['@/view/home/genealogy/index.vue'], resolve),
				},
				{
					path: '/message',
					name: 'message',
					component: resolve => require(['@/view/home/message/index.vue'], resolve),
				},
			]
		},
		{
			path: '/chat/:id(\\d+)',
			name: 'chat',
			component: resolve => require(['@/view/other/chat/index.vue'], resolve),
		},
		{
			path: '/other',
			component: resolve => require(['@/view/other/index.vue'], resolve),
			children: [
				{
					path: '/words',
					name: 'words',
					component: resolve => require(['@/view/other/words/index.vue'], resolve),
					meta: {title: '发布话题'}
				},
			]
		},
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['@/view/login/login.vue'], resolve),
		},
		{
			path: '/register',
			name: 'register',
			component: resolve => require(['@/view/login/register.vue'], resolve),
		},
	]
})
