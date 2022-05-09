
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



import {info} from "./data.js"; 
var year = L.geoJSON(info, { style: 
  function style2(feature) {
  return {
      fillColor: getColor_by_year(feature.properties.beginning),
      weight: 2,
      opacity: 1,
      color: getColor_by_year(feature.properties.beginning),
      dashArray: '3',
      fillOpacity: 0.7
  };
}, onEachFeature : onEachFeature})



// MAIN MAP ----------

var map = L.map('map', {layers : [dark, year]}).// agafa map del html
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

// control that shows state info on hover
var panel = L.control({position:'topright', width : "800px" });

panel.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};


//FALTA AFEGIR LINK DEL CADASTRE
// anar afegint else ifs per mostrar la info adalt de cada capa

panel.update = function (props) {
  if (map.hasLayer(year)) {
    this._div.innerHTML = 
    '<h2>Urban Mining Map</h2>' + '<div class="underline"></div>' +  (props ?  '<h3>Year: ' + props.beginning  + '</h3>' + '<p> area = ' + props.value + ' m<sup>2</sup> <br><br> end year = ' + props.end + '<br><br> status = ' + props.conditionOfConstruction +  '<br><br> nº of units = ' + props.numberOfBuildingUnits + '<br><br> cadastral reference = ' + props.reference + '</p>'  : '<h4>Hover over a feature</h4>');
  }
  else if (map.hasLayer(infos)){
    this._div.innerHTML = 
    '<h2>Urban Mining Map</h2>' + '<div class="underline"></div>' +  (props ?  '<h3>Current Use: ' + props.currentUse  + '</h3>' + '<p> area = ' + props.value + ' m<sup>2</sup> <br><br> end year = ' + props.end + '<br><br> status = ' + props.conditionOfConstruction +  '<br><br> nº of units = ' + props.numberOfBuildingUnits + '<br><br> cadastral reference = ' + props.reference + '</p>'  : '<h4>Hover over a feature</h4>');
  }
  else if (map.hasLayer(POUM)){
    this._div.innerHTML = 
    '<h2>Urban Mining Map</h2>' + '<div class="underline"></div>' +  (props ?  '<h3>Urban plan : ' + props.clau_urbanistica  + '</h3>' + '<p> area = ' + props.Area + ' m<sup>2</sup> <br><br> end Id = ' + props.Id + '</p>' : '<h4>Hover over a feature</h4>');
  }
  else if (map.hasLayer(formigo)){
    this._div.innerHTML = 
    '<h2>Urban Mining Map</h2>' + '<div class="underline"></div>' +  (props ?  '<h3>Concrete_quantity : ' + props.formigo.toFixed(2)  + ' m<sup>3</sup></h3>' + '<p> area = ' + props.value + ' m<sup>2</sup> <br><br> end year = ' + props.data_edifc +  '<br><br> nº of units = ' + props.numberOfBu + '<br><br> current_use = ' + props.currentUse + '</p>  <small> Concrete represents 0.5% of the materials used in the construction of a modern building</small>'  : '<h4>Hover over a feature</h4>');
  }
  else if (map.hasLayer(ceramica)){
    this._div.innerHTML = 
    '<h2>Urban Mining Map</h2>' + '<div class="underline"></div>' +  (props ?  '<h3>Ceramic_quantity : ' + props.ceramica.toFixed(2)  + ' m<sup>3</sup></h3>' + '<p> area = ' + props.value + ' m<sup>2</sup> <br><br> end year = ' + props.data_edifc +  '<br><br> nº of units = ' + props.numberOfBu +  '<br><br> current_use = ' + props.currentUse + '</p>  <small> Ceramic material represents 0.5% of the materials used in the construction of historic buildings</small>'  : '<h4>Hover over a feature</h4>');
  }
  else if (map.hasLayer(vidre)){
    this._div.innerHTML = 
    '<h2>Urban Mining Map</h2>' + '<div class="underline"></div>' +  (props ?  '<h3>Glass_quantity : ' + props.vidre.toFixed(2)  + ' m<sup>3</sup></h3>' + '<p> area = ' + props.value + ' m<sup>2</sup> <br><br> end year = ' + props.data_edifc +  '<br><br> nº of units = ' + props.numberOfBu +  '<br><br> current_use = ' + props.currentUse + '</p>  <small> Glass represents 1/8 of the materials used in construction </small>'  : '<h4>Hover over a feature</h4>');
  }
  else if (map.hasLayer(poliestire)){
    this._div.innerHTML = 
    '<h2>Urban Mining Map</h2>' + '<div class="underline"></div>' +  (props ?  '<h3>Polystyrene_quantity : ' + props.poliestire.toFixed(2)  + ' m<sup>3</sup></h3>' + '<p> area = ' + props.value + ' m<sup>2</sup> <br><br> end year = ' + props.data_edifc +  '<br><br> nº of units = ' + props.numberOfBu +  '<br><br> current_use = ' + props.currentUse + '</p>  <small> Polystyrene represents 8% of the materials used in the construction of a modern building</small>'  : '<h4>Hover over a feature</h4>');
  }
  else if (map.hasLayer(pvc)){
    this._div.innerHTML = 
    '<h2>Urban Mining Map</h2>' + '<div class="underline"></div>' +  (props ?  '<h3>PVC_quantity : ' + props.pvc.toFixed(2)  + ' m<sup>3</sup></h3>' + '<p> area = ' + props.value + ' m<sup>2</sup> <br><br> end year = ' + props.data_edifc +  '<br><br> nº of units = ' + props.numberOfBu +  '<br><br> current_use = ' + props.currentUse + '</p>  <small> PVC represents 4% of the materials used in the construction of a modern building</small>'  : '<h4>Hover over a feature</h4>');
  }
  else if (map.hasLayer(acer)){
    this._div.innerHTML = 
    '<h2>Urban Mining Map</h2>' + '<div class="underline"></div>' +  (props ?  '<h3>Steel_quantity : ' + props.acer.toFixed(2)  + ' m<sup>3</sup></h3>' + '<p> area = ' + props.value + ' m<sup>2</sup> <br><br> end year = ' + props.data_edifc +  '<br><br> nº of units = ' + props.numberOfBu +  '<br><br> current_use = ' + props.currentUse + '</p>  <small> Steel represents 7% of the materials used in the construction of a modern building</small>'  : '<h4>Hover over a feature</h4>');
  }
  else if (map.hasLayer(alumini)){
    this._div.innerHTML = 
    '<h2>Urban Mining Map</h2>' + '<div class="underline"></div>' +  (props ?  '<h3>Aluminium_quantity : ' + props.alumini.toFixed(2)  + ' m<sup>3</sup></h3>' + '<p> area = ' + props.value + ' m<sup>2</sup> <br><br> end year = ' + props.data_edifc +  '<br><br> nº of units = ' + props.numberOfBu +  '<br><br> current_use = ' + props.currentUse + '</p>  <small> Aluminium represents 0.03% of the materials used in the construction of a modern building</small>'  : '<h4>Hover over a feature</h4>');
  }
  else if (map.hasLayer(coure)){
    this._div.innerHTML = 
    '<h2>Urban Mining Map</h2>' + '<div class="underline"></div>' +  (props ?  '<h3>Copper_quantity : ' + props.coure.toFixed(2)  + ' m<sup>3</sup></h3>' + '<p> area = ' + props.value + ' m<sup>2</sup> <br><br> end year = ' + props.data_edifc +  '<br><br> nº of units = ' + props.numberOfBu +  '<br><br> current_use = ' + props.currentUse + '</p>  <small> Copper represents 0.5% of the materials used in the construction of a modern building</small>'  : '<h4>Hover over a feature</h4>');
  }
};

panel.addTo(map);

//ADDING LAYERS---------

var baseMaps = {
  "Base" : dark,
  "Light_mode" : light,
  "Satellite" : Satelit
  
};
var overlayMaps = {
  "Construction_Year" : year,
  
};


var layerControl = L.control.layers(baseMaps,overlayMaps, {position : "topleft",}).addTo(map); //potser es pot probar a veure si es pot controlar tb el minral q sescull

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

//mapa per USOS
function getColor_by_use(d) {
  return d == "Agriculture" ? '#440154' :
         d == "Residential" ? '#218F8D' :
         d == "PublicServices" ? '#FDE725':
         d == "Retail" ? '#8ED645' :
         d == "Office" ? '#31668E' :
         d == "Industrial"  ? '#453781' :
                    '#34B679';
}

// mapa per Anys
function getColor_by_year(d) {
  var f = parseInt(d)
  return f >= 2000 ? '#440154' :
         f >= 1979 ? '#453781' :
         f >= 1959 ? '#31668E':
         f >= 1929 ? '#20A386' :
         f >= 1850 ? '#FDE725' :
         f >= 1700 ? '#C8E020' :
         f >= 1600 ? '#8ED645' :
                    '#8ED645';
}

//mapa per formigo
function getColor3(d) {
  return d > 8000 ? '#fff7f3' :
         d > 2000  ? '#fde0dd' :
         d > 500  ? '#fcc5c0' :
         d > 200  ? '#fa9fb5' :
         d > 90   ? '##f768a1' :
         d > 50   ? '#dd3497' :
         d > 30   ? '#ae017e' :
         d > 0 ? '##f768a1':
                    'null ';
}

//////////////


function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 3,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  panel.update(layer.feature.properties);
}

function resetHighlight(e) { 
  
  year.resetStyle(e.target);
  panel.update();
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  })
}

var infos = L.geoJSON(info, { style: 
  function style2(feature) {
  return {
      fillColor: getColor_by_use(feature.properties.currentUse),
      weight: 2,
      opacity: 1,
      color: getColor_by_use(feature.properties.currentUse),
      dashArray: '3',
      fillOpacity: 0.7
  };
}, onEachFeature : onEachFeature})

layerControl.addOverlay(infos,"Current_Use")

import{Min_Urb} from "./poum.js";

var POUM = L.geoJSON(Min_Urb , {
  style : function (feature) {
    return {fillColor: feature.properties.fill,weight: 2,opacity: 2,color: feature.properties.fill,dashArray: '3',fillOpacity: 0.5}
  }, onEachFeature : onEachFeature
}).bindPopup(function (layer) {
  return `this is a ${layer.feature.geometry.type} with coordinates ${layer.feature.geometry.coordinates[0][0]}  Urbanistic key = ${layer.feature.properties.clau_urbanistica}`
});

layerControl.addOverlay(POUM,"Urban_plan")



import {bigdata} from "./bigdata.js"; // QUANTIFICACIÓ DE MINERALS
//es podria afegir un paragraf <small> amb una frase tipo:
// copper represents 0.03% of the materials used in the construction of a modern building


var formigo =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor3(feature.properties.formigo),
      weight: 2,
      opacity: 1,
      color: getColor3(feature.properties.formigo),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : onEachFeature})

layerControl.addOverlay(formigo,"Concrete")

var ceramica =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor3(feature.properties.ceramica),
      weight: 2,
      opacity: 1,
      color: getColor3(feature.properties.ceramica),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : onEachFeature})

layerControl.addOverlay(ceramica,"Ceramic")

var vidre =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor3(feature.properties.vidre),
      weight: 2,
      opacity: 1,
      color: getColor3(feature.properties.vidre),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : onEachFeature})

layerControl.addOverlay(vidre,"Glass")

var poliestire =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor3(feature.properties.poliestire),
      weight: 2,
      opacity: 1,
      color: getColor3(feature.properties.poliestire),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : onEachFeature})

layerControl.addOverlay(poliestire,"Polystyrene")

var pvc =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor3(feature.properties.pvc),
      weight: 2,
      opacity: 1,
      color: getColor3(feature.properties.pvc),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : onEachFeature})

layerControl.addOverlay(pvc,"PVC")

var acer =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor3(feature.properties.acer),
      weight: 2,
      opacity: 1,
      color: getColor3(feature.properties.acer),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : onEachFeature})

layerControl.addOverlay(acer,"Steel")

var alumini =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor3(feature.properties.alumini),
      weight: 2,
      opacity: 1,
      color: getColor3(feature.properties.alumini),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : onEachFeature})

layerControl.addOverlay(alumini,"Aluminium")

var coure =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor3(feature.properties.coure),
      weight: 2,
      opacity: 1,
      color: getColor3(feature.properties.coure),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : onEachFeature})

layerControl.addOverlay(coure,"Copper")


//escollir be les llegendes 






var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

  var div = L.DomUtil.create('div', 'legend-colors');
  var grades = [ 1600, 1700, 1850, 1930, 1960, 1980, 2000];
  var labels = [];


  for (var i = 0; i < grades.length + 1; i++) {

    labels.push(
       '<i style = "background : ' + getColor_by_year(grades[i]) +' "></i>' +  '<div> ' + getColor_by_year(grades[i]) + '</div> ' + grades[i] );
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(map);