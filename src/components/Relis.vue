<template>
    <div class="ober">

        <div class="timesheet__timetable-grid" style="--oberHeight: 0px;">
            <div class="relis__wrapper">
                <h2 class="timesheet__relise-header">{{ currentDay.title }}</h2>
                <p class="timesheet__relise">{{ currentDay.description }}</p>
                <div class="relis-images-container">
                    <div class="zoom-gallery">
                        <a :href="`/relis/${currentDay.day}/${img}_resized.JPG`" :data-source="`/relis/05/${img}.JPG`"
                            v-for="img in currentDay.images" :key="img">
                            <img :src="`/relis/${currentDay.day}/${img}_thumbnail.JPG`" alt="" class="relis__images">
                        </a>
                    </div>

                </div>

                <div class="ober-items-wrapper timesheet__relise-more" v-html="currentDay.more"></div>

            </div>
            <div :class="['timesheet__slot']" @click="openAccordion">
                <p>{{ showText ? 'Свернуть' : 'Читать полностью' }}</p>
                <!-- <p>{{ slot.slot_start_time + "—" + slot.slot_end_time }}</p> -->
                <div :class="[showAccordion ? 'timesheet__slot-arrow-opened' : 'timesheet__slot-arrow']"></div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    name: 'Relis',
    props: {
        day: Object
    },
    data() {
        return {
            showText: false,
            days: [
                {
                    day: '05',
                    title: 'Первый день на Winliner – море эмоций и незабываемых впечатлений!',
                    images: [
                        'IMG_4084',
                        'IMG_4085',
                        'IMG_4098',
                        'IMG_4099',
                        'IMG_4108'
                    ],
                    description: 'Стартовал первый день на Winliner, который погрузил гостей в атмосферу 20-30-х годов футбольного клуба «Спартак». Игра ретро-мячами, ретро-форма, атмосферная музыка и многое другое – все это ждало болельщиков красно-белых на палубе!',
                    more: `
                        <p class="timesheet__relise">
                            Утренний рейс Winliner начался с арт-перформанса со стрит-арт-художником. Вместе с ним
                            болельщики создавали огромный ромб в фирменных цветах «Спартака». Продолжилось плавание
                            футбольным турниром «Московского клуба спорта», по итогам которого были определены 16 лучших
                            футболистов, по числу членов команды МКС в далеком 1922 году, которая и считается
                            предшественницей легендарного «Спартака».
                        </p>
                        <p class="timesheet__relise">
                            На клубном YouTube-канале вышел первый выпуск «Студии 1922», которая будет рассказывать о самых
                            интересных событиях на Winliner ежедневно на протяжении всех дней празднования. Сегодня ведущими
                            выпуска стали голос стадиона ФК «Спартак» Кирилл Калинин, а также большой знаток футбола и
                            английский голос РПЛ Алексей Ярошевский, а также журналист, болельщик красно-белых и автор
                            самого яркого репортажа с награждения спартаковцев за победу в Кубке России-2022 Данила Махалин.
                        </p>
                        <p class="timesheet__relise">
                            Завершился вечер не менее символично – все присутствующие спели любимую песню всех болельщиков
                            «Спартака» – «Знаешь ли ты» певицы Макsим.
                            Первый день плавания Winliner получился очень насыщенным. Ожидаемо самым любимым местом гостей
                            на палубе стала фотозона с Кубком России! А ведь у болельщиков впереди еще целая неделя, чтобы
                            насладиться самыми разнообразными мероприятиями к 100-летию ФК «Спартак».
                        </p>
                    `
                },
                {
                    day: '06',
                    title: 'Золотые 50-е «Спартака»: как прошёл второй день плавания на Winliner',
                    images: [
                        'IMG_4224',
                        'IMG_4227',
                        'IMG_4264',
                        'IMG_4295',
                        'IMG_4298'
                    ],
                    description: 'Каждый день на Winliner — особенный, ведь посвящён разным эпохам ФК «Спартак», и сегодня гости погрузились в атмосферу золотых 50-х.',
                    more: `
                        <p class="timesheet__relise">
                            Утро началось со встречи с Александром Самедовым — чемпионом России 2016/17 в составе красно-белых, а также с известным журналистом Леонидом Трахтенбергом. Самедов рассказал болельщикам о том, как начинал свою карьеру в составе ФК «Спартак», как сложно было уходить из родного любимого клуба и, конечно же, о своём триумфальном возращении.
                        </p>
                        <p class="timesheet__relise italic">
                            <i>«Впервые я выступил за ФК «Спартак» в 2002 году — это был мой дебют. Было очень волнительно, ведь команда — легендарная, чего стоил только тренер Станислав Черчесов и Егор Титов. Мы — воспитанники московского «Спартака» — все мечтали походить на него», — отметил <span class="relisBold">Александр Самедов</span>.</i>
                        </p>
                        <p class="timesheet__relise">
                            Днём гостям пришлось немного напрячься, ведь тренеры академии клуба — Егор Горобцов и Елена Терехова — подготовили для них футбольные челленджи. В них приняли участие T-Killah, Даниил Крапивников, Игорь Олейник, Лев Соленов, Эльхан Салахов и Жан-Пьер Папен. Ребятам пришлось выполнить 3 задания — борьба развернулась нешуточная.
                        </p>
                        <p class="timesheet__relise">
                            Вечер же прошёл уже в более спокойной обстановке на встрече с Александром Якушевым — советским хоккеистом и тренером, заслуженным мастером спорта СССР. «Я надеюсь, что в скором времени мы будем праздновать не только финал Кубка России, но и чемпионство. Финал показал, какими должны быть матчи внутреннего чемпионата по посещаемости» — поделился с болельщиками <span class="relisBold">Александр Якушев</span>.
                        </p>
                    `
                },
                {
                    day: '07',
                    title: 'Winliner отправился в легендарные джазовые!',
                    images: [
                        'IMG_6023',
                        'IMG_6022',
                        'IMG_6020',
                        'IMG_6024',
                        'IMG_6025',
                    ],
                    description: 'Третий день празднования 100-летия ФК «Спартак» начался с отличной погоды. По-настоящему летнее солнце и безоблачное небо располагали к прохладным напиткам, беседам с единомышленниками и джазовой музыке!',
                    more: `
                        <p class="timesheet__relise">
                            Днем состоялась встреча с <span class="relisBold">Артёмом Ребровым</span> – чемпионом России 2016/2017 в составе красно-белых, а ныне членом штаба команды. Он рассказал гостям лайнера о том, как учился играть в футбол, о главных матчах в своей карьере, о чемпионстве в составе «Спартака» и о том, почему же не уехал играть в Европу.
                        </p>
                        <p class="timesheet__relise italic">
                            «Играть я начинал в середине 90-х во дворе района Строгино. Все стандартно – ободранные коленки, локти, но море удовольствия. В это же время и «Спартак» начал активно побеждать в Европе в футбольной Лиге. Я не мог оставить это в стороне и начал следить за командой, ездить на домашние матчи. Так постепенно футбол и захватил меня», – отметил футболист.
                        </p>
                        <p class="timesheet__relise">
                            А вечером гости встретились и пообщались с <span class="relisBold">Владимиром Бесчастных</span> – знаменитым нападающим «Спартака» 90-х. «Болельщики – это самая основная сила перед игрой. Когда ты выходишь на разминку, когда ты выходишь на поле и вот когда тебя так приветствуют. А потом – когда забиваешь! Эмоции непередаваемые», – поделился легендарный футболист на встрече с гостями Winliner.
                        </p>
                        <p class="timesheet__relise">
                            Завершился день в атмосфере великолепного джазового концерта, который подарил всем присутствующим возможность расслабиться и получить удовольствие от музыки в исполнении профессионалов.
                        </p>
                    `
                },
                {
                    day: '08',
                    title: '4 день на Winliner – количество болельщиков растет!',
                    images: [
                        'IMG_6950',
                        'IMG_7039',
                        'IMG_4396',
                        'IMG_6970',
                        'IMG_7016',
                    ],
                    description: 'Большое количество фанатов и любителей футбола пришли на Winliner именно сегодня, ведь тематика дня – болельщики красно-белых.',
                    more: `
                        <p class="timesheet__relise">
                            Утренняя прогулка началась со встречи с четырехкратным серебряным призером России <span class="relisBold">Никитой Баженовым</span>. Никита рассказал о своей карьере, вспомнил много интересных историй, раскрыл некоторые секреты «футбольного закулисья» и дал несколько советов, как держать себя в хорошей форме. Он также отметил, что российским клубам и сборной нужно чаще играть против сильных соперников, против лучших команд мира, прокачивать себя. Камиля Харисова и Никита Баженов также обсудили легендарный матч в Лужниках.
                        </p>
                        <p class="timesheet__relise italic">
                            «Я думаю, что победа в Кубке России, конечно, значима для клуба. Во-первых, «Спартак» не так часто выигрывал Кубок страны. Во-вторых, прекрасный юбилейный год, учитывая неудачи в чемпионате, я думаю, что для болельщиков победа в турнире сгладила это», – отметил <span class="relisBold">Никита Баженов</span>.
                        </p>
                        <p class="timesheet__relise">
                            Также гости лайнера сегодня смогли лично пообщаться с <span class="relisBold">Романом Шишкиным</span>. Из первых уст присутствующие услышали о детстве футболиста, проведенном в Воронеже. Узнали, как началась карьера в «Спартаке», которую Роман хотел бы продолжить, но, к сожалению, клуб пришлось покинуть. На вопрос Кирилла Калина, какой самый запоминающийся момент за последний год, Роман Шашкин с уверенностью ответил – Кубок России.
                        </p>
                        <p class="timesheet__relise">
                            Вечер украсил своим визитом <span class="relisBold">Михаил Игнатов</span>, полузащитник московского «Спартака» и молодежной сборной России. Михаил Игнатов считает, что «поражения бывают у всех, но на этом не стоит останавливаться, понятное дело, что эмоции после игры тяжелые, поэтому мы просто собираемся, идем домой к семьям и общаемся».
                        </p>
                    `
                },
                {
                    day: '09',
                    title: 'Легендарный «спартаковский» стиль — какой он?',
                    images: [
                        'IMG_4423',
                        'IMG_4426',
                        'IMG_4436',
                        'IMG_4448',
                        'IMG_4458',
                        'IMG_4459',
                        'IMG_4471',
                        'IMG_4477',
                    ],
                    description: 'Сегодня на Winliner день «секретных» открытий, ведь у гостей была уникальная возможность познакомиться с легендарным стилем красно-белых: узнать, что такое «спартаковские кружева» команды Бескова, «магия Черенкова», «передачи Гаврилова» и многое другое. Порадовали присутствующих и звездные спикеры – Юрий Ковтун, Александр Филимонов, Дмитрий Парфёнов, Ринат Дасаев, Виктор Булатов, Сергей Шавло, Валерий Шмаров и Дмитрий Ананко.',
                    more: `
                        <p class="timesheet__relise">
                            Нет ничего лучше и интереснее, чем узнать о легендарном «спартаковском» стиле из первых уст. Именно поэтому на Winliner этому был посвящен отдельный день, и он оказался, пожалуй, одним из самых насыщенных!
                        </p>
                        <p class="timesheet__relise">
                           Утром лайнер посетили <span class="relisBold">Юрий Ковтун</span> – бывший защитник ФК «Спартак», который рассказал о своем переходе в клуб, победах и неудачах в карьере, а также <span class="relisBold">Александр Филимонов</span>. Он поделился историей о том, как не выиграл Чемпионат мира в большом футболе, но смог сделать это в пляжном. Не обошел стороной он и свои впечатления от матча за Кубок России. Также Александр Филимонов поделился с болельщиками, что хочет стать тренером: «В августе собираюсь поступить на тренерские курсы, чтобы совершенствовать свои способности»
                        </p>
                        <p class="timesheet__relise">
                            О своем опыте рассказал и <span class="relisBold">Дмитрий Парфёнов</span>, который своим примером доказал, что небольшой рост – не проблема для футболиста. Как и его коллеги «по цеху», он очень верит в российский футбол.
                        </p>
                        <p class="timesheet__relise">
                            Днем гостей Winliner ждал вратарский челлендж, посвященный Ринату Дасаеву. В нем приняли участие футболистка, бывший голкипер сборной России по футболу <span class="relisBold">Елена Рыжикова</span>, российский хоккеист, вратарь московского «Спартака», бронзовый призер чемпионата МХЛ сезона 2015/16 в составе «Сибирских снайперов» <span class="relisBold">Алексей Красиков</span>.
                        </p>
                        <p class="timesheet__relise italic">
                        Насыщенной получилась и встреча с самим <span class="relisBold">Ринатом Дасаевым</span>. Он поделился самыми яркими моментами своей карьеры, о том, как с ним хотели сфотографироваться легендарные зарубежные вратари, о том, мог ли он взять тот самый удар Марко ван Бастена и, конечно же, об эмоциях от приза «Лучший вратарь мира».
                        </p>
                        <p class="timesheet__relise">
                        «Новость пришла перед игрой с «Динамо» (Киев). Трахтенберг сказал Константину Ивановичу Бескову, а я мельком услышал. Мне вручили кубок. Игра удачно сложилась, мы выиграли 1:0. Я всегда ставил перед собой задачу куда-то попасть – и к этому званию всегда стремился. Когда тебе перед матчем говорят, что ты лучший вратарь мира, и дают кубок с перчатками, которые весят 30 кг – это, конечно, окрыляет», – отметил легендарный вратарь.
                        </p>
                        <p class="timesheet__relise">
                        Пообщались с гостями и <span class="relisBold">Виктор Булатов</span> – трехкратный чемпион России в составе «Спартака», и <span class="relisBold">Сергей Шавло</span> – бывший генеральный директор и полузащитник «Спартака». Его история была посвящена тому, как была устроена работа клуба в его годы и что он сделал, чтобы завоевать путевку в Лигу Чемпионов. Ключевым моментом его выступления стал рассказ про постановку легендарного стиля игры красно-белых.
                        </p>
                        <p class="timesheet__relise">
                        Вечер завершился в компании Валерия Шмарова, советского и российского футболиста, нападающего, мастера спорта СССР, и Дмитрия Ананко, защитника «Спартака», участвовавшего в девяти чемпионских сезонах красно-белых.
                        </p>
                    `
                }
            ]
        }
    },
    created() {

    },
    mounted() {
        $(document).ready(function () {
            $('.zoom-gallery').magnificPopup({
                delegate: 'a',
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: false,
                mainClass: 'mfp-with-zoom mfp-img-mobile',
                image: {
                    verticalFit: true,
                    titleSrc: function (item) {
                        return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
                    }
                },
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true,
                    duration: 300, // don't foget to change the duration also in CSS
                    opener: function (element) {
                        return element.find('img');
                    }
                }

            });
        });
    },
    methods: {
        openAccordion(event) {
            // console.log(event.target);
            this.showText = !this.showText
            console.log(this.showText)

            event.target.classList.toggle('timesheet__slot-opened');
            const wrapper = event.target.parentNode;

            const currentState = wrapper.style.getPropertyValue('--oberHeight');

            if (currentState === '0px') {
                const oberHeight = wrapper.querySelector('.ober-items-wrapper').scrollHeight + 'px';
                wrapper.style.setProperty('--oberHeight', oberHeight);
            } else {
                wrapper.style.setProperty('--oberHeight', '0px');
            }

            // ober-items-wrapper
        },
    },
    computed: {
        currentDay() {
            const result = this.days.find(d => d.day === this.day.day);
            return result;
        }
    }
}
</script>

<style scoped>
.timesheet__relise-header {
    font-size: max(22px, 1.5vw);
    line-height: 100%;
}

.relis__images {
    width: 120px;
    height: 120px;
    object-fit: cover;
}

.timesheet__timetable-grid {
    /* display: grid;
        grid-template-columns: 2.5fr 12fr 4fr; */
    /* grid-gap: 1.190vw; */
    margin-bottom: 4.464vw;
    margin-top: 64px;
    /* margin-left: 10vw; */
    display: grid;
    grid-template-columns: 3fr 11fr 4fr;

}

@media(max-width: 768px) {
    .timesheet__timetable-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        padding-top: 32px;
        flex-direction: column;
    }
}

.relis__wrapper {
    font-family: 'Helvetica';
    font-weight: 400;
    font-size: 15px;
    line-height: 16px;
    color: white;
    grid-column-start: 2;
    border-top: 1px solid white;
    padding-top: 7px;

    /* width: 80%; */
    padding-right: 15px;
}

@media(max-width: 768px) {
    .relis__wrapper {
        grid-column-start: 1;
        max-width: calc(100vw - 16px);
        width: 100% !important;
    }

    .zoom-gallery {
        flex-wrap: nowrap !important;
        ;
    }
}

.zoom-gallery {
    display: flex;
    margin-top: 20px;
    gap: 8px;
    flex-wrap: wrap;
}

.relis-images-container img {
    width: max(100px, 7vw);
    height: max(100px, 7vw);
}

.timesheet__relise-more {
    height: var(--oberHeight);
    transition: all .2s;
    overflow: hidden;
}

.timesheet__slot {
    grid-column-start: 3;

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
    cursor: pointer;
    align-self: end;
    /* width: 20%; */
}

@media(max-width: 768px) {
    .zoom-gallery {
        overflow: scroll;
    }

    .timesheet__slot {
        grid-column-start: 1;
        font-size: 4.444vw !important;
        padding: 4.444vw 1.785vw !important;
        margin-top: 20px !important;
        width: 100% !important;
    }

    .timesheet__slot-opened {
        font-size: 4.444vw !important;
        padding: 4.444vw 1.785vw !important;
        margin-top: 20px !important;
    }

    .timesheet__slot-arrow {
        width: 16px !important;
        height: 16px !important;
    }
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
    transform: rotate(-90deg);
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

.timesheet__relise-more>p {
    margin: 20px 0 !important;
}
</style>