<script>
// подтягиваем хранилише
import { mapState, mapActions } from 'vuex'

// подтягиваем карточки
import SectionCard from '../components/SectionCard.vue'

export default {
    components: {
        SectionCard // регистрируем те самые карточки что подключали выше
    },
    computed: {
        // получаем состояние с массивом данных и ключ из локального хранилища
        ...mapState(['data', 'browserHistory'])
    },
    methods: {
        // определяем основные методы хранилища с которыми будем работать
        ...mapActions(['getData']) // запрашиваем данные по ключу
    },
    mounted() {
        // проверяем есть ли в состоянии ключ и если такой имеется,
        // восстанавливаем последний сеанс
        if (this.browserHistory) {
            this.getData(this.browserHistory.hash)
        }
    }
}
</script>

<template>
    <section class="cards">
        <!-- меняем заголовок от состояния предыдущего сеанса -->
        <h2 v-text="data.length > 0 ? 'Результаты поиска..' : 'Нет результатов..'" />

        <!-- формируем карточки -->
        <div v-if="data.length > 0" class="cards__items">
            <SectionCard v-for="item in data" :key="item.id" :data="item" />
        </div>
    </section>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cards {
    h2 {
        color: var(--scheme-v2);
    }

    p {
        color: var(--scheme-v2);
    }

    &__items {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
        margin: 0 0 20px;

        @media only screen and (max-width: 992px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media only screen and (max-width: 660px) {
            grid-template-columns: 1fr;
        }
    }
}
</style>
