<template>
    <section>
        <div class="hidden-sm-and-down">
            <h1>Bienvenue sur <span class="mus">MUS</span><span class="co">CO</span></h1>
            <p><span class="mus">MUS</span><span class="co">CO</span> est une plateforme de musique collaborative.<br>Elle permet aux divers acteurs de la production musicale (musiciens, chanteurs, beatmakers, vidéastes, etc …),<br>de poster des annonces afin de concrétiser et faire aboutir leurs projets musicaux.</p>
        </div>
        <div class="hidden-md-and-up">
            <h2 @click="openInfo">Qu'est-ce que <span class="mus">MUS</span><span class="co">CO</span></h2>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Presentation',
    methods: {
        openInfo() {
            this.$ebus.$emit("openInfo")
        }
    }
}
</script>

<style scoped lang="scss">
    // @media screen and (min-width:960px) {
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

            h2 {
                font-size: 30px;
                margin-top: 40px;
                text-decoration: underline #8833f8;
                &:hover {
                    cursor: pointer
                }
            }

            p {
                margin-top: 10px;
                font-size: 20px
            }
        }
    // }
    // @media screen and (min-width:768px) and (max-width:959px) {
    //     div {
    //         text-align: center;
    //         font-family: 'Shrikhand', cursive;

    //         .mus {
    //             color: #8833f8
    //         }

    //         .co {
    //             color: #01dc0e
    //         }

    //         h1 {
    //             font-size: 30px;
    //             letter-spacing: 1px;
    //             margin-top: 40px
    //         }

    //         h2 {
    //             font-size: 30px;
    //             margin-top: 40px;
    //             &:hover {
    //                 cursor: pointer
    //             }
    //         }

    //         p {
    //             margin-top: 10px;
    //             font-size: 15px
    //         }
    //     }
    // }
</style>
