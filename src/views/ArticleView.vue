<script>
// подтягиваем хранилише
import { mapState, mapActions } from 'vuex'

// подтягиваем фому редактирования
import FormArticle from '../components/FormArticle.vue'

export default {
    data() {
        return {
            // храним состояние редактора
            editor: false
        }
    },
    components: {
        FormArticle // регистрируем ту самую форму что подключали выше
    },
    methods: {
        // определяем основные методы хранилища с которыми будем работать
        ...mapActions(['getArticle', 'deleteData']),
        deleteArticle() {
            // передаем идентификатор страницы в метод хранилища
            this.deleteData(this.data.id)

            // закрываем страницу
            this.navigate()
        },
        // просто прягаем назад
        navigate() {
            this.$router.push({ path: '/' })
        }
    },
    computed: {
        // получаем состояние с массивом данных
        ...mapState(['data', 'pending'])
    },

    mounted() {
        // освобождаем массив при открытии страницы
        // чтобы заполнить его данными текущей страницы
        this.$store.state.data = []

        // запрашиваем данные текущей страницы и передаем
        // идентификатор этой страницы из параметра роутера
        this.getArticle(this.$route.params.id)
    }
}
</script>

<template>
    <nav>
        <a v-on:click="navigate()">Назад</a>
    </nav>

    <section v-if="data.title">
        <h2>
            <span>{{ data.keyword }}</span>

            <a :href="data.url" target="_blank">{{ data.title }}</a>
        </h2>

        <p>
            {{ data.article }}
        </p>

        <FormArticle :data="data" v-on:editor="editor = !editor" v-if="editor" />

        <button v-on:click="editor = !editor" v-text="editor ? 'Отменить' : 'Изменить'"></button>
        <button v-on:click="deleteArticle()">Удалить</button>
    </section>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
section {
    background: var(--scheme-v2);
    padding: 40px;
}

nav {
    margin: 0 0 20px;

    a {
        color: var(--scheme-v2);
        cursor: pointer;

        &:hover {
            color: var(--scheme-v3);
        }
    }
}

h2 {
    span {
        background-color: var(--scheme-v3);
        border-radius: 25px;
        display: block;
        font-size: 18px;
        margin: 20px 0;
        padding: 3px 20px;
        width: fit-content;
    }

    a {
        &:hover {
            text-decoration: underline;
        }
    }
}

p {
    margin: 0 0 100px;
}

button {
    border: 1px solid var(--scheme-v5);
    margin: 0 40px 0 0;

    @media only screen and (max-width: 660px) {
        margin: 0 auto 10px;
        width: 100%;
    }
}
</style>
