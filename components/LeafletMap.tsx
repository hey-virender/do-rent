"use client";
import { getCoordinates } from "@/constants";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { houseListings } from "@/constants";

type Props = {
  lat?: number;
  lng?: number;
  address?: string;
  zoom?: true | false;
};

import L from "leaflet";
import Image from "next/image";

export const houseMarkerIcon = (image: string) =>
  L.divIcon({
    html: `
      <div class="
        relative
        w-14 h-14
        rounded-full
        bg-white
    
        shadow-xl
        ring-2 ring-white
        hover:scale-110
        transition-transform
        duration-200
      ">
        <img
          src="${image}"
          class="
            w-full h-full
            object-cover
            rounded-full
          "
        />
      </div>
    `,
    className: "bg-transparent", // disables leaflet defaults
    iconSize: [56, 56],
    iconAnchor: [28, 56],
    popupAnchor: [0, -56],
  });


export function FlyToLocation({
  position:[lat, lng],
  zoom = 17,
}: {
  position: [number, number];
  zoom?: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 1.2 });
  }, [lat, lng, zoom, map]);

  return null;
}




const LeafletMap = ({ lat, lng, address, zoom }: Props) => {
  let latitude = lat;
  let longitude = lng;
 

  useEffect(() => {
    if (!lat || !lng) {
      const fetchCoordinates = async () => {
        const coords = await getCoordinates(
          address || "Shimla, Himachal Pradesh, India",
        );
        if (coords) {
          latitude = coords.lat;
          longitude = coords.lng;
        }
      };
      fetchCoordinates();
    }
  }, [lat, lng]);

  

  const position = [latitude ?? 31.105, longitude ?? 77.164] as [
    number,
    number,
  ];

  return (
    <MapContainer
      className="h-full w-full z-0"
      center={position}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {zoom && latitude && longitude && <FlyToLocation position={[latitude!, longitude!]} />}
      {houseListings.map((house) => (
        <Marker
          key={house.id}
          position={[
            house.location.coordinates.lat,
            house.location.coordinates.lng,
          ]}
          icon={houseMarkerIcon(house.media.cover)}
        >
          <Popup>
            <div className="w-48">
              <Image
                src={house.media.cover}
                alt={house.name}
                width={200}
                height={150}
                className="rounded-md mb-2"
              />
              <h3 className="font-bold ">{house.name}</h3>
              <span>
                {house.location.city}, {house.location.state},{" "}
                {house.location.country}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
