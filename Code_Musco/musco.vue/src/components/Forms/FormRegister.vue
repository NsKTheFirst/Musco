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
                                <v-text-field label="Nom*" type="text" v-model="user.nom"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Prénom*" type="text" v-model="user.prenom"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Pseudo*" type="text" v-model="user.pseudo"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Email*" type="mail" v-model="user.mail"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Mot de passe*" type="password" v-model="user.mdp"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Confirmer mot de passe*" type="password" v-model="user.confirmMdp"></v-text-field>
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
                    <v-btn color="#01dc0e" flat @click="register">S'inscrire</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import formUtils from "@/utils/forms.js";
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
                localisation: {
                    userlat: null,
                    userlon: null
                }
            },
            options: {
                enableHighAccuracy: true,
            }
        }
    },
    created() {
        this.$ebus.$on("openFormReg", this.openFormReg);
    },
    methods: {
        geoloc() {
            const self = this
            var geoSuccess = function(position) { // Ceci s'exécutera si l'utilisateur accepte la géolocalisation
                var startPos = position;
                self.user.localisation.userlat = startPos.coords.latitude;
                self.user.localisation.userlon = startPos.coords.longitude;
                // console.log("lat: "+self.user.localisation.userlat+" - lon: "+self.user.localisation.userlon);
                console.log(self.user.localisation);
            };
            var geoFail = function() { // Ceci s'exécutera si l'utilisateur refuse la géolocalisation
                console.log("refus");
            };
            navigator.geolocation.getCurrentPosition(geoSuccess, geoFail, self.options);
            console.log(self.user.localisation);
            return self.user.localisation
        },
        
        openFormReg() {
            this.dialog = true;
        },

        checkRegister() {
            return true;
            this.logs = [];
            const fd = new FormData(this.$refs.form);

            const isFormValueOk = function isFormValueOk() {
                let errors = 0;
                for (let arr of fd) {
                    if (!arr[1]) errors += 1;
                }
                const res = errors === 0;

                if (!res) {
                    this.logs.push("please fill all the fields");
                }
                return res;
            }.bind(this);

            const isPassMatch = function isPassMatch() {
            const res = this.user.mdp === this.user.confirmMdp;
            if (!res) {
                this.logs.push("the confirm-password doesn't match password");
            }
            return res;
            }.bind(this);

      // const isPassLengthValid = function isPassLengthValid() {
      //   const res = this.user.mdp.length >= this.passwordMinLength;
      //   if (!res) {
      //     this.logs.push(
      //       `the password is too short (${this.passwordMinLength} chars min)`
      //     );
      //   }
      //   return res;
      // }.bind(this);

            const isPassSequenceOk = function isPassSequenceOk() {
                return true;
            };

            const runTestsSuite = function runTestsSuite(acc, fn) {
                acc += fn() === false ? 1 : 0;
                return acc;
            };

      // const tests = [isPassSequenceOk];
            const tests = [
                isFormValueOk,
                isPassMatch,
                isPassLengthValid,
                isPassSequenceOk
            ];

            this.logs.errorCount = tests.reduce(runTestsSuite, 0);

            this.logLevel = !this.logs.errorCount ? null : "warning";
            const data = !this.logs.errorCount
            ? formUtils.convertFormDataToObject(fd)
            : null;

            return {
                errors: this.logs.errorCount !== 0,
                data
            };
        },
        register() {
            const check = this.checkRegister();
            const loc = this.geoloc();

            // if (!check.errors) {
            if (check && loc) {
            // console.log(check.data);
                this.$store
                // .dispatch("user/register", check.data)
                .dispatch("user/register", this.user)
                .then(res => {
                    console.log("res@ajax-register", res);
                    this.logLevel = "success";
                    this.logs = ["all good"];
                    this.$router.push({ path: `/dashboard/me` });
                    this.dialog = false;
                })
                .catch(err => {
                 console.error("error@ajax-register", err);
                    this.logLevel = "error";
                    this.logs = [err];
                });
          
            }
        }
    }
}
</script>
