<template>
    <div class="container">
    <h1>Спасибо, ваша электронная почта подтверждена</h1>
    <button class="btn" @click="">Вернуться на winliner.ru</button>
</div>

</template>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--colorDark);
    z-index: 99999;
}
h1 {
    font-family: 'Helvetica';
    /* font-style: italic; */
    font-weight: 400;
    font-size: 24px;
    line-height: 96%;
    letter-spacing: 0.01em;
    /* text-transform: uppercase; */
    color: var(--colorLight);
    padding-bottom: 32px;
    text-align: center;
}

.btn{
    width: min-content;
white-space: nowrap;
background-color: var(--colorOrange);

}

</style>