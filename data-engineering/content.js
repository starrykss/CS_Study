(() => {
const { scene, node, edge, text, arrow, dot, item, sec, page, C } = CZ;
const hid = o => Object.assign({ opacity: '0' }, o || {});
const r3 = n => +(+n).toFixed(3);
const cv = c => c.includes('(') ? c : `var(--${c})`;
const tint = (c, p) => `color-mix(in srgb,var(--${c}) ${p}%,var(--ui))`;
const vis = (S, k, st, off) => { if (st) S.set(k, st, { opacity: '1' }); if (off) S.set(k, off, { opacity: '0' }); };
const fr = (x0, x1, y0, y1, L, R, T, B) => ({ x0, x1, y0, y1, L, R, T, B, u: (R - L) / (x1 - x0), X: x => L + (x - x0) / (x1 - x0) * (R - L), Y: y => B - (y - y0) / (y1 - y0) * (B - T) });
/* frame with origin at (ox, oy) on the stage, u em per unit, integer extents */
const pf = (ox, oy, u, xa, xb, ya, yb) => fr(xa, xb, ya, yb, ox + xa * u, ox + xb * u, oy - yb * u, oy - ya * u);
const dashBg = (c, dir) => `repeating-linear-gradient(${dir || 90}deg,${cv(c)} 0 .45em,transparent .45em .75em)`;
function seg(S, k, a, b, st, color, h, o = {}) {
  h = h || .18; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = o.dash ? 0 : dx / L * h * .45, uy = o.dash ? 0 : dy / L * h * .45;
  const bg = o.dash ? dashBg(color) : cv(color);
  edge(S, k, a[0] - ux, a[1] - uy, b[0] + ux, b[1] + uy, { h, y: a[1] - uy - h / 2, s: st ? hid({ background: bg }) : { background: bg } });
  vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' });
}
function poly(S, pfx, pts, o = {}) { let n = 0; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if (!a || !b) continue; const st = typeof o.st === 'function' ? o.st(i, pts.length - 1) : o.st; seg(S, pfx + (n++), a, b, st, o.color || 'accent', o.h, { off: o.off }); } return n; }
function pplot(S, pfx, P, t0, t1, o = {}) { const n = o.n || 48, pts = []; for (let i = 0; i <= n; i++) pts.push(P(t0 + (t1 - t0) * i / n)); return poly(S, pfx, pts, o); }
/* plot a parametric curve given in math coordinates, dropping points outside the frame */
function mplot(S, pfx, F, P, t0, t1, o = {}) { return pplot(S, pfx, t => { const [x, y] = P(t); return x >= F.x0 - 1e-9 && x <= F.x1 + 1e-9 && y >= F.y0 - 1e-9 && y <= F.y1 + 1e-9 ? [F.X(x), F.Y(y)] : null; }, t0, t1, o); }
/* clip segment p-q (math coords) to the frame (Liang-Barsky) */
function clip(F, p, q) {
  let t0 = 0, t1 = 1; const dx = q[0] - p[0], dy = q[1] - p[1];
  const tests = [[-dx, p[0] - F.x0], [dx, F.x1 - p[0]], [-dy, p[1] - F.y0], [dy, F.y1 - p[1]]];
  for (const [pp, qq] of tests) { if (pp === 0) { if (qq < 0) return null; continue; } const t = qq / pp; if (pp < 0) { if (t > t1) return null; if (t > t0) t0 = t; } else { if (t < t0) return null; if (t < t1) t1 = t; } }
  return [[p[0] + t0 * dx, p[1] + t0 * dy], [p[0] + t1 * dx, p[1] + t1 * dy]];
}
function mline(S, k, F, p, q, o = {}) { const c = clip(F, p, q); if (!c) return; seg(S, k, [F.X(c[0][0]), F.Y(c[0][1])], [F.X(c[1][0]), F.Y(c[1][1])], o.st, o.color || 'accent', o.h || .14, o); }
const thru = (S, k, F, d, o = {}) => mline(S, k, F, [(o.p || [0, 0])[0] - 99 * d[0], (o.p || [0, 0])[1] - 99 * d[1]], [(o.p || [0, 0])[0] + 99 * d[0], (o.p || [0, 0])[1] + 99 * d[1]], o);
const vl = (S, k, x, y1, y2, color, st, o = {}) => { S.el(k, { x: x - (o.w || .14) / 2, y: Math.min(y1, y2), w: o.w || .14, h: Math.abs(y2 - y1), css: `background:${o.dash ? dashBg(color, 180) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const hl = (S, k, x1, x2, y, color, st, o = {}) => { S.el(k, { x: Math.min(x1, x2), y: y - (o.w || .14) / 2, w: Math.abs(x2 - x1), h: o.w || .14, css: `background:${o.dash ? dashBg(color) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rect = (S, k, x, y, w, h, color, pct, st, o = {}) => { S.el(k, { x, y, w, h, html: o.html || '', cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: tint(color, pct) }) }); vis(S, k, st, o.off); };
const pt = (S, k, x, y, st, sty, r, o = {}) => { dot(S, k, x, y, '', { r: r || .42, s: Object.assign(st ? { opacity: '0' } : {}, sty || C.cur) }); vis(S, k, st, o.off); };
const T = (S, k, x, y, t, cls, st, o = {}) => { const p = { cls: 'cz-t ' + (cls || ''), css: 'z-index:5;' + (o.css || ''), s: st ? hid() : {} }; if (o.w) p.w = o.w; text(S, k, x, y, t, p); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.3' }); };
const L = (S, k, x, y, w, cls, list) => S.label(k, { cls: 'cz-t ' + cls, x, y, w, css: 'z-index:5' }, [[0, '']].concat(list));
const ar = (S, k, a, b, color, st, o = {}) => { const c = cv(color || 'ink-2'); arrow(S, k, a[0], a[1], b[0], b[1], { h: o.h || .16, s: Object.assign(st ? hid() : {}, { background: o.dash ? dashBg(color) : c, 'border-color': c }) }); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' }); };
const mar = (S, k, F, a, b, color, st, o) => ar(S, k, [F.X(a[0]), F.Y(a[1])], [F.X(b[0]), F.Y(b[1])], color, st, o);
const mpt = (S, k, F, p, st, sty, r, o) => pt(S, k, F.X(p[0]), F.Y(p[1]), st, sty, r, o);
const mT = (S, k, F, p, dx, dy, t, cls, st, o) => T(S, k, F.X(p[0]) + dx, F.Y(p[1]) + dy, t, cls, st, o);
/* static grid with integer lines and axes */
function grid(S, k, F, st, o = {}) {
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'de-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
  if (F.y0 <= 0 && F.y1 >= 0) hl(S, k + 'x', F.L, F.R, F.Y(0), 'ink-3', st, { w: .1, off: o.off });
  if (F.x0 <= 0 && F.x1 >= 0) vl(S, k + 'y', F.X(0), F.T, F.B, 'ink-3', st, { w: .1, off: o.off });
}
/* matrix [[a,b],[c,d]] (math, y up) as a CSS transform */

/* ---- probability helpers ---- */
const poly2 = (S, k, pts, fill, st, o = {}) => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
  S.el(k, { x: x0, y: y0, w, h, css: `clip-path:polygon(${pts.map(([x, y]) => `${r3(x - x0)}em ${r3(y - y0)}em`).join(',')});background:${fill};${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(7);
const gauss = () => { const u = Math.max(rnd(), 1e-9), v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const npdf = (x, m = 0, s = 1) => Math.exp(-(((x - m) / s) ** 2) / 2) / (s * Math.sqrt(2 * Math.PI));
const fact = n => n <= 1 ? 1 : n * fact(n - 1), C2 = (n, k) => fact(n) / (fact(k) * fact(n - k));
const ring = (S, k, cx, cy, r, color, st, o = {}) => { S.el(k, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, css: `border-radius:50%;border:${o.w || .12}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)};${o.fill ? `background:${o.fill};` : ''}${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const ax2 = (S, k, F, xl, yl, st) => { hl(S, k + 'x', F.L, F.R, F.Y(Math.max(F.y0, 0)), 'ink-3', st, { w: .12 }); vl(S, k + 'y', F.X(Math.max(F.x0, 0)), F.T, F.B, 'ink-3', st, { w: .12 });
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono de-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono de-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c de-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));

/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono de-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c de-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'de-s de-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono de-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono de-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ================= pipeline foundations ================= */
function sEtl() {
  const S = scene({ id: 'de-etl', steps: 5, per: 1.5 });
  const SRC = ['MySQL', 'REST API', ['로그 파일', 'log files']];
  SRC.forEach((l, i) => box2(S, 'src' + i, 1, 2.2 + i * 2.4, 5.4, 1.9, l, 'ink-3', 0, { pct: 20 }));
  T(S, 'tg1', 9.4, 1.4, 'ETL: Extract → Transform → Load', 'cz-mono de-xs de-w', 1);
  SRC.forEach((l, i) => ar(S, 'ea' + i, [6.5, 3.15 + i * 2.4], [9.3, 5.6], 'ink-3', 1, { h: .1 }));
  box2(S, 'tsv', 9.4, 3.6, 7.2, 4, ['변환 서버', 'transform server'], 'warn', 1, { pct: 25 });
  T(S, 'tsvs', 9.4, 7.9, ['정제 · 조인 · 집계', 'clean · join · aggregate'], 'cz-tc de-xs', 1, { w: 7.2 });
  ar(S, 'el', [16.7, 5.6], [19.9, 5.6], 'ink-3', 1, { h: .12 });
  box2(S, 'wh1', 20, 3.6, 11, 4, ['웨어하우스: 정리된 표만', 'warehouse: clean tables only'], 'accent', 1, { pct: 20 });
  T(S, 'lost', 20, 7.9, ['✗ 원본은 남지 않아요', '✗ the raw data is gone'], 'de-xs de-r', 2);
  T(S, 'tg2', 9.4, 9.5, 'ELT: Extract → Load → Transform', 'cz-mono de-xs de-g', 3);
  elb(S, 'll', [[3.7, 9.2], [3.7, 12.1], [9.3, 12.1]], 'ok', 3, { h: .12 }); T(S, 'lll', 4.1, 10, 'E + L', 'cz-mono de-xs de-g', 3);
  const Z = [[9.4, 6.6, ['원본 그대로', 'raw, as loaded'], 'ink-3', 'bronze'], [17.2, 6.6, ['정제', 'staging'], 'accent', 'silver'], [25, 6, ['분석용 마트', 'marts'], 'ok', 'gold']];
  Z.forEach(([x, w, l, c, m], i) => { box2(S, 'z' + i, x, 10.8, w, 2.6, l, c, 3, { pct: 25 }); T(S, 'zm' + i, x, 13.7, m, 'cz-tc cz-mono de-xs de-w', 4, { w });
    if (i) { ar(S, 'za' + i, [x - 1.1, 12.1], [x - .1, 12.1], 'ink-3', 3, { h: .1 }); T(S, 'zs' + i, x - 2.1, 13.7, 'SQL', 'cz-tc cz-mono de-xs de-a', 3, { w: 3 }); } });
  [['ETL: 적재하기 전에 별도 서버에서 변환해요', 'ETL: transform on a separate server before loading'], ['정리된 결과만 남아서 새 질문이 생기면 원본부터 다시 추출해야 해요', 'only the cleaned result is kept: a new question means extracting again'], ['ELT: 원본을 먼저 적재하고 웨어하우스 안에서 SQL로 변환해요', 'ELT: load raw data first, then transform with SQL inside the warehouse'], ['원본이 남아 있으니 새 질문엔 SQL만 다시 돌리면 돼요 (메달리온 구조)', 'the raw data stays, so new questions just rerun SQL (medallion layers)']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16, t, 'de-s', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 16, ['저장은 싸고 웨어하우스는 강해져서 ELT가 대세 · dbt가 SQL 변환을 코드처럼 관리', 'cheap storage and strong warehouses made ELT the norm · dbt manages SQL like code'], 'de-xs de-a', 5);
  T(S, 'z2', 1, 17.3, ['개인정보처럼 적재 전에 지워야 하는 건 여전히 ETL로 처리해요', 'data that must be scrubbed before landing, like PII, still goes ETL'], 'de-xs', 5);
  S.cap(1, 'ETL: 변환한 뒤 적재', 'ETL: transform, then load')
    .cap(2, '원본이 남지 않아요', 'The raw data is lost')
    .cap(3, 'ELT: 적재한 뒤 변환', 'ELT: load, then transform')
    .cap(4, '원본 → 정제 → 마트 단계로 쌓아요', 'Layers: raw → staging → marts')
    .cap(5, 'ETL과 ELT', 'ETL vs ELT');
  return S;
}
function sBatch() {
  const S = scene({ id: 'de-batch', steps: 5, per: 1.5 });
  const X = h => 3 + h, EV = [];
  for (let i = 0; i < 34; i++) EV.push(.4 + i * .69 + (rnd() - .5) * .45);
  T(S, 'l0', .3, 2.1, ['이벤트', 'events'], 'de-xs'); hl(S, 'ax', 3, 28, 2.6, 'line', 0, { w: .08 });
  EV.forEach((h, i) => pt(S, 'e' + i, X(h), 2.6, 1, C.cur, .2));
  T(S, 'l1', .3, 5.6, ['배치', 'batch'], 'de-xs', 2);
  rect(S, 'col', X(0), 3.25, 24, .4, 'warn', 40, 2, { r: .2 }); T(S, 'coll', X(6), 3.8, ['하루치를 모아 두기', 'collect a whole day'], 'de-xs de-w', 2);
  ar(S, 'ja', [X(24), 3.8], [X(26), 5.1], 'warn', 2, { h: .1 }); box2(S, 'job', 27, 5.2, 4.2, 1.8, ['02:00 배치', '02:00 job'], 'warn', 2, { pct: 35 });
  T(S, 'jr', 17, 7.4, ['결과: 다음 날 아침 (지연 몇 시간~하루)', 'results: next morning (hours to a day late)'], 'de-xs de-r', 2);
  T(S, 'l2', .3, 9.6, ['스트림', 'stream'], 'de-xs', 3);
  EV.forEach((h, i) => rect(S, 's' + i, X(h) - .2, 9.4, .4, 1.1, 'ok', 55, 3, { r: .1 }));
  T(S, 'sr', 17, 11, ['결과: 몇 초 뒤 (계속 갱신)', 'results: seconds later (always fresh)'], 'de-xs de-g', 3);
  [['00:00', 0], ['12:00', 12], ['24:00', 24]].forEach(([l, h]) => T(S, 'tl' + h, X(h) - 1.5, 12.4, l, 'cz-tc cz-mono de-xs', 0, { w: 3 }));
  [['이벤트는 하루 종일 끊임없이 들어와요', 'events arrive all day long'], ['배치: 하루치를 모아 한밤중에 한 번에 처리해요', 'batch: collect a day’s worth and process it at night'], ['스트림: 들어오는 즉시 하나씩 처리해요', 'stream: process each event as it arrives']]
    .forEach((t, i) => T(S, 'n' + i, 1, 14.2, t, 'de-s', i + 1, { off: i + 2 }));
  T(S, 'n4', 1, 14.2, ['배치: 처리량이 크고 단순하며 다시 돌리기 쉬움 · 대신 결과가 늦어요', 'batch: high throughput, simple, easy to rerun · but results come late'], 'de-xs de-w', 4);
  T(S, 'n4b', 1, 15.5, ['스트림: 초 단위로 빠름 · 상태 관리, 늦게 온 데이터, 순서 처리가 어려워요', 'stream: seconds fresh · but state, late data and ordering are hard'], 'de-xs de-g', 4);
  T(S, 'z1', 1, 16.8, ['몇 초씩 묶는 마이크로 배치는 중간 · 람다 아키텍처는 둘 다, 카파는 스트림 하나로 재처리까지', 'micro-batches sit in between · Lambda runs both paths, Kappa uses one stream plus replay'], 'de-xs', 5);
  T(S, 'z2', 1, 18.1, ['Spark · dbt (배치) / Flink · Kafka Streams · Spark Structured Streaming (스트림)', 'Spark, dbt (batch) / Flink, Kafka Streams, Spark Structured Streaming (stream)'], 'de-xs de-a', 5);
  S.cap(1, '데이터는 끊임없이 들어와요', 'Data never stops arriving')
    .cap(2, '배치: 모아서 한 번에', 'Batch: gather, then process at once')
    .cap(3, '스트림: 오는 즉시', 'Stream: process as it comes')
    .cap(4, '처리량과 지연의 맞바꿈', 'Throughput versus latency')
    .cap(5, '배치 처리와 스트림 처리', 'Batch vs stream processing');
  return S;
}
function sDag() {
  const S = scene({ id: 'de-dag', steps: 5, per: 1.5 });
  T(S, 'sc', 1, 1, ['schedule: 0 2 * * *  (매일 02:00)', 'schedule: 0 2 * * *  (daily 02:00)'], 'cz-mono de-xs de-a', 1);
  const N = [['e1', 1, 2.4, 5.4, ['주문 추출', 'extract orders']], ['e2', 1, 6.4, 5.4, ['회원 추출', 'extract users']], ['jn', 8.4, 4.4, 4.4, ['조인', 'join']], ['ag', 14.6, 4.4, 4.8, ['집계', 'aggregate']], ['qc', 21.2, 4.4, 4.8, ['품질 검사', 'quality check']], ['pb', 27.4, 4.4, 4, ['대시보드 갱신', 'publish']]];
  N.forEach(([k, x, y, w, l]) => box2(S, k, x, y, w, 2, l, 'line', 0, { pct: 45 }));
  [[[6.5, 3.4], [8.3, 5]], [[6.5, 7.4], [8.3, 5.8]], [[12.9, 5.4], [14.5, 5.4]], [[19.5, 5.4], [21.1, 5.4]], [[26.1, 5.4], [27.3, 5.4]]].forEach(([a, b], i) => ar(S, 'ed' + i, a, b, 'ink-3', 0, { h: .1 }));
  tsets(S, 'e1', [[2, 'ok', 40]]); tsets(S, 'e2', [[2, 'ok', 40]]); tsets(S, 'jn', [[2, 'accent', 40], [3, 'ok', 40]]);
  tsets(S, 'ag', [[3, 'warn', 50], [4, 'ok', 40]]); tsets(S, 'qc', [[4, 'danger', 45], [5, 'ok', 40]]); tsets(S, 'pb', [[5, 'ok', 40]]);
  T(S, 'jnl', 8.4, 6.7, ['실행 중', 'running'], 'cz-tc de-xs de-a', 2, { w: 4.4, off: 3 });
  T(S, 'agl', 14.6, 6.7, ['실패 → 재시도 1/3', 'failed → retry 1/3'], 'cz-tc de-xs de-w', 3, { w: 4.8, off: 4 });
  T(S, 'qcl', 21.2, 6.7, ['✗ 행 수 급감', '✗ rows dropped'], 'cz-tc de-xs de-r', 4, { w: 4.8, off: 5 }); T(S, 'pbl', 27.4, 6.7, ['건너뜀 · 알림', 'skipped · alert'], 'cz-tc de-xs de-r', 4, { w: 4, off: 5 });
  T(S, 'hh', 1, 9.4, ['최근 실행 기록', 'recent runs'], 'de-xs', 0);
  for (let d = 0; d < 7; d++) { const bad = d === 2 || d === 3; box2(S, 'd' + d, 1 + d * 4.3, 10.6, 3.9, 1.6, `11/0${d + 2}`, bad ? 'danger' : 'ok', 0, { pct: bad ? 40 : 30 }); if (bad) tsets(S, 'd' + d, [[5, 'ok', 45]]); }
  T(S, 'bf', 9.6, 12.5, ['↻ 버그를 고친 뒤 과거 날짜를 다시 실행 (백필)', '↻ after the fix, past dates are rerun (backfill)'], 'de-xs de-g', 5);
  [['작업과 의존성을 DAG로 정의하고 스케줄을 걸어요', 'define tasks and dependencies as a DAG with a schedule'], ['앞 작업이 끝난 것부터 실행 · 서로 무관하면 병렬로', 'a task runs once its upstreams finish · independent ones run in parallel'], ['실패하면 정해진 간격과 횟수만큼 재시도해요', 'failures retry with a set delay and count'], ['품질 검사에 걸리면 하류 작업을 멈추고 알림 → 틀린 숫자가 대시보드에 안 나가요', 'a failed check halts downstream work and alerts → bad numbers never reach the dashboard']]
    .forEach((t, i) => T(S, 'n' + i, 1, 14.4, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 14.4, ['오케스트레이터는 순서·재시도·백필·알림을 맡고, 실제 계산은 Spark·SQL이 해요', 'the orchestrator handles order, retries, backfills and alerts; Spark or SQL does the compute'], 'de-xs', 5);
  T(S, 'z2', 1, 15.7, 'Apache Airflow · Dagster · Prefect · Argo Workflows', 'de-xs de-a', 5);
  S.cap(1, '작업 흐름을 DAG로 정의해요', 'Define the workflow as a DAG')
    .cap(2, '의존성 순서대로 실행', 'Run in dependency order')
    .cap(3, '실패하면 재시도', 'Retry on failure')
    .cap(4, '검사에 걸리면 멈춰요', 'Stop when a check fails')
    .cap(5, '워크플로 오케스트레이션', 'Workflow orchestration');
  return S;
}
function sIdem() {
  const S = scene({ id: 'de-idem', steps: 5, per: 1.5 });
  box2(S, 'job', 11.6, 1.8, 8.8, 2, 'load_sales(dt = 11-09)', 'accent', 0, { pct: 22 }); tsets(S, 'job', [[2, 'warn', 40], [3, 'accent', 22]]);
  T(S, 'r1', 21, 2.3, ['1차 실행', 'run 1'], 'de-xs de-a', 1, { off: 2 }); T(S, 'r2', 21, 2.3, ['쓰다가 실패 → 2차 실행', 'failed mid-write → run 2'], 'de-xs de-w', 2);
  ar(S, 'aa', [14.4, 3.9], [8, 5.9], 'ink-3', 1, { h: .12 }); ar(S, 'ab', [17.6, 3.9], [24, 5.9], 'ink-3', 1, { h: .12 });
  frame(S, 'fa', 1, 6, 13.6, 4.6, 'ink-3', 0, { w: .12 }); T(S, 'ah', 1.4, 6.3, 'INSERT INTO (append)', 'cz-mono de-xs');
  box2(S, 'a1', 1.6, 7.5, 5.8, 1.6, ['1,000행', '1,000 rows'], 'accent', 1, { pct: 30 }); box2(S, 'a2', 7.6, 7.5, 6.4, 1.6, ['+1,000 중복', '+1,000 dupes'], 'danger', 3, { pct: 35 });
  T(S, 'al', 1.6, 9.4, ['합계 2,000행 ✗', 'total 2,000 rows ✗'], 'de-xs de-r', 3);
  frame(S, 'fb', 17.4, 6, 13.6, 4.6, 'ink-3', 0, { w: .12 }); T(S, 'bh', 17.8, 6.3, 'INSERT OVERWRITE PARTITION', 'cz-mono de-xs');
  box2(S, 'b1', 18, 7.5, 5.8, 1.6, ['1,000행', '1,000 rows'], 'accent', 1, { pct: 30 }); tsets(S, 'b1', [[3, 'ok', 40]]);
  T(S, 'bl', 18, 9.4, ['몇 번 돌려도 1,000행 ✓', 'still 1,000 rows ✓'], 'de-xs de-g', 3);
  code(S, 'c', 1, 11.4, 30, ['MERGE INTO sales t USING new_sales s ON t.order_id = s.order_id', '  WHEN MATCHED THEN UPDATE SET amount = s.amount', '  WHEN NOT MATCHED THEN INSERT *'], [], { st: 4 });
  [['11월 9일치 매출을 적재하는 작업이 돌아요', 'a job loads the sales for Nov 9'], ['쓰는 도중 실패해 스케줄러가 다시 돌려요 (재시도는 흔한 일)', 'it fails mid-write and the scheduler reruns it (retries are routine)'], ['덧붙이기는 중복이 쌓이고, 파티션 덮어쓰기는 몇 번 돌려도 같아요', 'appends pile up duplicates; overwriting the partition gives the same result'], ['키로 맞춰 합치는 MERGE(업서트)도 멱등해요', 'a MERGE (upsert) on a key is idempotent too']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16.6, t, 'de-s', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 16.6, ['멱등: f(f(x)) = f(x) → 재시도와 백필이 안전해요', 'idempotent: f(f(x)) = f(x) → retries and backfills are safe'], 'de-s de-g', 5);
  T(S, 'z2', 1, 18, ['now() 대신 실행 날짜를 인자로 받아야 다시 돌려도 같은 결과가 나와요', 'take the run date as a parameter, not now(), so reruns match'], 'de-xs', 5);
  S.cap(1, '적재 작업이 한 번 돌아요', 'A load job runs once')
    .cap(2, '실패해서 다시 돌아요', 'It fails and runs again')
    .cap(3, '덧붙이기는 중복, 덮어쓰기는 그대로', 'Append duplicates; overwrite stays correct')
    .cap(4, '키로 합치는 MERGE도 안전해요', 'Keyed MERGE is safe too')
    .cap(5, '멱등한 파이프라인', 'Idempotent pipelines');
  return S;
}
function sCdc() {
  const S = scene({ id: 'de-cdc', steps: 5, per: 1.5 });
  rect(S, 'db', 1, 1.6, 7.4, 5.2, 'accent', 8, 0, { r: .4, css: 'border:.14em solid var(--accent)' }); T(S, 'dbh', 1.5, 1.9, 'orders (MySQL)', 'cz-mono de-xs de-a');
  T(S, 'ra', 1.6, 3.2, '#3 paid', 'cz-mono de-xs', 0, { off: 1 }); T(S, 'ra2', 1.6, 3.2, '#3 shipped', 'cz-mono de-xs de-w', 1);
  T(S, 'rb', 1.6, 4.3, '#5 paid', 'cz-mono de-xs', 0, { dim: 1 }); T(S, 'rc', 1.6, 5.4, '#7 new', 'cz-mono de-xs de-g', 1);
  T(S, 'lh', 1.2, 7.3, ['트랜잭션 로그 (binlog)', 'transaction log (binlog)'], 'de-xs', 1);
  [['INSERT #7', 'ok'], ['UPDATE #3 → shipped', 'warn'], ['DELETE #5', 'danger']].forEach(([l, c], i) => box2(S, 'lg' + i, 1, 8.6 + i * 1.6, 7.4, 1.4, l, c, 1, { pct: 30 }));
  ar(S, 'la', [8.5, 10.6], [9.7, 10.6], 'ink-3', 2, { h: .1 }); box2(S, 'dz', 9.8, 9.6, 5.4, 2, ['CDC 커넥터', 'CDC connector'], 'warn', 2, { pct: 30 }); T(S, 'dzl', 9.8, 11.8, '(Debezium)', 'cz-tc cz-mono de-xs', 2, { w: 5.4 });
  ar(S, 'ka', [15.3, 10.6], [16.9, 10.6], 'ink-3', 3, { h: .1 }); T(S, 'kh', 17, 8.4, 'topic: db.orders', 'cz-mono de-xs', 3);
  [[['생성 #7', 'create #7'], 'ok'], [['수정 #3', 'update #3'], 'warn'], [['삭제 #5', 'delete #5'], 'danger']].forEach(([l, c], i) => box2(S, 'kt' + i, 17 + i * 4.7, 9.6, 4.4, 2, l, c, 3, { pct: 28 }));
  [['웨어하우스', 'warehouse'], ['검색 색인', 'search index'], ['캐시', 'cache']].forEach((l, i) => { const x = 17 + i * 4.8; box2(S, 'cs' + i, x, 14, 4.4, 1.8, l, 'ink-3', 3, { pct: 20 }); ar(S, 'csa' + i, [x + 2.2, 11.7], [x + 2.2, 13.9], 'ok', 3, { h: .1 }); });
  frame(S, 'pf', 10, 1.6, 21, 5.8, 'danger', 4, { dash: 1, r: .4 }); T(S, 'p1', 10.5, 2, 'SELECT * FROM orders', 'cz-mono de-xs', 4); T(S, 'p2', 10.5, 3.1, 'WHERE updated_at > :last_run', 'cz-mono de-xs', 4);
  [['✗ 삭제된 행은 결과에 안 나와요', '✗ deleted rows never show up'], ['✗ 두 조회 사이의 중간 변경은 놓쳐요', '✗ intermediate changes between polls are lost'], ['✗ 큰 테이블을 계속 훑어 DB에 부하', '✗ repeated scans load the database']].forEach((t, i) => T(S, 'pp' + i, 10.5, 4.3 + i * 1, t, 'de-xs de-r', 4));
  [['DB는 모든 변경을 먼저 트랜잭션 로그(WAL·binlog)에 적어요', 'a database writes every change to its transaction log (WAL, binlog) first'], ['CDC 커넥터가 복제본처럼 로그를 읽어 변경 이벤트로 바꿔요', 'a CDC connector reads the log like a replica and emits change events'], ['이벤트가 카프카에 순서대로 쌓이고 여러 소비자가 각자 반영해요', 'events land in Kafka in order, and each consumer applies them'], ['주기적 조회(폴링)와 달리 삭제와 중간 변경까지 놓치지 않아요', 'unlike polling, deletes and intermediate changes are never missed']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16.6, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 16.6, ['원본 DB에 부담 없이 거의 실시간으로, 삭제까지 정확히 복제해요', 'near real time, light on the source DB, deletes included'], 'de-xs de-g', 5);
  T(S, 'z2', 1, 17.9, ['Debezium · AWS DMS · Fivetran · 아웃박스 패턴과 함께 쓰기도 해요', 'Debezium, AWS DMS, Fivetran · often paired with the outbox pattern'], 'de-xs de-a', 5);
  S.cap(1, 'DB의 변경은 먼저 로그에 쌓여요', 'Every change lands in the log first')
    .cap(2, '로그를 읽어 이벤트로 바꿔요', 'Read the log, emit events')
    .cap(3, '여러 시스템이 변경을 받아 가요', 'Many systems consume the changes')
    .cap(4, '폴링보다 정확해요', 'More accurate than polling')
    .cap(5, '변경 데이터 캡처 (CDC)', 'Change data capture (CDC)');
  return S;
}

/* ================= storage & formats ================= */
function sOltp() {
  const S = scene({ id: 'de-oltp', steps: 5, per: 1.5 });
  const COL = ['id', 'user', 'region', 'amount', 'date'], CC = ['ink-3', 'accent', 'warn', 'ok', 'danger'];
  COL.forEach((c, j) => { T(S, 'h' + j, 1 + j * 2.5, 1.2, c, 'cz-tc cz-mono de-xs', 0, { w: 2.4 }); for (let r = 0; r < 6; r++) rect(S, `g${r}_${j}`, 1 + j * 2.5, 2.4 + r * 1.1, 2.4, 1, CC[j], 18, 0, { r: .1 }); });
  frame(S, 'rh', .8, 4.5, 12.8, 1.2, 'accent', 1, { off: 3, w: .2 }); frame(S, 'ch', 5.85, 1, 5.2, 8.1, 'warn', 2, { w: .2 });
  T(S, 'q1', 14.6, 1.4, 'SELECT * FROM orders WHERE id = 42', 'cz-mono de-xs de-a', 1); T(S, 'q2', 14.6, 2.8, 'SELECT region, SUM(amount)', 'cz-mono de-xs de-w', 2); T(S, 'q2b', 14.6, 3.9, 'FROM orders GROUP BY region', 'cz-mono de-xs de-w', 2);
  T(S, 'q1n', 14.6, 5.4, ['행 하나 전체 · 초당 수천 번', 'one whole row · thousands per second'], 'de-xs de-a', 1); T(S, 'q2n', 14.6, 6.6, ['열 두 개 · 행 수백만 개', 'two columns · millions of rows'], 'de-xs de-w', 2);
  T(S, 'rsl', 1, 9.9, ['행 지향: 한 행의 값들이 붙어 있어요', 'row-oriented: each row’s fields sit together'], 'de-xs', 3); T(S, 'rsr', 23.6, 9.9, ['전부 읽어야 해요', 'must read it all'], 'de-xs de-r', 3);
  T(S, 'csl', 1, 13.9, ['열 지향: 한 열의 값들이 붙어 있어요', 'column-oriented: each column’s values sit together'], 'de-xs', 4); T(S, 'csr', 25.2, 13.9, ['필요한 두 열만', 'just two columns'], 'de-xs de-g', 4);
  for (let k = 0; k < 30; k++) { const c1 = k % 5, c2 = Math.floor(k / 6);
    rect(S, 'rs' + k, 1 + k, 11, .92, 1.4, CC[c1], 22, 3, { r: .08 }); if (c1 === 2 || c1 === 3) tsets(S, 'rs' + k, [[3, CC[c1], 70]]);
    rect(S, 'cs' + k, 1 + k, 15, .92, 1.4, CC[c2], 22, 4, { r: .08 }); if (c2 === 2 || c2 === 3) tsets(S, 'cs' + k, [[4, CC[c2], 70]]); }
  frame(S, 'rsf', .85, 10.85, 30.3, 1.7, 'danger', 3, { dash: 1, r: .2 }); frame(S, 'csf', 12.85, 14.85, 12.3, 1.7, 'ok', 4, { r: .2 });
  [['OLTP: 주문 하나를 넣고 고치고 읽는 짧은 트랜잭션이 아주 많아요', 'OLTP: huge numbers of short transactions on single orders'], ['OLAP: 수백만 행에서 몇 개 열만 훑어 집계해요', 'OLAP: scan a few columns across millions of rows and aggregate'], ['행 단위로 저장하면 필요 없는 열까지 디스크에서 다 읽어요', 'row storage drags every column off the disk'], ['열 단위로 저장하면 필요한 열만 연속으로 읽고 압축도 잘 돼요', 'column storage reads just the needed columns, contiguously, and compresses well']]
    .forEach((t, i) => T(S, 'n' + i, 1, 17.4, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 17.4, ['서비스 DB(MySQL·PostgreSQL)와 분석 DB(BigQuery·Snowflake·ClickHouse)를 나눠요', 'split the service DB (MySQL, PostgreSQL) from analytics (BigQuery, Snowflake, ClickHouse)'], 'de-xs de-a', 5);
  T(S, 'z2', 1, 18.7, ['분석 쿼리가 서비스를 느리게 만들지 않도록', 'so analytics never slows the product down'], 'de-xs', 5);
  S.cap(1, 'OLTP는 행 하나를 다뤄요', 'OLTP works on single rows')
    .cap(2, 'OLAP는 열 몇 개를 훑어요', 'OLAP scans a few columns')
    .cap(3, '행 저장은 분석에 낭비가 커요', 'Row storage wastes reads for analytics')
    .cap(4, '열 저장은 필요한 것만 읽어요', 'Column storage reads only what’s needed')
    .cap(5, 'OLTP와 OLAP', 'OLTP vs OLAP');
  return S;
}
function sParquet() {
  const S = scene({ id: 'de-parquet', steps: 5, per: 1.5 });
  const RY = [1.6, 5, 8.4], CN = ['id', 'region', 'amount', 'date'], CC = ['ink-3', 'accent', 'warn', 'ok'], ST = ['min 10 · max 300', 'min 120 · max 950', 'min 5 · max 420'];
  RY.forEach((y, g) => { frame(S, 'rg' + g, 1, y, 16.4, 3, 'ink-3', 1, { w: .12 }); T(S, 'rgl' + g, 1.3, y + 1.05, 'RG' + g, 'cz-mono de-xs', 1);
    CN.forEach((c, j) => { const k = `ck${g}_${j}`; box2(S, k, 3.8 + j * 3.4, y + .4, 3.1, 2.2, c, CC[j], 1, { pct: 28 }); if (g !== 1) S.set(k, 3, { opacity: '.18' }); else if (j !== 2) S.set(k, 4, { opacity: '.18' }); });
    if (g !== 1) { S.set('rg' + g, 3, { opacity: '.3' }); S.set('rgl' + g, 3, { opacity: '.3' }); }
    T(S, 'st' + g, 19.6, y + 1.05, ST[g], 'cz-mono de-xs', 2); T(S, 'vd' + g, 27.6, y + 1.05, g === 1 ? ['✓ 읽기', '✓ read'] : ['✗ 건너뜀', '✗ skip'], 'de-xs ' + (g === 1 ? 'de-g' : 'de-r'), 3); });
  tsets(S, 'ck1_2', [[4, 'warn', 65]]);
  box2(S, 'ft', 1, 11.8, 16.4, 1.6, ['푸터: 스키마 + 행 그룹별 min/max', 'footer: schema + per-group min/max'], 'ink-3', 1, { pct: 20 }); tsets(S, 'ft', [[2, 'accent', 40]]);
  T(S, 'q', 19.6, .4, 'SUM(amount) WHERE amount > 500', 'cz-mono de-xs de-a', 2);
  T(S, 'rd', 19.6, 12, ['읽은 양: 12조각 중 1조각', 'read: 1 of 12 chunks'], 'de-xs de-g', 4);
  ['KR', 'KR', 'KR', 'US', 'US', 'KR'].forEach((v, i) => box2(S, 'v' + i, 1 + i * 1.9, 14.2, 1.7, 1.5, v, v === 'KR' ? 'accent' : 'warn', 5, { pct: 30 }));
  ar(S, 'va', [12.6, 14.95], [13.6, 14.95], 'ink-3', 5, { h: .1 }); T(S, 'vd', 14, 13.9, 'dict {0: KR, 1: US}', 'cz-mono de-xs de-a', 5); T(S, 'vr', 14, 15, 'runs (0×3) (1×2) (0×1)', 'cz-mono de-xs de-a', 5);
  [['파일은 행 그룹으로 나뉘고, 그 안은 열 조각(column chunk)으로 저장돼요', 'files split into row groups, each stored as column chunks'], ['리더는 먼저 파일 끝의 푸터를 읽어 행 그룹별 통계를 봐요', 'readers start with the footer and its per-group statistics'], ['max가 500보다 작은 행 그룹은 아예 안 읽어요 (조건 내려보내기)', 'row groups whose max is under 500 are skipped (predicate pushdown)'], ['남은 행 그룹에서도 amount 열만 읽어요 (열 고르기)', 'and only the amount column is read (column pruning)']]
    .forEach((t, i) => T(S, 'n' + i, 1, 17, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 17, ['열마다 사전·RLE·델타 인코딩 후 Snappy·Zstd로 압축 → 같은 값이 많을수록 작아져요', 'per-column dictionary, RLE and delta encoding, then Snappy or Zstd → repetition shrinks well'], 'de-xs', 5);
  T(S, 'z2', 1, 18.3, ['Parquet · ORC: 조건 내려보내기 + 열 고르기로 읽는 바이트가 확 줄어요', 'Parquet and ORC: pushdown + pruning slash the bytes read'], 'de-xs de-a', 5);
  S.cap(1, '파케이 파일의 구조', 'Inside a Parquet file')
    .cap(2, '푸터의 통계를 먼저 봐요', 'Check the footer statistics first')
    .cap(3, '조건에 안 맞는 행 그룹은 건너뛰어요', 'Skip row groups that can’t match')
    .cap(4, '필요한 열만 읽어요', 'Read only the needed column')
    .cap(5, '열 지향 파일 포맷', 'Columnar file formats');
  return S;
}
function sPart() {
  const S = scene({ id: 'de-part', steps: 5, per: 1.5 });
  const FX = [1, 11.4, 21.8];
  FX.forEach((x, f) => { frame(S, 'fd' + f, x, 2, 9.2, 6.4, 'ink-3', 0, { w: .12 }); T(S, 'fl' + f, x + .4, 2.3, `dt=2026-11-${['08', '09', '10'][f]}/`, 'cz-mono de-xs');
    for (let k = 0; k < 4; k++) { const id = `fp${f}_${k}`; box2(S, id, x + .6 + (k % 2) * 4.1, 3.6 + Math.floor(k / 2) * 2.2, 3.7, 1.8, `part-${k}`, 'accent', 0, { pct: 20 }); if (f < 2) S.set(id, 2, { opacity: '.2' }); }
    if (f < 2) { S.set('fd' + f, 2, { opacity: '.25' }); S.set('fl' + f, 2, { opacity: '.25' }); xm(S, 'fx' + f, x + 8.4, 2.6, 2); } });
  frame(S, 'f2ok', 21.8, 2, 9.2, 6.4, 'ok', 2, { w: .2 });
  T(S, 'q', 1, 9.1, "SELECT … FROM events WHERE dt = '2026-11-10'", 'cz-mono de-xs de-a', 1);
  for (let i = 0; i < 60; i++) { rect(S, 'tf' + i, 1 + (i % 15) * 1.25, 11.2 + Math.floor(i / 15) * .9, 1, .7, 'danger', 35, 3, { r: .08 }); S.set('tf' + i, 4, { opacity: '.25' }); }
  T(S, 'tfl', 1, 15, ['dt × 시간 × 국가로 잘게 → 1MB짜리 파일 수만 개', 'dt × hour × country → tens of thousands of 1 MB files'], 'de-xs de-r', 3);
  ar(S, 'cpa', [20, 12.7], [21.8, 12.7], 'ok', 4, { h: .12 });
  for (let k = 0; k < 3; k++) box2(S, 'big' + k, 22.2 + k * 3.1, 11.2, 2.8, 3.1, '512MB', 'ok', 4, { pct: 32 });
  T(S, 'cpl', 22.2, 15, ['합치기 (compaction)', 'compaction'], 'de-xs de-g', 4);
  [['날짜별 폴더(dt=…)로 나눠 저장해요 (하이브 스타일 파티션)', 'data lives in per-date folders (Hive-style partitions)'], ['dt로 거르면 그 폴더만 읽어요 (파티션 프루닝)', 'a filter on dt reads only that folder (partition pruning)'], ['너무 잘게 나누면 작은 파일이 폭증 → 목록 조회·파일 열기 비용이 일을 압도해요', 'over-partitioning explodes small files → listing and opening dominate the work'], ['작은 파일들을 수백 MB 단위로 합쳐요', 'small files are merged into a few hundred MB each']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16.6, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 16.6, ['자주 거르는 열(보통 날짜)로, 파일이 너무 작아지지 않게 나눠요', 'partition by the column you filter on most (usually date), without tiny files'], 'de-xs de-a', 5);
  T(S, 'z2', 1, 17.9, ['Iceberg 숨은 파티셔닝 · Z-order·클러스터링으로 파일 안까지 정렬', 'Iceberg hidden partitioning · Z-ordering and clustering sort data inside files'], 'de-xs', 5);
  S.cap(1, '날짜별 폴더로 나눠 저장해요', 'Store data in per-date folders')
    .cap(2, '필요한 폴더만 읽어요', 'Read only the folder you need')
    .cap(3, '너무 잘게 나누면 작은 파일 지옥', 'Too fine a split means small-file hell')
    .cap(4, '작은 파일은 합쳐요', 'Compact the small files')
    .cap(5, '파티셔닝과 프루닝', 'Partitioning and pruning');
  return S;
}
function sLake() {
  const S = scene({ id: 'de-lake', steps: 5, per: 1.5 });
  frame(S, 'stg', 1, 11.4, 30, 4.4, 'ink-3', 0, { w: .12 }); T(S, 'stl', 1.4, 15.0, ['오브젝트 스토리지 (S3)', 'object storage (S3)'], 'de-xs');
  box2(S, 'f1', 4, 12.6, 5, 2.2, 'f1.parquet', 'accent', 0, { pct: 25 }); box2(S, 'f2', 10.5, 12.6, 5, 2.2, 'f2.parquet', 'accent', 0, { pct: 25 }); S.set('f2', 3, { opacity: '.35' });
  box2(S, 'f3', 21, 12.6, 5, 2.2, 'f3.parquet', 'ok', 3, { pct: 30 });
  box2(S, 's1', 4, 6.6, 6, 2, ['스냅숏 1', 'snapshot 1'], 'accent', 2, { pct: 25 }); box2(S, 's2', 21, 6.6, 6, 2, ['스냅숏 2', 'snapshot 2'], 'ok', 3, { pct: 30 });
  seg(S, 'e11', [6.2, 8.7], [6.5, 12.5], 2, 'accent', .08); seg(S, 'e12', [8, 8.7], [12.5, 12.5], 2, 'accent', .08);
  seg(S, 'e21', [22.4, 8.7], [8, 12.5], 3, 'ok', .08); seg(S, 'e23', [24, 8.7], [23.5, 12.5], 3, 'ok', .08);
  box2(S, 'cat', 11, 2, 9, 2, ['카탈로그: orders', 'catalog: orders'], 'ink-3', 2, { pct: 22 });
  ar(S, 'p1', [13, 4.1], [9, 6.5], 'accent', 2, { h: .14, off: 3 }); ar(S, 'p2', [18, 4.1], [22.5, 6.5], 'ok', 3, { h: .14 }); T(S, 'sw', 20.4, 3.6, ['포인터를 원자적으로 교체', 'pointer swapped atomically'], 'de-xs de-g', 3);
  T(S, 'tt', 1, 2.4, 'AS OF snapshot 1', 'cz-mono de-xs de-w', 4); ar(S, 'tta', [4, 3.5], [5.5, 6.5], 'warn', 4, { h: .14 });
  T(S, 'f1x', 1, 9.4, ['✗ 트랜잭션·스키마가 없어 반쯤 쓴 파일도 보여요', '✗ no transactions or schema: half-written files show up'], 'de-xs de-r', 1, { off: 2 });
  [['레이크: 오브젝트 스토리지에 파일을 싸게 쌓지만 테이블 관리가 없어요', 'a lake piles up cheap files in object storage, but nothing manages them as tables'], ['테이블 포맷이 “지금 테이블 = 이 파일들”이라는 스냅숏을 기록해요', 'a table format records snapshots: “the table is these files”'], ['쓰기는 새 파일과 새 스냅숏을 만든 뒤 포인터만 원자적으로 바꿔요 → 읽는 쪽은 항상 일관돼요', 'writes add files and a snapshot, then swap the pointer atomically → readers stay consistent'], ['옛 스냅숏으로 조회하면 과거 상태를 그대로 볼 수 있어요 (타임 트래블)', 'query an old snapshot to see the past exactly (time travel)']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16.6, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 16.6, ['레이크하우스 = 레이크의 싼 저장 + 웨어하우스의 트랜잭션·스키마', 'lakehouse = a lake’s cheap storage + a warehouse’s transactions and schema'], 'de-xs de-a', 5);
  T(S, 'z2', 1, 17.9, ['Apache Iceberg · Delta Lake · Hudi 위에서 Spark·Trino·Flink가 같은 테이블을 써요', 'Spark, Trino and Flink share the same Iceberg, Delta Lake or Hudi tables'], 'de-xs', 5);
  S.cap(1, '데이터 레이크: 파일 더미', 'A data lake is a pile of files')
    .cap(2, '테이블 포맷이 스냅숏을 기록해요', 'A table format records snapshots')
    .cap(3, '쓰기는 새 스냅숏으로 원자적으로', 'Writes commit a new snapshot atomically')
    .cap(4, '옛 스냅숏으로 시간 여행', 'Time travel to an old snapshot')
    .cap(5, '레이크·웨어하우스·레이크하우스', 'Lake, warehouse, lakehouse');
  return S;
}
function sStar() {
  const S = scene({ id: 'de-star', steps: 5, per: 1.5 });
  const fy = tbl(S, 'fa', 11, 5.4, 10, 'fact_sales', ['date_key', 'product_key', 'store_key', 'customer_key', 'qty', 'amount'], 'warn', 1);
  T(S, 'fn', 11, 13.3, ['수십억 행 · 측정값(숫자)', 'billions of rows · measures'], 'cz-tc de-xs de-w', 1, { w: 10 });
  const dd = tbl(S, 'dd', 1, 1.2, 7.4, 'dim_date', ['date_key', 'day', 'month', 'quarter'], 'accent', 2);
  const dp = tbl(S, 'dp', 23.6, 1.2, 7.4, 'dim_product', ['product_key', 'name', 'category', 'brand'], 'accent', 2);
  const ds = tbl(S, 'ds', 23.6, 12, 7.4, 'dim_store', ['store_key', 'city', 'region'], 'accent', 2);
  const dc = tbl(S, 'dc', 1, 11, 7.4, 'dim_customer', ['customer_key', 'age_band', 'segment'], 'accent', 2);
  seg(S, 'k0', [10.9, fy[0]], [8.5, dd[0]], 2, 'ink-3', .08); seg(S, 'k1', [21.1, fy[1]], [23.5, dp[0]], 2, 'ink-3', .08); seg(S, 'k2', [21.1, fy[2]], [23.5, ds[0]], 2, 'ink-3', .08); seg(S, 'k3', [10.9, fy[3]], [8.5, dc[0]], 2, 'ink-3', .08);
  [[11.2, fy[0], 9.6], [11.2, fy[1], 9.6], [11.2, fy[5], 9.6], [1.2, dd[2], 7], [23.8, dp[2], 7]].forEach(([x, y, w], i) => rect(S, 'hl' + i, x, y - .5, w, 1, 'accent', 30, 3, { r: .15, off: 5 }));
  frame(S, 'cat', 23.6, 7.7, 7.4, 3.6, 'ink-3', 4, { dash: 1, r: .35 }); T(S, 'catt', 24, 7.95, 'dim_category', 'cz-mono de-s', 4); T(S, 'catc', 24.1, 9.2, 'category_key', 'cz-mono de-xs', 4); T(S, 'catc2', 24.1, 10.2, 'name', 'cz-mono de-xs', 4);
  vl(S, 'catl', 27.3, 6.9, 7.6, 'ink-3', 4, { dash: 1, w: .1 });
  T(S, 'q1', 1, 17.2, 'SELECT p.category, d.month, SUM(f.amount)', 'cz-mono de-xs de-a', 3, { off: 4 }); T(S, 'q2', 1, 18.3, 'FROM fact_sales f JOIN dim_product p … JOIN dim_date d …', 'cz-mono de-xs de-a', 3, { off: 4 }); T(S, 'q3', 1, 19.4, 'GROUP BY 1, 2', 'cz-mono de-xs de-a', 3, { off: 4 });
  T(S, 'n0', 1, 17.2, ['사실 테이블: 판매 한 건마다 한 행, 숫자와 키만 담아요', 'fact table: one row per sale, holding only numbers and keys'], 'de-xs', 1, { off: 2 });
  T(S, 'n1', 1, 17.2, ['차원 테이블: 누가·무엇을·언제·어디서를 설명해요', 'dimension tables describe who, what, when and where'], 'de-xs', 2, { off: 3 });
  T(S, 'n3', 1, 17.2, ['차원을 더 쪼개면 눈송이(snowflake) 스키마 → 저장은 줄지만 조인이 늘어요', 'splitting dimensions further gives a snowflake schema → less storage, more joins'], 'de-xs', 4, { off: 5 });
  T(S, 'z1', 1, 17.2, ['사실 = 측정값(얼마나), 차원 = 맥락(누가·무엇·언제·어디)', 'facts = measures (how much), dimensions = context (who, what, when, where)'], 'de-xs de-a', 5);
  T(S, 'z2', 1, 18.5, ['킴볼의 차원 모델링 · 조인이 단순해서 BI 도구와 사람이 쓰기 쉬워요', 'Kimball dimensional modeling · simple joins suit BI tools and people alike'], 'de-xs', 5);
  S.cap(1, '가운데에 사실 테이블', 'A fact table in the middle')
    .cap(2, '둘레에 차원 테이블', 'Dimension tables around it')
    .cap(3, '키로 조인해 묶어 봐요', 'Join on keys to slice the numbers')
    .cap(4, '차원을 더 쪼개면 눈송이 스키마', 'Split dimensions further: a snowflake')
    .cap(5, '스타 스키마와 차원 모델링', 'Star schemas and dimensional modeling');
  return S;
}
function sScd() {
  const S = scene({ id: 'de-scd', steps: 5, per: 1.5 });
  const CX = [[1, 'sk'], [3.4, 'customer'], [7.4, 'city'], [11, 'valid_from'], [16.2, 'valid_to'], [21.4, 'current']];
  CX.forEach(([x, h], j) => T(S, 'h' + j, x, 1.3, h, 'cz-mono de-xs de-a'));
  rect(S, 'r1bg', .8, 2.6, 24, 1.2, 'line', 30, 0, { r: .15 }); rect(S, 'r2bg', .8, 4, 24, 1.2, 'ok', 20, 3, { r: .15 });
  const R1 = ['101', 'C7', ['서울', 'Seoul'], '2024-01-01', '9999-12-31', 'Y'];
  R1.forEach((v, j) => T(S, 'a' + j, CX[j][0], 2.75, v, 'cz-mono de-xs', 0, j === 2 ? { off: 2 } : j === 4 || j === 5 ? { off: 3 } : {}));
  S.set('a2', 3, { opacity: '1' });
  T(S, 'a2b', CX[2][0], 2.75, ['부산', 'Busan'], 'cz-mono de-xs de-r', 2, { off: 3 }); T(S, 'a4b', CX[4][0], 2.75, '2026-05-31', 'cz-mono de-xs de-w', 3); T(S, 'a5b', CX[5][0], 2.75, 'N', 'cz-mono de-xs de-w', 3);
  ['102', 'C7', ['부산', 'Busan'], '2026-06-01', '9999-12-31', 'Y'].forEach((v, j) => T(S, 'b' + j, CX[j][0], 4.15, v, 'cz-mono de-xs de-g', 3));
  T(S, 't1', 25.6, 2.75, ['Type 1: 덮어쓰기', 'Type 1: overwrite'], 'de-xs de-r', 2, { off: 3 }); T(S, 't2', 25.6, 2.75, ['Type 2: 새 행 추가', 'Type 2: add a row'], 'de-xs de-g', 3);
  T(S, 'fh', 1, 7, ['매출 사실 테이블', 'sales fact'], 'de-xs', 1); T(S, 'fa', 1, 8.2, 'sale 2025-03-11 · sk 101 · 52,000', 'cz-mono de-xs', 1); T(S, 'fb', 1, 9.4, 'sale 2026-09-02 · sk 102 · 31,000', 'cz-mono de-xs de-g', 4);
  T(S, 'rh', 20, 7, ['도시별 매출 리포트', 'sales by city'], 'de-xs', 1);
  T(S, 'ra', 20, 8.2, ['서울 52,000', 'Seoul 52,000'], 'cz-mono de-xs', 1, { off: 2 }); T(S, 'rb', 20, 8.2, ['부산 52,000 ✗ 과거가 바뀜', 'Busan 52,000 ✗ history rewritten'], 'de-xs de-r', 2, { off: 3 });
  T(S, 'rc', 20, 8.2, ['서울 52,000 ✓', 'Seoul 52,000 ✓'], 'cz-mono de-xs de-g', 3); T(S, 'rd', 20, 9.4, ['부산 31,000 ✓', 'Busan 31,000 ✓'], 'cz-mono de-xs de-g', 4);
  ar(S, 'fk', [13.4, 8.6], [13.4, 5.3], 'ink-3', 4, { h: .1 });
  [['고객 C7은 서울에 살았고, 2025년 매출이 이 행(sk 101)을 가리켜요', 'customer C7 lived in Seoul; a 2025 sale points at this row (sk 101)'], ['2026년 6월 부산으로 이사 → 값을 덮어쓰면 과거 매출까지 부산으로 바뀌어요', 'moved to Busan in June 2026 → overwriting turns past sales into Busan too'], ['대신 옛 행을 닫고(valid_to, current = N) 새 행을 추가해요', 'instead, close the old row (valid_to, current = N) and add a new one'], ['새 매출은 새 대리 키(sk 102)를 가리켜 시점별 사실이 그대로 남아요', 'new sales point at the new surrogate key (sk 102): history stays true']]
    .forEach((t, i) => T(S, 'n' + i, 1, 11.6, t, 'de-s', i + 1, { off: i + 2 }));
  [['Type 1: 덮어쓰기 (오타 수정처럼 이력이 필요 없을 때)', 'Type 1: overwrite (when history doesn’t matter, like typo fixes)', 'de-xs'], ['Type 2: 행 추가 + 유효 기간 (이력 보존, 가장 흔함)', 'Type 2: new row + validity range (keeps history; the most common)', 'de-xs de-g'], ['Type 3: “이전 값” 열 하나만 둠', 'Type 3: keep one “previous value” column', 'de-xs'], ['dbt snapshot이 Type 2를 자동으로 관리해 줘요', 'dbt snapshots maintain Type 2 automatically', 'de-xs de-a']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 1, 11.6 + i * 1.3, [a, b], c, 5));
  S.cap(1, '차원 값이 바뀌면?', 'What if a dimension value changes?')
    .cap(2, '덮어쓰면 과거가 바뀌어요', 'Overwriting rewrites the past')
    .cap(3, '새 행을 추가해 이력을 남겨요', 'Add a row to keep history')
    .cap(4, '사실은 그 시점의 행을 가리켜요', 'Facts point at the row valid at the time')
    .cap(5, '천천히 변하는 차원 (SCD)', 'Slowly changing dimensions (SCD)');
  return S;
}

/* ================= distributed processing ================= */
function sMr() {
  const S = scene({ id: 'de-mr', steps: 5, per: 1.5 });
  const IN = ['a b a', 'b c', 'a c c'], MP = ['(a,1) (b,1) (a,1)', '(b,1) (c,1)', '(a,1) (c,1) (c,1)'], Y = i => 2.2 + i * 4.4;
  T(S, 'hi', 1, .9, ['입력 조각', 'input splits'], 'de-xs'); T(S, 'hm', 7.4, .9, 'map', 'cz-mono de-xs de-a', 2); T(S, 'hs', 14.8, .9, 'shuffle', 'cz-mono de-xs de-w', 3); T(S, 'hr', 19, .9, 'reduce', 'cz-mono de-xs de-g', 4);
  IN.forEach((t, i) => { box2(S, 'in' + i, 1, Y(i), 5.2, 3, t, 'ink-3', 0, { pct: 20 }); ar(S, 'ia' + i, [6.3, Y(i) + 1.5], [7.2, Y(i) + 1.5], 'ink-3', 2, { h: .08 }); T(S, 'mp' + i, 7.4, Y(i) + 1.05, MP[i], 'cz-mono de-xs', 2); });
  frame(S, 'r1', 19, 2.2, 6.4, 6, 'accent', 3, { r: .4 }); T(S, 'r1h', 19.4, 2.5, 'R1', 'cz-mono de-s de-a', 3); T(S, 'r1a', 19.4, 4, 'a: [1, 1, 1]', 'cz-mono de-xs', 3); T(S, 'r1b', 19.4, 5.3, 'b: [1, 1]', 'cz-mono de-xs', 3);
  frame(S, 'r2', 19, 9.6, 6.4, 4.4, 'warn', 3, { r: .4 }); T(S, 'r2h', 19.4, 9.9, 'R2', 'cz-mono de-s de-w', 3); T(S, 'r2c', 19.4, 11.4, 'c: [1, 1, 1]', 'cz-mono de-xs', 3);
  [[0, 1], [1, 1], [1, 2], [2, 1], [2, 2]].forEach(([i, r], j) => ar(S, 'sh' + j, [14.4, Y(i) + 1.5 + (r === 2 ? .4 : -.2)], r === 1 ? [18.9, 4.4 + j * .5] : [18.9, 11.4 + j * .2], r === 1 ? 'accent' : 'warn', 3, { h: .1 }));
  ar(S, 'o1', [25.5, 5.2], [26.4, 5.2], 'ok', 4, { h: .1 }); T(S, 'ot1', 26.6, 4.7, 'a 3 · b 2', 'cz-mono de-s de-g', 4);
  ar(S, 'o2', [25.5, 11.8], [26.4, 11.8], 'ok', 4, { h: .1 }); T(S, 'ot2', 26.6, 11.3, 'c 3', 'cz-mono de-s de-g', 4);
  [['큰 입력을 조각으로 나눠 여러 서버에 둬요', 'a big input is split across many servers'], ['map: 조각마다 동시에 (단어, 1) 쌍을 내보내요', 'map: each split emits (word, 1) pairs in parallel'], ['shuffle: 같은 키는 같은 리듀서로 → 네트워크로 크게 이동', 'shuffle: equal keys go to the same reducer → heavy network traffic'], ['reduce: 키마다 값을 합쳐 결과를 써요', 'reduce: combine the values per key and write the result']]
    .forEach((t, i) => T(S, 'n' + i, 1, 15.6, t, 'de-s', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 15.6, ['2004년 구글 논문 → Hadoop · 중간 결과를 디스크에 써서 느리지만 튼튼해요', 'Google’s 2004 paper → Hadoop · intermediate results on disk: slow but sturdy'], 'de-xs', 5);
  T(S, 'z2', 1, 16.9, ['map 쪽에서 미리 합치는 컴바이너로 셔플 양을 줄여요 · 셔플이 가장 비싼 단계', 'combiners pre-aggregate on the map side to shrink the shuffle, the costliest stage'], 'de-xs de-a', 5);
  T(S, 'z3', 1, 18.2, ['오늘날엔 Spark가 같은 모델을 메모리 위에서 더 빠르게 돌려요', 'today Spark runs the same model faster, in memory'], 'de-xs', 5);
  S.cap(1, '입력을 조각내 나눠 둬요', 'Split the input across machines')
    .cap(2, 'map: 조각마다 동시에', 'Map every split in parallel')
    .cap(3, 'shuffle: 같은 키끼리 모아요', 'Shuffle equal keys together')
    .cap(4, 'reduce: 키별로 합쳐요', 'Reduce per key')
    .cap(5, '맵리듀스', 'MapReduce');
  return S;
}
function sSpark() {
  const S = scene({ id: 'de-spark', steps: 5, per: 1.5 });
  code(S, 'c', 1, 1, 30, ['df = spark.read.parquet("events")', 'x = df.filter(col("country") == "KR")', 'y = x.groupBy("user").count()', ['y.write.parquet("out")   # 액션 → 여기서 실행', 'y.write.parquet("out")   # action → runs here']], [[0, 1], [3, 2]], { lh: 1.15, hoff: 3 });
  frame(S, 'st1', 1, 7.2, 12, 8, 'accent', 0, { r: .4, w: .12 }); T(S, 'st1l', 1.4, 7.4, 'Stage 1', 'cz-mono de-xs de-a'); frame(S, 'st2', 18.2, 7.2, 12.8, 8, 'ok', 0, { r: .4, w: .12 }); T(S, 'st2l', 18.6, 7.4, 'Stage 2', 'cz-mono de-xs de-g');
  T(S, 'shl', 13.3, 7.4, 'shuffle', 'cz-mono de-xs de-w', 3);
  for (let i = 0; i < 4; i++) { const y = 8.8 + i * 1.6;
    box2(S, 'rd' + i, 1.6, y, 4.2, 1.2, 'read', 'line', 0, { pct: 45 }); ar(S, 'na' + i, [5.9, y + .6], [7.5, y + .6], 'ink-3', 0, { h: .08 }); box2(S, 'fl' + i, 7.6, y, 4.8, 1.2, 'filter', 'line', 0, { pct: 45 });
    tsets(S, 'rd' + i, [[2, 'ok', 45]]); tsets(S, 'fl' + i, [[2, 'ok', 45]]);
    for (let j = 0; j < 3; j++) seg(S, `sh${i}_${j}`, [12.5, y + .6], [18.7, 9.7 + j * 2], 3, 'warn', .05); }
  for (let j = 0; j < 3; j++) { const y = 9 + j * 2; box2(S, 'ct' + j, 18.8, y, 5.2, 1.4, 'count', 'line', 0, { pct: 45 }); ar(S, 'wa' + j, [24.1, y + .7], [25.3, y + .7], 'ink-3', 0, { h: .08 }); box2(S, 'wr' + j, 25.4, y, 5, 1.4, 'write', 'line', 0, { pct: 45 });
    tsets(S, 'ct' + j, [[4, 'ok', 45]]); tsets(S, 'wr' + j, [[4, 'ok', 45]]); }
  T(S, 'nrl', 1.6, 15.4, ['좁은 변환: 파티션끼리 1:1', 'narrow: partition to partition'], 'de-xs', 2); T(S, 'wdl', 18.6, 15.4, ['넓은 변환: 모두가 모두에게', 'wide: all to all'], 'de-xs de-w', 3);
  [['변환은 계획만 쌓아요 · 아직 아무것도 실행하지 않아요 (지연 평가)', 'transformations only build a plan · nothing runs yet (lazy evaluation)'], ['액션(write·count)이 오면 실행 · 파티션마다 태스크가 병렬로', 'an action (write, count) triggers execution · one task per partition, in parallel'], ['groupBy는 같은 키를 모아야 해서 셔플 → 여기서 단계(stage)가 나뉘어요', 'groupBy must gather equal keys → shuffle → a new stage begins'], ['다음 단계가 셔플된 데이터를 받아 집계하고 저장해요', 'the next stage aggregates the shuffled data and writes it']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16.8, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 16.8, ['Catalyst 최적화기가 필터를 앞당기고 필요한 열만 읽어요 · 반복 계산은 cache()로 메모리에', 'Catalyst pushes filters down and reads only needed columns · cache() keeps reused data in memory'], 'de-xs', 5);
  T(S, 'z2', 1, 18.1, ['셔플 수를 줄이는 게 성능의 핵심 (Spark UI로 단계별 시간 확인)', 'fewer shuffles = faster jobs (check per-stage times in the Spark UI)'], 'de-xs de-a', 5);
  S.cap(1, '변환은 계획만 세워요', 'Transformations only plan')
    .cap(2, '액션이 실행을 시작해요', 'An action starts the job')
    .cap(3, '셔플에서 단계가 나뉘어요', 'Shuffles split the job into stages')
    .cap(4, '다음 단계가 이어서 처리', 'The next stage carries on')
    .cap(5, 'Spark의 실행 모델', 'How Spark executes');
  return S;
}
function sJoin() {
  const S = scene({ id: 'de-join', steps: 5, per: 1.5 });
  const EX = e => 1 + e * 7.6, KC = ['accent', 'warn', 'ok', 'danger'];
  box2(S, 'ct', 12, 1.2, 8, 1.8, ['countries (1MB)', 'countries (1 MB)'], 'ok', 1, { pct: 30 }); S.set('ct', 3, { opacity: '.25' });
  for (let e = 0; e < 4; e++) { const x = EX(e);
    frame(S, 'ex' + e, x, 4.8, 7, 7.6, 'ink-3', 0, { r: .4, w: .12 }); T(S, 'exl' + e, x + .4, 11.6, 'executor ' + (e + 1), 'cz-mono de-xs');
    box2(S, 'od' + e, x + .4, 8.2, 6.2, 1.6, ['orders ¼', 'orders ¼'], 'accent', 0, { pct: 25 });
    ar(S, 'bc' + e, [16, 3.1], [x + 3.5, 6.3], 'ok', 2, { h: .1, off: 3 }); box2(S, 'cc' + e, x + .4, 6.4, 6.2, 1.4, 'countries', 'ok', 2, { pct: 35, off: 3 });
    box2(S, 'pm' + e, x + .4, 6.4, 6.2, 1.6, ['payments ¼', 'payments ¼'], 'warn', 3, { pct: 25 }); }
  const cnt = [0, 0, 0, 0];
  for (let e = 0; e < 4; e++) for (let k = 0; k < 6; k++) { const c = (e + k) % 4, id = `k${e}_${k}`; rect(S, id, EX(e) + .5 + k * 1.03, 10.6, .85, .85, KC[c], 70, 3, { r: .15 }); S.move(id, 4, EX(c) + .5 + cnt[c] * 1.03, 10.6); cnt[c]++; }
  T(S, 'kl', 1, 12.7, ['같은 색 = 같은 조인 키', 'same color = same join key'], 'de-xs', 3); T(S, 'shl', 15.6, 12.7, ['셔플: hash(key) % 4 → 같은 키는 한 실행기로, 정렬 후 병합', 'shuffle: hash(key) % 4 → equal keys meet, then sort + merge'], 'de-xs de-w', 4);
  [['큰 주문 테이블이 실행기 4대에 나뉘어 있어요', 'the big orders table is split across 4 executors'], ['한쪽이 작으면 통째로 모든 실행기에 복사 → 큰 쪽은 안 움직여요 (브로드캐스트 조인)', 'a small side is copied to every executor → the big side never moves (broadcast join)'], ['둘 다 크면 같은 키가 서로 다른 실행기에 흩어져 있어요', 'when both sides are big, matching keys sit on different executors'], ['키의 해시로 다시 나눠 같은 키를 모은 뒤 정렬해 병합해요 (정렬 병합 조인)', 'repartition by key hash so matches meet, then sort and merge (sort-merge join)']]
    .forEach((t, i) => T(S, 'n' + i, 1, 14.4, t, 'de-xs', i + 1, { off: i + 2 }));
  [['Spark는 작은 쪽이 기본 10MB 이하면 브로드캐스트를 골라요', 'Spark broadcasts when the small side is under 10 MB by default', 'de-xs de-a'], ['셔플은 네트워크·디스크를 많이 써서 조인 비용의 대부분을 차지해요', 'the shuffle’s network and disk traffic is most of a join’s cost', 'de-xs'], ['통계가 낡으면 엉뚱한 전략을 골라요 → 테이블 통계를 갱신해요', 'stale statistics pick the wrong strategy → keep table stats fresh', 'de-xs']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 1, 14.4 + i * 1.3, [a, b], c, 5));
  S.cap(1, '큰 테이블은 여러 실행기에 나뉘어 있어요', 'A big table is spread over executors')
    .cap(2, '작은 쪽을 모두에게 복사', 'Copy the small side everywhere')
    .cap(3, '둘 다 크면 키가 흩어져 있어요', 'Two big sides: keys are scattered')
    .cap(4, '셔플로 같은 키를 모아요', 'Shuffle brings equal keys together')
    .cap(5, '분산 조인 전략', 'Distributed join strategies');
  return S;
}
function sSkew() {
  const S = scene({ id: 'de-skew', steps: 5, per: 1.5 });
  const D = [3.2, 2.8, 3.6, 22, 3, 3.4, 2.6, 3.1], X0 = 4, Y = i => 1.6 + i * 1.4;
  hl(S, 'ax', X0, 31, Y(8) - .1, 'ink-3', 0, { w: .1 }); T(S, 'axl', 26, Y(8) + .1, ['시간 →', 'time →'], 'de-xs');
  D.forEach((d, i) => { T(S, 'tl' + i, .6, Y(i) + .05, 't' + i, 'cz-mono de-xs');
    if (i === 3) { rect(S, 'b3', X0, Y(i), d, 1, 'danger', 45, 1, { r: .12, off: 3 }); rect(S, 'b3s', X0, Y(i), 5.5, 1, 'ok', 40, 3, { r: .12 }); }
    else rect(S, 'b' + i, X0, Y(i), d, 1, 'accent', 35, 1, { r: .12 }); });
  T(S, 'hk', X0 + 4, Y(3) + .1, ['key = null · 4천만 행', 'key = null · 40M rows'], 'de-xs', 2, { off: 3 });
  [1, 4, 6].forEach(i => { rect(S, 'sa' + i, X0 + D[i] + .1, Y(i), 5.4, 1, 'ok', 40, 3, { r: .12 }); T(S, 'sal' + i, X0 + D[i] + .4, Y(i) + .1, 'null_' + ([1, 4, 6].indexOf(i) + 1), 'cz-mono de-tiny', 3); });
  T(S, 'sl3', X0 + .3, Y(3) + .1, 'null_0', 'cz-mono de-tiny', 3);
  vl(S, 'f1', X0 + 22, .8, Y(8) - .1, 'danger', 1, { dash: 1, w: .1, off: 3 }); T(S, 'f1l', X0 + 9.6, .6, ['단계 끝 = 가장 느린 태스크', 'stage ends with the slowest task'], 'de-xs de-r', 1, { off: 3, w: 12, css: 'text-align:right' });
  vl(S, 'f2', X0 + 8.6, .8, Y(8) - .1, 'ok', 3, { dash: 1, w: .1 }); T(S, 'f2l', X0 + 9, .6, ['훨씬 일찍 끝나요', 'finishes far sooner'], 'de-xs de-g', 3);
  rect(S, 'mg', X0 + 9, Y(0), 1.6, Y(2) - Y(0) + 1, 'warn', 35, 4, { r: .12 }); T(S, 'mgl', X0 + 10.9, Y(0) + .1, ['소금 뗀 키로 다시 합치기', 'merge again without the salt'], 'de-xs de-w', 4);
  [['groupBy(user) 뒤 태스크 8개 중 하나만 유난히 오래 걸려요', 'after groupBy(user), one of 8 tasks takes far longer'], ['원인: 한 키(null, 대형 고객 등)에 데이터가 몰렸어요 (스큐)', 'cause: one key (null, a giant customer) holds most of the data (skew)'], ['소금 치기: 키에 0~3 난수를 붙여 4개 태스크로 나눠요', 'salting: append a random 0–3 to the key to spread it over 4 tasks'], ['부분 결과를 원래 키로 한 번 더 합쳐 마무리해요', 'then combine the partial results by the original key']]
    .forEach((t, i) => T(S, 'n' + i, 1, 14.6, t, 'de-s', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 14.6, ['Spark 3의 적응형 실행(AQE)이 치우친 조인 파티션을 자동으로 쪼개요', 'Spark 3’s adaptive query execution (AQE) splits skewed join partitions automatically'], 'de-xs de-a', 5);
  T(S, 'z2', 1, 15.9, ['null 키는 미리 걸러 따로 처리하고, 핫 키는 브로드캐스트로 돌리기도 해요', 'filter null keys out early, and route hot keys through a broadcast join'], 'de-xs', 5);
  T(S, 'z3', 1, 17.2, ['분산 처리는 “평균”이 아니라 “가장 느린 하나”가 속도를 정해요', 'in distributed jobs the slowest task, not the average, sets the pace'], 'de-xs de-r', 5);
  S.cap(1, '한 태스크만 끝나지 않아요', 'One task just won’t finish')
    .cap(2, '한 키에 데이터가 몰렸어요', 'One key holds most of the data')
    .cap(3, '키에 소금을 쳐서 나눠요', 'Salt the key to spread it out')
    .cap(4, '부분 결과를 다시 합쳐요', 'Merge the partial results')
    .cap(5, '데이터 스큐', 'Data skew');
  return S;
}
function sMpp() {
  const S = scene({ id: 'de-mpp', steps: 5, per: 1.5 });
  box2(S, 'co', 11, 1.4, 10, 2, ['코디네이터: 계획 세우기', 'coordinator: plans the query'], 'accent', 0, { pct: 25 });
  T(S, 'q', 1, 1.1, 'SELECT region,', 'cz-mono de-xs de-a', 1); T(S, 'q2', 1, 2.1, ' SUM(amount) …', 'cz-mono de-xs de-a', 1);
  for (let w = 0; w < 4; w++) { const x = 1 + w * 7.7;
    box2(S, 'wk' + w, x, 6.4, 6.6, 2, 'worker ' + (w + 1), 'ink-3', 0, { pct: 22 }); tsets(S, 'wk' + w, [[2, 'ok', 35]]);
    ar(S, 'pl' + w, [16, 3.5], [x + 3.3, 6.3], 'accent', 1, { h: .1 });
    T(S, 'pa' + w, x, 8.7, ['KR 12 · US 7', 'KR 9 · JP 4', 'US 11 · KR 3', 'JP 6 · US 2'][w], 'cz-tc cz-mono de-xs de-w', 3, { w: 6.6 });
    ar(S, 'up' + w, [x + 4.6, 6.3], [17 + w * .4, 3.5], 'warn', 3, { h: .1 });
    for (let s = 0; s < 2; s++) { const sx = x + .3 + s * 3.2; box2(S, `sp${w}_${s}`, sx, 12.6, 3, 1.8, 'split', 'line', 0, { pct: 45 }); ar(S, `sa${w}_${s}`, [sx + 1.5, 12.5], [sx + 1.5, 9.9], 'ok', 2, { h: .08 }); } }
  frame(S, 'stg', .6, 11.4, 30.8, 3.4, 'ink-3', 0, { w: .1, r: .3 }); T(S, 'stl', 1, 11.6, ['오브젝트 스토리지 (S3·GCS)', 'object storage (S3, GCS)'], 'de-xs');
  T(S, 'fin', 22, 1.9, ['KR 24 · US 20 · JP 10', 'KR 24 · US 20 · JP 10'], 'cz-mono de-xs de-g', 3);
  frame(S, 'wf', .6, 6.1, 30.8, 3.7, 'ok', 4, { dash: 1, r: .4 });
  T(S, 'scl', 1, 4.4, ['+ 워커 추가 (수십 초)', '+ add workers in seconds'], 'de-xs de-g', 4);
  [['코디네이터가 쿼리를 쪼개 워커들에게 조각(fragment)을 나눠 줘요', 'the coordinator splits the query into fragments for the workers'], ['워커들이 스토리지의 파일 조각을 동시에 읽어요', 'workers scan file splits from storage in parallel'], ['각자 부분 합계를 낸 뒤 교환해 최종 합계를 만들어요', 'each computes partial sums, then they exchange and combine them'], ['저장과 계산이 분리돼 있어 필요할 때만 워커를 늘려요', 'storage and compute are separate, so workers scale on demand']]
    .forEach((t, i) => T(S, 'n' + i, 1, 15.6, t, 'de-s', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 15.6, ['Trino · Presto · BigQuery · Snowflake · Athena', 'Trino, Presto, BigQuery, Snowflake, Athena'], 'de-s de-a', 5);
  T(S, 'z2', 1, 17, ['쿼리 비용 ≈ 스캔한 바이트 → 파티션·열 지향 포맷이 곧 돈과 시간을 아껴요', 'query cost ≈ bytes scanned → partitions and columnar formats save money and time'], 'de-xs', 5);
  S.cap(1, '쿼리를 조각으로 나눠요', 'Split the query into fragments')
    .cap(2, '워커들이 동시에 스캔', 'Workers scan in parallel')
    .cap(3, '부분 결과를 합쳐요', 'Combine partial results')
    .cap(4, '계산만 따로 늘려요', 'Scale compute on its own')
    .cap(5, '분산 SQL 엔진', 'Distributed SQL engines');
  return S;
}

/* ================= stream processing ================= */
function sKafka() {
  const S = scene({ id: 'de-kafka', steps: 5, per: 1.5 });
  const PY = [3.6, 7, 10.4], N = [8, 10, 7], X = k => 8 + k * 1.55;
  box2(S, 'pr', 1, 6.2, 5.4, 2.4, ['프로듀서', 'producer'], 'accent', 0, { pct: 25 });
  PY.forEach((y, p) => { T(S, 'pl' + p, 6.7, y + .35, 'P' + p, 'cz-mono de-xs');
    for (let k = 0; k < N[p]; k++) box2(S, `c${p}_${k}`, X(k), y, 1.4, 1.6, String(k), 'line', 0, { pct: 45 }); });
  box2(S, 'nw', X(10), 7, 1.4, 1.6, '10', 'warn', 1, { pct: 55 }); elb(S, 'pa', [[6.5, 6.4], [X(10) + .7, 6.4], [X(10) + .7, 6.95]], 'warn', 1, { h: .1 });
  T(S, 'kl', 1, 9.2, 'key=user7', 'cz-mono de-xs de-w', 1); T(S, 'kl2', 1, 10.2, '→ hash → P1', 'cz-mono de-xs de-w', 1);
  [[0, 6], [1, 9], [2, 5]].forEach(([p, o]) => { vl(S, 'cm' + p, X(o) - .08, PY[p] - .3, PY[p] + 1.9, 'ok', 2, { w: .14 }); });
  box2(S, 'c1', 26.4, 3.6, 4.6, 1.8, 'consumer A1', 'ok', 2, { pct: 30 }); box2(S, 'c2', 26.4, 10.2, 4.6, 1.8, 'consumer A2', 'ok', 2, { pct: 30 }); tsets(S, 'c2', [[3, 'danger', 40]]);
  ar(S, 'a0', [X(7) + 1.5, 4.2], [26.3, 4.2], 'ok', 2, { h: .1 }); ar(S, 'a1', [X(10) + 1.5, 7.8], [26.3, 4.8], 'ok', 2, { h: .1 }); ar(S, 'a2', [X(6) + 1.5, 11.2], [26.3, 11.1], 'ok', 2, { h: .1, off: 3 });
  xm(S, 'c2x', 30.6, 10, 3); elb(S, 'a2b', [[X(6) + 1.5, 11.6], [25.4, 11.6], [25.4, 5.2], [26.3, 5.2]], 'warn', 3, { h: .1 }); T(S, 'rb', 19.4, 12, ['리밸런스', 'rebalance'], 'de-xs de-w', 3);
  T(S, 'gb', 26.4, 13.2, 'group B', 'cz-mono de-xs de-a', 4); [0, 1, 2].forEach(p => vl(S, 'gbm' + p, X(0) - .1, PY[p] - .3, PY[p] + 1.9, 'accent', 4, { w: .14 }));
  T(S, 'gbl', 8, 13.2, ['group B: 오프셋 0부터 다시 읽기 (보관 기간 동안)', 'group B: replay from offset 0 (within retention)'], 'de-xs de-a', 4);
  T(S, 'cml', 8, 1.2, ['초록 선 = 그룹 A가 커밋한 위치', 'green line = group A’s committed offset'], 'de-xs de-g', 2);
  [['토픽은 파티션별 추가 전용 로그 · 메시지마다 오프셋 번호', 'a topic is an append-only log per partition, each message numbered by offset'], ['소비자 그룹이 파티션을 나눠 맡고, 어디까지 읽었는지 커밋해요', 'a consumer group shares partitions and commits how far it has read'], ['소비자가 죽으면 파티션을 다른 소비자에게 다시 배정 → 커밋 위치부터 이어서', 'if a consumer dies, its partitions move to another, resuming from the commit'], ['메시지는 읽어도 지워지지 않아서 다른 그룹이 처음부터 다시 읽을 수 있어요', 'reading doesn’t delete messages, so another group can replay from the start']]
    .forEach((t, i) => T(S, 'n' + i, 1, 15.2, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 15.2, ['파티션 수 = 그룹 안 최대 병렬도 · 순서는 파티션 안에서만 보장 (같은 키 = 같은 파티션)', 'partition count = max parallelism per group · order holds only within a partition (same key, same partition)'], 'de-xs de-a', 5);
  T(S, 'z2', 1, 16.5, 'Apache Kafka · Redpanda · Pulsar · Amazon Kinesis', 'de-xs', 5);
  S.cap(1, '같은 키는 같은 파티션 끝에 붙어요', 'Same key, same partition, appended at the end')
    .cap(2, '소비자 그룹이 나눠 읽고 위치를 커밋', 'A group splits the reading and commits offsets')
    .cap(3, '소비자가 죽으면 리밸런스', 'A dead consumer triggers a rebalance')
    .cap(4, '다른 그룹은 처음부터 다시 읽어요', 'Another group replays from the start')
    .cap(5, '로그 기반 메시지 브로커 (Kafka)', 'Log-based message brokers (Kafka)');
  return S;
}
function sWindow() {
  const S = scene({ id: 'de-window', steps: 5, per: 1.5 });
  const X = t => 3 + t * .45, EV = [2, 4, 7, 13, 15, 16, 26, 31, 33, 34, 36, 48, 52, 55];
  T(S, 'l0', .3, 2.2, ['이벤트', 'events'], 'de-xs'); ar(S, 'ax', [3, 2.7], [30.6, 2.7], 'ink-3', 0, { h: .06 });
  EV.forEach((t, i) => pt(S, 'e' + i, X(t), 2.7, 1, C.cur, .28));
  [0, 10, 20, 30, 40, 50, 60].forEach(t => T(S, 'tk' + t, X(t) - 1, 3.3, t + 's', 'cz-tc cz-mono de-tiny', 0, { w: 2 }));
  T(S, 'l1', .3, 5.4, ['고정', 'tumbling'], 'de-xs', 2);
  [3, 3, 1, 4, 1, 2].forEach((n, i) => { rect(S, 'tw' + i, X(i * 10) + .08, 5, 4.5 - .16, 1.4, 'accent', 25, 2, { r: .15 }); T(S, 'twl' + i, X(i * 10), 5.25, String(n), 'cz-tc cz-mono de-xs', 2, { w: 4.5 }); });
  T(S, 'l2', .3, 8.4, ['슬라이딩', 'sliding'], 'de-xs', 3);
  [6, 4, 5, 5, 3].forEach((n, i) => { const y = 7.8 + (i % 2) * 1.5; rect(S, 'sw' + i, X(i * 10) + .08, y, 9 - .16, 1.2, 'warn', 28, 3, { r: .15 }); T(S, 'swl' + i, X(i * 10), y + .15, String(n), 'cz-tc cz-mono de-xs', 3, { w: 9 }); });
  T(S, 'l3', .3, 12.2, ['세션', 'session'], 'de-xs', 4);
  [[2, 16, 6], [26, 36, 5], [48, 55, 3]].forEach(([a, b, n], i) => { rect(S, 'ss' + i, X(a), 11.8, X(b) - X(a), 1.4, 'ok', 35, 4, { r: .15 }); rect(S, 'sg' + i, X(b), 11.8, Math.min(X(b + 8), X(60)) - X(b), 1.4, 'ok', 10, 4, { r: .15, css: 'border:.08em dashed var(--ok)' });
    T(S, 'ssl' + i, X(a), 12.05, String(n), 'cz-tc cz-mono de-xs', 4, { w: X(b) - X(a) }); });
  T(S, 'gp', X(16) + .2, 13.5, ['8초 동안 조용하면 세션 끝', 'session ends after 8 s of quiet'], 'de-xs de-g', 4);
  [['시간 순으로 끝없이 이어지는 이벤트를 어떻게 묶어 셀까요?', 'how do we group an endless stream of events to count them?'], ['고정 윈도: 10초씩 겹치지 않게 잘라요 → 이벤트는 한 칸에만', 'tumbling: back-to-back 10 s slices → each event in exactly one'], ['슬라이딩: 20초 창을 10초마다 밀어요 → 창이 겹쳐요', 'sliding: a 20 s window every 10 s → windows overlap'], ['세션: 활동 사이 공백(8초)으로 나눠요 → 길이가 제각각', 'session: split on gaps of inactivity (8 s) → lengths vary']]
    .forEach((t, i) => T(S, 'n' + i, 1, 15, t, 'de-s', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 15, ['고정: 분당 주문 수 · 슬라이딩: 최근 5분 이동 평균 · 세션: 사용자 방문 단위 분석', 'tumbling: orders per minute · sliding: 5-minute moving average · session: per-visit analytics'], 'de-xs de-a', 5);
  T(S, 'z2', 1, 16.3, 'Apache Flink · Kafka Streams · Spark Structured Streaming · Beam', 'de-xs', 5);
  S.cap(1, '끝없는 이벤트 흐름', 'An endless flow of events')
    .cap(2, '고정 윈도', 'Tumbling windows')
    .cap(3, '슬라이딩 윈도', 'Sliding windows')
    .cap(4, '세션 윈도', 'Session windows')
    .cap(5, '스트림의 윈도', 'Windows on streams');
  return S;
}
function sWatermark() {
  const S = scene({ id: 'de-watermark', steps: 5, per: 1.5 });
  const F = fr(0, 40, 0, 36, 3, 20, 2, 15.4);
  ax2(S, 'ax', F, ['처리 시각 →', 'arrival →'], ['이벤트 시각', 'event time'], 0);
  mline(S, 'id', F, [0, 0], [36, 36], { color: 'line', h: .08, dash: 1 }); T(S, 'idl', F.X(5), F.Y(27), ['이상: 즉시 도착 →', 'ideal: no delay →'], 'de-xs', 0);
  const P = [[2, 1], [4, 3], [5, 4.5], [8, 2], [9, 7], [12, 11], [13, 9], [15, 14], [18, 16], [20, 13], [22, 19], [26, 22], [28, 25], [31, 27], [33, 30], [36, 28]];
  P.forEach(([p, e], i) => mpt(S, 'p' + i, F, [p, e], 1, e < 10 ? C.cur : C.soft, .26));
  mline(S, 'wm', F, [6, 0], [40, 34], { st: 2, color: 'ok', h: .14 }); T(S, 'wml', F.X(33) + .2, F.Y(27) + .3, ['워터마크', 'watermark'], 'de-xs de-g', 2);
  rect(S, 'band', F.X(0), F.Y(10), F.X(40) - F.X(0), F.Y(0) - F.Y(10), 'accent', 10, 3, { r: 0 }); T(S, 'bl', F.X(.5), F.Y(10) + .1, ['윈도 [0, 10)', 'window [0, 10)'], 'de-xs de-a', 3);
  vl(S, 'em', F.X(16), F.T, F.B, 'ok', 3, { dash: 1, w: .1 });
  mpt(S, 'late', F, [24, 7], 4, C.badf, .32); T(S, 'latel', F.X(24) + .5, F.Y(7) - .4, ['늦게 온 이벤트', 'late event'], 'de-xs de-r', 4);
  T(S, 'rh', 22, 2.4, ['윈도 [0, 10) 결과', 'window [0, 10) result'], 'de-s', 3);
  T(S, 'r1', 22, 4, ['처리 시각 16에 확정: 6건', 'emitted at 16: count 6'], 'de-xs de-g', 3);
  T(S, 'r2', 22, 5.4, ['24에 늦은 이벤트 도착', 'late event arrives at 24'], 'de-xs de-r', 4);
  T(S, 'r3', 22, 6.6, ['허용 지연 안이면 → 7건으로 갱신', 'within allowed lateness → update to 7'], 'de-xs', 4);
  T(S, 'r4', 22, 7.8, ['넘으면 → 버리거나 따로 보관', 'beyond it → drop or side output'], 'de-xs', 4);
  [['이벤트는 발생한 시각보다 늦게 도착해요 (네트워크, 오프라인 기기)', 'events arrive later than they happened (networks, offline devices)'], ['워터마크: “이 시각 이전 이벤트는 거의 다 왔다”는 추정선', 'watermark: an estimate that “events before this time have arrived”'], ['워터마크가 윈도 끝(10)을 넘으면 결과를 확정해 내보내요', 'once the watermark passes the window end (10), the result is emitted'], ['그 뒤에 온 이벤트는 허용 지연 규칙으로 처리해요', 'events after that follow the allowed-lateness rule']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16.8, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 16.8, ['오래 기다리면 정확하지만 늦고, 빨리 닫으면 빠르지만 놓쳐요 → 지연과 정확도의 맞바꿈', 'wait longer for accuracy, close sooner for speed → latency versus completeness'], 'de-xs de-a', 5);
  T(S, 'z2', 1, 18.1, ['처리 시각이 아닌 이벤트 시각으로 집계해야 재처리해도 같은 결과', 'aggregate by event time, not arrival time, so reprocessing gives the same answer'], 'de-xs', 5);
  S.cap(1, '이벤트는 늦게 도착해요', 'Events arrive late')
    .cap(2, '워터마크가 진행 상황을 추정해요', 'A watermark estimates progress')
    .cap(3, '워터마크가 지나면 윈도를 닫아요', 'Close the window when the watermark passes')
    .cap(4, '그 뒤에 온 늦은 이벤트', 'A straggler arrives afterwards')
    .cap(5, '이벤트 시각과 워터마크', 'Event time and watermarks');
  return S;
}
function sExactly() {
  const S = scene({ id: 'de-exactly', steps: 5, per: 1.5 });
  T(S, 'lh', 1, 1.6, ['입력 로그 (오프셋)', 'input log (offsets)'], 'de-xs');
  for (let k = 0; k < 5; k++) { box2(S, 'o' + k, 1 + k * 1.9, 2.8, 1.7, 1.6, String(k), 'line', 0, { pct: 45 }); tsets(S, 'o' + k, [[k < 3 ? 1 : 2, 'accent', 35]]); }
  vl(S, 'cm', 1 + 3 * 1.9 - .1, 2.4, 4.8, 'ok', 1, { w: .16 }); T(S, 'cml', 1, 5.1, ['커밋 = 3', 'committed = 3'], 'de-xs de-g', 1);
  box2(S, 'pr', 12.4, 2.4, 7, 2.4, ['처리기', 'processor'], 'warn', 0, { pct: 25 }); ar(S, 'pa', [10.6, 3.6], [12.3, 3.6], 'ink-3', 1, { h: .1 }); ar(S, 'sa', [19.5, 3.6], [22.3, 3.6], 'ink-3', 1, { h: .1 });
  box2(S, 'db', 22.4, 2.4, 8.6, 2.4, 'DB', 'ok', 0, { pct: 25 });
  [['합계 = 3', 'total = 3', 1, 2, 'de-xs'], ['합계 = 5', 'total = 5', 2, 3, 'de-xs'], ['합계 = 7 ✗ 중복', 'total = 7 ✗ dupes', 3, 4, 'de-xs de-r'], ['합계 = 5 ✓', 'total = 5 ✓', 4, 0, 'de-xs de-g']].forEach(([a, b, s, o, c], i) => T(S, 'tv' + i, 22.4, 5.2, [a, b], 'cz-tc ' + c, s, { w: 8.6, off: o }));
  xm(S, 'cr', 16, 1.6, 2, { off: 3 }); T(S, 'crl', 12.4, 5.2, ['커밋 직전 장애', 'crash before commit'], 'cz-tc de-xs de-r', 2, { w: 7, off: 3 });
  T(S, 'rp', 12.4, 5.2, ['3부터 다시 처리', 'replays from 3'], 'cz-tc de-xs de-w', 3, { w: 7, off: 4 });
  rect(S, 'ck', 1, 8, 30, 4.6, 'ok', 8, 4, { r: .5, css: 'border:.14em solid var(--ok)' });
  T(S, 'ckh', 1.6, 8.4, ['체크포인트 + 트랜잭션: 셋을 한 번에 커밋', 'checkpoint + transaction: commit all three together'], 'de-s de-g', 4);
  [['입력 오프셋', 'input offset'], ['처리기 상태', 'operator state'], ['DB 쓰기', 'sink writes']].forEach((l, i) => box2(S, 'cp' + i, 1.8 + i * 9.8, 9.9, 8.8, 1.8, l, 'ok', 4, { pct: 30 }));
  [['처리하고 DB에 쓴 뒤 “여기까지 읽음(오프셋)”을 커밋해요', 'process, write to the DB, then commit “read up to here” (the offset)'], ['DB엔 썼는데 오프셋을 커밋하기 직전에 죽으면?', 'what if it crashes after writing but before committing?'], ['다시 켜면 커밋된 3부터 재처리 → DB에 두 번 더해져요 (최소 한 번)', 'on restart it replays from 3 → the DB adds them twice (at-least-once)'], ['오프셋·상태·출력을 한 트랜잭션으로 묶거나, 이벤트 ID로 멱등하게 써요 (정확히 한 번)', 'commit offsets, state and output in one transaction, or write idempotently by event ID (exactly-once)']]
    .forEach((t, i) => T(S, 'n' + i, 1, 14, t, 'de-xs', i + 1, { off: i + 2 }));
  [['최대 한 번: 먼저 커밋 → 장애 시 유실 / 최소 한 번: 나중에 커밋 → 장애 시 중복', 'at-most-once: commit first → loss on failure / at-least-once: commit after → duplicates', 'de-xs'], ['Flink 체크포인트 + 2단계 커밋 싱크 · Kafka 트랜잭션', 'Flink checkpoints with two-phase-commit sinks · Kafka transactions', 'de-xs de-a'], ['실무에선 “최소 한 번 + 멱등 쓰기”로 같은 효과를 내는 경우가 많아요', 'in practice, “at-least-once + idempotent writes” often gets the same effect', 'de-xs de-g']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 1, 14 + i * 1.3, [a, b], c, 5));
  S.cap(1, '처리 → 쓰기 → 커밋', 'Process, write, commit')
    .cap(2, '커밋 직전에 장애', 'A crash right before the commit')
    .cap(3, '재처리하면 중복', 'Replaying duplicates the effect')
    .cap(4, '한 번에 커밋해 정확히 한 번', 'Commit atomically for exactly-once')
    .cap(5, '전달 보장: 최대·최소·정확히 한 번', 'Delivery guarantees');
  return S;
}
function sBack() {
  const S = scene({ id: 'de-back', steps: 5, per: 1.5 });
  box2(S, 'pr', 1, 2, 6, 2.2, ['생산자', 'producer'], 'accent', 0, { pct: 25 });
  [['600/s', 0, 2], ['1,000/s', 2, 3], ['600/s (배압)', 3, 0]].forEach(([t, s, o], i) => T(S, 'pr' + i, 1, 4.5, i === 2 ? ['600/s (배압)', '600/s (throttled)'] : t, 'cz-tc cz-mono de-xs ' + (i === 1 ? 'de-r' : 'de-a'), s, { w: 6, off: o }));
  frame(S, 'q', 9, 2.2, 13, 1.8, 'ink-3', 0, { r: .9, w: .12 }); T(S, 'ql', 9, 4.4, ['버퍼 (대기열)', 'buffer (queue)'], 'cz-tc de-xs', 0, { w: 13 });
  rect(S, 'f0', 9.2, 2.4, 1.6, 1.4, 'accent', 45, 0, { r: .7, off: 2 }); rect(S, 'f1', 9.2, 2.4, 9, 1.4, 'warn', 50, 2, { r: .7, off: 3 });
  rect(S, 'f2', 9.2, 2.4, 12.6, 1.4, 'danger', 55, 3, { r: .7, off: 4 }); rect(S, 'f3', 9.2, 2.4, 3, 1.4, 'ok', 45, 4, { r: .7 });
  ar(S, 'pq', [7.1, 3.1], [8.9, 3.1], 'ink-3', 0, { h: .12 }); ar(S, 'qc', [22.1, 3.1], [23.9, 3.1], 'ink-3', 0, { h: .12 });
  box2(S, 'c1', 24, 1.4, 7, 1.8, ['소비자 600/s', 'consumer 600/s'], 'ok', 0, { pct: 25 }); box2(S, 'c2', 24, 3.6, 7, 1.8, ['소비자 +600/s', 'consumer +600/s'], 'ok', 4, { pct: 35 });
  elb(S, 'bp', [[15.5, 2.1], [15.5, .9], [4, .9], [4, 1.9]], 'danger', 3, { h: .12, off: 4 }); T(S, 'bpl', 7, .3, ['가득 참 → 속도 줄여!', 'full → slow down!'], 'de-xs de-r', 3, { off: 4 });
  const F = fr(0, 40, 0, 100, 3, 30, 7.4, 13.4);
  ax2(S, 'ax', F, ['시간 →', 'time →'], ['소비 지연 (lag)', 'consumer lag'], 0);
  const L = [[0, 0], [10, 0], [20, 60], [25, 60], [33, 0], [40, 0]], ST = [1, 2, 3, 4, 4];
  for (let i = 1; i < L.length; i++) seg(S, 'lg' + i, [F.X(L[i - 1][0]), F.Y(L[i - 1][1])], [F.X(L[i][0]), F.Y(L[i][1])], ST[i - 1], i === 2 ? 'danger' : i === 3 ? 'warn' : 'accent', .14);
  [['평소엔 들어오는 만큼 처리해서 버퍼가 거의 비어 있어요', 'normally the consumer keeps up and the buffer stays nearly empty'], ['트래픽이 몰리면 버퍼가 차고 처리 지연(lag)이 커져요', 'a traffic spike fills the buffer and lag climbs'], ['무한 버퍼는 메모리를 터뜨려요 → 꽉 차면 위로 “천천히” 신호 (배압)', 'an unbounded buffer blows up memory → when full, signal upstream to slow down (backpressure)'], ['소비자를 늘려 처리량을 키우면 밀린 일이 빠져요', 'add consumers to raise throughput and drain the backlog']]
    .forEach((t, i) => T(S, 'n' + i, 1, 15, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 15, ['Flink는 크레딧 기반 배압, Reactive Streams는 request(n)로 필요한 만큼만 받아요', 'Flink uses credit-based backpressure; Reactive Streams pulls with request(n)'], 'de-xs', 5);
  T(S, 'z2', 1, 16.3, ['카프카 소비 지연(consumer lag)을 지표로 보고 알림을 걸어요', 'monitor Kafka consumer lag and alert on it'], 'de-xs de-a', 5);
  T(S, 'z3', 1, 17.6, ['선택지: 생산 늦추기 · 소비자 늘리기 · 샘플링해서 버리기', 'options: slow producers, add consumers, or sample and drop'], 'de-xs', 5);
  S.cap(1, '생산과 소비가 균형을 이뤄요', 'Production and consumption are balanced')
    .cap(2, '생산이 더 빠르면 밀려요', 'Faster production builds a backlog')
    .cap(3, '배압: 위로 속도를 늦추라고 알려요', 'Backpressure tells upstream to slow down')
    .cap(4, '소비자를 늘려 따라잡아요', 'More consumers catch up')
    .cap(5, '배압과 소비 지연', 'Backpressure and lag');
  return S;
}

/* ================= quality & operations ================= */
function sQuality() {
  const S = scene({ id: 'de-quality', steps: 5, per: 1.5 });
  const CX = [1, 4.2, 7.4, 11], H = ['order_id', 'user_id', 'status', 'amount'];
  const R = [['1001', 'u7', 'paid', '120'], ['1002', 'u3', 'paid', '80'], ['1003', 'null', 'paid', '45'], ['1002', 'u9', 'paid', '60'], ['1004', 'u2', 'shiped', '30'], ['1005', 'u5', 'paid', '-500']];
  const BAD = { '2_1': 1, '3_0': 1, '4_2': 1, '5_3': 1 };
  H.forEach((h, j) => T(S, 'h' + j, CX[j], 1.4, h, 'cz-mono de-xs de-a', 1));
  R.forEach((r, i) => { rect(S, 'rb' + i, .8, 2.6 + i * 1.2, 13.4, 1.1, 'line', 25, 1, { r: .12 });
    r.forEach((v, j) => { const k = `v${i}_${j}`; T(S, k, CX[j], 2.7 + i * 1.2, v, 'cz-mono de-xs', 1); if (BAD[i + '_' + j]) rect(S, 'm' + k, CX[j] - .2, 2.65 + i * 1.2, j === 0 ? 3 : 3, 1, 'danger', 35, 2, { r: .12 }); }); });
  [['not_null(user_id)', 2.4], ['unique(order_id)', 4.2], ['accepted_values(status)', 6], ['amount ≥ 0', 7.8]].forEach(([l, y], i) => { box2(S, 'ck' + i, 15.4, y, 8, 1.5, l, 'line', 1, { pct: 40 }); tsets(S, 'ck' + i, [[2, 'danger', 30]]); xm(S, 'cx' + i, 24.2, y + .75, 2); });
  [0, 1].forEach(i => tsets(S, 'rb' + i, [[3, 'ok', 35]])); [2, 3, 4, 5].forEach(i => tsets(S, 'rb' + i, [[3, 'danger', 22]]));
  box2(S, 'mt', 25.6, 2.4, 5.4, 2, ['마트로 2행', '2 rows → mart'], 'ok', 3, { pct: 35 }); box2(S, 'qr', 25.6, 5.2, 5.4, 2, ['격리 4행', '4 rows held'], 'danger', 3, { pct: 35 });
  T(S, 'al', 25.6, 7.6, ['🔔 담당자에게 알림', '🔔 owner alerted'], 'de-xs de-r', 3);
  T(S, 'vh', 1, 10, ['일별 적재 행 수', 'rows loaded per day'], 'de-xs', 4);
  [100, 104, 98, 101, 99, 103, 20].forEach((v, d) => { const h = v * .04; rect(S, 'vb' + d, 1.4 + d * 2.4, 15 - h, 1.8, h, d === 6 ? 'danger' : 'accent', d === 6 ? 55 : 30, 4, { r: .1 }); });
  hl(S, 'vbase', 1, 18.6, 15, 'ink-3', 4, { w: .08 }); T(S, 'vt', 15.6, 13.4, ['−80%', '−80%'], 'cz-mono de-s de-r', 4);
  T(S, 'f1', 19.6, 11, ['볼륨: 평소보다 80% 적음 ✗', 'volume: 80% below normal ✗'], 'de-xs de-r', 4); T(S, 'f2', 19.6, 12.3, ['신선도: 마지막 갱신 6시간 전 ✗', 'freshness: last update 6 h ago ✗'], 'de-xs de-r', 4); T(S, 'f3', 19.6, 13.6, ['스키마: 열 이름·타입 일치 ✓', 'schema: names and types match ✓'], 'de-xs de-g', 4);
  [['새 배치가 들어왔어요', 'a new batch arrives'], ['규칙으로 검사: 빈 값, 중복, 허용 값, 범위', 'rules check it: nulls, duplicates, allowed values, ranges'], ['통과한 행만 내보내고 나머지는 격리 + 알림', 'only passing rows move on; the rest are quarantined and alerted'], ['행 수와 신선도처럼 데이터 전체의 이상도 지켜봐요', 'watch the whole dataset too: volume and freshness']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16.4, t, 'de-s', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 16.4, ['깨진 데이터는 대시보드에 닿기 전에 막아요', 'stop broken data before it reaches a dashboard'], 'de-s de-g', 5);
  T(S, 'z2', 1, 17.8, ['dbt tests · Great Expectations · Soda · 생산자와 맺는 데이터 계약(data contract)', 'dbt tests, Great Expectations, Soda · data contracts with producers'], 'de-xs de-a', 5);
  S.cap(1, '새 데이터가 들어와요', 'A new batch arrives')
    .cap(2, '규칙으로 검사해요', 'Check it against rules')
    .cap(3, '통과한 것만 내보내요', 'Only passing rows move on')
    .cap(4, '전체 흐름의 이상도 봐요', 'Watch volume and freshness too')
    .cap(5, '데이터 품질 검사', 'Data quality checks');
  return S;
}
function sSchema() {
  const S = scene({ id: 'de-schema', steps: 5, per: 1.5 });
  const v1 = tbl(S, 'v1', 1, 1.4, 10, 'v1', ['id: int', 'name: string'], 'accent', 1);
  const v2 = tbl(S, 'v2', 1, 5.8, 10, 'v2', ['id: int', 'name: string', 'email: string = null'], 'ok', 2);
  const v3 = tbl(S, 'v3', 1, 11.2, 10, 'v3', ['id: int', 'full_name: string'], 'danger', 3);
  box2(S, 'rg', 13.4, 6.6, 6.4, 2.8, 'Schema Registry', 'warn', 0, { pct: 25 });
  ar(S, 'a1', [11.1, 3], [13.3, 7], 'accent', 1, { h: .1 }); ar(S, 'a2', [11.1, 8], [13.3, 8], 'ok', 2, { h: .1 }); ar(S, 'a3', [11.1, 12.6], [13.3, 9.2], 'danger', 3, { h: .1 });
  T(S, 'k2', 13.4, 10, ['✓ 호환: 기본값 있는 필드 추가', '✓ compatible: field added with default'], 'de-xs de-g', 2, { off: 3 });
  T(S, 'k3', 13.4, 10, ['✗ 거부: name 삭제·이름 변경', '✗ rejected: name removed/renamed'], 'de-xs de-r', 3, { off: 4 }); T(S, 'k3b', 13.4, 11.2, ['→ 배포가 막혀요', '→ deploy is blocked'], 'de-xs de-r', 3, { off: 4 });
  box2(S, 'oc', 22, 1.4, 9, 1.8, ['옛 소비자 (v1)', 'old consumer (v1)'], 'accent', 1, { pct: 22 }); box2(S, 'nc', 22, 5.6, 9, 1.8, ['새 소비자 (v2)', 'new consumer (v2)'], 'ok', 2, { pct: 25 });
  T(S, 'oc2', 22, 3.5, ['v2 데이터: email은 모르니 무시 ✓', 'v2 data: ignores email ✓'], 'de-xs de-g', 2); T(S, 'nc2', 22, 7.7, ['v1 데이터: email = null 로 채움 ✓', 'v1 data: fills email = null ✓'], 'de-xs de-g', 2);
  [['BACKWARD', ['새 리더가 옛 데이터를 읽을 수 있음', 'new readers can read old data']], ['FORWARD', ['옛 리더가 새 데이터를 읽을 수 있음', 'old readers can read new data']], ['FULL', ['둘 다', 'both']]].forEach(([m, d], i) => { T(S, 'mm' + i, 13.4, 12.4 + i * 1.2, m, 'cz-mono de-xs de-a', 4); T(S, 'md' + i, 17, 12.4 + i * 1.2, d, 'de-xs', 4); });
  [['v1 스키마를 등록하고, 메시지엔 스키마 ID를 붙여 보내요', 'register v1; every message carries its schema ID'], ['기본값이 있는 선택 필드를 추가하면 옛·새 소비자 모두 문제없어요', 'adding an optional field with a default works for old and new readers'], ['필드를 지우거나 이름·타입을 바꾸면 레지스트리가 등록을 거부해요', 'removing a field or changing its name or type is rejected by the registry'], ['호환 모드로 어떤 변경을 허용할지 정해요', 'the compatibility mode sets which changes are allowed']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16.4, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 16.4, ['Avro · Protobuf · JSON Schema + Confluent Schema Registry', 'Avro, Protobuf, JSON Schema + Confluent Schema Registry'], 'de-xs de-a', 5);
  T(S, 'z2', 1, 17.7, ['필드는 기본값과 함께 추가만 · 바꿀 땐 새 필드를 만들고 옮긴 뒤 옛 필드를 지워요', 'only add fields with defaults · to change one, add a new field, migrate, then drop the old'], 'de-xs', 5);
  S.cap(1, '스키마를 등록하고 써요', 'Register the schema and use it')
    .cap(2, '호환되는 변경: 필드 추가', 'A compatible change: add a field')
    .cap(3, '깨지는 변경은 거부돼요', 'Breaking changes are rejected')
    .cap(4, '호환 모드', 'Compatibility modes')
    .cap(5, '스키마 진화', 'Schema evolution');
  return S;
}
function sLineage() {
  const S = scene({ id: 'de-lineage', steps: 5, per: 1.5 });
  const N = { ro: [1, 3, 'orders_raw'], ru: [1, 9, 'users_raw'], so: [9, 3, 'stg_orders'], su: [9, 9, 'stg_users'], fr: [17, 6, 'fct_revenue'], d1: [25, 1.6, ['매출 대시보드', 'revenue dashboard']], d2: [25, 6, ['재무 리포트', 'finance report']], d3: [25, 10.4, ['이탈 예측 모델', 'churn model']] };
  Object.entries(N).forEach(([k, [x, y, l]]) => box2(S, k, x, y, 6, 2.2, l, 'line', 0, { pct: 45 }));
  const E = [['ro', 'so'], ['ru', 'su'], ['so', 'fr'], ['su', 'fr'], ['fr', 'd1'], ['fr', 'd2'], ['su', 'd3']];
  E.forEach(([a, b], i) => { const [ax, ay] = N[a], [bx, by] = N[b]; ar(S, 'e' + i, [ax + 6.1, ay + 1.1], [bx - .1, by + 1.1], 'ink-3', 0, { h: .08 }); });
  T(S, 'cl', 1, 13, ['orders_raw.amount → stg_orders.amount → fct_revenue.revenue → 매출 대시보드', 'orders_raw.amount → stg_orders.amount → fct_revenue.revenue → revenue dashboard'], 'cz-mono de-xs de-a', 2, { off: 3 });
  tsets(S, 'ro', [[2, 'accent', 30], [3, 'warn', 50], [4, 'line', 45]]); ['so', 'fr', 'd1'].forEach(k => tsets(S, k, [[2, 'accent', 30], [3, 'warn', 30], [4, 'line', 45]])); tsets(S, 'd2', [[3, 'warn', 30], [4, 'line', 45]]);
  T(S, 'ch', 1, 13, ['orders_raw.amount 이름을 바꾸면? → 하류 4곳이 영향받아요', 'rename orders_raw.amount? → 4 downstream assets are affected'], 'de-xs de-w', 3, { off: 4 });
  tsets(S, 'd3', [[4, 'danger', 30], [5, 'line', 45]]); tsets(S, 'su', [[4, 'danger', 45], [5, 'line', 45]]);
  T(S, 'rc', 1, 13, ['이탈 모델 숫자가 이상해요 → 위로 거슬러 가니 stg_users 적재가 실패했어요', 'the churn model looks off → tracing upstream finds a failed stg_users load'], 'de-xs de-r', 4, { off: 5 });
  [['카탈로그가 누가 무엇을 읽고 쓰는지 그래프로 알아요 (데이터 계보)', 'a catalog knows who reads and writes what, as a graph (lineage)'], ['열 단위로도 따라가요: 원본 amount가 대시보드 숫자가 되기까지', 'column-level lineage follows one field all the way to a dashboard number'], ['바꾸기 전에 영향 범위를 확인해요 (영향 분석)', 'check the blast radius before changing anything (impact analysis)'], ['숫자가 이상하면 위로 거슬러 원인을 찾아요 (근본 원인 분석)', 'when a number looks wrong, walk upstream to the cause (root-cause analysis)']]
    .forEach((t, i) => T(S, 'n' + i, 1, 15.2, t, 'de-xs', i + 1, { off: i + 2 }));
  T(S, 'z1', 1, 15.2, ['카탈로그엔 설명·소유자·민감도 태그(개인정보)도 달아 검색과 권한 관리에 써요', 'catalogs also carry descriptions, owners and sensitivity tags (PII) for search and access control'], 'de-xs', 5);
  T(S, 'z2', 1, 16.5, 'OpenLineage · DataHub · Amundsen · dbt docs · Unity Catalog', 'de-xs de-a', 5);
  S.cap(1, '데이터가 흘러가는 지도', 'A map of how data flows')
    .cap(2, '열 단위 계보', 'Column-level lineage')
    .cap(3, '바꾸기 전 영향 분석', 'Impact analysis before a change')
    .cap(4, '거슬러 올라가 원인 찾기', 'Trace upstream to the cause')
    .cap(5, '데이터 계보와 카탈로그', 'Lineage and catalogs');
  return S;
}
function sHll() {
  const S = scene({ id: 'de-hll', steps: 5, per: 1.5 });
  T(S, 'm1', 1, 1.2, ['정확히 세기: 본 ID를 전부 저장 (1억 명)', 'exact: store every ID seen (100M users)'], 'de-xs', 1);
  rect(S, 'b1', 1, 2.4, 26, 1.2, 'danger', 45, 1, { r: .15 }); T(S, 'b1l', 27.4, 2.45, '≈ 1.6 GB', 'cz-mono de-xs de-r', 1);
  T(S, 'm2', 1, 4, 'HyperLogLog', 'cz-mono de-xs de-g', 4); rect(S, 'b2', 1, 5.2, .25, 1.2, 'ok', 70, 4, { r: .1 }); T(S, 'b2l', 1.6, 5.25, ['12 KB · 오차 약 0.8%', '12 KB · about 0.8% error'], 'cz-mono de-xs de-g', 4);
  T(S, 'hh', 1, 7.4, '"user_42" → hash →', 'cz-mono de-xs', 2);
  const BITS = '0010001011010110';
  BITS.split('').forEach((b, i) => { box2(S, 'bt' + i, 9.4 + i * 1.3, 7.1, 1.15, 1.4, b, i < 4 ? 'warn' : i < 6 ? 'danger' : 'line', 2, { pct: i < 6 ? 35 : 40 }); });
  T(S, 'z0', 9.4, 8.8, ['앞 4비트 = 버킷 2', 'first 4 bits = bucket 2'], 'de-xs de-w', 3); T(S, 'z0b', 16.8, 8.8, ['그다음 0이 2개 → 값 3', 'then 2 zeros → rank 3'], 'de-xs de-r', 3);
  T(S, 'coin', 9.4, 8.8, ['앞에 0이 k개 연속 = 확률 1/2ᵏ → 길게 나올수록 많이 본 것', 'k leading zeros has probability 1/2ᵏ → long runs imply many items'], 'de-xs de-r', 2, { off: 3 });
  const REG = [2, 4, 3, 5, 2, 3, 6, 3, 4, 2, 5, 3, 4, 3, 2, 4];
  T(S, 'rh', 1, 10.4, ['레지스터 16개: 버킷마다 본 값 중 최댓값', '16 registers: the max rank seen per bucket'], 'de-xs', 3);
  REG.forEach((v, i) => { box2(S, 'rg' + i, 1 + i * 1.9, 11.6, 1.7, 1.6, String(v), i === 2 ? 'danger' : 'accent', 3, { pct: i === 2 ? 40 : 22 }); T(S, 'ri' + i, 1 + i * 1.9, 13.3, String(i), 'cz-tc cz-mono de-tiny', 3, { w: 1.7 }); });
  T(S, 'est', 1, 14.4, ['추정 = 상수 × m² ÷ Σ 2^(−레지스터) (조화평균) → 버킷이 많을수록 정확', 'estimate = const × m² ÷ Σ 2^(−register) (harmonic mean) → more buckets, more accuracy'], 'cz-mono de-xs de-a', 4);
  [['정확한 고유 수(distinct)는 본 ID를 모두 기억해야 해서 메모리가 커져요', 'an exact distinct count must remember every ID, so memory grows'], ['해시는 무작위 비트처럼 보여요 · 앞쪽 0이 길게 나오는 건 드문 일이에요', 'hashes look like random bits · a long run of leading zeros is rare'], ['앞 비트로 버킷을 고르고, 나머지의 0 길이 최댓값만 저장해요', 'leading bits pick a bucket; only the longest zero run is stored'], ['레지스터의 조화평균으로 전체 개수를 추정해요', 'the harmonic mean of the registers estimates the total']]
    .forEach((t, i) => T(S, 'n' + i, 1, 16, t, 'de-xs', i + 1, { off: i + 2 }));
  [['HLL끼리 레지스터 최댓값으로 합칠 수 있어 일별 → 월별 고유 사용자도 바로 계산', 'HLLs merge by taking register maxima, so daily sketches roll up into monthly uniques', 'de-xs de-g'], ['Redis PFCOUNT · BigQuery APPROX_COUNT_DISTINCT · Druid · Trino approx_distinct', 'Redis PFCOUNT, BigQuery APPROX_COUNT_DISTINCT, Druid, Trino approx_distinct', 'de-xs de-a'], ['같은 계열: Count-Min Sketch(빈도) · t-digest(분위수)', 'relatives: Count-Min Sketch (frequency), t-digest (quantiles)', 'de-xs']]
    .forEach(([a, b, c], i) => T(S, 'z' + i, 1, 16 + i * 1.3, [a, b], c, 5));
  S.cap(1, '정확히 세면 메모리가 커요', 'Exact counting costs memory')
    .cap(2, '해시의 앞자리 0을 봐요', 'Look at a hash’s leading zeros')
    .cap(3, '버킷마다 최댓값만 기억해요', 'Keep only the max per bucket')
    .cap(4, '작은 메모리로 큰 수를 추정', 'Estimate huge counts in tiny memory')
    .cap(5, '근사 집계: HyperLogLog', 'Approximate counting: HyperLogLog');
  return S;
}

const XT = (() => {
const ex = t => Array.isArray(t) ? t.map(ex) : (typeof t === 'string' ? t.replace(/</g, '&lt;') : t);
const { scene, node, edge, text, arrow, dot, item, sec, page, C } = CZ;
const hid = o => Object.assign({ opacity: '0' }, o || {});
const r3 = n => +(+n).toFixed(3);
const cv = c => c.includes('(') ? c : `var(--${c})`;
const tint = (c, p) => `color-mix(in srgb,var(--${c}) ${p}%,var(--ui))`;
const vis = (S, k, st, off) => { if (st) S.set(k, st, { opacity: '1' }); if (off) S.set(k, off, { opacity: '0' }); };
const fr = (x0, x1, y0, y1, L, R, T, B) => ({ x0, x1, y0, y1, L, R, T, B, u: (R - L) / (x1 - x0), X: x => L + (x - x0) / (x1 - x0) * (R - L), Y: y => B - (y - y0) / (y1 - y0) * (B - T) });
/* frame with origin at (ox, oy) on the stage, u em per unit, integer extents */
const pf = (ox, oy, u, xa, xb, ya, yb) => fr(xa, xb, ya, yb, ox + xa * u, ox + xb * u, oy - yb * u, oy - ya * u);
const dashBg = (c, dir) => `repeating-linear-gradient(${dir || 90}deg,${cv(c)} 0 .45em,transparent .45em .75em)`;
function seg(S, k, a, b, st, color, h, o = {}) {
  h = h || .18; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = o.dash ? 0 : dx / L * h * .45, uy = o.dash ? 0 : dy / L * h * .45;
  const bg = o.dash ? dashBg(color) : cv(color);
  edge(S, k, a[0] - ux, a[1] - uy, b[0] + ux, b[1] + uy, { h, y: a[1] - uy - h / 2, s: st ? hid({ background: bg }) : { background: bg } });
  vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' });
}
function poly(S, pfx, pts, o = {}) { let n = 0; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if (!a || !b) continue; const st = typeof o.st === 'function' ? o.st(i, pts.length - 1) : o.st; seg(S, pfx + (n++), a, b, st, o.color || 'accent', o.h, { off: o.off }); } return n; }
function pplot(S, pfx, P, t0, t1, o = {}) { const n = o.n || 48, pts = []; for (let i = 0; i <= n; i++) pts.push(P(t0 + (t1 - t0) * i / n)); return poly(S, pfx, pts, o); }
/* plot a parametric curve given in math coordinates, dropping points outside the frame */
function mplot(S, pfx, F, P, t0, t1, o = {}) { return pplot(S, pfx, t => { const [x, y] = P(t); return x >= F.x0 - 1e-9 && x <= F.x1 + 1e-9 && y >= F.y0 - 1e-9 && y <= F.y1 + 1e-9 ? [F.X(x), F.Y(y)] : null; }, t0, t1, o); }
/* clip segment p-q (math coords) to the frame (Liang-Barsky) */
function clip(F, p, q) {
  let t0 = 0, t1 = 1; const dx = q[0] - p[0], dy = q[1] - p[1];
  const tests = [[-dx, p[0] - F.x0], [dx, F.x1 - p[0]], [-dy, p[1] - F.y0], [dy, F.y1 - p[1]]];
  for (const [pp, qq] of tests) { if (pp === 0) { if (qq < 0) return null; continue; } const t = qq / pp; if (pp < 0) { if (t > t1) return null; if (t > t0) t0 = t; } else { if (t < t0) return null; if (t < t1) t1 = t; } }
  return [[p[0] + t0 * dx, p[1] + t0 * dy], [p[0] + t1 * dx, p[1] + t1 * dy]];
}
function mline(S, k, F, p, q, o = {}) { const c = clip(F, p, q); if (!c) return; seg(S, k, [F.X(c[0][0]), F.Y(c[0][1])], [F.X(c[1][0]), F.Y(c[1][1])], o.st, o.color || 'accent', o.h || .14, o); }
const thru = (S, k, F, d, o = {}) => mline(S, k, F, [(o.p || [0, 0])[0] - 99 * d[0], (o.p || [0, 0])[1] - 99 * d[1]], [(o.p || [0, 0])[0] + 99 * d[0], (o.p || [0, 0])[1] + 99 * d[1]], o);
const vl = (S, k, x, y1, y2, color, st, o = {}) => { S.el(k, { x: x - (o.w || .14) / 2, y: Math.min(y1, y2), w: o.w || .14, h: Math.abs(y2 - y1), css: `background:${o.dash ? dashBg(color, 180) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const hl = (S, k, x1, x2, y, color, st, o = {}) => { S.el(k, { x: Math.min(x1, x2), y: y - (o.w || .14) / 2, w: Math.abs(x2 - x1), h: o.w || .14, css: `background:${o.dash ? dashBg(color) : cv(color)}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rect = (S, k, x, y, w, h, color, pct, st, o = {}) => { S.el(k, { x, y, w, h, html: ex(o.html || ''), cls: o.cls || '', css: `border-radius:${o.r ?? .2}em;${o.css || ''}`, s: Object.assign(st ? hid() : {}, { background: tint(color, pct) }) }); vis(S, k, st, o.off); };
const pt = (S, k, x, y, st, sty, r, o = {}) => { dot(S, k, x, y, '', { r: r || .42, s: Object.assign(st ? { opacity: '0' } : {}, sty || C.cur) }); vis(S, k, st, o.off); };
const T = (S, k, x, y, t, cls, st, o = {}) => { t = ex(t); const p = { cls: 'cz-t ' + (cls || ''), css: 'z-index:5;' + (o.css || ''), s: st ? hid() : {} }; if (o.w) p.w = o.w; text(S, k, x, y, t, p); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.3' }); };
const L = (S, k, x, y, w, cls, list) => S.label(k, { cls: 'cz-t ' + cls, x, y, w, css: 'z-index:5' }, [[0, '']].concat(list));
const ar = (S, k, a, b, color, st, o = {}) => { const c = cv(color || 'ink-2'); arrow(S, k, a[0], a[1], b[0], b[1], { h: o.h || .16, s: Object.assign(st ? hid() : {}, { background: o.dash ? dashBg(color) : c, 'border-color': c }) }); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' }); };
const mar = (S, k, F, a, b, color, st, o) => ar(S, k, [F.X(a[0]), F.Y(a[1])], [F.X(b[0]), F.Y(b[1])], color, st, o);
const mpt = (S, k, F, p, st, sty, r, o) => pt(S, k, F.X(p[0]), F.Y(p[1]), st, sty, r, o);
const mT = (S, k, F, p, dx, dy, t, cls, st, o) => T(S, k, F.X(p[0]) + dx, F.Y(p[1]) + dy, t, cls, st, o);
/* static grid with integer lines and axes */
function grid(S, k, F, st, o = {}) {
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'dex-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
  if (F.y0 <= 0 && F.y1 >= 0) hl(S, k + 'x', F.L, F.R, F.Y(0), 'ink-3', st, { w: .1, off: o.off });
  if (F.x0 <= 0 && F.x1 >= 0) vl(S, k + 'y', F.X(0), F.T, F.B, 'ink-3', st, { w: .1, off: o.off });
}
/* matrix [[a,b],[c,d]] (math, y up) as a CSS transform */


/* ---- probability helpers ---- */
const poly2 = (S, k, pts, fill, st, o = {}) => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
  S.el(k, { x: x0, y: y0, w, h, css: `clip-path:polygon(${pts.map(([x, y]) => `${r3(x - x0)}em ${r3(y - y0)}em`).join(',')});background:${fill};${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(7);
const gauss = () => { const u = Math.max(rnd(), 1e-9), v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const npdf = (x, m = 0, s = 1) => Math.exp(-(((x - m) / s) ** 2) / 2) / (s * Math.sqrt(2 * Math.PI));
const fact = n => n <= 1 ? 1 : n * fact(n - 1), C2 = (n, k) => fact(n) / (fact(k) * fact(n - k));
const ring = (S, k, cx, cy, r, color, st, o = {}) => { S.el(k, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, css: `border-radius:50%;border:${o.w || .12}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)};${o.fill ? `background:${o.fill};` : ''}${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const ax2 = (S, k, F, xl, yl, st) => { hl(S, k + 'x', F.L, F.R, F.Y(Math.max(F.y0, 0)), 'ink-3', st, { w: .12 }); vl(S, k + 'y', F.X(Math.max(F.x0, 0)), F.T, F.B, 'ink-3', st, { w: .12 });
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono dex-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono dex-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c dex-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono dex-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c dex-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'dex-s dex-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono dex-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono dex-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono dex-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono dex-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono dex-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'dex-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'dex-xs', 5));


const CSSX = `
.dex-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.dex-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.dex-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.dex-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.dex-r .in{color:var(--danger);font-weight:800}
.dex-g .in{color:var(--ok);font-weight:800}
.dex-a .in{color:var(--accent);font-weight:800}
.dex-w .in{color:var(--warn);font-weight:800}
.dex-c .in{font-size:.6em;font-weight:700}
.dex-c2 .in{font-size:.5em;font-weight:700}
.dex-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.dex-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls, lastOff) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'dex-xs', i + 1, { off: i < list.length - 1 ? i + 2 : (lastOff || 0) }));
const ver = (S, k, x, y, list, cls, w) => list.forEach(([s, t], i) => T(S, k + i, x, y, t, cls, s, { w, off: list[i + 1] ? list[i + 1][0] : 0 }));

/* ================= pipelines ================= */
function sBackfill() {
  const S = scene({ id: 'de-backfill', steps: 5, per: 1.6 });
  const DX = d => 6 + d * 2.5, ROWS = [['raw', 2.2], ['clean', 4.0], ['report', 5.8]];
  for (let d = 0; d < 10; d++) T(S, 'h' + d, DX(d), 1.2, '11-' + String(d + 1).padStart(2, '0'), 'cz-tc cz-mono dex-tiny', 0, { w: 2.3 });
  ROWS.forEach(([n, y], r) => { T(S, 'rl' + r, 1, y + .3, n, 'cz-mono dex-xs', 0); for (let d = 0; d < 10; d++) { const k = `c${r}_${d}`, bad = r > 0 && d >= 3 && d <= 6; box2(S, k, DX(d), y, 2.3, 1.3, '', 'ok', 0, { pct: 30 }); if (bad) tsets(S, k, r === 1 ? [[2, 'danger', 40], [3, 'warn', 45], [4, 'ok', 30]] : [[2, 'danger', 40], [4, 'ok', 30]]); } });
  T(S, 'bug', DX(3), 7.3, ['버그 있는 코드로 만든 기간', 'built with buggy code'], 'cz-tc dex-xs dex-r', 2, { w: 4 * 2.5 - .2, off: 3 });
  T(S, 'run', DX(3), 7.3, ['다시 실행 중 (동시 2개)', 'rerunning (2 at a time)'], 'cz-tc dex-xs dex-w', 3, { w: 4 * 2.5 - .2, off: 4 });
  T(S, 'cmd', 1, 8.6, 'airflow dags backfill -s 2026-11-04 -e 2026-11-07 daily_sales', 'cz-mono dex-xs dex-a', 3);
  T(S, 'ow', 1, 9.7, 'INSERT OVERWRITE TABLE clean PARTITION (dt = …) SELECT …', 'cz-mono dex-xs dex-g', 4);
  stepT(S, 'k', 1, 11.0, [['날짜 파티션마다 원본 → 정제 → 리포트 순서로 매일 돌아요', 'every day one date partition flows raw → clean → report'], ['정제 단계 버그 발견 → 11-04~11-07이 틀렸고, 그 위의 리포트까지 오염됐어요', 'a bug in the clean step → 11-04 to 11-07 are wrong, and so are the reports built on them'], ['코드를 고치고 그 기간만 다시 실행(백필) · 의존 순서대로, 동시 실행 수는 제한', 'fix the code and rerun just that range (backfill) · in dependency order, with limited concurrency'], ['파티션을 통째로 덮어써야 몇 번 다시 돌려도 결과가 같아요 (멱등성)', 'overwrite whole partitions so reruns always give the same result (idempotent)']]);
  fin(S, 'z', 12.4, [['백필: 지난 기간의 파이프라인을 다시 돌려 데이터를 고치거나 새 열을 채우는 일', 'backfill: rerunning a pipeline over past periods to fix data or fill new columns', 'dex-xs dex-a'], ['날짜 파티션 + 덮어쓰기 + 의존 순서가 갖춰지면 필요한 기간만 안전하게 다시 만들어요', 'date partitions, overwrites and dependency order let you rebuild exactly the range you need']]);
  S.cap(1, '날마다 쌓이는 파티션', 'A partition a day').cap(2, '버그로 오염된 기간', 'A range corrupted by a bug').cap(3, '그 기간만 다시 실행', 'Rerun just that range').cap(4, '덮어쓰기로 멱등하게', 'Idempotent by overwriting').cap(5, '백필과 재처리', 'Backfills and reprocessing');
  return S;
}

/* ================= storage ================= */
function sSmallFiles() {
  const S = scene({ id: 'de-smallfiles', steps: 5, per: 1.6 });
  frame(S, 'pf', 1, 1.2, 14.4, 9.4, 'ink-3', 0, { w: .1 }); T(S, 'pfl', 1.3, 1.3, 'dt=2026-11-10/', 'cz-mono dex-tiny', 0);
  for (let r = 0; r < 7; r++) for (let c = 0; c < 12; c++) rect(S, `f${r}_${c}`, 1.6 + c * 1.12, 2.1 + r * 1.12, .95, .95, 'accent', 40, 1, { r: .1, off: 3 });
  [0, 1, 2].forEach(i => rect(S, 'big' + i, 1.6, 2.2 + i * 2.75, 13.2, 2.4, 'ok', 40, 3, { r: .25, html: ['1 GB 파일', '1 GB file'], cls: 'cz-c dex-c2' }));
  T(S, 's1', 16.6, 1.3, ['1분마다 파일 1개 → 하루 1,440개 · 각 2 MB', 'a file a minute → 1,440 files a day · 2 MB each'], 'dex-xs', 1);
  T(S, 'b0', 16.6, 3.2, ['컴팩션 전', 'before compaction'], 'dex-xs', 2);
  rect(S, 'b0a', 16.6, 4.0, 11.9, 1.1, 'danger', 45, 2, { r: .15 }); rect(S, 'b0b', 28.5, 4.0, 2.1, 1.1, 'accent', 45, 2, { r: .15 }); T(S, 'b0v', 16.9, 4.15, '38 s', 'cz-mono dex-xs', 2);
  T(S, 'b1', 16.6, 5.6, ['컴팩션 후', 'after compaction'], 'dex-xs dex-g', 3);
  rect(S, 'b1a', 16.6, 6.4, .4, 1.1, 'danger', 45, 3, { r: .15 }); rect(S, 'b1b', 17.0, 6.4, 1.8, 1.1, 'accent', 45, 3, { r: .15 }); T(S, 'b1v', 19.1, 6.55, '6 s', 'cz-mono dex-xs dex-g', 3);
  rect(S, 'lg0', 16.6, 8.15, .7, .7, 'danger', 45, 2, { r: .1 }); T(S, 'lg0t', 17.6, 8.05, ['파일 열기·목록·메타데이터', 'open, list, metadata'], 'dex-xs', 2);
  rect(S, 'lg1', 16.6, 9.15, .7, .7, 'accent', 45, 2, { r: .1 }); T(S, 'lg1t', 17.6, 9.05, ['실제 데이터 읽기 (시간은 예시)', 'reading data (times illustrative)'], 'dex-xs', 2);
  T(S, 'cmd', 1, 11.2, ['OPTIMIZE orders (Delta) · CALL system.rewrite_data_files(...) (Iceberg)', 'OPTIMIZE orders (Delta) · CALL system.rewrite_data_files(...) (Iceberg)'], 'cz-mono dex-xs dex-a', 4);
  stepT(S, 'k', 1, 12.5, [['스트리밍 잡이 1분마다 파일을 써서 작은 파일이 끝없이 쌓여요', 'a streaming job writes a file every minute, so tiny files pile up'], ['파일마다 열기·목록·메타데이터 비용이 붙어, 정작 읽는 시간보다 길어져요', 'each file adds open, list and metadata costs that outweigh the actual reading'], ['컴팩션: 작은 파일을 512 MB~1 GB짜리로 합쳐 다시 쓰고 스냅숏을 원자적으로 교체', 'compaction rewrites small files into 512 MB–1 GB ones and swaps the snapshot atomically'], ['예방: 쓰기 간격 늘리기, 쓰기 전 repartition, 너무 잘게 나눈 파티션 피하기', 'prevention: longer write intervals, repartition before writing, no over-partitioning']]);
  fin(S, 'z', 13.9, [['작은 파일 문제: 데이터 양이 아니라 파일 개수가 쿼리와 저장소를 느리게 만드는 현상', 'the small-files problem: the number of files, not the data size, slows queries and storage', 'dex-xs dex-a'], ['테이블 포맷의 OPTIMIZE·rewrite 작업을 정기적으로 돌려 파일 크기를 관리해요', 'run your table format’s OPTIMIZE or rewrite job regularly to keep file sizes healthy']]);
  S.cap(1, '작은 파일이 쌓여요', 'Tiny files pile up').cap(2, '파일 수가 비용', 'File count is the cost').cap(3, '컴팩션으로 합치기', 'Merge with compaction').cap(4, '예방하기', 'Preventing it').cap(5, '작은 파일 문제', 'The small-files problem');
  return S;
}

/* ================= streams ================= */
function sCheckpoint() {
  const S = scene({ id: 'de-checkpoint', steps: 5, per: 1.6 });
  const OP = [['src', 1, 6.2, ['소스 (Kafka)', 'source (Kafka)'], 'warn'], ['map', 9.4, 5.2, 'map', 'line'], ['cnt', 16.8, 6.6, ['키별 개수', 'count by key'], 'accent'], ['snk', 25.6, 5.4, ['싱크', 'sink'], 'line']];
  OP.forEach(([k, x, w, l, c], i) => { box2(S, k, x, 2.2, w, 1.8, l, c, 0, { pct: 28 }); if (i) ar(S, 'a' + i, [OP[i - 1][1] + OP[i - 1][2] + .05, 3.1], [x - .05, 3.1], 'ink-3', 0, { h: .1 }); });
  ver(S, 'off', 1, 4.3, [[0, 'offset 1042'], [3, 'offset 1060'], [4, ['↺ 1042부터 다시 읽기', '↺ replay from 1042']]], 'cz-tc cz-mono dex-xs', 6.2);
  ver(S, 'st', 16.8, 4.3, [[0, '{a: 5, b: 3}'], [3, '{a: 7, b: 4}'], [4, '{a: 5, b: 3}']], 'cz-tc cz-mono dex-xs dex-a', 6.6);
  tsets(S, 'cnt', [[3, 'danger', 35], [4, 'accent', 28]]); xm(S, 'crash', 23.0, 2.3, 3, { off: 4 });
  rect(S, 'bar', 7.75, 1.6, .3, 3.0, 'ok', 90, 2, { r: .1, off: 3 }); T(S, 'barl', 6.2, .6, ['배리어 chk-17', 'barrier chk-17'], 'cz-tc dex-tiny dex-g', 2, { w: 3.6, off: 3 });
  rect(S, 'store', 6, 6.6, 20, 2.6, 'ok', 10, 2, { r: .4 }); T(S, 'storel', 6.3, 6.7, ['체크포인트 저장소 (S3)', 'checkpoint store (S3)'], 'dex-tiny dex-g', 2);
  T(S, 'chk', 6.6, 7.6, 'chk-17:  source offset 1042 · count {a: 5, b: 3}', 'cz-mono dex-xs', 2);
  ar(S, 'sv1', [4.1, 4.95], [7.0, 6.55], 'ok', 2, { h: .08, dash: 1, off: 3 }); ar(S, 'sv2', [20.1, 4.95], [18.0, 6.55], 'ok', 2, { h: .08, dash: 1, off: 3 });
  ar(S, 'rs1', [7.0, 6.55], [4.6, 5.2], 'accent', 4, { h: .1 }); ar(S, 'rs2', [18.0, 6.55], [19.6, 5.2], 'accent', 4, { h: .1 });
  stepT(S, 'k', 1, 10.2, [['상태가 있는 연산: 키별 개수를 메모리에 들고 있어요 · 죽으면 잃어버려요', 'a stateful operator keeps per-key counts in memory · a crash would lose them'], ['체크포인트 배리어가 데이터 사이로 흐르며, 지나가는 순간 각 연산자가 상태를 저장해요', 'barriers flow with the data; each operator snapshots its state as one passes'], ['그 뒤 더 처리하다 장애 → 메모리의 상태 {a: 7, b: 4}는 사라져요', 'a failure after more processing → the in-memory state {a: 7, b: 4} is gone'], ['마지막 체크포인트로 되돌리고 소스를 오프셋 1042부터 다시 읽으면 결과가 같아요', 'restore the last checkpoint and replay the source from offset 1042 → the same result']]);
  fin(S, 'z', 11.6, [['체크포인트: 상태와 입력 위치를 함께 저장해, 장애 후에도 정확히 한 번 처리한 것처럼 이어 가요', 'checkpoints save state together with input positions, so work resumes as if processed exactly once', 'dex-xs dex-a'], ['Flink, Spark Structured Streaming, Kafka Streams의 핵심 기능이에요', 'a core feature of Flink, Spark Structured Streaming and Kafka Streams'], ['출력까지 정확히 한 번이려면 싱크도 트랜잭션이나 멱등 쓰기가 필요해요', 'end-to-end exactly-once also needs a transactional or idempotent sink']]);
  S.cap(1, '상태가 있는 스트림', 'A stateful stream').cap(2, '배리어와 스냅숏', 'Barriers and snapshots').cap(3, '장애', 'A failure').cap(4, '되돌리고 다시 재생', 'Restore and replay').cap(5, '스트림 체크포인트', 'Stream checkpoints');
  return S;
}

/* ================= ops ================= */
function sReservoir() {
  const S = scene({ id: 'de-reservoir', steps: 5, per: 1.6 });
  const IX = i => 1 + (i - 1) * 2.6;
  T(S, 'sl', 1, .5, ['스트림 (길이를 몰라요)', 'stream (length unknown)'], 'dex-xs dex-a', 0);
  for (let i = 1; i <= 10; i++) { box2(S, 'i' + i, IX(i), 1.5, 2.2, 1.4, String(i), 'line', 0, { pct: 22 }); }
  T(S, 'more', IX(11), 1.7, '…', 'dex-s', 0);
  [1, 2, 3].forEach(i => tsets(S, 'i' + i, [[1, 'accent', 35]])); tsets(S, 'i4', [[2, 'ok', 40]]); [6, 8].forEach(i => tsets(S, 'i' + i, [[3, 'ok', 40]])); [5, 7].forEach(i => tsets(S, 'i' + i, [[3, 'line', 10]]));
  const PR = [[4, '3/4 → 2', 2, 'dex-g'], [5, '3/5 ✗', 3, 'dex-r'], [6, '3/6 → 1', 3, 'dex-g'], [7, '3/7 ✗', 3, 'dex-r'], [8, '3/8 → 3', 3, 'dex-g']];
  PR.forEach(([i, t, st, c]) => T(S, 'p' + i, IX(i) - .2, 3.1, t, 'cz-tc cz-mono dex-tiny ' + c, st, { w: 2.6 }));
  T(S, 'rl', 8.2, 5.9, ['저장소 (k = 3)', 'reservoir (k = 3)'], 'dex-xs dex-a', 1);
  const SX = [8.2, 12.2, 16.2];
  SX.forEach((x, j) => { box2(S, 's' + j, x, 6.8, 3.2, 1.7, '', 'accent', 1, { pct: 25 }); T(S, 'sn' + j, x, 8.65, [`${j + 1}번 칸`, `slot ${j + 1}`], 'cz-tc dex-tiny', 1, { w: 3.2 }); });
  ver(S, 'v0', SX[0], 7.2, [[1, '1'], [3, '6']], 'cz-tc cz-mono dex-s', 3.2); ver(S, 'v1', SX[1], 7.2, [[1, '2'], [2, '4']], 'cz-tc cz-mono dex-s', 3.2); ver(S, 'v2', SX[2], 7.2, [[1, '3'], [3, '8']], 'cz-tc cz-mono dex-s', 3.2);
  ar(S, 'm4', [IX(4) + 1.1, 3.75], [SX[1] + 1.6, 6.75], 'ok', 2, { h: .08, off: 3 });
  ar(S, 'm6', [IX(6) + 1.1, 3.75], [SX[0] + 2.4, 6.75], 'ok', 3, { h: .08, off: 4 }); ar(S, 'm8', [IX(8) + 1.1, 3.75], [SX[2] + 2.4, 6.75], 'ok', 3, { h: .08, off: 4 });
  T(S, 'pf', 21, 6.9, ['n = 8까지 본 뒤', 'after n = 8'], 'dex-xs', 4); T(S, 'pf2', 21, 7.9, ['모든 항목이 3/8 확률', 'every item: probability 3/8'], 'dex-xs dex-g', 4);
  stepT(S, 'k', 1, 10.0, [['끝을 모르는 스트림에서 3개를 공평하게 뽑고 싶어요 · 처음 3개는 그냥 담아요', 'we want 3 fair samples from a stream of unknown length · the first 3 go straight in'], ['i번째 항목은 3/i 확률로 들어가고, 들어가면 무작위로 고른 한 칸을 밀어내요', 'item i gets in with probability 3/i and, if it does, evicts a random slot'], ['뒤로 갈수록 들어갈 확률은 줄지만, 먼저 든 것도 밀려날 수 있어 공평해져요', 'later items get in less often, but earlier ones can be evicted, which evens things out'], ['결과: n개를 다 본 뒤 모든 항목이 정확히 3/n 확률로 남아 있어요', 'result: after n items, every item remains with probability exactly 3/n']]);
  fin(S, 'z', 11.4, [['레저버 샘플링: 한 번 훑으면서 k칸 메모리만으로 균등한 무작위 표본을 만들어요', 'reservoir sampling builds a uniform random sample in one pass using only k slots', 'dex-xs dex-a'], ['로그·이벤트 표본 추출, 큰 데이터 미리보기에 써요 · 가중치가 있으면 A-Res 같은 변형을 써요', 'used for sampling logs and events and previewing huge data · weighted variants such as A-Res exist']]);
  S.cap(1, '처음 k개는 그대로', 'The first k go in').cap(2, '확률 k/i로 교체', 'Replace with probability k/i').cap(3, '계속 흘려보내기', 'Keep streaming').cap(4, '모두 같은 확률', 'Equal odds for all').cap(5, '레저버 샘플링', 'Reservoir sampling');
  return S;
}
function sPii() {
  const S = scene({ id: 'de-pii', steps: 5, per: 1.6 });
  const CX = c => 1 + c * 6.1, H = [['이름', 'name'], 'email', ['전화', 'phone'], ['카드', 'card'], ['나이', 'age']];
  const RAW = [['김민지', 'Minji Kim'], 'minji@ex.com', '010-1234-5678', '4111-…-1111', '34'], PRO = [['김*지', 'M***i Kim'], 'sha256 → 9c1e…', '010-****-5678', 'tok_8f3a', ['30대', '30s']];
  const HOW = [['마스킹', 'masking'], ['해시 (조인용)', 'hash (for joins)'], ['마스킹', 'masking'], ['토큰화', 'tokenization'], ['범주화', 'generalization']];
  H.forEach((h, c) => { T(S, 'h' + c, CX(c), .5, h, 'cz-tc dex-xs dex-a', 0, { w: 5.8 }); box2(S, 'r' + c, CX(c), 1.4, 5.8, 1.4, RAW[c], c === 4 ? 'line' : 'danger', 0, { pct: c === 4 ? 25 : 22 }); box2(S, 'p' + c, CX(c), 4.0, 5.8, 1.4, PRO[c], 'ok', 2, { pct: 28 }); T(S, 'w' + c, CX(c), 5.55, HOW[c], 'cz-tc dex-tiny', 2, { w: 5.8 }); ar(S, 'pa' + c, [CX(c) + 2.9, 2.9], [CX(c) + 2.9, 3.95], 'ink-3', 2, { h: .08 }); });
  T(S, 'pl', 1, 3.05, ['원본: 개인 식별 정보(PII)', 'raw: personally identifiable info (PII)'], 'dex-tiny dex-r', 1, { off: 2 });
  box2(S, 'an', 1, 7.0, 9.4, 1.4, ['분석가 → 보호된 뷰만', 'analysts → protected view'], 'accent', 3, { pct: 22 });
  box2(S, 'vs', 11, 7.0, 10.4, 1.4, ['결제 서비스 → 금고에서 원래 값', 'payments → detokenize via vault'], 'warn', 3, { pct: 25 });
  box2(S, 'au', 22, 7.0, 9, 1.4, ['모든 조회는 감사 로그로', 'every lookup is audited'], 'line', 3, { pct: 25 });
  T(S, 'cs', 1, 9.0, ['사용자 42의 데이터 = enc(key₄₂, …)  →  삭제 요청 시 key₄₂만 파기', 'user 42’s data = enc(key₄₂, …)  →  on deletion, destroy key₄₂ only'], 'cz-mono dex-xs dex-a', 4);
  T(S, 'cs2', 1, 10.1, ['백업·로그에 남은 사본까지 읽을 수 없게 돼요 (암호 파쇄)', 'even copies in backups and logs become unreadable (crypto-shredding)'], 'dex-xs dex-g', 4);
  stepT(S, 'k', 1, 11.5, [['원본 테이블엔 이름·이메일·전화·카드처럼 사람을 알아볼 수 있는 정보가 있어요', 'raw tables hold names, emails, phones and cards that identify people'], ['열마다 맞는 방법으로 보호: 마스킹, 해시(조인 키 유지), 토큰화, 범주화', 'protect each column fittingly: masking, hashing (keeps join keys), tokenization, generalization'], ['접근을 나눠요: 분석은 보호된 뷰로, 원래 값은 승인된 서비스만 금고를 통해', 'split access: analysis uses protected views; only approved services detokenize via the vault'], ['삭제 요청은 사용자별 키를 파기해 모든 사본을 한 번에 무효로 만들어요', 'deletion requests destroy the per-user key, voiding every copy at once']]);
  fin(S, 'z', 12.9, [['개인정보 보호는 “최소한만 모으고, 보호해서 쓰고, 지울 수 있게” 파이프라인에 설계해 둬요', 'design privacy into pipelines: collect the minimum, use it protected, and keep it deletable', 'dex-xs dex-a'], ['개인정보보호법·GDPR의 삭제권, 목적 외 이용 금지를 기술로 뒷받침해요', 'it backs legal duties such as the right to erasure under privacy laws and GDPR']]);
  S.cap(1, '식별 정보가 담긴 원본', 'Raw data with identifiers').cap(2, '열마다 보호하기', 'Protect each column').cap(3, '접근 나누기', 'Separate access').cap(4, '지울 수 있게', 'Keep it deletable').cap(5, '개인정보 보호 파이프라인', 'Privacy in data pipelines');
  return S;
}

/* ================= split-out cards ================= */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'dex-xs', i + 1, { off: i + 2 }));
function sTableFormat() {
  const S = scene({ id: 'de-tableformat', steps: 5, per: 1.7 });
  const bx = (k, x, y, w, l, c, st, off) => box2(S, k, x, y, w, 1.2, l, c, st, { pct: 24, off });
  bx('cat', 1, .5, 7.2, '', 'accent', 0); T(S, 'catp', 1.3, .65, ['카탈로그: orders → v3', 'catalog: orders → v3'], 'cz-mono dex-xs', 0, { off: 2 }); T(S, 'catp2', 1.3, .65, ['카탈로그: orders → v4', 'catalog: orders → v4'], 'cz-mono dex-xs dex-g', 2);
  bx('m3', 1, 2.6, 7.2, 'v3.metadata.json', 'line', 0); bx('ml3', 1, 4.7, 7.2, 'snap-3 (manifest list)', 'line', 0);
  bx('mf1', 1, 6.8, 3.5, 'manifest A', 'line', 0); bx('mf2', 4.7, 6.8, 3.5, 'manifest B', 'line', 0);
  for (let i = 0; i < 4; i++) cell(S, 'df' + i, 1 + i * 1.8, 8.9, 1.6, 1.1, 'd' + (i + 1), 'ok', 22, 0);
  T(S, 'dfl', 1, 10.15, ['Parquet 데이터 파일', 'Parquet data files'], 'cz-tc dex-xs', 0, { w: 7.2 });
  vl(S, 'a1', 4.6, 1.7, 2.6, 'ink-3', 0, { w: .08 }); vl(S, 'a2', 4.6, 3.8, 4.7, 'ink-3', 0, { w: .08 }); seg(S, 'a3', [4.0, 5.9], [2.75, 6.8], 0, 'ink-3', .08); seg(S, 'a4', [5.2, 5.9], [6.45, 6.8], 0, 'ink-3', .08);
  [[2.75, 1.8], [2.75, 3.6], [6.45, 5.4], [6.45, 7.2]].forEach(([a, b], i) => seg(S, 'a5' + i, [a, 8.0], [b, 8.9], 0, 'ink-3', .06));
  bx('m4', 10.4, 2.6, 7.2, 'v4.metadata.json', 'ok', 1); bx('ml4', 10.4, 4.7, 7.2, 'snap-4', 'ok', 1);
  cell(S, 'dn', 10.4, 8.9, 3.4, 1.1, ['새 파일', 'new file'], 'ok', 40, 1);
  vl(S, 'b1', 14.0, 3.8, 4.7, 'ok', 1, { w: .08 }); seg(S, 'b2', [12.6, 5.9], [5.0, 6.8], 1, 'ok', .06, { dash: 1 }); seg(S, 'b3', [14.0, 5.9], [12.1, 8.9], 1, 'ok', .08);
  T(S, 'w1', 10.4, 10.4, ['기존 파일은 그대로 두고 새 파일 + 새 메타데이터를 써요', 'old files stay; write new files and new metadata'], 'dex-xs', 1, { off: 2 });
  ar(S, 'swap', [8.2, 1.1], [10.4, 3.2], 'accent', 2, { h: .12 }); T(S, 'swl', 10.4, 10.4, ['카탈로그 포인터를 v3 → v4로 원자적 교체 (CAS)', 'atomically swap the catalog pointer v3 → v4 (CAS)'], 'dex-xs dex-a', 2, { off: 3 });
  T(S, 'swr', 10.4, 11.5, ['읽던 쿼리는 v3를 끝까지, 새 쿼리는 v4를 봐요', 'running reads finish on v3; new ones see v4'], 'dex-xs', 2, { off: 3 });
  T(S, 'cc0', 19.4, .6, ['작성자 둘이 동시에 v3 기준으로 커밋', 'two writers commit, both based on v3'], 'dex-xs dex-a', 3, { off: 4 });
  cell(S, 'cc1', 19.4, 1.8, 11.6, 1.1, ['A: CAS(v3 → v4) ✓', 'A: CAS(v3 → v4) ✓'], 'ok', 26, 3, { off: 4 }); cell(S, 'cc2', 19.4, 3.1, 11.6, 1.1, ['B: CAS(v3 → v4′) ✗ 이미 v4', 'B: CAS(v3 → v4′) ✗ already v4'], 'danger', 26, 3, { off: 4 });
  T(S, 'cc3', 19.4, 4.5, ['B는 v4를 다시 읽고, 겹치지 않으면 v5로 재시도', 'B rereads v4 and, if nothing conflicts, retries as v5'], 'dex-xs dex-g', 3, { off: 4 });
  T(S, 'tt0', 19.4, .6, ['타임 트래블', 'time travel'], 'dex-xs dex-a', 4);
  T(S, 'tt1', 19.4, 1.7, 'SELECT … FOR TIMESTAMP AS OF \'2026-11-01\'', 'cz-mono dex-xs', 4);
  T(S, 'tt2', 19.4, 3.1, ['관리 작업', 'housekeeping'], 'dex-xs dex-a', 4);
  T(S, 'tt3', 19.4, 4.2, ['expire_snapshots: 옛 스냅숏과 파일 정리', 'expire_snapshots: drop old snapshots and files'], 'dex-xs', 4);
  T(S, 'tt4', 19.4, 5.3, ['rewrite_data_files: 작은 파일 합치기', 'rewrite_data_files: compact small files'], 'dex-xs', 4);
  T(S, 'tt5', 19.4, 6.4, ['열을 ID로 추적해 이름 변경·추가가 안전', 'columns tracked by ID: safe renames and adds'], 'dex-xs', 4);
  notesSplit(S, 'k', 15.6, [['테이블 포맷은 “지금 테이블 = 이 파일들”을 메타데이터 트리로 기록해요 · 카탈로그 → 메타데이터 → 매니페스트 → 파일', 'a table format records “the table is these files” as a tree: catalog → metadata → manifests → data files'], ['쓰기는 기존 파일을 고치지 않고 새 데이터 파일과 새 메타데이터를 만들어요', 'a write never edits files in place; it adds new data files and new metadata'], ['마지막에 카탈로그 포인터 하나를 원자적으로 바꾸면 커밋 · 읽는 쪽은 언제나 완전한 스냅숏을 봐요', 'committing is one atomic pointer swap in the catalog, so readers always see a complete snapshot'], ['동시에 쓰면 먼저 바꾼 쪽이 이기고 나머지는 다시 시도해요 · 옛 스냅숏은 타임 트래블에 쓰고 주기적으로 정리해요', 'concurrent writers race on the swap and losers retry · old snapshots serve time travel until they are expired']]);
  fin(S, 'z', 15.6, [['오픈 테이블 포맷(Iceberg, Delta Lake, Hudi): 오브젝트 스토리지의 파일 위에 ACID 테이블을 만드는 메타데이터 규약', 'open table formats (Iceberg, Delta Lake, Hudi) are metadata conventions that turn files in object storage into ACID tables', 'dex-xs dex-a'], ['Spark, Trino, Flink, Snowflake가 같은 테이블을 함께 읽고 쓸 수 있어요', 'Spark, Trino, Flink and Snowflake can read and write the same tables'], ['낙관적 동시성이라 같은 파티션을 자주 덮어쓰는 작업끼리는 재시도가 늘어요', 'concurrency is optimistic, so jobs overwriting the same partitions often end up retrying']]);
  S.cap(1, '메타데이터 트리', 'The metadata tree').cap(2, '새 파일, 새 스냅숏', 'New files, new snapshot').cap(3, '포인터 교체로 커밋', 'Commit by swapping a pointer').cap(4, '동시 쓰기와 타임 트래블', 'Concurrent writes and time travel').cap(5, '테이블 포맷', 'Table formats');
  return S;
}

function sCatalog() {
  const S = scene({ id: 'de-catalog', steps: 5, per: 1.7 });
  rect(S, 'sb', 1, .5, 14.6, 1.4, 'line', 10, 0, { r: .4 }); T(S, 'sbq', 1.5, .75, ['검색: 매출', 'search: revenue'], 'dex-s', 0);
  const R = [['sales.daily_revenue', ['재무팀 · 인증됨 ✓ · 1시간 전 갱신', 'Finance · certified ✓ · updated 1 h ago'], 'ok'], ['tmp.revenue_test_v2', ['소유자 없음 · 3달 전 갱신', 'no owner · updated 3 months ago'], 'line'], [['대시보드: 월간 매출', 'dashboard: monthly revenue'], ['daily_revenue에서 만듦', 'built from daily_revenue'], 'accent']];
  R.forEach(([a, b, c], i) => { rect(S, 'r' + i, 1, 2.4 + i * 2.2, 14.6, 1.9, c, i === 1 ? 6 : 14, 0, { r: .3 }); T(S, 'ra' + i, 1.4, 2.5 + i * 2.2, a, 'cz-mono dex-xs dex-a', 0); T(S, 'rb' + i, 1.4, 3.4 + i * 2.2, b, 'dex-xs', 0); });
  const MX = 17.0, M = [[['기술 메타데이터', 'technical'], ['스키마, 위치 s3://…, 파티션, 행 수', 'schema, location s3://…, partitions, row count'], 'accent'], [['비즈니스 메타데이터', 'business'], ['설명, 용어 “순매출”, 소유자', 'description, glossary term “net revenue”, owner'], 'ok'], [['운영 메타데이터', 'operational'], ['신선도, 품질 검사 결과, 사용량', 'freshness, quality checks, usage'], 'warn']];
  M.forEach(([a, b, c], i) => { rect(S, 'm' + i, MX, .5 + i * 2.5, 14.4, 2.2, c, 14, 2, { r: .3, off: 3 }); T(S, 'ma' + i, MX + .4, .6 + i * 2.5, a, 'dex-xs dex-a', 2, { off: 3 }); T(S, 'mb' + i, MX + .4, 1.6 + i * 2.5, b, 'dex-xs', 2, { off: 3 }); });
  T(S, 'm3', MX, 8.2, ['잘 찾고, 믿을 만한지 판단하게 해 줘요', 'it helps people find data and judge if they can trust it'], 'dex-xs dex-g', 2, { off: 3 });
  ['Spark', 'Trino', 'Flink'].forEach((e, i) => box2(S, 'en' + i, MX + i * 4.9, .6, 4.4, 1.3, e, 'line', 3, { pct: 16, off: 4 }));
  box2(S, 'tc', MX, 3.4, 14.4, 1.5, ['기술 카탈로그 (Hive Metastore · Glue · Iceberg REST)', 'technical catalog (Hive Metastore · Glue · Iceberg REST)'], 'accent', 3, { pct: 26, off: 4 });
  [0, 1, 2].forEach(i => ar(S, 'ea' + i, [MX + 2.2 + i * 4.9, 1.9], [MX + 2.2 + i * 4.9, 3.4], 'ink-2', 3, { h: .1, off: 4 }));
  box2(S, 'st', MX, 6.4, 14.4, 1.3, 's3://lake/sales/daily_revenue/', 'ok', 3, { pct: 20, off: 4 }); ar(S, 'sa', [MX + 7.2, 4.9], [MX + 7.2, 6.4], 'ink-2', 3, { h: .1, off: 4 });
  T(S, 'tcn', MX, 8.2, ['테이블 이름 → 현재 메타데이터 위치를 모든 엔진이 같이 조회', 'every engine resolves the same name → current metadata location'], 'dex-xs', 3, { off: 4 });
  T(S, 'gv0', MX, .6, ['열 태그로 접근 정책', 'policies from column tags'], 'dex-xs dex-a', 4);
  cell(S, 'gv1', MX, 1.8, 6.8, 1.1, 'email  [PII]', 'danger', 24, 4); cell(S, 'gv2', MX + 7.4, 1.8, 7.0, 1.1, 'amount', 'line', 12, 4);
  T(S, 'gv3', MX, 3.3, ['분석가가 조회하면', 'when an analyst queries'], 'dex-xs', 4);
  cell(S, 'gv4', MX, 4.4, 6.8, 1.1, 'k***@mail.com', 'warn', 24, 4); cell(S, 'gv5', MX + 7.4, 4.4, 7.0, 1.1, '30,000', 'line', 12, 4);
  T(S, 'gv6', MX, 6.0, ['자동 마스킹 · 누가 무엇을 봤는지 감사 로그', 'masked automatically, with audit logs of who saw what'], 'dex-xs dex-g', 4);
  notesSplit(S, 'k', 15.6, [['데이터 카탈로그는 회사 데이터의 검색창 · “매출”을 치면 어떤 테이블을 믿고 써야 할지 보여 줘요', 'a data catalog is the search box for a company’s data · searching “revenue” shows which table to trust'], ['기술(스키마·위치), 비즈니스(설명·소유자·용어), 운영(신선도·품질·사용량) 메타데이터를 한곳에 모아요', 'it gathers technical (schema, location), business (description, owner, glossary) and operational (freshness, quality, usage) metadata'], ['엔진들은 기술 카탈로그로 테이블 이름을 실제 파일 위치로 바꿔요 · 그래서 같은 테이블을 함께 써요', 'engines use a technical catalog to turn a table name into its files, so they all share the same tables'], ['개인정보 같은 태그를 달면 정책이 따라와 자동으로 가리고, 접근 기록이 남아요', 'tags such as PII drive policies that mask data automatically and record who accessed it']]);
  fin(S, 'z', 15.6, [['데이터 카탈로그: 데이터를 찾고, 이해하고, 믿고, 통제하기 위한 메타데이터 저장소', 'a data catalog is the metadata store for finding, understanding, trusting and governing data', 'dex-xs dex-a'], ['DataHub, OpenMetadata, Amundsen, Unity Catalog, AWS Glue Data Catalog 등', 'examples: DataHub, OpenMetadata, Amundsen, Unity Catalog and the AWS Glue Data Catalog'], ['메타데이터는 손으로 쓰면 금방 낡아요 · 파이프라인과 쿼리 로그에서 자동으로 수집해요', 'hand-written metadata goes stale fast, so collect it automatically from pipelines and query logs']]);
  S.cap(1, '데이터 검색', 'Searching for data').cap(2, '세 가지 메타데이터', 'Three kinds of metadata').cap(3, '엔진이 보는 카탈로그', 'The catalog engines use').cap(4, '태그와 접근 정책', 'Tags and access policies').cap(5, '데이터 카탈로그', 'Data catalogs');
  return S;
}

return { css: CSSX, secs: [], add: {
  'de-pipe': [
    item('de-backfill', '백필과 재처리', 'Backfills and reprocessing', '지난 기간의 파이프라인을 다시 돌려 잘못 만든 데이터를 고치거나 새로 추가한 열을 채우는 일이에요. 날짜 파티션과 덮어쓰기가 있어야 안전해요.', '정제 단계에 버그가 있었다면 11-04~11-07 파티션이 틀렸고, 그 위에서 만든 리포트까지 오염돼요. 코드를 고친 뒤 그 기간만 지정해 다시 실행하는데(airflow dags backfill -s … -e …), 의존 순서(정제 → 리포트)를 지키고 동시 실행 수를 제한해 원본 시스템에 부담을 주지 않아요. 각 작업은 INSERT OVERWRITE … PARTITION처럼 파티션을 통째로 덮어써야 여러 번 다시 돌려도 중복 없이 같은 결과가 나와요(멱등성). 새 열을 추가했을 때 과거 데이터를 채우는 것도 백필이에요.', 'Rerunning a pipeline over past periods to fix data built wrongly or to fill in newly added columns; date partitions and overwrites make it safe.', 'If the clean step had a bug, partitions 11-04 to 11-07 are wrong, and so are the reports built on them. After fixing the code you rerun just that range (airflow dags backfill -s … -e …), respecting dependency order (clean → report) and limiting concurrency so sources aren’t overloaded. Each task should overwrite whole partitions, as INSERT OVERWRITE … PARTITION does, so reruns give the same result without duplicates (idempotency). Populating history for a newly added column is a backfill too.', sBackfill())
  ],
  'de-store': [
    item('de-smallfiles', '작은 파일 문제와 컴팩션', 'Small files and compaction', '데이터 양이 아니라 파일 개수가 쿼리와 저장소를 느리게 만드는 문제예요. 작은 파일을 큰 파일로 합치는 컴팩션으로 해결해요.', '스트리밍 잡이 1분마다 파일을 쓰면 하루에 2 MB짜리 파일이 1,440개 생겨요. 쿼리 엔진은 파일마다 열고, 목록을 조회하고, 메타데이터와 푸터를 읽어야 해서 실제 데이터를 읽는 시간보다 이 비용이 더 커지고, 오브젝트 스토리지 요청 비용도 늘어요. 컴팩션은 작은 파일들을 512 MB~1 GB 정도로 합쳐 다시 쓰고, 테이블 포맷이 스냅숏을 원자적으로 바꿔 읽는 쪽은 영향을 받지 않아요(Delta OPTIMIZE, Iceberg rewrite_data_files). 쓰기 간격을 늘리고, 쓰기 전에 repartition하고, 사용자 ID처럼 너무 잘게 파티션을 나누지 않는 것이 예방책이에요.', 'A problem where the number of files, not the amount of data, slows queries and storage; compaction merges small files into large ones.', 'A streaming job writing a file every minute leaves 1,440 files of 2 MB per day. The query engine must open, list and read metadata and footers for each, so that overhead outweighs reading the data itself, and object-storage request costs climb too. Compaction rewrites the small files into files of roughly 512 MB to 1 GB, and the table format swaps the snapshot atomically so readers are unaffected (Delta OPTIMIZE, Iceberg rewrite_data_files). Longer write intervals, repartitioning before writes and avoiding overly fine partitions such as by user ID prevent it.', sSmallFiles())
  ],
  'de-stream': [
    item('de-checkpoint', '스트림 상태와 체크포인트', 'Stream state and checkpoints', '스트림 처리기는 집계 상태를 메모리에 들고 있어요. 체크포인트로 상태와 입력 위치를 함께 저장해 두면 장애 후에도 정확히 한 번 처리한 것처럼 이어 갈 수 있어요.', '키별 개수를 세는 연산자의 상태 {a: 5, b: 3}은 메모리에만 있어서 죽으면 사라져요. Flink는 소스에서 체크포인트 배리어를 데이터 사이에 흘려보내고, 배리어가 지나가는 순간 각 연산자가 자기 상태를 내구성 있는 저장소(S3 등)에 저장해요. 소스는 그때의 Kafka 오프셋을 함께 기록해요. 장애가 나면 마지막 체크포인트의 상태로 되돌리고 소스를 그 오프셋부터 다시 읽어, 그 사이 처리분을 정확히 한 번 반영해요. 결과를 외부로 쓰는 싱크까지 정확히 한 번이려면 트랜잭션 커밋이나 멱등 쓰기가 필요해요.', 'Stream processors keep aggregate state in memory; checkpoints save that state together with input positions so processing can resume after a failure as if each event were handled exactly once.', 'A per-key count such as {a: 5, b: 3} lives only in memory and vanishes on a crash. Flink injects checkpoint barriers at the source that flow between records; as a barrier passes, each operator saves its state to durable storage such as S3, and the source records its Kafka offset. After a failure the job restores the last checkpoint’s state and rereads the source from that offset, so the work in between is reflected exactly once. For the output to be exactly-once end to end, the sink also needs transactional commits or idempotent writes.', sCheckpoint())
  ],
  'de-ops': [
    item('de-reservoir', '레저버 샘플링', 'Reservoir sampling', '끝을 모르는 스트림에서 메모리 k칸만으로, 모든 항목이 같은 확률로 뽑히는 무작위 표본을 만드는 알고리즘이에요.', '처음 k개(예: 3개)는 그대로 담아요. i번째 항목부터는 k/i 확률로 표본에 넣고, 넣을 때는 기존 칸 하나를 무작위로 골라 밀어내요. 뒤에 온 항목일수록 들어갈 확률은 낮지만, 먼저 들어간 항목도 나중에 밀려날 수 있어서, n개를 모두 본 뒤에는 모든 항목이 정확히 k/n 확률로 남아 있어요. 한 번만 훑으면 되고 메모리는 k칸뿐이라 로그·이벤트 표본 추출이나 큰 데이터 미리보기에 쓰여요. 항목마다 가중치가 다르면 A-Res 같은 가중 버전을 써요.', 'An algorithm that keeps a uniform random sample of a stream of unknown length using only k slots of memory.', 'The first k items (say 3) go straight in. From item i on, each is added with probability k/i, evicting a randomly chosen existing slot when it is. Later items are less likely to get in, but earlier ones can be evicted later, so after n items every item remains with probability exactly k/n. It needs one pass and k slots of memory, which suits sampling logs and events or previewing huge data. When items carry weights, weighted variants such as A-Res are used.', sReservoir()),
    item('de-pii', '개인정보 보호 파이프라인', 'Privacy in data pipelines', '이름·이메일·카드 같은 개인 식별 정보(PII)를 열마다 알맞게 보호하고, 접근을 나누고, 요청이 오면 지울 수 있게 파이프라인을 설계해요.', '원본의 PII 열은 용도에 맞게 바꿔요: 이름·전화는 마스킹(김*지), 다른 테이블과 조인해야 하는 이메일은 솔트를 넣은 해시, 카드는 토큰화(실제 값은 별도 금고에), 나이는 30대처럼 범주화해요. 분석가는 보호된 뷰만 보고, 원래 값은 승인된 서비스만 금고를 통해 되돌리며 모든 조회를 감사 로그에 남겨요. 삭제 요청에 대비해 사용자별 키로 암호화해 두면, 키만 파기해도 백업과 로그에 남은 사본까지 읽을 수 없게 돼요(암호 파쇄). 개인정보보호법과 GDPR의 삭제권·목적 외 이용 금지를 기술로 뒷받침하는 방법이에요.', 'Design pipelines to protect personally identifiable information (PII) column by column, separate access, and keep data deletable on request.', 'Transform raw PII columns to suit their use: mask names and phones, hash emails with a salt when they are needed as join keys, tokenize cards with the real values kept in a separate vault, and generalize ages into ranges like 30s. Analysts query protected views, only approved services detokenize through the vault, and every lookup is audited. Encrypting with a per-user key prepares for deletion requests: destroying just that key makes even copies in backups and logs unreadable (crypto-shredding). These techniques back legal duties such as the right to erasure and purpose limitation under privacy laws and the GDPR.', sPii())
  ]
},
after: {
  'de-lake': [item('de-tableformat', '테이블 포맷 (Iceberg)', 'Table formats (Iceberg)', '오브젝트 스토리지의 파일 위에 메타데이터 트리를 얹어, 포인터 하나를 원자적으로 바꾸는 것으로 커밋하는 테이블 규약이에요.', 'Apache Iceberg 같은 테이블 포맷은 “지금 이 테이블은 이 파일들이다”를 트리로 기록해요. 카탈로그가 현재 메타데이터 파일(v3.metadata.json)을 가리키고, 메타데이터는 스냅숏의 매니페스트 목록을, 매니페스트는 실제 Parquet 데이터 파일과 그 통계(열별 최솟값·최댓값)를 가리켜요. 쓰기는 기존 파일을 절대 고치지 않아요. 새 데이터 파일과 새 매니페스트, 새 메타데이터(v4)를 모두 써 둔 뒤 카탈로그 포인터를 v3 → v4로 비교 후 교체(CAS)하는 한 번의 원자적 연산이 곧 커밋이에요. 그래서 읽던 쿼리는 v3를 끝까지 일관되게 보고, 새 쿼리는 v4를 봐요. 두 작업이 동시에 v3를 기준으로 커밋하면 먼저 바꾼 쪽이 이기고, 진 쪽은 v4를 다시 읽어 겹치는 파일이 없으면 v5로 재시도하는 낙관적 동시성이에요. 옛 스냅숏이 남아 있으니 FOR TIMESTAMP AS OF로 과거 시점을 조회하는 타임 트래블이 되고, expire_snapshots로 오래된 스냅숏과 파일을 지우고 rewrite_data_files로 작은 파일을 합쳐요. 열을 이름이 아닌 ID로 추적해 이름 변경이 안전하고, 파티션 값을 열에서 계산하는 숨은 파티셔닝도 지원해요. Delta Lake와 Hudi도 같은 원리이고, Spark·Trino·Flink·Snowflake가 같은 테이블을 함께 써요.', 'A convention that puts a metadata tree over files in object storage and commits by atomically swapping a single pointer.', 'A table format such as Apache Iceberg records “the table is these files” as a tree: the catalog points at the current metadata file (v3.metadata.json), the metadata at a snapshot’s manifest list, and manifests at the Parquet data files along with their statistics (per-column min and max). Writes never modify existing files. A writer creates new data files, new manifests and new metadata (v4), and the commit is a single atomic compare-and-swap of the catalog pointer from v3 to v4, so running queries keep a consistent view of v3 while new ones see v4. When two jobs commit concurrently from v3, the first swap wins and the loser rereads v4 and, if no files overlap, retries as v5: optimistic concurrency. Old snapshots enable time travel with FOR TIMESTAMP AS OF, while expire_snapshots removes old snapshots and files and rewrite_data_files compacts small files. Columns are tracked by ID rather than name, making renames safe, and hidden partitioning derives partition values from columns. Delta Lake and Hudi work on the same principle, and Spark, Trino, Flink and Snowflake can all share the same tables.', sTableFormat())],
  'de-lineage': [item('de-catalog', '데이터 카탈로그', 'Data catalogs', '회사의 데이터를 찾고, 이해하고, 믿고, 통제하기 위해 메타데이터를 한곳에 모은 저장소예요. 엔진들이 테이블 위치를 찾는 기술 카탈로그 역할도 해요.', '데이터가 수천 개의 테이블로 늘어나면 “매출은 어느 테이블을 봐야 하지?”가 가장 흔한 질문이 돼요. 데이터 카탈로그는 이 검색창 역할을 해요. 검색 결과에 소유 팀, 인증 여부, 마지막 갱신 시각, 설명을 함께 보여 줘서 tmp.revenue_test_v2 같은 버려진 테이블 대신 믿을 수 있는 sales.daily_revenue를 고르게 해요. 모으는 메타데이터는 세 종류예요. 기술 메타데이터(스키마, 저장 위치, 파티션, 행 수), 비즈니스 메타데이터(설명, “순매출” 같은 용어 정의, 소유자), 운영 메타데이터(신선도, 품질 검사 결과, 누가 얼마나 쓰는지)예요. 한편 Hive Metastore, AWS Glue, Iceberg REST 카탈로그 같은 기술 카탈로그는 테이블 이름을 현재 메타데이터와 파일 위치로 바꿔 주는 서비스라, Spark·Trino·Flink가 같은 이름으로 같은 테이블을 함께 써요. 거버넌스도 카탈로그에서 해요. email 열에 PII 태그를 달면 정책이 따라와 분석가에게는 자동으로 가려진 값(k***@mail.com)을 보여 주고, 누가 무엇을 봤는지 감사 로그를 남겨요. DataHub, OpenMetadata, Amundsen, Unity Catalog가 대표적이고, 메타데이터는 손으로 쓰면 금방 낡으니 파이프라인과 쿼리 로그에서 자동으로 수집해요.', 'A store that gathers metadata so people can find, understand, trust and govern data; it also acts as the technical catalog engines use to locate tables.', 'Once data spreads across thousands of tables, “which table has revenue?” becomes the most common question, and a data catalog is the search box that answers it. Results show the owning team, certification, last update and description, steering people to a trusted sales.daily_revenue instead of an abandoned tmp.revenue_test_v2. It collects three kinds of metadata: technical (schema, storage location, partitions, row counts), business (descriptions, glossary terms such as “net revenue”, owners) and operational (freshness, quality-check results, who uses what and how often). Technical catalogs such as Hive Metastore, AWS Glue and Iceberg REST catalogs resolve a table name to its current metadata and files, so Spark, Trino and Flink share the same tables under the same names. Governance lives there too: tagging the email column as PII attaches a policy that shows analysts a masked value (k***@mail.com) and records who saw what in an audit log. DataHub, OpenMetadata, Amundsen and Unity Catalog are well-known examples, and since hand-written metadata goes stale quickly, it is harvested automatically from pipelines and query logs.', sCatalog())]
} };
})();

window.UX = page([
  sec('de-pipe', '파이프라인', 'Pipelines', '데이터 파이프라인 기초', 'Pipeline foundations',
    '데이터를 옮기고, 바꾸고, 정해진 때에 안전하게 다시 돌리는 법이에요.', 'Moving and transforming data, and rerunning it safely on schedule.', [
    item('de-etl', 'ETL과 ELT', 'ETL vs ELT', '여러 원천에서 데이터를 뽑아(Extract) 바꾸고(Transform) 싣는(Load) 일이에요. 요즘은 먼저 싣고 웨어하우스 안에서 바꾸는 ELT가 대세예요.', 'ETL은 별도 서버에서 정제·조인·집계를 끝낸 결과만 웨어하우스에 넣어서, 새 질문이 생기면 원본부터 다시 추출해야 해요. ELT는 원본을 그대로 적재한 뒤 SQL로 단계적으로 변환해요(원본 → 정제 → 마트, 메달리온 구조의 bronze·silver·gold). 싼 오브젝트 스토리지와 강력한 클라우드 웨어하우스 덕분이고, dbt가 SQL 변환을 버전 관리·테스트하는 코드로 다뤄요. 개인정보처럼 적재 전에 지워야 하는 데이터는 여전히 ETL로 처리해요.', 'Extract data from many sources, transform it and load it somewhere useful. Today the norm is ELT: load first, then transform inside the warehouse.', 'ETL finishes cleaning, joining and aggregating on a separate server and loads only the result, so a new question means extracting again. ELT lands the raw data as-is and transforms it in stages with SQL (raw → staging → marts, the bronze/silver/gold medallion layers). Cheap object storage and powerful cloud warehouses made this possible, and dbt treats SQL transforms as versioned, tested code. Data that must be scrubbed before landing, such as PII, still goes through ETL.', sEtl()),
    item('de-batch', '배치와 스트림 처리', 'Batch and stream processing', '배치는 데이터를 모아 한 번에 처리하고, 스트림은 들어오는 즉시 하나씩 처리해요. 처리량과 지연을 맞바꿔요.', '배치(Spark, dbt)는 하루치를 모아 밤에 돌려 처리량이 크고 다시 돌리기 쉽지만 결과가 몇 시간에서 하루 늦어요. 스트림(Flink, Kafka Streams)은 초 단위로 결과를 내지만 상태 관리, 늦게 온 데이터, 순서 처리가 어려워요. 몇 초씩 묶어 처리하는 마이크로 배치(Spark Structured Streaming)는 그 중간이에요. 람다 아키텍처는 배치와 스트림을 함께 두고, 카파 아키텍처는 스트림 하나에 재처리를 맡겨요.', 'Batch gathers data and processes it in one go; streaming processes each event as it arrives. It is a trade of throughput for latency.', 'Batch jobs (Spark, dbt) run a day’s worth at night: high throughput and easy to rerun, but results arrive hours to a day late. Stream processors (Flink, Kafka Streams) answer in seconds but must handle state, late data and ordering. Micro-batching (Spark Structured Streaming) sits in between. A Lambda architecture runs both paths side by side; a Kappa architecture uses one stream and replays it for reprocessing.', sBatch()),
    item('de-dag', '워크플로 오케스트레이션', 'Workflow orchestration', '작업들과 그 의존 관계를 DAG(방향 비순환 그래프)로 정의하고, 정해진 시간에 순서대로 실행·재시도·알림을 맡겨요.', 'Airflow 같은 오케스트레이터는 앞 작업이 끝난 작업부터 실행하고 서로 무관한 작업은 병렬로 돌려요. 실패하면 간격을 두고 재시도하고, 품질 검사에 걸리면 하류 작업을 멈춰 틀린 숫자가 대시보드에 나가지 않게 해요. 버그를 고친 뒤 과거 날짜를 다시 돌리는 백필도 오케스트레이터의 일이에요. 실제 무거운 계산은 Spark나 웨어하우스의 SQL이 하고, 오케스트레이터는 순서와 상태를 관리해요.', 'Define tasks and their dependencies as a DAG (directed acyclic graph) and let the orchestrator run, retry and alert on schedule.', 'An orchestrator such as Airflow starts a task once its upstreams succeed and runs independent tasks in parallel. Failures are retried after a delay, and a failed quality check halts downstream tasks so bad numbers never reach a dashboard. Backfills, rerunning past dates after a fix, are its job too. The heavy computation happens in Spark or warehouse SQL; the orchestrator manages order and state. Dagster, Prefect and Argo Workflows are alternatives.', sDag()),
    item('de-idem', '멱등한 파이프라인', 'Idempotent pipelines', '같은 작업을 몇 번 다시 돌려도 결과가 똑같도록 만들어요. 재시도와 백필이 흔한 데이터 파이프라인의 기본기예요.', '단순히 INSERT로 덧붙이면 실패 후 재시도할 때마다 중복이 쌓여요. 대신 날짜 파티션을 통째로 덮어쓰거나(INSERT OVERWRITE), 키로 맞춰 합치는 MERGE(업서트)를 써요. 작업은 now() 대신 실행 날짜를 인자로 받아야 언제 다시 돌려도 같은 결과가 나와요. 수학적으로는 f(f(x)) = f(x)인 성질이에요.', 'Make every job produce the same result no matter how many times it reruns: the foundation of pipelines where retries and backfills are routine.', 'A plain INSERT appends duplicates each time a failed job is retried. Instead, overwrite the whole date partition (INSERT OVERWRITE) or MERGE (upsert) on a key. Jobs should take the run date as a parameter instead of calling now(), so a rerun at any time yields the same output. Mathematically it is the property f(f(x)) = f(x).', sIdem()),
    item('de-cdc', '변경 데이터 캡처 (CDC)', 'Change data capture (CDC)', '데이터베이스의 트랜잭션 로그를 읽어 삽입·수정·삭제를 이벤트로 흘려보내요. 원본 DB에 부담 없이 거의 실시간으로 복제해요.', 'DB는 모든 변경을 먼저 WAL(PostgreSQL)이나 binlog(MySQL)에 적어요. Debezium 같은 CDC 커넥터가 복제본처럼 이 로그를 읽어 카프카 토픽으로 보내고, 웨어하우스·검색 색인·캐시가 각자 반영해요. updated_at으로 주기적으로 조회하는 방식은 삭제를 못 보고 두 조회 사이의 중간 변경을 놓치며 큰 테이블을 반복해서 훑어요. 서비스 이벤트를 안전하게 내보내는 아웃박스 패턴과도 함께 쓰여요.', 'Read a database’s transaction log and stream every insert, update and delete as events: near-real-time replication with little load on the source.', 'Databases write every change to a log first, the WAL in PostgreSQL or the binlog in MySQL. A CDC connector such as Debezium reads that log like a replica and publishes to Kafka topics, where warehouses, search indexes and caches apply the changes. Polling with updated_at misses deletes, loses intermediate changes between polls and rescans large tables. CDC is often paired with the outbox pattern for publishing service events safely.', sCdc())
  ].concat(XT.add['de-pipe'] || [])),
  sec('de-store', '저장과 포맷', 'Storage & formats', '저장과 포맷', 'Storage and formats',
    '분석에 맞게 데이터를 저장하고 모델링하는 법이에요.', 'Storing and modeling data for analytics.', [
    item('de-oltp', 'OLTP와 OLAP', 'OLTP and OLAP', '서비스용 DB(OLTP)는 행 하나를 빠르게 읽고 쓰고, 분석용 DB(OLAP)는 수백만 행의 몇 개 열을 훑어 집계해요.', 'OLTP(MySQL, PostgreSQL)는 행 단위로 저장해 주문 하나를 넣고 고치는 짧은 트랜잭션을 초당 수천 번 처리해요. OLAP(BigQuery, Snowflake, ClickHouse, Redshift)는 열 단위로 저장해 필요한 열만 연속으로 읽고, 비슷한 값이 모여 압축도 잘 돼요. 분석 쿼리가 서비스를 느리게 만들지 않도록 둘을 나누고, CDC나 배치로 데이터를 옮겨요.', 'Service databases (OLTP) read and write single rows fast; analytics databases (OLAP) scan a few columns across millions of rows.', 'OLTP systems (MySQL, PostgreSQL) store data by row and handle thousands of short transactions per second, each touching one order. OLAP systems (BigQuery, Snowflake, ClickHouse, Redshift) store data by column, read only the needed columns contiguously and compress well because similar values sit together. The two are kept apart so analytics never slows the product, with CDC or batch jobs moving data between them.', sOltp()),
    item('de-parquet', '열 지향 파일 포맷 (Parquet)', 'Columnar files (Parquet)', '파케이 파일은 행 그룹마다 열 조각으로 저장하고, 끝의 푸터에 통계를 담아 필요한 부분만 읽게 해요.', '리더는 푸터의 행 그룹별 min/max 통계로 조건에 맞을 수 없는 행 그룹을 통째로 건너뛰고(조건 내려보내기), 남은 곳에서도 필요한 열만 읽어요(열 고르기). 열마다 사전 인코딩, RLE(같은 값 연속을 개수로), 델타 인코딩을 한 뒤 Snappy나 Zstd로 압축해요. Spark, Trino, DuckDB, BigQuery가 모두 읽는 사실상 표준이고, ORC도 같은 원리예요.', 'Parquet stores each row group as column chunks and keeps statistics in a footer, so readers fetch only what they need.', 'Using the footer’s per-row-group min/max statistics, a reader skips row groups that cannot match the filter (predicate pushdown), then reads only the needed columns from the rest (column pruning). Each column is dictionary-encoded, run-length encoded and delta-encoded before Snappy or Zstd compression. It is the de facto standard read by Spark, Trino, DuckDB and BigQuery; ORC works the same way.', sParquet()),
    item('de-part', '파티셔닝과 프루닝', 'Partitioning and pruning', '데이터를 날짜 같은 열 값별 폴더로 나눠 저장하면, 조건에 맞는 폴더만 읽어서 스캔 양이 크게 줄어요.', 'dt=2026-11-10/처럼 하이브 스타일로 나누면 WHERE dt = …인 쿼리는 그 폴더만 읽어요(파티션 프루닝). 하지만 시간·국가까지 너무 잘게 나누면 1MB짜리 작은 파일이 수만 개 생겨 목록 조회와 파일 열기 비용이 일을 압도해요. 주기적으로 작은 파일을 수백 MB 단위로 합치고(compaction), 자주 거르는 열로만 나눠요. Iceberg의 숨은 파티셔닝, Z-order·클러스터링은 파일 안의 정렬까지 다뤄요.', 'Splitting data into folders by a column such as date lets queries read only the folders that match, slashing the bytes scanned.', 'With Hive-style folders like dt=2026-11-10/, a query filtering on dt reads only that folder (partition pruning). Partition too finely, by hour and country, and tens of thousands of 1 MB files appear, so listing and opening files dominate the work. Compaction periodically merges small files into a few hundred MB each, and partitions should follow the columns you filter on most. Iceberg’s hidden partitioning, Z-ordering and clustering go further and sort data within files.', sPart()),
    item('de-lake', '레이크·웨어하우스·레이크하우스', 'Lake, warehouse and lakehouse', '데이터 레이크는 오브젝트 스토리지에 쌓인 파일이고, 테이블 포맷이 그 위에 트랜잭션과 스냅숏을 얹으면 레이크하우스가 돼요.', '레이크(S3, GCS)는 싸고 어떤 형식이든 담지만, 그대로는 반쯤 쓴 파일이 보이고 스키마도 없어요. Apache Iceberg, Delta Lake, Hudi는 “지금 테이블 = 이 파일들”이라는 스냅숏을 기록하고, 쓰기는 새 파일과 새 스냅숏을 만든 뒤 포인터를 원자적으로 바꿔요. 그래서 읽는 쪽은 항상 일관된 모습을 보고, 옛 스냅숏으로 과거를 조회하는 타임 트래블도 돼요. 웨어하우스(Snowflake, BigQuery)의 기능을 레이크에서 Spark·Trino·Flink가 함께 쓰는 구조예요.', 'A data lake is files in object storage; add a table format with transactions and snapshots on top and it becomes a lakehouse.', 'Lakes (S3, GCS) are cheap and hold any format, but on their own expose half-written files and enforce no schema. Apache Iceberg, Delta Lake and Hudi record snapshots, “the table is these files”, and each write adds new files and a new snapshot before atomically swapping a pointer. Readers therefore always see a consistent table, and time travel queries old snapshots. The result brings warehouse features (Snowflake, BigQuery) to the lake, shared by Spark, Trino and Flink.', sLake()),
    item('de-star', '스타 스키마와 차원 모델링', 'Star schemas and dimensional modeling', '가운데에 측정값을 담은 사실 테이블을, 둘레에 맥락을 설명하는 차원 테이블을 두는 분석용 모델이에요.', '사실 테이블(fact_sales)은 판매 한 건마다 한 행으로 수량·금액 같은 숫자와 차원 키만 담고, 차원 테이블은 날짜·상품·매장·고객을 설명해요. “카테고리별 월 매출”은 사실 테이블을 두 차원과 조인해 묶으면 돼요. 차원을 더 정규화하면 눈송이(snowflake) 스키마가 되어 저장은 줄지만 조인이 늘어요. 킴볼의 차원 모델링에서 나왔고, 조인이 단순해 BI 도구와 사람이 쓰기 쉬워요.', 'An analytics model with a fact table of measurements in the middle and dimension tables of context around it.', 'The fact table (fact_sales) holds one row per sale with numbers such as quantity and amount plus dimension keys; dimension tables describe the date, product, store and customer. “Monthly revenue by category” is a join of the fact table with two dimensions and a group-by. Normalizing dimensions further gives a snowflake schema: less storage, more joins. It comes from Kimball’s dimensional modeling, and its simple joins suit BI tools and people alike.', sStar()),
    item('de-scd', '천천히 변하는 차원 (SCD)', 'Slowly changing dimensions', '고객 주소처럼 가끔 바뀌는 차원 값을 이력과 함께 관리하는 방법이에요. 덮어쓰면 과거 리포트까지 바뀌어요.', 'Type 1은 그냥 덮어써서 이력이 사라져요. Type 2는 옛 행에 유효 기간 끝(valid_to)과 current = N을 적고 새 대리 키로 새 행을 추가해, 매출이 그 시점의 행을 가리키게 해요. 그래서 2025년 매출은 서울, 2026년 매출은 부산으로 정확히 집계돼요. Type 3은 “이전 값” 열 하나만 두는 방식이고, dbt snapshot이 Type 2를 자동으로 관리해 줘요.', 'Ways to track dimension values that change now and then, such as a customer’s address; overwriting rewrites past reports.', 'Type 1 simply overwrites and loses history. Type 2 closes the old row (valid_to, current = N) and adds a new row with a new surrogate key, so each sale points at the row valid at the time: 2025 sales stay in Seoul and 2026 sales count toward Busan. Type 3 keeps a single “previous value” column. dbt snapshots maintain Type 2 automatically.', sScd())
  ].concat(XT.add['de-store'] || [])),
  sec('de-dist', '분산 처리', 'Distributed processing', '분산 처리', 'Distributed processing',
    '수천 대의 서버가 한 작업을 나눠 처리하는 원리예요.', 'How thousands of servers share one job.', [
    item('de-mr', '맵리듀스', 'MapReduce', '큰 작업을 map(조각마다 동시에 변환)과 reduce(키별로 합치기)로 나눠 수천 대의 서버에서 처리하는 모델이에요.', '단어 세기라면 map이 조각마다 (단어, 1)을 내보내고, 셔플이 같은 단어를 같은 리듀서로 모으고, reduce가 개수를 더해요. 셔플은 네트워크로 데이터를 크게 옮겨 가장 비싸서, map 쪽에서 미리 합치는 컴바이너로 양을 줄여요. 2004년 구글 논문에서 나와 Hadoop으로 퍼졌고, 중간 결과를 디스크에 써서 느리지만 장애에 튼튼했어요. 지금은 Spark가 같은 모델을 메모리 위에서 더 빠르게 돌려요.', 'A model that splits huge jobs into map (transform every chunk in parallel) and reduce (combine per key) across thousands of servers.', 'For word count, map emits (word, 1) for each chunk, the shuffle routes equal words to the same reducer, and reduce adds them up. The shuffle moves lots of data over the network and is the costliest step, so combiners pre-aggregate on the map side. The model came from Google’s 2004 paper and spread through Hadoop, which wrote intermediate results to disk: slow, but resilient to failures. Spark now runs the same model faster in memory.', sMr()),
    item('de-spark', 'Spark의 실행 모델', 'How Spark executes', 'Spark는 변환을 바로 실행하지 않고 계획으로 쌓았다가, 액션이 오면 셔플을 경계로 단계를 나눠 병렬로 실행해요.', 'filter·select 같은 좁은 변환은 파티션끼리 1:1이라 한 단계(stage)에 묶이고, groupBy·join 같은 넓은 변환은 같은 키를 모아야 해서 셔플과 함께 새 단계가 시작돼요. 단계 안에서는 파티션마다 태스크가 실행기(executor)에서 동시에 돌아요. Catalyst 최적화기가 필터를 앞당기고 필요한 열만 읽게 계획을 다시 짜고, 반복해서 쓰는 데이터는 cache()로 메모리에 올려요. 셔플 수를 줄이는 게 성능의 핵심이에요.', 'Spark doesn’t run transformations immediately; it builds a plan and, when an action arrives, splits it into stages at shuffles and runs them in parallel.', 'Narrow transformations such as filter and select map partitions one-to-one and are fused into a single stage; wide ones such as groupBy and join must gather equal keys, so a shuffle starts a new stage. Within a stage, one task per partition runs on the executors at once. The Catalyst optimizer rewrites the plan to push filters down and read only needed columns, and cache() keeps reused data in memory. Cutting shuffles is the key to speed.', sSpark()),
    item('de-join', '분산 조인 전략', 'Distributed join strategies', '여러 서버에 나뉜 테이블을 조인할 땐, 작은 쪽을 모두에게 복사하거나 같은 키끼리 모이도록 셔플해요.', '한쪽이 작으면(Spark 기본 10MB 이하) 통째로 모든 실행기에 보내는 브로드캐스트 조인을 써서 큰 테이블은 움직이지 않아요. 둘 다 크면 키의 해시로 다시 나눠 같은 키를 한 실행기에 모은 뒤 정렬해 병합하는 정렬 병합 조인을 써요. 셔플이 네트워크와 디스크를 많이 써서 조인 비용의 대부분을 차지해요. 옵티마이저는 테이블 통계로 전략을 고르므로 통계가 낡으면 엉뚱한 선택을 해요.', 'To join tables spread over many servers, either copy the small side to everyone or shuffle both so equal keys meet.', 'If one side is small (under 10 MB by default in Spark), a broadcast join ships it whole to every executor and the big table never moves. When both sides are big, a sort-merge join repartitions both by key hash so matching keys land on the same executor, then sorts and merges them. The shuffle’s network and disk traffic is most of a join’s cost. Optimizers choose using table statistics, so stale statistics lead to poor choices.', sJoin()),
    item('de-skew', '데이터 스큐', 'Data skew', '특정 키에 데이터가 몰리면 그 키를 맡은 태스크 하나가 끝나지 않아 전체 작업이 그 하나를 기다려요.', 'null 키나 거대한 고객 하나가 데이터의 대부분을 차지하면 groupBy·join 뒤 한 태스크만 수십 배 오래 걸려요(낙오자). 소금 치기(salting)는 키에 0~N 난수를 붙여 여러 태스크로 나눈 뒤, 부분 결과를 원래 키로 한 번 더 합쳐요. Spark 3의 적응형 쿼리 실행(AQE)은 치우친 조인 파티션을 자동으로 쪼개요. null 키를 미리 걸러 따로 처리하는 것도 흔한 해법이에요.', 'When one key holds most of the data, the single task handling it lags and the whole job waits for it.', 'If a null key or one giant customer dominates, one task after a groupBy or join runs dozens of times longer than the rest (a straggler). Salting appends a random 0–N to the key to spread it over several tasks, then combines the partial results by the original key. Spark 3’s adaptive query execution (AQE) splits skewed join partitions automatically. Filtering null keys out and handling them separately is another common fix.', sSkew()),
    item('de-mpp', '분산 SQL 엔진', 'Distributed SQL engines', '코디네이터가 SQL을 조각으로 나눠 많은 워커에게 맡기고, 워커들이 스토리지의 파일을 동시에 읽어 부분 결과를 합쳐요.', 'Trino·Presto, BigQuery, Snowflake, Athena가 이 구조(MPP, 대규모 병렬 처리)예요. 워커는 파일 조각을 나눠 스캔하고 각자 부분 집계를 낸 뒤 교환해 최종 결과를 만들어요. 데이터는 오브젝트 스토리지에, 계산은 필요할 때만 띄우는 저장·계산 분리 구조라 워커 수를 따로 늘리고 줄일 수 있어요. 비용과 시간이 스캔한 바이트에 비례하니 파티셔닝과 열 지향 포맷이 곧 돈을 아껴요.', 'A coordinator splits SQL into fragments for many workers, which scan files from storage in parallel and merge their partial results.', 'Trino/Presto, BigQuery, Snowflake and Athena follow this massively parallel processing (MPP) design. Workers scan their share of file splits, compute partial aggregates, then exchange and combine them into the final answer. Data lives in object storage while compute spins up on demand, so the separation of storage and compute lets workers scale independently. Cost and time track bytes scanned, so partitioning and columnar formats save real money.', sMpp())
  ].concat(XT.add['de-dist'] || [])),
  sec('de-stream', '스트림 처리', 'Stream processing', '스트림 처리', 'Stream processing',
    '끝없이 흐르는 이벤트를 실시간으로 다루는 법이에요.', 'Handling endless event streams in real time.', [
    item('de-kafka', '로그 기반 메시지 브로커', 'Log-based message brokers', 'Kafka 토픽은 파티션마다 추가만 하는 로그예요. 메시지는 읽어도 지워지지 않고, 소비자는 어디까지 읽었는지(오프셋)만 기록해요.', '같은 키는 해시로 늘 같은 파티션에 들어가서 키별 순서가 보장돼요. 소비자 그룹은 파티션을 나눠 맡아 병렬로 읽고, 한 소비자가 죽으면 리밸런스로 다른 소비자가 커밋된 오프셋부터 이어 읽어요. 보관 기간 동안 메시지가 남아 있어 다른 그룹이 처음부터 다시 읽거나(재처리) 새 시스템을 붙일 수 있어요. 파티션 수가 그룹 안 최대 병렬도를 정해요.', 'A Kafka topic is an append-only log per partition: reading doesn’t delete messages, and consumers just record how far they have read (offsets).', 'A key always hashes to the same partition, so per-key order is preserved. A consumer group splits partitions among its members to read in parallel, and when one dies a rebalance hands its partitions to another, resuming from the committed offset. Messages stay for the retention period, so another group can replay from the start or a new system can be attached. The partition count caps parallelism within a group. Redpanda, Pulsar and Kinesis are similar.', sKafka()),
    item('de-window', '스트림의 윈도', 'Windows on streams', '끝없는 이벤트 흐름을 시간 구간(윈도)으로 묶어야 개수·합계 같은 집계를 낼 수 있어요.', '고정(tumbling) 윈도는 10초씩 겹치지 않게 잘라 분당 주문 수 같은 집계에 쓰고, 슬라이딩 윈도는 20초 창을 10초마다 밀어 이동 평균을 내요. 세션 윈도는 활동 사이 공백(예: 30분)으로 나눠 사용자 방문 단위 분석에 써요. Flink, Kafka Streams, Spark Structured Streaming, Apache Beam이 모두 이 세 가지를 지원해요.', 'To count or sum an endless stream of events, you first group it into time intervals: windows.', 'Tumbling windows cut back-to-back slices, say 10 seconds, for metrics such as orders per minute; sliding windows move a 20-second window every 10 seconds to produce moving averages. Session windows split on gaps of inactivity (say 30 minutes) to analyze individual visits. Flink, Kafka Streams, Spark Structured Streaming and Apache Beam support all three.', sWindow()),
    item('de-watermark', '이벤트 시각과 워터마크', 'Event time and watermarks', '이벤트는 발생한 시각보다 늦게 도착해요. 워터마크는 “이 시각 이전 이벤트는 거의 다 왔다”는 추정으로 윈도를 닫을 때를 정해요.', '네트워크 지연이나 오프라인이던 기기 때문에 이벤트는 순서가 뒤섞여 늦게 와요. 처리 시각이 아니라 이벤트 시각으로 집계해야 재처리해도 같은 결과가 나와요. 워터마크가 윈도 끝을 지나면 결과를 확정해 내보내고, 그 뒤에 온 이벤트는 허용 지연 안이면 결과를 갱신하고 넘으면 버리거나 따로 보관해요. 오래 기다리면 정확하지만 늦고, 빨리 닫으면 빠르지만 놓치는 맞바꿈이에요.', 'Events arrive later than they happen; a watermark estimates that “events before this time are in” and decides when to close a window.', 'Network delays and devices that were offline make events arrive late and out of order. Aggregating by event time, not processing time, keeps reprocessing consistent. When the watermark passes a window’s end the result is emitted; later events update it if they fall within the allowed lateness, and are dropped or sent to a side output otherwise. Waiting longer is more complete but slower: a trade-off between latency and completeness.', sWatermark()),
    item('de-exactly', '전달 보장과 정확히 한 번', 'Delivery guarantees and exactly-once', '장애가 나도 각 이벤트가 결과에 정확히 한 번만 반영되게 하려면, 입력 위치·상태·출력을 함께 커밋해야 해요.', '먼저 커밋하고 처리하면 장애 시 유실(최대 한 번), 처리하고 나중에 커밋하면 장애 시 중복(최소 한 번)이 생겨요. 정확히 한 번은 입력 오프셋, 처리기 상태, 출력 쓰기를 하나의 트랜잭션으로 묶어 얻어요. Flink 체크포인트와 2단계 커밋 싱크, Kafka 트랜잭션이 이 방식이에요. 실무에선 최소 한 번 전달에 이벤트 ID 기반 멱등 쓰기를 더해 같은 효과를 내는 경우가 많아요.', 'For each event to affect the result exactly once despite failures, input position, state and output must be committed together.', 'Committing before processing loses data on a crash (at-most-once); committing after processing duplicates it (at-least-once). Exactly-once comes from committing the input offset, operator state and sink writes in one transaction, as Flink checkpoints with two-phase-commit sinks and Kafka transactions do. In practice, at-least-once delivery plus idempotent writes keyed by event ID often achieves the same effect.', sExactly()),
    item('de-back', '배압과 소비 지연', 'Backpressure and consumer lag', '생산이 소비보다 빠르면 버퍼가 차고 지연이 쌓여요. 배압은 하류가 상류에게 “천천히”라고 알려 시스템을 지켜요.', '버퍼를 무한정 늘리면 결국 메모리가 터지므로, 크기를 제한하고 가득 차면 상류의 속도를 늦춰요. Flink는 크레딧 기반 배압을, Reactive Streams는 소비자가 request(n)으로 필요한 만큼만 당겨 받는 방식을 써요. 카프카에서는 소비 지연(consumer lag)을 지표로 보고 알림을 걸며, 파티션과 소비자를 늘려 처리량을 키워요. 실시간성이 덜 중요하면 샘플링으로 일부를 버리기도 해요.', 'When producers outpace consumers, buffers fill and lag builds; backpressure lets downstream tell upstream to slow down.', 'An unbounded buffer eventually exhausts memory, so buffers are capped and, when full, upstream is throttled. Flink uses credit-based backpressure, and Reactive Streams has consumers pull only what they can handle with request(n). With Kafka, teams monitor and alert on consumer lag and add partitions and consumers to raise throughput. When freshness matters less, sampling drops part of the load.', sBack())
  ].concat(XT.add['de-stream'] || [])),
  sec('de-ops', '품질과 운영', 'Quality & operations', '품질과 운영', 'Quality and operations',
    '믿을 수 있는 데이터를 지키고, 큰 데이터를 싸게 세는 법이에요.', 'Keeping data trustworthy, and counting big data cheaply.', [
    item('de-quality', '데이터 품질 검사', 'Data quality checks', '빈 값, 중복, 허용되지 않은 값, 범위, 볼륨, 신선도를 자동으로 검사해 깨진 데이터가 대시보드에 닿기 전에 막아요.', 'not_null, unique, accepted_values, 범위 같은 행 단위 규칙과, 오늘 적재된 행 수가 평소보다 급감했는지(볼륨), 마지막 갱신이 언제인지(신선도), 스키마가 맞는지 같은 전체 단위 검사를 함께 해요. 실패한 행은 격리 테이블로 보내고 담당자에게 알리며, 심각하면 파이프라인을 멈춰요. dbt tests, Great Expectations, Soda가 대표 도구이고, 생산자와 스키마·품질을 약속하는 데이터 계약도 쓰여요.', 'Automatically check for nulls, duplicates, invalid values, ranges, volume and freshness so broken data is stopped before it reaches a dashboard.', 'Row-level rules (not_null, unique, accepted_values, ranges) are combined with dataset-level checks: did today’s row count drop sharply (volume), when was it last updated (freshness), does the schema still match? Failing rows go to a quarantine table and the owner is alerted; severe failures halt the pipeline. dbt tests, Great Expectations and Soda are common tools, and data contracts formalize schema and quality promises with producers.', sQuality()),
    item('de-schema', '스키마 진화', 'Schema evolution', '데이터 형식은 시간이 지나며 바뀌어요. 옛 데이터와 새 코드가 서로 읽을 수 있도록 호환 규칙을 지키며 바꿔요.', 'Avro·Protobuf 메시지는 스키마 레지스트리에 등록된 스키마 ID를 달고 다녀요. 기본값이 있는 선택 필드를 추가하면 옛 소비자는 무시하고 새 소비자는 옛 데이터에 기본값을 채워 둘 다 문제없어요. 필드를 지우거나 이름·타입을 바꾸면 레지스트리가 등록을 거부해 배포를 막아요. BACKWARD(새 리더가 옛 데이터), FORWARD(옛 리더가 새 데이터), FULL(둘 다) 같은 호환 모드로 허용 범위를 정해요.', 'Data formats change over time; evolve them under compatibility rules so old data and new code can still read each other.', 'Avro and Protobuf messages carry the ID of a schema registered in a schema registry. Adding an optional field with a default works both ways: old consumers ignore it and new consumers fill the default into old data. Removing a field or changing its name or type is rejected by the registry, blocking the deploy. Compatibility modes such as BACKWARD (new readers, old data), FORWARD (old readers, new data) and FULL (both) set what is allowed.', sSchema()),
    item('de-lineage', '데이터 계보와 카탈로그', 'Lineage and catalogs', '어떤 데이터가 어디서 와서 어디로 가는지 그래프로 기록해, 바꾸기 전 영향과 숫자가 틀렸을 때 원인을 찾아요.', '카탈로그는 테이블·열 단위로 누가 무엇을 읽고 쓰는지 수집해요(OpenLineage, DataHub, Amundsen, dbt docs, Unity Catalog). 원본 열의 이름을 바꾸기 전에 하류 대시보드·리포트·모델 중 무엇이 영향받는지 확인하고(영향 분석), 숫자가 이상하면 위로 거슬러 실패한 적재를 찾아요(근본 원인 분석). 설명, 소유자, 개인정보 같은 민감도 태그를 달아 검색과 접근 권한 관리에도 써요.', 'Record as a graph where each dataset comes from and where it goes, to see the impact of a change and trace a wrong number to its cause.', 'Catalogs collect who reads and writes what, down to tables and columns (OpenLineage, DataHub, Amundsen, dbt docs, Unity Catalog). Before renaming a source column, check which dashboards, reports and models depend on it (impact analysis); when a number looks off, walk upstream to the failed load (root-cause analysis). Descriptions, owners and sensitivity tags such as PII also drive search and access control.', sLineage()),
    item('de-hll', '근사 집계: HyperLogLog', 'Approximate counting: HyperLogLog', '고유한 값의 개수를 12KB 정도의 메모리로 약 1% 오차 안에서 추정하는 확률적 자료구조예요.', '해시는 무작위 비트처럼 보여서, 앞쪽 0이 k개 연속인 값은 대략 2ᵏ개를 봐야 나와요. 앞 비트로 버킷을 고르고 버킷마다 본 0 길이의 최댓값만 저장한 뒤, 레지스터들의 조화평균으로 전체 개수를 추정해요. 레지스터 최댓값끼리 합칠 수 있어 일별 스케치로 주간·월간 고유 사용자를 바로 구해요. Redis PFCOUNT, BigQuery APPROX_COUNT_DISTINCT, Druid가 쓰고, Count-Min Sketch(빈도)와 t-digest(분위수)가 같은 계열이에요.', 'A probabilistic structure that estimates the number of distinct values in about 12 KB of memory, within roughly 1% error.', 'Hashes look like random bits, so a value with k leading zeros typically appears only after about 2ᵏ distinct items. HyperLogLog uses the leading bits to pick a bucket, stores only the longest zero run seen per bucket, and estimates the total from the registers’ harmonic mean. Sketches merge by taking register maxima, so daily sketches roll up into weekly or monthly unique users. Redis PFCOUNT, BigQuery APPROX_COUNT_DISTINCT and Druid use it; Count-Min Sketch (frequencies) and t-digest (quantiles) are relatives.', sHll())
  ].concat(XT.add['de-ops'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
window.UX[0].css += `
.de-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.de-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.de-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.de-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.de-r .in{color:var(--danger);font-weight:800}
.de-g .in{color:var(--ok);font-weight:800}
.de-a .in{color:var(--accent);font-weight:800}
.de-w .in{color:var(--warn);font-weight:800}
.de-c .in{font-size:.6em;font-weight:700}
.de-c2 .in{font-size:.5em;font-weight:700}
.de-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.de-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
})();
