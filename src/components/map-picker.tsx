
'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { LatLngExpression, LatLng, Icon, Map } from 'leaflet';
import { Button } from './ui/button';

// Fix for default icon issues with Leaflet and Webpack
const defaultIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


type MapPickerProps = {
  onLocationSelect: (address: string) => void;
};

const SEMARANG_CENTER: LatLngExpression = [-7.0051, 110.4381]; // Centered on Semarang

function LocationMarker({ onPositionChange }: { onPositionChange: (pos: LatLng) => void }) {
  const markerRef = useRef<any>(null);
  const map = useMap();
  
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onPositionChange(marker.getLatLng());
        }
      },
    }),
    [onPositionChange],
  );

  const [position, setPosition] = useState(map.getCenter());

  useEffect(() => {
    const newMarker = (e: any) => {
      setPosition(e.target.getLatLng());
    };
    map.on('move', newMarker);
    return () => {
      map.off('move', newMarker);
    };
  }, [map]);


  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={defaultIcon}
    >
    </Marker>
  );
}


export default function MapPicker({ onLocationSelect }: MapPickerProps) {
  const [position, setPosition] = useState<LatLng>(new LatLng(SEMARANG_CENTER[0], SEMARANG_CENTER[1]));
  const [address, setAddress] = useState('Gerakkan penanda untuk memilih lokasi...');
  const [isLoading, setIsLoading] = useState(false);
  const [map, setMap] = useState<Map | null>(null);

  const fetchAddress = useCallback(async (lat: number, lng: number) => {
    setIsLoading(true);
    setAddress('Mencari alamat...');
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('Alamat tidak ditemukan. Coba lagi.');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Gagal mengambil alamat.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePositionChange = useCallback((pos: LatLng) => {
    setPosition(pos);
    fetchAddress(pos.lat, pos.lng);
  }, [fetchAddress]);

  const handleConfirmLocation = () => {
    if (address && !address.includes('...')) {
        onLocationSelect(address);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="relative h-full w-full rounded-md overflow-hidden z-0">
        <MapContainer
          key={Date.now()}
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onPositionChange={handlePositionChange} />
        </MapContainer>
      </div>
      <div className="p-4 bg-background border-t">
        <p className="text-sm font-semibold mb-2">Alamat Terpilih:</p>
        <p className="text-xs text-muted-foreground min-h-[40px]">{address}</p>
        <Button 
          onClick={handleConfirmLocation} 
          className="w-full mt-4"
          disabled={isLoading || address.includes('...') || address.includes('Gagal')}
        >
          {isLoading ? 'Memuat...' : 'Konfirmasi Lokasi Ini'}
        </Button>
      </div>
    </div>
  );
}
