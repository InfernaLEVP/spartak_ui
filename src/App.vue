<template>
    <EnterForm @enterform="enterform" />
    <FirstAnimation />
    <div class="container1344">

        <!-- {{ curentSection }} -->
        <!-- <div class="progress-line" id="progress"></div> -->

        <!-- <div class="box"></div> -->
        <!-- <EmailConfirm /> -->
        <div class="grid-container">

            <div class="left-side">
                <Header />
                <Banner @book="book" />
                <TimeSheet @bookSlot="bookSlot" @bookDay="bookDay" />
                <Footer />
            </div>

            <Side @book="book" />

        </div>

        <FormTest :params="params" v-show="showModal" @close-modal="closeModal" :info="currentSlot" :formType="formType" />

    </div>

</template>

<script>

import FirstAnimation from "./components/FirstAnimation.vue";
import Header from "./components/Header.vue";
import Banner from "./components/Banner.vue";
import TimeSheet from "./components/TimeSheet.vue";
import Side from "./components/Side/Side.vue";
import Footer from "./components/Footer.vue";
import FormTest from "./components/FormTest.vue";
import EnterForm from "./components/EnterForm.vue";

import { gsap } from 'gsap';


import { ref, onMounted } from 'vue';

// const headers = [
//     '05',
//     '06',
//     '07',
//     '08',
//     '09',
//     '10',

// ]
// const currentSection = ref('')
// console.log(currentSection)

// onMounted(() => {
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             if (entry.intersectionRatio > 0) {
//                 currentSection.value = entry.target.getAttribute('id')
//             }
//         })

//     })
//     document.querySelectorAll('black-window').forEach((section) => {
//         observer.observe(section)
//     })
// })


export default {
    name: "App",
    components: {
        FirstAnimation,
        Header,
        Banner,
        TimeSheet,
        Side,
        Footer,
        FormTest,
        EnterForm,

    },
    data() {
        return {
            showModal: false,
            currentSlot: { name: '' },
            formType: '',
            params: {}
        }
    },
    created() {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.body.style.overflow = 'initial';
        }, 5000);
    },
    mounted() {

        document.addEventListener('scroll', (e) => {
            const _l = document.getElementById('progress');

            const elems = document.querySelectorAll('.black-window');
            elems.forEach(element => {

                const _top = element.offsetTop;
                const _height = element.offsetHeight;
                const _y = element.getBoundingClientRect().y;

                if (_y < 500 && _y > (_height / 2) * -1) {
                    // console.log(element.dataset.id);
                    // element
                }

            });

        });

    },
    methods: {
        book(type) {
            // console.log({type});
            this.formType = type;
            this.showModal = true;
        },
        bookSlot(info) {
            this.formType = '';
            this.showModal = true;
            // console.log({info});
            this.currentSlot = info;
        },
        bookDay(day) {
            this.formType = 'remind';
            this.showModal = true;
            // console.log({info});
            this.currentSlot = day;
        },
        closeModal() {
            this.showModal = false;
        },
        enterform(data) {
            this.params = data;
        }
    },
    watch: {
        showModal(newValue, oldValue) {
            if (newValue) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'initial';
            }
        }
    }
};
</script>

<style>
.box {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 2300px;
    left: 0;
    z-index: 999;
    background: crimson;
}

#app {}

.grid-container {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 3fr) 1fr;
}

@media (max-width: 767.98px) {
    .grid-container {
        display: flex;
        flex-direction: column;
    }
}



.container1344 {
    /* max-width: 1344px; */
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}

.progress-line {
    position: fixed;
    top: 50%;
    width: 200px;
    height: 4px;
    background: white;
    z-index: 99;
}
.text1922 {
    /* color: #FFFFFF; */
    font-size: 16px;
    line-height: 120%;
}

</style>
