<template>
    <section class="timesheet">
        <div class="winliner"></div>
        <div class="timesheet__first-block">
            <h2 class="timesheet__header">Расписание</h2>
            <p class="timesheet__description">Важно: В&nbsp;течение временного слота
                вы&nbsp;не&nbsp;сможете покинуть лодку. Мы&nbsp;просим вас не&nbsp;опаздывать
                на&nbsp;посадку&nbsp;&mdash; Winliner отправляется строго по&nbsp;расписанию.</p>
        </div>
        <TimesheetOneRow v-for="myDay in data" :key="myDay.day" :day="myDay" @bookSlot="bookSlot" @bookDay="bookDay" />
    </section>
</template>

<script>
import data from "../data/day_description.json";
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
        this.data = data;
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
    padding: 2.381vw 0.595vw;
}

.timesheet__first-block {
    display: grid;
    grid-template-columns: 4fr 5fr;
    margin-bottom: 7.440vw;

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

    }

    .timesheet__first-block {
        margin: 16px 8px;
    }

    .timesheet__description span {
        font-size: 4.58vw;

    }


}
</style>