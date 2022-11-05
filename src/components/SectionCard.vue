<script>
export default {
    // определяем параметры карточки
    props: {
        data: {
            type: Object
        }
    }
}
</script>

<template>
    <!-- изменяем поведение ссылки и ее основной тег -->
    <router-link :to="{ name: 'article', params: { id: data.id } }" custom v-slot="{ navigate }">
        <!-- т.е теперь вместо тега 'a href=""' останется article -->
        <article v-on:click="navigate">
            <h3>{{ data.title }}</h3>
            <!-- обрезаем слишком длинную строку -->
            <p>{{ data.article.slice(0, 260) }}...</p>
        </article>
    </router-link>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
article {
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
