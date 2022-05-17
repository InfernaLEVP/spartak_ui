<template>
  <section class="header">
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
          Столетняя история легендарного клуба и&nbsp;его болельщиков,
          объединённая в&nbsp;8&nbsp;тематических мероприятиях
        </p>
      </div>
    </div>

    <div class="header__center-image">
      <!-- <div class="header__center-logo100"></div> -->
    </div>

    <h2 class="header__h2">
      Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;Пишем историю вместе&ensp;
    </h2>
  </section>
</template>

<script>
export default {};
</script>

<style>
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

.header__description {
  margin-bottom: 1.488vw;
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

@media (max-width: 991.98px) {
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
  font-size: 1.860vw;
  line-height: 96%;
  letter-spacing: -0.01em;
  color: var(--colorLight);

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
  background-image: url(../assets/images/lodka.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  padding-bottom: 29.86%;
  display: flex;
  align-items: center;
  justify-content: center;
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

}


@keyframes ticker {
  0% {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    transform: translate3d(-100%, 0, 0);
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
    background-size: cover;
    padding-bottom: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: -6vw 0;
  }

}
</style>