mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 7 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)

map.on('load', function () {
    map.addSource('10m-bathymetry-81bsvj', {
        type: 'vector',
        url: 'mapbox://mapbox.9tm8dx88'
    });

    map.addLayer(
        {
            'id': '10m-bathymetry-81bsvj',
            'type': 'fill',
            'source': '10m-bathymetry-81bsvj',
            'source-layer': '10m-bathymetry-81bsvj',
            'layout': {},
            'paint': {
                'fill-outline-color': 'hsla(337, 82%, 62%, 0)',
                // cubic bezier is a four point curve for smooth and precise styling
                // adjust the points to change the rate and intensity of interpolation
                'fill-color': [
                    'interpolate',
                    ['cubic-bezier', 0, 0.5, 1, 0.5],
                    ['get', 'DEPTH'],
                    200,
                    '#78bced',
                    9000,
                    '#15659f'
                ]
            }
        },
        'land-structure-polygon'
    );
});
