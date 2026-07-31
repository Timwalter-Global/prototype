// Voorbeelddata – Audience Platform wireframe (fictief, deterministisch gegenereerd)
let _s = 4242;
const R = () => (_s = (_s * 16807) % 2147483647) / 2147483647;

export const PROVINCIES = ["Groningen","Friesland","Drenthe","Overijssel","Flevoland","Gelderland","Utrecht","Noord-Holland","Zuid-Holland","Zeeland","Noord-Brabant","Limburg"];

export const CITIES = [
  {n:"Amsterdam",p:"Noord-Holland",lat:52.3728,lng:4.8936,inw:873,pc:1012,obj:10},
  {n:"Rotterdam",p:"Zuid-Holland",lat:51.9225,lng:4.4792,inw:651,pc:3011,obj:9},
  {n:"Den Haag",p:"Zuid-Holland",lat:52.0705,lng:4.3007,inw:548,pc:2511,obj:8},
  {n:"Utrecht",p:"Utrecht",lat:52.0907,lng:5.1214,inw:361,pc:3511,obj:8},
  {n:"Eindhoven",p:"Noord-Brabant",lat:51.4416,lng:5.4697,inw:238,pc:5611,obj:7},
  {n:"Groningen",p:"Groningen",lat:53.2194,lng:6.5665,inw:233,pc:9711,obj:6},
  {n:"Tilburg",p:"Noord-Brabant",lat:51.5606,lng:5.0919,inw:224,pc:5011,obj:5},
  {n:"Almere",p:"Flevoland",lat:52.3508,lng:5.2647,inw:218,pc:1315,obj:5},
  {n:"Breda",p:"Noord-Brabant",lat:51.5719,lng:4.7683,inw:184,pc:4811,obj:5},
  {n:"Nijmegen",p:"Gelderland",lat:51.8126,lng:5.8372,inw:179,pc:6511,obj:5},
  {n:"Apeldoorn",p:"Gelderland",lat:52.2112,lng:5.9699,inw:165,pc:7311,obj:4},
  {n:"Arnhem",p:"Gelderland",lat:51.9851,lng:5.8987,inw:164,pc:6811,obj:4},
  {n:"Haarlem",p:"Noord-Holland",lat:52.3874,lng:4.6462,inw:162,pc:2011,obj:4},
  {n:"Enschede",p:"Overijssel",lat:52.2215,lng:6.8937,inw:160,pc:7511,obj:4},
  {n:"Amersfoort",p:"Utrecht",lat:52.1561,lng:5.3878,inw:158,pc:3811,obj:4},
  {n:"Den Bosch",p:"Noord-Brabant",lat:51.6978,lng:5.3037,inw:156,pc:5211,obj:4},
  {n:"Zwolle",p:"Overijssel",lat:52.5168,lng:6.0830,inw:131,pc:8011,obj:4},
  {n:"Leiden",p:"Zuid-Holland",lat:52.1601,lng:4.4970,inw:125,pc:2311,obj:3},
  {n:"Leeuwarden",p:"Friesland",lat:53.2012,lng:5.7999,inw:124,pc:8911,obj:3},
  {n:"Maastricht",p:"Limburg",lat:50.8514,lng:5.6910,inw:120,pc:6211,obj:3},
  {n:"Dordrecht",p:"Zuid-Holland",lat:51.8133,lng:4.6901,inw:119,pc:3311,obj:3},
  {n:"Alkmaar",p:"Noord-Holland",lat:52.6324,lng:4.7534,inw:110,pc:1811,obj:3},
  {n:"Emmen",p:"Drenthe",lat:52.7850,lng:6.8976,inw:107,pc:7811,obj:3},
  {n:"Venlo",p:"Limburg",lat:51.3704,lng:6.1724,inw:102,pc:5911,obj:3},
  {n:"Delft",p:"Zuid-Holland",lat:52.0116,lng:4.3571,inw:104,pc:2611,obj:3},
  {n:"Deventer",p:"Overijssel",lat:52.2660,lng:6.1552,inw:101,pc:7411,obj:3},
  {n:"Hilversum",p:"Noord-Holland",lat:52.2292,lng:5.1669,inw:91,pc:1211,obj:3},
  {n:"Middelburg",p:"Zeeland",lat:51.4988,lng:3.6136,inw:49,pc:4331,obj:2},
  {n:"Assen",p:"Drenthe",lat:52.9929,lng:6.5642,inw:69,pc:9401,obj:2}
];

export const FAMILIES = ["Analoog","Digitaal"];

export const NETWERKEN = [
  {id:"abri",naam:"Abri's (gemeenten)",fam:"Analoog",color:"#195AA6",w:4,types:[["Abri","2 m²"],["Europanel","2 m²"]]},
  {id:"winkelcentra",naam:"Winkelcentra",fam:"Digitaal",color:"#E28413",w:2,types:[["Digitaal scherm","75″"]]},
  {id:"snelwegmasten",naam:"Snelwegen",fam:"Digitaal",color:"#D64550",w:1,types:[["Mast","36 m²"],["Mast","48 m²"]]},
  {id:"tankstations",naam:"Tankstations",fam:"Digitaal",color:"#7B5EA7",w:1,merken:["Shell","Esso","BP","Overig"],types:[["Digitaal scherm","55″"]]},
  {id:"supermarkten",naam:"Supermarkten",fam:"Digitaal",color:"#2E9E5B",w:2,merken:["AH","Jumbo","Plus","Coop","Overig"],types:[["Digitaal scherm","43″"]]},
  {id:"retail-hema",naam:"Retail – HEMA",fam:"Digitaal",color:"#C94F7C",w:1,types:[["Digitaal scherm","32″"]]},
  {id:"retail-kruidvat",naam:"Retail – Kruidvat",fam:"Digitaal",color:"#12A5A5",w:1,types:[["Digitaal scherm","32″"]]},
  {id:"retail-overig",naam:"Retail – Overig",fam:"Digitaal",color:"#B08A3E",w:1,types:[["Digitaal scherm","32″"]]}
];

const NW_PICK = NETWERKEN.flatMap(n => Array(n.w).fill(n));

const STRATEN = ["Stationsplein","Marktstraat","Hoofdstraat","Kerkplein","Nieuwendijk","Beursplein","Julianalaan","Wilhelminaplein","Ringbaan","Stadsring"];

export const OBJECTS = [];
let idn = 10240;
for (const c of CITIES) {
  for (let i = 0; i < c.obj; i++) {
    const nw = NW_PICK[Math.floor(R() * NW_PICK.length)];
    const t = nw.types[Math.floor(R() * nw.types.length)];
    OBJECTS.push({
      id: "GL-" + (idn += 7),
      lat: +(c.lat + (R() - .5) * .16).toFixed(4),
      lng: +(c.lng + (R() - .5) * .22).toFixed(4),
      netwerk: nw.naam, nwId: nw.id, fam: nw.fam, color: nw.color,
      type: t[0], grootte: t[1],
      gemeente: c.n, provincie: c.p,
      pc4: String(c.pc + Math.floor(R() * 60)),
      postcode: String(c.pc + Math.floor(R() * 60)) + " " + String.fromCharCode(65 + Math.floor(R() * 26)) + String.fromCharCode(65 + Math.floor(R() * 26)),
      adres: STRATEN[Math.floor(R() * STRATEN.length)] + " " + (1 + Math.floor(R() * 140)) + ", " + c.n,
      hh: 1500 + Math.floor(R() * 8000),
      contacten: 8000 + Math.floor(R() * 92000),
      vlakken: R() > .6 ? 2 : 1,
      merk: nw.merken ? nw.merken[Math.floor(R() * nw.merken.length)] : null,
      tech: nw.id === "abri" ? (R() > .85 ? "Scroller" : "Analoog") : "Digitaal",
      bro: R() > .12
    });
  }
}

export const BRO_DOELGROEPEN = [
  {id:"boodschappers",naam:"Boodschappers",pct:31,kenmerk:"doen meerdere keren per week boodschappen en zijn sterk aanwezig rond supermarkten en winkelcentra"},
  {id:"forenzen",naam:"Forenzen",pct:24,kenmerk:"reizen dagelijks tussen huis en werk en passeren vaste punten rond stations en invalswegen"},
  {id:"automobilisten",naam:"Automobilisten",pct:46,kenmerk:"leggen veel kilometers af en zijn goed bereikbaar via snelwegmasten en tankstations"},
  {id:"jongeren",naam:"Jongeren 18–24",pct:11,kenmerk:"zijn vaak onderweg in stedelijk gebied en gevoelig voor actuele, snelle boodschappen"},
  {id:"studenten",naam:"Studenten",pct:8,kenmerk:"bewegen zich rond onderwijslocaties, OV-knooppunten en binnensteden"},
  {id:"young-professionals",naam:"Young professionals",pct:14,kenmerk:"combineren werk en sociaal leven in de stad en zijn digitaal georiënteerd"},
  {id:"jonge-gezinnen",naam:"Jonge gezinnen",pct:16,kenmerk:"doen gezinsboodschappen en bezoeken winkelcentra vooral in de weekenden"},
  {id:"gezinnen-tieners",naam:"Gezinnen met tieners",pct:13,kenmerk:"hebben een hoge bestedingsdruk en een breed boodschappenpatroon"},
  {id:"empty-nesters",naam:"Empty nesters",pct:15,kenmerk:"hebben meer vrije tijd en besteden bovengemiddeld aan uitstapjes en retail"},
  {id:"welvarende-senioren",naam:"Welvarende senioren",pct:12,kenmerk:"winkelen doordeweeks en hechten aan kwaliteit en service"},
  {id:"trendsetters",naam:"Stedelijke trendsetters",pct:9,kenmerk:"lopen voorop in trends en zijn sterk vertegenwoordigd in de grote steden"},
  {id:"zakelijke-beslissers",naam:"Zakelijke beslissers",pct:6,kenmerk:"reizen frequent via trein en snelweg en zijn ontvankelijk voor zakelijke proposities"},
  {id:"zzpers",naam:"Zzp'ers",pct:10,kenmerk:"werken flexibel en verplaatsen zich veel binnen de eigen regio"},
  {id:"sportief",naam:"Sportieve levensstijl",pct:18,kenmerk:"bezoeken sportlocaties en letten op gezondheid en voeding"},
  {id:"uitgaanspubliek",naam:"Uitgaanspubliek",pct:13,kenmerk:"is in de avonduren actief in binnensteden en rond horeca"},
  {id:"vakantiegangers",naam:"Vakantiegangers",pct:22,kenmerk:"plannen meerdere reizen per jaar en zijn gevoelig voor inspiratie onderweg"},
  {id:"online-shoppers",naam:"Online shoppers",pct:28,kenmerk:"combineren online oriëntatie met fysieke aankopen"},
  {id:"duurzaam",naam:"Duurzame consumenten",pct:17,kenmerk:"kiezen bewust en waarderen merken met een duidelijke maatschappelijke boodschap"},
  {id:"vermogend",naam:"Vermogende huishoudens",pct:8,kenmerk:"hebben een hoge koopkracht en zijn te vinden rond premium winkelgebieden"}
];

export const CBS_VARIABELEN = [
  {cat:"Demografie",vars:[
    {naam:"Leeftijd",condities:["18–24","25–34","35–49","50–64","65+"]},
    {naam:"Geslacht",condities:["Man","Vrouw"]},
    {naam:"Stedelijkheid",condities:["Zeer sterk stedelijk","Sterk stedelijk","Matig stedelijk","Weinig stedelijk"]}
  ]},
  {cat:"Inkomen",vars:[
    {naam:"Huishoudinkomen",condities:["< €30.000","€30.000 – €45.000","€45.000 – €70.000","> €70.000"]},
    {naam:"Koopkrachtklasse",condities:["Laag","Midden","Hoog"]}
  ]},
  {cat:"Gezinssituatie",vars:[
    {naam:"Huishoudgrootte",condities:["1 persoon","2 personen","3 of meer"]},
    {naam:"Kinderen thuis",condities:["Ja, 0–12 jaar","Ja, 13–17 jaar","Nee"]}
  ]}
];

export const POI_BRANCHES = [
  {id:"supermarkten",naam:"Supermarkten",sing:"Supermarkt"},
  {id:"fastfood",naam:"Fastfoodrestaurants",sing:"Fastfoodrestaurant"},
  {id:"tankstations",naam:"Tankstations",sing:"Tankstation"},
  {id:"bouwmarkten",naam:"Bouwmarkten",sing:"Bouwmarkt"},
  {id:"fitness",naam:"Fitnesscentra",sing:"Fitnesscentrum"},
  {id:"warenhuizen",naam:"Warenhuizen",sing:"Warenhuis"}
];

export const POI_PUNTEN = [];
for (const c of CITIES.slice(0, 14)) {
  for (const b of POI_BRANCHES) {
    if (R() > .45) POI_PUNTEN.push({
      branch: b.id,
      naam: b.sing + " " + c.n,
      adres: STRATEN[Math.floor(R() * STRATEN.length)] + " " + (1 + Math.floor(R() * 90)),
      plaats: c.n,
      lat: +(c.lat + (R() - .5) * .1).toFixed(4),
      lng: +(c.lng + (R() - .5) * .14).toFixed(4)
    });
  }
}

export const PROJECTS = [
  {naam:"Retail Q3 – landelijke campagne",klant:"FMCG",bewerkt:"Vandaag, 11:24",objecten:412},
  {naam:"Automotive introductie EV",klant:"Automotive",bewerkt:"Gisteren",objecten:186},
  {naam:"Zomeractie kustregio",klant:"Drankenmerk",bewerkt:"28 juli",objecten:94},
  {naam:"Doelgroeptest studenten G5",klant:"Telecom",bewerkt:"21 juli",objecten:238}
];
