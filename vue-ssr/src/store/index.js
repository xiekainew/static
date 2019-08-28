import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
	name: 'vue-ssr'
}

const actions = {

}

export function createStore() {
	return new Vuex.Store({
		state,
		actions
	})
}