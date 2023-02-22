// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoiMjc2MDkzM3oiLCJhIjoiY2xjcWFpeHUwMDB1eDNvcDBueGlzZmdtNCJ9.rrux8Oe7m-dpg8lESD67xw";

const style = "mapbox://styles/2760933z/cldkctj4h001q01ml1m2x2g5v";

const map = new mapboxgl.Map({
  container: "map", // container element id
  style: style,
  center: [-74, 40.715],
  zoom: 14
});

map.on("load", () => {
  //Radio button interaction code goes below
  filterType = ["!=", ["get", "level"], "placeholder"];
  map.setFilter("all-map", ["all", filterType]);
  document.getElementById("filters").addEventListener("change", (event) => {
    const type = event.target.value;
    // update the map filter
    if (type == "all") {
      filterType = ["!=", ["get", "level"], "placeholder"];
    } else if (type == "One Star") {
      filterType = ["==", ["get", "level"], "one star"];
    } else if (type == "Two Star") {
      filterType = ["==", ["get", "level"], "two star"];
    } else if (type == "Three Star") {
      filterType = ["==", ["get", "level"], "three star"];
    } else {
      console.log("error");
    }
    map.setFilter("all-map", ["all", filterType]);
  });
});

map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["all-map"]
  });
  document.getElementById("pd").innerHTML = dzone.length
    ? `<h><p>resturant name:${dzone[0].properties.name}</p></h>
    
    <h><p>prize level:${dzone[0].properties.price}</p></h>
    
<p>website: 
${dzone[0].properties.url}</p>`
    : `<p>Hover over a data zone!</p>`;
});

map.addControl(new mapboxgl.NavigationControl(), "bottom-left");

const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in New York City", // Placeholder text for the search bar
  proximity: {
    longitude: -74,
    latitude: 40.715
  } // Coordinates of New York City
});

map.addControl(geocoder, "top-right");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "bottom-left"
);