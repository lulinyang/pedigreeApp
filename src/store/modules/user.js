import config from '@/config/index'
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
		uid: localStorage.getItem('uid'),
		username: localStorage.getItem('username'),
		name: localStorage.getItem('name'),
		sex: localStorage.getItem('sex'),
		headUrl: localStorage.getItem('headUrl'),
	},
	mutations: {
		setUid: (state, param) => {
			state.uid = param;
			localStorage.setItem('uid', param);
		},
		logout: (state, param) => {
			state.uid = param;
			localStorage.removeItem('uid');
		},
		setUserInfo: (state, param) => {
			window.console.log('state, param', state, param);
			state.username = param.username;
			localStorage.setItem('username', param.username);
			state.name = param.name;
			localStorage.setItem('name', param.name);
			state.sex = param.sex;
			localStorage.setItem('sex', param.sex);
			if (param.headUrl) {
				state.headUrl = config.baseUrl + param.headUrl;
				localStorage.setItem('headUrl', config.baseUrl + param.headUrl);
			} else {
				if (param.sex * 1 === 0) {
					state.headUrl = 'static/images/default_woman.png';
					localStorage.setItem('headUrl', 'static/images/default_woman.png');
				} else if (param.sex * 1 === 1) {
					state.headUrl = 'static/images/default_man.png';
					localStorage.setItem('headUrl', 'static/images/default_man.png');
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