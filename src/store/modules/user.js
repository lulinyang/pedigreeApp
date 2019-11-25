// import config from '@/config/index'
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
			state.username = param.username;
			localStorage.setItem('username', param.username);
			state.name = param.name;
			localStorage.setItem('name', param.name);
			state.sex = param.sex;
			localStorage.setItem('sex', param.sex);
			state.headUrl = param.headUrl;
			localStorage.setItem('headUrl', param.headUrl);
		},
	},

	actions: {
		// setUid({ commit }, param) {
		// 	commit('setUid', param);
		// }
	}
}

export default user