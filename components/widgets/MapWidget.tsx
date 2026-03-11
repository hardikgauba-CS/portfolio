'use client';

import { MapPin, Navigation2, MapPinHouse, Landmark, Footprints } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import Map, { Marker, Layer, Source, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import { useEffect, useMemo, useState, useRef } from 'react';

interface MapWidgetProps {
  isDark: boolean;
}

interface LocationMarker {
  id: string;
  coords: [number, number];
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

export function MapWidget({ isDark }: MapWidgetProps) {
  // Updated coordinates with actual addresses
  const homeCoords = useMemo(() => [-121.8848, 37.3356] as [number, number], []); // 130 E San Fernando St
  const scuCoords = useMemo(() => [-121.9496, 37.3493] as [number, number], []); // Santa Clara University
  const homeCoords2 = useMemo(() => [-121.8835, 37.3345] as [number, number], []); // Another home location

  const locations: LocationMarker[] = useMemo(
    () => [
      {
        id: 'home',
        coords: homeCoords,
        label: 'Home',
        icon: <MapPinHouse className="w-6 h-6" />,
        color: '#3B82F6',
        description: 'San Jose, CA',
      },
      {
        id: 'scu',
        coords: scuCoords,
        label: 'Santa Clara University',
        icon: <Landmark className="w-6 h-6" />,
        color: '#EC4899',
        description: 'MS in Computer Science',
      },
      {
        id: 'home2',
        coords: homeCoords2,
        label: 'Base',
        icon: <MapPinHouse className="w-6 h-6" />,
        color: '#10B981',
        description: 'Secondary Location',
      },
    ],
    [homeCoords, scuCoords, homeCoords2]
  );

  const route = useMemo(() => {
    return [homeCoords, scuCoords, homeCoords2, homeCoords];
  }, [homeCoords, scuCoords, homeCoords2]);

  const [animatedPoint, setAnimatedPoint] = useState<[number, number]>(route[0]);
  const [isForward, setIsForward] = useState(true);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  // Advanced route animation with direction awareness
  useEffect(() => {
    const fullLine = turf.lineString(route);
    const totalDistance = turf.length(fullLine, { units: 'kilometers' });
    const animationSpeed = 0.008;
    let currentDistance = 0;
    let direction = 1; // 1 for forward, -1 for backward

    const interval = setInterval(() => {
      currentDistance += animationSpeed * direction;

      // Bounce animation - go forward then backward
      if (currentDistance >= totalDistance) {
        direction = -1;
        currentDistance = totalDistance;
      } else if (currentDistance <= 0) {
        direction = 1;
        currentDistance = 0;
      }

      setIsForward(direction === 1);

      const nextPoint = turf.along(fullLine, currentDistance, { units: 'kilometers' }).geometry
        .coordinates as [number, number];

      setAnimatedPoint(nextPoint);
    }, 50);

    return () => clearInterval(interval);
  }, [route, locations.length]);

  // Advanced GeoJSON for the route with gradient effect
  const routeGeoJSON = useMemo(
    () => ({
      type: 'Feature' as const,
      geometry: {
        type: 'LineString' as const,
        coordinates: route,
      },
    }),
    [route]
  );

  return (
    <Card
      className={`backdrop-blur-sm h-full min-h-[500px] transition-all duration-500 rounded-3xl border group overflow-hidden ${
        isDark
          ? 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
          : 'bg-black/5 border-black/10 hover:bg-black/8 hover:border-black/20'
      }`}
    >
      <CardContent className="p-6 h-full flex flex-col">
        {/* Advanced Header with Stats */}
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-pink-500/20 border border-blue-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-5 h-5 text-blue-400" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-sm">Personal Atlas</h3>
              <p className="text-xs text-muted-foreground">Dynamic Location Tracker</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full blur opacity-50" />
            <Navigation2 className="w-5 h-5 text-blue-400 relative" />
          </motion.div>
        </motion.div>

        {/* Map Container with 3D Effect */}
        <motion.div
          className="relative flex-1 min-h-[70px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}
        >
          {/* Glow effect background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-pink-500/5 pointer-events-none z-10" />

          {!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ? (
            <div className="w-full h-[450px] flex items-center justify-center bg-white/5 rounded-2xl text-sm text-muted-foreground">
              Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to .env.local to show the map.
            </div>
          ) : (
          <Map
            ref={mapRef}
            initialViewState={{
              latitude: 37.3425,
              longitude: -121.915,
              zoom: 11.2,
              pitch: 45,
              bearing: -20,
            }}
            style={{ width: '100%', height: '450px' }}
            mapStyle={isDark ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11'}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          >
            <NavigationControl position="top-left" />

            {/* Route Line with GeoJSON */}
            <Source id="route" type="geojson" data={routeGeoJSON}>
              <Layer
                id="route-line"
                type="line"
                paint={{
                  'line-color': [
                    'interpolate',
                    ['linear'],
                    ['line-progress'],
                    0,
                    '#3B82F6',
                    0.5,
                    '#8B5CF6',
                    1,
                    '#EC4899',
                  ],
                  'line-width': 4,
                  'line-opacity': 0.8,
                  'line-blur': 1.5,
                }}
              />
              {/* Glow line effect */}
              <Layer
                id="route-line-glow"
                type="line"
                paint={{
                  'line-color': '#3B82F6',
                  'line-width': 10,
                  'line-opacity': 0.2,
                  'line-blur': 8,
                }}
              />
            </Source>

            {/* Location Markers with Advanced Interactions */}
            {locations.map((location) => (
              <motion.div
                key={location.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * locations.indexOf(location) }}
              >
                <Marker
                  longitude={location.coords[0]}
                  latitude={location.coords[1]}
                  anchor="bottom"
                  onClick={() => {
                    if (mapRef.current) {
                      mapRef.current.flyTo({
                        center: location.coords,
                        zoom: 15,
                        duration: 1500,
                        pitch: 50,
                        bearing: -20,
                      });
                    }
                  }}
                >
                  <motion.div
                    className="cursor-pointer"
                    onHoverStart={() => setHoveredLocation(location.id)}
                    onHoverEnd={() => setHoveredLocation(null)}
                    animate={{
                      scale: hoveredLocation === location.id ? 1.3 : 1,
                      rotate: hoveredLocation === location.id ? 360 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="relative p-3 rounded-xl bg-white/10 backdrop-blur-md border-2 shadow-lg"
                      style={{
                        borderColor: location.color,
                        boxShadow: `0 0 20px ${location.color}40`,
                      }}
                    >
                      <div style={{ color: location.color }}>{location.icon}</div>

                      {/* Pulsing glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          borderColor: location.color,
                          borderWidth: 2,
                          opacity: hoveredLocation === location.id ? 0.5 : 0.2,
                        }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>

                    {/* Tooltip on hover */}
                    {hoveredLocation === location.id && (
                      <motion.div
                        className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap ${
                          isDark
                            ? 'bg-gray-900/95 text-white border border-white/20'
                            : 'bg-white/95 text-gray-900 border border-gray-200'
                        }`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {location.label}
                        <div className="text-xs opacity-75">{location.description}</div>
                      </motion.div>
                    )}
                  </motion.div>
                </Marker>
              </motion.div>
            ))}

            {/* Animated Traveler with 3D Effect */}
            <Marker longitude={animatedPoint[0]} latitude={animatedPoint[1]} anchor="bottom">
              <motion.div
                animate={{
                  scale: [0.9, 1.2, 0.9],
                  rotate: isForward ? [0, 360] : [360, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <div
                  className="p-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-xl"
                  style={{
                    boxShadow: '0 0 25px rgba(251, 191, 36, 0.7)',
                  }}
                >
                  <Footprints className="w-5 h-5 text-white drop-shadow-lg" />
                </div>
                {/* Trail effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-yellow-400/30 blur-xl"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </Marker>
          </Map>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}
