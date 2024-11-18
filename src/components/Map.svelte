<script>
    import { onMount } from 'svelte';
    import 'ol/ol.css';
    import { Map as OlMap, View } from 'ol';
    import { Tile as TileLayer } from 'ol/layer';
    import { OSM } from 'ol/source';
    import { fromLonLat } from 'ol/proj';
    import { Feature } from 'ol';
    import { Point } from 'ol/geom';
    import { Vector as VectorLayer } from 'ol/layer';
    import { Vector as VectorSource } from 'ol/source';
    import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
    import {Popover, Button, Chart} from 'flowbite-svelte';

    let { filteredPads } = $props();

    let map = $state();
    let vectorSource = $state();
    let vectorLayer = $state();
    let selectedFeature = $state(null);

    function calculateCenter(pads) {
        if (pads.length === 0) return [0, 0];
        
        const total = pads.reduce((acc, pad) => {
            acc.lat += pad.location.latitude;
            acc.lon += pad.location.longitude;
            return acc;
        }, { lat: 0, lon: 0 });

        return [total.lon / pads.length, total.lat / pads.length];
    }

    function getStyle(pad) {
        const color = pad.status === "active" ? '#5268F6' : '#91F652';
        return new Style({
            image: new CircleStyle({
                radius: 8,
                fill: new Fill({ color }),
                stroke: new Stroke({ color: 'white', width: 2 })
            })
        });
    }

    function updateMapFeatures(pads) {
        if (!vectorSource) return;

        vectorSource.clear();

        pads.forEach(pad => {
            const { latitude, longitude } = pad.location;
            const feature = new Feature({
                geometry: new Point(fromLonLat([longitude, latitude])),
                name: pad.full_name,
                status: pad.status,
                full_name: pad.full_name,
                latitude: latitude,
                longitude: longitude
            });

            feature.setStyle(getStyle(pad));
            vectorSource.addFeature(feature);
        });

        if (map && pads.length > 0) {
            const centerCoordinates = calculateCenter(pads);
            map.getView().setCenter(fromLonLat(centerCoordinates));
        }
    }

    $effect(() => {
        updateMapFeatures(filteredPads);
    });

    onMount(() => {
        vectorSource = new VectorSource();
        vectorLayer = new VectorLayer({
            source: vectorSource
        });

        const centerCoordinates = calculateCenter(filteredPads);

        map = new OlMap({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM({
                        attributions: []
                    })
                }),
                vectorLayer
            ],
            view: new View({
                center: fromLonLat(centerCoordinates),
                zoom: 3
            }),
            controls: []
        });

        updateMapFeatures(filteredPads);
    });
</script>

<div>
    <div class="px-4 py-3.5 text-base text-gray-900 font-semibold card-components-header">
        Map View
    </div>
    <div class="map" id="map"></div>
</div>