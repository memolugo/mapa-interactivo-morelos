import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { Location } from './types';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MapContainer } from './components/Map/MapContainer';
import { FeedbackSection } from '@/components/Feedback/FeedbackSection';
import { Cenefa } from '@/components/Cenefa/Cenefa';
import { Footer } from './components/Footer/Footer';
import { categories } from './data/locations';
import './App.css';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTGJN-OccO42rVkRmkeRCYXovGKOdDRK1RhKP6eNBGJLUvJ6ttLycjkMANZVYjPnkKGbGwCOcgWgfZt/pub?gid=0&single=true&output=csv';

// Helper to match organo to slug
const getCategorySlug = (organo: string) => {
  return organo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [fetchedLocations, setFetchedLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debugLog, setDebugLog] = useState<string>('Iniciando...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDebugLog('Conectando con Google Sheets...');
        // Force refresh by adding timestamp
        const response = await fetch(`${SHEET_URL}&t=${Date.now()}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const csvData = await response.text();
        setDebugLog(`Datos recibidos (${csvData.length} bytes). Procesando...`);

        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setDebugLog(`CSV parseado. ${results.data.length} filas encontradas.`);

            const normalize = (s: string) =>
              (s || '').toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim()
                .replace(/\s+/g, ' ');

            const parsedLocations: Location[] = results.data.map((row: any, index: number) => {
              const sheetOrgano = (row.organo || '').trim();
              const normalizedSheetName = normalize(sheetOrgano);

              // Find matching category
              const matchedCategory = categories.find(cat =>
                normalize(cat.name) === normalizedSheetName
              );

              const categoryId = matchedCategory ? matchedCategory.id : getCategorySlug(sheetOrgano);

              let lat = parseFloat(row.latitud);
              let lng = parseFloat(row.longitud);

              if (!isNaN(lat) && !isNaN(lng)) {
                if (lat < 0 && lng > 0) {
                  const temp = lat;
                  lat = lng;
                  lng = temp;
                }
              }

              return {
                id: `sheet-${index}`,
                latitud: lat,
                longitud: lng,
                organo: row.organo,
                entidad: row.entidad,
                google_maps: row.google_maps,
                direccion: row.direccion,
                horario: row.horario,
                telefono: row.telefono,
                correo: row.correo,
                categoryId: categoryId,
                coordinates: { lat, lng }
              };
            }).filter((loc: Location) => !isNaN(loc.latitud) && !isNaN(loc.longitud));

            // Jitter logic for overlapping markers
            const coordinateGroups: { [key: string]: Location[] } = {};
            parsedLocations.forEach(loc => {
              const key = `${loc.latitud.toFixed(6)},${loc.longitud.toFixed(6)}`;
              if (!coordinateGroups[key]) coordinateGroups[key] = [];
              coordinateGroups[key].push(loc);
            });

            const jitteredLocations = parsedLocations.map(loc => {
              const key = `${loc.latitud.toFixed(6)},${loc.longitud.toFixed(6)}`;
              const group = coordinateGroups[key];

              if (group.length > 1) {
                const index = group.indexOf(loc);
                const angle = (index / group.length) * 2 * Math.PI;
                const radius = 0.00015; // Small offset (approx 15-20 meters)
                const jitterLat = loc.latitud + Math.cos(angle) * radius;
                const jitterLng = loc.longitud + Math.sin(angle) * radius;
                return {
                  ...loc,
                  latitud: jitterLat,
                  longitud: jitterLng,
                  coordinates: { lat: jitterLat, lng: jitterLng }
                };
              }
              return loc;
            });

            setDebugLog(`Proceso completado. ${jitteredLocations.length} ubicaciones válidas cargadas.`);
            setFetchedLocations(jitteredLocations);
            setTimeout(() => setIsLoading(false), 800);
          },
          error: (error: any) => {
            setDebugLog(`Error al parsear CSV: ${error.message || error}`);
          }
        });
      } catch (error: any) {
        setDebugLog(`Error de conexión: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6 max-w-sm w-full">
          <div className="w-16 h-16 border-4 border-[#6B8E23] border-t-transparent rounded-full animate-spin"></div>
          <div className="space-y-3 text-center">
            <h2 className="text-xl font-bold text-[#2E3B2B]">Sincronizando Datos</h2>
            <div className="bg-white/50 p-4 rounded-xl border border-[#2E3B2B]/10 font-mono text-xs text-[#2E3B2B]/80 text-left">
              <p className="animate-pulse">{debugLog}</p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-[#6B8E23] hover:underline"
          >
            Reintentar si tarda demasiado
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col overflow-x-hidden">
      {/* Top Section: Sidebar and Map */}
      <div className="flex flex-col lg:flex-row w-full gap-2 px-4 pt-4 mb-6 h-auto lg:h-[90vh]">
        {/* Sidebar */}
        <div className="w-full lg:w-[350px] h-[60vh] lg:h-full shrink-0">
          <Sidebar
            locations={fetchedLocations}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            onCloseLocationDetail={() => setSelectedLocation(null)}
          />
        </div>

        {/* Main Content Area (Map) */}
        <div className="flex-1 relative h-[50vh] lg:h-full">
          <MapContainer
            locations={fetchedLocations}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
          />
        </div>
      </div>

      {/* Bottom Section: Feedback, Cenefa, Footer */}
      <div className="w-full">
        <FeedbackSection />
        <Cenefa />
        <Footer />
      </div>
    </div>
  );
}

export default App;
