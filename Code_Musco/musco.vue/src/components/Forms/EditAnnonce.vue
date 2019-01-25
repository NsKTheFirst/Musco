<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Se connecter</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Annonce" type="text" required v-model="annonce.annonce"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Password*" type="password" required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*Champs obligatoires</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#8833f8" flat @click="dialog = false">Annuler</v-btn>
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
            annonceId: null,
            annonce: []
        }
    },
    methods: {
        editAnnonce() {
            this.dialog = true;
            console.log(this.annonceId);
            console.log(this.annonce);
        }
    },
    mounted() {
        this.$ebus.$on("id", id => {
            this.annonceId = id
        });
        this.$ebus.$on("annonce", annonce => {
            this.annonce = annonce
        });
    },
    // computed() {
    //     this.$ebus.$on(id);
    //     console.log(id);
    // },

    created() {
        // this.$ebus.$on(id);
        // console.log(id);
        this.$ebus.$on("editAnnonce", this.editAnnonce);
        
    }
}
</script>

<style lang="scss" scoped>

</style>
