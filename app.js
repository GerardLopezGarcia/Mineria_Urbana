
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
function getColor1(d) {
  return d > 2044 ? '#00441b' :
         d > 999  ? '#006d2c' :
         d > 663  ? '#238b45' :
         d > 412  ? '#41ab5d' :
         d > 245   ? '#74c476' :
         d > 99   ? '#a1d99b' :
         d > 45   ? '#c7e9c0' :
         d > 0 ? '#e5f5e0':
                    'undefined ';
}

//ceramica
function getColor2(d) {
  return d > 32214 ? '#67000d' :
         d > 10642 ? '#a50f15' :
         d > 6999  ? '#cb181d' :
         d > 3955  ? '#ef3b2c' :
         d > 2596  ? '#fb6a4a' :
         d > 1415   ? '#fc9272' :
         d > 651   ? '#fcbba1' :
         d > 231   ? '#fee0d2' :
         d > 0 ? '#fff5f0':
                    'undefined ';
}
//vidre
function getColor3(d) {
  return d > 8134 ? '#49006a' :
         d > 3529 ? '#7a0177' :
         d > 1767  ? '#ae017e' :
         d > 1019  ? '#dd3497' :
         d > 665  ? '#f768a1' :
         d > 367   ? '#fa9fb5' :
         d > 186   ? '#fcc5c0' :
         d > 76   ? '#fde0dd' :
         d > 0 ? '#fff7f3':
                    'undefined ';
}
//poliestire
function getColor4(d) {
  return d > 2236 ? '#014636' :
         d > 766 ? '#016c59' :
         d > 434  ? '#02818a' :
         d > 216  ? '#3690c0' :
         d > 140  ? '#67a9cf' :
         d > 68   ? '#a6bddb' :
         d > 33   ? '#d0d1e6' :
         d > 8   ? '#ece2f0' :
         d > 0 ? '#fff7fb':
                    'undefined ';
}
//pvc
function getColor5(d) {
  return d > 1118 ? '#3f007d' :
         d > 383 ? '#54278f' :
         d > 216  ? '#6a51a3' :
         d > 108  ? '#807dba' :
         d > 70  ? '#9e9ac8' :
         d > 34   ? '#bcbddc' :
         d > 16   ? '#dadaeb' :
         d > 4   ? '#efedf5' :
         d > 0 ? '#fcfbfd':
                    'undefined ';
}
//acer
function getColor6(d) {
  return d > 1956 ? '#023858' :
         d > 825 ? '#045a8d' :
         d > 331  ? '#0570b0' :
         d > 163  ? '#3690c0' :
         d > 111  ? '#74a9cf' :
         d > 68   ? '#a6bddb' :
         d > 31   ? '#d0d1e6' :
         d > 8   ? '#ece7f2' :
         d > 0 ? '#fff7fb':
                    'undefined ';
}
//alumini
function getColor7(d) {
  return d > 193 ? '#67001f' :
         d > 105 ? '#980043' :
         d > 58  ? '#ce1256' :
         d > 25  ? '#e7298a' :
         d > 15  ? '#df65b0' :
         d > 8   ? '#c994c7' :
         d > 4   ? '#d4b9da' :
         d > 1   ? '#e7e1ef' :
         d > 0 ? '#f7f4f9':
                    'undefined ';
}
//coure
function getColor8(d) {
  return d > 8698 ? '#662506' :
         d > 1449 ? '#993404' :
         d > 526  ? '#cc4c02' :
         d > 228  ? '#ec7014' :
         d > 114  ? '#fe9929' :
         d > 59   ? '#fec44f' :
         d > 26   ? '#fee391' :
         d > 8   ? '#fff7bc' :
         d > 0 ? '#ffffe5':
                    'undefined ';
}
////////////


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



function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: function(e){  year.resetStyle(e.target);panel.update();},
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
}, onEachFeature : function (feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: function(e){  infos.resetStyle(e.target);panel.update();},
      click: zoomToFeature
  })
}})

layerControl.addOverlay(infos,"Current_Use")

import{Min_Urb} from "./poum.js";

var POUM = L.geoJSON(Min_Urb , {
  style : function (feature) {
    return {fillColor: feature.properties.fill,weight: 2,opacity: 2,color: feature.properties.fill,dashArray: '3',fillOpacity: 0.5}
  }, onEachFeature : function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: function(e){  POUM.resetStyle();panel.update();},
        click: zoomToFeature
    })
  }
})

layerControl.addOverlay(POUM,"Urban_plan")



import {bigdata} from "./bigdata.js"; // QUANTIFICACIÓ DE MINERALS
//es podria afegir un paragraf <small> amb una frase tipo:
// copper represents 0.03% of the materials used in the construction of a modern building


var formigo =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor1(feature.properties.formigo),
      weight: 2,
      opacity: 1,
      color: getColor1(feature.properties.formigo),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : function (feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: function(e){  formigo.resetStyle(e.target);panel.update();},
      click: zoomToFeature
  })
}})

layerControl.addOverlay(formigo,"Concrete")

var ceramica =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor2(feature.properties.ceramica),
      weight: 2,
      opacity: 1,
      color: getColor2(feature.properties.ceramica),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : function (feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: function(e){  ceramica.resetStyle(e.target);panel.update();},
      click: zoomToFeature
  })
}})

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
},onEachFeature : function (feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: function(e){  vidre.resetStyle(e.target);panel.update();},
      click: zoomToFeature
  })
}})

layerControl.addOverlay(vidre,"Glass")

var poliestire =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor4(feature.properties.poliestire),
      weight: 2,
      opacity: 1,
      color: getColor4(feature.properties.poliestire),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : function (feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: function(e){  poliestire.resetStyle(e.target);panel.update();},
      click: zoomToFeature
  })
}})

layerControl.addOverlay(poliestire,"Polystyrene")

var pvc =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor5(feature.properties.pvc),
      weight: 2,
      opacity: 1,
      color: getColor5(feature.properties.pvc),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : function (feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: function(e){  pvc.resetStyle(e.target);panel.update();},
      click: zoomToFeature
  })
}})

layerControl.addOverlay(pvc,"PVC")

var acer =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor6(feature.properties.acer),
      weight: 2,
      opacity: 1,
      color: getColor6(feature.properties.acer),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : function (feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: function(e){  acer.resetStyle(e.target);panel.update();},
      click: zoomToFeature
  })
}})

layerControl.addOverlay(acer,"Steel")

var alumini =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor7(feature.properties.alumini),
      weight: 2,
      opacity: 1,
      color: getColor7(feature.properties.alumini),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : function (feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: function(e){  alumini.resetStyle(e.target);panel.update();},
      click: zoomToFeature
  })
}})

layerControl.addOverlay(alumini,"Aluminium")

var coure =L.geoJSON(bigdata,{ style: function (feature) {
  return {
      fillColor: getColor8(feature.properties.coure),
      weight: 2,
      opacity: 1,
      color: getColor8(feature.properties.coure),
      dashArray: '3',
      fillOpacity: 0.7
  };
},onEachFeature : function (feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: function(e){  coure.resetStyle(e.target);panel.update();},
      click: zoomToFeature
  })
}})

layerControl.addOverlay(coure,"Copper")


//escollir be les llegendes 




var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

  var div = L.DomUtil.create('div', 'legend');
  var grades = [ 1600, 1700, 1850, 1930, 1960, 1980, 2000];
  

  for (var i = 0; i < grades.length; i++) {

    div.innerHTML +='<i style="background:' + getColor_by_year(grades[i] + 1) + '"></i> ' +
    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');   
  }
  
	return div;
};

var legend_use = L.control({postition : 'bottomrigth'})
legend_use.onAdd = function () {
  
  var div = L.DomUtil.create('div', 'legend');

  var grades = ["Agriculture","Residential","PublicServices","Retail","Office","Industrial"];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="background:' + getColor_by_use(grades[i]) + '"></i> ' +
    grades[i] + '<br>';  
    
  }
  return div
}

var legend_concrete = L.control({position: 'bottomright'})

legend_concrete.onAdd = function () {
  var div = L.DomUtil.create('div', 'legend');

  var grades = [0,45,100,250,420,670,1000,2050];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="background:' + getColor1(grades[i] + 1) + '"></i> ' +
    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');   
  }
  return div
}

var legend_ceramica = L.control({position: 'bottomright'})

legend_ceramica.onAdd = function () {
  var div = L.DomUtil.create('div', 'legend');

  var grades = [0,240,660,1420,2600,4000,7000,10650,32300];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="background:' + getColor2(grades[i] + 1) + '"></i> ' +
    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');   
  }
  return div
}

var l_vidre = L.control({position: 'bottomright'})

l_vidre.onAdd = function () {
  var div = L.DomUtil.create('div', 'legend');

  var grades = [0,240,660,1420,2600,4000,7000,10650,32300];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="background:' + getColor3(grades[i] + 1) + '"></i> ' +
    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');   
  }
  return div
}

var l_poliestire = L.control({position: 'bottomright'})

l_poliestire.onAdd = function () {
  var div = L.DomUtil.create('div', 'legend');

  var grades = [0,7,25,40,70,142,230,443,770];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="background:' + getColor4(grades[i] + 1) + '"></i> ' +
    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');   
  }
  return div
}

var l_pvc = L.control({position: 'bottomright'})

l_pvc.onAdd = function () {
  var div = L.DomUtil.create('div', 'legend');

  var grades = [0,4,12,20,35,71,109,220,500];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="background:' + getColor5(grades[i] + 1) + '"></i> ' +
    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');   
  }
  return div
}

var l_acer = L.control({position: 'bottomright'})

l_acer.onAdd = function () {
  var div = L.DomUtil.create('div', 'legend');

  var grades = [0,32,70,112,170,340,826,1960];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="background:' + getColor6(grades[i] + 1) + '"></i> ' +
    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');   
  }
  return div
}

var l_alumini = L.control({position: 'bottomright'})

l_alumini.onAdd = function () {
  var div = L.DomUtil.create('div', 'legend');

  var grades = [0,1,3,6,11,18,26,60,106,194];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="background:' + getColor7(grades[i] + 1) + '"></i> ' +
    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');   
  }
  return div
}

var l_coure = L.control({position: 'bottomright'})

l_coure.onAdd = function () {
  var div = L.DomUtil.create('div', 'legend');

  var grades = [0,7,21,40,68,115,230,527,1450,8700];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +='<i style="background:' + getColor8(grades[i] + 1) + '"></i> ' +
    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');   
  }
  return div
}


legend.addTo(map);
var currentLegend = legend

map.on('overlayadd',function (eventLayer) {
 if (eventLayer.name === 'Construction_Year'){
   map.removeControl(currentLegend)
   currentLegend = legend
   legend.addTo(map)
 }
 else if (eventLayer.name === 'Current_Use'){
   map.removeControl(currentLegend)
   currentLegend = legend_use
   legend_use.addTo(map)
 }
 else if (eventLayer.name === 'Concrete'){
  map.removeControl(currentLegend)
  currentLegend = legend_concrete
  legend_concrete.addTo(map)
}
else if (eventLayer.name === 'Ceramic'){
  map.removeControl(currentLegend)
  currentLegend = legend_ceramica
  legend_ceramica.addTo(map)
}
else if (eventLayer.name === 'Glass'){
  map.removeControl(currentLegend)
  currentLegend = l_vidre
  l_vidre.addTo(map)
}
else if (eventLayer.name === 'Polystyrene'){
  map.removeControl(currentLegend)
  currentLegend = l_poliestire
  l_poliestire.addTo(map)
}
else if (eventLayer.name === 'PVC'){
  map.removeControl(currentLegend)
  currentLegend = l_pvc
  l_pvc.addTo(map)
}
else if (eventLayer.name === 'Steel'){
  map.removeControl(currentLegend)
  currentLegend = l_acer
  l_acer.addTo(map)
}
else if (eventLayer.name === 'Aluminium'){
  map.removeControl(currentLegend)
  currentLegend = l_alumini
  l_alumini.addTo(map)
}
else if (eventLayer.name === 'Copper'){
  map.removeControl(currentLegend)
  currentLegend = l_coure
  l_coure.addTo(map)
}
  
})


