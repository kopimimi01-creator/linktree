
'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
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

function LocationMarker({ position, setPosition }: { position: LatLngExpression, setPosition: (pos: LatLngExpression) => void }) {
  const markerRef = useRef<any>(null);
  
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition],
  );

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
  const [position, setPosition] = useState<LatLngExpression>(SEMARANG_CENTER);
  const [address, setAddress] = useState('Gerakkan penanda untuk memilih lokasi...');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSetPosition = (pos: LatLngExpression) => {
    setPosition(pos);
    if ('lat' in pos && 'lng' in pos) {
      fetchAddress(pos.lat, pos.lng);
    }
  }

  const handleConfirmLocation = () => {
    if (address && !address.includes('...')) {
        onLocationSelect(address);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="relative h-full w-full rounded-md overflow-hidden z-0">
        <MapContainer
          center={SEMARANG_CENTER}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={handleSetPosition} />
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
