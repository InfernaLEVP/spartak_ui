<template>
    <section class="timesheet">
        <div class="winliner"></div>
        <div class="timesheet__first-block">
            <h2 class="timesheet__header">Расписание</h2>
            <div class="timesheet__description">
                <p>Winliner это:</p>
                <p class="bullets">— Лучшее место для всех красно-белых, чтобы отпраздновать 100-летие ФК&nbsp;«Спартак»
                </p>
                <p class="bullets">— Ежедневные встречи с футболистами и легендами ФК&nbsp;«Спартак»</p>
                <p class="bullets">— Lounge зона и тематические бары</p>
                <p class="bullets">— Музейная инсталляция ФК&nbsp;«Спартак»</p>
                <p class="bullets">— Ежедневные розыгрыши мерча и подарков от ФК&nbsp;«Спартак» и Winline</p>

                <p>Приходи на Winliner и стань частью истории ФК&nbsp;«Спартак»!</p>
            </div>
        </div>
        <TimesheetOneRow v-for="myDay in data" :key="myDay.day" :day="myDay" @bookSlot="bookSlot" @bookDay="bookDay" />
    </section>
</template>

<script>
// import data from "../data/day_description.json";
import TimesheetOneRow from '@/components/TimesheetOneRow.vue';

export default {
    name: 'TimeSheet',
    components: {
        TimesheetOneRow
    },
    data() {
        return {
            data: undefined
        }
    },
    methods: {
        bookSlot(info) {
            this.$emit('bookSlot', info);
        },
        bookDay(day) {
            this.$emit('bookDay', day);
        }
    },
    created() {
        // this.data = data;

        fetch('https://winliner.ru/getDays', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ok: 'ok' })
        })
            .then(response => response.json())
            .then(data => {

                this.data = data;
            });

    }
}
</script>

<style scoped>
.winliner {
    background-image: url(../assets/images/winliner.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    max-width: 100%;
    padding-bottom: 35%;
    margin-bottom: 32px;
}

.timesheet {
    background-color: #292929;
    padding: 2.381vw 0.595vw 0.1vw 0.595vw;
}

.timesheet__first-block {
    display: grid;
    grid-template-columns: 3fr 6fr;
    margin-bottom: 3.220vw;

}

.timesheet__header {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.800vw;
    line-height: 96%;
    letter-spacing: 0.01em;
    /* text-transform: uppercase; */
    color: var(--colorLight);

}

.timesheet__description {
    font-family: 'Helvetica';
    /* font-style: italic; */
    font-weight: 400;
    font-size: 1.800vw;
    line-height: 96%;
    letter-spacing: 0.01em;
    /* text-transform: uppercase; */
    color: var(--colorLight);
    /* margin-bottom: 8px; */


}

.bullets {
    display: block;
    font-family: 'Helvetica';
    /* font-style: italic; */
    font-weight: 400;
    font-size: 1.800vw;
    line-height: 96%;
    letter-spacing: 0.01em;
    /* text-transform: uppercase; */
    color: var(--colorLight);
    text-indent: -2.3vw;
    margin-bottom: 8px;
}

.timesheet__description span {
    color: var(--colorOrange);
    text-transform: uppercase;
    font-size: 1.400vw;

}


@media (max-width: 575.98px) {

    .timesheet {
        padding-left: 0px;
        padding-right: 0px;
    }

    .timesheet__first-block {
        grid-template-columns: 1fr;

    }

    .timesheet__header {
        font-size: 5.58vw;
    }

    .timesheet__description {
        font-size: 4.58vw;
        margin-top: 16px;
        margin-bottom: 16px;

    }

    .bullets {
        padding-left: 6vw;
        font-size: 4.58vw;
        margin-top: 16px;
        text-indent: -6vw
    }


    .timesheet__first-block {
        margin: 16px 8px;
    }

    .timesheet__description span {
        font-size: 4.58vw;

    }


}
</style>