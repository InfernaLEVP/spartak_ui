

<template>
  <section class="header" id="top" v-if="slData">
    <div class="header__top-container">
      <h1 class="header__h1">Win<span>liner</span></h1>
      <div class="header__top-right-container">
        <div class="header__date-logos">
          <div class="header__date">5–12 июня</div>
          <div class="header__logos">
            <!-- <img
                            class="header__logo1"
                            src="../assets/images/winlineLogo.png"
                            width="118px"
                            height="auto"
                            alt="winline logo"
                        />
                        <div class="header__logo-separator"></div>
                        <img
                            class="header__logo2"
                            src="../assets/images/spartakLogo.png"
                            width="100px"
                            height="auto"
                            alt="spartak logo"
                        /> -->
          </div>
        </div>
        <p class="header__description">
          Празднуй 100-летие ФК&nbsp;&laquo;Спартак&raquo; вместе с&nbsp;нами!
8&nbsp;дней, 8&nbsp;ярких эпох. Отправься в&nbsp;путешествие по&nbsp;золотым страницам истории великого клуба, вместе с&nbsp;легендами красно-белых на&nbsp;борту Winliner.
        </p>
      </div>
    </div>

    <div class="header__center-image">
      <!--  -->
      <agile ref="carousel" :autoplaySpeed="6000" :autoplay="true"  @after-change="e => currentSlide = e.currentSlide" class="my-slider" :pauseOnHover="true"
        :navButtons="false" :dots="false" :speed="600">
        <div v-for="slide in slData" :key="slide">
          <div class="sl-container">
            <div class="sl-text-container">
              <div class="sl-arrow"></div>
              <div class="flex-row-distr">
                <p class="sl-header">{{ slide.sl_span }}</p>
                <!-- <div class="btns">
                <button class="sl_btn" @click="$refs.carousel.goToPrev()">{{ currentSlide === 0 ? 12 : (currentSlide +
                    4)
                }}</button>
                <div class="line"></div>
                <button class="sl_btn" @click="$refs.carousel.goToNext()">{{ currentSlide === 7 ? 5 : (currentSlide +
                    6)
                }}</button>
              </div> -->

                <div class="sl-date-months-container">
                  <p class="sl-date">{{ slide.day }}</p>
                  <p class="sl-months">июня</p>
                  <!-- $refs.carousel.currentSlide -->
                </div>
              </div>
              <p class="sl-description">{{ slide.sl_descript }}</p>

            </div>
            <img class="sl-img" :src="require('../assets/images/slides/' + slide.image_name)"
              alt="{{slide.image_name}}">
          </div>
          <!-- </a> -->
        </div>
      </agile>

      <!-- <div class="header__center-logo100"></div> -->
    </div>

    <h2 class="header__h2">
      Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем
      историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю
      вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;
    </h2>
  </section>
</template>

<script>

// import slData from "../data/day_description.json"
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import { VueAgile } from 'vue-agile'

export default {
  name: 'App',
  components: {
    agile: VueAgile,

  },
  created() {
    fetch('https://winliner.ru/getDays', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ok: 'ok'})
    })
    .then(response => response.json())
    .then(data => {
        this.slData = data;
    });
  },
  data() {
    return {
      slData: null,
      // mySlide: undefined,

      // currentSl: getCurrentSlide(),
    }
  },

};
</script>



<style scoped>
.btns {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.line {
  height: 1px;
  width: 50px;
  background-color: #fff;
}

.sl_btn {
  background: none;
  border: none;
  color: var(--colorLight);
}

.sl_btn:hover {
  opacity: .8;
}

.sl-arrow {
  background-image: url(../assets/images/arr.svg);
  background-repeat: no-repeat;
  background-position: right;
  background-size: fill;
  width: 100%;
  height: 12px;
  /* margin-top: 16px; */
  /* padding-bottom: 40px; */
}


.flex-row-distr {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.my-slider {
  display: flex;
  width: 100%;
}

.sl-text-container {
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* justify-content: space-between; */
}

.sl-container {
  display: grid;
  grid-template-columns: 4fr 5fr;
  /* border: 1px solid var(--colorOrange); */
  border-radius: 35px;
  /* margin: 16px; */
  cursor: grab;

}

.sl-slide {
  width: 100%;
  height: auto;

}

.sl-img {
  /* height: 500px; */
  max-width: 100%;
  object-fit: cover;
  /* height: 350px; */
  /* border-radius: 35px; */
}

.sl-date-months-container {
  display: flex;
  flex-direction: column;

}

.sl-date {
  font-family: 'Druk';
  font-style: italic;
  font-weight: 1000;
  font-size: 5.952vw;
  line-height: 85%;
  /* identical to box height, or 85% */
  color: var(--colorLight);
  text-align: center;
  letter-spacing: .05em;
  text-transform: uppercase;
  margin-right: .7vw;
  transform: translateY(10%);

}

.sl-months {
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 1.116vw;
  line-height: 96%;
  letter-spacing: -0.01em;
  color: var(--colorLight);
  /* white-space: nowrap; */
  /* padding-right: 1.19vw; */
}

.sl-description {
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 1.116vw;
  line-height: 96%;
  letter-spacing: -0.01em;
  color: var(--colorLight);
  text-align: left;
  margin-top: 32px;
  width: 70%;
}

.sl-header {
  display: flex;
  align-items: flex-start;

  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 1.860vw;
  line-height: 96%;
  letter-spacing: -0.01em;
  color: var(--colorLight);
  text-align: left;


}



.header {
  background-color: var(--colorDark);
  /* min-height: 100vh; */
  margin: 0;
  padding: 0.595vw 0 0 0;
  /* width: 75%; */

}

.header__top-right-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}


.header__date-logos {
  display: flex;
  flex-direction: row;

}

.header__logos {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-image: url(../assets/images/WLSpartak_White.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 16.964vw;
  height: 4.315vw;
}

@media (max-width: 767.98px) {
  .header__logos {
    padding-right: 100px;
    padding-top: 5px;
    width: 47.500vw;
    height: 13.611vw;

  }
}


.header__top-container {
  display: flex;
  flex-direction: row;
  padding-right: 1.488vw;
}

.header__logo1 {
  position: relative;
  width: 8.780vw;
}

.header__logo2 {
  position: relative;
  width: 7.440vw;
}

.header__logo-separator {
  display: block;
  /* position: absolute; */
  width: 1px;
  height: 3.571vw;
  margin: 0 0.967vw;

  background-color: var(--colorLight);
}

.header__logos {
  margin-left: auto;
}

.header__description {
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 1.560vw;
  line-height: 96%;
  letter-spacing: -0.01em;
  color: var(--colorLight);
  margin-bottom: 1.488vw;


}

.header__h1 {
  color: var(--colorOrange);
  font-family: 'Druk';
  font-style: italic;
  font-weight: 400;
  font-size: 20.536vw;
  line-height: 78%;
  text-transform: uppercase;
  margin: 1.116vw 2.976vw 0 0;
}

.header__h1 span {
  color: var(--colorLight);
  font-family: 'Druk';
  font-style: italic;
  font-weight: 400;
  font-size: 20.536vw;
  line-height: 78%;
  text-transform: uppercase;
}

.header__date {
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 1.86vw;
  line-height: 96%;
  letter-spacing: -0.01em;
  color: var(--colorLight);

}

.header__center-image {
  position: relative;
  /* background-image: url(../assets/images/lodka.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center; */
  width: 100%;
  /* height: 500px; */
  /* padding-bottom: 29.86%; */
  display: block;
  padding-right: 0.595vw;
  /* align-items: center;
  justify-content: center; */
}

.header__center-logo100 {
  position: absolute;
  margin: auto;
  background-image: url(../assets/images/logo100.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 14.881vw;
  height: 4.025vw;
  margin-top: calc(33%);
  /* width: 25%; */
  /* height: 100%; */

  vertical-align: middle
}

.header__h2 {
  margin-top: 16px;
  padding-bottom: 2.232vw;
  color: var(--colorLight);
  font-family: 'Druk';
  font-style: italic;
  font-weight: 400;
  font-size: 20.536vw;
  line-height: 78%;
  text-transform: uppercase;
  /* overflow: hidden; */
  white-space: nowrap;
  text-overflow: clip;
  padding-top: 1.488vw;
  min-width: 0;
  animation-name: ticker;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  /* filter: drop-shadow(5px 5px 0px var(--colorRed)); */

}


@keyframes ticker {
  0% {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    transform: translate3d(-124%, 0, 0);
  }
}

@media (max-width: 575.98px) {
  .header__top-container {
    display: flex;
    flex-direction: column;
    padding-right: 0;
  }

  .header__h1 {
    margin-left: 8px;
  }

  .header__h1,
  .header__h1 span,
  .header__h2 {
    font-size: 34.444vw;
  }

  .header__top-right-container {
    display: flex;
    flex-direction: column;
    padding: 0px 8px;
    margin-top: -1vw;

  }

  .header__date-logos {
    display: flex;
    flex-direction: row;

  }

  .header__date {
    font-size: 5.556vw;
    padding-top: 1vw;
  }

  .header__logos {
    margin-left: auto;
    /* margin-right: auto; */
    /* margin-top: 32px; */
    /* margin-bottom: 32px; */
    padding: 0;
    /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; */
  }

  .header__logo1 {
    width: 22.2vw;
  }

  .header__logo2 {
    width: 22.20vw;
  }

  .header__logo-separator {
    height: 10.713vw;
    margin: 3vw;
  }

  .header__description {
    font-size: 5.556vw;
    margin-top: 8px;

  }

  .header__center-image {
    /* background-size: cover;
    padding-bottom: 70%; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 0;
    /* margin: -6vw 0; */
  }


  /* slider
  
  */

  .sl-text-container {
    min-height: 300px;
    margin-bottom: 8px;
    padding-top: 16px;
      align-items: start;


  }

  .sl-container {
    max-width: 100%;
    /* width: 50px; */
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .sl-slide {
    width: 100%;
    height: auto;

  }

  .sl-img {
    /* height: 500px; */
    max-width: 100%;
    /* width: 50px; */
    /* height: 350px; */
    /* border-radius: 35px; */
    /* grid-row-start: 1; */
    order: -1;
    margin-top: 16px;
  }

  .sl-date-months-container {
    display: flex;

  }

  .sl-date {
    font-size: 18vw;

  }

  .sl-months {
    font-size: 20px;
    margin-left: 8px;

  }

  .sl-description {
    font-size: 5.556vw;
    width: 100%;
    /* order: 2; */
  }

  .sl-header {
    font-size: 6.944vw;
  }



}
</style>