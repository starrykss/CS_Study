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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'ph-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
  if (F.y0 <= 0 && F.y1 >= 0) hl(S, k + 'x', F.L, F.R, F.Y(0), 'ink-3', st, { w: .1, off: o.off });
  if (F.x0 <= 0 && F.x1 >= 0) vl(S, k + 'y', F.X(0), F.T, F.B, 'ink-3', st, { w: .1, off: o.off });
}
/* matrix [[a,b],[c,d]] (math, y up) as a CSS transform */

/* ---- physics helpers ---- */
const D2R = Math.PI / 180;
/* child html (positions in em from the parent's top-left) */
const KV = (x, y, len, ang, c, w = .2) => `<b class="ph-v" style="left:${r3(x)}em;top:${r3(y)}em;width:${r3(len)}em;height:${w}em;margin-top:-${w / 2}em;transform:rotate(${r3(-ang)}deg);--c:${cv(c)}"></b>`;
const KL = (x, y, len, ang, c, w = .14) => `<b class="ph-ln" style="left:${r3(x)}em;top:${r3(y)}em;width:${r3(len)}em;height:${w}em;margin-top:-${w / 2}em;transform:rotate(${r3(-ang)}deg);background:${cv(c)}"></b>`;
const KB = (x, y, w, h, css) => `<b class="ph-bx" style="left:${r3(x)}em;top:${r3(y)}em;width:${r3(w)}em;height:${r3(h)}em;${css || ''}"></b>`;
const KD = (x, y, r, c, css) => `<b class="ph-dt" style="left:${r3(x - r)}em;top:${r3(y - r)}em;width:${r3(2 * r)}em;height:${r3(2 * r)}em;background:${cv(c)};${css || ''}"></b>`;
const KT = (x, y, t, css) => `<b class="ph-tx" style="left:${r3(x)}em;top:${r3(y)}em;${css || ''}"><span>${t}</span></b>`;
/* an element holding children; transform-origin given in em from its top-left */
function wrap(S, k, x, y, w, h, html, o = {}) {
  S.el(k, { x, y, w, h, html, css: `transform-origin:${o.ox != null ? r3(o.ox) + 'em' : '50%'} ${o.oy != null ? r3(o.oy) + 'em' : '50%'};z-index:${o.z || 3}`, s: Object.assign(o.st ? hid() : {}, { transform: o.t0 || 'rotate(0deg)' }) });
  vis(S, k, o.st, o.off);
}
const rot = (S, k, st, a) => S.set(k, st, { transform: `rotate(${r3(-a)}deg)` });
const box = (S, k, x, y, w, h, color, label, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 40, st, { cls: 'cz-c ph-bl', html: label || '', css: `border:.12em solid var(--${color});z-index:${o.z || 3};${o.css || ''}`, off: o.off, r: o.r ?? .3 });
const chg = (S, k, x, y, sign, st, o = {}) => { node(S, k, x, y, sign > 0 ? '+' : '−', { r: o.r || 1, cls: 'cz-n ph-q', s: Object.assign(st ? hid() : {}, sign > 0 ? { background: tint('danger', 30), 'border-color': 'var(--danger)', color: 'var(--danger)' } : { background: tint('accent', 30), 'border-color': 'var(--accent)', color: 'var(--accent)' }) }); vis(S, k, st, o.off); };
const chgv = (S, k, st, off) => vis(S, k, st, off);
const ring = (S, k, cx, cy, r, color, st, o = {}) => { S.el(k, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, css: `border-radius:50%;border:${o.w || .12}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)};${o.fill ? `background:${o.fill};` : ''}${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const ell = (S, k, x, y, w, h, color, st, o = {}) => { S.el(k, { x, y, w, h, css: `border-radius:50%;border:${o.w || .12}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)};${o.fill ? `background:${o.fill};` : ''}${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
const poly2 = (S, k, pts, fill, st, o = {}) => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
  S.el(k, { x: x0, y: y0, w, h, css: `clip-path:polygon(${pts.map(([x, y]) => `${r3(x - x0)}em ${r3(y - y0)}em`).join(',')});background:${fill};${o.css || ''}`, s: st ? hid() : {} }); vis(S, k, st, o.off); };
/* move with an extra rotation kept */
const mvr = (S, k, st, dx, dy, a) => S.set(k, st, { transform: `translate(${r3(dx)}em,${r3(dy)}em) rotate(${r3(-(a || 0))}deg)` });
/* seeded random */
const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(42);
/* simplify a polyline (Ramer–Douglas–Peucker) */
function rdp(pts, eps) {
  if (pts.length < 3) return pts; let dmax = 0, idx = 0; const [a, b] = [pts[0], pts[pts.length - 1]], L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1e-9;
  for (let i = 1; i < pts.length - 1; i++) { const p = pts[i], d = Math.abs((b[0] - a[0]) * (a[1] - p[1]) - (a[0] - p[0]) * (b[1] - a[1])) / L; if (d > dmax) { dmax = d; idx = i; } }
  if (dmax <= eps) return [a, b]; return rdp(pts.slice(0, idx + 1), eps).slice(0, -1).concat(rdp(pts.slice(idx), eps));
}
const ax2 = (S, k, F, xl, yl) => { hl(S, k + 'x', F.L, F.R, F.Y(Math.max(F.y0, 0)), 'ink-3', 0, { w: .12 }); vl(S, k + 'y', F.X(Math.max(F.x0, 0)), F.T, F.B, 'ink-3', 0, { w: .12 });
  if (xl) T(S, k + 'xl', F.R - 2.4, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono ph-xs', 0, { w: 2.6 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono ph-xs'); };

/* ================= motion and forces ================= */
function sKin1d() {
  const S = scene({ id: 'ph-kin1d', steps: 5, per: 1.3 });
  const X0 = 2.2, sc = 1.6, Y = 4.4;
  T(S, 'h', 1.4, 1.2, 'a = 2 m/s², v₀ = 0', 'cz-mono ph-l');
  hl(S, 'tr', 1.4, 30.6, Y + 1.1, 'ink-3', 0, { w: .12 });
  [0, 4, 8, 12, 16].forEach(m => { vl(S, 'tk' + m, X0 + m * sc, Y + 1.1, Y + 1.6, 'ink-3', 0, { w: .1 }); T(S, 'tl' + m, X0 + m * sc - 1.2, Y + 1.8, m + ' m', 'cz-tc cz-mono ph-xs', 0, { w: 2.4 }); });
  [0, 1, 2, 3, 4].forEach(t => pt(S, 'g' + t, X0 + t * t * sc, Y + 1.1, t, C.cur, .24));
  box(S, 'car', X0 - .9, Y - .8, 1.8, 1.4, 'accent', '', 0, { pct: 60 });
  [1, 2, 3, 4].forEach(t => S.move('car', t, X0 + t * t * sc - .9, Y - .8));
  const F = fr(0, 4.6, 0, 9.4, 2.4, 15.6, 8.8, 18.6);
  poly2(S, 'ar', [[F.X(0), F.Y(0)], [F.X(4), F.Y(0)], [F.X(4), F.Y(8)]], tint('ok', 40), 4);
  ax2(S, 'ga', F, 't (s)', 'v (m/s)');
  [1, 2, 3, 4].forEach(t => { seg(S, 'v' + t, [F.X(t - 1), F.Y(2 * t - 2)], [F.X(t), F.Y(2 * t)], t, 'accent', .2); pt(S, 'vp' + t, F.X(t), F.Y(2 * t), t, C.cur, .28); });
  L(S, 'st', 17.4, 9.2, 14, 'cz-mono ph-l', [[1, 't = 1 s · x = 1 m · v = 2'], [2, 't = 2 s · x = 4 m · v = 4'], [3, 't = 3 s · x = 9 m · v = 6'], [4, 't = 4 s · x = 16 m · v = 8']]);
  T(S, 'f1', 17.4, 11.4, 'v = v₀ + at', 'cz-mono ph-l'); T(S, 'f2', 17.4, 12.9, 'x = v₀t + ½at²', 'cz-mono ph-l'); T(S, 'f3', 17.4, 14.4, 'v² = v₀² + 2ax', 'cz-mono ph-l');
  T(S, 'f4', 17.4, 16.6, ['v-t 넓이 = ½·4·8 = 16 m', 'area under v-t = 16 m'], 'ph-s ph-g', 4);
  T(S, 'f5', 17.4, 18, ['기울기 = 가속도 2 m/s²', 'slope = acceleration 2 m/s²'], 'ph-s ph-a', 5);
  S.cap(1, '1초마다 위치를 찍으면', 'Mark the position every second')
    .cap(2, '간격이 점점 벌어져요 · 속도가 일정하게 늘어요', 'The gaps widen: velocity grows steadily')
    .cap(3, '이동 거리는 시간의 제곱에 비례', 'Distance grows with the square of time')
    .cap(4, 'v-t 그래프 아래 넓이 = 변위', 'Area under the v-t graph = displacement')
    .cap(5, 'v-t 그래프의 기울기 = 가속도', 'Slope of the v-t graph = acceleration');
  return S;
}
function sProj() {
  const S = scene({ id: 'ph-proj', steps: 5, per: 1.35 });
  const F = fr(0, 44, 0, 20, 1.5, 30.5, 2.4, 16), v0 = 20, g = 9.8, c = Math.SQRT1_2, vx = v0 * c, Tf = 2 * vx / g, k = .16;
  hl(S, 'gr', 1, 31, F.Y(0), 'ink-3', 0, { w: .14 });
  T(S, 'h', 1.4, 1.2, 'v₀ = 20 m/s, θ = 45°', 'cz-mono ph-l');
  [30, 60].forEach(a => { const vv = v0 * Math.cos(a * D2R), vy = v0 * Math.sin(a * D2R); mplot(S, 'alt' + a + '_', F, t => [vv * t, vy * t - g * t * t / 2], 0, 2 * vy / g, { st: 5, color: 'ink-3', h: .1, n: 24 }); });
  mplot(S, 'path', F, t => [vx * t, vx * t - g * t * t / 2], 0, Tf, { st: i => i <= 6 ? 1 : i <= 15 ? 2 : 3, color: 'color-mix(in srgb,var(--accent) 50%,transparent)', h: .12, n: 30 });
  for (let i = 0; i <= 10; i++) { const t = Tf * i / 10, st = i <= 2 ? 1 : i <= 5 ? 2 : 3; mpt(S, 'b' + i, F, [vx * t, vx * t - g * t * t / 2], st, C.cur, .32); }
  const arr = (key, t, st, off) => { const x = vx * t, y = vx * t - g * t * t / 2, vy = vx - g * t, P = [F.X(x), F.Y(y)];
    ar(S, key + 'x', P, [P[0] + vx * k, P[1]], 'ok', st, { h: .2, off }); if (Math.abs(vy) > .5) ar(S, key + 'y', P, [P[0], P[1] - vy * k], 'warn', st, { h: .2, off }); };
  arr('a0', 0, 1, 2); arr('a1', Tf / 2, 2, 3); arr('a2', Tf, 3, 4);
  mT(S, 'top', F, [vx * Tf / 2, 10.2], -1.4, -1.6, 'v<sub>y</sub> = 0', 'cz-mono ph-s ph-w', 2, { off: 3 });
  T(S, 'k1', 21.4, 3, ['가로: 등속 v₀cosθ', 'horizontal: constant v₀cosθ'], 'ph-s ph-g', 1); T(S, 'k2', 21.4, 4.4, ['세로: 가속도 −g', 'vertical: acceleration −g'], 'ph-s ph-w', 1);
  T(S, 'r1', 21.4, 6.2, 'T = 2v₀sinθ/g = 2.9 s', 'cz-mono ph-s', 4); T(S, 'r2', 21.4, 7.5, 'H = v₀²sin²θ/2g = 10.2 m', 'cz-mono ph-s', 4); T(S, 'r3', 21.4, 8.8, 'R = v₀²sin2θ/g = 40.8 m', 'cz-mono ph-s ph-g', 4);
  T(S, 'r4', 1, 17.4, ['θ = 45°에서 사거리 최대 · 30°와 60°는 사거리가 같아요', 'range peaks at 45° · 30° and 60° land at the same spot'], 'cz-tc ph-s', 5, { w: 30 });
  S.cap(1, '비스듬히 던지면 속도를 가로·세로로 나눠 봐요', 'Split the launch velocity into horizontal and vertical parts')
    .cap(2, '가로 속도는 그대로, 세로 속도는 줄어 꼭대기에서 0', 'Horizontal stays; vertical shrinks to 0 at the top')
    .cap(3, '내려올 때 세로 속도가 다시 커져요', 'On the way down the vertical speed grows again')
    .cap(4, '체공 시간, 최고점, 수평 도달 거리', 'Time of flight, maximum height and range')
    .cap(5, '공기 저항이 없을 때 궤도는 포물선', 'Without air resistance the path is a parabola');
  return S;
}
function sCirc() {
  const S = scene({ id: 'ph-circ', steps: 5, per: 1.35 });
  const cx = 9.5, cy = 10.5, R = 6;
  ring(S, 'path', cx, cy, R, 'ink-3', 0, { dash: 1, w: .12 }); pt(S, 'c', cx, cy, 0, C.idle, .3);
  wrap(S, 'w', cx - R, cy - R, 2 * R, 2 * R, KL(R, R, R, 0, 'ink-3', .1) + KV(2 * R, R, 3.6, 90, 'accent', .22) + KV(2 * R, R, 3, 180, 'danger', .22) + KD(2 * R, R, .6, 'var(--ink)'));
  [1, 2, 3, 4].forEach(s => rot(S, 'w', s, 90 * s));
  T(S, 'l1', 20.4, 2, ['v: 접선 방향', 'v: along the tangent'], 'ph-l ph-a'); T(S, 'l2', 20.4, 3.6, ['a: 중심 방향', 'a: toward the center'], 'ph-l ph-r');
  T(S, 'e1', 20.4, 6, ['속력은 일정, 방향만 바뀜', 'speed constant, direction changes'], 'ph-s', 1);
  T(S, 'e2', 20.4, 8, 'a = v²/r = ω²r', 'cz-mono ph-l', 2); T(S, 'e3', 20.4, 9.6, 'F = mv²/r', 'cz-mono ph-l', 3); T(S, 'e3b', 20.4, 11, ['(구심력: 장력·중력·마찰 등)', '(supplied by tension, gravity, friction…)'], 'ph-xs', 3);
  T(S, 'e4', 20.4, 13, 'r = 2 m, v = 4 m/s, m = 0.5 kg', 'cz-mono ph-xs', 4); T(S, 'e5', 20.4, 14.4, '→ a = 8 m/s², F = 4 N', 'cz-mono ph-s', 4);
  T(S, 'e6', 20.4, 16.6, 'T = 2πr/v, ω = 2π/T = v/r', 'cz-mono ph-s', 5);
  S.cap(1, '같은 빠르기로 원을 돌아도', 'Moving around a circle at constant speed')
    .cap(2, '속도의 방향이 계속 바뀌니 가속도가 있어요', 'the velocity keeps turning, so there is acceleration')
    .cap(3, '가속도는 늘 중심을 향해요 (구심가속도)', 'and it always points to the center')
    .cap(4, '그 원인이 되는 알짜힘이 구심력', 'The net force causing it is the centripetal force')
    .cap(5, '구심력은 새로운 힘이 아니라 알짜힘의 역할이에요', 'Centripetal force is a role, not a new kind of force');
  return S;
}
function sNewton() {
  const S = scene({ id: 'ph-newton', steps: 5, per: 1.4 });
  const th = 30 * D2R, A = [2.5, 17.5], B = [23.5, 17.5], Cc = [2.5, 17.5 - 21 * Math.tan(th)], d = [Math.cos(th), Math.sin(th)], n = [Math.sin(th), -Math.cos(th)];
  poly2(S, 'inc', [Cc, A, B], tint('ink-3', 30), 0);
  seg(S, 'srf', Cc, B, 0, 'ink-2', .14);
  const P = [Cc[0] + 7 * d[0] + 1.1 * n[0], Cc[1] + 7 * d[1] + 1.1 * n[1]], add = (p, v, s) => [p[0] + v[0] * s, p[1] + v[1] * s];
  rect(S, 'blk', P[0] - 1.6, P[1] - 1.1, 3.2, 2.2, 'accent', 50, 0, { css: 'border:.12em solid var(--accent);transform:rotate(30deg);z-index:3', r: .2 });
  S.get('blk').s.transform = 'rotate(30deg)'; mvr(S, 'blk', 5, d[0] * 7, d[1] * 7, -30);
  T(S, 'm', 1.4, 1.4, ['m = 2 kg, θ = 30°, 마찰 없음', 'm = 2 kg, θ = 30°, frictionless'], 'cz-mono ph-l');
  ar(S, 'g', P, [P[0], P[1] + 4.4], 'danger', 2, { h: .22, off: 5 }); T(S, 'tg', P[0] + .3, P[1] + 3.8, 'mg', 'cz-mono ph-b ph-r', 2, { off: 5 });
  ar(S, 'gs', P, add(P, d, 2.2), 'warn', 3, { h: .18, dash: 1, off: 4 }); ar(S, 'gn', P, add(P, n, -3.81), 'ink-3', 3, { h: .18, dash: 1, off: 5 });
  T(S, 'tgn', P[0] - 3.4, P[1] + 2.6, 'mg cosθ', 'cz-mono ph-xs', 3, { off: 5 });
  ar(S, 'N', P, add(P, n, 3.81), 'ok', 4, { h: .22, off: 5 }); T(S, 'tN', P[0] + 2.2, P[1] - 3.6, 'N', 'cz-mono ph-b ph-g', 4, { off: 5 });
  ar(S, 'net', P, add(P, d, 2.2), 'warn', 4, { h: .3, off: 5 }); T(S, 'tnet', P[0] + 2.4, P[1] + .6, 'mg sinθ', 'cz-mono ph-xs ph-w', 3, { off: 5 });
  T(S, 'e2', 18.4, 3.4, 'mg = 19.6 N', 'cz-mono ph-l', 2);
  T(S, 'e3', 18.4, 5, 'mg sinθ = 9.8 N', 'cz-mono ph-s ph-w', 3); T(S, 'e3b', 18.4, 6.3, 'mg cosθ = 17.0 N', 'cz-mono ph-s', 3);
  T(S, 'e4', 18.4, 8, ['N = mg cosθ로 상쇄', 'N = mg cosθ cancels'], 'ph-s ph-g', 4); T(S, 'e4b', 18.4, 9.4, 'ΣF = mg sinθ = ma', 'cz-mono ph-l', 4);
  T(S, 'e5', 18.4, 11.2, 'a = g sinθ = 4.9 m/s²', 'cz-mono ph-big ph-a', 5);
  S.cap(1, '경사면 위의 물체에 작용하는 힘을 그려요 (자유물체도)', 'Draw every force on the block: a free-body diagram')
    .cap(2, '중력 mg는 연직 아래', 'Gravity mg points straight down')
    .cap(3, '경사면 방향과 수직 방향으로 나누면', 'Split it along and across the slope')
    .cap(4, '수직 성분은 수직항력과 상쇄, 경사 성분만 남아요', 'The normal force cancels one part; the slope part remains')
    .cap(5, 'F = ma → 질량과 무관한 가속도 g sinθ', 'F = ma gives a = g sinθ, independent of mass');
  return S;
}
function sFriction() {
  const S = scene({ id: 'ph-friction', steps: 5, per: 1.35 });
  hl(S, 'fl', 1.4, 30.6, 7, 'ink-3', 0, { w: .16 });
  box(S, 'b', 6, 4, 5, 3, 'accent', 'm = 10 kg', 0, { pct: 35 }); S.move('b', 4, 9, 4);
  const Fs = [20, 40, 49, 60], fs = [20, 40, 49, 29.4], k = .12;
  Fs.forEach((f, i) => { const st = i + 1, x = i === 3 ? 14 : 11, xl = i === 3 ? 9 : 6;
    ar(S, 'F' + i, [x, 5.5], [x + f * k, 5.5], 'ok', st, { h: .24, off: i < 3 ? st + 1 : 0 });
    ar(S, 'f' + i, [xl + .2, 6.6], [xl + .2 - fs[i] * k, 6.6], 'danger', st, { h: .24, off: i < 3 ? st + 1 : 0 }); });
  L(S, 'Fl', 23.4, 4, 8, 'cz-mono ph-s ph-g', [[1, 'F = 20 N'], [2, 'F = 40 N'], [3, 'F = 49 N'], [4, 'F = 60 N']]);
  ar(S, 'vv', [9.5, 2.8], [13.5, 2.8], 'ink-2', 4, { h: .14 }); T(S, 'vt', 14, 2.2, ['미끄러짐', 'sliding'], 'ph-s', 4);
  const G = fr(0, 70, 0, 60, 3, 18.6, 10.2, 19);
  ax2(S, 'ga', G, ['F (N)', 'F (N)'], ['마찰력 f (N)', 'friction f (N)']);
  mplot(S, 'ls', G, t => [t, t], 0, 49, { st: i => Math.min(3, Math.ceil(i / 3)), n: 9, color: 'danger', h: .2 });
  mline(S, 'dp', G, [49, 49], [49, 29.4], { st: 4, color: 'danger', h: .14, dash: 1 }); mline(S, 'lk', G, [49, 29.4], [70, 29.4], { st: 4, color: 'danger', h: .2 });
  pt(S, 'gp', G.X(20), G.Y(20), 1, C.badf, .36); [[2, 40, 40], [3, 49, 49], [4, 60, 29.4]].forEach(([st, x, y]) => S.move('gp', st, G.X(x) - .36, G.Y(y) - .36));
  mT(S, 'm1', G, [49, 49], -6.4, -.6, 'μₛN = 49 N', 'cz-mono ph-xs', 3); mT(S, 'm2', G, [60, 29.4], -2, .4, 'μₖN = 29.4 N', 'cz-mono ph-xs', 4);
  T(S, 't1', 21, 10.4, 'μₛ = 0.5, μₖ = 0.3', 'cz-mono ph-s'); T(S, 't2', 21, 11.8, 'N = mg = 98 N', 'cz-mono ph-s');
  L(S, 't3', 21, 13.8, 10.6, 'ph-l', [[1, ['정지: f = F', 'at rest: f = F']], [3, ['최대 정지마찰', 'maximum static']], [4, ['운동마찰 fₖ = μₖN', 'kinetic fₖ = μₖN']]]);
  T(S, 't4', 21, 15.8, 'fₛ ≤ μₛN', 'cz-mono ph-s', 5); T(S, 't5', 21, 17.2, ['μₖ < μₛ: 움직이면 더 쉬워요', 'μₖ < μₛ: easier once moving'], 'ph-s', 5);
  S.cap(1, '당기는 힘이 작으면 정지마찰력이 똑같이 버텨요', 'Pull gently and static friction matches the pull')
    .cap(2, '당길수록 정지마찰력도 커지다가', 'It grows as you pull harder')
    .cap(3, '최대 정지마찰력 μₛN에 도달하면', 'until it reaches its maximum μₛN')
    .cap(4, '미끄러지기 시작하고 마찰력은 μₖN으로 줄어요', 'Then the block slides and friction drops to μₖN')
    .cap(5, '마찰력은 접촉면에 나란하고 운동을 방해하는 방향', 'Friction acts along the surface, opposing the motion');
  return S;
}

/* ================= energy and momentum ================= */
function sWork() {
  const S = scene({ id: 'ph-work', steps: 5, per: 1.35 });
  hl(S, 'fl', 1.4, 18.6, 13, 'ink-3', 0, { w: .16 });
  wrap(S, 'w', 2, 10.6, 3, 2.4, KB(0, 0, 3, 2.4, `background:${tint('accent', 40)};border:.12em solid var(--accent)`) + KV(3, 1.2, 4, 60, 'ok', .24) + KL(3, 1.2, 2, 0, 'warn', .16) + KL(5, 1.2, 3.46, 90, 'ink-3', .1), { t0: 'translate(0em,0em)' });
  S.set('w', 3, { transform: 'translate(11em,0em)' });
  hl(S, 'dd', 3.5, 14.5, 14.2, 'ink-3', 3, { dash: 1, w: .1 }); T(S, 'dl', 7.4, 14.5, 'd = 5 m', 'cz-mono ph-s', 3);
  T(S, 'e1', 19.6, 1.6, 'F = 10 N, θ = 60°', 'cz-mono ph-l'); T(S, 'e1b', 19.6, 3, 'm = 2 kg, d = 5 m', 'cz-mono ph-s');
  T(S, 'e2', 19.6, 4.8, ['F cosθ = 5 N만 일을 해요', 'only F cosθ = 5 N does work'], 'ph-s ph-w', 2);
  T(S, 'e3', 19.6, 6.4, 'W = Fd cosθ = 25 J', 'cz-mono ph-l', 3);
  T(S, 'e4', 19.6, 8, 'W = ΔK', 'cz-mono ph-big ph-g', 4);
  T(S, 'e5', 19.6, 9.8, '½·2·v² = 25 → v = 5 m/s', 'cz-mono ph-s', 5);
  S.el('kb', { x: 27, y: 12, w: 2.6, h: 6.4, css: `transform-origin:50% 100%;border-radius:.3em .3em 0 0;background:${tint('ok', 55)}`, s: { transform: 'scaleY(0.001)' } }); S.set('kb', 4, { transform: 'scaleY(1)' });
  hl(S, 'kbb', 26.4, 30.2, 18.4, 'ink-3', 0, { w: .1 }); T(S, 'kl', 26.4, 18.7, 'K', 'cz-tc cz-mono ph-b', 0, { w: 3.8 }); T(S, 'kv', 26.4, 10.9, '25 J', 'cz-tc cz-mono ph-s ph-g', 4, { w: 3.8 });
  S.cap(1, '비스듬히 당기는 힘 F', 'A force F pulling at an angle')
    .cap(2, '이동 방향 성분만 일을 하고 수직 성분은 일을 안 해요', 'Only the component along the motion does work')
    .cap(3, '5 m 끌면 W = Fd cosθ', 'Pull it 5 m: W = Fd cosθ')
    .cap(4, '알짜힘이 한 일만큼 운동에너지가 늘어요', 'Net work becomes kinetic energy')
    .cap(5, '일-운동에너지 정리로 속력을 바로 구해요', 'The work–energy theorem gives the speed directly');
  return S;
}
function sEnergy() {
  const S = scene({ id: 'ph-energy', steps: 5, per: 1.35 });
  const cx = 11, by = 17, a = 8, H = 8, Y = x => by - H * (x / a) ** 2;
  pplot(S, 'tr', t => [cx + t, Y(t) + .65], -a, a, { n: 30, color: 'ink-2', h: .16 });
  hl(S, 'ref', 2.5, 19.5, by - H, 'ink-3', 0, { dash: 1, w: .08 });
  const xs = [-a, -a * Math.SQRT1_2, 0, a];
  pt(S, 'ball', cx + xs[0], Y(xs[0]) , 0, C.cur, .6); xs.forEach((x, i) => { if (i) S.move('ball', i + 1, cx + x - .6, Y(x) - .6); });
  T(S, 'h', cx - a - 1, by - H - 1.6, 'h = 5 m', 'cz-mono ph-s');
  const U = [1, .5, 0, 1], Kk = [0, .5, 1, 0];
  [['bU', 21.6, 'accent', U], ['bK', 25.6, 'warn', Kk]].forEach(([k, x, c, v]) => {
    S.el(k, { x, y: 9, w: 3, h: 8, css: `transform-origin:50% 100%;border-radius:.3em .3em 0 0;background:${tint(c, 55)}`, s: { transform: `scaleY(${Math.max(v[0], .001)})` } });
    v.forEach((q, i) => { if (i) S.set(k, i + 1, { transform: `scaleY(${Math.max(q, .001)})` }); }); });
  hl(S, 'bb', 21, 29.4, 17, 'ink-3', 0, { w: .1 }); hl(S, 'tot', 21, 29.4, 9, 'ok', 0, { dash: 1, w: .1 });
  T(S, 'lU', 21.6, 17.3, 'U', 'cz-tc cz-mono ph-b ph-a', 0, { w: 3 }); T(S, 'lK', 25.6, 17.3, 'K', 'cz-tc cz-mono ph-b ph-w', 0, { w: 3 }); T(S, 'lt', 21, 7.8, 'E = 49 J', 'cz-mono ph-s ph-g');
  L(S, 'v', 20.4, 1.6, 11, 'cz-mono ph-l', [[1, 'U = mgh = 49 J, K = 0'], [2, 'U = K = 24.5 J'], [3, 'K = 49 J'], [4, 'U = 49 J, K = 0']]);
  T(S, 'v2', 20.4, 3.4, 'v = √(2gh) = 9.9 m/s', 'cz-mono ph-s ph-w', 3, { off: 4 });
  T(S, 'v3', 20.4, 5.2, ['마찰이 있으면 열로 빠져요', 'friction turns some into heat'], 'ph-s', 5);
  S.cap(1, 'm = 1 kg 공을 높이 5 m에서 놓으면', 'Release a 1 kg ball from 5 m')
    .cap(2, '내려가며 위치에너지가 운동에너지로 바뀌고', 'Potential energy turns into kinetic energy')
    .cap(3, '바닥에서 운동에너지 최대', 'Kinetic energy peaks at the bottom')
    .cap(4, '마찰이 없으면 같은 높이까지 다시 올라가요', 'Without friction it climbs back to the same height')
    .cap(5, 'K + U = 일정 (역학적 에너지 보존)', 'K + U stays constant: conservation of mechanical energy');
  return S;
}
function sImpulse() {
  const S = scene({ id: 'ph-impulse', steps: 5, per: 1.35 });
  S.el('wall', { x: 26.2, y: 1.6, w: .8, h: 6.8, css: `background:repeating-linear-gradient(135deg,var(--ink-3) 0 .2em,transparent .2em .5em);border-left:.16em solid var(--ink-2)` });
  pt(S, 'ball', 6, 5, 0, C.cur, .8); [[1, 15], [2, 25.4], [3, 17], [4, 10]].forEach(([st, x]) => S.move('ball', st, x - .8, 5 - .8));
  ar(S, 'v1', [15, 2.6], [19.5, 2.6], 'accent', 1, { h: .18, off: 2 }); T(S, 'v1t', 20, 2, 'v = +10 m/s', 'cz-mono ph-s ph-a', 1, { off: 2 });
  ar(S, 'v2', [17, 2.6], [13.4, 2.6], 'warn', 3, { h: .18, off: 5 }); T(S, 'v2t', 6.6, 2, 'v′ = −8 m/s', 'cz-mono ph-s ph-w', 3, { off: 5 });
  const G = fr(0, 12, 0, 1.6, 3, 19, 10.2, 18.6), Fp = t => t < 1 || t > 11 ? 0 : 1.414 * Math.sin(Math.PI * (t - 1) / 10);
  ax2(S, 'ga', G, 't (ms)', 'F (kN)');
  const pts = []; for (let i = 0; i <= 30; i++) { const t = 1 + 10 * i / 30; pts.push([G.X(t), G.Y(Fp(t))]); }
  poly2(S, 'ar', pts, tint('ok', 40), 4);
  mplot(S, 'pulse', G, t => [t, Fp(t)], 0, 12, { st: 2, n: 36, color: 'danger', h: .2 });
  mline(S, 'avg', G, [1, .9], [11, .9], { st: 4, color: 'accent', h: .14, dash: 1 }); mT(S, 'avgt', G, [1, .9], -1.8, -1, 'F̄ = 900 N', 'cz-mono ph-xs ph-a', 4);
  T(S, 'e1', 20.6, 10.4, 'm = 0.5 kg', 'cz-mono ph-s'); T(S, 'e2', 20.6, 11.8, 'Δt = 0.01 s', 'cz-mono ph-s', 2);
  T(S, 'e3', 20.6, 13.6, 'J = Δp = m(v′ − v)', 'cz-mono ph-l', 4); T(S, 'e4', 20.6, 15, '= 0.5(−8 − 10) = −9 N·s', 'cz-mono ph-s', 4);
  T(S, 'e5', 20.6, 16.6, ['넓이 = 충격량', 'area = impulse'], 'ph-s ph-g', 4); T(S, 'e6', 20.6, 18, ['시간 ↑ → 힘 ↓ (에어백)', 'longer time → smaller force'], 'ph-s', 5);
  S.cap(1, '0.5 kg 공이 10 m/s로 벽을 향해 가요', 'A 0.5 kg ball heads for the wall at 10 m/s')
    .cap(2, '부딪히는 0.01초 동안 벽이 큰 힘을 줘요', 'For 0.01 s the wall pushes hard')
    .cap(3, '공은 8 m/s로 튕겨 나와요', 'and the ball rebounds at 8 m/s')
    .cap(4, 'F-t 그래프 넓이 = 충격량 = 운동량 변화', 'Area under F-t = impulse = change in momentum')
    .cap(5, '같은 충격량이면 시간이 길수록 평균 힘이 작아요', 'Same impulse over longer time means smaller average force');
  return S;
}
function sCollision() {
  const S = scene({ id: 'ph-collision', steps: 5, per: 1.35 });
  T(S, 'r1', 1, 1.6, ['탄성 충돌', 'Elastic'], 'ph-b'); T(S, 'r2', 1, 9.4, ['완전 비탄성 충돌', 'Perfectly inelastic'], 'ph-b');
  hl(S, 't1', 1, 31, 7.6, 'ink-3', 0, { w: .12 }); hl(S, 't2', 1, 31, 15.4, 'ink-3', 0, { w: .12 });
  [[5, 'e', [[1, 7], [2, 11.6], [3, 13.6]], [[1, 15], [2, 15], [3, 23]]], [12.8, 'i', [[1, 7], [2, 11.6], [3, 15.6]], [[1, 15], [2, 15], [3, 19]]]].forEach(([y, s, pa, pb]) => {
    box(S, 'A' + s, 2, y, 3.4, 2.4, 'accent', 'A 2kg', 0); pa.forEach(([st, x]) => S.move('A' + s, st, x, y));
    box(S, 'B' + s, 15, y, 3.4, 2.4, 'warn', 'B 1kg', 0); pb.forEach(([st, x]) => S.move('B' + s, st, x, y)); });
  T(S, 'u1', 7, 3.6, '3 m/s →', 'cz-mono ph-s ph-a', 1, { off: 3 }); T(S, 'u2', 7, 11.4, '3 m/s →', 'cz-mono ph-s ph-a', 1, { off: 3 });
  T(S, 'a1', 13.6, 3.6, '1 m/s', 'cz-mono ph-s ph-a', 3); T(S, 'b1', 23, 3.6, '4 m/s', 'cz-mono ph-s ph-w', 3); T(S, 'c1', 16.4, 11.4, ['함께 2 m/s', 'together 2 m/s'], 'cz-mono ph-s ph-g', 3);
  T(S, 'p', 1, 17.2, 'p: 2·3 = 6 → 2·1 + 1·4 = 6 · 3·2 = 6', 'cz-tc cz-mono ph-s', 4, { w: 30 });
  T(S, 'k', 1, 18.6, ['K: 9 J → 9 J (탄성) · 6 J (비탄성, 3 J 손실)', 'K: 9 J → 9 J (elastic) · 6 J (inelastic, 3 J lost)'], 'cz-tc ph-s', 5, { w: 30 });
  S.cap(1, '2 kg 수레 A가 3 m/s로 정지한 1 kg 수레 B에 다가가요', 'Cart A (2 kg, 3 m/s) approaches cart B (1 kg) at rest')
    .cap(2, '부딪히는 동안 서로 같은 크기의 힘을 주고받아요', 'During contact they push each other equally')
    .cap(3, '탄성 충돌은 튕겨 나가고, 완전 비탄성은 붙어서 함께', 'Elastic: they bounce apart · inelastic: they stick')
    .cap(4, '어느 경우든 운동량의 합은 보존돼요', 'Total momentum is conserved either way')
    .cap(5, '운동에너지는 탄성 충돌에서만 보존돼요', 'Kinetic energy is conserved only in the elastic case');
  return S;
}

/* ================= rotation ================= */
function sInertia() {
  const S = scene({ id: 'ph-inertia', steps: 5, per: 1.35 });
  T(S, 'h', 1, 1.2, ['같은 질량 M, 반지름 R, 같은 토크 τ', 'same M, same R, same torque τ'], 'cz-tc ph-l', 0, { w: 30 });
  [[8, 'accent', 'hoop', 60, 240], [23, 'warn', 'disk', 120, 480]].forEach(([cx, c, k, a3, a4], i) => {
    const R = 4.5, cy = 9;
    if (!i) ring(S, 'o' + i, cx, cy, R, c, 0, { w: .6 }); else ring(S, 'o' + i, cx, cy, R, c, 0, { w: .14, fill: tint(c, 35) });
    wrap(S, 'w' + i, cx - R, cy - R, 2 * R, 2 * R, KL(R, R, R, 0, 'ink-2', .16) + KD(2 * R - .3, R, .4, 'var(--ink)'));
    rot(S, 'w' + i, 3, a3); rot(S, 'w' + i, 4, a4);
    ar(S, 'tq' + i, [cx - 2, cy - R - .7], [cx + 2.5, cy - R - .7], 'danger', 2, { h: .22 });
    T(S, 'I' + i, cx - 5, 14.6, i ? 'I = ½MR²' : 'I = MR²', 'cz-tc cz-mono ph-l', 0, { w: 10 }); });
  T(S, 'a', 1, 16.4, ['α = τ / I → 원판이 2배 빨리 각가속', 'α = τ / I → the disk spins up twice as fast'], 'cz-tc ph-l ph-g', 4, { w: 30 });
  T(S, 'b', 1, 18.2, ['구 ⅖MR² · 막대(중심) ML²/12 · 평행축 I = I_cm + Md²', 'sphere ⅖MR² · rod (center) ML²/12 · parallel axis I = I_cm + Md²'], 'cz-tc ph-s', 5, { w: 30 });
  S.cap(1, '질량이 같아도 분포가 다르면 관성 모멘트가 달라요', 'Same mass, different distribution, different moment of inertia')
    .cap(2, '같은 토크를 주면', 'Apply the same torque')
    .cap(3, '질량이 바깥에 몰린 고리는 천천히 돌고', 'The hoop, mass at the rim, turns slowly')
    .cap(4, '원판은 각가속도가 2배예요', 'The disk gets twice the angular acceleration')
    .cap(5, 'τ = Iα · 회전의 뉴턴 제2법칙', 'τ = Iα: Newton’s second law for rotation');
  return S;
}
function sTorque() {
  const S = scene({ id: 'ph-torque', steps: 5, per: 1.35 });
  poly2(S, 'pv', [[16, 12.6], [14.6, 15.6], [17.4, 15.6]], tint('ink-3', 60), 0);
  const beam = (r2) => KB(0, 0, 24, .8, `background:${tint('ink-3', 70)}`) + KB(5, -2.2, 2.2, 2.2, `background:${tint('accent', 50)};border:.12em solid var(--accent)`) + KT(5.45, -1.5, '3kg') +
    KB(12 + r2 * 3 - 1.1, -2.2, 2.2, 2.2, `background:${tint('warn', 50)};border:.12em solid var(--warn)`) + KT(12 + r2 * 3 - .65, -1.5, '2kg') +
    KV(6.1, .8, 2.6, -90, 'danger', .18) + KV(12 + r2 * 3, .8, 1.8, -90, 'danger', .18);
  wrap(S, 'b1', 4, 11.8, 24, .8, beam(3), { off: 3 }); wrap(S, 'b2', 4, 11.8, 24, .8, beam(4), { st: 3 }); rot(S, 'b2', 4, -10);
  T(S, 'd1', 6.6, 13, '2 m', 'cz-tc cz-mono ph-s', 0, { w: 3 }); T(S, 'd2', 21.6, 13, '3 m', 'cz-tc cz-mono ph-s', 0, { w: 3, off: 3 }); T(S, 'd3', 24.6, 13, '4 m', 'cz-tc cz-mono ph-s', 3, { w: 3 });
  T(S, 'e1', 1, 2, 'τ₁ = 3·g·2 = 6g', 'cz-mono ph-l', 1);
  T(S, 'e2', 17, 2, 'τ₂ = 2·g·3 = 6g', 'cz-mono ph-l', 1, { off: 3 }); T(S, 'e2b', 17, 2, 'τ₂ = 2·g·4 = 8g', 'cz-mono ph-l', 3);
  L(S, 'e3', 1, 4, 30, 'cz-tc ph-b', [[2, ['같으면 Στ = 0 → 평형', 'equal: Στ = 0 → balanced']], [4, ['8g > 6g → 시계 방향으로 기울어요', '8g > 6g → it tips clockwise']]]);
  T(S, 'f', 1, 18, ['τ = rF sinθ · 평형: ΣF = 0, Στ = 0', 'τ = rF sinθ · equilibrium: ΣF = 0, Στ = 0'], 'cz-tc cz-mono ph-s', 5, { w: 30 });
  S.cap(1, '받침점에서 거리 × 힘이 돌림힘(토크)', 'Torque = distance from the pivot × force')
    .cap(2, '양쪽 토크가 같으면 시소가 평형을 이뤄요', 'Equal torques balance the seesaw')
    .cap(3, '오른쪽 추를 4 m로 옮기면', 'Move the right mass out to 4 m')
    .cap(4, '토크가 커져 그쪽으로 기울어요', 'Its torque wins and the beam tips')
    .cap(5, '힘이 비스듬하면 수직 성분만 토크를 만들어요', 'Only the perpendicular part of a force makes torque');
  return S;
}
function sAngmom() {
  const S = scene({ id: 'ph-angmom', steps: 5, per: 1.35 });
  const cx = 9.5, cy = 10.5;
  ring(S, 'body', cx, cy, 1.6, 'accent', 0, { fill: tint('accent', 30), w: .14, css: 'z-index:4' });
  const arms = L0 => KB(0, .6, 2 * L0, .55, `background:${tint('warn', 70)};border-radius:.3em`) + KD(.4, .875, .5, 'var(--warn)') + KD(2 * L0 - .4, .875, .5, 'var(--warn)');
  wrap(S, 'aL', cx - 7, cy - .875, 14, 1.75, arms(7), { off: 3 }); [[1, 90], [2, 180]].forEach(([st, a]) => rot(S, 'aL', st, a));
  wrap(S, 'aS', cx - 3, cy - .875, 6, 1.75, arms(3), { st: 3, t0: 'rotate(-180deg)' }); [[3, 405], [4, 630], [5, 855]].forEach(([st, a]) => rot(S, 'aS', st, a));
  ring(S, 'tr', cx, cy, 7.4, 'ink-3', 0, { dash: 1, w: .08, off: 3 }); ring(S, 'tr2', cx, cy, 3.4, 'ink-3', 3, { dash: 1, w: .08 });
  T(S, 'L', 20.4, 1.8, ['L = Iω = 일정', 'L = Iω = constant'], 'cz-mono ph-big');
  T(S, 'e1', 20.4, 4.6, 'I₁ = 4 kg·m², ω₁ = 2 rad/s', 'cz-mono ph-s', 1);
  T(S, 'e2', 20.4, 6.6, ['팔을 모으면 I₂ = 1.6', 'arms in: I₂ = 1.6'], 'ph-s ph-w', 3); T(S, 'e3', 20.4, 8, 'ω₂ = 4·2 / 1.6 = 5 rad/s', 'cz-mono ph-s', 3);
  T(S, 'e4', 20.4, 10.2, 'K = ½Iω²: 8 J → 20 J', 'cz-mono ph-s', 4); T(S, 'e5', 20.4, 11.6, ['(팔을 당기는 일만큼 증가)', '(the work of pulling the arms in)'], 'ph-xs', 4);
  T(S, 'e6', 20.4, 13.6, ['외부 토크 = 0 → L 보존', 'no external torque → L conserved'], 'ph-s ph-g', 5);
  S.cap(1, '팔을 벌리고 천천히 도는 스케이터', 'A skater spins slowly with arms out')
    .cap(2, '외부 토크가 없으면 각운동량이 보존돼요', 'With no external torque, angular momentum is conserved')
    .cap(3, '팔을 모으면 관성 모멘트가 줄어', 'Pulling the arms in reduces the moment of inertia')
    .cap(4, '그만큼 빨리 돌아요 (I₁ω₁ = I₂ω₂)', 'so the spin speeds up: I₁ω₁ = I₂ω₂')
    .cap(5, '다이빙의 회전, 중성자별의 빠른 자전도 같은 원리', 'Divers and neutron stars spin up the same way');
  return S;
}
function sRolling() {
  const S = scene({ id: 'ph-rolling', steps: 4, per: 1.5 });
  const P0 = [3, 5], P1 = [24, 17], dx = P1[0] - P0[0], dy = P1[1] - P0[1], Ln = Math.hypot(dx, dy), d = [dx / Ln, dy / Ln], n = [dy / Ln, -dx / Ln];
  const lanes = [['accent', '⅖', 1 / 1.4], ['warn', '½', 1 / 1.5], ['danger', '1', .5]], fr_ = [[.25, .64, 1, 1], [.2335, .598, .934, 1], [.175, .448, .7, 1]];
  lanes.forEach(([c, lab], i) => { const o = 1.8 * i, A0 = [P0[0] + n[0] * o, P0[1] + n[1] * o], A1 = [P1[0] + n[0] * o, P1[1] + n[1] * o];
    seg(S, 'ln' + i, A0, A1, 0, 'ink-3', .12);
    const at = f => [A0[0] + d[0] * Ln * f + n[0] * .62, A0[1] + d[1] * Ln * f + n[1] * .62];
    const p0 = at(0); if (i === 2) ring(S, 'b' + i, p0[0], p0[1], .6, c, 0, { w: .24 }); else pt(S, 'b' + i, p0[0], p0[1], 0, { background: tint(c, 60), 'border-color': `var(--${c})` }, .6);
    fr_[i].forEach((f, s) => { const p = at(f); S.move('b' + i, s + 1, p[0] - .6, p[1] - .6); });
    T(S, 'lb' + i, A1[0] + .6, A1[1] - .6, [['구', '원판', '고리'][i] + ' ' + lab, ['sphere', 'disk', 'hoop'][i] + ' ' + lab], 'ph-s ph-' + ['a', 'w', 'r'][i]); });
  T(S, 'k', 16.4, 1.6, ['I = cMR²', 'I = cMR²'], 'cz-mono ph-l');
  T(S, 'f1', 16.4, 3.2, 'a = g sinθ / (1 + c)', 'cz-mono ph-l', 2);
  T(S, 'f2', 16.4, 5, 'v = √(2gh / (1 + c))', 'cz-mono ph-l', 3); T(S, 'f3', 16.4, 6.6, ['h = 1 m: 구 3.74 · 원판 3.61', 'h = 1 m: sphere 3.74 · disk 3.61'], 'ph-s', 3); T(S, 'f4', 16.4, 7.9, ['고리 3.13 · 미끄럼 4.43 m/s', 'hoop 3.13 · sliding 4.43 m/s'], 'ph-s', 3);
  T(S, 'f5', 16.4, 9.6, 'K = ½Mv² + ½Iω², v = Rω', 'cz-mono ph-s', 4);
  S.cap(1, '같은 경사면에서 세 물체가 굴러 내려가요', 'Three objects roll down the same slope')
    .cap(2, '질량이 바깥에 몰릴수록(c가 클수록) 느려요', 'The more mass at the rim (bigger c), the slower')
    .cap(3, '구가 먼저, 고리가 가장 늦게 도착', 'The sphere wins; the hoop comes last')
    .cap(4, '위치에너지가 병진 + 회전 운동에너지로 나뉘어요', 'Potential energy splits into translation and rotation');
  return S;
}

/* ================= oscillation, gravity, fluids ================= */
function sShm() {
  const S = scene({ id: 'ph-shm', steps: 5, per: 1.35 });
  S.el('wall', { x: .8, y: 2.6, w: .8, h: 5.2, css: 'background:repeating-linear-gradient(135deg,var(--ink-3) 0 .2em,transparent .2em .5em);border-right:.16em solid var(--ink-2)' });
  hl(S, 'fl', 1.6, 26, 7.8, 'ink-3', 0, { w: .1 });
  const xs = [17, 12, 7, 12, 17];
  S.el('sp', { x: 1.6, y: 4.6, w: 15.4, h: 1.2, css: 'transform-origin:0 50%;background:repeating-linear-gradient(90deg,var(--ink-2) 0 .14em,transparent .14em .7em);border-top:.08em solid var(--ink-3);border-bottom:.08em solid var(--ink-3)', s: { transform: 'scaleX(1)' } });
  xs.forEach((x, i) => { if (i) S.set('sp', i, { transform: `scaleX(${r3((x - 1.6) / 15.4)})` }); });
  box(S, 'm', 17, 3.6, 3, 4.2, 'accent', 'm', 0, { pct: 45 }); xs.forEach((x, i) => { if (i) S.move('m', i, x, 3.6); });
  vl(S, 'eq', 13.5, 2.4, 9, 'ok', 0, { dash: 1, w: .1 }); T(S, 'eqt', 12.5, 9.2, 'x = 0', 'cz-tc cz-mono ph-xs', 0, { w: 2 });
  T(S, 'pa', 17.5, 9.2, '+A', 'cz-tc cz-mono ph-xs', 0, { w: 2 }); T(S, 'ma', 7.5, 9.2, '−A', 'cz-tc cz-mono ph-xs', 0, { w: 2 });
  L(S, 'st', 20.6, 2.6, 11, 'ph-s', [[1, ['x = 0: v 최대, a = 0', 'x = 0: v max, a = 0']], [2, ['x = −A: v = 0, a 최대', 'x = −A: v = 0, a max']], [3, ['x = 0: v 최대 (반대)', 'x = 0: v max (reversed)']], [4, ['한 주기 T', 'one period T']]]);
  T(S, 'f0', 20.6, 4.4, 'F = −kx', 'cz-mono ph-l');
  const G = fr(0, 1, -1.25, 1.25, 3, 29, 11, 18.6);
  hl(S, 'gx', 3, 29, G.Y(0), 'ink-3', 0, { w: .1 }); vl(S, 'gy', 3, G.T, G.B, 'ink-3', 0, { w: .1 }); T(S, 'gl', 3.3, 10.4, 'x(t) = A cos ωt', 'cz-mono ph-xs');
  mplot(S, 'c', G, t => [t, Math.cos(2 * Math.PI * t)], 0, 1, { st: i => Math.ceil(i / 10), n: 40, color: 'accent', h: .18 });
  pt(S, 'gp', G.X(0), G.Y(1), 0, C.badf, .34); [[1, .25, 0], [2, .5, -1], [3, .75, 0], [4, 1, 1]].forEach(([st, t, x]) => S.move('gp', st, G.X(t) - .34, G.Y(x) - .34));
  T(S, 'f', 1, 19.2, 'ω = √(k/m) · T = 2π√(m/k) · E = ½kA² · v_max = Aω', 'cz-tc cz-mono ph-s', 5, { w: 30 });
  S.cap(1, '용수철을 A만큼 당겼다 놓으면 복원력 −kx로 되돌아와요', 'Stretch by A and release: the restoring force −kx pulls back')
    .cap(2, '평형점을 지나 반대편 −A까지', 'It overshoots to −A')
    .cap(3, '다시 평형점을 지나', 'passes the center again')
    .cap(4, '처음 자리로 · 위치는 코사인 곡선', 'and returns: position traces a cosine')
    .cap(5, '주기는 진폭과 무관하고 질량과 용수철 상수로 정해져요', 'The period depends on m and k, not the amplitude');
  return S;
}
function sPendulum() {
  const S = scene({ id: 'ph-pendulum', steps: 8, per: .9 });
  hl(S, 'ceil', 3, 29, 2.2, 'ink-2', 0, { w: .2 });
  [[9, 14, 'accent', 2], [22, 3.5, 'warn', 1]].forEach(([px, Lp, c, every], i) => {
    wrap(S, 'p' + i, px - 1, 2.2, 2, Lp + 1, KL(1, 0, Lp, -90, 'ink-2', .1) + KD(1, Lp, .8, `var(--${c})`), { ox: 1, oy: 0, t0: 'rotate(-18deg)' });
    for (let s = 1; s <= 8; s++) if (s % every === 0) S.set('p' + i, s, { transform: `rotate(${(s / every) % 2 ? 18 : -18}deg)` });
    T(S, 'l' + i, px - 5, 18, i ? 'L = 0.25 m → T = 1.0 s' : 'L = 1 m → T = 2.0 s', 'cz-tc cz-mono ph-s', 0, { w: 10 }); });
  T(S, 'f', 1, 19.6, ['T = 2π√(L/g) · 질량·진폭과 무관 (작은 각)', 'T = 2π√(L/g) · independent of mass and amplitude (small angles)'], 'cz-tc ph-s', 0, { w: 30 });
  S.cap(1, '길이가 다른 두 진자를 동시에 놓으면', 'Release two pendulums of different lengths together')
    .cap(3, '짧은 진자가 두 번 왕복할 때', 'The short one swings twice')
    .cap(5, '긴 진자는 한 번 왕복해요', 'while the long one swings once')
    .cap(7, '길이 ¼ → 주기 ½ (주기 ∝ √L)', 'A quarter of the length gives half the period');
  return S;
}
function sGravity() {
  const S = scene({ id: 'ph-gravity', steps: 5, per: 1.35 });
  const cx = 9.5, cy = 10.5, r1 = 4, r2 = 4 * Math.cbrt(4);
  ring(S, 'o1', cx, cy, r1, 'ink-3', 0, { dash: 1, w: .1 }); ring(S, 'o2', cx, cy, r2, 'ink-3', 0, { dash: 1, w: .1 });
  ring(S, 'pl', cx, cy, 1.7, 'accent', 0, { fill: tint('accent', 40), w: .14, css: 'z-index:4' });
  [[r1, 'ok', 180], [r2, 'warn', 90]].forEach(([r, c, da], i) => { wrap(S, 's' + i, cx - r, cy - r, 2 * r, 2 * r, KV(2 * r, r, 1.6, 180, 'danger', .18) + KD(2 * r, r, .5, `var(--${c})`)); [1, 2, 3, 4].forEach(s => rot(S, 's' + i, s, da * s)); });
  T(S, 'F', 20.4, 1.8, 'F = GMm/r²', 'cz-mono ph-big');
  T(S, 'e1', 20.4, 4.6, 'GMm/r² = mv²/r', 'cz-mono ph-s', 1); T(S, 'e2', 20.4, 6, 'v = √(GM/r)', 'cz-mono ph-l', 1);
  T(S, 'e3', 20.4, 8, ['T² ∝ r³ (케플러 제3법칙)', 'T² ∝ r³ (Kepler’s third law)'], 'ph-s ph-g', 2); T(S, 'e4', 20.4, 9.4, ['r 1.59배 → T 2배', 'r × 1.59 → T × 2'], 'ph-s', 2);
  T(S, 'e5', 20.4, 11.4, ['지표: g = GM/R² = 9.8 m/s²', 'surface: g = GM/R² = 9.8 m/s²'], 'ph-s', 3);
  T(S, 'e6', 20.4, 13, ['탈출 속도 √(2GM/R) = 11.2 km/s', 'escape speed √(2GM/R) = 11.2 km/s'], 'ph-s', 4);
  T(S, 'e7', 20.4, 14.6, 'U = −GMm/r', 'cz-mono ph-s', 5); T(S, 'e8', 20.4, 16, ['케플러 제2법칙: 같은 시간 같은 넓이', 'Kepler 2: equal areas in equal times'], 'ph-xs', 5);
  S.cap(1, '만유인력이 위성의 구심력이 돼요', 'Gravity supplies the centripetal force')
    .cap(2, '안쪽 위성이 두 바퀴 돌 때 바깥 위성은 한 바퀴', 'The inner satellite laps twice while the outer goes once')
    .cap(3, '멀수록 느리고 주기가 길어요', 'Farther orbits are slower with longer periods')
    .cap(4, '충분히 빠르면 중력을 벗어나요 (탈출 속도)', 'Fast enough and it escapes')
    .cap(5, '중력 퍼텐셜 에너지는 무한히 먼 곳을 0으로 잡아요', 'Gravitational potential energy is zero at infinity');
  return S;
}
function sBuoyancy() {
  const S = scene({ id: 'ph-buoyancy', steps: 5, per: 1.35 });
  rect(S, 'water', 2, 7, 16, 11, 'accent', 22, 0, { r: 0 });
  S.el('tank', { x: 1.8, y: 4, w: 16.4, h: 14.2, css: 'border:.18em solid var(--ink-2);border-top:0;border-radius:0 0 .3em .3em' });
  box(S, 'b', 8, 11, 4, 4, 'warn', '', 0, { pct: 60 }); S.move('b', 4, 8, 6);
  [9, 10, 11].forEach((x, i) => { ar(S, 'pt' + i, [x, 9.4], [x, 10.8], 'ink-2', 2, { h: .12, off: 3 }); ar(S, 'pb' + i, [x, 17.6], [x, 15.2], 'ink-2', 2, { h: .16, off: 3 }); });
  ar(S, 'FB', [10, 11], [10, 11 - 2.9], 'ok', 3, { h: .26, off: 4 }); ar(S, 'mg', [10, 15], [10, 15 + 2.2], 'danger', 3, { h: .26, off: 4 });
  T(S, 'FBl', 10.5, 8.2, 'F<sub>B</sub>', 'cz-mono ph-s ph-g', 3, { off: 4 }); T(S, 'mgl', 10.5, 16.2, 'mg', 'cz-mono ph-s ph-r', 3, { off: 4 });
  ar(S, 'FB2', [10, 6], [10, 6 - 2.2], 'ok', 4, { h: .26 }); ar(S, 'mg2', [10, 10], [10, 10 + 2.2], 'danger', 4, { h: .26 });
  T(S, 'h', 20.4, 1.8, ['물체 2 L, 1.5 kg (ρ = 750)', 'block 2 L, 1.5 kg (ρ = 750)'], 'ph-l');
  T(S, 'e1', 20.4, 4, 'p = p₀ + ρgh', 'cz-mono ph-l', 2); T(S, 'e2', 20.4, 5.4, ['깊을수록 압력 ↑ → 알짜 위쪽 힘', 'deeper = higher pressure → net upward'], 'ph-xs', 2);
  T(S, 'e3', 20.4, 7.4, ['F<sub>B</sub> = ρ<sub>물</sub>Vg = 19.6 N', 'F<sub>B</sub> = ρ<sub>water</sub>Vg = 19.6 N'], 'cz-mono ph-s ph-g', 3); T(S, 'e4', 20.4, 8.8, 'mg = 14.7 N', 'cz-mono ph-s ph-r', 3);
  T(S, 'e5', 20.4, 10.8, ['떠오르면 F<sub>B</sub> = mg', 'floating: F<sub>B</sub> = mg'], 'ph-s', 4); T(S, 'e6', 20.4, 12.2, ['잠긴 비율 = 750/1000 = 75%', 'submerged: 750/1000 = 75%'], 'ph-s ph-a', 4);
  T(S, 'e7', 20.4, 14.4, ['부력 = 밀어낸 유체의 무게', 'buoyancy = weight of displaced fluid'], 'ph-s', 5);
  S.cap(1, '물속에 잠긴 나무 블록', 'A wooden block held under water')
    .cap(2, '아랫면이 더 깊어서 위로 미는 압력이 더 커요', 'The bottom is deeper, so it is pushed up harder')
    .cap(3, '부력이 무게보다 커서', 'Buoyancy exceeds the weight')
    .cap(4, '떠올라 부력 = 무게가 되는 곳에서 멈춰요', 'It rises until buoyancy equals weight')
    .cap(5, '아르키메데스 원리 · 배와 열기구가 뜨는 이유', 'Archimedes’ principle: why ships and balloons float');
  return S;
}
function sBernoulli() {
  const S = scene({ id: 'ph-bernoulli', steps: 5, per: 1.35 });
  const top = [[1, 8], [13, 8], [17, 9.5], [31, 9.5]], bot = [[1, 14], [13, 14], [17, 12.5], [31, 12.5]];
  poly2(S, 'fill', top.concat(bot.slice().reverse()), tint('accent', 22), 0);
  poly(S, 'wt', top, { color: 'ink-2', h: .2 }); poly(S, 'wb', bot, { color: 'ink-2', h: .2 });
  const hgt = x => x < 13 ? 6 : x > 17 ? 3 : 6 - 3 * (x - 13) / 4, v = x => 1.8 * 6 / hgt(x);
  const X = age => { let x = 1.5, t = 0; const dt = .01; while (t < age) { x += v(x) * dt; t += dt; } return x; };
  for (let kk = -4; kk <= 12; kk++) { const pos = j => X(j + kk), visAt = j => j + kk >= 0 && X(j + kk) < 30.4;
    const key = 'd' + (kk + 4); pt(S, key, visAt(0) ? pos(0) : 1.5, 11, 0, C.cur, .3); if (!visAt(0)) S.get(key).s.opacity = '0';
    for (let j = 1; j <= 4; j++) { if (visAt(j)) S.move(key, j, pos(j) - .3, 11 - .3, { opacity: '1' }); else S.set(key, j, { opacity: '0' }); } }
  [[7, 8, 5, 'P₁'], [24, 9.5, 2, 'P₂']].forEach(([x, y, h, l], i) => { S.el('tb' + i, { x: x - .6, y: 1.6, w: 1.2, h: y - 1.6, css: 'border:.12em solid var(--ink-3);border-bottom:0' }); rect(S, 'tw' + i, x - .5, y - h, 1, h, 'accent', 45, 0, { r: 0 }); T(S, 'tl' + i, x + 1, y - h, l, 'cz-mono ph-s'); });
  T(S, 'e1', 1, 15.4, 'A₁v₁ = A₂v₂ → v₂ = 2v₁', 'cz-mono ph-l', 2);
  T(S, 'e2', 1, 17, ['P + ½ρv² + ρgh = 일정', 'P + ½ρv² + ρgh = constant'], 'cz-mono ph-l', 3);
  T(S, 'e3', 1, 18.6, ['v₁ = 2, v₂ = 4 m/s → P₁ − P₂ = ½ρ(v₂² − v₁²) = 6000 Pa', 'v₁ = 2, v₂ = 4 m/s → P₁ − P₂ = ½ρ(v₂² − v₁²) = 6000 Pa'], 'cz-mono ph-s', 4);
  T(S, 'e4', 16, 15.4, ['빠른 곳 = 압력 낮은 곳', 'faster flow = lower pressure'], 'ph-s ph-w', 5); T(S, 'e5', 16, 16.8, ['날개 양력, 분무기', 'wing lift, atomizers'], 'ph-s', 5);
  S.cap(1, '관이 좁아지는 곳으로 물이 흘러요', 'Water flows into a narrowing pipe')
    .cap(2, '같은 시간에 같은 부피가 지나야 하니 좁은 곳에서 빨라지고', 'The same volume must pass each second, so it speeds up')
    .cap(3, '빨라진 만큼 압력이 낮아져요', 'and the faster flow has lower pressure')
    .cap(4, '압력 차는 베르누이 식으로 계산해요', 'Bernoulli’s equation gives the pressure drop')
    .cap(5, '에너지 보존을 유체에 적용한 결과예요', 'It is energy conservation for a flowing fluid');
  return S;
}

/* ================= waves ================= */
function sWave() {
  const S = scene({ id: 'ph-wave', steps: 8, per: .75 });
  const N = 25, A = 3, lam = 12, y0 = 8.4, k = 2 * Math.PI / lam;
  hl(S, 'eq', 1.4, 30.6, y0, 'ink-3', 0, { w: .08 }); hl(S, 'up', 1.4, 30.6, y0 - A, 'ink-3', 0, { dash: 1, w: .06 }); hl(S, 'dn', 1.4, 30.6, y0 + A, 'ink-3', 0, { dash: 1, w: .06 });
  vl(S, 'gd', 2 + 12 * 1.1, y0 - A - .4, y0 + A + .4, 'danger', 0, { dash: 1, w: .08 });
  for (let i = 0; i < N; i++) { const x = 2 + i * 1.1, Y = j => y0 - A * Math.sin(k * x - j * Math.PI / 4), r = i === 12 ? .45 : .3;
    pt(S, 'p' + i, x, Y(0), 0, i === 12 ? C.badf : C.cur, r); for (let j = 1; j <= 8; j++) S.move('p' + i, j, x - r, Y(j) - r); }
  T(S, 'lam', 3, 2.4, ['λ = 12칸 · 한 주기 동안 λ만큼 이동', 'λ = 12 units · moves one λ per period'], 'ph-s');
  T(S, 'f1', 1, 14.6, 'y(x, t) = A sin(kx − ωt) · k = 2π/λ · ω = 2π/T', 'cz-tc cz-mono ph-l', 2, { w: 30 });
  T(S, 'f2', 1, 16.4, 'v = λ/T = fλ', 'cz-tc cz-mono ph-l', 4, { w: 30 });
  T(S, 'f3', 1, 18.2, ['소리: λ = 2 m, f = 170 Hz → v = 340 m/s', 'sound: λ = 2 m, f = 170 Hz → v = 340 m/s'], 'cz-tc ph-s', 6, { w: 30 });
  S.cap(1, '파동의 모양은 오른쪽으로 이동하지만', 'The wave shape travels to the right')
    .cap(3, '빨간 입자는 제자리에서 위아래로만 움직여요', 'but the red particle only moves up and down')
    .cap(5, '에너지와 모양이 전달될 뿐 매질은 따라가지 않아요', 'Energy and shape move; the medium stays put')
    .cap(7, '한 주기 T 동안 정확히 한 파장 λ만큼 나아가요', 'In one period it advances exactly one wavelength');
  return S;
}
function sStanding() {
  const S = scene({ id: 'ph-standing', steps: 8, per: .75 });
  [[4.4, 1], [10, 2], [15.6, 3]].forEach(([y0, n], r) => {
    hl(S, 'ax' + r, 4, 28, y0, 'ink-3', 0, { w: .06 }); pt(S, 'e0' + r, 4, y0, 0, C.idle, .32); pt(S, 'e1' + r, 28, y0, 0, C.idle, .32);
    for (let m = 1; m < n; m++) ring(S, `nd${r}_${m}`, 4 + 24 * m / n, y0, .45, 'danger', 0, { w: .1 });
    for (let i = 1; i < 24; i++) { const x = 4 + i, amp = 2 * Math.sin(n * Math.PI * i / 24), Y = j => y0 - amp * Math.cos(n * 2 * Math.PI * j / 8);
      pt(S, `p${r}_${i}`, x, Y(0), 0, C.cur, .24); for (let j = 1; j <= 8; j++) S.move(`p${r}_${i}`, j, x - .24, Y(j) - .24); }
    T(S, 'n' + r, .6, y0 - .5, 'n = ' + n, 'cz-mono ph-s'); T(S, 'f' + r, 28.8, y0 - .5, n === 1 ? 'f₁' : n + 'f₁', 'cz-mono ph-s ph-a'); });
  T(S, 'f', 1, 18.4, 'λₙ = 2L/n · fₙ = nv/2L · L = 0.5 m, v = 200 m/s → 200, 400, 600 Hz', 'cz-tc cz-mono ph-s', 0, { w: 30 });
  S.cap(1, '양 끝이 고정된 줄에서 반대로 가는 두 파동이 겹치면', 'Two waves moving opposite ways on a fixed string')
    .cap(3, '제자리에서 진동하는 정상파가 생겨요', 'add up to a standing wave')
    .cap(5, '빨간 원(마디)은 항상 멈춰 있어요', 'Red circles are nodes that never move')
    .cap(7, '마디 사이 간격 = λ/2 · 진동수는 기본음의 정수배', 'Nodes are λ/2 apart; frequencies are whole multiples');
  return S;
}
function sDoppler() {
  const S = scene({ id: 'ph-doppler', steps: 6, per: 1.1 });
  const xs = j => 9 + 1.7 * j, y = 8.6, rs = 3.4;
  for (let j = 1; j <= 6; j++) for (let i = 0; i < j; i++) { const r = rs * (j - i), top = Math.max(0, .4 - (y - r)), bot = Math.max(0, (y + r) - 16.4);
    ring(S, `c${i}_${j}`, xs(i), y, r, 'accent', j, { w: .12, off: j < 6 ? j + 1 : 0, css: `clip-path:inset(${r3(top)}em 0 ${r3(bot)}em 0)` }); }
  pt(S, 'src', xs(0), y, 0, C.badf, .55); for (let j = 1; j <= 6; j++) S.move('src', j, xs(j) - .55, y - .55);
  T(S, 'fA', 20, 17.4, ['앞: f′ > f (높은 소리)', 'ahead: f′ > f (higher)'], 'ph-s ph-r', 6); T(S, 'fB', 2, 17.4, ['뒤: f′ < f (낮은 소리)', 'behind: f′ < f (lower)'], 'ph-s ph-a', 6);
  T(S, 'f', 1, 19, 'f′ = f(v ± v₀)/(v ∓ vₛ) · vₛ = 34 m/s, f = 500 Hz → 556 Hz / 455 Hz', 'cz-tc cz-mono ph-s', 0, { w: 30 });
  S.cap(1, '음원이 움직이며 파면을 하나씩 내보내요', 'A moving source emits one wavefront at a time')
    .cap(3, '앞쪽은 파면이 촘촘하고 뒤쪽은 성겨요', 'Fronts bunch up ahead and spread out behind')
    .cap(5, '파장이 짧아진 앞에서는 진동수가 높게 들려요', 'Shorter wavelength ahead means higher pitch')
    .cap(6, '구급차 사이렌 · 별의 적색편이 · 도플러 레이더', 'Sirens, redshift and Doppler radar');
  return S;
}

/* ================= thermodynamics ================= */
function sGas() {
  const S = scene({ id: 'ph-gas', steps: 5, per: 1.35 });
  S.el('box', { x: 2, y: 4, w: 16.6, h: 12, css: 'border:.18em solid var(--ink-2);border-right:0;border-radius:.3em 0 0 .3em' });
  S.el('pis', { x: 18.2, y: 3.4, w: .8, h: 13.2, css: `background:${tint('ink-3', 80)};border-radius:.2em;z-index:4` }); S.move('pis', 3, 10.2, 3.4);
  const xr = j => j >= 3 ? 10 : 18;
  for (let m = 0; m < 14; m++) { const P = j => [2.8 + rnd() * (xr(j) - 3.6), 4.8 + rnd() * 10.4], p0 = P(0);
    pt(S, 'm' + m, p0[0], p0[1], 0, C.cur, .32); for (let j = 1; j <= 5; j++) { const p = P(j); S.move('m' + m, j, p[0] - .32, p[1] - .32, j >= 4 ? { background: 'var(--danger)', 'border-color': 'var(--danger)' } : {}); } }
  T(S, 'law', 20.6, 1.8, 'PV = nRT', 'cz-mono ph-big');
  L(S, 'P', 2, 17, 16, 'cz-mono ph-l', [[1, 'P = 1 atm'], [3, 'P = 2 atm · V ½'], [4, 'P = 4 atm · T × 2']]);
  T(S, 'e1', 20.6, 4.4, ['압력 = 벽에 부딪히는 분자들의 충격', 'pressure = molecules hitting the walls'], 'ph-xs', 1);
  T(S, 'e2', 20.6, 6.4, ['V ½ → P 2배 (T 일정)', 'V × ½ → P × 2 (constant T)'], 'ph-s ph-a', 3);
  T(S, 'e3', 20.6, 8.2, ['T 2배 → P 2배 (V 일정)', 'T × 2 → P × 2 (constant V)'], 'ph-s ph-r', 4);
  T(S, 'e4', 20.6, 10.4, 'K̄ = (3/2)kT', 'cz-mono ph-l', 5); T(S, 'e5', 20.6, 12, 'v<sub>rms</sub> = √(3RT/M)', 'cz-mono ph-s', 5); T(S, 'e6', 20.6, 13.4, ['N₂, 300 K → 약 517 m/s', 'N₂ at 300 K → about 517 m/s'], 'ph-s', 5);
  S.cap(1, '기체 분자는 쉬지 않고 무작위로 움직여요', 'Gas molecules move randomly all the time')
    .cap(2, '벽에 부딪히며 밀어내는 힘이 압력', 'Their collisions with the walls are the pressure')
    .cap(3, '부피를 반으로 줄이면 더 자주 부딪혀 압력 2배', 'Halve the volume: twice the collisions, twice the pressure')
    .cap(4, '온도를 높이면 더 빠르고 세게 부딪혀요', 'Heat it and they hit faster and harder')
    .cap(5, '온도는 분자 평균 운동에너지의 척도예요', 'Temperature measures average molecular kinetic energy');
  return S;
}
function sFirstLaw() {
  const S = scene({ id: 'ph-firstlaw', steps: 5, per: 1.35 });
  const F = fr(0, 4, 0, 4, 2.6, 18, 2.4, 17.6), A = [1, 2];
  poly2(S, 'wa', [[F.X(1), F.Y(2)], [F.X(3), F.Y(2)], [F.X(3), F.Y(0)], [F.X(1), F.Y(0)]], tint('accent', 25), 1);
  ax2(S, 'ga', F, 'V (L)', 'P (×10⁵ Pa)');
  mline(S, 'isb', F, A, [3, 2], { st: 1, color: 'accent', h: .24 }); mpt(S, 'B', F, [3, 2], 1, C.cur, .32);
  mline(S, 'isc', F, A, [1, 3.6], { st: 2, color: 'warn', h: .24 }); mpt(S, 'Cp', F, [1, 3.6], 2, C.warn, .32);
  mplot(S, 'ist', F, v => [v, 2 / v], 1, 3, { st: 3, color: 'ok', h: .24, n: 20 }); mpt(S, 'Dp', F, [3, 2 / 3], 3, C.okf, .32);
  mplot(S, 'adi', F, v => [v, 2 * v ** (-5 / 3)], 1, 3, { st: 4, color: 'danger', h: .24, n: 20 }); mpt(S, 'Ep', F, [3, 2 * 3 ** (-5 / 3)], 4, C.badf, .32);
  mpt(S, 'A', F, A, 0, C.idle, .38); mT(S, 'Al', F, A, -1.2, -.4, 'A', 'cz-mono ph-b');
  T(S, 'law', 19.6, 1.8, 'ΔU = Q − W', 'cz-mono ph-big');
  T(S, 'e1', 19.6, 4.4, ['등압: W = PΔV = 400 J', 'isobaric: W = PΔV = 400 J'], 'ph-s ph-a', 1);
  T(S, 'e2', 19.6, 6.2, ['등적: W = 0, Q = ΔU', 'isochoric: W = 0, Q = ΔU'], 'ph-s ph-w', 2);
  T(S, 'e3', 19.6, 8, ['등온: ΔU = 0, Q = W', 'isothermal: ΔU = 0, Q = W'], 'ph-s ph-g', 3); T(S, 'e3b', 19.6, 9.3, 'W = nRT ln(V₂/V₁)', 'cz-mono ph-xs', 3);
  T(S, 'e4', 19.6, 11.1, ['단열: Q = 0, W = −ΔU', 'adiabatic: Q = 0, W = −ΔU'], 'ph-s ph-r', 4); T(S, 'e4b', 19.6, 12.4, ['PV<sup>γ</sup> = 일정 (온도 하강)', 'PV<sup>γ</sup> = constant (cools)'], 'cz-mono ph-xs', 4);
  T(S, 'e5', 19.6, 14.4, ['일 = P-V 곡선 아래 넓이', 'work = area under the P-V curve'], 'ph-s', 5); T(S, 'e6', 19.6, 15.8, ['순환 과정: ΔU = 0', 'cycle: ΔU = 0'], 'ph-s', 5);
  S.cap(1, '압력 일정하게 팽창하면 한 일 = 넓이 PΔV', 'Expanding at constant pressure: work = PΔV')
    .cap(2, '부피가 일정하면 일은 0, 열은 모두 내부에너지로', 'At constant volume no work is done; heat all goes to U')
    .cap(3, '온도 일정하면 내부에너지 변화 0, 받은 열 = 한 일', 'At constant temperature U stays; heat in = work out')
    .cap(4, '열 출입이 없으면 내부에너지를 써서 일해요 (냉각)', 'With no heat flow, work comes out of U and it cools')
    .cap(5, '열역학 제1법칙 = 에너지 보존', 'The first law is energy conservation');
  return S;
}
function sCarnot() {
  const S = scene({ id: 'ph-carnot', steps: 5, per: 1.35 });
  rect(S, 'hot', 2, 1.6, 10, 3.2, 'danger', 30, 0, { cls: 'cz-c ph-bl', html: 'T<sub>H</sub> = 600 K' });
  rect(S, 'cold', 2, 16, 10, 3.2, 'accent', 30, 0, { cls: 'cz-c ph-bl', html: 'T<sub>C</sub> = 300 K' });
  node(S, 'eng', 7, 10.4, ['엔진', 'engine'], { r: 2, s: C.soft });
  ar(S, 'qh', [7, 5], [7, 8.2], 'danger', 1, { h: .36 }); T(S, 'qht', 8, 5.8, 'Q<sub>H</sub> = 1000 J', 'cz-mono ph-s ph-r', 1);
  ar(S, 'w', [9.2, 10.4], [14, 10.4], 'ok', 2, { h: .22 }); T(S, 'wt', 9.6, 11.2, 'W = 500 J', 'cz-mono ph-s ph-g', 2);
  ar(S, 'qc', [7, 12.6], [7, 15.8], 'accent', 2, { h: .22 }); T(S, 'qct', 8, 13.6, 'Q<sub>C</sub> = 500 J', 'cz-mono ph-s ph-a', 2);
  const G = fr(.8, 4.2, 0, 3.4, 16.6, 31, 2, 12.4);
  ax2(S, 'ga', G, 'V', 'P');
  const c1 = 1.5 * 2 ** 2.2, V3 = (c1 / 1.5) ** (1 / 1.2), V4 = 2 ** (1 / 1.2), pts = [];
  const pushC = (f, a, b) => { for (let i = 0; i <= 12; i++) { const v = a + (b - a) * i / 12; pts.push([G.X(v), G.Y(f(v))]); } };
  pushC(v => 3 / v, 1, 2); pushC(v => c1 * v ** -2.2, 2, V3); pushC(v => 1.5 / v, V3, V4); pushC(v => 3 * v ** -2.2, V4, 1);
  poly2(S, 'cyc', pts, tint('ok', 35), 3);
  mplot(S, 'h1', G, v => [v, 3 / v], 1, 2, { st: 3, color: 'danger', h: .2, n: 12 }); mplot(S, 'a1', G, v => [v, c1 * v ** -2.2], 2, V3, { st: 3, color: 'ink-2', h: .2, n: 12 });
  mplot(S, 'c1', G, v => [v, 1.5 / v], V4, V3, { st: 3, color: 'accent', h: .2, n: 12 }); mplot(S, 'a2', G, v => [v, 3 * v ** -2.2], 1, V4, { st: 3, color: 'ink-2', h: .2, n: 12 });
  T(S, 'cl', 18.4, 13, ['카르노 순환 · 넓이 = W', 'Carnot cycle · area = W'], 'ph-xs', 3);
  T(S, 'e1', 16.6, 14.8, 'e = W/Q<sub>H</sub> = 1 − Q<sub>C</sub>/Q<sub>H</sub>', 'cz-mono ph-s', 4);
  T(S, 'e2', 16.6, 16.2, 'e<sub>max</sub> = 1 − T<sub>C</sub>/T<sub>H</sub> = 50%', 'cz-mono ph-l ph-g', 4);
  T(S, 'e3', 16.6, 17.8, 'ΔS = Q/T: 1000/600 = 500/300', 'cz-mono ph-s', 5); T(S, 'e4', 16.6, 19.2, ['고립계 엔트로피는 줄지 않아요', 'isolated entropy never decreases'], 'ph-s ph-r', 5);
  S.cap(1, '고온에서 열 Q_H를 받아', 'Take heat Q_H from the hot reservoir')
    .cap(2, '일부를 일 W로 바꾸고 나머지 Q_C는 저온으로 버려요', 'turn part into work W and dump the rest Q_C')
    .cap(3, '가장 효율이 좋은 순환이 카르노 순환', 'The most efficient cycle is the Carnot cycle')
    .cap(4, '효율의 한계는 두 온도로만 정해져요', 'Its efficiency depends only on the two temperatures')
    .cap(5, '열을 100% 일로 바꿀 수 없어요 (제2법칙)', 'No engine turns heat entirely into work: the second law');
  return S;
}

/* ================= electricity ================= */
function sCoulomb() {
  const S = scene({ id: 'ph-coulomb', steps: 5, per: 1.35 });
  chg(S, 'a', 8, 6.4, 1, 0); chg(S, 'b', 16, 6.4, -1, 0); S.move('b', 2, 24 - 1, 6.4 - 1);
  ar(S, 'fa', [9.1, 6.4], [11.6, 6.4], 'ink-2', 1, { h: .22, off: 2 }); ar(S, 'fb', [14.9, 6.4], [12.4, 6.4], 'ink-2', 1, { h: .22, off: 2 });
  ar(S, 'fa2', [9.1, 6.4], [10.1, 6.4], 'ink-2', 2, { h: .22, off: 3 }); ar(S, 'fb2', [22.9, 6.4], [21.9, 6.4], 'ink-2', 2, { h: .22, off: 3 });
  T(S, 'r0', 8, 8.4, 'r', 'cz-tc cz-mono ph-s', 0, { w: 8, off: 2 }); T(S, 'r1', 8, 8.4, '2r → F/4', 'cz-tc cz-mono ph-s', 2, { w: 16 });
  T(S, 'at', 9, 3.4, ['다른 부호: 끌어당김', 'opposite signs attract'], 'ph-s', 1, { off: 3 });
  chg(S, 'c', 8, 14, 1, 3); chg(S, 'd', 16, 14, 1, 3);
  ar(S, 'fc', [6.9, 14], [4.4, 14], 'ink-2', 3, { h: .22 }); ar(S, 'fd', [17.1, 14], [19.6, 14], 'ink-2', 3, { h: .22 });
  T(S, 'rp', 9, 11.2, ['같은 부호: 밀어냄', 'like signs repel'], 'ph-s', 3);
  T(S, 'F', 23, 12, 'F = kq₁q₂/r²', 'cz-mono ph-l', 0);
  T(S, 'e1', 1, 17.6, 'k = 9×10⁹ N·m²/C² · q₁ = q₂ = 1 μC, r = 0.1 m → F = 0.9 N', 'cz-tc cz-mono ph-s', 4, { w: 30 });
  T(S, 'e2', 1, 19, ['여러 전하: 힘을 벡터로 더해요 (중첩 원리)', 'several charges: add the forces as vectors (superposition)'], 'cz-tc ph-s', 5, { w: 30 });
  S.cap(1, '두 전하 사이의 힘은 서로 같은 크기, 반대 방향', 'Two charges pull on each other equally and oppositely')
    .cap(2, '거리를 2배로 하면 힘은 ¼ (역제곱 법칙)', 'Double the distance and the force drops to a quarter')
    .cap(3, '같은 부호끼리는 밀어내요', 'Like charges repel')
    .cap(4, '쿨롱 상수 k는 매우 커서 작은 전하도 큰 힘', 'k is huge, so small charges give sizable forces')
    .cap(5, '전하가 여럿이면 각각의 힘을 벡터 합', 'With many charges, add the forces as vectors');
  return S;
}
function fieldLines(P, Q, starts, bounds) {
  const out = [];
  starts.forEach(([x, y]) => { const pts = [[x, y]]; let p = [x, y];
    for (let s = 0; s < 400; s++) { let ex = 0, ey = 0; for (const [qx, qy, q] of Q) { const dx = p[0] - qx, dy = p[1] - qy, r = Math.hypot(dx, dy); ex += q * dx / r ** 3; ey += q * dy / r ** 3; }
      const m = Math.hypot(ex, ey) || 1; p = [p[0] + .2 * ex / m, p[1] + .2 * ey / m]; pts.push(p);
      if (Q.some(([qx, qy, q]) => q < 0 && Math.hypot(p[0] - qx, p[1] - qy) < .9) || p[0] < bounds[0] || p[0] > bounds[1] || p[1] < bounds[2] || p[1] > bounds[3]) break; }
    out.push(rdp(pts, .06)); });
  return out;
}
function sEfield() {
  const S = scene({ id: 'ph-efield', steps: 5, per: 1.35 });
  const P = [9, 9.2], N = [21, 9.2];
  for (let a = 0; a < 360; a += 30) { const t = a * D2R; ar(S, 'r' + a, [P[0] + 1.2 * Math.cos(t), P[1] + 1.2 * Math.sin(t)], [P[0] + 6 * Math.cos(t), P[1] + 6 * Math.sin(t)], 'danger', 1, { h: .1, off: 2 }); }
  const starts = []; for (let a = 15; a < 360; a += 30) starts.push([P[0] + 1.05 * Math.cos(a * D2R), P[1] + 1.05 * Math.sin(a * D2R)]);
  fieldLines(P, [[P[0], P[1], 1], [N[0], N[1], -1]], starts, [.4, 31.6, .4, 17]).forEach((pts, i) => {
    poly(S, `fl${i}_`, pts, { st: 2, color: 'ink-2', h: .1 }); const m = Math.floor(pts.length / 2); if (pts.length > 3) ar(S, 'fa' + i, pts[m - 1], pts[m], 'ink-2', 2, { h: .1 }); });
  chg(S, 'p', P[0], P[1], 1, 0, { r: .9 }); chg(S, 'n', N[0], N[1], -1, 2, { r: .9 });
  pt(S, 'tq', 15, 4.3, 3, C.okf, .4); ar(S, 'tf', [15, 4.3], [18, 5.2], 'ok', 3, { h: .22 }); T(S, 'tqt', 13.4, 2.8, 'F = qE', 'cz-mono ph-s ph-g', 3);
  T(S, 'e1', 1, 17.8, ['E = F/q · 점전하 E = kq/r²', 'E = F/q · point charge E = kq/r²'], 'cz-tc cz-mono ph-l', 4, { w: 30 });
  T(S, 'e2', 1, 19.3, ['전기력선은 +에서 나와 −로 · 서로 교차하지 않고 · 촘촘할수록 강한 장', 'lines leave + and end on − · never cross · denser = stronger'], 'cz-tc ph-s', 5, { w: 30 });
  S.cap(1, '양전하 주위의 전기장은 바깥을 향해요', 'Around a positive charge the field points outward')
    .cap(2, '음전하가 옆에 있으면 전기력선이 휘어 들어가요 (쌍극자)', 'Add a negative charge and the lines bend into it')
    .cap(3, '시험 전하는 전기력선의 접선 방향으로 힘을 받아요', 'A test charge feels a force along the line')
    .cap(4, '전기장 = 단위 전하가 받는 힘', 'The field is the force per unit charge')
    .cap(5, '전기력선 밀도가 전기장의 세기', 'Line density shows the field strength');
  return S;
}
function sGaussLaw() {
  const S = scene({ id: 'ph-gauss', steps: 5, per: 1.35 });
  const P = [9.5, 10];
  for (let a = 0; a < 360; a += 45) { const t = a * D2R; ar(S, 'r' + a, [P[0] + 1.1 * Math.cos(t), P[1] + 1.1 * Math.sin(t)], [P[0] + 8.4 * Math.cos(t), P[1] + 8.4 * Math.sin(t)], 'ink-2', 0, { h: .1 }); }
  chg(S, 'q', P[0], P[1], 1, 0, { r: .9 });
  ring(S, 's1', P[0], P[1], 3, 'accent', 1, { dash: 1, w: .16, off: 2, fill: tint('accent', 10) });
  ring(S, 's2', P[0], P[1], 6, 'accent', 2, { dash: 1, w: .16, off: 3, fill: tint('accent', 8) });
  ell(S, 's3', P[0] - 7, P[1] - 4, 12, 7, 'accent', 3, { dash: 1, w: .16, off: 4, fill: tint('accent', 8), css: 'transform:rotate(-20deg)' });
  T(S, 'n', 20, 2, ['면을 뚫는 전기력선 수', 'lines crossing the surface'], 'ph-s', 1); L(S, 'nv', 20, 3.6, 11, 'cz-mono ph-l', [[1, '8'], [2, ['8 (반지름 무관)', '8 (any radius)']], [3, ['8 (모양 무관)', '8 (any shape)']]]);
  ring(S, 'o', 25.5, 12.6, 3.2, 'warn', 4, { dash: 1, w: .16, fill: tint('warn', 10) });
  [10.4, 12.6, 14.8].forEach((y, i) => ar(S, 'u' + i, [19.6, y], [31.4, y], 'ink-2', 4, { h: .1 }));
  T(S, 'ot', 20, 16.4, ['밖의 전하: 들어온 만큼 나감 → 0', 'outside charge: in = out → 0'], 'ph-xs', 4);
  T(S, 'e1', 1, 18.2, ['Φ = ∮E·dA = q<sub>안</sub>/ε₀', 'Φ = ∮E·dA = q<sub>enc</sub>/ε₀'], 'cz-mono ph-l', 5);
  T(S, 'e2', 15, 18.2, ['구: E·4πr² = q/ε₀ → E = kq/r²', 'sphere: E·4πr² = q/ε₀ → E = kq/r²'], 'ph-s', 5);
  T(S, 'e3', 1, 19.6, ['무한 평면 E = σ/2ε₀ · 도체 내부 E = 0', 'infinite plane E = σ/2ε₀ · inside a conductor E = 0'], 'ph-s', 5);
  S.cap(1, '전하를 감싸는 닫힌 면을 지나는 전기력선 수(선속)는', 'The flux through a closed surface around a charge')
    .cap(2, '면을 키워도', 'stays the same for a bigger surface')
    .cap(3, '모양을 바꿔도 같아요 · 안의 전하에만 비례', 'and any shape: it depends only on the enclosed charge')
    .cap(4, '전하가 밖에 있으면 선속은 0', 'With the charge outside the flux is zero')
    .cap(5, '대칭이 있으면 가우스 법칙으로 전기장을 바로 구해요', 'With symmetry, Gauss’s law gives E in one line');
  return S;
}
function sPotential() {
  const S = scene({ id: 'ph-potential', steps: 5, per: 1.35 });
  const P = [9, 10.5], u = 2.5;
  [1, 2, 3].forEach((r, i) => { ring(S, 'eq' + r, P[0], P[1], r * u, 'accent', 0, { dash: 1, w: .12 }); T(S, 'v' + r, P[0] - 1.6, P[1] - r * u - 1.1, [90, 45, 30][i] + ' V', 'cz-tc cz-mono ph-s ph-a', 0, { w: 3.2 }); });
  for (let a = 0; a < 360; a += 45) { const t = a * D2R; ar(S, 'r' + a, [P[0] + 1 * Math.cos(t), P[1] + 1 * Math.sin(t)], [P[0] + 8.6 * Math.cos(t), P[1] + 8.6 * Math.sin(t)], 'danger', 2, { h: .08 }); }
  chg(S, 'q', P[0], P[1], 1, 0, { r: .8 });
  wrap(S, 'tw', P[0] - 2 * u, P[1] - 2 * u, 4 * u, 4 * u, KD(4 * u, 2 * u, .45, 'var(--ok)'), { st: 3, off: 4, t0: 'rotate(-20deg)' }); S.set('tw', 3, { transform: 'rotate(-130deg)', opacity: '1' });
  pt(S, 'tm', P[0] + 2 * u, P[1], 4, C.okf, .45); S.move('tm', 5, P[0] + u - .45, P[1] - .45);
  T(S, 't3', 20.4, 13.6, ['등전위선 따라 이동: W = 0', 'along an equipotential: W = 0'], 'ph-s ph-g', 3);
  T(S, 't4', 20.4, 15.2, ['45 V → 90 V로 이동', 'move 45 V → 90 V'], 'ph-s', 4); T(S, 't5', 20.4, 16.6, 'W = qΔV = 1 μC × 45 V = 45 μJ', 'cz-mono ph-xs', 5);
  T(S, 't6', 20.4, 18.2, ['E = −dV/dr · 전기력선 ⟂ 등전위면', 'E = −dV/dr · field lines ⟂ equipotentials'], 'ph-xs', 5);
  const G = fr(0, 4, 0, 100, 21, 31, 2.4, 10.4);
  ax2(S, 'ga', G, 'r', 'V'); mplot(S, 'vr', G, r => [r, 90 / r], .9, 4, { n: 24, color: 'accent', h: .18 });
  [1, 2, 3].forEach(r => mpt(S, 'gp' + r, G, [r, 90 / r], 0, C.cur, .25)); T(S, 'gt', 23.4, 11, 'V = kq/r', 'cz-mono ph-s');
  S.cap(1, '점전하 주위에서 전위가 같은 점들은 동심원을 이뤄요', 'Points at equal potential form circles around a point charge')
    .cap(2, '전기력선은 등전위선과 항상 수직', 'Field lines always cross equipotentials at right angles')
    .cap(3, '등전위선을 따라 옮기면 일이 필요 없어요', 'Moving along an equipotential takes no work')
    .cap(4, '전위가 높은 곳으로 양전하를 옮기면', 'Pushing a positive charge to higher potential')
    .cap(5, 'qΔV만큼 일이 필요해요', 'takes work qΔV');
  return S;
}
function sCapacitor() {
  const S = scene({ id: 'ph-capacitor', steps: 5, per: 1.35 });
  const plates = (k, xr, st, off, nq, est) => {
    rect(S, k + 'L', 8.6, 3.6, .8, 12.4, 'danger', 70, st, { off, r: .1 }); rect(S, k + 'R', xr, 3.6, .8, 12.4, 'accent', 70, st, { off, r: .1 });
    for (let i = 0; i < nq; i++) { const y = 4.2 + (11.2 * (i + .5)) / nq; T(S, `${k}p${i}`, 9.6, y - .4, '+', 'cz-mono ph-s ph-r', st, { off }); T(S, `${k}m${i}`, xr - .8, y - .4, '−', 'cz-mono ph-s ph-a', st, { off }); }
    [6, 9.8, 13.6].forEach((y, i) => ar(S, `${k}e${i}`, [10.6, y], [xr - 1.2, y], 'ink-3', est, { h: .1, off })); };
  plates('a', 17, 0, 3, 5, 2); plates('b', 13, 3, 4, 10, 3);
  rect(S, 'die', 9.6, 3.6, 3.2, 12.4, 'warn', 30, 4, { r: 0 }); plates('c', 13, 4, 0, 16, 4);
  seg(S, 'w6', [13.4, 2.2], [17.4, 2.2], 0, 'ink-2', .12, { off: 3 }); seg(S, 'w7', [17.4, 2.2], [17.4, 3.6], 0, 'ink-2', .12, { off: 3 }); seg(S, 'w8', [13.4, 2.2], [13.4, 3.6], 3, 'ink-2', .12);
  [[9, 16, 9, 18.4], [9, 18.4, 3.6, 18.4], [3.6, 18.4, 3.6, 10.4]].forEach(([a, b, c, d], i) => seg(S, 'w' + i, [a, b], [c, d], 0, 'ink-2', .12));
  hl(S, 'bt1', 2.4, 4.8, 10.4, 'ink-2', 0, { w: .2 }); hl(S, 'bt2', 3, 4.2, 9.6, 'ink-2', 0, { w: .4 }); T(S, 'bv', .6, 8.4, '12 V', 'cz-mono ph-s');
  seg(S, 'w4', [3.6, 9.6], [3.6, 2.2], 0, 'ink-2', .12); seg(S, 'w5', [3.6, 2.2], [13.4, 2.2], 0, 'ink-2', .12);
  T(S, 'f0', 20.4, 1.8, 'C = ε₀A/d · Q = CV', 'cz-mono ph-l');
  T(S, 'f1', 20.4, 4, ['판 사이 E = V/d (균일)', 'between plates E = V/d (uniform)'], 'ph-s', 2);
  T(S, 'f2', 20.4, 6, ['d ½ → C 2배, Q 2배', 'd × ½ → C × 2, Q × 2'], 'ph-s ph-a', 3);
  T(S, 'f3', 20.4, 8, ['유전체: C = κε₀A/d', 'dielectric: C = κε₀A/d'], 'ph-s ph-w', 4);
  T(S, 'f4', 20.4, 10.2, 'U = ½CV² = Q²/2C', 'cz-mono ph-l', 5);
  T(S, 'f5', 20.4, 12, ['직렬 1/C = Σ1/Cᵢ', 'series 1/C = Σ1/Cᵢ'], 'ph-s', 5); T(S, 'f6', 20.4, 13.4, ['병렬 C = ΣCᵢ', 'parallel C = ΣCᵢ'], 'ph-s', 5);
  S.cap(1, '전지를 연결하면 두 판에 +Q, −Q가 쌓여요', 'Connect a battery and the plates gain +Q and −Q')
    .cap(2, '판 사이에는 균일한 전기장이 생겨요', 'A uniform field forms between them')
    .cap(3, '간격을 반으로 줄이면 전기용량 2배, 전하도 2배', 'Halve the gap: twice the capacitance and charge')
    .cap(4, '유전체를 넣으면 κ배 더 많이 저장해요', 'A dielectric stores κ times more')
    .cap(5, '축전기는 전기장에 에너지를 저장해요', 'A capacitor stores energy in its field');
  return S;
}
function sCircuit() {
  const S = scene({ id: 'ph-circuit', steps: 5, per: 1.35 });
  const W = (k, a, b) => seg(S, k, a, b, 0, 'ink-2', .14);
  W('w1', [3, 4], [9, 4]); W('w2', [14, 4], [28, 4]); W('w3', [3, 18], [28, 18]); W('w4', [3, 4], [3, 10.4]); W('w5', [3, 11.6], [3, 18]);
  W('w6', [20, 4], [20, 9]); W('w7', [20, 13], [20, 18]); W('w8', [28, 4], [28, 9]); W('w9', [28, 13], [28, 18]);
  hl(S, 'b1', 1.6, 4.4, 10.4, 'ink-2', 0, { w: .2 }); hl(S, 'b2', 2.2, 3.8, 11.6, 'ink-2', 0, { w: .44 }); T(S, 'bv', .4, 12.2, '12 V', 'cz-mono ph-s');
  box(S, 'R1', 9, 3.1, 5, 1.8, 'warn', 'R₁ 2Ω', 0, { pct: 30 }); box(S, 'R2', 19.1, 9, 1.8, 4, 'warn', '6Ω', 0, { pct: 30 }); box(S, 'R3', 27.1, 9, 1.8, 4, 'warn', '3Ω', 0, { pct: 30 });
  pt(S, 'j', 20, 4, 0, C.idle, .28); pt(S, 'j2', 20, 18, 0, C.idle, .28);
  ar(S, 'I', [5, 3], [8, 3], 'danger', 3, { h: .2 }); T(S, 'It', 4.6, 1.4, 'I = 3 A', 'cz-mono ph-s ph-r', 3);
  ar(S, 'I2', [19.2, 5.4], [19.2, 8.2], 'danger', 4, { h: .16 }); T(S, 'I2t', 16.4, 6, '1 A', 'cz-mono ph-s ph-r', 4);
  ar(S, 'I3', [27.2, 5.4], [27.2, 8.2], 'danger', 4, { h: .24 }); T(S, 'I3t', 24.4, 6, '2 A', 'cz-mono ph-s ph-r', 4);
  T(S, 'e1', 5.6, 7, 'V = IR', 'cz-mono ph-big');
  T(S, 'e2', 5.6, 9, 'R₂∥R₃ = 6·3/(6+3) = 2Ω', 'cz-mono ph-s', 2); T(S, 'e3', 5.6, 10.4, 'R = 2 + 2 = 4Ω', 'cz-mono ph-s', 2);
  T(S, 'e4', 5.6, 12, 'I = 12/4 = 3 A', 'cz-mono ph-s ph-r', 3);
  T(S, 'e5', 5.6, 13.6, ['접합점: 3 = 1 + 2 (KCL)', 'junction: 3 = 1 + 2 (KCL)'], 'ph-s', 4);
  T(S, 'e6', 5.6, 15.2, ['고리: 12 = 3·2 + 6 (KVL)', 'loop: 12 = 3·2 + 6 (KVL)'], 'ph-s', 5); T(S, 'e7', 5.6, 16.6, 'P = IV = I²R', 'cz-mono ph-xs', 5);
  S.cap(1, '전지 12 V, 저항 R₁과 병렬 R₂, R₃', 'A 12 V battery, R₁ in series with R₂ ∥ R₃')
    .cap(2, '병렬 부분을 합성 저항 하나로 바꾸면', 'Replace the parallel pair by its equivalent')
    .cap(3, '옴의 법칙으로 전체 전류가 나와요', 'Ohm’s law gives the total current')
    .cap(4, '갈림길에서 들어온 전류 = 나간 전류 (전하 보존)', 'At a junction, current in = current out')
    .cap(5, '한 바퀴 돈 전압 변화의 합 = 0 (에너지 보존)', 'Around any loop the voltages sum to zero');
  return S;
}
function sRC() {
  const S = scene({ id: 'ph-rc', steps: 5, per: 1.35 });
  const G1 = fr(0, 5.2, 0, 1.1, 2.4, 15, 3.4, 14.6), G2 = fr(0, 5.2, 0, 1.1, 18.4, 31, 3.4, 14.6);
  [[G1, 'q', t => 1 - Math.exp(-t), 'accent', ['전하 q / CV', 'charge q / CV'], .632, '63%'], [G2, 'i', t => Math.exp(-t), 'danger', ['전류 i / (V/R)', 'current i / (V/R)'], .368, '37%']].forEach(([G, k, f, c, ttl, at1, lab]) => {
    ax2(S, k + 'a', G, ['t (τ)', 't (τ)']); T(S, k + 't', G.L, 1.6, ttl, 'ph-l');
    mplot(S, k + 'c', G, t => [t, f(t)], 0, 5, { st: i => i <= 8 ? 1 : i <= 16 ? 2 : 3, n: 40, color: c, h: .2 });
    hl(S, k + 'h', G.X(0), G.X(1), G.Y(at1), 'ink-3', 1, { dash: 1, w: .08 }); vl(S, k + 'v', G.X(1), G.Y(at1), G.Y(0), 'ink-3', 1, { dash: 1, w: .08 });
    mT(S, k + 'l', G, [1, at1], .3, -.8, lab, 'cz-mono ph-s', 1); mT(S, k + 'tau', G, [1, 0], -.3, .3, 'τ', 'cz-mono ph-xs', 1); });
  T(S, 'f1', 1, 16.2, 'q(t) = CV(1 − e<sup>−t/RC</sup>) · i(t) = (V/R) e<sup>−t/RC</sup>', 'cz-tc cz-mono ph-l', 0, { w: 30 });
  T(S, 'f2', 1, 17.8, ['τ = RC = 10 kΩ × 100 μF = 1 s · 5τ면 99% 충전', 'τ = RC = 10 kΩ × 100 μF = 1 s · 99% charged after 5τ'], 'cz-tc ph-s', 2, { w: 30 });
  T(S, 'f3', 1, 19.2, ['방전 q = Q e<sup>−t/RC</sup> · RL 회로 τ = L/R', 'discharge q = Q e<sup>−t/RC</sup> · RL circuit τ = L/R'], 'cz-tc ph-s', 4, { w: 30 });
  S.cap(1, '스위치를 닫으면 처음엔 전류가 크고, 시간 상수 τ = RC 뒤에는', 'Close the switch: a big current at first; after τ = RC')
    .cap(2, '전하는 63%, 전류는 37%가 돼요', 'the charge is at 63% and the current at 37%')
    .cap(3, '충전될수록 전류는 지수적으로 줄어요', 'Current decays exponentially as it charges')
    .cap(4, '방전도 같은 시간 상수로 줄어요', 'Discharging follows the same time constant')
    .cap(5, '타이머, 필터, 카메라 플래시에 써요', 'Used in timers, filters and camera flashes');
  return S;
}

/* ================= magnetism ================= */
function sLorentz() {
  const S = scene({ id: 'ph-lorentz', steps: 5, per: 1.35 });
  for (let i = 0; i < 7; i++) for (let j = 0; j < 6; j++) T(S, `x${i}${j}`, 1.4 + i * 2.8, 2 + j * 3.1, '×', 'cz-tc ph-s', 0, { w: 1.2, css: 'opacity:.45' });
  const cx = 10, cy = 10.5;
  [[3, 1, [[2, 90], [3, 180], [4, 270], [5, 360]], 'accent'], [6, 3, [[4, 90], [5, 180]], 'warn']].forEach(([r, st, rs, c], i) => {
    ring(S, 'o' + i, cx, cy, r, 'ink-3', st, { dash: 1, w: .08 });
    wrap(S, 'w' + i, cx - r, cy - r, 2 * r, 2 * r, KV(r, 2 * r, 1.4 + i * 1.4, 0, c, .2) + KV(r, 2 * r, 1.6, 90, 'danger', .18) + KD(r, 2 * r, .45, `var(--${c})`), { st });
    rs.forEach(([s, a]) => rot(S, 'w' + i, s, a)); });
  T(S, 'B', 20.4, 1.6, ['B: 종이 속으로 (×)', 'B: into the page (×)'], 'ph-s');
  T(S, 'f', 20.4, 3.4, 'F = qv × B', 'cz-mono ph-big');
  T(S, 'e1', 20.4, 6, ['힘 ⟂ 속도 → 원운동', 'F ⟂ v → circular motion'], 'ph-s', 2); T(S, 'e2', 20.4, 7.6, 'qvB = mv²/r → r = mv/qB', 'cz-mono ph-s', 2);
  T(S, 'e3', 20.4, 9.6, ['v 2배 → r 2배', 'v × 2 → r × 2'], 'ph-s ph-w', 3);
  T(S, 'e4', 20.4, 11.4, 'T = 2πm/qB', 'cz-mono ph-l', 4); T(S, 'e5', 20.4, 12.8, ['속력과 무관 (사이클로트론)', 'independent of speed (cyclotron)'], 'ph-xs', 4);
  T(S, 'e6', 20.4, 14.8, ['도선: F = IL × B', 'wire: F = IL × B'], 'ph-s', 5); T(S, 'e7', 20.4, 16.2, ['자기력은 일을 하지 않아요', 'magnetic force does no work'], 'ph-xs', 5);
  S.cap(1, '자기장 속으로 양전하가 들어오면', 'A positive charge enters a magnetic field')
    .cap(2, '속도에 수직인 힘을 받아 원을 그려요', 'It feels a force perpendicular to v and circles')
    .cap(3, '더 빠른 입자는 더 큰 원을 그리지만', 'A faster particle makes a bigger circle')
    .cap(4, '한 바퀴 도는 시간은 같아요', 'but takes the same time per lap')
    .cap(5, '힘이 늘 속도에 수직이라 속력은 변하지 않아요', 'The force is always ⟂ v, so speed never changes');
  return S;
}
function sAmpere() {
  const S = scene({ id: 'ph-ampere', steps: 5, per: 1.35 });
  const P = [8.5, 9.4];
  [2.4, 4.6, 6.8].forEach((r, i) => { ring(S, 'c' + i, P[0], P[1], r, 'accent', 0, { w: .1, dash: 1 }); ar(S, 'a' + i, [P[0] + .1, P[1] - r], [P[0] - [2.4, 1.3, .9][i], P[1] - r], 'accent', 2, { h: .2 }); });
  ring(S, 'amp', P[0], P[1], 4.6, 'ok', 3, { w: .22 });
  ring(S, 'wire', P[0], P[1], .8, 'ink-2', 0, { w: .16, fill: 'var(--ui)', css: 'z-index:4' }); pt(S, 'wd', P[0], P[1], 0, { background: 'var(--ink)', 'border-color': 'var(--ink)' }, .22);
  T(S, 'wl', P[0] - 4, P[1] + 7.6, ['전류 I: 종이 밖으로 (⊙)', 'current I out of the page (⊙)'], 'cz-tc ph-xs', 0, { w: 8 });
  T(S, 'e1', 17.4, 1.6, 'B = μ₀I / 2πr', 'cz-mono ph-l', 2); T(S, 'e2', 17.4, 3.1, ['오른손 법칙 · 멀수록 약해요', 'right-hand rule · weaker farther out'], 'ph-xs', 2);
  T(S, 'e3', 17.4, 4.8, '∮B·dl = μ₀I<sub>enc</sub>', 'cz-mono ph-l ph-g', 3); T(S, 'e4', 17.4, 6.3, 'I = 10 A, r = 2 cm → B = 1×10⁻⁴ T', 'cz-mono ph-xs', 3);
  for (let k = 0; k < 8; k++) ell(S, 'sl' + k, 19 + 1.4 * k, 9.6, 1.1, 5.4, 'warn', 4, { w: .16 });
  [11, 12.3, 13.6].forEach((y, i) => ar(S, 'sb' + i, [18.4, y], [30.8, y], 'accent', 4, { h: .14 }));
  T(S, 'e5', 19, 15.6, ['솔레노이드 내부: B = μ₀nI (균일)', 'inside a solenoid: B = μ₀nI (uniform)'], 'ph-s', 4);
  T(S, 'e6', 1, 18.4, ['같은 방향 평행 전류는 끌어당겨요 · F/L = μ₀I₁I₂ / 2πd', 'parallel currents attract · F/L = μ₀I₁I₂ / 2πd'], 'cz-tc ph-s', 5, { w: 30 });
  S.cap(1, '전류가 흐르는 도선 주위에 원형 자기장이 생겨요', 'A current makes circular magnetic field lines')
    .cap(2, '세기는 거리에 반비례', 'whose strength falls off as 1/r')
    .cap(3, '닫힌 경로를 따라 B를 더하면 μ₀ × 감싼 전류 (앙페르 법칙)', 'Summing B around a loop gives μ₀ times the enclosed current')
    .cap(4, '도선을 감은 솔레노이드 안은 균일한 자기장', 'A solenoid makes a uniform field inside')
    .cap(5, '전류끼리도 자기력으로 서로 당기거나 밀어요', 'Currents push or pull on each other magnetically');
  return S;
}
function sFaraday() {
  const S = scene({ id: 'ph-faraday', steps: 5, per: 1.35 });
  ell(S, 'coil', 17.6, 5.4, 3.4, 10.4, 'warn', 0, { w: .5 });
  seg(S, 'l1', [19.3, 15.6], [19.3, 18.6], 0, 'ink-2', .12); seg(S, 'l2', [19.3, 18.6], [25, 18.6], 0, 'ink-2', .12);
  S.el('dial', { x: 25, y: 14.6, w: 6, h: 6, css: 'border-radius:50%;border:.14em solid var(--ink-3);clip-path:inset(0 0 50% 0)' });
  wrap(S, 'nd', 27.9, 14.8, .2, 3, KB(0, 0, .2, 3, 'background:var(--danger)'), { ox: .1, oy: 3 }); S.set('nd', 2, { transform: 'rotate(40deg)' }); S.set('nd', 3, { transform: 'rotate(0deg)' }); S.set('nd', 4, { transform: 'rotate(-40deg)' }); S.set('nd', 5, { transform: 'rotate(0deg)' });
  T(S, 'G', 27.2, 18.6, 'G', 'cz-mono ph-b');
  wrap(S, 'mag', 2, 9.2, 6.4, 2.4, KB(0, 0, 3.2, 2.4, `background:${tint('accent', 60)}`) + KB(3.2, 0, 3.2, 2.4, `background:${tint('danger', 60)}`) + KT(1.2, .8, 'S') + KT(4.4, .8, 'N'), { t0: 'translate(0em,0em)' });
  S.set('mag', 2, { transform: 'translate(7em,0em)' }); S.set('mag', 4, { transform: 'translate(0em,0em)' });
  [9.4, 10.4, 11.4].forEach((y, i) => ar(S, 'fl' + i, [15.6, y], [18.2, y + (y - 10.4) * .6], 'accent', 2, { h: .1, off: 3 }));
  ar(S, 'ic', [16.4, 6.6], [18.8, 5.6], 'danger', 2, { h: .2, off: 3 }); ar(S, 'ic2', [18.8, 5.6], [16.4, 6.6], 'danger', 4, { h: .2, off: 5 });
  T(S, 'e1', 22.6, 2, ['Φ 증가 → 유도 전류', 'Φ rises → induced current'], 'ph-s ph-r', 2); T(S, 'e2', 22.6, 3.4, ['변화를 방해하는 방향', 'opposes the change'], 'ph-xs', 2);
  T(S, 'e3', 22.6, 5.2, ['멈추면 Φ 일정 → 0', 'stopped: Φ constant → 0'], 'ph-s', 3);
  T(S, 'e4', 22.6, 7, ['멀어지면 반대 방향', 'pulled away: reversed'], 'ph-s ph-a', 4);
  T(S, 'e5', 22.6, 9, 'ε = −N dΦ/dt', 'cz-mono ph-l', 5); T(S, 'e6', 22.6, 10.6, ['움직이는 도선 ε = BLv', 'moving rod ε = BLv'], 'ph-xs', 5);
  S.cap(1, '코일과 검류계, 그리고 막대자석', 'A coil, a galvanometer and a bar magnet')
    .cap(2, '자석이 다가오면 코일을 지나는 자기 선속이 늘어 전류가 흘러요', 'The approaching magnet raises the flux and drives a current')
    .cap(3, '자석이 멈추면 선속이 변하지 않아 전류도 0', 'Stop the magnet and the current stops')
    .cap(4, '멀어지면 반대 방향으로 흘러요 (렌츠 법칙)', 'Pull it away and the current reverses: Lenz’s law')
    .cap(5, '발전기와 변압기, 무선 충전의 원리', 'The principle behind generators, transformers and wireless charging');
  return S;
}
function sLC() {
  const S = scene({ id: 'ph-lc', steps: 5, per: 1.35 });
  hl(S, 'cp1', 3, 7, 5.6, 'ink-2', 0, { w: .26 }); hl(S, 'cp2', 3, 7, 7, 'ink-2', 0, { w: .26 });
  seg(S, 'w1', [5, 5.6], [5, 2.4], 0, 'ink-2', .12); seg(S, 'w2', [5, 2.4], [17, 2.4], 0, 'ink-2', .12); seg(S, 'w3', [5, 7], [5, 10.4], 0, 'ink-2', .12); seg(S, 'w4', [5, 10.4], [17, 10.4], 0, 'ink-2', .12);
  for (let k = 0; k < 5; k++) ell(S, 'lc' + k, 16, 3.2 + 1.35 * k, 2, 1.6, 'warn', 0, { w: .14, css: 'clip-path:inset(0 0 0 50%)' });
  T(S, 'Cl', .8, 5.6, 'C', 'cz-mono ph-b'); T(S, 'Ll', 18.6, 5.6, 'L', 'cz-mono ph-b');
  const sg = [1, 0, -1, 0, 1];
  sg.forEach((s, i) => { if (!s) return; T(S, 'qa' + i, 7.4, 4.2, s > 0 ? '+Q' : '−Q', 'cz-mono ph-s ' + (s > 0 ? 'ph-r' : 'ph-a'), i, { off: i + 1 }); T(S, 'qb' + i, 7.4, 7.4, s > 0 ? '−Q' : '+Q', 'cz-mono ph-s ' + (s > 0 ? 'ph-a' : 'ph-r'), i, { off: i + 1 }); });
  ar(S, 'i1', [12, 2.4], [8, 2.4], 'danger', 1, { h: .24, off: 2 }); ar(S, 'i3', [8, 2.4], [12, 2.4], 'danger', 3, { h: .24, off: 4 });
  [['bE', 22, 'accent', [1, 0, 1, 0, 1], 'U<sub>E</sub>'], ['bB', 26, 'warn', [0, 1, 0, 1, 0], 'U<sub>B</sub>']].forEach(([k, x, c, v, l]) => {
    S.el(k, { x, y: 3, w: 3, h: 7, css: `transform-origin:50% 100%;border-radius:.3em .3em 0 0;background:${tint(c, 55)}`, s: { transform: `scaleY(${Math.max(v[0], .001)})` } });
    v.forEach((q, i) => { if (i) S.set(k, i, { transform: `scaleY(${Math.max(q, .001)})` }); }); T(S, k + 'l', x, 10.3, l, 'cz-tc cz-mono ph-s', 0, { w: 3 }); });
  hl(S, 'bbase', 21.4, 29.6, 10, 'ink-3', 0, { w: .1 });
  const G = fr(0, 1, -1.2, 1.2, 3, 29, 12.4, 17.6);
  hl(S, 'gx', 3, 29, G.Y(0), 'ink-3', 0, { w: .08 }); T(S, 'gl', 3.2, 11.6, 'q(t) = Q cos ωt', 'cz-mono ph-xs');
  mplot(S, 'qc', G, t => [t, Math.cos(2 * Math.PI * t)], 0, 1, { st: i => Math.max(1, Math.ceil(i / 10)), n: 40, color: 'accent', h: .16 });
  pt(S, 'gp', G.X(0), G.Y(1), 0, C.badf, .3); [[1, .25, 0], [2, .5, -1], [3, .75, 0], [4, 1, 1]].forEach(([st, t, q]) => S.move('gp', st, G.X(t) - .3, G.Y(q) - .3));
  T(S, 'f', 1, 18.8, ['ω = 1/√(LC) · ½LI² + q²/2C = 일정 · L = 10 mH, C = 1 μF → f ≈ 1.6 kHz', 'ω = 1/√(LC) · ½LI² + q²/2C = constant · L = 10 mH, C = 1 μF → f ≈ 1.6 kHz'], 'cz-tc cz-mono ph-s', 5, { w: 30 });
  S.cap(1, '충전된 축전기가 코일로 방전하면 전류가 최대일 때 에너지는 자기장에', 'The capacitor discharges through the coil; at peak current the energy is magnetic')
    .cap(2, '코일이 전류를 계속 밀어 반대로 충전되고', 'The inductor keeps the current going and recharges C the other way')
    .cap(3, '다시 반대 방향으로 흘러', 'then the current flows back')
    .cap(4, '처음 상태로 돌아와요 · 전기 ⇄ 자기 에너지', 'and the cycle repeats: electric ⇄ magnetic energy')
    .cap(5, '진자처럼 진동하는 회로 · 라디오 튜너의 원리', 'An electrical pendulum: the heart of a radio tuner');
  return S;
}
function sEmWave() {
  const S = scene({ id: 'ph-emwave', steps: 8, per: .75 });
  const y0 = 8.4, A = 4, k = 2 * Math.PI / 13.2;
  hl(S, 'ax', 1, 31, y0, 'ink-3', 0, { w: .1 }); ar(S, 'dir', [26, y0 + 5.6], [30.6, y0 + 5.6], 'ink-2', 0, { h: .12 }); T(S, 'dirl', 25, y0 + 6, ['진행 방향', 'propagation'], 'ph-xs');
  for (let i = 0; i < 24; i++) { const x = 2 + i * 1.2, s = j => r3(Math.sin(k * x - j * Math.PI / 4)) || .001;
    S.el('E' + i, { x: x - .08, y: y0 - A, w: .16, h: A, css: `transform-origin:50% 100%;background:var(--accent);z-index:3`, s: { transform: `scaleY(${s(0)})` } });
    S.el('B' + i, { x, y: y0 - .07, w: 2.6, h: .14, css: `transform-origin:0 50%;background:var(--warn);z-index:2`, s: { transform: `rotate(150deg) scaleX(${s(0)})` } });
    for (let j = 1; j <= 8; j++) { S.set('E' + i, j, { transform: `scaleY(${s(j)})` }); S.set('B' + i, j, { transform: `rotate(150deg) scaleX(${s(j)})` }); } }
  T(S, 'El', 1, 2.6, 'E', 'cz-mono ph-big ph-a'); T(S, 'Bl', 1, 12.4, 'B', 'cz-mono ph-big ph-w');
  T(S, 'f1', 1, 15.4, ['E ⟂ B ⟂ 진행 방향 · E = cB · 같은 위상', 'E ⟂ B ⟂ direction · E = cB · in phase'], 'cz-tc ph-s', 2, { w: 30 });
  T(S, 'f2', 1, 16.8, 'c = 1/√(μ₀ε₀) = 3.0×10⁸ m/s', 'cz-tc cz-mono ph-l', 3, { w: 30 });
  T(S, 'f3', 1, 18.2, ['맥스웰: 가우스(E) · 가우스(B) · 패러데이 · 앙페르-맥스웰', 'Maxwell: Gauss (E) · Gauss (B) · Faraday · Ampère–Maxwell'], 'cz-tc ph-s', 5, { w: 30 });
  T(S, 'f4', 1, 19.6, ['전파 · 마이크로파 · 적외선 · 가시광선 · 자외선 · X선 · 감마선 (λ 짧아짐)', 'radio · microwave · IR · visible · UV · X-ray · gamma (shorter λ)'], 'cz-tc ph-xs', 7, { w: 30 });
  S.cap(1, '변하는 전기장이 자기장을, 변하는 자기장이 전기장을 만들며', 'A changing E makes B and a changing B makes E')
    .cap(3, '서로 수직으로 진동하면서 퍼져 나가요', 'so they oscillate at right angles and travel together')
    .cap(5, '매질 없이 빛의 속도로 이동해요', 'through empty space at the speed of light')
    .cap(7, '빛도 전자기파예요 · 파장에 따라 이름이 달라요', 'Light is one of them; names change with wavelength');
  return S;
}

/* ================= optics ================= */
function sSnell() {
  const S = scene({ id: 'ph-snell', steps: 5, per: 1.35 });
  const O = [16, 11], Lr = 8, dir = (a, up) => [Math.sin(a * D2R), (up ? -1 : 1) * Math.cos(a * D2R)];
  rect(S, 'glass', 1, 11, 30, 8.6, 'accent', 16, 0, { r: 0 }); hl(S, 'if', 1, 31, 11, 'ink-2', 0, { w: .14 }); vl(S, 'nrm', 16, 2.4, 19.4, 'ink-3', 0, { dash: 1, w: .08 });
  T(S, 'n1', 1.4, 2, ['공기 n₁ = 1.0', 'air n₁ = 1.0'], 'ph-s'); T(S, 'n2', 1.4, 18.2, ['유리 n₂ = 1.5', 'glass n₂ = 1.5'], 'ph-s ph-a');
  const at = (a, sx, sy) => [O[0] + sx * Lr * Math.sin(a * D2R), O[1] + sy * Lr * Math.cos(a * D2R)];
  const inR = (k, P, st, off, c) => ar(S, k, P, O, c, st, { h: .2, off }), outR = (k, P, st, off, c) => ar(S, k, O, P, c, st, { h: .2, off });
  inR('i1', at(45, -1, -1), 1, 3, 'danger'); outR('r1', at(45, 1, -1), 1, 3, 'color-mix(in srgb,var(--danger) 45%,transparent)'); outR('t1', at(28.1, 1, 1), 1, 3, 'danger');
  T(S, 'a1', 13.4, 6, '45°', 'cz-mono ph-s', 2, { off: 3 }); T(S, 'a2', 17.4, 6, '45°', 'cz-mono ph-s', 2, { off: 3 }); T(S, 'a3', 16.5, 15.6, '28.1°', 'cz-mono ph-s', 2, { off: 3 });
  inR('i3', at(30, -1, 1), 3, 4, 'ok'); outR('t3', at(48.6, 1, -1), 3, 4, 'ok');
  inR('i4', at(41.8, -1, 1), 4, 5, 'warn'); ar(S, 't4', O, [24.6, 11], 'warn', 4, { h: .2, off: 5 });
  inR('i5', at(60, -1, 1), 5, 0, 'accent'); outR('r5', at(60, 1, 1), 5, 0, 'accent');
  T(S, 'law', 22.4, 2, 'n₁ sinθ₁ = n₂ sinθ₂', 'cz-mono ph-l', 2);
  L(S, 'st', 22.4, 3.8, 9.4, 'cz-mono ph-s', [[1, '45° → 28.1°'], [3, ['유리→공기 30° → 48.6°', 'glass→air 30° → 48.6°']], [4, ['임계각 41.8° → 90°', 'critical 41.8° → 90°']], [5, ['60° > 41.8° → 전반사', '60° > 41.8° → TIR']]]);
  T(S, 'c', 22.4, 5.6, 'sin θc = n₂/n₁ = 1/1.5', 'cz-mono ph-xs', 4); T(S, 'fib', 22.4, 7.2, ['광섬유의 원리', 'how optical fibers work'], 'ph-xs ph-a', 5);
  S.cap(1, '빛이 공기에서 유리로 들어가면 일부는 반사, 일부는 굴절', 'Light hitting glass partly reflects and partly bends')
    .cap(2, '반사각 = 입사각, 굴절은 스넬 법칙', 'Reflection angle = incidence; refraction follows Snell’s law')
    .cap(3, '유리에서 공기로 나갈 때는 법선에서 멀어지며 꺾이고', 'Leaving glass, light bends away from the normal')
    .cap(4, '임계각에서 굴절광이 표면을 따라 스치다가', 'At the critical angle it skims the surface')
    .cap(5, '더 비스듬하면 모두 반사돼요 (전반사)', 'Beyond it everything reflects: total internal reflection');
  return S;
}
function sLens() {
  const S = scene({ id: 'ph-lens', steps: 5, per: 1.35 });
  const ay = 10.5, lx = 16, f = 4.5;
  hl(S, 'axis', 1, 31, ay, 'ink-3', 0, { w: .1 });
  ell(S, 'lens', lx - .7, 4.4, 1.4, 12.2, 'accent', 0, { w: .16, fill: tint('accent', 20) });
  [[-f, 'F'], [f, 'F′'], [-2 * f, '2F'], [2 * f, '2F′']].forEach(([dx, l], i) => { pt(S, 'fp' + i, lx + dx, ay, 0, C.idle, .2); T(S, 'fl' + i, lx + dx - 1, ay + .4, l, 'cz-tc cz-mono ph-xs', 0, { w: 2 }); });
  ar(S, 'obj', [2.5, ay], [2.5, 7.8], 'ok', 0, { h: .3 });
  const tip = [2.5, 7.8];
  seg(S, 'r1a', tip, [lx, 7.8], 1, 'danger', .14); seg(S, 'r1b', [lx, 7.8], [26, 13.8], 1, 'danger', .14);
  seg(S, 'r2', tip, [26, 12.5], 2, 'warn', .14);
  seg(S, 'r3a', tip, [lx, 11.85], 3, 'accent', .14); seg(S, 'r3b', [lx, 11.85], [26, 11.85], 3, 'accent', .14);
  ar(S, 'img', [22.75, ay], [22.75, 11.85], 'ok', 4, { h: .3 });
  T(S, 'g', 1.4, 1.6, 'f = 10 cm, d<sub>o</sub> = 30 cm', 'cz-mono ph-l');
  L(S, 'rl', 1.4, 3.2, 14, 'ph-s', [[1, ['① 평행 광선 → 초점 F′', '① parallel ray → through F′']], [2, ['② 중심 광선 → 직진', '② central ray → straight']], [3, ['③ F를 지난 광선 → 평행', '③ ray through F → parallel']]]);
  T(S, 'e1', 20.4, 1.6, '1/f = 1/d<sub>o</sub> + 1/d<sub>i</sub>', 'cz-mono ph-l', 4); T(S, 'e2', 20.4, 3.2, '1/10 = 1/30 + 1/d<sub>i</sub> → 15 cm', 'cz-mono ph-xs', 4);
  T(S, 'e3', 20.4, 4.6, 'm = −d<sub>i</sub>/d<sub>o</sub> = −0.5', 'cz-mono ph-s', 4); T(S, 'e4', 20.4, 6, ['도립 · 축소 · 실상', 'inverted · smaller · real'], 'ph-xs ph-g', 4);
  T(S, 'e5', 1, 18.2, ['물체가 f 안쪽이면 정립 확대 허상 (돋보기) · 오목거울도 같은 식, f = R/2', 'inside f: upright, enlarged, virtual (a magnifier) · concave mirrors: same formula, f = R/2'], 'cz-tc ph-s', 5, { w: 30 });
  S.cap(1, '광축에 나란한 빛은 렌즈를 지나 초점을 지나고', 'A ray parallel to the axis bends through the focal point')
    .cap(2, '렌즈 중심을 지나는 빛은 그대로 직진해요', 'A ray through the center goes straight')
    .cap(3, '초점을 지나 들어온 빛은 평행하게 나가요', 'A ray through F comes out parallel')
    .cap(4, '세 광선이 만나는 곳에 상이 생겨요', 'Where they meet, the image forms')
    .cap(5, '렌즈 공식으로 위치와 배율을 계산해요', 'The lens equation gives its position and size');
  return S;
}
function sYoung() {
  const S = scene({ id: 'ph-young', steps: 5, per: 1.35 });
  vl(S, 'bar1', 6, 1.4, 8, 'ink-2', 0, { w: .4 }); vl(S, 'bar2', 6, 9, 12, 'ink-2', 0, { w: .4 }); vl(S, 'bar3', 6, 13, 19.6, 'ink-2', 0, { w: .4 });
  [1.6, 3, 4.4].forEach((x, i) => vl(S, 'pw' + i, x, 2, 19, 'accent', 1, { w: .12 }));
  [8.5, 12.5].forEach((y, s) => [2, 4, 6, 8].forEach(r => ring(S, `a${s}_${r}`, 6, y, r, 'accent', 2, { w: .1, css: 'clip-path:inset(0 0 0 50%)' })));
  vl(S, 'scr', 29, 1.4, 19.6, 'ink-2', 0, { w: .2 });
  for (let i = 0; i < 44; i++) { const y = 1.6 + i * .4, I = Math.cos(Math.PI * (y + .2 - 10.5) / 2.6) ** 2; rect(S, 'f' + i, 29.4, y, 1.8, .4, 'danger', Math.round(6 + 80 * I), 3, { r: 0 }); }
  seg(S, 'p1', [6, 8.5], [29, 7.9], 4, 'ok', .1); seg(S, 'p2', [6, 12.5], [29, 7.9], 4, 'ok', .1); pt(S, 'P', 29, 7.9, 4, C.okf, .35); T(S, 'Pl', 26.6, 6.4, 'P (m = 1)', 'cz-mono ph-xs', 4);
  T(S, 'd', 6.6, 10, 'd', 'cz-mono ph-s', 0);
  L(S, 'ft', 1, 19.4, 30, 'cz-tc cz-mono ph-s', [[3, ['밝은 무늬: d sinθ = mλ · 어두운 무늬: (m + ½)λ', 'bright: d sinθ = mλ · dark: (m + ½)λ']], [4, ['경로차 = d sinθ = λ → 첫 번째 밝은 무늬', 'path difference d sinθ = λ → first bright fringe']], [5, 'Δy = λL/d: 600 nm, 0.2 mm, 1 m → 3 mm']]);
  S.cap(1, '단색광이 두 개의 좁은 틈에 도달하면', 'Monochromatic light reaches two narrow slits')
    .cap(2, '각 틈에서 원형 파동이 새로 퍼져 나가요 (하위헌스)', 'Each slit sends out circular waves')
    .cap(3, '두 파동이 겹쳐 스크린에 밝고 어두운 무늬', 'They overlap into bright and dark fringes')
    .cap(4, '경로차가 파장의 정수배인 곳이 밝아요 (보강 간섭)', 'Bright where the path difference is a whole number of λ')
    .cap(5, '무늬 간격으로 빛의 파장을 잴 수 있어요', 'Fringe spacing measures the wavelength');
  return S;
}

/* ================= modern physics ================= */
function sRelativity() {
  const S = scene({ id: 'ph-relativity', steps: 5, per: 1.35 });
  T(S, 'h1', 2, 1.6, ['정지한 시계', 'clock at rest'], 'cz-tc ph-s', 0, { w: 6 }); T(S, 'h2', 13, 1.6, ['움직이는 시계 (v)', 'moving clock (v)'], 'cz-tc ph-s', 0, { w: 14 });
  hl(S, 'mt', 2.6, 7.4, 3.6, 'ink-2', 0, { w: .3 }); hl(S, 'mb', 2.6, 7.4, 15.6, 'ink-2', 0, { w: .3 });
  pt(S, 'ph', 5, 15, 0, C.badf, .36); [[1, 4.2], [2, 15], [3, 4.2], [4, 15]].forEach(([st, y]) => S.move('ph', st, 5 - .36, y - .36));
  S.el('mv', { x: 13, y: 3.3, w: 4.8, h: 12.6, html: KB(0, 0, 4.8, .3, 'background:var(--ink-2)') + KB(0, 12.3, 4.8, .3, 'background:var(--ink-2)'), css: 'z-index:3', s: { transform: 'translate(0em,0em)' } });
  [1, 2, 3, 4].forEach(st => S.set('mv', st, { transform: `translate(${3 * st}em,0em)` }));
  pt(S, 'ph2', 15.4, 15, 0, C.badf, .36); [[1, 18.4, 4.2], [2, 21.4, 15], [3, 24.4, 4.2], [4, 27.4, 15]].forEach(([st, x, y]) => S.move('ph2', st, x - .36, y - .36));
  [[1, [15.4, 15], [18.4, 4.2]], [2, [18.4, 4.2], [21.4, 15]], [3, [21.4, 15], [24.4, 4.2]], [4, [24.4, 4.2], [27.4, 15]]].forEach(([st, a, b]) => seg(S, 'tr' + st, a, b, st, 'danger', .1, { dash: 1 }));
  vl(S, 'L', 18.4, 4.2, 15, 'ink-3', 3, { dash: 1, w: .08 }); T(S, 'Lt', 18.7, 9.2, 'L', 'cz-mono ph-s', 3);
  T(S, 'f1', 1, 17.4, 'Δt = γΔt₀ · γ = 1/√(1 − v²/c²)', 'cz-tc cz-mono ph-l', 3, { w: 30 });
  L(S, 'f2', 1, 19, 30, 'cz-tc ph-s', [[4, ['v = 0.6c → γ = 1.25 · 길이 수축 L = L₀/γ', 'v = 0.6c → γ = 1.25 · length contraction L = L₀/γ']], [5, 'E = mc² · E² = (pc)² + (mc²)²']]);
  S.cap(1, '빛이 두 거울 사이를 오가는 빛 시계', 'A light clock: a photon bouncing between mirrors')
    .cap(2, '움직이는 시계에서는 빛이 비스듬히 더 먼 길을 가요', 'In the moving clock the photon travels a longer, slanted path')
    .cap(3, '빛의 속도는 같으니 한 번 째깍하는 데 더 오래 걸려요', 'Light speed is the same, so each tick takes longer')
    .cap(4, '움직이는 시계는 느리게 가요 (시간 지연)', 'Moving clocks run slow: time dilation')
    .cap(5, '질량도 에너지예요', 'Mass is a form of energy');
  return S;
}
function sPhotoelectric() {
  const S = scene({ id: 'ph-photoelectric', steps: 5, per: 1.35 });
  rect(S, 'metal', 2, 4, 3.6, 13, 'ink-3', 45, 0, { cls: 'cz-c ph-bl', html: 'Na', r: .2 });
  const photons = (k, c, st, off, ys) => ys.forEach((y, i) => ar(S, `${k}${i}`, [16, y - 3], [6.2, y], c, st, { h: .14, off, dash: 1 }));
  photons('red', 'danger', 1, 2, [7, 10, 13]); T(S, 'rt', 1.4, 18, ['빨간빛: 아무리 밝아도 방출 없음', 'red light: no electrons, however bright'], 'ph-s ph-r', 1, { off: 2 });
  photons('uv', 'accent', 2, 0, [7, 11]); photons('uv2', 'accent', 3, 0, [9, 13, 15]);
  const el = (k, y, st) => { pt(S, k, 6.4, y, st, C.okf, .26); ar(S, k + 'a', [6.8, y], [9.6, y + 1.4], 'ok', st, { h: .12 }); };
  el('e0', 7.6, 2); el('e1', 11.6, 2); el('e2', 9.6, 3); el('e3', 13.6, 3); el('e4', 15.4, 3);
  T(S, 'ut', 1.4, 18, ['자외선: 바로 전자 방출', 'ultraviolet: electrons at once'], 'ph-s ph-a', 2, { off: 3 }); T(S, 'bt', 1.4, 18, ['더 밝게: 전자 수 ↑, 최대 에너지는 그대로', 'brighter: more electrons, same max energy'], 'ph-s ph-g', 3);
  const G = fr(0, 10, -3, 3, 19.4, 31, 7.6, 17.6);
  hl(S, 'gx', G.L, G.R, G.Y(0), 'ink-3', 4, { w: .1 }); vl(S, 'gy', G.L, G.T, G.B, 'ink-3', 4, { w: .1 }); T(S, 'gxl', G.R - 3, G.Y(0) + .2, 'f (10¹⁴ Hz)', 'cz-mono ph-xs', 4); T(S, 'gyl', G.L + .3, G.T - .6, 'K<sub>max</sub> (eV)', 'cz-mono ph-xs', 4);
  mline(S, 'kl', G, [0, -2.3], [10, 1.84], { st: 4, color: 'ink-3', h: .1, dash: 1 }); mline(S, 'kl2', G, [5.56, 0], [10, 1.84], { st: 4, color: 'accent', h: .2 });
  mpt(S, 'f0', G, [5.56, 0], 4, C.badf, .3); mT(S, 'f0l', G, [5.56, 0], -1, .3, 'f₀', 'cz-mono ph-xs', 4); mT(S, 'phl', G, [0, -2.3], .3, -.4, '−φ', 'cz-mono ph-xs', 4);
  T(S, 'law', 19.4, 1.8, 'K<sub>max</sub> = hf − φ', 'cz-mono ph-l'); T(S, 'E', 19.4, 3.4, ['광자 하나 E = hf', 'one photon E = hf'], 'ph-s');
  T(S, 'ex', 19.4, 5, ['400 nm: 3.1 − 2.3 = 0.8 eV', '400 nm: 3.1 − 2.3 = 0.8 eV'], 'cz-mono ph-xs', 5);
  S.cap(1, '진동수가 낮은 빛은 아무리 세게 비춰도 전자가 안 나와요', 'Low-frequency light ejects nothing, however bright')
    .cap(2, '문턱 진동수보다 높으면 즉시 튀어나와요', 'Above the threshold frequency electrons fly out at once')
    .cap(3, '세기를 높이면 개수만 늘어요 · 빛은 광자 알갱이', 'More intensity means more electrons, not faster ones')
    .cap(4, '최대 운동에너지는 진동수에 비례 · 기울기 h', 'Maximum energy rises linearly with f; the slope is h')
    .cap(5, '아인슈타인의 광양자설 · 태양전지와 광센서', 'Einstein’s photon idea, behind solar cells and photodiodes');
  return S;
}
function sBohr() {
  const S = scene({ id: 'ph-bohr', steps: 5, per: 1.35 });
  const Ey = E => 2.6 + (-E / 13.6) * 15.4, En = n => -13.6 / (n * n);
  [1, 2, 3, 4, 5].forEach(n => { hl(S, 'lv' + n, 2, 13, Ey(En(n)), 'ink-2', 0, { w: .12 }); if (n <= 3) T(S, 'll' + n, 13.4, Ey(En(n)) - .5, `n = ${n}  ${En(n).toFixed(2)} eV`, 'cz-mono ph-xs'); });
  hl(S, 'inf', 2, 13, 2.6, 'ink-3', 0, { dash: 1, w: .08 }); T(S, 'infl', 13.4, 1.8, 'n = ∞  0 eV', 'cz-mono ph-xs');
  ar(S, 't32', [5, Ey(En(3))], [5, Ey(En(2))], 'danger', 2, { h: .24 }); T(S, 't32l', 5.4, 5.2, '656 nm', 'cz-mono ph-xs ph-r', 2);
  ar(S, 't21', [9, Ey(En(2))], [9, Ey(En(1))], 'accent', 3, { h: .24 }); T(S, 't21l', 9.4, 12, '122 nm (UV)', 'cz-mono ph-xs ph-a', 3);
  T(S, 'e1', 19.4, 1.6, 'Eₙ = −13.6/n² eV', 'cz-mono ph-l'); T(S, 'e2', 19.4, 3.2, ['3→2: 1.89 eV (빨강)', '3→2: 1.89 eV (red)'], 'ph-s ph-r', 2); T(S, 'e3', 19.4, 4.6, ['2→1: 10.2 eV (자외선)', '2→1: 10.2 eV (UV)'], 'ph-s ph-a', 3);
  const cx = 25, cy = 12.4, R = 4.4;
  ring(S, 'orb', cx, cy, R, 'ink-3', 4, { dash: 1, w: .08 }); pt(S, 'nuc', cx, cy, 4, C.badf, .45);
  pplot(S, 'dw', t => [cx + (R + .6 * Math.sin(4 * t)) * Math.cos(t), cy + (R + .6 * Math.sin(4 * t)) * Math.sin(t)], 0, 2 * Math.PI, { st: 4, n: 64, color: 'accent', h: .16 });
  T(S, 'e4', 19.4, 18, '2πr = nλ (n = 4) · λ = h/p', 'cz-mono ph-s', 4);
  T(S, 'e5', 1, 19.4, ['100 V로 가속한 전자 λ ≈ 0.123 nm → 전자 회절', 'electron at 100 V: λ ≈ 0.123 nm → electron diffraction'], 'ph-s', 5);
  S.cap(1, '수소 원자의 전자는 정해진 에너지 준위에만 있어요', 'The electron in hydrogen sits only on fixed energy levels')
    .cap(2, '높은 준위에서 낮은 준위로 떨어지며 그 차이만큼 빛을 내요', 'Dropping a level emits light carrying the difference')
    .cap(3, '그래서 원자는 특정 파장의 선 스펙트럼을 내요', 'so atoms emit sharp spectral lines')
    .cap(4, '전자를 파동으로 보면 궤도 둘레에 정상파가 맞아떨어져요', 'As a wave, the electron fits a whole number of wavelengths around the orbit')
    .cap(5, '물질도 파동성을 가져요 (드브로이)', 'Matter has a wavelength too: de Broglie');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'phx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono phx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono phx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c phx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono phx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c phx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'phx-s phx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono phx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono phx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono phx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono phx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono phx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'phx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'phx-xs', 5));


const CSSX = `
.phx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.phx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.phx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.phx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.phx-r .in{color:var(--danger);font-weight:800}
.phx-g .in{color:var(--ok);font-weight:800}
.phx-a .in{color:var(--accent);font-weight:800}
.phx-w .in{color:var(--warn);font-weight:800}
.phx-c .in{font-size:.6em;font-weight:700}
.phx-c2 .in{font-size:.5em;font-weight:700}
.phx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.phx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'phx-xs', i + 1, { off: i + 2 }));
const deg = d => d * Math.PI / 180;
const lbl = (S, k, x, y, t, cls, st, o = {}) => T(S, k, x, y, t, 'phx-xs ' + (cls || ''), st, o);

/* ================= rotation ================= */
function sEquil() {
  const S = scene({ id: 'ph-equil', steps: 5, per: 1.7 });
  const B = [4.5, 13], Lm = 5, Le = 11, th = deg(60), Tp = [B[0] + Le * Math.cos(th), B[1] - Le * Math.sin(th)], Cm = [(B[0] + Tp[0]) / 2, (B[1] + Tp[1]) / 2];
  const m = 20, g = 9.8, W = m * g, Nw = W * (Lm / 2) * Math.cos(th) / (Lm * Math.sin(th));
  hl(S, 'fl', 1, Tp[0] + .3, B[1] + .1, 'ink-3', 0, { w: .2 }); vl(S, 'wl', Tp[0] + .2, 1.0, B[1] + .2, 'ink-3', 0, { w: .2 });
  rect(S, 'wh', Tp[0] + .3, 1.0, .9, 12.2, 'ink-3', 14, 0, { r: 0 }); rect(S, 'fh', 1, B[1] + .2, Tp[0] + .2, .8, 'ink-3', 14, 0, { r: 0 });
  seg(S, 'lad', B, Tp, 0, 'warn', .34);
  T(S, 'ang', B[0] + 1.2, B[1] - 1.2, '60°', 'cz-mono phx-xs', 0);
  ar(S, 'mg', Cm, [Cm[0], Cm[1] + 3], 'danger', 2, { h: .14 }); lbl(S, 'mgl', Cm[0] + .35, Cm[1] + 1.9, 'mg', 'cz-mono phx-s phx-r', 2);
  ar(S, 'N', B, [B[0], B[1] - 3], 'accent', 2, { h: .14 }); lbl(S, 'Nl', B[0] - 1.8, B[1] - 3.4, 'N', 'cz-mono phx-a', 2);
  ar(S, 'f', [B[0], B[1] - .05], [B[0] + 1.8, B[1] - .05], 'ok', 2, { h: .14 }); lbl(S, 'fl2', B[0] + .7, B[1] - .95, 'f', 'cz-mono phx-g', 2);
  ar(S, 'nw', Tp, [Tp[0] - 1.8, Tp[1]], 'accent', 2, { h: .14 }); lbl(S, 'nwl', Tp[0] - 2.4, Tp[1] - 1.0, 'N_w', 'cz-mono phx-a', 2);
  seg(S, 'arm1', [B[0], B[1] + .6], [Cm[0], B[1] + .6], 4, 'danger', .07, { dash: 1 }); lbl(S, 'arm1l', B[0], B[1] + .65, '1.25 m', 'cz-mono phx-r', 4);
  seg(S, 'arm2', [Tp[0] + .65, B[1]], [Tp[0] + .65, Tp[1]], 4, 'accent', .07, { dash: 1 });
  const R = 15.6;
  lbl(S, 'r0', R, .8, ['사다리 5 m · 20 kg · 벽은 매끈(마찰 없음)', 'ladder 5 m · 20 kg · smooth wall'], '', 1);
  lbl(S, 'r1', R, 2.4, ['힘 4개: 무게, 바닥 수직항력, 마찰, 벽 수직항력', 'four forces: weight, floor normal, friction, wall normal'], '', 2, { w: 15 });
  lbl(S, 'r2', R, 4.4, 'ΣFx = 0 → f = N_w', 'cz-mono', 3); lbl(S, 'r3', R, 5.5, 'ΣFy = 0 → N = mg = 196 N', 'cz-mono', 3);
  lbl(S, 'r4', R, 7.1, ['Στ = 0 (바닥을 회전축으로)', 'Στ = 0 (pivot at the foot)'], 'phx-a', 4);
  lbl(S, 'r5', R, 8.2, 'N_w · 4.33 = 196 · 1.25', 'cz-mono', 4);
  lbl(S, 'r6', R, 9.3, `N_w = f = ${Nw.toFixed(1)} N`, 'cz-mono phx-g', 4);
  lbl(S, 'r7', R, 10.4, [`미끄러지지 않으려면 μ ≥ ${(Nw / W).toFixed(2)}`, `no slip needs μ ≥ ${(Nw / W).toFixed(2)}`], 'phx-g', 4);
  stepT(S, 'k', 1, 15.6, [['매끈한 벽에 기댄 사다리가 미끄러지지 않고 서 있으려면?', 'what keeps a ladder leaning on a smooth wall from slipping?'], ['사다리에 작용하는 힘을 모두 그려요: 무게, 바닥의 수직항력과 마찰, 벽의 수직항력', 'draw every force: weight, the floor’s normal force and friction, the wall’s normal force'], ['정지하려면 먼저 힘의 합이 0 · 가로와 세로로 나눠 식을 세워요', 'first the forces must cancel · write the horizontal and vertical balance'], ['미지의 힘이 몰린 바닥을 회전축으로 잡으면 토크 식 하나로 N_w가 나와요', 'taking the foot, where unknowns meet, as the pivot gives N_w from one torque equation']]);
  fin(S, 'z', 15.6, [['정적 평형: ΣF = 0 이고 Στ = 0 · 두 조건이 모두 필요해요', 'static equilibrium: ΣF = 0 and Στ = 0 · both are required', 'phx-xs phx-a'], ['평형 상태라면 회전축은 어디에 잡아도 되니, 미지수가 많이 지나는 점을 골라요', 'in equilibrium any pivot works, so pick the point where most unknowns act'], ['다리·크레인·선반 설계, 사람이 무거운 짐을 들 때 허리에 걸리는 힘 계산에 써요', 'used to design bridges, cranes and shelves, and to find the load on your back when lifting']]);
  S.cap(1, '기대 선 사다리', 'A leaning ladder').cap(2, '힘을 모두 그리기', 'Draw every force').cap(3, '힘의 평형', 'Force balance').cap(4, '토크의 평형', 'Torque balance').cap(5, '정적 평형', 'Static equilibrium');
  return S;
}

/* ================= gravity ================= */
function sKepler() {
  const S = scene({ id: 'ph-kepler', steps: 5, per: 1.7 });
  const a = 6.2, e = .6, b = a * Math.sqrt(1 - e * e), cx = 9.0, cy = 7.4, fx = cx + a * e;
  const P = E => [cx + a * Math.cos(E), cy - b * Math.sin(E)];
  pplot(S, 'orb', t => P(t), 0, 2 * Math.PI, { color: 'ink-3', h: .08, n: 90 });
  pt(S, 'sun', fx, cy, 0, { background: 'var(--warn)', 'border-color': 'transparent', 'box-shadow': '0 0 .6em var(--warn)' }, .6);
  pt(S, 'f2', cx - a * e, cy, 1, C.idle, .14); lbl(S, 'f2l', cx - a * e - 1.0, cy + .4, ['빈 초점', 'empty focus'], 'cz-tc', 1, { w: 2.2 });
  const Es = []; for (let k = 0; k < 12; k++) { const M = 2 * Math.PI * k / 12; let E = M; for (let i = 0; i < 30; i++) E = M + e * Math.sin(E); Es.push(E); }
  Es.forEach((E, k) => pt(S, 'p' + k, ...P(E), 2, C.cur, .2));
  const sector = (k, E0, E1, c) => { const pts = [[fx, cy]]; for (let i = 0; i <= 16; i++) pts.push(P(E0 + (E1 - E0) * i / 16)); poly2(S, k, pts, `color-mix(in srgb,var(--${c}) 35%,transparent)`, 3); };
  sector('s1', Es[11] - 2 * Math.PI, Es[0] + (Es[1] - Es[0]), 'accent'); sector('s2', Es[5], Es[7], 'ok');
  lbl(S, 'peri', P(0)[0] - 5.2, cy + .9, ['근일점: 빠름', 'perihelion: fast'], 'phx-a', 2, { w: 4.6, css: 'text-align:right' }); lbl(S, 'aph', P(Math.PI)[0] + .8, cy - 1.4, ['원일점: 느림', 'aphelion: slow'], 'phx-g', 2);
  const R = 18.2;
  lbl(S, 'r1', R, .8, ['① 궤도는 타원, 태양은 한 초점에', '① orbits are ellipses with the Sun at a focus'], '', 1, { w: 12.6 });
  lbl(S, 'r2', R, 2.6, ['같은 시간 간격의 위치 · 태양 가까이선 듬성듬성', 'equal-time positions · spread out near the Sun'], '', 2, { w: 12.6 });
  lbl(S, 'r3', R, 4.4, ['② 같은 시간에 쓸고 가는 넓이가 같아요', '② equal areas in equal times'], 'phx-a', 3, { w: 12.6 });
  lbl(S, 'r4', R, 6.2, ['③ T² ∝ a³', '③ T² ∝ a³'], 'phx-w', 4);
  const PL = [[['지구', 'Earth'], 1.00, 1.00], [['화성', 'Mars'], 1.52, 1.88], [['목성', 'Jupiter'], 5.20, 11.86]];
  lbl(S, 'th0', R, 7.4, 'a (AU)', 'cz-mono', 4); lbl(S, 'th1', R + 3.8, 7.4, ['T (년)', 'T (yr)'], 'cz-mono', 4); lbl(S, 'th2', R + 7.6, 7.4, 'T²/a³', 'cz-mono', 4);
  PL.forEach(([n, A, Tt], i) => { const y = 8.5 + i * 1.1; lbl(S, 'tn' + i, R - 2.6, y, n, '', 4, { w: 2.4, css: 'text-align:right' }); lbl(S, 'ta' + i, R, y, A.toFixed(2), 'cz-mono', 4); lbl(S, 'tt' + i, R + 3.8, y, Tt.toFixed(2), 'cz-mono', 4); lbl(S, 'tr' + i, R + 7.6, y, (Tt * Tt / A ** 3).toFixed(2), 'cz-mono phx-g', 4); });
  stepT(S, 'k', 1, 15.6, [['행성의 궤도는 원이 아니라 타원이고, 태양은 중심이 아닌 한 초점에 있어요', 'planetary orbits are ellipses, with the Sun at one focus rather than the center'], ['같은 시간 간격으로 위치를 찍으면, 태양에 가까울 때 훨씬 빨리 움직여요', 'marking positions at equal time steps shows the planet moving much faster near the Sun'], ['태양과 행성을 잇는 선이 같은 시간에 쓸고 가는 넓이는 늘 같아요', 'the line from Sun to planet sweeps out equal areas in equal times'], ['공전 주기의 제곱은 긴반지름의 세제곱에 비례해요 · 태양계 행성 모두 T²/a³ ≈ 1', 'the period squared is proportional to the semi-major axis cubed · T²/a³ ≈ 1 for every planet']]);
  fin(S, 'z', 15.6, [['케플러 법칙: 타원 궤도, 면적 속도 일정, T² ∝ a³', 'Kepler’s laws: elliptical orbits, equal areas, T² ∝ a³', 'phx-xs phx-a'], ['제2법칙은 각운동량 보존, 제3법칙은 만유인력 GMm/r²에서 그대로 나와요', 'the second law is angular momentum conservation; the third follows from GMm/r²'], ['인공위성 궤도 설계, 외계 행성의 질량 측정에 지금도 쓰여요', 'still used to plan satellite orbits and weigh exoplanets']]);
  S.cap(1, '타원 궤도', 'Elliptical orbits').cap(2, '가까울수록 빨라요', 'Faster when closer').cap(3, '면적 속도 일정', 'Equal areas, equal times').cap(4, 'T² ∝ a³', 'T² ∝ a³').cap(5, '케플러 법칙', 'Kepler’s laws');
  return S;
}

/* ================= fluids ================= */
function sBuoy() {
  const S = scene({ id: 'ph-archimedes', steps: 5, per: 1.7 });
  const WL = 6.0, X0 = 1.2, X1 = 20.4, YB = 14.0;
  rect(S, 'wat', X0, WL, X1 - X0, YB - WL, 'accent', 16, 0, { r: 0 }); hl(S, 'surf', X0, X1, WL, 'accent', 0, { w: .1 });
  vl(S, 'tl', X0, 3.6, YB, 'ink-3', 0, { w: .14 }); vl(S, 'tr', X1, 3.6, YB, 'ink-3', 0, { w: .14 }); hl(S, 'tb', X0, X1, YB, 'ink-3', 0, { w: .14 });
  rect(S, 'cube', 3.0, 8.4, 3.0, 3.0, 'ink-3', 40, 1, { off: 4, r: .1 });
  [3.5, 4.5, 5.5].forEach((x, i) => { ar(S, 'pt' + i, [x, 7.5], [x, 8.3], 'danger', 1, { h: .08, off: 4 }); ar(S, 'pb' + i, [x, 13.2], [x, 11.5], 'danger', 1, { h: .1, off: 4 }); });
  lbl(S, 'cl', 2.4, 6.4, ['아래 압력이 더 커요', 'more pressure below'], 'phx-r', 1, { off: 4 });
  const blk = (k, x, w, h, frac, color, pct, st, name) => { const top = WL - h * (1 - frac); rect(S, k, x, top, w, h, color, pct, st, { r: .1 }); lbl(S, k + 'l', x - .6, WL - h * (1 - frac) - 1.05, name, 'cz-tc', st, { w: w + 1.2 }); };
  blk('wood', 8.2, 3.0, 3.0, .6, 'warn', 50, 2, ['나무 600 → 60%', 'wood 600 → 60%']);
  blk('ice', 12.6, 2.6, 3.2, .917, 'ink-3', 18, 3, ['얼음 917 → 92%', 'ice 917 → 92%']);
  rect(S, 'steel', 16.8, YB - 2.2, 2.2, 2.2, 'ink', 60, 4, { r: .1 }); lbl(S, 'steell', 14.6, YB - 3.3, ['강철 7850 → 가라앉음', 'steel 7850 → sinks'], 'cz-tc phx-r', 4, { w: 5.4 });
  poly2(S, 'boat', [[2.2, 4.4], [7.4, 4.4], [6.6, 7.0], [3.0, 7.0]], 'color-mix(in srgb,var(--ink) 55%,var(--ui))', 4);
  lbl(S, 'boatl', 1.6, 2.4, ['강철 배: 속이 비어 많이 밀어내요', 'steel ship: hollow, displaces a lot'], 'phx-g', 4, { w: 8 });
  const R = 21.4;
  lbl(S, 'r1', R, .8, 'F_B = ρ_물 · V_잠김 · g', 'cz-mono', 1); lbl(S, 'r1b', R, 1.8, ['밀어낸 물의 무게만큼 위로', 'up by the weight of displaced water'], '', 1, { w: 9.6 });
  lbl(S, 'r2', R, 3.8, ['뜨면: 부력 = 무게', 'floating: buoyancy = weight'], 'phx-a', 2, { w: 9.6 });
  lbl(S, 'r3', R, 4.9, ['잠긴 비율 = ρ_물체 / ρ_물', 'fraction under = ρ_object / ρ_water'], 'cz-mono', 2, { w: 9.6 });
  lbl(S, 'r4', R, 7.0, ['빙산은 92%가 물속', 'icebergs hide 92% underwater'], '', 3, { w: 9.6 });
  lbl(S, 'r5', R, 9.0, ['물보다 무거우면 가라앉지만', 'denser than water sinks, but'], '', 4, { w: 9.6 });
  lbl(S, 'r6', R, 10.0, ['평균 밀도를 낮추면 떠요', 'lower the average density and it floats'], 'phx-g', 4, { w: 9.6 });
  stepT(S, 'k', 1, 15.6, [['깊을수록 수압이 커서, 물체 아랫면을 미는 힘이 윗면보다 커요 · 그 차이가 부력', 'pressure grows with depth, so the push on the bottom beats the push on top · the difference is buoyancy'], ['물보다 가벼운 나무는 자기 무게만큼의 물을 밀어낼 때까지만 잠겨서 떠요', 'wood, lighter than water, sinks only until it displaces its own weight, then floats'], ['얼음은 물과 밀도가 비슷해서 92%나 잠겨요 · 빙산의 일각', 'ice is nearly as dense as water, so 92% sits below · the tip of the iceberg'], ['강철 덩어리는 가라앉지만, 같은 강철도 배 모양으로 속을 비우면 떠요', 'a steel block sinks, yet the same steel shaped into a hollow hull floats']]);
  fin(S, 'z', 15.6, [['아르키메데스 원리: 부력 = 물체가 밀어낸 유체의 무게', 'Archimedes’ principle: buoyancy equals the weight of the fluid displaced', 'phx-xs phx-a'], ['뜨고 가라앉음은 평균 밀도로 정해져요 · 잠수함은 물탱크로 평균 밀도를 조절해요', 'floating depends on average density · submarines adjust it with ballast tanks'], ['열기구도 같아요 · 공기 속에서 데운 가벼운 공기가 밀어낸 공기의 무게만큼 떠요', 'hot-air balloons work the same way, buoyed by the weight of the cooler air they displace']]);
  S.cap(1, '부력은 압력 차', 'Buoyancy from pressure difference').cap(2, '떠 있는 나무', 'Floating wood').cap(3, '빙산의 일각', 'The tip of the iceberg').cap(4, '강철 배는 왜 뜰까', 'Why steel ships float').cap(5, '아르키메데스 원리', 'Archimedes’ principle');
  return S;
}

function sBern() {
  const S = scene({ id: 'ph-bernenergy', steps: 5, per: 1.7 });
  const top = [[1, 4.6], [6, 4.6], [8, 5.6], [11, 5.6], [13, 4.6], [15, 4.6], [17, 1.2], [21, 1.2]], bot = [[1, 7.8], [6, 7.8], [8, 6.8], [11, 6.8], [13, 7.8], [15, 7.8], [17, 4.4], [21, 4.4]];
  poly(S, 'pt', top, { color: 'ink-3', h: .12 }); poly(S, 'pb', bot, { color: 'ink-3', h: .12 });
  poly2(S, 'fill', top.concat(bot.slice().reverse()), 'color-mix(in srgb,var(--accent) 14%,transparent)', 0);
  [[2.2, 6.2], [8.4, 6.2], [17.6, 2.8]].forEach(([x, y], i) => ar(S, 'fw' + i, [x, y], [x + (i === 1 ? 2.4 : 1.2), y], 'accent', 0, { h: .1 }));
  const ST = [['A', 3.5, 6.2, [60, 10, 0]], ['B', 9.5, 6.2, [30, 40, 0]], ['C', 19, 2.8, [30, 10, 30]]];
  ST.forEach(([n, x, y], i) => { pt(S, 'st' + i, x, y, 1, C.cur, .22); lbl(S, 'stl' + i, x - .3, y - 1.3, n, 'cz-mono phx-s', 1); });
  const BY = 14.0, K = .06, COL = ['accent', 'warn', 'ok'];
  ST.forEach(([n, x, , v], i) => { const st = i < 2 ? 2 : 3, bx = [3.0, 9.0, 18.5][i]; let y = BY;
    v.forEach((q, j) => { if (!q) return; const h = q * K; y -= h; rect(S, `b${i}${j}`, bx, y, 1.8, h, COL[j], 45, st, { r: .05 }); });
    lbl(S, 'bn' + i, bx - .6, BY + .1, n + ' = 70', 'cz-tc cz-mono', st, { w: 3 }); });
  lbl(S, 'lg0', 11.6, 9.6, ['P (압력)', 'P (pressure)'], 'phx-a', 2); lbl(S, 'lg1', 11.6, 10.6, ['½ρv² (운동)', '½ρv² (kinetic)'], 'phx-w', 2); lbl(S, 'lg2', 11.6, 11.6, ['ρgh (높이)', 'ρgh (height)'], 'phx-g', 3);
  rect(S, 'tank', 23.0, 7.0, 4.2, 6.6, 'accent', 16, 4, { r: .1 }); vl(S, 'tkl', 23.0, 6.0, 13.6, 'ink-3', 4, { w: .12 }); vl(S, 'tkr', 27.2, 6.0, 13.6, 'ink-3', 4, { w: .12 }); hl(S, 'tkb', 23.0, 27.2, 13.6, 'ink-3', 4, { w: .12 });
  pplot(S, 'jet', t => [27.2 + t * 3.4, 12.2 + t * t * 1.6], 0, 1, { st: 4, color: 'accent', h: .14, n: 16 });
  seg(S, 'hh', [26.4, 7.0], [26.4, 12.2], 4, 'warn', .06, { dash: 1 }); lbl(S, 'hhl', 23.4, 9.2, 'h', 'cz-mono phx-w', 4);
  lbl(S, 'tor', 22.4, 4.3, 'v = √(2gh)', 'cz-mono phx-a', 4); lbl(S, 'tor2', 22.4, 5.3, ['h = 0.8 m → 4.0 m/s', 'h = 0.8 m → 4.0 m/s'], 'cz-mono', 4);
  stepT(S, 'k', 1, 15.6, [['넓은 곳 A, 좁은 곳 B, 높은 곳 C를 지나는 관 속 물의 흐름', 'water flowing through a wide part A, a narrow part B and a raised part C'], ['좁은 B에서는 빨라져 운동 에너지가 커진 만큼 압력이 낮아요 · 합은 그대로 70', 'in the narrow B it speeds up, and pressure drops by the gain in kinetic energy · the sum stays 70'], ['높은 C에서는 위치 에너지가 늘어난 만큼 압력이 낮아요', 'at the raised C, pressure drops by the gain in potential energy'], ['물통 구멍으로 나오는 속력은 높이 h에서 자유낙하한 속력과 같아요: v = √(2gh)', 'water leaving a hole in a tank moves as fast as if it fell freely through h: v = √(2gh)']]);
  fin(S, 'z', 15.6, [['베르누이 정리: 흐름을 따라 P + ½ρv² + ρgh = 일정 · 부피당 에너지 보존이에요', 'Bernoulli: P + ½ρv² + ρgh is constant along a streamline · energy conservation per volume', 'phx-xs phx-a'], ['점성·압축이 없는 정상 흐름에서 성립해요 · 실제 관에서는 마찰로 조금씩 손실', 'it holds for steady, inviscid, incompressible flow · real pipes lose a little to friction'], ['벤투리 유량계, 분무기, 피토관(비행기 속도계), 토리첼리 정리', 'Venturi meters, sprayers, Pitot tubes (airspeed) and Torricelli’s law']]);
  S.cap(1, '관 속의 흐름', 'Flow through a pipe').cap(2, '빨라지면 압력이 낮아요', 'Faster flow, lower pressure').cap(3, '높아져도 압력이 낮아요', 'Higher up, lower pressure').cap(4, '토리첼리 정리', 'Torricelli’s law').cap(5, '베르누이 정리', 'Bernoulli’s principle');
  return S;
}

/* ================= waves ================= */
function sHarm() {
  const S = scene({ id: 'ph-harmonics', steps: 5, per: 1.7 });
  const X0 = 2.6, X1 = 13.6, Wd = X1 - X0;
  [1, 2, 3, 4].forEach((n, i) => { const y = 1.6 + i * 2.9, st = n <= 2 ? 1 : 2, A = .9;
    pt(S, 'e0' + n, X0, y, st, C.idle, .18); pt(S, 'e1' + n, X1, y, st, C.idle, .18);
    pplot(S, 'u' + n, t => [X0 + t * Wd, y - A * Math.sin(n * Math.PI * t)], 0, 1, { st, color: 'accent', h: .1, n: 40 });
    pplot(S, 'v' + n, t => [X0 + t * Wd, y + A * Math.sin(n * Math.PI * t)], 0, 1, { st, color: 'accent', h: .06, n: 40, dash: 1 });
    for (let k = 1; k < n; k++) pt(S, `nd${n}_${k}`, X0 + Wd * k / n, y, st, C.badf, .16);
    lbl(S, 'nl' + n, X1 + .5, y - .45, `n = ${n} · ${200 * n} Hz`, 'cz-mono phx-a', st); });
  lbl(S, 'sl', X0, 12.6, ['양 끝 고정 줄 (L = 0.5 m, v = 200 m/s)', 'string fixed at both ends (L = 0.5 m, v = 200 m/s)'], '', 1);
  const pipe = (k, x, y, w, closed, st) => { hl(S, k + 't', x, x + w, y - 1.0, 'ink-3', st, { w: .12 }); hl(S, k + 'b', x, x + w, y + 1.0, 'ink-3', st, { w: .12 }); if (closed) vl(S, k + 'c', x, y - 1.0, y + 1.0, 'ink-3', st, { w: .3 }); };
  const PX = 21.0, PW = 9.2;
  pipe('op', PX, 2.6, PW, false, 3);
  pplot(S, 'opu', t => [PX + t * PW, 2.6 - .75 * Math.cos(Math.PI * t)], 0, 1, { st: 3, color: 'ok', h: .1, n: 30 }); pplot(S, 'opv', t => [PX + t * PW, 2.6 + .75 * Math.cos(Math.PI * t)], 0, 1, { st: 3, color: 'ok', h: .06, n: 30 });
  lbl(S, 'opl', PX, 4.0, ['열린 관: f = nv/2L (모든 n)', 'open pipe: f = nv/2L (every n)'], 'phx-g', 3, { w: 10 });
  pipe('cp', PX, 7.6, PW, true, 4);
  pplot(S, 'cpu', t => [PX + t * PW, 7.6 - .75 * Math.sin(Math.PI / 2 * t)], 0, 1, { st: 4, color: 'warn', h: .1, n: 30 }); pplot(S, 'cpv', t => [PX + t * PW, 7.6 + .75 * Math.sin(Math.PI / 2 * t)], 0, 1, { st: 4, color: 'warn', h: .06, n: 30 });
  lbl(S, 'cpl', PX, 9.0, ['한쪽 막힌 관: f = nv/4L (홀수 n만)', 'closed pipe: f = nv/4L (odd n only)'], 'phx-w', 4, { w: 10 });
  lbl(S, 'cpn', PX, 10.9, ['막힌 끝 = 마디, 열린 끝 = 배', 'closed end = node, open end = antinode'], '', 4, { w: 10 });
  stepT(S, 'k', 1, 15.6, [['양 끝이 고정된 줄은 끝이 마디가 되는 파동만 오래 남아요 · 기본 진동과 2배 진동', 'a string fixed at both ends keeps only waves with nodes at the ends · the fundamental and twice it'], ['진동수가 기본음의 정수배인 배음이 차례로 생겨요 · 200, 400, 600, 800 Hz', 'overtones at whole-number multiples follow · 200, 400, 600, 800 Hz'], ['양쪽이 열린 관은 끝이 배가 되고, 역시 모든 정수배 배음이 나와요', 'a pipe open at both ends has antinodes at the ends and every harmonic'], ['한쪽이 막힌 관은 막힌 끝이 마디라서 홀수 배음만 나와요 · 클라리넷 소리의 비밀', 'closing one end makes it a node, leaving only odd harmonics · the clarinet’s sound']]);
  fin(S, 'z', 15.6, [['배음: 기본 진동수의 정수배로 생기는 정상파의 모드들', 'harmonics: standing-wave modes at whole-number multiples of the fundamental', 'phx-xs phx-a'], ['같은 음 높이라도 배음이 섞인 비율이 달라서 악기마다 음색이 달라요', 'the same pitch sounds different on each instrument because the harmonic mix differs'], ['줄을 짧게 하거나 팽팽하게(v ↑) 하면 음이 높아져요 · 기타 프렛, 조율', 'shortening or tightening a string (higher v) raises the pitch · guitar frets and tuning']]);
  S.cap(1, '기본 진동', 'The fundamental').cap(2, '배음', 'Overtones').cap(3, '열린 관', 'An open pipe').cap(4, '한쪽 막힌 관', 'A closed pipe').cap(5, '현과 관의 배음', 'Harmonics on strings and pipes');
  return S;
}

/* ================= thermodynamics ================= */
function sKinetic() {
  const S = scene({ id: 'ph-kinetic', steps: 5, per: 1.7 });
  const BX = 1.4, BY = 1.4, BW = 12.4, BH = 10.2;
  rect(S, 'box', BX, BY, BW, BH, 'line', 10, 0, { r: .2 }); vl(S, 'wall', BX + BW, BY, BY + BH, 'danger', 2, { w: .18, off: 3 });
  const pos = [...Array(5)].map(() => [...Array(14)].map(() => [BX + .6 + rnd() * (BW - 1.2), BY + .6 + rnd() * (BH - 1.2)]));
  for (let i = 0; i < 14; i++) { pt(S, 'm' + i, ...pos[0][i], 0, C.cur, .24); for (let s = 1; s < 5; s++) S.move('m' + i, s, pos[s][i][0] - .24, pos[s][i][1] - .24); }
  const hy = 6.5, hx = BX + BW - .4;
  ar(S, 'in', [hx - 3, hy - 1], [hx, hy], 'warn', 2, { h: .12, off: 3 }); ar(S, 'out', [hx, hy], [hx - 3, hy + 1], 'ok', 2, { h: .12, off: 3 });
  lbl(S, 'imp', hx - 6.8, hy + 1.3, ['벽이 받는 충격 2mv', 'impulse on the wall 2mv'], 'phx-r', 2, { off: 3 });
  const R = 15.2;
  lbl(S, 'r1', R, .8, ['기체 = 마구 날아다니는 분자들', 'a gas = molecules flying at random'], '', 1, { w: 15 });
  lbl(S, 'r2', R, 2.2, 'P = ⅓ ρ v²_rms', 'cz-mono phx-s phx-a', 2); lbl(S, 'r2b', R, 3.4, ['압력 = 충돌로 받는 힘 ÷ 넓이', 'pressure = collision force ÷ area'], '', 2, { w: 15 });
  lbl(S, 'r3', R, 4.9, 'K̄ = (3/2) kT', 'cz-mono phx-s phx-w', 3); lbl(S, 'r3b', R, 6.1, ['온도 = 평균 운동에너지', 'temperature = average kinetic energy'], '', 3, { w: 15 });
  const Mm = .028, Rg = 8.314, vr = Tk => Math.sqrt(3 * Rg * Tk / Mm);
  lbl(S, 'r3c', R, 7.2, [`N₂, 300 K → v_rms ≈ ${Math.round(vr(300))} m/s`, `N₂ at 300 K → v_rms ≈ ${Math.round(vr(300))} m/s`], 'cz-mono', 3);
  const G = fr(0, 1500, 0, 2.2e-3, 16.6, 30.6, 8.8, 13.4), mb = (v, Tk) => { const a = Mm / (2 * Rg * Tk); return 4 * Math.PI * (a / Math.PI) ** 1.5 * v * v * Math.exp(-a * v * v); };
  hl(S, 'gx', G.L, G.R, G.B, 'ink-3', 4, { w: .08 });
  [0, 500, 1000, 1500].forEach(v => lbl(S, 'gt' + v, G.X(v) - 1.2, G.B + .1, String(v), 'cz-tc cz-mono', 4, { w: 2.4 }));
  mplot(S, 'g3', G, v => [v, mb(v, 300)], 0, 1500, { st: 4, color: 'accent', h: .1, n: 60 }); mplot(S, 'g6', G, v => [v, mb(v, 600)], 0, 1500, { st: 4, color: 'danger', h: .1, n: 60 });
  lbl(S, 'g3l', G.X(420) - 1.4, G.Y(mb(420, 300)) - 1.0, '300 K', 'cz-mono phx-a', 4); lbl(S, 'g6l', G.X(800), G.Y(mb(800, 600)) - .9, '600 K', 'cz-mono phx-r', 4);
  lbl(S, 'gl', G.R - 4.4, G.B + 1.0, ['속력 (m/s)', 'speed (m/s)'], '', 4, { w: 4.4, css: 'text-align:right' });
  stepT(S, 'k', 1, 15.6, [['기체는 수많은 분자가 제각각 날아다니며 서로, 벽에 부딪히는 상태예요', 'a gas is a swarm of molecules flying around, hitting each other and the walls'], ['분자가 벽에 튕길 때마다 운동량 2mv를 넘겨줘요 · 이 충격의 평균이 압력', 'each bounce hands the wall momentum 2mv · the average of these kicks is the pressure'], ['온도는 분자 평균 운동에너지의 척도 · 실온의 질소 분자는 초속 500 m 정도예요', 'temperature measures average kinetic energy · room-temperature nitrogen moves at about 500 m/s'], ['속력은 하나가 아니라 맥스웰 분포를 이뤄요 · 온도가 오르면 빨라지고 넓게 퍼져요', 'speeds follow the Maxwell distribution · heating shifts it faster and spreads it wider']]);
  fin(S, 'z', 15.6, [['분자 운동론: PV = nRT를 분자의 충돌과 운동에너지로 설명해요', 'kinetic theory explains PV = nRT through molecular collisions and kinetic energy', 'phx-xs phx-a'], ['v_rms = √(3RT/M) · 가벼운 분자일수록 빨라요 (수소가 대기에서 빠져나가는 이유)', 'v_rms = √(3RT/M) · lighter molecules move faster, which is why hydrogen escapes the atmosphere'], ['단원자 기체의 내부에너지 U = (3/2)nRT · 확산, 증발, 반응 속도도 이 분포로 설명해요', 'a monatomic gas has U = (3/2)nRT · diffusion, evaporation and reaction rates follow from this distribution']]);
  S.cap(1, '날아다니는 분자', 'Molecules in motion').cap(2, '압력은 충돌', 'Pressure is collisions').cap(3, '온도는 운동에너지', 'Temperature is kinetic energy').cap(4, '맥스웰 속력 분포', 'The Maxwell speed distribution').cap(5, '분자 운동론', 'Kinetic theory');
  return S;
}

function sEntropy() {
  const S = scene({ id: 'ph-entropy', steps: 5, per: 1.7 });
  const BX = 1.2, BY = 1.2, BW = 12, BH = 5.6;
  rect(S, 'box', BX, BY, BW, BH, 'line', 10, 0, { r: .2 }); vl(S, 'part', BX + BW / 2, BY, BY + BH, 'ink', 0, { w: .16, off: 2 });
  const L0 = [[2.6, 2.6], [4.8, 3.4], [3.0, 5.2], [5.6, 5.4]], L1 = [[2.4, 2.4], [9.4, 3.0], [5.0, 5.4], [11.2, 5.0]];
  'ABCD'.split('').forEach((c, i) => { dot(S, 'g' + i, L0[i][0], L0[i][1], c, { r: .42, s: C.cur }); S.move('g' + i, 2, L1[i][0] - .42, L1[i][1] - .42); });
  const CN = [1, 4, 6, 4, 1], F = fr(-.5, 4.5, 0, 7, 2.2, 12.6, 8.4, 13.4);
  CN.forEach((c, k) => { rect(S, 'cb' + k, F.X(k - .35), F.Y(c), F.X(k + .35) - F.X(k - .35), F.Y(0) - F.Y(c), k === 2 ? 'ok' : 'accent', 40, 3, { r: .05 }); lbl(S, 'cv' + k, F.X(k) - 1, F.Y(c) - .95, String(c), 'cz-tc cz-mono', 3, { w: 2 }); lbl(S, 'ck' + k, F.X(k) - 1, F.B + .1, `${k}:${4 - k}`, 'cz-tc cz-mono', 3, { w: 2 }); });
  hl(S, 'cx', F.L, F.R, F.B, 'ink-3', 3, { w: .08 }); lbl(S, 'cl', BX, 7.4, ['왼쪽:오른쪽 분자 수 · 경우의 수 W', 'left:right split · number of arrangements W'], '', 3);
  const R = 15.0;
  lbl(S, 'r1', R, .8, ['칸막이를 걷으면 기체가 퍼지고, 저절로 다시 모이지 않아요', 'lift the partition and the gas spreads, never gathering back by itself'], '', 2, { w: 15.6 });
  lbl(S, 'r2', R, 3.0, 'S = k ln W', 'cz-mono phx-l phx-a', 3);
  lbl(S, 'r3', R, 4.6, ['고르게 퍼진 상태가 경우의 수가 가장 많아요', 'the evenly spread state has the most arrangements'], '', 3, { w: 15.6 });
  lbl(S, 'r4', R, 5.8, ['분자 100개가 한쪽에 몰릴 확률 2⁻¹⁰⁰ ≈ 10⁻³⁰', '100 molecules all on one side: 2⁻¹⁰⁰ ≈ 10⁻³⁰'], 'cz-mono phx-r', 3);
  box2(S, 'hot', 15.4, 8.6, 4.6, 2.4, ['뜨거운 400 K', 'hot 400 K'], 'danger', 4, { pct: 26 }); box2(S, 'cold', 25.6, 8.6, 4.6, 2.4, ['차가운 300 K', 'cold 300 K'], 'accent', 4, { pct: 26 });
  ar(S, 'q', [20.2, 9.8], [25.4, 9.8], 'warn', 4, { h: .16 }); lbl(S, 'ql', 21.2, 8.6, 'Q = 100 J', 'cz-mono phx-w', 4);
  lbl(S, 'dh', 15.4, 11.4, 'ΔS = −100/400 = −0.25', 'cz-mono phx-r', 4); lbl(S, 'dc', 23.6, 11.4, 'ΔS = +100/300 = +0.33', 'cz-mono phx-a', 4);
  lbl(S, 'dt', 15.4, 12.8, ['합계 +0.08 J/K > 0 → 열은 뜨거운 쪽에서 차가운 쪽으로', 'total +0.08 J/K > 0 → heat flows from hot to cold'], 'phx-g', 4, { w: 15.6 });
  stepT(S, 'k', 1, 15.6, [['칸막이 왼쪽에만 분자 4개가 모여 있어요', 'four molecules sit in the left half behind a partition'], ['칸막이를 걷으면 퍼져서 섞여요 · 반대로 저절로 한쪽에 모이는 일은 보지 못해요', 'remove it and they spread out · we never see them gather back on their own'], ['배치의 경우의 수를 세면 반반이 가장 많아요 · 엔트로피 S = k ln W가 가장 큰 상태', 'counting arrangements, the half-and-half split wins · the state of largest entropy S = k ln W'], ['열이 뜨거운 곳에서 차가운 곳으로 흐를 때도 전체 엔트로피가 늘어요', 'heat flowing from hot to cold also raises the total entropy']]);
  fin(S, 'z', 15.6, [['열역학 제2법칙: 고립계의 엔트로피는 줄지 않아요 · 자연스러운 변화에는 방향이 있어요', 'the second law: an isolated system’s entropy never decreases · natural change has a direction', 'phx-xs phx-a'], ['가역 과정에서 ΔS = Q/T · 그래서 열기관의 효율에는 카르노 한계가 생겨요', 'for reversible heat flow ΔS = Q/T, which caps every engine at the Carnot limit'], ['정보 이론의 엔트로피도 같은 꼴(Σ −p log p) · 경우의 수가 곧 불확실성이에요', 'information entropy has the same form (Σ −p log p) · counting states is counting uncertainty']]);
  S.cap(1, '한쪽에 모인 기체', 'Gas in one half').cap(2, '저절로 퍼져요', 'It spreads on its own').cap(3, '경우의 수 세기', 'Counting arrangements').cap(4, '열의 흐름과 엔트로피', 'Heat flow and entropy').cap(5, '엔트로피와 제2법칙', 'Entropy and the second law');
  return S;
}

/* ================= electricity ================= */
function sKirch() {
  const S = scene({ id: 'ph-kirchhoff', steps: 5, per: 1.7 });
  const XL = 2.2, XM = 10.2, XR = 18.2, YT = 2.4, YB = 12.6, W = 'ink-2';
  hl(S, 'wt', XL, XR, YT, W, 0, { w: .1 }); hl(S, 'wb', XL, XR, YB, W, 0, { w: .1 });
  vl(S, 'wl1', XL, YT, 6.0, W, 0, { w: .1 }); vl(S, 'wl2', XL, 9.0, YB, W, 0, { w: .1 }); vl(S, 'wr1', XR, YT, 6.0, W, 0, { w: .1 }); vl(S, 'wr2', XR, 9.0, YB, W, 0, { w: .1 });
  vl(S, 'wm1', XM, YT, 5.6, W, 0, { w: .1 }); vl(S, 'wm2', XM, 9.4, YB, W, 0, { w: .1 });
  const bat = (k, x, v, lx) => { hl(S, k + 'a', x - .9, x + .9, 6.4, 'ink', 0, { w: .14 }); hl(S, k + 'b', x - .45, x + .45, 7.2, 'ink', 0, { w: .22 }); vl(S, k + 'c', x, 6.0, 6.4, W, 0, { w: .1 }); vl(S, k + 'd', x, 7.2, 9.0, W, 0, { w: .1 }); lbl(S, k + 'l', x + lx, 6.2, v, 'cz-mono phx-s', 0); lbl(S, k + 'p', x - 1.6, 5.6, '+', 'cz-mono phx-s phx-r', 0); };
  bat('e1', XL, '12 V', 1.1); bat('e2', XR, '6 V', -2.4);
  box2(S, 'r1', 4.6, YT - .6, 3.4, 1.2, 'R₁ 2 Ω', 'warn', 0, { pct: 30 }); box2(S, 'r2', 12.6, YT - .6, 3.4, 1.2, 'R₂ 4 Ω', 'warn', 0, { pct: 30 }); box2(S, 'r3', XM - .7, 5.6, 1.4, 3.8, 'R₃', 'warn', 0, { pct: 30 }); lbl(S, 'r3v', XM + .9, 7.0, '4 Ω', 'cz-mono phx-s', 0);
  pt(S, 'j1', XM, YT, 0, { background: 'var(--ink)', 'border-color': 'transparent' }, .2); pt(S, 'j2', XM, YB, 0, { background: 'var(--ink)', 'border-color': 'transparent' }, .2);
  ar(S, 'i1', [3.0, YT - .9], [4.2, YT - .9], 'accent', 2, { h: .12 }); lbl(S, 'i1l', 2.6, YT - 2.0, 'I₁', 'cz-mono phx-s phx-a', 2);
  ar(S, 'i2', [17.4, YT - .9], [16.2, YT - .9], 'ok', 2, { h: .12, off: 4 }); lbl(S, 'i2l', 16.6, YT - 2.0, 'I₂', 'cz-mono phx-s phx-g', 2);
  ar(S, 'i2r', [16.2, YT - .9], [17.4, YT - .9], 'danger', 4, { h: .12 });
  ar(S, 'i3', [XM + .9, 10.0], [XM + .9, 11.4], 'warn', 2, { h: .12 }); lbl(S, 'i3l', XM + 1.3, 10.1, 'I₃', 'cz-mono phx-s phx-w', 2);
  ring(S, 'lp1', 6.2, 7.6, 1.6, 'accent', 3, { w: .08, dash: 1 }); lbl(S, 'lp1l', 5.4, 7.1, '①', 'phx-s phx-a', 3);
  ring(S, 'lp2', 14.2, 7.6, 1.6, 'ok', 3, { w: .08, dash: 1 }); lbl(S, 'lp2l', 13.4, 7.1, '②', 'phx-s phx-g', 3);
  const R = 20.0;
  lbl(S, 'q1', R, .8, ['접합점 (KCL)', 'junction (KCL)'], 'phx-a', 2); lbl(S, 'q2', R, 1.8, 'I₃ = I₁ + I₂', 'cz-mono phx-s', 2);
  lbl(S, 'q3', R, 3.4, ['고리 (KVL)', 'loops (KVL)'], 'phx-a', 3);
  lbl(S, 'q4', R, 4.4, '① 12 − 2I₁ − 4I₃ = 0', 'cz-mono', 3); lbl(S, 'q5', R, 5.4, '② 6 − 4I₂ − 4I₃ = 0', 'cz-mono', 3);
  lbl(S, 'q6', R, 7.0, 'I₁ = 2.25 A', 'cz-mono phx-a', 4); lbl(S, 'q7', R, 8.0, 'I₃ = 1.875 A', 'cz-mono phx-w', 4);
  lbl(S, 'q8', R, 9.0, 'I₂ = −0.375 A', 'cz-mono phx-r', 4); lbl(S, 'q9', R, 10.1, ['음수 → 실제 방향은 반대', 'negative → it really flows the other way'], 'phx-r', 4, { w: 11 });
  stepT(S, 'k', 1, 15.6, [['전지가 두 개인 회로 · 직렬·병렬만으로는 풀 수 없어요', 'a circuit with two batteries · series and parallel rules alone cannot solve it'], ['전류 방향을 일단 가정하고, 접합점에서 들어온 전류 = 나간 전류(KCL)', 'guess the current directions, then at a junction current in = current out (KCL)'], ['닫힌 고리를 한 바퀴 돌면 전압의 오르내림 합이 0(KVL) · 식 두 개가 나와요', 'around any closed loop the voltage rises and drops sum to zero (KVL) · two equations'], ['연립하면 I₂가 음수 · 가정한 방향이 틀렸을 뿐, 크기는 그대로 맞아요', 'solving gives a negative I₂ · only the guessed direction was wrong; the size is right']]);
  fin(S, 'z', 15.6, [['키르히호프 법칙: 전하 보존(KCL)과 에너지 보존(KVL)', 'Kirchhoff’s laws: charge conservation (KCL) and energy conservation (KVL)', 'phx-xs phx-a'], ['미지 전류 수만큼 독립인 식을 세우면 어떤 회로든 풀려요 · 회로 시뮬레이터(SPICE)의 기본', 'enough independent equations solve any circuit · the basis of circuit simulators such as SPICE'], ['전류 방향은 아무렇게나 가정해도 돼요 · 답의 부호가 실제 방향을 알려 줘요', 'any current direction can be assumed · the sign of the answer reveals the real one']]);
  S.cap(1, '전지가 둘인 회로', 'A two-battery circuit').cap(2, '접합점 법칙', 'The junction rule').cap(3, '고리 법칙', 'The loop rule').cap(4, '연립해서 풀기', 'Solve the system').cap(5, '키르히호프 법칙', 'Kirchhoff’s laws');
  return S;
}

function sLenz() {
  const S = scene({ id: 'ph-lenz', steps: 5, per: 1.7 });
  const Y = 6.6, RX = 14.6;
  hl(S, 'axis', 1, 19, Y, 'line', 0, { w: .06 });
  S.el('ringb', { x: RX - .55, y: Y - 3.2, w: 1.1, h: 6.4, css: 'border-radius:50%;border:.22em solid var(--warn);border-left-color:color-mix(in srgb,var(--warn) 35%,transparent)' });
  const mag = (k, x, st, off) => { box2(S, k + 'n', x + 2.4, Y - .7, 2.4, 1.4, 'N', 'danger', st, { pct: 45, off }); box2(S, k + 's', x, Y - .7, 2.4, 1.4, 'S', 'accent', st, { pct: 45, off }); };
  mag('m1', 4.2, 0, 3); ar(S, 'v1', [5.0, Y - 1.6], [8.0, Y - 1.6], 'ink', 1, { h: .12, off: 3 }); lbl(S, 'v1l', 4.6, Y - 2.8, ['다가가요 → 선속 증가', 'approaching → flux rises'], '', 1, { off: 3 });
  ar(S, 'c1a', [RX + .1, Y - 2.9], [RX + .1, Y - 1.9], 'warn', 2, { h: .12, off: 3 }); ar(S, 'c1b', [RX - .1, Y + 2.9], [RX - .1, Y + 1.9], 'warn', 2, { h: .12, off: 3 });
  ar(S, 'b1', [RX + 2.2, Y], [RX - 2.4, Y], 'danger', 2, { h: .12, off: 3 }); lbl(S, 'b1l', RX + .8, Y + .3, ['유도 자기장', 'induced field'], 'phx-r', 2, { off: 3 });
  lbl(S, 'f1', RX - 2.2, Y - 4.6, ['N ↔ N 밀어내요', 'N faces N: repels'], 'phx-r', 2, { off: 3 });
  mag('m2', 2.4, 3); ar(S, 'v2', [6.6, Y - 1.6], [3.6, Y - 1.6], 'ink', 3, { h: .12, off: 4 }); lbl(S, 'v2l', 2.0, Y - 2.8, ['멀어져요 → 선속 감소', 'leaving → flux falls'], '', 3, { off: 4 });
  ar(S, 'c2a', [RX + .1, Y - 1.9], [RX + .1, Y - 2.9], 'ok', 3, { h: .12, off: 4 }); ar(S, 'c2b', [RX - .1, Y + 1.9], [RX - .1, Y + 2.9], 'ok', 3, { h: .12, off: 4 });
  ar(S, 'b2', [RX - 2.4, Y], [RX + 2.2, Y], 'ok', 3, { h: .12, off: 4 }); lbl(S, 'f2', RX - 2.2, Y - 4.6, ['S ↔ N 당겨요', 'S faces N: attracts'], 'phx-g', 3, { off: 4 });
  rect(S, 'pipe', 24.0, 1.0, 2.8, 12.4, 'warn', 22, 4, { r: .2 }); box2(S, 'pm', 24.6, 4.6, 1.6, 1.4, 'N', 'danger', 4, { pct: 50 });
  ar(S, 'pv', [27.6, 4.4], [27.6, 5.6], 'ink', 4, { h: .1 }); lbl(S, 'pvl', 28.0, 4.6, ['천천히', 'slowly'], '', 4);
  pt(S, 'ball', 21.6, 11.6, 4, { background: 'var(--ink-3)', 'border-color': 'transparent' }, .5); ar(S, 'bv', [21.6, 7.6], [21.6, 10.8], 'ink-3', 4, { h: .1 }); lbl(S, 'bvl', 19.4, 6.4, ['그냥 낙하', 'free fall'], '', 4);
  lbl(S, 'pl', 21.0, 13.6, ['구리관 속 자석: 맴돌이 전류 브레이크', 'magnet in a copper pipe: eddy-current brake'], 'phx-w', 4, { w: 10.4 });
  lbl(S, 'eq', 1, 11.4, 'ε = −N dΦ/dt', 'cz-mono phx-l phx-a', 1);
  lbl(S, 'eq2', 1, 12.9, ['− 부호: 유도 전류는 변화를 방해해요', 'the minus sign: the induced current opposes the change'], '', 2, { w: 17 });
  stepT(S, 'k', 1, 15.6, [['자석의 N극이 고리에 다가가면 고리를 지나는 자기 선속이 늘어나요', 'as a magnet’s N pole approaches the loop, the magnetic flux through it rises'], ['고리에는 그 증가를 막는 방향의 자기장을 만드는 전류가 흘러요 · 다가오는 N극을 밀어내요', 'the loop drives a current whose field fights the increase · it pushes the approaching N pole away'], ['자석이 멀어지면 선속이 줄어드니, 전류가 반대로 흘러 자석을 붙잡아요', 'as the magnet leaves, the flux falls, so the current reverses and pulls the magnet back'], ['구리관 속에 자석을 떨어뜨리면 관에 생기는 맴돌이 전류가 낙하를 늦춰요', 'a magnet dropped through a copper pipe falls slowly, braked by eddy currents in the pipe']]);
  fin(S, 'z', 15.6, [['렌츠 법칙: 유도 전류는 자신을 만든 선속 변화를 방해하는 방향으로 흘러요', 'Lenz’s law: the induced current always opposes the flux change that creates it', 'phx-xs phx-a'], ['반대로 돕는다면 에너지가 공짜로 생겨요 · 에너지 보존의 결과예요', 'if it helped instead, energy would appear from nothing · it follows from energy conservation'], ['인덕션 레인지, 전기차 회생 제동, 열차의 와전류 브레이크', 'induction cooktops, regenerative braking in EVs and eddy-current brakes on trains']]);
  S.cap(1, '자석이 다가오면', 'A magnet approaches').cap(2, '변화를 막는 전류', 'A current that resists').cap(3, '멀어지면 반대로', 'Reversed as it leaves').cap(4, '맴돌이 전류 브레이크', 'Eddy-current braking').cap(5, '렌츠 법칙', 'Lenz’s law');
  return S;
}

/* ================= optics ================= */
function sTIR() {
  const S = scene({ id: 'ph-tir', steps: 5, per: 1.7 });
  const YI = 8.0, SRC = [5.0, 13.6], n1 = 1.5, X1 = 17.0;
  rect(S, 'gl', 1, YI, X1 - 1, 6.0, 'accent', 14, 0, { r: 0 }); hl(S, 'if', 1, X1, YI, 'accent', 0, { w: .1 });
  lbl(S, 'air', 1.4, 1.0, ['공기 n = 1.0', 'air n = 1.0'], '', 0); lbl(S, 'gls', 1.4, 12.6, ['유리 n = 1.5', 'glass n = 1.5'], 'phx-a', 0);
  pt(S, 'src', ...SRC, 0, C.warn, .3);
  const ray = (k, th, st, off) => { const hx = SRC[0] + (SRC[1] - YI) * Math.tan(deg(th)), sn = n1 * Math.sin(deg(th));
    seg(S, k + 'i', SRC, [hx, YI], st, 'warn', .1, { off }); seg(S, k + 'n', [hx, YI - 2.2], [hx, YI + 2.2], st, 'ink-3', .05, { dash: 1, off });
    if (sn < .999) { const ph = Math.asin(sn), ex = hx + 5.6 * Math.tan(ph); seg(S, k + 'o', [hx, YI], [Math.min(ex, X1 + 6), YI - 5.6 * Math.min(1, (X1 + 6 - hx) / (ex - hx))], st, 'warn', .1, { off }); seg(S, k + 'r', [hx, YI], [hx + 2.4 * Math.tan(deg(th)), YI + 2.4], st, 'warn', .04, { off }); return [hx, Math.asin(sn) * 180 / Math.PI]; }
    if (sn < 1.001) { seg(S, k + 'o', [hx, YI - .05], [X1 + 1.5, YI - .05], st, 'warn', .1, { off }); return [hx, 90]; }
    const d = (X1 - hx) / Math.tan(deg(th)); seg(S, k + 'r', [hx, YI], [X1, YI + d], st, 'warn', .14, { off }); return [hx, null]; };
  const tc = Math.asin(1 / n1) * 180 / Math.PI;
  const [h1, p1] = ray('a', 30, 1, 2); lbl(S, 'al', h1 - 4.6, YI - 2.2, `30° → ${p1.toFixed(1)}°`, 'cz-mono phx-w', 1, { off: 2, w: 4.2, css: 'text-align:right' });
  const [h2] = ray('b', tc, 2, 3); lbl(S, 'bl', h2 + .4, YI - 1.3, [`임계각 ${tc.toFixed(1)}° → 90°`, `critical ${tc.toFixed(1)}° → 90°`], 'cz-mono phx-w', 2, { off: 3 });
  const [h3] = ray('c', 55, 3, 0); lbl(S, 'cl', h3 + .4, YI - 1.3, ['55° → 전부 반사', '55° → all reflected'], 'phx-r', 3);
  const FX0 = 18.6, FX1 = 31, FY = 10.6;
  rect(S, 'clad', FX0, FY - 1.9, FX1 - FX0, 3.8, 'ink-3', 16, 4, { r: .6 }); rect(S, 'core', FX0, FY - 1.1, FX1 - FX0, 2.2, 'accent', 22, 4, { r: .4 });
  const zz = []; for (let i = 0; i <= 6; i++) zz.push([FX0 + .4 + i * 2.0, FY + (i % 2 ? -.95 : .95)]); poly(S, 'zz', zz, { st: 4, color: 'warn', h: .1 });
  lbl(S, 'fl', FX0, FY + 2.2, ['광섬유: 코어 안에서 전반사로 갇혀 진행', 'optical fibre: trapped in the core by TIR'], 'phx-a', 4, { w: 12.4 });
  const R = 18.6;
  lbl(S, 'r1', R, .8, 'n₁ sin θ₁ = n₂ sin θ₂', 'cz-mono phx-s', 1);
  lbl(S, 'r2', R, 2.2, `sin θc = 1/1.5 → θc = ${tc.toFixed(1)}°`, 'cz-mono phx-w', 2);
  lbl(S, 'r3', R, 3.6, ['θ > θc면 빛이 빠져나가지 못해요', 'past θc no light escapes'], 'phx-r', 3, { w: 12.4 });
  lbl(S, 'r4', R, 4.8, ['굴절률이 큰 쪽 → 작은 쪽일 때만', 'only from higher n to lower n'], '', 3, { w: 12.4 });
  stepT(S, 'k', 1, 15.6, [['유리 속 빛이 공기로 나갈 때 법선에서 더 멀어지게 꺾여요 · 30°는 48.6°로', 'light leaving glass for air bends away from the normal · 30° becomes 48.6°'], [`입사각을 키우다 ${tc.toFixed(1)}°가 되면 굴절각이 90°, 빛이 표면을 따라 스쳐 가요`, `at ${tc.toFixed(1)}° the refracted ray reaches 90° and skims the surface`], ['그보다 크면 빛이 하나도 나가지 못하고 전부 반사돼요 · 전반사', 'beyond that no light gets out and all of it reflects · total internal reflection'], ['광섬유는 이 전반사로 빛을 코어 안에 가둬 수 km를 보내요', 'optical fibres trap light in the core this way and carry it for kilometres']]);
  fin(S, 'z', 15.6, [['전반사: 굴절률이 큰 매질에서 작은 매질로, 임계각 sin θc = n₂/n₁보다 크게 들어올 때', 'total internal reflection: going from higher to lower n beyond sin θc = n₂/n₁', 'phx-xs phx-a'], ['다이아몬드(n = 2.42)는 임계각이 24.4°로 작아서 빛이 안에서 여러 번 반사돼 반짝여요', 'diamond (n = 2.42) has a tiny 24.4° critical angle, so light bounces inside and sparkles'], ['인터넷 해저 케이블, 내시경, 쌍안경 프리즘이 모두 전반사를 써요', 'undersea internet cables, endoscopes and binocular prisms all rely on it']]);
  S.cap(1, '유리에서 공기로', 'From glass into air').cap(2, '임계각', 'The critical angle').cap(3, '전반사', 'Total internal reflection').cap(4, '광섬유', 'Optical fibres').cap(5, '전반사와 광섬유', 'Total internal reflection and fibres');
  return S;
}

function sMirror() {
  const S = scene({ id: 'ph-mirror', steps: 5, per: 1.7 });
  const AY = 8.0, MX = 20.0, f = 4.0, Fx = MX - f, Cx = MX - 2 * f, s = .4;
  hl(S, 'ax', 1, 27, AY, 'ink-3', 0, { w: .06 });
  pplot(S, 'm', t => [Cx + 2 * f * Math.cos(t), AY - 2 * f * Math.sin(t)], deg(-36), deg(36), { color: 'ink', h: .2, n: 30, off: 4 });
  pt(S, 'F', Fx, AY, 0, C.badf, .2, { off: 4 }); lbl(S, 'Fl', Fx - .3, AY + .3, 'F', 'cz-mono phx-r', 0, { off: 4 }); pt(S, 'C', Cx, AY, 0, C.idle, .2, { off: 4 }); lbl(S, 'Cl', Cx - .3, AY + .3, 'C', 'cz-mono', 0, { off: 4 });
  const obj = (k, x, h, st, off, c) => ar(S, k, [x, AY], [x, AY - h], c || 'accent', st, { h: .16, off });
  obj('o1', MX - 12, 2.4, 1, 3); obj('i1', MX - 6, -1.2, 2, 3, 'danger');
  const O1 = [MX - 12, AY - 2.4], I1 = [MX - 6, AY + 1.2];
  seg(S, 'r1a', O1, [MX, O1[1]], 2, 'warn', .07, { off: 3 }); seg(S, 'r1b', [MX, O1[1]], I1, 2, 'warn', .07, { off: 3 });
  seg(S, 'r2a', O1, [MX, AY + 1.2], 2, 'ok', .07, { off: 3 }); seg(S, 'r2b', [MX, AY + 1.2], I1, 2, 'ok', .07, { off: 3 });
  lbl(S, 'i1l', MX - 7.6, AY + 1.6, ['실상 · 거꾸로 · ½배', 'real · inverted · ½×'], 'phx-r', 2, { off: 3 });
  const O2 = [MX - 2, AY - 1.6], I2 = [MX + 4, AY - 3.2];
  obj('o2', MX - 2, 1.6, 3, 4); ar(S, 'i2', [MX + 4, AY], I2, 'danger', 3, { h: .16, off: 4, dash: 1 });
  seg(S, 'r3a', O2, [MX, O2[1]], 3, 'warn', .07, { off: 4 }); seg(S, 'r3b', [MX, O2[1]], [MX - 5.5, AY + .6], 3, 'warn', .07, { off: 4 }); seg(S, 'r3c', [MX, O2[1]], I2, 3, 'warn', .05, { dash: 1, off: 4 });
  lbl(S, 'i2l', MX + 1.0, AY - 4.6, ['허상 · 바로 · 2배 (화장 거울)', 'virtual · upright · 2× (makeup mirror)'], 'phx-r', 3, { off: 4, w: 9 });
  const CX2 = 15.0, fx2 = 4.0;
  pplot(S, 'cm', t => [CX2 + 2 * fx2 - 2 * fx2 * Math.cos(t), AY - 2 * fx2 * Math.sin(t)], deg(-36), deg(36), { st: 4, color: 'ink', h: .2, n: 30 });
  obj('o3', CX2 - 10, 2.4, 4); ar(S, 'i3', [CX2 + 3, AY], [CX2 + 3, AY - .6], 'danger', 4, { h: .14, dash: 1 });
  seg(S, 'r4a', [CX2 - 10, AY - 2.4], [CX2, AY - 2.4], 4, 'warn', .07); seg(S, 'r4b', [CX2, AY - 2.4], [CX2 - 6, AY - 6.0], 4, 'warn', .07); seg(S, 'r4c', [CX2, AY - 2.4], [CX2 + 4, AY], 4, 'warn', .05, { dash: 1 });
  lbl(S, 'i3l', CX2 + 1.4, AY + .8, ['허상 · 바로 · ¼배', 'virtual · upright · ¼×'], 'phx-r', 4, { w: 7 });
  lbl(S, 'cv', CX2 - 2.4, 2.0, ['볼록 거울: 넓게 보여요 (자동차 사이드미러)', 'convex mirror: a wide view (car side mirror)'], 'phx-a', 4, { w: 12 });
  lbl(S, 'eq', 1, .4, '1/f = 1/d_o + 1/d_i · f = R/2 · m = −d_i/d_o', 'cz-mono phx-a', 1);
  lbl(S, 'v1', 1, 12.6, 'f = 10 cm, d_o = 30 → d_i = 15, m = −0.5', 'cz-mono', 2, { off: 3 }); lbl(S, 'v2', 1, 12.6, 'd_o = 5 → d_i = −10, m = +2', 'cz-mono', 3, { off: 4 }); lbl(S, 'v3', 1, 12.6, 'f = −10, d_o = 30 → d_i = −7.5, m = +0.25', 'cz-mono', 4);
  stepT(S, 'k', 1, 15.6, [['오목 거울: 축에 나란한 빛은 초점 F로 모여요 · 초점 거리는 반지름의 절반', 'a concave mirror sends rays parallel to the axis through the focus F · f is half the radius'], ['초점 밖 물체는 축에 나란한 광선과 F를 지나는 광선이 만나는 곳에 거꾸로 선 실상을 맺어요', 'an object beyond F forms a real, inverted image where the parallel ray and the ray through F meet'], ['초점 안쪽에 두면 반사광이 퍼져서, 거울 뒤에 커다란 바로 선 허상이 보여요', 'inside F the reflected rays spread, so a large upright virtual image appears behind the mirror'], ['볼록 거울은 늘 작고 바로 선 허상을 만들어 넓은 범위를 보여줘요', 'a convex mirror always gives a small, upright virtual image and a wide field of view']]);
  fin(S, 'z', 15.6, [['구면 거울: 1/f = 1/d_o + 1/d_i, f = R/2 · 렌즈와 같은 식이에요', 'spherical mirrors: 1/f = 1/d_o + 1/d_i with f = R/2 · the same equation as lenses', 'phx-xs phx-a'], ['오목: 실상(멀리) 또는 확대 허상(가까이) · 볼록: 항상 축소 허상(f < 0)', 'concave: a real image far away or a magnified virtual one up close · convex: always a reduced virtual image (f < 0)'], ['반사 망원경, 자동차 헤드라이트 반사경, 매장의 볼록 감시 거울', 'reflecting telescopes, headlight reflectors and convex security mirrors in shops']]);
  S.cap(1, '오목 거울과 초점', 'A concave mirror and its focus').cap(2, '실상', 'A real image').cap(3, '확대 허상', 'A magnified virtual image').cap(4, '볼록 거울', 'A convex mirror').cap(5, '구면 거울', 'Spherical mirrors');
  return S;
}

function sDiffract() {
  const S = scene({ id: 'ph-diffract', steps: 5, per: 1.7 });
  const BX = 6.0, YC = 7.2;
  for (let i = 0; i < 4; i++) vl(S, 'w' + i, 1.4 + i * 1.2, 2.0, 12.4, 'accent', 0, { w: .08 });
  const barrier = (k, gap, st, off) => { rect(S, k + 'a', BX - .2, 1.0, .4, YC - gap / 2 - 1.0, 'ink', 60, st, { r: 0, off }); rect(S, k + 'b', BX - .2, YC + gap / 2, .4, 13.4 - YC - gap / 2, 'ink', 60, st, { r: 0, off }); };
  barrier('wb', 6.0, 1, 2);
  for (let i = 0; i < 4; i++) { vl(S, 'p' + i, BX + 1.2 + i * 1.2, YC - 2.8, YC + 2.8, 'accent', 1, { w: .08, off: 2 }); }
  barrier('nb', .8, 2);
  for (let i = 1; i <= 5; i++) { const r = i * 1.2; pplot(S, 'c' + i, t => [BX + r * Math.cos(t), YC - r * Math.sin(t)], deg(-75), deg(75), { st: 2, color: 'accent', h: .07, n: 24 }); }
  const G = fr(-.9, .9, 0, 1, 15.6, 30.6, 2.0, 9.6), I = (s, a) => { const x = Math.PI * a * s; return Math.abs(x) < 1e-6 ? 1 : (Math.sin(x) / x) ** 2; };
  hl(S, 'gx', G.L, G.R, G.B, 'ink-3', 3, { w: .08 }); vl(S, 'g0', G.X(0), G.T, G.B, 'line', 3, { w: .05, dash: 1 });
  mplot(S, 'i2', G, s => [s, I(s, 4)], -.9, .9, { st: 3, color: 'accent', h: .12, n: 120 });
  mplot(S, 'i1', G, s => [s, I(s, 2)], -.9, .9, { st: 4, color: 'danger', h: .12, n: 120 });
  [-.5, -.25, .25, .5].forEach(v => lbl(S, 'gt' + v, G.X(v) - 1.2, G.B + .1, (v > 0 ? '+' : '−') + (Math.abs(v) === .25 ? 'λ/a' : '2λ/a'), 'cz-tc cz-mono', 3, { w: 2.4 }));
  lbl(S, 'gl', G.R - 4, G.B + 1.0, 'sin θ', 'cz-mono', 3, { w: 4, css: 'text-align:right' });
  lbl(S, 'g4', G.X(.12), G.T - .2, 'a = 4λ', 'cz-mono phx-a', 3); lbl(S, 'g2', G.X(.32), G.Y(.45), ['a = 2λ (더 좁은 틈)', 'a = 2λ (narrower)'], 'cz-mono phx-r', 4);
  const R = 15.6;
  lbl(S, 'r1', R, 11.6, ['어두운 무늬: a sin θ = mλ (m = ±1, ±2, …)', 'dark fringes: a sin θ = mλ (m = ±1, ±2, …)'], 'cz-mono', 3, { w: 15.4 });
  lbl(S, 'r2', R, 12.8, ['틈이 좁을수록 넓게 퍼져요', 'the narrower the slit, the wider the spread'], 'phx-r', 4, { w: 15.4 });
  lbl(S, 'lw', 1.0, .4, ['넓은 틈: 거의 곧게 지나가요', 'a wide gap: waves pass almost straight'], '', 1, { off: 2 });
  lbl(S, 'ln', 1.0, .4, ['좁은 틈: 원형 파로 퍼져요', 'a narrow slit: circular waves spread out'], 'phx-a', 2);
  stepT(S, 'k', 1, 15.6, [['파장보다 훨씬 넓은 틈을 지나면 파동은 거의 곧게 나아가요', 'through a gap much wider than the wavelength, waves go nearly straight'], ['틈이 파장 정도로 좁으면 틈이 새 파원이 되어 사방으로 퍼져요 · 회절', 'a slit about a wavelength wide acts as a new source and spreads in all directions · diffraction'], ['틈의 각 부분에서 나온 파동이 간섭해서, 가운데가 밝고 a sin θ = mλ에서 어두운 무늬가 생겨요', 'waves from across the slit interfere: bright in the middle, dark where a sin θ = mλ'], ['틈 폭을 절반으로 하면 무늬가 두 배로 넓어져요 · 퍼짐 각 ≈ λ/a', 'halve the slit and the pattern doubles in width · the spread angle ≈ λ/a']]);
  fin(S, 'z', 15.6, [['회절: 파동이 틈이나 장애물 가장자리를 돌아 퍼지는 현상 · 퍼짐 ≈ λ/a', 'diffraction: waves bending around openings and edges · spread ≈ λ/a', 'phx-xs phx-a'], ['망원경·카메라의 해상도 한계 θ ≈ 1.22 λ/D · 큰 렌즈가 더 선명한 이유', 'it limits telescope and camera resolution to θ ≈ 1.22 λ/D · why bigger lenses see sharper'], ['담 너머 소리가 들리는 것, CD의 무지개, X선 결정학이 모두 회절이에요', 'hearing around corners, CD rainbows and X-ray crystallography are all diffraction']]);
  S.cap(1, '넓은 틈', 'A wide gap').cap(2, '좁은 틈에서 퍼짐', 'Spreading from a narrow slit').cap(3, '회절 무늬', 'The diffraction pattern').cap(4, '더 좁을수록 넓게', 'Narrower slit, wider pattern').cap(5, '회절', 'Diffraction');
  return S;
}

/* ================= modern physics ================= */
function sDeBroglie() {
  const S = scene({ id: 'ph-debroglie', steps: 5, per: 1.7 });
  lbl(S, 'eq', 1, .3, 'λ = h / p', 'cz-mono phx-l phx-a', 1);
  lbl(S, 'eq2', 8.0, .55, ['운동량을 가진 모든 것은 파장을 가져요', 'everything with momentum has a wavelength'], '', 1);
  const AX0 = 2.0, AX1 = 30.0, lo = -35, hi = -5, X = e => AX0 + (e - lo) / (hi - lo) * (AX1 - AX0), AY = 4.6;
  hl(S, 'ax', AX0, AX1, AY, 'ink-3', 2, { w: .1 });
  [-35, -30, -25, -20, -15, -10, -5].forEach(e => { vl(S, 'tk' + e, X(e), AY - .2, AY + .2, 'ink-3', 2, { w: .06 }); lbl(S, 'tl' + e, X(e) - 1.5, AY + .3, `10${String(e).replace('-', '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])} m`, 'cz-tc cz-mono', 2, { w: 3 }); });
  const mk = (k, e, t, c, up) => { pt(S, k, X(e), AY, 2, { background: `var(--${c})`, 'border-color': 'transparent' }, .26); lbl(S, k + 'l', X(e) - 3, up ? AY - 1.9 : AY + 1.2, t, 'cz-tc phx-' + (c === 'danger' ? 'r' : c === 'ok' ? 'g' : c === 'warn' ? 'w' : 'a'), 2, { w: 6 }); };
  mk('bb', Math.log10(1.14e-34), ['야구공 (40 m/s)', 'baseball (40 m/s)'], 'warn', true);
  mk('el', Math.log10(1.23e-10), ['전자 (100 V)', 'electron (100 V)'], 'accent', true);
  mk('at', Math.log10(2e-10), ['원자 간격', 'atom spacing'], 'ok', false);
  mk('vl', Math.log10(5e-7), ['가시광선', 'visible light'], 'danger', false);
  lbl(S, 'cmp', 1, 6.6, ['전자: 0.123 nm · 야구공: 1.1 × 10⁻³⁴ m', 'electron: 0.123 nm · baseball: 1.1 × 10⁻³⁴ m'], 'cz-mono', 2);
  const RC = [6.4, 11.0];
  for (let i = 1; i <= 4; i++) ring(S, 'dr' + i, RC[0], RC[1], i * .85, 'accent', 3, { w: .14 - i * .02, css: `opacity:${1 - i * .15}` });
  pt(S, 'dc', ...RC, 3, C.cur, .3); lbl(S, 'drl', 10.6, 8.6, ['전자 회절 무늬 (1927)', 'electron diffraction rings (1927)'], 'phx-a', 3);
  const OC = [21.5, 10.8], R0 = 2.6, A = .38;
  ring(S, 'orb', OC[0], OC[1], R0, 'line', 4, { w: .06, dash: 1 }); pt(S, 'nuc', ...OC, 4, C.badf, .26);
  pplot(S, 'wv', t => [OC[0] + (R0 + A * Math.sin(3 * t)) * Math.cos(t), OC[1] - (R0 + A * Math.sin(3 * t)) * Math.sin(t)], 0, 2 * Math.PI, { st: 4, color: 'ok', h: .1, n: 90 });
  const OC2 = [28.2, 10.8];
  ring(S, 'orb2', OC2[0], OC2[1], R0 * .7, 'line', 4, { w: .06, dash: 1 });
  pplot(S, 'wv2', t => [OC2[0] + (R0 * .7 + A * .8 * Math.sin(3.4 * t)) * Math.cos(t), OC2[1] - (R0 * .7 + A * .8 * Math.sin(3.4 * t)) * Math.sin(t)], 0, 2 * Math.PI, { st: 4, color: 'danger', h: .08, n: 90 });
  lbl(S, 'ol', 18.0, 14.0, ['2πr = nλ (n = 3) ✓', '2πr = nλ (n = 3) ✓'], 'cz-mono phx-g', 4); lbl(S, 'ol2', 25.6, 14.0, ['딱 안 맞으면 ✗', 'no fit ✗'], 'phx-r', 4, { w: 5.4 });
  stepT(S, 'k', 1, 15.6, [['드브로이: 빛처럼 물질도 파동이에요 · 파장은 플랑크 상수 ÷ 운동량', 'de Broglie: matter is a wave too, with wavelength Planck’s constant over momentum'], ['100 V로 가속한 전자는 0.123 nm로 원자 간격과 비슷하고, 야구공은 너무 짧아 보이지 않아요', 'an electron through 100 V has 0.123 nm, like atomic spacings; a baseball’s is far too short to notice'], ['그래서 전자를 결정에 쏘면 빛처럼 회절 무늬가 생겨요 · 데이비슨-거머 실험', 'so electrons fired at a crystal diffract like light · the Davisson–Germer experiment'], ['원자 속 전자의 파동이 궤도 둘레에 정수 개로 딱 맞아야 해서, 에너지 준위가 띄엄띄엄해요', 'an electron’s wave must fit a whole number of times around its orbit, so energy levels are discrete']]);
  fin(S, 'z', 15.6, [['물질파: λ = h/p · 입자와 파동의 이중성', 'matter waves: λ = h/p · wave–particle duality', 'phx-xs phx-a'], ['전자 현미경은 전자의 짧은 파장 덕분에 빛보다 수천 배 작은 것을 봐요', 'electron microscopes resolve detail thousands of times finer than light thanks to the short wavelength'], ['이 생각이 슈뢰딩거 방정식과 양자역학으로 이어졌어요', 'the idea led straight to the Schrödinger equation and quantum mechanics']]);
  S.cap(1, 'λ = h/p', 'λ = h/p').cap(2, '파장의 크기 비교', 'Comparing wavelengths').cap(3, '전자 회절', 'Electron diffraction').cap(4, '궤도의 정상파', 'Standing waves in orbits').cap(5, '물질파', 'Matter waves');
  return S;
}


return { css: CSSX, secs: [], add: {
},
after: {
  'ph-torque': [item('ph-equil', '정적 평형', 'Static equilibrium', '물체가 움직이지도 돌지도 않으려면 힘의 합과 토크의 합이 모두 0이어야 해요. 사다리, 다리, 선반 문제를 이 두 식으로 풀어요.', '정적 평형의 조건은 ΣF = 0(가로, 세로 각각)과 Στ = 0이에요. 매끈한 벽에 60°로 기댄 5 m, 20 kg 사다리에는 무게 196 N, 바닥의 수직항력 N과 마찰력 f, 벽의 수직항력 N_w가 작용해요. 세로 평형에서 N = 196 N, 가로 평형에서 f = N_w예요. 미지의 힘 두 개(N, f)가 모이는 바닥을 회전축으로 잡으면 토크 식에 N_w만 남아서 N_w × 4.33 m = 196 N × 1.25 m, N_w ≈ 56.6 N이 돼요. 따라서 미끄러지지 않으려면 바닥의 마찰계수가 μ ≥ 56.6/196 ≈ 0.29여야 하고, 사다리를 더 눕힐수록 필요한 마찰이 커져요. 평형 상태에서는 토크를 어느 점에 대해 계산해도 0이라서, 미지수가 많이 지나는 점을 축으로 고르는 것이 요령이에요. 다리와 크레인, 선반 받침의 하중 계산, 물건을 들 때 허리 근육에 걸리는 힘(지렛대 팔이 짧아 몸무게보다 훨씬 큼)을 구할 때 써요.', 'For an object to stay put, neither sliding nor turning, both the net force and the net torque must be zero. Ladders, bridges and shelves are solved with these two conditions.', 'Static equilibrium requires ΣF = 0 (horizontally and vertically) and Στ = 0. A 5 m, 20 kg ladder leaning at 60° on a smooth wall feels its weight of 196 N, the floor’s normal force N and friction f, and the wall’s normal force N_w. Vertical balance gives N = 196 N and horizontal balance gives f = N_w. Taking the foot, where the two unknowns N and f act, as the pivot leaves only N_w in the torque equation: N_w × 4.33 m = 196 N × 1.25 m, so N_w ≈ 56.6 N. To avoid slipping the floor therefore needs μ ≥ 56.6/196 ≈ 0.29, and laying the ladder flatter demands more friction. In equilibrium the torque is zero about any point, so the trick is to pick a pivot through as many unknowns as possible. The same method sizes loads on bridges, cranes and shelf brackets, and the force in your back muscles when lifting, far larger than the load because their lever arm is short.', sEquil())],
  'ph-gravity': [item('ph-kepler', '케플러 법칙', 'Kepler’s laws', '행성은 태양을 한 초점으로 하는 타원 궤도를 돌고, 같은 시간에 같은 넓이를 쓸며, 공전 주기의 제곱은 긴반지름의 세제곱에 비례해요.', '제1법칙: 행성의 궤도는 타원이고 태양은 중심이 아니라 한 초점에 있어요. 제2법칙: 태양과 행성을 잇는 선분은 같은 시간에 같은 넓이를 쓸고 지나가요. 그래서 태양에 가까운 근일점에서는 빠르고, 먼 원일점에서는 느려요. 이는 중심력만 받을 때 각운동량이 보존되기 때문이에요. 제3법칙: 공전 주기 T의 제곱은 궤도 긴반지름 a의 세제곱에 비례해서, 년과 AU 단위로 지구 1.00, 화성 1.52 AU에 1.88년, 목성 5.20 AU에 11.86년이 모두 T²/a³ ≈ 1이에요. 뉴턴은 만유인력 F = GMm/r²로 세 법칙을 모두 유도했고, 제3법칙의 정확한 꼴은 T² = 4π²a³/(GM)이라 주기와 궤도 크기만 재면 중심 천체의 질량을 알 수 있어요. 인공위성 궤도와 우주 탐사선의 경로를 설계하고, 외계 행성과 블랙홀의 질량을 재는 데 지금도 쓰여요.', 'Planets move on ellipses with the Sun at one focus, sweep equal areas in equal times, and have periods whose squares are proportional to the cubes of their orbit sizes.', 'First law: orbits are ellipses with the Sun at one focus, not the center. Second law: the line from the Sun to a planet sweeps equal areas in equal times, so a planet moves fastest at perihelion and slowest at aphelion; this is angular momentum conservation under a central force. Third law: the square of the period T is proportional to the cube of the semi-major axis a, so in years and AU Earth (1.00), Mars (1.52 AU, 1.88 yr) and Jupiter (5.20 AU, 11.86 yr) all give T²/a³ ≈ 1. Newton derived all three from F = GMm/r², and the exact third law, T² = 4π²a³/(GM), lets a period and orbit size reveal the central body’s mass. The laws still plan satellite orbits and spacecraft trajectories and weigh exoplanets and black holes.', sKepler())],
  'ph-buoyancy': [item('ph-archimedes', '아르키메데스 원리', 'Archimedes’ principle', '유체 속 물체는 자신이 밀어낸 유체의 무게만큼 위로 떠받쳐져요. 뜨고 가라앉는 것은 물체의 평균 밀도가 유체보다 작은지 큰지로 정해져요.', '깊을수록 압력이 커서 잠긴 물체의 아랫면을 미는 힘이 윗면보다 커요. 그 차이를 모두 더하면 부력 F_B = ρ_유체 · V_잠김 · g, 곧 밀어낸 유체의 무게가 돼요. 물보다 가벼운 물체는 부력이 자기 무게와 같아질 때까지만 잠겨서 뜨고, 잠긴 비율은 ρ_물체/ρ_유체예요. 밀도 600 kg/m³인 나무는 60%, 917 kg/m³인 얼음은 약 92%가 물에 잠겨서 빙산은 대부분이 물속에 숨어 있어요. 밀도 7850 kg/m³인 강철 덩어리는 가라앉지만, 같은 강철을 속이 빈 배 모양으로 만들면 많은 물을 밀어내 평균 밀도가 물보다 작아져서 떠요. 잠수함은 물탱크에 물을 넣고 빼서 평균 밀도를 조절해 오르내리고, 열기구는 데운 가벼운 공기로 주변 공기 속에서 떠요. 바닷물(1025 kg/m³)이 민물보다 밀도가 커서 배는 바다에서 조금 덜 잠겨요.', 'A body in a fluid is pushed up by the weight of the fluid it displaces. Whether it floats or sinks depends on whether its average density is below or above the fluid’s.', 'Pressure rises with depth, so the fluid pushes harder on a submerged body’s bottom than on its top. Adding up that difference gives the buoyant force F_B = ρ_fluid · V_submerged · g, the weight of the displaced fluid. Something lighter than water sinks only until buoyancy equals its weight, then floats with the fraction ρ_object/ρ_fluid below the surface: about 60% for wood at 600 kg/m³ and about 92% for ice at 917 kg/m³, which is why most of an iceberg is hidden. A block of steel at 7850 kg/m³ sinks, but the same steel shaped into a hollow hull displaces enough water that its average density drops below water’s, and it floats. Submarines rise and dive by flooding and emptying ballast tanks, and hot-air balloons float on the cooler air they displace. Seawater (1025 kg/m³) is denser than fresh water, so ships sit a little higher at sea.', sBuoy())],
  'ph-bernoulli': [item('ph-bernenergy', '베르누이 정리와 에너지', 'Bernoulli’s principle as energy', '흐르는 유체에서 압력, 운동 에너지, 위치 에너지의 합(P + ½ρv² + ρgh)은 흐름을 따라 일정해요. 빨라지거나 높아지면 그만큼 압력이 낮아져요.', '베르누이 정리는 부피당 에너지 보존이에요. 압력 P는 부피당 압력 에너지, ½ρv²는 부피당 운동 에너지, ρgh는 부피당 위치 에너지이고, 점성이 없고 압축되지 않는 정상 흐름에서는 한 유선을 따라 이 합이 일정해요. 그래서 관이 좁아져 유속이 빨라지면(연속 방정식) 운동 에너지가 늘어난 만큼 압력이 낮아지고, 관이 높아지면 위치 에너지가 늘어난 만큼 압력이 낮아져요. 물통의 깊이 h에 뚫린 구멍에서는 위아래 압력이 모두 대기압이라 ρgh가 그대로 ½ρv²로 바뀌어 v = √(2gh)(토리첼리 정리)로 나와요. h = 0.8 m면 약 4.0 m/s로, 그 높이에서 자유낙하한 속력과 같아요. 벤투리 유량계와 분무기, 비행기의 속도를 재는 피토관이 이 원리를 써요. 다만 실제 관에서는 마찰로 에너지가 조금씩 손실되고, 비행기 날개의 양력은 베르누이만이 아니라 공기를 아래로 꺾어 보내는 효과까지 함께 봐야 정확해요.', 'Along a streamline, pressure plus kinetic plus potential energy per volume (P + ½ρv² + ρgh) stays constant, so speeding up or rising lowers the pressure by the same amount.', 'Bernoulli’s principle is energy conservation per unit volume: P is pressure energy, ½ρv² kinetic energy and ρgh potential energy per volume, and for steady, inviscid, incompressible flow their sum is constant along a streamline. Where a pipe narrows and the flow speeds up (continuity), pressure falls by the gain in kinetic energy; where it rises, pressure falls by the gain in potential energy. At a hole a depth h below the surface of a tank, both sides are at atmospheric pressure, so ρgh turns entirely into ½ρv² and v = √(2gh) (Torricelli’s law): about 4.0 m/s for h = 0.8 m, the same as free fall from that height. Venturi meters, sprayers and the Pitot tubes that measure airspeed use the principle. Real pipes lose a little energy to friction, and wing lift is only fully explained by also accounting for the air being turned downward.', sBern())],
  'ph-standing': [item('ph-harmonics', '현과 관의 배음', 'Harmonics on strings and pipes', '양 끝의 조건에 맞는 정상파만 남아서, 기본 진동수의 정수배인 배음들이 생겨요. 한쪽이 막힌 관은 홀수 배음만 나와요.', '양 끝이 고정된 줄은 끝이 반드시 마디라서 파장이 λₙ = 2L/n인 모드만 남고, 진동수는 fₙ = nv/2L로 기본 진동수의 정수배예요. L = 0.5 m, v = 200 m/s면 200, 400, 600, 800 Hz가 차례로 생기고, n번째 모드에는 마디가 n − 1개 더 있어요. 양 끝이 열린 관은 끝이 배(가장 크게 흔들리는 곳)가 되어 역시 fₙ = nv/2L로 모든 배음이 나와요. 한쪽이 막힌 관은 막힌 끝이 마디, 열린 끝이 배라서 관 길이가 1/4파장의 홀수 배여야 하고, fₙ = nv/4L에서 n이 홀수인 배음만 생겨요. 클라리넷이 같은 길이의 플루트보다 한 옥타브 낮고 독특한 소리를 내는 이유예요. 실제 소리는 이 배음들이 섞인 것이고, 섞인 비율이 음색을 정해서 같은 음 높이도 악기마다 다르게 들려요. 줄을 짧게 하거나(기타 프렛) 팽팽하게 해 파동 속력 v = √(T/μ)를 높이면 음이 올라가요.', 'Only standing waves that fit the end conditions survive, giving harmonics at whole-number multiples of the fundamental; a pipe closed at one end produces only the odd ones.', 'A string fixed at both ends must have nodes at the ends, so only wavelengths λₙ = 2L/n survive and the frequencies fₙ = nv/2L are whole-number multiples of the fundamental. With L = 0.5 m and v = 200 m/s these are 200, 400, 600 and 800 Hz, and mode n has n − 1 extra nodes. A pipe open at both ends has antinodes (maximum motion) at its ends and likewise every harmonic, fₙ = nv/2L. A pipe closed at one end has a node there and an antinode at the open end, so its length must be an odd number of quarter wavelengths: fₙ = nv/4L with n odd only. That is why a clarinet sounds an octave lower than a flute of the same length and has its distinctive tone. Real sounds mix these harmonics, and the mix sets the timbre, so the same pitch sounds different on each instrument. Shortening a string (guitar frets) or tightening it to raise the wave speed v = √(T/μ) raises the pitch.', sHarm())],
  'ph-gas': [item('ph-kinetic', '분자 운동론', 'Kinetic theory of gases', '기체의 압력은 분자들이 벽에 부딪히는 충격의 평균이고, 온도는 분자 평균 운동에너지의 척도예요. 분자 속력은 맥스웰 분포를 따라요.', '기체 분자는 제각각 날아다니며 벽에 부딪히고, 한 번 튕길 때마다 벽에 운동량 2mv를 넘겨줘요. 이 충격을 시간과 넓이로 평균 내면 압력 P = ⅓ρv²_rms가 되고, 이를 이상기체 법칙 PV = nRT와 맞추면 분자 하나의 평균 운동에너지가 K̄ = (3/2)kT로 온도에만 비례한다는 결론이 나와요. 그래서 제곱평균 속력은 v_rms = √(3RT/M)이고, 300 K의 질소(M = 0.028 kg/mol)는 약 517 m/s, 가벼운 수소는 그보다 훨씬 빨라서 지구 대기에서 조금씩 빠져나가요. 분자들의 속력은 하나의 값이 아니라 맥스웰-볼츠만 분포를 이루고, 온도가 오르면 봉우리가 빠른 쪽으로 옮겨 가며 넓게 퍼져요. 꼬리의 빠른 분자들이 증발과 화학 반응을 일으키기 때문에, 온도가 조금만 올라도 반응 속도가 크게 빨라져요. 단원자 기체의 내부에너지는 U = (3/2)nRT예요.', 'Gas pressure is the average push of molecules striking the walls, and temperature measures their average kinetic energy; molecular speeds follow the Maxwell distribution.', 'Gas molecules fly about and bounce off the walls, handing over momentum 2mv each time. Averaging these impacts over time and area gives the pressure P = ⅓ρv²_rms, and matching it with the ideal gas law PV = nRT shows that a molecule’s average kinetic energy, K̄ = (3/2)kT, depends only on temperature. The root-mean-square speed is therefore v_rms = √(3RT/M): about 517 m/s for nitrogen (M = 0.028 kg/mol) at 300 K, and much faster for light hydrogen, which slowly leaks out of Earth’s atmosphere. Molecular speeds are not one value but a Maxwell–Boltzmann distribution, whose peak shifts faster and spreads wider as temperature rises. The fast molecules in its tail drive evaporation and chemical reactions, which is why a small temperature rise speeds reactions up a lot. A monatomic gas has internal energy U = (3/2)nRT.', sKinetic())],
  'ph-carnot': [item('ph-entropy', '엔트로피와 열역학 제2법칙', 'Entropy and the second law', '엔트로피는 한 상태를 이루는 미시적 배치의 수를 재는 양이에요. 고립계의 엔트로피는 줄지 않아서, 자연스러운 변화에는 방향이 있어요.', '칸막이 한쪽에 모인 기체는 칸막이를 걷으면 퍼지지만, 저절로 다시 한쪽에 모이는 일은 일어나지 않아요. 분자 4개를 양쪽에 나누는 방법을 세면 4:0은 1가지, 2:2는 6가지라서 고르게 퍼진 상태가 가장 흔하고, 분자가 100개면 모두 한쪽에 있을 확률은 2⁻¹⁰⁰ ≈ 10⁻³⁰으로 사실상 0이에요. 볼츠만은 이 경우의 수 W로 엔트로피를 S = k ln W로 정의했어요. 열역학에서는 가역 과정에서 ΔS = Q/T이고, 열 100 J이 400 K에서 300 K로 흐르면 뜨거운 쪽은 −0.25 J/K, 차가운 쪽은 +0.33 J/K라 전체가 +0.08 J/K로 늘어요. 반대 방향이면 전체 엔트로피가 줄기 때문에 열은 저절로 차가운 곳에서 뜨거운 곳으로 가지 않아요(클라우지우스). 제2법칙은 고립계의 엔트로피가 줄지 않는다는 법칙이고, 열기관의 효율이 카르노 한계 1 − T_C/T_H를 넘지 못하는 이유이기도 해요. 정보 이론의 엔트로피 −Σ p log p도 같은 꼴이에요.', 'Entropy counts the microscopic arrangements behind a state. An isolated system’s entropy never decreases, which gives natural change its direction.', 'Gas gathered behind a partition spreads when the partition is lifted, but never gathers back on its own. Counting ways to split four molecules between two halves gives 1 way for 4:0 and 6 for 2:2, so the even spread is the most common state; with 100 molecules the chance of finding them all on one side is 2⁻¹⁰⁰ ≈ 10⁻³⁰, effectively zero. Boltzmann defined entropy from this count W as S = k ln W. In thermodynamics, ΔS = Q/T for reversible heat flow: when 100 J flows from 400 K to 300 K, the hot side changes by −0.25 J/K and the cold side by +0.33 J/K, a net increase of +0.08 J/K. The reverse flow would lower the total, so heat never flows by itself from cold to hot (Clausius). The second law says an isolated system’s entropy never decreases, which is also why no engine beats the Carnot efficiency 1 − T_C/T_H. Information entropy, −Σ p log p, has the same form.', sEntropy())],
  'ph-circuit': [item('ph-kirchhoff', '키르히호프 법칙', 'Kirchhoff’s laws', '접합점에서 들어온 전류와 나간 전류의 합은 같고(KCL), 닫힌 고리를 돌면 전압의 오르내림 합이 0이에요(KVL). 이 두 법칙으로 어떤 회로든 풀어요.', '키르히호프 전류 법칙(KCL)은 전하 보존이라서, 접합점으로 들어오는 전류의 합은 나가는 전류의 합과 같아요. 전압 법칙(KVL)은 에너지 보존이라서, 닫힌 고리를 한 바퀴 돌며 전지에서 오르고 저항에서 떨어지는 전압을 모두 더하면 0이에요. 12 V와 6 V 전지가 저항 2 Ω, 4 Ω, 4 Ω과 이어진 회로는 직렬·병렬만으로는 풀 수 없지만, 전류 방향을 가정하고 I₃ = I₁ + I₂, 12 − 2I₁ − 4I₃ = 0, 6 − 4I₂ − 4I₃ = 0을 세우면 I₁ = 2.25 A, I₃ = 1.875 A, I₂ = −0.375 A가 나와요. I₂가 음수인 것은 실제 전류가 가정과 반대 방향으로 흐른다는 뜻일 뿐이라, 방향은 아무렇게나 가정해도 돼요. 미지 전류의 수만큼 독립인 식을 세우면 되고, 이를 체계화한 것이 망 해석·마디 해석이며, SPICE 같은 회로 시뮬레이터의 기본이에요.', 'Currents into a junction equal currents out (KCL), and the voltage rises and drops around any closed loop sum to zero (KVL). Together they solve any circuit.', 'Kirchhoff’s current law (KCL) expresses charge conservation: the currents entering a junction sum to those leaving it. The voltage law (KVL) expresses energy conservation: going once around any closed loop, the rises across batteries and drops across resistors add to zero. A circuit with 12 V and 6 V batteries and resistors of 2 Ω, 4 Ω and 4 Ω cannot be reduced by series and parallel rules, but assuming current directions and writing I₃ = I₁ + I₂, 12 − 2I₁ − 4I₃ = 0 and 6 − 4I₂ − 4I₃ = 0 gives I₁ = 2.25 A, I₃ = 1.875 A and I₂ = −0.375 A. The negative I₂ simply means that current flows opposite to the guess, so any directions may be assumed. Writing as many independent equations as unknown currents always works; mesh and nodal analysis systematize it, and it underlies circuit simulators such as SPICE.', sKirch())],
  'ph-faraday': [item('ph-lenz', '렌츠 법칙', 'Lenz’s law', '유도 전류는 자신을 만든 자기 선속의 변화를 방해하는 방향으로 흘러요. 패러데이 법칙의 마이너스 부호가 바로 이 뜻이에요.', '자석의 N극이 고리에 다가가면 고리를 지나는 선속이 늘어나는데, 고리에는 그 증가를 막는 방향, 즉 자석 쪽 면이 N극이 되는 방향으로 전류가 흘러 다가오는 자석을 밀어내요. 자석이 멀어지면 선속이 줄어드니 전류가 반대로 흘러, 고리의 자석 쪽 면이 S극이 되어 자석을 붙잡아요. 패러데이 법칙 ε = −N dΦ/dt의 마이너스 부호가 이 방향을 나타내요. 만약 유도 전류가 변화를 돕는 방향이라면 자석을 살짝 밀기만 해도 끝없이 빨라져 에너지가 공짜로 생기므로, 렌츠 법칙은 에너지 보존의 결과예요. 강한 자석을 구리관 속에 떨어뜨리면 관에 맴돌이 전류(와전류)가 생겨 낙하를 거스르기 때문에 아주 천천히 떨어져요. 이 원리로 열차와 롤러코스터의 와전류 브레이크, 전기차의 회생 제동(바퀴의 운동 에너지를 전기로 되돌림), 인덕션 레인지가 동작해요.', 'An induced current always flows so as to oppose the change in magnetic flux that produced it; it is what the minus sign in Faraday’s law means.', 'As a magnet’s N pole approaches a loop, the flux through the loop rises, and the loop drives a current that fights the increase: the face toward the magnet becomes an N pole and pushes the magnet away. As the magnet leaves, the flux falls, the current reverses, and the facing side becomes an S pole that pulls the magnet back. The minus sign in Faraday’s law, ε = −N dΦ/dt, encodes this direction. If the induced current helped the change instead, a slight push would make the magnet speed up forever and create energy from nothing, so Lenz’s law follows from energy conservation. A strong magnet dropped through a copper pipe falls remarkably slowly, braked by eddy currents induced in the pipe. The same principle runs the eddy-current brakes on trains and roller coasters, regenerative braking in electric cars (turning wheel motion back into electricity) and induction cooktops.', sLenz())],
  'ph-snell': [item('ph-tir', '전반사와 광섬유', 'Total internal reflection and optical fibres', '굴절률이 큰 매질에서 작은 매질로 갈 때 입사각이 임계각보다 크면 빛이 하나도 빠져나가지 못하고 모두 반사돼요. 광섬유가 이 원리로 빛을 보내요.', '유리(n = 1.5)에서 공기로 나가는 빛은 법선에서 더 멀어지게 꺾여서, 입사각 30°는 굴절각 48.6°가 돼요. 입사각을 키우면 굴절각이 먼저 90°에 이르는데, 그때의 입사각이 임계각이에요. sin θc = n₂/n₁ = 1/1.5에서 θc ≈ 41.8°이고, 이 각도에서 굴절광은 경계면을 따라 스쳐 가요. 입사각이 이보다 크면 굴절광이 아예 없고 빛이 100% 반사되는 전반사가 일어나요. 굴절률이 작은 쪽에서 큰 쪽으로 갈 때는 일어나지 않아요. 광섬유는 굴절률이 약간 큰 코어를 작은 클래딩이 감싸고 있어서, 빛이 경계에서 계속 전반사되며 코어 안에 갇혀 수십 km를 거의 손실 없이 가요. 인터넷 해저 케이블과 의료용 내시경이 이를 쓰고, 다이아몬드(n = 2.42)는 임계각이 24.4°로 작아 안으로 들어온 빛이 여러 번 반사된 뒤 나오면서 반짝여요. 쌍안경의 프리즘도 거울 대신 전반사를 이용해요.', 'Going from a higher to a lower refractive index, light beyond the critical angle cannot escape and is reflected entirely. Optical fibres carry light this way.', 'Light leaving glass (n = 1.5) for air bends away from the normal, so a 30° angle of incidence becomes 48.6°. Increasing the angle, the refracted ray reaches 90° first; that angle of incidence is the critical angle, sin θc = n₂/n₁ = 1/1.5, θc ≈ 41.8°, where the refracted ray skims along the boundary. Beyond it there is no refracted ray at all and 100% of the light reflects: total internal reflection. It never happens going from lower to higher index. An optical fibre surrounds a slightly higher-index core with lower-index cladding, so light keeps reflecting totally at the boundary and travels tens of kilometres trapped in the core with little loss. Undersea internet cables and medical endoscopes rely on this; diamond (n = 2.42) has a small 24.4° critical angle, so light bounces inside several times before escaping, which makes it sparkle; and binocular prisms use total internal reflection instead of mirrors.', sTIR())],
  'ph-lens': [item('ph-mirror', '구면 거울', 'Spherical mirrors', '오목 거울은 빛을 초점으로 모아 실상이나 확대 허상을 만들고, 볼록 거울은 항상 작고 바로 선 허상을 만들어요. 렌즈와 같은 1/f = 1/d_o + 1/d_i를 따라요.', '구면 거울의 초점 거리는 곡률 반지름의 절반 f = R/2이고, 상의 위치와 배율은 렌즈와 같은 1/f = 1/d_o + 1/d_i, m = −d_i/d_o로 구해요. 오목 거울(f = 10 cm)에 물체를 30 cm에 두면 d_i = 15 cm에 크기 ½배의 거꾸로 선 실상이 생기고, 실상은 스크린에 맺을 수 있어요. 축에 나란한 광선은 반사 후 초점을 지나고, 초점을 지나는 광선은 반사 후 축에 나란해지며, 곡률 중심을 지나는 광선은 그대로 되돌아온다는 세 광선으로 작도해요. 물체를 초점 안쪽(5 cm)에 두면 반사광이 퍼져서 거울 뒤 10 cm에 2배 크기의 바로 선 허상이 보여요(화장 거울, d_i가 음수). 볼록 거울은 f < 0이라 물체가 어디 있든 작고 바로 선 허상을 만들고(f = −10 cm, d_o = 30 cm면 d_i = −7.5 cm, ¼배), 대신 넓은 범위를 보여 줘서 자동차 사이드미러와 매장의 감시 거울로 써요. 오목 거울은 반사 망원경과 헤드라이트 반사경, 태양열 집열기에 쓰여요.', 'Concave mirrors focus light to form real images or magnified virtual ones; convex mirrors always form small upright virtual images. Both follow the lens equation 1/f = 1/d_o + 1/d_i.', 'A spherical mirror’s focal length is half its radius of curvature, f = R/2, and image position and magnification follow the same 1/f = 1/d_o + 1/d_i and m = −d_i/d_o as lenses. With a concave mirror of f = 10 cm and an object at 30 cm, a real, inverted, half-size image forms at d_i = 15 cm and can be caught on a screen. Three rays build the diagram: one parallel to the axis reflects through the focus, one through the focus reflects parallel, and one through the center of curvature returns on itself. Inside the focus (5 cm) the reflected rays spread and an upright image twice the size appears 10 cm behind the mirror (a makeup mirror; d_i is negative). A convex mirror has f < 0 and always gives a small upright virtual image (f = −10 cm, d_o = 30 cm gives d_i = −7.5 cm, ¼ size) but a wide view, which is why it serves as a car side mirror and a shop security mirror. Concave mirrors appear in reflecting telescopes, headlight reflectors and solar collectors.', sMirror())],
  'ph-young': [item('ph-diffract', '회절', 'Diffraction', '파동이 틈이나 장애물 가장자리를 지나며 휘어 퍼지는 현상이에요. 틈이 파장에 가까울 만큼 좁을수록 넓게 퍼져요.', '파장보다 훨씬 넓은 틈을 지나는 파동은 거의 곧게 나아가지만, 틈이 파장 정도로 좁으면 틈 자체가 새로운 파원처럼 원형 파를 내보내 사방으로 퍼져요(하위헌스 원리). 단일 슬릿에서는 틈의 각 부분에서 나온 파동끼리 간섭해서, 가운데가 가장 밝고 a sin θ = mλ(m = ±1, ±2, …)인 방향에서 어두운 무늬가 생겨요. 가운데 밝은 무늬의 퍼짐 각은 약 λ/a라서, 틈 폭 a를 절반으로 줄이면 무늬가 두 배로 넓어져요. 원형 구멍에서는 첫 어두운 고리가 sin θ ≈ 1.22 λ/D에 생기고, 이것이 망원경과 카메라, 현미경이 구별할 수 있는 최소 각도(해상도 한계)를 정해요. 그래서 큰 렌즈와 반사경이 더 선명하고, 반도체 노광 장비는 더 짧은 파장(극자외선)을 써요. 소리는 파장이 길어 담 너머로도 들리고, CD 표면의 무지개와 X선 결정학으로 원자 배열을 알아내는 것도 회절이에요.', 'Waves bend and spread as they pass through gaps or around edges. The narrower the opening, the closer to the wavelength, the wider they spread.', 'Waves through a gap much wider than their wavelength travel almost straight, but a slit about a wavelength wide acts like a new source and sends out circular waves in all directions (Huygens’ principle). In a single slit, waves from different parts of the opening interfere: brightest in the middle, with dark fringes where a sin θ = mλ (m = ±1, ±2, …). The central maximum spreads over an angle of about λ/a, so halving the slit width a doubles the pattern’s width. A circular aperture has its first dark ring at sin θ ≈ 1.22 λ/D, which sets the smallest angle telescopes, cameras and microscopes can resolve. That is why larger lenses and mirrors see more sharply and why chipmaking lithography moves to shorter (extreme ultraviolet) wavelengths. Sound, with its long wavelength, carries around walls, and the rainbow on a CD and X-ray crystallography’s maps of atoms are diffraction too.', sDiffract())],
  'ph-bohr': [item('ph-debroglie', '물질파 (드브로이 파장)', 'Matter waves (de Broglie)', '운동량을 가진 모든 입자는 파장 λ = h/p인 파동의 성질도 가져요. 전자처럼 가볍고 느린 입자는 파장이 원자 크기만큼 길어서 회절해요.', '드브로이는 빛이 입자처럼 행동하듯 물질도 파동처럼 행동한다고 보고, 운동량 p인 입자의 파장을 λ = h/p로 제안했어요(h = 6.63 × 10⁻³⁴ J·s). 100 V로 가속한 전자는 λ ≈ 0.123 nm로 결정 속 원자 간격과 비슷해서, 결정에 쏘면 X선처럼 회절 무늬가 생겨요(1927년 데이비슨-거머 실험으로 확인). 반면 40 m/s로 나는 야구공은 λ ≈ 1.1 × 10⁻³⁴ m로 너무 짧아 파동성이 전혀 드러나지 않아요. 보어 모형의 궤도 조건도 이 관점에서 설명돼요: 전자의 파동이 궤도 둘레에 정수 개로 딱 맞아야(2πr = nλ) 스스로 상쇄되지 않는 정상파가 되므로, 허용되는 궤도와 에너지가 띄엄띄엄해져요. 전자 현미경은 전자의 짧은 파장 덕분에 가시광선 현미경보다 수천 배 작은 구조를 볼 수 있어요. 이 생각은 곧바로 슈뢰딩거 방정식과 양자역학으로 이어졌어요.', 'Every particle with momentum also behaves as a wave of wavelength λ = h/p. Light, slow particles such as electrons have wavelengths about the size of atoms, so they diffract.', 'De Broglie proposed that, just as light behaves like particles, matter behaves like waves, giving a particle of momentum p the wavelength λ = h/p (h = 6.63 × 10⁻³⁴ J·s). An electron accelerated through 100 V has λ ≈ 0.123 nm, close to the spacing of atoms in a crystal, so a crystal diffracts electrons as it does X-rays (confirmed by Davisson and Germer in 1927). A baseball at 40 m/s has λ ≈ 1.1 × 10⁻³⁴ m, far too short for any wave behaviour to show. The Bohr model’s orbit condition follows too: an electron’s wave must fit a whole number of times around its orbit (2πr = nλ) to form a standing wave that does not cancel itself, so only certain orbits and energies are allowed. Thanks to their short wavelength, electron microscopes resolve structures thousands of times smaller than light microscopes can. The idea led directly to the Schrödinger equation and quantum mechanics.', sDeBroglie())]
} };
})();

window.UX = page([
  sec('ph-mo', '운동과 힘', 'Motion & forces', '운동과 힘', 'Motion and forces',
    '위치·속도·가속도로 운동을 기술하고, 뉴턴 법칙으로 그 원인을 설명해요.', 'Describe motion with position, velocity and acceleration, and explain it with Newton’s laws.', [
    item('ph-kin1d', '등가속도 직선 운동', 'Uniform acceleration', '가속도가 일정하면 속도는 시간에 비례해 늘고, 위치는 시간의 제곱으로 변해요. v-t 그래프의 기울기는 가속도, 넓이는 변위예요.', 'v = v₀ + at, x = v₀t + ½at², v² = v₀² + 2ax. 예: 정지에서 a = 2 m/s² → 4초 뒤 v = 8 m/s, x = 16 m. 자유낙하는 a = g = 9.8 m/s²: 2초 동안 19.6 m 낙하. 평균속도 = (v₀ + v)/2.', 'With constant acceleration, velocity grows linearly and position quadratically. The slope of v-t is acceleration; the area is displacement.', 'v = v₀ + at, x = v₀t + ½at², v² = v₀² + 2ax. From rest at 2 m/s²: after 4 s, v = 8 m/s and x = 16 m. Free fall uses a = g = 9.8 m/s²: 19.6 m in 2 s. Average velocity = (v₀ + v)/2.', sKin1d()),
    item('ph-proj', '포물체 운동', 'Projectile motion', '수평 방향은 등속, 연직 방향은 등가속(−g) 운동으로 나눠 따로 풀어요. 두 운동을 합치면 포물선이 돼요.', 'T = 2v₀sinθ/g, H = v₀²sin²θ/2g, R = v₀²sin2θ/g. 예: v₀ = 20 m/s, 45° → T = 2.9 s, H = 10.2 m, R = 40.8 m. 사거리는 45°에서 최대, θ와 90° − θ는 사거리가 같아요. 수평으로 던지면 낙하 시간은 높이로만 정해져요.', 'Treat horizontal motion as constant velocity and vertical motion as constant acceleration −g; together they trace a parabola.', 'T = 2v₀sinθ/g, H = v₀²sin²θ/2g, R = v₀²sin2θ/g. At 20 m/s and 45°: T = 2.9 s, H = 10.2 m, R = 40.8 m. Range peaks at 45°, and θ and 90° − θ land together. A horizontal launch falls for a time set only by height.', sProj()),
    item('ph-circ', '등속 원운동', 'Uniform circular motion', '속력이 일정해도 방향이 계속 바뀌므로 중심을 향하는 가속도(구심가속도)가 있어요. 이를 만드는 알짜힘이 구심력이에요.', 'a = v²/r = ω²r, F = mv²/r, v = rω, T = 2πr/v. 예: r = 2 m, v = 4 m/s, m = 0.5 kg → a = 8 m/s², F = 4 N. 연직 원운동 꼭대기에서 줄이 느슨해지지 않으려면 v ≥ √(gr).', 'Even at constant speed the direction changes, so there is a centripetal acceleration toward the center, produced by a net centripetal force.', 'a = v²/r = ω²r, F = mv²/r, v = rω, T = 2πr/v. With r = 2 m, v = 4 m/s, m = 0.5 kg: a = 8 m/s², F = 4 N. In a vertical loop the string stays taut at the top only if v ≥ √(gr).', sCirc()),
    item('ph-newton', '뉴턴의 운동 법칙', 'Newton’s laws', '관성(제1법칙), ΣF = ma(제2법칙), 작용·반작용(제3법칙). 자유물체도를 그리고 축 방향으로 힘을 나눠 식을 세워요.', '경사면(마찰 없음): a = g sinθ, N = mg cosθ. 예: 30°, 2 kg → a = 4.9 m/s². 도르래로 연결된 물체는 한 계로 보고 (m₁ + m₂)a = 알짜힘. 엘리베이터 위 겉보기 무게 N = m(g + a).', 'Inertia (first law), ΣF = ma (second) and action–reaction (third). Draw a free-body diagram and resolve forces along axes.', 'Frictionless incline: a = g sinθ, N = mg cosθ; at 30° that is 4.9 m/s² for any mass. Blocks joined over a pulley: treat as one system, (m₁ + m₂)a = net force. Apparent weight in an elevator: N = m(g + a).', sNewton()),
    item('ph-friction', '마찰력', 'Friction', '정지마찰력은 미는 힘만큼 버티다 최대 μₛN에서 미끄러지기 시작하고, 운동마찰력은 μₖN으로 일정해요.', 'fₛ ≤ μₛN, fₖ = μₖN, 보통 μₖ < μₛ. 예: 10 kg, μₛ = 0.5, μₖ = 0.3 → 49 N까지 정지, 움직이면 29.4 N. 경사면에서 미끄러지기 시작하는 각: tanθ = μₛ. 마찰력은 접촉 면적과 거의 무관해요.', 'Static friction matches the applied force up to μₛN; once sliding, kinetic friction is a constant μₖN.', 'fₛ ≤ μₛN, fₖ = μₖN, usually μₖ < μₛ. For 10 kg with μₛ = 0.5, μₖ = 0.3: it holds to 49 N, then slides against 29.4 N. On a slope it starts slipping when tanθ = μₛ. Friction barely depends on contact area.', sFriction())
  ].concat(XT.add['ph-mo'] || [])),
  sec('ph-en', '에너지·운동량', 'Energy & momentum', '에너지와 운동량', 'Energy and momentum',
    '힘을 시간·거리로 쌓으면 보존되는 양이 나와요.', 'Accumulate force over distance or time and conserved quantities appear.', [
    item('ph-work', '일과 운동에너지', 'Work and kinetic energy', '힘이 한 일 W = Fd cosθ예요. 알짜힘이 한 일은 운동에너지 변화와 같아요 (일-운동에너지 정리).', 'W = F·d = Fd cosθ, K = ½mv², W_net = ΔK. 예: 10 N을 60°로 5 m → W = 25 J, 2 kg 정지 물체면 v = 5 m/s. 일률 P = W/t = Fv. 용수철이 한 일 ½kx², 수직항력·구심력은 일을 하지 않아요.', 'Work is W = Fd cosθ, and the net work equals the change in kinetic energy (work–energy theorem).', 'W = F·d = Fd cosθ, K = ½mv², W_net = ΔK. 10 N at 60° over 5 m does 25 J; a 2 kg block from rest reaches 5 m/s. Power P = W/t = Fv. A spring stores ½kx²; normal and centripetal forces do no work.', sWork()),
    item('ph-energy', '역학적 에너지 보존', 'Conservation of mechanical energy', '보존력(중력, 탄성력)만 일하면 운동에너지와 퍼텐셜에너지의 합이 일정해요.', 'K + U = 일정, U = mgh, 탄성 U = ½kx². 예: 5 m에서 놓으면 바닥 속력 √(2gh) = 9.9 m/s(질량 무관). 마찰이 있으면 W_마찰 = ΔE(열로 손실). 진자, 롤러코스터, 용수철 문제에 그대로 써요.', 'If only conservative forces (gravity, springs) do work, kinetic plus potential energy stays constant.', 'K + U = constant with U = mgh or ½kx². Dropped from 5 m the speed at the bottom is √(2gh) = 9.9 m/s, regardless of mass. Friction removes energy as heat: W_friction = ΔE. Works for pendulums, roller coasters and springs.', sEnergy()),
    item('ph-impulse', '운동량과 충격량', 'Momentum and impulse', '운동량 p = mv. 힘을 시간에 대해 쌓은 충격량 J = FΔt가 운동량 변화와 같아요.', 'J = ∫F dt = Δp = m(v′ − v). 예: 0.5 kg 공이 10 m/s → −8 m/s로 튕기면 Δp = −9 N·s, 0.01초면 평균 힘 900 N. 같은 충격량이면 시간이 길수록 힘이 작아요(에어백, 무릎 굽혀 착지).', 'Momentum p = mv; impulse J = FΔt, force accumulated over time, equals the change in momentum.', 'J = ∫F dt = Δp = m(v′ − v). A 0.5 kg ball going from 10 m/s to −8 m/s has Δp = −9 N·s; over 0.01 s that is 900 N on average. The same impulse over a longer time means a smaller force: airbags, bending your knees.', sImpulse()),
    item('ph-collision', '충돌과 운동량 보존', 'Collisions and momentum conservation', '외력이 없으면 충돌 전후 운동량의 합이 보존돼요. 운동에너지까지 보존되면 탄성 충돌이에요.', 'm₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′. 예: 2 kg(3 m/s)가 정지한 1 kg와 탄성 충돌 → 1 m/s, 4 m/s · 붙으면 함께 2 m/s(3 J 손실). 반발계수 e = −(v₁′ − v₂′)/(v₁ − v₂): 탄성 1, 완전 비탄성 0. 질량중심 속도는 변하지 않아요.', 'With no external force, total momentum is the same before and after; if kinetic energy is also conserved the collision is elastic.', 'm₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′. A 2 kg cart at 3 m/s hitting 1 kg at rest: elastic gives 1 and 4 m/s; sticking gives 2 m/s together and loses 3 J. Coefficient of restitution e = −(v₁′ − v₂′)/(v₁ − v₂): 1 elastic, 0 perfectly inelastic. The center-of-mass velocity never changes.', sCollision())
  ].concat(XT.add['ph-en'] || [])),
  sec('ph-ro', '회전', 'Rotation', '회전 운동', 'Rotational motion',
    '직선 운동의 짝을 회전에서 찾아요: 토크, 관성 모멘트, 각운동량.', 'Rotational partners of linear motion: torque, moment of inertia, angular momentum.', [
    item('ph-inertia', '관성 모멘트와 τ = Iα', 'Moment of inertia and τ = Iα', '회전시키기 어려운 정도가 관성 모멘트 I = Σmr²예요. 질량이 회전축에서 멀수록 커요. τ = Iα가 회전의 뉴턴 제2법칙이에요.', '고리 MR², 원판·원기둥 ½MR², 구 ⅖MR², 막대(중심) ML²/12, 막대(끝) ML²/3. 평행축 정리 I = I_cm + Md². 회전 운동학: ω = ω₀ + αt, θ = ω₀t + ½αt², v = rω, a_t = rα. 회전 운동에너지 ½Iω².', 'The moment of inertia I = Σmr² measures resistance to spinning; mass far from the axis counts more. τ = Iα is Newton’s second law for rotation.', 'Hoop MR², disk ½MR², sphere ⅖MR², rod about center ML²/12, about an end ML²/3. Parallel-axis theorem I = I_cm + Md². Kinematics: ω = ω₀ + αt, θ = ω₀t + ½αt², v = rω, a_t = rα. Rotational energy ½Iω².', sInertia()),
    item('ph-torque', '토크와 정적 평형', 'Torque and static equilibrium', '토크 τ = rF sinθ는 회전시키는 능력이에요. 받침점에서 멀리, 수직으로 밀수록 커요. 정지해 있으려면 ΣF = 0, Στ = 0.', '예: 3 kg가 2 m, 2 kg가 3 m에 있으면 6g = 6g로 평형 · 4 m로 옮기면 8g > 6g로 기울어요. 문제 풀이: 미지의 힘이 모인 점을 회전축으로 잡으면 식이 줄어요. 사다리, 들보, 지레 문제의 기본이에요.', 'Torque τ = rF sinθ measures turning effect: farther from the pivot and more perpendicular means more. Static equilibrium needs ΣF = 0 and Στ = 0.', '3 kg at 2 m balances 2 kg at 3 m (6g = 6g); move the 2 kg to 4 m and 8g > 6g tips it. Take torques about the point where unknown forces meet to eliminate them. The basis of ladder, beam and lever problems.', sTorque()),
    item('ph-angmom', '각운동량 보존', 'Conservation of angular momentum', '각운동량 L = Iω(점입자는 r × p)이에요. 외부 토크가 없으면 L이 보존돼요.', 'τ = dL/dt. I₁ω₁ = I₂ω₂. 예: I = 4 → 1.6 kg·m²로 줄면 ω = 2 → 5 rad/s, 운동에너지는 8 J → 20 J(팔을 당기는 일). 행성은 태양 쪽에서 빨라지고(케플러 제2법칙), 회전하는 의자 실험도 같은 원리예요.', 'Angular momentum L = Iω (r × p for a particle) is conserved when there is no external torque.', 'τ = dL/dt and I₁ω₁ = I₂ω₂. Shrinking I from 4 to 1.6 kg·m² raises ω from 2 to 5 rad/s, and kinetic energy rises from 8 J to 20 J from the work of pulling in. Planets speed up near the Sun (Kepler’s second law) for the same reason.', sAngmom()),
    item('ph-rolling', '굴러가는 운동', 'Rolling motion', '미끄러지지 않고 구르면 v = Rω이고, 운동에너지가 병진 ½Mv²와 회전 ½Iω²로 나뉘어요.', 'I = cMR²이면 a = g sinθ/(1 + c), v = √(2gh/(1 + c)). 높이 1 m: 구(c = ⅖) 3.74, 원판(½) 3.61, 고리(1) 3.13, 미끄럼 4.43 m/s. 질량과 반지름이 아니라 모양(c)이 순위를 정해요. 구르게 하는 정지마찰력은 일을 하지 않아요.', 'Rolling without slipping means v = Rω, and kinetic energy splits into translation ½Mv² and rotation ½Iω².', 'With I = cMR²: a = g sinθ/(1 + c), v = √(2gh/(1 + c)). From 1 m: sphere (c = ⅖) 3.74, disk (½) 3.61, hoop (1) 3.13, sliding block 4.43 m/s. Shape, not mass or radius, sets the order. The static friction that makes it roll does no work.', sRolling())
  ].concat(XT.add['ph-ro'] || [])),
  sec('ph-os', '진동·중력·유체', 'Oscillation, gravity, fluids', '진동, 중력, 유체', 'Oscillations, gravity and fluids',
    '되돌아오는 운동, 행성의 운동, 흐르는 물질의 법칙이에요.', 'Back-and-forth motion, planetary motion and the laws of flowing matter.', [
    item('ph-shm', '단순 조화 운동', 'Simple harmonic motion', '복원력 F = −kx를 받으면 x = A cos(ωt + φ)로 진동해요. 주기는 진폭과 무관해요.', 'ω = √(k/m), T = 2π√(m/k), v_max = Aω, a_max = Aω², E = ½kA² = ½mv² + ½kx². 예: k = 200 N/m, m = 2 kg → ω = 10 rad/s, T = 0.63 s. 평형점에서 속력 최대, 양 끝에서 가속도 최대.', 'A restoring force F = −kx gives oscillation x = A cos(ωt + φ); the period does not depend on amplitude.', 'ω = √(k/m), T = 2π√(m/k), v_max = Aω, a_max = Aω², E = ½kA² = ½mv² + ½kx². With k = 200 N/m and m = 2 kg: ω = 10 rad/s, T = 0.63 s. Speed peaks at the center; acceleration peaks at the ends.', sShm()),
    item('ph-pendulum', '단진자', 'Simple pendulum', '작은 각에서 복원력 −mg sinθ ≈ −mgθ라서 단순 조화 운동을 해요. 주기는 길이와 g로만 정해져요.', 'T = 2π√(L/g). 예: L = 1 m → 2.0 s, 0.25 m → 1.0 s. 질량과 진폭(작은 각)에 무관. 물리 진자 T = 2π√(I/mgd). 주기를 재면 g를 측정할 수 있어요. 달에서는 g가 1/6이라 주기가 √6배.', 'At small angles the restoring force −mg sinθ ≈ −mgθ makes simple harmonic motion, with a period set only by length and g.', 'T = 2π√(L/g): 1 m gives 2.0 s, 0.25 m gives 1.0 s, independent of mass and (small) amplitude. A physical pendulum has T = 2π√(I/mgd). Timing a pendulum measures g; on the Moon the period is √6 times longer.', sPendulum()),
    item('ph-gravity', '만유인력과 궤도 운동', 'Universal gravitation and orbits', '두 질량은 F = GMm/r²로 끌어당겨요. 위성은 만유인력이 구심력 역할을 해서 원궤도를 돌아요.', 'v = √(GM/r), T² = (4π²/GM)r³(케플러 제3법칙), g = GM/R² = 9.8 m/s², 탈출 속도 √(2GM/R) = 11.2 km/s, U = −GMm/r, 궤도 에너지 E = −GMm/2r. 정지궤도 위성은 r ≈ 42,000 km. 케플러 제2법칙 = 각운동량 보존.', 'Two masses attract with F = GMm/r²; for a satellite, gravity is the centripetal force of its orbit.', 'v = √(GM/r), T² = (4π²/GM)r³ (Kepler’s third law), g = GM/R² = 9.8 m/s², escape speed √(2GM/R) = 11.2 km/s, U = −GMm/r, orbital energy E = −GMm/2r. Geostationary orbits sit at r ≈ 42,000 km. Kepler’s second law is angular momentum conservation.', sGravity()),
    item('ph-buoyancy', '압력과 부력', 'Pressure and buoyancy', '유체 압력은 깊이에 따라 p = p₀ + ρgh로 커져요. 그 차이 때문에 잠긴 물체는 밀어낸 유체의 무게만큼 부력을 받아요.', 'F_B = ρ_유체 V_잠김 g. 예: 2 L 블록 → 19.6 N, 1.5 kg(14.7 N)이라 떠서 75%만 잠겨요(잠긴 비율 = ρ물체/ρ유체). 파스칼 원리: 가한 압력은 모든 곳에 그대로 전달 → 유압기 F₁/A₁ = F₂/A₂. 1 atm ≈ 물 10 m.', 'Fluid pressure grows with depth, p = p₀ + ρgh; that difference pushes up on a submerged object with the weight of the displaced fluid.', 'F_B = ρ_fluid V_sub g. A 2 L block feels 19.6 N; at 1.5 kg (14.7 N) it floats 75% submerged (fraction = ρ_object/ρ_fluid). Pascal’s principle transmits pressure everywhere: hydraulics F₁/A₁ = F₂/A₂. 1 atm ≈ 10 m of water.', sBuoyancy()),
    item('ph-bernoulli', '연속 방정식과 베르누이 정리', 'Continuity and Bernoulli', '비압축성 유체는 Av가 일정해서 좁은 곳에서 빨라져요. 흐름을 따라 P + ½ρv² + ρgh가 일정해 빠른 곳의 압력이 낮아요.', '예: 단면적 ½ → 속력 2배, v = 2 → 4 m/s면 압력 차 ½ρ(v₂² − v₁²) = 6000 Pa. 토리첼리: 구멍에서 나오는 속력 √(2gh). 벤투리 관으로 유속 측정, 비행기 날개·분무기의 원리.', 'For an incompressible fluid Av is constant, so it speeds up where the pipe narrows; along a streamline P + ½ρv² + ρgh is constant, so faster flow has lower pressure.', 'Half the area doubles the speed; going from 2 to 4 m/s drops the pressure by ½ρ(v₂² − v₁²) = 6000 Pa. Torricelli: water leaves a hole at √(2gh). Venturi meters, wings and atomizers all use it.', sBernoulli())
  ].concat(XT.add['ph-os'] || [])),
  sec('ph-wv', '파동', 'Waves', '파동과 소리', 'Waves and sound',
    '에너지를 실어 나르는 진동의 전파예요.', 'Traveling oscillations that carry energy.', [
    item('ph-wave', '진행파', 'Traveling waves', '매질은 제자리에서 진동하고 모양과 에너지만 이동해요. y = A sin(kx − ωt)로 쓰고 v = fλ예요.', 'k = 2π/λ, ω = 2πf = 2π/T, v = λ/T = fλ. 줄의 파동 속력 v = √(T/μ)(장력/선밀도). 예: 소리 v = 340 m/s, f = 170 Hz → λ = 2 m. 횡파(줄, 빛)와 종파(소리). 파동의 세기 ∝ 진폭².', 'The medium oscillates in place while shape and energy travel: y = A sin(kx − ωt) with v = fλ.', 'k = 2π/λ, ω = 2πf = 2π/T, v = λ/T = fλ. On a string v = √(T/μ) (tension over linear density). Sound at 340 m/s and 170 Hz has λ = 2 m. Transverse (strings, light) vs longitudinal (sound). Intensity ∝ amplitude².', sWave()),
    item('ph-standing', '중첩과 정상파', 'Superposition and standing waves', '반대로 진행하는 두 파동이 겹치면 제자리에서 진동하는 정상파가 돼요. 마디는 항상 멈춰 있어요.', '양 끝 고정 줄: λₙ = 2L/n, fₙ = nv/2L (n = 1, 2, 3…). 예: L = 0.5 m, v = 200 m/s → 200, 400, 600 Hz. 한쪽 열린 관: fₙ = nv/4L (n 홀수). 맥놀이 진동수 = |f₁ − f₂|. 마디 간격 λ/2.', 'Two waves traveling opposite ways add up to a standing wave that oscillates in place; nodes never move.', 'String fixed at both ends: λₙ = 2L/n, fₙ = nv/2L (n = 1, 2, 3…); L = 0.5 m and v = 200 m/s give 200, 400, 600 Hz. A pipe closed at one end has fₙ = nv/4L for odd n. Beat frequency = |f₁ − f₂|. Nodes are λ/2 apart.', sStanding()),
    item('ph-doppler', '도플러 효과', 'Doppler effect', '음원이나 관측자가 움직이면 듣는 진동수가 달라져요. 다가오면 높게, 멀어지면 낮게 들려요.', 'f′ = f(v ± v₀)/(v ∓ vₛ) (가까워지는 쪽이 위 부호). 예: f = 500 Hz, vₛ = 34 m/s → 앞 556 Hz, 뒤 455 Hz. 음원이 소리보다 빠르면 충격파(소닉 붐). 빛은 적색편이(멀어짐)로 우주 팽창을 측정해요.', 'Motion of the source or observer changes the heard frequency: higher when approaching, lower when receding.', 'f′ = f(v ± v₀)/(v ∓ vₛ), upper signs for approach. f = 500 Hz with vₛ = 34 m/s gives 556 Hz ahead and 455 Hz behind. A source faster than sound makes a shock wave (sonic boom). For light, redshift reveals cosmic expansion.', sDoppler())
  ].concat(XT.add['ph-wv'] || [])),
  sec('ph-th', '열역학', 'Thermodynamics', '열과 열역학', 'Heat and thermodynamics',
    '분자의 운동과 에너지 보존, 그리고 열이 일로 바뀌는 한계예요.', 'Molecular motion, energy conservation, and the limits on turning heat into work.', [
    item('ph-gas', '이상기체와 분자 운동론', 'Ideal gases and kinetic theory', 'PV = nRT. 압력은 분자들이 벽에 부딪히는 충격이고, 온도는 분자 평균 운동에너지의 척도예요.', 'K̄ = (3/2)kT, v_rms = √(3RT/M), 내부에너지(단원자) U = (3/2)nRT. 예: N₂(M = 0.028 kg/mol), 300 K → v_rms ≈ 517 m/s. 보일(T 일정) PV 일정, 샤를(P 일정) V ∝ T. R = 8.31 J/mol·K. 비열·잠열: Q = mcΔT, Q = mL.', 'PV = nRT. Pressure is molecules striking the walls; temperature measures their average kinetic energy.', 'K̄ = (3/2)kT, v_rms = √(3RT/M), monatomic U = (3/2)nRT. N₂ (M = 0.028 kg/mol) at 300 K has v_rms ≈ 517 m/s. Boyle (constant T): PV constant; Charles (constant P): V ∝ T. R = 8.31 J/mol·K. Heating: Q = mcΔT; phase change: Q = mL.', sGas()),
    item('ph-firstlaw', '열역학 제1법칙', 'First law of thermodynamics', 'ΔU = Q − W(받은 열 − 기체가 한 일). 기체가 한 일은 P-V 그래프 아래 넓이예요.', '등압 W = PΔV(예: 2×10⁵ Pa, 1 → 3 L → 400 J) · 등적 W = 0 · 등온 ΔU = 0, W = nRT ln(V₂/V₁) · 단열 Q = 0, PV^γ 일정(γ = Cp/Cv, 단원자 5/3). 몰비열 Cp − Cv = R. 순환 과정은 ΔU = 0, 한 일 = 닫힌 곡선 넓이.', 'ΔU = Q − W: heat added minus work done by the gas, where work is the area under the P-V curve.', 'Isobaric W = PΔV (2×10⁵ Pa from 1 to 3 L is 400 J); isochoric W = 0; isothermal ΔU = 0, W = nRT ln(V₂/V₁); adiabatic Q = 0, PV^γ constant (γ = Cp/Cv, 5/3 monatomic). Cp − Cv = R. A cycle has ΔU = 0 and net work = enclosed area.', sFirstLaw()),
    item('ph-carnot', '열기관, 카르노 순환, 엔트로피', 'Heat engines, Carnot and entropy', '열기관은 고온에서 열을 받아 일부를 일로 바꾸고 나머지를 저온에 버려요. 효율의 상한은 두 온도로 정해져요.', 'e = W/Q_H = 1 − Q_C/Q_H ≤ 1 − T_C/T_H(카르노). 예: 600 K, 300 K → 최대 50%. 냉동기 성능계수 K = Q_C/W. 엔트로피 ΔS = Q/T(가역), 고립계의 엔트로피는 감소하지 않아요(제2법칙). 가역 카르노: Q_H/T_H = Q_C/T_C.', 'An engine takes heat from a hot reservoir, turns part into work and dumps the rest; the two temperatures cap its efficiency.', 'e = W/Q_H = 1 − Q_C/Q_H ≤ 1 − T_C/T_H (Carnot); 600 K and 300 K allow at most 50%. A refrigerator’s coefficient K = Q_C/W. Entropy ΔS = Q/T for reversible heat; an isolated system’s entropy never decreases (second law). For a Carnot cycle Q_H/T_H = Q_C/T_C.', sCarnot())
  ].concat(XT.add['ph-th'] || [])),
  sec('ph-el', '전기', 'Electricity', '전기장과 회로', 'Electric fields and circuits',
    '전하 사이의 힘에서 시작해 전기장, 전위, 축전기, 회로까지예요.', 'From forces between charges to fields, potential, capacitors and circuits.', [
    item('ph-coulomb', '쿨롱 법칙', 'Coulomb’s law', '두 점전하 사이의 힘 F = kq₁q₂/r²예요. 같은 부호는 밀고 다른 부호는 당기며, 거리의 제곱에 반비례해요.', 'k = 1/4πε₀ = 9.0×10⁹ N·m²/C². 예: 1 μC 두 개가 0.1 m → 0.9 N. 거리 2배 → ¼. 여러 전하는 힘을 벡터로 더해요(중첩). 전하는 보존되고 기본 전하 e = 1.6×10⁻¹⁹ C의 정수배.', 'The force between point charges is F = kq₁q₂/r²: like signs repel, unlike attract, falling off with the square of distance.', 'k = 1/4πε₀ = 9.0×10⁹ N·m²/C². Two 1 μC charges 0.1 m apart: 0.9 N. Double the distance, a quarter of the force. Add forces from several charges as vectors. Charge is conserved and quantized in e = 1.6×10⁻¹⁹ C.', sCoulomb()),
    item('ph-efield', '전기장과 전기력선', 'Electric field and field lines', '전기장 E = F/q는 단위 양전하가 받는 힘이에요. 전기력선은 +에서 나와 −로 들어가고, 촘촘할수록 장이 세요.', '점전하 E = kq/r², 쌍극자 전기장은 중첩으로 계산. 전하 q가 받는 힘 F = qE, 균일한 장에서 전자의 가속도 a = eE/m. 전기력선은 서로 교차하지 않고 도체 표면에 수직이에요.', 'The field E = F/q is the force per unit positive charge; lines leave + and end on −, crowding where the field is strong.', 'Point charge E = kq/r²; a dipole’s field follows by superposition. A charge feels F = qE, so an electron in a uniform field accelerates at eE/m. Lines never cross and meet conductors at right angles.', sEfield()),
    item('ph-gauss', '가우스 법칙', 'Gauss’s law', '닫힌 면을 지나는 전기 선속은 그 안의 전하에만 비례해요: Φ = q_enc/ε₀. 대칭이 있으면 전기장을 바로 구할 수 있어요.', '구 대칭 E = kq/r², 무한 직선 E = λ/2πε₀r, 무한 평면 E = σ/2ε₀, 평행판 사이 σ/ε₀. 도체 내부 E = 0이고 전하는 표면에 모여요. 밖의 전하는 선속에 기여하지 않아요.', 'The electric flux through a closed surface depends only on the enclosed charge: Φ = q_enc/ε₀. With symmetry it gives E immediately.', 'Spherical E = kq/r², infinite line E = λ/2πε₀r, infinite plane E = σ/2ε₀, between parallel plates σ/ε₀. Inside a conductor E = 0 and charge sits on the surface. Charges outside contribute no net flux.', sGaussLaw()),
    item('ph-potential', '전위와 등전위면', 'Electric potential', '전위 V는 단위 전하당 전기 퍼텐셜 에너지예요. 전하를 옮기는 일 W = qΔV이고, 전기장은 전위가 낮아지는 쪽을 가리켜요.', '점전하 V = kq/r(스칼라라 그냥 더해요), E = −dV/dr, 균일한 장 ΔV = Ed. 예: 1 μC를 45 V → 90 V로 옮기면 45 μJ. 1 eV = 1.6×10⁻¹⁹ J. 등전위면을 따라 움직이면 일 0, 전기력선은 등전위면에 수직.', 'Potential V is electric potential energy per unit charge; moving a charge takes W = qΔV, and E points toward lower potential.', 'Point charge V = kq/r, added as scalars; E = −dV/dr; a uniform field gives ΔV = Ed. Moving 1 μC from 45 V to 90 V takes 45 μJ. 1 eV = 1.6×10⁻¹⁹ J. No work along an equipotential, and field lines cross equipotentials at right angles.', sPotential()),
    item('ph-capacitor', '축전기', 'Capacitors', '두 도체판에 전하 ±Q를 저장하는 장치예요. Q = CV이고 평행판은 C = ε₀A/d예요.', '예: A = 0.01 m², d = 1 mm → C = 88.5 pF, 12 V면 Q = 1.06 nC. 유전체 C = κε₀A/d. 에너지 U = ½CV² = Q²/2C. 직렬 1/C = Σ1/Cᵢ(전하 같음), 병렬 C = ΣCᵢ(전압 같음). 전지를 떼고 간격을 바꾸면 Q가 일정해요.', 'Two plates storing ±Q, with Q = CV; for parallel plates C = ε₀A/d.', 'A = 0.01 m², d = 1 mm gives C = 88.5 pF and Q = 1.06 nC at 12 V. With a dielectric C = κε₀A/d. Energy U = ½CV² = Q²/2C. Series 1/C = Σ1/Cᵢ (same charge); parallel C = ΣCᵢ (same voltage). Disconnect the battery and Q stays fixed when the gap changes.', sCapacitor()),
    item('ph-circuit', '옴의 법칙과 키르히호프 법칙', 'Ohm’s law and Kirchhoff’s rules', 'V = IR. 접합점에서 들어온 전류 = 나간 전류(KCL), 닫힌 고리를 돌면 전압 변화의 합 = 0(KVL)이에요.', '저항 R = ρL/A, 직렬 R = ΣRᵢ, 병렬 1/R = Σ1/Rᵢ. 예: 12 V, 2 Ω + (6 Ω ∥ 3 Ω) → 4 Ω, 3 A, 가지 전류 1 A·2 A. 전력 P = IV = I²R = V²/R. 전지의 단자 전압 V = ε − Ir(내부 저항).', 'V = IR. Current into a junction equals current out (KCL), and voltage changes around any closed loop sum to zero (KVL).', 'R = ρL/A; series R = ΣRᵢ, parallel 1/R = Σ1/Rᵢ. 12 V across 2 Ω + (6 Ω ∥ 3 Ω) = 4 Ω gives 3 A, splitting 1 A and 2 A. Power P = IV = I²R = V²/R. A battery’s terminal voltage is V = ε − Ir with internal resistance r.', sCircuit()),
    item('ph-rc', 'RC 회로', 'RC circuits', '저항과 축전기를 연결하면 전하와 전류가 시간 상수 τ = RC로 지수적으로 변해요.', '충전 q = CV(1 − e^(−t/RC)), i = (V/R)e^(−t/RC); 방전 q = Qe^(−t/RC). t = τ에서 63% 충전, 전류 37%. 예: 10 kΩ, 100 μF → τ = 1 s, 5τ면 99%. 처음엔 축전기가 도선처럼, 충분히 뒤엔 끊긴 것처럼 행동해요. RL 회로는 τ = L/R.', 'In a resistor–capacitor circuit, charge and current change exponentially with time constant τ = RC.', 'Charging q = CV(1 − e^(−t/RC)), i = (V/R)e^(−t/RC); discharging q = Qe^(−t/RC). At t = τ: 63% charged, current at 37%. 10 kΩ with 100 μF gives τ = 1 s; 99% after 5τ. A capacitor acts like a wire at first and an open gap later. RL circuits have τ = L/R.', sRC())
  ].concat(XT.add['ph-el'] || [])),
  sec('ph-mg', '자기·전자기파', 'Magnetism & EM waves', '자기와 전자기 유도', 'Magnetism and induction',
    '움직이는 전하가 만드는 자기장, 변하는 자기장이 만드는 전류, 그리고 빛이에요.', 'Fields from moving charges, currents from changing fields, and light itself.', [
    item('ph-lorentz', '자기력과 하전 입자', 'Magnetic force on charges', '자기장 속에서 움직이는 전하는 F = qv × B를 받아요. 힘이 속도에 수직이라 원운동을 해요.', 'r = mv/qB, T = 2πm/qB(속력과 무관 → 사이클로트론). 전류 도선 F = IL × B = BIL sinθ. 자기력은 일을 하지 않아 속력이 변하지 않아요. 전기장과 함께: 속도 선택기 v = E/B, 질량 분석기.', 'A charge moving through a magnetic field feels F = qv × B, perpendicular to v, so it circles.', 'r = mv/qB, T = 2πm/qB, independent of speed: the cyclotron. A current-carrying wire feels F = IL × B = BIL sinθ. Magnetic forces do no work, so speed never changes. With an electric field too: velocity selector v = E/B, mass spectrometer.', sLorentz()),
    item('ph-ampere', '전류가 만드는 자기장', 'Magnetic fields of currents', '전류 주위에는 원형 자기장이 생겨요(오른손 법칙). 앙페르 법칙 ∮B·dl = μ₀I_enc로 대칭인 경우를 계산해요.', '직선 도선 B = μ₀I/2πr(예: 10 A, 2 cm → 1×10⁻⁴ T), 원형 도선 중심 B = μ₀I/2R, 솔레노이드 B = μ₀nI. 비오-사바르 법칙 dB = (μ₀/4π)I dl × r̂/r². 평행 전류: 같은 방향 인력, F/L = μ₀I₁I₂/2πd. μ₀ = 4π×10⁻⁷.', 'Currents are circled by magnetic field lines (right-hand rule); Ampère’s law ∮B·dl = μ₀I_enc handles symmetric cases.', 'Straight wire B = μ₀I/2πr (10 A at 2 cm → 1×10⁻⁴ T); center of a loop B = μ₀I/2R; solenoid B = μ₀nI. Biot–Savart: dB = (μ₀/4π)I dl × r̂/r². Parallel currents attract: F/L = μ₀I₁I₂/2πd. μ₀ = 4π×10⁻⁷.', sAmpere()),
    item('ph-faraday', '패러데이 법칙과 렌츠 법칙', 'Faraday’s and Lenz’s laws', '코일을 지나는 자기 선속 Φ = BA cosθ가 변하면 유도 기전력이 생겨요. 유도 전류는 그 변화를 방해하는 방향이에요.', 'ε = −N dΦ/dt. 움직이는 도선 ε = BLv. 회전 코일(발전기) ε = NBAω sin ωt. 변압기 V₂/V₁ = N₂/N₁. 예: 100회 코일의 선속이 0.1초에 0.02 Wb 변하면 ε = 20 V. 렌츠 법칙은 에너지 보존의 결과예요.', 'When the flux Φ = BA cosθ through a coil changes, an emf is induced; the induced current opposes the change.', 'ε = −N dΦ/dt; a moving rod gives ε = BLv; a rotating coil (generator) ε = NBAω sin ωt; transformers V₂/V₁ = N₂/N₁. A 100-turn coil whose flux changes by 0.02 Wb in 0.1 s gives 20 V. Lenz’s law is energy conservation.', sFaraday()),
    item('ph-lc', '인덕턴스와 LC 진동', 'Inductance and LC oscillation', '코일은 전류 변화를 방해하는 기전력 −L dI/dt를 만들어요. 축전기와 연결하면 전기·자기 에너지가 번갈아 진동해요.', 'U_B = ½LI², U_E = q²/2C, ω = 1/√(LC). 예: L = 10 mH, C = 1 μF → ω = 10⁴ rad/s, f ≈ 1.6 kHz. 솔레노이드 L = μ₀n²Al. RL 회로 τ = L/R. 교류: X_L = ωL, X_C = 1/ωC, 공진 ω₀ = 1/√(LC)에서 임피던스 최소.', 'An inductor opposes changes in current with emf −L dI/dt; paired with a capacitor, energy swings between electric and magnetic forms.', 'U_B = ½LI², U_E = q²/2C, ω = 1/√(LC); L = 10 mH and C = 1 μF give ω = 10⁴ rad/s, f ≈ 1.6 kHz. A solenoid has L = μ₀n²Al. RL circuits: τ = L/R. In AC, X_L = ωL, X_C = 1/ωC, and impedance is lowest at resonance ω₀ = 1/√(LC).', sLC()),
    item('ph-emwave', '맥스웰 방정식과 전자기파', 'Maxwell’s equations and EM waves', '변하는 전기장이 자기장을, 변하는 자기장이 전기장을 만들어 서로를 유지하며 퍼지는 것이 전자기파예요. 빛도 전자기파예요.', '맥스웰 방정식: 가우스(E), 가우스(B, 자기 홀극 없음), 패러데이, 앙페르-맥스웰(변위 전류). c = 1/√(μ₀ε₀) = 3.0×10⁸ m/s, E = cB, E ⟂ B ⟂ 진행 방향. 세기 ∝ E², 복사압 = I/c. 스펙트럼: 전파~감마선은 파장만 달라요.', 'A changing E makes B and a changing B makes E, so the pair sustains itself and travels: an electromagnetic wave. Light is one.', 'Maxwell’s equations: Gauss for E, Gauss for B (no monopoles), Faraday, and Ampère–Maxwell with displacement current. c = 1/√(μ₀ε₀) = 3.0×10⁸ m/s, E = cB, with E ⟂ B ⟂ direction. Intensity ∝ E²; radiation pressure = I/c. From radio to gamma rays only the wavelength differs.', sEmWave())
  ].concat(XT.add['ph-mg'] || [])),
  sec('ph-op', '광학', 'Optics', '빛과 광학', 'Light and optics',
    '빛의 반사·굴절로 상을 만들고, 간섭으로 파동성을 확인해요.', 'Reflection and refraction form images; interference reveals light’s wave nature.', [
    item('ph-snell', '반사, 굴절, 전반사', 'Reflection, refraction, total reflection', '반사각 = 입사각, 굴절은 n₁ sinθ₁ = n₂ sinθ₂(스넬 법칙)를 따라요. 굴절률이 큰 곳에서 작은 곳으로 갈 때 임계각보다 크면 모두 반사돼요.', 'n = c/v. 예: 공기→유리(1.5) 45° → 28.1°. 임계각 sinθc = n₂/n₁ = 1/1.5 → 41.8°. 굴절 시 진동수는 그대로, 파장·속력이 n배 줄어요. 광섬유, 다이아몬드의 반짝임, 프리즘 분산(색마다 n이 다름).', 'The reflection angle equals the incidence angle; refraction obeys n₁ sinθ₁ = n₂ sinθ₂ (Snell). Going to a lower index beyond the critical angle, everything reflects.', 'n = c/v. Air to glass (1.5) at 45° bends to 28.1°. Critical angle sinθc = n₂/n₁ = 1/1.5 → 41.8°. Frequency stays the same; wavelength and speed drop by n. Optical fibers, diamond sparkle and prism dispersion (n varies with color).', sSnell()),
    item('ph-lens', '렌즈와 거울', 'Lenses and mirrors', '얇은 렌즈와 구면 거울은 1/f = 1/d_o + 1/d_i로 상의 위치를, m = −d_i/d_o로 배율을 정해요. 세 개의 대표 광선으로 작도해요.', '예: f = 10 cm 볼록렌즈, d_o = 30 cm → d_i = 15 cm, m = −0.5(도립 축소 실상). 물체가 f 안쪽이면 정립 확대 허상(돋보기). 오목렌즈·볼록거울은 f < 0. 구면 거울 f = R/2. 굴절력 D = 1/f(디옵터).', 'Thin lenses and spherical mirrors obey 1/f = 1/d_o + 1/d_i for image position and m = −d_i/d_o for magnification; three standard rays locate the image.', 'A 10 cm converging lens with the object at 30 cm images it at 15 cm, m = −0.5 (real, inverted, smaller). Inside f you get an upright, enlarged virtual image: a magnifier. Diverging lenses and convex mirrors have f < 0. Mirrors: f = R/2. Power D = 1/f in diopters.', sLens()),
    item('ph-young', '간섭과 회절', 'Interference and diffraction', '두 틈에서 나온 빛이 겹쳐 경로차가 파장의 정수배인 곳은 밝고, 반정수배인 곳은 어두워요. 빛이 파동이라는 증거예요.', '이중 슬릿: 밝은 무늬 d sinθ = mλ, 간격 Δy = λL/d(예: 600 nm, 0.2 mm, 1 m → 3 mm). 단일 슬릿 어두운 무늬 a sinθ = mλ. 회절격자 d sinθ = mλ로 분광. 얇은 막 간섭: 반사 시 위상 반전 고려(비눗방울, 반사 방지 코팅).', 'Light from two slits overlaps: bright where the path difference is a whole number of wavelengths, dark at half-integers. Proof that light is a wave.', 'Double slit: bright fringes at d sinθ = mλ, spacing Δy = λL/d (600 nm, 0.2 mm, 1 m → 3 mm). Single slit dark fringes at a sinθ = mλ. Gratings use d sinθ = mλ for spectroscopy. Thin films: account for phase flips on reflection (soap bubbles, anti-reflection coatings).', sYoung())
  ].concat(XT.add['ph-op'] || [])),
  sec('ph-md', '현대물리', 'Modern physics', '현대물리', 'Modern physics',
    '아주 빠른 것과 아주 작은 것의 물리예요.', 'The physics of the very fast and the very small.', [
    item('ph-relativity', '특수 상대성 이론', 'Special relativity', '모든 관성계에서 빛의 속력이 같다는 원리에서 움직이는 시계는 느리게 가고(시간 지연) 길이는 줄어들어요(길이 수축).', 'γ = 1/√(1 − v²/c²), Δt = γΔt₀, L = L₀/γ. 예: v = 0.6c → γ = 1.25, 0.8c → 5/3. 뮤온이 지표까지 도달하는 이유. E = γmc², 정지 에너지 mc², E² = (pc)² + (mc²)². 동시성은 관찰자에 따라 달라요.', 'Because light has the same speed in every inertial frame, moving clocks run slow (time dilation) and moving lengths shrink (length contraction).', 'γ = 1/√(1 − v²/c²), Δt = γΔt₀, L = L₀/γ; v = 0.6c gives γ = 1.25 and 0.8c gives 5/3, which is why cosmic-ray muons reach the ground. E = γmc², rest energy mc², E² = (pc)² + (mc²)². Simultaneity depends on the observer.', sRelativity()),
    item('ph-photoelectric', '광전 효과와 광자', 'Photoelectric effect and photons', '빛은 에너지 hf를 가진 광자 알갱이예요. 문턱 진동수보다 높아야 전자가 나오고, 세기는 전자 수만 바꿔요.', 'K_max = hf − φ, f₀ = φ/h, 저지 전압 eV₀ = K_max. h = 6.63×10⁻³⁴ J·s = 4.14×10⁻¹⁵ eV·s. 예: 나트륨 φ = 2.3 eV, 400 nm(3.1 eV) → 0.8 eV. 광자 운동량 p = h/λ, 콤프턴 산란 Δλ = (h/mc)(1 − cosθ).', 'Light comes in photons of energy hf. Electrons escape only above a threshold frequency; intensity changes only how many.', 'K_max = hf − φ, f₀ = φ/h, stopping voltage eV₀ = K_max. h = 6.63×10⁻³⁴ J·s = 4.14×10⁻¹⁵ eV·s. Sodium (φ = 2.3 eV) under 400 nm light (3.1 eV) gives 0.8 eV electrons. Photon momentum p = h/λ; Compton shift Δλ = (h/mc)(1 − cosθ).', sPhotoelectric()),
    item('ph-bohr', '보어 모형과 물질파', 'Bohr model and matter waves', '수소 원자의 전자는 Eₙ = −13.6/n² eV의 준위에만 있고, 준위 사이를 옮길 때 차이만큼 빛을 내거나 흡수해요. 물질도 파장 λ = h/p를 가져요.', 'hf = E_i − E_f. 3→2: 1.89 eV, 656 nm(발머 Hα), 2→1: 10.2 eV(라이먼, 자외선), 이온화 13.6 eV. 궤도 조건 2πr = nλ. rₙ = n²a₀(a₀ = 0.053 nm). 100 V 전자 λ ≈ 0.123 nm → 전자 회절. 불확정성 Δx·Δp ≥ ħ/2.', 'Hydrogen’s electron sits only on levels Eₙ = −13.6/n² eV, emitting or absorbing the difference as light; matter also has a wavelength λ = h/p.', 'hf = E_i − E_f. 3→2: 1.89 eV, 656 nm (Balmer Hα); 2→1: 10.2 eV (Lyman, UV); ionization 13.6 eV. Orbit condition 2πr = nλ; rₙ = n²a₀ with a₀ = 0.053 nm. A 100 V electron has λ ≈ 0.123 nm, enough for electron diffraction. Uncertainty Δx·Δp ≥ ħ/2.', sBohr())
  ].concat(XT.add['ph-md'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
window.UX[0].css += `
.ph-b .in{font-weight:800;color:var(--ink)}
.ph-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.ph-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.ph-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.ph-big .in{font-size:1.1em;font-weight:900;color:var(--ink)}
.ph-r .in{color:var(--danger);font-weight:800}
.ph-g .in{color:var(--ok);font-weight:800}
.ph-a .in{color:var(--accent);font-weight:800}
.ph-w .in{color:var(--warn);font-weight:800}
.ph-bl .in{font-size:.62em;font-weight:700}
.ph-q .in{font-size:1em;font-weight:900}
.ph-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}
.ph-v,.ph-ln,.ph-bx,.ph-dt,.ph-tx{position:absolute;display:block}
.ph-v,.ph-ln{transform-origin:0 50%;border-radius:.1em}
.ph-v{background:var(--c)}
.ph-v::after{content:"";position:absolute;right:.02em;top:50%;width:.5em;height:.5em;margin-top:-.27em;border:solid var(--c);border-width:.18em .18em 0 0;transform:rotate(45deg)}
.ph-bx{border-radius:.2em}
.ph-dt{border-radius:50%}
.ph-tx{font-family:var(--f-mono);color:var(--ink);white-space:nowrap;line-height:1}
.ph-tx span{font-size:.62em;font-weight:800}`;
})();
