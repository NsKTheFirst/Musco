<template>
    <main>
        <h1>F.A.Q.</h1>
        <section class="qr">
            <h2 class="question">Pourquoi me créer un compte?</h2>
            <p class="reponse">La création d'un compte permet de poster des annonces et d'y répondre. 
                De plus en tant qu'utilisateur connecté vous aurez la possibilité de voir les productions 
                des autres utilisateurs, ainsi que de les suivres et de leur envoyer des messages.
            </p>
            <h2 class="question">Comment poster mes productions?</h2>
            <p class="reponse">Pour cela il vous suffit d'aller sur votre dashboard et de cliquer sur le bouton ajouter. 
                Dans le formulaire, coller votre lien embed (veillez à selectionner le plus petit format). Vous avez la possibilité d'ajouter un lien Soundcloud 
                et un lien Youtube.
            </p>
            <h2 class="question">Mes prodcutions ne sont pas visibles sur mon smartphone.</h2>
            <p class="reponse">Vos productions n'ont pas disparues, pour des raisons techniques et de praticité, 
                elles ne sont visibles que sur ordinateurs et tablettes.
            </p>
            <h2 class="question">Mon "skill" n'est pas présent dans la liste.</h2>
            <p class="reponse">Musco est en évolution permanente, dans le cas où votre "skill" ou votre instrument 
                n'est pas listé, envoyez nous un mail via le bouton de contact en bas de page, et nous ferons les corrections 
                nécessaires dans les plus brefs délais.
            </p>
        </section>
    </main>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    @media screen and (min-width:959px) {
        main {
            width: 100%;
            height: auto;
            padding: 50px 100px 0px 100px;
        

            h1 {
                text-align: center;
                font-family: 'Shrikhand', cursive;
                font-size: 50px;
                margin-bottom: 90px
            }

            .qr {
                width: 100%;
                height: auto;
                display: flex;
                flex-wrap: wrap;

                h2 {
                    font-family: 'Shrikhand', cursive;
                    font-size: 30px;
                    letter-spacing: 1px
                }

                p {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 20px;
                    margin-bottom: 20px
                }
            }

        }
    }

    @media screen and (min-width:768px) and (max-width:959px) {
        main {
            width: 100%;
            height: auto;
            padding: 50px 50px 0px 50px;
        

            h1 {
                text-align: center;
                font-family: 'Shrikhand', cursive;
                font-size: 50px;
                margin-bottom: 70px
            }

            .qr {
                width: 100%;
                height: auto;
                display: flex;
                flex-wrap: wrap;

                h2 {
                    font-family: 'Shrikhand', cursive;
                    font-size: 30px;
                    letter-spacing: 1px
                }

                p {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 20px;
                    margin-bottom: 20px
                }
            }

        }
    }

    @media screen and (max-width:767px) {
        main {
            width: 100%;
            height: auto;
            padding: 50px 50px 0px 50px;
        

            h1 {
                text-align: center;
                font-family: 'Shrikhand', cursive;
                font-size: 30px;
                margin-bottom: 70px
            }

            .qr {
                width: 100%;
                height: auto;
                display: flex;
                flex-wrap: wrap;

                h2 {
                    font-family: 'Shrikhand', cursive;
                    font-size: 25px;
                    letter-spacing: 1px
                }

                p {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 15px;
                    margin-bottom: 20px
                }
            }

        }
    }
</style>
