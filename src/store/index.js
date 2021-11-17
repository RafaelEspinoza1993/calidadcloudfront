import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    users: [],
    current_page: null,
    from: null,
    to: null,
    last_page: null,
    modaltype: null,
    userSelected: null,
    modal: false,
    alert: null
  },
  getters: {
    users(state) {
      return state.users.map(user => {
        return {
          data: user,
          create: 1,
          edit: 2,
          delete: 3,
        }
      })
    },
    current_page(state) {
      return state.current_page
    },
    from(state) {
      return state.from
    },
    to(state) {
      return state.to
    },
    last_page(state) {
      return state.last_page
    },
    modaltype(state) {
      return state.modaltype
    },
    userSelected(state) {
      return state.userSelected
    },
    modal(state) {
      return state.modal
    },
    alert(state) {
      return state.alert
    }
  },
  mutations: {
    users(state, payload) {
      state.users = payload
    },
    pages(state, payload) {
      state.current_page = payload.current_page
      state.from = payload.from
      state.to = payload.to
      state.last_page = payload.last_page
    },
    modaltype(state, payload) {
      state.modaltype = payload
    },
    userSelected(state, payload) {
      state.userSelected = payload
    },
    modal(state, payload) {
      state.modal = payload
    },
    alert(state, payload) {
      state.alert = payload
    }
  },
  actions: {
    async nextpage({
      commit
    }, data) {
      let payload = JSON.stringify(data)
      await axios.post('http://localhost:80/api/show?page=' + payload.page, payload, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(response => {
        commit("users", response.data.data.data)
        commit(("pages"), response.data.data)
      })
    },
    async SendForm({commit}, data) {
      let payload = JSON.stringify(data)
      let url
      console.log(data);
      switch (data.type) {
        case 1:
          url = 'http://localhost:80/api/create'
          break;
        case 2:
          url = 'http://localhost:80/api/update'
          break;
        case 3:
          url = 'http://localhost:80/api/delete'
          break;

        default:
          break;
      }
      console.log(url);
      await axios.post(url, payload, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(response => {
        commit("alert", 'ok')
        console.log('ok');
        console.log(response);
      })
    },
    ModalType({
      commit
    }, payload) {
      commit("userSelected", payload.data.data)
      switch (payload.type) {
        case 1:
          commit("modaltype", {
            type: payload.type,
            title: 'Create'
          })
          break;
        case 2:
          commit("modaltype", {
            type: payload.type,
            title: 'Edit'
          })
          break;

        default:
          commit("modaltype", {
            type: payload.type,
            title: 'Delete'
          })
          break;
      }
    },
    ModalStatus({
      commit
    }, payload) {
      commit("modal", payload)
    }
  },
  modules: {}
})