# Maqueta: Mapa Interactivo Morelos
## Sistema de Localización de Servicios Públicos

---

## 1. RESUMEN DEL PROYECTO

Aplicación web de mapa interactivo para localizar servicios públicos en el estado de Morelos, México. Incluye sidebar de navegación por categorías, visualización de marcadores en mapa, panel de detalles de ubicaciones y footer institucional.

**Colores principales:**
- Verde principal: `#2E3B2B`
- Fondo sidebar: `#EBEADE`
- Texto principal: `#1A1A1A`
- Texto secundario: `#666666`

---

## 2. ESTRUCTURA DE COMPONENTES

```
┌─────────────────────────────────────────────────────────────┐
│  APP LAYOUT                                                  │
│  ┌──────────┬──────────────────────────────────────────┐   │
│  │          │                                          │   │
│  │ SIDEBAR  │              MAP AREA                    │   │
│  │ (240px)  │         (flex: 1, full height)           │   │
│  │          │                                          │   │
│  │ - Logo   │  ┌────────────────────────────────────┐  │   │
│  │ - Menu   │  │  SEARCH BAR (top-right)            │  │   │
│  │ - User   │  └────────────────────────────────────┘  │   │
│  │          │                                          │   │
│  │          │  ┌────────────────────────────────────┐  │   │
│  │          │  │  MAP (Leaflet/Google Maps)         │  │   │
│  │          │  │  - Marcadores por categoría        │  │   │
│  │          │  │  - Popup info al click             │  │   │
│  │          │  └────────────────────────────────────┘  │   │
│  │          │                                          │   │
│  └──────────┴──────────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  FEEDBACK SECTION                                       │ │
│  │  "¿Te ha resultado útil esta página?" [👍] [👎]         │ │
│  │  [Reportar un problema]                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  CENEFA (patrón decorativo)                            │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  FOOTER (bg: #2E3B2B)                                   │ │
│  │  - Logo MORELOS                                         │ │
│  │  - Servicio de atención ciudadana                       │ │
│  │  - Ubicación                                            │ │
│  │  - Redes sociales                                       │ │
│  │  - Enlaces de interés                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. COMPONENTES DETALLADOS

### 3.1 SIDEBAR (`<Sidebar />`)

**Dimensiones:** 240px ancho, 100vh alto, fixed position
**Background:** `#EBEADE`
**Border-right:** 1px solid `#D4D4C8`

#### 3.1.1 Header del Sidebar
```
┌────────────────────────────┐
│  [LOGO MORELOS]  [LOGO ATD]│
│   (Logomor.svg)  (logo atd)│
└────────────────────────────┘
```
- Logos en fila horizontal
- Padding: 16px 20px
- Gap entre logos: 12px

#### 3.1.2 Menú de Categorías
```
┌────────────────────────────┐
│  🏥 Salud              [15]│  ← Activo (bg: white)
│  ──────────────────────────│
│  🎓 Educación          [15]│
│  ──────────────────────────│
│  ✈️ Turismo            [10]│
│  ──────────────────────────│
│  📋 Registro civil      [9]│
│  ──────────────────────────│
│  ✈️ Turismo            [15]│
│  ──────────────────────────│
│  ✈️ Turismo            [15]│
└────────────────────────────┘
```

**Item de menú (activo):**
- Background: `#FFFFFF`
- Border-radius: 8px
- Padding: 12px 16px
- Box-shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Icono + Texto + Badge (contador)

**Item de menú (inactivo):**
- Background: transparent
- Padding: 12px 16px
- Hover: `background: rgba(255,255,255,0.5)`

**Badge de contador:**
- Background: `#2E3B2B`
- Color: white
- Border-radius: 12px
- Font-size: 11px
- Padding: 2px 8px

#### 3.1.3 Menú Expandido (Subcategorías)
Cuando se expande "Salud":
```
┌────────────────────────────┐
│  🏥 Salud              [15]│  ← Activo
│    ├─ Centros de Salud     │
│    ├─ Hospitales           │
│    ├─ Item                 │
│    ├─ Item                 │
│    ├─ Item                 │
│    └─ Item                 │
│  🎓 Educación          [15]│
└────────────────────────────┘
```

#### 3.1.4 Footer del Sidebar
```
┌────────────────────────────┐
│                            │
│                            │
│                            │
│  ⚙️  👤                   │
│  config user              │
└────────────────────────────┘
```
- Iconos alineados al fondo
- Padding: 16px 20px
- Icon size: 20px
- Color iconos: `#666666`

---

### 3.2 MAP AREA (`<MapArea />`)

**Dimensiones:** flex: 1, 100vh
**Position:** relative

#### 3.2.1 Search Bar
```
┌─────────────────────────────────────────────────────────────┐
│  🔍  Escribe lo que quieres encontrar...          [🔍]      │
└─────────────────────────────────────────────────────────────┘
```
- Position: absolute, top: 16px, right: 16px
- Width: 320px
- Background: white
- Border-radius: 8px
- Box-shadow: `0 2px 8px rgba(0,0,0,0.15)`
- Padding: 12px 16px
- Icono lupa (izquierda): `#999999`
- Botón buscar (derecha): bg `#2E3B2B`, color white

#### 3.2.2 Mapa
- Librería recomendada: **Leaflet** o **Google Maps**
- Centro inicial: Cuernavaca, Morelos (18.9242, -99.2216)
- Zoom inicial: 10
- Marcadores personalizados por categoría:
  - Salud: 🏥 ícono hospital (color: #E74C3C)
  - Educación: 🎓 ícono escuela (color: #3498DB)
  - Turismo: ✈️ ícono turismo (color: #F39C12)
  - Registro civil: 📋 ícono documento (color: #9B59B6)

#### 3.2.3 Panel de Detalle (al seleccionar marcador)
```
┌─────────────────────────────┐
│  [←]                        │
│  ┌─────────────────────┐   │
│  │    [IMAGEN]         │   │
│  │  Hospital del niño  │   │
│  └─────────────────────┘   │
│  🏷️ Salud                   │
│  ─────────────────────────  │
│  📍 Ubicación               │
│  Av. de Salud 1, Benito     │
│  Juárez, 62765              │
│  Emiliano Zapata, Mor.      │
│  ─────────────────────────  │
│  🕐 Horario                 │
│  Abierto 24 hrs             │
│  ─────────────────────────  │
│  📞 Teléfono                │
│  777 362 1170               │
│  ─────────────────────────  │
│  ┌─────────────────────┐   │
│  │ Contactar institución│   │
│  └─────────────────────┘   │
└─────────────────────────────┘
```
- Position: absolute, left: 0, top: 0
- Width: 280px
- Height: 100%
- Background: `#EBEADE`
- Slide-in animation

**Botón "Contactar institución":**
- Background: `#2E3B2B`
- Color: white
- Border-radius: 20px
- Padding: 10px 20px

---

### 3.3 FEEDBACK SECTION (`<FeedbackSection />`)

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  ¿Te ha resultado útil esta página?    [👍]  [👎]    [Reportar │
│                                                        problema]│
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

- Background: `#F5F5F0`
- Padding: 16px 24px
- Border-top: 1px solid `#E0E0D8`
- Display: flex, justify-content: space-between

**Botones like/dislike:**
- Size: 36px x 36px
- Border: 1px solid `#CCCCCC`
- Border-radius: 4px
- Background: white
- Hover: `background: #EBEADE`

**Botón "Reportar un problema":**
- Border: 1px solid `#2E3B2B`
- Color: `#2E3B2B`
- Background: transparent
- Border-radius: 4px
- Padding: 8px 16px

---

### 3.4 CENEFA (`<Cenefa />`)

- Background: imagen `Cenefa.png` (patrón repetitivo)
- Height: 24px
- Width: 100%
- Object-fit: repeat-x

---

### 3.5 FOOTER (`<Footer />`)

**Background:** `#2E3B2B`
**Color texto:** white / `#CCCCCC`
**Padding:** 40px 24px

```
┌────────────────────────────────────────────────────────────────┐
│  [LOGO MORELOS]                                               │
│  LA TIERRA QUE NOS UNE                                        │
│                                                                │
│  Servicio de atención ciudadana                               │
│  ──────────────────────────────────────────────────────────── │
│  Horario: lunes a viernes de 9:00 AM a 2:00 PM                │
│  (777) 329 2200                                               │
│  atencionciudadana@morelos.gob.mx                             │
│  Buscador de oficinas                                         │
│                                                                │
│  Ubicación                                                    │
│  ──────────────────────────────────────────────────────────── │
│  Palacio de Gobierno 2do. Piso                                │
│  Plaza de Armas S/N, Colonia Centro, Cuernavaca, Morelos.     │
│  C.P. 62000                                                   │
│                                                                │
│  Nuestras redes                                               │
│  ──────────────────────────────────────────────────────────── │
│  [f]  [X]  [▶️]                                               │
│                                                                │
│  Enlaces de interés                                           │
│  ──────────────────────────────────────────────────────────── │
│  Código de ética | Portal de trámites | Aviso de privacidad   │
│  Accesibilidad | Aviso legal | Mapa web                       │
└────────────────────────────────────────────────────────────────┘
```

**Secciones del footer:**
1. **Logo MORELOS** - Logomor.svg (versión blanca)
2. **Servicio de atención ciudadana** - Info de contacto
3. **Ubicación** - Dirección física
4. **Nuestras redes** - Iconos sociales (Facebook, X, YouTube)
5. **Enlaces de interés** - Links legales

**Estilos de texto:**
- Títulos: 16px, font-weight: 600, color: white
- Contenido: 14px, color: `#CCCCCC`
- Links: 14px, color: `#CCCCCC`, underline on hover
- Separadores: 1px solid `rgba(255,255,255,0.2)`

---

## 4. PALETA DE COLORES

| Nombre | HEX | Uso |
|--------|-----|-----|
| Verde Principal | `#2E3B2B` | Footer, botones primarios, badges |
| Beige Sidebar | `#EBEADE` | Sidebar background, panel detalle |
| Beige Claro | `#F5F5F0` | Feedback section |
| Blanco | `#FFFFFF` | Fondos, items activos |
| Texto Principal | `#1A1A1A` | Títulos, texto principal |
| Texto Secundario | `#666666` | Subtítulos, descripciones |
| Gris Borde | `#D4D4C8` | Bordes, separadores |
| Gris Claro | `#CCCCCC` | Texto footer, iconos |

**Colores de categorías (marcadores):**
| Categoría | Color |
|-----------|-------|
| Salud | `#E74C3C` (rojo) |
| Educación | `#3498DB` (azul) |
| Turismo | `#F39C12` (naranja) |
| Registro Civil | `#9B59B6` (morado) |

---

## 5. TIPOGRAFÍA

**Font Family:** 
- Primaria: `Inter`, `system-ui`, sans-serif
- Fallback: `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`

**Jerarquía:**
| Elemento | Tamaño | Peso | Línea |
|----------|--------|------|-------|
| H1 (títulos sección) | 24px | 600 | 1.3 |
| H2 (subtítulos) | 18px | 600 | 1.4 |
| H3 (labels) | 14px | 500 | 1.4 |
| Body | 14px | 400 | 1.5 |
| Small | 12px | 400 | 1.4 |
| Caption | 11px | 400 | 1.3 |

---

## 6. ESPACIADO Y LAYOUT

**Sistema de espaciado (8px base):**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Breakpoints:**
- Mobile: < 768px (sidebar colapsa a drawer)
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 7. INTERACCIONES Y ESTADOS

### 7.1 Menú de Categorías
- **Default:** bg transparent, color `#1A1A1A`
- **Hover:** bg `rgba(255,255,255,0.5)`
- **Active:** bg `#FFFFFF`, shadow suave
- **Expanded:** muestra subcategorías con slide-down

### 7.2 Marcadores del Mapa
- **Default:** escala 1.0, opacity 0.9
- **Hover:** escala 1.1, opacity 1.0
- **Selected:** escala 1.2, muestra popup/panel

### 7.3 Botones
- **Primary (verde):**
  - Default: bg `#2E3B2B`
  - Hover: bg `#3D4D3A`
  - Active: bg `#1F2A1D`

- **Secondary (outline):**
  - Default: border `#2E3B2B`, bg transparent
  - Hover: bg `rgba(46,59,43,0.1)`
  - Active: bg `rgba(46,59,43,0.2)`

### 7.4 Search Bar
- **Default:** border transparent
- **Focus:** border `#2E3B2B`, shadow `0 0 0 3px rgba(46,59,43,0.1)`

---

## 8. ASSETS REQUERIDOS

### 8.1 Imágenes/SVG
| Archivo | Uso | Ubicación |
|---------|-----|-----------|
| `Logomor.svg` | Logo MORELOS | Sidebar header, Footer |
| `logo atd.svg` | Logo Agencia Digital | Sidebar header |
| `Cenefa.png` | Patrón decorativo | Entre feedback y footer |

### 8.2 Iconos (recomendado: Lucide React)
- `Building2` - Salud
- `GraduationCap` - Educación
- `Plane` - Turismo
- `FileText` - Registro civil
- `Search` - Búsqueda
- `Settings` - Configuración
- `User` - Usuario
- `MapPin` - Ubicación
- `Clock` - Horario
- `Phone` - Teléfono
- `ChevronRight` - Expandir menú
- `ChevronLeft` - Volver
- `ThumbsUp` - Like
- `ThumbsDown` - Dislike
- `Facebook` - Red social
- `Twitter` / `X` - Red social
- `Youtube` - Red social

---

## 9. ESTRUCTURA DE DATOS (TypeScript)

```typescript
// Categoría de servicios
interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories?: Subcategory[];
  color: string;
}

// Subcategoría
interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

// Ubicación/Servicio
interface Location {
  id: string;
  name: string;
  categoryId: string;
  subcategoryId?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  schedule?: string;
  phone?: string;
  email?: string;
  image?: string;
  tags?: string[];
}

// Estado de la aplicación
interface AppState {
  selectedCategory: string | null;
  selectedLocation: Location | null;
  searchQuery: string;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
}
```

---

## 10. COMPONENTES REACT RECOMENDADOS

```
src/
├── components/
│   ├── Layout/
│   │   └── MainLayout.tsx
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── SidebarHeader.tsx
│   │   ├── CategoryMenu.tsx
│   │   ├── CategoryItem.tsx
│   │   └── SidebarFooter.tsx
│   ├── Map/
│   │   ├── MapContainer.tsx
│   │   ├── SearchBar.tsx
│   │   ├── LocationMarker.tsx
│   │   ├── LocationPopup.tsx
│   │   └── LocationDetail.tsx
│   ├── Feedback/
│   │   └── FeedbackSection.tsx
│   ├── Cenefa/
│   │   └── Cenefa.tsx
│   └── Footer/
│       └── Footer.tsx
├── hooks/
│   ├── useLocations.ts
│   ├── useCategories.ts
│   └── useMap.ts
├── types/
│   └── index.ts
├── data/
│   └── locations.ts
└── App.tsx
```

---

## 11. FUNCIONALIDADES CLAVE

### 11.1 Navegación por Categorías
- Click en categoría filtra marcadores en el mapa
- Expande subcategorías si existen
- Badge muestra cantidad de ubicaciones

### 11.2 Búsqueda
- Input de búsqueda filtra ubicaciones
- Resultados destacados en el mapa
- Autocomplete con sugerencias

### 11.3 Interacción con Marcadores
- Click en marcador abre panel de detalle
- Panel muestra info completa de la ubicación
- Botón para contactar/cómo llegar

### 11.4 Feedback
- Botones like/dislike para calificar utilidad
- Botón para reportar problemas (modal/form)

---

## 12. RESPONSIVE DESIGN

### Mobile (< 768px)
- Sidebar se convierte en drawer deslizable
- Botón hamburguesa para abrir/cerrar
- Mapa ocupa pantalla completa
- Panel de detalle es bottom sheet

### Tablet (768px - 1024px)
- Sidebar más angosto (200px)
- Search bar más pequeño
- Footer en 2 columnas

### Desktop (> 1024px)
- Layout completo como en diseño
- Sidebar de 240px
- Footer en grid de 4 columnas

---

## 13. ANIMACIONES

| Elemento | Animación | Duración | Easing |
|----------|-----------|----------|--------|
| Sidebar item hover | bg fade | 150ms | ease-out |
| Menú expand | slideDown | 200ms | ease-in-out |
| Panel detalle | slideInLeft | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Marcador hover | scale | 150ms | ease-out |
| Popup mapa | fade + scale | 200ms | ease-out |
| Feedback buttons | scale on click | 100ms | ease-out |

---

## 14. NOTAS DE IMPLEMENTACIÓN

1. **Mapa:** Usar Leaflet con OpenStreetMap o Google Maps API
2. **Marcadores:** Crear componente personalizado con iconos SVG
3. **Estado:** Usar React Context o Zustand para estado global
4. **Datos:** Simular con JSON local, luego conectar a API
5. **Imágenes:** Las imágenes de ubicaciones pueden ser placeholders
6. **Accesibilidad:** Asegurar contraste WCAG AA, labels en inputs
7. **SEO:** Meta tags apropiados para gobierno

---

## 15. CHECKLIST DE IMPLEMENTACIÓN

- [ ] Configurar proyecto React + TypeScript + Tailwind
- [ ] Instalar dependencias (Leaflet, Lucide icons)
- [ ] Crear componente Sidebar con menú
- [ ] Implementar MapContainer con Leaflet
- [ ] Crear marcadores personalizados por categoría
- [ ] Implementar panel de detalle de ubicación
- [ ] Crear barra de búsqueda funcional
- [ ] Implementar FeedbackSection
- [ ] Crear Footer con toda la información
- [ ] Agregar cenefa decorativa
- [ ] Implementar responsive design
- [ ] Agregar animaciones y transiciones
- [ ] Testing y ajustes finales

---

**Documento creado para:** Mapa Interactivo Morelos  
**Fecha:** 2026-01-27  
**Versión:** 1.0
