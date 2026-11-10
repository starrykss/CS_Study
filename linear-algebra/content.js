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
const pt = (S, k, x, y, st, sty, r, o = {}) => { dot(S, k, x, y, '', { r: r || .42, s: st ? hid(sty || C.cur) : (sty || C.cur) }); vis(S, k, st, o.off); };
const T = (S, k, x, y, t, cls, st, o = {}) => { const p = { cls: 'cz-t ' + (cls || ''), css: 'z-index:5;' + (o.css || ''), s: st ? hid() : {} }; if (o.w) p.w = o.w; text(S, k, x, y, t, p); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.3' }); };
const L = (S, k, x, y, w, cls, list) => S.label(k, { cls: 'cz-t ' + cls, x, y, w, css: 'z-index:5' }, [[0, '']].concat(list));
const ar = (S, k, a, b, color, st, o = {}) => { const c = cv(color || 'ink-2'); arrow(S, k, a[0], a[1], b[0], b[1], { h: o.h || .16, s: Object.assign(st ? hid() : {}, { background: o.dash ? dashBg(color) : c, 'border-color': c }) }); vis(S, k, st, o.off); if (o.dim) S.set(k, o.dim, { opacity: '.25' }); };
const mar = (S, k, F, a, b, color, st, o) => ar(S, k, [F.X(a[0]), F.Y(a[1])], [F.X(b[0]), F.Y(b[1])], color, st, o);
const mpt = (S, k, F, p, st, sty, r, o) => pt(S, k, F.X(p[0]), F.Y(p[1]), st, sty, r, o);
const mT = (S, k, F, p, dx, dy, t, cls, st, o) => T(S, k, F.X(p[0]) + dx, F.Y(p[1]) + dy, t, cls, st, o);
/* static grid with integer lines and axes */
function grid(S, k, F, st, o = {}) {
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'la-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
  if (F.y0 <= 0 && F.y1 >= 0) hl(S, k + 'x', F.L, F.R, F.Y(0), 'ink-3', st, { w: .1, off: o.off });
  if (F.x0 <= 0 && F.x1 >= 0) vl(S, k + 'y', F.X(0), F.T, F.B, 'ink-3', st, { w: .1, off: o.off });
}
/* matrix [[a,b],[c,d]] (math, y up) as a CSS transform */
const MX = (a, b, c, d) => `matrix(${r3(a)},${r3(-c)},${r3(-b)},${r3(d)},0,0)`;
/* a patch of the plane (centred on the frame origin) that can be transformed; kids are html drawn in plane units */
function patch(S, k, F, N, kids, o = {}) {
  const u = F.u, cx = F.X(0), cy = F.Y(0);
  S.el(k, { x: cx - N * u, y: cy - N * u, w: 2 * N * u, h: 2 * N * u, cls: 'la-pl' + (o.grid ? ' la-pg' : ''), html: kids, css: `transform-origin:50% 50%;background-size:${r3(u)}em ${r3(u)}em;z-index:3`, s: Object.assign(o.st ? hid() : {}, { transform: MX(1, 0, 0, 1) }) });
  vis(S, k, o.st, o.off);
}
/* arrow from the frame origin whose tip moves through [[step,[x,y]],...] (first entry = start) */
function avec(S, k, F, list, color, o = {}) {
  const c = cv(color), [x0, y0] = list[0][1]; let prev = deg(x0, y0);
  arrow(S, k, F.X(0), F.Y(0), F.X(x0), F.Y(y0), { h: o.h || .2, css: 'transform-origin:0 50%;z-index:4', s: Object.assign(o.st ? hid() : {}, { background: c, 'border-color': c, width: r3(Math.max(Math.hypot(x0, y0) * F.u, .05)) + 'em', transform: `rotate(${prev}deg)` }) });
  list.slice(1).forEach(([st, [x, y]]) => { let a = Math.hypot(x, y) < 1e-6 ? prev : deg(x, y); while (a - prev > 180) a -= 360; while (prev - a > 180) a += 360; prev = a;
    S.set(k, st, { width: r3(Math.max(Math.hypot(x, y) * F.u, .05)) + 'em', transform: `rotate(${r3(a)}deg)` }); });
  vis(S, k, o.st, o.off);
}
const mv = (m, v) => [m[0][0] * v[0] + m[0][1] * v[1], m[1][0] * v[0] + m[1][1] * v[1]];
const tf = (S, k, st, m) => S.set(k, st, { transform: MX(m[0][0], m[0][1], m[1][0], m[1][1]) });
const deg = (x, y) => r3(-Math.atan2(y, x) * 180 / Math.PI);
const K = {
  v: (u, x, y, c, w) => `<b class="la-v" style="width:${r3(Math.hypot(x, y) * u)}em;transform:rotate(${deg(x, y)}deg);--c:${cv(c)}${w ? `;height:${w}em;margin-top:-${w / 2}em` : ''}"></b>`,
  sg: (u, x1, y1, x2, y2, c, w = .32) => `<b class="la-sg" style="left:calc(50% + ${r3(x1 * u)}em);top:calc(50% - ${r3(y1 * u)}em);width:${r3(Math.hypot(x2 - x1, y2 - y1) * u)}em;transform:rotate(${deg(x2 - x1, y2 - y1)}deg);height:${w}em;margin-top:-${w / 2}em;--c:${cv(c)}"></b>`,
  sq: (u, c) => `<b class="la-sq" style="left:50%;top:calc(50% - ${r3(u)}em);width:${r3(u)}em;height:${r3(u)}em;--c:${cv(c)}"></b>`,
  dk: (u, r, c) => `<b class="la-dk" style="left:calc(50% - ${r3(r * u)}em);top:calc(50% - ${r3(r * u)}em);width:${r3(2 * r * u)}em;height:${r3(2 * r * u)}em;--c:${cv(c)}"></b>`,
  ci: (u, r, c) => `<b class="la-ci" style="left:calc(50% - ${r3(r * u)}em);top:calc(50% - ${r3(r * u)}em);width:${r3(2 * r * u)}em;height:${r3(2 * r * u)}em;--c:${cv(c)}"></b>`,
  F: (u, c) => K.sg(u, 0, 0, 0, 2, c, .36) + K.sg(u, 0, 2, 1.2, 2, c, .36) + K.sg(u, 0, 1, .8, 1, c, .36)
};
/* bracketed matrix; entries keyed `${k}_${i}${j}`; null entries are skipped */
function mat(S, k, x, y, rows, o = {}) {
  const cw = o.cw || 2.2, rh = o.rh || 1.8, m = rows.length, n = rows[0].length, W = n * cw, H = m * rh, st = o.st, off = o.off, cls = o.cls || 'la-m';
  const bs = () => (st ? hid() : {});
  S.el(k + 'L', { x: x - .1, y, w: .5, h: H, css: 'border:.13em solid var(--ink-2);border-right:0;border-radius:.25em 0 0 .25em;z-index:5', s: bs() }); vis(S, k + 'L', st, off);
  S.el(k + 'R', { x: x + W - .4, y, w: .5, h: H, css: 'border:.13em solid var(--ink-2);border-left:0;border-radius:0 .25em .25em 0;z-index:5', s: bs() }); vis(S, k + 'R', st, off);
  if (o.aug) { S.el(k + 'A', { x: x + o.aug * cw - .05, y: y + .25, w: .1, h: H - .5, css: 'background:var(--ink-3);z-index:5', s: bs() }); vis(S, k + 'A', st, off); }
  const th = cls === 'la-ms' ? .73 : .86;
  rows.forEach((r, i) => r.forEach((v, j) => { if (v === null) return; const key = `${k}_${i}${j}`, c = o.hl && o.hl(i, j);
    S.el(key, { cls: `cz-t cz-tc cz-mono ${cls}${c ? ' la-' + c : ''}`, x: x + j * cw, y: y + i * rh + (rh - th) / 2, w: cw, html: String(v), css: 'z-index:5', s: bs() }); vis(S, key, st, off); }));
  return { W, H, x, y, cw, rh, ex: j => x + j * cw, ey: i => y + i * rh };
}
const g2 = (m, i, j, o = {}) => ({ x: m.ex(j), y: m.ey(i), w: (o.n || 1) * m.cw, h: (o.m || 1) * m.rh });
const hiCell = (S, k, m, i, j, color, pct, st, o = {}) => { const g = g2(m, i, j, o); rect(S, k, g.x, g.y, g.w, g.h, color, pct, st, { off: o.off, r: .3 }); };

/* ================= linear systems ================= */
function sSystem() {
  const S = scene({ id: 'la-system', steps: 4, per: 1.5 });
  const F = pf(5, 15.5, 2.4, -1, 5, -1, 5);
  grid(S, 'g', F);
  thru(S, 'a1', F, [1, -1], { p: [0, 4], st: 1, off: 2, color: 'accent', h: .2 }); thru(S, 'b1', F, [1, 1], { st: 1, off: 2, color: 'warn', h: .2 });
  mpt(S, 'p1', F, [2, 2], 1, C.okf, .5, { off: 2 });
  thru(S, 'a2', F, [1, -1], { p: [0, 4], st: 2, off: 3, color: 'accent', h: .2 }); thru(S, 'b2', F, [1, -1], { p: [0, 2], st: 2, off: 3, color: 'warn', h: .2 });
  thru(S, 'a3', F, [1, -1], { p: [0, 4], st: 3, color: 'warn', h: .55 }); thru(S, 'b3', F, [1, -1], { p: [0, 4], st: 3, color: 'accent', h: .18 });
  L(S, 'e1', 20, 2.4, 11.6, 'cz-mono la-l la-a', [[1, 'x + y = 4'], [2, 'x + y = 4'], [3, '2x + 2y = 8']]);
  L(S, 'e2', 20, 4, 11.6, 'cz-mono la-l la-w', [[1, 'x − y = 0'], [2, 'x + y = 2'], [3, 'x + y = 4']]);
  L(S, 'r', 20, 6.6, 11.6, 'la-l', [[1, ['한 점에서 만남 → 해 1개', 'meet once → one solution']], [2, ['평행 → 해 없음', 'parallel → no solution']], [3, ['겹침 → 해 무수히 많음', 'same line → infinitely many']]]);
  T(S, 'k1', 20, 10.4, ['해가 있을 조건', 'Consistent iff'], 'la-b', 4);
  T(S, 'k2', 20, 12, 'rank A = rank [A | b]', 'cz-mono la-l', 4);
  T(S, 'k3', 20, 14.4, ['해의 개수는 0, 1, ∞ 중 하나', 'always 0, 1 or ∞ solutions'], 'la-s', 4);
  S.cap(1, '두 직선이 한 점에서 만나면 해가 하나', 'Two lines crossing once: one solution')
    .cap(2, '평행하면 만나는 점이 없어 해가 없고', 'Parallel lines never meet: no solution')
    .cap(3, '같은 직선이면 모든 점이 해예요', 'The same line twice: every point is a solution')
    .cap(4, '변수가 늘어나도 해의 개수는 이 세 가지뿐이에요', 'With more unknowns it is still one of these three');
  return S;
}
function sGauss() {
  const S = scene({ id: 'la-gauss', steps: 5, per: 1.4 });
  const o = { cw: 2.4, rh: 2.2, aug: 3 }, X = 2.2, Y = 5;
  rect(S, 'pv', X, Y, 2.4, 2.2, 'accent', 30, 1, { off: 2, r: .4 });
  [1, 2].forEach(i => rect(S, 'h2' + i, X - .3, Y + i * 2.2, 10.2, 2.2, 'warn', 22, 2, { off: 3 }));
  rect(S, 'h3', X - .3, Y + 4.4, 10.2, 2.2, 'warn', 22, 3, { off: 4 });
  [0, 1, 2].forEach(i => rect(S, 'dg' + i, X + i * 2.4, Y + i * 2.2, 2.4, 2.2, 'ok', 26, 4, { r: .4 }));
  ['x', 'y', 'z', 'b'].forEach((l, j) => T(S, 'cl' + j, X + j * 2.4, 3.4, l, 'cz-tc cz-mono la-s', 0, { w: 2.4 }));
  ['R₁', 'R₂', 'R₃'].forEach((l, i) => T(S, 'rl' + i, .3, Y + i * 2.2 + .7, l, 'cz-mono la-s'));
  mat(S, 'm0', X, Y, [[1, 1, 1, 6], [2, 1, '−1', 1], [1, '−1', 2, 5]], Object.assign({ off: 2 }, o));
  mat(S, 'm1', X, Y, [[1, 1, 1, 6], [0, '−1', '−3', '−11'], [0, '−2', 1, '−1']], Object.assign({ st: 2, off: 3 }, o));
  mat(S, 'm2', X, Y, [[1, 1, 1, 6], [0, '−1', '−3', '−11'], [0, 0, 7, 21]], Object.assign({ st: 3 }, o));
  L(S, 'op', 14.6, 3.6, 17, 'cz-mono la-l', [[1, ['피벗으로 아래 성분을 지워요', 'use the pivot to clear below']], [2, 'R₂ − 2R₁,  R₃ − R₁'], [3, 'R₃ − 2R₂'], [4, ['아래부터 대입', 'back substitution']]]);
  T(S, 'b1', 14.6, 7, '7z = 21 → z = 3', 'cz-mono la-l', 4); T(S, 'b2', 14.6, 8.6, '−y − 3z = −11 → y = 2', 'cz-mono la-l', 4); T(S, 'b3', 14.6, 10.2, 'x + y + z = 6 → x = 1', 'cz-mono la-l', 4);
  T(S, 'sol', 14.6, 12.8, '(x, y, z) = (1, 2, 3)', 'cz-mono la-big la-g', 5);
  T(S, 'ops', 14.6, 15.2, ['연산량 ≈ ⅔n³', 'cost ≈ ⅔n³ operations'], 'la-s', 5);
  S.cap(1, '첨가행렬 [A | b]에서 첫 피벗을 잡고', 'Write [A | b] and take the first pivot')
    .cap(2, '행 연산으로 피벗 아래를 0으로 만들어요', 'Row operations zero out everything below it')
    .cap(3, '다음 피벗도 같은 방법으로 → 행사다리꼴', 'Repeat with the next pivot: echelon form')
    .cap(4, '맨 아래 식부터 거꾸로 대입하면', 'Substitute from the bottom row up')
    .cap(5, '해가 나와요 · 행 연산은 해를 바꾸지 않아요', 'and the solution appears; row operations never change it');
  return S;
}
function sRref() {
  const S = scene({ id: 'la-rref', steps: 5, per: 1.4 });
  const X = 2, Y = 5, o = { cw: 2.3, rh: 2.2, aug: 4 };
  [0, 2].forEach(j => rect(S, 'pc' + j, X + j * 2.3, Y - .1, 2.3, 6.8, 'accent', 14, 2));
  [[0, 0], [1, 2]].forEach(([i, j]) => rect(S, 'pv' + i, X + j * 2.3 + .2, Y + i * 2.2 + .15, 1.9, 1.9, 'accent', 38, 2, { r: 1 }));
  [1, 3].forEach(j => rect(S, 'fc' + j, X + j * 2.3, Y - .1, 2.3, 6.8, 'warn', 22, 3));
  ['x₁', 'x₂', 'x₃', 'x₄', 'b'].forEach((l, j) => T(S, 'cl' + j, X + j * 2.3, 3.4, l, 'cz-tc cz-mono la-s', 0, { w: 2.3 }));
  mat(S, 'm', X, Y, [[1, 2, 0, 1, 3], [0, 0, 1, 2, 1], [0, 0, 0, 0, 0]], o);
  T(S, 't0', 15.4, 3.4, ['기약 행사다리꼴 (RREF)', 'reduced echelon form (RREF)'], 'la-b');
  T(S, 't1', 15.4, 5.6, ['피벗 열 → 기본변수 x₁, x₃', 'pivot columns → basic x₁, x₃'], 'la-l la-a', 2);
  T(S, 't2', 15.4, 7.4, ['나머지 → 자유변수 x₂ = s, x₄ = t', 'the rest → free x₂ = s, x₄ = t'], 'la-l la-w', 3);
  T(S, 't3', 15.4, 9.6, 'x₁ = 3 − 2s − t', 'cz-mono la-l', 4); T(S, 't4', 15.4, 11.2, 'x₃ = 1 − 2t', 'cz-mono la-l', 4);
  T(S, 'v', 1, 14.4, 'x = (3, 0, 1, 0) + s(−2, 1, 0, 0) + t(−1, 0, −2, 1)', 'cz-mono cz-tc la-l', 4, { w: 30 });
  T(S, 'v2', 1, 16.4, ['특수해 + 영공간(동차해) = 일반해', 'particular + null space = general solution'], 'cz-tc la-g la-b', 5, { w: 30 });
  S.cap(1, '피벗이 1이고 피벗 열의 나머지가 0인 꼴', 'Every pivot is 1, alone in its column')
    .cap(2, '피벗이 있는 열의 변수는 나머지로 정해지고', 'Pivot-column variables are determined')
    .cap(3, '피벗이 없는 열의 변수는 자유롭게 고를 수 있어요', 'Variables without a pivot are free')
    .cap(4, '자유변수를 매개변수로 두면 해 전체가 나와요', 'Name the free variables to write every solution')
    .cap(5, '일반해 = 특수해 하나 + Ax = 0의 해', 'General solution = one particular solution + solutions of Ax = 0');
  return S;
}
function sMatmul() {
  const S = scene({ id: 'la-matmul', steps: 5, per: 1.35 });
  const P = [[0, 0], [0, 1], [1, 0], [1, 1]];
  P.forEach(([i, j], k) => { const st = k + 1;
    rect(S, 'ra' + k, 1.3, 8 + i * 2, 6.4, 2, 'accent', 22, st, { off: st + 1 });
    rect(S, 'cb' + k, 10 + j * 2, 5.8, 2, 6.4, 'warn', 24, st, { off: st + 1 });
    rect(S, 'cc' + k, 17.4 + j * 2.4, 8, 2.4, 2, 'ok', 30, st, { off: st + 1 }); });
  mat(S, 'A', 1.5, 8, [[1, 2, 0], ['−1', 3, 1]], { cw: 2, rh: 2 });
  mat(S, 'B', 10, 6, [[2, 1], [0, '−1'], [4, 2]], { cw: 2, rh: 2 });
  T(S, 'eq', 15, 8.4, '=', 'cz-tc la-big', 0, { w: 2 });
  mat(S, 'C', 17.4, 8, [[null, null], [null, null]], { cw: 2.4, rh: 2 });
  ['2', '−1', '2', '−2'].forEach((v, k) => { const [i, j] = P[k]; T(S, 'c' + k, 17.4 + j * 2.4, 8 + i * 2 + .57, v, 'cz-tc cz-mono la-m la-g', k + 1, { w: 2.4 }); });
  T(S, 'dA', 1.5, 13, 'A  2×3', 'cz-mono la-s'); T(S, 'dB', 10, 13, 'B  3×2', 'cz-mono la-s'); T(S, 'dC', 17.4, 13, 'AB  2×2', 'cz-mono la-s');
  T(S, 'f0', 23.4, 8.6, 'cᵢⱼ = Σ aᵢₖ bₖⱼ', 'cz-mono la-l', 1);
  L(S, 'fx', 1, 15, 30, 'cz-tc cz-mono la-l', [[1, '1·2 + 2·0 + 0·4 = 2'], [2, '1·1 + 2·(−1) + 0·2 = −1'], [3, '(−1)·2 + 3·0 + 1·4 = 2'], [4, '(−1)·1 + 3·(−1) + 1·2 = −2'], [5, '(m×n)(n×p) → m×p']]);
  T(S, 'z', 1, 17, ['보통 AB ≠ BA · AB의 각 열 = A × (B의 열)', 'usually AB ≠ BA · each column of AB = A × a column of B'], 'cz-tc la-s', 5, { w: 30 });
  S.cap(1, 'A의 1행과 B의 1열을 곱해 더하면 (1, 1) 성분', 'Row 1 of A dotted with column 1 of B gives entry (1, 1)')
    .cap(2, '행 하나와 열 하나를 짝지어 내적하는 걸', 'Pair one row with one column')
    .cap(3, '모든 칸에 대해 반복해요', 'and repeat for every entry')
    .cap(4, '(2×3)(3×2) = 2×2 행렬이 완성돼요', '(2×3)(3×2) gives a 2×2 matrix')
    .cap(5, '가운데 크기가 같아야 곱할 수 있어요', 'The inner sizes must match');
  return S;
}
function sInverse() {
  const S = scene({ id: 'la-inverse', steps: 5, per: 1.4 });
  const X = 2.4, Y = 7.6, o = { cw: 2.6, rh: 2.4, aug: 2 };
  L(S, 'lA', X, 5.6, 5.2, 'cz-tc cz-mono la-b', [[0, 'A'], [4, 'I']]); L(S, 'lI', X + 5.2, 5.6, 5.2, 'cz-tc cz-mono la-b', [[0, 'I'], [4, 'A⁻¹']]);
  rect(S, 'hi', X + 5.2, Y - .1, 5.2, 5, 'ok', 26, 4, { r: .4 });
  mat(S, 's0', X, Y, [[2, 1, 1, 0], [5, 3, 0, 1]], Object.assign({ off: 2 }, o));
  mat(S, 's1', X, Y, [[2, 1, 1, 0], [1, 1, '−2', 1]], Object.assign({ st: 2, off: 3 }, o));
  mat(S, 's2', X, Y, [[1, 1, '−2', 1], [0, '−1', 5, '−2']], Object.assign({ st: 3, off: 4 }, o));
  mat(S, 's3', X, Y, [[1, 0, 3, '−1'], [0, 1, '−5', 2]], Object.assign({ st: 4 }, o));
  T(S, 'h', 15.4, 4, '[A | I] → [I | A⁻¹]', 'cz-mono la-b');
  L(S, 'op', 15.4, 7.8, 16, 'cz-mono la-l', [[1, ['A를 I로 만드는 행 연산을', 'row-reduce A to I']], [2, 'R₂ ← R₂ − 2R₁'], [3, 'R₁ ↔ R₂,  R₂ ← R₂ − 2R₁'], [4, 'R₁ ← R₁ + R₂,  R₂ ← −R₂']]);
  L(S, 'op2', 15.4, 9.4, 16, 'la-s', [[1, ['오른쪽 I에도 똑같이 해요', 'and apply each one to I too']]]);
  T(S, 'f1', 15.4, 12.4, '[a b; c d]⁻¹ = 1/(ad − bc) · [d −b; −c a]', 'cz-mono la-s', 5);
  T(S, 'f2', 15.4, 14, 'det A = 2·3 − 1·5 = 1', 'cz-mono la-l', 5);
  T(S, 'f3', 15.4, 15.6, 'A⁻¹ = [3 −1; −5 2] · AA⁻¹ = I ✓', 'cz-mono la-l la-g', 5);
  S.cap(1, 'A 옆에 단위행렬 I를 붙여 놓고', 'Put the identity next to A')
    .cap(2, 'A가 I가 되도록 행 연산을 하면서', 'Row-reduce the left half to I')
    .cap(3, '오른쪽에도 똑같은 연산을 적용하면', 'applying the same steps on the right')
    .cap(4, '오른쪽에 A⁻¹이 남아요', 'and A⁻¹ appears on the right')
    .cap(5, '2×2는 공식으로 바로 · det A = 0이면 역행렬이 없어요', '2×2 has a formula; det A = 0 means no inverse');
  return S;
}
function sLU() {
  const S = scene({ id: 'la-lu', steps: 5, per: 1.4 });
  const o = { cw: 2.2, rh: 2.2 }, X = 2, Y = 5, LX = 12.6;
  [1, 2].forEach(i => rect(S, 'h2' + i, X - .3, Y + i * 2.2, 7.2, 2.2, 'warn', 22, 2, { off: 3 }));
  rect(S, 'h3', X - .3, Y + 4.4, 7.2, 2.2, 'warn', 22, 3, { off: 4 });
  L(S, 'tu', X, 3, 6.6, 'cz-tc cz-mono la-b', [[0, 'A'], [3, 'U']]); T(S, 'tl', LX, 3, 'L', 'cz-tc cz-mono la-b', 0, { w: 6.6 });
  mat(S, 'u0', X, Y, [[2, 1, 1], [4, 3, 3], [8, 7, 9]], Object.assign({ off: 2 }, o));
  mat(S, 'u1', X, Y, [[2, 1, 1], [0, 1, 1], [0, 3, 5]], Object.assign({ st: 2, off: 3 }, o));
  mat(S, 'u2', X, Y, [[2, 1, 1], [0, 1, 1], [0, 0, 2]], Object.assign({ st: 3 }, o));
  mat(S, 'l', LX, Y, [[1, 0, 0], [null, 1, 0], [null, null, 1]], o);
  [[1, 0, '2', 2], [2, 0, '4', 2], [2, 1, '3', 3]].forEach(([i, j, v, st]) => T(S, `lv${i}${j}`, LX + j * 2.2, Y + i * 2.2 + .67, v, 'cz-tc cz-mono la-m la-w', st, { w: 2.2 }));
  L(S, 'op', 1, 13.4, 19, 'cz-mono la-l', [[1, ['배수를 L에 적어 두며 소거해요', 'eliminate, recording multipliers in L']], [2, 'ℓ₂₁ = 4/2 = 2,  ℓ₃₁ = 8/2 = 4'], [3, 'ℓ₃₂ = 3/1 = 3']]);
  T(S, 'e0', 21.4, 5.2, 'A = LU', 'cz-mono la-big', 4);
  T(S, 'e1', 21.4, 8, 'Ax = b', 'cz-mono la-l', 4); T(S, 'e2', 21.4, 9.6, ['① Ly = b  전진 대입', '① Ly = b  forward'], 'cz-mono la-s', 4); T(S, 'e3', 21.4, 11, ['② Ux = y  후진 대입', '② Ux = y  backward'], 'cz-mono la-s', 4);
  T(S, 'e4', 1, 16.4, ['b만 바뀌는 문제를 여러 번 풀 때 A를 다시 소거하지 않아도 돼요', 'when only b changes, A never needs eliminating again'], 'cz-tc la-s', 5, { w: 30 });
  S.cap(1, '가우스 소거를 하면서', 'Run Gaussian elimination')
    .cap(2, '각 행에 곱한 배수를 L의 같은 자리에 적고', 'writing each multiplier into the matching slot of L')
    .cap(3, '소거가 끝난 위삼각행렬이 U예요', 'The finished upper-triangular matrix is U')
    .cap(4, 'A = LU · 삼각행렬 두 개는 대입만으로 풀려요', 'A = LU: two triangular solves')
    .cap(5, '기본행렬 E를 곱하는 것 = 행 연산 하나', 'Multiplying by an elementary matrix is one row operation');
  return S;
}
function sTranspose() {
  const S = scene({ id: 'la-transpose', steps: 4, per: 1.5 });
  const X = 3, Y = 5, cw = 2.4, rh = 2.2, A = [[1, 2, 3], [4, 5, 6]];
  seg(S, 'dg', [X - .4, Y - .4], [X + 6.2, Y + 6.2], 1, 'ink-3', .12, { dash: 1, off: 3 });
  mat(S, 'bA', X, Y, [[null, null, null], [null, null, null]], { cw, rh, off: 2 });
  mat(S, 'bT', X, Y, [[null, null], [null, null], [null, null]], { cw, rh, st: 2 });
  A.forEach((r, i) => r.forEach((v, j) => { const k = `a${i}${j}`;
    S.el(k, { cls: 'cz-t cz-tc cz-mono la-m' + (i === j ? ' la-a' : ''), x: X + j * cw, y: Y + i * rh + .67, w: cw, html: String(v), css: 'z-index:5' });
    if (i !== j) S.move(k, 2, X + i * cw, Y + j * rh + .67); }));
  L(S, 'tl', X, 3, 7.2, 'cz-mono la-b', [[0, 'A  (2×3)'], [2, 'Aᵀ  (3×2)']]);
  T(S, 'st', 17, 3, ['대칭행렬 S = Sᵀ', 'symmetric S = Sᵀ'], 'la-b', 3);
  const col = (i, j) => i === j ? 'b' : ({ '01': 'a', '10': 'a', '02': 'w', '20': 'w', '12': 'g', '21': 'g' })['' + i + j];
  mat(S, 's', 17, 5, [[2, 1, '−3'], [1, 4, 5], ['−3', 5, 0]], { cw, rh, st: 3, hl: col });
  T(S, 'p1', 1, 14.4, '(AB)ᵀ = BᵀAᵀ', 'cz-tc cz-mono la-l', 4, { w: 30 });
  T(S, 'p2', 1, 16, ['AᵀA와 AAᵀ는 항상 대칭 · x · y = xᵀy', 'AᵀA and AAᵀ are always symmetric · x · y = xᵀy'], 'cz-tc la-s', 4, { w: 30 });
  S.cap(1, '주대각선을 거울로 삼아', 'Use the main diagonal as a mirror')
    .cap(2, '(i, j) 성분을 (j, i) 자리로 옮기면 전치행렬', 'Move entry (i, j) to (j, i): the transpose')
    .cap(3, '뒤집어도 그대로인 행렬이 대칭행렬', 'A matrix unchanged by the flip is symmetric')
    .cap(4, '곱의 전치는 순서가 뒤바뀌어요', 'Transposing a product reverses the order');
  return S;
}

/* ================= determinants ================= */
function sDet2() {
  const S = scene({ id: 'la-det2', steps: 5, per: 1.35 });
  const F = pf(9.5, 10.5, 2, -4, 4, -4, 4);
  grid(S, 'g', F);
  const Ms = [[2, [[3, 1], [1, 2]]], [3, [[1, 2], [2, 1]]], [4, [[1, .5], [2, 1.01]]]];
  patch(S, 'p', F, 1, K.sq(2, 'accent')); Ms.forEach(([st, m]) => tf(S, 'p', st, m));
  avec(S, 'vi', F, [[0, [1, 0]]].concat(Ms.map(([st, m]) => [st, mv(m, [1, 0])])), 'ok', { h: .24 });
  avec(S, 'vj', F, [[0, [0, 1]]].concat(Ms.map(([st, m]) => [st, mv(m, [0, 1])])), 'warn', { h: .24 });
  const mo = { cw: 1.9, rh: 1.6 };
  mat(S, 'm1', 20.4, 1.8, [[1, 0], [0, 1]], Object.assign({ off: 2 }, mo));
  mat(S, 'm2', 20.4, 1.8, [[3, 1], [1, 2]], Object.assign({ st: 2, off: 3 }, mo));
  mat(S, 'm3', 20.4, 1.8, [[1, 2], [2, 1]], Object.assign({ st: 3, off: 4 }, mo));
  mat(S, 'm4', 20.4, 1.8, [[1, '½'], [2, 1]], Object.assign({ st: 4 }, mo));
  L(S, 'dv', 20.4, 6, 11, 'cz-mono la-l', [[1, 'det = 1'], [2, 'det = 3·2 − 1·1 = 5'], [3, 'det = 1·1 − 2·2 = −3'], [4, 'det = 1·1 − ½·2 = 0']]);
  L(S, 'dm', 20.4, 7.8, 11, 'la-b', [[1, ['넓이 1', 'area 1']], [2, ['넓이 5배', 'area × 5']], [3, ['3배 + 뒤집힘', 'area × 3, flipped']], [4, ['직선으로 찌그러짐', 'squashed onto a line']]]);
  T(S, 'f1', 20.4, 11.4, 'det [a b; c d] = ad − bc', 'cz-mono la-s', 5);
  T(S, 'f2', 20.4, 13.2, ['3×3이면 부피 배율', 'in 3D: volume factor'], 'la-s', 5);
  T(S, 'f3', 20.4, 14.6, ['det = 0 ⟺ 역행렬 없음', 'det = 0 ⟺ no inverse'], 'la-s la-r', 5);
  S.cap(1, '넓이 1인 단위 정사각형에 행렬을 적용하면', 'Apply a matrix to the unit square')
    .cap(2, '평행사변형이 되고, 넓이가 det A배가 돼요', 'It becomes a parallelogram with area det A')
    .cap(3, 'det가 음수면 î, ĵ의 순서(방향)가 뒤집혀요', 'A negative det flips the orientation of î and ĵ')
    .cap(4, 'det = 0이면 평면이 직선으로 납작해져요', 'det = 0 flattens the plane onto a line')
    .cap(5, '행렬식 = 넓이·부피가 변하는 비율', 'The determinant is the area or volume scale factor');
  return S;
}
function sCofactor() {
  const S = scene({ id: 'la-cofactor', steps: 5, per: 1.4 });
  const X = 2, Y = 4.6, o = { cw: 2.6, rh: 2.4 };
  const minors = [[[1, 4], [6, 0]], [[0, 4], [5, 0]], [[0, 1], [5, 6]]];
  const terms = ['+1·(1·0 − 4·6) = −24', '−2·(0·0 − 4·5) = +40', '+3·(0·6 − 1·5) = −15'];
  [0, 1, 2].forEach(j => { const st = j + 1;
    rect(S, 'pk' + j, X + j * 2.6, Y, 2.6, 2.4, 'accent', 34, st, { off: st + 1, r: .4 });
    hl(S, 'xr' + j, X - .2, X + 8, Y + 1.2, 'danger', st, { dash: 1, off: st + 1, w: .12 });
    vl(S, 'xc' + j, X + j * 2.6 + 1.3, Y - .2, Y + 7.4, 'danger', st, { dash: 1, off: st + 1, w: .12 });
    mat(S, 'mn' + j, 12, Y + 1.4, minors[j], { cw: 2.2, rh: 2.2, st, off: st + 1 });
    T(S, 't' + j, 18.4, 5 + j * 1.8, terms[j], 'cz-mono la-l', st); });
  T(S, 'mnl', 12, Y - .4, ['소행렬', 'minor'], 'cz-tc la-s', 1, { w: 4.4, off: 4 });
  mat(S, 'A', X, Y, [[1, 2, 3], [0, 1, 4], [5, 6, 0]], o);
  mat(S, 'sg', X + 1.2, 14.4, [['+', '−', '+'], ['−', '+', '−'], ['+', '−', '+']], { cw: 1.4, rh: 1.3, cls: 'la-ms' });
  T(S, 'sgl', X + 6, 15.6, '(−1)ⁱ⁺ʲ', 'cz-mono la-s');
  T(S, 'tot', 18.4, 11.4, 'det A = −24 + 40 − 15 = 1', 'cz-mono la-l la-g', 4);
  T(S, 'f1', 18.4, 14, 'det A = Σⱼ a₁ⱼ C₁ⱼ', 'cz-mono la-l', 5);
  T(S, 'f2', 18.4, 15.6, ['0이 많은 행·열로 전개하면 빨라요', 'expand along the row with most zeros'], 'la-s', 5);
  S.cap(1, '1행 1열 성분 × (그 행과 열을 지운 소행렬식)', 'Entry (1, 1) times the minor left after deleting its row and column')
    .cap(2, '다음 성분은 부호를 바꿔서', 'The next entry takes a minus sign')
    .cap(3, '부호는 체크무늬 (−1)ⁱ⁺ʲ를 따라요', 'Signs follow the checkerboard (−1)ⁱ⁺ʲ')
    .cap(4, '세 항을 더하면 행렬식', 'Add the three terms for the determinant')
    .cap(5, '어느 행·열로 전개해도 같은 값이에요', 'Any row or column gives the same value');
  return S;
}
function sDetProps() {
  const S = scene({ id: 'la-detprops', steps: 5, per: 1.35 });
  const Ms = [[[1, 2], [3, 4]], [[3, 4], [1, 2]], [[3, 6], [3, 4]], [[1, 2], [0, '−2']]];
  const ops = ['A', ['행 교환', 'swap rows'], 'R₁ × 3', 'R₂ − 3R₁'], dets = ['det = −2', 'det = 2', 'det = −6', 'det = −2'];
  const eff = ['', ['부호 반대', 'sign flips'], ['3배', '× 3'], ['그대로', 'unchanged']], ec = ['', 'la-r', 'la-w', 'la-g'];
  Ms.forEach((m, i) => { const x = 1 + i * 7.75, st = i + 1;
    T(S, 'o' + i, x, 2.6, ops[i], 'cz-tc la-b', st, { w: 7.4 });
    mat(S, 'm' + i, x + 1.9, 4.6, m, { cw: 1.8, rh: 1.9, st });
    T(S, 'd' + i, x, 10.2, dets[i], 'cz-tc cz-mono la-l', st, { w: 7.4 });
    if (i) T(S, 'e' + i, x, 11.8, eff[i], 'cz-tc ' + ec[i], st, { w: 7.4 });
    if (i) ar(S, 'a' + i, [x - 1.1, 6.5], [x + .5, 6.5], 'ink-3', st, { h: .12 }); });
  T(S, 'tri', 1 + 3 * 7.75, 13.2, ['삼각: 대각 곱 1·(−2)', 'triangular: 1·(−2)'], 'cz-tc la-xs', 4, { w: 7.4 });
  T(S, 'p1', 1, 15.6, 'det(AB) = det A · det B  ·  det Aᵀ = det A', 'cz-tc cz-mono la-l', 5, { w: 30 });
  T(S, 'p2', 1, 17.2, 'det A⁻¹ = 1 / det A  ·  det(kA) = kⁿ det A', 'cz-tc cz-mono la-l', 5, { w: 30 });
  S.cap(1, 'A = [1 2; 3 4]의 행렬식은 −2', 'det [1 2; 3 4] = −2')
    .cap(2, '두 행을 바꾸면 부호가 바뀌고', 'Swapping two rows flips the sign')
    .cap(3, '한 행을 k배 하면 행렬식도 k배', 'Scaling a row by k scales det by k')
    .cap(4, '다른 행의 배수를 더해도 그대로 · 그래서 소거로 계산해요', 'Adding a multiple of another row changes nothing, so elimination works')
    .cap(5, '곱의 행렬식은 행렬식의 곱 · det(A + B)는 아니에요', 'det of a product is the product of dets; det(A + B) is not');
  return S;
}
function sCramer() {
  const S = scene({ id: 'la-cramer', steps: 5, per: 1.4 });
  T(S, 's1', 2, 1.6, '2x + y = 5', 'cz-mono la-l'); T(S, 's2', 2, 3.1, 'x + 3y = 5', 'cz-mono la-l');
  const o = { cw: 2, rh: 2 };
  rect(S, 'c1', 13, 6.4, 2, 4.2, 'warn', 30, 2, { r: .4 }); rect(S, 'c2', 25, 6.4, 2, 4.2, 'warn', 30, 4, { r: .4 });
  [['A', 3, [[2, 1], [1, 3]], 1], ['A₁', 13, [[5, 1], [5, 3]], 2], ['A₂', 23, [[2, 5], [1, 5]], 4]].forEach(([l, x, m, st], i) => {
    T(S, 'l' + i, x, 4.8, l, 'cz-tc cz-mono la-b', st, { w: 4 }); mat(S, 'm' + i, x, 6.5, m, Object.assign({ st }, o)); });
  T(S, 'd0', 0, 11.6, 'det A = 6 − 1 = 5', 'cz-tc cz-mono la-s', 1, { w: 10 });
  T(S, 'd1', 10, 11.6, 'det A₁ = 15 − 5 = 10', 'cz-tc cz-mono la-s', 2, { w: 10 });
  T(S, 'd2', 20, 11.6, 'det A₂ = 10 − 5 = 5', 'cz-tc cz-mono la-s', 4, { w: 10 });
  T(S, 'x', 10, 13.4, 'x = 10 / 5 = 2', 'cz-tc cz-mono la-b la-g', 3, { w: 10 });
  T(S, 'y', 20, 13.4, 'y = 5 / 5 = 1', 'cz-tc cz-mono la-b la-g', 4, { w: 10 });
  T(S, 'f1', 1, 16, 'xᵢ = det Aᵢ / det A  ·  A⁻¹ = adj A / det A', 'cz-tc cz-mono la-l', 5, { w: 30 });
  T(S, 'f2', 1, 17.6, ['adj A = 여인수 행렬의 전치 · 큰 n에서는 소거법이 빨라요', 'adj A = transposed cofactor matrix · elimination is faster for large n'], 'cz-tc la-s', 5, { w: 30 });
  S.cap(1, '계수행렬 A의 행렬식을 구하고', 'Find det A of the coefficient matrix')
    .cap(2, 'A의 1열을 b로 바꾼 A₁의 행렬식을 구하면', 'Replace column 1 with b to get A₁')
    .cap(3, 'x = det A₁ / det A', 'x = det A₁ / det A')
    .cap(4, '2열을 바꾸면 y도 같은 방식으로', 'Replace column 2 the same way for y')
    .cap(5, '같은 생각으로 역행렬 공식도 나와요', 'The same idea gives a formula for A⁻¹');
  return S;
}

/* ================= vector spaces ================= */
function sLincomb() {
  const S = scene({ id: 'la-lincomb', steps: 5, per: 1.35 });
  const F = pf(9.5, 15, 1.6, -5, 5, -2, 7), u = [2, 1], w = [-1, 1];
  for (let k = -4; k <= 4; k++) { mline(S, 'lu' + k, F, [k * w[0] - 9 * u[0], k * w[1] - 9 * u[1]], [k * w[0] + 9 * u[0], k * w[1] + 9 * u[1]], { st: 4, color: 'color-mix(in srgb,var(--accent) 45%,transparent)', h: .1 }); mline(S, 'lw' + k, F, [k * u[0] - 9 * w[0], k * u[1] - 9 * w[1]], [k * u[0] + 9 * w[0], k * u[1] + 9 * w[1]], { st: 4, color: 'color-mix(in srgb,var(--warn) 45%,transparent)', h: .1 }); }
  grid(S, 'g', F);
  mar(S, 'u', F, [0, 0], u, 'accent', 0, { h: .2 }); mar(S, 'w', F, [0, 0], w, 'warn', 0, { h: .2 });
  mT(S, 'tu', F, u, .3, -.2, 'u', 'cz-mono la-b la-a'); mT(S, 'tw', F, w, -1.2, -.9, 'w', 'cz-mono la-b la-w');
  mar(S, 'w2', F, u, [0, 3], 'warn', 2, { h: .2, dash: 1 }); mT(S, 't2', F, [1, 2], .4, -.4, '2w', 'cz-mono la-b la-w', 2);
  mar(S, 'v', F, [0, 0], [0, 3], 'ok', 3, { h: .26 }); mT(S, 'tv', F, [0, 3], .4, -.6, 'v', 'cz-mono la-b la-g', 3);
  T(S, 'e1', 20.4, 2.4, 'u = (2, 1)', 'cz-mono la-l la-a'); T(S, 'e2', 20.4, 4, 'w = (−1, 1)', 'cz-mono la-l la-w');
  T(S, 'e3', 20.4, 6.6, 'v = 1·u + 2·w', 'cz-mono la-l', 3); T(S, 'e4', 20.4, 8.2, '  = (0, 3)', 'cz-mono la-l la-g', 3);
  T(S, 'e5', 20.4, 11, ['모든 c₁u + c₂w', 'every c₁u + c₂w'], 'la-l', 4); T(S, 'e6', 20.4, 12.6, ['→ 평면의 모든 점', '→ every point of the plane'], 'la-s', 4);
  T(S, 'e7', 20.4, 15, 'span{u, w} = R²', 'cz-mono la-big', 5);
  S.cap(1, '벡터 두 개 u, w가 있을 때', 'Start with two vectors u and w')
    .cap(2, '스칼라배 2w를 u 끝에 이어 붙이면', 'Attach 2w to the tip of u')
    .cap(3, '새 벡터 v = u + 2w가 돼요 (일차결합)', 'That reaches v = u + 2w, a linear combination')
    .cap(4, '계수를 바꾸면 비스듬한 격자의 모든 점에 닿아요', 'Varying the coefficients reaches every point of the slanted grid')
    .cap(5, 'Ax도 A의 열들의 일차결합이에요', 'Ax is a linear combination of A’s columns');
  return S;
}
function sSpan() {
  const S = scene({ id: 'la-span', steps: 4, per: 1.5 });
  const F = pf(9.5, 10.5, 1.5, -6, 6, -6, 6);
  rect(S, 'pl', F.L, F.T, F.R - F.L, F.B - F.T, 'accent', 14, 3, { r: 0 });
  grid(S, 'g', F);
  thru(S, 'l1', F, [2, 1], { st: 1, color: 'accent', h: .16, dash: 1 });
  mar(S, 'v1', F, [0, 0], [2, 1], 'accent', 1, { h: .22 }); mT(S, 't1', F, [2, 1], .3, -.9, 'v₁', 'cz-mono la-b la-a', 1);
  mar(S, 'v2', F, [0, 0], [-3, -1.5], 'warn', 2, { h: .22 }); mT(S, 't2', F, [-3, -1.5], -1, .2, 'v₂', 'cz-mono la-b la-w', 2);
  mar(S, 'v3', F, [0, 0], [1, 2.5], 'ok', 3, { h: .22 }); mT(S, 't3', F, [1, 2.5], .3, -.6, 'v₃', 'cz-mono la-b la-g', 3);
  L(S, 's', 20.4, 2.6, 11, 'cz-mono la-l', [[1, 'span{v₁}'], [2, 'span{v₁, v₂}'], [3, 'span{v₁, v₃}']]);
  L(S, 'sr', 20.4, 4.4, 11, 'la-b', [[1, ['= 원점을 지나는 직선', '= a line through 0']], [2, ['= 여전히 같은 직선', '= still the same line']], [3, ['= 평면 전체 R²', '= the whole plane R²']]]);
  T(S, 'n2', 20.4, 6.6, ['v₂ = −1.5v₁ (평행)', 'v₂ = −1.5v₁ (parallel)'], 'la-s', 2, { off: 3 });
  T(S, 'f1', 20.4, 9.6, ['R³에서 독립인 벡터', 'In R³, independent'], 'la-s', 4); T(S, 'f2', 20.4, 11, ['1개 → 직선, 2개 → 평면', '1 → line, 2 → plane'], 'la-s', 4);
  T(S, 'f3', 20.4, 12.4, ['3개 → 공간 전체', '3 → all of space'], 'la-s', 4);
  T(S, 'f4', 20.4, 14.6, ['dim span = 독립인 벡터 수', 'dim span = # independent'], 'la-l', 4);
  S.cap(1, '벡터 하나의 모든 스칼라배는 직선을 이뤄요', 'All multiples of one vector form a line')
    .cap(2, '같은 직선 위의 벡터를 더해도 넓어지지 않아요', 'A parallel vector adds nothing new')
    .cap(3, '방향이 다른 벡터가 오면 평면 전체를 생성해요', 'A new direction spans the whole plane')
    .cap(4, 'span은 늘 원점을 지나는 부분공간이에요', 'A span is always a subspace through the origin');
  return S;
}
function sIndep() {
  const S = scene({ id: 'la-indep', steps: 5, per: 1.35 });
  const F = pf(5, 16, 2.2, -1, 6, -1, 6);
  grid(S, 'g', F);
  mar(S, 'v1', F, [0, 0], [1, 0], 'accent', 0, { h: .24 }); mT(S, 't1', F, [1, 0], -.4, .4, 'v₁', 'cz-mono la-b la-a');
  mar(S, 'v2', F, [0, 0], [1, 2], 'warn', 0, { h: .24 }); mT(S, 't2', F, [1, 2], -1.4, -.4, 'v₂', 'cz-mono la-b la-w');
  mar(S, 'v3', F, [0, 0], [3, 4], 'danger', 2, { h: .24 }); mT(S, 't3', F, [3, 4], .3, -.6, 'v₃', 'cz-mono la-b la-r', 2);
  mar(S, 'w', F, [1, 0], [3, 4], 'warn', 3, { h: .2, dash: 1 }); mT(S, 'tw', F, [2.2, 2], .4, 0, '2v₂', 'cz-mono la-b la-w', 3);
  T(S, 'e1', 20.4, 2.2, 'v₁ = (1, 0)', 'cz-mono la-l la-a'); T(S, 'e1b', 20.4, 3.7, 'v₂ = (1, 2)', 'cz-mono la-l la-w');
  T(S, 'e2', 20.4, 5.4, 'det [v₁ v₂] = 2 ≠ 0', 'cz-mono la-s', 1); T(S, 'e3', 20.4, 6.7, ['→ 독립', '→ independent'], 'la-b la-g', 1);
  T(S, 'e4', 20.4, 8.6, 'v₃ = (3, 4)', 'cz-mono la-l la-r', 2);
  T(S, 'e5', 20.4, 10.2, 'v₃ = v₁ + 2v₂', 'cz-mono la-l', 3);
  T(S, 'e6', 20.4, 12, 'v₁ + 2v₂ − v₃ = 0', 'cz-mono la-l', 4); T(S, 'e7', 20.4, 13.6, ['→ {v₁, v₂, v₃} 종속', '→ {v₁, v₂, v₃} dependent'], 'la-b la-r', 4);
  T(S, 'e8', 20.4, 15.6, ['Rⁿ에서 n개보다 많으면', 'more than n vectors in Rⁿ'], 'la-s', 5); T(S, 'e9', 20.4, 17, ['항상 종속', 'are always dependent'], 'la-s', 5);
  S.cap(1, '서로의 배수가 아닌 두 벡터는 독립이에요', 'Two vectors that aren’t multiples are independent')
    .cap(2, '세 번째 벡터 v₃를 넣으면', 'Add a third vector v₃')
    .cap(3, 'v₁과 2v₂를 이어서 v₃에 닿아요', 'v₁ followed by 2v₂ lands exactly on v₃')
    .cap(4, '0이 아닌 계수로 0을 만들 수 있으니 종속', 'A nontrivial combination gives 0, so they are dependent')
    .cap(5, '판정: c₁v₁ + … + cₖvₖ = 0의 해가 0뿐인지 확인', 'Test: does c₁v₁ + … + cₖvₖ = 0 force every c = 0?');
  return S;
}
function sSubspace() {
  const S = scene({ id: 'la-subspace', steps: 5, per: 1.35 });
  const F = pf(9.5, 10.5, 1.5, -6, 6, -6, 6);
  grid(S, 'g', F);
  thru(S, 'W', F, [2, 1], { color: 'accent', h: .2 });
  mT(S, 'tW', F, [-5.6, -2.8], 0, .4, 'W', 'cz-mono la-b la-a');
  mar(S, 'a', F, [0, 0], [2, 1], 'ok', 1, { h: .24 }); mT(S, 'ta', F, [2, 1], .1, .3, 'a', 'cz-mono la-b la-g', 1);
  mar(S, 'b', F, [0, 0], [-4, -2], 'warn', 1, { h: .24, off: 2 }); mT(S, 'tb', F, [-4, -2], -.4, .4, 'b', 'cz-mono la-b la-w', 1, { off: 2 });
  mar(S, 'b2', F, [2, 1], [-2, -1], 'warn', 2, { h: .2, dash: 1, off: 3 }); mpt(S, 'ab', F, [-2, -1], 2, C.okf, .45, { off: 3 }); mT(S, 'tab', F, [-2, -1], -1.6, .5, 'a + b', 'cz-mono la-b la-g', 2, { off: 3 });
  mar(S, 'ka', F, [0, 0], [5, 2.5], 'ok', 3, { h: .14, off: 4 }); mT(S, 'tka', F, [5, 2.5], -1.6, -1.4, '2.5a', 'cz-mono la-b la-g', 3, { off: 4 });
  thru(S, 'L2', F, [2, 1], { p: [0, 2], st: 4, color: 'danger', h: .2 });
  mpt(S, 'p', F, [-2, 1], 4, C.badf, .4); mpt(S, 'q', F, [2, 3], 4, C.badf, .4); mpt(S, 'pq', F, [0, 4], 4, { background: 'var(--ui)', 'border-color': 'var(--danger)' }, .45);
  mT(S, 'tpq', F, [0, 4], .5, -.5, 'p + q', 'cz-mono la-b la-r', 4);
  T(S, 'e1', 20.4, 2.4, ['W: 원점을 지나는 직선', 'W: a line through 0'], 'la-l la-a');
  T(S, 'e2', 20.4, 4.4, 'a + b ∈ W ✓', 'cz-mono la-l la-g', 2); T(S, 'e3', 20.4, 6, '2.5a ∈ W ✓', 'cz-mono la-l la-g', 3);
  T(S, 'e4', 20.4, 8.4, ['원점을 안 지나는 직선', 'a line missing 0'], 'la-l la-r', 4); T(S, 'e5', 20.4, 10, ['p + q가 밖으로 ✗', 'p + q falls off ✗'], 'la-s la-r', 4);
  T(S, 'c0', 20.4, 12.6, ['부분공간 조건', 'subspace test'], 'la-b', 5);
  T(S, 'c1', 20.4, 14, '0 ∈ W', 'cz-mono la-l', 5); T(S, 'c2', 20.4, 15.5, 'u, v ∈ W → u + v ∈ W', 'cz-mono la-s', 5); T(S, 'c3', 20.4, 16.9, 'v ∈ W → cv ∈ W', 'cz-mono la-s', 5);
  S.cap(1, '원점을 지나는 직선 W 위의 두 벡터', 'Two vectors on a line W through the origin')
    .cap(2, '더해도 W 안에 있고', 'Their sum stays in W')
    .cap(3, '스칼라배를 해도 W 안에 있어요', 'and so does any multiple')
    .cap(4, '원점을 안 지나는 직선은 더하면 밖으로 나가요', 'A line missing the origin isn’t closed under addition')
    .cap(5, '0 포함, 덧셈·스칼라배에 닫혀 있으면 부분공간', 'Contains 0 and closed under both operations: a subspace');
  return S;
}
function sBasis() {
  const S = scene({ id: 'la-basis', steps: 5, per: 1.35 });
  const F = pf(6.8, 15.8, 1.5, -1, 7, -1, 7), b1 = [2, 1], b2 = [1, 2];
  grid(S, 'g', F);
  for (let k = 0; k <= 2; k++) { seg(S, 'p' + k, [F.X(k * b1[0]), F.Y(k * b1[1])], [F.X(k * b1[0] + 2.6 * b2[0]), F.Y(k * b1[1] + 2.6 * b2[1])], 2, 'color-mix(in srgb,var(--warn) 60%,transparent)', .12);
    seg(S, 'q' + k, [F.X(k * b2[0]), F.Y(k * b2[1])], [F.X(k * b2[0] + 2.6 * b1[0]), F.Y(k * b2[1] + 2.6 * b1[1])], 2, 'color-mix(in srgb,var(--ok) 60%,transparent)', .12); }
  mar(S, 'v', F, [0, 0], [4, 5], 'accent', 0, { h: .24 }); mT(S, 'tv', F, [4, 5], .3, -.7, 'v', 'cz-mono la-b la-a');
  mar(S, 'b1', F, [0, 0], b1, 'ok', 2, { h: .26 }); mT(S, 't1', F, b1, .2, .1, 'b₁', 'cz-mono la-b la-g', 2);
  mar(S, 'b2', F, [0, 0], b2, 'warn', 2, { h: .26 }); mT(S, 't2', F, b2, -1.3, -.5, 'b₂', 'cz-mono la-b la-w', 2);
  mar(S, 'w', F, b1, [4, 5], 'warn', 3, { h: .22, dash: 1 }); mT(S, 'tw', F, [3, 3], .4, 0, '2b₂', 'cz-mono la-b la-w', 3);
  T(S, 'e1', 19.4, 2.4, 'v = (4, 5) = 4e₁ + 5e₂', 'cz-mono la-l');
  T(S, 'e2', 19.4, 4.4, 'B = {(2, 1), (1, 2)}', 'cz-mono la-l', 2);
  T(S, 'e3', 19.4, 6.4, 'v = 1·b₁ + 2·b₂', 'cz-mono la-l', 3); T(S, 'e4', 19.4, 8, '[v]<sub>B</sub> = (1, 2)', 'cz-mono la-big la-g', 3);
  T(S, 'e5', 19.4, 10.6, 'v = P<sub>B</sub> [v]<sub>B</sub>', 'cz-mono la-l', 4); T(S, 'e6', 19.4, 12.2, 'P<sub>B</sub> = [b₁ b₂] = [2 1; 1 2]', 'cz-mono la-s', 4);
  T(S, 'e7', 19.4, 14.4, ['기저 = 독립 + 생성', 'basis = independent + spanning'], 'la-s', 5); T(S, 'e8', 19.4, 15.8, ['차원 = 기저 벡터의 개수', 'dimension = # basis vectors'], 'la-s', 5);
  S.cap(1, '표준기저로 보면 v의 좌표는 (4, 5)', 'In the standard basis v has coordinates (4, 5)')
    .cap(2, '다른 기저 b₁, b₂는 비스듬한 격자를 만들어요', 'Another basis b₁, b₂ makes a slanted grid')
    .cap(3, '그 격자로 세면 v = 1·b₁ + 2·b₂', 'Counted on that grid, v = 1·b₁ + 2·b₂')
    .cap(4, '같은 벡터, 다른 좌표 · 좌표변환 행렬은 [b₁ b₂]', 'Same vector, new coordinates; the change matrix is [b₁ b₂]')
    .cap(5, '어떤 기저를 골라도 벡터 개수(차원)는 같아요', 'Every basis has the same number of vectors: the dimension');
  return S;
}
function sNullcol() {
  const S = scene({ id: 'la-nullcol', steps: 5, per: 1.35 });
  const F = pf(9.5, 10.5, 1.4, -6, 6, -6, 6);
  grid(S, 'g', F);
  patch(S, 'p', F, 1, '', { grid: 1 }); tf(S, 'p', 2, [[1, 2], [2, 4.02]]);
  avec(S, 'v1', F, [[0, [1, 0]], [2, [1, 2]]], 'ok', { h: .24 }); avec(S, 'v2', F, [[0, [0, 1]], [2, [2, 4]]], 'warn', { h: .24 }); avec(S, 'vn', F, [[0, [-2, 1]], [2, [0, 0]]], 'danger', { h: .24 });
  mT(S, 'tn', F, [0, 0], -2.6, .3, '→ 0', 'cz-mono la-b la-r', 2, { off: 3 });
  thru(S, 'cl', F, [1, 2], { st: 3, color: 'accent', h: .16, dash: 1 }); thru(S, 'nl', F, [-2, 1], { st: 3, color: 'danger', h: .16, dash: 1 });
  mat(S, 'A', 22.6, 1.6, [[1, 2], [2, 4]], { cw: 1.9, rh: 1.6 }); T(S, 'Al', 20.4, 2.6, 'A =', 'cz-mono la-l');
  T(S, 'e1', 20.4, 6, ['평면 전체가 직선 하나로', 'the plane collapses to a line'], 'la-l', 2);
  T(S, 'e2', 20.4, 8.2, 'Col A = span{(1, 2)}', 'cz-mono la-l la-a', 3); T(S, 'e3', 20.4, 9.8, 'Nul A = span{(−2, 1)}', 'cz-mono la-l la-r', 3);
  T(S, 'e4', 20.4, 12, ['Ax = b의 해는', 'Ax = b is solvable'], 'la-s', 4); T(S, 'e5', 20.4, 13.4, ['b ∈ Col A일 때만', 'only if b ∈ Col A'], 'la-s', 4);
  T(S, 'e6', 20.4, 15.6, 'rank 1 + nullity 1 = 2', 'cz-mono la-l la-g', 5);
  S.cap(1, '빨간 벡터 (−2, 1)을 포함해 평면에 A를 적용하면', 'Apply A to the plane, red vector (−2, 1) included')
    .cap(2, '모든 점이 한 직선 위로 모이고 빨간 벡터는 0이 돼요', 'Everything lands on one line and the red vector goes to 0')
    .cap(3, '도달하는 곳이 열공간, 0으로 가는 것이 영공간', 'Where vectors land is Col A; what goes to 0 is Nul A')
    .cap(4, '열공간 밖의 b에는 Ax = b의 해가 없어요', 'For b outside Col A, Ax = b has no solution')
    .cap(5, '잃어버린 차원(영공간) + 남은 차원(열공간) = n', 'Dimensions lost plus dimensions kept equal n');
  return S;
}
function sRank() {
  const S = scene({ id: 'la-rank', steps: 5, per: 1.35 });
  const X = 1.6, Y = 5, cw = 2.4, rh = 2.2;
  [0, 1, 3].forEach(j => rect(S, 'pc' + j, X + j * cw, Y - .1, cw, 6.8, 'accent', 16, 2));
  [[0, 0], [1, 1], [2, 3]].forEach(([i, j]) => rect(S, 'pv' + i, X + j * cw + .25, Y + i * rh + .15, 1.9, 1.9, 'accent', 40, 2, { r: 1 }));
  [2, 4].forEach(j => rect(S, 'fc' + j, X + j * cw, Y - .1, cw, 6.8, 'warn', 24, 3));
  ['c₁', 'c₂', 'c₃', 'c₄', 'c₅'].forEach((l, j) => T(S, 'cl' + j, X + j * cw, 3.4, l, 'cz-tc cz-mono la-s', 0, { w: cw }));
  mat(S, 'm', X, Y, [[1, 0, 2, 0, 1], [0, 1, '−1', 0, 3], [0, 0, 0, 1, 2]], { cw, rh });
  T(S, 't0', 16.4, 3.2, ['RREF (3×5)', 'RREF (3×5)'], 'la-b');
  T(S, 't1', 16.4, 5.4, 'rank A = 3', 'cz-mono la-l la-a', 2); T(S, 't2', 16.4, 7, ['피벗 열 3개 = Col A의 기저', '3 pivot columns: a basis of Col A'], 'la-s', 2);
  T(S, 't3', 16.4, 9, 'nullity A = 2', 'cz-mono la-l la-w', 3); T(S, 't4', 16.4, 10.6, ['자유변수 2개 = dim Nul A', '2 free variables = dim Nul A'], 'la-s', 3);
  T(S, 't5', 16.4, 13, '3 + 2 = 5 = n', 'cz-mono la-big la-g', 4);
  T(S, 't6', 16.4, 15.4, 'rank A = rank Aᵀ', 'cz-mono la-l', 5); T(S, 't7', 16.4, 17, ['n×n: rank = n ⟺ 가역', 'n×n: rank n ⟺ invertible'], 'la-s', 5);
  S.cap(1, '행렬을 기약 행사다리꼴로 만든 뒤', 'Reduce the matrix to echelon form')
    .cap(2, '피벗 개수가 계수(rank)', 'The number of pivots is the rank')
    .cap(3, '피벗 없는 열의 개수가 영공간의 차원', 'Columns without pivots give the nullity')
    .cap(4, 'rank + nullity = 열의 개수 (차원 정리)', 'rank + nullity = number of columns')
    .cap(5, '행 계수와 열 계수는 언제나 같아요', 'Row rank always equals column rank');
  return S;
}
function sFour() {
  const S = scene({ id: 'la-four', steps: 5, per: 1.35 });
  T(S, 'Rn', 1, 1.4, 'Rⁿ', 'cz-mono la-big', 1); T(S, 'Rm', 20, 1.4, 'Rᵐ', 'cz-mono la-big', 2);
  rect(S, 'row', 1, 3.4, 11, 5.2, 'accent', 22, 1, { cls: 'la-bx', html: ['행공간 C(Aᵀ)<br>dim r', 'row space C(Aᵀ)<br>dim r'], r: .6 });
  rect(S, 'nul', 1, 11.2, 11, 5.2, 'warn', 24, 1, { cls: 'la-bx', html: ['영공간 N(A)<br>dim n − r', 'null space N(A)<br>dim n − r'], r: .6 });
  rect(S, 'col', 20, 3.4, 11, 5.2, 'ok', 24, 2, { cls: 'la-bx', html: ['열공간 C(A)<br>dim r', 'column space C(A)<br>dim r'], r: .6 });
  rect(S, 'lnl', 20, 11.2, 11, 5.2, 'danger', 16, 2, { cls: 'la-bx', html: ['좌영공간 N(Aᵀ)<br>dim m − r', 'left null space N(Aᵀ)<br>dim m − r'], r: .6 });
  T(S, 'p1', 1, 9.2, '⟂', 'cz-tc la-big', 1, { w: 11 }); T(S, 'p2', 20, 9.2, '⟂', 'cz-tc la-big', 2, { w: 11 });
  ar(S, 'aA', [12.3, 6], [19.7, 6], 'ink-2', 3, { h: .2 }); T(S, 'tA', 12.3, 4.4, 'Axᵣ', 'cz-tc cz-mono la-l', 3, { w: 7.4 });
  pt(S, 'z', 25.5, 9.9, 4, C.badf, .5); T(S, 'zl', 26.3, 9.3, '0', 'cz-mono la-b', 4);
  ar(S, 'aN', [12.3, 13.8], [25, 10.3], 'danger', 4, { h: .16 }); T(S, 'tN', 13, 13.6, 'Axₙ = 0', 'cz-mono la-l la-r', 4);
  T(S, 'f1', 1, 17.6, 'x = xᵣ + xₙ  →  Ax = Axᵣ', 'cz-tc cz-mono la-l', 5, { w: 30 });
  T(S, 'f2', 1, 19.1, ['행공간 ⟂ 영공간 · 열공간 ⟂ 좌영공간', 'row ⟂ null · column ⟂ left null'], 'cz-tc la-s', 5, { w: 30 });
  S.cap(1, 'Rⁿ 안에는 행공간과 영공간이 서로 수직으로', 'In Rⁿ the row space and null space are perpendicular')
    .cap(2, 'Rᵐ 안에는 열공간과 좌영공간이 서로 수직으로 있어요', 'In Rᵐ the column space and left null space are too')
    .cap(3, 'A는 행공간을 열공간으로 일대일로 보내고', 'A carries the row space one-to-one onto the column space')
    .cap(4, '영공간은 모두 0으로 보내요', 'and sends the null space to 0')
    .cap(5, '차원 r, n − r, r, m − r · 사영과 최소제곱의 큰 그림', 'Dimensions r, n − r, r, m − r: the big picture');
  return S;
}

/* ================= linear transformations ================= */
function sLintrans() {
  const S = scene({ id: 'la-lintrans', steps: 5, per: 1.35 });
  const F = pf(9.5, 10.5, 1.5, -6, 6, -6, 6);
  grid(S, 'g', F);
  patch(S, 'p', F, 2, '', { grid: 1 }); tf(S, 'p', 2, [[2, 1], [1, 1]]);
  avec(S, 'vv', F, [[0, [1, 2]], [2, [4, 3]]], 'accent', { h: .24 }); avec(S, 'vi', F, [[0, [1, 0]], [2, [2, 1]]], 'ok', { h: .24 }); avec(S, 'vj', F, [[0, [0, 1]], [2, [1, 1]]], 'warn', { h: .24 });
  mpt(S, 'tg', F, [4, 3], 4, { background: 'var(--ui)', 'border-color': 'var(--accent)' }, .5);
  mat(S, 'A', 22.6, 1.6, [[2, 1], [1, 1]], { cw: 1.9, rh: 1.6, st: 2, hl: (i, j) => j ? 'w' : 'g' }); T(S, 'Al', 20.4, 2.6, 'A =', 'cz-mono la-l', 2);
  T(S, 'e1', 20.4, 6, 'v = 1·î + 2·ĵ', 'cz-mono la-l la-a', 1);
  T(S, 'e2', 20.4, 8, ['A의 열 = 옮겨진 î, ĵ', 'columns = images of î, ĵ'], 'la-l', 3);
  T(S, 'e3', 20.4, 9.6, 'T(î) = (2, 1), T(ĵ) = (1, 1)', 'cz-mono la-s', 3);
  T(S, 'e4', 20.4, 11.6, 'T(v) = 1·(2, 1) + 2·(1, 1)', 'cz-mono la-s', 4); T(S, 'e5', 20.4, 13, '     = (4, 3)', 'cz-mono la-l la-a', 4);
  T(S, 'e6', 20.4, 15.4, 'T(u + v) = T(u) + T(v)', 'cz-mono la-s', 5); T(S, 'e7', 20.4, 16.8, 'T(cv) = cT(v)', 'cz-mono la-s', 5);
  S.cap(1, 'v는 î 하나와 ĵ 둘을 더한 벡터예요', 'v is one î plus two ĵ')
    .cap(2, '행렬 A를 적용하면 격자 전체가 움직여요', 'Apply A and the whole grid moves')
    .cap(3, '격자는 평행·등간격을 유지하고 î, ĵ는 A의 열로 가요', 'The grid stays parallel and even; î, ĵ land on A’s columns')
    .cap(4, '그래서 v도 "옮겨진 î 하나 + 옮겨진 ĵ 둘"', 'So v goes to one new î plus two new ĵ')
    .cap(5, '선형변환 = 덧셈과 스칼라배를 보존하는 변환', 'Linear means it preserves addition and scaling');
  return S;
}
function sGeom() {
  const S = scene({ id: 'la-geom', steps: 5, per: 1.35 });
  const Ms = [[[0, -1], [1, 0]], [[-1, 0], [0, 1]], [[1, 1], [0, 1]], [[1, 0], [0, .07]]];
  const ttl = [['회전 90°', 'rotate 90°'], ['반사 (y축)', 'reflect (y-axis)'], ['전단', 'shear'], ['투영 (x축)', 'project (x-axis)']];
  const disp = [[[0, '−1'], [1, 0]], [['−1', 0], [0, 1]], [[1, 1], [0, 1]], [[1, 0], [0, 0]]];
  Ms.forEach((m, i) => { const cx = 4.4 + i * 7.75, F = pf(cx, 8.2, 1.2, -3, 3, -3, 3), st = i + 1;
    grid(S, 'g' + i, F); patch(S, 'p' + i, F, 1, K.F(1.2, 'accent') + K.v(1.2, 1, 0, 'ok', .16) + K.v(1.2, 0, 1, 'warn', .16));
    tf(S, 'p' + i, st, m);
    T(S, 't' + i, cx - 3.7, 2.2, ttl[i], 'cz-tc la-b', 0, { w: 7.4 });
    mat(S, 'm' + i, cx - 1.6, 12.8, disp[i], { cw: 1.6, rh: 1.5, cls: 'la-ms', st }); });
  T(S, 'f1', 1, 17, 'R(θ) = [cos θ  −sin θ; sin θ  cos θ]', 'cz-tc cz-mono la-l', 5, { w: 30 });
  T(S, 'f2', 1, 18.6, ['회전 det = 1 · 반사 det = −1 · 투영 det = 0 (역행렬 없음)', 'rotation det 1 · reflection det −1 · projection det 0 (no inverse)'], 'cz-tc la-s', 5, { w: 30 });
  S.cap(1, '회전: î는 ĵ 자리로, ĵ는 −î 자리로', 'Rotation: î goes to ĵ, ĵ goes to −î')
    .cap(2, '반사: 거울에 비친 것처럼 방향이 뒤집혀요', 'Reflection: mirrored, orientation flips')
    .cap(3, '전단: 위로 갈수록 옆으로 밀려요', 'Shear: points slide sideways by their height')
    .cap(4, '투영: 그림자처럼 한 축으로 눌러요', 'Projection: flattened onto an axis like a shadow')
    .cap(5, '행렬의 두 열만 보면 변환을 알 수 있어요', 'The two columns tell you the whole transformation');
  return S;
}
function sCompose() {
  const S = scene({ id: 'la-compose', steps: 5, per: 1.35 });
  const R = [[0, -1], [1, 0]], Sh = [[1, 1], [0, 1]];
  [[8, [[1, R], [2, [[1, -1], [1, 0]]]], ['① 회전 → ② 전단', '① rotate → ② shear'], 'SR', [[1, '−1'], [1, 0]], 2], [24, [[3, Sh], [4, [[0, -1], [1, 1]]]], ['① 전단 → ② 회전', '① shear → ② rotate'], 'RS', [[0, '−1'], [1, 1]], 4]].forEach(([cx, steps, ttl, nm, disp, mst], i) => {
    const F = pf(cx, 8.2, 1.25, -3, 3, -3, 3);
    grid(S, 'g' + i, F); patch(S, 'p' + i, F, 1, K.F(1.25, 'accent') + K.v(1.25, 1, 0, 'ok', .16) + K.v(1.25, 0, 1, 'warn', .16));
    steps.forEach(([st, m]) => tf(S, 'p' + i, st, m));
    T(S, 't' + i, cx - 7, 2.2, ttl, 'cz-tc la-b', 0, { w: 14 });
    T(S, 'n' + i, cx - 4.6, 14.4, nm + ' =', 'cz-mono la-l', mst); mat(S, 'm' + i, cx - 1.4, 13.4, disp, { cw: 1.8, rh: 1.6, st: mst }); });
  T(S, 'f1', 1, 17.2, 'SR ≠ RS  ·  (AB)⁻¹ = B⁻¹A⁻¹', 'cz-tc cz-mono la-l', 5, { w: 30 });
  T(S, 'f2', 1, 18.8, ['오른쪽 행렬부터 먼저 적용돼요', 'the rightmost matrix acts first'], 'cz-tc la-s', 5, { w: 30 });
  S.cap(1, '왼쪽: 먼저 90° 회전하고', 'Left: rotate 90° first')
    .cap(2, '그다음 전단 → 행렬은 SR', 'then shear: the matrix is SR')
    .cap(3, '오른쪽: 먼저 전단하고', 'Right: shear first')
    .cap(4, '그다음 회전 → RS, 결과가 달라요', 'then rotate: RS, a different result')
    .cap(5, '변환의 합성 = 행렬 곱, 순서가 중요해요', 'Composition is multiplication, and order matters');
  return S;
}
function sKerIm() {
  const S = scene({ id: 'la-kerim', steps: 5, per: 1.35 });
  S.el('V', { x: 1.4, y: 2.6, w: 11, h: 12.6, css: 'border-radius:50%;border:.14em solid var(--ink-3)', s: { background: tint('line', 30) } });
  S.el('W', { x: 19.6, y: 2.6, w: 11, h: 12.6, css: 'border-radius:50%;border:.14em solid var(--ink-3)', s: { background: tint('line', 30) } });
  T(S, 'Vl', 1.4, 1, 'V', 'cz-tc cz-mono la-big', 0, { w: 11 }); T(S, 'Wl', 19.6, 1, 'W', 'cz-tc cz-mono la-big', 0, { w: 11 });
  ar(S, 'T', [13, 2.2], [19, 2.2], 'ink-2', 0, { h: .16 }); T(S, 'Tl', 13, .6, 'T', 'cz-tc cz-mono la-b', 0, { w: 6 });
  rect(S, 'im', 21.4, 5, 7.4, 8.4, 'accent', 34, 2, { r: 4 }); T(S, 'iml', 21.4, 5.4, 'Im T', 'cz-tc cz-mono la-b la-a', 2, { w: 7.4 });
  rect(S, 'ker', 3, 9.6, 7.6, 4.4, 'danger', 26, 3, { r: 3 }); T(S, 'kl', 3, 12.6, 'ker T', 'cz-tc cz-mono la-b la-r', 3, { w: 7.6 });
  pt(S, 'z', 25.1, 11.2, 0, C.badf, .42); T(S, 'zl', 25.7, 11.1, '0', 'cz-mono la-b');
  [[[4.6, 4.8], [23, 7.2]], [[9.4, 5.6], [27, 7.6]], [[6.8, 7.6], [24.6, 9.2]]].forEach(([a, b], i) => { pt(S, 'a' + i, a[0], a[1], 2, C.cur, .32); pt(S, 'b' + i, b[0], b[1], 2, C.cur, .32); ar(S, 'm' + i, [a[0] + .4, a[1]], [b[0] - .4, b[1]], 'accent', 2, { h: .1 }); });
  [[4.6, 11.2], [6.8, 11.6], [9, 11]].forEach((a, i) => { pt(S, 'k' + i, a[0], a[1], 3, C.badf, .32); ar(S, 'n' + i, [a[0] + .4, a[1]], [24.6, 11.2], 'danger', 3, { h: .1 }); });
  T(S, 'f1', 1, 16.8, 'dim V = dim ker T + dim Im T', 'cz-tc cz-mono la-l', 4, { w: 30 });
  T(S, 'f2', 1, 18.4, ['단사 ⟺ ker T = {0} · 전사 ⟺ Im T = W · 둘 다 → 동형', 'one-to-one ⟺ ker T = {0} · onto ⟺ Im T = W · both → isomorphism'], 'cz-tc la-s', 5, { w: 30 });
  S.cap(1, '선형변환 T가 V의 벡터를 W로 보낼 때', 'A linear map T sends vectors of V into W')
    .cap(2, '실제로 도달하는 곳 전체가 상 Im T', 'Everything actually reached is the image')
    .cap(3, '0으로 가는 벡터 전체가 핵 ker T', 'Everything sent to 0 is the kernel')
    .cap(4, '핵의 차원 + 상의 차원 = V의 차원', 'dim kernel + dim image = dim V')
    .cap(5, '핵이 {0}뿐이면 서로 다른 벡터가 겹치지 않아요', 'A trivial kernel means no two vectors collide');
  return S;
}

/* ================= eigen ================= */
function sEigen() {
  const S = scene({ id: 'la-eigen', steps: 5, per: 1.35 });
  const F = pf(9.5, 10.5, 1.3, -7, 7, -7, 7);
  grid(S, 'g', F);
  const A = [[2, 1], [1, 2]];
  patch(S, 'p', F, 2, '', { grid: 1 }); tf(S, 'p', 2, A);
  [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 45, 135, 225, 315].forEach(a => { const t = a * Math.PI / 180, v = [1.5 * Math.cos(t), 1.5 * Math.sin(t)], c = a % 180 === 45 ? 'ok' : a % 180 === 135 ? 'warn' : 'ink-3';
    avec(S, 'v' + a, F, [[0, v], [2, mv(A, v)]], c, { h: c === 'ink-3' ? .14 : .24 }); });
  thru(S, 'e1', F, [1, 1], { st: 3, color: 'ok', h: .14, dash: 1 }); thru(S, 'e2', F, [1, -1], { st: 3, color: 'warn', h: .14, dash: 1 });
  mat(S, 'A', 22.6, 1.6, [[2, 1], [1, 2]], { cw: 1.9, rh: 1.6 }); T(S, 'Al', 20.4, 2.6, 'A =', 'cz-mono la-l');
  T(S, 't1', 20.4, 6.2, ['대부분은 방향이 바뀌지만', 'most vectors turn'], 'la-l', 2);
  T(S, 't2', 20.4, 8.4, 'λ₁ = 3 · v₁ = (1, 1)', 'cz-mono la-l la-g', 3); T(S, 't3', 20.4, 10, 'λ₂ = 1 · v₂ = (1, −1)', 'cz-mono la-l la-w', 3);
  T(S, 't4', 20.4, 12.8, 'Av = λv', 'cz-mono la-big', 4);
  T(S, 't5', 20.4, 15.4, 'det(A − λI) = 0', 'cz-mono la-l', 5); T(S, 't6', 20.4, 17, ['로 λ를 구해요', 'gives the eigenvalues'], 'la-s', 5);
  S.cap(1, '원점에서 뻗은 여러 벡터에 A를 적용하면', 'Apply A to vectors pointing every way')
    .cap(2, '대부분은 원래 직선에서 벗어나요', 'Most leave their original line')
    .cap(3, '초록 방향은 3배, 주황 방향은 그대로 · 직선을 지켜요', 'Green ones triple, orange ones stay: both keep their line')
    .cap(4, '이런 벡터가 고유벡터, 배율이 고윳값', 'These are eigenvectors; the factors are eigenvalues')
    .cap(5, '고유벡터 방향에서 A는 그냥 곱셈이에요', 'Along an eigenvector, A is just multiplication');
  return S;
}
function sCharpoly() {
  const S = scene({ id: 'la-charpoly', steps: 5, per: 1.4 });
  T(S, 'Al', 1.4, 2.6, 'A =', 'cz-mono la-l'); mat(S, 'A', 3.6, 1.6, [[2, 1], [1, 2]], { cw: 1.9, rh: 1.6 });
  T(S, 'l1', 1.4, 6, 'det(A − λI) = det [2−λ  1; 1  2−λ]', 'cz-mono la-l', 1);
  T(S, 'l2', 1.4, 7.8, '= (2 − λ)² − 1 = λ² − 4λ + 3', 'cz-mono la-l', 2);
  T(S, 'l3', 1.4, 9.6, '= (λ − 1)(λ − 3) → λ = 1, 3', 'cz-mono la-l la-b', 3);
  T(S, 'l4', 1.4, 12, 'λ = 3: [−1 1; 1 −1]v = 0 → v = (1, 1)', 'cz-mono la-s', 4);
  T(S, 'l5', 1.4, 13.4, 'λ = 1: [1 1; 1 1]v = 0 → v = (1, −1)', 'cz-mono la-s', 4);
  T(S, 'l6', 1.4, 15.8, 'λ₁ + λ₂ = tr A = 4', 'cz-mono la-l la-g', 5); T(S, 'l7', 1.4, 17.4, 'λ₁ · λ₂ = det A = 3', 'cz-mono la-l la-g', 5);
  const F = fr(-.5, 4.5, -1.5, 3.5, 18.4, 31, 3, 16.4);
  edge(S, 'gx', F.L, F.Y(0), F.R, F.Y(0), { s: { background: 'var(--ink-3)' } }); edge(S, 'gy', F.X(0), F.B, F.X(0), F.T, { s: { background: 'var(--ink-3)' } });
  T(S, 'gxl', F.R - .8, F.Y(0) + .2, 'λ', 'cz-mono'); T(S, 'gyl', F.X(0) + .3, F.T - .4, 'p(λ)', 'cz-mono');
  mplot(S, 'c', F, t => [t, t * t - 4 * t + 3], -.5, 4.5, { st: 2, n: 40, h: .2 });
  mpt(S, 'r1', F, [1, 0], 3, C.okf, .45); mpt(S, 'r3', F, [3, 0], 3, C.okf, .45);
  mT(S, 'tr1', F, [1, 0], -.9, .5, 'λ = 1', 'cz-mono la-s la-g', 3); mT(S, 'tr3', F, [3, 0], -.9, .5, 'λ = 3', 'cz-mono la-s la-g', 3);
  S.cap(1, 'Av = λv ⟺ (A − λI)v = 0에 0 아닌 해가 있다는 뜻이라', 'Av = λv means (A − λI)v = 0 has a nonzero solution')
    .cap(2, 'det(A − λI) = 0이어야 해요 · 특성다항식', 'so det(A − λI) must vanish: the characteristic polynomial')
    .cap(3, '근이 고윳값이에요', 'Its roots are the eigenvalues')
    .cap(4, '각 λ마다 (A − λI)v = 0을 풀면 고유벡터', 'Solve (A − λI)v = 0 for each λ to get eigenvectors')
    .cap(5, '검산: 고윳값의 합은 대각합, 곱은 행렬식', 'Check: they sum to the trace and multiply to det');
  return S;
}
function sDiag() {
  const S = scene({ id: 'la-diag', steps: 5, per: 1.35 });
  const F = pf(9.5, 10.5, 1.3, -7, 7, -7, 7);
  grid(S, 'g', F);
  const Ms = [[1, [[.5, .5], [-.5, .5]]], [2, [[1.5, 1.5], [-.5, .5]]], [3, [[2, 1], [1, 2]]]];
  patch(S, 'p', F, 2, K.dk(1.3, 1, 'accent'), { grid: 1 }); Ms.forEach(([st, m]) => tf(S, 'p', st, m));
  avec(S, 'v1', F, [[0, [1, 1]]].concat(Ms.map(([st, m]) => [st, mv(m, [1, 1])])), 'ok', { h: .26 });
  avec(S, 'v2', F, [[0, [-1, 1]]].concat(Ms.map(([st, m]) => [st, mv(m, [-1, 1])])), 'warn', { h: .26 });
  L(S, 'st', 20.4, 2.4, 11, 'cz-mono la-big', [[1, 'P⁻¹'], [2, 'D P⁻¹'], [3, 'P D P⁻¹']]);
  L(S, 'sd', 20.4, 4.6, 11, 'la-l', [[1, ['고유벡터 → 좌표축', 'eigenvectors → axes']], [2, ['축마다 λ배: 3배, 1배', 'scale axes by λ = 3, 1']], [3, ['원래 좌표로 → A', 'back to original: A']]]);
  T(S, 'e1', 20.4, 8, 'A = PDP⁻¹', 'cz-mono la-big', 4);
  T(S, 'e2', 20.4, 9.8, 'P = [1 −1; 1 1]', 'cz-mono la-s', 4); T(S, 'e2b', 20.4, 11, 'D = diag(3, 1)', 'cz-mono la-s', 4);
  T(S, 'e3', 20.4, 12.6, 'Aⁿ = PDⁿP⁻¹', 'cz-mono la-l la-g', 4); T(S, 'e4', 20.4, 14, 'A¹⁰ = P diag(3¹⁰, 1) P⁻¹', 'cz-mono la-s', 4);
  T(S, 'e5', 20.4, 16, ['독립 고유벡터 n개 ⟺ 대각화', 'n indep. eigenvectors ⟺ diagonalizable'], 'la-xs', 5);
  T(S, 'e6', 20.4, 17.4, ['닮은 행렬 B = P⁻¹AP', 'similar matrices B = P⁻¹AP'], 'la-s', 5);
  S.cap(1, 'P⁻¹은 고유벡터를 좌표축으로 돌려놓고', 'P⁻¹ turns the eigenvectors into the axes')
    .cap(2, 'D는 각 축 방향으로 고윳값만큼 늘이고', 'D stretches each axis by its eigenvalue')
    .cap(3, 'P로 되돌리면 정확히 A와 같아요', 'and P turns back: exactly A')
    .cap(4, '거듭제곱이 대각 성분의 거듭제곱으로 쉬워져요', 'Powers become powers of the diagonal')
    .cap(5, '고유벡터가 모자라면 대각화가 안 돼요', 'Too few eigenvectors and it cannot be diagonalized');
  return S;
}
function sMarkov() {
  const S = scene({ id: 'la-markov', steps: 6, per: 1.15 });
  node(S, 'nA', 5.8, 5, 'A', { r: 1.5, s: C.soft }); node(S, 'nB', 15.8, 5, 'B', { r: 1.5, s: C.cmp });
  ar(S, 'ab', [7.6, 4.1], [14, 4.1], 'ink-2', 0, { h: .14 }); T(S, 'tab', 9.3, 2.4, '0.1', 'cz-tc cz-mono la-s', 0, { w: 3 });
  ar(S, 'ba', [14, 5.9], [7.6, 5.9], 'ink-2', 0, { h: .14 }); T(S, 'tba', 9.3, 6.4, '0.2', 'cz-tc cz-mono la-s', 0, { w: 3 });
  T(S, 'sa', .6, 4.4, '0.9 ↺', 'cz-mono la-s'); T(S, 'sb', 17.6, 4.4, '↻ 0.8', 'cz-mono la-s');
  hl(S, 'base', 3, 18.6, 18.4, 'ink-3', 0, { w: .1 });
  const sh = [0, .2, .34, .5546, .6478, .6667];
  [['bA', 4, 'accent', a => a], ['bB', 14, 'warn', a => 1 - a]].forEach(([k, x, c, f]) => {
    S.el(k, { x, y: 10.4, w: 3.6, h: 8, css: `transform-origin:50% 100%;border-radius:.3em .3em 0 0;background:${tint(c, 55)}`, s: { transform: `scaleY(${f(sh[0])})` } });
    sh.forEach((a, i) => { if (i) S.set(k, i + 1, { transform: `scaleY(${r3(f(a))})` }); }); });
  L(S, 'vA', 3, 18.7, 5.6, 'cz-tc cz-mono la-s la-a', [[0, 'A 0.00']].slice(1).concat(sh.map((a, i) => [i + 1, 'A ' + (i === 5 ? '2/3' : a.toFixed(2))])));
  L(S, 'vB', 13, 18.7, 5.6, 'cz-tc cz-mono la-s la-w', sh.map((a, i) => [i + 1, 'B ' + (i === 5 ? '1/3' : (1 - a).toFixed(2))]));
  T(S, 'Ml', 20.6, 2.8, 'M =', 'cz-mono la-l'); mat(S, 'M', 22.8, 1.8, [[0.9, 0.2], [0.1, 0.8]], { cw: 2.3, rh: 1.6 });
  L(S, 'k', 20.6, 6.4, 11, 'cz-mono la-l', [[1, 'x₀ = (0, 1)'], [2, 'x₁ = Mx₀ = (0.2, 0.8)'], [3, 'x₂ = (0.34, 0.66)'], [4, 'x₅ ≈ (0.55, 0.45)'], [5, 'x₁₀ ≈ (0.65, 0.35)'], [6, 'x∞ = (2/3, 1/3)']]);
  T(S, 'q1', 20.6, 9.2, 'Mq = q  (λ = 1)', 'cz-mono la-l la-g', 6);
  T(S, 'q2', 20.6, 10.8, ['정상상태 = λ = 1의 고유벡터', 'steady state: eigenvector of λ = 1'], 'la-s', 6);
  T(S, 'q3', 20.6, 12.4, ['λ₂ = 0.7 → 오차가 0.7ᵏ로 줄어요', 'λ₂ = 0.7: error shrinks like 0.7ᵏ'], 'la-s', 6);
  S.cap(1, '처음엔 모두 B 상태에 있어요', 'Everyone starts in state B')
    .cap(2, '전이행렬 M을 한 번 곱하면 한 단계 뒤', 'One multiplication by M is one time step')
    .cap(3, '계속 곱할수록', 'Keep multiplying')
    .cap(4, '비율이 일정한 값으로 다가가요', 'and the split settles down')
    .cap(5, '어디서 시작해도 같은 곳으로', 'to the same place from any start')
    .cap(6, '그 극한이 고윳값 1의 고유벡터예요', 'The limit is the eigenvector for λ = 1');
  return S;
}
function sSymmetric() {
  const S = scene({ id: 'la-symmetric', steps: 5, per: 1.35 });
  const F = pf(9.5, 10.5, 1.5, -6, 6, -6, 6), q = Math.SQRT1_2;
  grid(S, 'g', F);
  patch(S, 'p', F, 1, K.dk(1.5, 1, 'accent')); tf(S, 'p', 2, [[3, 1], [1, 3]]);
  avec(S, 'v1', F, [[0, [q, q]], [2, [4 * q, 4 * q]]], 'ok', { h: .26 }); avec(S, 'v2', F, [[0, [q, -q]], [2, [2 * q, -2 * q]]], 'warn', { h: .26 });
  thru(S, 'a1', F, [1, 1], { st: 3, color: 'ok', h: .12, dash: 1 }); thru(S, 'a2', F, [1, -1], { st: 3, color: 'warn', h: .12, dash: 1 });
  mT(S, 'l1', F, [2.83, 2.83], .4, -.2, 'λ = 4', 'cz-mono la-b la-g', 3); mT(S, 'l2', F, [1.41, -1.41], .5, .1, 'λ = 2', 'cz-mono la-b la-w', 3);
  mat(S, 'A', 22.6, 1.6, [[3, 1], [1, 3]], { cw: 1.9, rh: 1.6 }); T(S, 'Al', 20.4, 2.6, 'A =', 'cz-mono la-l');
  T(S, 'e1', 20.4, 6, ['원 → 타원', 'circle → ellipse'], 'la-l', 2);
  T(S, 'e2', 20.4, 7.8, ['두 축이 서로 수직', 'the axes are perpendicular'], 'la-l la-g', 3);
  T(S, 'e3', 20.4, 10.2, 'A = QΛQᵀ', 'cz-mono la-big', 4);
  T(S, 'e4', 20.4, 12, 'Q = (1/√2)[1 1; 1 −1]', 'cz-mono la-s', 4); T(S, 'e5', 20.4, 13.4, 'Λ = diag(4, 2)', 'cz-mono la-s', 4);
  T(S, 'e6', 20.4, 15.6, ['고윳값은 모두 실수', 'eigenvalues are real'], 'la-s', 5); T(S, 'e7', 20.4, 17, ['고유벡터끼리 직교', 'eigenvectors orthogonal'], 'la-s', 5);
  S.cap(1, '단위원과 대칭행렬 A의 고유벡터', 'The unit circle and the eigenvectors of a symmetric A')
    .cap(2, 'A를 적용하면 원이 타원이 되는데', 'A turns the circle into an ellipse')
    .cap(3, '타원의 축이 바로 서로 수직인 고유벡터 방향', 'whose axes are the perpendicular eigenvectors')
    .cap(4, '직교행렬 Q로 대각화돼요 (Q⁻¹ = Qᵀ)', 'It diagonalizes with an orthogonal Q (Q⁻¹ = Qᵀ)')
    .cap(5, '실대칭행렬이면 항상 이렇게 돼요 (스펙트럼 정리)', 'Every real symmetric matrix does this: the spectral theorem');
  return S;
}
function sComplex() {
  const S = scene({ id: 'la-complex', steps: 5, per: 1.35 });
  const F = pf(9.5, 10.5, 1.8, -5, 5, -5, 5), r = Math.sqrt(.9), th = Math.atan2(.3, .9);
  grid(S, 'g', F);
  const P = k => [4.5 * r ** k * Math.cos(k * th), 4.5 * r ** k * Math.sin(k * th)], stOf = k => k <= 4 ? 1 : k <= 10 ? 2 : k <= 18 ? 3 : 4;
  for (let k = 0; k <= 30; k++) { if (k) seg(S, 's' + k, [F.X(P(k - 1)[0]), F.Y(P(k - 1)[1])], [F.X(P(k)[0]), F.Y(P(k)[1])], stOf(k), 'color-mix(in srgb,var(--accent) 55%,transparent)', .1); mpt(S, 'p' + k, F, P(k), stOf(k), k ? C.cur : C.okf, k ? .26 : .4); }
  mat(S, 'A', 22.6, 1.6, [[0.9, '−0.3'], [0.3, 0.9]], { cw: 2.3, rh: 1.6 }); T(S, 'Al', 20.4, 2.6, 'A =', 'cz-mono la-l');
  T(S, 'e1', 20.4, 6.2, 'λ = 0.9 ± 0.3i', 'cz-mono la-l la-b', 1);
  T(S, 'e2', 20.4, 8.2, '|λ| = √0.9 ≈ 0.95', 'cz-mono la-l', 2); T(S, 'e3', 20.4, 9.8, ['→ 매번 5%씩 줄고', '→ shrinks 5% a step'], 'la-s', 2);
  T(S, 'e4', 20.4, 11.8, 'θ = arctan(1/3) ≈ 18.4°', 'cz-mono la-l', 3); T(S, 'e5', 20.4, 13.4, ['→ 18.4°씩 회전', '→ turns 18.4° a step'], 'la-s', 3);
  T(S, 'e6', 20.4, 15.6, 'A = r · R(θ)', 'cz-mono la-l la-a', 5); T(S, 'e7', 20.4, 17.2, ['|λ| > 1이면 바깥으로', '|λ| > 1 spirals out'], 'la-s', 5);
  S.cap(1, '실수 고유벡터가 없는 행렬을 반복해서 곱하면', 'Apply a matrix with no real eigenvector again and again')
    .cap(2, '점이 일정한 비율로 줄면서', 'The point shrinks by a fixed ratio')
    .cap(3, '일정한 각도로 돌아요', 'and turns by a fixed angle')
    .cap(4, '나선을 그리며 원점으로 감겨 들어가요', 'spiralling into the origin')
    .cap(5, '복소 고윳값 a ± bi = 회전 × 확대·축소', 'Complex eigenvalues a ± bi mean rotation times scaling');
  return S;
}

/* ================= orthogonality ================= */
function sDot() {
  const S = scene({ id: 'la-dot', steps: 5, per: 1.35 });
  const F = pf(4, 15.6, 2.4, -1, 5, -1, 5);
  grid(S, 'g', F);
  mpplot(S, 'arc', F, t => [1.1 * Math.cos(t), 1.1 * Math.sin(t)], 0, Math.atan2(4, 3), { st: 2, color: 'warn', h: .12, n: 12 });
  mT(S, 'th', F, [1.45 * Math.cos(.46), 1.45 * Math.sin(.46)], -.2, -.5, 'θ', 'cz-mono la-b la-w', 2);
  seg(S, 'pr', [F.X(0), F.Y(-.35)], [F.X(3), F.Y(-.35)], 3, 'ok', .34);
  mline(S, 'dr', F, [3, 4], [3, 0], { st: 3, color: 'ink-3', h: .12, dash: 1 });
  mT(S, 'prl', F, [0, -.35], .2, .2, '|a| cos θ = 3', 'cz-mono la-s la-g', 3);
  mar(S, 'a', F, [0, 0], [3, 4], 'accent', 0, { h: .24 }); mT(S, 'ta', F, [3, 4], .3, -.6, 'a', 'cz-mono la-b la-a');
  mar(S, 'b', F, [0, 0], [4, 0], 'warn', 0, { h: .24 }); mT(S, 'tb', F, [4, 0], -.2, -1.4, 'b', 'cz-mono la-b la-w');
  T(S, 'e1', 19.4, 2.4, 'a = (3, 4), |a| = 5', 'cz-mono la-l la-a'); T(S, 'e2', 19.4, 4, 'b = (4, 0), |b| = 4', 'cz-mono la-l la-w');
  T(S, 'e3', 19.4, 6.4, 'cos θ = 0.6 (θ ≈ 53.1°)', 'cz-mono la-s', 2);
  T(S, 'e4', 19.4, 8.2, ['b 위로 드리운 a의 그림자 = 3', 'a’s shadow on b = 3'], 'la-s la-g', 3);
  T(S, 'e5', 19.4, 10.4, 'a · b = 3·4 + 4·0 = 12', 'cz-mono la-l', 4); T(S, 'e6', 19.4, 12, '= |a||b| cos θ = 5·4·0.6', 'cz-mono la-s', 4);
  T(S, 'e7', 19.4, 14.4, 'a · b = 0 ⟺ a ⟂ b', 'cz-mono la-l la-b', 5); T(S, 'e8', 19.4, 16, '|a · b| ≤ |a||b|', 'cz-mono la-s', 5);
  S.cap(1, '두 벡터 a, b의 길이를 알고 있을 때', 'Two vectors with known lengths')
    .cap(2, '사이각 θ가 있어요', 'make an angle θ')
    .cap(3, 'a를 b 방향으로 내리면 그림자 길이가 |a| cos θ', 'Dropping a onto b leaves a shadow |a| cos θ')
    .cap(4, '내적 = 성분끼리 곱해 더하기 = 그림자 × |b|', 'The dot product: componentwise sum = shadow × |b|')
    .cap(5, '내적이 0이면 수직 · 코시-슈바르츠 부등식', 'Zero dot product means perpendicular; Cauchy–Schwarz bounds it');
  return S;
}
function mpplot(S, pfx, F, P, t0, t1, o) { return pplot(S, pfx, t => { const [x, y] = P(t); return [F.X(x), F.Y(y)]; }, t0, t1, o); }
function sProj() {
  const S = scene({ id: 'la-proj', steps: 5, per: 1.35 });
  const F = pf(4.2, 15.6, 2.3, -1, 5.5, -1, 5), p = [3.2, 1.6], b = [2, 4], uh = [2 / Math.sqrt(5), 1 / Math.sqrt(5)], eh = [-1 / Math.sqrt(5), 2 / Math.sqrt(5)], s = .3;
  grid(S, 'g', F);
  thru(S, 'ln', F, [2, 1], { color: 'color-mix(in srgb,var(--accent) 60%,transparent)', h: .14 });
  mar(S, 'p', F, [0, 0], p, 'ok', 3, { h: .34 }); mT(S, 'tp', F, p, .2, .2, 'p', 'cz-mono la-b la-g', 3);
  mar(S, 'u', F, [0, 0], [2, 1], 'accent', 0, { h: .18 }); mT(S, 'tu', F, [2, 1], -.2, .2, 'u', 'cz-mono la-b la-a');
  mar(S, 'b', F, [0, 0], b, 'warn', 0, { h: .22 }); mT(S, 'tb', F, b, -1.2, -.5, 'b', 'cz-mono la-b la-w');
  mline(S, 'e', F, b, p, { st: 2, color: 'danger', h: .16, dash: 1 });
  const c1 = [p[0] - s * uh[0], p[1] - s * uh[1]], c2 = [c1[0] + s * eh[0], c1[1] + s * eh[1]], c3 = [p[0] + s * eh[0], p[1] + s * eh[1]];
  mline(S, 'r1', F, c1, c2, { st: 2, color: 'ink-2', h: .08 }); mline(S, 'r2', F, c2, c3, { st: 2, color: 'ink-2', h: .08 });
  mT(S, 'te', F, [2.6, 2.8], .3, 0, 'e', 'cz-mono la-b la-r', 4);
  T(S, 'e1', 19.4, 2.4, 'u = (2, 1), b = (2, 4)', 'cz-mono la-l');
  T(S, 'e2', 19.4, 4.4, ['b에서 직선으로 수선', 'drop a perpendicular'], 'la-l', 2);
  T(S, 'e3', 19.4, 6.4, 'p = (b·u / u·u) u', 'cz-mono la-l la-g', 3); T(S, 'e4', 19.4, 8, '  = (8/5)(2, 1) = (3.2, 1.6)', 'cz-mono la-s', 3);
  T(S, 'e5', 19.4, 10.2, 'e = b − p = (−1.2, 2.4)', 'cz-mono la-l la-r', 4); T(S, 'e6', 19.4, 11.8, 'e · u = −2.4 + 2.4 = 0 ✓', 'cz-mono la-s', 4);
  T(S, 'e7', 19.4, 14, 'P = uuᵀ / uᵀu = (1/5)[4 2; 2 1]', 'cz-mono la-s', 5); T(S, 'e8', 19.4, 15.5, 'P² = P,  Pᵀ = P', 'cz-mono la-s', 5);
  T(S, 'e9', 19.4, 17, 'p = A(AᵀA)⁻¹Aᵀb', 'cz-mono la-s', 5);
  S.cap(1, 'b를 u 방향 직선 위로 옮기고 싶을 때', 'Bring b down onto the line through u')
    .cap(2, '가장 가까운 점은 수선의 발이에요', 'The closest point is the foot of the perpendicular')
    .cap(3, '그 점 p가 정사영', 'That point p is the projection')
    .cap(4, '오차 e는 직선과 수직 (내적 0)', 'The error e is perpendicular to the line')
    .cap(5, '사영행렬로 쓰면 P² = P · 부분공간으로도 확장돼요', 'As a matrix P² = P, and it extends to subspaces');
  return S;
}
function sGram() {
  const S = scene({ id: 'la-gram', steps: 5, per: 1.35 });
  const F = pf(4.2, 14.4, 2.6, -1, 5, -1, 5), q10 = Math.sqrt(10);
  grid(S, 'g', F);
  S.el('uc', { x: F.X(-1), y: F.Y(1), w: 2 * F.u, h: 2 * F.u, css: 'border-radius:50%;border:.12em dashed var(--ink-3)', s: hid() }); S.set('uc', 4, { opacity: '1' });
  mar(S, 'pj', F, [0, 0], [2.4, .8], 'ink-2', 2, { h: .34, dim: 4 });
  mar(S, 'v1', F, [0, 0], [3, 1], 'accent', 0, { h: .2, dim: 4 }); mT(S, 't1', F, [3, 1], .3, -.2, 'v₁ = u₁', 'cz-mono la-b la-a', 0, { dim: 4 });
  mar(S, 'v2', F, [0, 0], [2, 2], 'warn', 0, { h: .2, dim: 4 }); mT(S, 't2', F, [2, 2], .3, -.6, 'v₂', 'cz-mono la-b la-w', 0, { dim: 4 });
  mline(S, 'dp', F, [2, 2], [2.4, .8], { st: 2, color: 'ink-3', h: .1, dash: 1 });
  mar(S, 'ut', F, [2.4, .8], [2, 2], 'ok', 3, { h: .16, dash: 1, dim: 4 });
  mar(S, 'u2', F, [0, 0], [-.4, 1.2], 'ok', 3, { h: .22, dim: 4 }); mT(S, 'tu2', F, [-.4, 1.2], -.6, -1.2, 'u₂', 'cz-mono la-b la-g', 3, { dim: 4 });
  mar(S, 'e1', F, [0, 0], [3 / q10, 1 / q10], 'accent', 4, { h: .3 }); mar(S, 'e2', F, [0, 0], [-1 / q10, 3 / q10], 'ok', 4, { h: .3 });
  mT(S, 'te1', F, [3 / q10, 1 / q10], .2, .1, 'e₁', 'cz-mono la-b la-a', 4); mT(S, 'te2', F, [-1 / q10, 3 / q10], -1.4, -.4, 'e₂', 'cz-mono la-b la-g', 4);
  T(S, 'x1', 18.6, 2.4, 'v₁ = (3, 1), v₂ = (2, 2)', 'cz-mono la-l');
  T(S, 'x2', 18.6, 4.4, 'proj = (v₂·v₁ / v₁·v₁) v₁', 'cz-mono la-s', 2); T(S, 'x3', 18.6, 5.8, '  = 0.8(3, 1) = (2.4, 0.8)', 'cz-mono la-s', 2);
  T(S, 'x4', 18.6, 7.8, 'u₂ = v₂ − proj = (−0.4, 1.2)', 'cz-mono la-s la-g', 3); T(S, 'x5', 18.6, 9.2, 'u₂ · v₁ = 0 ✓', 'cz-mono la-s', 3);
  T(S, 'x6', 18.6, 11.2, 'eᵢ = uᵢ / |uᵢ|', 'cz-mono la-l', 4);
  T(S, 'x7', 18.6, 13.4, 'A = QR', 'cz-mono la-big', 5); T(S, 'x8', 18.6, 15.2, 'Q = [e₁ e₂]', 'cz-mono la-s', 5); T(S, 'x9', 18.6, 16.6, 'R = [3.16 2.53; 0 1.26]', 'cz-mono la-s', 5);
  S.cap(1, '독립이지만 직교하지 않는 두 벡터에서 시작해요', 'Start with two independent, non-orthogonal vectors')
    .cap(2, 'v₂에서 v₁ 방향 성분(사영)을 찾고', 'Find the part of v₂ along v₁')
    .cap(3, '그만큼 빼면 v₁에 수직인 u₂가 남아요', 'Subtract it: what remains, u₂, is perpendicular to v₁')
    .cap(4, '길이를 1로 맞추면 정규직교기저', 'Normalize: an orthonormal basis')
    .cap(5, '이 과정을 행렬로 쓰면 A = QR', 'Written as matrices, A = QR');
  return S;
}
function sLsq() {
  const S = scene({ id: 'la-lsq', steps: 5, per: 1.35 });
  const F = fr(-.5, 3.5, -.5, 5, 2, 17.5, 2, 18), pts = [[0, 1], [1, 2], [2, 2], [3, 4]];
  edge(S, 'gx', F.L, F.Y(0), F.R, F.Y(0), { s: { background: 'var(--ink-3)' } }); edge(S, 'gy', F.X(0), F.B, F.X(0), F.T, { s: { background: 'var(--ink-3)' } });
  T(S, 'gxl', F.R - .8, F.Y(0) + .2, 'x', 'cz-mono'); T(S, 'gyl', F.X(0) + .3, F.T - .4, 'y', 'cz-mono');
  mplot(S, 'bad', F, t => [t, 1 + .5 * t], -.5, 3.5, { st: 2, off: 3, color: 'danger', h: .16, n: 2 });
  mplot(S, 'best', F, t => [t, .9 + .9 * t], -.5, 3.5, { st: 3, color: 'ok', h: .2, n: 2 });
  pts.forEach(([x, y], i) => { const yb = 1 + .5 * x, yg = .9 + .9 * x;
    if (Math.abs(y - yb) > .01) vl(S, 'rb' + i, F.X(x), F.Y(y), F.Y(yb), 'danger', 2, { off: 3, w: .12 });
    vl(S, 'rg' + i, F.X(x) + .1, F.Y(y), F.Y(yg), 'ok', 3, { w: .14 });
    pt(S, 'p' + i, F.X(x), F.Y(y), 0, C.cur, .42); });
  T(S, 'e1', 19.4, 2.2, ['점 4개에 직선 맞추기', 'fit a line to 4 points'], 'la-l'); T(S, 'e2', 19.4, 3.8, 'y = c₀ + c₁x', 'cz-mono la-s');
  T(S, 'e3', 19.4, 5.8, 'y = 1 + 0.5x', 'cz-mono la-l la-r', 2, { off: 3 }); T(S, 'e4', 19.4, 7.2, ['오차² 합 = 2.5', 'squared error = 2.5'], 'la-s', 2, { off: 3 });
  T(S, 'e5', 19.4, 5.8, 'y = 0.9 + 0.9x', 'cz-mono la-l la-g', 3); T(S, 'e6', 19.4, 7.2, ['오차² 합 = 0.7 (최소)', 'squared error = 0.7 (min)'], 'la-s la-g', 3);
  T(S, 'e7', 19.4, 9.6, 'AᵀA x̂ = Aᵀb', 'cz-mono la-big', 4);
  T(S, 'e8', 19.4, 11.6, '[4 6; 6 14] x̂ = [9; 18]', 'cz-mono la-s', 4); T(S, 'e9', 19.4, 13, 'x̂ = (0.9, 0.9)', 'cz-mono la-l la-g', 4);
  T(S, 'e10', 19.4, 15.2, ['Ax̂ = b를 Col A에 사영', 'Ax̂ = b projected onto Col A'], 'la-s', 5); T(S, 'e11', 19.4, 16.6, ['잔차 ⟂ Col A', 'residual ⟂ Col A'], 'la-s', 5);
  S.cap(1, '네 점을 모두 지나는 직선은 없어요 (Ax = b 해 없음)', 'No line passes through all four points: Ax = b has no solution')
    .cap(2, '아무 직선이나 그으면 오차가 커요', 'A guessed line leaves big errors')
    .cap(3, '오차 제곱합이 가장 작은 직선을 찾으면', 'The line minimizing the squared errors')
    .cap(4, '정규방정식 AᵀAx̂ = Aᵀb의 해예요', 'solves the normal equations AᵀAx̂ = Aᵀb')
    .cap(5, '선형회귀가 바로 이 계산이에요', 'This is exactly linear regression');
  return S;
}
function sOrthmat() {
  const S = scene({ id: 'la-orthmat', steps: 5, per: 1.35 });
  const c = Math.cos(Math.PI / 6), s = .5;
  [[5.5, [[c, -s], [s, c]], ['회전 30°', 'rotate 30°'], 'QᵀQ = I ✓', 'det = 1', 2], [16, [[0, 1], [1, 0]], ['반사 (y = x)', 'reflect (y = x)'], 'QᵀQ = I ✓', 'det = −1', 3], [26.5, [[1, 1], [0, 1]], ['전단', 'shear'], ['직교 아님 ✗', 'not orthogonal ✗'], 'det = 1', 4]].forEach(([cx, m, ttl, ok, d, st], i) => {
    const F = pf(cx, 8, 1.3, -3, 3, -3, 3);
    grid(S, 'g' + i, F); patch(S, 'p' + i, F, 1, K.ci(1.3, 1.6, 'accent') + K.F(1.3, 'warn'));
    tf(S, 'p' + i, st, m);
    T(S, 't' + i, cx - 5, 1.8, ttl, 'cz-tc la-b', 0, { w: 10 });
    T(S, 'o' + i, cx - 5, 12.6, ok, 'cz-tc cz-mono la-l ' + (i < 2 ? 'la-g' : 'la-r'), st, { w: 10 });
    T(S, 'd' + i, cx - 5, 14.2, d, 'cz-tc cz-mono la-s', st, { w: 10 }); });
  T(S, 'f1', 1, 16.6, 'Q⁻¹ = Qᵀ  ·  |Qx| = |x|  ·  Qx · Qy = x · y', 'cz-tc cz-mono la-l', 5, { w: 30 });
  T(S, 'f2', 1, 18.2, ['열벡터가 정규직교 ⟺ 직교행렬', 'orthonormal columns ⟺ orthogonal matrix'], 'cz-tc la-s', 5, { w: 30 });
  S.cap(1, '원과 도형에 세 가지 변환을 적용해 봐요', 'Apply three maps to a circle and a shape')
    .cap(2, '회전은 모양과 크기를 그대로 지키고', 'A rotation keeps shape and size')
    .cap(3, '반사도 길이와 각도를 지켜요 (방향만 반대)', 'A reflection keeps lengths and angles, flipping orientation')
    .cap(4, '전단은 원을 타원으로 바꿔요 · 직교행렬이 아님', 'A shear turns the circle into an ellipse: not orthogonal')
    .cap(5, '직교행렬은 역행렬이 전치라 계산이 쉽고 안정적', 'Inverse = transpose: cheap and numerically stable');
  return S;
}

/* ================= quadratic forms, SVD ================= */
function sQuad() {
  const S = scene({ id: 'la-quadform', steps: 5, per: 1.4 });
  const F1 = pf(8, 9.4, 2.1, -3, 3, -3, 3), F2 = pf(24, 9.4, 2.1, -3, 3, -3, 3), s5 = Math.sqrt(5), s2 = Math.SQRT2;
  grid(S, 'g1', F1); grid(S, 'g2', F2, 4);
  T(S, 'q1', 1, 1.2, 'Q = 5x² + 4xy + 2y²', 'cz-tc cz-mono la-l', 0, { w: 14 });
  T(S, 'q2', 17, 1.2, 'Q = x² + 4xy + y²', 'cz-tc cz-mono la-l', 4, { w: 14 });
  const e1 = [2 / s5, 1 / s5], e2 = [-1 / s5, 2 / s5];
  [1, 4, 9].forEach(c => mplot(S, 'el' + c + '_', F1, t => { const a = Math.sqrt(c / 6) * Math.cos(t), b = Math.sqrt(c) * Math.sin(t); return [a * e1[0] + b * e2[0], a * e1[1] + b * e2[1]]; }, 0, 2 * Math.PI, { st: 2, n: 44, h: .14 }));
  thru(S, 'ax1', F1, e1, { st: 3, color: 'ok', h: .12, dash: 1 }); thru(S, 'ax2', F1, e2, { st: 3, color: 'warn', h: .12, dash: 1 });
  const h1 = [1 / s2, 1 / s2], h2 = [1 / s2, -1 / s2], hp = (u, v) => [u * h1[0] + v * h2[0], u * h1[1] + v * h2[1]];
  [1, -1].forEach(sg => { mplot(S, 'hA' + sg + '_', F2, t => hp(sg * Math.cosh(t), Math.sqrt(3) * Math.sinh(t)), -1.6, 1.6, { st: 4, n: 30, color: 'warn', h: .14 });
    mplot(S, 'hB' + sg + '_', F2, t => hp(Math.sinh(t), sg * Math.sqrt(3) * Math.cosh(t)), -1.6, 1.6, { st: 4, n: 30, color: 'danger', h: .14 }); });
  thru(S, 'bx1', F2, h1, { st: 4, color: 'ok', h: .12, dash: 1 }); thru(S, 'bx2', F2, h2, { st: 4, color: 'warn', h: .12, dash: 1 });
  T(S, 'f1', 1, 16.2, '= 6y₁² + y₂²  (λ = 6, 1)', 'cz-tc cz-mono la-s', 3, { w: 14 });
  T(S, 'f2', 1, 17.6, ['양정치 → 타원', 'positive definite → ellipses'], 'cz-tc la-s la-g', 3, { w: 14 });
  T(S, 'f3', 17, 16.2, '= 3y₁² − y₂²  (λ = 3, −1)', 'cz-tc cz-mono la-s', 4, { w: 14 });
  T(S, 'f4', 17, 17.6, ['부정치 → 쌍곡선', 'indefinite → hyperbolas'], 'cz-tc la-s la-r', 4, { w: 14 });
  T(S, 'f5', 1, 19.2, ['양정치 ⟺ 모든 λ > 0 ⟺ 5 > 0, det [5 2; 2 2] = 6 > 0', 'positive definite ⟺ all λ > 0 ⟺ 5 > 0, det [5 2; 2 2] = 6 > 0'], 'cz-tc la-s', 5, { w: 30 });
  S.cap(1, '이차형식 Q = xᵀAx, A = [5 2; 2 2]', 'The quadratic form Q = xᵀAx with A = [5 2; 2 2]')
    .cap(2, 'Q = 1, 4, 9인 등위선은 기울어진 타원', 'Its level sets Q = 1, 4, 9 are tilted ellipses')
    .cap(3, '고유벡터 방향(주축)으로 보면 교차항이 사라져요', 'Along the eigenvector axes the cross term vanishes')
    .cap(4, '고윳값에 음수가 섞이면 쌍곡선이에요', 'A negative eigenvalue gives hyperbolas')
    .cap(5, '고윳값의 부호가 모양을 정해요', 'The signs of the eigenvalues decide the shape');
  return S;
}
function sSvd() {
  const S = scene({ id: 'la-svd', steps: 5, per: 1.35 });
  const F = pf(9.5, 10.5, 1.15, -8, 8, -8, 8), q = Math.SQRT1_2, s1 = Math.sqrt(45), s2 = Math.sqrt(5);
  grid(S, 'g', F);
  const Ms = [[2, [[q, q], [-q, q]]], [3, [[s1 * q, s1 * q], [-s2 * q, s2 * q]]], [4, [[3, 0], [4, 5]]]];
  patch(S, 'p', F, 1, K.dk(1.15, 1, 'accent')); Ms.forEach(([st, m]) => tf(S, 'p', st, m));
  avec(S, 'v1', F, [[0, [q, q]]].concat(Ms.map(([st, m]) => [st, mv(m, [q, q])])), 'ok', { h: .24 });
  avec(S, 'v2', F, [[0, [-q, q]]].concat(Ms.map(([st, m]) => [st, mv(m, [-q, q])])), 'warn', { h: .24 });
  mat(S, 'A', 22.6, 1.6, [[3, 0], [4, 5]], { cw: 1.9, rh: 1.6 }); T(S, 'Al', 20.4, 2.6, 'A =', 'cz-mono la-l');
  L(S, 'st', 20.4, 6.2, 11, 'la-b', [[1, ['직교 벡터 v₁, v₂', 'orthogonal v₁, v₂']], [2, ['Vᵀ: 회전', 'Vᵀ: rotate']], [3, ['Σ: 축 방향 늘이기', 'Σ: stretch the axes']], [4, ['U: 회전', 'U: rotate']]]);
  L(S, 'sd', 20.4, 7.8, 11.4, 'cz-mono la-xs', [[2, ['v₁, v₂ → 좌표축', 'v₁, v₂ → the axes']], [3, 'σ₁ = 3√5 ≈ 6.71 · σ₂ = √5 ≈ 2.24'], [4, 'Avᵢ = σᵢuᵢ']]);
  T(S, 'e1', 20.4, 10.6, 'A = UΣVᵀ', 'cz-mono la-big', 5);
  T(S, 'e2', 20.4, 12.6, ['σᵢ = √(AᵀA의 고윳값)', 'σᵢ = √(eigenvalues of AᵀA)'], 'la-s', 5);
  T(S, 'e3', 20.4, 14, ['rank = 0 아닌 σ의 개수', 'rank = # nonzero σ'], 'la-s', 5);
  T(S, 'e4', 20.4, 15.4, ['큰 σ만 남기면 저랭크 근사', 'keep the largest σ: low rank'], 'la-s', 5);
  T(S, 'e5', 20.4, 16.8, ['압축 · PCA · 추천 시스템', 'compression · PCA · recommenders'], 'la-s', 5);
  S.cap(1, '단위원 위의 직교하는 두 벡터 v₁, v₂', 'Two orthogonal vectors v₁, v₂ on the unit circle')
    .cap(2, 'Vᵀ로 돌려 좌표축에 맞추고', 'Vᵀ rotates them onto the axes')
    .cap(3, 'Σ로 축마다 σ배 늘이고', 'Σ stretches each axis by σ')
    .cap(4, 'U로 돌리면 정확히 A를 적용한 결과', 'U rotates: exactly the effect of A')
    .cap(5, '모든 행렬은 회전 · 늘이기 · 회전으로 쪼개져요', 'Every matrix is rotate, stretch, rotate');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'lax-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono lax-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono lax-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c lax-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono lax-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c lax-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'lax-s lax-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono lax-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono lax-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono lax-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono lax-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono lax-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'lax-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'lax-xs', 5));


const CSSX = `
.lax-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.lax-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.lax-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.lax-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.lax-r .in{color:var(--danger);font-weight:800}
.lax-g .in{color:var(--ok);font-weight:800}
.lax-a .in{color:var(--accent);font-weight:800}
.lax-w .in{color:var(--warn);font-weight:800}
.lax-c .in{font-size:.6em;font-weight:700}
.lax-c2 .in{font-size:.5em;font-weight:700}
.lax-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.lax-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'lax-xs', i + 1, { off: i + 2 }));
const MW = 1.8, MH = 1.25, MG = .1;
const mat = (S, k, x, y, M, st, col, o = {}) => { const W = o.w || MW, H = o.h || MH, n = M[0].length, m = M.length;
  vl(S, k + 'bl', x - .25, y - .1, y + m * H + (m - 1) * MG + .1, 'ink-3', st, { w: .1, off: o.off }); vl(S, k + 'br', x + n * W + (n - 1) * MG + .25, y - .1, y + m * H + (m - 1) * MG + .1, 'ink-3', st, { w: .1, off: o.off });
  M.forEach((row, i) => row.forEach((v, j) => { const [c, p] = col(i, j, v); cell(S, `${k}${i}${j}`, x + j * (W + MG), y + i * (H + MG), W, H, String(v), c, p, st, { off: o.off }); })); };
const fmt = v => (v < 0 ? '−' : '') + Math.abs(v);

/* ================= determinants ================= */
function sAdj() {
  const S = scene({ id: 'la-adj', steps: 5, per: 1.7 });
  const A = [[1, 2, 0], [0, 1, 1], [1, 0, 1]], C = [[1, 1, -1], [-2, 1, 2], [2, -1, 1]], adj = C[0].map((_, j) => C.map(r => r[j]));
  const X = [1.4, 9.2, 17.0, 24.8], Y0 = 1.6, lab = (k, x, t, cls, st) => T(S, k, x, .35, t, 'cz-mono lax-s ' + (cls || ''), st);
  lab('lA', X[0], 'A', '', 0); mat(S, 'A', X[0], Y0, A, 0, () => ['line', 18]);
  T(S, 'det', X[0], 6.0, 'det A = 3', 'cz-mono lax-xs lax-a', 1, { off: 2 });
  S.el('xr', { x: X[0] - .1, y: Y0 + (MH + MG) - .05, w: 3 * MW + 2 * MG + .2, h: MH + .1, css: 'background:color-mix(in srgb,var(--danger) 30%,transparent);border-radius:.2em', s: hid() }); S.set('xr', 2, { opacity: '1' }); S.set('xr', 3, { opacity: '0' });
  S.el('xc', { x: X[0] - .1, y: Y0 - .05, w: MW + .2, h: 3 * MH + 2 * MG + .1, css: 'background:color-mix(in srgb,var(--danger) 30%,transparent);border-radius:.2em', s: hid() }); S.set('xc', 2, { opacity: '1' }); S.set('xc', 3, { opacity: '0' });
  lab('lC', X[1], ['여인수 C', 'cofactors C'], 'lax-w', 2); mat(S, 'C', X[1], Y0, C.map(r => r.map(fmt)), 2, (i, j) => (i === 1 && j === 0 ? ['danger', 30] : ['warn', 16]));
  T(S, 'm21', X[0], 6.0, ['M₂₁ = |2 0; 0 1| = 2 → C₂₁ = (−1)³·2 = −2', 'M₂₁ = |2 0; 0 1| = 2 → C₂₁ = (−1)³·2 = −2'], 'cz-mono lax-xs lax-r', 2, { off: 3 });
  lab('lT', X[2], 'adj A = Cᵀ', 'lax-a', 3); mat(S, 'J', X[2], Y0, adj.map(r => r.map(fmt)), 3, (i, j) => (i === 0 && j === 1 ? ['danger', 30] : ['accent', 18]));
  ar(S, 'a1', [15.0, 3.6], [16.6, 3.6], 'ink-3', 3, { h: .1 });
  T(S, 'tr', X[1], 6.0, ['C₂₁ = −2가 adj의 (1, 2) 자리로', 'C₂₁ = −2 moves to adj’s (1, 2) slot'], 'lax-xs', 3, { off: 4 });
  lab('lI', X[3], 'A⁻¹ = adj / 3', 'lax-g', 4); mat(S, 'I', X[3], Y0, adj.map(r => r.map(v => (v < 0 ? '−' : '') + Math.abs(v) + '/3')), 4, () => ['ok', 18]);
  ar(S, 'a2', [22.8, 3.6], [24.4, 3.6], 'ink-3', 4, { h: .1 });
  T(S, 'chk', X[1], 6.0, 'A · adj A = (det A) · I = 3I ✓', 'cz-mono lax-xs lax-g', 4);
  T(S, 'f1', 1, 8.2, 'Cᵢⱼ = (−1)ⁱ⁺ʲ Mᵢⱼ', 'cz-mono lax-s', 2);
  T(S, 'f2', 1, 9.6, ['Mᵢⱼ: i행과 j열을 지운 작은 행렬식', 'Mᵢⱼ: the minor with row i and column j removed'], 'lax-xs', 2);
  T(S, 'f3', 1, 11.0, 'A⁻¹ = adj A / det A', 'cz-mono lax-s lax-g', 4);
  T(S, 'f4', 1, 12.4, ['2×2라면 [a b; c d]⁻¹ = [d −b; −c a] / (ad − bc)', 'for 2×2, [a b; c d]⁻¹ = [d −b; −c a] / (ad − bc)'], 'cz-mono lax-xs', 4);
  stepT(S, 'k', 1, 15.6, [['A의 행렬식은 3 · 0이 아니니 역행렬이 있어요', 'det A = 3, not 0, so A has an inverse'], ['각 원소마다 그 행과 열을 지운 소행렬식에 부호 (−1)ⁱ⁺ʲ를 붙이면 여인수', 'for each entry, the minor with its row and column removed, signed by (−1)ⁱ⁺ʲ, is the cofactor'], ['여인수 행렬을 전치하면 수반행렬 adj A', 'transposing the cofactor matrix gives the adjugate adj A'], ['A · adj A = (det A)·I라서 adj A를 det A로 나누면 바로 역행렬', 'since A · adj A = (det A)·I, dividing adj A by det A gives the inverse']]);
  fin(S, 'z', 15.6, [['수반행렬: 여인수 행렬의 전치 · A⁻¹ = adj A / det A', 'the adjugate is the transposed cofactor matrix · A⁻¹ = adj A / det A', 'lax-xs lax-a'], ['det A = 0이면 나눌 수 없어 역행렬이 없어요 · 크래머 공식도 여기서 나와요', 'when det A = 0 there is nothing to divide by, so no inverse · Cramer’s rule follows from it'], ['n이 크면 계산량이 폭발해서 실제로는 가우스 소거·LU로 역행렬을 구해요', 'the work explodes for large n, so in practice inverses come from elimination or LU']]);
  S.cap(1, '역행렬이 있나', 'Is there an inverse?').cap(2, '여인수 구하기', 'Compute the cofactors').cap(3, '전치하면 수반행렬', 'Transpose to get the adjugate').cap(4, 'det으로 나누면 역행렬', 'Divide by the determinant').cap(5, '수반행렬과 역행렬', 'The adjugate and the inverse');
  return S;
}

/* ================= vector spaces ================= */
function sDim() {
  const S = scene({ id: 'la-dim', steps: 5, per: 1.7 });
  const BX = [1, 8.6, 16.2, 23.8], BW = 7, BY = 1.2, BH = 8.6;
  BX.forEach((x, i) => rect(S, 'bx' + i, x, BY, BW, BH, 'line', 10, i + 1, { r: .4 }));
  const F1 = fr(-1.6, 1.6, -1.6, 1.6, BX[0] + .3, BX[0] + 6.7, BY + .8, BY + 7.2);
  hl(S, 'a1x', F1.L, F1.R, F1.Y(0), 'ink-3', 1, { w: .06 }); vl(S, 'a1y', F1.X(0), F1.T, F1.B, 'ink-3', 1, { w: .06 });
  mline(S, 'ln', F1, [-.8, -1.6], [.8, 1.6], { st: 1, color: 'accent', h: .1 }); mar(S, 'b1', F1, [0, 0], [.5, 1], 'accent', 1, { h: .14 });
  const F2 = fr(-1.6, 1.6, -1.6, 1.6, BX[1] + .3, BX[1] + 6.7, BY + .8, BY + 7.2);
  grid(S, 'g2', F2, 2); mar(S, 'e1', F2, [0, 0], [1, 0], 'warn', 2, { h: .14 }); mar(S, 'e2', F2, [0, 0], [0, 1], 'ok', 2, { h: .14 });
  mar(S, 'f1', F2, [0, 0], [1, 1], 'accent', 4, { h: .1, dash: 1 }); mar(S, 'f2', F2, [0, 0], [-1, 1], 'accent', 4, { h: .1, dash: 1 });
  const F3 = fr(-1, 1, -1, 6, BX[2] + .5, BX[2] + 6.5, BY + .6, BY + 7.6);
  hl(S, 'a3x', F3.L, F3.R, F3.Y(0), 'ink-3', 3, { w: .06 }); vl(S, 'a3y', F3.X(0), F3.T, F3.B, 'ink-3', 3, { w: .06 });
  [[x => 1, 'ink-3'], [x => x, 'warn'], [x => x * x, 'ok'], [x => 2 - x + 3 * x * x, 'accent']].forEach(([g, c], i) => mplot(S, 'p' + i, F3, x => [x, g(x)], -1, 1, { st: 3, color: c, h: i === 3 ? .12 : .08, n: 30 }));
  T(S, 'pl', BX[2] + .3, BY - .95, '2 − x + 3x²', 'cz-mono lax-xs lax-a', 3);
  const E = [[[1, 0], [0, 0]], [[0, 1], [0, 0]], [[0, 0], [1, 0]], [[0, 0], [0, 1]]];
  E.forEach((M, q) => { const x0 = BX[3] + 1.0 + (q % 2) * 2.9, y0 = BY + 1.4 + Math.floor(q / 2) * 3.0; M.forEach((r, i) => r.forEach((v, j) => cell(S, `m${q}${i}${j}`, x0 + j * 1.05, y0 + i * 1.05, .95, .95, String(v), v ? 'accent' : 'line', v ? 34 : 12, 4))); });
  [['dim = 1', ['기저 {(1, 2)}', 'basis {(1, 2)}']], ['dim = 2', ['기저 {e₁, e₂}', 'basis {e₁, e₂}']], ['dim = 3', ['기저 {1, x, x²}', 'basis {1, x, x²}']], ['dim = 4', ['기저 E₁₁ … E₂₂', 'basis E₁₁ … E₂₂']]].forEach(([d, b], i) => {
    T(S, 'd' + i, BX[i], BY + BH + .25, d, 'cz-tc cz-mono lax-s lax-a', i + 1, { w: BW }); T(S, 'bs' + i, BX[i] - .2, BY + BH + 1.45, b, 'cz-tc lax-xs', i + 1, { w: BW + .4 }); });
  T(S, 'nm', [1].map(() => BX[0])[0], 12.9, ['원점을 지나는 직선', 'a line through the origin'], 'cz-tc lax-xs', 1, { w: BW });
  T(S, 'n2', BX[1], 12.9, ['평면 R²', 'the plane R²'], 'cz-tc lax-xs', 2, { w: BW }); T(S, 'n3', BX[2], 12.9, ['2차 이하 다항식', 'polynomials of degree ≤ 2'], 'cz-tc lax-xs', 3, { w: BW + .4 }); T(S, 'n4', BX[3], 12.9, ['2×2 행렬', '2×2 matrices'], 'cz-tc lax-xs', 4, { w: BW });
  T(S, 'alt', BX[1] + .2, BY + .2, ['다른 기저도 2개', 'other bases: also 2'], 'lax-xs lax-a', 4);
  stepT(S, 'k', 1, 15.6, [['원점을 지나는 직선은 벡터 하나로 모두 만들어져요 · 기저 1개, 차원 1', 'a line through the origin is spanned by one vector · one basis vector, dimension 1'], ['평면은 독립인 벡터 2개가 필요하고, 그걸로 충분해요 · 차원 2', 'the plane needs two independent vectors, and two suffice · dimension 2'], ['2차 이하 다항식도 벡터 공간 · 1, x, x²의 일차결합이라 차원 3', 'polynomials of degree ≤ 2 form a vector space too · combinations of 1, x, x², so dimension 3'], ['2×2 행렬은 칸마다 1인 행렬 4개로 만들어져 차원 4 · 어떤 기저든 개수는 같아요', '2×2 matrices are built from four single-entry matrices: dimension 4 · every basis has the same count']]);
  fin(S, 'z', 15.6, [['차원: 기저를 이루는 벡터의 개수 · 기저를 어떻게 골라도 같아요', 'dimension is the number of vectors in a basis, whichever basis you pick', 'lax-xs lax-a'], ['n차원 공간에서 독립인 벡터는 최대 n개, 공간을 생성하려면 최소 n개', 'in n dimensions, at most n vectors can be independent and at least n are needed to span'], ['Ax = 0의 해 공간의 차원 = n − rank A · 자유변수의 개수와 같아요', 'the solution space of Ax = 0 has dimension n − rank A, the number of free variables']]);
  S.cap(1, '직선: 차원 1', 'A line: dimension 1').cap(2, '평면: 차원 2', 'A plane: dimension 2').cap(3, '다항식 공간', 'A space of polynomials').cap(4, '행렬 공간', 'A space of matrices').cap(5, '차원', 'Dimension');
  return S;
}

/* ================= orthogonality ================= */
function sQR() {
  const S = scene({ id: 'la-qr', steps: 5, per: 1.7 });
  const A = [[3, 2], [4, 1]], Q = [[.6, .8], [.8, -.6]], R = [[5, 2], [0, 1]];
  const M2 = (k, x, y, M, st, c, p) => mat(S, k, x, y, M, st, () => [c, p], { w: 1.7 });
  T(S, 'lA', 1.4, .35, 'A', 'cz-mono lax-s', 0); M2('A', 1.4, 1.5, A, 0, 'line', 18);
  T(S, 'eq', 5.5, 1.85, '=', 'cz-mono lax-l', 1);
  T(S, 'lQ', 6.9, .35, 'Q', 'cz-mono lax-s lax-g', 1); M2('Q', 6.9, 1.5, Q.map(r => r.map(v => (v < 0 ? '−' : '') + Math.abs(v))), 1, 'ok', 20);
  T(S, 'dt', 11.0, 1.85, '·', 'cz-mono lax-l', 1);
  T(S, 'lR', 12.4, .35, 'R', 'cz-mono lax-s lax-a', 1); M2('R', 12.4, 1.5, R, 1, 'accent', 20);
  T(S, 'q1', 1, 5.0, ['Q의 열: 길이 1, 서로 직교 → QᵀQ = I', 'Q’s columns: length 1, mutually orthogonal → QᵀQ = I'], 'lax-xs lax-g', 2);
  T(S, 'q2', 1, 6.1, ['R: 위삼각행렬 (그람-슈미트의 계수)', 'R: upper triangular (the Gram–Schmidt coefficients)'], 'lax-xs lax-a', 2);
  S.el('rz', { x: 12.3, y: 2.75, w: 1.9, h: 1.45, css: 'border:.12em dashed var(--danger);border-radius:.25em', s: hid() }); S.set('rz', 2, { opacity: '1' }); S.set('rz', 3, { opacity: '0' });
  T(S, 'l1', 1, 7.6, ['최소제곱 Ax ≈ b', 'least squares Ax ≈ b'], 'lax-s', 3);
  T(S, 'l2', 1, 8.9, 'Rx = Qᵀb', 'cz-mono lax-s lax-a', 3);
  T(S, 'l3', 1, 10.2, ['뒤에서부터 대입하면 끝 · AᵀA를 만들지 않아 정확해요', 'back-substitute and done · no AᵀA, so it stays accurate'], 'lax-xs', 3);
  let M = [[2, 1], [1, 2]]; const seq = [M];
  for (let k = 0; k < 4; k++) { const [a, c] = [M[0][0], M[1][0]], n1 = Math.hypot(a, c), q1 = [a / n1, c / n1], r12 = q1[0] * M[0][1] + q1[1] * M[1][1], u = [M[0][1] - r12 * q1[0], M[1][1] - r12 * q1[1]], n2 = Math.hypot(...u), q2 = [u[0] / n2, u[1] / n2];
    const Rm = [[n1, r12], [0, n2]], Qm = [[q1[0], q2[0]], [q1[1], q2[1]]]; M = [[Rm[0][0] * Qm[0][0] + Rm[0][1] * Qm[1][0], Rm[0][0] * Qm[0][1] + Rm[0][1] * Qm[1][1]], [Rm[1][1] * Qm[1][0], Rm[1][1] * Qm[1][1]]]; seq.push(M); }
  const RX = 18.0;
  T(S, 'e0', RX, .35, ['QR 알고리즘 (고윳값)', 'the QR algorithm (eigenvalues)'], 'lax-s lax-w', 4);
  T(S, 'e1', RX, 1.6, 'A₀ = A, Aₖ = QₖRₖ → Aₖ₊₁ = RₖQₖ', 'cz-mono lax-xs', 4);
  [0, 1, 2, 4].forEach((k, i) => { const y = 2.9 + i * 2.75; T(S, 'ek' + k, RX, y + .5, `A${['₀', '₁', '₂', '', '₄'][k]}`, 'cz-mono lax-xs', 4);
    mat(S, 'E' + k, RX + 2.0, y, seq[k].map(r => r.map(v => v.toFixed(2).replace('-', '−'))), 4, (a, b) => (a === b ? ['warn', 26] : ['line', Math.abs(seq[k][a][b]) < .05 ? 8 : 18]), { w: 2.0, h: 1.0 }); });
  T(S, 'ev', RX + 7.0, 12.0, ['대각선 → 고윳값 3, 1', 'diagonal → eigenvalues 3, 1'], 'lax-xs lax-g', 4, { w: 6 });
  stepT(S, 'k', 1, 15.6, [['A의 열을 그람-슈미트로 정규직교화하면, A를 Q와 R의 곱으로 쓸 수 있어요', 'orthonormalizing A’s columns by Gram–Schmidt writes A as a product of Q and R'], ['Q는 열이 서로 직교하는 길이 1 벡터, R은 위삼각 · 아래 칸이 0이에요', 'Q has orthonormal columns; R is upper triangular, with zeros below the diagonal'], ['최소제곱을 QR로 풀면 Rx = Qᵀb · 조건수를 제곱으로 키우지 않아요', 'least squares via QR becomes Rx = Qᵀb, without squaring the condition number'], ['A = QR로 나누고 RQ로 다시 곱하기를 반복하면 대각선에 고윳값이 남아요', 'split A = QR, multiply back as RQ, repeat, and the eigenvalues appear on the diagonal']]);
  fin(S, 'z', 15.6, [['QR 분해: A = QR (Q: 정규직교 열, R: 위삼각)', 'QR factorization: A = QR (Q orthonormal columns, R upper triangular)', 'lax-xs lax-a'], ['실제로는 하우스홀더 반사로 계산해 더 안정해요 · numpy.linalg.qr', 'in practice computed with Householder reflections for stability · numpy.linalg.qr'], ['QR 알고리즘은 LAPACK의 고윳값 계산(eig)의 핵심이에요', 'the QR algorithm is at the heart of LAPACK’s eigenvalue routines']]);
  S.cap(1, 'A = QR', 'A = QR').cap(2, 'Q와 R의 모양', 'What Q and R look like').cap(3, '최소제곱에 쓰기', 'Using it for least squares').cap(4, 'QR 알고리즘', 'The QR algorithm').cap(5, 'QR 분해', 'QR factorization');
  return S;
}

/* ================= quadratic forms ================= */
function sPosDef() {
  const S = scene({ id: 'la-posdef', steps: 5, per: 1.7 });
  const A = [[4, 2], [2, 3]], q = t => { const x = Math.cos(t), y = Math.sin(t); return A[0][0] * x * x + 2 * A[0][1] * x * y + A[1][1] * y * y; };
  const tr = 7, dt = Math.sqrt(49 - 4 * 8), l1 = (tr + dt) / 2, l2 = (tr - dt) / 2, v1 = [2, l1 - 4], n1 = Math.hypot(...v1), e1 = [v1[0] / n1, v1[1] / n1], e2 = [-e1[1], e1[0]];
  const F = fr(-6.5, 6.5, -6.5, 6.5, 1.4, 14.4, .6, 13.6), K = .95;
  hl(S, 'ax', F.L, F.R, F.Y(0), 'ink-3', 0, { w: .06 }); vl(S, 'ay', F.X(0), F.T, F.B, 'ink-3', 0, { w: .06 });
  ring(S, 'uc', F.X(0), F.Y(0), F.u, 'ink-3', 0, { w: .08, dash: 1 });
  for (let i = 0; i < 36; i++) { const t = i * Math.PI / 18, r = q(t) * K, x = Math.cos(t), y = Math.sin(t); mline(S, 'r' + i, F, [x, y], [x * (1 + r), y * (1 + r)], { st: 1, color: 'accent', h: .1 }); }
  pplot(S, 'env', t => [F.X(Math.cos(t) * (1 + q(t) * K)), F.Y(Math.sin(t) * (1 + q(t) * K))], 0, 2 * Math.PI, { st: 1, color: 'accent', h: .06, n: 72 });
  mar(S, 'ev1', F, [0, 0], [e1[0] * (1 + l1 * K), e1[1] * (1 + l1 * K)], 'warn', 2, { h: .16 }); mar(S, 'ev2', F, [0, 0], [e2[0] * (1 + l2 * K), e2[1] * (1 + l2 * K)], 'ok', 2, { h: .16 });
  const RX = 16.4;
  T(S, 'm0', RX, .4, 'A =', 'cz-mono lax-s', 0); mat(S, 'A', RX + 2.4, .3, A, 0, () => ['line', 18]);
  T(S, 'm1', RX, 3.4, ['단위 벡터 x마다 xᵀAx를 막대로', 'a bar of xᵀAx for each unit vector x'], 'lax-xs', 1);
  T(S, 'm2', RX, 4.4, ['모든 방향에서 > 0 → 양정치', '> 0 in every direction → positive definite'], 'lax-xs lax-a', 1);
  T(S, 'm3', RX, 5.8, [`최대·최소 = 고윳값 ${l1.toFixed(2)}, ${l2.toFixed(2)}`, `max and min = eigenvalues ${l1.toFixed(2)}, ${l2.toFixed(2)}`], 'lax-xs lax-w', 2);
  T(S, 'm4', RX, 7.2, ['선행 주소행렬식', 'leading principal minors'], 'lax-xs', 3);
  T(S, 'm5', RX, 8.2, '4 > 0 · det A = 12 − 4 = 8 > 0 ✓', 'cz-mono lax-xs lax-g', 3);
  T(S, 'm6', RX, 9.6, ['촐레스키 A = LLᵀ', 'Cholesky A = LLᵀ'], 'lax-xs lax-a', 4);
  mat(S, 'L', RX + .3, 10.8, [['2', '0'], ['1', '√2']], 4, (i, j) => (i >= j ? ['accent', 24] : ['line', 8]), { w: 1.6, h: 1.0 });
  T(S, 'm7', RX + 4.4, 11.3, ['양정치면 늘 존재 ✓', 'always exists when PD ✓'], 'lax-xs lax-g', 4);
  stepT(S, 'k', 1, 15.6, [['단위 벡터 x를 한 바퀴 돌리며 xᵀAx를 재요 · 어느 방향이든 0보다 크면 양정치예요', 'sweep unit vectors x around the circle and measure xᵀAx · positive in every direction means positive definite'], ['가장 긴 막대와 가장 짧은 막대가 고유벡터 방향이고, 그 값이 고윳값이에요', 'the longest and shortest bars point along the eigenvectors, and their lengths are the eigenvalues'], ['계산으로는 왼쪽 위부터의 작은 행렬식이 모두 양수인지 확인해요', 'by hand, check that every leading principal minor is positive'], ['양정치 행렬은 A = LLᵀ로 나눠져요 · 연립방정식을 LU의 절반 비용으로 풀어요', 'a positive-definite matrix factors as A = LLᵀ · solving with it costs half of LU']]);
  fin(S, 'z', 15.6, [['양정치 ⟺ 모든 x ≠ 0에 xᵀAx > 0 ⟺ 모든 고윳값 > 0 ⟺ 선행 주소행렬식 > 0', 'positive definite ⟺ xᵀAx > 0 for all x ≠ 0 ⟺ all eigenvalues > 0 ⟺ leading minors > 0', 'lax-xs lax-a'], ['헤세 행렬이 양정치면 극소 · 볼록 최적화의 바탕이에요', 'a positive-definite Hessian means a local minimum · the basis of convex optimization'], ['공분산 행렬은 양의 준정치 · 촐레스키로 상관된 난수를 만들어요', 'covariance matrices are positive semidefinite · Cholesky turns them into correlated random samples']]);
  S.cap(1, '모든 방향에서 양수', 'Positive in every direction').cap(2, '고윳값이 최대·최소', 'Eigenvalues are the extremes').cap(3, '주소행렬식 판정', 'The minor test').cap(4, '촐레스키 분해', 'Cholesky factorization').cap(5, '양정치 행렬', 'Positive-definite matrices');
  return S;
}


return { css: CSSX, secs: [], add: {
},
after: {
  'la-cramer': [item('la-adj', '수반행렬과 역행렬 공식', 'The adjugate and the inverse formula', '각 원소의 여인수를 모은 행렬을 전치한 것이 수반행렬이에요. 이를 행렬식으로 나누면 역행렬이 돼요: A⁻¹ = adj A / det A.', 'i행 j열 원소의 소행렬식 Mᵢⱼ는 그 행과 열을 지운 작은 행렬의 행렬식이고, 부호 (−1)ⁱ⁺ʲ를 붙인 Cᵢⱼ가 여인수예요. 여인수를 모은 행렬 C를 전치한 것이 수반행렬 adj A = Cᵀ예요. 예를 들어 A = [[1,2,0],[0,1,1],[1,0,1]]은 det A = 3이고, C₂₁ = (−1)³·|2 0; 0 1| = −2처럼 아홉 개의 여인수를 구해 전치하면 adj A = [[1,−2,2],[1,1,−1],[−1,2,1]]이에요. 여인수 전개 덕분에 A · adj A = (det A)·I가 성립하므로, det A ≠ 0이면 A⁻¹ = adj A / det A예요. 2×2라면 [a b; c d]⁻¹ = [d −b; −c a]/(ad − bc)로, 대각 원소를 바꾸고 나머지의 부호를 바꾼 뒤 행렬식으로 나누면 돼요. 크래머 공식 xᵢ = det Aᵢ / det A도 이 공식에서 나와요. 다만 n×n에서 행렬식을 n²번 구해야 해서 계산량이 매우 커지므로, 실제 계산은 가우스 소거나 LU 분해로 하고 이 공식은 주로 이론과 작은 행렬에 써요.', 'The adjugate is the transpose of the matrix of cofactors; dividing it by the determinant gives the inverse: A⁻¹ = adj A / det A.', 'The minor Mᵢⱼ is the determinant of the matrix left after deleting row i and column j, and the cofactor Cᵢⱼ attaches the sign (−1)ⁱ⁺ʲ. Collecting the cofactors into C and transposing gives the adjugate adj A = Cᵀ. For A = [[1,2,0],[0,1,1],[1,0,1]], det A = 3; computing all nine cofactors, such as C₂₁ = (−1)³·|2 0; 0 1| = −2, and transposing gives adj A = [[1,−2,2],[1,1,−1],[−1,2,1]]. Cofactor expansion makes A · adj A = (det A)·I, so when det A ≠ 0, A⁻¹ = adj A / det A. For 2×2 matrices this is [a b; c d]⁻¹ = [d −b; −c a]/(ad − bc): swap the diagonal, negate the rest and divide by the determinant. Cramer’s rule, xᵢ = det Aᵢ / det A, follows from the same formula. Because an n×n matrix needs n² determinants, the work is enormous for large n, so real computations use Gaussian elimination or LU and the formula serves theory and small matrices.', sAdj())],
  'la-basis': [item('la-dim', '차원', 'Dimension', '벡터 공간의 기저를 이루는 벡터의 개수예요. 기저는 여러 가지로 고를 수 있지만 그 개수는 언제나 같아요.', '원점을 지나는 직선은 벡터 하나로, 평면은 독립인 벡터 두 개로 모두 만들어져서 차원이 각각 1, 2예요. 벡터 공간은 화살표만이 아니라서, 2차 이하 다항식 a + bx + cx²의 공간은 기저 {1, x, x²}로 차원 3이고 2 − x + 3x²의 좌표는 (2, −1, 3)이에요. 2×2 행렬의 공간은 한 칸만 1인 행렬 E₁₁, E₁₂, E₂₁, E₂₂로 만들어져 차원 4이고, m×n 행렬은 mn차원이에요. 평면에서 {(1, 0), (0, 1)} 대신 {(1, 1), (−1, 1)}을 골라도 벡터는 두 개인 것처럼, 어떤 기저든 개수가 같다는 사실이 차원이라는 정의를 가능하게 해요. 그래서 n차원 공간에서 독립인 벡터는 최대 n개이고, 공간을 생성하려면 최소 n개가 필요하며, 독립인 벡터 n개는 자동으로 기저예요. 동차 연립방정식 Ax = 0의 해 공간은 차원이 n − rank A로, 자유변수의 개수와 같아요.', 'The number of vectors in a basis of a vector space. A space has many bases, but they always have the same number of vectors.', 'A line through the origin is spanned by a single vector and a plane by two independent ones, so their dimensions are 1 and 2. Vector spaces are not only arrows: polynomials a + bx + cx² of degree at most 2 form a space with basis {1, x, x²}, dimension 3, and 2 − x + 3x² has coordinates (2, −1, 3). The 2×2 matrices are built from the single-entry matrices E₁₁, E₁₂, E₂₁, E₂₂, dimension 4, and m×n matrices have dimension mn. Choosing {(1, 1), (−1, 1)} instead of {(1, 0), (0, 1)} for the plane still gives two vectors; the fact that every basis has the same size is what makes dimension well defined. Hence in n dimensions at most n vectors can be independent, at least n are needed to span, and any n independent vectors form a basis. The solution space of a homogeneous system Ax = 0 has dimension n − rank A, the number of free variables.', sDim())],
  'la-gram': [item('la-qr', 'QR 분해', 'QR factorization', '행렬을 정규직교 열을 가진 Q와 위삼각행렬 R의 곱으로 나눠요. 최소제곱 문제와 고윳값 계산에 쓰는 핵심 분해예요.', 'A의 열들에 그람-슈미트를 적용하면 정규직교 벡터 q₁, q₂, …가 나오고, 원래 열은 aⱼ = r₁ⱼq₁ + … + rⱼⱼqⱼ처럼 앞의 q들로만 표현돼요. 이 계수를 모은 위삼각행렬이 R이고 A = QR이에요. 예: A = [[3, 2], [4, 1]]이면 Q = [[0.6, 0.8], [0.8, −0.6]], R = [[5, 2], [0, 1]]이에요. Q는 QᵀQ = I라서 곱해도 길이와 각도가 변하지 않고, 역행렬이 전치일 뿐이에요. 최소제곱 Ax ≈ b는 정규방정식 대신 Rx = Qᵀb를 뒤에서부터 대입해 풀어, AᵀA를 만들 때 조건수가 제곱되는 문제를 피해요. 또 A₀ = A에서 Aₖ = QₖRₖ로 나누고 Aₖ₊₁ = RₖQₖ로 거꾸로 곱하기를 반복하면(QR 알고리즘) 닮은 행렬을 유지하면서 대각선에 고윳값이 모여요. [[2, 1], [1, 2]]는 몇 번 만에 대각선이 3과 1로 수렴해요. 실제 라이브러리는 그람-슈미트 대신 더 안정한 하우스홀더 반사나 기븐스 회전으로 Q를 만들어요(numpy.linalg.qr, LAPACK).', 'Factor a matrix into Q, with orthonormal columns, times an upper-triangular R. It is the workhorse for least squares and eigenvalue computation.', 'Applying Gram–Schmidt to the columns of A produces orthonormal vectors q₁, q₂, …, and each original column is a combination of earlier qs only: aⱼ = r₁ⱼq₁ + … + rⱼⱼqⱼ. Collecting those coefficients into an upper-triangular R gives A = QR. For A = [[3, 2], [4, 1]], Q = [[0.6, 0.8], [0.8, −0.6]] and R = [[5, 2], [0, 1]]. Since QᵀQ = I, multiplying by Q preserves lengths and angles and its inverse is just its transpose. Least squares Ax ≈ b is solved by back substitution in Rx = Qᵀb, avoiding the squared condition number of the normal equations’ AᵀA. Repeatedly splitting Aₖ = QₖRₖ and multiplying back Aₖ₊₁ = RₖQₖ (the QR algorithm) keeps the matrices similar while the eigenvalues gather on the diagonal: [[2, 1], [1, 2]] reaches 3 and 1 within a few rounds. Real libraries build Q with Householder reflections or Givens rotations rather than Gram–Schmidt for stability (numpy.linalg.qr, LAPACK).', sQR())],
  'la-quadform': [item('la-posdef', '양정치 행렬', 'Positive-definite matrices', '0이 아닌 모든 벡터 x에 대해 xᵀAx > 0인 대칭행렬이에요. 모든 고윳값이 양수이고, 촐레스키 분해 A = LLᵀ가 가능해요.', '대칭행렬 A에 대해 xᵀAx는 x 방향으로 A가 얼마나 늘이는지를 나타내는 수예요. 단위 벡터를 한 바퀴 돌리며 재면 A = [[4, 2], [2, 3]]은 모든 방향에서 양수라 양정치예요. 이 값의 최댓값과 최솟값은 고유벡터 방향에서 나오고, 그 값이 바로 고윳값(약 5.56, 1.44)이에요. 그래서 양정치 ⟺ 모든 고윳값 > 0이고, 손으로는 왼쪽 위부터의 선행 주소행렬식이 모두 양수인지(4 > 0, det = 8 > 0) 확인해요. 양정치 행렬은 A = LLᵀ(L은 대각 원소가 양수인 하삼각)로 분해되며, 예시에서는 L = [[2, 0], [1, √2]]예요. 촐레스키 분해는 LU의 약 절반 비용으로 연립방정식을 풀고, 분해가 실패하면 양정치가 아니라는 판정도 돼요. 다변수 함수의 헤세 행렬이 양정치면 그 점은 극소이고, 볼록 최적화와 뉴턴 방법이 이 성질에 기대요. 공분산 행렬은 양의 준정치(≥ 0)이고, 촐레스키 인수로 독립 정규 난수를 상관된 난수로 바꿔요.', 'A symmetric matrix with xᵀAx > 0 for every nonzero x. All its eigenvalues are positive and it has a Cholesky factorization A = LLᵀ.', 'For a symmetric A, xᵀAx measures how much A stretches along x. Sweeping a unit vector around the circle shows that A = [[4, 2], [2, 3]] gives a positive value in every direction, so it is positive definite. The largest and smallest of these values occur along the eigenvectors and equal the eigenvalues (about 5.56 and 1.44), so positive definite ⟺ all eigenvalues > 0; by hand, check that all leading principal minors are positive (4 > 0, det = 8 > 0). A positive-definite matrix factors as A = LLᵀ with L lower triangular and positive on the diagonal, here L = [[2, 0], [1, √2]]. Cholesky solves systems at about half the cost of LU, and its failure doubles as a test that a matrix is not positive definite. A positive-definite Hessian marks a local minimum, which convex optimization and Newton’s method rely on. Covariance matrices are positive semidefinite (≥ 0), and their Cholesky factor turns independent normal samples into correlated ones.', sPosDef())]
} };
})();

window.UX = page([
  sec('la-eq', '연립방정식', 'Systems', '연립방정식과 행렬', 'Linear systems and matrices',
    '소거법으로 방정식을 풀고, 그 과정을 행렬로 기록해요.', 'Solve systems by elimination and record the steps as matrices.', [
    item('la-system', '연립일차방정식과 해', 'Linear systems and solutions', 'Ax = b 꼴의 연립일차방정식이에요. 변수가 두 개면 직선 두 개의 교점을 찾는 문제이고, 해는 0개·1개·무수히 많음 중 하나예요.', '해가 있을 조건: rank A = rank [A | b]. 해가 하나뿐이려면 여기에 rank A = 변수 개수. 예: x + y = 4, x − y = 0 → (2, 2) 하나 · x + y = 4, x + y = 2 → 해 없음 · x + y = 4, 2x + 2y = 8 → 무수히 많음. 동차계 Ax = 0은 항상 x = 0을 해로 가져요.', 'A system Ax = b. With two unknowns it is two lines meeting; there are always 0, 1 or infinitely many solutions.', 'Consistent iff rank A = rank [A | b]; unique iff in addition rank A equals the number of unknowns. x + y = 4, x − y = 0 → one solution (2, 2); x + y = 4, x + y = 2 → none; x + y = 4, 2x + 2y = 8 → infinitely many. A homogeneous system Ax = 0 always has x = 0.', sSystem()),
    item('la-gauss', '가우스 소거법', 'Gaussian elimination', '첨가행렬 [A | b]에 기본 행 연산(교환, 상수배, 다른 행의 배수 더하기)을 해서 행사다리꼴로 만든 뒤 아래에서부터 대입해요.', '예: x + y + z = 6, 2x + y − z = 1, x − y + 2z = 5 → R₂ − 2R₁, R₃ − R₁, R₃ − 2R₂ → 7z = 21 → (x, y, z) = (1, 2, 3). 행 연산은 해를 바꾸지 않아요. 계산량은 약 ⅔n³번이에요.', 'Apply elementary row operations (swap, scale, add a multiple of another row) to [A | b] until it is in echelon form, then back-substitute.', 'x + y + z = 6, 2x + y − z = 1, x − y + 2z = 5: R₂ − 2R₁, R₃ − R₁, R₃ − 2R₂ give 7z = 21, so (x, y, z) = (1, 2, 3). Row operations never change the solution set. Cost is about ⅔n³ operations.', sGauss()),
    item('la-rref', '기약 행사다리꼴과 자유변수', 'Reduced echelon form and free variables', '각 행의 첫 0 아닌 성분(피벗)이 1이고 피벗 열의 나머지가 모두 0인 꼴(RREF)이에요. 피벗이 없는 열의 변수는 자유변수가 돼요.', '예: [1 2 0 1 | 3; 0 0 1 2 | 1] → x₂ = s, x₄ = t로 두면 x = (3, 0, 1, 0) + s(−2, 1, 0, 0) + t(−1, 0, −2, 1). 일반해 = 특수해 + 동차해(영공간). RREF는 행렬마다 하나로 정해져요.', 'Every pivot is 1 and is the only nonzero entry in its column. Variables in columns without a pivot are free.', '[1 2 0 1 | 3; 0 0 1 2 | 1] with x₂ = s, x₄ = t gives x = (3, 0, 1, 0) + s(−2, 1, 0, 0) + t(−1, 0, −2, 1). General solution = particular solution + null space. Each matrix has exactly one RREF.', sRref()),
    item('la-matmul', '행렬 곱셈', 'Matrix multiplication', 'AB의 (i, j) 성분은 A의 i행과 B의 j열의 내적이에요. (m×n)(n×p) = m×p로, 가운데 크기가 같아야 곱할 수 있어요.', '예: [1 2 0; −1 3 1]·[2 1; 0 −1; 4 2] = [2 −1; 2 −2]. 결합법칙 (AB)C = A(BC)와 분배법칙은 성립하지만 AB ≠ BA가 보통이고, AB = 0이어도 A, B가 0이 아닐 수 있어요. AB의 각 열 = A × (B의 열).', 'Entry (i, j) of AB is the dot product of row i of A with column j of B. (m×n)(n×p) = m×p, so the inner sizes must match.', '[1 2 0; −1 3 1]·[2 1; 0 −1; 4 2] = [2 −1; 2 −2]. Associative and distributive, but usually AB ≠ BA, and AB = 0 is possible with A, B nonzero. Each column of AB is A times a column of B.', sMatmul()),
    item('la-inverse', '역행렬', 'Inverse matrix', 'AA⁻¹ = A⁻¹A = I인 행렬이에요. [A | I]에 가우스-조던 소거를 해서 [I | A⁻¹]을 얻어요. det A ≠ 0일 때만 있어요.', '2×2: [a b; c d]⁻¹ = 1/(ad − bc)·[d −b; −c a]. 예: [2 1; 5 3]⁻¹ = [3 −1; −5 2]. 성질: (AB)⁻¹ = B⁻¹A⁻¹, (Aᵀ)⁻¹ = (A⁻¹)ᵀ. 가역행렬 정리: 가역 ⟺ det ≠ 0 ⟺ rank n ⟺ Ax = 0의 해가 0뿐 ⟺ 0이 고윳값이 아님.', 'The matrix with AA⁻¹ = A⁻¹A = I. Row-reduce [A | I] to [I | A⁻¹]; it exists only when det A ≠ 0.', '2×2: [a b; c d]⁻¹ = 1/(ad − bc)·[d −b; −c a]; e.g. [2 1; 5 3]⁻¹ = [3 −1; −5 2]. (AB)⁻¹ = B⁻¹A⁻¹ and (Aᵀ)⁻¹ = (A⁻¹)ᵀ. Invertible ⟺ det ≠ 0 ⟺ rank n ⟺ Ax = 0 has only x = 0 ⟺ 0 is not an eigenvalue.', sInverse()),
    item('la-lu', 'LU 분해', 'LU factorization', '소거 과정을 기록해 A = LU로 나눠요. U는 소거 결과인 위삼각행렬, L은 소거에 쓴 배수를 담은 아래삼각행렬이에요.', '예: [2 1 1; 4 3 3; 8 7 9] = [1 0 0; 2 1 0; 4 3 1]·[2 1 1; 0 1 1; 0 0 2]. Ax = b는 Ly = b(전진 대입), Ux = y(후진 대입)로 풀어요. b만 바뀌는 문제를 여러 번 풀 때 빨라요. 기본행렬 E를 곱하는 것 = 행 연산 하나.', 'Record elimination as A = LU: U is the upper-triangular result and L, lower triangular, stores the multipliers used.', '[2 1 1; 4 3 3; 8 7 9] = [1 0 0; 2 1 0; 4 3 1]·[2 1 1; 0 1 1; 0 0 2]. Solve Ax = b by Ly = b (forward) then Ux = y (back). Fast when b changes but A does not. Multiplying by an elementary matrix E is one row operation.', sLU()),
    item('la-transpose', '전치와 대칭행렬', 'Transpose and symmetric matrices', 'Aᵀ는 행과 열을 바꾼 행렬로, 주대각선을 기준으로 뒤집은 모양이에요. Aᵀ = A이면 대칭행렬이에요.', '(Aᵀ)ᵀ = A, (A + B)ᵀ = Aᵀ + Bᵀ, (AB)ᵀ = BᵀAᵀ(순서 반대). AᵀA와 AAᵀ는 항상 대칭이에요. 내적은 x·y = xᵀy로 쓸 수 있어요. Aᵀ = −A이면 반대칭(대각 성분 0).', 'Aᵀ swaps rows and columns, mirroring A across its main diagonal. If Aᵀ = A, A is symmetric.', '(Aᵀ)ᵀ = A, (A + B)ᵀ = Aᵀ + Bᵀ and (AB)ᵀ = BᵀAᵀ (order reversed). AᵀA and AAᵀ are always symmetric. The dot product is x·y = xᵀy. Aᵀ = −A means skew-symmetric (zero diagonal).', sTranspose())
  ].concat(XT.add['la-eq'] || [])),
  sec('la-dt', '행렬식', 'Determinants', '행렬식', 'Determinants',
    '정사각행렬을 숫자 하나로 요약해요. 넓이·부피가 몇 배가 되는지예요.', 'One number per square matrix: how much it scales area or volume.', [
    item('la-det2', '행렬식의 의미', 'What a determinant means', 'det A는 A가 넓이(3차원이면 부피)를 몇 배로 만드는지예요. 음수면 방향이 뒤집히고, 0이면 한 차원이 찌그러져 역행렬이 없어요.', '2×2: det [a b; c d] = ad − bc. 예: [3 1; 1 2] → 5배, [1 2; 2 1] → −3(뒤집힘), [1 ½; 2 1] → 0. 두 벡터가 만드는 평행사변형 넓이 = |det [u v]|, 세 벡터의 평행육면체 부피 = |det [u v w]|.', 'det A is the factor by which A scales area (volume in 3D). Negative means orientation flips; zero means a dimension collapses and A has no inverse.', '2×2: det [a b; c d] = ad − bc. [3 1; 1 2] scales by 5, [1 2; 2 1] by −3 (flipped), [1 ½; 2 1] by 0. The parallelogram spanned by u, v has area |det [u v]|; three vectors give volume |det [u v w]|.', sDet2()),
    item('la-cofactor', '여인수 전개', 'Cofactor expansion', '한 행(또는 열)을 따라 성분 × 여인수를 더해 행렬식을 구해요. 여인수 Cᵢⱼ = (−1)ⁱ⁺ʲ × (i행과 j열을 지운 소행렬식)이에요.', '예: det [1 2 3; 0 1 4; 5 6 0] = 1·(0 − 24) − 2·(0 − 20) + 3·(0 − 5) = 1. 0이 많은 행·열을 고르면 계산이 줄어요. 3×3은 사루스 법칙도 가능하고, 삼각행렬은 대각 성분의 곱이에요.', 'Sum entry × cofactor along any row or column. The cofactor Cᵢⱼ = (−1)ⁱ⁺ʲ times the minor left after deleting row i and column j.', 'det [1 2 3; 0 1 4; 5 6 0] = 1·(0 − 24) − 2·(0 − 20) + 3·(0 − 5) = 1. Expand along the row or column with the most zeros. For 3×3, Sarrus’ rule also works; a triangular matrix’s determinant is the product of its diagonal.', sCofactor()),
    item('la-detprops', '행렬식의 성질', 'Properties of determinants', '행 교환은 부호를 바꾸고, 한 행을 k배하면 행렬식도 k배, 한 행의 배수를 다른 행에 더하면 그대로예요. 그래서 소거로 삼각행렬을 만들어 계산할 수 있어요.', 'det(AB) = det A·det B, det Aᵀ = det A, det A⁻¹ = 1/det A, det(kA) = kⁿ det A (n×n). 두 행이 같거나 한 행이 0이면 det = 0. 주의: det(A + B) ≠ det A + det B.', 'Swapping rows flips the sign, scaling a row by k scales det by k, and adding a multiple of one row to another changes nothing, so elimination to triangular form computes it.', 'det(AB) = det A·det B, det Aᵀ = det A, det A⁻¹ = 1/det A, det(kA) = kⁿ det A for n×n. Two equal rows or a zero row give det = 0. Beware: det(A + B) ≠ det A + det B.', sDetProps()),
    item('la-cramer', '크래머 공식과 수반행렬', 'Cramer’s rule and the adjugate', 'det A ≠ 0이면 xᵢ = det Aᵢ / det A로 해를 바로 써요. Aᵢ는 A의 i번째 열을 b로 바꾼 행렬이에요.', '예: 2x + y = 5, x + 3y = 5 → det A = 5, det A₁ = 10, det A₂ = 5 → (x, y) = (2, 1). 역행렬 공식 A⁻¹ = adj A / det A (adj A = 여인수 행렬의 전치). 이론에는 좋지만 큰 n에서는 소거법이 훨씬 빨라요.', 'If det A ≠ 0, each unknown is xᵢ = det Aᵢ / det A, where Aᵢ is A with column i replaced by b.', '2x + y = 5, x + 3y = 5: det A = 5, det A₁ = 10, det A₂ = 5, so (x, y) = (2, 1). Likewise A⁻¹ = adj A / det A, with adj A the transposed cofactor matrix. Elegant in theory; elimination is far faster for large n.', sCramer())
  ].concat(XT.add['la-dt'] || [])),
  sec('la-vs', '벡터 공간', 'Vector spaces', '벡터 공간', 'Vector spaces',
    '일차결합, 독립, 기저와 차원, 그리고 행렬이 만드는 부분공간이에요.', 'Linear combinations, independence, bases and dimension, and the subspaces a matrix creates.', [
    item('la-lincomb', '벡터와 일차결합', 'Vectors and linear combinations', '벡터에 스칼라를 곱해 더한 c₁v₁ + c₂v₂ + … + cₖvₖ가 일차결합이에요. 화살표를 꼬리에 머리를 이어 붙이는 것과 같아요.', '예: u = (2, 1), w = (−1, 1)이면 u + 2w = (0, 3). 반대로 "b가 일차결합인가?"는 [u w]c = b를 푸는 문제예요. Ax는 A의 열들의 일차결합이에요: Ax = x₁a₁ + … + xₙaₙ.', 'Scale vectors and add them: c₁v₁ + … + cₖvₖ. Geometrically, chain the arrows head to tail.', 'With u = (2, 1) and w = (−1, 1), u + 2w = (0, 3). Asking whether b is a combination means solving [u w]c = b. Ax is a combination of A’s columns: Ax = x₁a₁ + … + xₙaₙ.', sLincomb()),
    item('la-span', '생성 (span)', 'Span', '벡터들의 모든 일차결합의 집합이에요. 벡터 하나는 직선, 평행하지 않은 두 개는 평면을 생성해요.', '평행한 벡터를 더해도 span은 커지지 않아요. R³에서 세 벡터가 공간 전체를 생성 ⟺ det [v₁ v₂ v₃] ≠ 0. span은 항상 원점을 지나는 부분공간이에요. Ax = b가 모든 b에 대해 풀림 ⟺ A의 열이 Rᵐ을 생성.', 'The set of all linear combinations. One vector spans a line; two non-parallel vectors span a plane.', 'Adding a parallel vector does not enlarge the span. Three vectors span R³ iff det [v₁ v₂ v₃] ≠ 0. A span is always a subspace through the origin. Ax = b is solvable for every b iff A’s columns span Rᵐ.', sSpan()),
    item('la-indep', '일차독립과 종속', 'Linear independence', 'c₁v₁ + … + cₖvₖ = 0을 만드는 방법이 모든 cᵢ = 0뿐이면 일차독립, 아니면 종속이에요. 종속이면 어떤 벡터가 나머지의 일차결합이에요.', '판정: [v₁ … vₖ]c = 0을 소거 → 자유변수가 없으면 독립. 정사각이면 det ≠ 0 ⟺ 독립. 예: (1, 0), (1, 2), (3, 4)는 v₁ + 2v₂ − v₃ = 0이라 종속. Rⁿ에서 n개보다 많은 벡터는 항상 종속이고, 0벡터가 있어도 종속이에요.', 'Independent if c₁v₁ + … + cₖvₖ = 0 forces every cᵢ = 0; otherwise dependent, and some vector is a combination of the others.', 'Row-reduce [v₁ … vₖ]c = 0: no free variables means independent; for square matrices, det ≠ 0. (1, 0), (1, 2), (3, 4) are dependent since v₁ + 2v₂ − v₃ = 0. More than n vectors in Rⁿ, or any set containing 0, is dependent.', sIndep()),
    item('la-subspace', '벡터 공간과 부분공간', 'Vector spaces and subspaces', '덧셈과 스칼라배가 정의되고 8가지 공리를 만족하는 집합이 벡터 공간이에요. 그 안에서 0을 포함하고 덧셈·스칼라배에 닫힌 부분집합이 부분공간이에요.', 'R²의 부분공간: {0}, 원점을 지나는 직선, R² 전체. y = x/2 + 2처럼 원점을 안 지나면 아니에요. 다항식 공간 Pₙ, 행렬 공간 Mₘₓₙ, 연속함수 공간도 벡터 공간이에요. Ax = 0의 해집합은 부분공간, Ax = b(b ≠ 0)는 아니에요.', 'A set with addition and scalar multiplication obeying eight axioms is a vector space; a subset containing 0 and closed under both operations is a subspace.', 'Subspaces of R²: {0}, lines through the origin, and R² itself; y = x/2 + 2 is not one. Polynomials Pₙ, matrices Mₘₓₙ and continuous functions are vector spaces too. Solutions of Ax = 0 form a subspace; solutions of Ax = b with b ≠ 0 do not.', sSubspace()),
    item('la-basis', '기저, 차원, 좌표', 'Basis, dimension and coordinates', '공간을 생성하면서 일차독립인 벡터 집합이 기저예요. 기저 벡터의 개수가 차원이고, 기저에 대한 계수가 좌표예요.', '예: B = {(2, 1), (1, 2)}에서 v = (4, 5) = 1·b₁ + 2·b₂ → [v]_B = (1, 2). 좌표변환: v = P_B[v]_B, P_B = [b₁ b₂]. dim Rⁿ = n, dim Pₙ = n + 1, dim Mₘₓₙ = mn. n차원에서 독립인 벡터 n개는 자동으로 기저예요.', 'An independent set that spans the space is a basis; the number of vectors is the dimension, and the coefficients are coordinates.', 'With B = {(2, 1), (1, 2)}, v = (4, 5) = 1·b₁ + 2·b₂, so [v]_B = (1, 2). Change of coordinates: v = P_B[v]_B with P_B = [b₁ b₂]. dim Rⁿ = n, dim Pₙ = n + 1, dim Mₘₓₙ = mn. Any n independent vectors in an n-dimensional space form a basis.', sBasis()),
    item('la-nullcol', '영공간과 열공간', 'Null space and column space', '영공간 Nul A는 Ax = 0의 해 전체, 열공간 Col A는 A의 열들이 생성하는 공간(= 가능한 모든 Ax)이에요.', '예: A = [1 2; 2 4] → Col A = span{(1, 2)}, Nul A = span{(−2, 1)}. Ax = b는 b ∈ Col A일 때만 풀려요. 기저 구하기: Col A는 원래 A의 피벗 열, Nul A는 RREF에서 자유변수마다 벡터 하나, 행공간 Row A는 RREF의 0이 아닌 행.', 'Nul A is every solution of Ax = 0; Col A is the span of A’s columns, i.e. every possible Ax.', 'A = [1 2; 2 4]: Col A = span{(1, 2)}, Nul A = span{(−2, 1)}. Ax = b is solvable iff b ∈ Col A. Bases: pivot columns of the original A for Col A; one vector per free variable for Nul A; nonzero rows of the RREF for Row A.', sNullcol()),
    item('la-rank', '계수와 차원 정리', 'Rank and the rank–nullity theorem', 'rank A = 피벗 개수 = dim Col A = dim Row A예요. 열 개수 n = rank + nullity(영공간의 차원)가 항상 성립해요.', '예: 3×5 RREF에 피벗 3개 → rank 3, nullity 2, 3 + 2 = 5. rank A = rank Aᵀ. rank(AB) ≤ min(rank A, rank B). n×n에서 rank = n ⟺ 가역. 선형변환으로 쓰면 dim V = dim ker T + dim Im T예요.', 'rank A = number of pivots = dim Col A = dim Row A, and the number of columns n = rank + nullity (dimension of the null space).', 'A 3×5 RREF with 3 pivots has rank 3 and nullity 2: 3 + 2 = 5. rank A = rank Aᵀ; rank(AB) ≤ min(rank A, rank B); an n×n matrix is invertible iff its rank is n. For maps: dim V = dim ker T + dim Im T.', sRank()),
    item('la-four', '네 가지 기본 부분공간', 'The four fundamental subspaces', 'm×n 행렬 A는 Rⁿ에 행공간과 영공간, Rᵐ에 열공간과 좌영공간을 만들어요. 같은 공간 안의 두 부분공간은 서로 직교해요.', '차원: 행공간 r, 영공간 n − r, 열공간 r, 좌영공간 m − r. Row A ⟂ Nul A, Col A ⟂ Nul Aᵀ. 모든 x = xᵣ + xₙ로 나뉘고 Ax = Axᵣ. A는 행공간과 열공간을 일대일로 이어요. 사영·최소제곱의 기본 그림이에요.', 'An m×n matrix creates the row space and null space in Rⁿ and the column space and left null space in Rᵐ; the pairs in the same space are orthogonal.', 'Dimensions r, n − r, r and m − r. Row A ⟂ Nul A and Col A ⟂ Nul Aᵀ. Every x splits as xᵣ + xₙ with Ax = Axᵣ, and A maps the row space one-to-one onto the column space. The big picture behind projections and least squares.', sFour())
  ].concat(XT.add['la-vs'] || [])),
  sec('la-tr', '선형변환', 'Transformations', '선형변환', 'Linear transformations',
    '행렬은 평면과 공간을 옮기는 함수예요.', 'A matrix is a function that moves the plane or space.', [
    item('la-lintrans', '선형변환과 표준행렬', 'Linear maps and their matrices', 'T(u + v) = T(u) + T(v), T(cv) = cT(v)를 만족하는 변환이에요. Rⁿ → Rᵐ 선형변환은 모두 행렬 곱 T(x) = Ax로 쓸 수 있어요.', '표준행렬의 열 = 표준기저의 상: A = [T(e₁) … T(eₙ)]. 예: T(e₁) = (2, 1), T(e₂) = (1, 1)이면 A = [2 1; 1 1], T(1, 2) = (4, 3). 원점은 고정되고 직선은 직선으로, 평행한 격자는 평행·등간격으로 옮겨져요.', 'A map with T(u + v) = T(u) + T(v) and T(cv) = cT(v). Every linear map Rⁿ → Rᵐ is multiplication by a matrix, T(x) = Ax.', 'The columns of the standard matrix are the images of the basis vectors: A = [T(e₁) … T(eₙ)]. With T(e₁) = (2, 1), T(e₂) = (1, 1), A = [2 1; 1 1] and T(1, 2) = (4, 3). The origin stays put; lines stay lines and the grid stays parallel and evenly spaced.', sLintrans()),
    item('la-geom', '회전·반사·전단·투영', 'Rotation, reflection, shear, projection', '평면의 대표적인 선형변환을 행렬로 나타내요. 열 두 개만 보면 î와 ĵ가 어디로 가는지 바로 알 수 있어요.', '회전 R(θ) = [cos θ −sin θ; sin θ cos θ], x축 반사 [1 0; 0 −1], y = x 반사 [0 1; 1 0], 전단 [1 k; 0 1], x축 투영 [1 0; 0 0], 확대 [k 0; 0 k]. 회전 det = 1, 반사 det = −1, 투영 det = 0(역행렬 없음).', 'The standard linear maps of the plane as matrices; the two columns tell you where î and ĵ land.', 'Rotation R(θ) = [cos θ −sin θ; sin θ cos θ]; reflection in the x-axis [1 0; 0 −1], in y = x [0 1; 1 0]; shear [1 k; 0 1]; projection onto the x-axis [1 0; 0 0]; scaling [k 0; 0 k]. Rotations have det 1, reflections −1, projections 0 (not invertible).', sGeom()),
    item('la-compose', '합성과 행렬 곱의 순서', 'Composition and order', '변환을 차례로 적용하면 행렬을 곱한 것과 같아요. B 다음 A를 적용하면 AB이고, 오른쪽 행렬이 먼저 작용해요.', '예: 회전 R = [0 −1; 1 0], 전단 S = [1 1; 0 1] → SR = [1 −1; 1 0], RS = [0 −1; 1 1]로 결과가 달라요. (AB)⁻¹ = B⁻¹A⁻¹(양말 신고 신발 신은 걸 벗듯 역순). 회전끼리는 R(α)R(β) = R(α + β)라 순서와 무관해요.', 'Applying maps in turn multiplies their matrices: B then A is AB, and the rightmost matrix acts first.', 'Rotation R = [0 −1; 1 0] and shear S = [1 1; 0 1]: SR = [1 −1; 1 0] but RS = [0 −1; 1 1]. (AB)⁻¹ = B⁻¹A⁻¹ (undo in reverse, like shoes and socks). Rotations commute: R(α)R(β) = R(α + β).', sCompose()),
    item('la-kerim', '핵과 상, 단사와 전사', 'Kernel, image, one-to-one and onto', '핵 ker T는 0으로 가는 벡터 전체, 상 Im T는 실제로 도달하는 벡터 전체예요. 행렬이면 각각 영공간과 열공간이에요.', '차원 정리 dim V = dim ker T + dim Im T. 단사 ⟺ ker T = {0} ⟺ A의 열이 독립. 전사 ⟺ Im T = W ⟺ A의 열이 Rᵐ 생성. 둘 다면 동형사상(역변환 존재). 차원이 같은 공간끼리는 단사 ⟺ 전사.', 'The kernel is everything sent to 0; the image is everything actually reached. For a matrix these are the null space and column space.', 'dim V = dim ker T + dim Im T. One-to-one ⟺ ker T = {0} ⟺ independent columns; onto ⟺ Im T = W ⟺ columns span Rᵐ; both means an isomorphism with an inverse. Between spaces of equal dimension, one-to-one ⟺ onto.', sKerIm())
  ].concat(XT.add['la-tr'] || [])),
  sec('la-ev', '고윳값', 'Eigenvalues', '고윳값과 고유벡터', 'Eigenvalues and eigenvectors',
    '변환해도 방향이 그대로인 벡터와, 그것으로 행렬을 단순하게 만드는 법이에요.', 'Vectors that keep their direction, and how they simplify a matrix.', [
    item('la-eigen', '고윳값과 고유벡터', 'Eigenvalues and eigenvectors', 'Av = λv를 만족하는 0이 아닌 벡터 v가 고유벡터, λ가 고윳값이에요. 변환 후에도 같은 직선 위에 남고 길이만 λ배가 돼요.', '예: A = [2 1; 1 2] → (1, 1)은 3배, (1, −1)은 그대로(λ = 1). 고윳값 0 ⟺ 비가역. 삼각행렬의 고윳값 = 대각 성분. Aᵏ의 고윳값 = λᵏ, A⁻¹의 고윳값 = 1/λ. 같은 λ의 고유벡터와 0을 모으면 고유공간이에요.', 'A nonzero v with Av = λv is an eigenvector with eigenvalue λ: after the map it stays on its own line, just scaled by λ.', 'A = [2 1; 1 2] triples (1, 1) and leaves (1, −1) unchanged (λ = 1). λ = 0 ⟺ A is singular. Triangular matrices have their diagonal as eigenvalues. Aᵏ has eigenvalues λᵏ and A⁻¹ has 1/λ. Eigenvectors for one λ plus 0 form its eigenspace.', sEigen()),
    item('la-charpoly', '특성방정식', 'Characteristic equation', 'Av = λv ⟺ (A − λI)v = 0에 0 아닌 해가 있음 ⟺ det(A − λI) = 0이에요. 이 다항식의 근이 고윳값이에요.', '예: A = [2 1; 1 2] → (2 − λ)² − 1 = λ² − 4λ + 3 = 0 → λ = 1, 3. λ = 3: (A − 3I)v = 0 → v = (1, 1). 2×2는 λ² − (tr A)λ + det A = 0. 고윳값의 합 = tr A, 곱 = det A. 대수적 중복도 ≥ 기하적 중복도.', 'Av = λv has a nonzero solution exactly when det(A − λI) = 0; the roots of this polynomial are the eigenvalues.', 'A = [2 1; 1 2]: (2 − λ)² − 1 = λ² − 4λ + 3 = 0 gives λ = 1, 3; for λ = 3, (A − 3I)v = 0 gives v = (1, 1). For 2×2, λ² − (tr A)λ + det A = 0. The eigenvalues sum to tr A and multiply to det A. Algebraic multiplicity ≥ geometric multiplicity.', sCharpoly()),
    item('la-diag', '대각화', 'Diagonalization', '고유벡터를 열로 모은 P와 고윳값을 대각에 둔 D로 A = PDP⁻¹이라 써요. 고유벡터 좌표계에서 보면 A는 축 방향으로 늘이기만 해요.', '조건: 일차독립인 고유벡터 n개(서로 다른 고윳값 n개면 충분). 활용: Aᵏ = PDᵏP⁻¹. 예: A = [2 1; 1 2] = P diag(3, 1) P⁻¹, P = [1 −1; 1 1] → A¹⁰ = P diag(3¹⁰, 1) P⁻¹. B = P⁻¹AP이면 A와 B는 닮음(고윳값·행렬식·대각합이 같음).', 'Put eigenvectors in P and eigenvalues on the diagonal of D: A = PDP⁻¹. In eigenvector coordinates A just stretches along the axes.', 'Needs n independent eigenvectors (n distinct eigenvalues suffice). Then Aᵏ = PDᵏP⁻¹: A = [2 1; 1 2] = P diag(3, 1) P⁻¹ with P = [1 −1; 1 1], so A¹⁰ = P diag(3¹⁰, 1) P⁻¹. A and B = P⁻¹AP are similar: same eigenvalues, determinant and trace.', sDiag()),
    item('la-markov', '거듭제곱과 마르코프 연쇄', 'Powers and Markov chains', '확률 벡터에 전이행렬을 반복해서 곱하면 고윳값 1의 고유벡터(정상상태)로 수렴해요. 나머지 고윳값의 크기가 수렴 속도를 정해요.', '예: M = [0.9 0.2; 0.1 0.8], x₀ = (0, 1) → x₁ = (0.2, 0.8) → … → (2/3, 1/3). 고윳값이 1, 0.7이라 오차가 0.7ᵏ로 줄어요. 정상상태는 (M − I)q = 0을 풀고 성분 합을 1로 맞춰요. 웹페이지 순위(PageRank)도 같은 원리예요.', 'Multiplying a probability vector by a transition matrix again and again converges to the eigenvector for λ = 1, the steady state; the other eigenvalues set the speed.', 'M = [0.9 0.2; 0.1 0.8], x₀ = (0, 1): x₁ = (0.2, 0.8), …, → (2/3, 1/3). With λ = 1 and 0.7 the error shrinks like 0.7ᵏ. Solve (M − I)q = 0 and scale q to sum to 1. PageRank works the same way.', sMarkov()),
    item('la-symmetric', '대칭행렬과 직교대각화', 'Symmetric matrices and the spectral theorem', '실대칭행렬은 고윳값이 모두 실수이고, 서로 다른 고윳값의 고유벡터가 직교해요. 그래서 직교행렬 Q로 A = QΛQᵀ처럼 대각화돼요.', '예: A = [3 1; 1 3] → λ = 4, 2, 고유벡터 (1, 1), (1, −1)이 수직. 단위원은 축이 고유벡터 방향인 타원이 돼요. 스펙트럼 분해 A = λ₁q₁q₁ᵀ + λ₂q₂q₂ᵀ. 공분산 행렬, 이차형식, PCA의 바탕이에요.', 'A real symmetric matrix has real eigenvalues and orthogonal eigenvectors for distinct eigenvalues, so it diagonalizes with an orthogonal matrix: A = QΛQᵀ.', 'A = [3 1; 1 3] has λ = 4, 2 with perpendicular eigenvectors (1, 1) and (1, −1); the unit circle becomes an ellipse with those axes. Spectral decomposition: A = λ₁q₁q₁ᵀ + λ₂q₂q₂ᵀ. The basis of covariance matrices, quadratic forms and PCA.', sSymmetric()),
    item('la-complex', '복소 고윳값', 'Complex eigenvalues', '실행렬의 고윳값이 a ± bi로 나오면 실수 고유벡터가 없어요. 이 행렬은 회전과 확대·축소를 합친 변환이에요.', '[a −b; b a] = r[cos θ −sin θ; sin θ cos θ], r = √(a² + b²) = |λ|, θ = arg λ. 예: [0.9 −0.3; 0.3 0.9] → λ = 0.9 ± 0.3i, |λ| ≈ 0.95라 18.4°씩 돌며 안쪽으로 감겨요. |λ| > 1이면 바깥으로 발산, |λ| = 1이면 원을 그려요.', 'When a real matrix has eigenvalues a ± bi there is no real eigenvector; the map rotates and scales at once.', '[a −b; b a] = r[cos θ −sin θ; sin θ cos θ] with r = √(a² + b²) = |λ| and θ = arg λ. [0.9 −0.3; 0.3 0.9] has λ = 0.9 ± 0.3i and |λ| ≈ 0.95, so points spiral inward 18.4° per step; |λ| > 1 spirals outward and |λ| = 1 circles.', sComplex())
  ].concat(XT.add['la-ev'] || [])),
  sec('la-or', '직교성', 'Orthogonality', '내적과 직교성', 'Inner products and orthogonality',
    '길이와 각도, 사영, 정규직교기저, 최소제곱법이에요.', 'Length and angle, projections, orthonormal bases and least squares.', [
    item('la-dot', '내적, 길이, 각도', 'Dot product, length and angle', 'a·b = a₁b₁ + … + aₙbₙ = |a||b|cos θ예요. 길이는 |a| = √(a·a)이고, 내적이 0이면 두 벡터는 직교해요.', '예: a = (3, 4), b = (4, 0) → a·b = 12, |a| = 5, |b| = 4, cos θ = 0.6. 코시-슈바르츠 |a·b| ≤ |a||b|, 삼각부등식 |a + b| ≤ |a| + |b|. 단위벡터 a/|a|. 일반 내적공간에서는 ⟨f, g⟩ = ∫fg dx 같은 내적도 써요.', 'a·b = a₁b₁ + … + aₙbₙ = |a||b|cos θ. Length is |a| = √(a·a), and a zero dot product means the vectors are orthogonal.', 'a = (3, 4), b = (4, 0): a·b = 12, |a| = 5, |b| = 4, cos θ = 0.6. Cauchy–Schwarz |a·b| ≤ |a||b|; triangle inequality |a + b| ≤ |a| + |b|; unit vector a/|a|. General inner product spaces use products like ⟨f, g⟩ = ∫fg dx.', sDot()),
    item('la-proj', '직교 사영', 'Orthogonal projection', 'b를 직선(부분공간) 위의 가장 가까운 점 p로 내려요. 오차 e = b − p가 그 공간에 수직이 되는 점이 p예요.', '직선: p = (b·u / u·u)u, 사영행렬 P = uuᵀ/uᵀu. 예: u = (2, 1), b = (2, 4) → p = (3.2, 1.6), e = (−1.2, 2.4) ⟂ u. 부분공간 Col A: p = A(AᵀA)⁻¹Aᵀb. 정규직교기저면 p = (b·q₁)q₁ + … . P² = P, Pᵀ = P.', 'Drop b to the nearest point p on a line or subspace; p is where the error e = b − p is perpendicular to that space.', 'Onto a line: p = (b·u / u·u)u with P = uuᵀ/uᵀu; u = (2, 1), b = (2, 4) give p = (3.2, 1.6) and e = (−1.2, 2.4) ⟂ u. Onto Col A: p = A(AᵀA)⁻¹Aᵀb; with an orthonormal basis, p = (b·q₁)q₁ + … . P² = P and Pᵀ = P.', sProj()),
    item('la-gram', '그람-슈미트와 QR 분해', 'Gram–Schmidt and QR', '독립인 벡터들에서 앞 벡터 방향 성분을 차례로 빼고 길이를 1로 맞춰 정규직교기저를 만들어요. 이 과정을 행렬로 쓴 것이 A = QR이에요.', 'u₁ = v₁, u₂ = v₂ − (v₂·u₁ / u₁·u₁)u₁, … 후 eᵢ = uᵢ/|uᵢ|. 예: v₁ = (3, 1), v₂ = (2, 2) → u₂ = (−0.4, 1.2). Q = [e₁ e₂](QᵀQ = I), R = QᵀA는 위삼각행렬. 최소제곱은 Rx̂ = Qᵀb로 안정적으로 풀어요.', 'From independent vectors, subtract the components along earlier ones and normalize, giving an orthonormal basis; recorded as A = QR.', 'u₁ = v₁, u₂ = v₂ − (v₂·u₁ / u₁·u₁)u₁, …, then eᵢ = uᵢ/|uᵢ|. v₁ = (3, 1), v₂ = (2, 2) give u₂ = (−0.4, 1.2). Q = [e₁ e₂] with QᵀQ = I, and R = QᵀA is upper triangular. Least squares becomes the stable Rx̂ = Qᵀb.', sGram()),
    item('la-lsq', '최소제곱법', 'Least squares', 'Ax = b의 해가 없을 때 |Ax − b|²을 최소로 하는 x̂를 구해요. 정규방정식 AᵀAx̂ = Aᵀb를 풀면 돼요.', '예: 점 (0, 1), (1, 2), (2, 2), (3, 4)에 y = c₀ + c₁x 맞추기 → AᵀA = [4 6; 6 14], Aᵀb = (9, 18) → y = 0.9 + 0.9x(오차² 합 0.7). 기하적으로 Ax̂는 b를 Col A에 사영한 점이고 잔차는 Col A에 수직이에요. 선형회귀의 원리예요.', 'When Ax = b has no solution, find x̂ minimizing |Ax − b|² by solving the normal equations AᵀAx̂ = Aᵀb.', 'Fitting y = c₀ + c₁x to (0, 1), (1, 2), (2, 2), (3, 4): AᵀA = [4 6; 6 14], Aᵀb = (9, 18), so y = 0.9 + 0.9x with squared error 0.7. Geometrically Ax̂ is the projection of b onto Col A and the residual is perpendicular to it. This is linear regression.', sLsq()),
    item('la-orthmat', '직교행렬', 'Orthogonal matrices', '열벡터들이 정규직교인 정사각행렬이에요. QᵀQ = I라서 Q⁻¹ = Qᵀ이고, 길이와 각도를 그대로 지켜요.', '|Qx| = |x|, Qx·Qy = x·y, det Q = ±1(회전 +1, 반사 −1). 예: R(30°), y = x 반사 [0 1; 1 0]. 전단 [1 1; 0 1]은 직교행렬이 아니라 원을 타원으로 바꿔요. 직교행렬끼리의 곱도 직교행렬이고, 수치 계산에서 오차를 키우지 않아요.', 'A square matrix with orthonormal columns: QᵀQ = I, so Q⁻¹ = Qᵀ, and it preserves lengths and angles.', '|Qx| = |x|, Qx·Qy = x·y and det Q = ±1 (rotations +1, reflections −1): R(30°) and the reflection [0 1; 1 0] qualify; the shear [1 1; 0 1] does not and turns circles into ellipses. Products of orthogonal matrices are orthogonal, and they don’t amplify rounding error.', sOrthmat())
  ].concat(XT.add['la-or'] || [])),
  sec('la-qf', '이차형식·SVD', 'Quadratic forms & SVD', '이차형식과 특이값 분해', 'Quadratic forms and SVD',
    '대칭행렬이 그리는 곡선과, 모든 행렬을 회전·늘이기·회전으로 쪼개는 법이에요.', 'The curves symmetric matrices draw, and splitting any matrix into rotate, stretch, rotate.', [
    item('la-quadform', '이차형식과 양정치', 'Quadratic forms and definiteness', 'Q(x) = xᵀAx(A는 대칭)가 이차형식이에요. 고유벡터 방향(주축)으로 좌표를 바꾸면 교차항이 사라져 λ₁y₁² + λ₂y₂²가 돼요.', '예: 5x² + 4xy + 2y² → A = [5 2; 2 2], λ = 6, 1 → 6y₁² + y₂², 등위선은 타원. x² + 4xy + y²은 λ = 3, −1이라 쌍곡선. 양정치 ⟺ 모든 λ > 0 ⟺ 선행 주소행렬식이 모두 양수(5 > 0, det = 6 > 0). 다변수 극값의 2계 판정과 같은 원리예요.', 'Q(x) = xᵀAx with A symmetric. Rotating to the eigenvector axes (principal axes) removes the cross term: λ₁y₁² + λ₂y₂².', '5x² + 4xy + 2y² has A = [5 2; 2 2] with λ = 6, 1, giving 6y₁² + y₂² and elliptical level curves; x² + 4xy + y² has λ = 3, −1 and hyperbolas. Positive definite ⟺ all λ > 0 ⟺ all leading principal minors positive (5 > 0, det = 6 > 0). Same idea as the second-derivative test.', sQuad()),
    item('la-svd', '특이값 분해 (SVD)', 'Singular value decomposition', '모든 행렬은 A = UΣVᵀ로, 회전(Vᵀ) → 축 방향 늘이기(Σ) → 회전(U)으로 쪼갤 수 있어요. 단위원은 반지름이 특이값인 타원이 돼요.', 'σᵢ = √(AᵀA의 고윳값), V의 열 = AᵀA의 고유벡터, uᵢ = Avᵢ/σᵢ. 예: A = [3 0; 4 5] → σ = 3√5, √5. rank = 0 아닌 σ의 개수. 큰 σ k개만 남기면 최선의 rank-k 근사라 이미지 압축, PCA, 추천 시스템에 써요.', 'Every matrix factors as A = UΣVᵀ: rotate (Vᵀ), stretch along the axes (Σ), rotate (U). The unit circle becomes an ellipse whose semi-axes are the singular values.', 'σᵢ = √(eigenvalues of AᵀA), V’s columns are eigenvectors of AᵀA, and uᵢ = Avᵢ/σᵢ. A = [3 0; 4 5] has σ = 3√5 and √5. Rank = number of nonzero σ. Keeping the k largest gives the best rank-k approximation, used in image compression, PCA and recommenders.', sSvd())
  ].concat(XT.add['la-qf'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
window.UX[0].css += `
.la-b .in{font-weight:800;color:var(--ink)}
.la-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.la-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.la-xs .in{font-size:.56em}
.la-big .in{font-size:1.1em;font-weight:900;color:var(--ink)}
.la-m .in{font-size:.95em;font-weight:700;color:var(--ink)}
.la-ms .in{font-size:.8em;font-weight:700;color:var(--ink)}
.la-r .in{color:var(--danger);font-weight:800}
.la-g .in{color:var(--ok);font-weight:800}
.la-a .in{color:var(--accent);font-weight:800}
.la-w .in{color:var(--warn);font-weight:800}
.la-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em);border-right:.07em solid var(--line);border-bottom:.07em solid var(--line)}
.la-pg{background-image:linear-gradient(color-mix(in srgb,var(--accent) 45%,transparent) .09em,transparent .09em),linear-gradient(90deg,color-mix(in srgb,var(--accent) 45%,transparent) .09em,transparent .09em);border-right:.09em solid color-mix(in srgb,var(--accent) 45%,transparent);border-bottom:.09em solid color-mix(in srgb,var(--accent) 45%,transparent)}
.la-v,.la-sg{position:absolute;left:50%;top:50%;height:.2em;margin-top:-.1em;transform-origin:0 50%;background:var(--c);border-radius:.1em}
.la-v::after{content:"";position:absolute;right:.02em;top:50%;width:.55em;height:.55em;margin-top:-.29em;border:solid var(--c);border-width:.2em .2em 0 0;transform:rotate(45deg)}
.la-sq{position:absolute;background:color-mix(in srgb,var(--c) 30%,transparent);border:.1em solid var(--c)}
.la-ci{position:absolute;border-radius:50%;border:.16em solid var(--c)}
.la-dk{position:absolute;border-radius:50%;background:color-mix(in srgb,var(--c) 22%,transparent);border:.06em solid var(--c)}
.la-bx{display:grid!important;place-items:center;text-align:center}
.la-bx .in{font-size:.66em;font-weight:700;color:var(--ink);line-height:1.4}`;
})();
