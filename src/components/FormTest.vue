<template>
    <transition name="fade">

        <div class="form-popup" id="myForm">

            <div class="backdrop" @click="closeModal"></div>

            <form action="/action_page.php" class="form-container" @submit="formOrder">
                <h2 class="form-head">{{titleText}}</h2>
                <p class="form-datetime">
                    {{ additionalText }}
                </p>

                <lottie-player v-show="loaderProgress" :src="loader" background="transparent" speed="1"
                    style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; background: rgba(0,0,0,.85);"
                    loop autoplay></lottie-player>

                <div class="hidden">

                </div>

                <div class="inputs" v-show="renderType === 'ordinary'">

                    <div class="select" v-if="this.formType === 'media'">
                        <select id="standard-select">
                            <option value="Option 1">СМИ</option>
                            <option value="Option 2">Блогер</option>
                            <option value="Option 3">Фотограф</option>
                        </select>
                    </div>

                    <div class="input-wrapper" id="fname-input">
                        <input type="text" id="fname" name="firstname" placeholder="Имя" v-model="name">
                        <span class="validation-message">Это поле обязательно</span>
                        <div class="line"></div>
                    </div>


                    <input type="text" id="lname" name="lastname" placeholder="Фамилия" required v-model="familyName">
                    <div class="line"></div>

                    <input type="tel" placeholder="Телефон" name="phone" v-maska="'+7 (###) ###-##-##'" required
                        v-model="phone">
                    <div class="line"></div>

                    <input type="text" placeholder="Email" name="email" required v-model="email">
                    <div class="line"></div>

                    <input type="text" placeholder="Ставка" name="stavka" v-maska="'#########'" required
                        v-model="stavka" v-if="info.need_stavka === '1'">
                    <div class="line" v-if="info.need_stavka === '1'"></div>

                    <input type="url" name="url" placeholder="Ссылка на соцсети" required
                        v-if="this.formType === 'media'">
                    <div class="line" v-if="this.formType === 'media'"></div>

                </div>

                <div class="result" v-show="renderType === 'success'">
                    <p>Спасибо, ваша заявка принята. За два дня до события вы получите электронное письмо с билетом</p>
                </div>

                <div class="result" v-show="renderType === 'taken'">
                    <p>Вы уже учавствуете в этом слоте.</p>
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
        formType: String
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
            days: undefined
        }
    },
    created() {
        this.loader = loader;
        this.days = days;
    },
    methods: {
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
            const response = await fetch("http://45.92.173.81:3000/api/bookOneEvent", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: this.name,
                    familyName: this.familyName,
                    phone: this.phone,
                    email: this.email,
                    chosenEvent: this.info
                })
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
                } else {
                    setTimeout(() => {
                        this.loaderProgress = false;
                        this.renderType = 'success';

                        setTimeout(() => {
                            this.renderType = 'ordinary';
                            // this.$emit('close-modal');
                        }, 4000);
                    }, 800);
                }

            }
        },
        closeModal() {
            this.name = '';
            this.familyName = '';
            this.phone = '';
            this.email = '';
            this.$emit('close-modal');
        },
        formValidate() {
            const errors = [];
            if (this.name.length === 0) {
                document.getElementById('fname-input').classList.add('err');
                errors.push('fname');
            }

            if (errors.length !== 0) {
                return false;
            } else {
                return true;
            }

        }
    },
    computed: {
        buttonText() {

            if (this.formType === '1922') {
                return 'Стать частью истории';
            } else if (this.formType === 'media') {
                return 'Зарегистрировать СМИ';
            } else {
                const day = this.days.find(d => d.day === this.info.day);
                console.log({ day })
                if (day) {
                    const _date = new Date(Date.now());
                    if (_date.getDate() >= day.openDay.split('.')[0]) {
                        return 'Записаться на слот';
                    } else {
                        return 'Уведомить об открытии';
                    }
                }
            }

        },
        titleText() {
            if (this.formType === '1922') {
                return 'Регистрация для участия в матче 1922 откроется в ближайшее время. Чтобы первым узнать об открытии регистрации, оставляй свой email мы пришлем уведомление на почту, когда будет открыта регистрация.';
            } else if (this.formType === 'media') {
                return 'Форма для регистрации СМИ';
            } else {
                return this.info.name;
            }
        },
        additionalText() {
            if (this.formType === '1922') {
                return '';
            } else if (this.formType === 'media') {
                return '';
            } else {
                return `${this.info.day} июня ${this.info.slot_start_time} — ${this.info.slot_end_time}`;
            }

        }
    }
}
</script>

<style scoped>
select {
    appearance: none;
    background-color: transparent;
    border: none;
    padding: .595vw;
    margin: 0;
    /* margin-left: 8px; */
    margin-bottom: 32px;
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
    width: 41vw;
    padding: 0.595vw;
    background-color: var(--colorDark2);
    border: none;
    z-index: 15;
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
    margin-top: 9.226vw;
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
    font-size: 1.860vw;
    line-height: 96%;
    width: 70%;
    letter-spacing: -0.01em;
    color: var(--colorLight);
}

.form-datetime {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 1.860vw;
    line-height: 96%;
    width: 70%;
    letter-spacing: -0.01em;
    color: var(--colorOrange);
    margin-top: 1.786vw;
    margin-bottom: 9.226vw;
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
        font-size: 6vw;
    }

    .form-datetime {
        font-size: 6vw;

    }

    .form-container input[type=text],
    .form-container input[type=tel] {
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
    border: 1px solid crimson !important;
}

.validation-message {
    position: absolute;
    right: 10px;
    top: 5px;
    color: crimson;
    font-size: 11px;
    font-family: 'Helvetica', sans-serif;
    opacity: 0;
}

.err .validation-message {
    opacity: 1;
}
</style>