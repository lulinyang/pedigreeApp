import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/start'
		},
		{
			path: '/start',
			name: 'start',
			component: resolve => require(['@/view/start/index.vue'], resolve),
		},
		//start-up
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
					path: '/card/:id',
					name: 'card',
					component: resolve => require(['@/view/other/card/index.vue'], resolve),
					meta: { title: '名片' }
				},
				{
					path: '/words/:type(\\d+)',
					name: 'words',
					component: resolve => require(['@/view/other/words/index.vue'], resolve),
					meta: { title: '发布话题' }
				},
				{
					path: '/article/:id(\\d+)',
					name: 'article',
					component: resolve => require(['@/view/other/article/index.vue'], resolve),
					meta: { title: '' }
				},
				{
					path: '/reply/:type(\\d+)/:theme_id(\\d+)/:pid(\\d+)',
					name: 'reply',
					component: resolve => require(['@/view/other/reply/index.vue'], resolve),
					meta: { title: '' }
				},
				{
					path: '/genealogy-comment/:id(\\d+)',
					name: 'genealogy-comment',
					component: resolve => require(['@/view/other/genealogy/comment.vue'], resolve),
					meta: { title: '' }
				},
				{
					path: '/genealogy-details/:id(\\d+)',
					name: 'genealogy-details',
					component: resolve => require(['@/view/other/genealogy/index.vue'], resolve),
					meta: { title: '' }
				},
				{
					path: '/genealogy-member/:id(\\d+)',
					name: 'genealogy-member',
					component: resolve => require(['@/view/other/genealogy/member.vue'], resolve),
					meta: { title: '' }
				},
				{
					path: '/member-info/:id(\\d+)',
					name: 'member-info',
					component: resolve => require(['@/view/other/genealogy/member-info.vue'], resolve),
					meta: { title: '人物简介' }
				},
				{
					path: '/setting',
					name: 'setting',
					component: resolve => require(['@/view/other/setting/index.vue'], resolve),
					meta: { title: '设置' }
				},
				{
					path: '/edit-user',
					name: 'edit-user',
					component: resolve => require(['@/view/other/setting/edit-user.vue'], resolve),
					meta: { title: '编辑资料' }
				},
				{
					path: '/real-name',
					name: 'real-name',
					component: resolve => require(['@/view/other/setting/real-name.vue'], resolve),
					meta: { title: '完善实名信息' }
				},
				{
					path: '/real-success',
					name: 'real-success',
					component: resolve => require(['@/view/other/setting/real-success.vue'], resolve),
					meta: { title: '认证结果' }
				},
				{
					path: '/modify-pwd',
					name: 'modify-pwd',
					component: resolve => require(['@/view/other/setting/modify-pwd.vue'], resolve),
					meta: { title: '修改密码' }
				},
				{
					path: '/talk/:id(\\d+)',
					name: 'talk',
					component: resolve => require(['@/view/other/talk/index.vue'], resolve),
					meta: { title: '话题详情' }
				},
				{
					path: '/ancestralAll',
					name: 'ancestralAll',
					component: resolve => require(['@/view/other/ancestralAll/index.vue'], resolve),
					meta: { title: '宗祠' }
				},
				{
					path: '/ancestral-hall/:id(\\d+)',
					name: 'ancestral-hall',
					component: resolve => require(['@/view/other/ancestralAll/ancestral-hall.vue'], resolve),
					meta: { title: '' }
				},
				{
					path: '/genealogy-hall',
					name: 'genealogy-hall',
					component: resolve => require(['@/view/other/ancestralAll/genealogy.vue'], resolve),
					meta: { title: '宗祠族谱' }
				},
				{
					path: '/add-vote/:id(\\d+)',
					name: 'add-vote',
					component: resolve => require(['@/view/other/vote/add-vote.vue'], resolve),
					meta: { title: '发起投票' }
				},
				{
					path: '/vote-content/:id(\\d+)',
					name: 'vote-content',
					component: resolve => require(['@/view/other/vote/vote-content.vue'], resolve),
					meta: { title: '投票详情' }
				},
				{
					path: '/historyToday',
					name: 'historyToday',
					component: resolve => require(['@/view/other/historyToday/index.vue'], resolve),
					meta: { title: '历史上的今天' }
				},
				{
					path: '/huangli',
					name: 'huangli',
					component: resolve => require(['@/view/other/huangli/index.vue'], resolve),
					meta: { title: '老黄历' }
				},
				{
					path: '/celebrity',
					name: 'celebrity',
					component: resolve => require(['@/view/other/celebrity/index.vue'], resolve),
					meta: { title: '名人烈士' }
				},
				{
					path: '/user-list',
					name: 'user-list',
					component: resolve => require(['@/view/other/userList/index.vue'], resolve),
					meta: { title: '成员列表' }
				},
				{
					path: '/notice-list/:id(\\d+)',
					name: 'notice-list',
					component: resolve => require(['@/view/other/ancestralAll/notice-list.vue'], resolve),
					meta: { title: '宗祠公告' }
				},
				{
					path: '/proposal/:id(\\d+)',
					name: 'proposal',
					component: resolve => require(['@/view/other/ancestralAll/proposal.vue'], resolve),
					meta: { title: '宗祠建议' }
				},
				{
					path: '/add-proposal/:id(\\d+)',
					name: 'add-proposal',
					component: resolve => require(['@/view/other/ancestralAll/add-proposal.vue'], resolve),
					meta: { title: '我要建议' }
				},
				{
					path: '/file-list/:id(\\d+)',
					name: 'file-list',
					component: resolve => require(['@/view/other/ancestralAll/file-list.vue'], resolve),
					meta: { title: '宗祠文件' }
				},
				{
					path: '/add-file/:id(\\d+)',
					name: 'add-file',
					component: resolve => require(['@/view/other/ancestralAll/add-file.vue'], resolve),
					meta: { title: '上传文件' }
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
