<template>
    <nav>
        <v-toolbar app class="black">
            <v-toolbar-title class="text-uppercase" id="title">
                <span class="mus">Mus</span>
                <span class="co">co</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-md-and-down" >
                <v-btn flat id="accueilBtn" :to="{
                    path:'/',
                    name:'accueil'
                    }">Accueil</v-btn>
                <v-btn flat id="annonceBtn" :to="{
                    path:'/annonces',
                    name:'annonces'
                    }">Annonces</v-btn>
                <v-menu offset-y transition="slide-y-transition" bottom>
                    <v-btn flat id="connexionBtn" slot="activator">Connexion</v-btn>
                    <v-list>
                        <v-list-tile v-for="link in links" :key="link.text" @click="openForm">
                            <v-list-tile-title>
                                {{ link.text }}
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {text: 'Se connecter'},
                {text: 'Créer un compte'}
            ]
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
        }
    }
} 
</script>

<style scoped lang="scss">
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

        #annonceBtn, #connexionBtn {
            border-left: 1px solid #8833f8;
        }

        #accueilBtn, #annonceBtn, #connexionBtn{
            color: white;
            font-size: 20px;
            &:hover {
            // background: black;
            color: #01dc0e
            }
        }
    }   
</style>
