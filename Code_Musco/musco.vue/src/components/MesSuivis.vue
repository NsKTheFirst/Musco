<template>
    <section>
        <h1 id="titre">Mes suivis</h1>
        <div class="carte" v-for="(suivi, s) in suivis" :key="s">
            <div class="avat">
                <figure>
                    <img :src="getAvatar(suivi.avatar)" :alt="suivi.pseudo" class="avatar" @click="toProfil($event, suivi.id_user_followed)">
                </figure>
            </div>
            <div class="avatbtns">
                <h2>{{ suivi.pseudo }}</h2>
                <div class="btns">
                    <span class="mess" @click="sendMess(suivi.id_user_followed)">Envoyer un message</span>
                    <span class="del" @click="delSuivi(suivi.id_ufu, suivi.pseudo)">Ne plus suivre</span>
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
        this.getUfu();
    }
}
</script>

<style lang="scss" scoped>
    #titre {
        font-size: 50px;
        font-family: 'Shrikhand', cursive;
        text-align: center;
        margin-bottom: 130px
    }
    .carte {
        width: 80%;
        height: auto;
        margin: auto;
        margin-top: 50px;
        padding: 10px;
        border: solid 3px #8833f8;
        border-radius: 80px;
        display: flex;
        flex-direction: row;

        .avat {
            width: 20%;
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

        .avatbtns {
            width: 80%;
            height: auto;
            h2 {
                margin-left: 30%;
                font-family: 'Shrikhand', cursive;
                font-size: 20px;
            }
            .btns {
                width: 50%;
                height: auto;
                margin-left: 10%;
                margin-top: 20px;
                display: flex;
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
                    font-size: 15px;
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
