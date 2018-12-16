<template>
    <nav>
        <v-toolbar app class="black">
            <v-toolbar-title class="text-uppercase" id="title">
                <span class="purple--text">Mus</span>
                <span class="green--text">co</span>
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
                <v-btn flat id="connexionBtn">Connexion</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style scoped lang="scss">
    nav {
        font-family: 'Shrikhand', cursive;

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
