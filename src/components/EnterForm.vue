<template>
    <Transition>

        <div v-if="showModal" class="container">
            <div class="obertka">
                <h1>Возрастное подтверждение</h1>
                <p>Информация, представленная на нашем сайте, предназначена только для совершеннолетних. Продолжая
                    пользоваться
                    сайтом, вы подтверждаете, что вам больше 18 лет и соглашаетесь с политикой обработки персональных
                    данных
                </p>
                <button class="btn" @click="accept">Да, мне больше 18</button>
            </div>
        </div>
    </Transition>

</template>

<script>

export default {
    name: 'EnterForm',

    data() {
        return {
            showModal: true,
        };
    },
    methods: {
        accept() {
            this.showModal = false;

            setTimeout(() => {
                try{
                    const params = new Proxy(new URLSearchParams(window.location.search), {
                        get: (searchParams, prop) => searchParams.get(prop),
                    });
                    let value = '_' + params.day + params.slot + params.event; // "some_value"
                    console.log({value});
                    document.getElementById(value).click();
                }catch(e){}
                
            }, 500);
        }
    }


}
</script>


<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}



.obertka {
    background-color: var(--colorLight);
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 8px;

}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
    z-index: 4999;
}

p {
    font-family: 'Helvetica';
    /* font-style: italic; */
    font-weight: 400;
    font-size: 16px;
    line-height: 96%;
    letter-spacing: 0.01em;
    /* text-transform: uppercase; */
    color: var(--colorDark);
    padding-bottom: 32px;
    text-align: center;
    max-width: 500px;

}

h1 {
    font-family: 'Helvetica';
    /* font-style: italic; */
    font-weight: 400;
    font-size: 24px;
    line-height: 96%;
    letter-spacing: 0.01em;
    /* text-transform: uppercase; */
    color: var(--colorDark);
    padding-bottom: 32px;
    text-align: center;
}

.btn {
    width: min-content;
    white-space: nowrap;
    background-color: var(--colorOrange);
    padding: 16px 32px;

}

.btn:hover {
    background-color: var(--colorRed);
    color: var(--colorLight);

}

</style>