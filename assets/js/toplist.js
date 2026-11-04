/* TOPlist počítadlo návštěv – nastavení
   1) ID: číslo webu z TOPlistu (ve zdrojovém kódu počítadla je za "count.asp?id=")
   2) LOGO: vzhled počítadla – hodnota "logo=" z kódu z TOPlistu (rozměry určí obrázek sám)
   Dokud je ID prázdné, počítadlo se nezobrazí a nic se nepočítá. */
(function () {
  var ID = "944867";
  var LOGO = "mc";
  var box = document.getElementById("toplist");
  if (!ID || !box) return;
  var a = document.createElement("a");
  a.href = "https://www.toplist.cz/stat/" + ID;
  a.target = "_blank"; a.rel = "noopener"; a.title = "TOPlist";
  var i = new Image();
  i.alt = "TOPlist";
  i.src = "https://toplist.cz/count.asp?id=" + ID + "&logo=" + LOGO +
    "&http=" + encodeURIComponent(document.referrer) +
    "&t=" + encodeURIComponent(document.title) +
    "&l=" + encodeURIComponent(document.URL) +
    "&wi=" + encodeURIComponent(screen.width) +
    "&he=" + encodeURIComponent(screen.height) +
    "&cd=" + encodeURIComponent(screen.colorDepth);
  a.appendChild(i); box.appendChild(a);
})();
