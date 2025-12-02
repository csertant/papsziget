export type TrashPaymentOption =
  | "trash"
  | "trees"
  | "construction_waste";

export interface PaymentOption {
  id: TrashPaymentOption;
  label: string; // Hungarian label shown to the user
  description: string; // Hungarian description
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "trash",
    label: "Szemét elszállítása",
    description:
      "Vállalom, hogy legalább 5 kilogramm hulladékot gyűjtök és elszállítok a szigetről.",
  },
  {
    id: "trees",
    label: "Faültetés",
    description:
      "Vállalom, hogy legalább 1 őshonos fát ültetek a kijelölt területen.",
  },
  {
    id: "construction_waste",
    label: "Építési hulladék elszállítása",
    description:
      "Vállalom, hogy legalább 100 kilogramm építési hulladékot elszállítom a szigetről.",
  },
];

export type ShippingMethod = "self_pickup" | "water_taxi" | "delivery_agency";

export interface ShippingOption {
  id: ShippingMethod;
  label: string;
  description: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "self_pickup",
    label: "Személyes átvétel",
    description: "Saját magam viszem el a tárgyakat a Papszigetről.",
  },
  {
    id: "water_taxi",
    label: "Vízi taxi",
    description: "Hajóval viszem el a tárgyakat, saját szervezésben.",
  },
  {
    id: "delivery_agency",
    label: "Futárszolgálat",
    description: "Helyi szállítócég segítségével juttatom el a tárgyakat a választott címre.",
  },
];

export type ObjectId = string; // 6 character alphanumeric, e.g. "A3F9Z1"

export type ObjectCategory = "tárgy" | "építmény" | "hulladék";

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
  name: string;
  description: string;
  category: ObjectCategory;
  location: MapCoordinate;
  cost: number;
  costUnit: string;
  color: string;
  material: string;
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
  | "adatok"
  | "szallitas"
  | "fizetes"
  | "osszegzes"
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

export interface WebshopState {
  cart: CartItem[];
  checkout: CheckoutState;
  theme: ThemeState;
}

// Generated from files in /public/objects. You can later fill in
// description, category, cost, material, dimensions, and weightKg.
export const initialObjects: IslandObject[] = [
  {
    id: "A3F9Z1",
    name: "Acél kábel",
    description: "Három eres acél kábel köteg. Néhol hozzá van erősítve egy szigeteletlen acél kábel is, ami valószínűleg földelővezeték lehetett.",
    category: "tárgy",
    location: { x: 48, y: 64 },
    cost: 5600,
    costUnit: "Ft",
    color: "fekete",
    material: "acél sodrony + műanyag burkolat",
    dimensions: { widthCm: 1200, heightCm: 1.5, depthCm: 0 },
    weightKg: 5,
    imagePath: "/objects/acel_kabel.jpg",
  },
  {
    id: "B7K2M9",
    name: "Ajtólakk",
    description: "Pergő ajtólakk, kék színben.",
    category: "hulladék",
    location: { x: 48, y: 66 },
    cost: 150,
    costUnit: "Ft/m2",
    color: "királykék",
    material: "",
    dimensions: { widthCm: 0, heightCm: 0, depthCm: 0.03 },
    weightKg: 10,
    imagePath: "/objects/ajtolakk.jpg",
  },
  {
    id: "C1D8Q4",
    name: "Beton elem",
    description: "Négyzet alakú beton elem, üreges.",
    category: "tárgy",
    location: { x: 37.2, y: 37.5 },
    cost: 3500,
    costUnit: "Ft",
    color: "szürke",
    material: "beton",
    dimensions: { widthCm: 60, heightCm: 25, depthCm: 60 },
    weightKg: 45,
    imagePath: "/objects/beton_elem.jpg",
  },
  {
    id: "D9L4S2",
    name: "Beton járólap",
    description: "Egyszerű beton járólap.",
    category: "hulladék",
    location: { x: 46.8, y: 64.8 },
    cost: 120,
    costUnit: "Ft/db",
    color: "szürke",
    material: "beton",
    dimensions: { widthCm: 30, heightCm: 5, depthCm: 30 },
    weightKg: 10,
    imagePath: "/objects/beton_jarolap.jpg",
  },
  {
    id: "E5R7P1",
    name: "Beton kerti garnitúra",
    description: "2 U alakú beton pad és egy négyszögletes beton asztal.",
    category: "építmény",
    location: { x: 36, y: 64 },
    cost: 149000,
    costUnit: "Ft",
    color: "szürke",
    material: "beton",
    dimensions: { widthCm: 350, heightCm: 80, depthCm: 220 },
    weightKg: 1050,
    imagePath: "/objects/beton_kerti_garnitura.jpg",
  },
  {
    id: "F6Q3N8",
    name: "Beton kocka",
    description: "Beton kocka, közepén acél rúd csonkkal.",
    category: "hulladék",
    location: { x: 35, y: 56 },
    cost: 1500,
    costUnit: "Ft",
    color: "szürke",
    material: "beton",
    dimensions: { widthCm: 60, heightCm: 60, depthCm: 60 },
    weightKg: 50,
    imagePath: "/objects/beton_kocka.jpg",
  },
  {
    id: "G2M9V4",
    name: "Beton villanyoszlop",
    description: "Középfeszültségű hálózat vasalt beton oszlopa.",
    category: "építmény",
    location: { x: 40, y: 33 },
    cost: 22000,
    costUnit: "Ft",
    color: "szürke",
    material: "beton",
    dimensions: { widthCm: 35, heightCm: 600, depthCm: 35 },
    weightKg: 750,
    imagePath: "/objects/beton_villanyoszlop.jpg",
  },
  {
    id: "H1X7K5",
    name: "Betontörmelék (kitermelendő)",
    description: "Az egykori uszoda egyik medencéje bontásából származó betontörmelék.",
    category: "hulladék",
    location: { x: 54, y: 60 },
    cost: 100,
    costUnit: "Ft/kg",
    color: "szürke",
    material: "beton",
    dimensions: { widthCm: 0, heightCm: 0, depthCm: 15 },
    weightKg: 12000,
    imagePath: "/objects/betontormelek_kitermelendo.jpg",
  },
  {
    id: "J4C6D9",
    name: "Fa kerítésoszlop",
    description: "Vörösre lakkozott fa kerítésoszlop a kemping területén.",
    category: "építmény",
    location: { x: 58.2, y: 22.5 },
    cost: 5490,
    costUnit: "Ft/db",
    color: "téglavörös",
    material: "fa",
    dimensions: { widthCm: 15, heightCm: 200, depthCm: 15 },
    weightKg: 13,
    imagePath: "/objects/fa_keritesoszlop.jpg",
  },
  {
    id: "K8P2L7",
    name: "Fém állvány",
    description: "Ismeretlen rendeltetésű fém állvány.",
    category: "tárgy",
    location: { x: 46.5, y: 62 },
    cost: 29000,
    costUnit: "Ft",
    color: "fehér",
    material: "fém",
    dimensions: { widthCm: 150, heightCm: 200, depthCm: 60 },
    weightKg: 39,
    imagePath: "/objects/fem_allvany.jpg",
  },
  {
    id: "L3Z9A2",
    name: "Fém kerítéselem",
    description: "Zöldre lakkozott fém kerítéselem. Valószínűleg egy kapuhoz tartozott.",
    category: "tárgy",
    location: { x: 48.3, y: 68 },
    cost: 10000,
    costUnit: "Ft",
    color: "zöld",
    material: "fém",
    dimensions: { widthCm: 140, heightCm: 190, depthCm: 3 },
    weightKg: 27,
    imagePath: "/objects/fem_kerites_elem.jpg",
  },
  {
    id: "M7N1R6",
    name: "Fém kerítéselem (hosszú)",
    description: "Zöldre lakkozott hosszú fém kerítéselem. Valószínűleg egy kapuhoz tartozott.",
    category: "tárgy",
    location: { x: 49.5, y: 63 },
    cost: 30000,
    costUnit: "Ft",
    color: "zöld",
    material: "fém",
    dimensions: { widthCm: 480, heightCm: 190, depthCm: 3 },
    weightKg: 62,
    imagePath: "/objects/fem_kerites_elem_hosszu.jpg",
  },
  {
    id: "N5V8E3",
    name: "Fém kerítéskapu",
    description: "Zöldre lakkozott fém kerítéskapu a csónakház hátsó bejáratáról.",
    category: "tárgy",
    location: { x: 57.6, y: 53 },
    cost: 26000,
    costUnit: "Ft",
    color: "zöld",
    material: "fém",
    dimensions: { widthCm: 340, heightCm: 190, depthCm: 3 },
    weightKg: 32,
    imagePath: "/objects/fem_kerites_kapu.jpg",
  },
  {
    id: "P2H6Q8",
    name: "Fém kerítésoszlop (sarok)",
    description: "Zöldre lakkozott fém kerítésoszlop a kerítés sarkán.",
    category: "tárgy",
    location: { x: 52, y: 68 },
    cost: 8000,
    costUnit: "Ft",
    color: "zöld",
    material: "fém",
    dimensions: { widthCm: 5, heightCm: 300, depthCm: 5 },
    weightKg: 14,
    imagePath: "/objects/fem_kerites_oszlop_sarok.jpg",
  },
  {
    id: "Q9D3S4",
    name: "Fém pózna",
    description: "Zöldre festett fém pózna, valószínűleg világításhoz.",
    category: "tárgy",
    location: { x: 52.2, y: 63.1 },
    cost: 18000,
    costUnit: "Ft",
    color: "zöld",
    material: "fém",
    dimensions: { widthCm: 8, heightCm: 350, depthCm: 8 },
    weightKg: 18,
    imagePath: "/objects/fem_pozna.jpg",
  },
  {
    id: "R1K8B7",
    name: "Hangulatvilágítás",
    description: "Glóbuszt imitáló hangulatvilágítás LED izzókkal.",
    category: "tárgy",
    location: { x: 39, y: 56 },
    cost: 3750,
    costUnit: "Ft",
    color: "fekete",
    material: "műanyag",
    dimensions: { widthCm: 12, heightCm: 65, depthCm: 12 },
    weightKg: 2,
    imagePath: "/objects/hangulatvilagitas.jpg",
  },
  {
    id: "S8L2C9",
    name: "Hirdetőtábla",
    description: "Fehérre festett fém hirdetőtábla, fém tartókonzollal.",
    category: "tárgy",
    location: { x: 39.2, y: 39.5 },
    cost: 21500,
    costUnit: "Ft",
    color: "fehér",
    material: "fém",
    dimensions: { widthCm: 70, heightCm: 185, depthCm: 6 },
    weightKg: 19,
    imagePath: "/objects/hirdetotabla.jpg",
  },
  {
    id: "T4E7M1",
    name: "Hőszigetelés",
    description: "Szálas hőszigetelő anyag.",
    category: "hulladék",
    location: { x: 49.6, y: 64.5 },
    cost: 500,
    costUnit: "Ft/m3",
    color: "sárga",
    material: "kőzetgyapot",
    dimensions: { widthCm: 0, heightCm: 0, depthCm: 10 },
    weightKg: 2100,
    imagePath: "/objects/hoszigeteles.jpg",
  },
  {
    id: "U6P9F1",
    name: "Hullámlemez darab",
    description: "Üvegszál erősítésű epoxi gyantából készült hullámlemez tetőfedés egy darabja.",
    category: "hulladék",
    location: { x: 47.9, y: 65.2 },
    cost: 700,
    costUnit: "Ft",
    color: "áttetsző sárga",
    material: "üvegszál + epoxi",
    dimensions: { widthCm: 25, heightCm: 16, depthCm: 6 },
    weightKg: 0.2,
    imagePath: "/objects/hullamlemez_darab_g.png",
  },
  {
    id: "U6P9F2",
    name: "Hullámlemez fedés",
    description: "Üvegszál erősítésű epoxi gyantából készült hullámlemez tetőfedés.",
    category: "építmény",
    location: { x: 49.4, y: 65.2 },
    cost: 1500,
    costUnit: "Ft/m2",
    color: "áttetsző sárga",
    material: "üvegszál + epoxi",
    dimensions: { widthCm: 0, heightCm: 0, depthCm: 6 },
    weightKg: 1970,
    imagePath: "/objects/hullamlemez_fedes.jpg",
  },
  {
    id: "V3N5H8",
    name: "I-tartó",
    description: "Acélból készült I-tartó szerkezet.",
    category: "építmény",
    location: { x: 46.5, y: 63 },
    cost: 12000,
    costUnit: "Ft/m",
    color: "szürke",
    material: "acél",
    dimensions: { widthCm: 12, heightCm: 18, depthCm: 300 },
    weightKg: 85,
    imagePath: "/objects/i_tarto.jpg",
  },
  {
    id: "W1C4K6",
    name: "Ivókút",
    description: "Terméskőből készült kétoldalú ivókút.",
    category: "építmény",
    location: { x: 51, y: 67 },
    cost: 50000,
    costUnit: "Ft",
    color: "szürke",
    material: "terméskő",
    dimensions: { widthCm: 75, heightCm: 120, depthCm: 60 },
    weightKg: 350,
    imagePath: "/objects/ivokut.jpg",
  },
  {
    id: "X9H2L3",
    name: "Kandeláber",
    description: "Bézsszínűre festett kandeláber világítótesttel.",
    category: "tárgy",
    location: { x: 41, y: 58 },
    cost: 32000,
    costUnit: "Ft",
    color: "bézs",
    material: "fém",
    dimensions: { widthCm: 15, heightCm: 320, depthCm: 15 },
    weightKg: 42,
    imagePath: "/objects/kandelaber.jpg",
  },
  {
    id: "Y5D8P4",
    name: "Lépcsős biztosítószekrény és hitéleti hely",
    description: "Áramhálózati kapcsolószekrény az árvízszint fölé helyezve beton posztamensen, 3 lépcsőfokkal megközelíthető módon.",
    category: "építmény",
    location: { x: 39, y: 68.3 },
    cost: 120000,
    costUnit: "Ft",
    color: "szürke",
    material: "beton",
    dimensions: { widthCm: 80, heightCm: 150, depthCm: 120 },
    weightKg: 480,
    imagePath: "/objects/lepcsos_biztosito_szekreny_es_hiteleti_hely.jpg",
  },
  {
    id: "Z7M1Q9",
    name: "Minigolf pálya",
    description: "3 domborból álló minigolf pálya műanyag szegéllyel.",
    category: "építmény",
    location: { x: 37, y: 67 },
    cost: 210000,
    costUnit: "Ft",
    color: "vörösesbarna",
    material: "beton + műanyag",
    dimensions: { widthCm: 75, heightCm: 330, depthCm: 15 },
    weightKg: 150,
    imagePath: "/objects/minigolf_palya.jpg",
  },
  {
    id: "A9K3F1",
    name: "Műanyag zsák",
    description: "Fehér színű műanyagzsák. Valószínűleg az árvíz elleni védekezéshez használták.",
    category: "hulladék",
    location: { x: 42, y: 66 },
    cost: 10,
    costUnit: "Ft/db",
    color: "fehér",
    material: "műanyag",
    dimensions: { widthCm: 60, heightCm: 40, depthCm: 0.01 },
    weightKg: 0.1,
    imagePath: "/objects/muanyag_zsak.jpg",
  },
  {
    id: "B4L7C2",
    name: "Pad",
    description: "Fehérre festett beton támaszokon nyugvó fa pad. A fa részek vörösre vannak festve.",
    category: "tárgy",
    location: { x: 60, y: 35 },
    cost: 25000,
    costUnit: "Ft",
    color: "fehér + vörös",
    material: "beton + fa",
    dimensions: { widthCm: 200, heightCm: 70, depthCm: 45 },
    weightKg: 80,
    imagePath: "/objects/pad.jpg",
  },
  {
    id: "C8D1V6",
    name: "Plázsbútor",
    description: "Egy pad közepén fa oszlopra erősített csirkeháló, kör alakú fém abroncson.",
    category: "tárgy",
    location: { x: 61, y: 43 },
    cost: 16000,
    costUnit: "Ft",
    color: "vörös",
    material: "fa + fém + drót",
    dimensions: { widthCm: 180, heightCm: 190, depthCm: 30 },
    weightKg: 27,
    imagePath: "/objects/plazsbutor.jpg",
  },
  {
    id: "R21VB3",
    name: "Pozdorja lap",
    description: "Kékre mázolt pozdorja lap, valószínűleg ajtó része lehetett.",
    category: "hulladék",
    location: { x: 47.3, y: 66.5 },
    cost: 980,
    costUnit: "Ft",
    color: "kék",
    material: "fa",
    dimensions: { widthCm: 28, heightCm: 28, depthCm: 0.8 },
    weightKg: 1,
    imagePath: "/objects/pozdorja_lap_g.png",
  },
  {
    id: "D6Q9H3",
    name: "Pózna",
    description: "Félbevágott villanypózna beton talppal.",
    category: "építmény",
    location: { x: 36, y: 52 },
    cost: 12000,
    costUnit: "Ft",
    color: "szürke + barna",
    material: "beton + fa",
    dimensions: { widthCm: 50, heightCm: 210, depthCm: 35 },
    weightKg: 80,
    imagePath: "/objects/pozna.jpg",
  },
  {
    id: "E2M5K8",
    name: "Raklap",
    description: "Fa szabvány raklap.",
    category: "hulladék",
    location: { x: 61.3, y: 45 },
    cost: 1000,
    costUnit: "Ft",
    color: "barna",
    material: "fa",
    dimensions: { widthCm: 120, heightCm: 15, depthCm: 80 },
    weightKg: 15,
    imagePath: "/objects/raklap.jpg",
  },
  {
    id: "F7P1L9",
    name: "Kis stég",
    description: "Fa deszkákból készült kis stég.",
    category: "tárgy",
    location: { x: 61.3, y: 54 },
    cost: 30000,
    costUnit: "Ft",
    color: "barna",
    material: "fa",
    dimensions: { widthCm: 150, heightCm: 20, depthCm: 250 },
    weightKg: 40,
    imagePath: "/objects/steg_kicsi.jpg",
  },
  {
    id: "G3H8D4",
    name: "Nagy stég",
    description: "Fa deszkákból készült nagy stég. Téglalap alakú stéghez kis rámpa vezet.",
    category: "tárgy",
    location: { x: 61.6, y: 57 },
    cost: 60000,
    costUnit: "Ft",
    color: "barna",
    material: "fa",
    dimensions: { widthCm: 300, heightCm: 20, depthCm: 250 },
    weightKg: 80,
    imagePath: "/objects/steg_nagy.jpg",
  },
  {
    id: "H9L2S5",
    name: "Szellőző tégla",
    description: "Szellőző tégla, amely lehetővé teszi a levegő áramlását az épületben.",
    category: "építmény",
    location: { x: 46.3, y: 67 },
    cost: 450,
    costUnit: "Ft",
    color: "fehér",
    material: "kerámia",
    dimensions: { widthCm: 30, heightCm: 30, depthCm: 10 },
    weightKg: 1.2,
    imagePath: "/objects/szellozotegla.jpg",
  },
  {
    id: "J5C9K1",
    name: "Szemetes",
    description: "Kültéri szemetes edény.",
    category: "tárgy",
    location: { x: 42, y: 33 },
    cost: 8000,
    costUnit: "Ft",
    color: "szürke",
    material: "fém",
    dimensions: { widthCm: 50, heightCm: 100, depthCm: 50 },
    weightKg: 8,
    imagePath: "/objects/szemetes.jpg",
  },
  {
    id: "K1M4V7",
    name: "Terelő bója",
    description: "Rikító narancssárga terelő bója, fehér csíkkal.",
    category: "tárgy",
    location: { x: 31, y: 34.5 },
    cost: 2800,
    costUnit: "Ft",
    color: "narancssárga + fehér",
    material: "műanyag",
    dimensions: { widthCm: 30, heightCm: 50, depthCm: 30 },
    weightKg: 0.8,
    imagePath: "/objects/terelo_boja.jpg",
  },
  {
    id: "L8P2H3",
    name: "Terméskő",
    description: "Több darab természetes formájú terméskő.",
    category: "hulladék",
    location: { x: 47, y: 74 },
    cost: 12,
    costUnit: "Ft/kg",
    color: "szürke",
    material: "kő",
    dimensions: { widthCm: 80, heightCm: 40, depthCm: 50 },
    weightKg: 250,
    imagePath: "/objects/termesko.jpg",
  },
  {
    id: "M2D7Q9",
    name: "Tűzcsap",
    description: "Szabvány tűzcsap piros színben.",
    category: "tárgy",
    location: { x: 49, y: 75 },
    cost: 15000,
    costUnit: "Ft",
    color: "piros",
    material: "fém",
    dimensions: { widthCm: 20, heightCm: 50, depthCm: 20 },
    weightKg: 15,
    imagePath: "/objects/tuzcsap.jpg",
  },
  {
    id: "N6H1L4",
    name: "Ülőgarnitúra",
    description: "Fa deszkákból és oszlopokból készült egyszerű ülőgarnitúra.",
    category: "építmény",
    location: { x: 61.3, y: 67 },
    cost: 20000,
    costUnit: "Ft",
    color: "barna",
    material: "fa",
    dimensions: { widthCm: 300, heightCm: 50, depthCm: 150 },
    weightKg: 40,
    imagePath: "/objects/ulogarnitura.jpg",
  },
  {
    id: "P3K9F6",
    name: "Üveglap",
    description: "Sima üveglap, élei csiszoltak.",
    category: "hulladék",
    location: { x: 43, y: 51 },
    cost: 100,
    costUnit: "Ft/m2",
    color: "átlátszó",
    material: "üveg",
    dimensions: { widthCm: 0, heightCm: 0, depthCm: 0.5 },
    weightKg: 11,
    imagePath: "/objects/uveglap.jpg",
  },
  {
    id: "Q7M2D8",
    name: "Világítószerkezet",
    description: "LED reflektorból, fa lécből és ragasztószalagból készült világítószerkezet.",
    category: "tárgy",
    location: { x: 58.5, y: 66.5 },
    cost: 5000,
    costUnit: "Ft",
    color: "barna",
    material: "fa + fém + műanyag",
    dimensions: { widthCm: 30, heightCm: 20, depthCm: 4 },
    weightKg: 3,
    imagePath: "/objects/vilagitoszerkezet.jpg",
  },
  {
    id: "R9H4C1",
    name: "Vízcsap és edény",
    description: "Szabvány kék vízcsap és egy öntöttvas edény alatta.",
    category: "tárgy",
    location: { x: 40, y: 45 },
    cost: 7000,
    costUnit: "Ft",
    color: "kék + szürke",
    material: "fém",
    dimensions: { widthCm: 20, heightCm: 50, depthCm: 20 },
    weightKg: 10,
    imagePath: "/objects/vizcsap_es_edeny.jpg",
  },
  {
    id: "S3L8P5",
    name: "Vízköpő",
    description: "Fóliabádog vízköpő.",
    category: "építmény",
    location: { x: 49.4, y: 66.3 },
    cost: 2500,
    costUnit: "Ft",
    color: "szürke",
    material: "fóliabádog",
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
};
