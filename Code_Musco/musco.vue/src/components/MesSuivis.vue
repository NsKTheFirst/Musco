<template>
    <section>
        <h1 id="titre">Mes suivis</h1>
        <div class="carte" v-for="(suivi, s) in suivis" :key="s">
            <div class="pseudo">
                <h2>{{ suivi.pseudo }}</h2>
            </div>
            <div class="contenu">
                <div class="avat">
                    <figure>
                        <img :src="getAvatar(suivi.avatar)" :alt="suivi.pseudo" class="avatar" @click="toProfil(suivi.id_user_followed)">
                    </figure>
                </div>
                <div class="avatbtns">
                    <div class="btns">
                        <span class="mess" @click="sendMess(suivi.id_user_followed)">Envoyer un message</span>
                        <span class="del" @click="delSuivi(suivi.id_ufu, suivi.pseudo)">Ne plus suivre</span>
                    </div>
                </div>
            </div>
        </div>
        <SendMessage/>
    </section>
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
            suivis: []
        }
    },
    methods: {
        getUfu() {
            const url = "http://localhost:5000/api/v1/ufu/";
            axios.get(url + this.infos.id_user).then(res => {
                console.log(res.data);
                this.suivis = res.data;
            }).catch(err => {
                console.log(err);
            });
            console.log(this.suivis);
        },
        getAvatar(url) {
            console.log(url);
            return url ? require(`@/assets/Avatars/${url}`) : require("@/assets/Avatars/avatar_par_defaut.jpg");
        },

        delSuivi(id, pseudo) {
            const url = "http://localhost:5000/api/v1/ufu";
            axios.delete(url, { data: { id_ufu: id } }).then(res => {
                console.log(res.data);
                if (confirm(`Voulez- vous arrêter de suivre ${pseudo}`)) {
                    alert("Arrêt du suivi!");
                    this.getUfu();
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
        toProfil(owner) {
                this.dialog = false;
                // console.log(this.$route);
                this.$router.push({ path: `/profil/${owner}`});
                // this.$ebus.$emit("owner", owner);
                // console.log(owner);
        }
    },
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.getUfu();
    }
}
</script>

<style lang="scss" scoped>
    @media screen and (min-width:959px) {
        #titre {
            font-size: 50px;
            font-family: 'Shrikhand', cursive;
            text-align: center;
            margin-bottom: 130px
        }
        .carte {
            width: 100%;
            height: auto;
            margin: auto;
            margin-top: 50px;
            padding: 15px;
            border: solid 3px #8833f8;
            border-radius: 80px;
            box-shadow: 8px 8px 10px darkgrey;
            display: flex;
            flex-direction: column;

            .pseudo {
                width: 100%;
                height: auto;

                h2 {
                    text-align: center;
                    font-family: 'Shrikhand', cursive;
                    font-size: 30px;
                }
            }
            
            .contenu {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;

                .avat {
                    width: 30%;
                    height: auto;
                    display: flex;
                    align-items: center;
            
                    figure {
                        width: 100%;
                        height: auto;
                
                        .avatar {
                            width: 100px;
                            height: 100px;
                            display: block;
                            margin: auto;
                            border: solid 3px #8833f8;
                            border-radius: 50%;
                            &:hover {
                                cursor: pointer;
                                box-shadow: 3px 3px 8px grey;
                                border: solid 3px #01dc0e;
                            }
                        }   
                    }
                }

                .avatbtns {
                    width: 70%;
                    height: auto;
                    // margin-top: 20px;
            
                    .btns {
                        width: 80%;
                        height: auto;
                        margin-left: 10%;
                        margin-top: 35px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;

                        .mess {
                            padding: 5px;
                            color: #8833f8;
                            background: #01dc0e;
                            border: solid 2px #8833f8;
                            border-radius: 5px;
                            box-shadow: 3px 3px 8px grey;
                            text-align: center;
                            font-weight: bold;
                            font-family: 'Monserrat', sans-serif;
                            font-size: 20px;
                            &:hover {
                                cursor: pointer;
                                box-shadow: 5px 5px 8px grey
                            }
                        }
                        .del {
                            padding: 5px;
                            color: #01dc0e;
                            background: #8833f8;
                            border: solid 2px #01dc0e;
                            border-radius: 5px;
                            box-shadow: 3px 3px 8px grey;
                            text-align: center;
                            font-weight: bold;
                            font-family: 'Monserrat', sans-serif;
                            font-size: 20px;
                            &:hover {
                                cursor: pointer;
                                box-shadow: 5px 5px 8px grey
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width:768px) and (max-width:959px) {  //80px
        #titre {
            font-size: 50px;
            font-family: 'Shrikhand', cursive;
            text-align: center;
            margin-bottom: 100px
        }
        .carte {
            width: 100%;
            height: auto;
            margin: auto;
            margin-top: 50px;
            padding: 15px;
            border: solid 3px #8833f8;
            border-radius: 80px;
            box-shadow: 8px 8px 10px darkgrey;
            display: flex;
            flex-direction: column;

            .pseudo {
                width: 100%;
                height: auto;

                h2 {
                    text-align: center;
                    font-family: 'Shrikhand', cursive;
                    font-size: 25px;
                }
            }
            
            .contenu {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;

                .avat {
                    width: 30%;
                    height: auto;
                    display: flex;
                    align-items: center;
            
                    figure {
                        width: 100%;
                        height: auto;
                
                        .avatar {
                            width: 80px;
                            height: 80px;
                            display: block;
                            margin: auto;
                            border: solid 3px #8833f8;
                            border-radius: 50%;
                            &:hover {
                                cursor: pointer;
                                box-shadow: 3px 3px 8px grey;
                                border: solid 3px #01dc0e;
                            }
                        }   
                    }
                }

                .avatbtns {
                    width: 70%;
                    height: auto;
            
                    .btns {
                        width: 80%;
                        height: auto;
                        margin-left: 10%;
                        margin-top: 25px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;

                        .mess {
                            padding: 3px;
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
                        .del {
                            padding: 3px;
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
    }

    @media screen and (max-width:767px) {
        #titre {
            font-size: 30px;
            font-family: 'Shrikhand', cursive;
            text-align: center;
            margin-bottom: 80px
        }
        .carte {
            width: 100%;
            height: auto;
            margin: auto;
            margin-top: 50px;
            padding: 15px;
            border: solid 3px #8833f8;
            border-radius: 80px;
            box-shadow: 8px 8px 10px darkgrey;
            display: flex;
            flex-direction: column;

            .pseudo {
                width: 100%;
                height: auto;

                h2 {
                    text-align: center;
                    font-family: 'Shrikhand', cursive;
                    font-size: 17px;
                }
            }
            
            .contenu {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;

                .avat {
                    width: 30%;
                    height: auto;
                    display: flex;
                    align-items: center;
            
                    figure {
                        width: 100%;
                        height: auto;
                
                        .avatar {
                            width: 60px;
                            height: 60px;
                            display: block;
                            margin: auto;
                            border: solid 3px #8833f8;
                            border-radius: 50%;
                            &:hover {
                                cursor: pointer;
                                box-shadow: 3px 3px 8px grey;
                                border: solid 3px #01dc0e;
                            }
                        }   
                    }
                }

                .avatbtns {
                    width: 70%;
                    height: auto;
            
                    .btns {
                        width: 80%;
                        height: auto;
                        margin-left: 10%;
                        margin-top: 3px;
                        display: flex;
                        flex-direction: column;
                        align-content: space-between;

                        .mess {
                            padding: 1px;
                            color: #8833f8;
                            background: #01dc0e;
                            border: solid 2px #8833f8;
                            border-radius: 5px;
                            box-shadow: 3px 3px 8px grey;
                            text-align: center;
                            font-weight: bold;
                            font-family: 'Monserrat', sans-serif;
                            font-size: 10px;
                            &:hover {
                                cursor: pointer;
                                box-shadow: 5px 5px 8px grey
                            }
                        }
                        .del {
                            padding: 1px;
                            color: #01dc0e;
                            background: #8833f8;
                            border: solid 2px #01dc0e;
                            border-radius: 5px;
                            box-shadow: 3px 3px 8px grey;
                            text-align: center;
                            font-weight: bold;
                            font-family: 'Monserrat', sans-serif;
                            font-size: 10px;
                            &:hover {
                                cursor: pointer;
                                box-shadow: 5px 5px 8px grey
                            }
                        }
                    }
                }
            }
        }
    }
</style>
