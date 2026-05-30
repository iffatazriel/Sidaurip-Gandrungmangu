"use client";

import { useEffect, useMemo } from "react";

import { Map, MapControls, MapMarker, useMap } from "@/components/ui/map";
import { cn } from "@/lib/utils";

const SIDAURIP_CENTER: [number, number] = [108.8342, -7.5612];
const BALAI_DESA_SIDAURIP: [number, number] = [108.8362, -7.5508];
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Balai%20Desa%20Sidaurip%20Gandrungmangu%20Cilacap";

const SIDAURIP_BOUNDARY: [number, number][] = [
  [108.839313, -7.528834],
  [108.83781, -7.528753],
  [108.837848, -7.530875],
  [108.837477, -7.530985],
  [108.833355, -7.531126],
  [108.833339, -7.537089],
  [108.833229, -7.537424],
  [108.832592, -7.537861],
  [108.829228, -7.541171],
  [108.828488, -7.549098],
  [108.828288, -7.553381],
  [108.828021, -7.555461],
  [108.827601, -7.556681],
  [108.825456, -7.559595],
  [108.825049, -7.566898],
  [108.825141, -7.567243],
  [108.824693, -7.567266],
  [108.824514, -7.567937],
  [108.824693, -7.568285],
  [108.824927, -7.568334],
  [108.82466, -7.568773],
  [108.825313, -7.568785],
  [108.82541, -7.568911],
  [108.825153, -7.569444],
  [108.825807, -7.569859],
  [108.826376, -7.571023],
  [108.826108, -7.571752],
  [108.825779, -7.5717],
  [108.825275, -7.570928],
  [108.824697, -7.571303],
  [108.824518, -7.570964],
  [108.824736, -7.57051],
  [108.824668, -7.570259],
  [108.824133, -7.570655],
  [108.823821, -7.570678],
  [108.82366, -7.569942],
  [108.822986, -7.569675],
  [108.822316, -7.570045],
  [108.822049, -7.570357],
  [108.821942, -7.571015],
  [108.822173, -7.571817],
  [108.821651, -7.57215],
  [108.821258, -7.571597],
  [108.820291, -7.571547],
  [108.820141, -7.571775],
  [108.820181, -7.572494],
  [108.81899, -7.572612],
  [108.818861, -7.573264],
  [108.818114, -7.574354],
  [108.815639, -7.576914],
  [108.814747, -7.57753],
  [108.814566, -7.577973],
  [108.814638, -7.578432],
  [108.815481, -7.579013],
  [108.817111, -7.57908],
  [108.818178, -7.579307],
  [108.818592, -7.57956],
  [108.819136, -7.580509],
  [108.819088, -7.581204],
  [108.818877, -7.581853],
  [108.817785, -7.583755],
  [108.817094, -7.585378],
  [108.816938, -7.587033],
  [108.817258, -7.588262],
  [108.819002, -7.589424],
  [108.821208, -7.589982],
  [108.823224, -7.590139],
  [108.825876, -7.590596],
  [108.827327, -7.591062],
  [108.828495, -7.591718],
  [108.829101, -7.592224],
  [108.829601, -7.593025],
  [108.829774, -7.593972],
  [108.83003, -7.59625],
  [108.830213, -7.59968],
  [108.830499, -7.600262],
  [108.831087, -7.600179],
  [108.832545, -7.600262],
  [108.834127, -7.599822],
  [108.83571, -7.598269],
  [108.836358, -7.59799],
  [108.837714, -7.59796],
  [108.838184, -7.598132],
  [108.838762, -7.598575],
  [108.84264, -7.586394],
  [108.845898, -7.586978],
  [108.845952, -7.585823],
  [108.846688, -7.584923],
  [108.846755, -7.584661],
  [108.84666, -7.58429],
  [108.845582, -7.583532],
  [108.845548, -7.583259],
  [108.845843, -7.583142],
  [108.846902, -7.583628],
  [108.847088, -7.583582],
  [108.847235, -7.583341],
  [108.846813, -7.582095],
  [108.847055, -7.58094],
  [108.847048, -7.579923],
  [108.847365, -7.579029],
  [108.846913, -7.578319],
  [108.847577, -7.577443],
  [108.847211, -7.576675],
  [108.847439, -7.575467],
  [108.84712, -7.574523],
  [108.84753, -7.573986],
  [108.847582, -7.57363],
  [108.847132, -7.573075],
  [108.847196, -7.572872],
  [108.847529, -7.572698],
  [108.847625, -7.572412],
  [108.847107, -7.571551],
  [108.847656, -7.571077],
  [108.847156, -7.570202],
  [108.847262, -7.569971],
  [108.847849, -7.569677],
  [108.847488, -7.568966],
  [108.847573, -7.568128],
  [108.846903, -7.566965],
  [108.846713, -7.565922],
  [108.844532, -7.5661],
  [108.844789, -7.559732],
  [108.842633, -7.559771],
  [108.841532, -7.559652],
  [108.841056, -7.559206],
  [108.83781, -7.559811],
  [108.838279, -7.556655],
  [108.839765, -7.553206],
  [108.840381, -7.550274],
  [108.84281, -7.549586],
  [108.842986, -7.548977],
  [108.841094, -7.548525],
  [108.841755, -7.5453],
  [108.840209, -7.545221],
  [108.840288, -7.541976],
  [108.839689, -7.541726],
  [108.839849, -7.536897],
  [108.8389, -7.536951],
  [108.839313, -7.528834],
];

function SidauripBoundary() {
  const { map, isLoaded } = useMap();

  const boundaryData = useMemo(
    () => ({
      type: "Feature" as const,
      properties: {
        name: "Desa Sidaurip",
        district: "Gandrungmangu",
        regency: "Cilacap",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [SIDAURIP_BOUNDARY],
      },
    }),
    [],
  );

  useEffect(() => {
    if (!map || !isLoaded) return;

    if (!map.getSource("sidaurip-boundary")) {
      map.addSource("sidaurip-boundary", {
        type: "geojson",
        data: boundaryData,
      });
    }

    if (!map.getLayer("sidaurip-fill")) {
      map.addLayer({
        id: "sidaurip-fill",
        type: "fill",
        source: "sidaurip-boundary",
        paint: {
          "fill-color": "#046b5e",
          "fill-opacity": 0.2,
        },
      });
    }

    if (!map.getLayer("sidaurip-outline")) {
      map.addLayer({
        id: "sidaurip-outline",
        type: "line",
        source: "sidaurip-boundary",
        paint: {
          "line-color": "#003366",
          "line-dasharray": [2, 1.2],
          "line-opacity": 0.95,
          "line-width": 2.5,
        },
      });
    }

    map.fitBounds(
      [
        [108.814566, -7.600262],
        [108.847849, -7.528753],
      ],
      {
        duration: 900,
        padding: { top: 48, right: 48, bottom: 88, left: 48 },
      },
    );

    return () => {
      if (map.getLayer("sidaurip-outline")) map.removeLayer("sidaurip-outline");
      if (map.getLayer("sidaurip-fill")) map.removeLayer("sidaurip-fill");
      if (map.getSource("sidaurip-boundary")) map.removeSource("sidaurip-boundary");
    };
  }, [boundaryData, isLoaded, map]);

  return null;
}

type SidauripMapProps = {
  className?: string;
};

export default function SidauripMap({ className }: SidauripMapProps) {
  return (
    <div
      className={cn(
        "relative h-[460px] overflow-hidden rounded-2xl bg-surface-container-low editorial-shadow",
        className,
      )}
    >
      <Map
        center={SIDAURIP_CENTER}
        zoom={12.6}
        minZoom={11}
        maxZoom={17}
        pitch={0}
        theme="light"
        className="h-full w-full"
      >
        <SidauripBoundary />
        <MapMarker
          longitude={BALAI_DESA_SIDAURIP[0]}
          latitude={BALAI_DESA_SIDAURIP[1]}
          anchor="bottom"
        >
          <div className="relative flex h-14 w-14 items-center justify-center">
            <span className="absolute h-14 w-14 rounded-full bg-primary/15 animate-ping" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-primary-container text-white shadow-lg">
              <span className="material-symbols-outlined text-[24px]">location_on</span>
            </span>
          </div>
        </MapMarker>
        <MapControls
          position="top-right"
          showCompass
          showFullscreen
          showLocate={false}
        />
      </Map>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/45 to-transparent p-5 pt-24 sm:p-8 sm:pt-28">
        <div className="pointer-events-auto max-w-md rounded-lg bg-white/95 p-5 shadow-xl backdrop-blur-md">
          <div className="mb-2 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">map</span>
            <h4 className="font-headline text-lg font-bold text-primary">
              Batas Desa Sidaurip
            </h4>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-on-surface-variant">
            Area berwarna hijau mengikuti batas administrasi Desa Sidaurip,
            Kecamatan Gandrungmangu, Kabupaten Cilacap.
          </p>
          <a
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
          >
            Buka di Google Maps
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
}
