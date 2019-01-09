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
                <v-btn flat round id="contBtn">Contact</v-btn>
                
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

        #faqBtn, #mlBtn, #contBtn {
            color: white;
            font-family: 'Shrikhand', cursive;
            &:hover {
                color: #8833f8
            }   
        }
    }
</style>
