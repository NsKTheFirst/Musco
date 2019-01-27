<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Modifier annonce</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-select :items="skills" label="Skill" solo menu-props="offset-y" class="field" v-model="annonce.skill" @change="checkSkill"></v-select> <!--à modifier avec la requete getAns -->
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Annonce*" type="text" v-model="editableAnn.annonce"></v-text-field>
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
                    <v-btn color="#01dc0e" flat @click="sendEditAnnonce">Valider</v-btn>
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
            fullSkills: [],
            skills: [],
            editAns: {}
            // ans: [],

        }
    },
    methods: {
        editAnnonce() {
            this.dialog = true;
            console.log("id annonce" + " " + this.annonceId);
            // console.log(this.annonce);
            // console.log(this.editableAnn);
            
        },

        extractSkills(){
            var self = this
            this.fullSkills.forEach(function(s){
                    // console.log(s.skill);
                    self.skills.push(s.skill);
                });
            console.log(this.skills);
        },

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
        
        sendEditAnnonce() {
            const self = this;
            console.log(this.editableAnn);
            const url = "http://localhost:5000/api/v1/annonces";
            axios.patch(url, this.editableAnn).then(res => {
                console.log(res.data);
                const url2 = "http://localhost:5000/api/v1/annonce_needs_skills";
                axios.patch(url2, self.editAns).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
            });
            this.$ebus.$emit("editValidate");
            this.dialog = false;
        },

        checkSkill() {
            console.log("checkSkill" + " " + this.annonce.skill);
            console.log(this.skills.indexOf(this.annonce.skill));
            console.log(this.fullSkills);
            var isn = this.skills.indexOf(this.annonce.skill);
            isn += 1;
            this.annonce.id_skills_needed = isn;
            console.log(this.annonce.id_skills_needed); 
            this.editAns.id_skills_needed = this.annonce.id_skills_needed;
            this.editAns.id_annonce_skill = this.annonce.id_annonce;  
        }
    },
    mounted() {
        this.$ebus.$on("id", id => {
            this.annonceId = id;
            console.log(this.annonceId);
        });
        this.$ebus.$on("annonce", annonce => {
            this.annonce = annonce;
            this.editableAnn.id_annonce = this.annonce.id_annonce;
            this.editableAnn.annonce = this.annonce.annonce;
            this.editableAnn.date = this.annonce.date;
            this.editableAnn.id_annonce_owner = this.annonce.annonce_owner;
            console.log(this.annonce);
            console.log(this.editableAnn);
        });
    },

    created() {
        this.$ebus.$on("editAnnonce", this.editAnnonce);
        this.getSkills();
        // console.log(this.fullSkills);
        // this.fullSkills.forEach(function(s){
        //     // console.log(s);
        //     this.skills.push(s);
        // });
        // console.log(this.skills);
        
        
    }
}
</script>

<style lang="scss" scoped>

</style>
