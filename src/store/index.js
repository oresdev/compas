import storage from '../common/storage'
import axios from '../common/api'

import { createStore } from 'vuex'

// инициализируем конфиг
axios.init()

// по короче немного =Р
// const getSources = {
//     1: 'freelancehabr_result',
//     2: 'kwork_result'
// }

// определяем значение по ключу
const getSources = (i) =>
    ({
        1: 'freelancehabr_result',
        2: 'kwork_result'
    }[i])

// определяем значение по ключу
const setSources = (i) =>
    ({
        1: 'freelancehabr',
        2: 'kworkservice'
    }[i])

export default createStore({
    state: {
        data: [],
        pending: false, // состояние загрузки
        browserHistory: storage.get('browserHistory') || [] // состояние последнего сеанса
    },

    getters: {},

    mutations: {
        responseData(state, data) {
            state.data = data
        },
        responsePending(state, data) {
            state.pending = data
        },
        setBrowserHistory(state, data) {
            state.browserHistory = data
        }
    },

    actions: {
        // передаем парсеру конфиг
        async postData({ commit, dispatch }, data) {
            // изменяем состояние загрузки
            commit('responsePending', true)
            await axios.post('/parser-config/', data).then((response) => {
                // записываем новый сейнс
                storage.set('browserHistory', { hash: response.data.hash_parsource, sources: response.data.sources })

                // обновляем состояние последнего сеанса
                commit('setBrowserHistory', storage.get('browserHistory'))

                // по хорошему сделать проверку массива и поставить в луп
                // а не вот это вот все
                setTimeout(() => {
                    // запрашивам массив данных по полученному иденификатору
                    dispatch('getData', response.data.hash_parsource)

                    // изменяем состояние загрузки
                    commit('responsePending', false)
                }, 20000)
            })
        },

        // запрашивам массив данных
        async getData({ commit }, hash) {
            // изменяем состояние загрузки
            // commit('responsePending', true)

            await axios.get(`/parser-config/?hash_parsource=${hash}`).then((response) => {
                // определяем площадку
                const sources = getSources(this.state.browserHistory.sources)

                // достаем все объекты из массива объектов по ключу
                const array = response.data.map((i) => i[sources])

                commit('responseData', array.flat())

                // изменяем состояние загрузки
                // commit('responsePending', false)
            })
        },

        // запрашивам массив данных конкретного объявления
        async getArticle({ commit }, id) {
            // определяем площадку
            const sources = setSources(this.state.browserHistory.sources)

            await axios.get(`/api/${sources}/${id}/`).then((response) => {
                commit('responseData', response.data)
            })
        },

        // изменяем данные конкретного объявления
        async patchData({ commit }, data) {
            // определяем площадку
            const sources = setSources(this.state.browserHistory.sources)

            await axios.patch(`/api/${sources}/${data.id}/`, data)
        },

        //
        async deleteData({ commit, dispatch }, id) {
            // определяем площадку
            const sources = setSources(this.state.browserHistory.sources)

            await axios.delete(`/api/${sources}/${id}/`).then(() => {
                // после удаления обновляем массив данных по полученному иденификатору
                dispatch('getData', this.state.browserHistory.hash)
            })
        }
    }
})
