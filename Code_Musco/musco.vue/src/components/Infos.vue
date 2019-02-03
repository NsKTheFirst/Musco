<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title
                    class="headline"
                    primary-title
                >
                    <span id="titre">Qu'est ce que    </span>    <span class="mus">    MUS</span><span class="co">CO</span>
                </v-card-title>

                <v-card-text id="descriptif">
                    <span class="mus">MUS</span><span class="co">CO</span> est une plateforme de musique collaborative. Elle permet aux divers acteurs de la production musicale (musiciens, chanteurs, beatmakers, vidéastes, etc …), de poster des annonces afin de concrétiser et faire aboutir leurs projets musicaux.
                </v-card-text>

                 <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="#8833f8"
                        flat
                        @click="dialog = false"
                    >
                        <span id='fermer'>Fermer</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            dialog: false
        }
    },
    methods: {
        openInfo() {
            this.dialog = true
        }
    },

    created() {
        this.$ebus.$on("openInfo", this.openInfo)
    },
}
</script>

<style lang="scss" scoped>
    #descriptif{
        font-family: 'Montserrat', 'sans-serif';
        font-size: 20px
    }

    .headline {
        text-align: center
    }
    
    .mus {
            color: #8833f8;
            font-family: 'Shrikhand', cursive
    }

    .co {
        color: #01dc0e;
        font-family: 'Shrikhand', cursive
    }

    #titre {
        text-align: center;
        font-family: 'Shrikhand', cursive
    }
</style>
