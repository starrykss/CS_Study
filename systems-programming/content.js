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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'sy-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono sy-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono sy-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c sy-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));

/* ---- systems-programming helpers ---- */
const bitcells = (S, k, x, y, bits, o = {}) => bits.split('').forEach((b, i) => cell(S, k + i, x + i * (o.cw || 1.5), y, (o.cw || 1.5) - .14, o.h || 1.6, b, o.color ? o.color(i, b) : (b === '1' ? 'accent' : 'line'), o.pct || 40, o.st, { off: o.off }));
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono sy-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });

/* ================= C and memory ================= */
function sPointer() {
  const S = scene({ id: 'sy-pointer', steps: 5, per: 1.4 });
  code(S, 'c', 1, 2.2, 10.6, ['int x = 42;', 'int *p = &x;', '*p = 7;', 'p = p + 1;'], [[0, 1], [1, 2], [2, 3], [3, 4]]);
  const Y = i => 2.2 + i * 1.9, ad = ['0x1000', '0x1004', '0x1008', '0x100C', '0x1010', '0x1014'];
  ad.forEach((a, i) => { T(S, 'a' + i, 13.2, Y(i) + .45, a, 'cz-mono sy-xs'); rect(S, 'r' + i, 18, Y(i), 8, 1.75, 'line', 25, 0, { r: .15 }); });
  box(S, 'mx', 18, Y(0), 8, 1.75, '42', 'accent', 1, { pct: 40, off: 3 }); box(S, 'mx2', 18, Y(0), 8, 1.75, '7', 'ok', 3, { pct: 45 });
  box(S, 'mp', 18, Y(2), 8, 3.65, '0x1000', 'warn', 2, { pct: 40, off: 4 }); box(S, 'mp2', 18, Y(2), 8, 3.65, '0x1004', 'warn', 4, { pct: 50 });
  T(S, 'nx', 26.6, Y(0) + .4, 'x', 'cz-mono sy-s sy-a', 1); T(S, 'np', 26.6, Y(2) + 1.3, 'p', 'cz-mono sy-s sy-w', 2);
  T(S, 'sz', 26.6, Y(2) + 2.5, ['8바이트', '8 bytes'], 'sy-xs', 2);
  elb(S, 'ar1', [[18, Y(3) + 1], [16.9, Y(3) + 1], [16.9, Y(0) + .9], [17.9, Y(0) + .9]], 'warn', 2, { off: 4 });
  elb(S, 'ar2', [[18, Y(3) + 1], [16.4, Y(3) + 1], [16.4, Y(1) + .9], [17.9, Y(1) + .9]], 'danger', 4);
  T(S, 'e1', 1, 14.2, ['&x = x의 주소 · p는 주소를 값으로 담는 변수', '&x is the address of x · p is a variable whose value is an address'], 'sy-s', 2);
  T(S, 'e2', 1, 15.8, ['*p = p가 가리키는 곳 → x가 7로 바뀌어요', '*p is the thing p points at → x becomes 7'], 'sy-s sy-g', 3);
  T(S, 'e3', 1, 17.4, ['p + 1은 1바이트가 아니라 sizeof(int) = 4바이트 뒤', 'p + 1 moves sizeof(int) = 4 bytes, not 1'], 'sy-s sy-r', 4);
  T(S, 'e4', 1, 19, ['NULL이나 해제된 주소를 따라가면 세그멘테이션 오류', 'following NULL or freed memory ends in a segmentation fault'], 'sy-xs', 5);
  S.cap(1, '변수 x는 메모리 어딘가에 4바이트로 있어요', 'x lives somewhere in memory, 4 bytes wide')
    .cap(2, '포인터 p는 x의 주소를 값으로 가져요', 'Pointer p holds x’s address as its value')
    .cap(3, '역참조하면 그 주소의 값을 바꿀 수 있어요', 'Dereferencing writes through that address')
    .cap(4, '포인터 산술은 가리키는 타입의 크기 단위', 'Pointer arithmetic moves in units of the pointed-to type')
    .cap(5, '포인터 = 주소 + 타입', 'A pointer is an address plus a type');
  return S;
}
function sArray() {
  const S = scene({ id: 'sy-array', steps: 5, per: 1.4 });
  T(S, 'cd', 1, 1.2, 'int a[4] = {10, 20, 30, 40};  int secret = 99;', 'cz-mono sy-s');
  const X = i => 2 + i * 5.2, v = ['10', '20', '30', '40', '99'];
  v.forEach((t, i) => { T(S, 'ad' + i, X(i), 3.4, '0x' + (0x2000 + 4 * i).toString(16).toUpperCase(), 'cz-tc cz-mono sy-xs', 0, { w: 5 });
    box(S, 'c' + i, X(i), 4.6, 5, 2, t, i < 4 ? 'accent' : 'ink-3', 0, { pct: i < 4 ? 30 : 20 });
    T(S, 'ix' + i, X(i), 6.9, i < 4 ? `a[${i}]` : 'secret', 'cz-tc cz-mono sy-xs', 0, { w: 5 }); });
  tsets(S, 'c2', [[3, 'warn', 55]]); tsets(S, 'c4', [[4, 'danger', 50]]);
  ar(S, 'pa', [X(0) + 2.5, 10], [X(0) + 2.5, 7.9], 'accent', 2, { h: .14 }); T(S, 'pl', X(0) - .4, 10.2, 'a == &a[0]', 'cz-mono sy-s sy-a', 2);
  ar(S, 'p2', [X(2) + 2.5, 10], [X(2) + 2.5, 7.9], 'warn', 3, { h: .14 }); T(S, 'p2l', X(2) - 2, 10.2, 'a + 2', 'cz-tc cz-mono sy-s sy-w', 3, { w: 9 });
  T(S, 'e2', 1, 12, 'a[2] == *(a + 2) → 0x2000 + 2 × 4 = 0x2008', 'cz-mono sy-s', 3);
  T(S, 'e3', 1, 13.6, ['a[4]: 범위 검사 없이 옆 변수를 읽어요 (정의되지 않은 동작)', 'a[4]: reads the neighbor with no bounds check (undefined behavior)'], 'sy-s sy-r', 4);
  const m = [['m[0][0]', 'm[0][1]', 'm[0][2]'], ['m[1][0]', 'm[1][1]', 'm[1][2]']];
  m.forEach((r, i) => r.forEach((t, j) => box(S, `g${i}${j}`, 1 + j * 3.2, 15.4 + i * 1.7, 3.1, 1.55, t, i ? 'warn' : 'ok', 5)));
  T(S, 'ga', 11.4, 16.6, '→', 'cz-mono sy-l', 5);
  m.flat().forEach((t, i) => box(S, 'f' + i, 13 + i * 3, 16.2, 2.9, 1.55, t, i < 3 ? 'ok' : 'warn', 5));
  T(S, 'e5', 1, 19, ['2차원 배열도 한 줄로: m[i][j] = base + (i·3 + j)·4 (행 우선)', 'a 2D array is one long row: m[i][j] = base + (i·3 + j)·4 (row-major)'], 'sy-xs', 5);
  S.cap(1, '배열은 같은 크기 원소가 빈틈없이 이어진 메모리', 'An array is equal-sized elements packed back to back')
    .cap(2, '배열 이름은 첫 원소의 주소로 바뀌어요', 'The array name decays to the address of element 0')
    .cap(3, 'a[i]는 *(a + i)의 줄임말', 'a[i] is shorthand for *(a + i)')
    .cap(4, 'C는 범위를 검사하지 않아요', 'C never checks bounds')
    .cap(5, '2차원 배열도 행 단위로 펼쳐져 있어요', 'Two-dimensional arrays are laid out row by row');
  return S;
}
function sStruct() {
  const S = scene({ id: 'sy-struct', steps: 5, per: 1.4 });
  const cw = 1.15, X = 2, col = { a: 'accent', b: 'warn', c: 'ok', d: 'danger' };
  const L1 = [['a', 0, 1], ['b', 4, 8], ['c', 8, 9], ['d', 16, 24]], L2 = [['d', 0, 8], ['b', 8, 12], ['a', 12, 13], ['c', 13, 14]];
  const row = (k, y, L, n, st, stf) => { for (let i = 0; i < n; i++) { const f = L.find(([, a, b]) => i >= a && i < b), s0 = f ? stf(f[0]) : st;
      box(S, `${k}${i}`, X + i * cw, y, cw - .1, 1.8, f && i === f[1] ? f[0] : '', f ? col[f[0]] : 'line', s0, { pct: f ? 40 : 12 }); }
    for (let o = 0; o <= n; o += 4) T(S, `${k}o${o}`, X + o * cw - 1, y + 2, String(o), 'cz-tc cz-mono sy-xs', st, { w: 2 }); };
  T(S, 's1', 1, 1.2, 'struct { char a; int b; char c; double d; };', 'cz-mono sy-s');
  row('p', 3.2, L1, 24, 1, f => f === 'a' || f === 'b' ? 1 : 2);
  T(S, 'z1', 25.6, 1.2, ['→ 24바이트', '→ 24 bytes'], 'sy-s sy-r', 2);
  T(S, 'r1', 1, 6.8, ['int는 4의 배수, double은 8의 배수 주소에 · 전체 크기는 가장 큰 정렬(8)의 배수', 'int sits at a multiple of 4, double at a multiple of 8 · total size is a multiple of the largest alignment (8)'], 'sy-xs', 3);
  T(S, 's2', 1, 9.4, 'struct { double d; int b; char a; char c; };', 'cz-mono sy-s', 4);
  row('q', 11.4, L2, 16, 4, () => 4);
  T(S, 'z2', 25.6, 9.4, ['→ 16바이트', '→ 16 bytes'], 'sy-s sy-g', 4);
  T(S, 'r2', 1, 15.2, ['큰 필드부터 나열하면 패딩이 줄어요 · 100만 개 배열이면 24 MB → 16 MB', 'list fields largest first to cut padding · a million-element array drops from 24 MB to 16 MB'], 'sy-s', 5);
  T(S, 'r3', 1, 16.8, ['파일·네트워크 포맷은 패딩을 명시하거나 packed로 고정 (정렬 안 된 접근은 느리거나 금지)', 'file and wire formats spell out padding or use packed layouts (unaligned access is slow or forbidden)'], 'sy-xs', 5);
  T(S, 'lg', 1, 18.6, ['빈 칸 = 패딩', 'blank cells = padding'], 'sy-xs', 1);
  S.cap(1, '필드는 자기 크기의 배수 위치에 놓여요', 'Each field sits at a multiple of its own size')
    .cap(2, '그래서 사이사이에 빈 바이트(패딩)가 생겨 24바이트', 'Padding fills the gaps, making 24 bytes')
    .cap(3, 'CPU가 정렬된 주소를 한 번에 읽기 때문이에요', 'because CPUs load aligned addresses in one go')
    .cap(4, '큰 필드부터 놓으면 16바이트로 줄어요', 'Largest first shrinks it to 16 bytes')
    .cap(5, '구조체 정렬과 패딩', 'Struct alignment and padding');
  return S;
}
function sMalloc() {
  const S = scene({ id: 'sy-malloc', steps: 5, per: 1.4 });
  const U = .875, X = u => 2 + u * U, Y = 3.4, H = 2.4;
  rect(S, 'heap', X(0) - .2, Y - .2, 32 * U + .4, H + .4, 'ink', 4, 0, { r: .3 }); T(S, 'hl', 2, 1.4, ['힙 (32칸)', 'heap (32 units)'], 'sy-s');
  const B = (k, a, b, label, color, st, off, pct) => box(S, k, X(a) + .05, Y, (b - a) * U - .1, H, label, color, st, { off, pct: pct || 40 });
  B('p1', 0, 8, 'p1', 'accent', 1, 4); B('p2', 8, 20, 'p2', 'warn', 1, 2); B('p3', 20, 26, 'p3', 'ok', 1, 0);
  B('f2', 8, 20, ['빈 블록', 'free'], 'line', 2, 3, 18);
  B('p4', 8, 18, 'p4', 'danger', 3, 4); B('fr', 18, 20, '', 'line', 3, 4, 18);
  B('fm', 0, 20, ['합쳐진 빈 블록 20칸', 'coalesced free block, 20 units'], 'line', 4, 0, 18);
  code(S, 'c', 1, 7.4, 13, ['p1 = malloc(8);  p2 = malloc(12);', 'p3 = malloc(6);', 'free(p2);', 'p4 = malloc(10);', 'free(p1);  free(p4);'], [[0, 1], [2, 2], [3, 3], [4, 4]]);
  T(S, 'r1', 16, 7.6, ['빈 블록은 연결 리스트(free list)로 관리', 'free blocks are kept on a free list'], 'sy-xs', 2);
  T(S, 'r2', 16, 9, ['first fit: 맞는 첫 빈 블록을 잘라 써요', 'first fit: carve the first block that fits'], 'sy-xs', 3);
  T(S, 'r3', 16, 10.3, ['남은 2칸은 너무 작아 쓰기 어려운 조각', 'the 2 left over are a hard-to-use sliver'], 'sy-xs sy-r', 3);
  T(S, 'r4', 16, 11.9, ['이웃한 빈 블록을 하나로 병합', 'adjacent free blocks merge into one'], 'sy-xs sy-g', 4);
  T(S, 'r5', 1, 15.8, ['블록 앞 헤더에 크기·사용 여부를 기록 → free(p)는 크기를 몰라도 돼요', 'a header before each block records its size and status → free(p) needs no size'], 'sy-xs', 5);
  T(S, 'r6', 1, 17.2, ['glibc ptmalloc, jemalloc, tcmalloc, mimalloc: 크기별 풀과 스레드별 캐시로 빠르고 단편화를 줄여요', 'glibc’s ptmalloc, jemalloc, tcmalloc and mimalloc use size classes and per-thread caches for speed and less fragmentation'], 'sy-xs', 5);
  S.cap(1, 'malloc은 힙의 빈 공간을 잘라 주소를 돌려줘요', 'malloc carves space from the heap and returns its address')
    .cap(2, 'free하면 그 자리가 빈 블록이 되고', 'free turns the block back into free space')
    .cap(3, '새 요청은 맞는 빈 블록을 잘라 써요', 'A new request is cut from a free block that fits')
    .cap(4, '이웃한 빈 블록은 합쳐야 큰 요청도 받을 수 있어요', 'Adjacent free blocks are merged so large requests still fit')
    .cap(5, '힙 할당자의 일: 빠르게, 단편화는 적게', 'An allocator’s job: be fast and keep fragmentation low');
  return S;
}
function sMembugs() {
  const S = scene({ id: 'sy-membugs', steps: 5, per: 1.4 });
  const P = [[1, 1, ['메모리 누수', 'memory leak'], ['char *p = malloc(100);', 'p = malloc(200);'], ['첫 100바이트를 가리키던 포인터가 사라져 영영 반환 못 해요', 'the first 100 bytes lose their only pointer and can never be freed']],
    [16.4, 1, ['해제 후 사용', 'use after free'], ['free(p);', 'p->count++;'], ['반환한 메모리에 써서 다른 데이터를 망가뜨려요', 'writes into memory that may now belong to someone else']],
    [1, 9.2, ['이중 해제', 'double free'], ['free(p);', 'free(p);'], ['할당자의 빈 블록 목록이 깨져요 → 크래시나 취약점', 'corrupts the allocator’s free list → crash or exploit']],
    [16.4, 9.2, ['댕글링 포인터', 'dangling pointer'], ['int *f() { int x = 1;', '           return &x; }'], ['함수가 끝나면 사라지는 스택 변수의 주소를 돌려줘요', 'returns the address of a stack variable that dies with f']]];
  P.forEach(([x, y, t, c, e], i) => { const st = i + 1; rect(S, 'b' + i, x, y, 14.6, 7.6, 'danger', 6, st, { r: .5 }); T(S, 't' + i, x + .6, y + .5, t, 'sy-s sy-r', st);
    c.forEach((l, j) => T(S, `c${i}${j}`, x + .6, y + 2.1 + j * 1.25, l, 'cz-mono sy-code', st)); T(S, 'e' + i, x + .6, y + 5.1, e, 'sy-xs', st, { w: 13.4 }); });
  T(S, 'f1', 1, 17.6, ['잡는 도구: AddressSanitizer(-fsanitize=address), Valgrind', 'catch them: AddressSanitizer (-fsanitize=address), Valgrind'], 'cz-tc sy-xs', 5, { w: 30 });
  T(S, 'f2', 1, 18.9, ['막는 설계: RAII·스마트 포인터(unique_ptr), 러스트의 소유권과 빌림 검사', 'prevent them: RAII and smart pointers (unique_ptr), Rust’s ownership and borrow checker'], 'cz-tc sy-xs', 5, { w: 30 });
  S.cap(1, '메모리 누수: 해제하지 않은 메모리가 쌓여요', 'Leak: memory that is never freed piles up')
    .cap(2, '해제 후 사용: 반환한 메모리를 다시 건드려요', 'Use after free: touching memory you already gave back')
    .cap(3, '이중 해제: 같은 블록을 두 번 반환해요', 'Double free: returning the same block twice')
    .cap(4, '댕글링 포인터: 이미 사라진 대상을 가리켜요', 'Dangling pointer: pointing at something already gone')
    .cap(5, '대형 C/C++ 코드의 심각한 보안 버그 약 70%가 메모리 안전성 문제', 'About 70% of serious security bugs in big C/C++ codebases are memory-safety bugs');
  return S;
}
function sStack() {
  const S = scene({ id: 'sy-stack', steps: 5, per: 1.4 });
  const X = 9, W = 9, R = [[2.4, ['돌려줄 주소 (return address)', 'return address'], 'warn'], [4.6, ['저장된 rbp', 'saved rbp'], 'ink-3'], [6.8, ['카나리 0x9f3a…', 'canary 0x9f3a…'], 'ok'], [9, 'buf[8]', 'accent']];
  T(S, 'hi', 1, 2.6, ['높은 주소', 'higher'], 'sy-xs'); T(S, 'lo', 1, 12.4, ['낮은 주소', 'lower'], 'sy-xs'); ar(S, 'g', [3.4, 12], [3.4, 4], 'ink-3', 0, { h: .1 });
  R.forEach(([y, t, c], i) => box(S, 'f' + i, X, y, W, i === 3 ? 4.2 : 2, t, c, 0, { pct: 25 }));
  code(S, 'cd', 20, 2.4, 11, ['void f(char *in) {', '  char buf[8];', '  strcpy(buf, in);', '}'], [[2, 2]]);
  box(S, 'in1', X, 11.2, W, 2, '"hello"', 'accent', 2, { pct: 50, off: 3 });
  T(S, 'n1', 20, 9, ['짧은 입력은 buf 안에 들어가요', 'a short input fits in buf'], 'sy-xs sy-g', 2);
  [3, 2, 1, 0].forEach((r, j) => box(S, 'ov' + j, X, R[r][0] + (r === 3 ? 0 : 0), W, r === 3 ? 4.2 : 2, 'AAAA…', 'danger', 3, { pct: 45 }));
  T(S, 'n2', 20, 10.6, ['strcpy는 길이를 안 봐요 → 긴 입력이', 'strcpy ignores length → a long input'], 'sy-xs sy-r', 3);
  T(S, 'n3', 20, 11.8, ['위쪽 프레임까지 덮어써요', 'overwrites the frame above'], 'sy-xs sy-r', 3);
  T(S, 'n4', 20, 13.6, ['카나리 값이 바뀐 걸 return 직전에', 'the changed canary is spotted right'], 'sy-xs sy-g', 4);
  T(S, 'n5', 20, 14.8, ['발견 → 즉시 중단', 'before return → abort'], 'sy-xs sy-g', 4);
  T(S, 'm1', 1, 16.8, ['다른 방어: 실행 불가 스택(NX), 주소 무작위화(ASLR), 길이를 받는 snprintf·strlcpy', 'other defenses: non-executable stacks (NX), address randomization (ASLR), length-aware snprintf and strlcpy'], 'cz-tc sy-xs', 5, { w: 30 });
  T(S, 'm2', 1, 18.2, ['가장 확실한 방어는 범위를 검사하는 언어와 API', 'the surest defense is a language or API that checks bounds'], 'cz-tc sy-xs', 5, { w: 30 });
  S.cap(1, '함수가 호출되면 스택에 프레임이 쌓여요', 'Each call pushes a frame onto the stack')
    .cap(2, '지역 배열 buf는 돌려줄 주소 바로 아래에 있어요', 'The local buffer sits just below the return address')
    .cap(3, '길이 검사 없이 복사하면 위쪽 데이터를 덮어써요 (버퍼 오버플로)', 'Copying without a length check overwrites what lies above (buffer overflow)')
    .cap(4, '컴파일러가 넣은 카나리가 변조를 알아채요', 'A compiler-inserted canary detects the damage')
    .cap(5, '여러 겹의 방어로 피해를 막아요', 'Layered defenses contain the damage');
  return S;
}
function sBitops() {
  const S = scene({ id: 'sy-bitops', steps: 5, per: 1.4 });
  const cw = 2.2, X = 9.6, bits = n => n.toString(2).padStart(8, '0');
  for (let i = 0; i < 8; i++) T(S, 'ix' + i, X + i * cw, 1.2, String(7 - i), 'cz-tc cz-mono sy-xs', 0, { w: cw - .14 });
  const ops = [[0b10100110, 1 << 3, '|', 'x |= 1 << 3', ['3번 비트 켜기', 'set bit 3']], [0b10101110, ~(1 << 1) & 255, '&', 'x &= ~(1 << 1)', ['1번 비트 끄기', 'clear bit 1']],
    [0b10101100, 1, '^', 'x ^= 1', ['0번 비트 뒤집기', 'toggle bit 0']], [0b10101101, 0b10101100, '&', 'x & (x − 1)', ['가장 낮은 1 지우기', 'clear the lowest 1']]];
  bitcells(S, 'x0', X, 2.4, bits(0b10100110), { cw, off: 1 }); T(S, 'xl', 1, 2.7, 'x', 'cz-mono sy-l');
  ops.forEach(([x, m, op, c, d], i) => { const st = i + 1, off = i < 3 ? st + 1 : 0, r = op === '|' ? x | m : op === '&' ? x & m : x ^ m;
    bitcells(S, 'xa' + i, X, 2.4, bits(x), { cw, st, off });
    bitcells(S, 'm' + i, X, 5, bits(m), { cw, st, off, color: (j, b) => b === '1' ? 'warn' : 'line' }); T(S, 'ml' + i, 1, 5.3, `${op} mask`, 'cz-mono sy-s sy-w', st, { off });
    bitcells(S, 'r' + i, X, 7.6, bits(r), { cw, st, off, color: (j, b) => b === '1' ? 'ok' : 'line' }); T(S, 'rl' + i, 1, 7.9, '= x', 'cz-mono sy-s sy-g', st, { off });
    T(S, 'c' + i, 1, 10.4 + i * 1.4, c, 'cz-mono sy-s', st); T(S, 'd' + i, 10, 10.6 + i * 1.4, d, 'sy-xs', st); });
  T(S, 't1', 18, 10.4, ['검사: (x >> 5) & 1 → 1', 'test: (x >> 5) & 1 → 1'], 'cz-mono sy-xs', 4);
  T(S, 't2', 18, 11.8, ['2의 거듭제곱? x & (x − 1) == 0', 'power of two? x & (x − 1) == 0'], 'cz-mono sy-xs', 4);
  T(S, 'u1', 1, 17, ['파일 권한 chmod 755 = rwx r-x r-x, 기능 플래그, 체스 비트보드, 블룸 필터, 네트워크 서브넷 마스크', 'file permissions (chmod 755 = rwx r-x r-x), feature flags, chess bitboards, Bloom filters, subnet masks'], 'cz-tc sy-xs', 5, { w: 30 });
  T(S, 'u2', 1, 18.4, ['정수 하나에 참/거짓 64개 · 연산 한 번에 64개를 동시에 처리', '64 booleans in one integer, all updated in a single instruction'], 'cz-tc sy-xs sy-g', 5, { w: 30 });
  S.cap(1, 'OR로 원하는 비트만 켜고', 'OR sets just the bits in the mask')
    .cap(2, 'AND와 반전 마스크로 끄고', 'AND with an inverted mask clears them')
    .cap(3, 'XOR로 뒤집어요', 'XOR flips them')
    .cap(4, 'x & (x − 1)은 가장 낮은 1을 지워요', 'x & (x − 1) clears the lowest set bit')
    .cap(5, '비트 연산: 플래그를 빠르고 작게 다루는 법', 'Bitwise operations: compact, fast flags');
  return S;
}
function sIntovf() {
  const S = scene({ id: 'sy-intovf', steps: 5, per: 1.4 });
  const cx = 8.6, cy = 9.6, R = 6.2, P = v => [cx + R * Math.sin(v / 256 * 2 * Math.PI), cy - R * Math.cos(v / 256 * 2 * Math.PI)];
  ring(S, 'rg', cx, cy, R, 'ink-3', 0, { w: .14 });
  [[0, '0', '0'], [64, '64', '64'], [127, '127', '127'], [128, '128', '−128'], [192, '192', '−64'], [255, '255', '−1']].forEach(([v, u, s], i) => {
    const [x, y] = P(v), [lx, ly] = [cx + (R + 1.6) * Math.sin(v / 256 * 2 * Math.PI), cy - (R + 1.3) * Math.cos(v / 256 * 2 * Math.PI)];
    pt(S, 'tk' + i, x, y, 0, C.idle, .2); T(S, 'u' + i, lx - 1.5, ly - .5, u, 'cz-tc cz-mono sy-xs sy-a', 0, { w: 3, off: 3 }); T(S, 's' + i, lx - 1.5, ly - .5, s, 'cz-tc cz-mono sy-xs sy-w', 3, { w: 3 }); });
  const d1 = P(255), d0 = P(0), d127 = P(127), d128 = P(128);
  pt(S, 'p', d1[0], d1[1], 1, C.cur, .45); S.move('p', 2, d0[0] - .45, d0[1] - .45); S.move('p', 3, d127[0] - .45, d127[1] - .45); S.move('p', 4, d128[0] - .45, d128[1] - .45);
  T(S, 'e1', 17.6, 2.4, ['uint8: 255 + 1 = 0', 'uint8: 255 + 1 = 0'], 'cz-mono sy-s sy-a', 1); T(S, 'e1b', 17.6, 3.8, ['한 바퀴 돌아 0으로 (mod 256)', 'wraps around to 0 (mod 256)'], 'sy-xs', 2);
  T(S, 'e2', 17.6, 5.6, 'int8: 127 + 1 = −128', 'cz-mono sy-s sy-w', 4); T(S, 'e2b', 17.6, 7, ['C에서 부호 있는 오버플로는 정의되지 않은 동작', 'in C, signed overflow is undefined behavior'], 'sy-xs sy-r', 4);
  T(S, 'e3', 17.6, 9, ['malloc(n * size)가 넘치면', 'if malloc(n * size) overflows,'], 'sy-xs', 5); T(S, 'e3b', 17.6, 10.2, ['작은 버퍼가 잡혀 오버플로', 'a tiny buffer gets allocated'], 'sy-xs', 5);
  T(S, 'e4', 17.6, 11.6, ['size_t len = 0;  len − 1 → 2⁶⁴ − 1', 'size_t len = 0;  len − 1 → 2⁶⁴ − 1'], 'cz-mono sy-xs', 5);
  T(S, 'e5', 17.6, 13.2, ['2014년 강남스타일 조회수가 2³¹ − 1을', 'In 2014 Gangnam Style’s views passed 2³¹ − 1,'], 'sy-xs', 5); T(S, 'e5b', 17.6, 14.4, ['넘어 유튜브가 64비트로 바꿨어요', 'so YouTube moved to a 64-bit counter'], 'sy-xs', 5);
  T(S, 'f', 1, 18, ['검사하는 연산: __builtin_add_overflow, 러스트 checked_add, 자바 Math.addExact · -fsanitize=undefined', 'checked arithmetic: __builtin_add_overflow, Rust’s checked_add, Java’s Math.addExact · -fsanitize=undefined'], 'cz-tc sy-xs', 5, { w: 30 });
  S.cap(1, '8비트 부호 없는 정수는 0~255를 원처럼 돌아요', 'An 8-bit unsigned integer runs around a circle from 0 to 255')
    .cap(2, '255에 1을 더하면 0으로 돌아가요', 'Adding 1 to 255 wraps to 0')
    .cap(3, '부호 있는 정수는 같은 비트를 −128~127로 읽어요', 'Signed integers read the same bits as −128 to 127')
    .cap(4, '127 + 1은 −128 · C에선 아예 정의되지 않은 동작', '127 + 1 becomes −128, and in C it is undefined behavior')
    .cap(5, '크기 계산의 오버플로는 보안 버그로 이어져요', 'Overflow in size calculations becomes a security bug');
  return S;
}

/* ================= build & linking ================= */
function sObject() {
  const S = scene({ id: 'sy-object', steps: 5, per: 1.4 });
  ['main.c', 'main.i', 'main.s', 'main.o', 'a.out'].forEach((t, i) => { box(S, 'p' + i, 1 + i * 6.3, 1.4, 4.6, 1.8, t, i === 3 ? 'warn' : 'line', i ? 1 : 0, { pct: 40 }); if (i) { ar(S, 'pa' + i, [1 + (i - 1) * 6.3 + 4.7, 2.3], [1 + i * 6.3 - .1, 2.3], 'ink-3', 1, { h: .1 }); T(S, 'pt' + i, 1 + (i - 1) * 6.3 + 4.2, 3.3, ['cpp', 'cc1', 'as', 'ld'][i - 1], 'cz-tc cz-mono sy-xs', 1, { w: 2.6 }); } });
  code(S, 'c', 1, 5.4, 13.4, ['int g = 5;', 'int z;', 'const char *s = "hi";', 'int main(void) {', '    printf(s);', '}'], [], { st: 0 });
  const sec = [['.text', ['기계어 코드', 'machine code'], 'accent'], ['.rodata', ['읽기 전용 상수', 'read-only constants'], 'ok'], ['.data', ['초깃값 있는 전역', 'initialized globals'], 'warn'], ['.bss', ['0으로 시작하는 전역 (크기만)', 'zeroed globals (size only)'], 'ink-3']];
  sec.forEach(([n, d, c], i) => { box(S, 's' + i, 17, 5.4 + i * 2.2, 4.4, 1.8, n, c, 2, { pct: 40 }); T(S, 'sd' + i, 21.8, 5.8 + i * 2.2, d, 'sy-xs', 2); });
  const L = i => 5.7 + i * 1.3 + .55;
  [[0, 2], [1, 3], [2, 1], [3, 0]].forEach(([l, s], i) => ar(S, 'm' + i, [14.6, L(l)], [16.9, 6.3 + s * 2.2], ['warn', 'ink-3', 'ok', 'accent'][s], 3, { h: .1 }));
  code(S, 'nm', 1, 14.2, 13.4, ['$ nm main.o', '0000000000000000 T main', '0000000000000000 D g', '0000000000000004 B z', '                 U printf'], [[4, 4]], { st: 4 });
  T(S, 'n1', 17, 14.6, ['T 코드 · D 데이터 · B bss', 'T text · D data · B bss'], 'cz-mono sy-xs', 4);
  T(S, 'n2', 17, 15.9, ['U = 여기 없음 → 링커가 찾아야 해요', 'U = undefined here → the linker must find it'], 'sy-xs sy-r', 4);
  T(S, 'n3', 17, 17.6, ['.bss는 파일에 크기만 기록 → 실행 파일이 작아요', '.bss stores only a size, keeping files small'], 'sy-xs', 5);
  T(S, 'n4', 17, 18.9, ['도구: nm, objdump -d, readelf -S', 'tools: nm, objdump -d, readelf -S'], 'cz-mono sy-xs', 5);
  S.cap(1, '전처리 → 컴파일 → 어셈블 → 링크', 'Preprocess → compile → assemble → link')
    .cap(2, '오브젝트 파일은 용도별 섹션으로 나뉘어요', 'An object file is split into sections by purpose')
    .cap(3, '코드와 전역 변수가 각자 맞는 섹션으로 가요', 'Code and globals each land in the right section')
    .cap(4, '심볼 표에는 정의한 이름과 빌려 쓸 이름이 있어요', 'The symbol table lists what is defined and what is borrowed')
    .cap(5, '오브젝트 파일: 링커에게 넘기는 조립 부품', 'Object files: the parts handed to the linker');
  return S;
}
function sLink() {
  const S = scene({ id: 'sy-link', steps: 5, per: 1.4 });
  rect(S, 'mb', 1, 1.8, 12.6, 6.6, 'accent', 8, 0, { r: .5 }); T(S, 'mt', 1.6, 2.2, 'main.o', 'cz-mono sy-s sy-a');
  code(S, 'mc', 1.6, 3.6, 11.4, ['main:', '  call ???', 'U add'], [[2, 2]]);
  rect(S, 'ab', 1, 10, 12.6, 5.4, 'warn', 8, 1, { r: .5 }); T(S, 'at', 1.6, 10.4, 'math.o', 'cz-mono sy-s sy-w', 1);
  code(S, 'ac', 1.6, 11.8, 11.4, ['add:  ...', 'T add'], [[1, 2]], { st: 1 });
  elb(S, 'rs', [[13, 7.4], [15, 7.4], [15, 13.2], [13.1, 13.2]], 'ok', 2, { h: .12 }); T(S, 'rsl', 15.4, 9.8, ['심볼 해석', 'symbol resolution'], 'sy-xs sy-g', 2);
  rect(S, 'ob', 18.4, 1.8, 12.6, 13.6, 'ink', 6, 3, { r: .5 }); T(S, 'ot', 19, 2.2, 'a.out', 'cz-mono sy-s', 3);
  code(S, 'oc', 19, 3.6, 11.4, ['0x401000  main:', '0x401004    call ???', '0x401020  add:', '            ...'], [[1, 4]], { st: 3 });
  T(S, 'oc4', 19.5, 4.9 + .3, '0x401004    call 0x401020', 'cz-mono sy-code sy-g', 4, { css: 'z-index:7;background:var(--ui)' });
  ar(S, 'm1', [13.7, 3.4], [18.3, 3.9], 'ink-3', 3, { h: .1 }); ar(S, 'm2', [13.7, 11.2], [18.3, 6.5], 'ink-3', 3, { h: .1 });
  T(S, 'r1', 19, 9.6, ['섹션을 이어 붙이고 주소 확정', 'sections merged, addresses fixed'], 'sy-xs', 3);
  T(S, 'r2', 19, 11, ['재배치: 빈 주소를 채워요', 'relocation fills in the blanks'], 'sy-xs sy-g', 4);
  T(S, 'e1', 1, 17, ['undefined reference to `add` → 그 오브젝트나 라이브러리(-lm 등)를 빠뜨렸어요', 'undefined reference to `add` → an object file or library (-lm …) is missing'], 'sy-xs sy-r', 5);
  T(S, 'e2', 1, 18.3, ['multiple definition → 같은 이름을 두 곳에서 정의 · 정적 라이브러리 .a = .o 묶음', 'multiple definition → the same name defined twice · a static library .a is a bundle of .o files'], 'sy-xs', 5);
  S.cap(1, 'main.o는 add를 부르지만 주소를 몰라요', 'main.o calls add without knowing its address')
    .cap(2, '링커가 다른 오브젝트에서 정의를 찾아 이름을 연결하고', 'The linker finds the definition in another object')
    .cap(3, '섹션을 합쳐 최종 주소를 정해요', 'merges sections and fixes final addresses')
    .cap(4, '비워 둔 호출 주소를 실제 주소로 고쳐 써요 (재배치)', 'and patches the placeholder with the real address (relocation)')
    .cap(5, '정적 링킹: 필요한 코드를 실행 파일 하나에', 'Static linking: everything needed in one executable');
  return S;
}
function sDynlink() {
  const S = scene({ id: 'sy-dynlink', steps: 5, per: 1.4 });
  box(S, 'app', 1, 1.8, 11, 2.4, 'app: call printf@plt', 'accent', 0); box(S, 'plt', 1, 6, 11, 2.4, 'printf@plt: jmp *GOT[n]', 'ink-3', 0, { pct: 25 });
  box(S, 'got', 1, 10.2, 11, 2.4, 'GOT[n] = → ld.so', 'warn', 0, { off: 3 }); box(S, 'got2', 1, 10.2, 11, 2.4, 'GOT[n] = 0x7f…a0', 'ok', 3, { pct: 45 });
  rect(S, 'lib', 17, 1.8, 14, 6.6, 'ok', 10, 0, { r: .5 }); T(S, 'libt', 17.6, 2.2, ['libc.so (공유 라이브러리)', 'libc.so (shared library)'], 'cz-mono sy-s sy-g'); box(S, 'pf', 18, 4.6, 12, 2, 'printf @ 0x7f…a0', 'ok', 0, { pct: 40 });
  box(S, 'ld', 17, 10.2, 14, 2.4, ['ld.so (동적 링커)', 'ld.so (dynamic linker)'], 'danger', 0, { pct: 25 });
  ar(S, 'a1', [6.5, 4.3], [6.5, 5.9], 'danger', 2, { off: 4 }); ar(S, 'a2', [6.5, 8.5], [6.5, 10.1], 'danger', 2, { off: 4 }); ar(S, 'a3', [12.1, 11.4], [16.9, 11.4], 'danger', 2, { off: 4 });
  ar(S, 'a4', [24, 10.1], [24, 6.7], 'danger', 3, { off: 4 }); elb(S, 'a5', [[17, 12], [14.5, 12], [14.5, 12.2], [12.1, 12.2]], 'ok', 3, { off: 4 });
  ar(S, 'b1', [5.5, 4.3], [5.5, 5.9], 'ok', 4); ar(S, 'b2', [5.5, 8.5], [5.5, 10.1], 'ok', 4); elb(S, 'b3', [[12.1, 10.8], [15, 10.8], [15, 5.6], [17.9, 5.6]], 'ok', 4);
  T(S, 't2', 1, 14, ['첫 호출: GOT가 동적 링커를 가리켜 printf를 찾아요', 'first call: the GOT points at the dynamic linker, which looks printf up'], 'sy-xs sy-r', 2);
  T(S, 't3', 1, 15.3, ['찾은 주소를 GOT에 써 둬요 (지연 바인딩)', 'it writes the address into the GOT (lazy binding)'], 'sy-xs', 3);
  T(S, 't4', 1, 16.6, ['두 번째부터는 GOT를 거쳐 곧바로 printf로', 'from then on calls go straight through the GOT'], 'sy-xs sy-g', 4);
  T(S, 't5', 1, 18.2, ['libc 한 벌을 모든 프로세스가 공유 · 다시 링크하지 않고 라이브러리 교체 · ldd로 의존성 확인', 'one copy of libc shared by every process · swap libraries without relinking · ldd lists dependencies'], 'sy-xs', 5);
  T(S, 't6', 1, 19.4, ['리눅스 .so · 윈도우 .dll · macOS .dylib', 'Linux .so · Windows .dll · macOS .dylib'], 'cz-mono sy-xs', 5);
  S.cap(1, '프로그램과 공유 라이브러리는 따로 메모리에 올라와요', 'The program and the shared library are loaded separately')
    .cap(2, '첫 호출은 PLT → GOT → 동적 링커로 가서', 'The first call goes PLT → GOT → dynamic linker')
    .cap(3, 'printf의 실제 주소를 GOT에 기록하고', 'which records printf’s real address in the GOT')
    .cap(4, '이후 호출은 바로 라이브러리 함수로 점프해요', 'Later calls jump straight to the library')
    .cap(5, '동적 링킹: 실행할 때 라이브러리를 연결', 'Dynamic linking: libraries are wired in at run time');
  return S;
}
function sMake() {
  const S = scene({ id: 'sy-make', steps: 5, per: 1.4 });
  const N = { app: [6, 1.6], mo: [1.6, 6.2], uo: [10.4, 6.2], mc: [.6, 10.8], uh: [5.8, 10.8], uc: [11, 10.8] }, W = 4.6, H = 1.8;
  const nm = { app: 'app', mo: 'main.o', uo: 'util.o', mc: 'main.c', uh: 'util.h', uc: 'util.c' };
  Object.entries(N).forEach(([k, [x, y]]) => box(S, k, x, y, W, H, nm[k], k.endsWith('o') || k === 'app' ? 'accent' : 'line', 0, { pct: 30 }));
  const E = (k, a, b) => ar(S, k, [N[a][0] + W / 2, N[a][1] - .05], [N[b][0] + W / 2, N[b][1] + H + .1], 'ink-3', 0, { h: .1 });
  E('e1', 'mc', 'mo'); E('e2', 'uh', 'mo'); E('e3', 'uh', 'uo'); E('e4', 'uc', 'uo'); E('e5', 'mo', 'app'); E('e6', 'uo', 'app');
  code(S, 'mk', 17.4, 1.6, 13.6, ['app: main.o util.o', '    cc -o app main.o util.o', 'main.o: main.c util.h', '    cc -c main.c', 'util.o: util.c util.h', '    cc -c util.c'], [[0, 2], [2, 2], [4, 2]]);
  tsets(S, 'uc', [[3, 'danger', 45], [4, 'line', 30]]); tsets(S, 'uh', [[4, 'danger', 45]]);
  tsets(S, 'uo', [[3, 'warn', 50]]); tsets(S, 'app', [[3, 'warn', 50]]); tsets(S, 'mo', [[4, 'warn', 50]]);
  T(S, 'r1', 17.4, 10.6, ['util.c 수정 → util.o, app만 다시', 'edit util.c → rebuild util.o and app only'], 'sy-xs sy-r', 3);
  T(S, 'r2', 17.4, 12, ['util.h 수정 → 둘 다 다시', 'edit util.h → both objects rebuild'], 'sy-xs sy-r', 4);
  T(S, 'r0', 17.4, 9.2, ['대상이 의존 파일보다 오래되면 다시 빌드', 'rebuild a target older than its inputs'], 'sy-xs', 2);
  T(S, 'f1', 1, 15.4, ['make -j8로 독립된 작업을 병렬 실행 · 헤더 의존성은 컴파일러가 생성(-MMD)', 'make -j8 runs independent jobs in parallel · compilers emit header dependencies (-MMD)'], 'sy-xs', 5);
  T(S, 'f2', 1, 16.8, ['CMake가 Makefile·Ninja 파일을 만들고, Bazel은 시간 대신 내용 해시로 판단해요', 'CMake generates Makefiles or Ninja files; Bazel decides by content hash instead of timestamps'], 'sy-xs', 5);
  S.cap(1, '빌드는 파일 사이의 의존성 그래프예요', 'A build is a dependency graph between files')
    .cap(2, 'Makefile 규칙 하나가 화살표 하나', 'Each Makefile rule is one set of arrows')
    .cap(3, '소스 하나를 고치면 그 위로 이어진 것만 다시 만들어요', 'Change one source and only what depends on it is rebuilt')
    .cap(4, '많이 쓰는 헤더를 고치면 많이 다시 빌드돼요', 'Touch a widely included header and much more rebuilds')
    .cap(5, '증분 빌드: 바뀐 부분만 다시', 'Incremental builds: redo only what changed');
  return S;
}
function sAbi() {
  const S = scene({ id: 'sy-abi', steps: 5, per: 1.4 });
  T(S, 'call', 1, 1.2, 'r = f(1, 2, 3, 4, 5, 6, 7);', 'cz-mono sy-s');
  ['rdi', 'rsi', 'rdx', 'rcx', 'r8', 'r9'].forEach((r, i) => { T(S, 'rn' + i, 1 + (i % 3) * 5, 2.9 + Math.floor(i / 3) * 2.4, r, 'cz-mono sy-xs'); box(S, 'rv' + i, 3 + (i % 3) * 5, 2.6 + Math.floor(i / 3) * 2.4, 2.4, 1.8, String(i + 1), 'accent', 1, { pct: 40 }); });
  T(S, 'rax', 1, 8.3, 'rax', 'cz-mono sy-xs'); box(S, 'raxv', 3, 8, 7.4, 1.8, ['반환값', 'return value'], 'ok', 4, { pct: 45 });
  code(S, 'pc', 1, 10.2, 13, ['push rbp', 'mov  rbp, rsp', 'sub  rsp, 16', '...', 'mov  eax, result', 'leave', 'ret'], [[0, 3], [4, 4]], { lh: 1.1 });
  const SX = 18, SW = 10, rows = [['7', 'warn', 1, ['7번째 인자', '7th arg']], [['돌려줄 주소', 'return addr'], 'ink-3', 2, 'call'], ['saved rbp', 'ink-3', 3, 'push rbp'], [['지역 변수 16B', 'locals 16B'], 'accent', 3, 'sub rsp']];
  T(S, 'sh', SX, 1.2, ['스택 (아래로 자람)', 'stack (grows down)'], 'sy-xs');
  rows.forEach(([t, c, st, n], i) => { box(S, 'st' + i, SX, 2.4 + i * 2.2, SW, 2, t, c, st, { pct: 30, off: i && st > 1 ? 5 : 0 }); T(S, 'sn' + i, SX + SW + .4, 2.9 + i * 2.2, n, 'cz-mono sy-xs', st, { off: i && st > 1 ? 5 : 0 }); });
  T(S, 'rbp', SX - 3, 7.3, 'rbp →', 'cz-mono sy-xs sy-a', 3, { off: 5 }); T(S, 'rsp', SX - 3, 9.5 + 1.2, 'rsp →', 'cz-mono sy-xs sy-w', 3, { off: 5 });
  T(S, 'e1', SX, 12.4, ['정수 인자 6개까지 레지스터, 나머지는 스택', 'first six integer args in registers, the rest on the stack'], 'sy-xs', 1);
  T(S, 'e2', SX, 13.8, ['rbx, rbp, r12–r15는 호출된 쪽이 보존', 'rbx, rbp, r12–r15 are callee-saved'], 'sy-xs', 3);
  T(S, 'e3', SX, 15.2, ['leave; ret → 프레임을 걷고 돌아가요', 'leave; ret tears down the frame and returns'], 'sy-xs sy-g', 4);
  T(S, 'f1', SX, 16.8, ['x86-64 System V(리눅스·macOS) 기준', 'x86-64 System V (Linux, macOS)'], 'sy-xs', 5); T(S, 'f1b', SX, 18, ['윈도우 rcx, rdx, r8, r9 · ARM64 x0–x7', 'Windows: rcx, rdx, r8, r9 · ARM64: x0–x7'], 'cz-mono sy-xs', 5); T(S, 'f1c', SX, 19.2, ['이 약속 덕분에 다른 컴파일러 코드도 섞여요', 'this contract lets compilers interoperate'], 'sy-xs sy-g', 5);
  S.cap(1, '인자는 정해진 레지스터 순서로, 넘치면 스택으로', 'Arguments go into fixed registers, overflow onto the stack')
    .cap(2, 'call이 돌아올 주소를 스택에 넣고', 'call pushes the return address')
    .cap(3, '함수 머리에서 프레임을 만들어요', 'The prologue builds the frame')
    .cap(4, '결과는 rax에 담아 돌아가요', 'The result comes back in rax')
    .cap(5, '호출 규약(ABI): 기계어 수준의 함수 계약', 'The calling convention: a machine-level contract for functions');
  return S;
}

/* ================= processes, signals, files ================= */
function sFork() {
  const S = scene({ id: 'sy-fork', steps: 5, per: 1.4 });
  rect(S, 'pb', 1, 1.6, 13, 6.8, 'accent', 10, 0, { r: .5 }); T(S, 'pt', 1.6, 2, ['PID 100 · 부모', 'PID 100 · parent'], 'sy-s sy-a');
  code(S, 'pc', 1.6, 3.4, 11.8, ['pid = fork();', 'if (pid == 0) exec("ls");', 'else wait(&status);'], [[0, 1], [2, 5]]);
  rect(S, 'cb', 18, 1.6, 13, 6.8, 'warn', 10, 1, { r: .5 }); T(S, 'ct', 18.6, 2, ['PID 101 · 자식 (복제본)', 'PID 101 · child (copy)'], 'sy-s sy-w', 1);
  code(S, 'cc', 18.6, 3.4, 11.8, ['pid = fork();', 'if (pid == 0) exec("ls");', 'else wait(&status);'], [[0, 1], [1, 4]], { st: 1, off: 4 });
  box(S, 'ex', 18.3, 2.9, 12.4, 5.2, ['/bin/ls 프로그램으로 교체', 'replaced by the /bin/ls program'], 'ok', 4, { pct: 55 });
  T(S, 'r1', 1.6, 8.8, ['fork() 반환값 = 101', 'fork() returned 101'], 'cz-mono sy-xs sy-a', 1); T(S, 'r2', 18.6, 8.8, ['fork() 반환값 = 0', 'fork() returned 0'], 'cz-mono sy-xs sy-w', 1);
  [0, 1, 2, 3].forEach(i => box(S, 'pg' + i, 9 + i * 3.6, 11.2, 3.2, 1.8, ['page ' + i, 'page ' + i], 'line', 2, { pct: 30 }));
  T(S, 'pgl', 9, 13.3, ['같은 물리 페이지를 공유 (읽기 전용 표시)', 'both share the same physical pages (marked read-only)'], 'sy-xs', 2);
  ar(S, 'sp', [7, 9.9], [10.4, 11.1], 'accent', 2, { h: .1 }); ar(S, 'sc', [21.5, 9.9], [20.6, 11.1], 'warn', 2, { h: .1 });
  box(S, 'cp', 25.6, 11.2, 3.6, 1.8, "page 2′", 'warn', 3, { pct: 55 }); ar(S, 'cpa', [26.5, 9.9], [27.2, 11.1], 'warn', 3, { h: .1 });
  T(S, 'cpl', 1, 14.8, ['자식이 쓰는 순간 그 페이지만 복사 (copy-on-write)', 'the moment the child writes, only that page is copied (copy-on-write)'], 'sy-xs sy-w', 3);
  T(S, 'f1', 1, 17.4, ['부모는 wait()로 자식의 종료 코드를 받아요', 'the parent collects the child’s exit status with wait()'], 'sy-xs', 5);
  T(S, 'f2', 1, 18.7, ['fork와 exec 사이에 셸이 리다이렉션·파이프를 설정해요 · posix_spawn은 둘을 한 번에', 'between fork and exec the shell sets up redirection and pipes · posix_spawn does both at once'], 'sy-xs', 5);
  S.cap(1, 'fork()는 프로세스를 통째로 복제하고 두 번 반환해요', 'fork() clones the process and returns twice')
    .cap(2, '메모리는 바로 복사하지 않고 공유해요', 'Memory isn’t copied right away; it is shared')
    .cap(3, '쓰기가 일어난 페이지만 그때 복사', 'Only pages that get written are copied')
    .cap(4, 'exec()는 자식의 프로그램을 새 것으로 갈아 끼워요', 'exec() swaps the child’s program for a new one')
    .cap(5, 'fork + exec + wait: 유닉스가 프로그램을 실행하는 방식', 'fork + exec + wait: how Unix runs programs');
  return S;
}
function sZombie() {
  const S = scene({ id: 'sy-zombie', steps: 5, per: 1.4 });
  T(S, 'h1', 1, 1.2, ['좀비', 'zombie'], 'sy-s');
  box(S, 'p', 1, 2.6, 8.4, 2.4, ['부모 100 · 실행 중', 'parent 100 · running'], 'accent', 0);
  box(S, 'c', 14, 2.6, 8.4, 2.4, ['자식 101 · 실행 중', 'child 101 · running'], 'warn', 0, { off: 2 });
  box(S, 'cz', 14, 2.6, 8.4, 2.4, ['자식 101 · Z (좀비)', 'child 101 · Z (zombie)'], 'ink-3', 2, { pct: 30, off: 3 });
  ar(S, 'pc', [9.6, 3.8], [13.8, 3.8], 'ink-3', 0, { h: .1, off: 3 });
  T(S, 'z1', 23.4, 2.6, ['exit(0) 후에도 PID와', 'after exit(0) its PID and'], 'sy-xs', 2); T(S, 'z2', 23.4, 3.8, ['종료 코드가 남아 있어요', 'exit code stay behind'], 'sy-xs', 2);
  T(S, 'w1', 1, 5.8, ['wait() → 종료 코드 0을 받고 항목 삭제 (거두기)', 'wait() → reads exit code 0 and removes the entry (reaping)'], 'sy-xs sy-g', 3);
  T(S, 'h2', 1, 8.6, ['고아', 'orphan'], 'sy-s', 4);
  box(S, 'p2', 1, 10, 8.4, 2.4, ['부모 200 · 먼저 종료', 'parent 200 · exits first'], 'ink-3', 4, { pct: 20 });
  box(S, 'c2', 14, 10, 8.4, 2.4, ['자식 201', 'child 201'], 'warn', 4);
  box(S, 'i1', 14, 15, 8.4, 2.4, ['PID 1 (init·systemd)', 'PID 1 (init/systemd)'], 'ok', 4);
  ar(S, 'ad', [18.2, 14.9], [18.2, 12.5], 'ok', 4, { h: .12 }); T(S, 'adl', 23.4, 12.4, ['PID 1이 입양해서', 'PID 1 adopts it'], 'sy-xs sy-g', 4); T(S, 'adl2', 23.4, 13.6, ['나중에 거둬요', 'and reaps it later'], 'sy-xs sy-g', 4);
  T(S, 'f1', 1, 18.6, ['좀비가 쌓이면 PID가 바닥나요 → SIGCHLD에서 wait · 컨테이너는 tini 같은 init을 PID 1로', 'piled-up zombies exhaust PIDs → wait in a SIGCHLD handler · containers run an init such as tini as PID 1'], 'cz-tc sy-xs', 5, { w: 30 });
  S.cap(1, '부모가 자식 프로세스를 만들었어요', 'A parent has started a child')
    .cap(2, '자식이 끝나도 부모가 확인할 때까지 기록이 남아요 (좀비)', 'When the child exits, its record lingers until the parent checks (zombie)')
    .cap(3, '부모가 wait()하면 비로소 사라져요', 'It disappears once the parent calls wait()')
    .cap(4, '부모가 먼저 죽으면 PID 1이 자식을 입양해요 (고아)', 'If the parent dies first, PID 1 adopts the child (orphan)')
    .cap(5, '프로세스는 반드시 누군가가 거둬야 해요', 'Every process must be reaped by someone');
  return S;
}
function sSignal() {
  const S = scene({ id: 'sy-signal', steps: 5, per: 1.4 });
  box(S, 'kb', 1, 1.8, 6.6, 2.4, 'Ctrl+C', 'line', 0); box(S, 'k', 10.6, 1.8, 7.4, 2.4, ['커널', 'kernel'], 'ink-3', 0, { pct: 25 });
  rect(S, 'pr', 21, 1.4, 10, 5, 'accent', 8, 0, { r: .5 }); code(S, 'pm', 21.4, 2.4, 9.2, ['while (running)', '    work();', 'cleanup(); exit(0);'], [[0, 1], [2, 4]]);
  rect(S, 'hb', 21, 8, 10, 3.8, 'warn', 10, 3, { r: .5 }); code(S, 'hc', 21.4, 8.4, 9.2, ['void on_int(int s)', '{ running = 0; }'], [], { st: 3 });
  ar(S, 'a1', [7.7, 3], [10.5, 3], 'danger', 2, { h: .12 }); ar(S, 'a2', [18.1, 3], [20.9, 3], 'danger', 2, { h: .12 }); T(S, 'a2l', 17, 4.4, 'SIGINT', 'cz-mono sy-xs sy-r', 2);
  ar(S, 'a3', [26, 6.5], [26, 7.9], 'warn', 3, { h: .12, off: 4 }); ar(S, 'a4', [24, 7.9], [24, 6.5], 'ok', 4, { h: .12 });
  T(S, 'n3', 1, 7, ['하던 일을 잠시 멈추고 핸들러 실행', 'pause the main flow, run the handler'], 'sy-xs', 3);
  T(S, 'n3b', 1, 8.3, ['핸들러에선 플래그만 바꾸기 (printf·malloc 금지)', 'only set a flag in the handler (no printf or malloc)'], 'sy-xs sy-r', 3);
  T(S, 'n4', 1, 9.9, ['돌아와서 루프가 끝나면 정리하고 종료', 'back in main, the loop ends: clean up and exit'], 'sy-xs sy-g', 4);
  const tb = [['SIGINT 2', ['Ctrl+C, 잡을 수 있음', 'Ctrl+C, catchable']], ['SIGTERM 15', ['정중한 종료 요청', 'polite termination request']], ['SIGKILL 9', ['강제 종료, 못 잡음', 'forced kill, cannot be caught']], ['SIGSEGV 11', ['잘못된 메모리 접근', 'invalid memory access']], ['SIGCHLD 17', ['자식 상태 변화', 'a child changed state']]];
  tb.forEach(([a, b], i) => { T(S, 'ta' + i, 1, 12.4 + i * 1.25, a, 'cz-mono sy-xs', 5); T(S, 'tb' + i, 7.6, 12.4 + i * 1.25, b, 'sy-xs', 5); });
  T(S, 'd1', 19, 13.4, ['docker stop·kubectl delete:', 'docker stop / kubectl delete:'], 'sy-xs sy-a', 5); T(S, 'd2', 19, 14.7, ['SIGTERM → 유예 후 SIGKILL', 'SIGTERM → grace period → SIGKILL'], 'cz-mono sy-xs', 5);
  T(S, 'd3', 19, 16, ['SIGTERM을 처리해야 깔끔히 종료', 'handle SIGTERM to shut down cleanly'], 'sy-xs sy-g', 5);
  S.cap(1, '프로세스가 반복 작업을 하고 있어요', 'A process is busy in its main loop')
    .cap(2, 'Ctrl+C를 누르면 커널이 SIGINT 시그널을 보내요', 'Ctrl+C makes the kernel send SIGINT')
    .cap(3, '등록한 핸들러가 끼어들어 실행되고', 'The registered handler runs in between')
    .cap(4, '원래 흐름으로 돌아와 정리하고 종료해요', 'Control returns, the program cleans up and exits')
    .cap(5, '시그널: 프로세스에 보내는 비동기 알림', 'Signals: asynchronous notifications to a process');
  return S;
}
function sFd() {
  const S = scene({ id: 'sy-fd', steps: 5, per: 1.4 });
  T(S, 'h1', 1, 1.2, ['fd 표 (프로세스별)', 'fd table (per process)'], 'sy-xs'); T(S, 'h2', 11, 1.2, ['열린 파일 표 (커널)', 'open file table (kernel)'], 'sy-xs'); T(S, 'h3', 23.4, 1.2, ['파일 (inode)', 'files (inodes)'], 'sy-xs');
  ['0 stdin', '1 stdout', '2 stderr', '3'].forEach((t, i) => box(S, 'fd' + i, 1, 2.6 + i * 2.3, 6.4, 1.9, t, i < 3 ? 'accent' : 'warn', i < 3 ? 0 : 2, { pct: 30 }));
  box(S, 'of0', 11, 2.6, 9, 4.2, ['터미널 · 읽기/쓰기', 'terminal · read/write'], 'accent', 0, { pct: 20 });
  box(S, 'of1', 11, 9.5, 9, 2.4, ['offset 0 · 쓰기', 'offset 0 · write'], 'warn', 2, { pct: 30, off: 3 }); box(S, 'of1b', 11, 9.5, 9, 2.4, ['offset 2 · 쓰기', 'offset 2 · write'], 'warn', 3, { pct: 45 });
  box(S, 'in0', 23.4, 3.4, 7.6, 2.4, '/dev/pts/0', 'ink-3', 0, { pct: 20 }); box(S, 'in1', 23.4, 9.5, 7.6, 2.4, 'log.txt', 'ok', 2, { pct: 35 });
  [0, 1, 2].forEach(i => ar(S, 'l' + i, [7.5, 3.55 + i * 2.3], [10.9, 3.6 + i * 1.1], 'accent', 0, { h: .1, off: i === 1 ? 4 : 0 }));
  ar(S, 'l3', [7.5, 10.45], [10.9, 10.6], 'warn', 2, { h: .1 }); ar(S, 'o0', [20.1, 4.6], [23.3, 4.6], 'ink-3', 0, { h: .1 }); ar(S, 'o1', [20.1, 10.7], [23.3, 10.7], 'ok', 2, { h: .1 });
  ar(S, 'l1b', [7.5, 5.85], [10.9, 10], 'danger', 4, { h: .14 });
  code(S, 'c', 1, 13, 14.4, ['fd = open("log.txt", O_WRONLY);  // 3', 'write(fd, "hi", 2);', 'dup2(fd, 1);   // stdout → log.txt'], [[0, 2], [1, 3], [2, 4]]);
  T(S, 'n2', 17, 13.2, ['가장 작은 빈 번호를 받아요', 'gets the lowest free number'], 'sy-xs', 2);
  T(S, 'n3', 17, 14.5, ['위치(offset)는 열린 파일 항목에', 'the offset lives in the open file entry'], 'sy-xs', 3);
  T(S, 'n4', 17, 15.8, ['이제 printf가 파일로 가요 (> log.txt)', 'now printf lands in the file (> log.txt)'], 'sy-xs sy-r', 4);
  T(S, 'f1', 1, 18.4, ['소켓·파이프·장치도 모두 fd · 닫지 않으면 “Too many open files” · ulimit -n', 'sockets, pipes and devices are fds too · leak them and you hit “Too many open files” · ulimit -n'], 'cz-tc sy-xs', 5, { w: 30 });
  S.cap(1, '모든 프로세스는 0, 1, 2번 fd를 갖고 시작해요', 'Every process starts with fds 0, 1 and 2')
    .cap(2, 'open()은 다음 빈 번호 3을 돌려줘요', 'open() returns the next free number, 3')
    .cap(3, '읽고 쓴 위치는 커널의 열린 파일 항목에 기록돼요', 'The read/write position is kept in the kernel’s open file entry')
    .cap(4, 'dup2로 1번을 파일에 연결하면 출력 리다이렉션', 'dup2 points fd 1 at the file: output redirection')
    .cap(5, '파일 디스크립터: 커널 자원을 가리키는 번호표', 'File descriptors: numbered handles to kernel resources');
  return S;
}
function sPipe() {
  const S = scene({ id: 'sy-pipe', steps: 5, per: 1.4 });
  box(S, 'sh', 11.4, 1.2, 9.2, 2.2, '$ ls | wc -l', 'line', 0, { pct: 35 });
  rect(S, 'buf', 11.4, 6.6, 9.2, 3.2, 'ink', 8, 1, { r: .4 }); T(S, 'bufl', 11.4, 10.2, ['커널 파이프 버퍼 (64 KiB)', 'kernel pipe buffer (64 KiB)'], 'cz-tc sy-xs', 1, { w: 9.2 });
  T(S, 'fds', 21, 1.6, ['pipe() → fd 3 읽기, fd 4 쓰기', 'pipe() → fd 3 read, fd 4 write'], 'cz-mono sy-xs', 1);
  box(S, 'ls', 1, 6.4, 7.6, 3.6, 'ls', 'accent', 2); box(S, 'wc', 23.4, 6.4, 7.6, 3.6, 'wc -l', 'warn', 2);
  T(S, 'lsn', 1, 10.4, 'dup2(4, 1)', 'cz-tc cz-mono sy-xs', 2, { w: 7.6 }); T(S, 'wcn', 23.4, 10.4, 'dup2(3, 0)', 'cz-tc cz-mono sy-xs', 2, { w: 7.6 });
  ar(S, 'f1', [10, 3.4], [6, 6.2], 'ink-3', 2, { h: .1 }); ar(S, 'f2', [22, 3.4], [26, 6.2], 'ink-3', 2, { h: .1 });
  ar(S, 'w', [8.7, 8.2], [11.3, 8.2], 'accent', 3, { h: .16 }); ar(S, 'r', [20.7, 8.2], [23.3, 8.2], 'warn', 3, { h: .16 });
  ['a.txt', 'b.c', 'c.md'].forEach((t, i) => box(S, 'd' + i, 12 + i * 2.8, 7.3, 2.6, 1.8, t, 'accent', 3, { pct: 45 }));
  T(S, 'n1', 1, 12.8, ['버퍼가 가득 차면 ls(쓰는 쪽)가 멈추고, 비면 wc(읽는 쪽)가 기다려요', 'a full buffer blocks ls (the writer); an empty one makes wc (the reader) wait'], 'sy-xs', 4);
  T(S, 'n2', 1, 14.2, ['쓰는 쪽 fd가 모두 닫히면 read()가 0 → EOF → wc가 결과 출력', 'when every write end is closed, read() returns 0 → EOF → wc prints'], 'sy-xs sy-g', 4);
  T(S, 'n3', 1, 16.4, ['안 쓰는 끝을 닫지 않으면 EOF가 안 와서 영원히 대기해요', 'forget to close unused ends and EOF never comes: it hangs forever'], 'sy-xs sy-r', 5);
  T(S, 'n4', 1, 17.8, ['이름 있는 파이프(mkfifo) · 작은 도구를 이어 붙이는 유닉스 철학', 'named pipes (mkfifo) · the Unix habit of chaining small tools'], 'sy-xs', 5);
  S.cap(1, '셸이 pipe()로 커널 버퍼와 양 끝 fd를 만들어요', 'The shell calls pipe() for a kernel buffer with two ends')
    .cap(2, '두 번 fork하고 각자 stdout·stdin을 파이프에 연결', 'It forks twice and wires stdout and stdin to the pipe')
    .cap(3, 'ls의 출력이 버퍼를 거쳐 wc의 입력이 돼요', 'ls’s output flows through the buffer into wc')
    .cap(4, '버퍼가 흐름을 조절하고 EOF로 끝을 알려요', 'The buffer paces both sides and EOF marks the end')
    .cap(5, '파이프: 프로세스를 잇는 단방향 바이트 흐름', 'Pipes: one-way byte streams between processes');
  return S;
}
function sMmap() {
  const S = scene({ id: 'sy-mmap', steps: 5, per: 1.4 });
  T(S, 'h1', 1, 1.2, ['프로세스 A 주소 공간', 'process A address space'], 'sy-xs'); T(S, 'h2', 12, 1.2, ['페이지 캐시 (RAM)', 'page cache (RAM)'], 'sy-xs'); T(S, 'h3', 23.4, 1.2, ['디스크 data.db', 'disk: data.db'], 'sy-xs');
  [0, 1, 2, 3].forEach(i => { rect(S, 'v' + i, 1, 2.6 + i * 2.2, 8, 1.8, 'accent', 10, 1, { r: .2, css: 'border:.08em dashed var(--accent)' }); T(S, 'vl' + i, 1.4, 2.9 + i * 2.2, 'page ' + i, 'cz-mono sy-xs', 1);
    box(S, 'd' + i, 23.4, 2.6 + i * 2.2, 7.6, 1.8, 'block ' + i, 'ink-3', 0, { pct: 20 }); });
  box(S, 'pc1', 12, 4.8, 8, 1.8, 'block 1', 'ok', 2, { pct: 35 }); tsets(S, 'pc1', [[3, 'danger', 35]]);
  tsets(S, 'v1', [[2, 'accent', 35]]);
  ar(S, 'ld', [23.3, 5.7], [20.1, 5.7], 'ok', 2, { h: .12 }); ar(S, 'mp', [9.1, 5.7], [11.9, 5.7], 'accent', 2, { h: .12 });
  T(S, 'pf', 1, 11.8, ['첫 접근 → 페이지 폴트 → 커널이 읽어와 연결', 'first touch → page fault → the kernel reads it in and maps it'], 'sy-xs', 2);
  T(S, 'dw', 1, 13.1, ['쓰기는 메모리에 바로 · 더러운 페이지는 나중에 디스크로 (msync)', 'writes go straight to memory · dirty pages reach disk later (msync)'], 'sy-xs sy-r', 3);
  ar(S, 'wb', [20.1, 6], [23.3, 6], 'danger', 3, { h: .1 });
  box(S, 'B', 12, 13.8 + 1.4, 8, 2, ['프로세스 B', 'process B'], 'warn', 4); ar(S, 'bm', [16, 15.1], [16, 6.7], 'warn', 4, { h: .12 });
  T(S, 'sh', 21, 15.4, ['MAP_SHARED: 같은 페이지 공유', 'MAP_SHARED: same pages, shared'], 'sy-xs sy-w', 4);
  T(S, 'f1', 1, 17.8, ['실행 파일·공유 라이브러리 로딩, LMDB·SQLite, 큰 파일 임의 접근에 써요', 'used to load executables and shared libraries, by LMDB and SQLite, and for big random-access files'], 'cz-tc sy-xs', 5, { w: 30 }); T(S, 'f1b', 1, 19.1, ['대신 I/O 오류가 SIGBUS로 오고 쓰기 시점을 통제하기 어려워요', 'but I/O errors arrive as SIGBUS and write timing is hard to control'], 'cz-tc sy-xs sy-r', 5, { w: 30 });
  S.cap(1, 'mmap은 파일을 주소 공간에 붙여요 (아직 읽지 않음)', 'mmap attaches a file to the address space (nothing read yet)')
    .cap(2, '처음 건드린 페이지만 페이지 폴트로 읽어 와요', 'Only pages you touch are read in, via page faults')
    .cap(3, '쓰기는 메모리에서 끝나고 디스크 반영은 나중에', 'Writes finish in memory; the disk catches up later')
    .cap(4, '다른 프로세스가 같은 파일을 매핑하면 같은 페이지를 공유', 'Another process mapping the file shares the same pages')
    .cap(5, '메모리 매핑 파일: read/write 없이 포인터로 파일 다루기', 'Memory-mapped files: file I/O through plain pointers');
  return S;
}

/* ================= I/O and concurrency ================= */
function sBuffer() {
  const S = scene({ id: 'sy-buffer', steps: 5, per: 1.4 });
  rect(S, 'us', 1, 1.6, 30, 6.6, 'accent', 6, 0, { r: .4 }); T(S, 'usl', 1.5, 1.9, ['사용자 공간', 'user space'], 'sy-xs sy-a');
  rect(S, 'ks', 1, 11, 30, 3, 'ink', 8, 0, { r: .4 }); T(S, 'ksl', 1.5, 11.3, ['커널', 'kernel'], 'sy-xs');
  T(S, 'cd', 1.5, 3.2, 'for (i = 0; i < 1000; i++) printf("x");', 'cz-mono sy-s');
  for (let i = 0; i < 12; i++) ar(S, 'u' + i, [2.2 + i * .7, 5.6], [2.2 + i * .7, 10.9], 'danger', 1, { h: .08, off: 2 });
  T(S, 'ul', 1.5, 12.6, ['write() 1000번', '1000 write() calls'], 'cz-mono sy-xs sy-r', 1, { off: 2 });
  rect(S, 'bf', 12, 5, 16, 2, 'line', 30, 2, { r: .2 }); T(S, 'bfl', 12, 7.2, ['stdio 버퍼 4 KiB', 'stdio buffer, 4 KiB'], 'sy-xs', 2);
  for (let i = 0; i < 8; i++) rect(S, 'bx' + i, 12.1 + i * 1.98, 5.1, 1.86, 1.8, 'accent', 45, 2 + (i >= 5 ? 1 : 0), { r: .1, off: 4 });
  ar(S, 'one', [20, 7.9], [20, 10.9], 'ok', 3, { h: .2 }); T(S, 'onel', 20.6, 9, ['가득 차면 write() 1번', 'one write() when full'], 'sy-xs sy-g', 3);
  T(S, 'm1', 1, 15, ['터미널은 줄 단위로 비워요, 파이프·파일은 버퍼가 찰 때까지 → ./app | cat 출력이 늦게 보이는 이유', 'terminals flush per line, pipes and files when the buffer fills → why ./app | cat shows output late'], 'sy-xs', 4);
  T(S, 'm2', 1, 16.4, ['비정상 종료하면 버퍼의 내용이 사라져요 → 중요한 로그는 fflush, stderr는 버퍼 없음', 'a crash loses whatever is still buffered → fflush important logs; stderr is unbuffered'], 'sy-xs sy-r', 4);
  T(S, 'm3', 1, 18.2, ['시스템 콜 한 번은 수백 ns~수 µs · 자바 BufferedWriter, 파이썬 print(flush=True), setvbuf', 'a syscall costs hundreds of ns to a few µs · Java’s BufferedWriter, Python’s print(flush=True), setvbuf'], 'sy-xs', 5);
  S.cap(1, '한 글자마다 시스템 콜을 부르면 커널을 1000번 오가요', 'One syscall per character means 1000 trips into the kernel')
    .cap(2, '버퍼에 모아 두었다가', 'Collect the bytes in a buffer instead')
    .cap(3, '가득 차면 한 번에 써요', 'and write them in one go when it fills')
    .cap(4, '언제 비우는지가 출력 순서와 유실을 좌우해요', 'When it flushes decides output order and what a crash loses')
    .cap(5, '버퍼링된 I/O: 시스템 콜 횟수를 줄이는 기본기', 'Buffered I/O: the basic trick for fewer syscalls');
  return S;
}
function sEpoll() {
  const S = scene({ id: 'sy-epoll', steps: 5, per: 1.4 });
  T(S, 'h1', 1, 1.2, ['연결마다 스레드', 'a thread per connection'], 'sy-s sy-r', 1);
  for (let i = 0; i < 12; i++) box(S, 't' + i, 1 + (i % 4) * 3.4, 2.6 + Math.floor(i / 4) * 2.4, 3, 1.9, 'T' + (i + 1), 'danger', 1, { pct: 25 });
  T(S, 't1', 1, 10.2, ['1만 연결 → 스레드 1만 개', '10k connections → 10k threads'], 'sy-xs', 1); T(S, 't2', 1, 11.4, ['스택 메모리·컨텍스트 스위칭 부담', 'stack memory and context switches add up'], 'sy-xs sy-r', 1);
  T(S, 'h2', 17, 1.2, ['스레드 하나 + 이벤트 루프', 'one thread + an event loop'], 'sy-s sy-g', 2);
  const cx = 23.6, cy = 8, R = 5.2; box(S, 'lp', cx - 2.8, cy - 1.1, 5.6, 2.2, 'epoll_wait', 'ok', 2, { pct: 40 });
  for (let i = 0; i < 10; i++) { const a = i / 10 * 2 * Math.PI; box(S, 's' + i, cx + R * Math.sin(a) - 1.2, cy - R * Math.cos(a) - .8, 2.4, 1.6, 'fd' + (i + 3), 'line', 2, { pct: 30 }); }
  [2, 7].forEach(i => tsets(S, 's' + i, [[3, 'warn', 55]]));
  T(S, 'r1', 17, 14.6, ['준비된 소켓만 돌려받아요 (O(준비된 수))', 'only ready sockets come back (O(ready))'], 'sy-xs sy-w', 3);
  T(S, 'r2', 17, 15.9, ['논블로킹으로 처리하고 다시 대기', 'handle them non-blocking, then wait again'], 'sy-xs', 4);
  code(S, 'cd', 1, 13.4, 14, ['for (;;) {', '  n = epoll_wait(ep, ev, 64, -1);', '  for (i = 0; i < n; i++)', '    handle(ev[i].data.fd);', '}'], [[1, 3], [3, 4]], { st: 2, lh: 1.15 });
  T(S, 'f1', 1, 19.6, ['nginx, Node.js(libuv), Redis, Netty · BSD·macOS kqueue, 윈도우 IOCP, 리눅스 io_uring', 'nginx, Node.js (libuv), Redis, Netty · kqueue on BSD and macOS, IOCP on Windows, io_uring on Linux'], 'cz-tc sy-xs', 5, { w: 30 });
  S.cap(1, '연결마다 스레드를 두면 연결이 많을 때 무거워요', 'A thread per connection gets heavy with many connections')
    .cap(2, '스레드 하나가 수많은 소켓을 epoll에 등록해 두고', 'One thread registers many sockets with epoll')
    .cap(3, 'epoll_wait가 읽을 데이터가 있는 소켓만 알려 줘요', 'epoll_wait reports only the sockets that are ready')
    .cap(4, '처리하고 다시 기다리는 루프를 돌아요', 'Handle them and loop back to waiting')
    .cap(5, 'I/O 멀티플렉싱: 고성능 서버의 기본 구조', 'I/O multiplexing: the backbone of high-performance servers');
  return S;
}
function sZerocopy() {
  const S = scene({ id: 'sy-zerocopy', steps: 5, per: 1.4 });
  rect(S, 'us', 1, 1.4, 30, 3.4, 'accent', 6, 0, { r: .4 }); T(S, 'usl', 1.4, 1.6, ['사용자 공간', 'user space'], 'sy-xs sy-a');
  rect(S, 'ks', 1, 5.6, 30, 3.8, 'ink', 7, 0, { r: .4 }); T(S, 'ksl', 1.4, 5.8, ['커널', 'kernel'], 'sy-xs');
  box(S, 'disk', 1.4, 10.6, 5.4, 2.2, ['디스크', 'disk'], 'ink-3', 0, { pct: 25 }); box(S, 'nic', 25.2, 10.6, 5.4, 2.2, ['네트워크 카드', 'NIC'], 'ink-3', 0, { pct: 25 });
  box(S, 'pc', 4, 6.6, 7, 2.2, ['페이지 캐시', 'page cache'], 'ok', 0); box(S, 'sb', 19, 6.6, 7.6, 2.2, ['소켓 버퍼', 'socket buffer'], 'warn', 0); box(S, 'ub', 11.4, 2.2, 7, 2.2, ['앱 버퍼', 'app buffer'], 'accent', 1, { off: 3 });
  ar(S, 'c1', [4.2, 10.5], [5.8, 8.9], 'ok', 1, { h: .14 }); T(S, 'c1l', .8, 9.4, 'DMA', 'cz-mono sy-xs', 1);
  ar(S, 'c2', [11.1, 7.1], [12.6, 4.5], 'danger', 1, { h: .14, off: 3 }); T(S, 'c2l', 8.2, 4.8, ['CPU 복사', 'CPU copy'], 'sy-xs sy-r', 1, { off: 3 });
  ar(S, 'c3', [17.4, 4.5], [19.6, 6.5], 'danger', 2, { h: .14, off: 3 }); T(S, 'c3l', 19, 4.8, ['CPU 복사', 'CPU copy'], 'sy-xs sy-r', 2, { off: 3 });
  ar(S, 'c4', [25.2, 8.9], [27.2, 10.5], 'ok', 2, { h: .14, off: 3 }); T(S, 'c4l', 28.2, 9.4, 'DMA', 'cz-mono sy-xs', 2, { off: 3 });
  elb(S, 'z', [[11.1, 8.4], [24, 8.4], [24, 9.2], [26.6, 10.5]], 'ok', 3, { h: .16 }); T(S, 'zl', 13, 8.9, ['sendfile: 페이지 캐시 → NIC 직접', 'sendfile: page cache → NIC directly'], 'sy-xs sy-g', 3);
  T(S, 'm1', 1, 14, ['read() + write(): 복사 4번(CPU 2번) · 모드 전환 4번', 'read() + write(): 4 copies (2 by the CPU) · 4 mode switches'], 'sy-s sy-r', 2);
  T(S, 'm2', 1, 15.6, ['sendfile(): 복사 2번(모두 DMA) · 모드 전환 2번', 'sendfile(): 2 copies (both DMA) · 2 mode switches'], 'sy-s sy-g', 4);
  T(S, 'f1', 1, 17.8, ['nginx sendfile on, 카프카의 로그 전송, 자바 FileChannel.transferTo · 데이터를 손대지 않고 넘길 때 효과적', 'nginx “sendfile on”, Kafka’s log shipping, Java’s FileChannel.transferTo · best when data passes through untouched'], 'cz-tc sy-xs', 5, { w: 30 });
  S.cap(1, '파일을 읽으면 디스크 → 페이지 캐시 → 앱 버퍼로 복사', 'Reading copies disk → page cache → app buffer')
    .cap(2, '소켓에 쓰면 다시 소켓 버퍼 → 네트워크 카드로 복사', 'Writing copies again into the socket buffer and out the NIC')
    .cap(3, 'sendfile은 데이터를 사용자 공간으로 올리지 않아요', 'sendfile never lifts the data into user space')
    .cap(4, 'CPU 복사와 전환이 사라져요', 'CPU copies and mode switches disappear')
    .cap(5, '제로 카피: 파일 서버와 메시지 브로커의 비결', 'Zero copy: the trick behind fast file servers and brokers');
  return S;
}
function sAtomic() {
  const S = scene({ id: 'sy-atomic', steps: 5, per: 1.4 });
  T(S, 'xl', 13, 1.2, ['공유 변수 x', 'shared x'], 'cz-tc sy-xs', 0, { w: 6 });
  box(S, 'x5', 13, 2.4, 6, 2.6, '5', 'line', 0, { pct: 30, off: 2 }); box(S, 'x6', 13, 2.4, 6, 2.6, '6', 'ok', 2, { pct: 45, off: 3 }); box(S, 'x7', 13, 2.4, 6, 2.6, '7', 'ok', 3, { pct: 55 });
  rect(S, 'b1', 1, 1.4, 10, 9.6, 'accent', 8, 0, { r: .5 }); T(S, 'b1t', 1.6, 1.8, 'T1', 'cz-mono sy-s sy-a');
  rect(S, 'b2', 21, 1.4, 10, 9.6, 'warn', 8, 0, { r: .5 }); T(S, 'b2t', 21.6, 1.8, 'T2', 'cz-mono sy-s sy-w');
  T(S, 'a1', 1.6, 3.4, 'old = 5, new = 6', 'cz-mono sy-xs', 1); T(S, 'a2', 21.6, 3.4, 'old = 5, new = 6', 'cz-mono sy-xs', 2);
  T(S, 'a3', 21.6, 4.8, 'CAS(x, 5, 6) ✓', 'cz-mono sy-s sy-g', 2); T(S, 'a4', 1.6, 4.8, 'CAS(x, 5, 6) ✗', 'cz-mono sy-s sy-r', 3);
  T(S, 'a5', 1.6, 6.2, ['x가 이미 6 → 다시 읽기', 'x is already 6 → reread'], 'sy-xs', 3); T(S, 'a6', 1.6, 7.6, 'old = 6 → CAS(x, 6, 7) ✓', 'cz-mono sy-xs sy-g', 3);
  ar(S, 'r2', [20.9, 5.2], [19.1, 4.2], 'warn', 2, { h: .12 }); ar(S, 'r1', [11.1, 5.2], [12.9, 4.2], 'accent', 3, { h: .12 });
  code(S, 'cd', 1, 12, 17, ['do {', '    old = x;  new = old + 1;', '} while (!CAS(&x, old, new));'], [[2, 3]], { lh: 1.2 });
  T(S, 'aba1', 19.6, 12, ['ABA 문제: A → B → A로 돌아오면', 'ABA: if it goes A → B → A,'], 'sy-xs sy-r', 4); T(S, 'aba2', 19.6, 13.3, ['CAS는 변화를 모른 채 성공', 'CAS succeeds without noticing'], 'sy-xs sy-r', 4);
  T(S, 'aba3', 19.6, 14.6, ['→ 버전 번호를 함께 비교', '→ compare a version tag too'], 'sy-xs', 4);
  T(S, 'f1', 1, 17.2, ['x86 lock cmpxchg, ARM LDXR/STXR · C++ std::atomic, 자바 AtomicInteger, Go sync/atomic', 'x86 lock cmpxchg, ARM LDXR/STXR · C++ std::atomic, Java AtomicInteger, Go sync/atomic'], 'cz-tc sy-xs', 5, { w: 30 });
  T(S, 'f2', 1, 18.5, ['락 없이도 안전한 카운터·스택·큐(lock-free 자료구조)의 기본 부품', 'the building block of lock-free counters, stacks and queues'], 'cz-tc sy-xs', 5, { w: 30 });
  S.cap(1, 'T1이 x를 읽고 새 값을 계산하는 사이', 'While T1 reads x and computes a new value')
    .cap(2, 'T2가 먼저 “아직 5면 6으로” 바꾸기에 성공해요', 'T2 succeeds first with “if still 5, make it 6”')
    .cap(3, 'T1의 비교는 실패하고, 새 값으로 다시 시도해 성공', 'T1’s compare fails, so it retries with the fresh value')
    .cap(4, '값만 비교하므로 A → B → A 변화는 못 알아채요', 'Comparing only values misses an A → B → A change')
    .cap(5, 'CAS: 비교와 교체를 한 번에 하는 원자적 명령', 'CAS: compare and swap as one atomic instruction');
  return S;
}
function sMemorder() {
  const S = scene({ id: 'sy-memorder', steps: 5, per: 1.4 });
  code(S, 't1', 1, 1.6, 12, ['// T1', 'data = 42;', 'ready = 1;'], [[1, 2], [2, 2]]); code(S, 't2', 19, 1.6, 12, ['// T2', 'while (!ready) {}', 'print(data);'], [[1, 2], [2, 2]]);
  T(S, 'ok1', 19, 6.4, ['기대: 42', 'expected: 42'], 'cz-mono sy-s sy-g', 2, { off: 3 });
  ar(S, 'po', [7, 3.4], [7, 4.4], 'ok', 2, { h: .1, off: 3 });
  box(S, 'm1', 13.6, 2, 4.6, 1.6, 'ready = 1', 'warn', 3, { pct: 45, off: 4 }); box(S, 'm2', 13.6, 4, 4.6, 1.6, 'data = 42', 'accent', 3, { pct: 30, off: 4 });
  T(S, 'mo', 13.1, 6, ['T2에 보이는 순서', 'order T2 sees'], 'cz-tc sy-xs', 3, { w: 5.6, off: 4 });
  T(S, 'bad', 19, 6.4, ['실제로 0이 찍힐 수도', 'may actually print 0'], 'cz-mono sy-s sy-r', 3, { off: 4 });
  T(S, 'why', 1, 8.3, ['컴파일러 최적화나 CPU의 저장 버퍼가 두 쓰기의 순서를 바꿀 수 있어요', 'compiler optimizations or the CPU’s store buffer can reorder the two writes'], 'sy-xs sy-r', 3, { off: 4 }); T(S, 'why2', 1, 9.4, ['특히 ARM 같은 약한 메모리 모델에서 잘 드러나요', 'especially on weak memory models such as ARM'], 'sy-xs sy-r', 3, { off: 4 });
  code(S, 'f1', 1, 10.6, 14, ['data = 42;', 'ready.store(1, release);'], [], { st: 4 }); code(S, 'f2', 17, 10.6, 14, ['while (!ready.load(acquire)) {}', ['print(data);   // 항상 42', 'print(data);   // always 42']], [], { st: 4 });
  ar(S, 'hb', [15.1, 12.6], [16.9, 12.6], 'ok', 4, { h: .16 }); T(S, 'hbl', 1, 14.4, ['release 이전의 쓰기는 acquire 이후에 반드시 보여요 (happens-before)', 'writes before the release are visible after the matching acquire (happens-before)'], 'sy-xs sy-g', 4);
  T(S, 'n1', 1, 16.6, ['x86은 비교적 강한 순서(TSO), ARM·POWER는 약해서 차이가 잘 드러나요', 'x86 orders memory fairly strongly (TSO); ARM and POWER are weaker, so bugs show up there'], 'sy-xs', 5);
  T(S, 'n2', 1, 17.9, ['C/C++의 volatile은 동기화가 아니에요 · 뮤텍스나 atomic을 쓰세요 (자바 volatile은 동기화)', 'C/C++ volatile is not synchronization · use mutexes or atomics (Java’s volatile is)'], 'sy-xs', 5);
  S.cap(1, 'T1은 데이터를 쓰고 준비 플래그를 올려요', 'T1 writes the data, then raises a ready flag')
    .cap(2, '코드 순서대로라면 T2는 42를 읽어요', 'In program order, T2 reads 42')
    .cap(3, '하지만 다른 코어에는 쓰기 순서가 바뀌어 보일 수 있어요', 'But another core may see the writes in a different order')
    .cap(4, 'release/acquire로 순서를 약속하면 안전해요', 'A release/acquire pair guarantees the order')
    .cap(5, '메모리 순서: 멀티코어 동기화의 바닥', 'Memory ordering: the floor of multicore synchronization');
  return S;
}
function sSpin() {
  const S = scene({ id: 'sy-spin', steps: 5, per: 1.4 });
  const X = t => 6 + t * 2.2;
  hl(S, 'tl', X(0), X(11), 15.4, 'ink-3', 0, { w: .1 }); T(S, 'tll', X(11) - 2, 15.7, ['시간', 'time'], 'sy-xs');
  T(S, 'l1', 1, 2.4, 'T1', 'cz-mono sy-s'); box(S, 'h1', X(0), 2, X(5) - X(0), 1.8, ['락 보유', 'holds lock'], 'accent', 1, { pct: 40 });
  T(S, 'l2', 1, 5.6, ['T2 스핀', 'T2 spin'], 'sy-xs'); rect(S, 's1', X(1), 5.2, X(5) - X(1), 1.8, 'warn', 45, 2, { r: .2, css: 'background-image:repeating-linear-gradient(45deg,transparent 0 .3em,color-mix(in srgb,var(--warn) 50%,transparent) .3em .6em)' });
  T(S, 's1l', X(1) + .3, 5.5, ['바쁜 대기 · CPU 100%', 'busy-wait · CPU 100%'], 'sy-xs', 2); box(S, 's2', X(5), 5.2, X(7.5) - X(5), 1.8, ['진입', 'enter'], 'warn', 2, { pct: 50 });
  T(S, 'l3', 1, 9, ['T2 뮤텍스', 'T2 mutex'], 'sy-xs', 3); box(S, 'm1', X(1), 8.6, X(5) - X(1), 1.8, ['잠듦 (CPU 양보)', 'asleep (CPU yielded)'], 'line', 3, { pct: 20 });
  box(S, 'm2', X(5), 8.6, X(6) - X(5), 1.8, '', 'danger', 3, { pct: 30 }); box(S, 'm3', X(6), 8.6, X(8.5) - X(6), 1.8, ['진입', 'enter'], 'warn', 3, { pct: 50 });
  T(S, 'm2l', X(4.6), 10.8, ['깨우는 비용', 'wake-up cost'], 'sy-xs sy-r', 3);
  T(S, 'l4', 1, 12.6, 'T3', 'cz-mono sy-s', 3); box(S, 't3', X(1), 12.2, X(5) - X(1), 1.8, ['다른 일 처리', 'useful work'], 'ok', 3, { pct: 40 });
  T(S, 'r1', 1, 16.4, ['락을 아주 잠깐(수십~수백 ns) 쥐면 스핀락, 오래 쥐면 뮤텍스 · 문맥 교환은 수 µs', 'hold a lock for tens of ns: spin · for longer: sleep · a context switch costs microseconds'], 'sy-xs', 4);
  T(S, 'r2', 1, 17.6, ['리눅스 futex: 경쟁이 없으면 사용자 공간 원자 연산만, 경쟁할 때만 커널로', 'Linux futexes: one user-space atomic when uncontended, the kernel only under contention'], 'sy-xs', 5); T(S, 'r2b', 1, 18.8, ['적응형 뮤텍스는 잠깐 돌다 잠들어요', 'adaptive mutexes spin briefly, then sleep'], 'sy-xs', 5);
  T(S, 'r3', 1, 20, ['코어가 하나뿐이면 스핀은 절대 금물', 'never spin on a single core'], 'sy-xs sy-r', 5);
  S.cap(1, 'T1이 락을 잡고 임계 구역에 있어요', 'T1 holds the lock inside its critical section')
    .cap(2, '스핀락: T2는 CPU를 쓰며 계속 확인해요', 'Spinlock: T2 burns CPU checking again and again')
    .cap(3, '뮤텍스: T2는 잠들고 CPU는 다른 스레드가 써요', 'Mutex: T2 sleeps and another thread gets the CPU')
    .cap(4, '기다리는 시간과 잠들고 깨는 비용을 비교해 골라요', 'Choose by comparing the wait against the cost of sleeping')
    .cap(5, '실제 락은 둘을 섞어 써요', 'Real locks blend the two');
  return S;
}

window.UX = page([
  sec('sy-c', 'C와 메모리', 'C & memory', 'C와 메모리', 'C and memory',
    '주소와 바이트 단위로 메모리를 직접 다루는 법이에요.', 'Working with memory directly, address by address and byte by byte.', [
    item('sy-pointer', '포인터', 'Pointers', '포인터는 다른 값이 있는 메모리 주소를 담는 변수예요. &로 주소를 얻고 *로 그 주소의 값을 읽고 써요.', '예: int x = 42; int *p = &x; *p = 7 → x가 7. p + 1은 sizeof(int) = 4바이트 뒤를 가리켜요. NULL이나 해제된 주소를 역참조하면 세그멘테이션 오류. 큰 데이터를 복사 없이 넘기거나 연결 리스트·트리 같은 자료구조를 만들 때 써요.', 'A pointer is a variable holding the memory address of another value. & takes an address; * reads or writes what lives there.', 'int x = 42; int *p = &x; *p = 7 leaves x at 7. p + 1 points sizeof(int) = 4 bytes further. Dereferencing NULL or freed memory is a segmentation fault. Pointers pass large data without copying and link structures such as lists and trees.', sPointer()),
    item('sy-array', '배열과 포인터 산술', 'Arrays and pointer arithmetic', '배열은 같은 크기 원소가 연속으로 놓인 메모리예요. a[i]는 *(a + i)와 같아 주소 계산만으로 바로 접근해요.', 'a[i]의 주소 = 시작 주소 + i × 원소 크기 → O(1) 접근. 배열 이름은 대부분의 식에서 첫 원소 주소로 바뀌고(decay), 함수에 넘기면 길이 정보를 잃어요. C는 범위를 검사하지 않아 a[4]는 이웃 메모리를 읽어요. 2차원 배열은 행 우선으로 펼쳐져서 행 단위 순회가 캐시에 유리해요.', 'An array is equal-sized elements laid out contiguously. a[i] is just *(a + i), so access is pure address arithmetic.', 'The address of a[i] is base + i × element size, giving O(1) access. In most expressions the array name decays to a pointer to element 0, and passing it to a function loses its length. C doesn’t check bounds, so a[4] reads whatever sits next door. 2D arrays are stored row-major, which is why row-by-row loops are cache-friendly.', sArray()),
    item('sy-struct', '구조체 정렬과 패딩', 'Struct alignment and padding', '필드는 자기 크기의 배수 주소에 놓이고, 그 사이를 패딩 바이트가 채워요. 필드 순서만 바꿔도 크기가 달라져요.', '예: { char; int; char; double; }은 24바이트, { double; int; char; char; }은 16바이트. 정렬된 주소는 CPU가 한 번에 읽고, 정렬 안 된 접근은 느리거나 일부 CPU에선 오류예요. 파일·네트워크 포맷은 패딩을 명시하거나 packed로 고정하고, offsetof와 sizeof로 확인해요.', 'Each field sits at a multiple of its own size, with padding bytes filling the gaps. Reordering fields alone can change the size.', '{ char; int; char; double; } takes 24 bytes; { double; int; char; char; } takes 16. CPUs read aligned addresses in one go, while unaligned access is slow or even faults on some CPUs. File and wire formats spell out padding or use packed layouts; check with offsetof and sizeof.', sStruct()),
    item('sy-malloc', '힙 할당자 (malloc/free)', 'Heap allocators (malloc/free)', 'malloc은 힙에서 빈 블록을 찾아 잘라 주고, free는 블록을 빈 목록에 돌려놓아요. 이웃한 빈 블록은 합쳐 단편화를 줄여요.', '블록 앞 헤더에 크기·사용 여부를 기록해 free(p)만으로 반환할 수 있어요. 배치 전략: first fit, best fit, 크기별 풀. 작은 조각이 흩어지면 총량은 충분해도 큰 요청이 실패해요(외부 단편화). glibc ptmalloc, jemalloc, tcmalloc, mimalloc은 스레드별 캐시로 경합을 줄여요.', 'malloc finds a free block on the heap and carves it up; free returns blocks to the free list, merging neighbors to limit fragmentation.', 'A header before each block records its size and status, so free(p) needs nothing else. Placement policies include first fit, best fit and segregated size classes. Scattered small holes can make a large request fail even with enough total space (external fragmentation). glibc’s ptmalloc, jemalloc, tcmalloc and mimalloc add per-thread caches to cut contention.', sMalloc()),
    item('sy-membugs', '메모리 버그', 'Memory bugs', '누수, 해제 후 사용, 이중 해제, 댕글링 포인터는 수동 메모리 관리의 대표적 버그예요. 크래시뿐 아니라 보안 취약점이 돼요.', '마이크로소프트와 크롬 모두 심각한 보안 버그의 약 70%가 메모리 안전성 문제라고 밝혔어요. AddressSanitizer(-fsanitize=address), Valgrind로 잡고, RAII·스마트 포인터(unique_ptr, shared_ptr), 러스트의 소유권·빌림 검사, GC 언어로 예방해요.', 'Leaks, use-after-free, double free and dangling pointers are the classic bugs of manual memory management, and they become security holes, not just crashes.', 'Microsoft and Chrome have both reported that about 70% of their serious security bugs are memory-safety issues. AddressSanitizer (-fsanitize=address) and Valgrind catch them; RAII, smart pointers (unique_ptr, shared_ptr), Rust’s ownership and borrow checking, and garbage-collected languages prevent them.', sMembugs()),
    item('sy-stack', '스택 프레임과 버퍼 오버플로', 'Stack frames and buffer overflows', '함수 호출마다 스택에 돌려줄 주소와 지역 변수가 쌓여요. 길이 검사 없이 배열에 쓰면 옆의 데이터와 돌려줄 주소까지 덮어써요.', 'strcpy·gets처럼 길이를 받지 않는 함수가 주원인. 방어: 스택 카나리(덮어쓰기 감지), NX(스택 실행 금지), ASLR(주소 무작위화), 길이를 받는 snprintf·strlcpy, 범위를 검사하는 언어. 1988년 모리스 웜 이후 가장 유명한 취약점 유형이에요.', 'Every call pushes a return address and locals onto the stack. Writing into an array without a length check can overwrite its neighbors, including the return address.', 'Functions that take no length, such as strcpy and gets, are the usual cause. Defenses: stack canaries (detect the overwrite), NX (non-executable stack), ASLR (randomized addresses), length-aware snprintf and strlcpy, and bounds-checked languages. It has been the most famous vulnerability class since the 1988 Morris worm.', sStack()),
    item('sy-bitops', '비트 연산', 'Bitwise operations', 'AND·OR·XOR·시프트로 정수 안의 비트를 하나씩 켜고 끄고 검사해요. 참/거짓 여러 개를 정수 하나에 담아 한 번에 처리해요.', '켜기 x |= 1 << k, 끄기 x &= ~(1 << k), 뒤집기 x ^= 1 << k, 검사 (x >> k) & 1. x & (x − 1)은 가장 낮은 1을 지우고, 결과가 0이면 2의 거듭제곱. 파일 권한(chmod 755), 기능 플래그, 체스 비트보드, 블룸 필터, 서브넷 마스크, 해시 함수에 써요.', 'AND, OR, XOR and shifts set, clear and test individual bits, packing many booleans into one integer and updating them together.', 'Set x |= 1 << k, clear x &= ~(1 << k), flip x ^= 1 << k, test (x >> k) & 1. x & (x − 1) clears the lowest set bit and is zero exactly for powers of two. Used for file permissions (chmod 755), feature flags, chess bitboards, Bloom filters, subnet masks and hash functions.', sBitops()),
    item('sy-intovf', '정수 오버플로', 'Integer overflow', '고정 크기 정수는 범위를 넘으면 한 바퀴 돌아요. 부호 없는 정수는 mod 2ⁿ으로, C의 부호 있는 정수는 정의되지 않은 동작이에요.', 'uint8 255 + 1 = 0, int8 127 + 1 → −128(대부분의 CPU). 크기 계산 malloc(n * size)가 넘치면 작은 버퍼가 잡혀 오버플로로 이어져요. size_t 0 − 1 = 2⁶⁴ − 1. 2014년 강남스타일 조회수가 2³¹ − 1을 넘어 유튜브가 64비트 카운터로 바꿨어요. __builtin_mul_overflow, 러스트 checked_*, 자바 Math.*Exact로 검사해요.', 'Fixed-width integers wrap around past their range: unsigned ones modulo 2ⁿ, while signed overflow in C is undefined behavior.', 'uint8 255 + 1 = 0; int8 127 + 1 gives −128 on most CPUs. An overflowing size calculation malloc(n * size) allocates a tiny buffer and invites an overflow. size_t 0 − 1 is 2⁶⁴ − 1. In 2014 Gangnam Style’s view count passed 2³¹ − 1 and YouTube moved to a 64-bit counter. Check with __builtin_mul_overflow, Rust’s checked_* or Java’s Math.*Exact.', sIntovf())
  ]),
  sec('sy-build', '빌드와 링킹', 'Build & linking', '빌드와 링킹', 'Building and linking',
    '소스 코드가 실행 파일이 되기까지의 과정이에요.', 'How source code becomes a running executable.', [
    item('sy-object', '오브젝트 파일과 섹션', 'Object files and sections', '컴파일러는 소스를 오브젝트 파일로 만들어요. 코드는 .text, 초깃값 있는 전역은 .data, 0인 전역은 .bss, 상수는 .rodata에 담기고 심볼 표가 붙어요.', '과정: 전처리(cpp) → 컴파일(cc1) → 어셈블(as) → 링크(ld). 심볼 표에는 정의한 것(T, D, B)과 외부에서 가져올 것(U)이 있어요. .bss는 파일에 크기만 기록해 실행 파일이 작아요. 리눅스 ELF, 윈도우 PE, macOS Mach-O. nm, objdump -d, readelf -S로 살펴봐요.', 'The compiler turns source into an object file: code in .text, initialized globals in .data, zeroed globals in .bss, constants in .rodata, plus a symbol table.', 'Pipeline: preprocess (cpp) → compile (cc1) → assemble (as) → link (ld). The symbol table lists what is defined (T, D, B) and what must come from elsewhere (U). .bss records only a size, keeping files small. Formats: ELF on Linux, PE on Windows, Mach-O on macOS. Inspect with nm, objdump -d and readelf -S.', sObject()),
    item('sy-link', '정적 링킹', 'Static linking', '링커는 여러 오브젝트 파일의 섹션을 합치고, 정의되지 않은 심볼을 다른 파일의 정의와 연결한 뒤 주소를 확정해 빈칸을 채워요(재배치).', '“undefined reference”는 정의가 든 오브젝트나 라이브러리(-lm 등)를 빠뜨린 것, “multiple definition”은 같은 이름이 두 번 정의된 것. 정적 라이브러리(.a)는 .o 묶음이라 필요한 것만 실행 파일에 복사돼요. 실행 파일 하나로 배포가 쉽지만 크고, 라이브러리를 고치면 다시 링크해야 해요(Go는 기본이 정적 링킹).', 'The linker merges the sections of several object files, connects undefined symbols to their definitions elsewhere, fixes the final addresses and patches the blanks (relocation).', '“undefined reference” means an object or library (-lm, …) holding the definition is missing; “multiple definition” means a name is defined twice. A static library (.a) is a bundle of .o files, and only what is needed is copied in. One self-contained binary is easy to ship but larger, and fixing a library means relinking (Go links statically by default).', sLink()),
    item('sy-dynlink', '동적 링킹과 공유 라이브러리', 'Dynamic linking and shared libraries', '공유 라이브러리는 실행할 때 연결돼요. 첫 호출에 동적 링커가 함수 주소를 찾아 GOT에 적어 두고, 이후 호출은 그 주소로 바로 가요.', 'PLT(점프용 작은 코드)와 GOT(주소 표)로 지연 바인딩해요. libc 한 벌을 모든 프로세스가 메모리에서 공유하고, 보안 패치를 다시 링크 없이 적용할 수 있어요. 대신 버전이 안 맞으면 실행이 안 돼요(DLL 지옥). ldd로 의존성 확인, LD_LIBRARY_PATH·rpath로 찾는 위치 지정. 리눅스 .so, 윈도우 .dll, macOS .dylib.', 'Shared libraries are wired in at run time. On the first call the dynamic linker looks the function up and writes its address into the GOT; later calls jump straight there.', 'Lazy binding uses the PLT (small jump stubs) and the GOT (an address table). Every process shares one in-memory copy of libc, and security fixes apply without relinking, at the cost of breakage when versions don’t match (“DLL hell”). ldd lists dependencies; LD_LIBRARY_PATH and rpath control where they are searched. Linux .so, Windows .dll, macOS .dylib.', sDynlink()),
    item('sy-make', '빌드 시스템 (Make)', 'Build systems (Make)', '빌드는 파일 사이의 의존성 그래프예요. 대상이 의존 파일보다 오래됐을 때만 다시 만들어서, 바뀐 부분만 빠르게 빌드해요.', 'Makefile 규칙 = “대상: 의존 파일” + 명령. 소스 하나를 고치면 그 위 경로만, 널리 쓰는 헤더를 고치면 많이 다시 빌드돼요. make -j로 병렬 빌드, -MMD로 헤더 의존성 자동 생성. CMake는 Makefile·Ninja 파일을 생성하고, Bazel은 내용 해시와 원격 캐시로 거대한 저장소를 빌드해요.', 'A build is a dependency graph of files. Rebuilding a target only when it is older than its inputs keeps incremental builds fast.', 'A Makefile rule is “target: prerequisites” plus a command. Editing one source rebuilds only the path above it; editing a widely included header rebuilds a lot. make -j runs jobs in parallel and -MMD generates header dependencies. CMake generates Makefiles or Ninja files, and Bazel uses content hashes and remote caches for huge repositories.', sMake()),
    item('sy-abi', '호출 규약 (ABI)', 'Calling conventions (ABI)', '함수 인자를 어느 레지스터·스택에 넣고 결과를 어디로 돌려줄지 정한 기계어 수준의 약속이에요. 이 약속 덕분에 다른 컴파일러로 만든 코드도 서로 부를 수 있어요.', 'x86-64 System V(리눅스·macOS): 정수 인자 rdi, rsi, rdx, rcx, r8, r9, 나머지는 스택, 반환 rax. 윈도우 x64는 rcx, rdx, r8, r9, ARM64는 x0–x7. call이 돌려줄 주소를 넣고, 함수 머리(prologue)가 rbp 저장·지역 변수 공간 확보, leave; ret로 정리. 스택은 16바이트 정렬, rbx·rbp·r12–r15는 호출된 쪽이 보존해요.', 'A machine-level contract for which registers and stack slots carry arguments and where the result returns. It lets code from different compilers call each other.', 'x86-64 System V (Linux, macOS): integer args in rdi, rsi, rdx, rcx, r8, r9, the rest on the stack, result in rax. Windows x64 uses rcx, rdx, r8, r9; ARM64 uses x0–x7. call pushes the return address, the prologue saves rbp and reserves locals, and leave; ret unwinds. The stack stays 16-byte aligned, and rbx, rbp and r12–r15 are callee-saved.', sAbi())
  ]),
  sec('sy-proc', '프로세스와 파일', 'Processes & files', '프로세스와 파일', 'Processes and files',
    '유닉스가 프로그램을 실행하고 자원을 넘겨주는 방식이에요.', 'How Unix launches programs and hands them resources.', [
    item('sy-fork', 'fork와 exec', 'fork and exec', 'fork()는 프로세스를 복제해 두 번 반환하고(부모는 자식 PID, 자식은 0), exec()는 현재 프로그램을 새 프로그램으로 바꿔요. 셸이 명령을 실행하는 방식이에요.', '메모리는 바로 복사하지 않고 공유하다가 쓰는 페이지만 복사해요(copy-on-write). fork와 exec 사이에 셸이 리다이렉션·파이프를 설정해요. 부모는 wait()/waitpid()로 종료 코드를 받아요. posix_spawn은 둘을 한 번에, 윈도우는 CreateProcess. 파이썬 multiprocessing도 리눅스에선 fork를 써요.', 'fork() clones the process and returns twice (the child’s PID to the parent, 0 to the child); exec() replaces the running program with a new one. That is how a shell runs commands.', 'Memory isn’t copied up front: pages are shared until written (copy-on-write). Between fork and exec the shell sets up redirection and pipes. The parent collects the exit status with wait()/waitpid(). posix_spawn does both steps at once; Windows uses CreateProcess. Python’s multiprocessing forks on Linux too.', sFork()),
    item('sy-zombie', '좀비와 고아 프로세스', 'Zombie and orphan processes', '종료한 자식은 부모가 wait()로 확인할 때까지 종료 코드만 남은 좀비로 남아요. 부모가 먼저 죽으면 PID 1이 고아를 입양해 거둬요.', '좀비는 메모리는 거의 안 쓰지만 PID를 차지해서, 쌓이면 새 프로세스를 못 만들어요. SIGCHLD 핸들러에서 waitpid로 거두거나, 데몬은 이중 fork로 init에 넘겨요. 컨테이너에서는 앱이 PID 1이 되기 쉬워 tini·dumb-init 같은 작은 init을 써요. ps의 상태 Z가 좀비예요.', 'A finished child stays a zombie, holding just its exit status, until the parent calls wait(). If the parent dies first, PID 1 adopts the orphan and reaps it.', 'Zombies use almost no memory but hold a PID, so enough of them stop new processes from starting. Reap them with waitpid in a SIGCHLD handler, or let daemons double-fork to hand children to init. In containers the app often becomes PID 1, so a tiny init such as tini or dumb-init is used. State Z in ps marks a zombie.', sZombie()),
    item('sy-signal', '시그널', 'Signals', '커널이 프로세스에 보내는 비동기 알림이에요. 기본 동작(종료 등)을 따르거나 핸들러를 등록해 직접 처리해요.', 'SIGINT(Ctrl+C), SIGTERM(정중한 종료 요청), SIGKILL(강제 종료, 못 잡음), SIGSEGV(잘못된 메모리 접근), SIGCHLD(자식 상태 변화). 핸들러는 아무 때나 끼어들므로 async-signal-safe 함수만 쓰고 보통 플래그만 바꿔요. docker stop과 쿠버네티스는 SIGTERM 후 유예 시간이 지나면 SIGKILL을 보내니 SIGTERM을 처리해야 깔끔히 종료돼요.', 'Asynchronous notifications from the kernel to a process. It either takes the default action, such as terminating, or runs a handler you registered.', 'SIGINT (Ctrl+C), SIGTERM (polite termination), SIGKILL (forced, uncatchable), SIGSEGV (invalid memory access), SIGCHLD (a child changed state). Handlers interrupt at arbitrary points, so they may call only async-signal-safe functions and usually just set a flag. docker stop and Kubernetes send SIGTERM, then SIGKILL after a grace period, so handle SIGTERM to shut down cleanly.', sSignal()),
    item('sy-fd', '파일 디스크립터', 'File descriptors', '프로세스가 연 파일·소켓·파이프를 가리키는 작은 정수예요. 0, 1, 2는 표준 입력·출력·에러이고, open()은 가장 작은 빈 번호를 돌려줘요.', 'fd 표(프로세스별) → 열린 파일 표(커널, 위치·모드) → inode. dup2(fd, 1)로 stdout을 파일에 연결하는 게 셸의 > 리다이렉션. fork하면 fd 표가 복사돼 같은 열린 파일을 공유해요. 닫지 않으면 “Too many open files”(ulimit -n). 유닉스에선 소켓·장치까지 모두 파일처럼 다뤄요.', 'Small integers naming the files, sockets and pipes a process has open. 0, 1 and 2 are standard input, output and error, and open() returns the lowest free number.', 'Per-process fd table → kernel open file table (offset, mode) → inode. dup2(fd, 1) points stdout at a file, which is how the shell’s > works. fork copies the fd table, so both processes share the same open files. Leaking fds ends in “Too many open files” (ulimit -n). Unix treats sockets and devices as files too.', sFd()),
    item('sy-pipe', '파이프', 'Pipes', '커널 버퍼를 사이에 둔 단방향 바이트 통로예요. 한 프로세스의 출력을 다른 프로세스의 입력으로 바로 이어요.', 'ls | wc -l: 셸이 pipe()로 양 끝 fd를 만들고 두 번 fork해 각자 dup2로 stdout·stdin에 연결해요. 버퍼(리눅스 기본 64 KiB)가 차면 쓰는 쪽이, 비면 읽는 쪽이 멈춰 흐름이 조절돼요. 모든 쓰기 끝이 닫혀야 EOF가 와요. 이름 있는 파이프(mkfifo), 양방향은 socketpair.', 'A one-way byte channel with a kernel buffer in the middle, connecting one process’s output directly to another’s input.', 'For ls | wc -l the shell calls pipe() for two fds, forks twice and uses dup2 to wire stdout and stdin. When the buffer (64 KiB by default on Linux) is full the writer blocks; when empty the reader waits, so the flow paces itself. EOF arrives only once every write end is closed. Named pipes come from mkfifo; for two-way traffic use socketpair.', sPipe()),
    item('sy-mmap', '메모리 매핑 파일 (mmap)', 'Memory-mapped files (mmap)', '파일을 프로세스의 주소 공간에 붙여 포인터로 읽고 써요. 실제 읽기는 처음 건드린 페이지만 페이지 폴트로 일어나요.', '쓰기는 페이지 캐시에 반영되고 나중에 디스크로 써져요(msync로 강제). MAP_SHARED로 여러 프로세스가 같은 페이지를 공유하면 공유 메모리, MAP_PRIVATE는 copy-on-write. 실행 파일·공유 라이브러리 로딩, LMDB·SQLite, 큰 파일 임의 접근에 써요. 다만 I/O 오류가 SIGBUS로 오고 쓰기 시점을 통제하기 어려워 많은 DB는 직접 버퍼를 관리해요.', 'Attach a file to the address space and work on it through pointers. Data is read only when a page is first touched, via a page fault.', 'Writes land in the page cache and reach disk later (force it with msync). With MAP_SHARED several processes share the same pages, giving shared memory; MAP_PRIVATE is copy-on-write. Used to load executables and shared libraries, by LMDB and SQLite, and for random access to big files. I/O errors arrive as SIGBUS and write timing is hard to control, so many databases manage their own buffers instead.', sMmap())
  ]),
  sec('sy-io', 'I/O와 동시성', 'I/O & concurrency', 'I/O와 동시성', 'I/O and concurrency',
    '시스템 콜을 아끼고 여러 코어를 안전하게 쓰는 법이에요.', 'Spending fewer syscalls and using many cores safely.', [
    item('sy-buffer', '버퍼링된 I/O', 'Buffered I/O', '작은 쓰기를 사용자 공간 버퍼에 모았다가 한 번의 시스템 콜로 보내요. 시스템 콜 횟수가 크게 줄어 빨라져요.', 'stdio는 터미널이면 줄 단위, 파일·파이프면 버퍼가 찰 때(보통 4~8 KiB) 비워요. 그래서 ./app | cat은 출력이 늦게 보이고, 비정상 종료하면 버퍼 내용이 사라져요. stderr는 버퍼 없음. fflush·setvbuf로 조절하고, 자바 BufferedWriter, 파이썬 print(flush=True)도 같은 개념이에요.', 'Collect small writes in a user-space buffer and hand them to the kernel in one syscall, cutting the number of syscalls dramatically.', 'stdio flushes per line on a terminal but only when the buffer fills (typically 4–8 KiB) on files and pipes. That is why ./app | cat shows output late and why a crash loses buffered data. stderr is unbuffered. Control it with fflush and setvbuf; Java’s BufferedWriter and Python’s print(flush=True) are the same idea.', sBuffer()),
    item('sy-epoll', 'I/O 멀티플렉싱 (epoll)', 'I/O multiplexing (epoll)', '스레드 하나가 수많은 소켓을 등록해 두고, 데이터가 준비된 소켓만 받아 처리해요. 연결마다 스레드를 두지 않아도 돼요.', 'select·poll은 매번 모든 fd를 훑어 O(n), epoll은 준비된 것만 돌려줘요. 논블로킹 소켓 + 이벤트 루프 구조로 nginx, Node.js(libuv), Redis, Netty가 수만 연결을 처리해요. BSD·macOS는 kqueue, 윈도우는 IOCP, 리눅스 io_uring은 제출·완료 큐로 시스템 콜까지 줄여요.', 'One thread registers many sockets and handles only those with data ready, with no need for a thread per connection.', 'select and poll rescan every fd each time (O(n)); epoll returns just the ready ones. Non-blocking sockets plus an event loop let nginx, Node.js (libuv), Redis and Netty juggle tens of thousands of connections. BSD and macOS use kqueue, Windows IOCP, and Linux’s io_uring goes further with submission and completion queues that cut syscalls.', sEpoll()),
    item('sy-zerocopy', '제로 카피', 'Zero copy', '파일을 그대로 네트워크로 보낼 때 데이터를 사용자 공간으로 올리지 않고 커널 안에서 바로 보내요. CPU 복사와 모드 전환이 줄어요.', 'read() + write()는 복사 4번(CPU 2번)·모드 전환 4번, sendfile()은 복사 2번(모두 DMA)·전환 2번. nginx의 sendfile on, 카프카의 로그 전송, 자바 FileChannel.transferTo, 리눅스 splice. TLS 암호화처럼 데이터를 바꿔야 하면 커널 TLS(kTLS)가 있어야 제로 카피를 유지해요.', 'When a file goes to the network unchanged, send it from inside the kernel without lifting it into user space, avoiding CPU copies and mode switches.', 'read() + write() costs four copies (two by the CPU) and four mode switches; sendfile() needs two copies (both DMA) and two switches. Used by nginx’s “sendfile on”, Kafka’s log shipping, Java’s FileChannel.transferTo and Linux splice. If the data must be transformed, as with TLS, kernel TLS (kTLS) keeps it zero-copy.', sZerocopy()),
    item('sy-atomic', '원자적 연산과 CAS', 'Atomic operations and CAS', 'CAS(compare-and-swap)는 “값이 아직 예상과 같으면 새 값으로 바꾼다”를 끊김 없이 한 번에 해요. 실패하면 다시 읽고 재시도해요.', '락 없이도 안전한 카운터·스택·큐(lock-free)의 기본 부품. 값만 비교하므로 A → B → A 변화를 놓치는 ABA 문제는 버전 태그로 막아요. 하드웨어: x86 lock cmpxchg, ARM LDXR/STXR. 언어: C++ std::atomic, 자바 AtomicInteger·LongAdder, Go sync/atomic. 경쟁이 심하면 재시도가 많아져 락보다 느려질 수 있어요.', 'CAS (compare-and-swap) does “if the value is still what I expect, replace it” as one indivisible step; on failure you reread and retry.', 'It is the building block of lock-free counters, stacks and queues. Because only values are compared, an A → B → A change slips past (the ABA problem), fixed with version tags. Hardware: x86 lock cmpxchg, ARM LDXR/STXR. Languages: C++ std::atomic, Java AtomicInteger and LongAdder, Go sync/atomic. Under heavy contention the retries can make it slower than a lock.', sAtomic()),
    item('sy-memorder', '메모리 순서', 'Memory ordering', '컴파일러와 CPU는 성능을 위해 메모리 접근 순서를 바꿀 수 있어서, 다른 코어에는 쓰기가 다른 순서로 보일 수 있어요. release/acquire로 순서를 약속해요.', '예: data = 42; ready = 1을 다른 스레드가 ready부터 보고 data는 아직 0으로 볼 수 있어요. release 저장 이전의 쓰기는 짝이 되는 acquire 읽기 이후에 반드시 보여요(happens-before). x86은 비교적 강한 TSO, ARM·POWER는 약해요. C/C++ volatile은 동기화가 아니고, 자바 volatile은 동기화예요. 보통은 뮤텍스나 atomic으로 해결해요.', 'Compilers and CPUs may reorder memory accesses for speed, so another core can see writes in a different order. Release/acquire pairs pin the order down.', 'After data = 42; ready = 1 another thread may see ready set while data still reads 0. Writes before a release store are visible after the matching acquire load (happens-before). x86 is fairly strong (TSO); ARM and POWER are weaker. volatile in C/C++ is not synchronization, while Java’s volatile is. In practice, reach for mutexes or atomics.', sMemorder()),
    item('sy-spin', '스핀락과 뮤텍스', 'Spinlocks and mutexes', '스핀락은 CPU를 쓰며 계속 확인하고, 뮤텍스는 잠들었다가 깨어나요. 락을 아주 잠깐 쥘 때는 스핀이, 오래 쥘 때는 잠드는 쪽이 나아요.', '문맥 교환은 수 µs가 들어 그보다 짧은 대기는 스핀이 유리해요. 리눅스 futex는 경쟁이 없으면 사용자 공간 원자 연산 하나로 끝나고 경쟁할 때만 커널로 가요. 적응형 뮤텍스는 잠깐 돌다 잠들어요. 커널은 인터럽트 문맥에서 스핀락을 쓰고, 코어가 하나뿐이면 스핀은 의미가 없어요.', 'A spinlock burns CPU re-checking; a mutex puts the waiter to sleep and wakes it later. Spinning wins for very short holds, sleeping for long ones.', 'A context switch costs microseconds, so shorter waits favor spinning. Linux futexes finish with a single user-space atomic when uncontended and enter the kernel only under contention, and adaptive mutexes spin briefly before sleeping. Kernels spin in interrupt context; on a single core, spinning is pointless.', sSpin())
  ])
]);
window.UX[0].css += `
.sy-b .in{font-weight:800;color:var(--ink)}
.sy-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.sy-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.sy-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.sy-r .in{color:var(--danger);font-weight:800}
.sy-g .in{color:var(--ok);font-weight:800}
.sy-a .in{color:var(--accent);font-weight:800}
.sy-w .in{color:var(--warn);font-weight:800}
.sy-c .in{font-size:.6em;font-weight:700}
.sy-code .in{font-size:.56em;white-space:pre;color:var(--ink);font-weight:600}
.sy-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
})();
