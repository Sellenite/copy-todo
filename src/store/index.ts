import { createStore } from 'vuex'
import storage from 'good-storage'

const TODO_LIST_KEY = '__TODO_LIST__'

interface TodoItem {
  title: string
  detail: string
  id: string | number
}

export default createStore({
  state: {
    todoList: storage.get(TODO_LIST_KEY) ?? []
  },
  getters: {
  },
  mutations: {
    setTodoList(state: any, payload: Array<TodoItem>) {
      state.todoList = payload
      storage.set(TODO_LIST_KEY, state.todoList)
    },
    addTodoItem(state: any, payload: TodoItem) {
      state.todoList.push(payload)
      storage.set(TODO_LIST_KEY, state.todoList)
    },
    saveTodoItem(state: any, payload: TodoItem) {
      const { id } = payload
      const index = state.todoList.findIndex((item: TodoItem) => item.id === id)
      if (index > -1) {
        state.todoList.splice(index, 1, payload)
      }
      storage.set(TODO_LIST_KEY, state.todoList)
    },
    removeTodoItem(state: any, payload: TodoItem) {
      const { id } = payload
      const index = state.todoList.findIndex((item: TodoItem) => item.id === id)
      if (index > -1) {
        state.todoList.splice(index, 1)
      }
      storage.set(TODO_LIST_KEY, state.todoList)
    },
    clearTodoList(state: any) {
      state.todoList = []
      storage.set(TODO_LIST_KEY, state.todoList)
    }
  },
  actions: {
  },
  modules: {
  }
})
