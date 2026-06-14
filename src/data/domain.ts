export type TrashPaymentOption =
  | "trash"
  | "trees"
  | "construction_waste";

export interface PaymentOption {
  id: TrashPaymentOption;
  label: { hu: string, en: string }; // Label shown to the user
  description: { hu: string, en: string }; // Description shown to the user
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "trash",
    label: { hu: "Szemét elszállítása", en: "Garbage Collection" },
    description: { hu: "Vállalom, hogy legalább 5 kilogramm hulladékot összegyűjtök és elszállítom a szigetről.", en: "I commit to collecting at least 5 kilograms of waste and transporting it off the island." },
  },
  {
    id: "trees",
    label: { hu: "Faültetés", en: "Tree Planting" },
    description: { hu: "Vállalom, hogy legalább 1 őshonos fajtájú fát ültetek a területen.", en: "I commit to planting at least 1 native species tree on the island." },
  },
  {
    id: "construction_waste",
    label: { hu: "Építési hulladék elszállítása", en: "Construction Waste Collection" },
    description: { hu: "Vállalom, hogy legalább 100 kilogramm építési hulladékot elszállítok a szigetről.", en: "I commit to collecting at least 100 kilograms of construction waste and transporting it off the island." },
  },
];

export type ShippingMethod = "self_pickup" | "water_taxi" | "delivery_agency";

export interface ShippingOption {
  id: ShippingMethod;
  label: { hu: string, en: string };
  description: { hu: string, en: string };
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "self_pickup",
    label: { hu: "Személyes átvétel közúton", en: "Self-Pickup" },
    description: { hu: "Saját magam viszem el a tárgyakat biciklivel / gépjárművel.", en: "I will pick up the items myself by bicycle / car." },
  },
  {
    id: "water_taxi",
    label: { hu: "Vízi taxi", en: "Water Taxi" },
    description: { hu: "Hajóval viszem el a tárgyakat.", en: "I will transport the items by boat." },
  },
  {
    id: "delivery_agency",
    label: { hu: "Futárszolgálat", en: "Delivery Service" },
    description: { hu: "Helyi szállítócég segítségét veszem igénybe.", en: "I will use the help of a local delivery guy." },
  },
];

export type ObjectId = string; // 6 character alphanumeric, e.g. "A3F9Z1"

export type ObjectCategory = "object" | "building" | "waste";

export interface MapCoordinate {
  x: number; // 0..100 relative position on stylized map
  y: number; // 0..100 relative position on stylized map
}

export interface Dimensions {
  widthCm: number;
  heightCm: number;
  depthCm: number;
}

export interface IslandObject {
  id: ObjectId;
  name: { hu: string, en: string };
  description: { hu: string, en: string };
  category: ObjectCategory;
  location: MapCoordinate;
  cost: number;
  costUnit: { hu: string, en: string };
  color: { hu: string, en: string };
  material: { hu: string, en: string };
  dimensions: Dimensions;
  weightKg: number;
  imagePath?: string; // path relative to /public, e.g. "/objects/abc123.jpg"
}

export interface CartItem {
  object: IslandObject;
  quantity: number;
}

export type CheckoutStep =
  | "cart"
  | "data"
  | "shipping"
  | "payment"
  | "summary"
  | "art_notice";

export interface CheckoutFormData {
  fullName: string;
  email: string;
  notes: string;
  addressLine: string;
  postalCode: string;
  city: string;
  consentToArtProject: boolean;
}

export interface CheckoutState {
  step: CheckoutStep;
  form: CheckoutFormData;
  selectedPayment?: TrashPaymentOption;
  selectedShipping?: ShippingMethod;
}

export interface ThemeState {
  mode: "light" | "dark";
}

export interface LanguageState {
  current: "hu" | "en";
}

export interface WebshopState {
  cart: CartItem[];
  checkout: CheckoutState;
  theme: ThemeState;
  language: LanguageState;
}

export const initialObjects: IslandObject[] = [
  {
    id: "A3F9Z1",
    name: { hu: "Acél kábel", en: "Steel Cable" },
    description: { hu: "Három eres acél kábel. Néhol hozzá van erősítve egy szigeteletlen kábel is, ami valószínűleg földelővezeték lehetett.", en: "Three-strand steel cable. Sometimes a bare cable is attached, which was probably a grounding wire." },
    category: "object",
    location: { x: 48, y: 64 },
    cost: 5600,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "fekete", en: "black" },
    material: { hu: "acél sodrony + műanyag burkolat", en: "steel strand + plastic coating" },
    dimensions: { widthCm: 1200, heightCm: 1.5, depthCm: 0 },
    weightKg: 5,
    imagePath: "/objects/acel_kabel.jpg",
  },
  {
    id: "B7K2M9",
    name: { hu: "Ajtólakk", en: "Door Varnish" },
    description: { hu: "Felrepedt, hámló ajtólakk, kék színben.", en: "Cracked, peeling door varnish, blue color." },
    category: "waste",
    location: { x: 48, y: 66 },
    cost: 150,
    costUnit: { hu: "Ft/m2", en: "HUF/m2" },
    color: { hu: "királykék", en: "king blue" },
    material: { hu: "", en: " (EN)" },
    dimensions: { widthCm: 0, heightCm: 0, depthCm: 0.03 },
    weightKg: 10,
    imagePath: "/objects/ajtolakk.jpg",
  },
  {
    id: "C1D8Q4",
    name: { hu: "Beton elem", en: "Concrete Element" },
    description: { hu: "Négyzet alakú beton elem, üreges.", en: "Square concrete element, hollow." },
    category: "object",
    location: { x: 37.2, y: 37.5 },
    cost: 3500,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "szürke", en: "grey" },
    material: { hu: "beton", en: "concrete" },
    dimensions: { widthCm: 60, heightCm: 25, depthCm: 60 },
    weightKg: 45,
    imagePath: "/objects/beton_elem.jpg",
  },
  {
    id: "D9L4S2",
    name: { hu: "Beton járólap", en: "Concrete Walkway" },
    description: { hu: "Közönséges beton járólap.", en: "Common concrete walkway." },
    category: "waste",
    location: { x: 46.8, y: 64.8 },
    cost: 120,
    costUnit: { hu: "Ft/db", en: "HUF/pcs" },
    color: { hu: "szürke", en: "grey" },
    material: { hu: "beton", en: "concrete" },
    dimensions: { widthCm: 30, heightCm: 5, depthCm: 30 },
    weightKg: 10,
    imagePath: "/objects/beton_jarolap.jpg",
  },
  {
    id: "E5R7P1",
    name: { hu: "Beton kerti garnitúra", en: "Concrete Garden Suite" },
    description: { hu: "W alakú beton pad és egy négyszögletes beton asztal.", en: "W-shaped concrete bench and a square concrete table." },
    category: "building",
    location: { x: 36, y: 64 },
    cost: 149000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "szürke", en: "grey" },
    material: { hu: "beton", en: "concrete" },
    dimensions: { widthCm: 350, heightCm: 80, depthCm: 220 },
    weightKg: 1050,
    imagePath: "/objects/beton_kerti_garnitura.jpg",
  },
  {
    id: "F6Q3N8",
    name: { hu: "Beton kocka", en: "Concrete Cube" },
    description: { hu: "Beton kocka, közepén acélrúd csonkkal.", en: "Concrete cube, with steel bar core." },
    category: "waste",
    location: { x: 35, y: 56 },
    cost: 1500,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "szürke", en: "grey" },
    material: { hu: "beton", en: "concrete" },
    dimensions: { widthCm: 60, heightCm: 60, depthCm: 60 },
    weightKg: 50,
    imagePath: "/objects/beton_kocka.jpg",
  },
  {
    id: "G2M9V4",
    name: { hu: "Beton villanyoszlop", en: "Concrete Electric Pole" },
    description: { hu: "Középfeszültségű hálózat vasalt beton oszlopa.", en: "Medium voltage power grid reinforced concrete pole." },
    category: "building",
    location: { x: 40, y: 33 },
    cost: 22000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "szürke", en: "grey" },
    material: { hu: "beton", en: "concrete" },
    dimensions: { widthCm: 35, heightCm: 600, depthCm: 35 },
    weightKg: 750,
    imagePath: "/objects/beton_villanyoszlop.jpg",
  },
  {
    id: "H1X7K5",
    name: { hu: "Betontörmelék (kitermelendő)", en: "Concrete Waste (to be extracted)" },
    description: { hu: "Az egykori uszoda egyik medencéje bontásából származó betontörmelék.", en: "Concrete waste from the demolition of the former swimming pool." },
    category: "waste",
    location: { x: 54, y: 60 },
    cost: 100,
    costUnit: { hu: "Ft/kg", en: "HUF/kg" },
    color: { hu: "szürke", en: "grey" },
    material: { hu: "beton", en: "concrete" },
    dimensions: { widthCm: 0, heightCm: 0, depthCm: 15 },
    weightKg: 12000,
    imagePath: "/objects/betontormelek_kitermelendo.jpg",
  },
  {
    id: "J4C6D9",
    name: { hu: "Fa kerítésoszlop", en: "Wooden Fence Post" },
    description: { hu: "Vörösre lakkozott fa kerítésoszlop a kemping kerítéséből.", en: "Red-painted wooden fence post from the camping." },
    category: "building",
    location: { x: 58.2, y: 22.5 },
    cost: 5490,
    costUnit: { hu: "Ft/db", en: "HUF/pcs" },
    color: { hu: "téglavörös", en: "brick red" },
    material: { hu: "fa", en: "wood" },
    dimensions: { widthCm: 15, heightCm: 200, depthCm: 15 },
    weightKg: 13,
    imagePath: "/objects/fa_keritesoszlop.jpg",
  },
  {
    id: "K8P2L7",
    name: { hu: "Fém állvány", en: "Metal Stand" },
    description: { hu: "Ismeretlen rendeltetésű fém állvány.", en: "Unknown purpose metal stand." },
    category: "object",
    location: { x: 46.5, y: 62 },
    cost: 29000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "fehér", en: "white" },
    material: { hu: "fém", en: "metal" },
    dimensions: { widthCm: 150, heightCm: 200, depthCm: 60 },
    weightKg: 39,
    imagePath: "/objects/fem_allvany.jpg",
  },
  {
    id: "L3Z9A2",
    name: { hu: "Fém kerítéselem", en: "Metal Fence Element" },
    description: { hu: "Zöldre lakkozott fém kerítéselem. Valószínűleg egy kapuhoz tartozott.", en: "Green-painted metal fence element. Likely belonged to a gate." },
    category: "object",
    location: { x: 48.3, y: 68 },
    cost: 10000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "zöld", en: "green" },
    material: { hu: "fém", en: "metal" },
    dimensions: { widthCm: 140, heightCm: 190, depthCm: 3 },
    weightKg: 27,
    imagePath: "/objects/fem_kerites_elem.jpg",
  },
  {
    id: "M7N1R6",
    name: { hu: "Fém kerítéselem (hosszú)", en: "Long Metal Fence Element" },
    description: { hu: "Zöldre lakkozott hosszú fém kerítéselem. Valószínűleg egy kapuhoz tartozott.", en: "Green-painted long metal fence element. Likely belonged to a gate." },
    category: "object",
    location: { x: 49.5, y: 63 },
    cost: 30000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "zöld", en: "green" },
    material: { hu: "fém", en: "metal" },
    dimensions: { widthCm: 480, heightCm: 190, depthCm: 3 },
    weightKg: 62,
    imagePath: "/objects/fem_kerites_elem_hosszu.jpg",
  },
  {
    id: "N5V8E3",
    name: { hu: "Fém kerítéskapu", en: "Metal Fence Gate" },
    description: { hu: "Zöldre lakkozott fém kerítéskapu a csónakház hátsó bejáratából.", en: "Green-painted metal fence gate from the back entrance of the boat house." },
    category: "object",
    location: { x: 57.6, y: 53 },
    cost: 26000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "zöld", en: "green" },
    material: { hu: "fém", en: "metal" },
    dimensions: { widthCm: 340, heightCm: 190, depthCm: 3 },
    weightKg: 32,
    imagePath: "/objects/fem_kerites_kapu.jpg",
  },
  {
    id: "P2H6Q8",
    name: { hu: "Fém kerítésoszlop (sarok)", en: "Metal Fence Post (Corner)" },
    description: { hu: "Zöldre lakkozott fém kerítésoszlop sarokelem.", en: "Green-painted metal fence post corner element." },
    category: "object",
    location: { x: 52, y: 68 },
    cost: 8000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "zöld", en: "green" },
    material: { hu: "fém", en: "metal" },
    dimensions: { widthCm: 5, heightCm: 300, depthCm: 5 },
    weightKg: 14,
    imagePath: "/objects/fem_kerites_oszlop_sarok.jpg",
  },
  {
    id: "Q9D3S4",
    name: { hu: "Fém pózna", en: "Metal Post" },
    description: { hu: "Zöldre festett fém pózna, valószínűleg világításhoz.", en: "Green-painted metal post, likely for lighting." },
    category: "object",
    location: { x: 52.2, y: 63.1 },
    cost: 18000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "zöld", en: "green" },
    material: { hu: "fém", en: "metal" },
    dimensions: { widthCm: 8, heightCm: 350, depthCm: 8 },
    weightKg: 18,
    imagePath: "/objects/fem_pozna.jpg",
  },
  {
    id: "R1K8B7",
    name: { hu: "Hangulatvilágítás", en: "Ambient Lighting" },
    description: { hu: "Glóbuszt imitáló hangulatvilágítás LED izzókkal.", en: "Globe-shaped ambient lighting with LED bulbs." },
    category: "object",
    location: { x: 39, y: 56 },
    cost: 3750,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "fekete", en: "black" },
    material: { hu: "műanyag", en: "plastic" },
    dimensions: { widthCm: 12, heightCm: 65, depthCm: 12 },
    weightKg: 2,
    imagePath: "/objects/hangulatvilagitas.jpg",
  },
  {
    id: "S8L2C9",
    name: { hu: "Hirdetőtábla", en: "Advertisement Board" },
    description: { hu: "Fehérre festett fém hirdetőtábla, fém tartókonzollal.", en: "White-painted metal advertisement board with metal mounting brackets." },
    category: "object",
    location: { x: 39.2, y: 39.5 },
    cost: 21500,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "fehér", en: "white" },
    material: { hu: "fém", en: "metal" },
    dimensions: { widthCm: 70, heightCm: 185, depthCm: 6 },
    weightKg: 19,
    imagePath: "/objects/hirdetotabla.jpg",
  },
  {
    id: "T4E7M1",
    name: { hu: "Hőszigetelés", en: "Thermal Insulation" },
    description: { hu: "Szálas hőszigetelő anyag.", en: "Fibrous thermal insulation material." },
    category: "waste",
    location: { x: 49.6, y: 64.5 },
    cost: 500,
    costUnit: { hu: "Ft/m3", en: "HUF/m3" },
    color: { hu: "sárga", en: "yellow" },
    material: { hu: "kőzetgyapot", en: "rock wool" },
    dimensions: { widthCm: 0, heightCm: 0, depthCm: 10 },
    weightKg: 2100,
    imagePath: "/objects/hoszigeteles.jpg",
  },
  {
    id: "U6P9F1",
    name: { hu: "Hullámlemez darab", en: "Sine Panel Piece" },
    description: { hu: "Üvegszál erősítésű epoxi gyantából készült hullámlemez tetőfedés egy darabja.", en: "Sine Panel Piece made from glass fiber reinforced epoxy resin." },
    category: "waste",
    location: { x: 47.9, y: 65.2 },
    cost: 700,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "áttetsző sárga", en: "translucent yellow" },
    material: { hu: "üvegszál + epoxi", en: "glass fiber + epoxy" },
    dimensions: { widthCm: 25, heightCm: 16, depthCm: 6 },
    weightKg: 0.2,
    imagePath: "/objects/hullamlemez_darab_g.png",
  },
  {
    id: "U6P9F2",
    name: { hu: "Hullámlemez fedés", en: "Sine Panel Roofing" },
    description: { hu: "Üvegszál erősítésű epoxi gyantából készült hullámlemez tetőfedés.", en: "Sine Panel Roofing made from glass fiber reinforced epoxy resin." },
    category: "building",
    location: { x: 49.4, y: 65.2 },
    cost: 1500,
    costUnit: { hu: "Ft/m2", en: "HUF/m2" },
    color: { hu: "áttetsző sárga", en: "translucent yellow" },
    material: { hu: "üvegszál + epoxi", en: "glass fiber + epoxy" },
    dimensions: { widthCm: 0, heightCm: 0, depthCm: 6 },
    weightKg: 1970,
    imagePath: "/objects/hullamlemez_fedes.jpg",
  },
  {
    id: "V3N5H8",
    name: { hu: "I-tartó", en: "I-Beam" },
    description: { hu: "Acélból I-tartó szerkezet.", en: "Steel I-Beam structure." },
    category: "building",
    location: { x: 46.5, y: 63 },
    cost: 12000,
    costUnit: { hu: "Ft/m", en: "HUF/m" },
    color: { hu: "szürke", en: "grey" },
    material: { hu: "acél", en: "steel" },
    dimensions: { widthCm: 12, heightCm: 18, depthCm: 300 },
    weightKg: 85,
    imagePath: "/objects/i_tarto.jpg",
  },
  {
    id: "W1C4K6",
    name: { hu: "Ivókút", en: "Drinking Fountain" },
    description: { hu: "Terméskőből készült kétoldalú ivókút.", en: "Two-sided drinking fountain made from stone." },
    category: "building",
    location: { x: 51, y: 67 },
    cost: 50000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "szürke", en: "grey" },
    material: { hu: "terméskő", en: "stone" },
    dimensions: { widthCm: 75, heightCm: 120, depthCm: 60 },
    weightKg: 350,
    imagePath: "/objects/ivokut.jpg",
  },
  {
    id: "X9H2L3",
    name: { hu: "Kandeláber", en: "Candelabra" },
    description: { hu: "Bézsszínűre festett kandeláber, világítótesttel.", en: "Beige-painted candelabra with lighting fixture." },
    category: "object",
    location: { x: 41, y: 58 },
    cost: 32000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "bézs", en: "beige" },
    material: { hu: "fém", en: "metal" },
    dimensions: { widthCm: 15, heightCm: 320, depthCm: 15 },
    weightKg: 42,
    imagePath: "/objects/kandelaber.jpg",
  },
  {
    id: "Y5D8P4",
    name: { hu: "Lépcsős biztosítószekrény és hitéleti hely", en: "Staircase Safety Cabinet and Prayer Place" },
    description: { hu: "Elektromos hálózat apcsolószekrénye az árvízszint fölé helyezve beton posztamensen.", en: "Electrical panel placed above the flood level on a concrete post." },
    category: "building",
    location: { x: 39, y: 68.3 },
    cost: 120000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "szürke", en: "grey" },
    material: { hu: "beton", en: "concrete" },
    dimensions: { widthCm: 80, heightCm: 150, depthCm: 120 },
    weightKg: 480,
    imagePath: "/objects/lepcsos_biztosito_szekreny_es_hiteleti_hely.jpg",
  },
  {
    id: "Z7M1Q9",
    name: { hu: "Minigolf pálya", en: "Minigolf Course" },
    description: { hu: "3 domborból álló minigolf pálya.", en: "Minigolf course consisting of 3 mounds." },
    category: "building",
    location: { x: 37, y: 67 },
    cost: 210000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "vörösesbarna", en: "reddish-brown" },
    material: { hu: "beton + műanyag", en: "concrete + plastic coating" },
    dimensions: { widthCm: 75, heightCm: 330, depthCm: 15 },
    weightKg: 150,
    imagePath: "/objects/minigolf_palya.jpg",
  },
  {
    id: "A9K3F1",
    name: { hu: "Műanyag zsák", en: "Plastic Bag" },
    description: { hu: "Fehér színű műanyagzsák. Valószínűleg az árvíz elleni védekezéshez használták.", en: "White plastic bag. Likely used for flood protection." },
    category: "waste",
    location: { x: 42, y: 66 },
    cost: 10,
    costUnit: { hu: "Ft/db", en: "HUF/pcs" },
    color: { hu: "fehér", en: "white" },
    material: { hu: "műanyag", en: "plastic" },
    dimensions: { widthCm: 60, heightCm: 40, depthCm: 0.01 },
    weightKg: 0.1,
    imagePath: "/objects/muanyag_zsak.jpg",
  },
  {
    id: "B4L7C2",
    name: { hu: "Pad", en: "Bench" },
    description: { hu: "Beton támaszokra szerelt pad fa ülőkével.", en: "Bench mounted on concrete supports with wooden seats." },
    category: "object",
    location: { x: 60, y: 35 },
    cost: 25000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "fehér + vörös", en: "white + red" },
    material: { hu: "beton + fa", en: "concrete + wood" },
    dimensions: { widthCm: 200, heightCm: 70, depthCm: 45 },
    weightKg: 80,
    imagePath: "/objects/pad.jpg",
  },
  {
    id: "C8D1V6",
    name: { hu: "Plázsbútor", en: "Beach Furniture" },
    description: { hu: "Egy pad közepén fa oszlopra erősített csirkeháló, kör alakú fém abroncson.", en: "A bench with a chicken coop attached to a wooden pole, supported by a circular metal frame." },
    category: "object",
    location: { x: 61, y: 43 },
    cost: 16000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "vörös", en: "red" },
    material: { hu: "fa + fém + drót", en: "wood + metal + wire" },
    dimensions: { widthCm: 180, heightCm: 190, depthCm: 30 },
    weightKg: 27,
    imagePath: "/objects/plazsbutor.jpg",
  },
  {
    id: "R21VB3",
    name: { hu: "Pozdorja lap", en: "OSB Panel" },
    description: { hu: "Kékre mázolt pozdorja lap, valószínűleg egy ajtó része lehetett.", en: "Blue-painted OSB panel, likely a door part." },
    category: "waste",
    location: { x: 47.3, y: 66.5 },
    cost: 980,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "kék", en: "blue" },
    material: { hu: "fa", en: "wood" },
    dimensions: { widthCm: 28, heightCm: 28, depthCm: 0.8 },
    weightKg: 1,
    imagePath: "/objects/pozdorja_lap_g.png",
  },
  {
    id: "D6Q9H3",
    name: { hu: "Pózna", en: "Pole" },
    description: { hu: "Félbevágott villanypózna beton talppal.", en: "Half-cut electrical pole with concrete base." },
    category: "building",
    location: { x: 36, y: 52 },
    cost: 12000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "szürke + barna", en: "grey + brown" },
    material: { hu: "beton + fa", en: "concrete + wood" },
    dimensions: { widthCm: 50, heightCm: 210, depthCm: 35 },
    weightKg: 80,
    imagePath: "/objects/pozna.jpg",
  },
  {
    id: "E2M5K8",
    name: { hu: "Raklap", en: "Standard Pallet" },
    description: { hu: "Fa szabvány raklap.", en: "Standard wooden pallet." },
    category: "waste",
    location: { x: 61.3, y: 45 },
    cost: 1000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "barna", en: "brown" },
    material: { hu: "fa", en: "wood" },
    dimensions: { widthCm: 120, heightCm: 15, depthCm: 80 },
    weightKg: 15,
    imagePath: "/objects/raklap.jpg",
  },
  {
    id: "F7P1L9",
    name: { hu: "Kis stég", en: "Small Deck" },
    description: { hu: "Fa deszkákból készült kis stég.", en: "Small deck made of wooden planks." },
    category: "object",
    location: { x: 61.3, y: 54 },
    cost: 30000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "barna", en: "brown" },
    material: { hu: "fa", en: "wood" },
    dimensions: { widthCm: 150, heightCm: 20, depthCm: 250 },
    weightKg: 40,
    imagePath: "/objects/steg_kicsi.jpg",
  },
  {
    id: "G3H8D4",
    name: { hu: "Nagy stég", en: "Large Deck" },
    description: { hu: "Fa deszkákból készült nagy stég. A téglalap alakú stéghez kis rámpa vezet.", en: "Large deck made of wooden planks. A small ramp leads to the rectangular deck." },
    category: "object",
    location: { x: 61.6, y: 57 },
    cost: 60000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "barna", en: "brown" },
    material: { hu: "fa", en: "wood" },
    dimensions: { widthCm: 300, heightCm: 20, depthCm: 250 },
    weightKg: 80,
    imagePath: "/objects/steg_nagy.jpg",
  },
  {
    id: "H9L2S5",
    name: { hu: "Szellőző tégla", en: "Ventilated Brick" },
    description: { hu: "Szellőző tégla, amely lehetővé teszi a levegő áramlását az épületben.", en: "Ventilated brick that allows air circulation in the building." },
    category: "building",
    location: { x: 46.3, y: 67 },
    cost: 450,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "fehér", en: "white" },
    material: { hu: "kerámia", en: "ceramic" },
    dimensions: { widthCm: 30, heightCm: 30, depthCm: 10 },
    weightKg: 1.2,
    imagePath: "/objects/szellozotegla.jpg",
  },
  {
    id: "J5C9K1",
    name: { hu: "Szemetes", en: "Trash Can" },
    description: { hu: "Kültéri szemetes edény.", en: "Outdoor trash can." },
    category: "object",
    location: { x: 42, y: 33 },
    cost: 8000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "szürke", en: "gray" },
    material: { hu: "fém", en: "metal" },
    dimensions: { widthCm: 50, heightCm: 100, depthCm: 50 },
    weightKg: 8,
    imagePath: "/objects/szemetes.jpg",
  },
  {
    id: "K1M4V7",
    name: { hu: "Terelő bója", en: "Warning Barrier" },
    description: { hu: "Rikító narancssárga terelő bója, fényvisszaverő csíkkal.", en: "Warning barrier with a bright orange color and reflective strips." },
    category: "object",
    location: { x: 31, y: 34.5 },
    cost: 2800,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "narancssárga + fehér", en: "orange + white" },
    material: { hu: "műanyag", en: "plastic" },
    dimensions: { widthCm: 30, heightCm: 50, depthCm: 30 },
    weightKg: 0.8,
    imagePath: "/objects/terelo_boja.jpg",
  },
  {
    id: "L8P2H3",
    name: { hu: "Terméskő", en: "Natural Stone" },
    description: { hu: "Több darab természetes formájú terméskő.", en: "Multiple pieces of natural stone." },
    category: "waste",
    location: { x: 47, y: 74 },
    cost: 12,
    costUnit: { hu: "Ft/kg", en: "HUF/kg" },
    color: { hu: "szürke", en: "gray" },
    material: { hu: "kő", en: "stone" },
    dimensions: { widthCm: 80, heightCm: 40, depthCm: 50 },
    weightKg: 250,
    imagePath: "/objects/termesko.jpg",
  },
  {
    id: "M2D7Q9",
    name: { hu: "Tűzcsap", en: "Fire Hydrant" },
    description: { hu: "Szabvány tűzcsap piros színben.", en: "Standard fire hydrant in red color." },
    category: "object",
    location: { x: 49, y: 75 },
    cost: 15000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "piros", en: "red" },
    material: { hu: "fém", en: "metal" },
    dimensions: { widthCm: 20, heightCm: 50, depthCm: 20 },
    weightKg: 15,
    imagePath: "/objects/tuzcsap.jpg",
  },
  {
    id: "N6H1L4",
    name: { hu: "Ülőgarnitúra", en: "Seating Set" },
    description: { hu: "Fa deszkákból és oszlopokból készült egyszerű ülőgarnitúra.", en: "Simple seating set made from wooden planks and columns." },
    category: "building",
    location: { x: 61.3, y: 67 },
    cost: 20000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "barna", en: "brown" },
    material: { hu: "fa", en: "wood" },
    dimensions: { widthCm: 300, heightCm: 50, depthCm: 150 },
    weightKg: 40,
    imagePath: "/objects/ulogarnitura.jpg",
  },
  {
    id: "P3K9F6",
    name: { hu: "Üveglap", en: "Glass Panel" },
    description: { hu: "Sima üveglap, élei csiszoltak.", en: "Smooth glass panel, edges polished." },
    category: "waste",
    location: { x: 43, y: 51 },
    cost: 100,
    costUnit: { hu: "Ft/m2", en: "HUF/m2" },
    color: { hu: "átlátszó", en: "transparent" },
    material: { hu: "üveg", en: "glass" },
    dimensions: { widthCm: 0, heightCm: 0, depthCm: 0.5 },
    weightKg: 11,
    imagePath: "/objects/uveglap.jpg",
  },
  {
    id: "Q7M2D8",
    name: { hu: "Világítószerkezet", en: "Lighting Structure" },
    description: { hu: "LED reflektorból, fa lécből és ragasztószalagból készült világítószerkezet.", en: "Lighting structure made from LED reflectors, wooden planks and adhesive tape." },
    category: "object",
    location: { x: 58.5, y: 66.5 },
    cost: 5000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "barna", en: "brown" },
    material: { hu: "fa + fém + műanyag", en: "wood + metal + plastic" },
    dimensions: { widthCm: 30, heightCm: 20, depthCm: 4 },
    weightKg: 3,
    imagePath: "/objects/vilagitoszerkezet.jpg",
  },
  {
    id: "R9H4C1",
    name: { hu: "Vízcsap és edény", en: "Water Faucet and Basin" },
    description: { hu: "Szabvány kék vízcsap, alatta öntöttvas edény.", en: "Standard blue water faucet, underneath cast iron basin." },
    category: "object",
    location: { x: 40, y: 45 },
    cost: 7000,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "kék + szürke", en: "blue + grey" },
    material: { hu: "fém", en: "metal" },
    dimensions: { widthCm: 20, heightCm: 50, depthCm: 20 },
    weightKg: 10,
    imagePath: "/objects/vizcsap_es_edeny.jpg",
  },
  {
    id: "S3L8P5",
    name: { hu: "Vízköpő", en: "Gargoyle" },
    description: { hu: "Fóliabádog vízköpő.", en: "Tin gargoyle." },
    category: "building",
    location: { x: 49.4, y: 66.3 },
    cost: 2500,
    costUnit: { hu: "Ft", en: "HUF" },
    color: { hu: "szürke", en: "grey" },
    material: { hu: "fóliabádog", en: "tin" },
    dimensions: { widthCm: 55, heightCm: 25, depthCm: 1 },
    weightKg: 1,
    imagePath: "/objects/vizkopo.jpg",
  },
];

export const initialWebshopState: WebshopState = {
  cart: [],
  checkout: {
    step: "cart",
    form: {
      fullName: "",
      email: "",
      notes: "",
      addressLine: "",
      postalCode: "",
      city: "",
      consentToArtProject: false,
    },
  },
  theme: {
    mode: "light",
  },
  language: {
    current: "hu",
  },
};
