<template>
    <footer>
        <v-footer height="auto" class="black"> 
            <v-layout justify-center row wrap>
                <v-btn flat round id="faqBtn" :to="{
                    path:'/faq',
                    name:'faq'
                    }">FAQ</v-btn>
                <v-btn flat round id="mlBtn" :to="{
                    path:'/mentions',
                    name:'mentions'
                    }">Mentions légales</v-btn>
                <v-btn flat round id="contBtn"><a href="mailto:nicolas_jouenne@live.fr">Contact</a></v-btn>
                <v-btn icon id="fbBtn" href='https://fr-fr.facebook.com/'><i class="fab fa-facebook-square fa-2x"></i></v-btn>
                <v-btn icon id="twitterBtn" href='https://twitter.com/?lang=fr'><i class="fab fa-twitter-square fa-2x"></i></v-btn>
                <v-flex
                    lighten-2
                    py-3
                    text-xs-center
                    white--text
                    xs12
                >
                &copy;2018 — <strong>Musco</strong>  
                </v-flex>
            </v-layout>
        </v-footer>
    </footer>
</template>

<script>
export default {
    
}
</script>

<style scoped lang="scss">
    footer {
        margin-top: 30px;

        a {
            text-decoration: none;
            color: white;
            &:hover {
                color: #8833f8
            }
        }

        #faqBtn, #mlBtn, #contBtn {
            color: white;
            font-family: 'Shrikhand', cursive;
            &:hover {
                color: #8833f8
            }
        }
        #fbBtn, #twitterBtn {
            color: white;
            &:hover {
                color: #8833f8
            }
        }
    }
</style>
