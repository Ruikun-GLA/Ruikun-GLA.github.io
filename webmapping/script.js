mapboxgl.accessToken =
  "pk.eyJ1IjoiZ291cnVpa3VuIiwiYSI6ImNsY3ExOHN0cDAxZ28zcHBkcmVtOHM2eTAifQ.xJSBbaOJw1ggDn4lzq0SNw";

const style = "mapbox://styles/gouruikun/clee85u9z00er01qm3rtj1ixd";

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: style,
  center: [-2.804601, 51.372808],
  zoom: 10.5
});

  // Select Dropdown button
map.on("load", () => {  
    
const Button = document.getElementById("Button");
const dropdownContent = document.getElementById("content");
const dropdownOptions = document.querySelectorAll(".dropdown-option");
// Button show and remove from the map
Button.addEventListener("mousemove", () => {
dropdownContent.classList.add("show");
});

Button.addEventListener("mouseleave", () => {
dropdownContent.classList.remove("show");
});
dropdownContent.addEventListener("mousemove", () => {
dropdownContent.classList.add("show");
});

dropdownContent.addEventListener("mouseleave", () => {
dropdownContent.classList.remove("show");
});

  //set filter type using switch
filterType = ["!=", ["get", "Type1"], "placeholder"];
  
map.setFilter("uktourism", ["all", filterType]);

dropdownOptions.forEach(option => {
  option.addEventListener("click", () => {
    const type = option.dataset.value;
    switch (type) {
      case "all":
        filter = ["!=", ["get", "Type1"], "placeholder"];
        break;
      case "nature":
        filter = ["==", ["get", "Type1"], "Nature Reserve"];
        break;
      case "food":
        filter = ["==", ["get", "Type1"], "Food and Drink"];
        break;
      case "museum":
        filter = ["==", ["get", "Type1"], "Museum"];
        break;
      case "structure":
        filter = ["==", ["get", "Type1"], "Historic Structure"];
        break;
      case "attraction":
        filter = ["==", ["get", "Type1"], "Attraction"];
        break;
      case "playground":
        filter = ["==", ["get", "Type1"], "Walking"];
        break;
      default:
        console.log("error");
        break;
    }
    Button.innerHTML = option.innerHTML;
    
    map.setFilter("uktourism", ["all", filter]);
  });
});
});

//Create click and moveon Popup 
map.on("load", () => {
  // create click popup
  map.on("click", (event) => {
  
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["uktourism"] 
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  const popup = new mapboxgl.Popup({ offset: [0, -20],                                 className: "my-popup",                   closeButton: false,
})
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3> ${feature.properties.Sitename}</h3>
<p>${feature.properties.Description1} </p>
<a href='${feature.properties.Website1}'>Click to get more information</a>
<h2>Address:</h2><p>${feature.properties.Address_1} ${feature.properties.Address_2} ${feature.properties.Postcode}</p>`
    )
    .addTo(map);
});
  
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "popup"
  });
// create mouse move popup
  map.on('mousemove', (e) => {
    
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["uktourism"]
    });

    if (!features.length) {
      return;
    }
    const feature = features[0];
   map.getCanvas().style.cursor = 'pointer'; 
      popup.setLngLat(feature.geometry.coordinates).setHTML(feature.properties.Sitename).addTo(map);
  });
//When click and mouseleave the icons ,move on popup remove
  map.on('mouseleave', 'uktourism', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
  map.on('click', 'uktourism', () => {
    popup.remove();
  });
});


// Geocoder
map.addControl(new mapboxgl.NavigationControl(), "top-right");
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-right"
);