const { useEffect, useRef, useState } = React;

function pointInPoly(pt, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
    const hit = ((yi > pt[1]) !== (yj > pt[1])) && (pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi);
    if (hit) inside = !inside;
  }
  return inside;
}

// CBS/kadaster grenzen via cartomap (publiek domein); jaartal-fallback
const GEO_ALIAS = { 'Den Haag': "'s-Gravenhage", 'Den Bosch': "'s-Hertogenbosch" };
const geoCache = {};
async function loadGeo(kind) {
  if (geoCache[kind]) return geoCache[kind];
  const prefix = kind === 'prov' ? 'provincie_' : 'gemeente_';
  for (const y of [2025, 2024, 2023, 2022]) {
    try {
      const r = await fetch('https://cartomap.github.io/nl/wgs84/' + prefix + y + '.geojson');
      if (r.ok) { const j = await r.json(); geoCache[kind] = j; return j; }
    } catch (e) {}
  }
  return null;
}

function pinIcon(kind) {
  const fill = kind === 'exclude' ? '#8a93a0' : kind === 'adhoc' ? '#ffffff' : '#D64550';
  const stroke = kind === 'adhoc' ? '#D64550' : '#ffffff';
  const inner = kind === 'exclude'
    ? '<rect x="8.4" y="9.8" width="7.2" height="2.4" rx="1.2" fill="#fff"/>'
    : '<circle cx="12" cy="10.5" r="2.5" fill="' + (kind === 'adhoc' ? '#D64550' : '#fff') + '"/>';
  return L.divIcon({ className: '', iconSize: [26, 26], iconAnchor: [13, 24],
    html: '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 1.8C8 1.8 4.8 5 4.8 9c0 5.4 7.2 13.2 7.2 13.2S19.2 14.4 19.2 9c0-4-3.2-7.2-7.2-7.2z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.7"/>' + inner + '</svg>' });
}

function MapView(props) {
  const { objects = [], pois = [], poiRadius = 0, poiDashed = false, mode = 'pan', grayscale = true,
    selectedProvincies = [], selectedGemeenten = [], pc4Centers = [],
    geoLayer = 'gemeente', geoPickable = [], geoSelected = [] } = props;
  const divRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const poiRef = useRef(null);
  const hlRef = useRef(null);
  const pickRef = useRef(null);
  const propsRef = useRef(props);
  propsRef.current = props;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false, t;
    function init() {
      if (cancelled) return;
      if (!window.L || !divRef.current) { t = setTimeout(init, 120); return; }
      const map = L.map(divRef.current, { zoomControl: true, doubleClickZoom: false });
      map.setView([52.16, 5.35], 8);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map);
      const pane = map.createPane('ap-hl');
      pane.style.zIndex = 350;
      const pickPane = map.createPane('ap-pick');
      pickPane.style.zIndex = 360;
      hlRef.current = L.layerGroup().addTo(map);
      pickRef.current = L.layerGroup().addTo(map);
      layerRef.current = L.layerGroup().addTo(map);
      poiRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setTimeout(() => { try { map.invalidateSize(); } catch (e) {} }, 300);
      setReady(true);
    }
    init();
    return () => { cancelled = true; clearTimeout(t); if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);

  useEffect(() => {
    const lg = layerRef.current;
    if (!ready || !lg) return;
    lg.clearLayers();
    objects.forEach(o => {
      const m = L.circleMarker([o.lat, o.lng], {
        radius: o.selected ? 7 : 5,
        color: o.selected ? '#0f2f57' : '#ffffff',
        weight: o.selected ? 2.5 : 1,
        fillColor: o.dimmed ? '#c3c9d2' : o.color,
        fillOpacity: o.dimmed ? 0.45 : 0.92,
        interactive: mode === 'pan'
      });
      m.on('click', () => {
        const p = propsRef.current;
        if (p.mode === 'pan' && p.onObjectClick) p.onObjectClick(o.id);
      });
      m.addTo(lg);
    });
  }, [ready, objects, mode]);

  useEffect(() => {
    const lg = poiRef.current;
    if (!ready || !lg) return;
    lg.clearLayers();
    pois.forEach(p => {
      const excl = p.mode === 'exclude';
      if (poiRadius > 0) L.circle([p.lat, p.lng], {
        radius: poiRadius,
        color: excl ? '#c0392b' : '#195AA6', weight: 1.5,
        dashArray: (excl || poiDashed) ? '6 5' : null,
        fillColor: excl ? '#8a93a0' : '#195AA6', fillOpacity: excl ? 0.13 : 0.07
      }).addTo(lg);
      L.marker([p.lat, p.lng], { icon: pinIcon(excl ? 'exclude' : p.adhoc ? 'adhoc' : 'include'), interactive: false }).addTo(lg);
    });
  }, [ready, pois, poiRadius, poiDashed]);

  // Geselecteerde provincies/gemeenten licht uitlichten (geen auto-zoom)
  useEffect(() => {
    const lg = hlRef.current;
    if (!ready || !lg) return;
    let cancelled = false;
    (async () => {
      const feats = [];
      const missingProv = [];
      if (selectedProvincies.length) {
        const j = await loadGeo('prov');
        selectedProvincies.forEach(n => {
          const f = j && j.features.find(x => x.properties.statnaam === n);
          if (f) feats.push(f); else missingProv.push(n);
        });
      }
      if (selectedGemeenten.length) {
        const j = await loadGeo('gem');
        if (j) {
          const names = selectedGemeenten.map(n => GEO_ALIAS[n] || n);
          feats.push(...j.features.filter(f => names.includes(f.properties.statnaam)));
        }
      }
      if (cancelled) return;
      lg.clearLayers();
      feats.forEach(f => L.geoJSON(f, {
        pane: 'ap-hl', interactive: false,
        style: { color: '#195AA6', weight: 2, fillColor: '#195AA6', fillOpacity: 0.13 }
      }).addTo(lg));
      // Fallback wanneer de CBS-grenzen niet geladen kunnen worden: gebied om de objecten van de provincie
      missingProv.forEach(n => {
        const objs = (propsRef.current.objects || []).filter(o => o.provincie === n);
        if (!objs.length) return;
        const lats = objs.map(o => o.lat), lngs = objs.map(o => o.lng);
        L.rectangle([[Math.min(...lats) - 0.12, Math.min(...lngs) - 0.18], [Math.max(...lats) + 0.12, Math.max(...lngs) + 0.18]],
          { pane: 'ap-hl', interactive: false, color: '#195AA6', weight: 2, dashArray: '5 4', fillColor: '#195AA6', fillOpacity: 0.10 }).addTo(lg);
      });
      pc4Centers.forEach(c => L.circle([c.lat, c.lng], { radius: 1400, pane: 'ap-hl', interactive: false, color: '#195AA6', weight: 2, fillColor: '#195AA6', fillOpacity: 0.13 }).addTo(lg));
    })();
    return () => { cancelled = true; };
  }, [ready, selectedProvincies.join('|'), selectedGemeenten.join('|'), pc4Centers.map(c => c.lat + ',' + c.lng).join('|')]);

  // Handmatig gebieden aanklikken op de kaart (modus 'geo')
  useEffect(() => {
    const lg = pickRef.current;
    if (!ready || !lg) return;
    lg.clearLayers();
    if (mode !== 'geo') return;
    let cancelled = false;
    const gekozen = new Set(geoSelected);
    // PC4-cirkels zijn klein: die krijgen wat meer vulling, anders zie je ze niet op landelijk zoomniveau
    const rond = geoLayer === 'pc4';
    const styleFor = aan => aan
      ? { color: '#195AA6', weight: 2.5, dashArray: null, fillColor: '#195AA6', fillOpacity: 0 }
      : rond
        ? { color: '#195AA6', weight: 1.2, dashArray: null, fillColor: '#195AA6', fillOpacity: 0.12 }
        : { color: '#5a6472', weight: 1, dashArray: '3 3', fillColor: '#195AA6', fillOpacity: 0.02 };
    const wire = (lyr, naam) => {
      lyr.setStyle(styleFor(gekozen.has(naam)));
      lyr.on('mouseover', () => lyr.setStyle({ color: '#195AA6', weight: 2, dashArray: null, fillOpacity: 0.28 }));
      lyr.on('mouseout', () => lyr.setStyle(styleFor(gekozen.has(naam))));
      lyr.on('click', ev => {
        L.DomEvent.stop(ev);
        const p = propsRef.current;
        if (p.onGeoPick) p.onGeoPick(naam);
      });
      lyr.bindTooltip(naam, { sticky: true, direction: 'top', opacity: 0.95 });
      lyr.addTo(lg);
    };
    // Terugval wanneer de CBS-grenzen niet geladen kunnen worden: kader om de objecten van het gebied
    const bboxFallback = () => {
      const veld = geoLayer === 'provincie' ? 'provincie' : 'gemeente';
      geoPickable.forEach(g => {
        const objs = (propsRef.current.objects || []).filter(o => o[veld] === g.name);
        if (!objs.length) return;
        const lats = objs.map(o => o.lat), lngs = objs.map(o => o.lng);
        wire(L.rectangle([
          [Math.min(...lats) - 0.05, Math.min(...lngs) - 0.07],
          [Math.max(...lats) + 0.05, Math.max(...lngs) + 0.07]
        ], { pane: 'ap-pick' }), g.name);
      });
    };
    (async () => {
      if (geoLayer === 'pc4') {
        geoPickable.forEach(g => wire(L.circle([g.lat, g.lng], { radius: 1400, pane: 'ap-pick' }), g.name));
        return;
      }
      const j = await loadGeo(geoLayer === 'provincie' ? 'prov' : 'gem');
      if (cancelled) return;
      if (!j) { bboxFallback(); return; }
      const opStatnaam = {};
      geoPickable.forEach(g => { opStatnaam[GEO_ALIAS[g.name] || g.name] = g.name; });
      const gevonden = new Set();
      j.features.forEach(f => {
        const naam = opStatnaam[f.properties.statnaam];
        if (!naam) return;
        gevonden.add(naam);
        wire(L.geoJSON(f, { pane: 'ap-pick' }), naam);
      });
      if (!gevonden.size) bboxFallback();
    })();
    return () => { cancelled = true; };
  }, [ready, mode, geoLayer, geoPickable.map(g => g.name).join('|'), geoSelected.join('|')]);

  // Esc verlaat de handmatige gebiedsselectie
  useEffect(() => {
    if (!ready || mode !== 'geo') return;
    const onKey = e => {
      if (e.key !== 'Escape') return;
      const p = propsRef.current;
      if (p.onGeoExit) p.onGeoExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ready, mode]);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map || mode !== 'lasso') return;
    const cont = map.getContainer();
    let drawing = false, pts = [], poly = null;
    const toLL = ev => {
      const r = cont.getBoundingClientRect();
      return map.containerPointToLatLng([ev.clientX - r.left, ev.clientY - r.top]);
    };
    const finish = () => {
      if (!drawing) return;
      drawing = false;
      if (pts.length >= 3 && propsRef.current.onLasso) {
        const ids = (propsRef.current.objects || []).filter(o => pointInPoly([o.lat, o.lng], pts)).map(o => o.id);
        propsRef.current.onLasso(ids);
      }
      pts = []; if (poly) { poly.remove(); poly = null; }
    };
    const down = ev => {
      if (ev.button !== 0) return;
      ev.preventDefault();
      drawing = true; pts = [];
      const ll = toLL(ev); pts.push([ll.lat, ll.lng]);
      poly = L.polygon(pts, { color: '#195AA6', weight: 2, dashArray: '4 4', fillColor: '#195AA6', fillOpacity: 0.08, interactive: false }).addTo(map);
    };
    const move = ev => {
      if (!drawing || !poly) return;
      const ll = toLL(ev);
      const last = pts[pts.length - 1];
      if (Math.abs(ll.lat - last[0]) < 1e-5 && Math.abs(ll.lng - last[1]) < 1e-5) return;
      pts.push([ll.lat, ll.lng]);
      poly.setLatLngs(pts);
    };
    map.dragging.disable();
    cont.style.cursor = 'crosshair';
    cont.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', finish);
    return () => {
      cont.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', finish);
      map.dragging.enable(); cont.style.cursor = '';
      if (poly) poly.remove();
    };
  }, [ready, mode]);

  return React.createElement('div', {
    ref: divRef,
    className: grayscale ? 'ap-map-gray' : '',
    style: { width: '100%', height: '100%', minHeight: '300px', background: '#dfe3e9' }
  });
}

window.MapView = MapView;
if (typeof module !== 'undefined') module.exports = { MapView };
