/* Souhlas s cookies (CZ/EN). Statistika (TOPlist) a mapy Google se načtou až po souhlasu. */
(function () {
  var KEY = "mvp-cookies-v2", en = document.documentElement.lang === "en", base = en ? "../" : "";
  var T = en ? {
    t: "We value your privacy", p: "Necessary cookies keep this site running. With your consent we also use statistics cookies (TOPlist) and show Google Maps, which may set their own cookies. You can change your choice at any time in the footer.",
    more: "Privacy policy", acc: "Accept all", rej: "Reject", set: "Settings",
    st: "Cookie settings", sd: "Choose which cookies we may use.",
    n1: "Necessary", n2: "Needed for the site to work (menu, forms, remembering this choice). Always on.",
    s1: "Statistics", s2: "Anonymous visit counter TOPlist – browser type, screen size and referring page.",
    m1: "External content", m2: "Google Maps on the contact section. Google may set its own cookies.",
    save: "Save selection", all: "Accept all", on: "Always on", close: "Close", re: "Cookie settings",
    ph: "The map is hidden until you allow external content.", ab: "Allow and show map"
  } : {
    t: "Vaše soukromí je pro nás důležité", p: "Nezbytné cookies zajišťují správný chod webu. S Vaším souhlasem používáme také statistické cookies (TOPlist) a zobrazujeme mapy Google, které mohou ukládat vlastní cookies. Svou volbu můžete kdykoli změnit v patičce.",
    more: "Ochrana osobních údajů", acc: "Přijmout vše", rej: "Odmítnout", set: "Nastavení",
    st: "Nastavení cookies", sd: "Vyberte, které cookies smíme používat.",
    n1: "Nezbytné", n2: "Potřebné pro fungování webu (menu, formuláře, zapamatování této volby). Vždy zapnuto.",
    s1: "Statistické", s2: "Anonymní počítadlo návštěvnosti TOPlist – typ prohlížeče, rozlišení obrazovky a odkazující stránka.",
    m1: "Externí obsah", m2: "Mapa Google v sekci Kontakt. Google může ukládat vlastní cookies.",
    save: "Uložit výběr", all: "Přijmout vše", on: "Vždy zapnuto", close: "Zavřít", re: "Nastavení cookies",
    ph: "Mapa se zobrazí po povolení externího obsahu.", ab: "Povolit a zobrazit mapu"
  };
  var topLoaded = false;
  function get() { try { var v = localStorage.getItem(KEY); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function put(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  function el(h) { var d = document.createElement("div"); d.innerHTML = h; return d.firstChild; }
  function loadTop() { if (topLoaded) return; topLoaded = true; var s = document.createElement("script"); s.src = base + "assets/js/toplist.js"; document.body.appendChild(s); }
  function maps(on) {
    document.querySelectorAll("iframe[data-src]").forEach(function (f) {
      if (on) { f.src = f.getAttribute("data-src"); f.removeAttribute("data-src"); f.style.display = ""; var p = f.parentNode.querySelector(".ck-ph"); if (p) p.remove(); }
      else if (!f.parentNode.querySelector(".ck-ph")) {
        var d = el("<div class=\"ck-ph\"><p>" + T.ph + "</p><button type=\"button\" class=\"btn p\">" + T.ab + "</button></div>");
        d.querySelector("button").onclick = function () { var c = get() || {}; save({ s: !!c.s, m: true }); };
        f.style.display = "none"; f.parentNode.insertBefore(d, f);
      }
    });
  }
  function apply(c) {
    if (c && c.s) loadTop();
    if (c && c.m) { maps(true); } else { maps(false); }
    if (c && !c.m) { var ifr = document.querySelectorAll("iframe[src*='google.com/maps']"); ifr.forEach(function (f) { f.setAttribute("data-src", f.src); f.removeAttribute("src"); }); maps(false); }
  }
  function save(c) { put(c); closeAll(); apply(c); }
  function closeAll() { ["ck", "ckm"].forEach(function (id) { var x = document.getElementById(id); if (x) x.remove(); }); document.documentElement.classList.remove("ck-lock"); }
  var ICON = "<svg viewBox=\"0 0 24 24\" width=\"26\" height=\"26\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M21 12.5A9 9 0 1 1 11.5 3a4.5 4.5 0 0 0 5 5 3.5 3.5 0 0 0 4.5 4.5Z\"/><circle cx=\"8.5\" cy=\"11\" r=\"1\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"16\" r=\"1\" fill=\"currentColor\"/><circle cx=\"15.5\" cy=\"12.5\" r=\"1\" fill=\"currentColor\"/></svg>";
  function banner() {
    closeAll();
    var b = el("<div id=\"ck\" role=\"dialog\" aria-labelledby=\"ck-t\" translate=\"no\"><div class=\"ck-i\">" + ICON + "</div><div class=\"ck-x\"><h2 id=\"ck-t\">" + T.t + "</h2><p>" + T.p + " <a href=\"" + base + "index.html#/ochrana-osobnich-udaju\">" + T.more + "</a></p></div><div class=\"ck-b\"><button type=\"button\" class=\"ck-s\">" + T.set + "</button><button type=\"button\" class=\"ck-n\">" + T.rej + "</button><button type=\"button\" class=\"ck-a\">" + T.acc + "</button></div></div>");
    b.querySelector(".ck-a").onclick = function () { save({ s: true, m: true }); };
    b.querySelector(".ck-n").onclick = function () { save({ s: false, m: false }); };
    b.querySelector(".ck-s").onclick = function () { modal(); };
    document.body.appendChild(b);
  }
  function row(id, h, d, on, fixed) {
    return "<label class=\"ck-r\"><span class=\"ck-rt\"><b>" + h + "</b><small>" + d + "</small></span>" +
      (fixed ? "<span class=\"ck-f\">" + T.on + "</span>" : "<input type=\"checkbox\" id=\"" + id + "\" role=\"switch\"" + (on ? " checked" : "") + "><span class=\"ck-sw\" aria-hidden=\"true\"></span>") + "</label>";
  }
  function modal() {
    var c = get() || {}, prev = document.activeElement; closeAll();
    var m = el("<div id=\"ckm\" translate=\"no\"><div class=\"ck-o\"></div><div class=\"ck-d\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"ckm-t\"><button type=\"button\" class=\"ck-c\" aria-label=\"" + T.close + "\">×</button><h2 id=\"ckm-t\">" + T.st + "</h2><p class=\"ck-sub\">" + T.sd + "</p>" +
      row("", T.n1, T.n2, true, true) + row("ck-s1", T.s1, T.s2, !!c.s) + row("ck-m1", T.m1, T.m2, !!c.m) +
      "<div class=\"ck-b2\"><button type=\"button\" class=\"ck-n\">" + T.save + "</button><button type=\"button\" class=\"ck-a\">" + T.all + "</button></div></div></div>");
    document.documentElement.classList.add("ck-lock");
    function done() { closeAll(); if (get() === null) banner(); if (prev && prev.focus && document.body.contains(prev)) prev.focus(); }
    m.querySelector(".ck-n").onclick = function () { save({ s: m.querySelector("#ck-s1").checked, m: m.querySelector("#ck-m1").checked }); };
    m.querySelector(".ck-a").onclick = function () { save({ s: true, m: true }); };
    m.querySelector(".ck-c").onclick = done; m.querySelector(".ck-o").onclick = done;
    m.addEventListener("keydown", function (e) { if (e.key === "Escape") done(); });
    document.body.appendChild(m); m.querySelector(".ck-c").focus();
  }
  function footerLink() {
    var f = document.querySelector(".fb-l"); if (!f || f.querySelector(".ck-re")) return;
    var s = el("<span class=\"ck-sep\" aria-hidden=\"true\"> · </span>"), b = el("<button type=\"button\" class=\"ck-re\">" + T.re + "</button>");
    b.onclick = modal; f.appendChild(s); f.appendChild(b);
  }
  function init() {
    footerLink();
    var c = get();
    if (c) { apply(c); } else { maps(false); banner(); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
