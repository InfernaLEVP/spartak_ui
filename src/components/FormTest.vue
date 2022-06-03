<template>
    <transition name="fade">

        <div class="form-popup" id="myForm">

            <div class="backdrop" @click="closeModal"></div>

            <form id="myform" action="/action_page.php" class="form-container" @submit="formOrder" autocomplete="off">

                <lottie-player v-show="loaderProgress" :src="loader" background="transparent" speed="1"
                    style="width: 100%; height: 100%; position: absolute; z-index: 99; top: 0; left: 0; background: rgba(0,0,0,.85);"
                    loop autoplay></lottie-player>

                <div class="hidden"></div>

                <div class="inputs" v-show="renderType === 'ordinary'">
                    <h2 class="form-head" v-html="titleText"></h2>
                    <p class="form-datetime" v-html="additionalText"></p>

                    <!-- Московский клуб спорта -->
                    <div class="msk" v-if="isMSK">
                        Формат турнира: <br>
                        - 8 команд, 2 группы по 4 команды, стадия плэй-офф; <br>
                        - 4х4, без вратарей; <br>
                        - 2 тайма по 3 минуты.
                    </div>
                    <!-- ./Московский клуб спорта -->

                    <!-- 1922  -->
                    <div class="select" v-if="this.formType === '1922'">
                        <select id="standard-select-day" v-model="matchDay" required>
                            <option value="" disabled selected>Выберите день</option>
                            <option value="11">11 июня</option>
                            <option value="12">12 июня</option>

                        </select>
                    </div>
                    <div class="select" v-if="this.formType === '1922'">
                        <select id="standard-select-match" v-model="matchTime" required>
                            <option value="" disabled selected>Выберите время</option>

                            <option v-if="matchDay === '12'" value="Слот 1 - 8:00 - 10:30">Слот 1 - 8:00 - 10:30
                            </option>
                            <option v-if="matchDay === '12'" value="Слот 2 - 11:00 - 13:30">Слот 2 - 11:00 - 13:30
                            </option>
                            <option v-if="matchDay === '12'" value="Слот 3 - 14:00 - 16:30">Слот 3 - 14:00 - 16:30
                            </option>
                            <option v-if="matchDay === '12'" value="Слот 4 - 17:00 - 20:30">Слот 4 - 17:00 - 20:30
                            </option>

                            <option v-if="matchDay === '11'" value="Слот 1 - 11:00 - 13:30">Слот 1 - 11:00 - 13:30
                            </option>
                            <option v-if="matchDay === '11'" value="Слот 2 - 14:00 - 16:30">Слот 2 - 14:00 - 16:30
                            </option>
                            <option v-if="matchDay === '11'" value="Слот 3 - 17:00 - 20:00">Слот 3 - 17:00 - 20:00
                            </option>
                            <option v-if="matchDay === '11'" value="Слот 4 - 20:30 - 23:00">Слот 4 - 20:30 - 23:00
                            </option>

                        </select>
                    </div>
                    <div class="input-wrapper" id="teamName-input">
                        <input type="text" id="teamName" name="teamName" placeholder="Название команды"
                            v-model="teamName" required>
                        <span class="validation-message">Это поле обязательно</span>
                        <div class="line"></div>
                    </div>
                    <!-- ./1922 -->

                    <div class="select" v-if="this.formType === 'media'">
                        <select id="standard-select" v-model="media" required>
                            <option value="" disabled selected>СМИ / Блогер / Фотограф</option>
                            <option value="СМИ">СМИ</option>
                            <option value="Блогер">Блогер</option>
                            <option value="Фотограф">Фотограф</option>
                        </select>
                    </div>

                    <div class="input-wrapper" id="fname-input">
                        <input type="text" id="fname" name="firstname" placeholder="Имя" v-model="name" required>
                        <span class="validation-message">Это поле обязательно</span>
                        <div class="line"></div>
                    </div>


                    <!-- <div class="input-wrapper" id="fname-input">
                        <input type="text" id="fname" name="firstname" placeholder="Имя" v-model="name">
                        <span class="validation-message">Это поле обязательно</span>
                        <div class="line"></div>
                    </div> -->

                    <div class="input-wrapper" id="lname-input">
                        <input type="text" id="lname" name="lastname" placeholder="Фамилия" required
                            v-model="familyName">
                        <div class="line"></div>
                    </div>

                    <div class="input-wrapper" id="phone-input">
                        <input type="tel" placeholder="Телефон" id="telPhone" name="phone"
                            v-maska="'+7 (###) ###-##-##'" required v-model="phone" @input="pInput">
                        <span class="validation-message">Неверный формат</span>
                        <div class="line"></div>
                    </div>

                    <div class="input-wrapper" id="email-input">
                        <input type="text" placeholder="Email" id="email" name="email-input" required v-model="email">
                        <span class="validation-message">Неверный формат</span>
                        <div class="line"></div>
                    </div>

                    <div class="input-wrapper" id="stavka-input">
                        <input type="text" placeholder="Номер ставки Winline" name="stavka" v-maska="'#########'"
                            required v-model="stavka" v-if="info.need_stavka === '1'">
                        <span class="validation-message">Неверный формат</span>
                        <div class="line" v-if="info.need_stavka === '1'"></div>
                    </div>

                    <!-- Московский клуб спорта -->
                    <div class="input-wrapper" id="team-input" v-if="isMSK">
                        <input type="text" name="team" id="team" placeholder="Название команды" v-model="team">
                        <span class="validation-message">Неверный формат</span>
                        <div class="line"></div>
                    </div>
                    <!-- ./Московский клуб спорта -->

                    <!--  -->
                    <div class="input-wrapper" id="social-input" v-if="formType === 'media'">
                        <input type="text" name="url" placeholder="Название издания" v-model="socials">
                        <span class="validation-message">Неверный формат</span>
                        <div class="line"></div>
                    </div>

                    <p class="personal">
                        Регистрируясь вы соглашаетесь с
                        <span v-if="formType === '1922'">
                            <a href="https://winliner.ru/Положение_Легендарного_матча_1922.pdf" target="_blank"
                                class="personal-link match-rules">
                                правилами футбольного матча</a>
                            и
                        </span>

                        <a href="https://winliner.ru/Winliner_Политика_обработки_персональных_данных.pdf"
                            target="_blank" class="personal-link">
                            политикой обработки персональных данных
                        </a>
                        <span v-if="isMSK">
                            и
                            <a href="https://winliner.ru/Положение_МКС.pdf" target="_blank" class="personal-link">
                                ознакомились с положением
                            </a>
                        </span>
                    </p>
                </div>

                <div class="result" v-show="renderType === 'success'">

                    <p v-if="formType === '1922'">Спасибо, твоя заявка принята.</p>

                    <p v-if="formType === 'media'">Спасибо, твоя заявка принята.</p>
                    <p v-if="formType === 'remind'">
                        Спасибо, твоя заявка принята. <br>
                        В день открытия регистрации на {{ info.day }} июня ты получишь уведомление на указанную
                        почту.<br>

                    </p>
                    <p v-if="confirmMessage" class="confirm-message">Теперь тебе необходимо подтвердить свой email.</p>

                    <!-- <p>После проверки заявки и прохождении модерации ты получишь письмо с детальной информацией на указанный e-mail адрес.</p> -->

                    <p v-html="lineBreaks(info.form_text_after_registr)"></p>

                    <!-- v-if="info.need_winline_registr == '1'" -->
                    <a href="https://winline.ru/freebet1000/?utm_source=Winliner&utm_medium=registration&utm_campaign=freebet2000"
                        type="submit" class="btn orange-btn">Зарегистрироваться на Winline</a>
                    <button type="submit" class="btn" @click="closeModal">Закрыть</button>
                </div>

                <div class="result" v-show="renderType === 'taken'">
                    <p>Ты уже участвуешь в этом слоте</p>
                </div>
                <div class="result" v-show="renderType === 'updated'">
                    <p>Отлично! Ты добавил команду!</p>
                </div>
                <div class="result" v-show="renderType === 'fullMatch'">
                    <p>На данный момент состав участников на «Легендарный матч 1922» полностью укомплектован.
                        Регистрируй свою команду и мы уведомим тебя, если кто-то из игроков не сможет принять участие и
                        место освободится.</p>

                    <p class="text1922">Формат турнира:</p>
                    <p class="text1922">Командная заявка заполняется капитаном. 16 команд принимает участие в рамках
                        выбранного временного слота.
                        Формат игры 4х4, без вратарей. Один матч длится 5 минут. обедившая команда остаётся на площадке,
                        проигравшая покидает поле и становится последней в очереди</p>
                </div>
                <div class="result" v-show="renderType === 'okMatch'">
                    <p>После проверки заявки и прохождения модерации ты получишь письмо с детальной информацией на
                        указанный e-mail адрес за 3 дня до мероприятия.</p>
                    <br><br>
                    <p>Все зарегистрированные пользователи Winline получат доступ к уникальным активностям и розыгрышам
                        призов.</p>
                    <br><br>
                    <p>Советуем пройти регистрацию на Winline заранее, чтобы к моменту визита на Winliner у тебя уже был
                        активный аккаунт.</p>
                    <br><br>
                    <p class="text1922">Формат турнира:</p>
                    <p class="text1922">Командная заявка заполняется капитаном. 16 команд принимает участие в рамках
                        выбранного временного слота.
                        Формат игры 4х4, без вратарей. Один матч длится 5 минут. обедившая команда остаётся на площадке,
                        проигравшая покидает поле и становится последней в очереди</p>
                </div>

                <button type="submit" class="btn" v-show="renderType === 'ordinary'">{{ buttonText }}</button>
                <button type="button" class="cancel" @click="closeModal"></button>

            </form>

        </div>

    </transition>
</template>

<script>
import loader from '../data/loader.json';
import days from '../data/day_description.json';

export default {
    name: 'BookForm',
    props: {
        info: Object,
        formType: String,
        params: Object
    },
    data() {
        return {
            name: '',
            familyName: '',
            phone: '',
            email: '',
            loader: '',
            loaderProgress: false,
            renderType: 'ordinary',
            teamUpdateMessage: false,
            confirmMessage: false,
            days: undefined,
            socials: '',
            media: '',
            team: '',
            matchDay: '',
            matchTime: '',
            teamName: ''
        }
    },
    created() {
        this.loader = loader;
        this.days = days;
    },
    methods: {
        pInput() {
            console.log(this.phone.length)
        },
        lineBreaks(text) {
            if (!text) {
                return '';
            }
            return text.replaceAll('\n', '<br>');
        },
        formOrder(event) {
            event.preventDefault();
            const isValid = this.formValidate();
            if (isValid) {
                this.loaderProgress = true;
                this.orderFormation();
            } else {
                return;
            }

        },
        async orderFormation() {
            // https://winliner.ru:8443/api/bookOneEvent
            // http://45.92.173.81:3000/api/bookOneEvent

            if (this.formType === '1922') {
                const body = {
                    name: this.name,
                    familyName: this.familyName,
                    phone: this.phone,
                    email: this.email,
                    gameDay: this.matchDay,
                    gameTime: this.matchTime,
                    teamName: this.teamName
                }

                const response = await fetch("https://winliner.ru:8443/api/bookGame", {
                    method: "POST",
                    headers: { "Accept": "application/json", "mode": "no-cors", "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok === true) {
                    const user = await response.json();
                    console.log({ user });
                    if (user.result === 'already taken.') {
                        setTimeout(() => {
                            this.loaderProgress = false;
                            this.renderType = 'taken';

                            setTimeout(() => {
                                this.renderType = 'ordinary';
                                // this.$emit('close-modal');
                            }, 4000);
                        }, 800);
                    } else if (user.result === 'okMatch') {
                        if (user.existedUser === false) {
                            this.confirmMessage = true;
                        }
                        setTimeout(() => {
                            this.loaderProgress = false;
                            this.renderType = 'okMatch';
                        }, 800);
                    } else if (user.result === 'fullMatch') {
                        console.log('qwefcvfsg')
                        if (user.existedUser === false) {
                            this.confirmMessage = true;
                        }
                        setTimeout(() => {
                            this.loaderProgress = false;
                            this.renderType = 'fullMatch';
                        }, 800);
                    } else {
                        if (user.existedUser === false) {
                            this.confirmMessage = true;
                        }
                        setTimeout(() => {
                            this.loaderProgress = false;
                            this.renderType = 'success';
                        }, 800);
                    }
                }
            } else {
                const matchEvent = {
                    condition: "Регистрация на сайте Winliner",
                    day: "1922",
                    description: "1922 Матч",
                    eventEndTime: "24:00",
                    eventStartTime: "20:00",
                    form_slot_description: "",
                    form_text_after_registr: "",
                    how_much_registration: "-1",
                    name: "Матч 1922 на Winliner’е",
                    need_stavka: "0",
                    need_winline_registr: "0",
                    route: "",
                    slot_end_time: "14:30",
                    slot_number: "1",
                    slot_start_time: "10:00"
                }

                const body = {
                    name: this.name,
                    familyName: this.familyName,
                    phone: this.phone,
                    email: this.email,
                    chosenEvent: this.formType === '1922' ? matchEvent : this.info,
                    formType: this.isMSK ? 'tournament' : this.formType,
                    socials: this.socials,
                    media: this.media,
                    isOpened: this.isOpenedRegisteration
                }
                if (this.isMSK) {
                    body.team = this.team;
                }

                const response = await fetch("https://winliner.ru:8443/api/bookOneEvent", {
                    method: "POST",
                    headers: { "Accept": "application/json", "mode": "no-cors", "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok === true) {
                    const user = await response.json();
                    console.log({ user });
                    if (user.result === 'already taken.') {
                        setTimeout(() => {
                            this.loaderProgress = false;
                            this.renderType = 'taken';

                            setTimeout(() => {
                                this.renderType = 'ordinary';
                                // this.$emit('close-modal');
                            }, 4000);
                        }, 800);
                    } else if (user.result === 'updated taken') {
                        setTimeout(() => {
                            this.loaderProgress = false;
                            this.renderType = 'updated';
                        }, 700);

                    } else {
                        if (user.existedUser === false) {
                            this.confirmMessage = true;
                        }
                        setTimeout(() => {
                            this.loaderProgress = false;
                            this.renderType = 'success';
                        }, 800);
                    }
                }
            }

        },
        closeModal() {
            setTimeout(() => {
                this.renderType = 'ordinary';
                this.confirmMessage = false;
            }, 260);


            this.name = '';
            this.familyName = '';
            this.phone = '';
            this.email = '';
            this.$emit('close-modal');
        },
        formValidate() {
            try {
                document.getElementById('fname-input').classList.remove('err');
                document.getElementById('phone-input').classList.remove('err');
                document.getElementById('lname-input').classList.remove('err');
                document.getElementById('email-input').classList.remove('err');
                document.getElementById('stavka-input').classList.remove('err');
                document.getElementById('social-input').classList.remove('err');
            } catch (e) { }

            const errors = [];

            if (this.name.length < 2) {
                document.getElementById('fname-input').classList.add('err');
                errors.push('fname');
            }
            if (this.phone.length < 18) {
                document.getElementById('phone-input').classList.add('err');
                errors.push('phone');
            }

            if (this.familyName.length < 2) {
                document.getElementById('lname-input').classList.add('err');
                errors.push('familyName');
            }

            if (this.email.length < 4 || !this.email.includes('@') || !this.email.includes('.')) {
                document.getElementById('email-input').classList.add('err');
                errors.push('email');
            }

            if (this.info.need_stavka === '1') {
                if (this.stavka.length < 8) {
                    document.getElementById('stavka-input').classList.add('err');
                    errors.push('stavka');
                }
            }

            // if(this.formType === 'media'){
            //     if(this.socials.length < 4 || !this.socials.includes('.')){
            //         document.getElementById('social-input').classList.add('err');
            //         errors.push('social');
            //     }
            // }

            if (errors.length !== 0) {
                return false;
            } else {
                return true;
            }

        }
    },
    computed: {
        isOpenedRegisteration() {
            if (this.formType === 'media' || this.formType === '1922') {
                return true;
            } else {
                const _date = new Date(Date.now());
                const day = this.days.find(d => d.day === this.info.day);
                if (_date.getDate() >= day.openDay.split('.')[0]) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        buttonText() {

            if (this.formType === '1922') {
                return 'Стать частью истории';
            } else if (this.formType === 'media') {
                return 'Зарегистрировать СМИ';
            } else if (this.formType === 'remind') {
                return 'Уведомить об открытии';
            } else {
                const day = this.days.find(d => d.day === this.info.day);
                // console.log({ day })
                if (day) {
                    const _date = new Date(Date.now());
                    if (_date.getDate() >= day.openDay.split('.')[0]) {
                        return 'Записаться на слот';
                    } else {
                        return 'Записаться на слот';
                    }
                }
            }

        },
        titleText() {
            if (this.formType === '1922') {
                return '«Легендарный матч 1922» — это футбольный матч для всех красно-белых, это 1922 минуты беспрерывного футбола на Winliner и возможность стать частью новой истории ФК «Спартак».';
            } else if (this.formType === 'media') {
                return 'Форма для регистрации СМИ';
            } else {
                return this.info.form_slot_description;
            }
        },
        additionalText() {
            if (this.formType === '1922') {
                return `
                    <p class="text1922">Формат турнира:</p>
                    <p class="text1922">Командная заявка заполняется капитаном. 16 команд принимает участие в рамках выбранного временного слота.
                        Формат игры 4х4, без вратарей. Один матч длится 5 минут. обедившая команда остаётся на площадке, проигравшая покидает поле и становится последней в очереди</p>
                `;
            } else if (this.formType === 'media') {
                return '';
            } else if (this.formType === 'remind') {
                return `${this.info.day} июня`;
            } else {
                return `${this.info.day} июня ${this.info.slot_start_time} — ${this.info.slot_end_time}`;
            }

        },
        isMSK() {
            if (this.info && this.info.name && this.info.name.includes('«Московский клуб спорта»')) {
                return true;
            } else {
                return false;
            }
        }
    },
    watch: {
        params(newValue, oldValue) {
            this.name = newValue.name;
            this.familyName = newValue.famName;
            this.phone = newValue.phone;
            this.email = newValue.email;
        }
    }
}
</script>

<style scoped>
.personal {
    margin-top: 1.190vw;
    margin-left: 0.595vw;
    font-size: 1.190vw;
    font-family: Helvetica, Arial, sans-serif;
    color: var(--colorDark);

}

.personal-link,
.personal-link:visited {
    /* text-decoration: none; */
    color: var(--colorDark);
}

.match-rules {
    color: var(--colorLight);
}

select {
    appearance: none;
    background-color: transparent;
    border: none;
    padding: .595vw;
    margin: 0;
    /* margin-left: 8px; */
    /* margin-bottom: 32px; */
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.860vw;
    line-height: 96%;
    /* width: 70%; */
    letter-spacing: -0.01em;
    color: var(--colorDark);
    border-bottom: 1px solid var(--colorDark);
}

.result {
    font-family: 'Helvetica';
    font-weight: 400;
    font-size: 25px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #FFFFFF;
    margin-bottom: 60px;
}



.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active до версии 2.1.8 */
    {
    opacity: 0;
}

/* Button used to open the contact form - fixed at the bottom of the page */
/* .open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 280px;
} */

/* The popup form - hidden by default */
.form-popup {
    display: block;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .5);
    /* border: 3px solid #f1f1f1; */
    z-index: 5009;
    transition: .5s;
}

.backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 5;
}

/* Add styles to the form container */
.form-container {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 70vw;
    padding: 0.595vw;
    background-color: var(--colorDark2);
    border: none;
    z-index: 15;
    /* min-height: 560px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.form-container p {
    margin-bottom: 20px;
}

/* Full-width input fields */
.form-container input[type=text],
.form-container input[type=url],
.form-container input[type=tel] {
    display: block;
    width: 100%;
    padding: 0.595vw;
    /* margin: 5px 0 22px 0; */
    border: none;
    background: none;
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.860vw;
    line-height: 96%;
    /* width: 70%; */
    letter-spacing: -0.01em;
    color: var(--colorOrange);

}

.form-container input[type=text]::placeholder,
.form-container input[type=tel]::placeholder,
.form-container input[type=url]::placeholder {
    color: var(--colorDark);

}

.line {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--colorDark);
}


/* When the inputs get focus, do something */
.form-container input:focus.form-container input:-webkit-autofill,
.form-container input:-webkit-autofill:hover,
.form-container input:-webkit-autofill:focus,
.form-container input:-webkit-autofill:active,
.form-container input:-internal-autofill-selected {

    background-color: none !important;
    outline: none !important;
    /* box-shadow: 0 0 0 30px white inset !important; */

}


/* Set a style for the submit/login button */
.form-container .btn {
    margin-top: 1vw;
    display: block;
}

/* Add a red background color to the cancel button */
/* .form-container .cancel {
  background-color: red;
} */

/* Add some hover effects to buttons */
.form-container .btn:hover,
.open-button:hover {
    opacity: 1;
}

.form-head {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.86vw;
    line-height: 110%;
    width: 95%;
    letter-spacing: -0.01em;
    color: var(--colorLight);
}

.form-datetime {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.860vw;
    line-height: 96%;
    width: 90%;
    letter-spacing: -0.01em;
    color: var(--colorOrange);
    margin-top: 1.786vw;
    margin-bottom: 4.613vw;
}

.cancel {
    display: block;
    position: absolute;
    width: 1.190vw;
    height: 1.190vw;
    top: 0.595vw;
    right: 0.595vw;
    background: none;

    background-image: url(../assets/images/cancel.svg);
    background-repeat: no-repeat;
    background-size: contain;
    border: none;
    cursor: pointer;
    transition: 0.3s;


}

.cancel:hover {
    filter: invert();
}


@media (max-width: 575.98px) {

    .personal {
        margin-top: 16px;
        font-size: 12px;
    }

    .form-popup {
        /* position: static; */
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form-container {
        position: relative;
        width: 95%;
        padding: 8px;

    }

    .form-head {
        font-size: 16px;
        width: 100%;
    }

    .form-datetime {
        font-size: 14px;
        width: 100%;
        line-height: 100%;

    }



    select,
    .form-container input[type=text],
    .form-container input[type=tel],
    .form-container input[type=url] {
        font-size: 5.58vw;
    }

    .cancel {
        width: 16px;
        height: 16px;
        margin: 8px 8px;
    }

}

.input-wrapper {
    position: relative;
}

.err {
    border: 3px solid crimson !important;
}

.validation-message {
    position: absolute;
    right: 10px;
    top: 5px;
    color: crimson;
    font-size: 13px;
    font-family: 'Helvetica', sans-serif;
    opacity: 0;
}

.err .validation-message {
    opacity: 1;
}

.orange-btn {
    font-weight: 400;
    font-size: 15px;
    line-height: 16px;
    color: #FFFFFF;
    background: #FF5D0C;
}

.confirm-message {
    margin-bottom: 30px;
}

#phone-input input:-webkit-autofill {
    background-color: white !important;
}

.msk {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.86vw;
    line-height: 110%;
    width: 95%;
    letter-spacing: -0.01em;
    color: var(--colorLight);
}
</style>