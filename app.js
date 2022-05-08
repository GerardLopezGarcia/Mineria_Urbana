
// estil icono de marcador ----------------

var myIcon = L.icon({
  iconUrl: 'icons\\pin.png',
  iconSize: [40],
  popupAnchor: [0, -30],
});

//LAYERS-------------

//fosc
// let url = https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png

//BLANC CHULO 
//let url =  https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw

//mapa 
// let base = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';

let dark = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; Gerard López García',
  subdomains: 'abcd',
  maxZoom: 19,
  minZoom:13.5, //14  
}),light = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png', {
attribution: '&copy; Gerard López García',
subdomains: 'abcd',
maxZoom: 19,
minZoom:13, //14  
}),
Satelit = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: '&copy; Gerard López García',
subdomains: 'abcd',
maxZoom: 19,
minZoom:13, //14  
});

import{Min_Urb} from "./poum.js";

var POUM = L.geoJSON(Min_Urb , {
  style : function (feature) {
    return {fillColor: feature.properties.fill,weight: 2,opacity: 2,color: feature.properties.fill,dashArray: '3',fillOpacity: 0.5}
  }
}).bindPopup(function (layer) {
  return `this is a ${layer.feature.geometry.type} with coordinates ${layer.feature.geometry.coordinates[0][0]}  Urbanistic key = ${layer.feature.properties.clau_urbanistica}`
});



var littleton = L.marker([39.74, -104.99]).bindPopup('This is Littleton, CO.'); //ES POT TREURE

var cities = L.layerGroup([littleton,POUM]);


import {info} from "./data.js"; 
var infos = L.geoJSON(info, { style: style2, onEachFeature : onEachFeature})

// MAIN MAP ----------

var map = L.map('map', {layers : [dark, infos]}).// agafa map del html
setView([41.7252, 1.82335],15); //coordenadas i nivel de zoom 15
map.attributionControl.setPrefix("Urban Mining _ UPC")
var southWest = L.latLng(41.66047813362042, 1.7257342769712882), // Limits del mapa
northEast = L.latLng(41.78628818693613, 1.9934098593450535);
var bounds = L.latLngBounds(southWest,northEast);


map.setMaxBounds(bounds);    // fixa el mapa
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});
L.control.scale({ metric: true, imperial : false }).addTo(map); //apareix escala a sota el mapa

// L.marker([41.7252, 1.82335],{draggable: true, icon:myIcon}).addTo(map).bindPopup('Info ').openPopup(); // aquest es pot obrir quan el toques i dona informacio //icono q es pot moure
//------------------------

//ADDING LAYERS---------

var baseMaps = {
  "<span style='color: black'>Grayscale</span>" : light,
  "Dark" : dark,
  "Satelit" : Satelit
  
};
var overlayMaps = {
  "Current_Use" : infos,
  "Cities": cities
};

var layerControl = L.control.layers(baseMaps,overlayMaps).addTo(map); //potser es pot probar a veure si es pot controlar tb el minral q sescull

// layerControl.addOverlay(POUM, "Peçes d'estudi");
// /////////////////////////////////////////////////////////////////////////////////////


//MANIPULACIO DE MAPAS--------------------------------------

// per afegir overlays - es coloquen aqui amb les caracteristiques desitjades i s'afegeixen despres al final de "adding layers"



// per fer mapas amb gradients per tematiques 

// mapa per "capa metalls"

function getColor(d) {
  return d > 140 ? '#800026' :
         d > 120  ? '#BD0026' :
         d > 100  ? '#E31A1C' :
         d > 80  ? '#FC4E2A' :
         d > 60   ? '#FD8D3C' :
         d > 30   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}
function style(feature) {
  return {
      fillColor: getColor(feature.properties.Id),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

//mapa per agricultura o residencial
function getColor2(d) {
  return d == "2_agriculture" ? '#440154' :
         d == "1_residential" ? '#218F8D' :
         d == "4_3_publicServices" ? '#FDE725':
         d == "4_2_retail" ? '#8ED645' :
         d == "4_1_office" ? '#31668E' :
         d == "3_industrial"  ? '#453781' :
                    '#34B679';
}
function style2(feature) {
  return {
      fillColor: getColor2(feature.properties.currentUse),
      weight: 2,
      opacity: 1,
      color: getColor2(feature.properties.currentUse),
      dashArray: '3',
      fillOpacity: 0.7
  };
}

//mapa per formigo
function getColor3(d) {
  return d > 12000 ? '#800026' :
         d > 6000  ? '#BD0026' :
         d > 1000  ? '#E31A1C' :
         d > 800  ? '#FC4E2A' :
         d > 600   ? '#FD8D3C' :
         d > 300   ? '#FEB24C' :
         d > 100   ? '#FED976' :
                    '#FFEDA0';
}
function style3(feature) {
  return {
      fillColor: getColor3(feature.properties.formigo),
      weight: 2,
      opacity: 1,
      color: getColor3(feature.properties.formigo),
      dashArray: '3',
      fillOpacity: 0.7
  };
}
//////////////


function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
      click: zoomToFeature
  })
}



var M_minerals = L.geoJSON(Min_Urb , {
  style : style,
  onEachFeature : onEachFeature }
).bindPopup(function (layer) {
  return `this is a ${layer.feature.geometry.type} with coordinates ${layer.feature.geometry.coordinates[0][0]}`
});

layerControl.addOverlay(M_minerals,"metall")





import {bigdata} from "./bigdata.js"; // per arxius llargs millor aixo 


var formigo =L.geoJSON(bigdata,{ style: style3,onEachFeature : onEachFeature})

layerControl.addOverlay(formigo,"Formigó")


//agefir capes de minerals i escollir be les llegendes 
// programar que es vegi en una cantonada tota la info ben posada
// llegenda de cada tema 