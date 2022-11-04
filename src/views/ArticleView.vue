<script>
// подтягиваем хранилише
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            // храним состояние редактора
            editor: false,
            // формируем объект нашей формы
            form: {
                article: '',
                url: '',
                title: '',
                keyword: ''
            }
        }
    },
    methods: {
        // определяем основные методы хранилища с которыми будем работать
        ...mapActions(['getArticle', 'patchData', 'deleteData']),

        // подготавливаем поля нашей формы и переопределяем их значение
        prepareArticle() {
            this.form.article = this.data.article
            this.form.url = this.data.url
            this.form.title = this.data.title
            this.form.keyword = this.data.keyword

            // после отправки формы возвращаем состояние редактора по умолчанию
            this.editor = false

            // формируем новый объект и передаем его в метод хранилища
            this.patchData({ id: this.data.id, data: this.form })
        },
        deleteArticle() {
            // передаем идентификатор страницы в метод хранилища
            this.deleteData(this.data.id)

            this.navigate()
        },
        navigate() {
            // закрываем страницу
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

        <form v-on:submit.prevent v-if="editor">
            <input v-model="data.title" name="title" type="text" />
            <textarea v-model="data.article" name="article" rows="20"></textarea>

            <button type="submit" v-on:click="prepareArticle()">Сохранить</button>
        </form>

        <button v-on:click="editor = !editor">Изменить</button>
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

form {
    background-color: var(--scheme-v5);
    display: flex;
    flex-direction: column;

    margin: 40px 0;
    padding: 20px;
    position: relative;

    input {
        display: block;
        padding: 20px 20px 0;
    }

    button {
        margin: auto;
    }

    textarea {
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 16px;
        line-height: 1.7;
        margin: 20px 0;
        padding: 20px;
    }
}
</style>
