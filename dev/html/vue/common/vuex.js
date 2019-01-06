const user = {
    namespaced: true,
    state: {
        name: '王大力',
        age: 12
    },
    mutations: {
        updateAge (state, age) {
            state.age = age
        },
        updateName (state, name) {
            state.name = name
        }
    },
    actions: {

    }
}
const people = {
    state: {
        name: '小明'
    },
    mutations: {
        updateName (state, name) {
            state.name = name
        }
    }
}
const store = new Vuex.Store({
    state: {
        name: 'vue',
        count: 0,
        todos: [
            { id: 1, text: '1', done: true },
            { id: 2, text: '2', done: true },
            { id: 3, text: '3', done: false },
            { id: 4, text: '4', done: true },
            { id: 5, text: '5', done: false }
        ],
        message: '北京大学'
    },
    getters: {
        doneTodos (state) {
            return state.todos.filter(item => item.done)
        },
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        }
    },
    mutations: {
        updateMessage (state, data) {
            state.message = data
        },
        update (state) {
            state.count++
        },
        down (state) {
            state.count--
        },
        updateName (state, name) {
            state.name = name
        }
    },
    actions: {
        ten ({commit}) {
            setTimeout(() => {
                commit('update')
            }, 1000)
        }
    },
    modules: {
        user,
        people
    }
})
