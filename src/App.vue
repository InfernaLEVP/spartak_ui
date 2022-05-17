<template>

    <div class="container1344">
        
        <!-- <div class="progress-line" id="progress"></div> -->

        <!-- <div class="box"></div> -->

        <div class="grid-container">

            <div class="left-side">
                <Header />
                <Banner @book="book" />
                <TimeSheet @bookSlot="bookSlot" />
                <Footer />
            </div>

        <Side @book="book" />

        </div>

        <FormTest v-show="showModal" @close-modal="closeModal" :info="currentSlot" :formType="formType" />

    </div>

</template>

<script>
import Header from "./components/Header.vue";
import Banner from "./components/Banner.vue";
import TimeSheet from "./components/TimeSheet.vue";
import Side from "./components/Side/Side.vue";
import Footer from "./components/Footer.vue";
import FormTest from "./components/FormTest.vue";

import { gsap } from 'gsap';

export default {
    name: "App",
    components: {
        Header,
        Banner,
        TimeSheet,
        Side,
        Footer,
        FormTest
    },
    data() {
        return {
            showModal: false,
            currentSlot: { name: '' },
            formType: ''
        }
    },
    mounted() {

        document.addEventListener('scroll', (e) => {
            const _l = document.getElementById('progress');

            const elems = document.querySelectorAll('.black-window');
            elems.forEach(element => {

                const _top = element.offsetTop;
                const _height = element.offsetHeight;
                const _y = element.getBoundingClientRect().y;

                if(_y < 500 && _y > (_height / 2) * -1){
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
        closeModal() {
            this.showModal = false;
        }
    }
};
</script>

<style>
.box{
    width: 200px;
    height: 200px;
    position: absolute;
    top: 2300px;
    left: 0;
    z-index: 999;
    background: crimson;
}
#app {
}

.grid-container {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 3fr) 1fr;
}

@media (max-width: 991.98px) {
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

.progress-line{
    position: fixed;
    top: 50%;
    width: 200px;
    height: 4px;
    background: white;
    z-index: 99;
}
</style>
