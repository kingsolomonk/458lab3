mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    zoom: 4, // starting zoom
    center: [-101, 40],
    projection: {
        name: 'albers',
        center: [-101, 40]
    } // starting center
});

map.on('load', () => {
    map.addSource('rates', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.json'
    });

    map.addLayer({
        'id': 'rates-layer',
        'type': 'fill',
        'source': 'rates',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'rates'],
                '#FFEDA0',   // stop_output_0
                5,          // stop_input_0
                '#FED976',   // stop_output_1
                15,          // stop_input_1
                '#FEB24C',   // stop_output_2
                25,          // stop_input_2
                '#FD8D3C',   // stop_output_3
                50,         // stop_input_3
                '#FC4E2A',   // stop_output_4
                75,         // stop_input_4
                '#E31A1C',   // stop_output_5
                90,         // stop_input_5
                '#BD0026',   // stop_output_6
                100,        // stop_input_6
                "#800026"    // stop_output_7
            ],
            'fill-outline-color': '#BBBBBB',
            'fill-opacity': 0.7
        }
    });

    map.on('mousemove', ({point}) => {
        const state = map.queryRenderedFeatures(point, {
            layers: ['rates-layer']
        });
        document.getElementById('text-description').innerHTML = state.length ?
            `<h3>${state[0].properties.county}, ${state[0].properties.state}</h3><p><strong><em>${state[0].properties.rates}</strong> cases per 100,000 (?)</em></p>` :
            `<p>Hover over a county!</p>`;
    });

    const layers = [
        '0-5',
        '6-15',
        '16-25',
        '26-50',
        '51-75',
        '76-90',
        '91-99',
        '>= 100 cases'
    ];
    const colors = [
        '#FFEDA070',
        '#FED97670',
        '#FEB24C70',
        '#FD8D3C70',
        '#FC4E2A70',
        '#E31A1C70',
        '#BD002670',
        '#80002670'
    ];

    // create legend
    const legend = document.getElementById('legend');
    legend.innerHTML = "<b>2020 COVID-19 rates<br>County Level</b>";


    layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement('div');
        const key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        const value = document.createElement('span');
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    });
});