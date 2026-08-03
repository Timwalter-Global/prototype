/* Feedback-onboarding voor prototypepagina's.
   Toont bij het eerste bezoek aan een prototype een pop-up die uitlegt dat
   feedback via de Usersnap Feedback-knop gaat. Eenmalig per browser per
   prototype (localStorage, gedeeld tussen alle pagina's van dezelfde slug).
   Wordt op elke prototypepagina geladen tussen de markers
   <!-- FEEDBACK-ONBOARDING-START --> ... <!-- FEEDBACK-ONBOARDING-END -->. */
(function () {
  var m = location.pathname.match(/\/prototypes\/([^\/]+)\//);
  var slug = m ? m[1] : location.pathname;
  var KEY = 'feedbackOnboardingGezien:' + slug;
  try {
    if (localStorage.getItem(KEY)) return;
  } catch (e) {
    return; /* storage geblokkeerd: liever geen popup dan elke keer een popup */
  }

  function init() {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}

    var style = document.createElement('style');
    style.textContent =
      '.gfb-overlay{position:fixed;inset:0;background:rgba(23,40,66,.45);display:flex;align-items:center;justify-content:center;z-index:2147483600;padding:20px;font-family:"Century Gothic",CenturyGothic,Poppins,sans-serif;font-size:15px;line-height:1.55;color:#575756}' +
      '.gfb-modal{background:#fff;border-radius:18px;box-shadow:0 18px 44px rgba(27,75,137,.20);width:100%;max-width:520px;padding:28px 30px;position:relative;box-sizing:border-box;animation:gfb-pop .22s ease}' +
      '@keyframes gfb-pop{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}' +
      '@media (prefers-reduced-motion:reduce){.gfb-modal{animation:none}}' +
      '.gfb-modal *{margin:0;padding:0;box-sizing:border-box}' +
      '.gfb-close{position:absolute;top:14px;right:16px;background:none;border:none;font-size:20px;color:#9AA3B5;cursor:pointer;font-family:inherit;line-height:1;padding:4px}' +
      '.gfb-close:hover{color:#575756}' +
      '.gfb-modal h2{color:#1B4B89;font-size:21px;font-weight:800;margin-bottom:4px}' +
      '.gfb-lead{font-size:14px;margin-bottom:18px}' +
      '.gfb-step{display:flex;gap:13px;align-items:flex-start;padding:12px 0;border-bottom:1px solid #EEF1F6}' +
      '.gfb-step:last-of-type{border-bottom:none}' +
      '.gfb-num{flex:0 0 28px;height:28px;border-radius:50%;background:#195AA6;color:#fff;font-weight:700;font-size:13px;display:grid;place-items:center}' +
      '.gfb-step h4{color:#1B4B89;font-size:14.5px;font-weight:700;margin-bottom:2px}' +
      '.gfb-step p{font-size:13.5px}' +
      '.gfb-minitab{display:inline-block;background:#5BC4E8;color:#fff;font-weight:700;font-size:12px;padding:4px 10px;border-radius:6px;vertical-align:middle}' +
      '.gfb-cta{margin-top:20px;width:100%;border:none;border-radius:12px;background:#195AA6;color:#fff;font-weight:700;font-size:15px;padding:13px 0;cursor:pointer;font-family:inherit}' +
      '.gfb-cta:hover{background:#1B4B89}' +
      '.gfb-close:focus-visible,.gfb-cta:focus-visible{outline:3px solid #0B78BE;outline-offset:2px}';
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.className = 'gfb-overlay';
    overlay.innerHTML =
      '<div class="gfb-modal" role="dialog" aria-modal="true" aria-labelledby="gfb-title">' +
        '<button class="gfb-close" type="button" aria-label="Sluiten">✕</button>' +
        '<h2 id="gfb-title">Zo geef je feedback</h2>' +
        '<p class="gfb-lead">Je bekijkt een prototype van Global. We horen graag wat jij ervan vindt — feedback geven kan doorlopend.</p>' +
        '<div class="gfb-step"><span class="gfb-num">1</span><div>' +
          '<h4>Probeer het uit</h4>' +
          '<p>Klik rond zoals je dat normaal zou doen. Het is een prototype, dus niet alles hoeft te werken.</p>' +
        '</div></div>' +
        '<div class="gfb-step"><span class="gfb-num">2</span><div>' +
          '<h4>Zie je iets? Klik op <span class="gfb-minitab">Feedback</span></h4>' +
          '<p>De knop staat rechts in beeld en is altijd zichtbaar.</p>' +
        '</div></div>' +
        '<div class="gfb-step"><span class="gfb-num">3</span><div>' +
          '<h4>Beschrijf het kort en verstuur</h4>' +
          '<p>Wat mis je of wat werkt niet? Voeg eventueel een screenshot of opname toe en klik op Submit.</p>' +
        '</div></div>' +
        '<button class="gfb-cta" type="button">Begrepen, start met testen</button>' +
      '</div>';
    document.body.appendChild(overlay);

    var vorigeFocus = document.activeElement;
    function sluit() {
      overlay.remove();
      style.remove();
      document.removeEventListener('keydown', opEscape);
      if (vorigeFocus && vorigeFocus.focus) vorigeFocus.focus();
    }
    function opEscape(e) { if (e.key === 'Escape') sluit(); }

    overlay.querySelector('.gfb-close').addEventListener('click', sluit);
    overlay.querySelector('.gfb-cta').addEventListener('click', sluit);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) sluit(); });
    document.addEventListener('keydown', opEscape);
    overlay.querySelector('.gfb-cta').focus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
