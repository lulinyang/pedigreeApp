import config from '@/config/index'
import VueCookies from 'vue-cookies'
const user = {
	getters: {
		uid: state => {
			return state.uid;
		},
		username: state => {
			return state.username;
		},
		name: state => {
			return state.name;
		},
		sex: state => {
			return state.sex;
		},
		headUrl: state => {
			return state.headUrl;
		},
	},
	state: {
		uid: VueCookies.get('uid'),
		username: VueCookies.get('username'),
		name: VueCookies.get('name'),
		sex: VueCookies.get('sex'),
		headUrl: VueCookies.get('headUrl'),
	},
	mutations: {
		setUid: (state, param) => {
			state.uid = param;
			VueCookies.set('uid', param);
		},
		logout: (state, param) => {
			state.uid = param;
			VueCookies.remove('uid');
		},
		setUserInfo: (state, param) => {
			window.console.log('state, param', state, param);
			state.username = param.username;
			VueCookies.set('username', param.username);
			state.name = param.name;
			VueCookies.set('name', param.name);
			state.sex = param.sex;
			VueCookies.set('sex', param.sex);
			if (param.headUrl) {
				state.headUrl = config.baseUrl + param.headUrl;
				VueCookies.set('headUrl', config.baseUrl + param.headUrl);
			} else {
				if (param.sex * 1 === 0) {
					state.headUrl = 'static/images/default_woman.png';
					VueCookies.set('headUrl', 'static/images/default_woman.png');
				} else if (param.sex * 1 === 1) {
					state.headUrl = 'static/images/default_man.png';
					VueCookies.set('headUrl', 'static/images/default_man.png');
				}
			}
		},
	},

	actions: {
		// setUid({ commit }, param) {
		// 	commit('setUid', param);
		// }
	}
}

export default user