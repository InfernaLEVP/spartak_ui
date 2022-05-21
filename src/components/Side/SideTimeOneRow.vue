<template>

    <a class="daylink" :href="`#${day.day}`" @click="goTo">
        <!-- <div class="line"></div> -->
        <div class="sidetimesheet__one-row">
            <!-- :class="`${text(day) ? 'sidetimesheet__play' : 'sidetimesheet__stop'}`" -->
            <!-- :style="`opacity: ${text(day) ? '1' : '1'}` -->
            <div class="sidetimesheet__play" :style="`opacity: ${text(day) ? '1' : '0'}`"></div>

            <div class="sidetimesheet__day-container">
                <div class="sidetimesheet__day">{{ day.day }}</div>
                <div class="mnth">июня</div>
            </div>
            <!-- :style="`opacity: ${0}`" -->
            <div class="sidetimesheet__reg-status">
                {{ text(day) }}
            </div>

        </div>
        <!-- </button> -->
    </a>
</template>

<script>
export default {
    name: 'SideTimeOneRow',
    props: {
        day: Object
    },
    methods: {
        text(day) {

            const _date = new Date(Date.now());
            const _today = `${_date.getDate()}.0${_date.getMonth() + 1}`;
            // console.log({_today})
            if (_date.getDate() >= day.openDay.split('.')[0]) {
                return 'открыта регистрация';
            } else {
                return '';
            }

        },
        goTo() {
            document.querySelector('.burger-btn-open').click();
        }
    }
}
</script>

<style scoped>
a {
    color: inherit;
    text-decoration: none;
    scroll-behavior: smooth;

}

.daylink {
    scroll-behavior: smooth;
    text-decoration: none;
}

.sidetimesheet__one-row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    /* min-height: 5.208vw; */
    /* border-top: 1px solid var(--colorDark); */
    transition: hover 1s;
    cursor: pointer;
    z-index: 2;
}


/* .sidetimesheet__one-row:hover::before {
    content: "";
    position: absolute;
    width: 105%;
    margin-left: -1.190vw;
    height: 2px;
    background-color: var(--colorLight);
    transform: translateY(1.2vw);
} */

/* .sidetimesheet__one-row::after {
    content: "";
    position: absolute;
    width: 95%;
    margin-left: 0;
    height: 1px;
    background-color: var(--colorDark);
    transform: translateY(-1vw);
} */
.sidetimesheet__one-row:hover {
    /* display: block; */
    background-color: var(--colorRed);
    border-radius: 12px;
    /* opacity: 0;  */
}

.sidetimesheet__one-row:hover>.sidetimesheet__play,
.sidetimesheet__one-row:hover>.sidetimesheet__reg-status {
    filter: invert();
}

.sidetimesheet__one-row:hover .sidetimesheet__day {
    /* background-color: var(--colorLight); */
    color: var(--colorLight);
}

.sidetimesheet__one-row:hover .mnth {
    /* background-color: var(--colorLight); */
    background-color: var(--colorLight);
    border: var(--colorDark);
}

.active {
    background-color: var(--colorDark);
    /* color: var(--colorLight); */
    width: 100%;
    margin: 0.35vw 0;
    border-radius: 0.893vw;
    /* transform: translateX(-10); */
}

.active p {
    color: var(--colorLight);
}

.active div {
    filter: invert(100%)
}


.sidetimesheet__play {
    background-image: url(../../assets/images/play.svg);
    background-repeat: no-repeat;
    background-position: center;
}

.sidetimesheet__stop {
    background-image: url(../../assets/images/stop.svg);
    background-repeat: no-repeat;
    background-position: center;

}

.line {
    width: 100%;
    height: 1px;
    background-color: var(--colorDark);
}

.sidetimesheet__day-container {
    grid-column-start: 3;
    display: flex;
    flex-direction: row;
    /* margin: auto; */
    align-items: center;
    vertical-align: middle;
    justify-content: center;

}

.sidetimesheet__day {
    /* margin-bottom: .5vh; */
    font-family: 'Druk';
    font-style: italic;
    font-weight: 1000;
    font-size: 10vh;
    /* line-height: 100%; */
    /* text-align: center; */
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: var(--colorRed);
    transform: translateY(0.35vw);

}

.mnth {
    font-family: 'Helvetica', sans-serif;
    font-size: .8vw;
    letter-spacing: 0.01em;
    color: var(--colorDark);
    border: 1px solid var(--colorDark);
    padding: 4px 8px;
    margin-left: 8px;
    border-radius: 25px;
    height: min-content;
    align-self: center;




}

.sidetimesheet__day-disable {
    -webkit-text-stroke: 1px var(--colorDark);
    text-stroke: 1px var(--colorDark);
    color: var(--colorOrange);

    transform: translateY(0.35vw)
}

.sidetimesheet__reg-status {
    text-decoration: none;
    grid-column: span 2;
    font-size: .8vw;
    /* grid-column-end: span col4-start; */
    margin: auto;
    text-align: center;
    font-family: 'Helvetica', sans-serif;
}

@media (max-width: 575.98px) {
    .sidetimesheet {
        width: 75%;
        padding: 8px;
    }


    .sidetimesheet__cal,
    .sidetimesheet__reg-status, .mnth {
        font-size: 3vw;
    }

    .sidetimesheet__top-row {
        padding: 8px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .sidetimesheet__day {
        font-size: 10vh;
    }

 

    .vline-container {
        width: calc(100%-16px);
    }

    .sidetimesheet__one-row {

        /* margin-top: 4px; */
        /* margin-bottom: 4px; */

    }

    .sidetimesheet__one-row:hover::before {
        margin-left: -16px;
        transform: translateY(3.2vw);
    }

    .sidetimesheet__one-row::after {
        transform: translateY(-.7vw);
    }

    .active {
        width: 100%;
        margin: 0.35vw 0;
        border-radius: 12px;
        /* transform: translateX(-10); */
    }

    .sidetimesheet__day {
        /* margin: 8px; */
        transform: translateY(.7vh);
            font-size: 8.5vh;

    }

}
</style>