// import http from '@/http/server/api'
import VueCookies from 'vue-cookies'
const user = {
	getters: {
		uid: state => {
			return state.uid;
		}
	},
	state: {
		uid: VueCookies.get('uid')
	},
	mutations: {
		setUid: (state, param) => {
			state.uid = param;
			VueCookies.set('uid', param);
		},
		logout: (state, param) => {
			state.uid = param;
			VueCookies.remove('uid');
		}
	},

	actions: {
		// setUid({ commit }, param) {
		// 	commit('setUid', param);
		// }
	}
}

export default user