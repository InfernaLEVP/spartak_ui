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

        <div v-if="isDayOpened(day) && renderFlag" :class="[isDayClosed(day)]">
            <!--  -->
            <div class="timesheet__timetable-grid">
                <!-- {{console.log("needday", day)}} -->
                <p v-if="isDayEight(day)" class="slot-selection-text"> Выбери слот<br>для регистрации </p>
            </div>

            <!-- Блок заголовка аккордиона -->

            <div class="ober" v-for="slot in uiData.slots" :key="slot.slot_name" style="--oberHeight: 0px">

                <div class="timesheet__timetable-grid">

                    <div class="container">
                        <div class="thin-line"></div>
                        <div class="timesheet__timetable-grid-description">
                            <div class="timesheet__timetable-grid-time">{{ (slot.slot_start_time ? slot.slot_start_time
                                    :
                                    '12:00') + "—" + slot.slot_end_time
                            }}
                            </div>
                            <div>
                                <h3 class="timesheet__timetable-grid-description-head">{{ slot.slot_name }}</h3>
                                <p class="timesheet__timetable-grid-description-text">{{ slot.slot_description }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- class="slot-disable" добавить этот класс, когда регистрация не открыта -->

                    <!-- <div class="timesheet__slot" @click="bookSlot(event)"> -->
                    <div :class="['timesheet__slot']" @click="openAccordion">
                        <p>Подробнее</p>
                        <!-- <p>{{ slot.slot_start_time + "—" + slot.slot_end_time }}</p> -->
                        <div :class="[showAccordion ? 'timesheet__slot-arrow-opened' : 'timesheet__slot-arrow']"></div>
                    </div>
                </div>

                <!-- Блок одного события аккордиона -->
                <div class="ober-items-wrapper">

                    <div class="ober" v-for="(event, index) in slot.slot_events" :key="event.name">
                        <!-- v-show="showAccordion" -->
                        <div class="timesheet__timetable-grid">

                            <div class="container">
                                <!-- <div class="thin-line"></div> -->
                                <div class="timesheet__timetable-grid-description">
                                    <div class="timesheet__timetable-grid-time-small" style="opacity:0;">
                                        {{ (event.eventStartTime ? '12:00' : event.eventStartTime) + "—" +
                                                event.eventEndTime
                                        }}
                                    </div>
                                    <div>

                                        <h4 class="timesheet__timetable-grid-description-head-small">{{ event.name }}
                                        </h4>
                                        <p class="timesheet__timetable-grid-description-text-small">{{ event.description
                                        }}
                                        </p>

                                    </div>
                                </div>
                            </div>

                            <!-- class="slot-disable" добавить этот класс, когда регистрация не открыта -->

                            <div class="timesheet__slot" :id="`_${day.day}${event.slot_number}${index + 1}`"
                                @click="bookSlot(event)">
                                <p>Регистрация</p>
                                <div class="timesheet__slot-arrow"></div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

            <!--  -->
        </div>
        <div class="remind-me" v-else :style="`${day.day === '08' ? 'opacity: 0;' : ''}`">
            <div></div>

            <h3>Программа на день скоро появится</h3>
            <button @click="bookDay(day)">Уведомить меня</button>

        </div>
        <Relis v-if="isReliseTrue(day)" :day="day" />

    </div>


</template>

<script>
// import data from '../data/data.json';
import Relis from '@/components/Relis.vue';

export default {
    name: 'TimesheetOneRow',
    components: {
        Relis
    },
    props: {
        day: Object,
        daySlots: Array,
    },
    data() {
        return {
            data: undefined,
            showAccordion: false,
            uiData: undefined,
            renderFlag: false
        }
    },
    created() {
        // this.data = data;
        setTimeout(() => {
            this.uiData = this.daySlots.find(d => d.day === this.day.day);
            if (this.uiData && !this.uiData.slots) {
                this.uiData.slots = [];
            }
            this.renderFlag = true;
        }, 2000);
    },
    methods: {
        bookSlot(info) {
            this.$emit('bookSlot', info);
        },
        bookDay(day) {
            this.$emit('bookDay', day);
        },
        isReliseTrue(day) {
            console.log({day});
            if (day.day === '05' || day.day === '06'|| day.day === '07' || day.day === '08' || day.day === '09') {
                return true;
            }
        },
        isDayOpened(day) {
            // if(day.day === '08'){
            //     return false;
            // }
            // console.log({day});
            if (day.day === '12') {
                return true;
            }
            const _date = new Date(Date.now());

            if (_date.getDate() >= day.openDay.split('.')[0] && _date.getMonth() + 1 === Number(day.openDay.split('.')[1])) {
                return true;
            } else {
                return false;
            }

        },
        isDayEight(day) {

            if (day.day !== '08') {
                // console.log(day)
                return true;
            } else {
                return false;
            }

        },
        openAccordion(event) {
            console.log(event.target);

            event.target.classList.toggle('timesheet__slot-opened');
            const wrapper = event.target.parentNode.parentNode;

            const currentState = wrapper.style.getPropertyValue('--oberHeight');

            if (currentState === '0px') {
                const oberHeight = wrapper.querySelector('.ober-items-wrapper').scrollHeight + 'px';
                wrapper.style.setProperty('--oberHeight', oberHeight);
            } else {
                wrapper.style.setProperty('--oberHeight', '0px');
            }

            // ober-items-wrapper
        },
        isDayClosed(day) {
            if (day.day === '05' || day.day === '06' || day.day === '07' || day.day === '08'  || day.day === '09'  || day.day === '10'   || day.day === '11'   || day.day === '12') {
                return 'closed-day';
            } else {
                return '';
            }
        }
    },
    computed: {
        needDay() {
            if (this.data) {
                return this.data.filter(d => d.day === this.day.day);
            } else {
                return [];
            }
        },

    }
}
</script>

<style scoped>
.relis__wrapper {
    grid-column-start: 2;

}

.timesheet__relise-header {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: max(20px, 1.860vw);
    line-height: 96%;
    letter-spacing: -0.01em;
    color: #FFFFFF;
    margin-top: 50px;
    margin-bottom: 8px;


}

.timesheet__relise-header::before {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    background-color: #FFFFFF;
    margin-bottom: 10px;
}

.timesheet__relise {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: max(16px, 1.116vw);
    line-height: 110%;
    letter-spacing: -0.01em;
    color: #FFFFFF;
    margin-bottom: 8px;
}


.relis-images-container {
    display: flex;
    flex-direction: row;
}

.relis__images {
    /* height: 50px; */
    max-width: 100%;
    margin-top: 8px;
    margin-right: 8px;
    width: 120px;
    height: 120px;
    object-fit: cover
}



.closed-day {
    /* .timesheet__slot */
    display: none;
    pointer-events: none;
    /* border: 1px solid gray;
    color: gray; */
    filter: grayscale();
}

.ts-header {
    color: var(--colorLight);
}

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
    /* padding-right: 1.190vw; */

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

.timesheet__timetable-grid-description-head-small {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.395vw;
    line-height: 96%;
    letter-spacing: -0.01em;
    color: var(--colorLight);
    white-space: pre-line;
    margin-bottom: 8px;

    /* white-space: nowrap; */
}


.timesheet__timetable-grid-description-text-small {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.116vw;
    line-height: 107%;
    letter-spacing: -0.01em;
    color: #929292;
    white-space: pre-line;
}

.timesheet__timetable-grid-time-small {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.395vw;
    line-height: 96%;
    letter-spacing: -0.01em;
    color: var(--colorLight);
    white-space: nowrap;
    padding-right: 1.190vw;

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

.timesheet__slot>* {
    pointer-events: none;
}

.timesheet__slot-opened {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.116vw;
    line-height: 107%;
    background-color: var(--colorOrange);
    color: var(--colorDark);
    border: 1.4px solid var(--colorOrange);
    border-radius: 12px;
    padding: 0.595vw;
    transition: .25s;
    white-space: pre;
    cursor: pointer;

}

.timesheet__slot-opened:hover {
    opacity: .8;
}

.inActive {
    border: 1.4px solid var(--colorDark2);
    cursor: not-allowed;
}

.timesheet__slot:hover {
    background-color: rgba(255, 93, 12, 0.8);
    color: var(--colorDark);
    cursor: pointer;
    /* opacity: .8; */
}

.timesheet__slot-arrow {
    background-image: url(../assets/images/arr2.svg);
    background-repeat: no-repeat;
    background-size: contain;
    width: 1.190vw;
    height: 1.190vw;
    transition: all .3s;
}

.timesheet__slot-opened .timesheet__slot-arrow {
    background-image: url(../assets/images/arr2.svg);
    background-repeat: no-repeat;
    background-size: contain;
    width: 16px;
    height: 16px;
    transform: rotate(90deg);
    filter: brightness(0);
    transition: all .3s;


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

.opened:hover {
    background-color: var(--colorDark);
    color: var(--colorOrange);
    cursor: pointer;
}

.opened:hover>timesheet__slot-arrow {
    transform: rotate(0);
    filter: brightness(100);
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

    .timesheet__timetable-grid-time-small,
    .timesheet__timetable-grid-description-head-small {

        font-size: 4.5vw;

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

    .pict-descr-container {
        flex-direction: column;
    }

    .round-icon {
        width: 44.444vw;
        height: 44.444vw;
        margin-top: -32px;
        margin-bottom: 16px;
    }

    .timesheet__slot-opened .timesheet__slot-arrow {
        background-image: url(../assets/images/arr2.svg);
        background-repeat: no-repeat;
        background-size: contain;
        width: 16px;
        height: 16px;
        transform: rotate(90deg);
        filter: brightness(0);
        transition: all .3s;


    }

    .relis__wrapper {
        grid-column: 1/-1;


    }





}

.ober-items-wrapper {
    height: var(--oberHeight);
    /* height: 0; */
    transition: all .22s;
    overflow: hidden;
}
</style>