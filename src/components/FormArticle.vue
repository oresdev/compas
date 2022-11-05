<script>
// подтягиваем хранилише
import { mapActions } from 'vuex'

export default {
    // определяем параметры формы
    props: {
        data: {
            type: Object
        }
    },
    emits: ['editor'],
    data() {
        return {
            // формируем массив с будущими ошибками
            errors: [],
            // формируем объект нашей формы
            form: {}
        }
    },
    methods: {
        // определяем основные методы хранилища с которыми будем работать
        ...mapActions(['patchData']),

        // небольшой хелпер для валидации строк
        unsuportedString(str) {
            return !/^([a-zA-Z0-9а-яА-ЯёЁ/ :!?\xA0+,()\n.%@_#-]+)$/.test(str)
        },

        // подготавливаем поля нашей формы и переопределяем их значение
        prepareForm() {
            // проверяем валидный ли строки
            if (this.unsuportedString(this.form.title) || this.unsuportedString(this.form.article)) {
                this.errors.push('Объявление не должно содержать другие спец.симолы кроме: ! ? , () + . % @ _ # -')

                // прячем ошибку через 5 секунд
                setTimeout(() => {
                    this.errors = []
                }, 5000)

                // тормозимся если ошибка есть
                return
            }

            // передаем наш объект в метод хранилища
            this.patchData(this.form)

            this.$emit('editor', false)
        }
    },
    created() {
        // заполняем поля нашей формы получеными параметрами
        this.form = { ...this.data }
    }
}
</script>

<template>
    <p class="error" v-if="errors[0]">{{ errors[0] }}</p>

    <form v-on:submit.prevent="prepareForm()">
        <input v-model="form.title" name="title" type="text" />

        <textarea v-model="form.article" name="article" rows="12" />

        <button type="submit">Сохранить</button>
    </form>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.error {
    color: #c64949;
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
        font-size: 16px;
        line-height: 1.7;
        margin: 20px 0;
        outline: none;
        padding: 20px;
    }
}
</style>
