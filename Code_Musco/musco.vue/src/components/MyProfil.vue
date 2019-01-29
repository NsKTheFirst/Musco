<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout wrap>
            <v-flex>
            <h1 class="titre">Mon profil</h1>
            <!-- {{ infos }} -->
            <figure>
                <img :src="getAvatar(infos.avatar)" :alt="infos.pseudo">
            </figure>
            <h2 class="titre2">{{ infos.pseudo }}</h2>
            <div id="boutons">
                <i v-if="!infos.avatar" class="fas fa-plus-square fa-3x" @click="addImg(infos.id_user)"></i>
                <i v-if="infos.avatar" class="fas fa-pen-square fa-3x" @click="addImg(infos.id_user)"></i>
            </div>
            <Upload/>
            <v-layout wrap>
                <v-flex xs12 sm6 offset-sm3>
                    <!-- <v-card flat>
                        <v-card-title primary-title> -->
                            <div>
                                <h2 class="titre2">Présentation</h2>
                            </div>
                        <!-- </v-card-title>    -->
                        <div class="pres" v-if="infos.presentation">
                            <div class="preText">{{ infos.presentation }}</div>
                        </div>
                        <div id="boutons">
                            <i v-if="!infos.presentation" class="fas fa-plus-square fa-3x"></i>
                            <i v-if="infos.presentation" class="fas fa-pen-square fa-3x"></i>
                        </div>
                        <!-- <v-card-actions>
                            <v-btn flat v-if="!infos.presentation"><i class="fas fa-plus-square fa-3x"></i></v-btn>
                            <v-btn flat><i class="fas fa-pen-square fa-3x"></i></v-btn>
                        </v-card-actions>
                    </v-card> -->
                </v-flex>
            </v-layout>
            <!-- <div id="boutons">
                <i v-if="!infos.presentation" class="fas fa-plus-square fa-3x"></i>
                <i class="fas fa-pen-square fa-3x"></i>
            </div> -->
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Upload from '@/components/Upload'
export default {
    // computed: {
    //     infos() {
    //         return this.$store.getters["user/current"]
    //     }
    // },
    components: {
        Upload
    },
    methods: {
        getAvatar(url) {
            console.log(url);
            return url ? require(`@/assets/Avatars/${url}`) : require("@/assets/Avatars/avatar_par_defaut.jpg");
        },

        addImg() {
            this.$ebus.$emit("addImg");
            // this.$ebus.$emit(usrId);
        }
    },
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'))
    }
}
</script>

<style lang="scss" scoped>
    .titre {
        text-align: center;
        font-family: 'Shrikhand', cursive;
        font-size: 50px;
        margin-bottom: 30px
    }
    figure {
        // display: block;
        // margin: auto;
        
        // display: flex;
        // justify-content: center;
    
        img {
            display: block;
            margin: auto;
            border-radius: 50%;
            border: solid 5px #8833f8;
            margin: auto;
            width: 250px;
            height: 250px  
        }
    }

    .titre2 {
        text-align: center;
        font-family: 'Shrikhand', cursive;
        font-size: 30px;
        margin-bottom: 10px
    }
    #boutons {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 30px;

        .fa-plus-square {
            color: #8833f8;
            &:hover {
                cursor: pointer;
            }
        }

        .fa-pen-square {
            color: #01dc0e;
            &:hover {
                cursor: pointer;
            }
        }
    }

    .pres {
        // margin: auto;
        text-align: center;
        font-family: 'Montserrat', sans-serif;
        font-size: 18px;
        width: 100%;
        height: auto;
        display: flex;
        // flex-wrap: wrap;
        justify-content: center;

        .presText {
            // margin: auto;
            width: 100%;
            flex-wrap: wrap
            
        }
    }

    // @media screen and (min-width:768px) and (max-width:959px) {

    // }

    @media screen and (max-width:767px) {
        .titre {
        text-align: center;
        font-family: 'Shrikhand', cursive;
        font-size: 30px;
        margin-bottom: 30px
        }

        figure {
        // display: flex;
        // justify-content: center;
    
            img {
                display: block;
                margin: auto;
                border-radius: 50%;
                border: solid 5px #8833f8;
                margin: auto;
                width: 125px;
                height: 125px  
            }
        }

        .titre2 {
            text-align: center;
            font-family: 'Shrikhand', cursive;
            font-size: 25px;
            margin-bottom: 10px
        }

        .pres {
        // margin: auto;
            text-align: center;
            font-family: 'Montserrat', sans-serif;
            font-size: 18px;
            width: 100%;
            height: auto;
            display: flex;
            // flex-wrap: wrap;
            justify-content: center;

            .presText {
                // margin: auto;
                width: 100%;
                flex-wrap: wrap
            
        }
    }
    }
</style>