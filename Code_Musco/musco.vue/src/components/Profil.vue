<template>
    <main>
        <div class="titre">
            <h1>Profil de {{ user.pseudo }}</h1>
        </div>
        <div class="avat">
            <figure>
                <img :src="getAvatar(user.avatar)" :alt="user.pseudo">
            </figure>
        </div>
        <div class="pres">
            <h2 class="titre2">Présentation</h2>
            <p>{{ user.presentation }}</p>
        </div>
        <div class="actionBtns" v-if="logged">
            <span class="suivre" @click="follow">Suivre</span>
            <span class="mess" @click="sendMess(user.id_user)">Envoyer un message</span>
            <span class="suivre2" @click="checkFollow"><i class="fas fa-user-friends fa-3x"></i></span>
            <span class="mess2" @click="sendMess(user.id_user)"><i class="fas fa-envelope fa-3x"></i></span>
        </div>
        <section class="prods" v-if="(user.soundcloud || user.youtube) && logged">
            <h2 class="titre2">Ses productions</h2>
            <div class="sound">
                <h3>Soundcloud</h3>
                <span v-html="user.soundcloud"></span>
            </div>
            <div class="youtube">
                <h3>Youtube</h3>
                <span v-html="user.youtube"></span>
            </div>
        </section>
        <div class="titreSec" v-if="annonces">
            <h2 class="titre2">Ses annonces</h2>
            <span><i class="fas fa-caret-down fa-5x" :class="{ rotate: isRotated }" @click="toggle"></i></span>
        </div>
        <section class="annSec" :class="{ active: isActive, notActive: isNotActive }" v-if="annonces">
            <article class="annonce" v-for="(annonce, a) in annonces" :key="a" @click="detailAnnonce(annonce)">
                <div class="titreAnn">
                    <h3 class="numAnnonce">Annonce n° {{ annonce.id_annonce }}</h3>
                </div>
                <div class="infos">
                    <h4>Catégorie: {{ annonce.categorie }}</h4>
                    <h4>Skill: {{ annonce.skill }}</h4>
                    <h4>Date : {{ annonce.date }}</h4>
                </div>
                <div class="textAnn">
                    <div class="texte">
                        <p>{{ annonce.annonce }}</p>
                    </div>
                </div>
            </article>
        </section>
        <div class="facebook">
            <h2 class="titre2">Son Facebook</h2>
            <i class="fab fa-facebook-square fa-4x" :to="user.facebook"></i>
        </div>
        <BackToTop/>
        <SendMessage/>
        <DetailAnnonce/>
    </main>
</template>

<script>
import auth from "@/utils/auth.js"
import axios from 'axios'
import BackToTop from '@/components/BackToTop.vue'
import SendMessage from '@/components/Forms/SendMessage'
import DetailAnnonce from '@/components/Forms/DetailAnnonce'
export default {
    components: {
        BackToTop,
        SendMessage,
        DetailAnnonce
    },

    data() {
        return {
            user: [],
            annonces: [],
            logged: false,
            isRotated: false,
            isActive: false,
            isNotActive: true,
            ufu: {}
        }
    },
    methods: {
        getUser() {
            // console.log(this.id);
            const url = "http://localhost:5000/api/v1/user/simple/";
            axios.get(url + this.$route.params.id).then(res => {
                console.log(res.data);
                this.user = res.data[0];
                // this.replace();
            }).catch(err => {
                // console.log(err);
            });
            // console.log(this.user);
        },
        getAnnonce() {
            const url = "http://localhost:5000/api/v1/annonces/owner/";
            axios.get(url + this.$route.params.id).then(res => {
                // console.log(res.data);
                this.annonces = res.data;
                // console.log(this.annonces);
            }).catch(err => {
                // console.log(err);
            });
        },
        getAvatar(url) {
            // console.log(url);
            return url ? require(`@/assets/Avatars/${url}`) : require("@/assets/Avatars/avatar_par_defaut.jpg");
        },
        isLogged() {
            this.logged = auth.isLoggedIn();
        },

        sendMess(idEm) {
            const infos = JSON.parse(window.localStorage.getItem('user'));
            if (infos.id_user === idEm) {
                alert("vous ne pouvez pas vous envoyer un message à vous même!");
            }else {
                this.$ebus.$emit("emetId", idEm);
                this.$ebus.$emit("sendMess")
            };
        },

        detailAnnonce(annonce) {
            this.$ebus.$emit("detailAnnonce");
            this.$ebus.$emit("emitAnnonce", annonce);
        },

        checkFollow() {
            const infos = JSON.parse(window.localStorage.getItem('user'));
            this.ufu.id_following_user = infos.id_user;
            this.ufu.id_user_followed = this.user.id_user;
            if (this.ufu.id_following_user === this.ufu.id_user_followed) {
                alert("Ceci est votre profil!");
            }else {
                this.follow();
            }
        },

        follow() {
            
            if (this.ufu.id_following_user === this.ufu.id_user_followed) {
                alert("Ceci est votre profil!");
            };
            // console.log(this.ufu);
            const url = "http://localhost:5000/api/v1/ufu";
            if (confirm(`Voulez-vous suivre ${this.user.pseudo}?`)) {
                axios.post(url, this.ufu).then(res => {
                    alert("Suivi validé");
                    // console.log(res.data);
                }).catch(err => {
                    // console.log(err);
                });
            };    
        },

        toggle() {
            if (this.isActive && !this.isNotActive) {
                this.isActive = false;
                this.isNotActive = true
            } else {
                this.isActive = true;
                this.isNotActive = false;
            };
            if (this.isRotated) {
                this.isRotated = false;
            } else {
                this.isRotated = true;
            };
        }
    },
    mounted() {

    },
    created() {
        this.getUser();
        this.getAnnonce();
        this.$ebus.$on("logged", this.isLogged);
        this.isLogged();
        // console.log(this.user);
    }
}
</script>

<style lang="scss" scoped>
    @media screen and (min-width:959px) {
        main{
            width: 100%;
            height: auto;
            padding: 0px 100px;

            .titre2 {
                text-align: center;
                font-family: 'Shrikhand', cursive;
                font-size: 35px;
                // margin-bottom: 30px
            }
            
            .titre {
                width: 100%;
                height: auto;
                margin-top: 50px;

                h1 {
                    text-align: center;
                    font-family: 'Shrikhand', cursive;
                    font-size: 50px;
                    letter-spacing: 2px
                }
            }

            .avat {
                width: 100%;
                height: auto;
                margin: 50px 0px 40px; 

                figure {
                    width: 100%;
                    height: auto;

                    img {
                        width: 250px;
                        height: 250px;
                        display: block;
                        margin: auto;
                        border: solid 5px #8833f8;
                        border-radius: 50%
                    }
                }
            }

            .pres {
                width: 100%;
                height: auto;
                margin-bottom: 50px;

                p {
                    display: block;
                    margin-top: 20px;
                    padding: 0px 200px;
                    text-align: center;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 20px
                }
            }

            .actionBtns {
                width: 30%;
                height: auto;
                display: block;
                margin: auto;
                margin-bottom: 80px;
                display: flex;
                justify-content: space-between;

                .suivre, .mess {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 20px;
                    font-weight: 700;
                    color: #8833f8;
                    padding: 5px;
                    background: #01dc0e;
                    border: solid 2px #8833f8;
                    border-radius: 5px;

                    &:hover {
                        cursor: pointer;
                        color: #01dc0e;
                        background: #8833f8;
                        border: solid 2px #01dc0e;

                    }
                }
                .suivre2, .mess2 {
                    display: none
                }
            }

            .prods {
                width: 100%;
                height: auto;

                h3 {
                    text-align: center;
                    font-family: 'Shrikhand', cursive;
                    font-size: 25px;
                    margin-bottom: 15px
                }

                .sound {
                    width: 100%;
                    height: auto;
                    margin-bottom: 80px;
                    margin-top: 30px;

                    span {
                        width: 600px;
                        height: auto;
                        display: block;
                        margin: auto;
                    }
                }

                .youtube {
                    width: 100%;
                    height: auto;
                    margin-bottom: 80px;
                    margin-top: 30px;

                    span {
                        width: 560px;
                        height: auto;
                        display: block;
                        margin: auto;
                    }
                }
            }

            .titreSec {
                width: 100%;
                height: auto;
                text-align: center;

                i {
                    transition: 0.3s;
                    
                    &:hover {
                        cursor: pointer;
                        color: #8833f8;
                        
                    }
                }

                .rotate {
                    transform: rotateZ(180deg)
                }
            }

            .notActive {
                display: none;
            }

            .active {

                .annonce {
                    width: 80%;
                    height: auto;
                    margin: auto;
                    padding: 10px;
                    border: solid 5px #8833f8;
                    border-radius: 10px;
                    box-shadow: 8px 8px 10px darkgrey;
                    margin-top: 30px;
                    font-family: 'Montserrat', sans-serif;
                    margin-bottom: 30px;

                    &:hover {
                        border: solid 5px #01dc0e;
                        box-shadow: 12px 12px 10px darkgrey;
                        cursor: pointer
                    }

                    .titreAnn {
                        width: 100%;
                        height: auto;

                        .numAnnonce {
                            text-align: center;
                            font-family: 'Shrikhand', cursive;
                            font-size: 20px;
                            margin-bottom: 10px
                        }
                    }

                    .infos {
                        width: 100%;
                        height: auto;
                        display: flex;
                        justify-content: space-around;
                        // margin-bottom: 10px;

                        h4 {
                            font-size: 16px
                        }
                    }

                    .textAnn {
                        width: 100%;
                        height: auto;
                        margin: 10px;

                        .texte {
                            width: 100%;
                            height: auto;

                            p {
                                font-size: 16px;
                                flex-wrap: wrap
                            }
                        }
                    }
                }
            }

            .facebook {
                width: 100%;
                height: auto;
                text-align: center;
                margin-top: 50px;

                i {
                    color: #3B5998;
                    margin-top: 30px;

                    &:hover {
                        cursor: pointer;
                        color: #8833f8
                    }
                }
            }
        }
    }

    @media screen and (min-width:768px) and (max-width:959px) {
        main{
            width: 100%;
            height: auto;
            padding: 0px 100px;

            .titre2 {
                text-align: center;
                font-family: 'Shrikhand', cursive;
                font-size: 35px;
                // margin-bottom: 30px
            }
            
            .titre {
                width: 100%;
                height: auto;
                margin-top: 50px;

                h1 {
                    text-align: center;
                    font-family: 'Shrikhand', cursive;
                    font-size: 50px;
                    letter-spacing: 2px
                }
            }

            .avat {
                width: 100%;
                height: auto;
                margin: 50px 0px 40px; 

                figure {
                    width: 100%;
                    height: auto;

                    img {
                        width: 250px;
                        height: 250px;
                        display: block;
                        margin: auto;
                        border: solid 5px #8833f8;
                        border-radius: 50%
                    }
                }
            }

            .pres {
                width: 100%;
                height: auto;
                margin-bottom: 50px;

                p {
                    display: block;
                    margin-top: 20px;
                    padding: 0px 70px;
                    text-align: center;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 20px
                }
            }

            .actionBtns {
                width: 30%;
                height: auto;
                display: block;
                margin: auto;
                margin-bottom: 80px;
                display: flex;
                justify-content: space-between;

                .suivre, .mess {
                    display: none
                    // font-family: 'Montserrat', sans-serif;
                    // font-size: 20px;
                    // font-weight: 700;
                    // color: #8833f8;
                    // padding: 5px;
                    // background: #01dc0e;
                    // border: solid 2px #8833f8;
                    // border-radius: 5px;

                    // &:hover {
                    //     cursor: pointer;
                    //     color: #01dc0e;
                    //     background: #8833f8;
                    //     border: solid 2px #01dc0e;

                    // }
                }
                .suivre2, .mess2 {
                    color: #01dc0e;
                }
            }

            .prods {
                width: 100%;
                height: auto;

                h3 {
                    text-align: center;
                    font-family: 'Shrikhand', cursive;
                    font-size: 25px;
                    margin-bottom: 15px
                }

                .sound {
                    width: 100%;
                    height: auto;
                    margin-bottom: 80px;
                    margin-top: 30px;

                    span {
                        width: 560px;
                        height: auto;
                        display: block;
                        margin: auto;
                    }
                }

                .youtube {
                    width: 100%;
                    height: auto;
                    margin-bottom: 80px;
                    margin-top: 30px;

                    span {
                        width: 560px;
                        height: auto;
                        display: block;
                        margin: auto;
                    }
                }
            }

            .titreSec {
                width: 100%;
                height: auto;
                text-align: center;

                i {
                    transition: 0.3s;
                }

                .rotate {
                    transform: rotateZ(180deg)
                }
            }

            .notActive {
                display: none;
            }

            .active {

                .annonce {
                    width: 100%;
                    height: auto;
                    margin: auto;
                    padding: 10px;
                    border: solid 5px #8833f8;
                    border-radius: 10px;
                    box-shadow: 8px 8px 10px darkgrey;
                    margin-top: 30px;
                    font-family: 'Montserrat', sans-serif;
                    margin-bottom: 30px;

                    .titreAnn {
                        width: 100%;
                        height: auto;

                        .numAnnonce {
                            text-align: center;
                            font-family: 'Shrikhand', cursive;
                            font-size: 20px;
                            margin-bottom: 10px
                        }
                    }

                    .infos {
                        width: 100%;
                        height: auto;
                        display: flex;
                        justify-content: space-around;
                        // margin-bottom: 10px;

                        h4 {
                            font-size: 16px
                        }
                    }

                    .textAnn {
                        width: 100%;
                        height: auto;
                        margin: 10px;

                        .texte {
                            width: 100%;
                            height: auto;

                            p {
                                font-size: 16px;
                                flex-wrap: wrap
                            }
                        }
                    }
                }
            }

            .facebook {
                width: 100%;
                height: auto;
                text-align: center;
                margin-top: 50px;

                i {
                    color: #3B5998;
                    margin-top: 30px
                }
            }
        }
    } 

    @media screen and (max-width:767px) {
        main{
            width: 100%;
            height: auto;
            padding: 0px 50px;

            .titre2 {
                text-align: center;
                font-family: 'Shrikhand', cursive;
                font-size: 25px;
                // margin-bottom: 30px
            }
            
            .titre {
                width: 100%;
                height: auto;
                margin-top: 50px;

                h1 {
                    text-align: center;
                    font-family: 'Shrikhand', cursive;
                    font-size: 35px;
                    letter-spacing: 2px
                }
            }

            .avat {
                width: 100%;
                height: auto;
                margin: 50px 0px 40px; 

                figure {
                    width: 100%;
                    height: auto;

                    img {
                        width: 150px;
                        height: 150px;
                        display: block;
                        margin: auto;
                        border: solid 3px #8833f8;
                        border-radius: 50%
                    }
                }
            }

            .pres {
                width: 100%;
                height: auto;
                margin-bottom: 50px;

                p {
                    display: block;
                    margin-top: 20px;
                    padding: 0px 10px;
                    text-align: center;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 15px
                }
            }

            .actionBtns {
                width: 50%;
                height: auto;
                display: block;
                margin: auto;
                margin-bottom: 80px;
                display: flex;
                justify-content: space-between;

                .suivre, .mess {
                    display: none
                }
                .suivre2, .mess2 {
                    color: #01dc0e;
                }
            }

            .prods {
                display: none;
            }

            .titreSec {
                width: 100%;
                height: auto;
                text-align: center;

                i {
                    transition: 0.3s;
                }

                .rotate {
                    transform: rotateZ(180deg)
                }
            }

            .notActive {
                display: none;
            }

            .active {

                .annonce {
                    width: 100%;
                    height: auto;
                    margin: auto;
                    padding: 10px;
                    border: solid 5px #8833f8;
                    border-radius: 10px;
                    box-shadow: 8px 8px 10px darkgrey;
                    margin-top: 30px;
                    font-family: 'Montserrat', sans-serif;
                    margin-bottom: 30px;

                    .titreAnn {
                        width: 100%;
                        height: auto;

                        .numAnnonce {
                            text-align: center;
                            font-family: 'Shrikhand', cursive;
                            font-size: 20px;
                            margin-bottom: 10px
                        }
                    }

                    .infos {
                        width: 100%;
                        height: auto;
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                        margin-bottom: 10px;

                        h4 {
                            font-size: 16px
                        }
                    }

                    .textAnn {
                        width: 100%;
                        height: auto;
                        display: block;
                        display: flex;
                        align-content: center;

                        .texte {
                            width: 100%;
                            height: auto;

                            p {
                                font-size: 16px;
                                flex-wrap: wrap
                            }
                        }
                    }
                }
            }

            .facebook {
                width: 100%;
                height: auto;
                text-align: center;
                margin-top: 50px;

                i {
                    color: #3B5998;
                    margin-top: 30px
                }
            }
        }
    }   
</style>
