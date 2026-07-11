export function GET() {
  const script = `
(function() {
  var levels = ["n5","n4","n3","n2","n1"];
  var all = [];
  Promise.all(levels.map(function(l) {
    return fetch('https://www.kanjitest.online/' + l + '/flashcards/deck.json').then(function(r) { return r.json(); });
  })).then(function(results) {
    all = results.flat();
    var today = new Date();
    var dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    var kanji = all[dayOfYear % all.length];
    if (!kanji) return;
    var el = document.getElementById('kanjitest-widget');
    if (!el) {
      el = document.createElement('div');
      el.id = 'kanjitest-widget';
      document.currentScript.parentNode.insertBefore(el, document.currentScript);
    }
    el.innerHTML = '<div style="font-family:sans-serif;border:1px solid #e5e5e5;border-radius:12px;padding:16px;max-width:280px;background:#faf7f2">' +
      '<div style="font-size:11px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Kanji of the Day</div>' +
      '<div style="display:flex;align-items:center;gap:12px">' +
        '<div style="font-size:48px;font-family:serif;line-height:1;color:#221f1a">' + kanji.kanji + '</div>' +
        '<div><div style="font-size:13px;font-weight:600;color:#221f1a">' + kanji.meanings[0] + '</div>' +
        '<div style="font-size:12px;color:#999">' + (kanji.kun[0] || '') + ' ' + (kanji.on[0] || '') + '</div></div>' +
      '</div>' +
      '<div style="margin-top:10px;padding-top:10px;border-top:1px solid #e5e5e5;text-align:center">' +
        '<a href="https://www.kanjitest.online/" style="font-size:11px;color:#d9482f;text-decoration:none;font-weight:600">KanjiTest.Online</a>' +
      '</div></div>';
  });
})();
`
  return new Response(script, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
