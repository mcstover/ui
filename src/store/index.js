import Vue from 'vue';
import Vuex from 'vuex';

import createLoanModule from './modules/loan';
import createMyModule from './modules/my';

Vue.use(Vuex);

export default function createStore({ apolloClient }) {
	return new Vuex.Store({
		modules: {
			loan: createLoanModule(apolloClient),
			my: createMyModule(apolloClient),
		},
	});
}
