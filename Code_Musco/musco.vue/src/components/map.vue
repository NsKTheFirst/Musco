<template>
    <figure id="carte" :class="{active: notActive}">
        <div id="map"></div>
    </figure>
</template>

<script>
import L from "leaflet"
export default {
    data() {
        return {
            map: null,
            userlat: null,
            userlon: null,
            annonces: [],
            // annlat: null,
            // annlon: null,
            notActive: true,
            options: {
                enableHighAccuracy: true,
            }
            
        }
    },

    created() {
        this.$ebus.$on("runGeoloc", this.geoloc);
        this.$ebus.$on("annonces", annonces => {
            this.annonces = annonces;
            console.log(this.annonces[0]);
        });
    },

    methods: {
        initMap() {
            var annonces = this.annonces;
            // var self = this;
            // var markerClusters;
            // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
                    
            // var macarte = L.map('map', {scrollWheelZoom: false}).setView([this.userlat, this.userlon], 11);
            var macarte = L.map('map', {scrollWheelZoom: false}).setView([this.userlat, this.userlon], 11);
            // markerClusters = L.markerClusterGroup();
            // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
            L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            // Il est toujours bien de laisser le lien vers la source des données
                attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                minZoom: 1,
                maxZoom: 20
            }).addTo(macarte);
            // Nous parcourons la liste des annonces
            for (var annonce in annonces) {
                console.log(annonce);
                // var marker = L.marker([annonces[annonce].localisation.annLat, annonces[annonce].localisation.annLon]).addTo(macarte);
                // marker.bindPopup("Annonce n°" + annonce.id_annonce);
                // markerClusters.addLayer(marker);
            }
                    
            // Nous ajoutons un marqueur
            var marker = L.marker([this.userlat, this.userlon]).addTo(macarte);
            marker.bindPopup("Vous êtes ici").openPopup();
            // macarte.addLayer(markerClusters);
        },
        
        geoloc() {
            const self = this
            var geoSuccess = function(position) { // Ceci s'exécutera si l'utilisateur accepte la géolocalisation
                var startPos = position;
                self.userlat = startPos.coords.latitude;
                self.userlon = startPos.coords.longitude;
                console.log("lat: "+self.userlat+" - lon: "+self.userlon);
                // Fonction d'initialisation de la carte
                
                self.initMap();
            };
            var geoFail = function() { // Ceci s'exécutera si l'utilisateur refuse la géolocalisation
                console.log("refus");
            };
            navigator.geolocation.getCurrentPosition(geoSuccess, geoFail, this.options);
            this.notActive = false;

        }
    }
}
</script>

<style scoped lang="scss">
    .active {
        display: none
    }
    
    #carte {
            height: 300px;
            width: 100%;
            position: relative;
            // transition: 0,2s;
            // overflow: hidden;
            z-index: 1;


            #map {
                height: 100%;
                width: 100%;
                position: absolute;
                overflow: hidden;
            }
        }
</style>
