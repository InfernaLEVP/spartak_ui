<template>
    <div class="gray">
        <div class="footer">
            <p class="footer__creators">Сайт сделан в студии <a href="https://www.petrovichbrothers.com/"
                    target="_blank">Petrovich Brothers</a></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer',

}
</script>

<style scoped>
.gray {
    background-color: #292929;
    padding: 0 .595vw;

}

.footer {
    padding: 2.208vw 1.595vw;
    background-color: var(--colorDark);
    border-radius: 24px 24px 0 0;
}

.footer__creators {
    font-family: Helvetica, Arial, sans-serif;
    color: var(--colorLight);
    font-size: 1vw;
    opacity: .5;
    border: none;
    

}

a, a:visited {
    text-decoration: none;
    color: var(--colorLight);


}


@media (max-width: 575.98px) {
    .footer {
        padding-left: 8px;
    }

    .footer__creators,
    .footer a,
    .footer a:visited {
        font-size: 3vw;
        color: var(--colorLight);
        padding: 16px 8px;

    }
}
</style>
