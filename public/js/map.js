

 mapboxgl.accessToken = Map_Token;

   const map = new mapboxgl.Map({
       container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11',
       center:[ 77.1025 , 28.7041], // starting position [lng, lat]
       zoom: 9 // starting zoom
   });

   console.log(coordinate);
   
 

   const marker = new mapboxgl.Marker({color:"red"})
   .setLngLat(coordinate)
   .setPopup(new mapboxgl.Popup({offset: 25}).setHTML("<h1>Address: 5129, Main Bazar, Main Bazar Rd, Bharat Nagar, Paharganj, New Delhi, Delhi 110055</h1>").setMaxWidth("400px"))
   
   .addTo(map);
