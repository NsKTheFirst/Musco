<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span id="titreEdit">Modifier annonce</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-textarea outline placeholder="Annonce*" type="text" v-model="editableAnn.annonce"></v-textarea>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Date*" type="date" v-model="editableAnn.date"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*Champs obligatoires</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#8833f8" flat @click="dialog = false">Annuler</v-btn>
                    <v-btn color="#01dc0e" flat @click="checkAnnonce">Valider</v-btn>
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
            editableAnn: {},
            annonce:[],
        }
    },
    methods: {
        editAnnonce() {
            this.dialog = true;
            console.log("id annonce" + " " + this.annonceId);
            // console.log(this.annonce);
            // console.log(this.editableAnn);
            
        },

        checkAnnonce() {
            if (!this.editableAnn.date || !this.editableAnn.annonce) {
                alert("Remplir les champs obligatoires!");
            } else {

                if (confirm("Voulez- vous poster cette annonce?")) {
                    this.dialog = false;
                    this.sendEditAnnonce();
                }
            };
        },
        
        sendEditAnnonce() {
            // console.log(this.editableAnn);
            const url = "http://localhost:5000/api/v1/annonces";
            axios.patch(url, this.editableAnn).then(res => {
                // console.log(res.data);
                this.$ebus.$emit("editValidate");
            }).catch(err => {
                // console.log(err);
            });
        },
    },

    mounted() {
        this.$ebus.$on("id", id => {
            this.annonceId = id;
            // console.log(this.annonceId);
        });
        this.$ebus.$on("annonce", annonce => {
            this.annonce = annonce;
            this.editableAnn.id_annonce = this.annonce.id_annonce;
            this.editableAnn.annonce = this.annonce.annonce;
            this.editableAnn.date = this.annonce.date;
            this.editableAnn.id_annonce_owner = this.annonce.annonce_owner;
            // console.log(this.annonce);
            // console.log(this.editableAnn);
        });
    },

    created() {
        this.$ebus.$on("editAnnonce", this.editAnnonce);     
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
