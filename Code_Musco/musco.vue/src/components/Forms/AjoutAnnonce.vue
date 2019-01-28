<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span id="titreaj">Ajouter une annonce</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-select :items="skills" label="Skill*" solo menu-props="offset-y" class="field" v-model="ans.id_skills_needed" @change="checkSkill"></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Annonce*" type="text" v-model="annonce.annonce"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Date*" type="date" v-model="annonce.date"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*Champs obligatoires</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#8833f8" flat @click="dialog = false">Annuler</v-btn>
                    <v-btn color="#01dc0e" flat @click="checkAnnonce">Ajouter</v-btn>
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
            fullSkills: [],
            skills: [],
            annonce: {},
            ans: {},
            // newAnnonce: []
        }
    },

    methods: {
        getSkills() {
            const url = "http://localhost:5000/api/v1/skills";
            axios.get(url).then(res => {
                console.log(res.data);
                this.fullSkills = res.data;
                console.log(this.fullSkills);
                this.extractSkills()
            }).catch(err => {
                console.log(err);
            });
        },
        extractSkills() {
            var self = this
            this.fullSkills.forEach(function(s){
                    // console.log(s.skill);
                    self.skills.push(s.skill);
                });
            console.log(this.skills);
        },
        checkSkill() {
            var isn = this.skills.indexOf(this.ans.id_skills_needed);
            isn += 1;
            this.ans.id_skills_needed = isn;
            console.log(this.ans.id_skills_needed); 
            console.log(this.ans); 
        },
        checkAnnonce() {
            if (!this.annonce.date || !this.annonce.annonce || !this.ans.id_skills_needed) {
                alert("Remplir les champs obligatoires!");
            } else {
                if (confirm("Voulez- vous poster cette annonce?")) {
                    this.dialog = false;
                    this.sendAnnonce();
                }
            };
        },
        postAnnonce() {
            this.dialog = true;
        },
        sendAnnonce() {
            console.log(this.annonce);
            console.log(this.ans);
            const url = "http://localhost:5000/api/v1/annonces";
            axios.post(url, this.annonce).then(res => {
                console.log(res.data);
                this.ans.id_annonce_skill = res.data.insertId;
                console.log(this.ans);
                this.sendAns();
                this.dialog = false;
                alert("Annonce postée")
            }).catch(err => {
                console.log(err);
            });
        },
        sendAns() {
            const url = "http://localhost:5000/api/v1/annonce_needs_skills";
            axios.post(url, this.ans).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
        }
    },

    created() {
        this.$ebus.$on("ajoutAnnonce", this.postAnnonce)
        this.getSkills();
    },

    mounted() {
        this.$ebus.$on("annId", annId => {
            this.annonce.id_annonce_owner = annId;
            console.log(this.annonce);
        });
    }
}
</script>

<style lang="scss" scoped>
    #titreaj {
        text-align: center;
        font-family: 'Shrikhand', cursive;
        font-size: 25px;
        margin: auto

    }
</style>
