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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'lx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono lx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono lx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c lx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));

/* ---- linux helpers ---- */
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
/* terminal: lines = [[text, step, extraClass]] */
function term(S, k, x, y, w, lines, o = {}) {
  const lh = o.lh || 1.25, h = o.h || lines.length * lh + .7;
  rect(S, k + 'bg', x, y, w, h, 'ink', 9, o.st || 0, { r: .4 });
  lines.forEach(([t, st, c], i) => T(S, k + i, x + .5, y + .35 + i * lh, t, 'cz-mono lx-tm ' + (c || ''), st || 0, { off: Array.isArray(st) ? 0 : undefined, css: 'z-index:6' }));
}
const nd = (S, k, x, y, w, label, color, st, o = {}) => box(S, k, x - w / 2, y - .85, w, 1.7, label, color, st, o);
const link = (S, k, a, b, st, o = {}) => seg(S, k, [a[0], a[1] + .85], [b[0], b[1] - .85], st, o.color || 'ink-3', .1, o);

/* ================= files & permissions ================= */
function sTree() {
  const S = scene({ id: 'lx-tree', steps: 5, per: 1.4 });
  nd(S, 'r', 16, 2, 3, '/', 'accent', 0, { pct: 45 });
  const ch = [['bin', 2.2], ['etc', 6], ['home', 9.8], ['var', 13.6], ['tmp', 17.4], ['usr', 21.2], ['proc', 25], ['dev', 28.8]];
  ch.forEach(([n, x], i) => { nd(S, 'c' + i, x, 6.4, 3.4, n, 'line', 0, { pct: 30 }); link(S, 'l' + i, [16, 2], [x, 6.4], 0); });
  const ds = { etc: [2, ['설정 파일', 'config files'], 'warn'], home: [2, ['사용자 홈', 'user homes'], 'warn'], var: [2, ['로그·변하는 데이터', 'logs, changing data'], 'warn'], tmp: [2, ['임시 (재부팅 시 삭제)', 'temporary'], 'warn'],
    bin: [4, ['기본 명령', 'core commands'], 'ok'], usr: [4, ['프로그램·라이브러리', 'programs, libraries'], 'ok'], proc: [3, ['커널이 보여주는 가짜 파일', 'virtual files from the kernel'], 'danger'], dev: [3, ['장치 파일', 'device files'], 'danger'] };
  ch.forEach(([n, x], i) => { const [st, , c] = ds[n]; tsets(S, 'c' + i, [[st, c, 40]]); });
  nd(S, 'g1', 9.8, 12, 3.6, 'alice', 'line', 2, { pct: 25 }); link(S, 'gl1', [9.8, 6.4], [9.8, 12], 2);
  nd(S, 'g2', 13.6, 12, 3.6, 'log', 'line', 2, { pct: 25 }); link(S, 'gl2', [13.6, 6.4], [13.6, 12], 2);
  nd(S, 'g3', 19.4, 12, 3.6, 'bin', 'line', 4, { pct: 25 }); nd(S, 'g4', 23.2, 12, 3.6, 'local', 'line', 4, { pct: 25 }); link(S, 'gl3', [21.2, 6.4], [19.4, 12], 4); link(S, 'gl4', [21.2, 6.4], [23.2, 12], 4);
  T(S, 'p0', 1, 14.4, ['/etc 설정 · /home 사용자 홈 · /var 로그처럼 변하는 데이터 · /tmp 임시 파일', '/etc config · /home user homes · /var changing data such as logs · /tmp scratch files'], 'lx-xs lx-w', 2);
  T(S, 'p1', 1, 15.7, ['/proc·/dev: 커널이 만든 가상 파일 — cat /proc/cpuinfo, /dev/null은 버리는 곳', '/proc and /dev: virtual files from the kernel — cat /proc/cpuinfo, /dev/null discards'], 'cz-mono lx-xs lx-r', 3);
  T(S, 'p2', 1, 17, ['/bin 기본 명령 · /usr 프로그램과 라이브러리 · 직접 설치한 건 /usr/local', '/bin core commands · /usr programs and libraries · your own installs in /usr/local'], 'lx-xs lx-g', 4);
  T(S, 'p3', 1, 18.6, ['디스크·USB는 /mnt, /media 같은 디렉터리에 마운트해서 하나의 트리에 붙여요 (윈도우처럼 C:, D:가 없어요)', 'disks and USB drives are mounted onto directories such as /mnt or /media, joining one tree (no C: or D:)'], 'cz-tc lx-xs', 5, { w: 30 });
  S.cap(1, '리눅스의 모든 파일은 / 하나에서 시작하는 트리', 'Every Linux file hangs off a single root, /')
    .cap(2, '설정은 /etc, 사용자는 /home, 로그는 /var', 'Config in /etc, users in /home, logs in /var')
    .cap(3, '/proc와 /dev는 커널이 만든 특별한 파일', '/proc and /dev hold special files made by the kernel')
    .cap(4, '프로그램은 /usr 아래에', 'Programs live under /usr')
    .cap(5, '파일 시스템 계층 표준(FHS)', 'The Filesystem Hierarchy Standard');
  return S;
}
function sPath() {
  const S = scene({ id: 'lx-path', steps: 5, per: 1.4 });
  const P = { r: [8, 2, '/'], h: [5, 6, 'home'], e: [12, 6, 'etc'], a: [5, 10, 'alice'], p: [5, 14, 'projects'], ap: [5, 18, 'app'] };
  Object.entries(P).forEach(([k, [x, y, n]]) => nd(S, k, x, y, 4.2, n, 'line', 0, { pct: 30 }));
  [['r', 'h'], ['r', 'e'], ['h', 'a'], ['a', 'p'], ['p', 'ap']].forEach(([a, b], i) => link(S, 'l' + i, P[a], P[b], 0));
  const cur = k => [P[k][0] + 2.3, P[k][1] - .45];
  pt(S, 'cw', cur('a')[0], cur('a')[1] + .45, 0, C.badf, .45); const mv = (st, k) => S.move('cw', st, cur(k)[0] - .45, cur(k)[1]);
  mv(1, 'a'); mv(2, 'ap'); mv(3, 'p'); mv(4, 'e'); mv(5, 'a');
  term(S, 't', 15, 1.6, 16, [['$ pwd', 0, 'lx-pr'], ['/home/alice', 0], ['$ cd projects/app', 2, 'lx-pr'], ['$ cd ..', 3, 'lx-pr'], ['$ pwd', 3, 'lx-pr'], ['/home/alice/projects', 3], ['$ cd /etc', 4, 'lx-pr'], ['$ cd ~', 5, 'lx-pr']]);
  T(S, 'n1', 15, 13, ['상대 경로: 지금 위치에서 출발', 'relative path: starts where you are'], 'lx-xs', 2);
  T(S, 'n2', 15, 14.3, ['. 현재 · .. 부모 · ~ 홈', '. here · .. parent · ~ home'], 'cz-mono lx-xs', 3);
  T(S, 'n3', 15, 15.6, ['절대 경로: /로 시작, 어디서나 같은 곳', 'absolute path: starts with /, same from anywhere'], 'lx-xs', 4);
  T(S, 'n4', 15, 17.2, ['cd - 직전 위치 · 스크립트에선 절대 경로가 안전', 'cd - goes back · scripts are safer with absolute paths'], 'lx-xs', 5);
  S.cap(1, '빨간 점이 지금 있는 디렉터리 (/home/alice)', 'The red dot is the current directory (/home/alice)')
    .cap(2, '상대 경로로 두 단계 아래로', 'A relative path goes two levels down')
    .cap(3, '..은 한 단계 위', '.. goes up one level')
    .cap(4, '/로 시작하면 루트부터 찾아가요', 'A leading / starts from the root')
    .cap(5, '~는 홈 디렉터리', '~ is your home directory');
  return S;
}
function sPerm() {
  const S = scene({ id: 'lx-perm', steps: 5, per: 1.4 });
  term(S, 't', 1, 1.2, 30, [['$ ls -l deploy.sh', 0, 'lx-pr'], ['-rwxr-xr--  1 alice dev  812 Nov  9 10:02 deploy.sh', 0]]);
  const ch = '-rwxr-xr--'.split(''), cw = 2.3, X = 4.4, col = i => i === 0 ? 'line' : i <= 3 ? 'accent' : i <= 6 ? 'warn' : 'ok';
  ch.forEach((c, i) => box(S, 'b' + i, X + i * cw, 5.4, cw - .14, 2, c, col(i), 1, { pct: c === '-' && i ? 12 : 40 }));
  [[1, ['소유자 alice', 'owner alice'], 'lx-a'], [4, ['그룹 dev', 'group dev'], 'lx-w'], [7, ['그 외', 'others'], 'lx-g']].forEach(([i, t, c], j) => T(S, 'g' + j, X + i * cw, 7.7, t, 'cz-tc lx-xs ' + c, 2, { w: 3 * cw }));
  T(S, 'ty', X - 3, 7.7, ['종류', 'type'], 'cz-tc lx-xs', 2, { w: 3.6 });
  ['111', '101', '100'].forEach((b, j) => { T(S, 'bn' + j, X + (1 + 3 * j) * cw, 9.2, b, 'cz-tc cz-mono lx-s', 3, { w: 3 * cw }); T(S, 'oc' + j, X + (1 + 3 * j) * cw, 10.6, ['7', '5', '4'][j], 'cz-tc cz-mono lx-l', 3, { w: 3 * cw }); });
  T(S, 'v', 1, 12.4, ['r = 4, w = 2, x = 1을 더해서 754', 'add r = 4, w = 2, x = 1 per group: 754'], 'lx-s', 3);
  term(S, 't2', 1, 14, 18, [['$ chmod 644 notes.txt   # rw-r--r--', 4, 'lx-pr'], ['$ chmod +x deploy.sh', 4, 'lx-pr'], ['$ chown alice:dev app.log', 4, 'lx-pr']]);
  T(S, 'd1', 20.4, 14.2, ['디렉터리의 x = 들어갈 수 있음', 'on a directory, x = may enter'], 'lx-xs', 5); T(S, 'd2', 20.4, 15.5, ['r = 목록 보기, w = 파일 생성·삭제', 'r = list, w = create/delete'], 'lx-xs', 5);
  T(S, 'd3', 20.4, 16.8, ['새 파일 기본값은 umask 022로', 'umask 022 sets new-file defaults'], 'lx-xs', 5); T(S, 'd4', 20.4, 18.1, ['root는 모든 권한 · sudo로 잠깐', 'root bypasses it all · sudo briefly'], 'lx-xs lx-r', 5);
  S.cap(1, 'ls -l 맨 앞 10글자가 권한이에요', 'The first ten characters of ls -l are the permissions')
    .cap(2, '소유자·그룹·그 외 사람마다 읽기·쓰기·실행', 'Read, write and execute for owner, group and others')
    .cap(3, '세 비트씩 묶으면 숫자 754', 'Each group of three bits is one octal digit: 754')
    .cap(4, 'chmod로 바꾸고 chown으로 소유자를 바꿔요', 'chmod changes them; chown changes the owner')
    .cap(5, '유닉스 파일 권한', 'Unix file permissions');
  return S;
}
function sLinks() {
  const S = scene({ id: 'lx-links', steps: 5, per: 1.4 });
  box(S, 'ino', 12, 6.4, 8, 3.6, ['inode 4021 · 데이터 블록', 'inode 4021 · data blocks'], 'accent', 0, { pct: 30 });
  T(S, 'lc1', 12, 10.4, ['링크 수 1', 'link count 1'], 'cz-tc cz-mono lx-xs', 0, { w: 8, off: 2 }); T(S, 'lc2', 12, 10.4, ['링크 수 2', 'link count 2'], 'cz-tc cz-mono lx-xs lx-a', 2, { w: 8, off: 4 }); T(S, 'lc3', 12, 10.4, ['링크 수 1', 'link count 1'], 'cz-tc cz-mono lx-xs', 4, { w: 8 });
  box(S, 'a', 1, 2, 7.4, 2, 'report.txt', 'line', 0, { off: 4 }); ar(S, 'aa', [8.5, 3], [11.9, 7], 'accent', 0, { h: .12, off: 4 });
  box(S, 'h', 1, 10.6, 7.4, 2, 'backup.txt', 'warn', 2); ar(S, 'ha', [8.5, 11.4], [11.9, 9.2], 'warn', 2, { h: .12 });
  box(S, 's', 23.6, 2, 7.4, 2, 'latest →', 'ok', 3); T(S, 'sp', 23.6, 4.3, ['"report.txt"라는 경로를 저장', 'stores the path “report.txt”'], 'cz-tc lx-xs', 3, { w: 7.4 });
  elb(S, 'sa', [[23.5, 3], [20, 3], [20, 2.4], [8.5, 2.4]], 'ok', 3, { off: 4 });
  box(S, 'dead', 23.6, 2, 7.4, 2, ['latest → ✗', 'latest → ✗'], 'danger', 4, { pct: 40 });
  term(S, 't', 1, 14, 17, [['$ ln report.txt backup.txt', 2, 'lx-pr'], ['$ ln -s report.txt latest', 3, 'lx-pr'], ['$ rm report.txt', 4, 'lx-pr']]);
  T(S, 'n1', 19, 13.6, ['하드 링크: 같은 inode에 이름 하나 더', 'hard link: another name for the same inode'], 'lx-xs lx-w', 2);
  T(S, 'n2', 19, 14.9, ['심볼릭 링크: 경로를 가리키는 작은 파일', 'symlink: a tiny file holding a path'], 'lx-xs lx-g', 3);
  T(S, 'n3', 19, 16.2, ['원본 삭제 → 하드 링크는 멀쩡, 심링크는 끊김', 'rm original → hard link OK, symlink dead'], 'lx-xs lx-r', 4);
  T(S, 'n4', 1, 19, ['심링크는 디렉터리·다른 디스크도 가리켜요 · 버전 전환(current → v2.3), /usr/bin/python → python3', 'symlinks can point at directories or other disks · version switching (current → v2.3), /usr/bin/python → python3'], 'cz-tc lx-xs', 5, { w: 30 });
  S.cap(1, '파일 이름은 inode(실제 데이터)를 가리키는 표지판', 'A filename is a signpost to an inode, where the data lives')
    .cap(2, '하드 링크는 같은 inode에 이름을 하나 더 붙여요', 'A hard link adds a second name for the same inode')
    .cap(3, '심볼릭 링크는 다른 경로를 적어 둔 바로가기', 'A symbolic link is a shortcut that stores another path')
    .cap(4, '원래 이름을 지우면 심볼릭 링크만 끊어져요', 'Remove the original name and only the symlink breaks')
    .cap(5, '하드 링크와 심볼릭 링크', 'Hard links and symbolic links');
  return S;
}
function sGlob() {
  const S = scene({ id: 'lx-glob', steps: 5, per: 1.4 });
  const F = ['a.log', 'b.log', 'c.txt', 'd.log.gz', 'logs/x.log', 'logs/y.log'];
  T(S, 'h', 1, 1.2, ['현재 디렉터리', 'current directory'], 'lx-xs');
  F.forEach((f, i) => { box(S, 'f' + i, 1, 2.4 + i * 2, 7.4, 1.7, f, 'line', 0, { pct: 25 }); });
  [0, 1].forEach(i => tsets(S, 'f' + i, [[1, 'accent', 45], [4, 'line', 25]])); [0, 1, 4, 5].forEach(i => tsets(S, 'f' + i, [[4, 'ok', 45]]));
  term(S, 't', 10, 1.6, 21, [['$ ls *.log', 1, 'lx-pr'], ['a.log  b.log', 1], ['$ echo rm *.log', 2, 'lx-pr'], [['rm a.log b.log      # 셸이 먼저 펼쳐요', 'rm a.log b.log      # the shell expanded it'], 2], ["$ echo '*.log'", 3, 'lx-pr'], ['*.log', 3], ['$ find . -name "*.log" -mtime -1', 4, 'lx-pr'], ['./a.log ./b.log ./logs/x.log ./logs/y.log', 4]]);
  T(S, 'n1', 10, 12.6, ['* 아무 글자 · ? 한 글자 · [ab] 둘 중 하나 · {a,b} 나열', '* anything · ? one char · [ab] one of · {a,b} alternatives'], 'cz-mono lx-xs', 1);
  T(S, 'n2', 10, 14, ['명령이 받는 건 이미 펼쳐진 파일 목록', 'the command only ever sees the expanded list'], 'lx-xs lx-a', 2);
  T(S, 'n3', 10, 15.4, ['따옴표로 감싸면 글자 그대로 전달', 'quote it to pass the pattern literally'], 'lx-xs', 3);
  T(S, 'n4', 10, 16.8, ['find는 하위 폴더까지 조건으로 찾아요 (-exec, -delete)', 'find walks subfolders with conditions (-exec, -delete)'], 'lx-xs lx-g', 4);
  T(S, 'n5', 1, 19, ['맞는 파일이 없으면 bash는 *.log를 그대로 넘겨요 · rm -rf $DIR/* 에서 DIR이 비면 위험 → 항상 "${DIR:?}"', 'with no match bash passes *.log through unchanged · rm -rf $DIR/* with an empty DIR is dangerous → use "${DIR:?}"'], 'cz-tc lx-xs lx-r', 5, { w: 30 });
  S.cap(1, '*.log는 이름이 .log로 끝나는 파일과 맞아요', '*.log matches names ending in .log')
    .cap(2, '패턴은 셸이 명령 실행 전에 파일 목록으로 바꿔요', 'The shell turns the pattern into file names before running the command')
    .cap(3, '따옴표 안에서는 펼쳐지지 않아요', 'Inside quotes it is left alone')
    .cap(4, '하위 폴더까지 조건 검색은 find', 'For subfolders and conditions, use find')
    .cap(5, '글로브 패턴과 find', 'Glob patterns and find');
  return S;
}

/* ================= text processing ================= */
function sPipeline() {
  const S = scene({ id: 'lx-pipeline', steps: 5, per: 1.4 });
  T(S, 'cmd', 1, 1.2, "grep ' 500 ' access.log | awk '{print $1}' | sort | uniq -c | sort -rn", 'cz-mono lx-s');
  const raw = ['1.2.3.4 GET / 200', '5.6.7.8 GET /a 500', '1.2.3.4 GET /b 500', '9.9.9.9 GET / 200', '5.6.7.8 GET /c 500', '5.6.7.8 GET /d 500'];
  const st = [['access.log', raw, 0], ['grep', raw.filter(l => l.includes(' 500')), 1], ['awk $1', ['5.6.7.8', '1.2.3.4', '5.6.7.8', '5.6.7.8'], 2], ['sort', ['1.2.3.4', '5.6.7.8', '5.6.7.8', '5.6.7.8'], 3], ['uniq -c', ['1 1.2.3.4', '3 5.6.7.8'], 4], ['sort -rn', ['3 5.6.7.8', '1 1.2.3.4'], 5]];
  st.forEach(([n, ls, s], j) => { const x = 1 + j * 5.1; T(S, 'h' + j, x, 3.2, n, 'cz-tc cz-mono lx-xs lx-a', s, { w: 4.8 }); rect(S, 'p' + j, x, 4.4, 4.8, 9.2, 'ink', 7, s, { r: .3 });
    ls.forEach((l, i) => T(S, `l${j}_${i}`, x + .25, 4.8 + i * 1.4, l, 'cz-mono lx-tiny', s)); if (j) ar(S, 'a' + j, [x - .4, 8.6], [x - .02, 8.6], 'ink-3', s, { h: .1 }); });
  T(S, 'r', 1, 15, ['각 명령은 한 가지 일만: 거르기 → 열 뽑기 → 정렬 → 세기 → 정렬', 'each tool does one job: filter → pick a column → sort → count → sort'], 'lx-s', 3);
  T(S, 'r2', 1, 16.6, ['uniq는 붙어 있는 중복만 세므로 앞에 sort가 필요해요', 'uniq only counts adjacent duplicates, hence the sort before it'], 'lx-xs lx-r', 4);
  T(S, 'r3', 1, 18.2, ['결과: 500 오류를 가장 많이 낸 IP는 5.6.7.8 (3번) · 마지막에 | head -10을 붙이면 상위 10개', 'result: 5.6.7.8 caused the most 500s (3) · append | head -10 for a top ten'], 'lx-xs lx-g', 5);
  S.cap(1, 'grep으로 500 오류 줄만 남기고', 'grep keeps only the lines with a 500')
    .cap(2, 'awk로 첫 번째 열(IP)만 뽑아요', 'awk pulls out the first column, the IP')
    .cap(3, '정렬하면 같은 IP가 붙고', 'Sorting puts identical IPs together')
    .cap(4, 'uniq -c가 개수를 세요', 'uniq -c counts them')
    .cap(5, '많은 순으로 다시 정렬하면 끝', 'Sort by count and you have the answer');
  return S;
}
function sGrep() {
  const S = scene({ id: 'lx-grep', steps: 5, per: 1.4 });
  const L = ['2026-11-09 10:01 INFO  user=alice login', '2026-11-09 10:02 ERROR db timeout', '2026-11-09 10:03 WARN  user=bob retry', '2026-11-09 10:04 error cache miss', '2026-11-09 10:05 ERROR user=carol denied'];
  L.forEach((l, i) => box(S, 'l' + i, 1, 2 + i * 1.9, 18, 1.6, l, 'line', 0, { pct: 18 }));
  const hits = [[1, 4], [1, 3, 4], [0, 2, 4], [0, 2, 3]];
  hits.forEach((h, j) => { const st = j + 1; [0, 1, 2, 3, 4].forEach(i => tsets(S, 'l' + i, [[st, h.includes(i) ? ['danger', 'warn', 'accent', 'ok'][j] : 'line', h.includes(i) ? 40 : 12]])); });
  term(S, 't', 20.4, 2, 10.6, [["grep ERROR", 1, 'lx-pr'], ["grep -i error", 2, 'lx-pr'], ["grep -E 'user=[a-z]+'", 3, 'lx-pr'], ["grep -v ERROR", 4, 'lx-pr']], { lh: 1.9 });
  T(S, 'n1', 1, 12.4, ['-i 대소문자 무시 · -v 반대로 · -c 개수 · -n 줄 번호 · -r 폴더 전체 · -A 3 뒤 3줄 함께', '-i ignore case · -v invert · -c count · -n line numbers · -r recurse · -A 3 three lines after'], 'cz-mono lx-xs', 4);
  T(S, 'n2', 1, 14, ['정규식: ^ 줄 시작 · $ 줄 끝 · . 아무 글자 · [0-9]+ 숫자 여러 개 · \\b 단어 경계', 'regex: ^ start · $ end · . any char · [0-9]+ one or more digits · \\b word boundary'], 'cz-mono lx-xs', 5);
  T(S, 'n3', 1, 15.6, ['ripgrep(rg)는 .gitignore를 존중하고 훨씬 빨라요 · 코드 검색의 표준', 'ripgrep (rg) respects .gitignore and is much faster · the go-to for code search'], 'lx-xs', 5);
  S.cap(1, 'grep은 패턴이 들어 있는 줄만 골라요', 'grep keeps only the lines that contain a pattern')
    .cap(2, '-i는 대소문자를 무시해요', '-i ignores case')
    .cap(3, '-E로 정규식을 쓰면 형태로 찾아요', '-E lets a regular expression match a shape')
    .cap(4, '-v는 맞지 않는 줄을 골라요', '-v selects the lines that don’t match')
    .cap(5, '로그 분석의 첫 도구', 'The first tool for reading logs');
  return S;
}
function sSedawk() {
  const S = scene({ id: 'lx-sedawk', steps: 5, per: 1.4 });
  term(S, 's', 1, 1.4, 30, [["$ sed 's/http:/https:/g' links.txt", 1, 'lx-pr'], ['http://a.com  http://b.com   →   https://a.com  https://b.com', 1], [["$ sed -i '/^#/d' app.conf        # 주석 줄 삭제, 파일을 직접 수정", "$ sed -i '/^#/d' app.conf        # delete comment lines, edit in place"], 2, 'lx-pr']]);
  const csv = [['name', 'team', 'hours'], ['alice', 'web', '12'], ['bob', 'db', '7'], ['carol', 'web', '9']];
  csv.forEach((r, i) => r.forEach((c, j) => box(S, `c${i}${j}`, 1 + j * 4.6, 7.6 + i * 1.8, 4.4, 1.6, c, i ? (j === 2 ? 'warn' : 'line') : 'ink-3', 3, { pct: i ? (j === 2 ? 35 : 18) : 25 })));
  T(S, 'cl', 1, 6.4, 'hours.csv', 'cz-mono lx-xs', 3);
  term(S, 'a', 15.4, 7.4, 15.6, [["$ awk -F, 'NR>1 {s+=$3}", 3, 'lx-pr'], ["      END {print s}' hours.csv", 3, 'lx-pr'], ['28', 3, 'lx-g'], ["$ awk -F, '$2==\"web\" {print $1}'", 4, 'lx-pr'], ['alice', 4, 'lx-g'], ['carol', 4, 'lx-g']]);
  [1, 3].forEach(i => tsets(S, `c${i}1`, [[4, 'ok', 40]]));
  T(S, 'n1', 1, 16, ['sed: 줄 단위 찾아 바꾸기·삭제 (stream editor)', 'sed: line-by-line find/replace and delete (stream editor)'], 'lx-xs', 2);
  T(S, 'n2', 1, 17.3, ['awk: 열($1, $2…)로 나눠 조건·합계·출력, 작은 프로그래밍 언어', 'awk: split into fields ($1, $2 …), filter, sum and print — a tiny language'], 'lx-xs', 4);
  T(S, 'n3', 1, 18.6, ['따옴표 안의 CSV 쉼표처럼 복잡해지면 jq·csvkit·파이썬으로', 'once it gets hairy (quoted commas in CSV), switch to jq, csvkit or Python'], 'lx-xs lx-r', 5);
  S.cap(1, 'sed로 텍스트를 찾아 바꿔요', 'sed finds and replaces text')
    .cap(2, '조건에 맞는 줄을 지우거나 파일을 직접 고칠 수도', 'It can delete matching lines or edit files in place')
    .cap(3, 'awk는 줄을 열로 나눠 계산해요', 'awk splits lines into columns and computes')
    .cap(4, '조건으로 행을 고르고 원하는 열만 출력', 'Pick rows by condition and print the columns you want')
    .cap(5, 'sed와 awk: 한 줄짜리 텍스트 가공', 'sed and awk: one-line text processing');
  return S;
}
function sRedirect() {
  const S = scene({ id: 'lx-redirect', steps: 5, per: 1.4 });
  box(S, 'p', 11, 6.4, 8, 4.4, ['프로그램', 'program'], 'accent', 0, { pct: 30 });
  T(S, 'f0', 9.2, 6.8, '0', 'cz-mono lx-s', 0); T(S, 'f1', 19.4, 6.8, '1', 'cz-mono lx-s', 0); T(S, 'f2', 19.4, 9.4, '2', 'cz-mono lx-s', 0);
  box(S, 'kb', 1, 7, 6.6, 2, ['키보드', 'keyboard'], 'line', 0, { off: 4 }); ar(S, 'ki', [7.7, 8], [10.9, 8], 'ink-3', 0, { h: .12, off: 4 });
  box(S, 'scr', 24.4, 4, 6.6, 2, ['화면', 'screen'], 'line', 0); box(S, 'scr2', 24.4, 11, 6.6, 2, ['화면', 'screen'], 'line', 0, { off: 2 });
  ar(S, 'o1', [19.1, 7.6], [24.3, 5], 'ok', 0, { h: .12, off: 1 }); ar(S, 'e1', [19.1, 10.2], [24.3, 12], 'danger', 0, { h: .12, off: 2 });
  box(S, 'out', 24.4, 4, 6.6, 2, 'out.txt', 'ok', 1, { pct: 45 }); ar(S, 'o2', [19.1, 7.6], [24.3, 5], 'ok', 1, { h: .14 });
  box(S, 'err', 24.4, 11, 6.6, 2, 'err.log', 'danger', 2, { pct: 40, off: 3 }); ar(S, 'e2', [19.1, 10.2], [24.3, 12], 'danger', 2, { h: .14, off: 3 });
  elb(S, 'e3', [[19.1, 10.2], [22, 10.2], [22, 5.4], [24.3, 5.4]], 'danger', 3, { h: .14 });
  box(S, 'in', 1, 7, 6.6, 2, 'data.csv', 'warn', 4, { pct: 45 }); ar(S, 'i2', [7.7, 8], [10.9, 8], 'warn', 4, { h: .14 });
  term(S, 't', 1, 14, 30, [[['$ make > out.txt            # stdout을 파일로 (덮어쓰기, >>는 이어 쓰기)', '$ make > out.txt            # stdout to a file (overwrite; >> appends)'], 1, 'lx-pr'], [['$ make > out.txt 2> err.log  # stderr는 따로', '$ make > out.txt 2> err.log  # stderr separately'], 2, 'lx-pr'], [['$ make > out.txt 2>&1        # stderr를 stdout이 가는 곳으로', '$ make > out.txt 2>&1        # stderr follows stdout'], 3, 'lx-pr'], [['$ sort < data.csv | tee sorted.csv   # 파일 입력, 화면과 파일에 동시 출력', '$ sort < data.csv | tee sorted.csv   # file in, screen and file out'], 4, 'lx-pr']]);
  T(S, 'n', 1, 20, ['> /dev/null 2>&1 은 모든 출력을 버려요 · 순서 주의: 2>&1 > file 은 stderr가 화면에 남아요', '> /dev/null 2>&1 discards everything · order matters: 2>&1 > file leaves stderr on screen'], 'cz-tc lx-xs', 5, { w: 30 });
  S.cap(1, '> 는 표준 출력(1번)을 파일로 보내요', '> sends standard output (fd 1) to a file')
    .cap(2, '2> 는 에러 출력(2번)만 따로', '2> sends error output (fd 2) elsewhere')
    .cap(3, '2>&1 은 에러도 출력과 같은 곳으로', '2>&1 points errors wherever output goes')
    .cap(4, '< 는 파일을 입력으로, tee는 갈래를 나눠요', '< feeds a file as input; tee splits the stream')
    .cap(5, '리다이렉션: 프로그램을 고치지 않고 입출력을 바꿔요', 'Redirection rewires I/O without touching the program');
  return S;
}
function sXargs() {
  const S = scene({ id: 'lx-xargs', steps: 5, per: 1.4 });
  term(S, 't', 1, 1.4, 30, [['$ find . -name "*.tmp" | xargs rm', 1, 'lx-pr'], ['$ rm $(find . -name "*.tmp")', 2, 'lx-pr'], ['$ find . -name "*.tmp" -print0 | xargs -0 rm', 4, 'lx-pr'], ['$ ls *.png | xargs -P 8 -I{} convert {} -resize 50% small/{}', 5, 'lx-pr']]);
  const fs = ['a.tmp', 'b.tmp', 'my notes.tmp'];
  fs.forEach((f, i) => box(S, 'f' + i, 1, 8.4 + i * 2, 7.2, 1.7, f, 'line', 1, { pct: 25 }));
  ar(S, 'a1', [8.4, 10.4], [11.4, 10.4], 'ink-3', 1, { h: .12 });
  box(S, 'x', 11.6, 9.4, 6, 2, 'xargs', 'accent', 1, { pct: 40 }); T(S, 'xl', 11.6, 11.8, ['줄을 모아 인자로', 'lines → arguments'], 'cz-tc lx-xs', 1, { w: 6 });
  box(S, 'cmd', 20, 9.4, 11, 2, 'rm a.tmp b.tmp my notes.tmp', 'line', 1, { pct: 25, off: 4 }); ar(S, 'a2', [17.7, 10.4], [19.9, 10.4], 'ink-3', 1, { h: .12 });
  T(S, 'n2', 1, 15, ['$( ) 명령 치환: 출력을 그 자리에 끼워 넣어요 · 파일이 수만 개면 “Argument list too long”', '$( ) command substitution pastes output in place · with tens of thousands of files: “Argument list too long”'], 'lx-xs', 2);
  ['my', 'notes.tmp'].forEach((w, i) => box(S, 'w' + i, 20 + i * 5.6, 12.6, 5.2, 1.6, w, 'danger', 3, { pct: 40, off: 4 }));
  T(S, 'n3', 1, 16.4, ['공백이 든 이름은 둘로 쪼개져 엉뚱한 파일을 지워요', 'a name with a space splits in two and the wrong files get deleted'], 'lx-xs lx-r', 3);
  box(S, 'cmd2', 20, 9.4, 11, 2, ['rm a.tmp b.tmp "my notes.tmp"', 'rm a.tmp b.tmp "my notes.tmp"'], 'ok', 4, { pct: 40 });
  T(S, 'n4', 1, 17.8, ['-print0 | xargs -0: NUL 문자로 구분해 안전', '-print0 | xargs -0 separates with NUL bytes: safe'], 'lx-xs lx-g', 4);
  T(S, 'n5', 1, 19.2, ['-P 8은 8개를 병렬로 · -I{}는 자리 표시자 · GNU parallel도 있어요', '-P 8 runs eight at a time · -I{} is a placeholder · GNU parallel does more'], 'lx-xs', 5);
  S.cap(1, 'xargs는 입력 줄들을 명령의 인자로 붙여 실행해요', 'xargs turns input lines into arguments for a command')
    .cap(2, '$( )로 출력을 인자에 끼워 넣을 수도 있지만', '$( ) can paste output into arguments too')
    .cap(3, '공백이 든 파일 이름이 쪼개지는 함정이 있어요', 'but names with spaces get split apart')
    .cap(4, 'NUL로 구분하면 어떤 이름이든 안전해요', 'NUL separators keep any name intact')
    .cap(5, '병렬 실행까지 한 줄로', 'Parallel runs in a single line, too');
  return S;
}

/* ================= shell scripting ================= */
function sQuote() {
  const S = scene({ id: 'lx-quote', steps: 5, per: 1.4 });
  term(S, 't', 1, 1.4, 19, [["$ f='my file.txt'", 0, 'lx-pr'], ['$ rm $f', 1, 'lx-pr'], ["rm: cannot remove 'my'", 1, 'lx-er'], ["rm: cannot remove 'file.txt'", 1, 'lx-er'], ['$ rm "$f"', 2, 'lx-pr'], ["$ echo '$HOME'", 3, 'lx-pr'], ['$HOME', 3], ['$ echo "$HOME/$(date +%F)"', 4, 'lx-pr'], ['/home/alice/2026-11-09', 4]]);
  T(S, 'h', 21.4, 1.6, ['rm이 받는 인자', 'arguments rm receives'], 'lx-xs', 1);
  box(S, 'a1', 21.4, 3, 4.4, 1.8, 'my', 'danger', 1, { pct: 40, off: 2 }); box(S, 'a2', 26.2, 3, 4.8, 1.8, 'file.txt', 'danger', 1, { pct: 40, off: 2 });
  box(S, 'b1', 21.4, 3, 9.6, 1.8, 'my file.txt', 'ok', 2, { pct: 45 });
  T(S, 'n1', 21.4, 5.4, ['따옴표 없으면 공백에서 쪼개져요', 'unquoted, it splits at spaces'], 'lx-xs lx-r', 1); T(S, 'n2', 21.4, 6.7, ['"$f"는 한 덩어리 그대로', '"$f" stays one piece'], 'lx-xs lx-g', 2);
  T(S, 'n3', 21.4, 8.4, ["'작은따옴표': 아무것도 안 펼침", "'single': nothing expands"], 'lx-xs', 3); T(S, 'n4', 21.4, 9.7, ['"큰따옴표": $변수·$( )만 펼침', '"double": only $vars and $( )'], 'lx-xs', 4);
  T(S, 'o1', 1, 14.6, ['셸이 명령줄을 펼치는 순서', 'the order the shell expands a command line'], 'lx-s', 5);
  ['{a,b}', '~', ['$변수·$( )', '$var · $( )'], ['단어 분리', 'word splitting'], ['글로브 *', 'globs *']].forEach((t, i) => { box(S, 'o' + (i + 2), 1 + i * 6.1, 16, 5.6, 1.8, t, i === 3 ? 'danger' : 'accent', 5, { pct: 30 }); if (i) ar(S, 'oa' + i, [1 + i * 6.1 - .5, 16.9], [1 + i * 6.1 - .05, 16.9], 'ink-3', 5, { h: .1 }); });
  T(S, 'o7', 1, 18.6, ['변수는 거의 항상 "$var"로 감싸세요 · shellcheck가 빠뜨린 곳을 알려줘요', 'quote variables almost always as "$var" · shellcheck flags the ones you miss'], 'lx-xs lx-g', 5);
  S.cap(1, '따옴표 없는 변수는 공백에서 여러 인자로 쪼개져요', 'An unquoted variable splits into several arguments at spaces')
    .cap(2, '큰따옴표로 감싸면 한 인자로 전달돼요', 'Double quotes keep it as one argument')
    .cap(3, '작은따옴표 안은 글자 그대로', 'Inside single quotes everything is literal')
    .cap(4, '큰따옴표 안에서도 변수와 명령 치환은 펼쳐져요', 'Double quotes still expand variables and command substitution')
    .cap(5, '셸 확장과 따옴표', 'Shell expansion and quoting');
  return S;
}
function sExit() {
  const S = scene({ id: 'lx-exit', steps: 5, per: 1.4 });
  box(S, 'mk', 1, 4, 6, 2.2, 'make', 'accent', 0); box(S, 'ok', 13, 1.6, 7, 2.2, './app', 'ok', 2); box(S, 'ng', 13, 6.6, 7, 2.2, ['echo 실패', 'echo failed'], 'danger', 3);
  ar(S, 'a1', [7.1, 4.6], [12.9, 2.8], 'ok', 2, { h: .14 }); T(S, 'a1l', 8.4, 2.6, '$? = 0  &&', 'cz-mono lx-xs lx-g', 2);
  ar(S, 'a2', [7.1, 5.6], [12.9, 7.6], 'danger', 3, { h: .14 }); T(S, 'a2l', 8.4, 7.4, '$? ≠ 0  ||', 'cz-mono lx-xs lx-r', 3);
  term(S, 't', 21.4, 1.6, 9.6, [['$ ls /nope', 1, 'lx-pr'], ['$ echo $?', 1, 'lx-pr'], ['2', 1, 'lx-er'], ['$ true; echo $?', 1, 'lx-pr'], ['0', 1, 'lx-g']]);
  T(S, 'n1', 1, 10.4, ['0 = 성공, 1~255 = 실패 (의미는 프로그램마다)', '0 = success, 1–255 = failure (meanings vary)'], 'lx-s', 1);
  T(S, 'c', 1, 12.2, 'make && ./app || echo "build failed"', 'cz-mono lx-s', 2);
  T(S, 'p1', 1, 14, ['파이프라인의 종료 코드는 마지막 명령의 것 → 앞에서 실패해도 성공처럼 보여요', 'a pipeline’s status is the last command’s → earlier failures look like success'], 'lx-xs lx-r', 4);
  term(S, 't2', 1, 15.6, 30, [['#!/usr/bin/env bash', 5], [['set -euo pipefail   # 실패하면 멈춤 · 정의 안 된 변수는 에러 · 파이프 중간 실패도 잡기', 'set -euo pipefail   # stop on error · unset variables are errors · catch failures mid-pipe'], 5, 'lx-g']]);
  S.cap(1, '모든 명령은 끝날 때 종료 코드를 남겨요', 'Every command leaves an exit status')
    .cap(2, '&&는 앞 명령이 성공했을 때만 다음을 실행', '&& runs the next command only on success')
    .cap(3, '||는 실패했을 때만 실행', '|| runs it only on failure')
    .cap(4, '파이프라인은 마지막 명령만 보는 함정이 있어요', 'Pipelines only report the last command, a common trap')
    .cap(5, '스크립트 첫 줄 다음엔 set -euo pipefail', 'Start scripts with set -euo pipefail');
  return S;
}
function sEnv() {
  const S = scene({ id: 'lx-env', steps: 5, per: 1.4 });
  T(S, 'pv', 1, 1.2, 'PATH=/usr/local/bin:/usr/bin:/bin', 'cz-mono lx-s');
  const D = ['/usr/local/bin', '/usr/bin', '/bin'];
  box(S, 'hb', 1, 3, 11, 1.9, '~/bin', 'warn', 4, { pct: 35 });
  D.forEach((d, i) => box(S, 'd' + i, 1, 5.4 + i * 2.4, 11, 1.9, d, 'line', 0, { pct: 25 }));
  T(S, 'q', 19, 2.6, ['python3 을 입력하면…', 'you type python3 …'], 'lx-s', 1);
  T(S, 'm0', 12.4, 5.8, ['✗ 없음', '✗ not here'], 'lx-xs lx-r', 2); T(S, 'm1', 12.4, 8.2, ['✓ 여기서 실행', '✓ runs this one'], 'lx-xs lx-g', 2, { off: 4 }); T(S, 'm2', 12.4, 10.6, ['(더 안 찾음)', '(not searched)'], 'lx-xs', 2);
  tsets(S, 'd1', [[2, 'ok', 45], [4, 'line', 25]]); tsets(S, 'hb', [[4, 'ok', 50]]); T(S, 'm3', 12.4, 3.4, ['✓ 앞에 둔 것이 이겨요', '✓ the earlier entry wins'], 'lx-xs lx-g', 4);
  term(S, 't', 19, 4.6, 12, [['$ which python3', 3, 'lx-pr'], ['/usr/bin/python3', 3], [['$ export PATH="$HOME/bin:$PATH"', '$ export PATH="$HOME/bin:$PATH"'], 4, 'lx-pr']]);
  T(S, 'n1', 1, 13.4, ['환경 변수는 자식 프로세스에 복사돼요 (부모에는 영향 없음)', 'environment variables are copied into child processes (never back to the parent)'], 'lx-s', 5);
  box(S, 'sh', 1, 15, 7, 2, ['셸', 'shell'], 'accent', 5); box(S, 'ch', 12, 15, 9, 2, ['자식: python app.py', 'child: python app.py'], 'ok', 5); ar(S, 'cpa', [8.1, 16], [11.9, 16], 'ink-3', 5, { h: .12 });
  T(S, 'n2', 22, 15, ['VAR=1 cmd: 한 번만', 'VAR=1 cmd: one-off'], 'cz-mono lx-xs', 5); T(S, 'n3', 22, 16.3, ['~/.bashrc에 export', 'export in ~/.bashrc'], 'cz-mono lx-xs', 5);
  T(S, 'n4', 1, 18.6, ['비밀번호·API 키를 환경 변수로 넘기는 12-factor 앱 방식 · 단, ps나 로그에 새지 않게 조심', 'the 12-factor way to pass passwords and API keys · just don’t leak them into ps output or logs'], 'lx-xs', 5);
  S.cap(1, '명령 이름만 입력하면 셸이 PATH에서 찾아요', 'Type a bare command name and the shell searches PATH')
    .cap(2, '앞 디렉터리부터 차례로 보고 처음 찾은 걸 실행', 'It checks each directory in order and runs the first match')
    .cap(3, 'which로 어느 것이 실행되는지 확인', 'which tells you which one will run')
    .cap(4, 'PATH 앞에 넣은 디렉터리가 우선해요', 'Directories added at the front take priority')
    .cap(5, '환경 변수는 자식에게만 물려줘요', 'Environment variables flow only to children');
  return S;
}
function sScript() {
  const S = scene({ id: 'lx-script', steps: 5, per: 1.4 });
  const L = ['#!/usr/bin/env bash', 'set -euo pipefail', 'src="$1"; dest="${2:-/backup}"', 'if [ ! -d "$src" ]; then', '  echo "no dir: $src" >&2; exit 1', 'fi', 'for f in "$src"/*.conf; do', '  cp "$f" "$dest/"', 'done'];
  rect(S, 'bg', 1, 1.4, 16, L.length * 1.25 + .7, 'ink', 9, 0, { r: .4 });
  rect(S, 'hl', 1.2, 1.6, 15.6, 2.6, 'accent', 22, 1, { r: .2 }); S.move('hl', 2, 1.2, 1.6 + 2 * 1.25); S.set('hl', 2, { height: '1.25em' }); S.move('hl', 3, 1.2, 1.6 + 3 * 1.25); S.set('hl', 3, { height: '3.75em' }); S.move('hl', 4, 1.2, 1.6 + 6 * 1.25);
  L.forEach((l, i) => T(S, 'l' + i, 1.5, 1.75 + i * 1.25, l, 'cz-mono lx-tm', 0, { css: 'z-index:6' }));
  T(S, 'e1', 18.4, 1.6, ['#! 첫 줄: 어떤 인터프리터로 실행할지', '#! line: which interpreter runs it'], 'lx-xs', 1); T(S, 'e1b', 18.4, 2.9, '$ chmod +x backup.sh', 'cz-mono lx-xs', 1);
  T(S, 'e2', 18.4, 4.6, ['$1, $2 인자 · $# 개수 · "$@" 전부', '$1, $2 args · $# count · "$@" all'], 'cz-mono lx-xs', 2); T(S, 'e2b', 18.4, 5.9, ['${2:-기본값}: 없으면 기본값', '${2:-default}: fallback value'], 'cz-mono lx-xs', 2);
  T(S, 'e3', 18.4, 7.6, ['[ -d 디렉터리 ] [ -f 파일 ] [ -z 빈 문자열 ]', '[ -d dir ] [ -f file ] [ -z empty ]'], 'cz-mono lx-xs', 3); T(S, 'e3b', 18.4, 8.9, ['>&2 에러 출력 · exit 1 실패 종료', '>&2 to stderr · exit 1 = failure'], 'cz-mono lx-xs', 3);
  T(S, 'e4', 18.4, 10.6, ['글로브로 파일을 돌고, 변수는 따옴표로', 'loop over a glob; quote every variable'], 'lx-xs', 4);
  term(S, 't', 1, 14.4, 16, [['$ ./backup.sh /etc/nginx', 4, 'lx-pr'], ['$ ./backup.sh /nope', 4, 'lx-pr'], ['no dir: /nope', 4, 'lx-er']]);
  T(S, 'f1', 18.4, 14.6, ['shellcheck로 흔한 실수를 잡아요', 'shellcheck catches common mistakes'], 'lx-xs lx-g', 5);
  T(S, 'f2', 18.4, 15.9, ['100줄을 넘거나 자료구조가 필요하면', 'past ~100 lines or with real data'], 'lx-xs', 5); T(S, 'f3', 18.4, 17.1, ['파이썬으로 옮기는 게 좋아요', 'structures, move to Python'], 'lx-xs', 5);
  S.cap(1, '#!과 실행 권한이 있으면 명령처럼 실행돼요', 'With #! and the execute bit, a script runs like a command')
    .cap(2, '위치 인자로 입력을 받고 기본값을 정해요', 'Positional arguments bring input, with defaults')
    .cap(3, '[ ] 조건으로 검사하고 실패하면 종료 코드를 남겨요', 'Test conditions in [ ] and exit with a failure code')
    .cap(4, 'for로 여러 파일을 돌며 처리', 'for loops over many files')
    .cap(5, '셸 스크립트: 명령을 엮어 자동화', 'Shell scripts: automation by chaining commands');
  return S;
}
function sJobs() {
  const S = scene({ id: 'lx-jobs', steps: 5, per: 1.4 });
  term(S, 't', 1, 1.4, 15.4, [['$ ./build.sh &', 1, 'lx-pr'], ['[1] 4211', 1], ['$ vim notes.md', 2, 'lx-pr'], ['^Z', 2, 'lx-er'], ['[2]+  Stopped   vim notes.md', 2], ['$ jobs', 3, 'lx-pr'], ['[1]-  Running   ./build.sh &', 3], ['[2]+  Stopped   vim notes.md', 3], ['$ fg %2', 4, 'lx-pr']]);
  nd(S, 'fg', 24, 3, 7, ['포그라운드', 'foreground'], 'accent', 0); nd(S, 'bg', 19.6, 10, 7, ['백그라운드', 'background'], 'ok', 0); nd(S, 'sp', 28.2, 10, 6, ['정지', 'stopped'], 'warn', 0);
  ar(S, 'a1', [22.4, 3.9], [20.4, 9.1], 'ok', 1, { h: .12 }); T(S, 'a1l', 18.6, 5.8, '& · bg', 'cz-mono lx-xs lx-g', 1);
  ar(S, 'a2', [25.8, 3.9], [27.8, 9.1], 'warn', 2, { h: .12 }); T(S, 'a2l', 27.6, 5.8, 'Ctrl+Z', 'cz-mono lx-xs lx-w', 2);
  ar(S, 'a3', [25.2, 10], [23.2, 10], 'ok', 3, { h: .12 }); T(S, 'a3l', 23.4, 11.2, 'bg', 'cz-mono lx-xs', 3);
  ar(S, 'a4', [20.8, 9.1], [22.8, 3.9], 'accent', 4, { h: .12 }); T(S, 'a4l', 21.8, 6.6, 'fg', 'cz-mono lx-xs lx-a', 4);
  T(S, 'n1', 1, 14.6, ['터미널을 닫으면 SIGHUP으로 작업이 함께 죽어요', 'closing the terminal sends SIGHUP and the jobs die with it'], 'lx-xs lx-r', 5);
  T(S, 'n2', 1, 15.9, ['nohup·disown으로 떼어 놓거나, tmux·screen 세션에서 돌리면 접속이 끊겨도 계속', 'detach with nohup or disown, or run inside tmux or screen so jobs survive a disconnect'], 'lx-xs', 5);
  T(S, 'n3', 1, 17.2, ['계속 돌아야 하는 서비스는 systemd에 맡겨요', 'long-running services belong to systemd'], 'lx-xs lx-g', 5);
  S.cap(1, '&를 붙이면 백그라운드에서 돌고 프롬프트가 바로 돌아와요', 'A trailing & runs it in the background and frees the prompt')
    .cap(2, 'Ctrl+Z는 포그라운드 작업을 잠시 멈춰요', 'Ctrl+Z pauses the foreground job')
    .cap(3, 'jobs로 목록을 보고 bg로 뒤에서 계속', 'jobs lists them; bg resumes one in the background')
    .cap(4, 'fg로 다시 앞으로 가져와요', 'fg brings it back to the front')
    .cap(5, '작업 제어와 세션 유지', 'Job control and keeping sessions alive');
  return S;
}

/* ================= system administration ================= */
function sTop() {
  const S = scene({ id: 'lx-top', steps: 5, per: 1.4 });
  const L = ['top - 10:14 up 12 days,  load average: 3.10, 2.40, 1.80', 'Tasks: 214 total, 3 running   %Cpu(s): 72 us, 6 sy, 20 id, 2 wa', 'MiB Mem: 15890 total, 820 free, 6100 used, 8970 buff/cache', 'MiB avail: 9200', '', '  PID USER      %CPU %MEM  RES   COMMAND', ' 4211 app       180 12.5  2.0g  java', '  912 postgres    45  8.1  1.3g  postgres', '   77 root         3  0.2   12m  sshd'];
  rect(S, 'bg', 1, 1.2, 30, L.length * 1.2 + .7, 'ink', 9, 0, { r: .4 });
  const hl = (k, line, n, st) => rect(S, k, 1.2, 1.45 + line * 1.2, 29.6, n * 1.2, 'accent', 22, st, { r: .2, off: st + 1 });
  hl('h1', 0, 1, 1); hl('h2', 1, 1, 2); hl('h3', 2, 2, 3); hl('h4', 6, 3, 4);
  L.forEach((l, i) => T(S, 'l' + i, 1.5, 1.55 + i * 1.2, l, 'cz-mono lx-tm', 0, { css: 'z-index:6' }));
  const y0 = 13.2;
  T(S, 'e1', 1, y0, ['load average: 실행 중이거나 기다리는 프로세스 수의 1·5·15분 평균 → 코어 4개에서 3.1이면 아직 여유', 'load average: runnable plus waiting tasks averaged over 1, 5 and 15 minutes → 3.1 on 4 cores still has headroom'], 'lx-xs', 1);
  T(S, 'e2', 1, y0 + 1.4, ['us 사용자 코드 · sy 커널 · id 놀고 있음 · wa 디스크 I/O 대기 (높으면 디스크가 병목)', 'us user code · sy kernel · id idle · wa waiting on disk I/O (high means the disk is the bottleneck)'], 'lx-xs', 2);
  T(S, 'e3', 1, y0 + 2.8, ['free가 작아도 괜찮아요: buff/cache는 필요하면 비워 줘요 → avail을 보세요', 'a small free is fine: buff/cache is handed back on demand → watch avail'], 'lx-xs lx-g', 3);
  T(S, 'e4', 1, y0 + 4.2, ['%CPU 180 = 코어 약 2개 분량 · RES = 실제 쓰는 메모리 · P, M 키로 정렬', '%CPU 180 = about two cores · RES = memory actually in use · sort with P and M'], 'lx-xs', 4);
  T(S, 'e5', 1, y0 + 5.6, ['htop(보기 편함) · ps aux --sort=-%cpu · vmstat 1 · iostat -x 1 · pidstat', 'htop (friendlier) · ps aux --sort=-%cpu · vmstat 1 · iostat -x 1 · pidstat'], 'cz-mono lx-xs', 5);
  S.cap(1, 'load average는 CPU를 기다리는 일의 양', 'Load average is how much work is waiting for CPUs')
    .cap(2, 'CPU 시간이 어디에 쓰이는지 나눠 보여줘요', 'CPU time broken down by where it goes')
    .cap(3, '리눅스는 남는 메모리를 캐시로 써요', 'Linux uses spare memory as cache')
    .cap(4, '어떤 프로세스가 자원을 먹는지', 'Which processes are eating resources')
    .cap(5, '서버가 느릴 때 가장 먼저 보는 화면', 'The first screen to check when a server is slow');
  return S;
}
function sSystemd() {
  const S = scene({ id: 'lx-systemd', steps: 5, per: 1.4 });
  const U = ['[Unit]', 'Description=My API', 'After=network.target', '[Service]', 'ExecStart=/opt/api/bin/server', 'Restart=on-failure', 'User=api', '[Install]', 'WantedBy=multi-user.target'];
  T(S, 'fn', 1, .9, '/etc/systemd/system/api.service', 'cz-mono lx-xs');
  rect(S, 'bg', 1, 2, 14, U.length * 1.2 + .7, 'ink', 9, 0, { r: .4 }); rect(S, 'hl', 1.2, 2.25 + 5 * 1.2, 13.6, 1.2, 'warn', 25, 3, { r: .2 });
  U.forEach((l, i) => T(S, 'u' + i, 1.5, 2.35 + i * 1.2, l, 'cz-mono lx-tm ' + (l[0] === '[' ? 'lx-a' : ''), 0, { css: 'z-index:6' }));
  term(S, 't', 16.6, 2, 14.4, [['$ systemctl enable --now api', 2, 'lx-pr'], ['$ systemctl status api', 2, 'lx-pr'], ['● api.service - My API', 2], ['  Active: active (running)', 2, 'lx-g'], ['$ journalctl -u api -f', 4, 'lx-pr'], ['Nov 09 10:14 api: listening :8080', 4]]);
  nd(S, 'r', 19.6, 12.6, 5.4, ['실행 중', 'running'], 'ok', 3); nd(S, 'f', 27.4, 12.6, 5, ['죽음', 'crashed'], 'danger', 3);
  ar(S, 'ra', [22.4, 12.2], [24.8, 12.2], 'danger', 3, { h: .12 }); ar(S, 'fa', [24.8, 13.1], [22.4, 13.1], 'ok', 3, { h: .12 }); T(S, 'fal', 20.6, 14.2, ['자동 재시작', 'auto restart'], 'cz-tc lx-xs lx-g', 3, { w: 6 });
  T(S, 'n2', 1, 14.4, ['enable: 부팅 때 자동 시작 · --now: 지금도 시작', 'enable: start at boot · --now: start right away too'], 'lx-xs', 2);
  T(S, 'n4', 1, 15.7, ['로그는 journald가 모아 줘요 (시간·우선순위로 필터)', 'journald collects the logs (filter by time and priority)'], 'lx-xs', 4);
  T(S, 'n5', 1, 17.4, ['systemd 타이머(크론 대체), 의존성 순서, cgroup 자원 제한(MemoryMax, CPUQuota)', 'also timers (a cron replacement), dependency ordering, cgroup limits (MemoryMax, CPUQuota)'], 'cz-tc lx-xs', 5, { w: 30 }); T(S, 'n6', 1, 18.6, ['대부분의 리눅스 배포판에서 기본 init이에요', 'the default init on most Linux distributions'], 'cz-tc lx-xs', 5, { w: 30 });
  S.cap(1, '서비스는 유닛 파일로 정의해요', 'A service is described by a unit file')
    .cap(2, 'enable --now로 지금 켜고 부팅 때도 켜지게', 'enable --now starts it now and at every boot')
    .cap(3, '죽으면 Restart 설정대로 다시 살려요', 'If it crashes, Restart brings it back')
    .cap(4, 'journalctl로 서비스 로그를 봐요', 'journalctl shows the service’s logs')
    .cap(5, 'systemd: 리눅스의 서비스 관리자', 'systemd: Linux’s service manager');
  return S;
}
function sDisk() {
  const S = scene({ id: 'lx-disk', steps: 5, per: 1.4 });
  T(S, 'h', 1, 1, '$ df -h', 'cz-mono lx-s lx-a');
  [['/', '50G', .92, 'danger'], ['/data', '500G', .24, 'ok']].forEach(([m, sz, u, c], i) => { T(S, 'm' + i, 1, 2.6 + i * 2.4, m, 'cz-mono lx-s'); rect(S, 'bb' + i, 6, 2.4 + i * 2.4, 18, 1.6, 'line', 25, 0, { r: .3 }); rect(S, 'bu' + i, 6, 2.4 + i * 2.4, 18 * u, 1.6, c, 50, 0, { r: .3 }); T(S, 'p' + i, 24.6, 2.6 + i * 2.4, `${Math.round(u * 100)}% / ${sz}`, 'cz-mono lx-xs', 0); });
  term(S, 't', 1, 7.6, 14, [['$ du -sh /var/* | sort -h', 2, 'lx-pr'], ['120M  /var/cache', 2], ['2.1G  /var/lib', 2], ['30G   /var/log', 2, 'lx-er']]);
  T(S, 'mt', 16.6, 7.6, '$ mount /dev/sdb1 /data', 'cz-mono lx-xs lx-a', 3);
  nd(S, 'root', 21, 10, 3, '/', 'accent', 3); nd(S, 'dd', 25.4, 13.4, 4.4, '/data', 'ok', 3); link(S, 'rl', [21, 10], [25.4, 13.4], 3);
  box(S, 'dev', 16.6, 12.6, 5.6, 1.8, '/dev/sdb1', 'ink-3', 3, { pct: 25 }); ar(S, 'da', [22.3, 13.5], [23.1, 13.5], 'ok', 3, { h: .12 });
  T(S, 'fs', 16.6, 15.2, ['/etc/fstab에 적으면 부팅 때 자동', 'list it in /etc/fstab to mount at boot'], 'lx-xs', 3);
  T(S, 'n4', 1, 14, ['“No space left”인데 df엔 여유?', '“No space left” but df shows room?'], 'lx-xs lx-r', 4);
  T(S, 'n4b', 1, 15.2, ['→ df -i: 작은 파일이 많아 inode가 바닥', '→ df -i: tiny files used up the inodes'], 'cz-mono lx-xs', 4);
  T(S, 'n4c', 1, 16.4, ['→ 지웠는데 열린 파일: lsof +L1', '→ deleted but still open: lsof +L1'], 'cz-mono lx-xs', 4);
  T(S, 'n5', 1, 18.6, ['ncdu로 둘러보기 · logrotate로 로그 관리 · journalctl --vacuum-size=1G', 'browse with ncdu · tame logs with logrotate · journalctl --vacuum-size=1G'], 'cz-mono lx-xs', 5);
  S.cap(1, 'df는 파일 시스템별 사용량을 보여줘요', 'df shows usage per filesystem')
    .cap(2, 'du로 어떤 폴더가 큰지 찾아요', 'du finds which folders are big')
    .cap(3, '새 디스크는 디렉터리에 마운트해서 붙여요', 'A new disk is attached by mounting it on a directory')
    .cap(4, '공간이 남아도 inode나 열린 파일 때문에 꽉 찰 수 있어요', 'It can still be “full” from inodes or open deleted files')
    .cap(5, '디스크가 찼을 때 확인할 것들', 'What to check when a disk fills up');
  return S;
}
function sPkg() {
  const S = scene({ id: 'lx-pkg', steps: 5, per: 1.4 });
  term(S, 't', 1, 1.2, 14.6, [['$ sudo apt update', 1, 'lx-pr'], [['패키지 목록 새로 받기', 'refresh the package index'], 1], ['$ sudo apt install nginx', 2, 'lx-pr'], ['$ apt upgrade', 5, 'lx-pr']]);
  nd(S, 'n', 23, 2.4, 6, 'nginx', 'accent', 2); const D = [['nginx-common', 17.6, 'line'], ['libssl3', 23, 'ink-3'], ['libpcre2-8-0', 28.4, 'line']];
  D.forEach(([d, x, c], i) => { nd(S, 'd' + i, x, 6.6, 5.2, d, c, 2, { pct: c === 'ink-3' ? 18 : 30 }); link(S, 'dl' + i, [23, 2.4], [x, 6.6], 2); });
  T(S, 'dn', 17.6, 8.2, ['회색: 이미 설치됨', 'gray: already installed'], 'lx-xs', 2);
  box(S, 'repo', 1, 8.6, 11, 2.4, ['저장소 미러', 'repository mirror'], 'ok', 3); ar(S, 'ra', [12.1, 9.8], [16.4, 9.8], 'ok', 3, { h: .14 });
  T(S, 'rl', 1, 11.4, ['.deb 파일을 받고 서명(GPG)을 확인', 'download .deb files and check their GPG signatures'], 'lx-xs', 3);
  T(S, 'fl', 16.6, 10.6, ['/usr/sbin/nginx · /etc/nginx/ · systemd 유닛', '/usr/sbin/nginx · /etc/nginx/ · a systemd unit'], 'cz-mono lx-xs', 4); T(S, 'fl2', 16.6, 11.9, ['dpkg가 파일을 풀고 설치 스크립트 실행', 'dpkg unpacks files and runs install scripts'], 'lx-xs', 4);
  T(S, 'u', 1, 13.6, ['update는 목록만, upgrade가 실제 업그레이드', 'update refreshes the list; upgrade actually upgrades'], 'lx-xs lx-r', 5);
  T(S, 'o1', 1, 15.4, ['데비안·우분투 apt · 레드햇·페도라 dnf · 알파인 apk · macOS brew', 'Debian/Ubuntu apt · Red Hat/Fedora dnf · Alpine apk · macOS brew'], 'cz-mono lx-xs', 5);
  T(S, 'o2', 1, 16.8, ['pip·npm 같은 언어별 패키지 관리자와는 따로 움직여요 · 시스템 파이썬에 pip install은 피하고 venv를', 'language managers such as pip and npm are separate · avoid pip-installing into the system Python; use a venv'], 'lx-xs', 5);
  S.cap(1, '먼저 저장소의 최신 패키지 목록을 받고', 'First fetch the latest package index')
    .cap(2, '설치할 패키지의 의존성을 계산해요', 'Then resolve the package’s dependencies')
    .cap(3, '필요한 것만 저장소에서 받아 서명을 확인하고', 'Download only what’s missing and verify signatures')
    .cap(4, '정해진 위치에 파일을 풀어 설치해요', 'and unpack the files into their standard places')
    .cap(5, '패키지 관리자: 소프트웨어 설치·업데이트의 표준 경로', 'Package managers: the standard way to install and update');
  return S;
}
function sCron() {
  const S = scene({ id: 'lx-cron', steps: 5, per: 1.4 });
  T(S, 'line', 1, 1, '*/15  9-18  *  *  1-5   /opt/backup.sh >> /var/log/backup.log 2>&1', 'cz-mono lx-s');
  [['*/15', ['분: 15분마다', 'minute: every 15']], ['9-18', ['시: 9시~18시', 'hour: 9 to 18']], ['*', ['일: 매일', 'day of month: any']], ['*', ['월: 매월', 'month: any']], ['1-5', ['요일: 월~금', 'weekday: Mon–Fri']]].forEach(([f, d], i) => { box(S, 'f' + i, 1 + i * 6.1, 2.8, 5.6, 1.8, f, 'accent', 1, { pct: 40 }); T(S, 'fd' + i, 1 + i * 6.1, 4.9, d, 'cz-tc lx-xs', 2, { w: 5.6 }); });
  const days = [['월', 'Mon'], ['화', 'Tue'], ['수', 'Wed'], ['목', 'Thu'], ['금', 'Fri'], ['토', 'Sat'], ['일', 'Sun']], X = h => 4 + h * 1.1;
  hl(S, 'ax', X(0), X(24), 14.8, 'ink-3', 3, { w: .08 }); [0, 6, 9, 12, 18, 24].forEach(h => T(S, 'hx' + h, X(h) - 1, 15, `${h}:00`, 'cz-tc cz-mono lx-xs', 3, { w: 2 }));
  days.forEach((d, i) => { const y = 6.6 + i * 1.15; T(S, 'dl' + i, 1, y - .1, d, 'lx-xs', 3); hl(S, 'dr' + i, X(0), X(24), y + .35, 'line', 3, { w: .06 }); if (i < 5) for (let h = 9; h < 19; h += .25) vl(S, `t${i}_${h}`, X(h), y, y + .7, 'ok', 3, { w: .1 }); });
  T(S, 'n4', 1, 16.2, ['함정: 크론의 환경은 최소한(PATH가 짧음) · 출력은 리다이렉션하지 않으면 사라져요', 'gotchas: cron’s environment is minimal (short PATH) · output vanishes unless redirected'], 'cz-tc lx-xs lx-r', 4, { w: 30 }); T(S, 'n4b', 1, 17.4, ['서버 시간대 기준 · 이전 실행이 안 끝났으면 겹쳐요 (flock -n으로 막기)', 'times follow the server’s zone · runs can overlap (guard with flock -n)'], 'cz-tc lx-xs lx-r', 4, { w: 30 });
  T(S, 'n5', 1, 18.9, ['crontab -e로 편집 · 대안: systemd 타이머, 쿠버네티스 CronJob · 표현식 확인은 crontab.guru', 'edit with crontab -e · alternatives: systemd timers, Kubernetes CronJobs · check at crontab.guru'], 'cz-tc lx-xs', 5, { w: 30 });
  S.cap(1, '크론 표현식은 다섯 칸: 분 시 일 월 요일', 'A cron expression has five fields: minute, hour, day, month, weekday')
    .cap(2, '*/15는 15분마다, 1-5는 월~금', '*/15 means every 15 minutes; 1-5 means Monday to Friday')
    .cap(3, '평일 근무 시간 동안 15분마다 실행돼요', 'It fires every 15 minutes during weekday working hours')
    .cap(4, '크론 작업이 조용히 실패하는 흔한 이유들', 'Common reasons cron jobs fail silently')
    .cap(5, '크론: 정해진 시간에 명령 실행', 'cron: run commands on a schedule');
  return S;
}
function sLogs() {
  const S = scene({ id: 'lx-logs', steps: 5, per: 1.4 });
  term(S, 't', 1, 1.2, 18, [['$ tail -f /var/log/app.log', 1, 'lx-pr'], ['10:14:01 INFO  GET /health 200', 1], ['10:14:02 ERROR db timeout', 1, 'lx-er'], ['10:14:03 INFO  GET /items 200', 1], ['$ tail -f app.log | grep ERROR', 2, 'lx-pr'], ['10:14:02 ERROR db timeout', 2, 'lx-er'], ['$ journalctl -u api --since "1 hour ago" -p err', 3, 'lx-pr']]);
  T(S, 'n1', 20.4, 1.6, ['-f: 새 줄이 생길 때마다 계속 출력', '-f keeps printing new lines'], 'lx-xs', 1); T(S, 'n2', 20.4, 3, ['grep으로 관심 있는 줄만', 'grep keeps the interesting ones'], 'lx-xs', 2);
  T(S, 'n3', 20.4, 4.4, ['서비스·시간·우선순위로 걸러 보기', 'filter by service, time and priority'], 'lx-xs', 3);
  T(S, 'r0', 1, 11, ['logrotate (매일, 7개 보관, 압축)', 'logrotate (daily, keep 7, compress)'], 'lx-s', 4);
  const R = ['app.log', 'app.log.1', 'app.log.2.gz', '…', 'app.log.7.gz'];
  R.forEach((r, i) => { box(S, 'r' + i, 1 + i * 6, 12.6, 5.4, 1.8, r, i ? (i === 4 ? 'danger' : 'line') : 'accent', 4, { pct: i ? 25 : 40 }); if (i) ar(S, 'ra' + i, [1 + i * 6 - .5, 13.5], [1 + i * 6 - .05, 13.5], 'ink-3', 4, { h: .1 }); });
  T(S, 'rd', 25, 14.8, ['가장 오래된 것은 삭제', 'the oldest is deleted'], 'lx-xs lx-r', 4);
  T(S, 'n5', 1, 16.8, ['서버가 여러 대면 한곳으로 모아 검색: ELK(Elasticsearch·Kibana), Loki·Grafana, 클라우드 로깅', 'with many servers, ship logs to one place: ELK (Elasticsearch, Kibana), Loki and Grafana, or cloud logging'], 'lx-xs', 5);
  T(S, 'n6', 1, 18.1, ['JSON 같은 구조화 로그로 남기면 필드로 거르기 쉬워요', 'structured logs (JSON) are easy to filter by field'], 'lx-xs lx-g', 5);
  S.cap(1, 'tail -f로 로그를 실시간으로 따라가요', 'tail -f follows a log live')
    .cap(2, '파이프로 거르면 필요한 줄만', 'Pipe it through a filter for the lines you need')
    .cap(3, 'systemd 서비스는 journalctl로', 'systemd services log to journalctl')
    .cap(4, 'logrotate가 로그가 디스크를 채우지 않게 돌려요', 'logrotate rotates logs before they fill the disk')
    .cap(5, '로그 보기와 관리', 'Reading and managing logs');
  return S;
}

/* ================= remote & network ================= */
function sSsh() {
  const S = scene({ id: 'lx-ssh', steps: 5, per: 1.4 });
  rect(S, 'lp', 1, 1.4, 12, 11.6, 'accent', 8, 0, { r: .5 }); T(S, 'lpt', 1.6, 1.8, ['내 노트북', 'my laptop'], 'lx-s lx-a');
  rect(S, 'sv', 19, 1.4, 12, 11.6, 'ok', 8, 0, { r: .5 }); T(S, 'svt', 19.6, 1.8, ['서버', 'server'], 'lx-s lx-g');
  box(S, 'pk', 1.6, 3.6, 10.8, 1.8, ['🔑 id_ed25519 (개인 키)', '🔑 id_ed25519 (private key)'], 'danger', 1, { pct: 30 }); box(S, 'pub', 1.6, 5.8, 10.8, 1.8, 'id_ed25519.pub', 'ok', 1, { pct: 30 });
  T(S, 'kg', 1.6, 8, '$ ssh-keygen -t ed25519', 'cz-mono lx-xs', 1);
  box(S, 'ak', 19.6, 3.6, 10.8, 1.8, '~/.ssh/authorized_keys', 'ok', 2, { pct: 40 }); ar(S, 'cp', [12.5, 6.7], [19.5, 4.5], 'ok', 2, { h: .14 }); T(S, 'cpl', 13, 6.6, 'ssh-copy-id', 'cz-mono lx-xs lx-g', 2);
  ar(S, 'c1', [19.5, 9.2], [12.5, 9.2], 'warn', 3, { h: .14 }); T(S, 'c1l', 13.4, 8.2, ['도전 값', 'challenge'], 'lx-xs lx-w', 3);
  ar(S, 'c2', [12.5, 10.6], [19.5, 10.6], 'accent', 3, { h: .14 }); T(S, 'c2l', 13, 11, ['개인 키로 서명', 'signed with private key'], 'lx-xs lx-a', 3);
  T(S, 'c3', 19.6, 11.6, ['공개 키로 검증 ✓', 'verified with public key ✓'], 'lx-xs lx-g', 3);
  T(S, 'h1', 1, 14.2, ['처음 접속하면 서버의 호스트 키 지문을 확인 → ~/.ssh/known_hosts에 저장', 'on first connect you confirm the server’s host-key fingerprint → saved to ~/.ssh/known_hosts'], 'lx-xs', 4);
  T(S, 'h2', 1, 15.5, ['나중에 지문이 바뀌면 경고: 서버 재설치거나 중간자 공격일 수 있어요', 'a changed fingerprint triggers a warning: a rebuilt server, or a man-in-the-middle'], 'lx-xs lx-r', 4);
  T(S, 'f1', 1, 17.4, ['비밀번호 로그인 끄기(PasswordAuthentication no) · ~/.ssh/config에 Host 별칭', 'disable password logins (PasswordAuthentication no) · Host aliases in ~/.ssh/config'], 'cz-tc lx-xs', 5, { w: 30 }); T(S, 'f1b', 1, 18.6, ['ssh-agent로 암호는 한 번만 · 개인 키 권한은 600', 'ssh-agent unlocks once · keep the private key at mode 600'], 'cz-tc lx-xs', 5, { w: 30 });
  S.cap(1, '키 쌍을 만들어요: 개인 키는 내 컴퓨터에만', 'Create a key pair: the private key never leaves your machine')
    .cap(2, '공개 키를 서버의 authorized_keys에 등록', 'Register the public key in the server’s authorized_keys')
    .cap(3, '접속할 때 서명으로 증명해서 비밀번호가 오가지 않아요', 'Logins are proven by a signature, no password crosses the wire')
    .cap(4, '서버도 호스트 키로 자신을 증명해요', 'The server proves itself with its host key')
    .cap(5, 'SSH 키 인증', 'SSH key authentication');
  return S;
}
function sNetdiag() {
  const S = scene({ id: 'lx-netdiag', steps: 5, per: 1.4 });
  const Lr = [['DNS', 'dig +short api.example.com', '93.184.216.34'], ['IP', 'ping -c 3 93.184.216.34', '3 received, 12 ms'], ['TCP', 'nc -zv api.example.com 443', 'succeeded'], ['HTTP', 'curl -v https://api.example.com/health', 'HTTP/2 200']];
  Lr.forEach(([n, c, r], i) => { const y = 13.4 - i * 3.2, st = i + 1; box(S, 'l' + i, 1, y, 5, 2.6, n, 'accent', 0, { pct: 30 }); T(S, 'c' + i, 7, y + .25, c, 'cz-mono lx-xs', st); T(S, 'r' + i, 7, y + 1.4, '→ ' + r, 'cz-mono lx-xs lx-g', st); T(S, 'ck' + i, 27.6, y + .6, '✓', 'lx-l lx-g', st); tsets(S, 'l' + i, [[st, 'ok', 40]]); });
  T(S, 'ord', 1, 1, ['아래 계층부터 하나씩 확인해요', 'check one layer at a time, bottom up'], 'lx-s', 0);
  T(S, 'f1', 1, 17, ['서버 쪽: ss -tlnp로 어떤 프로세스가 어느 포트에서 듣는지 · 방화벽 확인', 'on the server: ss -tlnp shows which process listens on which port · check the firewall'], 'lx-xs', 5);
  T(S, 'f2', 1, 18.3, ['경로 문제는 traceroute·mtr, 패킷 자체는 tcpdump·Wireshark', 'path problems: traceroute or mtr · the packets themselves: tcpdump or Wireshark'], 'lx-xs', 5);
  S.cap(1, '이름이 IP로 바뀌는지 (DNS)', 'Does the name resolve to an IP? (DNS)')
    .cap(2, '그 IP에 닿는지 (ping)', 'Can we reach that IP? (ping)')
    .cap(3, '포트가 열려 있는지 (TCP)', 'Is the port open? (TCP)')
    .cap(4, '애플리케이션이 제대로 답하는지 (HTTP)', 'Does the application answer properly? (HTTP)')
    .cap(5, '“안 돼요”를 계층별로 쪼개서 찾기', 'Split “it doesn’t work” layer by layer');
  return S;
}
function sTunnel() {
  const S = scene({ id: 'lx-tunnel', steps: 5, per: 1.4 });
  T(S, 'cmd', 1, 1, 'ssh -L 5433:db.internal:5432 alice@bastion', 'cz-mono lx-s');
  rect(S, 'pn', 12, 3.6, 19.6, 7.6, 'ok', 6, 0, { r: .6, css: 'border:.1em dashed var(--ok)' }); T(S, 'pnl', 12.4, 3.9, ['사설 네트워크', 'private network'], 'lx-xs lx-g');
  box(S, 'lp', 1, 6, 7, 3, ['노트북', 'laptop'], 'accent', 0); box(S, 'bs', 13, 6, 7, 3, ['배스천', 'bastion'], 'warn', 0); box(S, 'db', 24.6, 6, 6.4, 3, 'db:5432', 'ok', 0);
  elb(S, 'x', [[8.1, 10.6], [24.4, 10.6], [24.4, 10.6], [27.8, 9.1]], 'danger', 1, { off: 2 }); T(S, 'xl', 9, 11.2, ['직접 접속 ✗ (방화벽)', 'direct connection ✗ (firewall)'], 'lx-xs lx-r', 1, { off: 2 });
  rect(S, 'tn', 8.1, 7.1, 4.8, .8, 'warn', 45, 2, { r: .4 }); T(S, 'tnl', 7.6, 5, ['SSH 암호화 터널', 'encrypted SSH tunnel'], 'lx-xs lx-w', 2);
  ar(S, 'f1', [20.1, 7.5], [24.5, 7.5], 'ok', 3, { h: .14 }); T(S, 'f1l', 20.4, 8.2, ':5432', 'cz-mono lx-xs', 3);
  T(S, 'lpp', 1, 9.4, 'localhost:5433', 'cz-tc cz-mono lx-xs lx-a', 3, { w: 7 });
  term(S, 't', 1, 13.4, 16, [['$ psql -h localhost -p 5433', 4, 'lx-pr'], ['psql (16.4)  connected ✓', 4, 'lx-g']]);
  T(S, 'n1', 18.4, 13.6, ['-R: 반대 방향(원격 포트 → 내 컴퓨터)', '-R: the reverse (remote port → my machine)'], 'lx-xs', 5); T(S, 'n2', 18.4, 14.9, ['-D 1080: SOCKS 프록시', '-D 1080: a SOCKS proxy'], 'cz-mono lx-xs', 5);
  T(S, 'n3', 18.4, 16.2, ['-J bastion: 점프 호스트 거쳐 SSH', '-J bastion: SSH through a jump host'], 'cz-mono lx-xs', 5);
  S.cap(1, '데이터베이스는 사설망 안에 있어 바로 못 들어가요', 'The database sits in a private network, unreachable directly')
    .cap(2, '접근이 허용된 배스천 서버로 SSH 터널을 만들고', 'Open an SSH tunnel to the bastion host you can reach')
    .cap(3, '노트북의 5433 포트를 터널 너머 db:5432로 연결해요', 'Your laptop’s port 5433 is forwarded through it to db:5432')
    .cap(4, '로컬에 접속하듯 원격 DB를 써요', 'Use the remote database as if it were local')
    .cap(5, 'SSH 포트 포워딩', 'SSH port forwarding');
  return S;
}
function sRsync() {
  const S = scene({ id: 'lx-rsync', steps: 5, per: 1.4 });
  T(S, 'cmd', 1, 1, 'rsync -avz --delete src/ backup:/srv/dst/', 'cz-mono lx-s');
  T(S, 'sh', 1, 2.6, 'src/', 'cz-mono lx-s lx-a'); T(S, 'dh', 20, 2.6, 'dst/', 'cz-mono lx-s lx-g');
  const Sx = [['a.txt', ['같음', 'same'], 'line'], ['b.txt', ['바뀜', 'changed'], 'warn'], ['c.txt', ['새 파일', 'new'], 'accent']], Dx = [['a.txt', 'line'], ['b.txt', 'line'], ['d.txt', 'line']];
  Sx.forEach(([f, d, c], i) => { box(S, 's' + i, 1, 4 + i * 2.6, 9, 2, f, 'line', 0, { pct: 25 }); tsets(S, 's' + i, [[1, c, c === 'line' ? 18 : 40]]); T(S, 'sd' + i, 10.4, 4.5 + i * 2.6, d, 'lx-xs', 1); });
  Dx.forEach(([f], i) => box(S, 'd' + i, 20, 4 + i * 2.6, 9, 2, f, 'line', 0, { pct: 25 }));
  box(S, 'd3', 20, 4 + 3 * 2.6, 9, 2, 'c.txt', 'accent', 2, { pct: 40 });
  ar(S, 'b', [14.6, 6.6 + .4], [19.9, 6.6 + .4], 'warn', 2, { h: .1 }); T(S, 'bl', 14.4, 7.8, ['바뀐 블록만', 'changed blocks'], 'lx-xs lx-w', 2);
  ar(S, 'c', [14.6, 9.6 + .4], [19.9, 12.2], 'accent', 2, { h: .14 }); tsets(S, 'd1', [[2, 'warn', 40]]);
  tsets(S, 'd2', [[3, 'danger', 40]]); T(S, 'del', 29.4, 9.7, '✗', 'lx-l lx-r', 3); T(S, 'dell', 20, 14.8, ['--delete: 원본에 없는 파일 삭제', '--delete removes files missing from src'], 'lx-xs lx-r', 3);
  T(S, 's1', 1, 15.4, ['크기·수정 시각으로 비교하고, 바뀐 파일은 롤링 체크섬으로 다른 블록만 전송', 'compare by size and mtime; for changed files send only differing blocks (rolling checksum)'], 'lx-xs', 2);
  T(S, 's4', 1, 16.8, ['끝 슬래시 주의: src/는 내용물을, src는 폴더째로 복사', 'mind the trailing slash: src/ copies the contents, src copies the folder itself'], 'lx-xs lx-r', 4);
  T(S, 's5', 1, 18.2, ['-n(--dry-run)으로 먼저 확인 · -a 권한·시각 유지 · -z 압축 · -P 진행률·이어받기', '-n (--dry-run) first · -a keeps permissions and times · -z compresses · -P progress and resume'], 'lx-xs', 5); T(S, 's6', 1, 19.4, ['백업과 배포에 많이 써요', 'a staple of backups and deploys'], 'lx-xs', 5);
  S.cap(1, '양쪽 파일 목록을 비교해요', 'rsync compares the file lists on both sides')
    .cap(2, '같은 건 건너뛰고, 바뀐 부분과 새 파일만 보내요', 'It skips identical files and sends only changes and new files')
    .cap(3, '--delete는 원본에 없는 파일을 지워 똑같이 맞춰요', '--delete removes extras so both sides match')
    .cap(4, '경로 끝의 슬래시 하나로 결과가 달라져요', 'A single trailing slash changes the result')
    .cap(5, 'rsync: 증분 동기화의 표준', 'rsync: the standard for incremental sync');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'lxx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono lxx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono lxx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c lxx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono lxx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c lxx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'lxx-s lxx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono lxx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono lxx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono lxx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono lxx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono lxx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'lxx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'lxx-xs', 5));


const CSSX = `
.lxx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.lxx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.lxx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.lxx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.lxx-r .in{color:var(--danger);font-weight:800}
.lxx-g .in{color:var(--ok);font-weight:800}
.lxx-a .in{color:var(--accent);font-weight:800}
.lxx-w .in{color:var(--warn);font-weight:800}
.lxx-c .in{font-size:.6em;font-weight:700}
.lxx-c2 .in{font-size:.5em;font-weight:700}
.lxx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.lxx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls, lastOff) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'lxx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : (lastOff || 0) }));
const ver = (S, k, x, y, list, cls, w) => list.forEach(([s, t], i) => T(S, k + i, x, y, t, cls, s, { w, off: list[i + 1] ? list[i + 1][0] : 0 }));

/* ================= files ================= */
function sUsers() {
  const S = scene({ id: 'lx-users', steps: 5, per: 1.6 });
  T(S, 'pt', 1, .25, '/etc/passwd', 'cz-mono lxx-xs lxx-a', 0);
  const F = [['kim', 2.6, 'accent', ['이름', 'name']], ['x', 1.4, 'ink-3', ['shadow에', 'in shadow']], ['1001', 2.6, 'warn', 'UID'], ['1001', 2.6, 'warn', 'GID'], ['Kim', 2.6, 'line', ['설명', 'comment']], ['/home/kim', 5.2, 'ok', ['홈', 'home']], ['/bin/bash', 5.0, 'ok', ['로그인 셸', 'login shell']]];
  let x = 1;
  F.forEach(([t, w, c, lab], i) => { box2(S, 'f' + i, x, 1.2, w, 1.2, t, c, 0, { pct: 25 }); T(S, 'fl' + i, x - .4, 2.55, lab, 'cz-tc lxx-tiny', 0, { w: w + .8 }); x += w; if (i < F.length - 1) { T(S, 'col' + i, x, 1.35, ':', 'cz-tc cz-mono lxx-s', 0, { w: .6 }); x += .6; } });
  T(S, 'id', 1, 4.0, '$ id kim  →  uid=1001(kim) gid=1001(kim) groups=1001(kim),27(sudo),999(docker)', 'cz-mono lxx-xs', 2);
  T(S, 'cmd', 1, 5.4, '$ sudo systemctl restart nginx', 'cz-mono lxx-xs lxx-a', 3);
  [['kim (UID 1001)', 'accent'], [['sudoers 확인', 'check sudoers'], 'warn'], [['root (UID 0)로 실행', 'runs as root (UID 0)'], 'danger'], [['auth.log에 기록', 'logged to auth.log'], 'ok']].forEach(([t, c], i) => { box2(S, 's' + i, 1 + i * 7.6, 6.5, 6.8, 1.3, t, c, 3, { pct: 28 }); if (i) ar(S, 'sa' + i, [i * 7.6 + .2, 7.15], [i * 7.6 + .9, 7.15], 'ink-3', 3, { h: .08 }); });
  T(S, 'rule', 1, 8.2, ['%sudo  ALL=(ALL:ALL) ALL   # sudo 그룹은 모든 명령 가능', '%sudo  ALL=(ALL:ALL) ALL   # the sudo group may run anything'], 'cz-mono lxx-xs', 3);
  T(S, 'bp1', 1, 9.3, ['nginx는 www-data 계정으로 · 셸은 /usr/sbin/nologin', 'nginx runs as www-data · its shell is /usr/sbin/nologin'], 'cz-mono lxx-xs', 4);
  T(S, 'bp2', 1, 10.3, ['usermod -aG docker kim   ⚠ docker 그룹 ≈ root', 'usermod -aG docker kim   ⚠ the docker group ≈ root'], 'cz-mono lxx-xs lxx-r', 4);
  stepT(S, 'k', 1, 11.7, [['/etc/passwd 한 줄 = 사용자 한 명 · 비밀번호 해시는 root만 읽는 /etc/shadow에', 'one /etc/passwd line per user · the password hash lives in root-only /etc/shadow'], ['커널은 이름이 아니라 UID·GID 숫자로 권한을 판단해요 · 그룹은 여러 개', 'the kernel checks UID/GID numbers, not names · a user can be in several groups'], ['UID 0(root)은 권한 검사를 건너뛰어요 → sudo는 내 비밀번호를 확인하고 그 명령만 root로', 'UID 0 (root) skips permission checks → sudo checks your password and runs just that command as root'], ['서비스는 전용 계정으로, 로그인 불가 셸로 · root SSH 로그인은 막아요', 'run services under dedicated nologin accounts · disable root SSH login']]);
  fin(S, 'z', 13.1, [['리눅스에서 “누구”는 UID·GID 숫자 · 접근은 소유자 → 그룹 → 기타 순으로 확인해요', 'in Linux, who you are is a UID/GID number · access is checked as owner → group → others', 'lxx-xs lxx-a'], ['docker·wheel·sudo 그룹은 사실상 root 권한이니 신중하게 추가해요', 'docker, wheel and sudo membership is effectively root, so grant it carefully']]);
  S.cap(1, '사용자 한 줄', 'One line per user').cap(2, 'UID와 그룹', 'UIDs and groups').cap(3, 'root와 sudo', 'root and sudo').cap(4, '최소 권한', 'Least privilege').cap(5, '사용자·그룹·sudo', 'Users, groups and sudo');
  return S;
}

/* ================= text ================= */
function sJq() {
  const S = scene({ id: 'lx-jq', steps: 5, per: 1.6 });
  const J = ['[', '  {"name":"api", "status":"up",   "ms":120},', '  {"name":"db",  "status":"down", "ms":0},', '  {"name":"web", "status":"up",   "ms":340}', ']'];
  const lh = 1.3, Y = i => 1.2 + .25 + i * lh;
  code(S, 'js', 1, 1.2, 15.8, J, [], {});
  rect(S, 'h1', 1.2, Y(1), 15.4, lh, 'ok', 25, 1, { r: .2, off: 2 });
  [[1, 'ok'], [2, 'danger'], [3, 'ok']].forEach(([i, c]) => rect(S, 'h2' + i, 1.2, Y(i), 15.4, lh, c, 22, 2, { r: .2, off: 3 }));
  [1, 2, 3].forEach(i => rect(S, 'h3' + i, 1.2, Y(i), 15.4, lh, 'warn', 22, 3, { r: .2, off: 4 }));
  const STG = [[1, "jq '.[0].name'", ['.[0]', '.name'], ['"api"']], [2, "jq '.[] | select(.status==\"up\") | .name'", ['.[]', 'select(.status=="up")', '.name'], ['"api"', '"web"']], [3, "jq 'map(.ms) | add / length'", ['map(.ms)', 'add / length'], ['153.33333333333334']], [4, "jq -r '.[] | \"\\(.name) \\(.ms)\"'", ['.[]', '"\\(.name) \\(.ms)"'], ['api 120', 'db 0', 'web 340']]];
  STG.forEach(([st, cmd, stages, outp]) => {
    const o = { off: st < 4 ? st + 1 : 0 };
    T(S, 'cmd' + st, 17.6, 1.4, cmd, 'cz-mono lxx-xs lxx-a', st, o);
    let x = 17.6; const W = stages.map(s => Math.max(2.2, s.length * .33 + .9));
    stages.forEach((s, i) => { box2(S, `sg${st}_${i}`, x, 2.8, W[i], 1.2, s, 'accent', st, { pct: 22, off: o.off }); if (i < stages.length - 1) ar(S, `sa${st}_${i}`, [x + W[i] + .05, 3.4], [x + W[i] + .65, 3.4], 'ink-3', st, { h: .08, off: o.off }); x += W[i] + .7; });
    outp.forEach((l, i) => T(S, `o${st}_${i}`, 18.2, 5.6 + i * 1.1, l, 'cz-mono lxx-xs lxx-g', st, o));
  });
  rect(S, 'ob', 17.6, 5.1, 13.4, 4.0, 'ink', 5, 1, { r: .4 }); T(S, 'obl', 17.8, 4.4, ['출력', 'output'], 'lxx-tiny', 1);
  stepT(S, 'k', 1, 10.0, [['.[0].name: 배열의 첫 원소에서 name 필드를 꺼내요', '.[0].name: take the name field of the first element'], ['.[]로 원소를 하나씩 흘려보내고 select로 걸러요 → up인 것의 이름만', '.[] streams each element and select filters → names of the ones that are up'], ['map(.ms)로 숫자 배열을 만들고 add / length로 평균을 내요', 'map(.ms) builds a list of numbers; add / length averages it'], ['-r은 따옴표 없는 원시 출력 → sort·awk 같은 명령으로 이어 붙이기 좋아요', '-r prints raw text without quotes → easy to pipe into sort, awk and friends']]);
  fin(S, 'z', 11.4, [['jq: JSON을 위한 sed·awk · 필터를 |로 이어 꺼내고, 거르고, 바꾸고, 모아요', 'jq is sed and awk for JSON · chain filters with | to extract, filter, reshape and aggregate', 'lxx-xs lxx-a'], ['curl -s 로 받은 API 응답이나 kubectl -o json 결과를 바로 넘겨 다뤄요', 'pipe curl -s responses or kubectl -o json output straight into it']]);
  S.cap(1, '필드 꺼내기', 'Pick a field').cap(2, '거르기', 'Filter').cap(3, '집계하기', 'Aggregate').cap(4, '다른 명령과 잇기', 'Hand off to other tools').cap(5, 'jq로 JSON 다루기', 'Working with JSON in jq');
  return S;
}

/* ================= admin ================= */
function sNs() {
  const S = scene({ id: 'lx-ns', steps: 5, per: 1.6 });
  rect(S, 'host', 1, 1.0, 30, 8.8, 'ink-3', 6, 0, { r: .5 }); T(S, 'hostl', 1.4, 1.15, ['호스트', 'host'], 'lxx-xs lxx-a', 0);
  rect(S, 'krn', 1.4, 8.4, 29.2, 1.0, 'accent', 20, 0, { r: .3 }); T(S, 'krnl', 1.4, 8.6, ['리눅스 커널 (모두 함께 사용)', 'Linux kernel (shared by everyone)'], 'cz-tc lxx-xs lxx-a', 0, { w: 29.2 });
  ['systemd (PID 1)', 'sshd (PID 812)', 'postgres (PID 990)'].forEach((t, i) => box2(S, 'hp' + i, 2, 2.4 + i * 1.7, 7.4, 1.3, t, 'line', 0, { pct: 22 }));
  frame(S, 'cf', 11, 1.9, 19.4, 6.1, 'accent', 2, { w: .1, dash: 1 }); T(S, 'cfl', 11.3, 1.95, ['컨테이너 web', 'container web'], 'lxx-xs lxx-a', 2);
  box2(S, 'ng', 12, 2.9, 7.6, 1.3, '', 'ok', 0, { pct: 30 }); ver(S, 'ngv', 12, 3.18, [[0, 'nginx (PID 4321)'], [2, 'nginx (PID 1 ← 4321)']], 'cz-tc cz-mono lxx-xs', 7.6);
  [['PID: 자기가 1번', 'PID: sees itself as 1'], ['mount: / = 이미지 파일', 'mount: / = image files'], ['net: eth0 172.17.0.2', 'net: eth0 172.17.0.2'], ['UTS: hostname = web', 'UTS: hostname = web']].forEach((t, i) => box2(S, 'ns' + i, 20.4, 2.9 + i * 1.2, 9.6, 1.0, t, 'accent', 2, { pct: 18 }));
  T(S, 'meml', 12, 4.6, ['메모리 300M / 512M', 'memory 300M / 512M'], 'lxx-xs', 3);
  rect(S, 'memb', 12, 5.35, 7.6, .7, 'line', 25, 3, { r: .2 }); rect(S, 'memf', 12, 5.35, 7.6 * 300 / 512, .7, 'warn', 55, 3, { r: .2 });
  T(S, 'cpul', 12, 6.3, ['CPU 0.5코어', 'CPU 0.5 core'], 'lxx-xs', 3);
  rect(S, 'cpub', 12, 7.05, 7.6, .7, 'line', 25, 3, { r: .2, off: 0 }); rect(S, 'cpuf', 12, 7.05, 3.8, .7, 'accent', 55, 3, { r: .2 });
  box2(S, 'vm', 1, 10.3, 14.8, 1.2, ['VM: 각자 커널 · 느린 부팅 · 강한 격리', 'VM: own kernel · slow start · isolated'], 'warn', 4, { pct: 25 });
  box2(S, 'ct', 16.2, 10.3, 14.8, 1.2, ['컨테이너: 커널 공유 · 빠른 시작 · 가벼움', 'container: shared kernel · fast · light'], 'ok', 4, { pct: 25 });
  stepT(S, 'k', 1, 12.0, [['호스트에서 보면 컨테이너도 그냥 프로세스예요 (nginx = PID 4321)', 'seen from the host, a container is just a process (nginx = PID 4321)'], ['네임스페이스가 따로 보이는 세상을 줘요: 자기 PID 1, 자기 /, 자기 네트워크', 'namespaces give it its own view: its own PID 1, its own / and its own network'], ['cgroup은 쓸 수 있는 양을 제한해요: 메모리 512M를 넘으면 OOM으로 종료', 'cgroups cap what it may use: past 512M of memory it is OOM-killed'], ['커널을 함께 쓰니 VM보다 가볍고 빠르지만, 커널 취약점엔 같이 노출돼요', 'sharing the kernel makes it lighter than a VM, but a kernel bug exposes everyone']]);
  fin(S, 'z', 13.4, [['컨테이너 = 평범한 프로세스 + 네임스페이스(보이는 범위) + cgroup(쓰는 양) + 이미지(파일)', 'a container = a normal process + namespaces (view) + cgroups (limits) + an image (files)', 'lxx-xs lxx-a'], ['docker run도, 쿠버네티스 파드도 모두 이 커널 기능 위에서 동작해요', 'docker run and Kubernetes pods are all built on these kernel features']]);
  S.cap(1, '그냥 프로세스', 'Just a process').cap(2, '네임스페이스: 보이는 범위', 'Namespaces: what it sees').cap(3, 'cgroup: 쓰는 양', 'cgroups: what it uses').cap(4, 'VM과 비교', 'Compared with a VM').cap(5, '컨테이너의 정체', 'What a container really is');
  return S;
}
function sStrace() {
  const S = scene({ id: 'lx-strace', steps: 5, per: 1.6 });
  box2(S, 'prg', 1, 1.2, 8.4, 1.4, '$ cat hello.txt', 'ok', 0, { pct: 25 });
  box2(S, 'krn', 1, 7.4, 8.4, 1.4, ['커널', 'kernel'], 'accent', 0, { pct: 22 });
  ar(S, 'dn', [3.2, 2.7], [3.2, 7.3], 'ink-3', 0, { h: .1 }); ar(S, 'up', [7.2, 7.3], [7.2, 2.7], 'ink-3', 0, { h: .1 });
  T(S, 'dnl', .2, 3.4, 'syscall', 'cz-tc cz-mono lxx-tiny', 0, { w: 3 }); T(S, 'upl', 7.0, 6.1, ['결과', 'result'], 'cz-tc lxx-tiny', 0, { w: 3 });
  box2(S, 'st', 2.2, 4.4, 6, 1.3, 'strace 👀', 'warn', 1, { pct: 35 });
  code(S, 'tr', 10.4, 1.2, 20.6, ['execve("/usr/bin/cat", ["cat", "hello.txt"]) = 0', 'openat(AT_FDCWD, "hello.txt", O_RDONLY) = 3', 'read(3, "hi\\n", 131072) = 3', 'write(1, "hi\\n", 3) = 3', 'read(3, "", 131072) = 0', 'close(3) = 0'], [[0, 1], [1, 2]], { hoff: 3, lh: 1.15 });
  T(S, 'err', 1, 9.6, 'openat(AT_FDCWD, "/etc/app/config.yml", O_RDONLY) = -1 ENOENT', 'cz-mono lxx-xs lxx-r', 3, { off: 4 });
  T(S, 'cnt', 1, 9.6, '$ strace -c ./slow-app', 'cz-mono lxx-xs lxx-a', 4, { off: 0 });
  code(S, 'ct', 1, 10.4, 12.6, ['% time    calls  syscall', '  92.1   120000  read', '   5.3      310  write', '   2.6       12  openat'], [[1, 4]], { st: 4, lh: 1.0 });
  stepT(S, 'k', 1, 14.6, [['파일·네트워크 작업은 전부 시스템 콜 · strace가 그 호출을 가로채 보여 줘요', 'every file or network action is a syscall · strace intercepts and prints them'], ['openat → fd 3, read로 읽고, write(1, …)로 화면(stdout)에 써요', 'openat → fd 3, read it, then write(1, …) to the screen (stdout)'], ['“파일이 없어요” 오류의 진짜 경로를 바로 찾아요: ENOENT가 난 줄을 보면 돼요', 'find the real path behind “file not found”: look for the ENOENT line'], ['strace -c로 호출 횟수·시간을 집계 → 작은 read 12만 번 = 버퍼링 문제', 'strace -c tallies calls and time → 120,000 tiny reads = a buffering problem']]);
  fin(S, 'z', 16.0, [['strace: 프로그램과 커널 사이의 대화를 엿들어 실제로 무엇을 하는지 보는 도구', 'strace listens in on a program’s conversation with the kernel to show what it really does', 'lxx-xs lxx-a'], ['-f는 자식까지, -p PID는 실행 중인 프로세스에 붙어요 · 느려지니 운영 환경에선 perf·eBPF', '-f follows children, -p PID attaches · it is slow, so use perf or eBPF in production']]);
  S.cap(1, '시스템 콜 엿보기', 'Watching system calls').cap(2, 'cat이 하는 일', 'What cat does').cap(3, '없는 파일 찾기', 'Finding the missing file').cap(4, '횟수와 시간 집계', 'Counting calls and time').cap(5, 'strace', 'strace');
  return S;
}

/* ================= network ================= */
function sFirewall() {
  const S = scene({ id: 'lx-firewall', steps: 5, per: 1.6 });
  const RULES = [['ct state established,related → accept', 'ok'], ['iif lo → accept', 'ok'], ['tcp dport 22, saddr 203.0.113.0/24 → accept', 'ok'], ['tcp dport { 80, 443 } → accept', 'ok'], [['기본 정책 → drop', 'default policy → drop'], 'danger']];
  const RY = r => 1.6 + r * 1.35;
  T(S, 'rt', 1, .35, ['INPUT 체인 (위에서부터 검사)', 'INPUT chain (checked top-down)'], 'lxx-xs lxx-a', 0);
  RULES.forEach(([t, c], r) => { T(S, 'rn' + r, 1, RY(r) + .25, String(r + 1), 'cz-tc cz-mono lxx-xs', 0, { w: 1 }); box2(S, 'r' + r, 2.1, RY(r), 19.9, 1.1, t, c, 0, { pct: c === 'danger' ? 25 : 15 }); });
  const PK = ['A', 'B', 'C', 'D'], PX = j => 23.2 + j * 2;
  PK.forEach((p, j) => T(S, 'ph' + j, PX(j), .35, p, 'cz-tc cz-mono lxx-s lxx-a', j === 0 ? 2 : j === 3 ? 4 : 3, { w: 1.8 }));
  const RES = [[3, 'ok', 2], [4, 'danger', 3], [4, 'danger', 3], [0, 'ok', 4]];
  RES.forEach(([m, c, st], j) => { for (let r = 0; r <= m; r++) { const hit = r === m; if (hit) box2(S, `c${j}_${r}`, PX(j), RY(r), 1.8, 1.1, c === 'ok' ? '✓' : '✗', c, st, { pct: 45 }); else T(S, `c${j}_${r}`, PX(j), RY(r) + .25, '–', 'cz-tc cz-mono lxx-xs', st, { w: 1.8 }); } });
  T(S, 'leg', 1, 8.5, ['A :443 새 연결 · B :22 (허용 안 된 IP) · C :5432 (DB) · D 내가 보낸 요청의 응답', 'A new :443 · B :22 from an unlisted IP · C :5432 (DB) · D reply to my own request'], 'lxx-xs', 2);
  stepT(S, 'k', 1, 9.8, [['규칙은 위에서부터 차례로 검사 · 처음 맞는 규칙이 결정 · 아무것도 안 맞으면 기본 정책', 'rules are checked top-down · the first match decides · no match falls to the default policy'], ['A: 443번 포트 새 연결 → 4번 규칙에서 허용', 'A: a new connection to port 443 → accepted by rule 4'], ['B: 허용 목록에 없는 IP의 SSH, C: 밖에서 온 DB 포트 → 끝까지 안 맞아 차단', 'B: SSH from an unlisted IP, C: the DB port from outside → no match, dropped'], ['D: 내가 보낸 요청의 응답 → 연결 추적(conntrack) 덕분에 1번 규칙에서 허용', 'D: the reply to my own request → accepted by rule 1 thanks to connection tracking']]);
  fin(S, 'z', 11.2, [['방화벽: 패킷마다 규칙을 위에서부터 맞춰 보고 허용·차단을 정해요', 'a firewall matches each packet against ordered rules to accept or drop it', 'lxx-xs lxx-a'], ['기본은 막고 필요한 것만 열기 · ufw·firewalld와 클라우드 보안 그룹도 같은 원리', 'deny by default, open only what you need · ufw, firewalld and cloud security groups work alike']]);
  S.cap(1, '규칙과 기본 정책', 'Rules and the default policy').cap(2, '맞는 규칙에서 허용', 'Accepted by a matching rule').cap(3, '안 맞으면 차단', 'No match, dropped').cap(4, '상태 기반 허용', 'Stateful accept').cap(5, '방화벽', 'Firewalls');
  return S;
}

/* ================= split-out cards ================= */
const notesSplit = (S, k, y, list) => list.forEach((t, i) => T(S, k + i, 1, y, t, 'lxx-xs', i + 1, { off: i + 2 }));
const codeLines = (S, k, x, y, lines, st, off, o = {}) => lines.forEach((t, i) => T(S, k + i, x, y + i * (o.lh || 1.1), t, 'cz-mono lxx-code ' + (o.cls || ''), st, { off }));
function sCgroup() {
  const S = scene({ id: 'lx-cgroup', steps: 5, per: 1.7 });
  box2(S, 'root', 11.4, .5, 9.2, 1.1, '/sys/fs/cgroup', 'line', 0, { pct: 18 });
  vl(S, 'tv', 16, 1.6, 2.1, 'ink-3', 0, { w: .08 }); hl(S, 'th', 5.4, 26.6, 2.1, 'ink-3', 0, { w: .08 });
  [['system.slice', 1.0], ['user.slice', 11.6], ['docker/a1b2…', 22.2]].forEach(([t, x], i) => { vl(S, 'tv' + i, x + 4.4, 2.1, 2.6, 'ink-3', 0, { w: .08 }); box2(S, 'g' + i, x, 2.6, 8.8, 1.1, t, i === 2 ? 'accent' : 'line', 0, { pct: i === 2 ? 26 : 16 }); });
  ['nginx.service', 'sshd.service'].forEach((t, i) => cell(S, 's' + i, 1.6, 4.1 + i * 1.25, 8.2, 1.0, t, 'line', 10, 0));
  cell(S, 'u0', 12.2, 4.1, 8.2, 1.0, 'user-1000.slice', 'line', 10, 0);
  rect(S, 'fbox', 22.2, 4.0, 8.8, 3.6, 'accent', 8, 1, { r: .3 });
  codeLines(S, 'f', 22.6, 4.25, ['cpu.max     50000 100000', 'memory.max  512M', 'pids.max    100'], 1, 0);
  T(S, 'n1', 1, 8.2, ['폴더 하나 = 프로세스 묶음 하나 · 안의 파일에 한도를 써요', 'one directory = one group of processes · limits are files inside it'], 'lxx-xs', 1, { off: 2 });
  T(S, 'n1b', 1, 9.3, 'echo 4321 > /sys/fs/cgroup/docker/a1b2…/cgroup.procs', 'cz-mono lxx-xs lxx-a', 1, { off: 2 });
  T(S, 'c0', 1, 8.0, ['cpu.max = 50000 100000 → 100 ms마다 50 ms만 실행 = 0.5코어', 'cpu.max = 50000 100000 → 50 ms of every 100 ms = half a core'], 'cz-mono lxx-xs lxx-a', 2, { off: 3 });
  const X0 = 4.0, PW = 8.4;
  T(S, 'cl', 1, 9.4, 'CPU', 'cz-mono lxx-s', 2, { off: 3 });
  for (let p = 0; p < 3; p++) { cell(S, 'run' + p, X0 + p * PW + .03, 9.2, PW / 2 - .06, 1.3, ['실행', 'run'], 'accent', 34, 2, { off: 3 }); cell(S, 'thr' + p, X0 + p * PW + PW / 2 + .03, 9.2, PW / 2 - .06, 1.3, ['스로틀', 'throttled'], 'line', 12, 2, { off: 3 }); }
  [0, 100, 200, 300].forEach((v, i) => T(S, 'ct' + i, X0 + i * PW - 1.5, 10.7, v + ' ms', 'cz-tc cz-mono lxx-xs', 2, { w: 3, off: 3 }));
  T(S, 'c2', 1, 12.2, ['할당량을 다 쓰면 다음 주기까지 멈춰요 · 지연이 튀는 흔한 원인', 'once the quota is spent it waits for the next period · a common cause of latency spikes'], 'lxx-xs lxx-w', 2, { off: 3 });
  const F = fr(0, 10, 0, 640, 4.2, 18.6, 8.0, 13.4), U = t => (t < 4.6 ? 100 + t * 80 : t < 8 ? 468 - 6 * Math.sin((t - 4.6) * 3) : 468 + (t - 8) * 110);
  hl(S, 'mx', F.L, F.R, F.B, 'ink-3', 3, { w: .08, off: 4 }); vl(S, 'my', F.L, F.T, F.B, 'ink-3', 3, { w: .08, off: 4 });
  mline(S, 'mh', F, [0, 448], [10, 448], { st: 3, color: 'warn', h: .08, dash: 1, off: 4 }); mline(S, 'mm', F, [0, 512], [10, 512], { st: 3, color: 'danger', h: .1, dash: 1, off: 4 });
  mplot(S, 'mu', F, t => [t, Math.min(512, U(t))], 0, 8.4, { st: 3, color: 'accent', h: .12, n: 40, off: 4 });
  mline(S, 'md', F, [8.4, 512], [8.4, 0], { st: 3, color: 'danger', h: .1, off: 4 });
  T(S, 'mox', F.X(8.4) - .4, F.Y(512) - 1.4, '✗', 'lxx-s lxx-r', 3, { off: 4 });
  T(S, 'ml', 1, 8.6, ['메모리', 'memory'], 'lxx-xs', 3, { off: 4 });
  T(S, 'mr1', 19.6, 8.2, ['memory.high 448M', 'memory.high 448M'], 'cz-mono lxx-xs lxx-w', 3, { off: 4 }); T(S, 'mr2', 19.6, 9.2, ['넘으면 회수하며 느려져요', 'above it: reclaim and slow down'], 'lxx-xs', 3, { off: 4 });
  T(S, 'mr3', 19.6, 10.8, ['memory.max 512M', 'memory.max 512M'], 'cz-mono lxx-xs lxx-r', 3, { off: 4 }); T(S, 'mr4', 19.6, 11.8, ['못 줄이면 OOM 킬러가 종료', 'cannot reclaim → OOM kill'], 'lxx-xs lxx-r', 3, { off: 4 });
  [['docker', 'docker run --cpus=0.5 --memory=512m'], ['systemd', 'CPUQuota=50%  MemoryMax=512M'], ['k8s', 'limits: { cpu: 500m, memory: 512Mi }']].forEach(([a, b], i) => { T(S, 'ma' + i, 1, 8.2 + i * 1.3, a, 'cz-mono lxx-xs lxx-a', 4); T(S, 'mb' + i, 5.2, 8.2 + i * 1.3, b, 'cz-mono lxx-xs', 4); });
  T(S, 'mc', 1, 12.4, ['→ 모두 결국 위의 cgroup 파일에 값을 써요', '→ all of them end up writing those same cgroup files'], 'lxx-xs lxx-g', 4);
  notesSplit(S, 'k', 15.6, [['cgroup은 프로세스를 묶는 폴더 트리 · 각 폴더의 파일에 CPU·메모리·프로세스 수 한도를 적어요', 'cgroups form a tree of directories grouping processes · files in each set CPU, memory and process limits'], ['CPU 한도는 주기당 할당량 · 다 쓰면 다음 주기까지 강제로 쉬어요(스로틀)', 'a CPU limit is a quota per period · once used up, the group is throttled until the next period'], ['메모리는 high를 넘으면 회수하며 느려지고, max를 넘겨 못 줄이면 OOM 킬러가 끝내요', 'past memory.high the kernel reclaims and slows the group; past memory.max it is OOM-killed'], ['docker, systemd, 쿠버네티스의 자원 한도는 모두 같은 cgroup 파일로 이어져요', 'resource limits in docker, systemd and Kubernetes all become the same cgroup files']]);
  fin(S, 'z', 15.6, [['cgroup v2: 프로세스 묶음마다 CPU·메모리·I/O·PID 한도를 거는 커널 기능', 'cgroup v2 is the kernel feature that limits CPU, memory, I/O and PIDs per group of processes', 'lxx-xs lxx-a'], ['systemd-cgtop으로 그룹별 사용량을, cpu.stat의 nr_throttled로 스로틀 횟수를 봐요', 'systemd-cgtop shows usage per group; nr_throttled in cpu.stat counts throttling'], ['네임스페이스가 “무엇이 보이나”라면 cgroup은 “얼마나 쓰나”예요', 'namespaces decide what a process sees; cgroups decide how much it may use']]);
  S.cap(1, '폴더 트리와 한도 파일', 'A tree of groups and limit files').cap(2, 'CPU 할당량과 스로틀', 'CPU quota and throttling').cap(3, '메모리 한도와 OOM', 'Memory limits and OOM').cap(4, '도구들이 쓰는 같은 파일', 'The files every tool writes').cap(5, 'cgroup', 'cgroups');
  return S;
}

function sFind() {
  const S = scene({ id: 'lx-find', steps: 5, per: 1.7 });
  const L = ['.', '├── app.log         12M   1d', '├── src/', '│   ├── main.js      4K   0d', '│   └── util.js      2K   3d', '├── node_modules/', '│   └── lib.js      90K  40d', '├── old.log         40M   9d', '└── logs/', '    ├── api.log     25M   0d', '    └── err.log      2K   0d'];
  const Y = i => .7 + i * 1.12;
  codeLines(S, 'l', 1.2, .7, L, 0, 0, { lh: 1.12 });
  const hi = (k, rows, c, st, off) => rows.forEach(r => rect(S, k + r, .8, Y(r) - .1, 12.4, 1.05, c, 28, st, { r: .2, off }));
  hi('h1', [1, 7, 9, 10], 'accent', 1, 2); hi('h2', [1, 9], 'ok', 2, 4); hi('h2x', [7, 10], 'danger', 2, 3); hi('h4', [3, 4], 'ok', 4, 0); hi('h4x', [5, 6], 'danger', 4, 0);
  T(S, 'x7', 13.4, Y(7), ['9일 전 ✗', '9 days ✗'], 'lxx-xs lxx-r', 2, { off: 3 }); T(S, 'x10', 13.4, Y(10), ['2K ✗', '2K ✗'], 'lxx-xs lxx-r', 2, { off: 3 });
  T(S, 'x5', 13.4, Y(5), ['통째로 건너뜀', 'skipped whole'], 'lxx-xs lxx-r', 4);
  const CX = 18.0;
  rect(S, 'cbg', CX - .4, .5, 13.6, 5.6, 'ink', 6, 1, { r: .4 });
  codeLines(S, 'c1', CX, .8, ['find . -name "*.log"'], 1, 2);
  T(S, 'c1n', CX, 7.0, ['모든 항목을 깊이 우선으로 방문하며 조건을 검사', 'visits every entry depth-first and tests it'], 'lxx-xs', 1, { off: 2, w: 13.2 });
  codeLines(S, 'c2', CX, .8, ['find . -type f -name "*.log" \\', '       -size +10M -mtime -2'], 2, 3);
  T(S, 'c2n', CX, 7.0, ['조건은 왼쪽부터 AND · 하나라도 틀리면 다음 항목', 'tests are ANDed left to right · first failure moves on'], 'lxx-xs', 2, { off: 3, w: 13.2 });
  codeLines(S, 'c3', CX, .8, ['… -exec gzip {} \\;', '→ gzip app.log', '→ gzip logs/api.log', '', '… -exec gzip {} +', '→ gzip app.log logs/api.log'], 3, 4, { lh: .82 });
  T(S, 'c3n', CX, 7.0, ['\\; 는 파일마다 프로세스 하나, + 는 한 번에 모아서', '\\; runs one process per file; + batches them'], 'lxx-xs lxx-w', 3, { off: 4, w: 13.2 });
  codeLines(S, 'c4', CX, .8, ['find . -name node_modules -prune \\', '       -o -name "*.js" -print'], 4, 0);
  T(S, 'c4n', CX, 7.0, ['-prune은 그 아래로 내려가지 않게 해요', '-prune stops the descent into that directory'], 'lxx-xs', 4, { w: 13.2 });
  T(S, 'c4m', CX, 8.1, ['-a가 -o보다 먼저 묶여요 · 헷갈리면 \\( \\)', '-a binds tighter than -o · use \\( \\) when unsure'], 'lxx-xs lxx-w', 4, { w: 13.2 });
  notesSplit(S, 'k', 15.6, [['find는 시작 폴더 아래의 모든 항목을 깊이 우선으로 돌며, 항목마다 조건식을 검사해요', 'find walks every entry under the start directory depth-first and evaluates its expression for each one'], ['-type, -name, -size, -mtime 같은 조건은 AND로 이어져요 · -mtime -2는 “2일 이내에 수정”', '-type, -name, -size and -mtime are ANDed · -mtime -2 means modified within two days'], ['-exec로 찾은 파일에 명령을 실행 · + 로 끝내면 인자를 모아 한 번에 실행해서 빨라요', '-exec runs a command on each match · ending with + batches the arguments into one run'], ['-prune으로 node_modules 같은 큰 폴더를 통째로 건너뛰고, -o로 다른 조건을 이어요', '-prune skips big trees such as node_modules entirely, and -o continues with another test']]);
  fin(S, 'z', 15.6, [['find = 디렉터리 트리 순회 + 항목마다 평가하는 조건식 + 행동(-print, -exec, -delete)', 'find = a directory walk + an expression per entry + actions (-print, -exec, -delete)', 'lxx-xs lxx-a'], ['공백이 든 이름은 -print0 | xargs -0 · 지우기 전에 -delete 대신 -print로 먼저 확인', 'use -print0 | xargs -0 for names with spaces, and run -print before -delete'], ['더 빠른 대안: fd(무시 파일 존중), locate(미리 만든 색인)', 'faster alternatives: fd (respects ignore files) and locate (a prebuilt index)']]);
  S.cap(1, '트리를 돌며 검사', 'Walk and test').cap(2, '조건 이어 붙이기', 'Combine tests').cap(3, '-exec로 실행', 'Act with -exec').cap(4, '-prune으로 건너뛰기', 'Skip with -prune').cap(5, 'find', 'find');
  return S;
}

function sAwk() {
  const S = scene({ id: 'lx-awk', steps: 5, per: 1.7 });
  const D = [['GET', '/api/users', 200, 12], ['POST', '/api/login', 500, 340], ['GET', '/index', 200, 8], ['GET', '/api/users', 404, 5], ['GET', '/api/orders', 500, 290], ['GET', '/index', 200, 9]];
  const CXs = [3.0, 6.2, 11.4, 14.0], Y = i => 1.7 + i * 1.12, HC = ['lxx-a', 'lxx-g', 'lxx-w', 'lxx-r'];
  T(S, 'hn', .8, .5, 'NR', 'cz-mono lxx-xs', 1); ['$1', '$2', '$3', '$4'].forEach((h, j) => T(S, 'h' + j, CXs[j], .5, h, 'cz-mono lxx-xs ' + HC[j], 1));
  D.forEach((r, i) => { T(S, 'nr' + i, .8, Y(i), String(i + 1), 'cz-mono lxx-xs', 1); r.forEach((v, j) => T(S, `d${i}${j}`, CXs[j], Y(i), String(v), 'cz-mono lxx-code', 0)); });
  [1, 4].forEach(i => rect(S, 'r5' + i, .6, Y(i) - .12, 15.8, 1.05, 'danger', 22, 2, { r: .2, off: 3 }));
  rect(S, 'col3', CXs[2] - .3, 1.5, 2.4, 6.8, 'warn', 22, 3, { r: .3, off: 4 }); rect(S, 'col4', CXs[3] - .3, 1.5, 2.2, 6.8, 'danger', 18, 4, { r: .3 });
  const CX = 18.4;
  rect(S, 'cbg', CX - .4, .4, 13.0, 3.0, 'ink', 6, 1, { r: .4 });
  codeLines(S, 'c1', CX, .7, ['awk \'{print NR, $2}\''], 1, 2);
  T(S, 'o1', CX, 4.0, ['공백으로 나눈 열이 $1 $2 …', 'whitespace-split fields $1 $2 …'], 'lxx-xs', 1, { off: 2 }); T(S, 'o1b', CX, 5.0, ['줄 번호 NR, 열 개수 NF = 4', 'line number NR, field count NF = 4'], 'lxx-xs', 1, { off: 2 });
  codeLines(S, 'c2', CX, .7, ['awk \'$3 >= 500 {print $2}\''], 2, 3);
  T(S, 'o2a', CX, 4.0, ['패턴 {동작}: 맞는 줄에만 실행', 'pattern {action}: run on matching lines'], 'lxx-xs lxx-a', 2, { off: 3 }); codeLines(S, 'o2', CX, 5.2, ['/api/login', '/api/orders'], 2, 3, { cls: 'lxx-r' });
  codeLines(S, 'c3', CX, .7, ['awk \'{c[$3]++}', '     END {for (s in c) print s, c[s]}\''], 3, 4);
  T(S, 'o3a', CX, 4.0, ['연관 배열로 상태 코드별 개수', 'count per status with an associative array'], 'lxx-xs lxx-a', 3, { off: 4 }); codeLines(S, 'o3', CX, 5.2, ['200 3', '404 1', '500 2'], 3, 4, { cls: 'lxx-w' });
  codeLines(S, 'c4', CX, .7, ['awk \'{s += $4}', '     END {printf "%.1f\\n", s/NR}\''], 4, 0);
  T(S, 'o4a', CX, 4.0, ['END는 모든 줄을 읽은 뒤 한 번', 'END runs once after the last line'], 'lxx-xs lxx-a', 4); codeLines(S, 'o4', CX, 5.2, ['110.7'], 4, 0, { cls: 'lxx-r' });
  T(S, 'o4b', CX, 6.6, ['CSV는 -F, 로 구분자를 바꿔요', 'use -F, to split CSV on commas'], 'lxx-xs', 4);
  notesSplit(S, 'k', 15.6, [['awk는 입력을 한 줄씩 읽어 공백으로 나누고, 열을 $1, $2 …, 줄 번호를 NR로 불러요', 'awk reads input line by line, splits on whitespace and names the fields $1, $2 …, with NR as the line number'], ['프로그램은 “패턴 {동작}”의 목록 · 상태 코드가 500 이상인 줄의 경로만 출력해요', 'a program is a list of “pattern {action}” rules · here, print the path of lines with status ≥ 500'], ['c[$3]++처럼 문자열을 키로 쓰는 배열로 묶어서 세고, END에서 결과를 출력해요', 'arrays keyed by strings, like c[$3]++, group and count, and END prints the totals'], ['합계와 평균도 한 줄 · 모든 줄을 읽은 뒤 END에서 s/NR을 계산해요', 'sums and averages take one line · END computes s/NR after the last line']]);
  fin(S, 'z', 15.6, [['awk: 줄을 열로 나눠 패턴에 맞는 줄에 동작을 실행하는 작은 언어', 'awk is a small language that splits lines into fields and runs actions on lines matching patterns', 'lxx-xs lxx-a'], ['sort | uniq -c 를 한 번에, 열 합계·평균·조건 집계를 파이프라인 안에서 바로', 'it replaces sort | uniq -c and does column sums, averages and conditional counts inside a pipeline'], ['따옴표 안 쉼표가 있는 CSV나 JSON은 csvkit, jq, 파이썬으로 넘어가요', 'quoted CSV and JSON are better handled by csvkit, jq or Python']]);
  S.cap(1, '줄과 열', 'Lines and fields').cap(2, '패턴과 동작', 'Patterns and actions').cap(3, '연관 배열로 세기', 'Counting with arrays').cap(4, 'END에서 집계', 'Totals in END').cap(5, 'awk', 'awk');
  return S;
}

function sCmdSub() {
  const S = scene({ id: 'lx-cmdsub', steps: 5, per: 1.7 });
  T(S, 'cmd', 1, .5, ['$ echo "오늘은 $(date +%F)"', '$ echo "today is $(date +%F)"'], 'cz-mono lxx-s', 0);
  box2(S, 'sub', 1, 2.9, 8.6, 1.5, ['서브셸: date +%F', 'subshell: date +%F'], 'accent', 1, { pct: 22 });
  ar(S, 'a1', [9.6, 3.65], [11.4, 3.65], 'ink-2', 1, { h: .1 }); box2(S, 'out', 11.4, 2.9, 8.2, 1.5, '2026-11-10⏎', 'ok', 1, { pct: 22 });
  ar(S, 'a2', [19.6, 3.65], [21.4, 3.65], 'ink-2', 1, { h: .1 }); box2(S, 'res', 21.4, 2.9, 9.6, 1.5, ['echo "오늘은 2026-11-10"', 'echo "today is 2026-11-10"'], 'line', 1, { pct: 16 });
  T(S, 'nl', 11.4, 4.6, ['끝 줄바꿈은 지워져요', 'trailing newlines are dropped'], 'lxx-xs lxx-w', 2);
  T(S, 'sl', 1, 6.2, ['변수에 담기', 'into a variable'], 'lxx-xs lxx-a', 2, { off: 3 });
  codeLines(S, 'v', 1, 7.3, ['today=$(date +%F)', 'n=$(wc -l < access.log)    # n=1042', 'if out=$(make 2>&1); then …   # 종료 코드도 그대로'].map((t, i) => i === 2 ? [t, 'if out=$(make 2>&1); then …   # exit status kept'] : t), 2, 3);
  T(S, 'ql', 1, 6.2, ['name.txt 안의 내용: my report.pdf', 'name.txt contains: my report.pdf'], 'cz-mono lxx-xs', 3, { off: 4 });
  codeLines(S, 'q1', 1, 7.4, ['open $(cat name.txt)'], 3, 4); codeLines(S, 'q2', 1, 9.6, ['open "$(cat name.txt)"'], 3, 4);
  [['my', 'report.pdf']].forEach(a => a.forEach((t, j) => cell(S, 'qa' + j, 14 + j * 4.2, 7.2, 3.8, 1.0, t, 'danger', 26, 3, { off: 4 })));
  T(S, 'qax', 22.6, 7.3, ['인자 2개 ✗', '2 arguments ✗'], 'lxx-xs lxx-r', 3, { off: 4 });
  cell(S, 'qb', 14, 9.4, 8.0, 1.0, 'my report.pdf', 'ok', 26, 3, { off: 4 }); T(S, 'qbx', 22.6, 9.5, ['인자 1개 ✓', '1 argument ✓'], 'lxx-xs lxx-g', 3, { off: 4 });
  T(S, 'qn', 1, 11.4, ['따옴표가 없으면 결과가 공백으로 쪼개지고 *도 펼쳐져요', 'unquoted, the result is split on spaces and globbed'], 'lxx-xs lxx-w', 3, { off: 4 });
  T(S, 'nl4', 1, 6.2, ['중첩은 $( ) 그대로 · 백틱은 \\로 이스케이프해야 해요', 'nesting just works with $( ); backticks need escaping'], 'lxx-xs lxx-a', 4);
  codeLines(S, 'n4', 1, 7.3, ['dir=$(dirname "$(readlink -f "$0")")', 'dir=`dirname \\`readlink -f "$0"\\``'], 4, 0);
  T(S, 'ps', 1, 10.0, ['비슷한 친구, 프로세스 치환: 출력을 파일처럼 넘겨요', 'its cousin, process substitution, passes output as a file'], 'lxx-xs lxx-a', 4);
  codeLines(S, 'p4', 1, 11.1, ['diff <(sort a.txt) <(sort b.txt)   # → /dev/fd/63 /dev/fd/62'], 4, 0);
  notesSplit(S, 'k', 15.6, [['$( ) 안의 명령은 서브셸에서 먼저 실행되고, 그 출력이 그 자리에 끼워져요', 'the command inside $( ) runs first in a subshell and its output is pasted in place'], ['끝의 줄바꿈은 지워져서 변수에 담기 좋아요 · if out=$(…)는 종료 코드도 그대로 써요', 'trailing newlines are stripped, which suits variables · if out=$(…) also keeps the exit status'], ['따옴표 없이 쓰면 결과가 공백에서 쪼개져요 · 거의 언제나 "$( )"로 감싸요', 'unquoted, the result splits on whitespace · almost always wrap it as "$( )"'], ['$( )는 중첩이 쉬워 옛 백틱보다 나아요 · <( )는 출력을 임시 파일 경로로 넘겨요', '$( ) nests cleanly, unlike old backticks · <( ) passes output as a temporary file path']]);
  fin(S, 'z', 15.6, [['명령 치환 $(cmd): 명령의 표준 출력을 문자열로 받아 명령줄에 끼워 넣기', 'command substitution $(cmd) captures a command’s output and splices it into the command line', 'lxx-xs lxx-a'], ['매번 서브셸을 띄우니 큰 반복문 안에서는 느려요 · 가능하면 셸 내장 기능으로', 'each one forks a subshell, so it is slow inside big loops · prefer shell built-ins'], ['출력이 여러 줄이고 인자로 나눠야 하면 xargs나 mapfile(readarray)을 써요', 'for multi-line output that must become separate arguments, use xargs or mapfile']]);
  S.cap(1, '안쪽 명령을 먼저', 'Run the inner command first').cap(2, '변수에 담기', 'Into a variable').cap(3, '따옴표로 감싸기', 'Quote the result').cap(4, '중첩과 프로세스 치환', 'Nesting and process substitution').cap(5, '명령 치환', 'Command substitution');
  return S;
}

function sTmux() {
  const S = scene({ id: 'lx-tmux', steps: 5, per: 1.7 });
  const row = (k, y, items, st, off) => items.forEach(([x, w, l, c], i) => { box2(S, k + i, x, y, w, 1.4, l, c, st, { pct: 22, off }); if (i && items[i - 1]) { const p = items[i - 1]; ar(S, k + 'a' + i, [p[0] + p[1], y + .7], [x, y + .7], 'ink-2', st, { h: .1, off }); } });
  T(S, 'ah', 1, .1, ['tmux 없이', 'without tmux'], 'lxx-xs lxx-a', 0, { off: 4 });
  frame(S, 'sa', 8.2, .9, 23.0, 2.4, 'ink-3', 0, { w: .08, off: 4 }); T(S, 'sal', 8.4, .0, ['서버', 'server'], 'lxx-xs', 0, { off: 4 });
  row('a', 1.4, [[1, 5.0, ['노트북', 'laptop'], 'line'], [9.0, 4.0, 'sshd', 'line'], [15.0, 4.0, 'bash', 'line'], [21.0, 9.6, 'python train.py', 'accent']], 0, 4);
  xm(S, 'ax', 7.5, 1.2, 1, { off: 4 }); tsets(S, 'a3', [[1, 'danger', 30]]);
  T(S, 'an', 9.0, 3.5, ['SSH가 끊기면 SIGHUP → 작업도 종료 ✗', 'SSH drops → SIGHUP → the job dies ✗'], 'lxx-xs lxx-r', 1, { off: 4 });
  T(S, 'bh', 1, 4.7, ['tmux 안에서', 'inside tmux'], 'lxx-xs lxx-g', 2, { off: 4 });
  frame(S, 'sb', 8.2, 5.5, 23.0, 2.4, 'ink-3', 2, { w: .08, off: 4 });
  row('b', 6.0, [[1, 5.0, ['노트북', 'laptop'], 'line'], [9.0, 3.2, 'sshd', 'line'], [13.4, 4.4, 'tmux client', 'line'], [19.0, 4.6, 'tmux server', 'ok'], [25.0, 5.6, 'bash → job', 'accent']], 2, 4);
  xm(S, 'bx', 7.5, 5.8, 2, { off: 4 }); tsets(S, 'b1', [[2, 'line', 6]]); tsets(S, 'b2', [[2, 'line', 6]]);
  T(S, 'bn', 8.4, 8.2, ['클라이언트만 끝나고 서버와 작업은 계속 ✓', 'only the client exits; the server and job live on ✓'], 'lxx-xs lxx-g', 2, { off: 4 });
  row('c', 10.2, [[1, 5.0, ['다른 PC', 'another PC'], 'line'], [9.0, 3.2, 'sshd', 'line'], [13.4, 4.4, 'tmux attach', 'accent']], 3, 4);
  ar(S, 'cu', [17.8, 10.9], [21.3, 7.5], 'ok', 3, { h: .12, off: 4 });
  T(S, 'cn', 19.0, 11.4, 'tmux attach -t work', 'cz-mono lxx-xs lxx-a', 3, { off: 4 });
  frame(S, 'scr', 1, .6, 19.4, 12.0, 'ink-3', 4, { w: .12, r: .3 });
  rect(S, 'p1', 1.3, .9, 9.4, 10.3, 'accent', 8, 4, { r: .2 }); rect(S, 'p2', 11.0, .9, 9.1, 5.0, 'ok', 8, 4, { r: .2 }); rect(S, 'p3', 11.0, 6.2, 9.1, 5.0, 'warn', 8, 4, { r: .2 });
  codeLines(S, 'pc1', 1.6, 1.2, ['vim app.py', '', 'def train():', '    for ep in range(9):', '        step(ep)'], 4, 0, { lh: .95 });
  codeLines(S, 'pc2', 11.3, 1.2, ['tail -f train.log', 'epoch 3  loss 0.41', 'epoch 4  loss 0.37'], 4, 0, { lh: .95 });
  codeLines(S, 'pc3', 11.3, 6.5, ['htop', 'CPU ████████░░ 81%', 'MEM █████░░░░░ 52%'], 4, 0, { lh: .95 });
  rect(S, 'bar', 1.3, 11.4, 18.8, .9, 'ok', 40, 4, { r: .15 }); T(S, 'bart', 1.6, 11.35, '[work] 0:edit*  1:logs                 12:04', 'cz-mono lxx-code', 4);
  const R = 21.4;
  T(S, 'k0', R, .6, ['세션 > 창 > 판', 'session > window > pane'], 'lxx-s lxx-a', 4);
  [['Ctrl-b d', ['분리', 'detach']], ['Ctrl-b c', ['새 창', 'new window']], ['Ctrl-b %', ['좌우 분할', 'split left/right']], ['Ctrl-b "', ['위아래 분할', 'split top/bottom']], ['tmux ls', ['세션 목록', 'list sessions']]].forEach(([a, b], i) => { T(S, 'ka' + i, R, 2.2 + i * 1.15, a, 'cz-mono lxx-xs lxx-a', 4); T(S, 'kb' + i, R + 4.6, 2.2 + i * 1.15, b, 'lxx-xs', 4); });
  notesSplit(S, 'k', 15.6, [['그냥 SSH에서 돌린 작업은 연결이 끊기면 SIGHUP을 받아 함께 종료돼요', 'a job started over plain SSH receives SIGHUP and dies when the connection drops'], ['tmux는 터미널을 쥐고 있는 서버 프로세스를 따로 둬요 · 연결이 끊겨도 클라이언트만 사라져요', 'tmux keeps a separate server process that owns the terminal · a drop only kills the client'], ['다시 접속해 tmux attach를 하면 화면과 작업이 그대로 돌아와요 · 다른 PC에서도', 'reconnect and run tmux attach to get the screen and job back, even from another machine'], ['하나의 세션 안에 창을 여러 개, 창 안을 판으로 나눠 여러 터미널을 한 화면에 써요', 'a session holds several windows, and windows split into panes, so many terminals share one screen']]);
  fin(S, 'z', 15.6, [['tmux: 터미널 세션을 서버 쪽에 살려 두는 터미널 멀티플렉서', 'tmux is a terminal multiplexer that keeps terminal sessions alive on the server', 'lxx-xs lxx-a'], ['오래 걸리는 학습·빌드·마이그레이션을 SSH 끊김 걱정 없이 돌려요 · 같은 세션을 함께 보며 페어 작업도', 'run long training, builds or migrations without fearing a dropped SSH link, and share a session to pair'], ['재부팅 뒤에도 돌아야 하는 서비스는 tmux가 아니라 systemd 유닛으로 만들어요', 'services that must survive reboots belong in a systemd unit, not tmux']]);
  S.cap(1, '끊기면 함께 죽는 작업', 'A job that dies with SSH').cap(2, 'tmux 서버가 붙잡아 둠', 'The tmux server holds on').cap(3, '다시 붙기', 'Attach again').cap(4, '세션, 창, 판', 'Sessions, windows, panes').cap(5, 'tmux', 'tmux');
  return S;
}

return { css: CSSX, secs: [], add: {
  'lx-fs': [
    item('lx-users', '사용자·그룹·sudo', 'Users, groups and sudo', '리눅스의 사용자는 /etc/passwd에 한 줄씩 있고, 커널은 이름이 아니라 UID·GID 숫자로 권한을 판단해요. sudo는 필요한 명령만 잠깐 root로 실행해요.', '/etc/passwd의 kim:x:1001:1001:Kim:/home/kim:/bin/bash는 이름, 비밀번호 자리(실제 해시는 root만 읽는 /etc/shadow), UID, GID, 설명, 홈 디렉터리, 로그인 셸이에요. id kim으로 속한 그룹을 볼 수 있고, 파일 접근은 소유자 → 그룹 → 기타 순으로 확인돼요. UID 0인 root는 권한 검사를 건너뛰기 때문에 평소엔 일반 계정을 쓰고, sudo가 /etc/sudoers 규칙과 본인 비밀번호를 확인한 뒤 해당 명령만 root로 실행하고 기록을 남겨요. 서비스는 www-data 같은 전용 계정과 nologin 셸로 돌리고, docker·sudo 그룹은 사실상 root라 신중하게 추가해요.', 'Linux users are lines in /etc/passwd, and the kernel checks permissions by UID and GID numbers, not names; sudo runs just the needed command as root.', 'The line kim:x:1001:1001:Kim:/home/kim:/bin/bash holds the name, a password placeholder (the real hash is in root-only /etc/shadow), UID, GID, comment, home directory and login shell. id kim lists the groups, and file access is checked as owner → group → others. Root, UID 0, skips permission checks, so day-to-day work uses normal accounts; sudo checks /etc/sudoers and your own password, runs only that command as root and logs it. Services run under dedicated accounts such as www-data with a nologin shell, and membership in docker or sudo is effectively root, so grant it carefully.', sUsers())
  ],
  'lx-text': [
    item('lx-jq', 'jq로 JSON 다루기', 'Working with JSON in jq', 'jq는 JSON을 위한 sed·awk예요. 필터를 |로 이어 붙여 필드를 꺼내고, 거르고, 모양을 바꾸고, 집계해요.', ".[0].name은 첫 원소의 name을 꺼내요. .[]는 배열 원소를 하나씩 흘려보내고, select(.status==\"up\")로 조건에 맞는 것만 남긴 뒤 .name을 뽑으면 \"api\", \"web\"이 나와요. map(.ms) | add / length는 평균을 계산해요. -r 옵션은 따옴표 없는 원시 텍스트를 출력해 sort, awk 같은 다른 명령으로 이어 붙이기 좋아요. curl -s로 받은 API 응답이나 kubectl get -o json 결과를 바로 넘겨 다룰 수 있어요.", 'jq is sed and awk for JSON: chain filters with | to pull out fields, filter, reshape and aggregate.', '.[0].name takes the name of the first element. .[] streams the array’s elements one by one; select(.status=="up") keeps the matching ones, and .name then yields "api" and "web". map(.ms) | add / length computes an average. The -r option prints raw text without quotes, which pipes neatly into sort, awk and other tools. You can feed it API responses from curl -s or kubectl get -o json output directly.', sJq())
  ],
  'lx-admin': [
    item('lx-ns', '컨테이너의 정체: 네임스페이스와 cgroup', 'What a container is: namespaces and cgroups', '컨테이너는 가상 머신이 아니라 평범한 프로세스예요. 네임스페이스로 보이는 범위를 나누고, cgroup으로 쓸 수 있는 자원을 제한해요.', '호스트에서 ps로 보면 컨테이너 안의 nginx도 PID 4321인 프로세스일 뿐이에요. PID 네임스페이스 안에서는 자기가 PID 1로 보이고, mount 네임스페이스로 이미지 파일들을 자기 /로, net 네임스페이스로 자기만의 eth0과 IP를, UTS 네임스페이스로 자기 호스트 이름을 가져요. cgroup은 메모리 512M, CPU 0.5코어 같은 한도를 걸고, 넘으면 OOM으로 종료돼요. 커널을 함께 쓰기 때문에 VM보다 훨씬 가볍고 빨리 뜨지만, 커널 취약점에는 함께 노출돼요. docker run과 쿠버네티스 파드 모두 이 기능 위에서 동작해요.', 'A container is not a virtual machine but an ordinary process: namespaces limit what it can see and cgroups limit what it can use.', 'From the host, ps shows the container’s nginx as just process 4321. Inside its PID namespace it sees itself as PID 1; the mount namespace makes the image files its /, the net namespace gives it its own eth0 and IP, and the UTS namespace its own hostname. cgroups impose limits such as 512M of memory or half a CPU core, and exceeding the memory limit gets it OOM-killed. Sharing the host kernel makes containers far lighter and quicker to start than VMs, but a kernel vulnerability affects them all. docker run and Kubernetes pods are built on these features.', sNs()),
    item('lx-strace', 'strace로 시스템 콜 보기', 'Watching system calls with strace', 'strace는 프로그램이 커널에 보내는 시스템 콜을 가로채 한 줄씩 보여 주는 도구예요. 프로그램이 “실제로” 무엇을 하는지 알 수 있어요.', 'strace cat hello.txt를 실행하면 execve, openat(…) = 3, read(3, …), write(1, …), close(3) 순서로 호출이 보여요. 설정 파일을 못 찾는다는 오류가 날 때 ENOENT가 난 openat 줄을 보면 프로그램이 실제로 찾은 경로를 바로 알 수 있어요. strace -c는 호출별 횟수와 시간을 집계해, 작은 read가 12만 번 일어나는 것 같은 버퍼링 문제를 드러내요. -f는 자식 프로세스까지 따라가고 -p PID는 실행 중인 프로세스에 붙어요. ptrace로 동작해 많이 느려지므로 운영 환경에서는 perf나 eBPF 도구를 써요.', 'strace intercepts the system calls a program makes to the kernel and prints them line by line, showing what the program really does.', 'Running strace cat hello.txt shows execve, openat(…) = 3, read(3, …), write(1, …) and close(3) in order. When a program complains it can’t find its config, the openat line ending in ENOENT reveals the path it actually tried. strace -c tallies counts and time per call, exposing problems such as 120,000 tiny reads from missing buffering. -f follows child processes and -p PID attaches to a running one. Because it works through ptrace it slows programs down a lot, so production uses perf or eBPF tools instead.', sStrace())
  ],
  'lx-remote': [
    item('lx-firewall', '방화벽 규칙', 'Firewall rules', '방화벽은 들어오는 패킷마다 규칙 목록을 위에서부터 맞춰 보고 허용하거나 버려요. 처음 맞는 규칙이 결정하고, 아무것도 안 맞으면 기본 정책을 따라요.', 'nftables(또는 iptables)의 INPUT 체인을 “기본 정책 drop”으로 두고, 필요한 것만 accept 규칙으로 열어요. 443번 포트의 새 연결은 4번 규칙에서 허용되고, 허용 목록에 없는 IP의 SSH나 외부에서 온 DB 포트 접속은 어떤 규칙에도 맞지 않아 차단돼요. 내가 보낸 요청의 응답은 연결 추적(conntrack)의 established 상태 덕분에 첫 규칙에서 허용되는데, 이것이 상태 기반 방화벽이에요. ufw allow 443/tcp나 firewalld가 이런 규칙을 만들어 주고, 클라우드 보안 그룹도 같은 원리예요.', 'A firewall checks each incoming packet against an ordered list of rules to accept or drop it; the first match decides, and the default policy applies when nothing matches.', 'An nftables (or iptables) INPUT chain is set to a default policy of drop, with accept rules opening only what is needed. A new connection to port 443 is accepted by rule 4, while SSH from an unlisted IP or the database port reached from outside matches nothing and is dropped. Replies to your own requests pass the first rule thanks to connection tracking’s established state, which is what makes the firewall stateful. ufw allow 443/tcp and firewalld generate such rules, and cloud security groups work the same way.', sFirewall())
  ]
},
after: {
  'lx-ns': [item('lx-cgroup', 'cgroup', 'cgroups', '프로세스를 묶어 CPU·메모리·I/O·프로세스 수를 제한하는 커널 기능이에요. 묶음 하나가 /sys/fs/cgroup 아래 폴더 하나예요.', 'cgroup v2에서는 /sys/fs/cgroup 아래 폴더 트리가 곧 프로세스 묶음이에요. 폴더의 cgroup.procs에 PID를 쓰면 그 프로세스가 들어가고, 같은 폴더의 파일에 한도를 적어요. cpu.max = "50000 100000"은 100 ms 주기마다 50 ms만 실행한다는 뜻, 즉 0.5코어예요. 할당량을 다 쓰면 다음 주기까지 강제로 쉬는데(스로틀), 평균 CPU 사용률은 낮아 보여도 응답 지연이 튀는 흔한 원인이에요(cpu.stat의 nr_throttled로 확인). 메모리는 memory.high를 넘으면 커널이 페이지를 회수하며 그룹을 느리게 만들고, memory.max를 넘었는데 줄일 수 없으면 OOM 킬러가 그룹 안의 프로세스를 끝내요. pids.max는 포크 폭탄을, io.max는 디스크 대역폭을 막아요. systemd는 서비스마다 cgroup을 만들고(MemoryMax=, CPUQuota=), docker run --cpus --memory와 쿠버네티스의 resources.limits도 결국 이 파일에 값을 써요. 네임스페이스가 “무엇이 보이나”를 정한다면 cgroup은 “얼마나 쓰나”를 정해요.', 'A kernel feature that groups processes and limits their CPU, memory, I/O and process count. Each group is a directory under /sys/fs/cgroup.', 'In cgroup v2 the directory tree under /sys/fs/cgroup is the set of process groups: writing a PID to a directory’s cgroup.procs moves the process in, and files in the same directory hold the limits. cpu.max = "50000 100000" means 50 ms of CPU in every 100 ms period, half a core. Once the quota is spent, the group is throttled until the next period, a common cause of latency spikes even when average CPU looks low (nr_throttled in cpu.stat shows it). Above memory.high the kernel reclaims pages and slows the group; above memory.max, if nothing can be reclaimed, the OOM killer ends a process in the group. pids.max stops fork bombs and io.max caps disk bandwidth. systemd creates a cgroup per service (MemoryMax=, CPUQuota=), and docker run --cpus --memory and Kubernetes resources.limits end up writing these same files. Namespaces decide what a process sees; cgroups decide how much it may use.', sCgroup())],
  'lx-glob': [item('lx-find', 'find', 'find', '시작 폴더 아래 모든 항목을 돌며 조건식에 맞는 파일을 찾고, 찾은 파일에 명령을 실행해요.', 'find는 시작 폴더 아래를 깊이 우선으로 돌며 항목마다 조건식을 평가해요. -name "*.log"(이름), -type f(파일만), -size +10M(10 MB 초과), -mtime -2(2일 이내 수정) 같은 조건은 기본적으로 AND로 이어지고 왼쪽부터 검사하다 하나라도 틀리면 다음 항목으로 넘어가요. 찾은 뒤의 행동으로 -print(기본), -delete, -exec가 있어요. -exec gzip {} \\;는 파일마다 프로세스를 하나씩 띄우고, -exec gzip {} +는 인자를 모아 한 번에 실행해서 훨씬 빨라요. -prune은 node_modules나 .git 같은 폴더 안으로 아예 내려가지 않게 하고, -o로 다른 조건을 이어요. 이때 -a(AND)가 -o(OR)보다 먼저 묶이므로 헷갈리면 \\( \\)로 묶어요. 공백이 든 파일 이름은 -print0 | xargs -0으로 넘기고, -delete를 쓰기 전에는 같은 조건으로 -print를 먼저 돌려 확인해요. -maxdepth로 깊이를, -newer로 다른 파일보다 새로운 것만 고를 수 있어요. 더 빠른 대안으로 .gitignore를 존중하는 fd와, 미리 만든 색인을 검색하는 locate가 있어요.', 'Walks every entry under a starting directory, picks the files that match an expression and can run a command on them.', 'find walks the tree under its starting directory depth-first and evaluates an expression for each entry. Tests such as -name "*.log" (name), -type f (regular files), -size +10M (over 10 MB) and -mtime -2 (modified within two days) are ANDed by default and checked left to right, moving to the next entry at the first failure. Actions include -print (the default), -delete and -exec. -exec gzip {} \\; starts one process per file, while -exec gzip {} + batches the arguments into a single run and is much faster. -prune stops find from descending into directories such as node_modules or .git, and -o continues with another test; since -a (AND) binds tighter than -o (OR), group with \\( \\) when in doubt. Pass names containing spaces with -print0 | xargs -0, and run the same expression with -print before trusting -delete. -maxdepth limits depth and -newer selects files newer than another. Faster alternatives include fd, which respects .gitignore, and locate, which searches a prebuilt index.', sFind())],
  'lx-sedawk': [item('lx-awk', 'awk', 'awk', '줄을 열로 나눠, 패턴에 맞는 줄에 동작을 실행하는 작은 텍스트 처리 언어예요. 열 합계·평균·그룹별 개수를 한 줄로 구해요.', 'awk는 입력을 한 줄씩 읽어 공백(또는 -F로 정한 구분자)으로 나누고, 열을 $1, $2, …, 줄 전체를 $0, 줄 번호를 NR, 열 개수를 NF라고 불러요. 프로그램은 “패턴 {동작}” 규칙의 목록이라 awk \'$3 >= 500 {print $2}\'는 상태 코드가 500 이상인 줄의 경로만 출력해요. 패턴을 빼면 모든 줄에, 동작을 빼면 줄을 그대로 출력해요. BEGIN은 첫 줄 전에, END는 마지막 줄 뒤에 한 번 실행돼요. 문자열을 키로 쓰는 연관 배열 덕분에 awk \'{c[$3]++} END {for (s in c) print s, c[s]}\'로 상태 코드별 개수를(sort | uniq -c를 한 번에), awk \'{s += $4} END {print s/NR}\'로 평균 응답 시간을 구해요. 예시 로그 6줄이면 200이 3번, 500이 2번, 404가 1번이고 평균은 110.7 ms예요. printf로 형식을 맞추고, 변수는 선언 없이 0이나 빈 문자열로 시작해요. 따옴표 안에 쉼표가 있는 CSV나 JSON처럼 구조가 복잡해지면 csvkit, jq, 파이썬이 더 안전해요.', 'A small text-processing language that splits lines into fields and runs actions on lines matching patterns. Column sums, averages and group counts take one line.', 'awk reads input line by line, splits it on whitespace (or the separator given with -F) and names the fields $1, $2, …, the whole line $0, the line number NR and the field count NF. A program is a list of “pattern {action}” rules, so awk \'$3 >= 500 {print $2}\' prints the path of every line whose status is 500 or more. Without a pattern the action runs on every line; without an action the line is printed. BEGIN runs once before the first line and END once after the last. Arrays keyed by strings make grouping easy: awk \'{c[$3]++} END {for (s in c) print s, c[s]}\' counts lines per status (sort | uniq -c in one step), and awk \'{s += $4} END {print s/NR}\' averages a column. For the six sample lines that gives three 200s, two 500s and one 404, with a mean of 110.7 ms. printf formats output, and variables need no declaration, starting as 0 or the empty string. For quoted CSV or JSON, csvkit, jq or Python are safer.', sAwk())],
  'lx-xargs': [item('lx-cmdsub', '명령 치환', 'Command substitution', '$(명령)은 안쪽 명령을 먼저 실행해 그 출력을 명령줄의 그 자리에 끼워 넣어요. 결과는 거의 언제나 따옴표로 감싸요.', '셸은 명령줄을 실행하기 전에 $( ) 안의 명령을 서브셸에서 먼저 돌리고, 그 표준 출력을 문자열로 받아 그 자리에 넣어요. echo "오늘은 $(date +%F)"는 echo "오늘은 2026-11-10"이 되어 실행돼요. 출력 끝의 줄바꿈은 모두 지워지므로 today=$(date +%F), n=$(wc -l < access.log)처럼 변수에 담기 좋고, if out=$(make 2>&1); then …은 출력과 종료 코드를 함께 써요. 따옴표 없이 쓰면 결과가 공백·탭·줄바꿈에서 쪼개지고 *도 파일 이름으로 펼쳐져서, 내용이 my report.pdf일 때 open $(cat name.txt)는 인자 2개(my, report.pdf)가 돼요. "$(cat name.txt)"로 감싸면 인자 하나예요. 옛 백틱 `cmd`도 같은 일을 하지만 중첩하려면 \\로 이스케이프해야 해서, dir=$(dirname "$(readlink -f "$0")")처럼 $( )가 훨씬 읽기 쉬워요. 비슷한 프로세스 치환 <(cmd)는 출력을 문자열이 아니라 /dev/fd/63 같은 파일 경로로 넘겨서 diff <(sort a) <(sort b)처럼 파일을 받는 명령에 써요. 매번 서브셸을 띄우니 큰 반복문 안에서는 느리고, 여러 줄을 인자로 나눠야 할 때는 xargs나 mapfile을 써요.', '$(command) runs the inner command first and splices its output into the command line. Almost always wrap the result in quotes.', 'Before running a command line, the shell runs the command inside $( ) in a subshell, captures its standard output as a string and puts it in place: echo "today is $(date +%F)" runs as echo "today is 2026-11-10". Trailing newlines are stripped, which suits variables such as today=$(date +%F) or n=$(wc -l < access.log), and if out=$(make 2>&1); then … uses both the output and the exit status. Unquoted, the result is split on spaces, tabs and newlines and * is expanded, so when name.txt holds my report.pdf, open $(cat name.txt) receives two arguments (my and report.pdf); "$(cat name.txt)" passes one. Old backticks `cmd` do the same but need backslash escapes to nest, so dir=$(dirname "$(readlink -f "$0")") is far easier to read with $( ). Its cousin, process substitution <(cmd), passes output as a file path such as /dev/fd/63 rather than as text, for commands that want files, as in diff <(sort a) <(sort b). Each substitution forks a subshell, so it is slow in big loops, and multi-line output that must become separate arguments belongs to xargs or mapfile.', sCmdSub())],
  'lx-jobs': [item('lx-tmux', 'tmux', 'tmux', '터미널 세션을 서버 쪽 프로세스가 붙잡아 두는 터미널 멀티플렉서예요. SSH가 끊겨도 작업이 계속 돌고, 다시 붙으면 화면이 그대로 돌아와요.', 'SSH로 접속해 그냥 실행한 작업은 연결이 끊기면 셸과 함께 SIGHUP을 받아 종료돼요. tmux는 터미널(의사 터미널)을 쥐고 있는 tmux 서버 프로세스를 따로 띄우고, 우리가 보는 화면은 그 서버에 붙은 클라이언트일 뿐이에요. 그래서 연결이 끊기면 클라이언트만 사라지고 서버와 그 안의 셸, 작업은 계속 돌아요. 다시 접속해 tmux attach -t work를 하면 화면과 출력이 그대로 돌아오고, 다른 PC에서 붙어도 돼요. 구조는 세션 > 창(window) > 판(pane)이에요. Ctrl-b d로 분리(detach), Ctrl-b c로 새 창, Ctrl-b %와 Ctrl-b "로 좌우·위아래 분할, tmux ls로 세션 목록을 봐요. 한 화면에 에디터, 로그, htop을 나란히 띄워 쓰고, 같은 세션에 두 사람이 붙어 함께 작업할 수도 있어요. 설정은 ~/.tmux.conf에 두고, 비슷한 옛 도구로 screen이 있어요. 재부팅 뒤에도 돌아야 하는 서비스는 tmux가 아니라 systemd 유닛으로 만들어요.', 'A terminal multiplexer whose server process holds terminal sessions open. Jobs keep running when SSH drops, and reattaching brings the screen back.', 'A job started directly over SSH receives SIGHUP along with its shell and dies when the connection drops. tmux starts a separate tmux server process that owns the (pseudo-)terminal, and what you see is just a client attached to it. When the connection drops, only the client goes away; the server, its shells and their jobs keep running. Reconnect and run tmux attach -t work to get the screen and output back, even from another machine. The structure is session > window > pane: Ctrl-b d detaches, Ctrl-b c opens a window, Ctrl-b % and Ctrl-b " split side by side or top and bottom, and tmux ls lists sessions. One screen can hold an editor, a log and htop together, and two people can attach to the same session to pair. Settings live in ~/.tmux.conf, and screen is the older tool in the same family. Services that must survive reboots belong in a systemd unit, not in tmux.', sTmux())]
} };
})();

window.UX = page([
  sec('lx-fs', '파일과 권한', 'Files & permissions', '파일과 권한', 'Files and permissions',
    '리눅스 파일 트리를 돌아다니고 접근을 다루는 법이에요.', 'Getting around the Linux file tree and controlling access.', [
    item('lx-tree', '파일 시스템 구조', 'Filesystem layout', '리눅스의 모든 파일은 / 하나에서 시작하는 트리에 있어요. 디렉터리마다 쓰임새가 정해져 있어요(FHS).', '/etc 설정, /home 사용자, /var 로그·DB처럼 변하는 데이터, /tmp 임시, /usr 프로그램과 라이브러리, /usr/local 직접 설치한 것, /proc·/sys 커널이 보여주는 가상 파일, /dev 장치. 디스크는 드라이브 문자 대신 /mnt, /data 같은 디렉터리에 마운트해서 붙여요.', 'Every Linux file hangs off a single root, /. Each top-level directory has a set purpose (the FHS).', '/etc holds config, /home users, /var changing data such as logs and databases, /tmp scratch space, /usr programs and libraries, /usr/local your own installs, /proc and /sys virtual files from the kernel, /dev devices. Disks are mounted onto directories such as /mnt or /data instead of getting drive letters.', sTree()),
    item('lx-path', '경로와 이동', 'Paths and navigation', '절대 경로는 /부터, 상대 경로는 지금 위치(현재 디렉터리)부터 찾아가요. ., .., ~ 로 짧게 써요.', 'pwd 현재 위치, cd 이동, cd - 직전 위치, cd ~ 또는 cd 홈. 상대 경로는 짧지만 실행 위치에 따라 결과가 달라지므로 크론·스크립트에서는 절대 경로나 "$(dirname "$0")" 기준이 안전해요. 탭 완성으로 오타를 줄여요.', 'Absolute paths start at /; relative paths start from the current directory. ., .. and ~ are shortcuts.', 'pwd prints where you are, cd moves, cd - jumps back, cd ~ (or plain cd) goes home. Relative paths are short but depend on where you run them, so cron jobs and scripts are safer with absolute paths or paths based on "$(dirname "$0")". Tab completion saves typos.', sPath()),
    item('lx-perm', '파일 권한 (chmod)', 'File permissions (chmod)', '파일마다 소유자·그룹·그 외 사람에 대해 읽기(r)·쓰기(w)·실행(x) 권한이 있어요. 세 비트씩 묶어 754 같은 숫자로 써요.', 'r = 4, w = 2, x = 1. 644(rw-r--r--)는 일반 파일, 755(rwxr-xr-x)는 실행 파일·디렉터리, 600은 SSH 개인 키. 디렉터리에서 x는 들어가기, r은 목록, w는 파일 생성·삭제. chown으로 소유자 변경, umask가 새 파일의 기본값을 정해요. 777은 거의 항상 잘못된 해결책이에요.', 'Each file grants read (r), write (w) and execute (x) separately to its owner, its group and everyone else. Three bits per group make an octal number such as 754.', 'r = 4, w = 2, x = 1. 644 (rw-r--r--) suits ordinary files, 755 (rwxr-xr-x) executables and directories, 600 SSH private keys. On a directory, x means enter, r list, w create or delete entries. chown changes the owner and umask sets defaults for new files. 777 is almost always the wrong fix.', sPerm()),
    item('lx-links', '하드 링크와 심볼릭 링크', 'Hard and symbolic links', '하드 링크는 같은 데이터(inode)에 이름을 하나 더 붙이고, 심볼릭 링크는 다른 경로를 적어 둔 바로가기예요.', 'ln a b는 하드 링크(링크 수 증가, 원본을 지워도 유지, 같은 디스크·파일만), ln -s a b는 심볼릭 링크(디렉터리·다른 디스크도 가능, 원본이 사라지면 끊김). 버전 전환(current → releases/v2.3), /usr/bin/python → python3 같은 곳에 심링크를 써요. ls -li로 inode 번호 확인.', 'A hard link gives the same data (inode) a second name; a symbolic link is a shortcut that stores another path.', 'ln a b makes a hard link (link count goes up, survives deleting the original, same filesystem and files only); ln -s a b makes a symlink (works for directories and across disks, breaks if the target disappears). Symlinks power version switching (current → releases/v2.3) and aliases such as /usr/bin/python → python3. ls -li shows inode numbers.', sLinks()),
    item('lx-glob', '글로브 패턴과 find', 'Glob patterns and find', '*.log 같은 패턴은 셸이 명령 실행 전에 맞는 파일 이름 목록으로 바꿔요. 하위 폴더까지 조건으로 찾을 땐 find를 써요.', '* 아무 글자, ? 한 글자, [ab] 문자 하나, {a,b} 나열(파일 존재 여부와 무관). 따옴표 안에서는 펼쳐지지 않아요. find . -name "*.log" -mtime -1 -size +10M -exec gzip {} +. 맞는 파일이 없으면 bash는 패턴을 그대로 넘기니 rm 같은 명령에 주의.', 'Patterns such as *.log are turned into matching file names by the shell before the command runs. For subfolders and conditions, use find.', '* matches anything, ? one character, [ab] one of a set, {a,b} lists alternatives whether or not files exist. Quotes stop expansion. find . -name "*.log" -mtime -1 -size +10M -exec gzip {} + searches with conditions. With no match bash passes the pattern through unchanged, so be careful with rm.', sGlob())
  ].concat(XT.add['lx-fs'] || [])),
  sec('lx-text', '텍스트 처리', 'Text processing', '텍스트 처리', 'Text processing',
    '작은 도구를 파이프로 이어 데이터를 다뤄요.', 'Chaining small tools with pipes to work on data.', [
    item('lx-pipeline', '파이프라인 조합', 'Composing pipelines', '한 가지 일만 하는 작은 명령을 파이프(|)로 이어 복잡한 질문에 답해요. 앞 명령의 출력이 다음 명령의 입력이 돼요.', '예: grep \' 500 \' access.log | awk \'{print $1}\' | sort | uniq -c | sort -rn | head → 500 오류를 가장 많이 낸 IP. uniq는 붙어 있는 중복만 세므로 앞에 sort가 필요해요. 단계마다 head를 붙여 중간 결과를 확인하며 만들어요.', 'Chain single-purpose commands with | to answer complex questions; each command’s output becomes the next one’s input.', 'grep \' 500 \' access.log | awk \'{print $1}\' | sort | uniq -c | sort -rn | head lists the IPs causing the most 500 errors. uniq counts only adjacent duplicates, hence the sort before it. Build pipelines step by step, checking intermediate output with head.', sPipeline()),
    item('lx-grep', 'grep과 정규식', 'grep and regular expressions', 'grep은 패턴과 맞는 줄만 골라 보여줘요. 정규식으로 글자 그대로가 아니라 형태로 찾을 수 있어요.', '-i 대소문자 무시, -v 반대, -c 개수, -n 줄 번호, -r 폴더 전체, -A/-B/-C 앞뒤 줄, -o 맞은 부분만, -E 확장 정규식. ^ 줄 시작, $ 줄 끝, . 아무 글자, [0-9]+ 숫자 하나 이상, \\b 단어 경계. ripgrep(rg)은 .gitignore를 존중하고 훨씬 빨라요.', 'grep keeps only lines matching a pattern; regular expressions match by shape rather than exact text.', '-i ignores case, -v inverts, -c counts, -n numbers lines, -r recurses, -A/-B/-C add context, -o prints only the match, -E enables extended regex. ^ start, $ end, . any character, [0-9]+ one or more digits, \\b word boundary. ripgrep (rg) respects .gitignore and is much faster.', sGrep()),
    item('lx-sedawk', 'sed와 awk', 'sed and awk', 'sed는 줄 단위로 찾아 바꾸고 지우는 스트림 편집기, awk는 줄을 열로 나눠 거르고 계산하는 작은 언어예요.', "sed 's/old/new/g' 바꾸기, sed -i 파일 직접 수정, sed '/^#/d' 주석 삭제. awk -F, '{s+=$3} END {print s}' 합계, awk '$2==\"web\" {print $1}' 조건 출력. 따옴표 안 쉼표가 있는 CSV, JSON처럼 구조가 복잡해지면 csvkit·jq·파이썬으로 넘어가요.", 'sed is a stream editor for line-by-line find, replace and delete; awk is a tiny language that splits lines into fields to filter and compute.', "sed 's/old/new/g' replaces, sed -i edits files in place, sed '/^#/d' drops comment lines. awk -F, '{s+=$3} END {print s}' sums a column; awk '$2==\"web\" {print $1}' prints by condition. For CSV with quoted commas or for JSON, move to csvkit, jq or Python.", sSedawk()),
    item('lx-redirect', '리다이렉션', 'Redirection', '프로그램을 고치지 않고 입력과 출력의 방향을 바꿔요. >는 출력, 2>는 에러, <는 입력을 파일로 연결해요.', '> 덮어쓰기, >> 이어 쓰기, 2>&1 에러를 출력과 같은 곳으로, &> 둘 다(bash), < 파일 입력, << 히어독, /dev/null 버리기, tee 화면과 파일 동시. 순서가 중요해요: cmd > f 2>&1은 둘 다 파일로, cmd 2>&1 > f는 에러만 화면에 남아요.', 'Rewire a program’s input and output without changing it: > for output, 2> for errors, < for input from a file.', '> overwrites, >> appends, 2>&1 sends errors wherever output goes, &> does both (bash), < reads a file, << is a here-doc, /dev/null discards, tee writes to screen and file at once. Order matters: cmd > f 2>&1 sends both to the file, cmd 2>&1 > f leaves errors on screen.', sRedirect()),
    item('lx-xargs', 'xargs와 명령 치환', 'xargs and command substitution', '앞 명령의 출력을 다른 명령의 인자로 넘겨요. xargs는 입력 줄을 인자로 모아 실행하고, $( )는 출력을 그 자리에 끼워 넣어요.', '공백이 든 파일 이름은 쪼개지므로 find -print0 | xargs -0을 써요. 인자가 너무 많으면 "Argument list too long" → xargs가 나눠 실행해요. -P 8 병렬, -I{} 자리 표시자, -n 1 하나씩. find -exec {} +도 비슷한 일을 해요.', 'Feed one command’s output into another as arguments: xargs gathers input lines into arguments, and $( ) pastes output in place.', 'Names with spaces split apart, so use find -print0 | xargs -0. Too many arguments trigger “Argument list too long”, and xargs batches them for you. -P 8 runs in parallel, -I{} is a placeholder, -n 1 passes one at a time. find -exec {} + does a similar job.', sXargs())
  ].concat(XT.add['lx-text'] || [])),
  sec('lx-shell', '셸 스크립트', 'Shell scripting', '셸 스크립트', 'Shell scripting',
    '셸이 명령줄을 해석하는 규칙과 자동화의 기본이에요.', 'How the shell reads a command line, and the basics of automation.', [
    item('lx-quote', '셸 확장과 따옴표', 'Expansion and quoting', '셸은 명령을 실행하기 전에 변수·명령 치환·글로브를 펼치고 공백에서 단어를 나눠요. 따옴표가 이 과정을 조절해요.', '순서: 중괄호 {a,b} → ~ → $변수·$( )·$(( )) → 단어 분리 → 글로브. 따옴표 없는 $f에 공백이 있으면 인자가 여러 개로 쪼개져요. "$var"는 변수만 펼치고 한 덩어리, \'…\'은 아무것도 안 펼쳐요. 변수는 거의 항상 큰따옴표로 감싸고 shellcheck로 확인해요.', 'Before running a command the shell expands variables, command substitutions and globs and splits words at spaces. Quotes control that process.', 'Order: braces {a,b} → ~ → $vars, $( ) and $(( )) → word splitting → globs. An unquoted $f containing a space becomes several arguments. "$var" expands but stays one word; \'…\' expands nothing. Quote variables almost always, and let shellcheck catch the misses.', sQuote()),
    item('lx-exit', '종료 코드와 &&, ||', 'Exit codes, && and ||', '모든 명령은 종료 코드를 남겨요. 0은 성공, 그 외는 실패이고 &&와 ||로 결과에 따라 다음 명령을 고를 수 있어요.', '$?로 직전 종료 코드 확인. make && ./app || echo failed. 파이프라인은 마지막 명령의 코드만 남아 앞의 실패를 놓치므로 set -o pipefail. 스크립트 맨 위에 set -euo pipefail: 실패하면 멈추고, 정의 안 된 변수는 에러로. CI 파이프라인도 종료 코드로 성공·실패를 판단해요.', 'Every command leaves an exit status: 0 for success, anything else for failure. && and || choose the next command based on it.', '$? holds the last status. make && ./app || echo failed. A pipeline reports only its last command, hiding earlier failures, so set -o pipefail. Start scripts with set -euo pipefail: stop on errors and treat unset variables as errors. CI pipelines judge success by exit codes too.', sExit()),
    item('lx-env', '환경 변수와 PATH', 'Environment variables and PATH', '명령 이름만 입력하면 셸이 PATH의 디렉터리를 앞에서부터 찾아 처음 나온 것을 실행해요. 환경 변수는 자식 프로세스에 복사돼요.', 'which·type으로 실제 실행될 파일 확인. export PATH="$HOME/bin:$PATH"처럼 앞에 넣은 것이 우선. export한 변수만 자식에게 전달되고 부모로는 돌아가지 않아요. VAR=1 cmd는 그 명령에만. 설정은 ~/.bashrc·~/.profile·~/.zshrc에. 비밀 값은 환경 변수로 넘기되 로그에 남지 않게.', 'Type a bare command and the shell walks the directories in PATH, running the first match. Environment variables are copied into child processes.', 'which and type show what will actually run. Entries placed first win, as in export PATH="$HOME/bin:$PATH". Only exported variables reach children, and nothing flows back to the parent. VAR=1 cmd sets it for one command. Settings live in ~/.bashrc, ~/.profile or ~/.zshrc. Pass secrets through the environment, but keep them out of logs.', sEnv()),
    item('lx-script', '셸 스크립트 기본', 'Shell script basics', '#!로 인터프리터를 정하고 실행 권한을 주면 명령처럼 실행돼요. 인자, 조건, 반복으로 반복 작업을 자동화해요.', '$1 $2 위치 인자, $# 개수, "$@" 전체, ${2:-기본값}. [ -d dir ], [ -f file ], [ -z "$s" ], 숫자 비교 -eq -lt. for f in "$dir"/*.conf; do … done. 에러는 >&2로 내고 exit 1. 함수, trap으로 정리 작업. 길어지거나 자료구조가 필요하면 파이썬이 나아요.', 'Pick an interpreter with #!, set the execute bit, and the script runs like any command. Arguments, conditions and loops automate repetitive work.', '$1 $2 are positional arguments, $# their count, "$@" all of them, ${2:-default} a fallback. Tests: [ -d dir ], [ -f file ], [ -z "$s" ], numeric -eq and -lt. for f in "$dir"/*.conf; do … done. Report errors with >&2 and exit 1; clean up with trap. Once it grows or needs real data structures, Python is the better tool.', sScript()),
    item('lx-jobs', '작업 제어와 세션', 'Job control and sessions', '&로 백그라운드 실행, Ctrl+Z로 멈춤, bg·fg로 이어서 실행해요. 터미널을 닫아도 계속 돌리려면 tmux나 nohup이 필요해요.', 'jobs로 목록, fg %2로 2번 작업을 앞으로. 터미널을 닫으면 SIGHUP으로 작업이 종료돼요 → nohup cmd &, disown, 또는 tmux·screen 세션에서 실행하면 SSH가 끊겨도 유지. 계속 돌아야 하는 서비스는 systemd 유닛으로 만들어요.', 'Start work in the background with &, pause it with Ctrl+Z, resume with bg or fg. To survive closing the terminal you need tmux or nohup.', 'jobs lists them and fg %2 brings job 2 forward. Closing the terminal sends SIGHUP and kills jobs, so use nohup cmd &, disown, or a tmux or screen session that survives a dropped SSH connection. Services that must keep running belong in a systemd unit.', sJobs())
  ].concat(XT.add['lx-shell'] || [])),
  sec('lx-admin', '시스템 관리', 'System administration', '시스템 관리', 'System administration',
    '서버 상태를 보고 서비스·디스크·패키지·일정을 다뤄요.', 'Watching a server and managing services, disks, packages and schedules.', [
    item('lx-top', 'top으로 상태 보기', 'Reading top', 'top은 CPU·메모리·부하와 자원을 많이 쓰는 프로세스를 실시간으로 보여줘요. 서버가 느릴 때 가장 먼저 보는 화면이에요.', 'load average는 실행 중이거나 기다리는 작업 수의 1·5·15분 평균으로 코어 수와 비교해요. us/sy/id/wa 중 wa가 높으면 디스크 병목. free가 작아도 buff/cache는 필요하면 돌려주니 available을 봐요. %CPU 200은 코어 2개. htop, ps aux --sort=-%cpu, vmstat 1, iostat -x 1.', 'top shows CPU, memory, load and the hungriest processes live: the first screen to open when a server is slow.', 'Load average is runnable plus waiting tasks over 1, 5 and 15 minutes; compare it with the core count. Of us/sy/id/wa, a high wa means the disk is the bottleneck. A small free is fine because buff/cache is returned on demand, so watch available. %CPU 200 means two cores. Also htop, ps aux --sort=-%cpu, vmstat 1, iostat -x 1.', sTop()),
    item('lx-systemd', 'systemd 서비스', 'systemd services', '서비스를 유닛 파일로 정의하고 systemctl로 시작·중지·자동 시작을 관리해요. 죽으면 다시 살리고 로그도 모아 줘요.', 'systemctl enable --now api(지금 + 부팅 시), status, restart, stop. Restart=on-failure로 자동 재시작, User=로 권한 낮추기, After=로 순서. journalctl -u api -f로 로그, systemctl daemon-reload로 유닛 변경 반영. 타이머(크론 대체)와 cgroup 자원 제한(MemoryMax)도 제공해요.', 'Describe a service in a unit file and let systemctl start, stop and enable it. systemd restarts it when it dies and collects its logs.', 'systemctl enable --now api (start now and at boot), status, restart, stop. Restart=on-failure restarts automatically, User= drops privileges, After= orders startup. journalctl -u api -f follows logs; systemctl daemon-reload picks up unit edits. It also offers timers (a cron replacement) and cgroup limits such as MemoryMax.', sSystemd()),
    item('lx-disk', '디스크와 마운트', 'Disks and mounts', 'df로 파일 시스템별 사용량을, du로 폴더별 크기를 봐요. 새 디스크는 디렉터리에 마운트해서 트리에 붙여요.', 'df -h, du -sh /var/* | sort -h, ncdu. mount /dev/sdb1 /data, 부팅 때 자동은 /etc/fstab(UUID로). df에 여유가 있는데 "No space left on device"면 inode 고갈(df -i)이나 지웠지만 열려 있는 파일(lsof +L1). 로그는 logrotate, journald는 --vacuum-size로 줄여요.', 'df shows usage per filesystem and du per folder. A new disk joins the tree by mounting it on a directory.', 'df -h, du -sh /var/* | sort -h, ncdu. mount /dev/sdb1 /data; for boot-time mounts use /etc/fstab (by UUID). “No space left on device” with room in df means exhausted inodes (df -i) or deleted files still held open (lsof +L1). Tame logs with logrotate and journald with --vacuum-size.', sDisk()),
    item('lx-pkg', '패키지 관리자', 'Package managers', '패키지 관리자는 저장소에서 소프트웨어를 받아 의존성까지 맞춰 설치·업데이트·삭제해요. 서명을 확인해 변조를 막아요.', 'apt update(목록 갱신) → apt install/upgrade. 데비안·우분투 apt(.deb), 레드햇·페도라 dnf(.rpm), 알파인 apk, macOS brew. dpkg -L로 설치된 파일 목록. 시스템 파이썬에 pip install은 피하고 venv를, 버전 고정은 apt-mark hold. 컨테이너 이미지에서는 설치 후 캐시를 지워 크기를 줄여요.', 'A package manager downloads software from repositories, resolves dependencies and installs, updates or removes it, checking signatures against tampering.', 'apt update refreshes the index, then apt install or upgrade. Debian and Ubuntu use apt (.deb), Red Hat and Fedora dnf (.rpm), Alpine apk, macOS brew. dpkg -L lists a package’s files. Avoid pip-installing into the system Python (use a venv); pin versions with apt-mark hold. In container images, clear the cache after installing to keep them small.', sPkg()),
    item('lx-cron', '크론 예약 작업', 'Scheduled jobs with cron', '크론은 분·시·일·월·요일 다섯 칸으로 정한 시각에 명령을 실행해요. 백업·정리·보고서 같은 반복 작업에 써요.', '*/15 9-18 * * 1-5 = 평일 9~18시 15분마다. crontab -e로 편집. 함정: 최소한의 환경(PATH가 짧음), 출력은 리다이렉션하지 않으면 메일로 가거나 사라짐, 서버 시간대 기준, 이전 실행과 겹침(flock -n). systemd 타이머, 쿠버네티스 CronJob, 클라우드 스케줄러가 대안이에요.', 'cron runs commands at times set by five fields: minute, hour, day of month, month and weekday. Backups, cleanups and reports run this way.', '*/15 9-18 * * 1-5 means every 15 minutes, 9 to 18, Monday to Friday. Edit with crontab -e. Gotchas: a minimal environment (short PATH), output that is mailed or lost unless redirected, the server’s time zone, and overlapping runs (wrap with flock -n). Alternatives: systemd timers, Kubernetes CronJobs, cloud schedulers.', sCron()),
    item('lx-logs', '로그 보기와 관리', 'Reading and managing logs', 'tail -f로 로그를 실시간으로 따라가고, grep으로 거르고, journalctl로 서비스 로그를 봐요. logrotate가 로그가 디스크를 채우지 않게 관리해요.', 'tail -f app.log | grep --line-buffered ERROR, less +F, journalctl -u api --since "1 hour ago" -p err. logrotate: 매일 돌리고 7개 보관·압축. 서버가 여러 대면 ELK(Elasticsearch·Kibana), Loki·Grafana, 클라우드 로깅으로 한곳에 모아요. JSON 구조화 로그는 필드로 거르기 쉬워요.', 'Follow logs live with tail -f, filter them with grep, and read service logs with journalctl. logrotate keeps logs from filling the disk.', 'tail -f app.log | grep --line-buffered ERROR, less +F, journalctl -u api --since "1 hour ago" -p err. logrotate rotates daily, keeping seven compressed copies. With many servers, centralize in ELK (Elasticsearch, Kibana), Loki and Grafana, or cloud logging. Structured JSON logs filter cleanly by field.', sLogs())
  ].concat(XT.add['lx-admin'] || [])),
  sec('lx-remote', '원격 접속과 네트워크', 'Remote & network', '원격 접속과 네트워크', 'Remote access and networking',
    '서버에 안전하게 들어가고 연결 문제를 찾는 법이에요.', 'Getting into servers safely and tracking down connection problems.', [
    item('lx-ssh', 'SSH 키 인증', 'SSH key authentication', '공개 키를 서버에 등록해 두면, 접속할 때 개인 키로 서명해서 신원을 증명해요. 비밀번호가 네트워크로 오가지 않아요.', 'ssh-keygen -t ed25519로 키 쌍 생성, ssh-copy-id로 공개 키를 ~/.ssh/authorized_keys에 등록. 처음 접속 때 서버 호스트 키 지문을 확인해 known_hosts에 저장하고, 바뀌면 경고(재설치 또는 중간자 공격). 비밀번호 로그인 끄기, ~/.ssh/config 별칭, ssh-agent, 개인 키 권한 600.', 'Register your public key on the server and prove your identity by signing with the private key at login; no password ever crosses the network.', 'ssh-keygen -t ed25519 makes the pair; ssh-copy-id adds the public key to ~/.ssh/authorized_keys. On first connect you confirm the server’s host-key fingerprint, stored in known_hosts; a changed key raises a warning (a rebuild, or a man-in-the-middle). Disable password logins, use ~/.ssh/config aliases and ssh-agent, and keep the private key at mode 600.', sSsh()),
    item('lx-netdiag', '네트워크 진단', 'Network troubleshooting', '“접속이 안 돼요”는 DNS → IP 도달 → 포트 → 애플리케이션 순으로 아래 계층부터 하나씩 확인해요.', 'dig·nslookup(이름 해석), ping(도달·지연), nc -zv host 443(포트 열림), curl -v(HTTP·TLS 상세). 서버에서는 ss -tlnp로 듣고 있는 포트와 프로세스, 방화벽(ufw, iptables, 보안 그룹) 확인. 경로는 traceroute·mtr, 패킷은 tcpdump·Wireshark.', 'Break “it won’t connect” into layers and check from the bottom: DNS, then reachability, then the port, then the application.', 'dig or nslookup for name resolution, ping for reachability and latency, nc -zv host 443 for an open port, curl -v for HTTP and TLS details. On the server, ss -tlnp shows which process listens where; check firewalls (ufw, iptables, security groups). traceroute or mtr for the path, tcpdump or Wireshark for packets.', sNetdiag()),
    item('lx-tunnel', 'SSH 포트 포워딩', 'SSH port forwarding', 'SSH 연결을 통로로 삼아 내 컴퓨터의 포트를 원격 네트워크 안의 서버로 이어요. 사설망의 DB에 안전하게 접속할 때 써요.', 'ssh -L 5433:db.internal:5432 bastion → localhost:5433이 db:5432로 연결. -R은 반대(원격 포트 → 내 컴퓨터), -D는 SOCKS 프록시, -J는 점프 호스트 경유, -N은 명령 없이 터널만. 트래픽이 SSH로 암호화돼요. 상시로 쓰면 VPN이나 클라우드의 세션 관리 기능이 더 적합해요.', 'Use an SSH connection as a pipe linking a port on your machine to a server inside a remote network, such as a database on a private subnet.', 'ssh -L 5433:db.internal:5432 bastion makes localhost:5433 reach db:5432. -R forwards the other way (remote port → your machine), -D runs a SOCKS proxy, -J hops through a jump host, -N opens only the tunnel. Traffic rides encrypted inside SSH. For permanent access, a VPN or the cloud’s session manager fits better.', sTunnel()),
    item('lx-rsync', 'rsync 동기화', 'Syncing with rsync', 'rsync는 양쪽 파일을 비교해 바뀐 부분만 보내는 동기화 도구예요. 백업과 배포에 많이 써요.', '크기·수정 시각으로 비교하고, 바뀐 파일은 롤링 체크섬으로 다른 블록만 전송. -a 권한·시각 유지, -z 압축, -P 진행률·이어받기, --delete 원본에 없는 파일 삭제. 끝 슬래시 주의: src/는 내용물, src는 폴더째. 실행 전 -n(--dry-run)으로 확인해요.', 'rsync compares both sides and transfers only what changed: a staple of backups and deployments.', 'It compares size and modification time, then sends only the differing blocks of changed files using a rolling checksum. -a preserves permissions and times, -z compresses, -P shows progress and resumes, --delete removes files missing from the source. Mind the trailing slash: src/ copies the contents, src the folder itself. Dry-run first with -n.', sRsync())
  ].concat(XT.add['lx-remote'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
if (XT.after) for (const [pid, its] of Object.entries(XT.after)) { const s = window.UX.find(q => q.items.some(t => t.id === pid)); if (!s) throw new Error('after: no parent ' + pid); s.items.splice(s.items.findIndex(t => t.id === pid) + 1, 0, ...its); window.UX[0].css += '\n' + its.map(t => t.css || '').join('\n'); }
if (XT.order) { const base = window.UX[0].css; window.UX[0].css = ''; const pos = s => { const i = XT.order.indexOf(s.id); return i < 0 ? 1000 : i; }; const idx = new Map(window.UX.map((s, i) => [s, i])); window.UX.sort((a, b) => pos(a) - pos(b) || idx.get(a) - idx.get(b)); window.UX[0].css = base + '\n' + window.UX[0].css; }
window.UX[0].css += `
.lx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.lx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.lx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.lx-r .in{color:var(--danger);font-weight:800}
.lx-g .in{color:var(--ok);font-weight:800}
.lx-a .in{color:var(--accent);font-weight:800}
.lx-w .in{color:var(--warn);font-weight:800}
.lx-c .in{font-size:.6em;font-weight:700}
.lx-tm .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.lx-tiny .in{font-size:.46em;white-space:pre;color:var(--ink);font-weight:600}
.lx-tm.lx-pr .in{color:var(--accent);font-weight:700}
.lx-tm.lx-er .in{color:var(--danger)}
.lx-tm.lx-g .in{color:var(--ok)}
.lx-tm.lx-a .in{color:var(--accent);font-weight:800}
.lx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;
})();
