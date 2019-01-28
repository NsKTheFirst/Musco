<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span id="titredet">Détail Annonce n° {{annonce.id_annonce}}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 id="annonce">
                                {{ this.annonce.annonce}}
                            </v-flex>
                            <v-flex xs12 v-if="this.infos">
                                <v-textarea outline placeholder="Votre message*" id="message" v-model="message.message"></v-textarea>
                            </v-flex>
                            <v-flex xs12 v-if="this.infos">
                                <v-text-field label="Date*" type="date" v-model="message.date"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*Champs obligatoires</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#8833f8" flat @click="dialog = false">Fermer</v-btn>
                    <v-btn color="#01dc0e" flat v-if="this.infos" @click="checkEmetteur">Envoyer message</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            dialog: false,
            annonce: [],
            message: {}
        }
    },
    methods: {
        detailAnnonce() {
            this.dialog = true
        },
        checkEmetteur() {
            if (this.infos.id_user == this.annonce.annonce_owner) {
                alert("Cette annonce vous appartient!!!");
            } else {
                this.checkMessage();
            }
        },
        checkMessage() {
            this.message.id_emetteur = this.infos.id_user;
            this.message.id_receveur = this.annonce.annonce_owner;
            this.message.sujet = `Annonce n° ${this.annonce.id_annonce}`
            console.log(this.message.id_receveur);
            console.log(this.message);
            if (!this.message.date || !this.message.message) {
                alert("Remplir les champs obligatoires!");
            } else {
                if (confirm("Voulez-vous poster ce message?")) {
                    this.dialog = false;
                    this.sendMessage();
                }
            };
        },
        sendMessage() {
            // console.log(this.message);
            const url = "http://localhost:5000/api/v1/messages";
            axios.post(url, this.message).then(res => {
                console.log(res.data);
                this.dialog = false
                alert("Message envoyé!");
            }).catch(err => {
                console.log(err);
            }); 
        },
    },
    
    mounted() {
        this.$ebus.$on("emitAnnonce", annonce => {
            this.annonce = annonce;
            console.log(this.annonce);
            console.log(this.infos);
        });

    },
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.$ebus.$on("detailAnnonce", this.detailAnnonce)
    }
}
</script>

<style lang="scss" scoped>
    #titredet {
        text-align: center;
        font-family: 'Shrikhand', cursive;
        font-size: 25px;
        margin: auto
    }
    #annonce {
        text-align: center;
        font-family: 'Montserrat', sans-serif;
        font-size: 15px;
        margin-bottom: 30px
    }
    #messsage {
        
    }
</style>
