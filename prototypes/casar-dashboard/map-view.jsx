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

// PNG-snapshot van heel Nederland: tegels + objecten + POI's + legenda op een canvas
const NL_BBOX = { latN: 53.58, latS: 50.72, lngW: 3.33, lngE: 7.25 };
function merc(lat, lng, z) {
  const s = 256 * Math.pow(2, z), r = lat * Math.PI / 180;
  return { x: (lng + 180) / 360 * s, y: (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * s };
}
function laadTegel(url) {
  return new Promise(res => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => res(img);
    img.onerror = () => res(null);
    img.src = url;
  });
}
async function maakSnapshot(p, huidigeZoom) {
  let z = Math.max(7, Math.min(12, Math.round(huidigeZoom)));
  while (z > 7 && merc(0, NL_BBOX.lngE, z).x - merc(0, NL_BBOX.lngW, z).x > 3800) z--;
  const tl = merc(NL_BBOX.latN, NL_BBOX.lngW, z), br = merc(NL_BBOX.latS, NL_BBOX.lngE, z);
  const w = Math.round(br.x - tl.x), h = Math.round(br.y - tl.y);
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#dfe3e9'; ctx.fillRect(0, 0, w, h);
  const px = (lat, lng) => { const m = merc(lat, lng, z); return [m.x - tl.x, m.y - tl.y]; };

  const t0x = Math.floor(tl.x / 256), t1x = Math.floor(br.x / 256);
  const t0y = Math.floor(tl.y / 256), t1y = Math.floor(br.y / 256);
  const taken = [];
  for (let tx = t0x; tx <= t1x; tx++) for (let ty = t0y; ty <= t1y; ty++)
    taken.push(laadTegel('https://tile.openstreetmap.org/' + z + '/' + tx + '/' + ty + '.png')
      .then(img => ({ img, tx, ty })));
  const tegels = await Promise.all(taken);
  if (p.grayscale !== false) ctx.filter = 'grayscale(1) contrast(.9) brightness(1.05)';
  tegels.forEach(t => { if (t.img) ctx.drawImage(t.img, t.tx * 256 - tl.x, t.ty * 256 - tl.y); });
  ctx.filter = 'none';

  const mpp = 156543.03392 * Math.cos(52 * Math.PI / 180) / Math.pow(2, z);
  (p.pois || []).forEach(poi => {
    const excl = poi.mode === 'exclude';
    const [x, y] = px(poi.lat, poi.lng);
    if (p.poiRadius > 0) {
      ctx.beginPath(); ctx.arc(x, y, p.poiRadius / mpp, 0, Math.PI * 2);
      ctx.setLineDash((excl || p.poiDashed) ? [6, 5] : []);
      ctx.strokeStyle = excl ? '#c0392b' : '#195AA6'; ctx.lineWidth = 1.5;
      ctx.fillStyle = excl ? 'rgba(138,147,160,.13)' : 'rgba(25,90,166,.07)';
      ctx.fill(); ctx.stroke(); ctx.setLineDash([]);
    }
    const pin = new Path2D('M12 1.8C8 1.8 4.8 5 4.8 9c0 5.4 7.2 13.2 7.2 13.2S19.2 14.4 19.2 9c0-4-3.2-7.2-7.2-7.2z');
    ctx.save(); ctx.translate(x - 13, y - 24); ctx.scale(26 / 24, 26 / 24);
    ctx.fillStyle = excl ? '#8a93a0' : poi.adhoc ? '#ffffff' : '#D64550';
    ctx.strokeStyle = poi.adhoc ? '#D64550' : '#ffffff'; ctx.lineWidth = 1.7;
    ctx.fill(pin); ctx.stroke(pin);
    ctx.beginPath(); ctx.arc(12, 10.5, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = excl ? '#fff' : poi.adhoc ? '#D64550' : '#fff'; ctx.fill();
    ctx.restore();
  });
  (p.objects || []).forEach(o => {
    const [x, y] = px(o.lat, o.lng);
    ctx.beginPath(); ctx.arc(x, y, o.selected ? 7 : 5, 0, Math.PI * 2);
    ctx.fillStyle = o.dimmed ? 'rgba(195,201,210,.45)' : o.color;
    ctx.strokeStyle = o.selected ? '#0f2f57' : '#ffffff';
    ctx.lineWidth = o.selected ? 2.5 : 1;
    ctx.fill(); ctx.stroke();
  });

  const items = (p.legend || []).slice();
  if (items.length) {
    const rijH = 17, pad = 12, bw = 195;
    const extra = (p.pois || []).length ? 1 : 0;
    const bh = pad * 2 + 16 + (items.length + extra) * rijH + (extra ? 8 : 0);
    const bx = w - bw - 14, by = h - bh - 14;
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#d6dbe3'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#8a93a0'; ctx.font = '700 9.5px Montserrat, sans-serif';
    ctx.fillText('NETWERKEN', bx + pad, by + pad + 8);
    ctx.font = '600 10.5px Montserrat, sans-serif';
    items.forEach((it, i) => {
      const ry = by + pad + 16 + i * rijH + 8;
      ctx.beginPath(); ctx.arc(bx + pad + 4, ry - 3, 4, 0, Math.PI * 2);
      ctx.fillStyle = it.color; ctx.fill();
      ctx.fillStyle = '#2b3440'; ctx.fillText(it.naam, bx + pad + 14, ry);
    });
    if (extra) {
      const ry = by + pad + 16 + items.length * rijH + 8 + 6;
      ctx.strokeStyle = '#eceff3';
      ctx.beginPath(); ctx.moveTo(bx + pad, ry - 13); ctx.lineTo(bx + bw - pad, ry - 13); ctx.stroke();
      const pin = new Path2D('M12 1.8C8 1.8 4.8 5 4.8 9c0 5.4 7.2 13.2 7.2 13.2S19.2 14.4 19.2 9c0-4-3.2-7.2-7.2-7.2z');
      ctx.save(); ctx.translate(bx + pad - 2, ry - 10); ctx.scale(0.5, 0.5);
      ctx.fillStyle = '#D64550'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.7; ctx.fill(pin); ctx.stroke(pin);
      ctx.restore();
      ctx.fillStyle = '#2b3440'; ctx.fillText('POI-locatie', bx + pad + 14, ry);
    }
  }
  ctx.font = '10px Montserrat, sans-serif';
  const attr = '© OpenStreetMap contributors';
  ctx.fillStyle = 'rgba(255,255,255,.75)';
  ctx.fillRect(10, h - 26, ctx.measureText(attr).width + 12, 16);
  ctx.fillStyle = '#5a6472'; ctx.fillText(attr, 16, h - 14);

  const naam = (p.projectNaam || 'kaart').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'kaart';
  return new Promise(res => cv.toBlob(blob => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = naam + '-kaartbeeld.png';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    res(true);
  }, 'image/png'));
}

function MapView(props) {
  const { objects = [], pois = [], poiRadius = 0, poiDashed = false, mode = 'pan', grayscale = true,
    selectedProvincies = [], selectedGemeenten = [], pc4Centers = [],
    geoLayer = 'gemeente', geoPickable = [], geoSelected = [], snapshotTick = 0 } = props;
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

  // Snapshot-download wanneer de teller in de props verhoogd wordt
  useEffect(() => {
    if (!ready || !snapshotTick || !mapRef.current) return;
    const p = propsRef.current;
    maakSnapshot(p, mapRef.current.getZoom())
      .then(() => { if (p.onSnapshotDone) p.onSnapshotDone(); })
      .catch(() => { if (p.onSnapshotDone) p.onSnapshotDone(); });
  }, [ready, snapshotTick]);

  // Esc verlaat de handmatige gebiedsselectie en de lasso
  useEffect(() => {
    if (!ready || (mode !== 'geo' && mode !== 'lasso')) return;
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
