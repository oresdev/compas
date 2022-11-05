<script>
import * as _ from 'lodash'

// подтягиваем хранилише
import { mapState, mapActions } from 'vuex'

const rand = _.random(0, 1000)

export default {
    data() {
        return {
            // формируем массив с будущими ошибками
            errors: [],
            // формируем объект нашей формы
            form: {
                sources: [2],
                id_user: rand,
                id_parsource: rand,
                keywords: '',
                hash_parsource: rand.toString()
            }
        }
    },
    computed: {
        // получаем состояние ключа из локального хранилища
        ...mapState(['pending', 'browserHistory'])
    },
    methods: {
        // определяем основные методы хранилища с которыми будем работать
        ...mapActions(['postData', 'getData']), // передаем нашу форму

        // небольшой хелпер для валидации строк
        unsuportedString(str) {
            return !/^([a-zA-Z0-9 ,+.#-]+)$/.test(str)
        },

        // подготавливаем поля нашей формы и переопределяем их значение
        prepareForm() {
            // проверяем валидный ли строки
            if (this.unsuportedString(this.form.keywords)) {
                this.errors.push('Разрешено: , + . # -')

                // прячем ошибку через 5 секунд
                setTimeout(() => {
                    this.errors = []
                }, 5000)

                // тормозимся если ошибка есть
                return
            }

            // передаем наш объект в метод хранилища
            this.postData(this.form)
        },

        // изменяем выбранный индекс в поле формы
        setSources(index) {
            this.form.sources = [index]
            // изменяем состояние площадки
            this.browserHistory.sources = index
            // запраишваем данные площадки
            this.getData(this.browserHistory.hash)
        }
    },
    created() {
        // проверяем есть ли в состоянии ключ и если такой имеется,
        // изменяем значение формы
        this.form.sources = this.browserHistory.sources || [2]
    }
}
</script>

<template>
    <form :class="{ pending: pending }" v-on:submit.prevent="prepareForm()">
        <input :class="{ error: errors[0] }" type="text" v-model="form.keywords" name="keywords" placeholder="React, Redux, GraphQL .." />
        <!-- блокируем поиск в состоянии ожидания и пустого значения -->
        <button :class="{ pending: pending, error: errors[0] }" :disabled="pending || form.keywords.length < 2" type="submit">
            {{ errors[0] ? errors[0] : 'Найти предложения' }}
        </button>

        <ul>
            Искать в:
            <li v-on:click="setSources(2)" :class="{ selected: form.sources == 2 }">Kwork</li>
            <li v-on:click="setSources(1)" :class="{ selected: form.sources == 1 }">Фриланс Хабр</li>
        </ul>
    </form>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.error {
    border-color: #c64949;
}

form {
    display: grid;
    grid-template-columns: 1fr 280px;
    margin: 0 auto;
    max-width: var(--scheme-max-width);
    padding: 150px 0;
    transition: all 1s ease-in-out;

    input {
        border: 2px solid var(--scheme-v2);
        border-right: 0;
        color: var(--scheme-v2);
        padding: 15px 20px;
    }

    button {
        position: relative;
        &.error {
            background-color: #c64949;
        }
        &.pending {
            background-color: var(--scheme-v2);
            color: var(--scheme-v2);

            &::after {
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                border: 4px solid transparent;
                border-top-color: var(--scheme-v3);
                border-radius: 50%;
                animation: pending 1s ease infinite;
            }
        }
    }

    ul {
        color: var(--scheme-v2);
        font-size: 16px;
        margin: 20px 0;

        li {
            display: inline-block;

            cursor: pointer;
            margin: 0 0 0 20px;

            vertical-align: middle;

            &.selected {
                background-color: var(--scheme-v3);
                border-radius: 25px;
                padding: 5px 20px;
            }
        }
    }

    &.pending {
        padding: 50vh 0;
    }

    @media only screen and (max-width: 660px) {
        grid-template-columns: 1fr;

        input {
            border-right: 2px solid var(--scheme-v2);
            border-bottom: 0;
        }
        button {
            padding: 18px;
        }
    }
}

@keyframes pending {
    from {
        transform: rotate(0turn);
    }

    to {
        transform: rotate(1turn);
    }
}
</style>
