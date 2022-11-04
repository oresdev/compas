import { createRouter, createWebHistory } from 'vue-router'

// подтягиваем главную страницу
import HomeView from '../views/HomeView.vue'
// подтягиваем внутреннюю страницу
import ArticleView from '../views/ArticleView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        // указываем передаваемый параметр
        path: '/article/:id',
        name: 'article',
        component: ArticleView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
