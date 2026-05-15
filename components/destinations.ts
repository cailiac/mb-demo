export interface Destination {
  lat: number;
  lng: number;
  label: string;
  emoji: string;
  desc: string;
  region: string;
}

export const DESTINATIONS: Record<string, Destination> = {
  // Middle East
  "Dubai":        { lat:25.20, lng:55.27,  label:"Dubai",         emoji:"🏙️", desc:"Luxury, desert & modern marvels",          region:"Middle East" },
  "Abu Dhabi":    { lat:24.45, lng:54.37,  label:"Abu Dhabi",     emoji:"🕌", desc:"Grand Mosque, F1 & Yas Island",             region:"Middle East" },
  // Indian Ocean
  "Maldives":     { lat:3.20,  lng:73.22,  label:"Maldives",      emoji:"🏝️", desc:"Crystal waters & overwater villas",         region:"Indian Ocean" },
  "Mauritius":    { lat:-20.34,lng:57.55,  label:"Mauritius",     emoji:"🌺", desc:"Lagoons, sugar cane fields & luxury resorts",region:"Indian Ocean" },
  // Asia
  "Sri Lanka":    { lat:7.87,  lng:80.77,  label:"Sri Lanka",     emoji:"🌿", desc:"Ancient temples & lush landscapes",          region:"Asia" },
  "Bali":         { lat:-8.34, lng:115.09, label:"Bali",          emoji:"🌸", desc:"Spirituality, rice terraces & surf",         region:"Asia" },
  "Phuket":       { lat:7.88,  lng:98.38,  label:"Phuket",        emoji:"🏖️", desc:"Tropical beaches & vibrant nightlife",       region:"Asia" },
  "Singapore":    { lat:1.35,  lng:103.82, label:"Singapore",     emoji:"🦁", desc:"Iconic city-state of food & architecture",   region:"Asia" },
  "Tokyo":        { lat:35.68, lng:139.69, label:"Tokyo",         emoji:"🗼", desc:"Neon lights, sushi & ancient temples",       region:"Asia" },
  "Kyoto":        { lat:35.01, lng:135.76, label:"Kyoto",         emoji:"⛩️", desc:"Geishas, bamboo forests & Zen gardens",      region:"Asia" },
  "Osaka":        { lat:34.69, lng:135.50, label:"Osaka",         emoji:"🍜", desc:"Street food, castles & vibrant nightlife",   region:"Asia" },
  "Hakone":       { lat:35.23, lng:139.10, label:"Hakone",        emoji:"🗻", desc:"Views of Fuji, hot springs & ryokans",       region:"Asia" },
  "Hanoi":        { lat:21.03, lng:105.85, label:"Hanoi",         emoji:"🛵", desc:"Street food, lakes & French colonial charm", region:"Asia" },
  "Helsinki":     { lat:60.17, lng:24.94,  label:"Helsinki",      emoji:"🌌", desc:"Northern lights, saunas & design culture",   region:"Europe" },
  // Europe
  "Florence":     { lat:43.77, lng:11.25,  label:"Florence",      emoji:"🎨", desc:"Renaissance art, Duomo & Tuscan cuisine",    region:"Europe" },
  "Pisa":         { lat:43.72, lng:10.40,  label:"Pisa",          emoji:"🏛️", desc:"Leaning Tower & medieval square",            region:"Europe" },
  "Rome":         { lat:41.90, lng:12.50,  label:"Rome",          emoji:"🏺", desc:"Colosseum, Vatican & la dolce vita",          region:"Europe" },
  "Dubrovnik":    { lat:42.65, lng:18.09,  label:"Dubrovnik",     emoji:"🌊", desc:"Old City walls & Adriatic crystal waters",   region:"Europe" },
  "Crete":        { lat:35.24, lng:24.81,  label:"Crete",         emoji:"🫒", desc:"Minoan ruins, gorges & turquoise beaches",   region:"Europe" },
  "Mykonos":      { lat:37.44, lng:25.33,  label:"Mykonos",       emoji:"🌅", desc:"Windmills, whitewashed streets & party beach",region:"Europe" },
  "Lisbon":       { lat:38.72, lng:-9.14,  label:"Lisbon",        emoji:"🎶", desc:"Fado music, trams & pastel de nata",         region:"Europe" },
  // Americas
  "New York":     { lat:40.71, lng:-74.01, label:"New York",      emoji:"🗽", desc:"The city that never sleeps",                 region:"Americas" },
  "Cancún":       { lat:21.16, lng:-86.85, label:"Cancún",        emoji:"🌮", desc:"Caribbean beaches, cenotes & Mayan ruins",  region:"Americas" },
  "Buenos Aires": { lat:-34.60,lng:-58.38, label:"Buenos Aires",  emoji:"🥩", desc:"Tango, steak & European elegance",           region:"Americas" },
  // Africa
  "Cape Town":    { lat:-33.93,lng:18.42,  label:"Cape Town",     emoji:"🦁", desc:"Table Mountain, vineyards & penguins",       region:"Africa" },
};
