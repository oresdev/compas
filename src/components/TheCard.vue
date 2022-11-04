<script>
export default {
    // определяем параметры карточки и тип
    props: {
        article: {
            type: Object
        }
    }
}
</script>

<template>
    <!-- изменяем поведение ссылки и ее основной тег -->
    <router-link :to="{ name: 'article', params: { id: article.id } }" custom v-slot="{ navigate }">
        <article class="card" v-on:click="navigate">
            <h3>{{ article.title }}</h3>
            <p>{{ article.article.slice(0, 260) }}...</p>
        </article>
    </router-link>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card {
    background-color: var(--scheme-v5);
    transition: background 0.3s ease-in-out;

    cursor: pointer;

    padding: 30px;

    &:hover {
        background-color: var(--scheme-v3);
    }

    h3 {
        margin: 0 0 20px;
    }
}
</style>
