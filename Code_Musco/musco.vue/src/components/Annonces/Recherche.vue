<template>
    <div>
        <section>
            <h2>Rechercher</h2>
            <v-container grid-list-xl id:="container">
                <v-layout wrap justify-center>
            <!-- <select  name="categorie" id="cat">
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                <option value="instruments">Instruments</option>
            </select>
            <select name="audioSkills" id="audioSkills" placeholder="Audio skills">
                <option value="mixage">Mixage</option>
                <option value="beat making">Beat making</option>
                <option value="composition">Composition</option>
            </select>
            <select name="videoSkills" id="videoSkills" placeholder="Video skills">
                <option value="realisation">Réalisation</option>
                <option value="post production">Post production</option>

            </select>
            <select name="instruments" id="instruments">
                <option value="cuivres">Cuivres</option>
                <option value="cordes">Cordes</option>
                <option value="vent">Instruments à vent</option>
                <option value="percussion">Percussions</option>
                <option value="autres">Autres</option>
            </select> -->
                    <v-flex xs12 sm6 md2 d-flex>
                     <v-select :items="cat" label="Catégorie" solo menu-props="offset-y" class="field"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2 d-flex>
                     <v-select :items="audioskill" label="Audio skills" solo menu-props="offset-y" class="field"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2 d-flex>
                     <v-select :items="videoskill" label="Video skills" solo menu-props="offset-y" class="field"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2 d-flex>
                     <v-select :items="instruments" label="Instruments" solo menu-props="offset-y" class="field"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2 d-flex>
                        <span @click="runGeoloc">Autour de moi</span>
                    </v-flex>
                </v-layout>
            </v-container>
        
        </section>
        <!-- <figure id="carte">
            <div id="map">
            </div>
        </figure> -->
    </div>
</template>

<script>
// import L from "leaflet"
export default {
    name: "Recherche",
    data() {
        return {
            cat: ['Audio', 'Video', 'Instruments'],
            audioskill: ['Mixage', 'Beat making', 'Composition'],
            videoskill: ['Réalisation', 'Post-produciton'],
            instruments: ['Cuivres', 'Cordes', 'Instruments à vent', 'Percussions', 'Chant', 'Autres'],
            // map: null,
            // userlat: null,
            // userlon: null,
            // macarte: {}
        }
    },
    // computed: {
    //     runGeoloc() {
    //         this.$ebus.$emit("runGeoloc");
    //     }
    // },
    methods: {
        runGeoloc() {
            this.$ebus.$emit("runGeoloc");
        }
        // initMap() {
        //             // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
                    
        //             var macarte = L.map('map').setView([this.userlat, this.userlon], 12);
        //             // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
        //             L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        //                 // Il est toujours bien de laisser le lien vers la source des données
        //                 attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        //                 minZoom: 1,
        //                 maxZoom: 20
        //             }).addTo(macarte);
                    
        //             // Nous ajoutons un marqueur
        //             var marker = L.marker([this.userlat, this.userlon]).addTo(macarte);
        //         },
        
        // geoloc() {
        //     const that = this
        //     var geoSuccess = function(position) { // Ceci s'exécutera si l'utilisateur accepte la géolocalisation
        //         var startPos = position;
        //         that.userlat = startPos.coords.latitude;
        //         that.userlon = startPos.coords.longitude;
        //         console.log("lat: "+that.userlat+" - lon: "+that.userlon);
        //         // Fonction d'initialisation de la carte
                
        //         that.initMap();
        //     };
        //     var geoFail = function() { // Ceci s'exécutera si l'utilisateur refuse la géolocalisation
        //         console.log("refus");
        //     };
        //     navigator.geolocation.getCurrentPosition(geoSuccess,geoFail);
        // }
    },
    // mounted() {
        
    //     this.geoloc()
    // }
}
</script>

<style scoped lang="scss">
    section {
        width: 100%;
        height: auto;
        background: #8833f8;
        padding: 20px 0px;

        h2 {
            font-family: 'Shrikhand', cursive;
            text-align: center;
            color: white;
            font-size: 30px;
        }
        // select{appearance: auto}
        
        // .btn {
        //     color: white;
        //     font-family: 'Montserrat', sans-serif;
        //     font-weight: 700;
            
        // }
        span {
            border: 1px solid #01dc0e;
            padding: 5px;
            text-align: center;
            border-radius: 5px;
            background: #01dc0e;
            color: white;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            transition: 0.1s;
            height: 32px;
            margin-top: 10px;
            user-select: none;
            
            &:hover {
                box-shadow: 4px 4px 8px rgb(66, 66, 66);
                cursor: pointer;
            }
        }

        // #carte {
        //     height: 300px;
        //     width: 100%;
        //     display: block;

        //     #map {
        //         height: 100%;
        //         width: 100%;
        //         display: block
        //     }
        // }
    }
</style>

