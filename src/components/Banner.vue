<template>

    <div class="banner1922">
        <div class="banner1922__left">
            <div class="banner1922__top-text-container">
                <p class="banner1922__text">Стань частью истории ФК&nbsp;«Спартак»!</p>
                <p class="banner1922__year">Матч 1922</p>
            </div>
            <div class="banner1922__arrow"></div>

            <p class="banner1922__main-text">Сыграй в&nbsp;матче, который продлится 1922 минуты бок о&nbsp;бок футболистами и&nbsp;легендами клуба, курсируя по&nbsp;Москва-реке и&nbsp;стань частью истории Спартака.</p>
            <button class="btn" @click="book">Стать частью истории</button>

        </div>
        <div class="banner1922__right">
            <div class="rotateBall"></div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Banner',
    data() {
        return {

        }
    },
    methods: {
        book() {
            this.$emit('book', '1922');
        }
    }
}
</script>

<style scoped>
.btn {
    min-height: 3.571vw;
    background-color: var(--colorLight);
    color: var(--colorRed);

}

.btn:hover {
    background-color: var(--colorDark);
    color: var(--colorLight);

}

.banner1922 {
    background-color: var(--colorRed);
    display: grid;
    grid-template-columns: 4fr 5fr;
    min-height: 20.833vw;
}

.banner1922__left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.595vw;
}

.banner1922__top-text-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between
}

.banner1922__year {
    font-family: 'Druk';
    font-style: italic;
    font-weight: 1000;
    font-size: 5.952vw;
    line-height: 85%;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: var(--colorLight);
    text-align: end;
    padding-right: 8px;

}

.banner1922__text {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.860vw;
    line-height: 96%;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: var(--colorLight);
    width: 70%;

}

.banner1922__main-text {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.5vw;
    line-height: 96%;
    letter-spacing: -0.01em;
    /* text-transform: uppercase; */
    color: var(--colorLight);
    /* opacity: .5; */
    margin: 16px 0;
    /* width: 60%; */

}

.banner1922__arrow {
    background-image: url(../assets/images/arr.svg);
    background-repeat: no-repeat;
    background-position: right;
    background-size: fill;
    width: 100%;
    height: 12px;
    padding-bottom: 40px;


}

.banner1922__right {
    position: relative;
    /* display: flex; */
    /* align-items: center;
    justify-content: center; */
    background-image: url(../assets/images/1922_pattern.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;


}

.rotateBall {
    /* content: ""; */
    /* display: block; */
    /* position: relative; */
    background-image: url(../assets/images/1922_ball.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    height: 80%;
    margin-top: 5%;
    /* width: 100%; */
    /* padding-bottom: 100%; */
    /* animation: rotating 5s linear infinite; */
    /* vertical-align: middle; */

}

@keyframes rotating {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}


@media (max-width: 575.98px) {
    .banner1922__top-text-container{
        flex-direction: column;
    }

    .banner1922 {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }

    .banner1922__main-text,
    .banner1922__text {
        font-size: 5.58vw;
        width: 100%;
        order: 1;

    }

    .banner1922__main-text {
        margin-bottom: 8px;
    }

    .banner1922__year {
        font-size: 18vw;
        text-align: start;
    }

    .banner1922__left {
        padding: 8px;
    }

    .banner1922__right {
        grid-row-start: 1;
        height: 150px;
    }

    .rotateBall {
        height: 120%;
        padding: 0;
        margin: -5%;
    }

    .btn {
        padding-top: 4vw;
        padding-bottom: 4vw;
    }

}
</style>