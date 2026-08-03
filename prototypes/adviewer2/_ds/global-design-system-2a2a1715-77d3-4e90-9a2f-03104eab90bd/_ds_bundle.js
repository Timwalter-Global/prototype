/* @ds-bundle: {"format":3,"namespace":"GlobalDesignSystem_2a2a17","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"Logo","sourcePath":"components/actions/Logo.jsx"},{"name":"Alert","sourcePath":"components/display/Alert.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Stat","sourcePath":"components/display/Stat.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"c51d092c19ab","components/actions/IconButton.jsx":"29a5822a38e8","components/actions/Logo.jsx":"79c17cc37303","components/display/Alert.jsx":"0d3a4fb2e5af","components/display/Avatar.jsx":"d217f45a9e03","components/display/Badge.jsx":"69cebf8bfce5","components/display/Card.jsx":"dfeb45b6fe0a","components/display/Stat.jsx":"977848f0053c","components/display/Tag.jsx":"e05b76337c52","components/forms/Checkbox.jsx":"8d3fe5d4f681","components/forms/Input.jsx":"c7253f5111d2","components/forms/Select.jsx":"d4a73f697afe","components/forms/Switch.jsx":"22c89a11edb2","ui_kits/website/Hero.jsx":"b1e1e23e46b2","ui_kits/website/NetworkSection.jsx":"c0b6cf951298","ui_kits/website/OfferteSection.jsx":"091dd2f2586d","ui_kits/website/SiteFooter.jsx":"3feb7de0c6d2","ui_kits/website/SiteHeader.jsx":"530e792ee335","ui_kits/website/StatsBand.jsx":"30e1886a458e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GlobalDesignSystem_2a2a17 = window.GlobalDesignSystem_2a2a17 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Global primary action button. Renders an <a> when `href` is set,
 * otherwise a <button>. Styling lives in tokens/components.css (.gl-btn).
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className = "",
  ...rest
}) {
  const cls = ["gl-btn", `gl-btn--${variant}`, `gl-btn--${size}`, className].filter(Boolean).join(" ");
  const style = fullWidth ? {
    width: "100%"
  } : undefined;
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "gl-btn__icon",
    "aria-hidden": "true"
  }, iconLeft) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "gl-btn__icon",
    "aria-hidden": "true"
  }, iconRight) : null);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      className: cls,
      style: style
    }, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    style: style,
    disabled: disabled
  }, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Compact square button that holds a single icon. */
function IconButton({
  children,
  label,
  size = "md",
  variant = "ghost",
  type = "button",
  className = "",
  ...rest
}) {
  const cls = ["gl-iconbtn", `gl-iconbtn--${size}`, variant === "solid" ? "gl-iconbtn--solid" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    "aria-label": label,
    title: label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/actions/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The Global wordmark. Pick a `variant` and the component resolves the right
 * file under `base`, or pass an explicit `src`. Height-driven (set `height`).
 */
function Logo({
  variant = "lockup",
  base = "assets",
  src,
  height = 40,
  alt = "Global — Making everyone's day brighter",
  className = "",
  ...rest
}) {
  const files = {
    lockup: "global-lockup-white.png",
    "lockup-blue": "global-lockup-blue.png",
    icon: "global-icon.png"
  };
  const resolved = src || `${base.replace(/\/$/, "")}/${files[variant] || files.lockup}`;
  const cls = ["gl-logo", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: {
      height
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: resolved,
    alt: alt,
    style: {
      height
    }
  }));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Logo.jsx", error: String((e && e.message) || e) }); }

// components/display/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ICONS = {
  info: "i",
  success: "✓",
  warning: "!",
  error: "×"
};

/** Inline message banner. */
function Alert({
  variant = "info",
  title,
  children,
  className = "",
  ...rest
}) {
  const cls = ["gl-alert", `gl-alert--${variant}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "status"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "gl-alert__icon",
    "aria-hidden": "true"
  }, ICONS[variant]), /*#__PURE__*/React.createElement("div", null, title ? /*#__PURE__*/React.createElement("p", {
    className: "gl-alert__title"
  }, title) : null, /*#__PURE__*/React.createElement("p", {
    className: "gl-alert__body"
  }, children)));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Alert.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Circular avatar — image if `src`, otherwise initials. */
function Avatar({
  src,
  name = "",
  size = "md",
  className = "",
  ...rest
}) {
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const cls = ["gl-avatar", `gl-avatar--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    title: name
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : /*#__PURE__*/React.createElement("span", null, initials));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small status / category label. */
function Badge({
  children,
  variant = "brand",
  className = "",
  ...rest
}) {
  const cls = ["gl-badge", `gl-badge--${variant}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Content card with optional media, title and body. Composable via children. */
function Card({
  media,
  mediaAlt = "",
  title,
  children,
  hover = false,
  flat = false,
  className = "",
  ...rest
}) {
  const cls = ["gl-card", hover ? "gl-card--hover" : "", flat ? "gl-card--flat" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), media ? /*#__PURE__*/React.createElement("img", {
    className: "gl-card__media",
    src: media,
    alt: mediaAlt
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "gl-card__body"
  }, title ? /*#__PURE__*/React.createElement("h3", {
    className: "gl-card__title"
  }, title) : null, children ? /*#__PURE__*/React.createElement("div", {
    className: "gl-card__text"
  }, children) : null));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Big-number statistic — eyebrow label, value, optional sub-line. */
function Stat({
  label,
  value,
  sub,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["gl-stat", className].filter(Boolean).join(" ")
  }, rest), label ? /*#__PURE__*/React.createElement("span", {
    className: "gl-stat__label"
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    className: "gl-stat__value"
  }, value), sub ? /*#__PURE__*/React.createElement("span", {
    className: "gl-stat__sub"
  }, sub) : null);
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Stat.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Removable chip / filter tag. Renders the × when `onRemove` is provided. */
function Tag({
  children,
  onRemove,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["gl-tag", className].filter(Boolean).join(" ")
  }, rest), children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "gl-tag__x",
    "aria-label": "Verwijder",
    onClick: onRemove
  }, "\xD7") : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox (default) or radio when `radio` is set. Custom-styled box + label. */
function Checkbox({
  label,
  radio = false,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["gl-check", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: radio ? "radio" : "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: ["gl-check__box", radio ? "gl-check__box--radio" : ""].filter(Boolean).join(" ")
  }, radio ? /*#__PURE__*/React.createElement("span", {
    className: "gl-check__dot"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "gl-check__tick"
  })), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useId
} = React;
/** Labelled text input with optional hint / error. */
function Input({
  label,
  hint,
  error,
  required = false,
  id,
  type = "text",
  className = "",
  ...rest
}) {
  const auto = useId();
  const fieldId = id || auto;
  const inputCls = ["gl-input", error ? "gl-input--error" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "gl-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "gl-label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "gl-req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    className: inputCls,
    "aria-invalid": !!error
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    className: "gl-hint gl-hint--error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "gl-hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useId
} = React;
/** Labelled native select with the brand chevron. */
function Select({
  label,
  hint,
  error,
  required = false,
  id,
  children,
  className = "",
  ...rest
}) {
  const auto = useId();
  const fieldId = id || auto;
  return /*#__PURE__*/React.createElement("div", {
    className: "gl-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "gl-label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "gl-req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "gl-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: ["gl-select", className].filter(Boolean).join(" ")
  }, rest), children)), error ? /*#__PURE__*/React.createElement("span", {
    className: "gl-hint gl-hint--error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "gl-hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** On/off toggle switch. */
function Switch({
  label,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["gl-switch", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "gl-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gl-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
// Global NL — hero.
function Hero({
  onOfferte,
  onScrollNetwork
}) {
  const {
    Button
  } = window.GlobalDesignSystem_2a2a17;
  const stats = [{
    v: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "accent"
    }, "60%")),
    l: 'bereik per week'
  }, {
    v: '3.300+',
    l: 'digitale schermen'
  }, {
    v: '12.000+',
    l: "abri's & europanels"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__bg",
    style: {
      backgroundImage: 'url(../../assets/photo-netwerk.jpg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap hero__inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero__eyebrow"
  }, "\u25CF Marktleider in (Digital) Out-of-Home"), /*#__PURE__*/React.createElement("h1", null, "Making everyone's ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "day brighter")), /*#__PURE__*/React.createElement("p", {
    className: "hero__lead"
  }, "Global is d\xE9 (Digital) Out-of-Home specialist van Nederland. Met het grootste en meest diverse netwerk bereik je elke week 60% van Nederland \u2014 op het juiste moment, op de juiste locatie, voor de juiste doelgroep."), /*#__PURE__*/React.createElement("div", {
    className: "hero__cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: onOfferte,
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192")
  }, "Vraag een offerte aan"), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    size: "lg",
    onClick: onScrollNetwork
  }, "Ontdek het netwerk")), /*#__PURE__*/React.createElement("div", {
    className: "hero__stats"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "hero__stat",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, s.v), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, s.l))))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/NetworkSection.jsx
try { (() => {
// Global NL — network: channel tabs + format grid.
const {
  useState: useStateNet
} = React;
const CHANNELS = {
  Retail: {
    title: 'Retail',
    img: '../../assets/photo-winkelcentrum.jpg',
    text: 'Het grootste digitale netwerk van Nederland — vlak voor het aankoopmoment, in supermarkten en winkelcentra.',
    points: ['800+ schermen bij supermarkten', '6.000+ winkels in winkelcentra', 'Zichtbaar vlak voor aankoop']
  },
  'On-The-Go': {
    title: 'On-The-Go',
    img: '../../assets/photo-locatie.jpg',
    text: 'Bereik mensen onderweg: op tankstations, treinstations en langs de weg. 24/7 zichtbaar, niet uit te zetten.',
    points: ['Tankstations & treinstations', 'Snelwegmasten langs de weg', '24/7 zichtbaarheid']
  },
  Urban: {
    title: 'Urban',
    img: '../../assets/photo-netwerk.jpg',
    text: "Landelijk dekkend netwerk van straatabri's en europanels — massa-bereik in elke gemeente.",
    points: ["12.000+ abri's & europanels", 'In elke gemeente', 'Steeds vaker met groen sedumdak']
  }
};
const FORMATS = [{
  img: '../../assets/format-abri.png',
  name: 'Abri',
  sub: 'Straat & bushalte'
}, {
  img: '../../assets/format-screen-portrait.png',
  name: 'Digital screen',
  sub: 'Retail & stations'
}, {
  img: '../../assets/format-screen-landscape.png',
  name: 'Landscape DOOH',
  sub: 'Winkelcentra'
}, {
  img: '../../assets/format-snelwegmast.png',
  name: 'Snelwegmast',
  sub: 'Langs de snelweg'
}];
function NetworkSection({
  onOfferte
}) {
  const {
    Button,
    Badge
  } = window.GlobalDesignSystem_2a2a17;
  const keys = Object.keys(CHANNELS);
  const [tab, setTab] = useStateNet(keys[0]);
  const c = CHANNELS[tab];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--alt",
    id: "netwerk"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section__eyebrow"
  }, "Ons netwerk"), /*#__PURE__*/React.createElement("h2", null, "E\xE9n netwerk, elke doelgroep"), /*#__PURE__*/React.createElement("p", null, "Van supermarkt tot snelweg \u2014 kies het kanaal dat past bij jouw campagne.")), /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, keys.map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: `tab ${tab === k ? 'tab--active' : ''}`,
    onClick: () => setTab(k)
  }, k))), /*#__PURE__*/React.createElement("div", {
    className: "channel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "channel__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: c.img,
    alt: c.title
  }), /*#__PURE__*/React.createElement("div", {
    className: "channel__badge"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "solid"
  }, c.title))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, c.title), /*#__PURE__*/React.createElement("p", null, c.text), /*#__PURE__*/React.createElement("ul", null, c.points.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), p))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onOfferte,
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192")
  }, "Plan dit kanaal in"))), /*#__PURE__*/React.createElement("div", {
    className: "formats",
    style: {
      marginTop: 64
    }
  }, FORMATS.map(f => /*#__PURE__*/React.createElement("div", {
    className: "format",
    key: f.name
  }, /*#__PURE__*/React.createElement("img", {
    src: f.img,
    alt: f.name
  }), /*#__PURE__*/React.createElement("h4", null, f.name), /*#__PURE__*/React.createElement("span", null, f.sub))))));
}
window.NetworkSection = NetworkSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/NetworkSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/OfferteSection.jsx
try { (() => {
// Global NL — offerte / contact CTA with a working mini-form.
const {
  useState: useStateOff
} = React;
function OfferteSection() {
  const {
    Input,
    Select,
    Button,
    Checkbox
  } = window.GlobalDesignSystem_2a2a17;
  const [sent, setSent] = useStateOff(false);
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "offerte"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta__grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Klaar om op te vallen?"), /*#__PURE__*/React.createElement("p", null, "Laat je gegevens achter en onze specialisten bellen je binnen \xE9\xE9n werkdag om samen de juiste (Digital) Out-of-Home campagne te bouwen.")), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, sent ? /*#__PURE__*/React.createElement("div", {
    className: "panel__ok"
  }, /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, "Bedankt! \uD83D\uDC99"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-body)'
    }
  }, "We hebben je aanvraag ontvangen en bellen je binnen \xE9\xE9n werkdag."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => setSent(false)
  }, "Nieuwe aanvraag"))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel__row"
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Naam",
    placeholder: "Voor- en achternaam",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Bedrijf",
    placeholder: "Bedrijfsnaam",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "full"
  }, /*#__PURE__*/React.createElement(Input, {
    label: "E-mailadres",
    type: "email",
    placeholder: "jij@bedrijf.nl",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "full"
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Netwerk",
    defaultValue: ""
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Kies een netwerk\u2026"), /*#__PURE__*/React.createElement("option", null, "Retail (supermarkten & winkelcentra)"), /*#__PURE__*/React.createElement("option", null, "On-The-Go (tank- & treinstations, snelweg)"), /*#__PURE__*/React.createElement("option", null, "Urban (abri's & europanels)"), /*#__PURE__*/React.createElement("option", null, "Run of Network"))), /*#__PURE__*/React.createElement("div", {
    className: "full",
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Ik wil de Global nieuwsbrief ontvangen"
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    fullWidth: true,
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192")
  }, "Vraag offerte aan")))))));
}
window.OfferteSection = OfferteSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/OfferteSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteFooter.jsx
try { (() => {
// Global NL — footer.
function SiteFooter() {
  const {
    Logo
  } = window.GlobalDesignSystem_2a2a17;
  const cols = [{
    h: 'Netwerk',
    links: ['Retail', 'On-The-Go', 'Urban', 'Digital Out-of-Home', "Abri's & europanels"]
  }, {
    h: 'Global',
    links: ['Over ons', 'Cases', 'Duurzaamheid', 'Werken bij', 'Nieuws']
  }, {
    h: 'Contact',
    links: ['Vraag offerte aan', 'nl.info@global.com', '+31 (0)20 000 0000', 'Amsterdam']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "ftr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ftr__grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    variant: "lockup",
    height: 48,
    base: "../../assets"
  }), /*#__PURE__*/React.createElement("p", {
    className: "ftr__about"
  }, "Global Media & Entertainment is d\xE9 (Digital) Out-of-Home specialist van Nederland.")), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, /*#__PURE__*/React.createElement("h5", null, c.h), c.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l
  }, l))))), /*#__PURE__*/React.createElement("div", {
    className: "ftr__bar"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " Global Media & Entertainment B.V."), /*#__PURE__*/React.createElement("span", null, "Privacy \xB7 Cookies \xB7 Algemene voorwaarden"))));
}
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteHeader.jsx
try { (() => {
// Global NL — site header. Exports to window for the kit's index.html.
const {
  useState,
  useEffect
} = React;
function SiteHeader({
  active,
  onNav,
  onOfferte
}) {
  const {
    Logo,
    Button
  } = window.GlobalDesignSystem_2a2a17;
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['Out-of-Home', 'Netwerk', 'Cases', 'Over ons'];
  return /*#__PURE__*/React.createElement("header", {
    className: `hdr ${solid ? 'hdr--solid' : 'hdr--top'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap hdr__row"
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: solid ? 'lockup-blue' : 'lockup',
    height: 42,
    base: "../../assets"
  }), /*#__PURE__*/React.createElement("nav", {
    className: "hdr__nav"
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    className: `hdr__link ${active === l ? 'hdr__link--active' : ''}`,
    onClick: () => onNav(l)
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "hdr__spacer"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: solid ? 'primary' : 'inverse',
    size: "sm",
    onClick: onOfferte
  }, "Vraag offerte aan")));
}
window.SiteHeader = SiteHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/StatsBand.jsx
try { (() => {
// Global NL — dark stats band.
function StatsBand() {
  const items = [{
    v: '60%',
    l: 'van Nederland bereikt per week'
  }, {
    v: '3.300+',
    l: 'digitale schermen'
  }, {
    v: '12.000+',
    l: "abri's & europanels"
  }, {
    v: '24/7',
    l: 'zichtbaar, niet uit te zetten'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap band__grid"
  }, items.map(i => /*#__PURE__*/React.createElement("div", {
    key: i.l
  }, /*#__PURE__*/React.createElement("div", {
    className: "band__v"
  }, i.v), /*#__PURE__*/React.createElement("div", {
    className: "band__l"
  }, i.l)))));
}
window.StatsBand = StatsBand;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/StatsBand.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

})();
