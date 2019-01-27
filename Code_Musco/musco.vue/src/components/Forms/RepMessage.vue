<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Répondre au message</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Date*" type="date" v-model="message.date"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Sujet*" type="text" v-model="message.sujet"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Message*" type="text" v-model="message.message"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*Champs obligatoires</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#8833f8" flat @click="dialog = false">Annuler</v-btn>
                    <v-btn color="#01dc0e" flat @click="sendMessage">Envoyer</v-btn>
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
            message: {}
        }
    },
    methods: {
        repMess() {
            this.dialog = true;
        },
        sendMessage() {
            // console.log(this.message);
            const url = "http://localhost:5000/api/v1/messages";
            axios.post(url, this.message).then(res => {
                console.log(res.data);
                alert("Message envoyé!");
            }).catch(err => {
                console.log(err);
            });
            this.dialog = false
        }
    },
    created() {
        this.$ebus.$on("repMess", this.repMess);
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        console.log(this.infos);
    },
    mounted() {
        this.$ebus.$on("emetId", idEm => {
            this.message.id_receveur = idEm;
            this.message.id_emetteur = this.infos.id_user;
            console.log(this.message);
        })
    }
}
</script>
