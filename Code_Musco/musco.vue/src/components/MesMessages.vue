<template>
    <main>
        <h1 id="titre">Mes messages</h1>
        <article class="message" v-for="(message, m) in messages" :key="m">
            <div class="haut">
                <div class="avatPseudo">
                    <figure>
                        <img :src="getAvatar(message.avatar)" :alt="message.pseudo" class="avatar" @click="toProfil($event, message.id_emetteur)">
                    </figure>
                    <h3 class="pseudo">{{ message.pseudo }}</h3>
                </div>
                <div class="contenu">
                    <div class="titreMess">
                        <h3 class="infos">{{ message.sujet }}</h3>
                        <h3 class="infos">{{ message.date }}</h3>
                    </div>
                    <div class="texteMess">
                        <p class="text">{{ message.message }}</p>
                    </div>
                </div>
            </div>       
            <div class="boutons">
                <div class="btns">
                    <span class="repondre" @click="sendMess(message.id_emetteur)">Répondre</span>
                    <span class="suppr" @click="delMessage(message.id_message)">Supprimer</span>
                </div>
            </div>
        </article>
        <SendMessage/>
    </main>
</template>

<script>
import axios from 'axios'
import SendMessage from '@/components/Forms/SendMessage'
export default {
    components: {
        SendMessage
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
                if (confirm("Voulez-vous supprimer ce message?")) {
                    alert("Message supprimé!");
                    this.getMessages();
                }
            }).catch(err => {
                console.log(err);
            })
        },
        sendMess(idEm) {
            this.$ebus.$emit("emetId", idEm);
            this.$ebus.$emit("sendMess")
            console.log(idEm);
        },

        toProfil(evt, owner) {
            if (evt.target !== this.event) {
                this.dialog = false;
                this.$router.push({ path: `/profil`});
                this.$ebus.$emit("owner", owner);
                console.log(owner);
            }
        }
    },    
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.getMessages();
    }
}
</script>

<style lang="scss" scoped>
    @media screen and (min-width:959px) {
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

            .haut {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;

                .avatPseudo {
                    width: 20%;
                    height: auto;
                    display: flex;
                    flex-direction: column;

                    figure {
                        width: 100%;
                        height: auto;
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
                    }

                    .pseudo {
                        width: 100%;
                        height: auto;
                        text-align: center;
                        font-family: 'Shrikhand', cursive;
                        font-size: 20px
                    }
                }

                .contenu {
                    width: 80%;
                    height: auto;
                    display: flex;
                    flex-direction: column;

                    .titreMess {
                        width: 100%;
                        height: auto;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;

                        .infos {
                            text-align: center;
                            font-family: 'Monserrat', sans-serif;
                            font-size: 20px
                        }
                    }

                    .texteMess {
                        width: 100%;
                        height: auto;

                        .text {
                            flex-wrap: wrap;
                            font-size: 20px;
                            font-family: 'Monserrat', sans-serif;
                        }
                    }
                }   
            }

            .boutons {
                width: 100%;
                height: auto;
                margin-top: 10px;

                .btns {
                    width: 50%;
                    height: auto;
                    display: block;
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
    }    

    @media screen and (min-width:768px) and (max-width:959px) {
        #titre {
            font-size: 50px;
            font-family: 'Shrikhand', cursive;
            text-align: center;
            margin-bottom: 80px
        }

        .message {
            width: 100%;
            height: auto;
            border: solid 5px #8833f8;
            border-radius: 20px;
            margin: auto;
            margin-top: 80px;
            padding: 10px;
            box-shadow: 10px 10px 20px grey;

            .haut {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;

                .avatPseudo {
                    width: 30%;
                    height: auto;
                    display: flex;
                    flex-direction: column;

                    figure {
                        width: 100%;
                        height: auto;
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
                    }

                    .pseudo {
                        width: 100%;
                        height: auto;
                        text-align: center;
                        font-family: 'Shrikhand', cursive;
                        font-size: 16px
                    }
                }

                .contenu {
                    width: 70%;
                    height: auto;
                    display: flex;
                    flex-direction: column;

                    .titreMess {
                        width: 100%;
                        height: auto;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;

                        .infos {
                            text-align: center;
                            font-family: 'Monserrat', sans-serif;
                            font-size: 18px
                        }
                    }

                    .texteMess {
                        width: 100%;
                        height: auto;

                        .text {
                            flex-wrap: wrap;
                            font-size: 18px;
                            font-family: 'Monserrat', sans-serif;
                        }
                    }
                }   
            }

            .boutons {
                width: 100%;
                height: auto;
                margin-top: 10px;

                .btns {
                    width: 50%;
                    height: auto;
                    display: block;
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
    }

    @media screen and (max-width:767px) {
        #titre {
            font-size: 30px;
            font-family: 'Shrikhand', cursive;
            text-align: center;
            margin-bottom: 80px
        }

        .message {
            width: 100%;
            height: auto;
            border: solid 5px #8833f8;
            border-radius: 20px;
            margin: auto;
            margin-top: 80px;
            padding: 10px;
            box-shadow: 10px 10px 20px grey;

            .haut {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;

                .avatPseudo {
                    width: 30%;
                    height: auto;
                    display: flex;
                    flex-direction: column;

                    figure {
                        width: 100%;
                        height: auto;
                        .avatar {
                            width: 50px;
                            height: 50px;
                            display: block;
                            margin: auto;
                            border: solid 2px #01dc0e;
                            border-radius: 50%;
                            &:hover {
                                cursor: pointer;
                                box-shadow: 3px 3px 8px grey
                            }
                        }
                    }

                    .pseudo {
                        width: 100%;
                        height: auto;
                        text-align: center;
                        font-family: 'Shrikhand', cursive;
                        font-size: 10px
                    }
                }

                .contenu {
                    width: 70%;
                    height: auto;
                    display: flex;
                    flex-direction: column;

                    .titreMess {
                        width: 100%;
                        height: auto;
                        display: flex;
                        flex-direction: column;
                        text-align: center;

                        .infos {
                            font-family: 'Monserrat', sans-serif;
                            font-size: 15px
                        }
                    }

                    .texteMess {
                        width: 100%;
                        height: auto;
                        padding: 5px;

                        .text {
                            flex-wrap: wrap;
                            font-size: 15px;
                            font-family: 'Monserrat', sans-serif;
                        }
                    }
                }   
            }

            .boutons {
                width: 100%;
                height: auto;
                margin-top: 10px;

                .btns {
                    width: 90%;
                    height: auto;
                    display: block;
                    margin: auto;
                    display: flex;
                    justify-content: space-between;

                    .repondre {
                        padding: 2px;
                        color: #8833f8;
                        background: #01dc0e;
                        border: solid 2px #8833f8;
                        border-radius: 5px;
                        box-shadow: 3px 3px 8px grey;
                        text-align: center;
                        font-weight: bold;
                        font-family: 'Monserrat', sans-serif;
                        font-size: 12px;
                        &:hover {
                            cursor: pointer;
                            box-shadow: 5px 5px 8px grey
                        }
                    }

                    .suppr {
                        padding: 2px;
                        color: #01dc0e;
                        background: #8833f8;
                        border: solid 2px #01dc0e;
                        border-radius: 5px;
                        box-shadow: 3px 3px 8px grey;
                        text-align: center;
                        font-weight: bold;
                        font-family: 'Monserrat', sans-serif;
                        font-size: 12px;
                        &:hover {
                            cursor: pointer;
                            box-shadow: 5px 5px 8px grey
                        }
                    }
                }
            }
        }
    }
</style>
