<template>
    <main id="contenu">
        <h1 id="titre">Mes messages</h1>
        <article class="message" v-for="(message, m) in messages" :key="m">
            <v-container grid-list-md test-xs-center>
                <v-layout row>
                    <v-flex xs2>
                        <figure>
                            <img :src="getAvatar(message.avatar)" :alt="message.pseudo" class="avatar" :to="{
                                path: '/profil',
                                name: 'profil'
                            }">
                        </figure>
                        <h3 class="pseudo">{{ message.pseudo }}</h3>
                    </v-flex>
                    <v-flex xs10>
                        <v-layout row justify-center>
                            <v-flex xs6>
                                <h3 class="infos">{{ message.sujet }}</h3>
                            </v-flex>
                            <v-flex xs6>
                                <h3 class="infos">{{ message.date }}</h3>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex xs12>
                                <p class="text">{{ message.message }}</p>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
            <div class="boutons">
                <div class="btns">
                    <span class="repondre" @click="repMess(message.id_emetteur)">Répondre</span>
                    <span class="suppr" @click="delMessage(message.id_message)">Supprimer</span>
                </div>
            </div>
        </article>
        <RepMessage/>
    </main>
</template>

<script>
import axios from 'axios'
import RepMessage from '@/components/Forms/RepMessage'
export default {
    components: {
        RepMessage
    },
    data() {
        return {
            messages: []
        }
    },
   
    methods: {
        getMessages() {
            const url = "http://localhost:5000/api/v1/messages/owned/";
            axios.get(url + this.infos.id_user).then(res => {
                console.log(res.data);
                this.messages = res.data;
            }).catch(err => {
                console.log(err);
            });
            console.log(this.messages);
        },
        getAvatar(url) {
            console.log(url);
            return url ? require(`@/assets/Avatars/${url}`) : require("@/assets/Avatars/avatar_par_defaut.jpg");
        },
        delMessage(id) {
            const url = "http://localhost:5000/api/v1/messages";
            axios.delete(url, { data: { id_message: id } }).then(res => {
                console.log(res.data);
                this.getMessages();
            }).catch(err => {
                console.log(err);
            })
        },
        repMess(idEm) {
            this.$ebus.$emit("emetId", idEm);
            this.$ebus.$emit("repMess")
            console.log(idEm);
        }
    },    
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.getMessages();
    }
}
</script>

<style lang="scss" scoped>
    #titre {
        font-size: 50px;
        font-family: 'Shrikhand', cursive;
        text-align: center;
        margin-bottom: 80px
    }

    .message {
        width: 80%;
        height: auto;
        border: solid 5px #8833f8;
        border-radius: 20px;
        margin: auto;
        margin-top: 80px;
        padding: 10px;
        box-shadow: 10px 10px 20px grey;

        .avatar {
        width: 80px;
        height: 80px;
        display: block;
        margin: auto;
        border: solid 3px #01dc0e;
        border-radius: 50%;
        &:hover {
            cursor: pointer;
            box-shadow: 3px 3px 8px grey
        }
        }

        .pseudo {
            text-align: center;
            font-family: 'Shrikhand', cursive;
            font-size: 20px

        }

        .infos {
            text-align: center;
            font-family: 'Monserrat', sans-serif;
            font-size: 18px
        }

        .text {
            // display: block;
            // margin: auto;
            text-align: center;
            font-family: 'Monserrat', sans-serif;
            font-size: 17px

        }

        .boutons {
            width: 100%;
            height: auto;
            margin-top: 30px;

            .btns {
                width: 50%;
                margin: auto;
                display: flex;
                justify-content: space-between;

                .repondre {
                    padding: 5px;
                    color: #8833f8;
                    background: #01dc0e;
                    border: solid 2px #8833f8;
                    border-radius: 5px;
                    box-shadow: 3px 3px 8px grey;
                    text-align: center;
                    font-weight: bold;
                    font-family: 'Monserrat', sans-serif;
                    font-size: 15px;
                    &:hover {
                        cursor: pointer;
                        box-shadow: 5px 5px 8px grey
                    }
                }

                .suppr {
                    padding: 5px;
                    color: #01dc0e;
                    background: #8833f8;
                    border: solid 2px #01dc0e;
                    border-radius: 5px;
                    box-shadow: 3px 3px 8px grey;
                    text-align: center;
                    font-weight: bold;
                    font-family: 'Monserrat', sans-serif;
                    font-size: 15px;
                    &:hover {
                        cursor: pointer;
                        box-shadow: 5px 5px 8px grey
                    }
                }
            }
        }
    }
    
</style>
