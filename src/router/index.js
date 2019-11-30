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
				{
					path: '/article/:id(\\d+)',
					name: 'article',
					component: resolve => require(['@/view/other/article/index.vue'], resolve),
					meta: {title: ''}
				},
				{
					path: '/reply/:type(\\d+)/:theme_id(\\d+)/:pid(\\d+)',
					name: 'reply',
					component: resolve => require(['@/view/other/reply/index.vue'], resolve),
					meta: {title: ''}
				},
				{
					path: '/genealogy-comment/:id(\\d+)',
					name: 'genealogy-comment',
					component: resolve => require(['@/view/other/genealogy/comment.vue'], resolve),
					meta: {title: ''}
				},
				{
					path: '/genealogy-details/:id(\\d+)',
					name: 'genealogy-details',
					component: resolve => require(['@/view/other/genealogy/index.vue'], resolve),
					meta: {title: ''}
				},
				{
					path: '/setting',
					name: 'setting',
					component: resolve => require(['@/view/other/setting/index.vue'], resolve),
					meta: {title: '设置'}
				},
				{
					path: '/edit-user',
					name: 'edit-user',
					component: resolve => require(['@/view/other/setting/edit-user.vue'], resolve),
					meta: {title: '编辑资料'}
				},
				{
					path: '/talk/:id(\\d+)',
					name: 'talk',
					component: resolve => require(['@/view/other/talk/index.vue'], resolve),
					meta: {title: '话题详情'}
				},
				{
					path: '/historyToday',
					name: 'historyToday',
					component: resolve => require(['@/view/other/historyToday/index.vue'], resolve),
					meta: {title: '历史上的今天'}
				},
				{
					path: '/huangli',
					name: 'huangli',
					component: resolve => require(['@/view/other/huangli/index.vue'], resolve),
					meta: {title: '老黄历'}
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
		{
			path: '/rest',
			name: 'rest',
			component: resolve => require(['@/view/login/rest.vue'], resolve),
		},
	]
})
