<script>
// подтягиваем строку поиска
import SearchBar from './components/SearchBar.vue'

export default {
    components: {
        SearchBar // регистрируем ту самую строку поиска что подключили выше
    }
}
</script>

<template>
    <header>
        <!-- она самая =) -->
        <SearchBar />
    </header>

    <main>
        <router-view />
    </main>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
:root {
    // определяем цветовую схему проекта
    --scheme-v1: #151f32;
    --scheme-v2: #ffffff;
    --scheme-v3: #32c789; // основная схема
    --scheme-v4: #303b44;
    --scheme-v5: #f1f1f1;

    // определяем шрифты и размеры
    --scheme-font: Avenir, Helvetica, Arial, sans-serif;
    --scheme-h: 46px;
    --scheme-m: 28px;
    --scheme-s: 22px;

    // определяем максимальную ширину страницы
    --scheme-max-width: 1280px; // desktop

    // определяем отступы
    --scheme-gap: 40px;

    // определяем всякий мусор для рендеринга шрифтов
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
}

// изменяем поведение размеров шрифтов
@media only screen and (max-width: 928px) {
    :root {
        --scheme-h: 36px;
        --scheme-m: 26px;
    }
}

// далее идут сбросы и дефолтные свойства
* {
    box-sizing: border-box;
}

body {
    background: var(--scheme-v4);
    background-image: radial-gradient(var(--scheme-v1) 0.5px, var(--scheme-v4) 0.5px);
    background-size: 20px 20px;
    color: var(--scheme-v1);

    font: 300 17px / 1.64 var(--scheme-font);

    margin: 0;
    padding: 40px;
    position: relative;
}

main {
    margin: 0 auto;
    max-width: var(--scheme-max-width);
}

h1,
h2,
h3,
h4,
h5 {
    font-weight: 300;
    margin: 0;
}

h1 {
    font: 300 var(--scheme-h) / 1.42 var(--scheme-font);
}

h2 {
    font: 300 var(--scheme-m) / 1.42 var(--scheme-font);

    margin: 0 0 40px;
}

h3 {
    font: 400 var(--scheme-s) / 1.42 var(--scheme-font);
}

a {
    color: inherit;
    text-decoration: none;
}

p {
    margin: 0;
    word-break: break-word;
}

ul {
    margin: 0;
    padding: 0;

    li {
        list-style: none;
    }
}

input,
button {
    background: none;
    border: none;
    box-shadow: none;

    font: var(--scheme-font);

    margin: 0;
    outline: none;
    padding: 0;
}

// задаем свойства кнопок по умолчанию
button {
    background-color: var(--scheme-v2);
    color: var(--scheme-v1);

    cursor: pointer;

    display: inline-block;

    font-size: inherit;
    padding: 10px 40px;

    &:hover {
        background-color: var(--scheme-v3);
    }
}
</style>
