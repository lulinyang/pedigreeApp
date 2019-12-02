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
		userInfo: state => {
			return state.userInfo;
		},
	},
	state: {
		uid: localStorage.getItem('uid'),
		userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
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
			state.userInfo = param;
			localStorage.setItem('userInfo', JSON.stringify(param));
		},
	},

	actions: {
		// setUid({ commit }, param) {
		// 	commit('setUid', param);
		// }
	}
}

export default user