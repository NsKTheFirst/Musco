<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span id="titreEdit">{{ title }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-textarea outline placeholder="Presentation*" type="text" v-model="user.presentation" v-if="pres"></v-textarea>
                                <v-textarea outline placeholder="Lien embed Soundcloud" type="text" v-model="user.soundcloud" v-if="sound"></v-textarea>
                                <v-textarea outline placeholder="Lien embed Youtube" type="text" v-model="user.youtube" v-if="yout"></v-textarea>
                                <v-textarea outline placeholder="Lien Facebook" type="text" v-model="user.facebook" v-if="face"></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*Champs obligatoires</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#8833f8" flat @click="dialog = false">Annuler</v-btn>
                    <v-btn color="#01dc0e" flat @click="checkEditUser">Valider</v-btn>
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
            user: [],
            dialog: false,
            title: null,
            pres: false,
            sound: false,
            yout: false,
            face: false
        }
    },

    methods: {
        addPres() {
            this.title = "Ajouter présentation";
            this.dialog = true;
            this.pres = true;
            this.sound = false;
            this.yout = false;
            this.face = false;
        },

        editPres() {
            this.title = "Changer présentation";
            this.pres = true;
            this.dialog = true;
            this.sound = false;
            this.yout = false;
            this.face = false;
        },

        addYout() {
            this.title = "Ajouter vidéo Youtube";
            this.yout = true;
            this.dialog = true;
            this.sound = false;
            this.pres = false;
            this.face = false;
        },

        editYout() {
            this.title = "Changer vidéo Youtube";
            this.yout = true;
            this.dialog = true;
            this.sound = false;
            this.pres = false;
            this.face = false;
        },

        addSound() {
            this.title = "Ajouter morecau Soundcloud";
            this.sound = true;
            this.dialog = true;
            this.yout = false;
            this.pres = false;
            this.face = false;
        },

        editSound() {
            this.title = "Changer morceau Soundcloud";
            this.sound = true;
            this.dialog = true;
            this.yout = false;
            this.pres = false;
            this.face = false;
        },

        addFace() {
            this.title = "Ajouter lien Facebook";
            this.face = true;
            this.dialog = true;
            this.yout = false;
            this.pres = false;
            this.sound = false;
        },

        editFace() {
            this.title = "Changer lien Facebook";
            this.face = true;
            this.dialog = true;
            this.yout = false;
            this.pres = false;
            this.sound = false;
        },

        checkEditUser() {
            if (confirm("Validez-vous ces informations?")) {
                this.editUser();
                this.dialog = false;
            }
        },

        editUser() {
            const url = "http://localhost:5000/api/v1/user";
            axios.patch(url, this.user).then(res => {
                // console.log(res);
            }).catch(err => {
                // console.log(err);
            })
        }
    },

    mounted() {
        this.$ebus.$on("user", user => {
            this.user = user;
        });
    },

    created() {
        this.$ebus.$on("addPres", this.addPres);
        this.$ebus.$on("editPres", this.editPres);
        this.$ebus.$on("addYout", this.addYout);
        this.$ebus.$on("editYout", this.editYout);
        this.$ebus.$on("addSound", this.addSound);
        this.$ebus.$on("editSound", this.editSound);
        this.$ebus.$on("addFace", this.addFace);
        this.$ebus.$on("editFace", this.editFace);
    }
}
</script>

<style lang="scss" scoped>
    #titreEdit {
        text-align: center;
        font-family: 'Shrikhand', cursive;
        font-size: 25px;
        margin: auto
    }
</style>
