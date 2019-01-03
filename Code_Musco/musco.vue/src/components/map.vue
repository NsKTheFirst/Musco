<template>
    <figure id="carte">
        <div id="map"></div>
    </figure>
</template>

<script>
export default {
    data() {
        return {
            map: null,
            userlat: null,
            userlon: null,
            // macarte: {}
        }
    },
    methods: {
        initMap() {
                    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
                    
                    var macarte = L.map('map').setView([this.userlat, this.userlon], 12);
                    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
                    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                        // Il est toujours bien de laisser le lien vers la source des données
                        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                        minZoom: 1,
                        maxZoom: 20
                    }).addTo(macarte);
                    
                    // Nous ajoutons un marqueur
                    var marker = L.marker([this.userlat, this.userlon]).addTo(macarte);
                },
        
        geoloc() {
            const that = this
            var geoSuccess = function(position) { // Ceci s'exécutera si l'utilisateur accepte la géolocalisation
                var startPos = position;
                that.userlat = startPos.coords.latitude;
                that.userlon = startPos.coords.longitude;
                console.log("lat: "+that.userlat+" - lon: "+that.userlon);
                // Fonction d'initialisation de la carte
                
                that.initMap();
            };
            var geoFail = function() { // Ceci s'exécutera si l'utilisateur refuse la géolocalisation
                console.log("refus");
            };
            navigator.geolocation.getCurrentPosition(geoSuccess,geoFail);
        }
    }
}
</script>
