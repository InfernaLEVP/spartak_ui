<template>
    <div class="black-window" :id="day.day" :data-id="`el-${day.day}`" ref="day">
        <div class="day_and_description">
            <div class="timesheet__day-container">
                <p class="timesheet__day-number">{{ day.day }}</p>
                <p class="timesheet__month">июня</p>
            </div>
            <div class="pict-descr-container">
                <img :src="require(`../assets/images/icons/icon_${day.day}.png`)" alt="" class="round-icon">
                <!-- <img class="sl-img" :src="require('../assets/images/slides/' + slide.image_name)"  -->
                <!-- <div class="round-icon"></div> -->
                <p class="main-day-description"><span>{{ day.first_words_selection }}</span> {{ day.day_description }}
                </p>
            </div>
        </div>

        <div v-if="isDayOpened(day)">
            <!--  -->
            <div class="timesheet__timetable-grid">
                <p class="slot-selection-text"> Выбери слот<br>для регистрации </p>
            </div>
            <div class="ober" v-for="event in needDay" :key="event.name" :day="event.day"
                :eventStartTime="event.eventStartTime" :eventEndTime="event.eventEndTime" :name="event.name"
                :description="event.description" :slot_start_time="event.slot_start_time"
                :slot_end_time="event.slot_end_time">
                <div class="timesheet__timetable-grid">

                    <div class="container">
                        <div class="thin-line"></div>
                        <div class="timesheet__timetable-grid-description">
                            <div class="timesheet__timetable-grid-time">{{ event.eventStartTime + "—" +
                                    event.eventEndTime
                            }}
                            </div>
                            <div>
                                <h3 class="timesheet__timetable-grid-description-head">{{ event.name }}</h3>
                                <p class="timesheet__timetable-grid-description-text">{{ event.description }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- class="slot-disable" добавить этот класс, когда регистрация не открыта -->

                    <div class="timesheet__slot" @click="bookSlot(event)">
                        <p>{{ event.slot_start_time + "—" + event.slot_end_time }}</p>
                        <div class="timesheet__slot-arrow"></div>
                    </div>
                </div>
            </div>
            <!--  -->
        </div>
        <div class="remind-me" v-else>
            <div></div>

            <h3>Программа на день скоро появится</h3>
            <button @click="bookDay(day)">Уведомить меня</button>

        </div>

    </div>


</template>

<script>
// import data from '../data/data.json';

export default {
    name: 'TimesheetOneRow',
    props: {
        day: Object
    },
    data() {
        return {
            data: undefined
        }
    },
    created() {
        // this.data = data;

        fetch('https://winliner.ru/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ok: 'ok'})
        })
        .then(response => response.json())
        .then(data => {
            console.log({data})
            this.data = data;
        });

    },
    methods: {
        bookSlot(info) {
            this.$emit('bookSlot', info);
        },
        bookDay(day) {
            this.$emit('bookDay', day);
        },
        isDayOpened(day) {

            const _date = new Date(Date.now());

            if (_date.getDate() >= day.openDay.split('.')[0]) {
                return true;
            } else {
                return false;
            }

        }
    },
    computed: {
        needDay() {
            if(this.data){
                return this.data.filter(d => d.day === this.day.day);
            }else{
                return [];
            }
        },

    }
}
</script>

<style scoped>
.pict-descr-container {
    display: flex;
    flex-direction: row;
}

.round-icon {
    /* background-image: url(../assets/images/icons/icon_05.png);
    background-repeat: no-repeat;
    background-size: contain; */
    width: 11.905vw;
    height: 11.905vw;
    margin-top: -3.49vw;
    margin-right: 1.19vw;
    /* display: inline-block; */

}

.black-window {
    background-color: var(--colorDark);
    padding: 1.190vw;
    border-radius: 24px;
    margin-bottom: 0.595vw;
}

.container {
    /* display: block; */
    grid-column-start: 2;
}

.thin-line {
    width: 100%;
    height: 1px;
    background-color: var(--colorLight);
    margin-bottom: 8px;
}

.day_and_description {
    display: grid;
    grid-template-columns: 2.5fr 16fr;
    grid-gap: 1.190vw;
    margin-top: 1.190vw;

}

.main-day-description {
    /* grid-column-start: 2; */
    /* grid-column-end: 3; */
    /* align-self: end; */
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.860vw;
    line-height: 96%;
    letter-spacing: -0.01em;
    color: var(--colorLight);
    white-space: pre-line;
}

.main-day-description span {
    color: var(--colorOrange);
}

.timesheet__day-container {
    display: flex;
    flex-direction: row;
    color: var(--colorLight);

}

.timesheet__day-number {
    font-family: 'Druk';
    font-style: italic;
    font-weight: 1000;
    font-size: 5.952vw;
    line-height: 85%;
    /* identical to box height, or 85% */

    text-align: center;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    margin-right: .7vw;


}

.timesheet__month {
    font-family: Helvetica, Arial, sans-serif;
    color: #929292;
}

.timesheet__month::before {
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    background-color: #929292;
}

.timesheet__timetable-grid {
    display: grid;
    grid-template-columns: 2.5fr 12fr 4fr;
    grid-gap: 1.190vw;
    margin-bottom: 0.818vw;
}


.slot-selection-text {
    margin-top: 1.190vw;
    margin-bottom: 1.190vw;
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.116vw;
    line-height: 107%;
    letter-spacing: -0.01em;
    color: var(--colorOrange);
    width: 100%;
    text-align: center;
    grid-column-start: 3;
    align-self: end;
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
}

.slot-selection-text::before {
    /* display: inline-block; */
    content: "";
    width: 100%;
    height: 1px;
    background-color: var(--colorOrange);
    margin-right: 8px;
}

.slot-selection-text::after {
    /* display: inline-block; */
    content: "";
    width: 100%;
    height: 1px;
    background-color: var(--colorOrange);
    margin-left: 8px;

}

.timesheet__timetable-grid-description {
    /* border-top: solid 1px var(--colorLight); */
    display: grid;
    grid-template-columns: 3fr 8fr;
    gap: 1.190vw;
}



.timesheet__timetable-grid-time {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.860vw;
    line-height: 96%;
    letter-spacing: -0.01em;
    color: var(--colorLight);
    white-space: nowrap;
    padding-right: 1.190vw;

}

.timesheet__timetable-grid-description-head {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.860vw;
    line-height: 96%;
    letter-spacing: -0.01em;
    color: var(--colorLight);
    white-space: pre-line;
    margin-bottom: 8px;

    /* white-space: nowrap; */
}


.timesheet__timetable-grid-description-text {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.116vw;
    line-height: 107%;
    letter-spacing: -0.01em;
    color: #929292;
    white-space: pre-line;
}

.timesheet__slot {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.116vw;
    line-height: 107%;
    color: var(--colorOrange);
    border: 1.4px solid var(--colorOrange);
    border-radius: 12px;
    padding: 0.595vw;
    transition: .25s;
    white-space: pre;

}


.timesheet__slot:hover {
    background-color: var(--colorOrange);
    color: var(--colorDark);
    cursor: pointer;
}

.timesheet__slot-arrow {
    background-image: url(../assets/images/arr2.svg);
    background-repeat: no-repeat;
    background-size: contain;
    width: 1.190vw;
    height: 1.190vw;
}


.slot-disable {
    border: 1.4px solid #929292;
    color: #929292;

}

.slot-disable .timesheet__slot-arrow {
    filter: grayscale() brightness(.8);

}

.slot-disable:hover {
    /* color: #929292; */
    background-color: #929292;


}

.timesheet__slot:hover>.timesheet__slot-arrow {
    filter: brightness(0);
}

.remind-me {
    display: grid;
    grid-template-columns: 2.5fr 12fr 4fr;
    grid-gap: 1.190vw;
    margin-bottom: 0.818vw;
    margin-top: 32px;
    font-family: 'Helvetica', sans-serif;
}

.remind-me h3 {

    font-family: Helvetica, Arial, sans-serif;
    color: var(--colorOrange);
    font-size: 1.860vw;
    font-style: normal;
    letter-spacing: -0.01em;
}

.remind-me button {
    background: transparent;
    border: 1.4px solid #FF5D0C;
    border-radius: 24px;
    font-style: normal;
    font-weight: 400;
    font-size: 1.116vw;
    line-height: 16px;
    color: #FF5D0C;
    padding: 8px 10px;
    transition: .25s;
    cursor: pointer;

}

.remind-me button:hover {
    background: #FF5D0C;
    color: white;
}

@media (max-width: 575.98px) {
    .black-window {
        padding-bottom: 48px;
        margin-bottom: 8px;
        padding: 16px 8px;
    }

    .timesheet__day-container {
        flex-direction: column;
    }

    .timesheet__month {
        font-size: 4.167vw;
        width: min-content;
    }

    .timesheet__timetable-grid-description {
        grid-template-columns: 1fr;
    }

    .timesheet__timetable-grid-time,
    .timesheet__timetable-grid-description-head {
        font-size: 5.58vw;
        white-space: normal;
        min-width: 25vw;
        padding-bottom: 12px;

    }

    .main-day-description {
        font-size: 5.556vw;
    }

    .day_and_description {
        grid-template-columns: 1fr 3fr;
        gap: 4.444vw;
    }

    .timesheet__timetable-grid-time {
        padding-right: 16px;
    }

    .timesheet__slot {
        font-size: 4.444vw;
        padding: 4.444vw 1.785vw;
        margin-top: 20px;
    }

    .container {
        grid-column-start: 1;
    }

    .slot-selection-text {
        grid-column-start: 1;
    }

    /* 
    .timesheet__slot::before {
        position: absolute;
        content: "Зарегистрироваться в слот";
        transform: translateY(-30px);

    } */

    .timesheet__slot-arrow {
        width: 16px;
        height: 16px;
    }

    .timesheet__timetable-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        padding-top: 32px;
    }

    .timesheet__day-number {
        font-size: 18vw;
        padding-right: 8px;
        text-align: start;

    }

    .slot-selection-text,
    .timesheet__timetable-grid-description-text {
        font-size: 4.444vw;
    }

    .remind-me {
        display: block;
    }

    .remind-me h3 {
        font-size: 4.167vw;
        margin-bottom: 32px;
    }

    .remind-me button {
        width: 100%;
        font-size: 3.348vw;
    }

    .pict-descr-container{
        flex-direction: column;
    }
    .round-icon{
        width: 44.444vw;
        height: 44.444vw;
        margin-top: -32px;
        margin-bottom: 16px;
    }

}
</style>