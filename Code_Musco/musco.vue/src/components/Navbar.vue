<template>
    <nav>
        <v-toolbar app class="black">
            <v-toolbar-title class="text-uppercase" id="title">
                <span class="mus">Mus</span>
                <span class="co">co</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down" >
                <v-btn flat id="accueilBtn" :to="{
                    path:'/',
                    name:'accueil'
                    }">Accueil</v-btn>
                <v-btn flat id="annonceBtn" :to="{
                    path:'/annonces',
                    name:'annonces'
                    }">Annonces</v-btn>
                <v-menu offset-y transition="slide-y-transition" bottom>
                    <v-btn flat id="compteBtn" slot="activator" v-if="this.infos">Mon compte</v-btn>
                    <v-list v-if="this.infos">
                        <v-list-tile :to="{path:'/dashboard/me'}">
                            <v-list-tile-title>
                                Mon profil
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="logout" :to="{path:'/'}">
                            <v-list-tile-title>
                                Se déconnecter
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                    <v-btn flat id="connexionBtn" slot="activator" v-if="!this.infos">Connexion</v-btn> <!-- ajouter v-if="!infos" -->
                    <v-list v-if="!this.infos"> <!-- ajouter v-if="!infos" -->
                        <v-list-tile v-for="link in links" :key="link.text" @click="openForm">
                            <v-list-tile-title>
                                {{ link.text }}
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
            <v-toolbar-items class="hidden-sm-and up" id="menu">
                <v-menu offset-y transition="slide-x-reverse-transition" right>
                    <v-btn flat slot="activator">
                        <div id="burger">
                            <span id="purple"></span>
                            <span id="green"></span>
                            <span id="purple2"></span>
                        </div>
                    </v-btn>
                    <v-list v-if="!this.infos">
                        <v-list-tile v-for="lien in liens" :key="lien.text" :to="lien.to">
                            <v-list-tile-title>
                                {{ lien.text }}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile v-for="link in links" :key="link.text" @click="openForm">
                            <v-list-tile-title>
                                {{ link.text }}
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                    <v-list v-if="this.infos">
                        <v-list-tile v-for="lien in liens" :key="lien.text" :to="lien.to">
                            <v-list-tile-title>
                                {{ lien.text }}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile :to="{path:'/dashboard/me'}">
                            <v-list-tile-title>
                                Mon profil
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="logout" :to="{path:'/'}">
                            <v-list-tile-title>
                                Se déconnecter
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
    </nav>
</template>

<script>
import auth from "@/utils/auth.js"
export default {
    data() {
        return {
            links: [
                {text: 'Se connecter'},
                {text: 'Créer un compte'}
            ],
            liens: [
                {
                    text: 'Accueil',
                    to: '/'
                },
                {
                    text: 'Annonces',
                    to: '/annonces'
                },
            ],
            infos: null
            // logged: false 
        }
    },
    methods: {
        // Observe l'élément déclencheur et émet une data différente en fonction du résultat.
        openForm(evt) {
            if (evt.target.textContent.trim() == this.links[0].text) {
                // console.log("yep");
                this.$ebus.$emit("openFormLog");
            } else {
                // console.log("yop");
                this.$ebus.$emit("openFormReg");
            };
        },
        logout() {
            // auth.logUserOut(this);
            window.localStorage.clear('user');
        }
    },

    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        console.log(localStorage.length);
        console.log(this.infos);
    },

    
    // watch: {
    //     checkLogged: function() {
    //         if(localStorage.length > 0) {
    //             this.logged = true
    //         }
    //     }
    // }

    // computed: {
    //     checkLogged: function() {
    //         if (window.localStorage.length <= 0) {
    //         return this.logged = false
    //         } else {
    //             return this.logged =true
    //         }
    //     }
    // }

} 
</script>

<style scoped lang="scss">
    @media screen and (min-width:960px) {
        nav {
            font-family: 'Shrikhand', cursive;
            z-index: 5;

            .mus {
                color: #8833f8
            }

            .co {
             color: #01dc0e
            }

            #title {
                font-size: 40px
            }

            #annonceBtn, #connexionBtn, #compteBtn {
                border-left: 1px solid #8833f8;
            }

            #accueilBtn, #annonceBtn, #connexionBtn, #compteBtn{
                color: white;
                font-size: 20px;
                &:hover {
                // background: black;
                color: #01dc0e
                }
            }

            #menu {
                display: none
            }
        }
    } 

    @media screen and (min-width:768px) and (max-width:959px) {
        nav {
            font-family: 'Shrikhand', cursive;
            z-index: 5;

            .mus {
                color: #8833f8
            }

            .co {
             color: #01dc0e
            }

            #title {
                font-size: 30px
            }

            #purple, #purple2 {
                width: 40px;
                height: 8px;
                background: #8833f8;
                display: block;
                // flex-direction: column;
            }

            #green {
                width: 40px;
                height: 8px;
                background: #01dc0e;
                display: block;
                margin: 6px 0px
                // flex-direction: column;
            }

            #burger {
                width: auto;
                height: auto;
                margin: auto;
                display: flex;
                flex-direction: column;
                // align-content: space-around;
                // flex-wrap: wrap;
                &:hover {
                    color: #01dc0e
                }
            }
        }
    }

    @media screen and (max-width:767px) {
        nav {
            font-family: 'Shrikhand', cursive;
            z-index: 5;

            .mus {
                color: #8833f8
            }

            .co {
             color: #01dc0e
            }

            #title {
                font-size: 30px
            }

            #purple, #purple2 {
                width: 35px;
                height: 6px;
                background: #8833f8;
                display: block;
                // flex-direction: column;
            }

            #green {
                width: 35px;
                height: 6px;
                background: #01dc0e;
                display: block;
                margin: 4px 0px
                // flex-direction: column;
            }

            #burger {
                width: auto;
                height: auto;
                margin: auto;
                display: flex;
                flex-direction: column;
                // align-content: space-around;
                // flex-wrap: wrap;
                &:hover {
                    color: #01dc0e
                }
            }
        }
    }
</style>
