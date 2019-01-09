<template>
    <div>
        <h1>Bienvenue sur <span class="mus">MUS</span><span class="co">CO</span></h1>
        <p><span class="mus">MUS</span><span class="co">CO</span> est une plateforme de musique collaborative.<br>Elle permet aux divers acteurs de la production musicale (musiciens, chanteurs, beatmakers, vidéastes, etc …),<br>de poster des annonces afin de concrétiser et faire aboutir leurs projets musicaux.</p>
    </div>
</template>

<script>
export default {
    name: 'Presentation'
}
</script>

<style scoped lang="scss">
    div {
        text-align: center;
        font-family: 'Shrikhand', cursive;

        .mus {
            color: #8833f8
        }

        .co {
            color: #01dc0e
        }

        h1 {
            font-size: 40px;
            letter-spacing: 2px;
            margin-top: 40px
        }

        p {
            margin-top: 10px;
            font-size: 20px
        }
    }
</style>
