<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Création de compte</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Nom*" type="text" required v-model="user.nom"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Prénom*" type="text" required v-model="user.prenom"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Pseudo*" type="text" required v-model="user.pseudo"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Email*" type="mail" required v-model="user.mail"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Mot de passe*" type="password" required v-model="user.mdp"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Confirmer mot de passe*" type="password" required v-model="user.confirmMdp"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Soundcloud (lien embed)" v-model="user.soundcloud"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Youtube (lien embed)" v-model="user.youtube"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Facebook" v-model="user.facebook"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*Champs obligatoires</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#8833f8" flat @click="dialog = false">Annuler</v-btn>
                    <v-btn color="#01dc0e" flat @click="dialog = false">S'inscrire</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {    
            dialog: false,
            passwordMinLength: 8,
            user: {
                nom: "Nico",
                prenom: "Nico",
                pseudo: "NsK",
                mail: "nico@owlab.io",
                mdp: "123Soleil",
                confirmMdp: "123Soleil",
                soundcloud: "soundcloudNico",
                youtube: "youtubeNico",
                facebook: "facebookNico",
            }
        }
    },
    created() {
        this.$ebus.$on("openFormReg", this.openFormReg);
    },
    methods: {
        openFormReg() {
            this.dialog = true;
        }
    }
}
</script>
