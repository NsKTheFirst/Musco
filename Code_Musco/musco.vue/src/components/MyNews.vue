<template>
    <main>
        <h2>Les dernières annonces</h2>
        <section id="news">
            <div class="annonces" v-for="(annonce, a) in annonces" :key="a">
                <!-- <router-link
                :to="{
                    path: `/annonces/${annonce.id}/`,
                    name: 'annonceDetail',
                    params: {id: annonce.id_annonce, annonce: annonce.annonce, annonce_owner: annonce.annonce_owner, date: annonce.date, avatar: annonce.avatar, pseudo: annonce.pseudo, categorie: annonce.categorie, skill: annonce.skil}
                }"> -->
                <div class="profil">
                    <!-- <router-link>    -->
                        <figure>
                            <img :src="getAvatar(annonce.avatar)" :alt="annonce.pseudo">
                        </figure>
                    <!-- </router-link>  -->
                    <h3 id="pseudo">{{ annonce.pseudo }}</h3>
                </div>
                <article>
                    <div>
                        <h4 id="date">{{ annonce.date }}</h4>
                        <h4 id="cat">categorie: {{ annonce.categorie }}</h4>
                        <h4 id="skill"> skill: {{ annonce.skill }}</h4>
                    </div>
                    <p id="annonce">{{ annonce.annonce }}</p>
                </article>
                <!-- </router-link> -->

            </div>
        </section> 
    </main>
</template>

<script>
import axios from 'axios'
export default {
    name: "MyNews",
    data () {
        return {
            annonces: []
        };
    },
    methods: {
        getAvatar(url) {
            console.log(url);
            return url ? require(`@/assets/Avatars/${url}`) : require("@/assets/Avatars/avatar_par_defaut.jpg");
        },

        getAnnonce() {
            const url = "http://localhost:5000/api/v1/annonces/last";
            axios.get(url).then(res => {
                this.annonces = res.data;
            }).catch(err => {
                console.log(err);
            });
        }
    },
    created() {
        this.getAnnonce();
    }
}
</script>

<style scoped lang="scss">
    main {
        width: 100%;
        height: auto;

        h2 {
            font-family: 'Shrikhand', cursive;
            letter-spacing: 2px;
            font-size: 30px;
            text-align: center;
            margin-top: 60px;
            margin-bottom: 40px
        }

        .annonces {
            width: 50%;
            height: auto;
            border: solid 5px #01dc0e;
            border-radius: 10px;
            font-family: 'Montserrat', sans-serif;
            margin: auto;
            margin-bottom: 30px;
            display: flex;
            padding: 1rem;
            box-shadow: 8px 8px 10px darkgrey;
            transition: 0.2s;
            
            &:hover {
                box-shadow: 12px 12px 10px darkgrey;
                border: solid 5px #8833f8
            }
            .profil{
                height: 100%;
                width: 20%;
                
                figure {
                    width: 70px;
                    height: 70px;
                    line-height: 115px;
                    margin: auto;

                    img {
                     height: 100%;
                        width: 100%;
                        border: solid 3px #8833f8;
                        border-radius: 50%;
                    
                    }
                }
                h3 {
                    text-align: center;
                    line-height: 50px;
                    font-family: 'Shrikhand', cursive
                }
            }

            article {
                height: 100%;
                width: 80%;
                text-align: center;
                display: flex;
                flex-direction: column;

                div {
                    height: 20%;
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 10px
                }

                p {
                    font-size: 12px;
                }
            }
        }
        
    }
</style>
