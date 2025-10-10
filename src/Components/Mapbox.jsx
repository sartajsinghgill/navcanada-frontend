import Map, { Marker, Popup } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Mapbox.css'
import { useState } from 'react';

export function Mapbox({ loadAirportData }) {

    const [selected, setSelected] = useState(null);
    const MAPBOX_TOKEN = "pk.eyJ1Ijoic2dpbGwyMDI1IiwiYSI6ImNtZ2lnYmFwMTA1azQya3EybW9nd3JxN3YifQ.hShlZw1AIuX3cbd7zJJ4pA";

    const airports = [
        {
            name: "Calgary International Airport",
            city: "Calgary, Alberta",
            iata: "YYC",
            icao: "CYYC",
            coordinates: [-114.0203, 51.1139],
        },
        {
            name: "Edmonton International Airport",
            city: "Edmonton, Alberta",
            iata: "YEG",
            icao: "CYEG",
            coordinates: [-113.5800, 53.3100],
        },
        {
            name: "Halifax Stanfield International Airport",
            city: "Halifax, Nova Scotia",
            iata: "YHZ",
            icao: "CYHZ",
            coordinates: [-63.5086, 44.8808],
        },
        {
            name: "Montréal–Trudeau International Airport",
            city: "Montreal, Quebec",
            iata: "YUL",
            icao: "CYUL",
            coordinates: [-73.7481, 45.4657],
        },
        {
            name: "Ottawa Macdonald–Cartier International Airport",
            city: "Ottawa, Ontario",
            iata: "YOW",
            icao: "CYOW",
            coordinates: [-75.6692, 45.3225],
        },
        {
            name: "Québec City Jean Lesage International Airport",
            city: "Quebec City, Quebec",
            iata: "YQB",
            icao: "CYQB",
            coordinates: [-71.3836, 46.7940],
        },
        {
            name: "Toronto Pearson International Airport",
            city: "Toronto, Ontario",
            iata: "YYZ",
            icao: "CYYZ",
            coordinates: [-79.6335, 43.6771],
        },
        {
            name: "Vancouver International Airport",
            city: "Vancouver, British Columbia",
            iata: "YVR",
            icao: "CYVR",
            coordinates: [-123.1839, 49.1947],
        },
        {
            name: "Victoria International Airport",
            city: "Victoria, British Columbia",
            iata: "YYJ",
            icao: "CYYJ",
            coordinates: [-123.4300, 48.6469],
        },
        {
            name: "Winnipeg James Armstrong Richardson International Airport",
            city: "Winnipeg, Manitoba",
            iata: "YWG",
            icao: "CYWG",
            coordinates: [-97.2399, 49.9090],
        },
        {
            name: "St. John's International Airport",
            city: "St. John's, Newfoundland and Labrador",
            iata: "YYT",
            icao: "CYYT",
            coordinates: [-52.7525, 47.6186],
        },
        {
            name: "Whitehorse International Airport",
            city: "Whitehorse, Yukon",
            iata: "YXY",
            icao: "CYXY",
            coordinates: [-135.0673, 60.7096],
        },
        {
            name: "Iqaluit International Airport",
            city: "Iqaluit, Nunavut",
            iata: "YFB",
            icao: "CYFB",
            coordinates: [-68.5558, 63.7564],
        },
    ];

    return (
        <div className="mapBox">
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{
                    longitude: -96,
                    latitude: 60,
                    zoom: 3.1
                }}
                mapStyle="mapbox://styles/mapbox/light-v11"
            >
                {airports.map((airport) => {
                    return (
                        <Marker
                            key={airport.iata}
                            longitude={airport.coordinates[0]}
                            latitude={airport.coordinates[1]}
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                loadAirportData(airport.icao);
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: selected?.iata === airport.iata ? "#FF3B30" : "#007AFF",
                                    width: "14px",
                                    height: "14px",
                                    borderRadius: "50%",
                                    border: "2px solid black",
                                    cursor: "pointer",
                                }}
                                title={`${airport.name} (${airport.iata})`}
                            />
                        </Marker>
                    );

                })}

                {/* Popup when clicked */}
                {selected && (
                    <Popup
                        longitude={selected.coordinates[0]}
                        latitude={selected.coordinates[1]}
                        anchor="top"
                        onClose={() => setSelected(null)}
                    >
                        <div style={{ fontSize: "14px" }}>
                            <strong>{selected.name}</strong>
                            <p>{selected.iata}</p>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    )
}