const store = new Vuex.Store({
    state: {
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
        }
    },
    actions: {
        ten ({commit}) {
            setTimeout(() => {
                commit('update')
            }, 1000)
        }
    }
})
