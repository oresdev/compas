<script>
import * as _ from 'lodash'

// подтягиваем хранилише
import { mapState, mapActions } from 'vuex'

const rand = _.random(0, 1000)

export default {
    data() {
        return {
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
    <form :class="{ pending: pending }" v-on:submit.prevent>
        <input type="text" v-model="form.keywords" name="keywords" placeholder="Технология, стек" />
        <button :class="{ pending: pending }" v-on:click="postData(form)" :disabled="pending" type="submit">Найти предложения</button>

        <ul>
            Искать в:
            <li v-on:click="setSources(2)" :class="{ selected: form.sources == 2 }">Kwork</li>
            <li v-on:click="setSources(1)" :class="{ selected: form.sources == 1 }">Фриланс Хабр</li>
        </ul>
    </form>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
