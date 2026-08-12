/* Accountlaag voor AdViewer 2.0 (prototype).
   Losse laag bovenop de bundel: account-icoon rechtsboven, gesimuleerde
   registratie/login (localStorage), Mijn uploads, vergelijken, deellink,
   video-export, "Gedeeld met", advies- en sales-CTA's en share naar de
   one-pager (start/). Er is geen backend: niets wordt echt verstuurd. */
(function () {
  var LSK = 'adviewer2_account_v1';
  var APPK = 'adviewer2_v1';
  var REOPEN = 'adviewer2_reopen_v1';

  function load() {
    try { var d = JSON.parse(localStorage.getItem(LSK)); if (d && d.uploads) { if (!d.requests) d.requests = []; return d; } } catch (e) {}
    return { user: null, loggedIn: false, uploads: [], requests: [] };
  }
  var db = load();
  function save() { try { localStorage.setItem(LSK, JSON.stringify(db)); } catch (e) {} }
  function ingelogd() { return !!(db.user && db.loggedIn); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function initialen() {
    if (!db.user) return '';
    var p = (db.user.naam || db.user.email || '?').trim().split(/\s+/);
    return ((p[0] || '')[0] || '?').toUpperCase() + (p.length > 1 ? (p[p.length - 1][0] || '').toUpperCase() : '');
  }
  function datumNL(iso) {
    try { return new Date(iso).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) { return ''; }
  }
  function baseUrl() { return location.href.split('#')[0].split('?')[0].replace(/[^\/]*$/, ''); }

  /* ---------- stijl ---------- */
  var style = document.createElement('style');
  style.textContent =
    '.acc-font{font-family:"Century Gothic",CenturyGothic,Poppins,sans-serif}' +
    '.acc-btn{position:fixed;top:14px;right:14px;z-index:2147482000;width:46px;height:46px;border-radius:50%;border:none;cursor:pointer;background:#195AA6;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(27,75,137,.35);font-weight:800;font-size:16px;letter-spacing:.5px}' +
    '.acc-btn:hover{background:#1B4B89}' +
    '.acc-ctas{position:fixed;left:16px;bottom:16px;z-index:2147481900;display:none;flex-direction:column;gap:9px}' +
    '.acc-cta{border:none;border-radius:999px;padding:12px 18px;font-weight:700;font-size:14px;cursor:pointer;box-shadow:0 6px 18px rgba(27,75,137,.30);display:flex;align-items:center;gap:8px}' +
    '.acc-cta.adv{background:#fff;color:#195AA6;border:2px solid #195AA6}' +
    '.acc-cta.sales{background:#195AA6;color:#fff}' +
    '.acc-cta.sales:hover{background:#1B4B89}' +
    '.acc-ov{position:fixed;inset:0;background:rgba(23,40,66,.45);z-index:2147482500;display:flex;align-items:center;justify-content:center;padding:20px;font-size:15px;line-height:1.55;color:#575756}' +
    '.acc-mod{background:#fff;border-radius:18px;box-shadow:0 18px 44px rgba(27,75,137,.20);width:100%;max-width:560px;max-height:88vh;overflow:auto;padding:26px 28px;position:relative;box-sizing:border-box}' +
    '.acc-mod *{box-sizing:border-box}' +
    '.acc-mod h2{color:#1B4B89;font-size:21px;font-weight:800;margin:0 0 6px}' +
    '.acc-mod p{margin:0 0 12px}' +
    '.acc-x{position:absolute;top:12px;right:14px;background:none;border:none;font-size:20px;color:#9AA3B5;cursor:pointer;padding:4px;line-height:1}' +
    '.acc-x:hover{color:#575756}' +
    '.acc-card{background:#EAF1F9;border:1.5px solid #195AA6;border-radius:14px;padding:18px 20px;margin:8px 0 16px}' +
    '.acc-card h3{color:#172842;font-size:17px;font-weight:800;margin:0 0 10px}' +
    '.acc-check{display:flex;gap:10px;align-items:flex-start;margin:7px 0;font-size:14.5px}' +
    '.acc-check svg{flex:0 0 18px;margin-top:2px}' +
    '.acc-prim{display:block;width:100%;border:none;border-radius:999px;background:#195AA6;color:#fff;font-weight:700;font-size:15px;padding:13px 0;cursor:pointer;margin-top:6px}' +
    '.acc-prim:hover{background:#1B4B89}' +
    '.acc-sec{display:block;width:100%;border:2px solid #195AA6;border-radius:999px;background:#fff;color:#195AA6;font-weight:700;font-size:15px;padding:11px 0;cursor:pointer;margin-top:10px}' +
    '.acc-link{background:none;border:none;color:#0B78BE;cursor:pointer;font-size:13.5px;text-decoration:underline;padding:0;font-family:inherit}' +
    '.acc-field{margin:0 0 12px}' +
    '.acc-field label{display:block;font-size:13px;font-weight:700;color:#1B4B89;margin-bottom:4px}' +
    '.acc-field input,.acc-field textarea{width:100%;border:1.5px solid #C9D4E4;border-radius:10px;padding:10px 12px;font-size:14.5px;font-family:inherit;color:#172842}' +
    '.acc-field input:focus,.acc-field textarea:focus{outline:2px solid #0B78BE;border-color:#0B78BE}' +
    '.acc-err{color:#C0392B;font-size:13px;margin:4px 0 0;display:none}' +
    '.acc-menu-item{display:flex;align-items:center;gap:10px;width:100%;background:#fff;border:none;border-bottom:1px solid #EEF1F6;padding:13px 4px;font-size:15px;color:#172842;cursor:pointer;text-align:left;font-family:inherit}' +
    '.acc-menu-item:hover{color:#195AA6}' +
    '.acc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin:12px 0}' +
    '.acc-tile{border:1.5px solid #E1E8F2;border-radius:12px;overflow:hidden;background:#F7FAFD}' +
    '.acc-tile img{width:100%;height:96px;object-fit:cover;display:block}' +
    '.acc-tile .nm{font-size:12px;font-weight:700;color:#172842;padding:7px 9px 0;word-break:break-all}' +
    '.acc-tile .dt{font-size:11px;color:#8b93a3;padding:1px 9px 7px}' +
    '.acc-tile .acts{display:flex;flex-wrap:wrap;gap:5px;padding:0 8px 9px}' +
    '.acc-mini{border:1px solid #195AA6;background:#fff;color:#195AA6;border-radius:999px;font-size:11px;font-weight:700;padding:4px 9px;cursor:pointer;font-family:inherit}' +
    '.acc-mini:hover{background:#EAF1F9}' +
    '.acc-mini.on{background:#195AA6;color:#fff}' +
    '.acc-cmp{display:flex;gap:10px;margin:12px 0}' +
    '.acc-cmp>div{flex:1;background:#0B0D10;border-radius:10px;padding:8px;text-align:center}' +
    '.acc-cmp img{max-width:100%;max-height:270px;object-fit:contain}' +
    '.acc-cmp .cap{color:#cfd6e0;font-size:11.5px;margin-top:6px;word-break:break-all}' +
    '.acc-list{margin:8px 0 14px;padding:0;list-style:none}' +
    '.acc-list li{display:flex;justify-content:space-between;gap:10px;border-bottom:1px solid #EEF1F6;padding:8px 2px;font-size:14px}' +
    '.acc-tag{background:#E4F5E6;color:#1E7C33;font-size:12px;font-weight:700;border-radius:999px;padding:3px 10px;white-space:nowrap}' +
    '.acc-ok{width:56px;height:56px;border-radius:50%;background:#E4F5E6;display:flex;align-items:center;justify-content:center;margin:4px auto 14px}' +
    '.acc-toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#172842;color:#fff;padding:11px 20px;border-radius:999px;font-size:14px;z-index:2147483000;box-shadow:0 8px 22px rgba(0,0,0,.3)}' +
    '.acc-btn:focus-visible,.acc-cta:focus-visible,.acc-prim:focus-visible,.acc-sec:focus-visible,.acc-x:focus-visible{outline:3px solid #0B78BE;outline-offset:2px}';
  var VINK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#195AA6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  var PERSOON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>';

  function voordelenKaart() {
    return '<div class="acc-card"><h3>Met een gratis account krijg je er dit bij</h3>' +
      ['Al je eerdere uploads terugzien', 'Twee uitingen naast elkaar in één beeld', 'Een deelbare link van je campagne', 'Video-export van je uiting', 'Downloads zonder watermerk']
        .map(function (t) { return '<div class="acc-check">' + VINK + '<span>' + t + '</span></div>'; }).join('') +
      '</div>';
  }

  /* ---------- basis-elementen ---------- */
  var knop = document.createElement('button');
  knop.className = 'acc-btn acc-font';
  knop.setAttribute('aria-label', 'Account');
  knop.title = 'Account';

  /* AL-01: de CTA's staan in de sticky topbar van de viewer; deze laag
     luistert naar het event van die knoppen en opent de aanvraagflow. */
  window.addEventListener('adviewer:aanvraag', function (e) {
    contactForm(e && e.detail && e.detail.soort === 'sales' ? 'sales' : 'advies');
  });

  var ov = null;
  function sluit() { if (ov) { ov.remove(); ov = null; } }
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'acc-toast acc-font';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }
  function kopieer(txt, melding) {
    function done() { toast(melding || 'Link gekopieerd'); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { window.prompt('Kopieer deze link:', txt); });
    else window.prompt('Kopieer deze link:', txt);
  }
  function open(html, opts) {
    sluit();
    ov = document.createElement('div');
    ov.className = 'acc-ov acc-font';
    ov.innerHTML = '<div class="acc-mod" role="dialog" aria-modal="true"><button class="acc-x" aria-label="Sluiten">✕</button>' + html + '</div>';
    document.body.appendChild(ov);
    ov.querySelector('.acc-x').addEventListener('click', sluit);
    ov.addEventListener('click', function (e) { if (e.target === ov) sluit(); });
    if (opts && opts.wire) opts.wire(ov.querySelector('.acc-mod'));
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ov) sluit(); });

  /* ---------- schermen ---------- */
  function bevestiging(titel, tekst, extraHtml) {
    open('<div class="acc-ok"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1E7C33" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>' +
      '<h2 style="text-align:center">' + esc(titel) + '</h2><p style="text-align:center">' + tekst + '</p>' + (extraHtml || '') +
      '<button class="acc-prim" data-close="1">Verder met de tool</button>',
      { wire: function (m) { m.querySelector('[data-close]').addEventListener('click', sluit); } });
  }

  function toonGate(reden) {
    open('<h2>Maak een gratis account aan</h2><p>' + (reden || 'Deze functie hoort bij je gratis account.') + '</p>' + voordelenKaart() +
      '<button class="acc-prim" data-go="registreer">Maak een account aan</button>' +
      '<button class="acc-sec" data-go="login">Inloggen</button>' +
      '<p style="text-align:center;margin-top:12px"><button class="acc-link" data-go="deel">Of deel de tool met een collega</button></p>',
      { wire: wireGo });
  }
  function wireGo(m) {
    m.querySelectorAll('[data-go]').forEach(function (b) {
      b.addEventListener('click', function () {
        var g = b.getAttribute('data-go');
        if (g === 'registreer') toonRegistreer();
        else if (g === 'login') toonLogin();
        else if (g === 'deel') deelTool();
      });
    });
  }

  function veld(id, label, type, val, ph) {
    return '<div class="acc-field"><label for="acc-' + id + '">' + label + '</label><input id="acc-' + id + '" type="' + (type || 'text') + '" value="' + esc(val || '') + '" placeholder="' + esc(ph || '') + '"></div>';
  }

  function toonRegistreer() {
    open('<h2>Maak een account aan</h2><p style="font-size:14px">Vul je gegevens in — je bent daarna direct ingelogd.</p>' +
      veld('naam', 'Naam') + veld('email', 'Zakelijk e-mailadres', 'email', '', 'naam@bedrijf.nl') +
      veld('bedrijf', 'Bedrijf') + veld('functie', 'Functie', 'text', '', 'bijv. planner') +
      veld('ww', 'Wachtwoord', 'password') +
      '<p class="acc-err" id="acc-regerr">Vul minimaal je naam, e-mailadres en een wachtwoord in.</p>' +
      '<button class="acc-prim" id="acc-doereg">Maak een account aan</button>' +
      '<p style="text-align:center;margin-top:12px;font-size:13.5px">Al een account? <button class="acc-link" data-go="login">Log in</button></p>',
      { wire: function (m) {
          wireGo(m);
          m.querySelector('#acc-doereg').addEventListener('click', function () {
            var v = function (id) { return m.querySelector('#acc-' + id).value.trim(); };
            if (!v('naam') || !v('email') || !v('ww')) { m.querySelector('#acc-regerr').style.display = 'block'; return; }
            db.user = { naam: v('naam'), email: v('email'), bedrijf: v('bedrijf'), functie: v('functie'), ww: v('ww') };
            db.loggedIn = true; save(); zetIcoon();
            bevestiging('Je account is aangemaakt', 'Welkom ' + esc(db.user.naam.split(' ')[0]) + '! Je bent direct ingelogd — rechtsboven zie je nu je profiel. Klik erop om naar je profielpagina te gaan.',
              '<a class="acc-sec" style="text-align:center;text-decoration:none" href="' + baseUrl() + 'account/">Bekijk je profielpagina</a>');
          });
        } });
  }

  function toonLogin() {
    open('<h2>Inloggen</h2>' +
      veld('lemail', 'E-mailadres', 'email', db.user ? db.user.email : '') + veld('lww', 'Wachtwoord', 'password') +
      '<p class="acc-err" id="acc-logerr">Vul je e-mailadres en wachtwoord in.</p>' +
      '<button class="acc-prim" id="acc-doelog">Inloggen</button>' +
      '<p style="text-align:center;margin-top:12px;font-size:13.5px">Nog geen account? <button class="acc-link" data-go="registreer">Maak er gratis een aan</button></p>',
      { wire: function (m) {
          wireGo(m);
          m.querySelector('#acc-doelog').addEventListener('click', function () {
            var em = m.querySelector('#acc-lemail').value.trim(), ww = m.querySelector('#acc-lww').value.trim();
            if (!em || !ww) { m.querySelector('#acc-logerr').style.display = 'block'; return; }
            if (!db.user) db.user = { naam: em.split('@')[0], email: em, bedrijf: '', functie: '', ww: ww };
            db.loggedIn = true; save(); zetIcoon(); sluit();
            toast('Ingelogd als ' + db.user.naam);
          });
        } });
  }

  function deelTool() {
    var url = baseUrl() + 'start/';
    kopieer(url, 'Link naar de introductiepagina gekopieerd');
    bevestiging('Deel de tool met een collega', 'De link naar de introductiepagina staat op je klembord. Je collega krijgt eerst een korte uitleg en tutorial, en start daarna de tool.',
      '<p style="text-align:center;font-size:13px;word-break:break-all;color:#8b93a3">' + esc(url) + '</p>');
  }

  function huidigeUiting() {
    try { var d = JSON.parse(localStorage.getItem(APPK)); return d && d.creative && d.creative.name ? d.creative.name : null; } catch (e) { return null; }
  }
  function contactForm(soort) {
    if (!ingelogd()) {
      toonGate(soort === 'advies'
        ? 'Om advies te vragen aan ons designteam heb je een gratis account nodig — zo weten we wie we moeten terugmailen. Aanmaken duurt nog geen minuut.'
        : 'Om je uiting door te sturen naar ons salesteam heb je een gratis account nodig — zo weten we wie we moeten terugbellen. Aanmaken duurt nog geen minuut.');
      return;
    }
    var isAdvies = soort === 'advies';
    var uiting = huidigeUiting();
    open('<h2>' + (isAdvies ? 'Vraag advies aan het designteam' : 'Zet om in campagne') + '</h2>' +
      '<p style="font-size:14px">' + (isAdvies
        ? 'Ons designteam kijkt met je mee naar je uiting en denkt mee over verbeteringen. Je gegevens zijn alvast ingevuld vanuit je profiel.'
        : 'Tevreden met je uiting? Ons salesteam helpt je om hem zo snel mogelijk als campagne in te boeken. Je gegevens zijn alvast ingevuld vanuit je profiel.') + '</p>' +
      (uiting ? '<div style="background:#EAF1F9;border-radius:10px;padding:10px 14px;font-size:13.5px;margin-bottom:12px"><b style="color:#1B4B89">Uiting:</b> ' + esc(uiting) + '</div>' : '') +
      veld('cnaam', 'Naam', 'text', db.user.naam) + veld('cemail', 'E-mailadres', 'email', db.user.email) +
      veld('cbedrijf', 'Bedrijf', 'text', db.user.bedrijf) +
      '<div class="acc-field"><label for="acc-cmsg">' + (isAdvies ? 'Waar wil je advies over?' : 'Vertel kort iets over je campagnewens (periode, regio, budgetindicatie)') + '</label><textarea id="acc-cmsg" rows="4"></textarea></div>' +
      '<button class="acc-prim" id="acc-docontact">' + (isAdvies ? 'Verstuur adviesaanvraag' : 'Stuur door naar sales') + '</button>' +
      (isAdvies ? '<p style="text-align:center;margin-top:12px;font-size:13px">Alvast zelf aan de slag? <a href="https://global.com/nl/onderzoek/tips-out-of-home-creatie/" target="_blank" rel="noreferrer" style="color:#0B78BE;font-weight:600">Bekijk onze creatie-tips</a></p>' : ''),
      { wire: function (m) {
          m.querySelector('#acc-docontact').addEventListener('click', function () {
            db.requests.unshift({
              id: 'r' + Math.random().toString(36).slice(2, 9),
              type: isAdvies ? 'advies' : 'campagne',
              uiting: uiting, msg: m.querySelector('#acc-cmsg').value.trim(),
              naam: m.querySelector('#acc-cnaam').value.trim() || db.user.naam,
              email: m.querySelector('#acc-cemail').value.trim() || db.user.email,
              bedrijf: m.querySelector('#acc-cbedrijf').value.trim(),
              date: new Date().toISOString(), status: 'In behandeling'
            });
            save();
            bevestiging(isAdvies ? 'Adviesaanvraag verzonden' : 'Doorgestuurd naar sales',
              (isAdvies ? 'Het designteam neemt binnen 1 werkdag contact met je op via <b>' + esc(db.user.email) + '</b>.'
                        : 'Ons salesteam neemt binnen 1 werkdag contact met je op via <b>' + esc(db.user.email) + '</b> om je campagne in te boeken.') +
              ' Je vindt de aanvraag terug op je profielpagina.',
              '<a class="acc-sec" style="text-align:center;text-decoration:none" href="' + baseUrl() + 'account/#aanvragen">Bekijk je aanvraag op je profielpagina</a>');
          });
        } });
  }

  /* ---------- icoon & gating ---------- */
  function zetIcoon() {
    if (ingelogd()) { knop.innerHTML = ''; knop.textContent = initialen(); knop.title = db.user.naam; }
    else { knop.innerHTML = PERSOON; knop.title = 'Account'; }
  }
  knop.addEventListener('click', function () { ingelogd() ? (location.href = baseUrl() + 'account/') : toonGate(); });

  /* ---------- uploads archiveren & CTA's tonen (poll op app-state) ---------- */
  var lastSig = null;
  function verklein(src, cb) {
    var img = new Image();
    img.onload = function () {
      var max = 1200, w = img.naturalWidth, h = img.naturalHeight, f = Math.min(1, max / Math.max(w, h));
      var c = document.createElement('canvas'); c.width = Math.round(w * f); c.height = Math.round(h * f);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      try { cb(c.toDataURL('image/jpeg', 0.85)); } catch (e) { cb(src); }
    };
    img.onerror = function () { cb(src); };
    img.src = src;
  }
  function poll() {
    var cr = null;
    try { var d = JSON.parse(localStorage.getItem(APPK)); cr = d && d.creative && d.creative.src ? d.creative : null; } catch (e) {}
    if (cr) {
      var sig = cr.src.length + ':' + cr.src.slice(100, 140);
      if (sig !== lastSig) {
        lastSig = sig;
        if (!db.uploads.some(function (u) { return u.sig === sig || (u.src.length + ':' + u.src.slice(100, 140)) === sig; })) {
          verklein(cr.src, function (klein) {
            db.uploads.unshift({ id: 'u' + Math.random().toString(36).slice(2, 9), sig: sig, name: cr.name || 'Uiting', src: klein, date: new Date().toISOString(), shared: [] });
            if (db.uploads.length > 10) db.uploads.length = 10;
            save();
          });
        }
      }
    } else lastSig = null;
  }
  setInterval(poll, 500);

  /* ---------- heropenen vanuit Mijn uploads ---------- */
  function heropen() {
    var raw = null;
    try { raw = sessionStorage.getItem(REOPEN); } catch (e) {}
    if (!raw) return;
    try { sessionStorage.removeItem(REOPEN); } catch (e) {}
    var u; try { u = JSON.parse(raw); } catch (e) { return; }
    var pogingen = 0;
    var t = setInterval(function () {
      var input = document.querySelector('input[type=file]');
      if (input) {
        clearInterval(t);
        fetch(u.src).then(function (r) { return r.blob(); }).then(function (blob) {
          var f = new File([blob], u.name || 'uiting.jpg', { type: blob.type || 'image/jpeg' });
          var dt = new DataTransfer(); dt.items.add(f);
          input.files = dt.files;
          input.dispatchEvent(new Event('change', { bubbles: true }));
          toast('Eerdere upload geopend: ' + (u.name || 'uiting'));
        });
      } else if (++pogingen > 40) clearInterval(t);
    }, 250);
  }

  function init() {
    document.head.appendChild(style);
    document.body.appendChild(knop);
    zetIcoon(); poll(); heropen();
    /* AL-01: de one-pager (start/) linkt naar de viewer met ?aanvraag=…
       zodat dezelfde aanvraagflow ook vandaar bereikbaar is. */
    try {
      var soort = new URLSearchParams(location.search).get('aanvraag');
      if (soort === 'advies' || soort === 'sales') contactForm(soort);
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
