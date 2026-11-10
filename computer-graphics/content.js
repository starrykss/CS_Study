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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'gx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono gx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono gx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c gx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));

/* ---- graphics helpers ---- */
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const px = (S, k, x, y, w, h, c, st, o = {}) => { S.el(k, { x, y, w, h, css: `background:${c};border-radius:${o.r ?? .08}em;${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const cl = v => Math.max(0, Math.min(255, Math.round(v))), rgb = (r, g, b) => `rgb(${cl(r)},${cl(g)},${cl(b)})`;
const gridbg = (S, k, x, y, w, h, cs, st, o = {}) => { S.el(k, { x, y, w, h, css: `background-image:linear-gradient(var(--line) .06em,transparent .06em),linear-gradient(90deg,var(--line) .06em,transparent .06em);background-size:${cs}em ${cs}em;border:.06em solid var(--line)`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const mpoly = (S, k, F, pts, o = {}) => pts.slice(1).forEach((q, i) => mline(S, k + i, F, pts[i], q, o));
const sphere = (S, k, cx, cy, R, n, fn, st, o = {}) => { const cs = 2 * R / n; for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const u = (i + .5) / n * 2 - 1, v = (j + .5) / n * 2 - 1; if (u * u + v * v > 1) continue; const N = [u, -v, Math.sqrt(1 - u * u - v * v)]; px(S, `${k}${i}_${j}`, cx - R + i * cs, cy - R + j * cs, cs + .02, cs + .02, fn(N, u, v), st, { r: 0, off: o.off }); } };
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], nrm = a => { const l = Math.hypot(...a); return a.map(v => v / l); };

/* ================= coordinates & transforms ================= */
function sRaster() {
  const S = scene({ id: 'gx-raster', steps: 5, per: 1.4 });
  T(S, 'h1', 1, 1.2, ['벡터', 'vector'], 'gx-s gx-a'); T(S, 'h2', 17.6, 1.2, ['래스터 (픽셀)', 'raster (pixels)'], 'gx-s gx-w', 2);
  ring(S, 'v1', 7.6, 8.6, 2.4, 'accent', 1, { w: .16, off: 3 }); ring(S, 'v2', 7.6, 8.8, 5.6, 'accent', 3, { w: .2 });
  const inC = (i, j, n) => Math.hypot(i + .5 - n / 2, j + .5 - n / 2) <= n * .42;
  for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { if (inC(i, j, 8)) { px(S, `p${i}_${j}`, 19 + i * 1.2, 4 + j * 1.2, 1.12, 1.12, 'var(--warn)', 2, { off: 3, r: 0 }); px(S, `q${i}_${j}`, 18 + i * 1.6, 2.6 + j * 1.6, 1.56, 1.56, 'var(--warn)', 3, { r: 0 }); } }
  gridbg(S, 'gb', 19, 4, 9.6, 9.6, 1.2, 2, { off: 3 }); gridbg(S, 'gb2', 18, 2.6, 12.8, 12.8, 1.6, 3);
  T(S, 'n1', 1, 16.2, ['벡터: “중심과 반지름”처럼 도형을 수식으로 저장', 'vector: shapes stored as math, such as a center and a radius'], 'gx-xs', 1);
  T(S, 'n2', 1, 17.4, ['래스터: 정해진 격자의 각 픽셀 색을 저장 (8×8 = 64개)', 'raster: the color of every pixel on a fixed grid (8×8 = 64)'], 'gx-xs', 2);
  T(S, 'n3', 1, 18.6, ['키우면 벡터는 다시 계산해 매끈, 래스터는 계단 현상(jaggies)', 'zoom in: vectors stay smooth, rasters get jaggies'], 'gx-xs gx-r', 3);
  T(S, 'n4', 17.6, 16.2, ['사진·영상: 래스터 (JPEG, PNG)', 'photos and video: raster (JPEG, PNG)'], 'gx-xs', 4); T(S, 'n4b', 17.6, 17.4, ['로고·아이콘·글꼴: 벡터 (SVG)', 'logos, icons, fonts: vector (SVG)'], 'gx-xs', 4);
  T(S, 'n5', 17.6, 18.6, ['화면엔 결국 모두 픽셀로 (래스터화)', 'screens always end in pixels (rasterization)'], 'gx-xs gx-g', 5);
  S.cap(1, '벡터 그래픽은 도형을 수식으로 기억해요', 'Vector graphics remember shapes as math')
    .cap(2, '래스터 그래픽은 픽셀마다 색을 기억해요', 'Raster graphics remember a color per pixel')
    .cap(3, '확대하면 차이가 드러나요', 'Zooming in reveals the difference')
    .cap(4, '용도에 따라 골라 써요', 'Each suits different jobs')
    .cap(5, '벡터와 래스터', 'Vector and raster');
  return S;
}
function sColor() {
  const S = scene({ id: 'gx-color', steps: 5, per: 1.4 });
  [['R', 255, '#e5484d'], ['G', 136, '#30a46c'], ['B', 0, '#3e63dd']].forEach(([c, v, col], i) => { T(S, 'c' + i, 1, 2 + i * 1.8, c, 'cz-mono gx-s', 1); px(S, 'bb' + i, 2.4, 2 + i * 1.8, 10, 1.2, 'var(--line)', 1, { r: .3 }); if (v) px(S, 'b' + i, 2.4, 2 + i * 1.8, 10 * v / 255, 1.2, col, 1, { r: .3 }); T(S, 'v' + i, 12.8, 2 + i * 1.8, String(v), 'cz-mono gx-s', 1); });
  px(S, 'sw', 1, 7.4, 3.4, 3.4, 'rgb(255,136,0)', 1, { r: .4 });
  T(S, 'hx', 5, 7.6, '#FF8800', 'cz-mono gx-l', 2); T(S, 'hx2', 5, 9.2, ['FF = 255, 88 = 136, 00 = 0', 'FF = 255, 88 = 136, 00 = 0'], 'cz-mono gx-xs', 2);
  S.el('wh', { x: 21, y: 1.6, w: 8, h: 8, css: 'border-radius:50%;background:conic-gradient(red,yellow,lime,cyan,blue,magenta,red)', s: hid() }); vis(S, 'wh', 3);
  S.el('wc', { x: 23.6, y: 4.2, w: 2.8, h: 2.8, css: 'border-radius:50%;background:radial-gradient(#fff,transparent 70%)', s: hid() }); vis(S, 'wc', 3);
  const a = 32 * Math.PI / 180; ar(S, 'hp', [25, 5.6], [25 + 3.6 * Math.sin(a), 5.6 - 3.6 * Math.cos(a)], 'ink', 3, { h: .14 });
  T(S, 'hs', 17, 10.4, ['HSV: 색상 32° · 채도 100% · 명도 100%', 'HSV: hue 32° · saturation 100% · value 100%'], 'cz-mono gx-xs', 3);
  T(S, 'gh', 1, 12.2, ['감마: 화면 값과 실제 빛의 양은 비례하지 않아요', 'gamma: screen values are not proportional to light'], 'gx-s', 4);
  [0, 32, 64, 96, 128, 160, 192, 224, 255].forEach((v, i) => { px(S, 'g' + i, 1 + i * 3.3, 13.6, 3.1, 1.8, `rgb(${v},${v},${v})`, 4, { r: .2 }); T(S, 'gv' + i, 1 + i * 3.3, 15.6, String(v), 'cz-tc cz-mono gx-xs', 4, { w: 3.1 }); T(S, 'gl' + i, 1 + i * 3.3, 16.7, Math.round(100 * (v / 255) ** 2.2) + '%', 'cz-tc cz-mono gx-xs gx-w', 4, { w: 3.1 }); });
  T(S, 'g2', 1, 18, ['값 128은 빛의 약 22% → 조명·블렌딩은 선형 공간에서 계산해야 해요', 'value 128 is only about 22% of the light → do lighting and blending in linear space'], 'gx-xs gx-r', 4);
  T(S, 'n5', 1, 19.3, ['채널당 8비트 = 약 1,677만 색 · HDR은 10비트 이상 · 알파 채널은 투명도', '8 bits per channel ≈ 16.7 million colors · HDR uses 10+ bits · alpha holds transparency'], 'gx-xs', 5);
  S.cap(1, '화면의 색은 빨강·초록·파랑 빛의 세기 세 개', 'A screen color is three intensities: red, green and blue')
    .cap(2, '16진수 #RRGGBB로 적어요', 'Written in hex as #RRGGBB')
    .cap(3, '사람에게 편한 HSV: 색상환의 각도와 채도·명도', 'HSV suits people: an angle on the color wheel plus saturation and value')
    .cap(4, 'sRGB 값은 감마로 눌려 있어요', 'sRGB values are gamma-encoded')
    .cap(5, '색 공간과 감마', 'Color spaces and gamma');
  return S;
}
function sTransform() {
  const S = scene({ id: 'gx-transform', steps: 5, per: 1.4 });
  const F = pf(4, 14.6, 1.5, -2, 9, -1, 8), H = [[0, 0], [2, 0], [2, 1.5], [1, 2.5], [0, 1.5], [0, 0]], c = Math.cos(Math.PI / 6), s = Math.sin(Math.PI / 6);
  const Sc = p => [p[0] * 1.5, p[1] * 1.5], Ro = p => [c * p[0] - s * p[1], s * p[0] + c * p[1]], Tr = p => [p[0] + 4, p[1] + 1];
  grid(S, 'g', F, 0);
  const H1 = H.map(Sc), H2 = H1.map(Ro), H3 = H2.map(Tr), Alt = H.map(Sc).map(Tr).map(Ro);
  mpoly(S, 'h0', F, H, { color: 'ink-3', h: .14, dim: 2 }); mpoly(S, 'h1', F, H1, { st: 2, off: 3, color: 'warn', h: .16 }); mpoly(S, 'h2', F, H2, { st: 3, off: 4, color: 'ok', h: .16 }); mpoly(S, 'h3', F, H3, { st: 4, color: 'accent', h: .2 });
  mpoly(S, 'ha', F, Alt, { st: 5, color: 'danger', h: .14, dash: 1 });
  T(S, 'm1', 19.4, 2.4, 'S = [[1.5, 0], [0, 1.5]]', 'cz-mono gx-xs gx-w', 2);
  T(S, 'm2', 19.4, 4, 'R = [[cos θ, −sin θ], [sin θ, cos θ]]', 'cz-mono gx-xs gx-g', 3); T(S, 'm2b', 19.4, 5.2, ['θ = 30°, 원점 기준 회전', 'θ = 30°, about the origin'], 'gx-xs', 3);
  T(S, 'm3', 19.4, 7, ['이동은 2×2 행렬로 안 돼서', 'translation does not fit a 2×2'], 'gx-xs', 4); T(S, 'm3b', 19.4, 8.2, ['3×3 동차 좌표 (x, y, 1)', 'so use 3×3 homogeneous (x, y, 1)'], 'gx-xs', 4);
  T(S, 'm3c', 19.4, 9.6, 'T = [[1, 0, 4], [0, 1, 1], [0, 0, 1]]', 'cz-mono gx-xs gx-a', 4); T(S, 'm4', 19.4, 11.2, 'M = T · R · S', 'cz-mono gx-l gx-a', 4);
  T(S, 'm5', 19.4, 13, ['오른쪽부터 적용 · 순서를 바꾸면', 'applied right to left · swap the order'], 'gx-xs gx-r', 5); T(S, 'm5b', 19.4, 14.2, ['R · T · S → 빨간 점선 위치', 'R · T · S → the red dashed spot'], 'cz-mono gx-xs gx-r', 5);
  T(S, 'n5', 1, 17.6, ['여러 변환을 행렬 곱 하나로 합쳐 모든 점에 한 번에 적용 · CSS transform, SVG, 게임 엔진의 Transform이 모두 이 방식', 'one matrix product applies every transform to every point · how CSS, SVG and game engines do it'], 'gx-xs', 5);
  S.cap(1, '집 모양 도형의 꼭짓점들', 'The corners of a house shape')
    .cap(2, '크기 변환 행렬을 곱하면 1.5배', 'A scale matrix makes it 1.5× bigger')
    .cap(3, '회전 행렬을 곱하면 30° 회전', 'A rotation matrix turns it 30°')
    .cap(4, '이동까지 하려면 3×3 동차 좌표를 써요', 'Translation needs 3×3 homogeneous coordinates')
    .cap(5, '행렬 곱의 순서가 결과를 바꿔요', 'The order of multiplication changes the result');
  return S;
}
function sMvp() {
  const S = scene({ id: 'gx-mvp', steps: 5, per: 1.4 });
  const B = [['모델 좌표', 'model space', ['물체 자신의 원점', 'the object’s own origin']], ['월드 좌표', 'world space', ['장면 전체 기준', 'the whole scene']], ['카메라 좌표', 'view space', ['카메라가 원점, −z를 봄', 'camera at origin, looking −z']], ['클립 좌표', 'clip space', ['원근 적용, (x, y, z, w)', 'perspective applied, (x, y, z, w)']], ['NDC', 'NDC', ['÷ w → −1 ~ 1 정육면체', '÷ w → a −1…1 cube']], ['화면 픽셀', 'screen pixels', ['1920 × 1080 같은 좌표', 'e.g. 1920 × 1080']]];
  const M = ['Model', 'View', 'Projection', '÷ w', 'Viewport'], st = [1, 1, 2, 3, 4, 4];
  B.forEach(([k, e, d], i) => { const r = Math.floor(i / 3), cI = r ? 2 - i % 3 : i % 3, x = 1 + cI * 10.6, y = 2.4 + r * 7; box(S, 'b' + i, x, y, 8.4, 2.2, [k, e], ['accent', 'warn', 'ok', 'danger', 'ink-3', 'accent'][i], st[i]); T(S, 'd' + i, x, y + 2.5, d, 'cz-tc gx-xs', st[i], { w: 8.4 }); });
  [[9.5, 3.5, 11.5, 3.5], [20.1, 3.5, 22.1, 3.5], [26.2, 6.0, 26.2, 9.3], [22.1, 10.5, 20.1, 10.5], [11.5, 10.5, 9.5, 10.5]].forEach(([a, b, c, d], i) => { ar(S, 'a' + i, [a, b], [c, d], 'ink-3', [1, 2, 3, 4, 4][i], { h: .12 }); T(S, 'm' + i, i === 2 ? 21.2 : (a + c) / 2 - 2, (b + d) / 2 - 1.3 + (i === 2 ? 1 : 0), M[i], 'cz-tc cz-mono gx-xs gx-a', [1, 2, 3, 4, 4][i], { w: 4 }); });
  T(S, 'n1', 1, 15, ['정점 셰이더: gl_Position = P · V · M · 정점', 'vertex shader: gl_Position = P · V · M · vertex'], 'cz-mono gx-s', 5);
  T(S, 'n2', 1, 16.6, ['행렬 셋을 미리 곱해 두면 정점마다 행렬 곱 한 번 · 카메라를 움직이면 V만 바뀌어요', 'premultiply the three and each vertex needs one product · moving the camera changes only V'], 'gx-xs', 5);
  T(S, 'n3', 1, 17.8, ['NDC 밖은 잘라내고(클리핑), z는 깊이 버퍼로 가요', 'anything outside NDC is clipped, and z goes to the depth buffer'], 'gx-xs', 5);
  S.cap(1, '모델 행렬이 물체를 장면 안 제자리에 놓아요', 'The model matrix places an object in the scene')
    .cap(2, '뷰 행렬은 카메라 기준으로 다시 봐요', 'The view matrix re-expresses everything relative to the camera')
    .cap(3, '투영 행렬이 원근을 담아요', 'The projection matrix bakes in perspective')
    .cap(4, 'w로 나누고 화면 크기에 맞춰 픽셀 좌표로', 'Divide by w and scale to pixel coordinates')
    .cap(5, '좌표 변환 파이프라인 (MVP)', 'The coordinate pipeline (MVP)');
  return S;
}
function sPersp() {
  const S = scene({ id: 'gx-persp', steps: 5, per: 1.4 });
  const E = [2, 10], NX = 9, G = 12.6;
  pt(S, 'eye', E[0], E[1], 0, C.cur, .45); T(S, 'el', .8, 11, ['눈', 'eye'], 'gx-xs');
  hl(S, 'gr', 1, 31, G, 'ink-3', 0, { w: .08 });
  vl(S, 'np', NX, 4, 15.4, 'accent', 1, { w: .14 }); T(S, 'npl', NX - 2, 2.6, ['투영면 (near)', 'near plane'], 'cz-tc gx-xs gx-a', 1, { w: 4 });
  [[14, 'warn'], [26, 'ok']].forEach(([x, c], i) => { px(S, 'o' + i, x - .3, G - 4, .6, 4, `var(--${c})`, 0, { r: .1 });
    const top = [x, G - 4], bot = [x, G], yt = E[1] + (top[1] - E[1]) * (NX - E[0]) / (x - E[0]), yb = E[1] + (bot[1] - E[1]) * (NX - E[0]) / (x - E[0]);
    seg(S, 'r' + i + 't', E, top, 2, c, .06); seg(S, 'r' + i + 'b', E, bot, 2, c, .06); px(S, 'pj' + i, NX - .3 + (i ? .45 : -.45), yt, .6, yb - yt, `var(--${c})`, 3, { r: .1 });
    T(S, 'ph' + i, NX + (i ? 1 : -4), i ? (yt + yb) / 2 - .5 : yb + .3, (4 * (NX - E[0]) / (x - E[0])).toFixed(2), 'cz-mono gx-xs ' + (i ? 'gx-g' : 'gx-w'), 3); T(S, 'z' + i, x - 1, G + .3, 'z = ' + (x - E[0]), 'cz-tc cz-mono gx-xs', 1, { w: 2.4 }); });
  T(S, 'f', 15, 2, "y' = y · n / z", 'cz-mono gx-l', 3); T(S, 'f2', 15, 3.6, ['두 배 멀면 절반 크기', 'twice as far → half the size'], 'gx-xs', 3);
  seg(S, 'fu', E, [31, E[1] - 9], 4, 'ink-3', .08, { dash: 1 }); seg(S, 'fd', E, [31, E[1] + 7], 4, 'ink-3', .08, { dash: 1 }); vl(S, 'fp', 30.6, E[1] - 8.7, E[1] + 6.8, 'danger', 4, { w: .12 });
  T(S, 'fpl', 24.4, 16.2, ['far 평면', 'far plane'], 'gx-xs gx-r', 4); T(S, 'fpl2', 20.4, 17.4, ['사이가 시야 절두체', 'in between: the view frustum'], 'gx-xs gx-r', 4);
  T(S, 'n5', 1, 17.4, ['GPU는 투영 행렬로 w = z를 만들고 x/w, y/w로 나눠요', 'the GPU sets w = z via the projection matrix and divides x/w, y/w'], 'gx-xs', 5);
  T(S, 'n6', 1, 18.6, ['평행 투영(직교)은 나누지 않아 크기가 일정: CAD, 2D UI', 'orthographic projection skips the divide, keeping sizes constant: CAD, 2D UI'], 'gx-xs', 5);
  S.cap(1, '같은 높이의 기둥 두 개가 서로 다른 거리에 있어요', 'Two posts of equal height stand at different distances')
    .cap(2, '눈으로 들어오는 빛이 투영면을 지나는 곳에 그려요', 'Each is drawn where its rays cross the near plane')
    .cap(3, '거리로 나누니 멀수록 작아요', 'Dividing by distance makes far things small')
    .cap(4, 'near와 far 사이만 그려요 (절두체)', 'Only what lies between near and far is drawn (the frustum)')
    .cap(5, '원근 투영', 'Perspective projection');
  return S;
}
function sSlerp() {
  const S = scene({ id: 'gx-slerp', steps: 5, per: 1.4 });
  const cx = 9, cy = 10, R = 6.4, a0 = 10 * Math.PI / 180, a1 = 150 * Math.PI / 180, P = a => [cx + R * Math.cos(a), cy - R * Math.sin(a)];
  ring(S, 'c', cx, cy, R, 'line', 0, { w: .1 }); ar(S, 'A', [cx, cy], P(a0), 'accent', 0, { h: .16 }); ar(S, 'B', [cx, cy], P(a1), 'warn', 0, { h: .16 });
  T(S, 'Al', P(a0)[0] + .3, P(a0)[1] - .4, 'A', 'cz-mono gx-l gx-a'); T(S, 'Bl', P(a1)[0] - 1.4, P(a1)[1] - .6, 'B', 'cz-mono gx-l gx-w');
  seg(S, 'ch', P(a0), P(a1), 2, 'ink-3', .08, { dash: 1 });
  const ts = [.125, .25, .375, .5, .625, .75, .875];
  ts.forEach((t, i) => { const A = P(a0), B = P(a1), q = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]; pt(S, 'l' + i, q[0], q[1], 2, C.badf, .18);
    const d = Math.hypot(q[0] - cx, q[1] - cy), p = [cx + (q[0] - cx) / d * R, cy + (q[1] - cy) / d * R]; pt(S, 'n' + i, p[0], p[1], 3, C.badf, .26, { off: 4 }); seg(S, 'nl' + i, [cx, cy], p, 3, 'danger', .05, { off: 4 });
    const s = a0 + (a1 - a0) * t, sp = P(s); pt(S, 's' + i, sp[0], sp[1], 4, C.okf, .26); seg(S, 'sl' + i, [cx, cy], sp, 4, 'ok', .05); });
  T(S, 't2', 18, 2.4, ['선형 보간(lerp): 끝점을 직선으로 섞기', 'lerp: blend the endpoints along a straight line'], 'gx-xs', 2);
  T(S, 't3', 18, 3.8, ['원 위로 올리면 가운데가 빨라요 (간격 불균일)', 'pushed back onto the circle, the middle speeds up'], 'gx-xs gx-r', 3);
  T(S, 't4', 18, 5.2, ['구면 선형 보간(slerp): 같은 각도씩', 'slerp: equal angle per step'], 'gx-xs gx-g', 4);
  T(S, 't5', 18, 7.6, ['오일러 각(x·y·z 회전)은 두 축이 겹치면', 'Euler angles (x, y, z) lose a degree of'], 'gx-xs', 5); T(S, 't5b', 18, 8.8, ['한 방향을 잃어요 (짐벌 락)', 'freedom when two axes align (gimbal lock)'], 'gx-xs', 5);
  T(S, 't5c', 18, 10.4, ['3D 회전은 쿼터니언(숫자 4개)으로 저장하고', '3D rotations are stored as quaternions'], 'gx-xs gx-a', 5); T(S, 't5d', 18, 11.6, ['slerp로 부드럽게 보간해요', '(four numbers) and blended with slerp'], 'gx-xs gx-a', 5);
  T(S, 't5e', 18, 13.2, ['유니티·언리얼 Transform, 애니메이션 블렌딩', 'Unity and Unreal transforms, animation blending'], 'gx-xs', 5);
  S.cap(1, '방향 A에서 B로 부드럽게 돌리고 싶어요', 'We want to turn smoothly from orientation A to B')
    .cap(2, '끝점을 그냥 섞으면 원 안쪽의 직선을 따라가고', 'Blending the endpoints follows the chord inside the circle')
    .cap(3, '길이를 맞춰도 속도가 고르지 않아요', 'Normalizing still gives uneven speed')
    .cap(4, '각도를 고르게 나누는 slerp가 정답', 'Slerp splits the angle evenly')
    .cap(5, '회전 보간과 쿼터니언', 'Interpolating rotations and quaternions');
  return S;
}

/* ================= rasterization ================= */
function sBresenham() {
  const S = scene({ id: 'gx-line', steps: 5, per: 1.4 });
  const cs = 2, X0 = 3, Y0 = 15, N = 13, M = 6, X = i => X0 + i * cs, Y = j => Y0 - (j + 1) * cs;
  gridbg(S, 'g', X0, Y0 - M * cs, N * cs, M * cs, cs, 0);
  const pts = []; let x0 = 0, y0 = 0, x1 = 12, y1 = 5, dx = x1 - x0, dy = y1 - y0, err = 2 * dy - dx, y = y0; const errs = [];
  for (let x = x0; x <= x1; x++) { pts.push([x, y]); errs.push(err); if (err > 0) { y++; err -= 2 * dx; } err += 2 * dy; }
  pts.forEach(([x, y], i) => px(S, 'p' + i, X(x) + .05, Y(y) + .05, cs - .1, cs - .1, 'var(--accent)', i < 4 ? 2 : 3, { css: 'opacity:.75' }));
  seg(S, 'ln', [X(0) + 1, Y(0) + 1], [X(12) + 1, Y(5) + 1], 1, 'danger', .1);
  T(S, 'e', 1, 16.2, ['x를 한 칸씩 늘리며 오차를 더하고, 오차가 넘치면 y도 한 칸 → 정수 덧셈만으로', 'step x by one, add to an error term, and bump y when it overflows → integer additions only'], 'gx-xs', 4);
  T(S, 'e2', 1, 17.4, 'err: ' + errs.join(' '), 'cz-mono gx-xs gx-w', 4);
  T(S, 'n5', 1, 18.8, ['1962년 브레젠험 알고리즘 · 부드러운 선은 우(Wu)의 안티앨리어싱 선 · GPU는 삼각형처럼 픽셀 단위로 판정', 'Bresenham’s 1962 algorithm · smooth lines use Wu’s antialiased variant · GPUs test pixels as they do for triangles'], 'gx-xs', 5);
  S.cap(1, '(0, 0)에서 (12, 5)까지 직선을 픽셀로 그려야 해요', 'Draw a line from (0, 0) to (12, 5) in pixels')
    .cap(2, '열마다 직선에 가장 가까운 픽셀 하나를 골라요', 'Pick the pixel nearest the line in each column')
    .cap(3, '계단처럼 이어진 픽셀이 직선을 이뤄요', 'The staircase of pixels forms the line')
    .cap(4, '곱셈·나눗셈 없이 오차 누적만으로 결정', 'Decided by accumulating an error, no multiply or divide')
    .cap(5, '브레젠험 선 그리기', 'Bresenham’s line algorithm');
  return S;
}
function sTriangle() {
  const S = scene({ id: 'gx-tri', steps: 5, per: 1.4 });
  const cs = 1.35, X0 = 1.6, Y0 = 2, N = 14, M = 11, V = [[1, 1], [13, 3.4], [4.4, 10.4]], C3 = [[229, 72, 77], [48, 164, 108], [62, 99, 221]];
  gridbg(S, 'g', X0, Y0, N * cs, M * cs, cs, 0);
  const E = (a, b, p) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]), area = E(V[0], V[1], V[2]);
  for (let j = 0; j < M; j++) for (let i = 0; i < N; i++) { const p = [i + .5, j + .5], w0 = E(V[1], V[2], p) / area, w1 = E(V[2], V[0], p) / area, w2 = E(V[0], V[1], p) / area;
    if (w0 >= 0 && w1 >= 0 && w2 >= 0) { const c = [0, 1, 2].map(k => w0 * C3[0][k] + w1 * C3[1][k] + w2 * C3[2][k]); px(S, `f${i}_${j}`, X0 + i * cs + .04, Y0 + j * cs + .04, cs - .08, cs - .08, 'var(--accent)', 3, { off: 4, css: 'opacity:.55' }); px(S, `c${i}_${j}`, X0 + i * cs + .04, Y0 + j * cs + .04, cs - .08, cs - .08, rgb(...c), 4); } }
  const SV = V.map(([x, y]) => [X0 + x * cs, Y0 + y * cs]); [[0, 1], [1, 2], [2, 0]].forEach(([a, b], i) => seg(S, 'e' + i, SV[a], SV[b], 1, 'ink', .1));
  SV.forEach(([x, y], i) => pt(S, 'v' + i, x, y, 1, { background: rgb(...C3[i]), 'border-color': rgb(...C3[i]) }, .35));
  for (let j = 0; j < M; j++) for (let i = 0; i < N; i++) if (i % 2 === 0 && j % 2 === 0) pt(S, `s${i}_${j}`, X0 + (i + .5) * cs, Y0 + (j + .5) * cs, 2, C.idle, .1, { off: 3 });
  T(S, 'n2', 21.4, 2.4, ['픽셀 중심마다 세 변의', 'test every pixel center against'], 'gx-xs', 2); T(S, 'n2b', 21.4, 3.6, ['“안쪽” 판정(변 함수)', 'the three edge functions'], 'gx-xs', 2);
  T(S, 'n3', 21.4, 5.2, ['셋 다 ≥ 0이면 칠하기', 'all three ≥ 0 → fill it'], 'gx-xs gx-a', 3);
  T(S, 'n4', 21.4, 7, ['무게중심 좌표(w₀, w₁, w₂)로', 'barycentric weights (w₀, w₁, w₂)'], 'gx-xs', 4); T(S, 'n4b', 21.4, 8.2, ['꼭짓점 색·UV·깊이를 섞어요', 'blend vertex colors, UVs, depth'], 'gx-xs gx-g', 4);
  T(S, 'n5', 1, 17.6, ['GPU는 이 판정을 수많은 픽셀에 동시에 해요 · 두 삼각형이 맞닿은 변은 “top-left 규칙”으로 한 번만 칠해요', 'GPUs run this test on huge numbers of pixels in parallel · shared edges are filled once by the top-left rule'], 'gx-xs', 5);
  S.cap(1, '세 꼭짓점이 화면 좌표로 정해졌어요', 'Three vertices land on screen coordinates')
    .cap(2, '감싸는 사각형 안의 픽셀 중심을 하나씩 검사해요', 'Test each pixel center inside the bounding box')
    .cap(3, '세 변 모두의 안쪽에 있는 픽셀만 칠해요', 'Fill the pixels inside all three edges')
    .cap(4, '꼭짓점 값을 거리 비율로 섞어 부드럽게 채워요', 'Blend vertex values by barycentric weights')
    .cap(5, '삼각형 래스터화', 'Triangle rasterization');
  return S;
}
function sZbuf() {
  const S = scene({ id: 'gx-zbuf', steps: 5, per: 1.4 });
  const N = 10, M = 6, cs = 1.6, X0 = 1.4, Y0 = 3, R = [['danger', 5, 1, 5, 1, 4, 1], ['accent', 3, 3, 8, 2, 5, 2], ['ok', 8, 0, 3, 0, 2, 3]];
  gridbg(S, 'g', X0, Y0, N * cs, M * cs, cs, 0); T(S, 'gh', X0, 1.6, ['색 버퍼', 'color buffer'], 'gx-xs');
  const col = [], dep = []; for (let j = 0; j < M; j++) { col.push(Array(N).fill(null)); dep.push(Array(N).fill(Infinity)); }
  R.forEach(([c, z, i0, i1, j0, j1, st]) => { for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) if (z < dep[j][i]) { dep[j][i] = z; if (col[j][i]) S.set(`p${i}_${j}`, st, { background: `var(--${c})` }); else px(S, `p${i}_${j}`, X0 + i * cs + .04, Y0 + j * cs + .04, cs - .08, cs - .08, `var(--${c})`, st, { css: 'opacity:.8' }); col[j][i] = c; } });
  const DX = 19.4; gridbg(S, 'dg', DX, Y0, N * 1.2, M * 1.2, 1.2, 4); T(S, 'dh', DX, 1.6, ['깊이 버퍼 (작을수록 가까움)', 'depth buffer (smaller = nearer)'], 'gx-xs', 4);
  for (let j = 0; j < M; j++) for (let i = 0; i < N; i++) T(S, `d${i}_${j}`, DX + i * 1.2, Y0 + j * 1.2 + .2, dep[j][i] === Infinity ? '∞' : String(dep[j][i]), 'cz-tc cz-mono gx-tiny', 4, { w: 1.2 });
  [['빨강 z = 5 먼저', 'red, z = 5, first', 'danger'], ['파랑 z = 3: 더 가까워 덮어써요', 'blue, z = 3: nearer, overwrites', 'accent'], ['초록 z = 8: 더 멀어 겹친 곳은 버려요', 'green, z = 8: farther, rejected where covered', 'ok']].forEach(([k, e, c], i) => T(S, 't' + i, 1.4, 13.4 + i * 1.3, [k, e], 'gx-xs gx-' + (c === 'danger' ? 'r' : c === 'ok' ? 'g' : 'a'), i + 1));
  T(S, 'n5', 1.4, 17.8, ['픽셀마다 지금까지 가장 가까운 깊이를 기억 → 그리는 순서와 상관없이 앞의 것이 보여요 · 반투명 물체는 뒤에서부터 정렬해 그려요', 'nearest depth per pixel → nearer wins in any order · translucent objects are sorted back to front'], 'gx-xs', 5);
  S.cap(1, '빨간 사각형을 먼저 그려요', 'Draw the red rectangle first')
    .cap(2, '파란 사각형이 더 가까우니 겹친 픽셀을 덮어써요', 'The blue one is nearer, so it overwrites the overlap')
    .cap(3, '초록은 나중에 그려도 더 멀어서 가려져요', 'Green comes last but is farther, so it stays hidden')
    .cap(4, '깊이 버퍼가 픽셀마다 가장 가까운 값을 기억해요', 'The depth buffer remembers the nearest value per pixel')
    .cap(5, 'Z-버퍼 (깊이 테스트)', 'The Z-buffer (depth test)');
  return S;
}
function sAa() {
  const S = scene({ id: 'gx-aa', steps: 5, per: 1.4 });
  const N = 10, M = 7, cs = 1.8, X0 = 1.4, Y0 = 2.4, line = x => 1.3 + x * .45, inside = (x, y) => y < line(x);
  gridbg(S, 'g', X0, Y0, N * cs, M * cs, cs, 0);
  for (let j = 0; j < M; j++) for (let i = 0; i < N; i++) { const yy = M - 1 - j; let cov = 0; for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) if (inside(i + (a + .5) / 4, yy + (b + .5) / 4)) cov++; cov /= 16;
    const x = X0 + i * cs + .04, y = Y0 + j * cs + .04; if (inside(i + .5, yy + .5)) px(S, `a${i}_${j}`, x, y, cs - .08, cs - .08, 'var(--accent)', 1, { off: 3 });
    if (cov > 0) px(S, `b${i}_${j}`, x, y, cs - .08, cs - .08, `color-mix(in srgb,var(--accent) ${Math.round(cov * 100)}%,var(--ui))`, 3);
    if (cov > 0 && cov < 1) [[.25, .25], [.75, .25], [.25, .75], [.75, .75]].forEach(([u, v], q) => pt(S, `s${i}_${j}_${q}`, X0 + (i + u) * cs, Y0 + (j + v) * cs, 2, inside(i + u, yy + 1 - v) ? C.okf : C.idle, .14, { off: 3 })); }
  seg(S, 'ln', [X0, Y0 + (M - line(0)) * cs], [X0 + N * cs, Y0 + (M - line(N)) * cs], 0, 'danger', .08);
  T(S, 'n1', 20.4, 2.6, ['픽셀 중심만 보면', 'testing only the center'], 'gx-xs', 1); T(S, 'n1b', 20.4, 3.8, ['계단처럼 들쭉날쭉', 'gives jagged stairs'], 'gx-xs gx-r', 1);
  T(S, 'n2', 20.4, 5.6, ['경계 픽셀에서 여러 점을', 'sample several points'], 'gx-xs', 2); T(S, 'n2b', 20.4, 6.8, ['샘플링 (초록 = 안쪽)', 'in edge pixels (green = inside)'], 'gx-xs gx-g', 2);
  T(S, 'n3', 20.4, 8.6, ['덮인 비율만큼 색을 섞으면', 'blend by covered fraction'], 'gx-xs', 3); T(S, 'n3b', 20.4, 9.8, ['경계가 부드러워요', 'for a smooth edge'], 'gx-xs gx-a', 3);
  T(S, 'n4', 1.4, 15.8, ['SSAA: 샘플마다 색 계산(비쌈) · MSAA: 덮임만 여러 번, 색은 한 번 · FXAA·TAA: 다 그린 뒤 화면을 보고 경계를 흐리기', 'SSAA shades every sample (costly) · MSAA shades once per pixel · FXAA/TAA blur edges afterwards'], 'gx-xs', 4);
  T(S, 'n5', 1.4, 17.4, ['원인은 표본화 부족(앨리어싱) · 글꼴 렌더링은 서브픽셀까지 써요 · DLSS 같은 업스케일링도 같은 문제를 다뤄요', 'the cause is undersampling (aliasing) · fonts use subpixels · upscalers like DLSS face it too'], 'gx-xs', 5);
  S.cap(1, '픽셀 중심 하나로만 판정하면 경계가 계단이 돼요', 'One sample per pixel makes stair-stepped edges')
    .cap(2, '경계 픽셀 안의 여러 지점을 검사하고', 'Check several points inside each edge pixel')
    .cap(3, '덮인 비율로 색을 섞으면 부드러워요', 'Blend by coverage and the edge smooths out')
    .cap(4, '비용에 따라 여러 방식이 있어요', 'Several methods trade quality for cost')
    .cap(5, '안티앨리어싱', 'Anti-aliasing');
  return S;
}
function sTexture() {
  const S = scene({ id: 'gx-texture', steps: 5, per: 1.4 });
  const n = 4, cs = 2, X0 = 2, Y0 = 3.6, C2 = ['var(--accent)', 'var(--warn)'];
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) px(S, `t${i}_${j}`, X0 + i * cs, Y0 + j * cs, cs, cs, C2[(i + j) % 2], 0, { r: 0, css: 'opacity:.75' });
  T(S, 'th', X0, 2, ['텍스처 (이미지)', 'texture (image)'], 'gx-xs');
  T(S, 'uv0', X0 - 1.2, Y0 + n * cs + .2, '(0, 0)', 'cz-mono gx-xs', 2); T(S, 'uv1', X0 + n * cs - 1.4, Y0 - 1.3, '(1, 1)', 'cz-mono gx-xs', 2); T(S, 'uvu', X0 + 3, Y0 + n * cs + .2, 'u →', 'cz-mono gx-xs', 2); T(S, 'uvv', X0 - 1.6, Y0 + 3, 'v ↑', 'cz-mono gx-xs', 2);
  const Q = [[17, 15.4], [30.6, 15.4], [27.4, 5], [20.4, 5]], map = (u, v) => { const b = [Q[0][0] + (Q[1][0] - Q[0][0]) * u, Q[0][1]], t = [Q[3][0] + (Q[2][0] - Q[3][0]) * u, Q[3][1]]; return [b[0] + (t[0] - b[0]) * v, b[1] + (t[1] - b[1]) * v]; };
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const u0 = i / n, u1 = (i + 1) / n, v0 = (n - 1 - j) / n, v1 = (n - j) / n; poly2(S, `q${i}_${j}`, [map(u0, v0), map(u1, v0), map(u1, v1), map(u0, v1)], `color-mix(in srgb,${C2[(i + j) % 2]} 75%,var(--ui))`, 3); }
  [[0, 0], [1, 0], [1, 1], [0, 1]].forEach(([u, v], i) => { const p = map(u, v); pt(S, 'qv' + i, p[0], p[1], 2, C.cur, .3); T(S, 'ql' + i, p[0] + (u ? -.6 : -2.6), p[1] + (v ? -1.4 : .4), `(${u}, ${v})`, 'cz-mono gx-xs gx-a', 2); });
  const sp = map(.6, .3); pt(S, 'sp', sp[0], sp[1], 4, C.badf, .3); ar(S, 'sa', [sp[0] - .4, sp[1]], [X0 + .6 * n * cs + .2, Y0 + (1 - .3) * n * cs], 'danger', 4, { h: .12 });
  T(S, 'n4', 1, 16.4, ['픽셀마다 보간한 (u, v)로 텍스처에서 색(텍셀)을 읽어요', 'each pixel reads a texel at its interpolated (u, v)'], 'gx-xs gx-r', 4);
  T(S, 'n5', 1, 17.7, ['원근 보정 보간 · 범위를 넘으면 반복(repeat)·끝값 유지(clamp) · 여러 이미지를 한 장에 모은 텍스처 아틀라스', 'perspective-correct interpolation · out-of-range UVs repeat or clamp · texture atlases pack many images into one'], 'gx-xs', 5);
  S.cap(1, '텍스처는 표면에 입힐 이미지예요', 'A texture is an image to wrap onto a surface')
    .cap(2, '꼭짓점마다 텍스처의 어느 지점인지 UV 좌표를 붙여요', 'Each vertex gets UV coordinates into the texture')
    .cap(3, '래스터화하며 UV를 보간해 이미지를 늘이고 기울여요', 'Rasterization interpolates UVs, stretching the image onto the shape')
    .cap(4, '픽셀마다 해당 UV의 색을 읽어 와요', 'Each pixel fetches the color at its UV')
    .cap(5, '텍스처 매핑', 'Texture mapping');
  return S;
}
function sMipmap() {
  const S = scene({ id: 'gx-mipmap', steps: 5, per: 1.4 });
  const L0 = (i, j) => ((i >> 1) + (j >> 1)) % 2 ? 'var(--ink)' : 'var(--ui)';
  for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) px(S, `a${i}_${j}`, 1 + i * .9, 2.4 + j * .9, .9, .9, L0(i, j), 0, { r: 0 });
  rect(S, 'af', 1, 2.4, 7.2, 7.2, 'line', 0, 0, { css: 'background:transparent;border:.06em solid var(--line)' });
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) px(S, `b${i}_${j}`, 9.4 + i * .9, 2.4 + j * .9, .9, .9, (i + j) % 2 ? 'var(--ink)' : 'var(--ui)', 2, { r: 0 });
  px(S, 'c', 13.6, 2.4, 1.8, 1.8, 'color-mix(in srgb,var(--ink) 50%,var(--ui))', 2, { r: 0 }); px(S, 'd', 16, 2.4, .9, .9, 'color-mix(in srgb,var(--ink) 50%,var(--ui))', 2, { r: 0 });
  ['256²', '128²', '64²', '32²'].forEach((t, i) => T(S, 'l' + i, [1, 9.4, 13.6, 16][i], 10, t, 'cz-mono gx-xs', i ? 2 : 0));
  T(S, 'mm', 1, 11.4, ['밉맵: 반씩 줄인 사본을 미리 만들어 둬요 (메모리 +33%)', 'mipmaps: prebuilt half-size copies (+33% memory)'], 'gx-xs', 2);
  const F = (u, v) => { const y = 3 + v * 9.6, half = 2.2 + v * 4.6, x = 24.8 + (u - .5) * 2 * half; return [x, y]; }, rows = 12, cols = 8;
  for (let j = 0; j < rows; j++) { const v0 = (j / rows) ** 1.6, v1 = ((j + 1) / rows) ** 1.6; for (let i = 0; i < cols; i++) { const u0 = i / cols, u1 = (i + 1) / cols; poly2(S, `f${i}_${j}`, [F(u0, v0), F(u1, v0), F(u1, v1), F(u0, v1)], (i + j) % 2 ? 'var(--ink)' : 'var(--ui)', 0); } }
  poly2(S, 'fog', [F(0, 0), F(1, 0), F(1, .18), F(0, .18)], 'color-mix(in srgb,var(--ink) 50%,var(--ui))', 4);
  T(S, 'fh', 19.6, 1.4, ['멀어지는 바닥', 'a receding floor'], 'gx-xs');
  T(S, 'n3', 1, 13.2, ['먼 곳은 한 픽셀에 텍셀 여러 개 → 반짝이고 물결무늬(모아레)', 'far away, many texels fall in one pixel → shimmer and moiré'], 'gx-xs gx-r', 3);
  T(S, 'n4', 1, 14.5, ['텍셀 ≈ 픽셀이 되는 단계의 밉맵을 골라 미리 평균한 색을 써요', 'pick the mip level where a texel ≈ a pixel and use its pre-averaged color'], 'gx-xs gx-g', 4);
  T(S, 'n5', 1, 16.2, ['쌍선형 필터(이웃 4텍셀) · 삼선형(두 밉 단계 사이도 섞기) · 비스듬히 볼 땐 비등방성 필터링', 'bilinear filtering (4 neighbors) · trilinear (blend between two mip levels) · anisotropic filtering for oblique views'], 'gx-xs', 5);
  S.cap(1, '원본 텍스처', 'The original texture')
    .cap(2, '해상도를 반씩 줄인 사본들을 미리 만들어요', 'Precompute copies at half resolution each step')
    .cap(3, '멀리 있는 바닥은 픽셀보다 텍셀이 촘촘해 깨져 보여요', 'A distant floor has more texels than pixels, so it breaks up')
    .cap(4, '거리에 맞는 작은 밉맵을 쓰면 차분해져요', 'Sampling the right small mip level calms it down')
    .cap(5, '밉맵과 텍스처 필터링', 'Mipmaps and texture filtering');
  return S;
}

/* ================= lighting & shading ================= */
const LT = nrm([-.5, .6, .62]), VW = [0, 0, 1], BASE = [62, 99, 221];
const lam = N => Math.max(0, dot3(N, LT)), refl = N => { const d = dot3(N, LT); return [2 * d * N[0] - LT[0], 2 * d * N[1] - LT[1], 2 * d * N[2] - LT[2]]; };
const phongC = (N, sh, amb = .1, ks = .9) => { const d = lam(N), sp = d > 0 ? Math.max(0, dot3(refl(N), VW)) ** sh : 0; return rgb(BASE[0] * (amb + (1 - amb) * d) + 255 * ks * sp, BASE[1] * (amb + (1 - amb) * d) + 255 * ks * sp, BASE[2] * (amb + (1 - amb) * d) + 255 * ks * sp); };

const ball = (S, k, cx, cy, R, bg, st, o = {}) => { S.el(k, { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, css: `border-radius:50%;background:${bg}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const B = (f, a = 1) => rgb(BASE[0] * f, BASE[1] * f, BASE[2] * f);
const gLam = amb => `radial-gradient(circle at 32% 30%, ${B(1)} 0%, ${B(.75 + amb * .1)} 25%, ${B(.4 + amb)} 50%, ${B(Math.max(amb, .04))} 74%, ${B(amb)} 100%)`;
const gPh = (hl, soft) => `radial-gradient(circle at 33% 29%, #fff 0%, #fff ${hl * .4}%, ${soft ? 'rgb(150,172,238)' : B(1.15)} ${hl}%, ${B(1)} ${hl + 14}%, ${B(.55)} 50%, ${B(.18)} 76%, ${B(.1)} 100%)`;
function vecDiag(S, k, x, y, ang, st, o = {}) { hl(S, k + 's', x - 4, x + 4, y, 'ink-3', 0, { w: .14 }); ar(S, k + 'n', [x, y], [x, y - 4], 'ok', 0, { h: .14 }); T(S, k + 'nl', x + .3, y - 4.6, 'N', 'cz-mono gx-s gx-g');
  ang.forEach(([a, st2, off], i) => { const r = a * Math.PI / 180; ar(S, k + 'l' + i, [x, y], [x - 4 * Math.sin(r), y - 4 * Math.cos(r)], 'warn', st2, { h: .14, off }); T(S, k + 'll' + i, x - 4.4 * Math.sin(r) - 1, y - 4.4 * Math.cos(r) - .6, 'L', 'cz-mono gx-s gx-w', st2, { off }); }); }
function sLambert() {
  const S = scene({ id: 'gx-lambert', steps: 5, per: 1.4 });
  vecDiag(S, 'v', 7, 8, [[0, 1, 2], [60, 2, 0]]);
  T(S, 'c1', 1, 10, ['θ = 0° → cos θ = 1.0 (가장 밝음)', 'θ = 0° → cos θ = 1.0 (brightest)'], 'cz-mono gx-xs', 1, { off: 2 }); T(S, 'c2', 1, 10, ['θ = 60° → cos θ = 0.5 (절반)', 'θ = 60° → cos θ = 0.5 (half)'], 'cz-mono gx-xs gx-w', 2);
  T(S, 'c3', 1, 11.4, ['θ ≥ 90° → 0 (빛이 뒤에서 옴)', 'θ ≥ 90° → 0 (light from behind)'], 'cz-mono gx-xs', 2);
  T(S, 'f', 1, 13.2, ['밝기 = max(0, N · L)', 'brightness = max(0, N · L)'], 'cz-mono gx-l', 3);
  ball(S, 'a', 23, 8.6, 6.4, gLam(0), 3, { off: 4 }); ball(S, 'b', 23, 8.6, 6.4, gLam(.15), 4);
  T(S, 'n4', 1, 15, ['빛이 안 닿는 쪽도 새카맣지 않게 주변광(ambient)을 조금 더해요', 'a little ambient light keeps the far side from going pitch black'], 'gx-xs', 4);
  T(S, 'n5', 1, 16.4, ['램버트 반사: 어느 방향에서 봐도 밝기가 같은 무광 표면 (종이, 분필, 흙) · 모든 조명 모델의 기본 항', 'Lambertian: matte, same brightness from any angle (paper, chalk, soil) · base of every model'], 'gx-xs', 5);
  S.cap(1, '표면에 수직인 법선 N과 빛의 방향 L', 'The surface normal N and the light direction L')
    .cap(2, '빛이 비스듬할수록 같은 넓이에 덜 닿아 어두워요', 'Slanted light spreads over more area, so it is dimmer')
    .cap(3, '구의 모든 점에서 N · L을 계산하면 입체감이 생겨요', 'Compute N · L at every point of a sphere and it looks round')
    .cap(4, '주변광을 더해 그림자 쪽도 살짝 보이게', 'Add ambient light so the shadow side shows')
    .cap(5, '확산 반사 (램버트 조명)', 'Diffuse reflection (Lambert lighting)');
  return S;
}
function sPhong() {
  const S = scene({ id: 'gx-phong', steps: 5, per: 1.4 });
  const x = 7, y = 8; hl(S, 'sf', x - 4.4, x + 4.4, y, 'ink-3', 0, { w: .14 }); ar(S, 'n', [x, y], [x, y - 4], 'ok', 0, { h: .14 }); T(S, 'nl', x + .3, y - 4.6, 'N', 'cz-mono gx-s gx-g');
  ar(S, 'l', [x, y], [x - 3.4, y - 3.4], 'warn', 0, { h: .14 }); T(S, 'll', x - 4.6, y - 4.4, 'L', 'cz-mono gx-s gx-w');
  ar(S, 'r', [x, y], [x + 3.4, y - 3.4], 'danger', 1, { h: .14 }); T(S, 'rl', x + 3.6, y - 4.4, 'R', 'cz-mono gx-s gx-r', 1);
  ar(S, 'v', [x, y], [x + 1.6, y - 4.2], 'accent', 1, { h: .14 }); T(S, 'vl', x + 1.6, y - 5, ['V (눈)', 'V (eye)'], 'cz-mono gx-xs gx-a', 1);
  ball(S, 'a', 23.4, 8, 6, gLam(.1), 1, { off: 2 }); ball(S, 'b', 23.4, 8, 6, gPh(6), 2, { off: 4 });
  T(S, 'f1', 1, 10.6, ['반사광 = (R · V)ⁿ', 'specular = (R · V)ⁿ'], 'cz-mono gx-l', 3); T(S, 'f2', 1, 12.2, ['블린-퐁: 중간 벡터 H = (L + V)/|L + V|, (N · H)ⁿ', 'Blinn–Phong: halfway H = (L + V)/|L + V|, (N · H)ⁿ'], 'cz-mono gx-xs', 3);
  T(S, 'f3', 1, 13.6, ['반사 방향 R이 눈 V와 가까울수록 밝은 하이라이트', 'the closer R is to the eye V, the brighter the highlight'], 'gx-xs', 3);
  ball(S, 'c', 19.6, 8, 3.6, gPh(16, 1), 4); ball(S, 'd', 27.6, 8, 3.6, gPh(2.5), 4);
  T(S, 'cl', 17, 12.4, 'n = 6', 'cz-tc cz-mono gx-xs', 4, { w: 5 }); T(S, 'dl', 25, 12.4, 'n = 128', 'cz-tc cz-mono gx-xs', 4, { w: 5 });
  T(S, 'n4', 17, 13.8, ['n이 클수록 작고 날카로운 하이라이트 (반짝이는 플라스틱 → 거울)', 'larger n → a smaller, sharper highlight (plastic → mirror)'], 'gx-xs', 4);
  T(S, 'n5', 1, 16.4, ['확산 + 반사 + 주변광 = 퐁 반사 모델 (1975) · 오랫동안 OpenGL 고정 파이프라인의 기본, 지금은 물리 기반(PBR)이 대세', 'diffuse + specular + ambient = Phong (1975) · old fixed-function OpenGL default, now mostly PBR'], 'gx-xs', 5);
  S.cap(1, '빛은 법선을 기준으로 거울처럼 R 방향으로 튕겨요', 'Light bounces off like a mirror in direction R')
    .cap(2, 'R이 눈을 향하는 곳에 반짝이는 하이라이트', 'Where R points at the eye, a highlight appears')
    .cap(3, '각도의 거듭제곱으로 하이라이트 크기를 정해요', 'A power of the angle sets the highlight size')
    .cap(4, '지수 n으로 재질의 매끈함을 표현', 'The exponent n expresses smoothness')
    .cap(5, '반사광 (퐁 조명 모델)', 'Specular light (the Phong model)');
  return S;
}
function sShading() {
  const S = scene({ id: 'gx-shading', steps: 5, per: 1.4 });
  const n = 14, R = 4.4, cx = [6, 16, 26], cy = 8;
  for (let r = 0; r < 4; r++) for (let a = 0; a < 12; a++) { const r0 = r / 4 * R, r1 = (r + 1) / 4 * R, a0 = a / 12 * 2 * Math.PI, a1 = (a + 1) / 12 * 2 * Math.PI, rm = (r + .5) / 4, am = (a + .5) / 12 * 2 * Math.PI, u = rm * Math.cos(am), v = rm * Math.sin(am), Nf = [u, -v, Math.sqrt(Math.max(0, 1 - u * u - v * v))];
    const P = t => [cx[0] + Math.cos(t[1]) * t[0], cy + Math.sin(t[1]) * t[0]]; poly2(S, `f${r}_${a}`, r ? [P([r0, a0]), P([r1, a0]), P([r1, a1]), P([r0, a1])] : [[cx[0], cy], P([r1, a0]), P([r1, a1])], phongC(Nf, 24), 1); }
  ball(S, 'g', cx[1], cy, R, gPh(16, 1), 2); ball(S, 'p', cx[2], cy, R, gPh(5), 3);
  [['플랫', 'flat'], ['고러드', 'Gouraud'], ['퐁', 'Phong']].forEach((t, i) => T(S, 't' + i, cx[i] - 3, 13, t, 'cz-tc gx-s', i + 1, { w: 6 }));
  [['면마다 한 번 계산 → 각진 면', 'once per face → faceted'], ['꼭짓점에서 계산해 보간 → 하이라이트가 뭉개짐', 'per vertex, then interpolated → smeared highlight'], ['법선을 보간해 픽셀마다 계산 → 매끈', 'interpolate normals, light per pixel → smooth']].forEach((t, i) => T(S, 'd' + i, 1, 14.6 + i * 1.3, t, 'gx-xs', i + 1));
  T(S, 'n4', 1, 18.4, ['계산량: 면 수 < 꼭짓점 수 < 픽셀 수 · 지금 GPU는 거의 모두 픽셀 단위(퐁 셰이딩)로 계산해요', 'cost: faces < vertices < pixels · modern GPUs light almost everything per pixel (Phong shading)'], 'gx-xs gx-g', 4);
  S.cap(1, '같은 거친 구도 면마다 색 하나면 각져 보여요', 'One color per face makes a coarse sphere look faceted')
    .cap(2, '꼭짓점 색을 섞으면 매끈하지만 하이라이트가 흐려요', 'Blending vertex colors smooths it but blurs the highlight')
    .cap(3, '법선을 섞어 픽셀마다 조명을 계산하면 둘 다 해결', 'Interpolating normals and lighting per pixel fixes both')
    .cap(4, '품질과 계산량의 맞바꿈', 'A trade between quality and cost')
    .cap(5, '셰이딩 방식 비교', 'Comparing shading methods');
  return S;
}
function sNormalmap() {
  const S = scene({ id: 'gx-normal', steps: 5, per: 1.4 });
  const N = 10, M = 7, cs = 1.38, h = (x, y) => Math.sin(x * 2.1) * Math.sin(y * 2.1), nmap = (i, j) => { const x = i + .5, y = j + .5, e = .01, dx = (h(x + e, y) - h(x - e, y)) / (2 * e), dy = (h(x, y + e) - h(x, y - e)) / (2 * e); return nrm([-dx * .6, dy * .6, 1]); };
  const grid2 = (k, X0, Y0, fn, st, off) => { for (let j = 0; j < M; j++) for (let i = 0; i < N; i++) px(S, `${k}${i}_${j}`, X0 + i * cs, Y0 + j * cs, cs + .01, cs + .01, fn(i, j), st, { r: 0, off }); };
  grid2('a', 1.4, 3, () => rgb(...BASE.map(c => c * (.15 + .85 * .62))), 1, 3); T(S, 'ah', 1.4, 1.6, ['평평한 사각형 (삼각형 2개)', 'a flat quad (two triangles)'], 'gx-xs', 1, { off: 3 });
  grid2('m', 17.4, 3, (i, j) => { const n = nmap(i, j); return rgb((n[0] + 1) * 127.5, (n[1] + 1) * 127.5, (n[2] + 1) * 127.5); }, 2); T(S, 'mh', 17.4, 1.6, ['노멀 맵 (RGB = 법선 xyz)', 'normal map (RGB = normal xyz)'], 'gx-xs', 2);
  const L1 = nrm([-.7, .3, .65]), L2 = nrm([.7, -.3, .65]);
  grid2('b', 1.4, 3, (i, j) => rgb(...BASE.map(c => c * (.15 + .85 * Math.max(0, dot3(nmap(i, j), L1))))), 3, 4); grid2('c', 1.4, 3, (i, j) => rgb(...BASE.map(c => c * (.15 + .85 * Math.max(0, dot3(nmap(i, j), L2))))), 4);
  T(S, 'bh', 1.4, 1.6, ['같은 사각형 + 노멀 맵 조명', 'the same quad lit with the normal map'], 'gx-xs gx-a', 3);
  ar(S, 'l1', [1, 13.6], [4, 12.2], 'warn', 3, { h: .14, off: 4 }); T(S, 'l1l', 4.4, 12, ['빛 ←', 'light ←'], 'gx-xs gx-w', 3, { off: 4 }); ar(S, 'l2', [15.6, 13.6], [12.6, 12.2], 'warn', 4, { h: .14 }); T(S, 'l2l', 9.6, 12, ['→ 빛', '→ light'], 'gx-xs gx-w', 4);
  T(S, 'n4', 17.4, 13, ['빛을 옮기면 음영도 따라 움직여요', 'move the light and the shading follows'], 'gx-xs', 4); T(S, 'n4b', 17.4, 14.2, ['(진짜 요철처럼)', '(just like real bumps)'], 'gx-xs', 4);
  T(S, 'n5', 1, 16.4, ['기하는 그대로, 픽셀마다 법선만 바꿔 세밀한 요철을 흉내 · 수백만 폴리곤 모델에서 구워 낸 맵을 저폴리 모델에 입혀요', 'same geometry, per-pixel normals fake fine bumps · baked from huge sculpts onto low-poly models'], 'gx-xs', 5);
  T(S, 'n6', 1, 17.7, ['옆에서 보면 윤곽은 평평해요 → 진짜 높이가 필요하면 시차 매핑·테셀레이션', 'silhouettes stay flat → use parallax mapping or tessellation for real height'], 'gx-xs gx-r', 5);
  S.cap(1, '평평한 면은 조명이 고르게 닿아 밋밋해요', 'A flat surface is lit evenly and looks plain')
    .cap(2, '노멀 맵은 픽셀마다 “기울어진 방향”을 색으로 저장해요', 'A normal map stores a tilt per pixel, encoded as color')
    .cap(3, '그 법선으로 조명하면 울퉁불퉁해 보여요', 'Lighting with those normals makes it look bumpy')
    .cap(4, '빛의 방향을 바꾸면 음영도 바뀌어요', 'Change the light direction and the shading responds')
    .cap(5, '노멀 매핑', 'Normal mapping');
  return S;
}
function sShadow() {
  const S = scene({ id: 'gx-shadow', steps: 5, per: 1.4 });
  const Lp = [3, 2], G = 14, box2 = [12, 9.6, 4, 4.4];
  hl(S, 'g', 1, 31, G, 'ink-3', 0, { w: .12 }); pt(S, 'lt', Lp[0], Lp[1], 0, C.warn, .6); T(S, 'ltl', Lp[0] + .8, Lp[1] - .6, ['빛', 'light'], 'gx-xs gx-w');
  rect(S, 'bx', box2[0], box2[1], box2[2], box2[3], 'accent', 40, 0, { r: .1 });
  const hitG = p => { const t = (G - Lp[1]) / (p[1] - Lp[1]); return Lp[0] + (p[0] - Lp[0]) * t; }, s0 = hitG([box2[0] + box2[2], box2[1]]), s1 = hitG([box2[0], box2[1]]);
  [[6, G], [10, G], [26, G], [29, G], [box2[0] + box2[2], box2[1]], [box2[0], box2[1]]].forEach((p, i) => seg(S, 'ray' + i, Lp, p, 2, 'warn', .06));
  const dP = Math.hypot(22 - Lp[0], G - Lp[1]), tB = (box2[1] - Lp[1]) / (G - Lp[1]), dB = tB * dP;
  T(S, 'dm', 17.4, 2.2, ['빛에서 본 깊이 지도 (가장 가까운 거리)', 'depth map from the light (nearest distance)'], 'gx-xs', 2);
  const D = [9.1, 10.4, 11.8, 13.1, 13.6, 14.2, 14.9, 15.5]; D.forEach((d, i) => box(S, 'd' + i, 17.4 + i * 1.7, 3.4, 1.62, 1.6, String(d), i >= 3 && i <= 5 ? 'accent' : 'line', 2, { pct: 30 }));
  pt(S, 'P', 22, G, 3, C.badf, .35); T(S, 'Pl', 21.6, G + .5, 'P', 'cz-mono gx-s gx-r', 3);
  seg(S, 'pr', Lp, [22, G], 3, 'danger', .08, { dash: 1 });
  T(S, 'pc', 17.4, 6, [`P까지 거리 ${dP.toFixed(1)} > 지도 값 ${dB.toFixed(1)}`, `distance to P ${dP.toFixed(1)} > map value ${dB.toFixed(1)}`], 'cz-mono gx-xs gx-r', 3); T(S, 'pc2', 17.4, 7.2, ['→ 무언가 가로막음 = 그림자', '→ something is in the way = shadow'], 'gx-xs gx-r', 3);
  px(S, 'sh', s1 > box2[0] ? box2[0] + box2[2] : s1, G - .25, s0 - (box2[0] + box2[2]), .5, 'color-mix(in srgb,var(--ink) 55%,transparent)', 4, { r: .2 });
  T(S, 'n5', 1, 16.4, ['1단계: 빛 위치에서 깊이만 렌더 · 2단계: 화면을 그리며 각 점의 빛까지 거리를 지도와 비교', 'pass 1: render depth from the light · pass 2: while drawing, compare each point’s light distance with the map'], 'gx-xs', 5);
  T(S, 'n6', 1, 17.7, ['오차로 생기는 줄무늬(shadow acne)는 바이어스로, 각진 경계는 PCF로 부드럽게, 넓은 장면은 캐스케이드 섀도 맵', 'shadow acne needs a bias · PCF softens edges · cascaded shadow maps cover large scenes'], 'gx-xs', 5);
  S.cap(1, '빛과 물체, 바닥이 있는 장면', 'A scene with a light, an object and a floor')
    .cap(2, '먼저 빛의 위치에서 본 가장 가까운 거리를 지도로 저장해요', 'First record, from the light, the nearest distance in each direction')
    .cap(3, '어떤 점이 지도보다 멀면 그 앞에 뭔가 있는 것', 'A point farther than the map value must be blocked')
    .cap(4, '그 점들이 그림자가 돼요', 'Those points end up in shadow')
    .cap(5, '그림자 매핑', 'Shadow mapping');
  return S;
}
function sPbr() {
  const S = scene({ id: 'gx-pbr', steps: 5, per: 1.4 });
  const H = nrm([LT[0] + VW[0], LT[1] + VW[1], LT[2] + VW[2]]), rough = [.05, .25, .5, .75, 1];
  const shade = (N, alb, metal, r) => { const d = Math.max(0, dot3(N, LT)), sh = Math.max(2, 2 / Math.max(r * r, .002) - 2), nh = Math.max(0, dot3(N, H)), F0 = metal ? alb.map(c => c / 255) : [.04, .04, .04], vn = Math.max(0, dot3(N, VW)), fr = (1 - vn) ** 5;
    const F = F0.map(f => f + (1 - f) * fr * (1 - r) * .6), spec = (sh + 8) / 8 * nh ** sh * d * .6; return rgb(...[0, 1, 2].map(k => (metal ? 0 : alb[k] * (.12 + .88 * d) * (1 - F[k])) + (metal ? alb[k] * .08 : 0) + 255 * F[k] * spec + (metal ? alb[k] * F[k] * d * .5 : 0))); };
  const pg = (alb, metal, r) => { const hl = 2 + r * 26, pk = Math.round(255 * (metal ? 1 : .9) * (1 - r * .75)), mix = (c, f) => cl(c * f), A = alb, top = metal ? `rgb(${mix(255 * .6 + A[0] * .4, 1 - r * .5)},${mix(255 * .6 + A[1] * .4, 1 - r * .5)},${mix(255 * .6 + A[2] * .4, 1 - r * .5)})` : `rgb(${pk},${pk},${pk})`;
    const d = metal ? .25 : 1; return `radial-gradient(circle at 33% 29%, ${top} 0%, ${top} ${hl * .3}%, rgb(${mix(A[0], d)},${mix(A[1], d)},${mix(A[2], d)}) ${hl + 8}%, rgb(${mix(A[0], d * .55)},${mix(A[1], d * .55)},${mix(A[2], d * .55)}) 52%, rgb(${mix(A[0], d * .2)},${mix(A[1], d * .2)},${mix(A[2], d * .2)}) 80%, rgb(${mix(A[0], .3)},${mix(A[1], .3)},${mix(A[2], .3)}) 100%)`; };
  rough.forEach((r, i) => { ball(S, 'a' + i, 4 + i * 6, 5, 2.5, pg([200, 60, 60], 0, r), 1); ball(S, 'b' + i, 4 + i * 6, 11.6, 2.5, pg([230, 180, 80], 1, r), 2); T(S, 'r' + i, 1.5 + i * 6, 14.4, r.toFixed(2), 'cz-tc cz-mono gx-xs', 1, { w: 5 }); });
  T(S, 'ra', 1, 1, ['거칠기 →', 'roughness →'], 'gx-xs', 1); T(S, 'ml', 22.4, 1, ['위: 비금속 · 아래: 금속', 'top: dielectric · bottom: metal'], 'gx-xs', 2);
  T(S, 'n1', 1, 15.8, ['비금속: 색은 확산에서, 반사는 약하고 흰색 (약 4%)', 'dielectrics: color from diffuse, weak white reflection (~4%)'], 'gx-xs', 1);
  T(S, 'n2', 1, 17, ['금속: 확산이 없고 반사가 금속의 색을 띠어요', 'metals: no diffuse, and reflections take the metal’s color'], 'gx-xs gx-w', 2);
  T(S, 'n3', 1, 18.2, ['거칠수록 하이라이트가 넓고 어두워져요 (빛의 총량 보존) · 비스듬한 각도일수록 반사가 강해져요 (프레넬)', 'rougher means wider, dimmer highlights (energy conservation) · grazing angles reflect more (Fresnel)'], 'gx-xs', 3);
  T(S, 'n5', 1, 19.4, ['재질 값(색·금속성·거칠기)만 정하면 어떤 조명에서도 그럴듯 · 언리얼·유니티·블렌더·glTF의 표준', 'set color, metalness and roughness and it looks right under any light · standard in Unreal, Unity, Blender and glTF'], 'gx-xs gx-g', 5);
  S.cap(1, '같은 빨간 플라스틱도 거칠기에 따라 달라 보여요', 'The same red plastic changes with roughness')
    .cap(2, '금속은 반사가 자기 색을 띠어요', 'Metals tint their reflections')
    .cap(3, '물리 법칙(에너지 보존, 프레넬)을 따르도록 계산해요', 'The math follows physics: energy conservation and Fresnel')
    .cap(4, '아티스트는 직관적인 값 몇 개만 정해요', 'Artists set just a few intuitive values')
    .cap(5, '물리 기반 렌더링 (PBR)', 'Physically based rendering (PBR)');
  return S;
}

/* ================= the GPU pipeline ================= */
function sPipeline() {
  const S = scene({ id: 'gx-pipeline', steps: 5, per: 1.4 });
  const St = [[['정점 데이터', 'vertex data'], 'line', 0, 0], [['정점 셰이더', 'vertex shader'], 'accent', 1, 1], [['조립·클리핑', 'assembly, clipping'], 'line', 2, 0], [['래스터화', 'rasterization'], 'line', 2, 0], [['프래그먼트 셰이더', 'fragment shader'], 'accent', 3, 1], [['깊이·블렌딩', 'depth, blending'], 'line', 4, 0], [['프레임 버퍼', 'framebuffer'], 'ok', 4, 0]];
  St.forEach(([t, c, st, prog], i) => { const r = i < 4 ? 0 : 1, ci = r ? 6 - i : i, x = 1 + ci * 7.8, y = 2.4 + r * 6.6; box(S, 's' + i, x, y, 6.8, 2.6, t, c, st, { pct: prog ? 40 : 25 }); if (prog) T(S, 'pg' + i, x, y + 2.8, ['프로그래밍 가능', 'programmable'], 'cz-tc gx-xs gx-a', st, { w: 6.8 }); });
  [[7.9, 3.7, 8.9, 3.7, 1], [15.7, 3.7, 16.7, 3.7, 2], [23.5, 3.7, 24.5, 3.7, 2], [27.4, 5.1, 27.4, 8.9, 3], [24.5, 10.3, 23.5, 10.3, 4], [16.7, 10.3, 15.7, 10.3, 4]].forEach(([a, b, c, d, st], i) => ar(S, 'a' + i, [a, b], [c, d], 'ink-3', st, { h: .12 }));
  T(S, 'c1', 1, 14.4, ['정점 3개 → 변환된 정점 3개', '3 vertices → 3 transformed vertices'], 'cz-mono gx-xs', 1);
  T(S, 'c2', 1, 15.6, ['→ 삼각형 1개 → 픽셀 조각(fragment) 약 900개', '→ 1 triangle → about 900 fragments'], 'cz-mono gx-xs', 2);
  T(S, 'c3', 1, 16.8, ['→ 조각마다 색 계산 (텍스처, 조명)', '→ a color per fragment (textures, lighting)'], 'cz-mono gx-xs', 3);
  T(S, 'c4', 1, 18, ['→ 깊이 테스트·반투명 섞기 후 화면에', '→ depth test and blending, then the screen'], 'cz-mono gx-xs', 4);
  T(S, 'n5', 17, 14.4, ['파란 단계만 우리가 짜는 셰이더', 'only the blue stages are shaders you write'], 'gx-xs gx-a', 5); T(S, 'n5b', 17, 15.6, ['(GLSL, HLSL, WGSL, Metal)', '(GLSL, HLSL, WGSL, Metal)'], 'cz-mono gx-xs', 5);
  T(S, 'n5c', 17, 16.8, ['나머지는 GPU 하드웨어가 처리', 'the rest is fixed GPU hardware'], 'gx-xs', 5); T(S, 'n5d', 17, 18, ['API: OpenGL·Vulkan·DirectX·Metal·WebGPU', 'APIs: OpenGL, Vulkan, DirectX, Metal, WebGPU'], 'gx-xs', 5);
  S.cap(1, '정점 셰이더가 각 꼭짓점을 화면 위치로 옮기고', 'The vertex shader moves each vertex to its screen position')
    .cap(2, '삼각형으로 묶어 화면 밖은 자르고 픽셀 조각으로 쪼개요', 'Triangles are assembled, clipped and broken into fragments')
    .cap(3, '프래그먼트 셰이더가 조각마다 색을 계산해요', 'The fragment shader computes a color per fragment')
    .cap(4, '깊이 검사와 블렌딩을 거쳐 프레임 버퍼에', 'After depth testing and blending, it reaches the framebuffer')
    .cap(5, '그래픽스 파이프라인', 'The graphics pipeline');
  return S;
}
function sShader() {
  const S = scene({ id: 'gx-shader', steps: 5, per: 1.4 });
  const L = ['// 픽셀마다 따로 실행', 'vec2 p = uv - 0.5;', 'float d = length(p);', 'if (d < 0.3)', '  color = vec3(1.0 - d * 2.0, 0.4, 0.8);', 'else', '  color = vec3(0.1);'];
  rect(S, 'cb', 1, 1.4, 15, L.length * 1.2 + .7, 'ink', 7, 0, { r: .4 }); L.forEach((l, i) => T(S, 'l' + i, 1.4, 1.75 + i * 1.2, i ? l : ['// 픽셀마다 따로 실행', '// runs separately per pixel'], 'cz-mono gx-code', 0, { css: 'z-index:6' }));
  const n = 12, cs = 1.04, X0 = 18.6, Y0 = 1.4;
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const u = (i + .5) / n - .5, v = (j + .5) / n - .5, d = Math.hypot(u, v); px(S, `p${i}_${j}`, X0 + i * cs, Y0 + j * cs, cs + .01, cs + .01, d < .3 ? rgb(255 * (1 - d * 2), 102, 204) : rgb(26, 26, 26), 1, { r: 0 }); }
  rect(S, 'wp', X0 - .1, Y0 + 6 * cs - .1, n * cs + .2, 2 * cs + .2, 'warn', 0, 3, { css: 'background:transparent;border:.18em solid var(--warn)', off: 5 });
  T(S, 'n2', 1, 11, ['16 × 16 = 256개 픽셀이 같은 코드를 동시에 실행', '16 × 16 = 256 pixels run the same code at once'], 'gx-xs', 2); T(S, 'n2b', 1, 12.2, ['1080p 화면이면 한 프레임에 약 200만 번', 'a 1080p frame runs it about two million times'], 'gx-xs', 2);
  T(S, 'n3', 1, 14.2, ['GPU는 32개씩 묶은 워프(웨이브) 단위로 같은 명령을 함께 실행 (SIMT)', 'the GPU executes in warps (waves) of 32 that share each instruction (SIMT)'], 'gx-xs gx-w', 3);
  T(S, 'n4', 1, 15.4, ['한 워프 안에서 if 갈래가 나뉘면 양쪽을 차례로 다 실행 → 분기가 많으면 느려져요', 'if a warp’s threads split at an if, both branches run in turn → branchy code is slow'], 'gx-xs gx-r', 4);
  T(S, 'n5', 1, 16.8, ['CPU: 빠른 코어 몇 개 · GPU: 단순한 코어 수천 개 → 같은 일을 대량으로 할 때 압도적', 'CPU: a few fast cores · GPU: thousands of simple ones → unbeatable for the same work at scale'], 'gx-xs', 5);
  T(S, 'n6', 1, 18, ['그래서 GPU는 그래픽 밖에서도 딥러닝·과학 계산에 쓰여요 (CUDA, 컴퓨트 셰이더)', 'which is why GPUs also run deep learning and science (CUDA, compute shaders)'], 'gx-xs gx-g', 5);
  S.cap(1, '셰이더는 픽셀 하나의 색을 정하는 작은 프로그램', 'A shader is a tiny program that decides one pixel’s color')
    .cap(2, '모든 픽셀이 같은 프로그램을 각자의 입력으로 동시에 돌려요', 'Every pixel runs it at the same time with its own inputs')
    .cap(3, '하드웨어는 32개씩 묶어 한 명령을 함께 실행해요', 'Hardware runs groups of 32 in lockstep')
    .cap(4, '갈래가 나뉘면 두 쪽을 다 실행해야 해요 (분기 발산)', 'Divergent branches force both paths to run')
    .cap(5, '셰이더와 GPU 병렬성', 'Shaders and GPU parallelism');
  return S;
}
function sCull() {
  const S = scene({ id: 'gx-cull', steps: 5, per: 1.4 });
  const C0 = [10, 16], fr = 38 * Math.PI / 180, inF = (x, y) => { const dx = x - C0[0], dy = C0[1] - y; return dy > 0 && Math.abs(Math.atan2(dx, dy)) < fr; };
  pt(S, 'cam', C0[0], C0[1], 0, C.cur, .45); T(S, 'caml', C0[0] - 2, C0[1] + .6, ['카메라', 'camera'], 'cz-tc gx-xs', 0, { w: 4 });
  seg(S, 'f1', C0, [C0[0] - 14 * Math.sin(fr), C0[1] - 14 * Math.cos(fr)], 0, 'accent', .1); seg(S, 'f2', C0, [C0[0] + 14 * Math.sin(fr), C0[1] - 14 * Math.cos(fr)], 0, 'accent', .1);
  const O = [[6, 8], [11, 5], [14, 9], [2, 12], [18, 13], [17, 4.2], [3, 3], [10, 11]];
  O.forEach(([x, y], i) => { const inside = inF(x, y); pt(S, 'o' + i, x, y, 0, C.warn, .55); if (!inside) S.set('o' + i, 2, { opacity: '.18' }); });
  T(S, 'n2', 1, 1, ['시야 밖 물체는 GPU에 보내지도 않아요', 'objects outside the view never reach the GPU'], 'gx-xs gx-a', 2);
  rect(S, 'wall', 8.6, 7, 4, .5, 'ink-3', 70, 4, { r: .1 }); S.set('o1', 4, { opacity: '.18' });
  T(S, 'n4', 1, 18.2, ['벽 뒤에 완전히 가려진 물체도 건너뛰어요 (가림 컬링)', 'objects hidden behind walls are skipped (occlusion culling)'], 'gx-xs', 4);
  const cx = 26, cy = 8.6, R = 3.8, poly = [...Array(8)].map((_, i) => { const a = i / 8 * 2 * Math.PI; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
  poly.forEach((p, i) => { const q = poly[(i + 1) % 8], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, nx = mx - cx, ny = my - cy, facing = ny > 0.3; seg(S, 'e' + i, p, q, 3, facing ? 'ok' : 'danger', .14, facing ? {} : { dash: 1 }); ar(S, 'nn' + i, [mx, my], [mx + nx * .45, my + ny * .45], facing ? 'ok' : 'danger', 3, { h: .08 }); });
  ar(S, 'cv', [26, 16.2], [26, 13.4], 'accent', 3, { h: .14 }); T(S, 'cvl', 26.6, 15, ['카메라 방향', 'camera'], 'gx-xs gx-a', 3);
  T(S, 'n3', 20.6, 1, ['뒷면(빨강)은 안 보이니 버려요', 'back faces (red) can’t be seen: drop them'], 'gx-xs gx-r', 3); T(S, 'n3b', 20.6, 2.2, ['→ 삼각형 약 절반 절약', '→ saves about half the triangles'], 'gx-xs', 3);
  T(S, 'n5', 17.2, 17, ['드로우 콜: CPU가 GPU에 그리기를 요청하는 단위', 'draw call: each CPU → GPU request costs time'], 'gx-xs', 5);
  T(S, 'n5c', 17.2, 18.2, ['나무 1000그루 → 인스턴싱으로 호출 1번', '1000 trees → instancing → a single call'], 'gx-xs gx-g', 5);
  S.cap(1, '장면에 물체가 여러 개 있어요', 'The scene holds many objects')
    .cap(2, '시야 절두체 밖은 미리 빼요 (절두체 컬링)', 'Skip what lies outside the view frustum (frustum culling)')
    .cap(3, '카메라를 등진 면도 그리지 않아요 (후면 컬링)', 'Skip faces turned away from the camera (backface culling)')
    .cap(4, '다른 물체에 가려진 것도 빼요 (가림 컬링)', 'Skip what other objects hide (occlusion culling)')
    .cap(5, '컬링: 그리지 않는 게 가장 빠르다', 'Culling: the fastest draw is the one you skip');
  return S;
}
function sVsync() {
  const S = scene({ id: 'gx-vsync', steps: 5, per: 1.4 });
  rect(S, 'scr', 1, 1.6, 12, 8, 'line', 20, 0, { r: .3 });
  px(S, 'f1', 1.2, 1.8, 11.6, 7.6, 'color-mix(in srgb,var(--accent) 40%,var(--ui))', 1, { r: .2, off: 2 });
  px(S, 'ta', 1.2, 1.8, 11.6, 3.6, 'color-mix(in srgb,var(--accent) 40%,var(--ui))', 2, { r: .2, off: 3 }); px(S, 'tb', 2.4, 5.4, 10.4, 4, 'color-mix(in srgb,var(--warn) 45%,var(--ui))', 2, { r: .2, off: 3 }); hl(S, 'tl', 1, 13, 5.4, 'danger', 2, { w: .14, off: 3 });
  T(S, 'tt', 1, 10.2, ['찢어짐(tearing): 위는 이전, 아래는 새 프레임', 'tearing: old frame on top, new frame below'], 'gx-xs gx-r', 2, { off: 3 });
  px(S, 'f2', 1.2, 1.8, 11.6, 7.6, 'color-mix(in srgb,var(--warn) 45%,var(--ui))', 3, { r: .2 });
  box(S, 'fb', 15, 2, 7, 2.6, ['프런트 버퍼 (표시 중)', 'front buffer (on screen)'], 'accent', 1); box(S, 'bb', 24, 2, 7, 2.6, ['백 버퍼 (그리는 중)', 'back buffer (drawing)'], 'warn', 1);
  ar(S, 'sw', [22.1, 3.3], [23.9, 3.3], 'ink-3', 3, { h: .12 }); ar(S, 'sw2', [23.9, 3.8], [22.1, 3.8], 'ink-3', 3, { h: .12 }); T(S, 'swl', 20.2, 5, ['수직 동기 때 교체', 'swap at vblank'], 'gx-xs gx-g', 3);
  const X = ms => 2 + ms * .55; hl(S, 'ax', X(0), X(50), 13.6, 'ink-3', 0, { w: .08 });
  [0, 16.7, 33.3, 50].forEach((t, i) => { vl(S, 'r' + i, X(t), 12.4, 13.6, 'accent', 0, { w: .12 }); T(S, 'rt' + i, X(t) - 1.4, 13.8, t.toFixed(1), 'cz-tc cz-mono gx-xs', 0, { w: 2.8 }); });
  T(S, 'rl', X(50) + .6, 12.6, ['60 Hz', '60 Hz'], 'gx-xs gx-a'); T(S, 'ms', X(50) + .6, 13.8, 'ms', 'cz-mono gx-xs');
  [[2, 12, 'ok', 1], [12, 30, 'danger', 4], [30, 44, 'ok', 1]].forEach(([a, b, c, st], i) => px(S, 'g' + i, X(a), 10.6, X(b) - X(a) - .1, 1.2, `var(--${c})`, st, { css: 'opacity:.6' }));
  T(S, 'gl', 1, 10.6 - 1.4 + 2.6, ['GPU 프레임', 'GPU frames'], 'gx-xs', 1);
  T(S, 'n4', 1, 15.4, ['프레임이 16.7 ms를 넘기면 다음 갱신까지 기다려 33 ms 동안 같은 화면 → 끊김(stutter)', 'a frame that misses 16.7 ms waits for the next refresh, holding one image for 33 ms → stutter'], 'gx-xs gx-r', 4);
  T(S, 'n5', 1, 16.8, ['트리플 버퍼링으로 대기를 줄이고, G-SYNC·FreeSync(가변 주사율)는 모니터가 GPU에 맞춰 갱신해요', 'triple buffering cuts the waiting; G-SYNC and FreeSync (variable refresh) let the display follow the GPU'], 'gx-xs', 5);
  T(S, 'n6', 1, 18, ['60 fps = 프레임당 16.7 ms, 120 fps = 8.3 ms 안에 모든 계산을 끝내야 해요', '60 fps = 16.7 ms per frame, 120 fps = 8.3 ms for all the work'], 'gx-xs gx-a', 5);
  S.cap(1, '모니터는 정해진 주기(60 Hz면 16.7 ms)로 화면을 위에서 아래로 그려요', 'A monitor redraws top to bottom at a fixed rate (16.7 ms at 60 Hz)')
    .cap(2, '그리는 도중 버퍼를 바꾸면 화면이 찢어져 보여요', 'Swapping buffers mid-scan tears the image')
    .cap(3, '두 버퍼를 두고 화면 갱신 사이에만 바꿔요 (V-Sync)', 'Keep two buffers and swap only between refreshes (V-Sync)')
    .cap(4, '대신 늦은 프레임은 한 주기를 통째로 기다려요', 'But a late frame waits a whole cycle')
    .cap(5, '더블 버퍼링과 수직 동기화', 'Double buffering and vertical sync');
  return S;
}

/* ================= advanced rendering ================= */
function sRaytrace() {
  const S = scene({ id: 'gx-raytrace', steps: 5, per: 1.4 });
  const E = [2, 8], G = 15.4, SP = [19, 9.4], R = 3.4, LP = [27, 2.4];
  pt(S, 'eye', E[0], E[1], 0, C.cur, .45); T(S, 'el', .6, 9, ['카메라', 'camera'], 'gx-xs');
  for (let i = 0; i < 8; i++) px(S, 'ip' + i, 6, 3.6 + i * 1.1, .6, 1.02, i === 4 ? 'var(--danger)' : 'var(--line)', 0, { r: .05 });
  T(S, 'ipl', 4.6, 2.2, ['화면 픽셀', 'pixels'], 'gx-xs');
  ring(S, 'sp', SP[0], SP[1], R, 'accent', 0, { w: .14, fill: 'color-mix(in srgb,var(--accent) 22%,transparent)' }); hl(S, 'g', 1, 31, G, 'ink-3', 0, { w: .12 }); pt(S, 'lt', LP[0], LP[1], 0, C.warn, .55); T(S, 'ltl', LP[0] + .8, LP[1] - .6, ['빛', 'light'], 'gx-xs gx-w');
  const dir = nrm([6.3 - E[0], 8.6 - E[1], 0]), hit = (() => { const ox = E[0] - SP[0], oy = E[1] - SP[1], b = ox * dir[0] + oy * dir[1], c = ox * ox + oy * oy - R * R, t = -b - Math.sqrt(b * b - c); return [E[0] + dir[0] * t, E[1] + dir[1] * t]; })();
  ar(S, 'pr', E, hit, 'danger', 1, { h: .1 }); pt(S, 'h', hit[0], hit[1], 1, C.badf, .3);
  ar(S, 'sr', hit, LP, 'warn', 2, { h: .1 }); T(S, 'srl', 23.2, 6.3, ['그림자 광선: 빛까지', 'shadow ray: nothing'], 'gx-xs gx-w', 2); T(S, 'srl2', 23.2, 7.4, ['막힘 없음 → 밝게', 'blocks the light → lit'], 'gx-xs gx-w', 2);
  const N = nrm([hit[0] - SP[0], hit[1] - SP[1], 0]), dd = dir[0] * N[0] + dir[1] * N[1], rd = [dir[0] - 2 * dd * N[0], dir[1] - 2 * dd * N[1]], tg = (G - hit[1]) / rd[1], fl = [hit[0] + rd[0] * tg, G];
  ar(S, 'rr', hit, fl, 'ok', 3, { h: .1 }); T(S, 'rrl', 10, 13.9, ['반사 광선 → 바닥의 색을 비춰요', 'reflection ray → picks up the floor’s color'], 'gx-xs gx-g', 3);
  T(S, 'n4', 1, 16.6, ['픽셀마다 광선을 쏘아 부딪힌 곳에서 그림자·반사·굴절 광선을 다시 쏴요 → 래스터화로는 어려운 정확한 반사와 그림자', 'one ray per pixel, then shadow, reflection, refraction rays per hit → exact mirrors and shadows'], 'gx-xs', 4);
  T(S, 'n5', 1, 18, ['경로 추적은 무작위 광선 수백 개로 간접광까지 → 노이즈는 AI 디노이저로 · 영화 렌더링, RTX 하드웨어 가속', 'path tracing: hundreds of random rays for indirect light → AI denoisers · films, RTX hardware'], 'gx-xs', 5);
  S.cap(1, '카메라에서 픽셀을 지나는 광선을 쏴요', 'Fire a ray from the camera through a pixel')
    .cap(2, '부딪힌 점에서 빛 쪽으로 그림자 광선을 쏴요', 'From the hit point, a shadow ray heads for the light')
    .cap(3, '거울처럼 튕긴 반사 광선도 따라가요', 'A reflection ray follows the mirror bounce')
    .cap(4, '광선을 따라가며 색을 모아요', 'Colors are gathered along the rays')
    .cap(5, '레이 트레이싱', 'Ray tracing');
  return S;
}
function sBvh() {
  const S = scene({ id: 'gx-bvh', steps: 5, per: 1.4 });
  const O = [[3, 4], [6, 6], [4, 9], [8, 3], [21, 12], [24, 14], [27, 11], [25, 8.6]];
  O.forEach(([x, y], i) => pt(S, 'o' + i, x, y, 0, C.idle, .55));
  const B = [['root', 1.6, 1.6, 27.6, 14.4, 'ink-3', 2], ['L', 2, 2, 8.4, 9, 'accent', 2], ['R', 19.6, 7, 9.2, 8.6, 'warn', 2], ['L1', 2.4, 2.4, 4.4, 8.2, 'accent', 3], ['L2', 5.4, 2.2, 4.4, 5.4, 'accent', 3], ['R1', 19.8, 10.6, 5.6, 4.6, 'warn', 3], ['R2', 23.8, 7.4, 4.8, 5.2, 'warn', 3]];
  B.forEach(([k, x, y, w, h, c, st]) => rect(S, 'b' + k, x, y, w, h, c, 0, st, { css: `background:transparent;border:.12em ${k === 'root' ? 'solid' : 'dashed'} var(--${c})` }));
  seg(S, 'ray', [1, 16.6], [31, 6], 3, 'danger', .12);
  tsets(S, 'bR', [[3, 'ok', 0]]); S.set('bR', 3, { 'border-color': 'var(--ok)' }); S.set('bL', 3, { opacity: '.25' }); S.set('bL1', 3, { opacity: '.15' }); S.set('bL2', 3, { opacity: '.15' });
  [0, 1, 2, 3].forEach(i => S.set('o' + i, 3, { opacity: '.25' })); S.set('bR1', 4, { 'border-color': 'var(--ok)' }); S.set('bR2', 4, { 'border-color': 'var(--ok)' });
  [4, 5].forEach(i => S.set('o' + i, 4, { background: 'var(--ok)' })); [6, 7].forEach(i => S.set('o' + i, 4, { background: 'var(--danger)' }));
  T(S, 'n3', 1, 17.4, ['광선이 왼쪽 상자를 안 지나므로 그 안의 4개는 검사도 안 해요', 'the ray misses the left box, so its four objects are never tested'], 'gx-xs gx-r', 3);
  T(S, 'n4', 1, 18.6, ['물체 8개 중 4개만 정밀 검사 · 상자 검사는 아주 싸요 → 수백만 개도 깊이 log n 단계', 'only 4 of 8 objects get the precise test · box tests are cheap → millions of objects take about log n levels'], 'gx-xs gx-g', 4);
  T(S, 'n5', 1, 19.8, ['레이 트레이싱, 물리 엔진 충돌 감지, 게임 AI 시야 판정에 써요 · 좋은 분할은 SAH 휴리스틱으로', 'used by ray tracers, physics collision detection and game AI line-of-sight · good splits come from the SAH heuristic'], 'gx-xs', 5);
  S.cap(1, '물체가 많으면 광선마다 전부 검사하기 벅차요', 'Testing every object for every ray is too slow')
    .cap(2, '가까운 물체끼리 상자로 묶고, 상자를 다시 묶어요', 'Group nearby objects into boxes, and boxes into bigger boxes')
    .cap(3, '광선이 상자를 지나지 않으면 안쪽 전체를 건너뛰어요', 'If the ray misses a box, everything inside is skipped')
    .cap(4, '남은 후보만 정밀하게 검사해요', 'Only the remaining candidates get the exact test')
    .cap(5, 'BVH (경계 볼륨 계층)', 'BVH (bounding volume hierarchy)');
  return S;
}
function sBezier() {
  const S = scene({ id: 'gx-bezier', steps: 5, per: 1.4 });
  const P = [[2.4, 15], [6, 3], [19, 3], [24, 15]], t = .4, lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  P.forEach((p, i) => { pt(S, 'p' + i, p[0], p[1], 0, C.cur, .38); T(S, 'pl' + i, p[0] - 1.2, p[1] + (i % 3 ? -1.6 : .5), 'P' + i, 'cz-mono gx-xs gx-a', 0); });
  [0, 1, 2].forEach(i => seg(S, 'c' + i, P[i], P[i + 1], 0, 'ink-3', .08, { dash: 1 }));
  const A = [0, 1, 2].map(i => lerp(P[i], P[i + 1], t)), Bp = [0, 1].map(i => lerp(A[i], A[i + 1], t)), Cp = lerp(Bp[0], Bp[1], t);
  A.forEach((p, i) => pt(S, 'a' + i, p[0], p[1], 2, C.warn, .26)); seg(S, 'a01', A[0], A[1], 2, 'warn', .08); seg(S, 'a12', A[1], A[2], 2, 'warn', .08);
  Bp.forEach((p, i) => pt(S, 'b' + i, p[0], p[1], 3, C.okf, .26)); seg(S, 'bb', Bp[0], Bp[1], 3, 'ok', .08); pt(S, 'cP', Cp[0], Cp[1], 3, C.badf, .34);
  const curve = [...Array(41)].map((_, i) => { const s = i / 40, a = [0, 1, 2].map(k => lerp(P[k], P[k + 1], s)), b = [0, 1].map(k => lerp(a[k], a[k + 1], s)); return lerp(b[0], b[1], s); });
  poly(S, 'cv', curve, { st: i => i <= 16 ? 4 : 4, color: 'danger', h: .18 });
  T(S, 'n2', 26, 3, ['t = 0.4에서', 'at t = 0.4'], 'gx-xs', 2); T(S, 'n2b', 26, 4.2, ['각 변을 4:6으로', 'split each side 4:6'], 'gx-xs gx-w', 2);
  T(S, 'n3', 26, 5.8, ['또 나누고 또 나눠', 'again and again'], 'gx-xs gx-g', 3); T(S, 'n3b', 26, 7, ['곡선 위의 한 점', 'to reach a point'], 'gx-xs gx-r', 3);
  T(S, 'n4', 26, 8.8, ['t를 0 → 1로', 'sweep t from 0 to 1'], 'gx-xs', 4); T(S, 'n4b', 26, 10, ['움직이면 곡선', 'to trace the curve'], 'gx-xs', 4);
  T(S, 'f', 1, 17.2, 'B(t) = (1−t)³P₀ + 3(1−t)²t P₁ + 3(1−t)t² P₂ + t³P₃', 'cz-mono gx-s', 4);
  T(S, 'n5', 1, 18.8, ['글꼴 윤곽(트루타입은 2차, CFF는 3차), SVG path, CSS cubic-bezier() 애니메이션, 디자인 툴의 펜', 'font outlines (quadratic in TrueType, cubic in CFF), SVG paths, CSS cubic-bezier() easing, the pen tool in design apps'], 'gx-xs', 5);
  S.cap(1, '조절점 네 개가 곡선의 모양을 정해요', 'Four control points shape the curve')
    .cap(2, '이웃한 점 사이를 같은 비율 t로 나누고', 'Split each pair of neighbors at the same ratio t')
    .cap(3, '나온 점들을 다시 나누면 곡선 위의 점 하나 (드 카스텔조)', 'Repeat on the new points to land on the curve (de Casteljau)')
    .cap(4, 't를 바꿔 가며 모으면 매끈한 곡선', 'Sweep t and the points form a smooth curve')
    .cap(5, '베지어 곡선', 'Bézier curves');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'gxx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono gxx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono gxx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c gxx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono gxx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c gxx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'gxx-s gxx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono gxx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono gxx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono gxx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono gxx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono gxx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'gxx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'gxx-xs', 5));


const CSSX = `
.gxx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.gxx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.gxx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.gxx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.gxx-r .in{color:var(--danger);font-weight:800}
.gxx-g .in{color:var(--ok);font-weight:800}
.gxx-a .in{color:var(--accent);font-weight:800}
.gxx-w .in{color:var(--warn);font-weight:800}
.gxx-c .in{font-size:.6em;font-weight:700}
.gxx-c2 .in{font-size:.5em;font-weight:700}
.gxx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.gxx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const vis0 = (S, k, st, off) => { if (st) S.set(k, 0, hid()); vis(S, k, st, off); };
const stepT = (S, k, x, y, list, cls, lastOff) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'gxx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : (lastOff || 0) }));
const ver = (S, k, x, y, list, cls, w) => list.forEach(([s, t], i) => T(S, k + i, x, y, t, cls, s, { w, off: list[i + 1] ? list[i + 1][0] : 0 }));
const outline = (S, k, pts, st, color, h, o = {}) => pts.forEach((p, i) => seg(S, k + i, p, pts[(i + 1) % pts.length], st, color, h, o));

/* ================= rasterization ================= */
function sClip() {
  const S = scene({ id: 'gx-clip', steps: 5, per: 1.6 });
  const XL = 8, XR = 22, YT = 3, YB = 13;
  rect(S, 'scr', XL, YT, XR - XL, YB - YT, 'accent', 8, 0, { r: 0, css: 'border:.12em solid var(--accent)' });
  T(S, 'scl', XL + .3, YB - .9, ['화면 (뷰포트)', 'screen (viewport)'], 'gxx-tiny gxx-a', 0);
  const P = [[4, 11.5], [16, .6], [25, 12]];
  const clip = (poly, inside, cut) => { const out = []; poly.forEach((a, i) => { const b = poly[(i + 1) % poly.length], ia = inside(a), ib = inside(b); if (ia) out.push(a); if (ia !== ib) out.push(cut(a, b)); }); return out; };
  const lerpX = x => (a, b) => [x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0])], lerpY = y => (a, b) => [a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y];
  const p1 = clip(P, p => p[0] >= XL, lerpX(XL)), p2 = clip(p1, p => p[1] >= YT, lerpY(YT)), p3 = clip(p2, p => p[0] <= XR, lerpX(XR)), p4 = clip(p3, p => p[1] <= YB, lerpY(YB));
  outline(S, 'tri', P, 0, 'ink-3', .07, { dash: 1 });
  P.forEach((p, i) => pt(S, 'v' + i, p[0], p[1], 0, C.idle, .3));
  outline(S, 'c1', p1, 2, 'warn', .12, { off: 3 }); seg(S, 'eL', [XL, .3], [XL, 15], 2, 'danger', .08, { dash: 1, off: 3 }); T(S, 'eLl', XL - 2.4, 14.4, 'x ≥ 8', 'cz-mono gxx-xs gxx-r', 2, { off: 3 });
  outline(S, 'c4', p4, 3, 'ok', .14);
  seg(S, 'eT', [1, YT], [31, YT], 3, 'danger', .08, { dash: 1, off: 4 }); seg(S, 'eR', [XR, .3], [XR, 15], 3, 'danger', .08, { dash: 1, off: 4 });
  p4.forEach((p, i) => pt(S, 'n' + i, p[0], p[1], 3, C.okf, .28));
  for (let i = 1; i < p4.length - 1; i++) seg(S, 'fan' + i, p4[0], p4[i + 1], 4, 'ok', .06, { dash: 1 });
  T(S, 'cnt', 23.4, 5, ['꼭짓점 3개 → ' + p4.length + '개', '3 vertices → ' + p4.length], 'gxx-xs gxx-g', 3);
  T(S, 'fanl', 23.4, 6.3, ['→ 삼각형 ' + (p4.length - 2) + '개로 나눠 그려요', '→ drawn as ' + (p4.length - 2) + ' triangles'], 'gxx-xs gxx-g', 4);
  stepT(S, 'k', 1, 15.6, [['삼각형 일부가 화면 밖이에요 · 밖까지 래스터화하면 낭비고, 카메라 뒤면 계산이 깨져요', 'part of the triangle is off-screen · rasterizing it wastes work, and points behind the camera break the math'], ['서덜랜드-호지먼: 경계 하나씩 잘라요 · 안쪽 점은 남기고, 경계를 넘는 변은 교점을 추가', 'Sutherland–Hodgman clips one edge at a time · keep inside points and add a point where an edge crosses'], ['위·오른쪽·아래 경계까지 차례로 자르면 화면 안의 다각형만 남아요', 'clipping against the top, right and bottom edges in turn leaves only the visible polygon'], ['볼록 다각형은 한 꼭짓점에서 부채꼴로 삼각형을 나눠 래스터라이저에 넘겨요', 'a convex polygon is split into a fan of triangles from one vertex for the rasterizer']]);
  fin(S, 'z', 17.0, [['클리핑: 보이는 영역 밖의 부분을 잘라내 래스터화할 것만 남기는 단계', 'clipping cuts away whatever lies outside the visible region before rasterization', 'gxx-xs gxx-a'], ['GPU는 투영 뒤 클립 공간(−w ≤ x, y, z ≤ w)에서 하고, 가드 밴드로 자르는 횟수를 줄여요', 'GPUs clip in clip space (−w ≤ x, y, z ≤ w) after projection, using a guard band to clip less often']]);
  S.cap(1, '화면 밖으로 나간 삼각형', 'A triangle partly off-screen').cap(2, '왼쪽 경계로 자르기', 'Clip against the left edge').cap(3, '나머지 경계도 차례로', 'Then the other edges').cap(4, '삼각형으로 다시 나누기', 'Re-triangulate').cap(5, '클리핑', 'Clipping');
  return S;
}
function sBlend() {
  const S = scene({ id: 'gx-blend', steps: 5, per: 1.6 });
  const sw = (k, x, y, css, label, st, o = {}) => { rect(S, k, x, y, 4.2, 2.6, 'line', 0, 0, { r: .3, css: css + ';border:.1em solid var(--line)' + (o.css || '') }); vis0(S, k, st, o.off); T(S, k + 'l', x - .4, y + 2.75, label, 'cz-tc gxx-xs', st, { w: 5, off: o.off }); };
  sw('dst', 1, 1.2, 'background:rgb(51,102,255)!important', ['배경 Cd', 'dest Cd'], 0);
  sw('src', 7, 1.2, 'background:rgba(255,51,51,.5)!important', ['빨강 Cs, α = 0.5', 'red Cs, α = 0.5'], 0);
  T(S, 'eq', 11.8, 1.9, '→', 'gxx-l', 1);
  sw('out', 13.4, 1.2, 'background:rgb(153,77,153)!important', ['결과', 'result'], 1);
  T(S, 'f', 18.6, 1.4, 'C = α·Cs + (1 − α)·Cd', 'cz-mono gxx-s gxx-a', 1);
  T(S, 'f2', 18.6, 2.8, '= 0.5·(1, .2, .2) + 0.5·(.2, .4, 1)', 'cz-mono gxx-xs', 1); T(S, 'f3', 18.6, 3.9, '= (.6, .3, .6)', 'cz-mono gxx-xs gxx-g', 1);
  rect(S, 'bgp', 1, 7.2, 17.6, 7.4, 'ink-3', 10, 2, { r: .4 });
  rect(S, 'red', 3, 8.2, 8.4, 4.4, 'line', 0, 0, { r: .2, css: 'background:rgba(255,51,51,.55)!important' }); vis0(S, 'red', 2);
  rect(S, 'grn', 8, 9.6, 8.4, 4.4, 'line', 0, 0, { r: .2, css: 'background:rgba(34,197,94,.55)!important' }); vis0(S, 'grn', 2);
  rect(S, 'hole', 8, 9.6, 3.4, 3.0, 'line', 0, 0, { r: 0, css: 'background:color-mix(in srgb,var(--ink-3) 10%,var(--stage))!important' }); vis0(S, 'hole', 3, 4);
  rect(S, 'hole2', 8, 9.6, 3.4, 3.0, 'line', 0, 0, { r: 0, css: 'background:rgba(34,197,94,.55)!important' }); vis0(S, 'hole2', 3, 4);
  T(S, 'zr', 3.3, 8.3, ['빨강 z = 5 (뒤)', 'red z = 5 (back)'], 'gxx-xs', 2); T(S, 'zg', 11.0, 12.8, ['초록 z = 3 (앞)', 'green z = 3 (front)'], 'gxx-xs', 2);
  T(S, 'ok', 20, 8.2, ['① 빨강(뒤) → ② 초록(앞) ✓', '① red (back) → ② green (front) ✓'], 'gxx-xs gxx-g', 2, { off: 3 });
  T(S, 'bad', 20, 8.2, ['① 초록(앞) → ② 빨강(뒤)', '① green (front) → ② red (back)'], 'gxx-xs gxx-r', 3, { off: 4 });
  T(S, 'bad2', 20, 9.3, ['빨강이 깊이 테스트에 막혀', 'red fails the depth test,'], 'gxx-xs', 3, { off: 4 }); T(S, 'bad3', 20, 10.4, ['겹친 곳에서 사라짐 ✗', 'vanishing in the overlap ✗'], 'gxx-xs gxx-r', 3, { off: 4 });
  [['① 불투명한 것 먼저 (깊이 쓰기 켬)', '① opaque first (depth write on)'], ['② 투명한 것은 뒤 → 앞 정렬', '② transparent sorted back to front'], ['   (깊이 테스트만, 쓰기는 끔)', '   (depth test on, write off)'], ['③ 서로 뚫고 지나가면 OIT', '③ interpenetrating: OIT']].forEach((t, i) => T(S, 'r' + i, 20, 8.2 + i * 1.1, t, 'gxx-xs' + (i ? '' : ' gxx-a'), 4));
  stepT(S, 'k', 1, 15.4, [['오버 연산: 원본 색을 α만큼, 뒤에 있던 색을 (1 − α)만큼 섞어요', 'the over operator mixes α of the source with (1 − α) of what is behind'], ['투명한 판 두 장은 뒤에서 앞으로 그려야 겹친 부분 색이 맞아요', 'two transparent panes must be drawn back to front for the overlap to be right'], ['앞의 것을 먼저 그리면 깊이 버퍼가 뒤의 것을 막아 겹친 부분이 틀려요', 'drawing the front one first lets the depth buffer reject the back one, so the overlap is wrong'], ['그래서 불투명 → 투명(정렬) 순서로, 투명한 것은 깊이를 쓰지 않아요', 'so draw opaque, then transparent sorted, without writing depth for the transparent pass']]);
  fin(S, 'z', 16.8, [['알파 블렌딩은 순서에 따라 결과가 달라요 · 투명 객체는 정렬해서 그려야 해요', 'alpha blending depends on order · transparent objects must be drawn sorted', 'gxx-xs gxx-a'], ['파티클·UI·유리·연기에 쓰이고, 미리 곱한 알파(premultiplied)로 경계 테두리 문제를 피해요', 'used for particles, UI, glass and smoke; premultiplied alpha avoids fringe artifacts at edges']]);
  S.cap(1, '오버 연산', 'The over operator').cap(2, '뒤에서 앞으로', 'Back to front').cap(3, '순서가 틀리면', 'When the order is wrong').cap(4, '그리는 순서 규칙', 'The drawing order rule').cap(5, '알파 블렌딩과 투명 객체', 'Alpha blending and transparency');
  return S;
}

/* ================= lighting ================= */
function sTonemap() {
  const S = scene({ id: 'gx-tonemap', steps: 5, per: 1.6 });
  const X = L => 2 + (Math.log10(L) + 2) * 3.3, Y = v => 11 - v * 8.6;
  hl(S, 'ax', 1.6, 15.5, Y(0), 'ink-3', 0, { w: .07 }); seg(S, 'ay', [2, 1.8], [2, 11.1], 0, 'ink-3', .07);
  [.01, .1, 1, 10, 100].forEach(L => T(S, 'xt' + L, X(L) - 1, 11.25, String(L), 'cz-tc cz-mono gxx-tiny', 0, { w: 2 }));
  T(S, 'xl', 6.4, 12.1, ['장면 밝기 (로그)', 'scene luminance (log)'], 'gxx-tiny', 0); T(S, 'yl', 2.3, 1.2, ['화면 값', 'display'], 'gxx-tiny', 0);
  hl(S, 'one', 2, 15.2, Y(1), 'line', 0, { w: .05, dash: 1 }); T(S, 'onel', .6, Y(1) - .3, '1', 'cz-mono gxx-tiny', 0);
  const pts = f => [...Array(41)].map((_, i) => { const L = Math.pow(10, -2 + i * .1); return [X(L), Y(f(L))]; });
  const clamp = L => Math.min(L, 1), rein = L => L / (1 + L), aces = L => Math.min(1, (L * (2.51 * L + .03)) / (L * (2.43 * L + .59) + .14));
  poly(S, 'cc', pts(clamp), { st: 2, color: 'danger', h: .1 }); poly(S, 'cr', pts(rein), { st: 3, color: 'accent', h: .1 }); poly(S, 'ca', pts(aces), { st: 4, color: 'ok', h: .12 });
  const LV = [.05, .2, 1, 4, 16, 64], PX = i => 18.6 + i * 2.1;
  const ROWS = [[['장면 값', 'scene'], null, 1, 'ink-3'], [['자르기', 'clamp'], clamp, 2, 'gxx-r'], ['Reinhard', rein, 3, 'gxx-a'], ['ACES', aces, 4, 'gxx-g']];
  ROWS.forEach(([lab, f, st, c], r) => { const y = 1.6 + r * 2.5; T(S, 'rl' + r, 18.6, y - .75, lab, 'gxx-tiny ' + c, st);
    LV.forEach((L, i) => { if (!f) box2(S, `p${r}_${i}`, PX(i), y, 1.9, 1.5, String(L), 'line', st, { pct: 20 }); else { const v = Math.round(f(L) * 255); rect(S, `p${r}_${i}`, PX(i), y, 1.9, 1.5, 'line', 0, 0, { r: .15, css: `background:rgb(${v},${v},${v})!important;border:.06em solid var(--line)` }); vis0(S, `p${r}_${i}`, st); } }); });
  T(S, 'lost', 18.6, 6.3, ['4·16·64가 모두 같은 흰색 → 디테일 손실 ✗', '4, 16 and 64 turn the same white → detail lost ✗'], 'gxx-tiny gxx-r', 2, { off: 3 });
  stepT(S, 'k', 1, 13.0, [['실제 장면의 밝기는 그림자 0.05부터 해 64까지 넓은데, 화면은 0~1만 표현해요', 'real scenes range from 0.05 in shadow to 64 in sunlight, but screens show only 0–1'], ['1을 넘는 값을 그냥 자르면 밝은 부분이 모두 하얗게 뭉개져요', 'clamping everything above 1 flattens all the highlights to white'], ['Reinhard L / (1 + L): 큰 값일수록 더 눌러 담아 모든 밝기가 구분돼요', 'Reinhard L / (1 + L) compresses big values more, keeping every level distinct'], ['필름 곡선(ACES): S자로 중간 대비는 살리고 밝은 끝은 부드럽게', 'a filmic curve (ACES) keeps midtone contrast and rolls off highlights softly']]);
  fin(S, 'z', 14.4, [['톤 매핑: 넓은 HDR 밝기 범위를 화면이 보여 줄 수 있는 범위로 접어 넣는 곡선', 'tone mapping folds a wide HDR luminance range into what a display can show', 'gxx-xs gxx-a'], ['노출(곱하기)을 먼저 정하고 선형 공간에서 매핑한 뒤 감마를 적용해요 · HDR 모니터는 더 넓게 써요', 'set exposure first, map in linear space, then apply gamma · HDR displays get a wider range']]);
  S.cap(1, '장면은 화면보다 밝아요', 'Scenes outshine screens').cap(2, '그냥 자르면', 'Just clamping').cap(3, 'Reinhard', 'Reinhard').cap(4, '필름 곡선 ACES', 'The filmic ACES curve').cap(5, 'HDR과 톤 매핑', 'HDR and tone mapping');
  return S;
}

/* ================= GPU ================= */
function sDeferred() {
  const S = scene({ id: 'gx-deferred', steps: 5, per: 1.6 });
  T(S, 'ft', 1, .4, ['포워드: 물체마다 모든 조명 계산', 'forward: every light for every object'], 'gxx-xs gxx-a', 0);
  for (let o = 0; o < 3; o++) { T(S, 'ol' + o, 1, 2.0 + o * 1.5, ['물체 ' + (o + 1), 'mesh ' + (o + 1)], 'gxx-xs', 0); for (let l = 0; l < 4; l++) box2(S, `fc${o}_${l}`, 5 + l * 2.1, 1.8 + o * 1.5, 1.9, 1.2, 'L' + (l + 1), 'warn', 0, { pct: 25 }); }
  T(S, 'fn', 1, 6.5, ['3 × 4 = 12번 계산 + 가려질 픽셀까지 계산', '3 × 4 = 12 shading passes + hidden pixels too'], 'gxx-xs gxx-r', 1);
  box2(S, 'gp', 15.4, 1.2, 6.4, 1.6, ['① 지오메트리 패스', '① geometry pass'], 'accent', 2, { pct: 25 });
  const G = [[['색 (albedo)', 'albedo'], 'linear-gradient(90deg,#e66,#fc6,#6c6)'], [['법선', 'normals'], 'linear-gradient(135deg,#88f,#c8f,#8cf)'], [['깊이', 'depth'], 'linear-gradient(90deg,#222,#bbb)'], [['재질', 'roughness'], 'linear-gradient(90deg,#c84,#fd9)']];
  G.forEach(([l, bg], i) => { const x = 23.4 + (i % 2) * 4, y = 1.0 + Math.floor(i / 2) * 3.0; rect(S, 'g' + i, x, y, 3.7, 2.0, 'line', 0, 0, { r: .2, css: `background:${bg}!important;border:.06em solid var(--line)` }); vis0(S, 'g' + i, 2); T(S, 'gl' + i, x, y + 2.05, l, 'cz-tc gxx-tiny', 2, { w: 3.7 }); });
  ar(S, 'gpa', [21.9, 2.0], [23.3, 2.0], 'ink-3', 2, { h: .08 }); T(S, 'gbl', 14.6, 4.6, ['G-버퍼 (조명 계산 없음) →', 'G-buffer (no lighting yet) →'], 'gxx-xs gxx-a', 2, { w: 8.4, css: 'text-align:right' });
  box2(S, 'lp', 15.4, 8.4, 8.4, 1.6, ['② 조명 패스', '② lighting pass'], 'ok', 3, { pct: 28 });
  elb(S, 'gla', [[27.2, 6.8], [27.2, 9.2], [23.9, 9.2]], 'ink-3', 3, { h: .08 });
  T(S, 'lights', 15.4, 10.4, ['💡 × 100: 조명마다 영향받는 픽셀만', '💡 × 100: each light touches only its pixels'], 'gxx-xs gxx-g', 3);
  T(S, 'cost', 15.4, 11.5, ['비용 ≈ 화면 픽셀 × 그 픽셀의 조명 수', 'cost ≈ screen pixels × lights on them'], 'gxx-xs', 3);
  [['✗ 투명한 물체는 따로 포워드로', '✗ transparency needs a forward pass'], ['✗ MSAA가 어렵고 G-버퍼 대역폭이 커요', '✗ hard MSAA, heavy G-buffer bandwidth'], ['→ 대안: Forward+ (타일별 조명 추려내기)', '→ alternative: Forward+ (tiled light culling)']].forEach((t, i) => T(S, 'd' + i, 1, 8.4 + i * 1.1, t, 'gxx-xs' + (i < 2 ? ' gxx-r' : ' gxx-a'), 4));
  stepT(S, 'k', 1, 13.0, [['포워드 렌더링은 물체를 그릴 때마다 모든 조명을 계산해요 · 조명이 많으면 폭발', 'forward rendering lights every object with every light as it draws · it explodes with many lights'], ['디퍼드 1단계: 조명 없이 색·법선·깊이·재질만 화면 크기 텍스처들(G-버퍼)에 써요', 'deferred step 1: write albedo, normals, depth and material to screen-sized textures (the G-buffer)'], ['2단계: 조명마다 영향받는 화면 픽셀만 G-버퍼를 읽어 계산 → 조명 수백 개도 OK', 'step 2: each light shades only the pixels it touches from the G-buffer → hundreds of lights are fine'], ['대가: 투명 처리, MSAA, 메모리 대역폭 · 그래서 Forward+도 많이 써요', 'the price: transparency, MSAA and bandwidth · hence the popularity of Forward+']]);
  fin(S, 'z', 14.4, [['디퍼드 셰이딩: 기하 정보를 먼저 모으고, 조명은 보이는 픽셀에만 나중에 계산', 'deferred shading gathers geometry first and lights only the visible pixels afterwards', 'gxx-xs gxx-a'], ['조명이 많은 실내·도시 장면에 강하고, 언리얼·유니티 HDRP 등 엔진이 지원해요', 'it shines in scenes with many lights and is supported by engines such as Unreal and Unity HDRP']]);
  S.cap(1, '포워드: 물체 × 조명', 'Forward: objects × lights').cap(2, 'G-버퍼에 먼저 기록', 'Write the G-buffer first').cap(3, '조명은 나중에, 픽셀만', 'Light later, per pixel').cap(4, '장단점', 'Trade-offs').cap(5, '디퍼드 셰이딩', 'Deferred shading');
  return S;
}

/* ================= advanced ================= */
function sSdf() {
  const S = scene({ id: 'gx-sdf', steps: 5, per: 1.6 });
  const C1 = [21, 6.4], R1 = 3, C3 = [9.6, 12.4], R3 = 1.6, O = [5.5, 8];
  const d = p => Math.min(Math.hypot(p[0] - C1[0], p[1] - C1[1]) - R1, Math.hypot(p[0] - C3[0], p[1] - C3[1]) - R3);
  rect(S, 'c1', C1[0] - R1, C1[1] - R1, 2 * R1, 2 * R1, 'accent', 35, 0, { r: R1, css: 'border:.1em solid var(--accent)' });
  rect(S, 'c3', C3[0] - R3, C3[1] - R3, 2 * R3, 2 * R3, 'warn', 35, 0, { r: R3, css: 'border:.1em solid var(--warn)' });
  const PP = [27.5, 13.5], dp = d(PP);
  pt(S, 'pp', PP[0], PP[1], 1, C.cur, .3, { off: 2 }); const u = [C1[0] - PP[0], C1[1] - PP[1]], ul = Math.hypot(...u);
  ar(S, 'pd', PP, [PP[0] + u[0] / ul * dp, PP[1] + u[1] / ul * dp], 'accent', 1, { h: .08, off: 2 });
  T(S, 'pdl', 25.6, 14.3, 'd(p) = ' + dp.toFixed(1), 'cz-mono gxx-xs gxx-a', 1, { off: 2 });
  T(S, 'def', 1, .4, 'd(p) = min( |p − c₁| − r₁ , |p − c₂| − r₂ )', 'cz-mono gxx-xs gxx-a', 1);
  const dir = (() => { const v = [14, -1.2], l = Math.hypot(...v); return [v[0] / l, v[1] / l]; })();
  const steps = []; let p = O.slice();
  for (let i = 0; i < 12; i++) { const r = d(p); steps.push([p.slice(), r]); if (r < .06) break; p = [p[0] + dir[0] * r, p[1] + dir[1] * r]; }
  pt(S, 'o', O[0], O[1], 0, C.badf, .35); T(S, 'ol', O[0] - 2.4, O[1] + .5, ['카메라', 'camera'], 'cz-tc gxx-tiny', 0, { w: 4.8 });
  const hit = steps[steps.length - 1][0];
  seg(S, 'ray', O, hit, 2, 'ink-3', .06, { dash: 1 });
  steps.forEach(([q, r], i) => { const st = i === 0 ? 2 : 3; if (r > .25) ring(S, 'sr' + i, q[0], q[1], r, 'accent', st, { w: .06, dash: 1 }); if (i) pt(S, 'sp' + i, q[0], q[1], st, C.cur, .2); });
  pt(S, 'hit', hit[0], hit[1], 3, C.okf, .35); T(S, 'hitl', hit[0] - 3.2, hit[1] - 1.5, ['맞음 ✓ (' + steps.length + '걸음)', 'hit ✓ (' + steps.length + ' steps)'], 'cz-tc gxx-xs gxx-g', 3, { w: 6.4 });
  T(S, 'sm', 1, 15.0, ['부드러운 합집합 smin(d₁, d₂, k) · 반복 mod(p, s) · 부드러운 그림자', 'smooth union smin(d₁, d₂, k) · repetition mod(p, s) · soft shadows'], 'cz-mono gxx-xs', 4);
  stepT(S, 'k', 1, 16.4, [['SDF: 점 p에서 가장 가까운 표면까지의 거리를 돌려주는 함수 · 원은 |p − c| − r', 'an SDF returns the distance from p to the nearest surface · a circle is |p − c| − r'], ['광선 위의 현재 점에서 d만큼은 아무것도 없으니, 그만큼 한 번에 전진해요', 'nothing lies within d of the current point, so the ray can jump forward by d'], ['표면에 가까워질수록 걸음이 줄고, d가 ε보다 작아지면 맞은 거예요', 'steps shrink near the surface; once d drops below ε, it’s a hit'], ['식 몇 줄로 부드럽게 녹아 붙은 모양, 무한 반복, 부드러운 그림자를 만들어요', 'a few lines of math give smoothly blended shapes, infinite repetition and soft shadows']]);
  fin(S, 'z', 17.8, [['레이 마칭(구 추적): SDF 값만큼 성큼성큼 나아가 표면을 찾는 렌더링 방법', 'ray marching (sphere tracing) finds surfaces by stepping forward by the SDF value', 'gxx-xs gxx-a'], ['셰이더토이 데모, SDF 글꼴 렌더링, UI 도형, 볼류메트릭 효과에 쓰여요', 'used in Shadertoy demos, SDF font rendering, UI shapes and volumetric effects']]);
  S.cap(1, '거리 함수', 'A distance function').cap(2, '안전한 만큼 전진', 'Step as far as is safe').cap(3, '표면에 닿을 때까지', 'Until it reaches a surface').cap(4, '식으로 만드는 모양', 'Shapes from formulas').cap(5, 'SDF와 레이 마칭', 'SDFs and ray marching');
  return S;
}

/* ================= split-out cards ================= */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'gxx-xs', i + 1, { off: i + 2 }));
const gray = (S, k, x, y, w, h, v, st, off) => { S.el(k, { x, y, w, h, css: `background:rgb(${v},${v},${v});border-radius:.15em`, s: st ? hid() : {} }); vis(S, k, st, off); };
function sGamma() {
  const S = scene({ id: 'gx-gamma', steps: 5, per: 1.7 });
  const F = fr(0, 1, 0, 1, 2.6, 12.6, 2.4, 12.4);
  hl(S, 'fx', F.L, F.R, F.B, 'ink-3', 0, { w: .08 }); vl(S, 'fy', F.L, F.T, F.B, 'ink-3', 0, { w: .08 });
  mline(S, 'id', F, [0, 0], [1, 1], { st: 0, color: 'ink-3', h: .06, dash: 1 });
  mplot(S, 'dc', F, t => [t, Math.pow(t, 2.2)], 0, 1, { st: 0, color: 'danger', h: .12, n: 40 });
  mplot(S, 'ec', F, t => [t, Math.pow(t, 1 / 2.2)], 0, 1, { st: 1, color: 'ok', h: .12, n: 40, off: 3 });
  T(S, 'dcl', 6.4, .2, ['화면: 빛 = 값^2.2', 'display: L = v^2.2'], 'gxx-xs gxx-r', 0);
  T(S, 'ecl', 6.4, 1.2, ['인코딩: 값 = 빛^(1/2.2)', 'encode: v = L^(1/2.2)'], 'gxx-xs gxx-g', 1, { off: 3 });
  mpt(S, 'p5', F, [.5, Math.pow(.5, 2.2)], 0, C.badf, .22); mline(S, 'p5v', F, [.5, 0], [.5, .218], { st: 0, color: 'danger', h: .05, dash: 1 }); mline(S, 'p5h', F, [0, .218], [.5, .218], { st: 0, color: 'danger', h: .05, dash: 1 });
  T(S, 'p5l', F.X(.5) + .4, F.Y(.218) - .3, ['128 → 빛 22%', '128 → 22% light'], 'cz-mono gxx-xs gxx-r', 0);
  T(S, 'xl', F.R - 6, F.B + .2, ['저장된 값 (0~1)', 'stored value (0–1)'], 'gxx-xs', 0, { w: 6, css: 'text-align:right' }); T(S, 'yl', F.L + .3, F.T - 1.0, ['나오는 빛', 'light out'], 'gxx-xs', 0);
  const R = 14.6, SW = 2.0;
  T(S, 's0', R, .8, ['빛의 양이 고른 8단계', '8 steps even in light'], 'gxx-xs', 2, { off: 3 });
  for (let i = 0; i < 8; i++) gray(S, 'sa' + i, R + i * SW, 1.9, SW - .1, 1.6, Math.round(255 * Math.pow(i / 7, 1 / 2.2)), 2, 3);
  T(S, 's1', R, 4.0, ['값이 고른 8단계 (감마 인코딩)', '8 steps even in value (gamma-encoded)'], 'gxx-xs', 2, { off: 3 });
  for (let i = 0; i < 8; i++) gray(S, 'sb' + i, R + i * SW, 5.1, SW - .1, 1.6, Math.round(255 * i / 7), 2, 3);
  T(S, 's2', R, 7.2, ['눈은 어두운 쪽 차이에 민감 → 8비트를 어두운 쪽에 더 배분', 'eyes notice dark differences → spend more of 8 bits on darks'], 'gxx-xs gxx-g', 2, { off: 3, w: 16.4 });
  const SWX = [[R, 0, ['검정', 'black']], [R + 4.2, 255, ['흰색', 'white']], [R + 8.4, 128, ['sRGB 평균 128 ✗', 'sRGB avg 128 ✗']], [R + 12.6, 186, ['선형 평균 186 ✓', 'linear avg 186 ✓']]];
  T(S, 'b0', R, .8, ['검정과 흰색을 반반 섞으면?', 'mix black and white 50/50?'], 'gxx-xs gxx-a', 3, { off: 4 });
  SWX.forEach(([x, v, l], i) => { gray(S, 'bw' + i, x, 1.9, 3.8, 2.6, v, 3, 4); T(S, 'bl' + i, x - .2, 4.7, l, 'cz-tc gxx-xs ' + (i === 2 ? 'gxx-r' : i === 3 ? 'gxx-g' : ''), 3, { w: 4.2, off: 4 }); });
  T(S, 'b5', R, 6.4, ['값끼리 평균하면 빛은 22%뿐이라 너무 어두워요', 'averaging encoded values yields only 22% light: too dark'], 'gxx-xs', 3, { off: 4, w: 16.4 });
  T(S, 'b6', R, 7.5, ['선형으로 풀고 → 평균 0.5 → 다시 인코딩', 'decode to linear → average 0.5 → re-encode'], 'gxx-xs gxx-g', 3, { off: 4, w: 16.4 });
  const PL = [['sRGB 텍스처', 'sRGB texture'], ['^2.2 풀기', 'decode ^2.2'], ['조명·블렌딩', 'light & blend'], ['^(1/2.2)', 'encode ^(1/2.2)'], ['화면', 'display']];
  PL.forEach((l, i) => { const x = R + (i % 3) * 5.6, y = i < 3 ? 1.6 : 4.4; box2(S, 'pl' + i, x, y, 5.0, 1.4, l, i === 2 ? 'accent' : 'line', 4, { pct: 20 }); });
  ar(S, 'pa0', [R + 5.0, 2.3], [R + 5.6, 2.3], 'ink-2', 4, { h: .08 }); ar(S, 'pa1', [R + 10.6, 2.3], [R + 11.2, 2.3], 'ink-2', 4, { h: .08 }); ar(S, 'pa2', [R + 13.7, 3.0], [R + 2.5, 4.4], 'ink-2', 4, { h: .08 }); ar(S, 'pa3', [R + 5.0, 5.1], [R + 5.6, 5.1], 'ink-2', 4, { h: .08 });
  T(S, 'pn', R, 6.6, ['GPU가 sRGB 텍스처·프레임버퍼 형식으로 자동 변환', 'GPUs convert automatically with sRGB texture and framebuffer formats'], 'gxx-xs gxx-g', 4, { w: 16.4 });
  T(S, 'pn2', R, 7.7, ['노멀 맵 같은 데이터 텍스처는 풀면 안 돼요', 'data textures such as normal maps must not be decoded'], 'gxx-xs gxx-w', 4, { w: 16.4 });
  notesSplit(S, 'k', 15.6, [['화면은 저장된 값을 약 2.2제곱해서 빛으로 내보내요 · 값 128(0.5)은 빛 22%예요', 'displays turn stored values into light by roughly the 2.2 power · 128 (0.5) emits 22% light'], ['그래서 저장할 때는 1/2.2제곱으로 눌러 둬요 · 눈이 민감한 어두운 쪽에 비트를 더 쓰는 셈이에요', 'so images are stored with the 1/2.2 power, spending more bits on the darks our eyes notice'], ['인코딩된 값끼리 섞으면 결과가 너무 어두워요 · 검정과 흰색의 정확한 반반은 186이에요', 'mixing encoded values comes out too dark · the true half of black and white is 186'], ['계산은 선형 빛으로 풀어서 하고 마지막에 다시 인코딩해요 · 데이터 텍스처는 예외예요', 'decode to linear light, compute, and encode at the end, except for data textures']]);
  fin(S, 'z', 15.6, [['감마 보정: 저장값과 빛 사이의 비선형 곡선을 이해하고 계산은 선형 공간에서 하기', 'gamma correction means respecting the non-linear curve between stored values and light, and computing in linear space', 'gxx-xs gxx-a'], ['틀리면 블렌딩·안티앨리어싱 가장자리가 어둡고, 조명이 너무 강하게 꺾여 보여요', 'getting it wrong darkens blends and antialiased edges and makes lighting fall off too harshly'], ['sRGB 곡선은 정확히는 어두운 끝이 직선인 구간 함수 · 2.2제곱은 근사예요', 'the exact sRGB curve is piecewise with a linear toe; the 2.2 power is an approximation']]);
  S.cap(1, '화면의 감마 곡선', 'The display’s gamma curve').cap(2, '왜 눌러서 저장하나', 'Why values are encoded').cap(3, '잘못된 섞기', 'Blending done wrong').cap(4, '선형 작업 흐름', 'The linear workflow').cap(5, '감마 보정', 'Gamma correction');
  return S;
}

function sGimbal() {
  const S = scene({ id: 'gx-gimbal', steps: 5, per: 1.7 });
  const axes = (k, cx, cy, roll, st, off, lock) => {
    ar(S, k + 'y', [cx, cy], [cx, cy - 4.2], 'accent', st, { h: .14, off }); T(S, k + 'yl', lock ? cx - 3.8 : cx + .3, cy - 4.6, ['yaw 축', 'yaw axis'], 'gxx-xs gxx-a', st, { off, w: 3.5, css: lock ? 'text-align:right' : '' });
    ar(S, k + 'p', [cx, cy], [cx - 3.0, cy + 2.2], 'ok', st, { h: .14, off }); T(S, k + 'pl', cx - 5.6, cy + 2.3, ['pitch 축', 'pitch axis'], 'gxx-xs gxx-g', st, { off });
    if (!lock) { ar(S, k + 'r', [cx, cy], [cx + 4.4, cy], 'warn', st, { h: .14, off }); T(S, k + 'rl', cx + 2.0, cy + .3, ['roll 축 (기수)', 'roll axis (nose)'], 'gxx-xs gxx-w', st, { off }); }
    else { ar(S, k + 'r', [cx + .25, cy], [cx + .25, cy - 4.2], 'danger', st, { h: .14, off }); T(S, k + 'rl', cx + .6, cy - 3.6, ['roll 축도 여기로', 'roll axis lands here too'], 'gxx-xs gxx-r', st, { off }); } };
  T(S, 'h0', 1, .2, ['평소: 세 축이 서로 수직', 'normally: three perpendicular axes'], 'gxx-xs gxx-a', 0);
  axes('a', 6.4, 6.2, 0, 0, 0, false);
  box2(S, 'body', 5.2, 5.6, 2.4, 1.2, '', 'line', 0, { pct: 22 });
  T(S, 'h1', 16.4, .2, ['pitch = 90° (기수를 위로)', 'pitch = 90° (nose straight up)'], 'gxx-xs gxx-r', 1);
  axes('b', 22.0, 6.2, 0, 1, 0, true);
  box2(S, 'body2', 21.4, 4.6, 1.2, 2.4, '', 'line', 1, { pct: 22 });
  T(S, 'h1b', 16.4, 9.4, ['yaw와 roll이 같은 축 → 자유도 하나를 잃어요', 'yaw and roll share one axis → one degree of freedom is lost'], 'gxx-xs gxx-r', 1, { w: 14.8 });
  const EQ = [['yaw 30°, pitch 90°, roll 0°', 'yaw 0°, pitch 90°, roll −30°'], ['yaw 20°, pitch 90°, roll 10°', 'yaw 0°, pitch 90°, roll −10°']];
  T(S, 'e0', 1, 10.6, ['pitch 90°에서는 서로 다른 각도가 같은 자세가 돼요', 'at pitch 90°, different angles give the same orientation'], 'gxx-xs gxx-a', 2, { off: 3 });
  EQ.forEach(([a, b], i) => { T(S, 'ea' + i, 1, 11.7 + i * 1.1, a, 'cz-mono gxx-xs', 2, { off: 3 }); T(S, 'eq' + i, 11.4, 11.7 + i * 1.1, '=', 'cz-mono gxx-xs gxx-r', 2, { off: 3 }); T(S, 'eb' + i, 12.4, 11.7 + i * 1.1, b, 'cz-mono gxx-xs', 2, { off: 3 }); });
  T(S, 'e3', 23.4, 11.7, ['yaw − roll만 의미가 있어요', 'only yaw − roll matters'], 'gxx-xs gxx-r', 2, { off: 3 });
  T(S, 'm0', 1, 10.6, ['애니메이션에서는 이 근처를 지날 때 물체가 갑자기 휙 돌아요', 'animations passing near it make objects suddenly flip around'], 'gxx-xs gxx-w', 3, { off: 4 });
  T(S, 'm1', 1, 11.7, ['아폴로 11호의 관성 측정 장치도 3축 짐벌이라 이 자세를 피해야 했어요', 'Apollo 11’s three-gimbal IMU also had to avoid this attitude'], 'gxx-xs', 3, { off: 4 });
  T(S, 'q0', 1, 10.6, ['해결: 자세는 쿼터니언(또는 회전 행렬)으로 저장하고 회전을 곱해 쌓기', 'fix: store orientation as a quaternion (or matrix) and compose rotations by multiplying'], 'gxx-xs gxx-g', 4);
  T(S, 'q1', 1, 11.7, ['오일러 각은 사람이 입력·표시할 때만 변환해서 써요', 'convert to Euler angles only for human input and display'], 'gxx-xs', 4);
  T(S, 'q2', 1, 12.8, 'q = (w, x, y, z) · q_new = q_delta × q', 'cz-mono gxx-xs gxx-a', 4);
  notesSplit(S, 'k', 15.6, [['오일러 각은 yaw·pitch·roll 세 축을 차례로 돌려 자세를 나타내요 · 평소엔 세 축이 서로 수직이에요', 'Euler angles describe orientation by rotating about yaw, pitch and roll in turn, normally three perpendicular axes'], ['pitch가 90°가 되면 roll 축이 yaw 축과 겹쳐요 · 두 각을 바꿔도 같은 방향으로만 돌아요', 'at a pitch of 90° the roll axis lines up with the yaw axis, so both angles rotate about the same direction'], ['그래서 서로 다른 각도 조합이 같은 자세가 되고, 잃어버린 방향으로는 바로 돌 수 없어요', 'different angle combinations then mean the same orientation, and the lost direction is unreachable directly'], ['자세를 쿼터니언으로 저장하고 회전을 곱해 쌓으면 짐벌 락이 생기지 않아요', 'storing orientation as a quaternion and composing rotations by multiplication avoids gimbal lock']]);
  fin(S, 'z', 15.6, [['짐벌 락: 오일러 각에서 두 회전축이 겹쳐 자유도 하나를 잃는 현상', 'gimbal lock is the loss of one degree of freedom when two Euler rotation axes line up', 'gxx-xs gxx-a'], ['각도 값의 문제이지 실제 회전이 불가능한 건 아니에요 · 표현을 바꾸면 사라져요', 'it is a problem of the angle representation, not of rotation itself, and disappears with another representation'], ['게임 엔진의 Transform도 내부적으로 쿼터니언을 쓰고, 인스펙터에서만 각도로 보여 줘요', 'game-engine transforms store quaternions internally and show angles only in the inspector']]);
  S.cap(1, '세 개의 회전축', 'Three rotation axes').cap(2, '두 축이 겹치면', 'When two axes line up').cap(3, '같은 자세, 다른 각도', 'Same pose, different angles').cap(4, '실제로 생기는 문제', 'Where it bites').cap(5, '짐벌 락', 'Gimbal lock');
  return S;
}

function sTexFilter() {
  const S = scene({ id: 'gx-filter', steps: 5, per: 1.7 });
  const TX = [[10, 70, 30, 90], [80, 20, 60, 15], [25, 85, 10, 55], [65, 40, 95, 30]], CS = .9;
  T(S, 'n0', 1, .2, ['4×4 텍스처를 8×8 픽셀로 확대', 'a 4×4 texture magnified to 8×8 pixels'], 'gxx-xs gxx-a', 0);
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { rect(S, `nn${i}${j}`, 1 + j * CS, 1.6 + i * CS, CS - .04, CS - .04, 'accent', TX[i >> 1][j >> 1], 0, { r: 0 }); }
  T(S, 'nl', 1, 9.0, ['최근접: 계단처럼 각져요', 'nearest: blocky'], 'gxx-xs gxx-r', 0);
  const bil = (u, v) => { u = Math.max(0, Math.min(3, u)); v = Math.max(0, Math.min(3, v)); const i0 = Math.min(2, Math.floor(v)), j0 = Math.min(2, Math.floor(u)), fu = u - j0, fv = v - i0; return TX[i0][j0] * (1 - fu) * (1 - fv) + TX[i0][j0 + 1] * fu * (1 - fv) + TX[i0 + 1][j0] * (1 - fu) * fv + TX[i0 + 1][j0 + 1] * fu * fv; };
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) rect(S, `bl${i}${j}`, 9.4 + j * CS, 1.6 + i * CS, CS - .04, CS - .04, 'accent', Math.round(bil((j - .5) / 2, (i - .5) / 2)), 1, { r: 0 });
  T(S, 'bll', 9.4, 9.0, ['쌍선형: 부드러워요', 'bilinear: smooth'], 'gxx-xs gxx-g', 1);
  const BX = 19.6, BY = 1.6, BS = 3.2;
  [[0, 0, 'A'], [1, 0, 'B'], [0, 1, 'C'], [1, 1, 'D']].forEach(([a, b, l], i) => cell(S, 'q' + i, BX + a * BS, BY + b * BS, BS - .1, BS - .1, l, 'accent', [20, 60, 40, 80][i], 1, { off: 3 }));
  pt(S, 'sp', BX + BS * .8, BY + BS * 1.1, 1, C.badf, .25, { off: 3 });
  T(S, 'w0', BX, 8.4, ['샘플 위치 u = 0.3, v = 0.6', 'sample at u = 0.3, v = 0.6'], 'cz-mono gxx-xs', 2, { off: 3 });
  T(S, 'w1', BX, 9.5, 'A·0.28 + B·0.12 + C·0.42 + D·0.18', 'cz-mono gxx-xs gxx-a', 2, { off: 3 });
  T(S, 'w2', BX, 10.6, ['가까운 텍셀일수록 가중치가 커요', 'nearer texels weigh more'], 'gxx-xs', 2, { off: 3 });
  const MP = [[8, 0], [4, 1], [2, 2], [1, 3]]; let mx = BX;
  MP.forEach(([n, l], i) => { const s = n * .5; rect(S, 'mp' + i, mx, 1.6, s, s, i === 2 || i === 3 ? 'warn' : 'line', i === 2 || i === 3 ? 40 : 16, 3, { r: .1, off: 4 }); T(S, 'mpl' + i, mx - .2, 1.6 + s + .2, 'L' + l, 'cz-tc cz-mono gxx-xs', 3, { w: s + .4, off: 4 }); mx += s + .5; });
  T(S, 't0', BX, 7.0, ['멀어서 텍셀 여러 개가 한 픽셀에 → 밉맵', 'far away, many texels per pixel → mipmaps'], 'gxx-xs', 3, { off: 4, w: 11.6 });
  T(S, 't1', BX, 8.1, ['삼선형: 단계 2.3 = L2 70% + L3 30%', 'trilinear: level 2.3 = 70% L2 + 30% L3'], 'cz-mono gxx-xs gxx-w', 3, { off: 4 });
  T(S, 't2', BX, 9.2, ['밉 경계에서 선이 보이지 않게 섞어요', 'blends levels so mip seams vanish'], 'gxx-xs', 3, { off: 4 });
  for (let i = 0; i < 5; i++) for (let j = 0; j < 7; j++) rect(S, `ag${i}${j}`, BX + j * 1.6, 1.4 + i * 1.0, 1.55, .95, 'line', (i + j) % 2 ? 8 : 18, 4, { r: 0 });
  S.el('fp', { x: BX + .6, y: 2.9, w: 9.6, h: 1.5, css: 'border-radius:50%;border:.14em solid var(--danger)', s: hid() }); vis(S, 'fp', 4);
  for (let i = 0; i < 4; i++) pt(S, 'as' + i, BX + 2.0 + i * 2.3, 3.65, 4, C.badf, .2);
  T(S, 'a0', BX, 7.0, ['비스듬한 바닥: 픽셀이 텍스처 위에서 길쭉한 영역', 'oblique floors: a pixel covers a long thin area'], 'gxx-xs', 4, { w: 11.6 });
  T(S, 'a1', BX, 8.1, ['비등방성: 긴 방향을 따라 여러 번(최대 16×) 샘플', 'anisotropic: several samples (up to 16×) along it'], 'gxx-xs gxx-g', 4, { w: 11.6 });
  T(S, 'a2', BX, 9.2, ['멀리 있는 바닥도 흐려지지 않고 선명해요', 'distant floors stay sharp instead of blurring'], 'gxx-xs', 4, { w: 11.6 });
  notesSplit(S, 'k', 15.6, [['텍스처를 크게 확대할 때 가장 가까운 텍셀만 쓰면 계단처럼 각져요', 'magnifying a texture with only the nearest texel looks blocky'], ['쌍선형 필터는 이웃 텍셀 넷을 거리에 따라 섞어요 · 가까울수록 가중치가 커요', 'bilinear filtering blends the four neighbouring texels by distance, nearer ones weighing more'], ['축소될 때는 밉맵 단계를 고르고, 삼선형은 두 단계 사이도 섞어 경계를 없애요', 'when minified, a mip level is chosen, and trilinear also blends between two levels to hide seams'], ['비스듬히 보이는 면은 픽셀 영역이 길쭉해서, 비등방성 필터가 그 방향으로 여러 번 샘플해요', 'surfaces seen at a grazing angle cover long footprints, so anisotropic filtering samples along them']]);
  fin(S, 'z', 15.6, [['텍스처 필터링: 픽셀 하나에 해당하는 텍스처 영역의 색을 텍셀들을 섞어 정하는 방법', 'texture filtering decides a pixel’s colour by blending the texels its footprint covers', 'gxx-xs gxx-a'], ['최근접(픽셀 아트용) < 쌍선형 < 삼선형 < 비등방성 순으로 품질과 비용이 올라가요', 'nearest (for pixel art) < bilinear < trilinear < anisotropic in quality and cost'], ['GPU의 텍스처 유닛이 하드웨어로 해 줘서, 셰이더에서는 샘플러 설정만 고르면 돼요', 'GPU texture units do it in hardware; shaders just choose sampler settings']]);
  S.cap(1, '최근접 필터', 'Nearest filtering').cap(2, '쌍선형 필터', 'Bilinear filtering').cap(3, '삼선형과 밉맵', 'Trilinear and mipmaps').cap(4, '비등방성 필터', 'Anisotropic filtering').cap(5, '텍스처 필터링', 'Texture filtering');
  return S;
}

function sDrawCall() {
  const S = scene({ id: 'gx-drawcall', steps: 5, per: 1.7 });
  T(S, 'h0', 1, .2, ['나무 10,000그루를 하나씩 그리면', 'drawing 10,000 trees one at a time'], 'gxx-xs gxx-a', 0);
  T(S, 'cl', 1, 1.6, 'CPU', 'cz-mono gxx-xs', 0); T(S, 'gl', 1, 3.2, 'GPU', 'cz-mono gxx-xs', 0);
  for (let i = 0; i < 24; i++) { rect(S, 'c' + i, 3.4 + i * 1.1, 1.4, .95, 1.1, 'danger', 40, 0, { r: .1, off: 2 }); if (i % 3 === 2) rect(S, 'g' + i, 3.4 + i * 1.1, 3.0, .7, 1.1, 'ok', 40, 0, { r: .1, off: 2 }); }
  T(S, 'n0', 1, 4.8, ['드로우 콜마다 상태 설정·검증·명령 전송 → CPU가 병목, GPU는 놀아요', 'every draw call sets state, validates and submits → the CPU bottlenecks while the GPU idles'], 'gxx-xs gxx-r', 1, { off: 2 });
  rect(S, 'c1', 3.4, 1.4, 2.0, 1.1, 'ok', 40, 2, { r: .1 }); rect(S, 'g1x', 5.6, 3.0, 20.0, 1.1, 'ok', 45, 2, { r: .1 });
  T(S, 'c1l', 5.8, 1.5, ['드로우 콜 1번', 'one draw call'], 'gxx-xs gxx-g', 2); T(S, 'g1l', 6.0, 3.1, ['GPU가 메시를 10,000번 반복', 'the GPU repeats the mesh 10,000 times'], 'gxx-xs', 2);
  T(S, 'ib', 1, 4.8, ['인스턴싱: 메시 하나 + 인스턴스 버퍼', 'instancing: one mesh + an instance buffer'], 'gxx-xs gxx-a', 2, { off: 3 });
  [['#', 'pos', 'rot', 'scale'], ['0', '(3, 0, 8)', '40°', '1.1'], ['1', '(7, 0, 2)', '95°', '0.9'], ['…', '…', '…', '…']].forEach((r, i) => r.forEach((v, j) => T(S, `it${i}${j}`, 1 + [0, 1.6, 6.4, 9.6][j], 6.0 + i * 1.0, v, 'cz-mono gxx-xs ' + (i ? '' : 'gxx-a'), 2, { off: 3 })));
  T(S, 'b0', 1, 4.8, ['재질이 달라 인스턴싱이 안 될 때', 'when materials differ and instancing does not apply'], 'gxx-xs gxx-a', 3, { off: 4 });
  const D1 = ['A', 'B', 'A', 'C', 'B', 'A', 'C', 'B'], D2 = [...D1].sort(), col = { A: 'accent', B: 'ok', C: 'warn' };
  T(S, 'b1', 1, 6.1, ['그대로', 'as submitted'], 'gxx-xs', 3, { off: 4 }); T(S, 'b2', 1, 7.6, ['재질별 정렬', 'sorted by material'], 'gxx-xs gxx-g', 3, { off: 4 });
  D1.forEach((m, i) => cell(S, 'd1' + i, 6.0 + i * 1.6, 5.9, 1.4, 1.1, m, col[m], 30, 3, { off: 4 })); D2.forEach((m, i) => cell(S, 'd2' + i, 6.0 + i * 1.6, 7.4, 1.4, 1.1, m, col[m], 30, 3, { off: 4 }));
  T(S, 'b3', 19.4, 6.1, ['상태 변경 7번', '7 state changes'], 'gxx-xs gxx-r', 3, { off: 4 }); T(S, 'b4', 19.4, 7.6, ['상태 변경 2번', '2 state changes'], 'gxx-xs gxx-g', 3, { off: 4 });
  T(S, 'b5', 1, 9.0, ['정적 배칭(메시 합치기)과 텍스처 아틀라스로 같은 재질을 늘려요', 'static batching (merged meshes) and texture atlases let more objects share a material'], 'gxx-xs', 3, { off: 4 });
  T(S, 'm0', 1, 4.8, ['최신 API와 GPU 주도 렌더링', 'modern APIs and GPU-driven rendering'], 'gxx-xs gxx-a', 4);
  T(S, 'm1', 1, 6.0, ['Vulkan·DX12·Metal: 호출당 비용이 작고 여러 스레드가 명령을 동시에 기록', 'Vulkan, DX12 and Metal: cheaper calls, with commands recorded on many threads'], 'gxx-xs', 4);
  T(S, 'm2', 1, 7.1, ['간접 그리기: GPU가 컬링하고 그릴 목록을 스스로 만들어 한 번에 실행', 'indirect draws: the GPU culls and builds its own draw list, executed in one go'], 'gxx-xs', 4);
  T(S, 'm3', 1, 8.2, ['그래도 측정이 먼저 · 프로파일러에서 드로우 콜 수와 CPU 프레임 시간을 확인', 'measure first: check draw counts and CPU frame time in a profiler'], 'gxx-xs gxx-w', 4);
  notesSplit(S, 'k', 15.6, [['드로우 콜마다 CPU는 상태를 설정하고 검증해 명령을 보내요 · 수만 번이면 CPU가 먼저 한계예요', 'each draw call makes the CPU set state, validate and submit commands · tens of thousands of them exhaust the CPU first'], ['같은 메시는 인스턴싱으로 한 번에 · 위치·회전만 다른 버퍼를 넘기면 GPU가 반복해서 그려요', 'identical meshes go out in one instanced call, with a buffer of per-instance transforms the GPU repeats'], ['재질이 다르면 재질별로 정렬해 상태 변경을 줄이고, 합칠 수 있는 메시는 합쳐요', 'with different materials, sort by material to cut state changes and merge meshes where possible'], ['최신 API는 호출 비용을 줄이고, GPU가 스스로 그릴 목록을 만드는 방식까지 와 있어요', 'modern APIs cut per-call cost, and GPU-driven pipelines now build their own draw lists']]);
  fin(S, 'z', 15.6, [['드로우 콜: CPU가 GPU에게 “이 메시를 이 상태로 그려라”라고 보내는 명령 · 개수가 성능을 좌우해요', 'a draw call is the CPU telling the GPU to draw a mesh with given state, and their count drives performance', 'gxx-xs gxx-a'], ['인스턴싱, 배칭, 재질 정렬, 아틀라스, 컬링·LOD가 모두 호출 수를 줄이는 도구예요', 'instancing, batching, material sorting, atlases, culling and LOD all reduce the number of calls'], ['모바일은 CPU 여유가 적어 드로우 콜을 수백 개 단위로 관리하기도 해요', 'on mobile, with little CPU headroom, budgets are often a few hundred draw calls']]);
  S.cap(1, 'CPU가 병목', 'The CPU bottleneck').cap(2, '인스턴싱', 'Instancing').cap(3, '재질 정렬과 배칭', 'Sorting and batching').cap(4, '최신 API', 'Modern APIs').cap(5, '드로우 콜', 'Draw calls');
  return S;
}

return { css: CSSX, secs: [], add: {
  'gx-rast': [
    item('gx-clip', '클리핑', 'Clipping', '화면(보이는 영역) 밖으로 나간 도형 부분을 잘라내, 래스터화할 부분만 남기는 단계예요.', '삼각형의 일부가 화면 밖에 있으면 그대로 래스터화하는 건 낭비이고, 카메라 뒤에 있는 점은 원근 나눗셈을 깨뜨려요. 서덜랜드-호지먼 알고리즘은 경계 하나씩(왼쪽, 위, 오른쪽, 아래) 차례로 잘라요. 안쪽 점은 남기고, 경계를 가로지르는 변에는 교점을 새로 추가해요. 결과는 화면 안의 볼록 다각형이고, 한 꼭짓점에서 부채꼴로 나눠 삼각형 여러 개로 래스터라이저에 넘겨요. GPU는 투영 뒤 클립 공간(−w ≤ x, y, z ≤ w)에서 자르고, 가드 밴드를 둬서 실제로 잘라야 하는 경우를 줄여요.', 'Clipping cuts away the parts of a primitive outside the visible region so that only what will be rasterized remains.', 'Rasterizing a triangle partly off-screen wastes work, and vertices behind the camera break the perspective divide. The Sutherland–Hodgman algorithm clips against one boundary at a time (left, top, right, bottom), keeping inside points and adding an intersection point wherever an edge crosses. The result is a convex polygon inside the screen, split into a fan of triangles from one vertex for the rasterizer. GPUs clip in clip space (−w ≤ x, y, z ≤ w) after projection, and a guard band reduces how often real clipping is needed.', sClip()),
    item('gx-blend', '알파 블렌딩과 투명 객체', 'Alpha blending and transparency', '반투명한 색은 뒤에 있던 색과 α 비율로 섞어요. 결과가 그리는 순서에 따라 달라지므로 투명한 물체는 정렬해서 그려야 해요.', '오버 연산은 C = α·Cs + (1 − α)·Cd로, α = 0.5인 빨강을 파랑 위에 그리면 보라가 돼요. 투명한 판 두 장이 겹치면 뒤의 것을 먼저, 앞의 것을 나중에 그려야 겹친 곳의 색이 맞아요. 앞의 것을 먼저 그리면 깊이 버퍼에 그 깊이가 기록되어, 뒤의 판이 깊이 테스트에서 탈락해 겹친 곳에서 사라져요. 그래서 불투명한 물체를 먼저(깊이 쓰기 켬) 그리고, 투명한 물체는 뒤에서 앞으로 정렬해 깊이 테스트만 하고 쓰기는 끈 채 그려요. 서로 뚫고 지나가는 투명 물체는 순서 독립 투명(OIT) 기법을 써요. 미리 곱한 알파를 쓰면 가장자리 테두리 문제도 줄어요.', 'Translucent colors are mixed with what is behind them in proportion α; since the result depends on drawing order, transparent objects must be drawn sorted.', 'The over operator computes C = α·Cs + (1 − α)·Cd, so red at α = 0.5 over blue gives purple. Where two transparent panes overlap, the back one must be drawn first and the front one after for the overlap to be right. Drawing the front pane first records its depth, and the back pane then fails the depth test and disappears in the overlap. So opaque objects go first with depth writes on, then transparent ones sorted back to front with depth testing on and depth writes off. Interpenetrating transparent objects need order-independent transparency (OIT), and premultiplied alpha avoids fringe artifacts at edges.', sBlend())
  ],
  'gx-light': [
    item('gx-tonemap', 'HDR과 톤 매핑', 'HDR and tone mapping', '실제 장면의 밝기 범위는 화면이 보여 줄 수 있는 범위보다 훨씬 넓어요. 톤 매핑은 그 넓은 범위를 0~1로 접어 넣는 곡선이에요.', '렌더러는 그림자 0.05에서 햇빛 64처럼 넓은 HDR 값으로 계산하지만 화면은 0~1만 보여 줘요. 1을 넘는 값을 그냥 자르면 4, 16, 64가 모두 같은 흰색이 되어 밝은 부분의 디테일이 사라져요. Reinhard 곡선 L / (1 + L)은 큰 값일수록 더 많이 눌러 담아 모든 밝기를 구분해요. ACES 같은 필름 곡선은 S자 모양으로 중간 톤의 대비를 살리고 밝은 끝을 부드럽게 말아 올려 영화 같은 느낌을 줘요. 노출(밝기 배율)을 먼저 정하고 선형 공간에서 매핑한 뒤 감마를 적용하며, HDR 모니터는 더 넓은 범위를 그대로 보여 줘요.', 'Real scenes span far more brightness than a display can show; tone mapping is the curve that folds that wide range into 0–1.', 'Renderers compute wide HDR values, from 0.05 in shadow to 64 in sunlight, but screens show only 0–1. Simply clamping everything above 1 turns 4, 16 and 64 into the same white and loses highlight detail. The Reinhard curve L / (1 + L) compresses larger values more, keeping every level distinct. Filmic curves such as ACES are S-shaped, preserving midtone contrast while rolling highlights off softly for a cinematic look. Exposure is set first, mapping happens in linear space and gamma comes last, while HDR displays can show a wider range directly.', sTonemap())
  ],
  'gx-gpu': [
    item('gx-deferred', '디퍼드 셰이딩', 'Deferred shading', '물체를 그릴 때 바로 조명을 계산하는 대신, 먼저 화면 픽셀마다 색·법선·깊이·재질을 모아 두고(G-버퍼) 조명은 나중에 보이는 픽셀에만 계산해요.', '포워드 렌더링은 물체마다 모든 조명을 계산하므로 비용이 물체 수 × 조명 수로 늘고, 나중에 가려질 픽셀까지 계산해요. 디퍼드 셰이딩은 1단계(지오메트리 패스)에서 조명 없이 albedo, 법선, 깊이, 거칠기 같은 값을 화면 크기 텍스처들(G-버퍼)에 써요. 2단계(조명 패스)에서는 각 조명이 영향을 주는 화면 픽셀만 G-버퍼를 읽어 계산해, 조명이 수백 개여도 감당할 수 있어요. 대신 투명 물체는 따로 포워드로 그려야 하고, MSAA가 어렵고, G-버퍼 메모리 대역폭이 커요. 그래서 타일별로 조명을 추려 내는 Forward+도 많이 써요.', 'Instead of lighting objects as they are drawn, deferred shading first stores each pixel’s albedo, normal, depth and material (the G-buffer) and computes lighting later only for visible pixels.', 'Forward rendering lights every object with every light, so cost grows with objects × lights and includes pixels that end up hidden. Deferred shading’s geometry pass writes albedo, normals, depth and roughness to screen-sized textures (the G-buffer) without lighting. The lighting pass then has each light read the G-buffer only for the pixels it affects, which makes hundreds of lights affordable. The trade-offs are that transparent objects need a separate forward pass, MSAA is awkward and G-buffer bandwidth is heavy, which is why tiled Forward+ rendering is also popular.', sDeferred())
  ],
  'gx-adv': [
    item('gx-sdf', 'SDF와 레이 마칭', 'SDFs and ray marching', '부호 거리 함수(SDF)는 공간의 한 점에서 가장 가까운 표면까지의 거리를 알려 줘요. 레이 마칭은 그 거리만큼씩 성큼성큼 전진하며 표면을 찾아 그리는 방법이에요.', '원의 SDF는 |p − c| − r이고, 여러 도형은 min으로 합쳐요. 광선 위 현재 점에서 SDF 값 d 안에는 아무 표면도 없으니 한 번에 d만큼 전진해도 안전해요(구 추적). 표면 근처에서는 걸음이 점점 작아지고, d가 ε보다 작아지면 맞은 것으로 봐요. 식 몇 줄로 부드럽게 녹아 붙은 모양(smooth min), 무한 반복(mod), 값싼 부드러운 그림자를 만들 수 있어 셰이더토이 데모, SDF 글꼴 렌더링, UI 도형, 연기 같은 볼류메트릭 효과에 쓰여요.', 'A signed distance function (SDF) tells you how far a point is from the nearest surface; ray marching finds and draws surfaces by repeatedly stepping forward by that distance.', 'A circle’s SDF is |p − c| − r, and several shapes combine with min. Since no surface lies within the SDF value d of the current point on a ray, it is safe to jump forward by d (sphere tracing). Steps shrink near a surface, and once d falls below ε it counts as a hit. A few lines of math give smoothly blended shapes (smooth min), infinite repetition (mod) and cheap soft shadows, which is why the technique appears in Shadertoy demos, SDF font rendering, UI shapes and volumetric effects such as smoke.', sSdf())
  ]
},
after: {
  'gx-color': [item('gx-gamma', '감마 보정', 'Gamma correction', '화면은 저장된 값을 약 2.2제곱해서 빛으로 내보내요. 그래서 색을 섞거나 조명을 계산할 때는 선형 빛으로 풀어서 하고 마지막에 다시 인코딩해요.', '모니터는 저장된 값 v를 약 v^2.2만큼의 빛으로 내보내서, 값 128(0.5)은 최대 밝기의 약 22%예요. 그래서 이미지는 저장할 때 빛을 1/2.2제곱으로 눌러 둬요(감마 인코딩). 이렇게 하면 사람 눈이 민감한 어두운 쪽에 8비트의 단계를 더 많이 쓰게 돼서, 빛이 고른 8단계는 대부분 밝게 몰려 보이고 값이 고른 8단계가 오히려 고르게 보여요. 문제는 인코딩된 값끼리 산술 연산을 할 때예요. 검정(0)과 흰색(255)을 반반 섞어 128을 만들면 실제 빛은 22%뿐이라 너무 어두워요. 정확히 하려면 두 값을 선형 빛(0과 1)으로 풀어 평균 0.5를 낸 뒤 다시 인코딩해 약 186을 써야 해요. 같은 이유로 감마를 무시하면 블렌딩, 블러, 이미지 축소, 안티앨리어싱 가장자리가 어둡게 뭉개지고 조명 감쇠가 너무 급하게 보여요. 선형 작업 흐름은 sRGB 텍스처를 읽을 때 풀고(^2.2), 조명과 블렌딩을 선형으로 계산하고, 화면에 낼 때 다시 인코딩(^(1/2.2))하는 거예요. GPU는 sRGB 텍스처 형식과 sRGB 프레임버퍼로 이 변환을 하드웨어에서 해 주고, 노멀 맵·러프니스 맵처럼 색이 아닌 데이터 텍스처는 풀면 안 되니 선형 형식으로 읽어요. 실제 sRGB 곡선은 어두운 끝이 직선인 구간 함수이고, 2.2제곱은 그 근사예요.', 'Displays turn stored values into light by roughly the 2.2 power, so blending and lighting are done after decoding to linear light, then re-encoded.', 'A monitor emits roughly v^2.2 of its maximum light for a stored value v, so 128 (0.5) produces about 22% brightness. Images are therefore stored with light compressed by the 1/2.2 power (gamma encoding), which spends more of the 8-bit steps on the dark tones our eyes discriminate best: eight steps even in light look bunched toward bright, while eight steps even in value look even. Trouble starts when arithmetic is done on encoded values. Averaging black (0) and white (255) to 128 gives only 22% light, far too dark; the correct mix decodes both to linear light (0 and 1), averages to 0.5 and re-encodes to about 186. Ignoring gamma likewise darkens and muddies blends, blurs, downscaled images and antialiased edges, and makes lighting fall off too steeply. The linear workflow decodes sRGB textures on read (^2.2), computes lighting and blending linearly, and encodes on output (^(1/2.2)). GPUs do this in hardware with sRGB texture formats and sRGB framebuffers, while non-colour data textures such as normal and roughness maps must be read as linear, not decoded. The exact sRGB curve is piecewise with a linear toe; the 2.2 power is an approximation.', sGamma())],
  'gx-slerp': [item('gx-gimbal', '짐벌 락', 'Gimbal lock', '오일러 각에서 pitch가 90°가 되면 yaw와 roll의 회전축이 겹쳐 자유도 하나를 잃어요. 자세를 쿼터니언으로 저장하면 생기지 않아요.', '오일러 각은 자세를 yaw(수직축), pitch(날개축), roll(기수축) 세 번의 회전을 정해진 순서로 적용해 나타내요. 평소에는 세 축이 서로 수직이라 어느 방향으로든 돌릴 수 있어요. 그런데 pitch가 90°가 되어 기수가 위를 향하면 roll 축이 yaw 축과 겹쳐요. 이제 yaw를 바꾸든 roll을 바꾸든 같은 축으로만 돌고, 사라진 방향으로는 바로 돌 수 없어요. 실제로 R = Ry(yaw)·Rx(90°)·Rz(roll)을 계산하면 (yaw 30°, roll 0°)와 (yaw 0°, roll −30°)가 정확히 같은 행렬이고, yaw − roll 값만 의미가 있어요. 그래서 이 근처를 지나는 애니메이션이나 카메라는 갑자기 휙 뒤집히거나 보간이 엉뚱한 길로 돌아가요. 아폴로 11호의 관성 측정 장치도 3축 짐벌이라 잠금 근처의 자세를 피해야 했어요. 짐벌 락은 회전 자체의 한계가 아니라 각도 세 개라는 표현 방식의 문제라서, 자세를 쿼터니언(w, x, y, z)이나 회전 행렬로 저장하고 새 회전을 곱해 쌓으면 사라져요. 오일러 각은 사람이 입력하거나 화면에 보여 줄 때만 변환해서 써요. 유니티·언리얼의 Transform도 내부적으로 쿼터니언을 쓰고 인스펙터에서만 각도로 보여 줘요.', 'With Euler angles, a pitch of 90° lines the yaw and roll axes up and one degree of freedom is lost; storing orientation as a quaternion avoids it.', 'Euler angles describe an orientation as three rotations applied in a fixed order: yaw (vertical axis), pitch (wing axis) and roll (nose axis). Normally the three axes are perpendicular and any direction is reachable. When pitch reaches 90° and the nose points straight up, however, the roll axis lines up with the yaw axis: changing either angle now rotates about the same axis, and the lost direction cannot be reached directly. Computing R = Ry(yaw)·Rx(90°)·Rz(roll) shows that (yaw 30°, roll 0°) and (yaw 0°, roll −30°) give exactly the same matrix; only yaw − roll matters. Animations and cameras passing near this pose therefore flip suddenly or interpolate along strange paths, and Apollo 11’s three-gimbal inertial measurement unit had to avoid such attitudes. Gimbal lock is a flaw of the three-angle representation, not of rotation itself, so it disappears when orientation is stored as a quaternion (w, x, y, z) or rotation matrix and new rotations are composed by multiplication, converting to Euler angles only for human input and display. Unity and Unreal transforms store quaternions internally and show angles only in the inspector.', sGimbal())],
  'gx-mipmap': [item('gx-filter', '텍스처 필터링', 'Texture filtering', '픽셀 하나가 덮는 텍스처 영역의 색을 텍셀들을 섞어 정하는 방법이에요. 최근접, 쌍선형, 삼선형, 비등방성 순으로 품질과 비용이 올라가요.', '텍스처를 화면에 입힐 때 픽셀 중심이 텍셀 사이 어딘가에 떨어지므로 색을 어떻게 정할지가 필터링이에요. 확대할 때 가장 가까운 텍셀 하나만 쓰는 최근접 필터는 계단처럼 각지게 보여서 픽셀 아트에만 써요. 쌍선형 필터는 이웃 텍셀 넷을 거리에 비례해 섞어요. 샘플 위치가 u = 0.3, v = 0.6이면 가중치는 A 0.28, B 0.12, C 0.42, D 0.18로, 가까운 텍셀일수록 크게 반영돼 부드러워요. 멀어서 축소될 때는 텍셀 수십 개가 한 픽셀에 들어오므로 미리 줄여 둔 밉맵 단계를 골라요. 이때 단계가 바뀌는 경계에서 선이 보이지 않도록 두 단계 사이까지 섞는 것이 삼선형 필터예요(단계 2.3이면 L2 70% + L3 30%). 비스듬히 보이는 바닥은 픽셀 하나가 텍스처 위에서 길쭉한 영역을 덮어서, 짧은 쪽 기준으로 고르면 흐리고 긴 쪽 기준이면 깨져요. 비등방성 필터는 긴 방향을 따라 여러 번(최대 16×) 샘플해 멀리 있는 바닥도 선명하게 유지해요. 이 모든 계산은 GPU의 텍스처 유닛이 하드웨어로 하고, 셰이더나 엔진에서는 샘플러의 필터 모드와 비등방성 수준만 정하면 돼요.', 'Deciding a pixel’s colour by blending the texels its footprint covers; nearest, bilinear, trilinear and anisotropic rise in quality and cost.', 'When a texture is mapped onto the screen, pixel centres land somewhere between texels, and filtering decides the resulting colour. Nearest filtering takes the single closest texel and looks blocky when magnified, so it suits only pixel art. Bilinear filtering blends the four neighbouring texels in proportion to distance: at u = 0.3, v = 0.6 the weights are A 0.28, B 0.12, C 0.42 and D 0.18, so nearer texels count more and the result is smooth. When a distant surface is minified, dozens of texels fall into one pixel, so a pre-shrunk mipmap level is chosen; trilinear filtering also blends between two levels so no seam shows where the level changes (level 2.3 means 70% L2 + 30% L3). On a floor seen at a grazing angle a pixel covers a long, thin footprint, so choosing by the short side aliases and by the long side blurs; anisotropic filtering takes several samples (up to 16×) along the long axis to keep distant floors sharp. GPU texture units do all of this in hardware, so shaders and engines only choose the sampler’s filter mode and anisotropy level.', sTexFilter())],
  'gx-cull': [item('gx-drawcall', '드로우 콜', 'Draw calls', 'CPU가 GPU에게 “이 메시를 이 상태로 그려라”라고 보내는 명령이에요. 호출마다 CPU 비용이 있어서, 개수를 줄이는 게 성능의 핵심이에요.', '드로우 콜 하나마다 CPU와 드라이버는 셰이더·텍스처·버퍼 같은 상태를 설정하고 검증한 뒤 GPU 명령 버퍼에 기록해요. 나무 10,000그루를 하나씩 그리면 이 준비가 10,000번 반복돼 CPU가 먼저 한계에 닿고, GPU는 다음 명령을 기다리며 놀아요(CPU 병목). 같은 메시를 여러 번 그릴 때는 인스턴싱을 써요. 메시는 한 번만 넘기고 위치·회전·크기 같은 인스턴스별 값을 버퍼로 주면, 드로우 콜 한 번으로 GPU가 10,000번 반복해 그려요. 재질이 서로 다르면 인스턴싱이 안 되니, 그리기 순서를 재질별로 정렬해 상태 변경을 줄여요. A B A C B A C B 순서로 그리면 상태가 7번 바뀌지만, A A A B B B C C로 정렬하면 2번이면 돼요. 움직이지 않는 물체는 메시를 미리 합치고(정적 배칭), 여러 텍스처를 한 장에 모은 아틀라스로 같은 재질을 쓰는 물체를 늘려요. 컬링과 LOD도 그릴 대상 자체를 줄여요. Vulkan, DirectX 12, Metal 같은 최신 API는 호출당 비용이 작고 여러 스레드가 명령을 동시에 기록할 수 있으며, GPU 주도 렌더링에서는 GPU가 스스로 컬링하고 그릴 목록을 만들어 간접 그리기 한 번으로 실행해요. 모바일은 CPU 여유가 적어 드로우 콜 수를 수백 개 단위로 관리하기도 하고, 최적화 전에는 프로파일러로 실제 병목을 먼저 확인해요.', 'A command from the CPU telling the GPU to draw a mesh with given state. Every call costs CPU time, so reducing their number is central to performance.', 'For every draw call the CPU and driver set and validate state such as shaders, textures and buffers, then record commands for the GPU. Drawing 10,000 trees one at a time repeats that work 10,000 times, so the CPU hits its limit first while the GPU waits for commands (a CPU bottleneck). Identical meshes call for instancing: send the mesh once with a buffer of per-instance values such as position, rotation and scale, and one draw call makes the GPU draw it 10,000 times. When materials differ and instancing does not apply, sort draws by material to cut state changes: the order A B A C B A C B switches state seven times, while A A A B B B C C needs two. Static objects can be merged ahead of time (static batching), and texture atlases put many textures on one sheet so more objects share a material; culling and LOD shrink the set of things to draw at all. Modern APIs such as Vulkan, DirectX 12 and Metal make calls cheaper and let many threads record commands at once, and GPU-driven rendering has the GPU cull and build its own draw list, executed with a single indirect draw. Mobile games, with little CPU headroom, often budget draw calls in the hundreds, and a profiler should confirm the real bottleneck before optimizing.', sDrawCall())]
} };
})();

window.UX = page([
  sec('gx-coord', '좌표와 변환', 'Coordinates & transforms', '좌표와 변환', 'Coordinates and transforms',
    '점을 움직이고 3D를 2D 화면으로 옮기는 수학이에요.', 'The math that moves points and flattens 3D onto a 2D screen.', [
    item('gx-raster', '래스터와 벡터', 'Raster and vector', '래스터 그래픽은 픽셀마다 색을, 벡터 그래픽은 도형을 수식으로 저장해요. 확대하면 래스터는 계단이 보이고 벡터는 매끈해요.', '사진·영상은 래스터(JPEG, PNG, WebP), 로고·아이콘·글꼴은 벡터(SVG, 트루타입·OpenType). 벡터는 해상도와 무관하지만 복잡한 사진은 표현하기 어려워요. 화면에 그릴 때는 결국 모든 것을 픽셀로 바꿔요(래스터화).', 'Raster graphics store a color per pixel; vector graphics store shapes as math. Zoom in and rasters show stairs while vectors stay smooth.', 'Photos and video are raster (JPEG, PNG, WebP); logos, icons and fonts are vector (SVG, TrueType and OpenType). Vectors are resolution-independent but poor at photographic detail. Everything becomes pixels on its way to the screen (rasterization).', sRaster()),
    item('gx-color', '색 공간과 감마', 'Color spaces and gamma', '화면의 색은 빨강·초록·파랑 빛의 세기로 만들어요(RGB). 사람에게는 색상·채도·명도(HSV, HSL)가 더 직관적이에요.', '#FF8800 = R 255, G 136, B 0. sRGB 값은 감마로 눌려 있어 값 128이 빛의 약 22%예요. 그래서 조명 계산과 블렌딩은 선형 공간에서 하고 마지막에 감마를 다시 적용해요. 채널당 8비트 = 약 1,677만 색, HDR은 10비트 이상, 알파는 투명도.', 'Screen colors mix red, green and blue light (RGB). Hue, saturation and value (HSV, HSL) are more intuitive for people.', '#FF8800 is R 255, G 136, B 0. sRGB values are gamma-encoded, so 128 is only about 22% of the light; lighting and blending should happen in linear space with gamma reapplied at the end. 8 bits per channel gives about 16.7 million colors; HDR uses 10 or more; alpha carries transparency.', sColor()),
    item('gx-transform', '변환 행렬', 'Transformation matrices', '크기·회전·이동을 행렬로 표현하면 여러 변환을 곱해 하나로 합치고 모든 점에 한 번에 적용할 수 있어요.', '회전 [[cos θ, −sin θ], [sin θ, cos θ]]. 이동은 2×2로 안 되어 (x, y, 1) 동차 좌표와 3×3(3D는 4×4) 행렬을 써요. M = T·R·S는 오른쪽부터 적용되고, 순서를 바꾸면 결과가 달라져요. CSS transform, SVG, 게임 엔진의 Transform이 모두 이 방식이에요.', 'Express scale, rotation and translation as matrices so several transforms multiply into one and apply to every point at once.', 'Rotation is [[cos θ, −sin θ], [sin θ, cos θ]]. Translation needs homogeneous coordinates (x, y, 1) and a 3×3 matrix (4×4 in 3D). M = T·R·S applies right to left, and changing the order changes the result. CSS transforms, SVG and game-engine Transforms all work this way.', sTransform()),
    item('gx-mvp', '좌표 변환 파이프라인 (MVP)', 'The MVP pipeline', '모델 → 월드 → 카메라 → 클립 → 화면 좌표로 차례로 바꿔요. 모델·뷰·투영 행렬 셋을 곱해 정점마다 한 번에 적용해요.', '모델 행렬은 물체를 장면에 배치, 뷰 행렬은 카메라 기준으로, 투영 행렬은 원근을 담아요. w로 나눈 NDC(−1~1) 밖은 잘라내고 뷰포트 변환으로 픽셀 좌표가 돼요. 정점 셰이더: gl_Position = P · V · M · 정점.', 'Points travel model → world → camera → clip → screen space. The model, view and projection matrices multiply into one product applied per vertex.', 'The model matrix places an object in the scene, the view matrix re-expresses it relative to the camera, and the projection matrix adds perspective. After dividing by w, anything outside NDC (−1 to 1) is clipped and the viewport transform yields pixels. Vertex shader: gl_Position = P · V · M · vertex.', sMvp()),
    item('gx-persp', '원근 투영', 'Perspective projection', '먼 물체일수록 작게 보이도록 좌표를 거리(z)로 나눠요. near·far 평면 사이의 절두체만 그려요.', "y' = y · n / z: 두 배 멀면 절반 크기. GPU는 투영 행렬로 w에 z를 담고 x/w, y/w로 나눠요(원근 나눗셈). 시야각(FOV)이 넓을수록 왜곡이 커져요. 평행(직교) 투영은 나누지 않아 크기가 일정해 CAD·2D UI·전략 게임에 써요.", 'Divide coordinates by distance (z) so farther things look smaller; only the frustum between the near and far planes is drawn.', "y' = y · n / z: twice as far means half the size. The GPU stores z in w via the projection matrix and divides x/w and y/w (the perspective divide). A wider field of view distorts more. Orthographic projection skips the divide and keeps sizes constant, suiting CAD, 2D UI and strategy games.", sPersp()),
    item('gx-slerp', '회전 보간과 쿼터니언', 'Rotation interpolation and quaternions', '두 방향 사이를 부드럽게 돌리려면 각도를 고르게 나누는 slerp를 써요. 3D 회전은 쿼터니언으로 저장해 짐벌 락을 피해요.', '끝점을 직선으로 섞는 lerp는 가운데가 빨라지는 등 속도가 고르지 않아요. 오일러 각(x·y·z 회전)은 두 축이 겹치면 한 방향의 자유를 잃어요(짐벌 락). 쿼터니언은 숫자 4개로 회전을 표현하고 합성·보간이 안정적이라 유니티·언리얼 Transform과 애니메이션 블렌딩에 써요.', 'To turn smoothly between two orientations, use slerp, which splits the angle evenly. Store 3D rotations as quaternions to avoid gimbal lock.', 'Lerping the endpoints moves unevenly, rushing through the middle. Euler angles (x, y, z rotations) lose a degree of freedom when two axes line up (gimbal lock). Quaternions encode a rotation in four numbers that compose and interpolate stably, which is why Unity and Unreal transforms and animation blending use them.', sSlerp())
  ].concat(XT.add['gx-coord'] || [])),
  sec('gx-rast', '래스터화', 'Rasterization', '래스터화', 'Rasterization',
    '도형을 픽셀로 바꾸고 표면에 이미지를 입히는 과정이에요.', 'Turning shapes into pixels and wrapping images onto surfaces.', [
    item('gx-line', '선 그리기 (브레젠험)', 'Line drawing (Bresenham)', '열마다 직선에 가장 가까운 픽셀을 골라 선을 그려요. 오차를 누적해 정수 덧셈만으로 판단해요.', '(0, 0) → (12, 5): x를 한 칸씩 늘리며 오차에 2·dy를 더하고, 0을 넘으면 y도 한 칸 올리고 2·dx를 빼요. 1962년 플로터용으로 만들어져 지금도 임베디드·픽셀 아트에 써요. 부드러운 선은 우(Wu)의 안티앨리어싱 선, GPU는 삼각형처럼 픽셀 단위로 판정해요.', 'Draw a line by choosing, in each column, the pixel nearest the true line, deciding with an accumulated error and integer additions only.', 'For (0, 0) → (12, 5), step x by one and add 2·dy to the error; when it passes zero, step y and subtract 2·dx. Designed in 1962 for plotters, it still serves embedded displays and pixel art. Smooth lines use Wu’s antialiased variant; GPUs test pixels as they do for triangles.', sBresenham()),
    item('gx-tri', '삼각형 래스터화', 'Triangle rasterization', '픽셀 중심이 삼각형의 세 변 모두의 안쪽에 있으면 칠해요. 무게중심 좌표로 꼭짓점 값(색, UV, 깊이)을 섞어요.', '변 함수 E(p) = (b − a) × (p − a)의 부호로 안쪽을 판정해 감싸는 사각형 안의 픽셀을 검사해요. 무게중심 좌표 w₀ + w₁ + w₂ = 1로 보간. 맞닿은 변은 top-left 규칙으로 한 번만 칠해요. 모든 3D 모델이 삼각형으로 쪼개지는 이유가 이 단순함이에요.', 'Fill a pixel when its center lies inside all three edges of the triangle, blending vertex values (color, UV, depth) with barycentric weights.', 'The sign of the edge function E(p) = (b − a) × (p − a) tells inside from outside for each pixel in the bounding box. Barycentric weights with w₀ + w₁ + w₂ = 1 drive interpolation, and the top-left rule fills shared edges once. This simplicity is why every 3D model is cut into triangles.', sTriangle()),
    item('gx-zbuf', 'Z-버퍼 (깊이 테스트)', 'The Z-buffer', '픽셀마다 지금까지 그린 가장 가까운 깊이를 기억해, 더 가까울 때만 색을 덮어써요. 그리는 순서와 상관없이 앞의 물체가 보여요.', '깊이 버퍼는 보통 픽셀당 24~32비트. near가 너무 작으면 먼 곳의 정밀도가 떨어져 면이 깜빡이는 z-파이팅이 생겨요(역Z로 완화). 반투명 물체는 깊이 버퍼만으로 안 되어 뒤에서 앞으로 정렬해 그려요.', 'Each pixel remembers the nearest depth drawn so far and is overwritten only by something nearer, so front objects win in any draw order.', 'Depth buffers typically hold 24–32 bits per pixel. A tiny near plane wastes precision far away, causing flickering z-fighting (reversed-Z helps). Translucent objects still need back-to-front sorting because a depth buffer alone can’t blend them.', sZbuf()),
    item('gx-aa', '안티앨리어싱', 'Anti-aliasing', '픽셀 하나에 점 하나만 보면 경계가 계단처럼 보여요. 여러 지점을 샘플링해 덮인 비율만큼 색을 섞으면 부드러워요.', 'SSAA는 모든 샘플에서 색을 계산(비쌈), MSAA는 덮임만 여러 번 검사하고 색은 한 번, FXAA·SMAA·TAA는 다 그린 뒤 화면을 보고 경계를 다듬어요. 원인은 신호 처리의 앨리어싱(표본화 부족)과 같아요. DLSS·FSR 같은 업스케일러도 같은 문제를 다뤄요.', 'One sample per pixel gives stair-stepped edges; sampling several points and blending by coverage smooths them.', 'SSAA shades every sample (costly), MSAA tests coverage several times but shades once, and FXAA, SMAA and TAA clean edges after the frame is drawn. The root cause is the same aliasing as in signal processing (undersampling). Upscalers such as DLSS and FSR tackle the same problem.', sAa()),
    item('gx-texture', '텍스처 매핑', 'Texture mapping', '꼭짓점마다 이미지의 좌표(UV)를 붙이고, 래스터화하며 보간한 UV로 픽셀마다 이미지의 색(텍셀)을 읽어 표면에 입혀요.', 'UV는 0~1 범위, 넘으면 반복(repeat)·끝값 유지(clamp)·거울 반복. 원근에서는 1/z로 보정한 보간이 필요해요. 여러 이미지를 한 장에 모은 텍스처 아틀라스로 드로우 콜을 줄여요. 3D 모델링 툴의 UV 펼치기가 이 좌표를 만드는 작업이에요.', 'Attach image coordinates (UVs) to each vertex; rasterization interpolates them and each pixel reads the image color (texel) there, wrapping the image onto the surface.', 'UVs run from 0 to 1; outside that they repeat, clamp or mirror. Perspective requires interpolation corrected by 1/z. Texture atlases pack many images into one to save draw calls, and UV unwrapping in modeling tools is how these coordinates get made.', sTexture()),
    item('gx-mipmap', '밉맵과 텍스처 필터링', 'Mipmaps and texture filtering', '텍스처를 반씩 줄인 사본을 미리 만들어 두고, 멀리 있어 작게 보이는 곳에는 작은 사본을 써서 깨짐과 반짝임을 막아요.', '밉맵 전체는 원본의 약 1/3을 더 써요. 쌍선형(이웃 4텍셀), 삼선형(두 밉 단계 사이도 보간), 비스듬한 면에는 비등방성 필터링(16×). 밉맵이 없으면 먼 바닥에 모아레와 깜빡임이 생기고, 캐시 효율도 나빠져요.', 'Precompute half-size copies of a texture and sample the small ones where a surface is far away, preventing breakup and shimmering.', 'A full mip chain costs about a third more memory. Bilinear filtering uses four neighbors, trilinear also blends between two mip levels, and anisotropic filtering (16×) handles oblique surfaces. Without mipmaps, distant floors show moiré and flicker and the cache suffers.', sMipmap())
  ].concat(XT.add['gx-rast'] || [])),
  sec('gx-light', '조명과 셰이딩', 'Lighting & shading', '조명과 셰이딩', 'Lighting and shading',
    '빛과 표면의 관계를 계산해 입체감과 재질을 만들어요.', 'Computing how light meets surfaces to create depth and material.', [
    item('gx-lambert', '확산 반사 (램버트)', 'Diffuse reflection (Lambert)', '표면의 밝기는 빛이 들어오는 각도의 코사인, 즉 법선 N과 빛 방향 L의 내적에 비례해요. 보는 방향과 상관없는 무광 표면이에요.', '밝기 = max(0, N · L): 수직이면 1, 60°면 0.5, 90° 이상이면 0. 그림자 쪽이 새카맣지 않도록 주변광(ambient)을 조금 더해요. 종이·분필·흙 같은 무광 재질의 기본이고, 모든 조명 모델의 출발점이에요.', 'A surface’s brightness follows the cosine of the light’s angle, the dot product of the normal N and the light direction L; matte surfaces look the same from any viewpoint.', 'Brightness = max(0, N · L): 1 straight on, 0.5 at 60°, 0 at 90° or beyond. A little ambient light keeps the far side from going black. It models matte materials such as paper, chalk and soil and starts every lighting model.', sLambert()),
    item('gx-phong', '반사광 (퐁 모델)', 'Specular light (Phong)', '반사 방향 R이 눈의 방향 V와 가까울수록 밝은 하이라이트가 생겨요. 지수 n으로 재질의 매끈함을 조절해요.', '반사광 = (R · V)ⁿ, 블린-퐁은 중간 벡터 H로 (N · H)ⁿ. n이 클수록 작고 날카로운 하이라이트. 주변광 + 확산 + 반사광 = 퐁 반사 모델(1975)로, 오랫동안 실시간 그래픽의 표준이었고 지금은 물리 기반(PBR)으로 넘어갔어요.', 'A bright highlight appears where the reflection direction R lines up with the view direction V; the exponent n sets how glossy the surface is.', 'Specular = (R · V)ⁿ, or (N · H)ⁿ with the halfway vector H in Blinn–Phong. Larger n gives a smaller, sharper highlight. Ambient + diffuse + specular makes the Phong model (1975), long the real-time standard and now largely replaced by physically based rendering.', sPhong()),
    item('gx-shading', '플랫·고러드·퐁 셰이딩', 'Flat, Gouraud and Phong shading', '조명을 면마다, 꼭짓점마다, 픽셀마다 계산하느냐의 차이예요. 픽셀 단위일수록 매끈하고 정확하지만 계산이 많아요.', '플랫: 면마다 색 하나 → 각짐. 고러드: 꼭짓점에서 계산해 색을 보간 → 매끈하지만 하이라이트가 뭉개지거나 사라짐. 퐁 셰이딩: 법선을 보간해 픽셀마다 계산 → 정확. 지금 GPU는 거의 모두 픽셀 단위로 해요(퐁 반사 모델과 퐁 셰이딩은 다른 개념).', 'Light once per face, once per vertex, or once per pixel: the finer the grain, the smoother and more accurate, and the more work.', 'Flat shading gives one color per face, so it looks faceted. Gouraud lights the vertices and interpolates colors: smooth, but highlights smear or vanish. Phong shading interpolates normals and lights every pixel, which is accurate. Modern GPUs light almost everything per pixel (Phong shading is distinct from the Phong reflection model).', sShading()),
    item('gx-normal', '노멀 매핑', 'Normal mapping', '기하는 그대로 두고, 픽셀마다 법선 방향만 이미지(노멀 맵)에서 읽어 조명을 계산해 세밀한 요철을 흉내 내요.', '노멀 맵은 법선 xyz를 RGB로 저장해 파르스름해요. 수백만 폴리곤 조각 모델에서 구워(bake) 저폴리 모델에 입혀요. 빛을 옮기면 음영도 따라 움직여 진짜 요철처럼 보이지만 윤곽은 평평해요 → 높이가 필요하면 시차 매핑이나 테셀레이션.', 'Keep the geometry flat but read a per-pixel normal from an image (a normal map) for lighting, faking fine bumps.', 'Normal maps store normal xyz as RGB, which is why they look bluish. They are baked from million-polygon sculpts onto low-poly models. Shading follows a moving light like real bumps, yet silhouettes stay flat; parallax mapping or tessellation adds real height.', sNormalmap()),
    item('gx-shadow', '그림자 매핑', 'Shadow mapping', '먼저 빛의 위치에서 장면의 깊이를 렌더해 두고, 화면을 그릴 때 각 점의 빛까지 거리가 그 깊이보다 멀면 그림자로 처리해요.', '2패스: 빛 시점 깊이 맵 → 비교. 정밀도 오차로 생기는 줄무늬(shadow acne)는 바이어스로, 각진 경계는 PCF로 부드럽게, 넓은 야외는 거리별로 나눈 캐스케이드 섀도 맵(CSM)을 써요. 레이 트레이싱 그림자는 이런 문제 없이 정확해요.', 'Render depth from the light’s position first; while drawing the camera view, any point farther from the light than that depth is in shadow.', 'Two passes: a depth map from the light, then the comparison. Precision stripes (shadow acne) need a bias, PCF softens jagged edges, and large outdoor scenes split the view into cascaded shadow maps. Ray-traced shadows avoid these problems at a higher cost.', sShadow()),
    item('gx-pbr', '물리 기반 렌더링 (PBR)', 'Physically based rendering', '색·금속성·거칠기 같은 물리적 재질 값으로, 에너지 보존과 프레넬 효과를 지키며 조명을 계산해요. 어떤 조명에서도 그럴듯해 보여요.', '비금속은 확산 색 + 약한 흰 반사(약 4%), 금속은 확산이 없고 반사가 금속의 색을 띠어요. 거칠수록 하이라이트가 넓고 어두워지고(빛의 총량 보존), 비스듬히 볼수록 반사가 강해져요(프레넬). 언리얼·유니티·블렌더·glTF의 표준이에요(GGX 미세면 모델).', 'Describe materials with physical values such as color, metalness and roughness, and light them with energy conservation and Fresnel; they then look right under any lighting.', 'Dielectrics have diffuse color plus a weak white reflection (~4%); metals have no diffuse and tint their reflections. Rougher surfaces spread highlights wider and dimmer (energy conservation), and grazing angles reflect more (Fresnel). It is the standard in Unreal, Unity, Blender and glTF (the GGX microfacet model).', sPbr())
  ].concat(XT.add['gx-light'] || [])),
  sec('gx-gpu', 'GPU 파이프라인', 'The GPU pipeline', 'GPU 파이프라인', 'The GPU pipeline',
    '그래픽 카드가 한 프레임을 그리는 흐름과 성능의 핵심이에요.', 'How a graphics card draws a frame, and what makes it fast.', [
    item('gx-pipeline', '그래픽스 파이프라인', 'The graphics pipeline', '정점 셰이더 → 조립·클리핑 → 래스터화 → 프래그먼트 셰이더 → 깊이·블렌딩 → 프레임 버퍼 순서로 한 프레임을 그려요. 셰이더 단계만 우리가 프로그래밍해요.', '정점 3개 → 삼각형 1개 → 픽셀 조각 수백~수천 개로 데이터가 불어나요. 셰이더 언어: GLSL, HLSL, WGSL, Metal Shading Language. API: OpenGL, Vulkan, DirectX 12, Metal, WebGPU. 최근엔 메시 셰이더처럼 앞단도 더 프로그래밍 가능해지고 있어요.', 'A frame flows through vertex shader → assembly and clipping → rasterization → fragment shader → depth and blending → framebuffer; only the shader stages are yours to program.', 'Three vertices become one triangle and then hundreds or thousands of fragments. Shading languages: GLSL, HLSL, WGSL, Metal Shading Language. APIs: OpenGL, Vulkan, DirectX 12, Metal, WebGPU. Newer mesh shaders make the front of the pipeline programmable too.', sPipeline()),
    item('gx-shader', '셰이더와 GPU 병렬성', 'Shaders and GPU parallelism', '셰이더는 픽셀(또는 정점) 하나를 처리하는 작은 프로그램이고, GPU는 같은 프로그램을 수천 개 코어에서 동시에 돌려요.', '32개(엔비디아 워프)나 32·64개(AMD 웨이브)씩 묶어 같은 명령을 함께 실행(SIMT). 한 묶음 안에서 if 갈래가 나뉘면 양쪽을 차례로 실행해 느려져요(분기 발산). 1080p 한 프레임에 약 200만 픽셀. 같은 구조로 딥러닝·과학 계산도 해요(CUDA, 컴퓨트 셰이더).', 'A shader is a tiny program for one pixel (or vertex), and the GPU runs it on thousands of cores at once.', 'Threads are grouped into warps of 32 (NVIDIA) or waves of 32 or 64 (AMD) that execute each instruction together (SIMT). If threads in a group take different branches, both paths run in turn (divergence). A 1080p frame has about two million pixels. The same design powers deep learning and science (CUDA, compute shaders).', sShader()),
    item('gx-cull', '컬링과 드로우 콜', 'Culling and draw calls', '보이지 않을 것은 아예 그리지 않아요: 시야 밖(절두체 컬링), 등진 면(후면 컬링), 가려진 물체(가림 컬링).', '후면 컬링은 정점의 감기는 순서(시계·반시계)로 판단해 삼각형을 약 절반 줄여요. CPU가 GPU에 그리기를 요청하는 드로우 콜마다 비용이 있어서, 같은 물체는 인스턴싱으로 한 번에, 재질이 같은 것은 배칭으로 묶어요. 거리별로 단순한 모델로 바꾸는 LOD도 함께 써요.', 'The fastest draw is the one you skip: objects outside the view (frustum culling), faces turned away (backface culling) and hidden objects (occlusion culling).', 'Backface culling uses vertex winding order (clockwise or not) and drops about half the triangles. Every draw call from CPU to GPU has overhead, so identical objects are instanced into one call and same-material objects are batched. Level of detail (LOD) swaps in simpler models at a distance.', sCull()),
    item('gx-vsync', '더블 버퍼링과 수직 동기화', 'Double buffering and V-Sync', '보여 주는 버퍼와 그리는 버퍼를 따로 두고, 모니터가 화면을 다 그린 사이(수직 동기)에만 바꿔 화면 찢어짐을 막아요.', '60 Hz면 16.7 ms마다 갱신. 프레임이 늦으면 다음 주기까지 기다려 끊김(stutter)이 생겨요. 트리플 버퍼링은 대기를 줄이고, G-SYNC·FreeSync(가변 주사율)는 모니터가 GPU 속도에 맞춰요. 120 fps면 프레임당 8.3 ms 안에 모든 계산을 끝내야 해요.', 'Keep a buffer on display and another being drawn, and swap only between refreshes (vertical sync) so the image never tears.', 'At 60 Hz the screen refreshes every 16.7 ms; a late frame waits for the next cycle and stutters. Triple buffering reduces waiting, and G-SYNC and FreeSync (variable refresh) let the monitor follow the GPU. At 120 fps all the work must fit in 8.3 ms per frame.', sVsync())
  ].concat(XT.add['gx-gpu'] || [])),
  sec('gx-adv', '고급 렌더링', 'Advanced rendering', '고급 렌더링', 'Advanced rendering',
    '빛의 경로를 직접 따라가고 곡선을 다루는 기법이에요.', 'Following light paths directly and working with curves.', [
    item('gx-raytrace', '레이 트레이싱', 'Ray tracing', '픽셀마다 카메라에서 광선을 쏘아 부딪힌 곳에서 그림자·반사·굴절 광선을 다시 쏘며 색을 모아요. 정확한 반사와 그림자를 얻어요.', '래스터화가 “삼각형마다 어느 픽셀?”이라면 레이 트레이싱은 “픽셀마다 어느 물체?”. 경로 추적은 무작위 광선 수백 개로 간접광까지 계산하고 노이즈는 AI 디노이저로 없애요. 영화(픽사), 건축 시각화, RTX 하드웨어 가속을 받는 게임에 써요.', 'Shoot a ray from the camera through each pixel and, at every hit, spawn shadow, reflection and refraction rays to gather color, yielding accurate reflections and shadows.', 'Rasterization asks “which pixels does this triangle cover?”; ray tracing asks “which object does this pixel see?”. Path tracing fires hundreds of random rays to capture indirect light and cleans the noise with AI denoisers. Used for film (Pixar), architectural visualization and games on RTX-accelerated hardware.', sRaytrace()),
    item('gx-bvh', 'BVH 가속 구조', 'BVH acceleration', '물체를 상자로 묶고 상자를 다시 묶은 트리를 만들어, 광선이 지나지 않는 상자 안은 통째로 건너뛰어요.', '모든 물체를 검사하면 O(n), BVH로는 대략 O(log n). 상자와 광선의 교차 검사는 아주 싸요. 표면적 휴리스틱(SAH)으로 좋은 분할을 고르고, 움직이는 장면은 매 프레임 다시 맞춰요(refit). 레이 트레이싱 하드웨어, 물리 엔진 충돌 감지, 게임 AI 시야 판정에 써요.', 'Build a tree of boxes around objects and boxes around boxes; a ray skips any box it misses, along with everything inside.', 'Testing every object is O(n); a BVH brings it near O(log n), and ray–box tests are cheap. The surface area heuristic (SAH) chooses good splits, and animated scenes refit the tree each frame. Ray-tracing hardware, physics collision detection and game AI line-of-sight all rely on it.', sBvh()),
    item('gx-bezier', '베지어 곡선', 'Bézier curves', '조절점 몇 개로 매끈한 곡선을 정의해요. 이웃한 점을 같은 비율로 나누는 걸 반복하면 곡선 위의 점이 나와요(드 카스텔조).', '3차 베지어 B(t) = (1−t)³P₀ + 3(1−t)²tP₁ + 3(1−t)t²P₂ + t³P₃. 곡선은 P₀에서 시작해 P₃에서 끝나고 P₁·P₂ 쪽으로 끌려가요. 글꼴 윤곽(트루타입은 2차, CFF는 3차), SVG path, CSS cubic-bezier() 애니메이션 곡선, 디자인 툴의 펜 도구가 모두 베지어예요.', 'A few control points define a smooth curve; repeatedly splitting neighboring points at the same ratio lands on the curve (de Casteljau).', 'A cubic Bézier is B(t) = (1−t)³P₀ + 3(1−t)²tP₁ + 3(1−t)t²P₂ + t³P₃: it starts at P₀, ends at P₃ and is pulled toward P₁ and P₂. Font outlines (quadratic in TrueType, cubic in CFF), SVG paths, CSS cubic-bezier() easing and the pen tool in design apps are all Bézier curves.', sBezier())
  ].concat(XT.add['gx-adv'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
window.UX[0].css += `
.gx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.gx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.gx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.gx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.gx-r .in{color:var(--danger);font-weight:800}
.gx-g .in{color:var(--ok);font-weight:800}
.gx-a .in{color:var(--accent);font-weight:800}
.gx-w .in{color:var(--warn);font-weight:800}
.gx-c .in{font-size:.6em;font-weight:700}
.gx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.gx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
})();
