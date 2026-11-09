(() => {
const { scene, node, cell, text, arrow, pill, box, dot, gantt, link, AR, item, sec, page, C, seq } = CZ;
const hid = (o) => Object.assign({ opacity: '0' }, o || {});
const PC = { P1: C.soft, P2: C.cmp, P3: C.ok, P4: C.bad };

/* ---------- processes & threads ---------- */
function sState() {
  const S = scene({ id: 'os-state', steps: 7, per: 1.05 });
  const B = { nw: [5, 4.5, ['생성', 'New']], rd: [10.5, 11.5, ['준비', 'Ready']], rn: [21.5, 11.5, ['실행', 'Running']], wt: [16, 17.6, ['대기', 'Waiting']], tm: [27, 4.5, ['종료', 'Exit']] };
  Object.entries(B).forEach(([k, [x, y, l]]) => box(S, k, x - 3.4, y - 1.2, 6.8, 2.4, l));
  [[6, 5.9, 9, 10.1], [14.1, 11, 17.9, 11], [17.9, 12.1, 14.1, 12.1], [20.5, 12.9, 18, 16.2], [14, 16.2, 11.5, 12.9], [23, 10.1, 26, 5.9]].forEach(([a, b, c, d], i) => arrow(S, 'a' + i, a, b, c, d));
  text(S, 'l0', 2.6, 7.4, 'admit', { cls: 'cz-t' }); text(S, 'l1', 14.2, 9.5, 'dispatch', { cls: 'cz-t' }); text(S, 'l5', 14.2, 12.5, ['타임아웃', 'timeout'], { cls: 'cz-t' });
  text(S, 'l2', 20.3, 14.4, ['I/O 요청', 'I/O wait'], { cls: 'cz-t' }); text(S, 'l3', 8.1, 14.4, ['I/O 완료', 'I/O done'], { cls: 'cz-t' }); text(S, 'l4', 25.6, 8.2, 'exit', { cls: 'cz-t' });
  dot(S, 'p', B.nw[0] - 2.4, B.nw[1], 'P', { r: .8 });
  const path = ['nw', 'rd', 'rn', 'wt', 'rd', 'rn', 'tm'];
  path.forEach((k, s) => { if (s) { S.move('p', s, B[k][0] - 3.2, B[k][1] - .8); S.set(k, s, C.soft); if (path[s - 1] !== k) S.set(path[s - 1], s, C.idle); } });
  S.set('nw', 0, C.soft);
  S.cap(0, '프로세스가 만들어지면', 'A process is created').cap(1, '준비 큐에서 CPU 차례를 기다려요', 'It waits in the ready queue for the CPU').cap(2, '스케줄러가 골라 CPU에서 실행', 'The scheduler dispatches it to the CPU')
    .cap(3, '디스크·네트워크를 기다리는 동안은 대기 상태', 'While waiting for disk or network it is blocked').cap(4, 'I/O가 끝나면 다시 준비 큐로', 'When I/O completes it goes back to ready')
    .cap(5, '다시 실행 · 시간이 다 되면 준비로 돌아가기도 해요', 'Running again · a timeout sends it back to ready').cap(6, '일을 마치면 종료', 'Finished: it exits');
  return S;
}
function sThread() {
  const S = scene({ id: 'os-thread', steps: 4, per: 1.5 });
  box(S, 'pa', 1.2, 1.8, 16.4, 17.6, '', { css: 'border-color:var(--accent)' });
  text(S, 'pat', 2, 2.3, ['프로세스 A', 'Process A'], { cls: 'cz-t' });
  [['코드', 'Code'], ['데이터', 'Data'], ['힙', 'Heap']].forEach((l, i) => cell(S, 'sh' + i, 2.2 + i * 5.1, 4.3, l, { w: 4.6, h: 2.6 }));
  for (let t = 0; t < 3; t++) {
    const x = 2.2 + t * 5.1, show = t === 0 ? {} : hid();
    cell(S, 'st' + t, x, 8.6, [`스택 ${t + 1}`, `Stack ${t + 1}`], { w: 4.6, h: 5.6, s: show });
    dot(S, 'th' + t, x + 2.3, 16.5, 'T' + (t + 1), { r: 1, s: Object.assign({}, C.cur, show) });
    if (t) S.set('st' + t, 1, { opacity: '1' }).set('th' + t, 1, { opacity: '1' });
  }
  S.set('sh2', 2, C.cmp).set('sh0', 2, C.soft).set('sh1', 2, C.soft);
  box(S, 'pb', 19.6, 1.8, 11.2, 17.6, '', { s: hid(), css: 'border-color:var(--warn)' });
  text(S, 'pbt', 20.4, 2.3, ['프로세스 B', 'Process B'], { cls: 'cz-t', s: hid() });
  cell(S, 'pbm', 20.6, 4.3, ['코드·데이터·힙', 'Code·Data·Heap'], { w: 9.2, h: 2.6, s: hid() });
  cell(S, 'pbs', 20.6, 8.6, ['스택', 'Stack'], { w: 9.2, h: 5.6, s: hid() });
  dot(S, 'pbt1', 25.2, 16.5, 'T1', { r: 1, s: Object.assign({}, C.warn, { opacity: '0' }) });
  ['pb', 'pbt', 'pbm', 'pbs', 'pbt1'].forEach(k => S.set(k, 3, { opacity: '1' }));
  S.cap(0, '프로세스 = 실행 중인 프로그램 + 자기만의 메모리', 'A process = a running program + its own memory').cap(1, '스레드는 프로세스 안의 실행 흐름 · 스택만 따로', 'Threads are flows inside it, each with its own stack')
    .cap(2, '코드·데이터·힙은 함께 써서 통신이 빠르지만 동기화가 필요해요', 'They share code, data and heap: fast, but needs locking')
    .cap(3, '프로세스끼리는 메모리가 분리 · 안전하지만 통신(IPC)이 비싸요', 'Processes are isolated: safer, but IPC costs more');
  return S;
}
function sLayout() {
  const S = scene({ id: 'os-layout', steps: 6, per: 1.2 });
  const x = 9, w = 9;
  box(S, 'col', x - .3, 1.2, w + .6, 19.2, '', { css: 'background:transparent;box-shadow:none;border-style:dashed' });
  cell(S, 'stk', x, 1.6, ['스택', 'Stack'], { w, h: 2.4 });
  cell(S, 'f1', x, 4.1, 'main()', { w, h: 1.6, s: hid(C.soft) }); cell(S, 'f2', x, 5.8, 'foo()', { w, h: 1.6, s: hid(C.soft) });
  cell(S, 'hp2', x, 10.4, 'malloc(64)', { w, h: 1.6, s: hid(C.cmp) });
  cell(S, 'hp', x, 12.1, ['힙', 'Heap'], { w, h: 2.4 });
  cell(S, 'dat', x, 14.6, ['데이터', 'Data'], { w, h: 2.4 });
  cell(S, 'cod', x, 17.1, ['코드', 'Code'], { w, h: 2.4 });
  text(S, 'hi', 1.2, 1.9, ['높은 주소', 'high addr'], { cls: 'cz-t' }); text(S, 'lo', 1.2, 18.8, ['낮은 주소', 'low addr'], { cls: 'cz-t' });
  const note = (k, y, t) => text(S, k, x + w + 1, y, t, { cls: 'cz-t', s: hid() });
  note('n1', 17.7, ['실행할 기계어 (읽기 전용)', 'machine code (read-only)']); note('n2', 15.2, ['전역·static 변수', 'globals & statics']);
  note('n3', 11.2, ['↑ new·malloc으로 늘어나요', '↑ grows with new/malloc']); note('n4', 4.8, ['↓ 함수를 부를 때마다 프레임', '↓ a frame per call']);
  S.set('cod', 1, C.soft).set('n1', 1, { opacity: '1' });
  S.set('cod', 2, C.idle).set('dat', 2, C.soft).set('n2', 2, { opacity: '1' });
  S.set('dat', 3, C.idle).set('hp', 3, C.cmp).set('hp2', 3, { opacity: '1' }).set('n3', 3, { opacity: '1' });
  S.set('hp', 4, C.idle).set('stk', 4, C.soft).set('f1', 4, { opacity: '1' }).set('f2', 5, { opacity: '1' }).set('n4', 4, { opacity: '1' });
  S.cap(0, '프로세스 하나의 가상 메모리 구조', 'The virtual memory layout of one process').cap(3, '힙은 위로 자라고', 'The heap grows upward').cap(4, '스택은 아래로 자라요', 'The stack grows downward')
    .cap(6, '스택이 넘치면 Stack Overflow, 힙을 안 풀면 메모리 누수', 'Too deep: stack overflow · never freed: memory leak');
  return S;
}
function sCtx() {
  const S = scene({ id: 'os-ctx', steps: 4, per: 1.5 });
  S.label('cpu', { cls: 'cz-box cz-bx', x: 11.5, y: 1.6, w: 9, h: 3.6 }, [[0, ['CPU · P1 상태', 'CPU · P1 state']], [2, ['CPU · 비우는 중', 'CPU · switching']], [3, ['CPU · P2 상태', 'CPU · P2 state']]]);
  box(S, 'pcb1', 1.5, 8.6, 9, 3.6, ['PCB · P1', 'PCB · P1']); box(S, 'pcb2', 21.5, 8.6, 9, 3.6, ['PCB · P2', 'PCB · P2']);
  text(S, 'pt', 1.5, 7.2, ['레지스터·PC·스택 포인터 저장', 'saves registers, PC, SP'], { cls: 'cz-t' });
  dot(S, 'sv', 13.5, 6.7, ['저장', 'save'], { r: 1.1, s: hid(C.warn) });
  dot(S, 'ld', 26, 13.6, ['복원', 'load'], { r: 1.1, s: hid(C.ok) });
  S.set('sv', 1, { opacity: '1' }).move('sv', 2, 6 - 1.1, 13.6 - 1.1).set('sv', 3, { opacity: '0' }).set('pcb1', 2, C.cmp);
  S.set('ld', 2, { opacity: '1' }).move('ld', 3, 18.5 - 1.1, 6.7 - 1.1).set('pcb2', 3, C.ok).set('ld', 4, { opacity: '0' });
  gantt(S, 'g', [['P1', 0, 4, PC.P1, 0], [['전환', 'switch'], 4, 5.5, { background: 'var(--line)' }, 2], ['P2', 5.5, 10, PC.P2, 3]], 3, 16, 2.6, 2.4);
  S.cap(0, 'P1이 실행 중', 'P1 is running').cap(1, '타이머 인터럽트 · 이제 P2 차례', 'Timer interrupt · P2’s turn').cap(2, 'P1의 상태를 PCB에 저장하고', 'Save P1’s state to its PCB')
    .cap(3, 'P2의 상태를 불러와 이어서 실행', 'Load P2’s state and resume it').cap(4, '전환 중엔 아무 일도 못 해요 · 너무 잦으면 손해', 'No useful work while switching · too often is costly');
  return S;
}
function sSyscall() {
  const S = scene({ id: 'os-syscall', steps: 6, per: 1.15 });
  S.el('div', { x: 1, y: 10, w: 30, h: .12, css: 'border-top:.14em dashed var(--ink-3)' });
  text(S, 'um', 1.2, 8.6, ['사용자 모드', 'user mode'], { cls: 'cz-t' }); text(S, 'km', 1.2, 10.7, ['커널 모드', 'kernel mode'], { cls: 'cz-t' });
  box(S, 'app', 6, 3, 9, 3.4, ['앱: read(fd)', 'App: read(fd)']);
  box(S, 'ker', 11.5, 13.5, 9, 3.4, ['커널: 파일 시스템', 'Kernel: file system']);
  box(S, 'dsk', 24, 13.5, 6.4, 3.4, ['디스크', 'Disk']);
  const P = [[16.8, 4.7], [16.8, 10], [16, 12.2], [22.25, 15.2], [16, 12.2], [16.8, 4.7]];
  dot(S, 'd', P[0][0], P[0][1], ['호출', 'call'], { r: 1.1, s: C.cur });
  P.forEach(([x, y], k) => { if (k) S.move('d', k, x - 1.1, y - 1.1); });
  S.set('d', 1, C.warn).set('app', 1, C.soft).set('ker', 2, C.soft).set('d', 2, C.cur).set('dsk', 3, C.cmp).set('ker', 3, C.idle);
  S.set('d', 4, C.ok).set('dsk', 4, C.idle).set('ker', 4, C.soft).set('ker', 5, C.idle).set('app', 5, C.ok);
  S.cap(0, '앱은 하드웨어에 직접 손대지 못해요', 'Apps cannot touch hardware directly').cap(1, '시스템 콜 = 트랩으로 커널 모드 진입', 'A system call traps into kernel mode')
    .cap(2, '커널이 권한을 확인하고 대신 처리', 'The kernel checks rights and does the work').cap(3, '디스크에서 데이터를 읽어', 'Reads the data from disk')
    .cap(4, '커널 버퍼에 담아', 'into a kernel buffer').cap(5, '사용자 모드로 돌아오며 결과를 돌려줘요', 'and returns to user mode with the result')
    .cap(6, '모드 전환은 비싸서 버퍼링으로 호출 횟수를 줄여요', 'Mode switches are costly, so buffering cuts calls');
  return S;
}
function sIPC() {
  const S = scene({ id: 'os-ipc', steps: 6, per: 1.1 });
  box(S, 'a1', 1.5, 2.6, 5.6, 3.2, ['프로세스 A', 'Proc A']); box(S, 'b1', 24.9, 2.6, 5.6, 3.2, ['프로세스 B', 'Proc B']);
  S.el('pipe', { x: 8, y: 3.4, w: 16, h: 1.6, css: 'border-radius:1em;border:.14em solid var(--ink-3);background:var(--bg-2,transparent)' });
  text(S, 'pl', 8, 6, ['파이프·소켓·메시지 큐: 커널을 거쳐 복사', 'Pipe, socket, queue: copied through the kernel'], { cls: 'cz-t' });
  ['1', '2', '3'].forEach((v, i) => { dot(S, 'm' + i, 8.6, 4.2, v, { r: .7, s: hid(C.cur) }); S.set('m' + i, i + 1, { opacity: '1' }).move('m' + i, i + 2, 23.4 - .7, 4.2 - .7).set('m' + i, i + 3 > 6 ? 6 : i + 3, { opacity: '0' }); });
  box(S, 'a2', 1.5, 11.6, 5.6, 3.2, ['프로세스 A', 'Proc A']); box(S, 'b2', 24.9, 11.6, 5.6, 3.2, ['프로세스 B', 'Proc B']);
  cell(S, 'shm', 11, 11.2, 'x = 0', { w: 10, h: 4 }); cell(S, 'shm2', 11, 11.2, 'x = 42', { w: 10, h: 4, s: hid(C.soft) });
  text(S, 'sl', 8, 15.8, ['공유 메모리: 같은 영역을 직접 읽고 써요 (가장 빠름)', 'Shared memory: both use one region (fastest)'], { cls: 'cz-t' });
  arrow(S, 'aw', 7.4, 13.2, 10.8, 13.2, { s: hid(AR.acc) }); arrow(S, 'br', 21.2, 13.2, 24.6, 13.2, { s: hid(AR.ok) });
  S.set('aw', 4, { opacity: '1' }).set('shm2', 4, { opacity: '1' }).set('br', 5, { opacity: '1' }).set('b2', 5, C.ok);
  S.cap(1, '메시지를 하나씩 보내요', 'Messages are sent one by one').cap(4, 'A가 공유 메모리에 쓰면', 'A writes to shared memory').cap(5, 'B가 바로 읽어요 · 대신 동기화는 직접', 'B reads it at once · but you must synchronize')
    .cap(0, '프로세스끼리 데이터를 주고받는 방법 (IPC)', 'How processes exchange data (IPC)');
  return S;
}

/* ---------- scheduling ---------- */
function sFCFS() {
  const S = scene({ id: 'os-fcfs', steps: 7, per: .95 });
  const u = 2.35, x0 = 4;
  text(S, 'r1', x0, 2.6, ['FCFS · 도착 순서대로', 'FCFS · in arrival order'], { cls: 'cz-t' });
  text(S, 'r2', x0, 10.6, ['SJF · 짧은 작업 먼저', 'SJF · shortest job first'], { cls: 'cz-t' });
  gantt(S, 'a', [['P1 (8)', 0, 8, PC.P1, 1], ['P2', 8, 10, PC.P2, 2], ['P3', 10, 11, PC.P3, 3]], x0, 4.2, u, 2.6, { ticks: [0, 8, 10, 11] });
  gantt(S, 'b', [['P3', 0, 1, PC.P3, 4], ['P2', 1, 3, PC.P2, 5], ['P1 (8)', 3, 11, PC.P1, 6]], x0, 12.2, u, 2.6, { ticks: [0, 1, 3, 11] });
  text(S, 'w1', x0, 8.2, ['평균 대기 (0+8+10)/3 = 6', 'avg wait (0+8+10)/3 = 6'], { cls: 'cz-t cz-mono', s: hid() });
  text(S, 'w2', x0, 16.2, ['평균 대기 (0+1+3)/3 ≈ 1.3', 'avg wait (0+1+3)/3 ≈ 1.3'], { cls: 'cz-t cz-mono', s: hid() });
  S.set('w1', 3, { opacity: '1' }).set('w2', 6, { opacity: '1' });
  S.cap(1, '긴 작업이 먼저 오면 뒤의 짧은 작업들이 오래 기다려요', 'A long job first makes short ones wait (convoy effect)').cap(4, '짧은 것부터 하면', 'Shortest first').cap(6, '평균 대기 시간이 가장 짧아요 · 단, 실행 시간을 미리 알아야 해요', 'gives the lowest average wait · if you know the lengths')
    .cap(7, '긴 작업이 계속 밀리는 기아 현상이 생길 수 있어요', 'Long jobs can starve');
  return S;
}
function sRR() {
  const S = scene({ id: 'os-rr', steps: 7, per: 1 });
  const segs = [['P1', 0, 2], ['P2', 2, 4], ['P3', 4, 6], ['P1', 6, 8], ['P2', 8, 9], ['P1', 9, 10]];
  const Q = ['P1 · P2 · P3', 'P2 · P3', 'P3 · P1', 'P1 · P2', 'P2', 'P1', '—'];
  const rem = ['P1 5 · P2 3 · P3 2', 'P1 3 · P2 3 · P3 2', 'P1 3 · P2 1 · P3 2', 'P1 3 · P2 1 · P3 ✓', 'P1 1 · P2 1 · P3 ✓', 'P1 1 · P2 ✓ · P3 ✓', 'P1 ✓ · P2 ✓ · P3 ✓'];
  S.label('cpu', { cls: 'cz-box cz-bx', x: 2.5, y: 2.4, w: 7, h: 3.4 }, [[0, 'CPU'], ...segs.map(([p], i) => [i + 1, 'CPU ▶ ' + p]), [7, 'CPU']]);
  text(S, 'qt', 11.5, 2.3, ['준비 큐', 'Ready queue'], { cls: 'cz-t' });
  S.label('q', { cls: 'cz-t cz-mono os-lg', x: 11.5, y: 3.8, w: 18 }, Q.map((t, i) => [i, t]));
  gantt(S, 'g', segs.map(([p, a, b], i) => [p, a, b, PC[p], i + 1]), 3, 9.8, 2.6, 3, { ticks: [0, 2, 4, 6, 8, 9, 10] });
  text(S, 'qm', 3, 8.2, ['타임 퀀텀 = 2', 'time quantum = 2'], { cls: 'cz-t' });
  text(S, 'rt', 3, 16, ['남은 실행 시간', 'remaining'], { cls: 'cz-t' });
  S.label('r', { cls: 'cz-t cz-mono os-lg', x: 3, y: 17.4, w: 26 }, rem.map((t, i) => [i, t]));
  S.cap(0, '모든 프로세스가 같은 시간(퀀텀)씩 돌아가며 실행', 'Every process runs for one quantum in turn').cap(1, '퀀텀이 끝나면 큐 맨 뒤로', 'When the quantum ends it goes to the back')
    .cap(5, '남은 시간이 퀀텀보다 짧으면 일찍 끝나요', 'A shorter remainder finishes early').cap(7, '응답이 고르게 빨라요 · 퀀텀이 너무 작으면 전환 비용↑', 'Fair, quick response · too small a quantum adds switching');
  return S;
}
function sMLFQ() {
  const S = scene({ id: 'os-mlfq', steps: 6, per: 1.2 });
  const Y = [3.5, 9, 14.5], L = [['Q0 · 퀀텀 1', 'Q0 · quantum 1'], ['Q1 · 퀀텀 4', 'Q1 · quantum 4'], ['Q2 · FCFS', 'Q2 · FCFS']];
  Y.forEach((y, i) => { box(S, 'q' + i, 9, y, 21, 3.4, ''); text(S, 'ql' + i, 1.2, y + 1.1, L[i], { cls: 'cz-t' }); });
  dot(S, 'A', 12, 5.2, 'A', { r: 1.1, s: C.warn }); dot(S, 'B', 15.5, 5.2, 'B', { r: 1.1, s: C.ok });
  S.move('A', 2, 12 - 1.1, 10.7 - 1.1).move('A', 4, 12 - 1.1, 16.2 - 1.1).move('A', 5, 18.5 - 1.1, 5.2 - 1.1);
  S.set('q0', 1, C.soft).set('q0', 2, C.idle).set('q1', 2, C.cmp).set('q1', 3, C.idle).set('q0', 3, C.soft).set('q0', 4, C.idle).set('q2', 4, C.cmp).set('q2', 5, C.idle).set('q0', 5, C.soft);
  S.cap(0, '우선순위가 다른 큐 여러 개', 'Several queues with different priorities').cap(1, '새 작업은 맨 위 큐에서 시작', 'New jobs start in the top queue')
    .cap(2, 'A는 퀀텀을 다 써서 아래 큐로 내려가요 (CPU 위주)', 'A used its whole quantum: demoted (CPU-bound)').cap(3, 'B는 금방 I/O로 양보해서 위에 남아요 (대화형)', 'B yields early for I/O: stays on top (interactive)')
    .cap(4, '계속 CPU만 쓰면 맨 아래까지', 'CPU hogs sink to the bottom').cap(5, '주기적으로 모두 위로 올려 기아를 막아요 (에이징)', 'A periodic boost prevents starvation (aging)');
  return S;
}

/* ---------- synchronization ---------- */
function sRace() {
  const S = seq('os-race', [['스레드 A', 'Thread A'], 'count', ['스레드 B', 'Thread B']], [
    { f: 1, t: 0, l: ['읽기 5', 'read 5'], cap: ['A가 count를 읽어요 (5)', 'A reads count (5)'] },
    { f: 1, t: 2, l: ['읽기 5', 'read 5'], cap: ['A가 쓰기 전에 B도 읽어요 (5)', 'B reads before A writes (5)'] },
    { f: 0, t: 0, l: '5 + 1 = 6' }, { f: 2, t: 2, l: '5 + 1 = 6' },
    { f: 0, t: 1, l: ['쓰기 6', 'write 6'] },
    { f: 2, t: 1, l: ['쓰기 6', 'write 6'], cap: ['두 번 더했는데 결과는 6 · 한 번이 사라졌어요', 'Two increments, but count is 6: one was lost'] }
  ], { bottom: 17.5, per: 1.2 });
  S.label('v', { cls: 'cz-t cz-tc cz-mono os-lg', x: 8, y: 18.3, w: 16 }, [[0, 'count = 5'], [5, 'count = 6'], [6, ['count = 6 ✗ (기대 7)', 'count = 6 ✗ (expected 7)']]]);
  S.cap(3, '각자 계산하고', 'Each computes its own value');
  return S;
}
function sMutex() {
  const S = scene({ id: 'os-mutex', steps: 5, per: 1.2 });
  box(S, 'cs', 12, 6.5, 8, 8, ['임계 구역', 'Critical section'], { css: 'align-items:end;padding-bottom:.6em' });
  S.label('lk', { cls: 'cz-pill', x: 12.4, y: 3, w: 7.2, h: 2, s: C.ok }, [[0, ['열림', 'unlocked']], [1, ['잠김 · A', 'locked · A']], [3, ['열림', 'unlocked']], [4, ['잠김 · B', 'locked · B']], [5, ['열림', 'unlocked']]]);
  [1, 3].forEach(i => Object.assign(S.get('lk~' + i).s, C.warn));
  dot(S, 'A', 4, 8.5, 'A', { r: 1.2, s: C.cur }); dot(S, 'B', 4, 13, 'B', { r: 1.2, s: C.cur });
  S.move('A', 1, 16 - 1.2, 10 - 1.2).move('B', 2, 9.6 - 1.2, 13 - 1.2).set('B', 2, C.cmp).set('cs', 1, C.soft);
  S.move('A', 3, 28 - 1.2, 8.5 - 1.2).move('B', 4, 16 - 1.2, 10 - 1.2).set('B', 4, C.cur).move('B', 5, 28 - 1.2, 13 - 1.2).set('cs', 5, C.idle);
  S.cap(0, '공유 자원은 한 번에 하나의 스레드만', 'Only one thread at a time may touch shared data').cap(1, 'A가 잠그고 들어가요 lock()', 'A locks and enters: lock()')
    .cap(2, 'B는 잠금이 풀릴 때까지 대기', 'B waits until the lock is released').cap(3, 'A가 나오며 unlock()', 'A leaves: unlock()').cap(4, '이제 B 차례', 'Now it is B’s turn')
    .cap(5, '잠금 구간은 짧게 · 꼭 해제 (try-finally)', 'Keep it short and always unlock (try/finally)');
  return S;
}
function sSema() {
  const S = scene({ id: 'os-sema', steps: 6, per: 1.1 });
  text(S, 't', 12, 2.2, ['커넥션 풀 (세마포어 S = 2)', 'Connection pool (semaphore S = 2)'], { cls: 'cz-t' });
  box(S, 's0', 12.5, 4.5, 7, 4, ''); box(S, 's1', 12.5, 10.5, 7, 4, '');
  S.label('n', { cls: 'cz-t cz-mono os-lg', x: 23, y: 9.1, w: 8 }, [[0, 'S = 2'], [1, 'S = 1'], [2, 'S = 0'], [4, 'S = 1'], [5, 'S = 0']]);
  const R = [['R1', 5], ['R2', 9.5], ['R3', 14]];
  R.forEach(([l, y], i) => dot(S, 'r' + i, 4, y, l, { r: 1.1, s: C.cur }));
  S.move('r0', 1, 16 - 1.1, 6.5 - 1.1).set('s0', 1, C.soft).move('r1', 2, 16 - 1.1, 12.5 - 1.1).set('s1', 2, C.soft);
  S.move('r2', 3, 9.4 - 1.1, 14 - 1.1).set('r2', 3, C.cmp);
  S.move('r0', 4, 28.5 - 1.1, 3.5 - 1.1).set('s0', 4, C.idle).set('r0', 5, { opacity: '0' });
  S.move('r2', 5, 16 - 1.1, 6.5 - 1.1).set('r2', 5, C.cur).set('s0', 5, C.soft);
  S.cap(0, '세마포어 = 남은 자리 수를 세는 카운터', 'A semaphore counts free slots').cap(1, '들어갈 때 wait(): S − 1', 'Enter with wait(): S − 1')
    .cap(3, 'S가 0이면 다음 요청은 기다려요', 'At S = 0 the next request blocks').cap(4, '나갈 때 signal(): S + 1', 'Leave with signal(): S + 1').cap(5, '기다리던 R3가 들어가요', 'The waiting R3 gets in')
    .cap(6, '뮤텍스는 S = 1인 경우 · 풀·레이트 리밋에 써요', 'A mutex is S = 1 · used for pools and rate limits');
  return S;
}
function sPC() {
  const S = scene({ id: 'os-pc', steps: 7, per: 1.05 });
  box(S, 'pr', 1.2, 8, 6.4, 3.6, ['생산자', 'Producer']); box(S, 'co', 24.4, 8, 6.4, 3.6, ['소비자', 'Consumer']);
  const sx = i => 9.6 + i * 3.3;
  for (let i = 0; i < 4; i++) cell(S, 'b' + i, sx(i), 8.4, '', { w: 2.9, h: 2.9, css: 'border-style:dashed;background:transparent' });
  text(S, 'bt', 9.6, 6.6, ['버퍼 (크기 4)', 'Buffer (size 4)'], { cls: 'cz-t' });
  const put = (k, lab, step, slot) => { dot(S, k, 4.4, 9.8, lab, { r: 1, s: hid(C.cur) }); S.set(k, step, { opacity: '1' }).move(k, step, sx(slot) + 1.45 - 1 - 4.4 + 4.4, 9.85 - 1); };
  put('i1', '1', 1, 0); put('i2', '2', 2, 1); put('i3', '3', 3, 2); put('i4', '4', 4, 3);
  S.set('pr', 5, C.cmp).set('pr', 6, C.idle);
  S.move('i1', 6, 27.6 - 1, 13.4 - 1).set('co', 6, C.soft).set('i1', 7, { opacity: '0' });
  put('i5', '5', 7, 0);
  S.cap(1, '생산자가 버퍼에 채우고', 'The producer fills the buffer').cap(4, '꽉 찼어요', 'Now it is full').cap(5, '가득 차면 생산자가 기다리고', 'When full, the producer waits')
    .cap(6, '소비자가 하나 꺼내면', 'The consumer takes one out').cap(7, '빈자리에 다시 채워요 (원형 버퍼) · 메시지 큐의 기본 구조', 'and the slot is reused (ring buffer) · how message queues work');
  return S;
}
function sDead() {
  const S = scene({ id: 'os-dead', steps: 5, per: 1.3 });
  const P1 = [7, 5], P2 = [25, 16.5], R1 = [25, 5], R2 = [7, 16.5];
  const ar = (k, a, b, st, dash) => { link(S, k, a, b, 1.9, 1.9, { s: hid(dash ? { background: 'repeating-linear-gradient(90deg,var(--ink-2) 0 .5em,transparent .5em .8em)', 'border-color': 'var(--ink-2)' } : AR.ink) }); S.set(k, st, { opacity: '1' }); };
  ar('h1', R1, P1, 1); ar('h2', R2, P2, 2); ar('w1', P1, R2, 3, 1); ar('w2', P2, R1, 4, 1);
  node(S, 'p1', P1[0], P1[1], 'P1', { r: 1.6 }); node(S, 'p2', P2[0], P2[1], 'P2', { r: 1.6 });
  cell(S, 'r1', R1[0] - 1.6, R1[1] - 1.6, 'R1', { w: 3.2, h: 3.2, s: C.cmp }); cell(S, 'r2', R2[0] - 1.6, R2[1] - 1.6, 'R2', { w: 3.2, h: 3.2, s: C.cmp });
  text(S, 'k1', 12.5, 3.2, ['보유', 'holds'], { cls: 'cz-t', s: hid() }); text(S, 'k2', 16.5, 17.6, ['보유', 'holds'], { cls: 'cz-t', s: hid() });
  text(S, 'k3', 8.2, 10.5, ['요청', 'wants'], { cls: 'cz-t', s: hid() }); text(S, 'k4', 21.6, 10.5, ['요청', 'wants'], { cls: 'cz-t', s: hid() });
  S.set('k1', 1, { opacity: '1' }).set('k2', 2, { opacity: '1' }).set('k3', 3, { opacity: '1' }).set('k4', 4, { opacity: '1' });
  S.set('p1', 3, C.cmp).set('p1', 4, C.bad).set('p2', 4, C.bad);
  ['h1', 'h2', 'w1', 'w2'].forEach(k => S.set(k, 4, AR.red));
  S.cap(1, 'P1이 R1을 잡고', 'P1 holds R1').cap(2, 'P2가 R2를 잡은 상태에서', 'P2 holds R2').cap(3, 'P1은 R2를 기다리고', 'P1 waits for R2')
    .cap(4, 'P2는 R1을 기다리면 둘 다 영원히 멈춰요', 'P2 waits for R1: both are stuck forever').cap(5, '자원을 항상 같은 순서로 잡으면 순환 대기를 막아요', 'Always lock in the same order to prevent the cycle');
  return S;
}

/* ---------- memory ---------- */
function sPaging() {
  const S = scene({ id: 'os-paging', steps: 5, per: 1.3 });
  text(S, 'h1', 2, 2.2, ['가상 페이지', 'Virtual pages'], { cls: 'cz-t' }); text(S, 'h2', 12, 2.2, ['페이지 테이블', 'Page table'], { cls: 'cz-t' }); text(S, 'h3', 23.5, 1.2, ['물리 프레임', 'Physical frames'], { cls: 'cz-t' });
  const vy = i => 4.5 + i * 3.4, fy = i => 2.8 + i * 2.75;
  const map = [3, 0, 4, -1];
  for (let i = 0; i < 4; i++) {
    cell(S, 'v' + i, 2, vy(i), ['페이지 ' + i, 'page ' + i], { w: 6, h: 2.4 });
    cell(S, 't' + i, 12, vy(i), map[i] < 0 ? [i + ' → 디스크', i + ' → disk'] : `${i} → ${map[i]}`, { w: 7, h: 2.4 });
  }
  const fl = ['f0 (p1)', 'f1', ['f2 (다른 앱)', 'f2 (other)'], 'f3 (p0)', 'f4 (p2)', 'f5'];
  fl.forEach((l, i) => cell(S, 'f' + i, 23.5, fy(i), l, { w: 7.5, h: 2.2, s: i === 2 ? { opacity: '.5' } : {} }));
  for (let i = 0; i < 4; i++) {
    link(S, 'av' + i, [8, vy(i) + 1.2], [12, vy(i) + 1.2], 0, .1, { s: hid(AR.ink) });
    if (map[i] >= 0) link(S, 'at' + i, [19, vy(i) + 1.2], [23.5, fy(map[i]) + 1.1], 0, .1, { s: hid(AR.ink) });
  }
  S.set('v2', 1, C.cmp).set('av2', 2, Object.assign({ opacity: '1' }, AR.acc)).set('t2', 2, C.cmp).set('at2', 3, Object.assign({ opacity: '1' }, AR.acc)).set('f4', 3, C.ok);
  [0, 1].forEach(i => S.set('av' + i, 4, { opacity: '.6' }).set('at' + i, 4, { opacity: '.6' }));
  S.set('av3', 4, { opacity: '.6' }).set('t3', 4, C.bad);
  S.cap(0, '메모리를 같은 크기(보통 4KB)의 페이지로 나눠요', 'Memory is split into equal pages (usually 4 KB)').cap(1, 'CPU가 가상 주소 (페이지 2 + 오프셋)를 요청', 'The CPU asks for a virtual address (page 2 + offset)')
    .cap(2, '페이지 테이블에서 프레임 번호를 찾아', 'The page table gives the frame number').cap(3, '물리 주소로 바꿔요 (MMU 하드웨어)', 'and the MMU turns it into a physical address')
    .cap(4, '흩어져 있어도 프로그램에겐 연속된 메모리처럼 보여요', 'Scattered frames still look contiguous to the program').cap(5, '프로세스마다 테이블이 따로라 서로의 메모리를 못 봐요', 'Each process has its own table, so memory is isolated');
  return S;
}
function sTLB() {
  const S = scene({ id: 'os-tlb', steps: 7, per: 1 });
  box(S, 'cpu', 1.5, 8.5, 5.6, 3.6, 'CPU');
  box(S, 'tlb', 12, 2.8, 8, 3.6, ['TLB (캐시)', 'TLB (cache)']); box(S, 'pt', 12, 14.2, 8, 3.6, ['페이지 테이블', 'Page table']);
  box(S, 'ram', 25, 8.5, 5.6, 3.6, ['메모리', 'Memory']);
  text(S, 'pn', 12, 18.1, ['메모리에 있어서 느려요', 'in RAM: slow'], { cls: 'cz-t' }); text(S, 'tn', 12, 1.3, ['CPU 안의 작은 표: 아주 빨라요', 'tiny table in the CPU: very fast'], { cls: 'cz-t' });
  const at = (k, x, y, st, extra) => S.move(k, st, x - 1, y - 1, extra);
  dot(S, 'a', 8.4, 10.3, '1', { r: 1, s: C.cur }); dot(S, 'b', 8.4, 10.3, '2', { r: 1, s: hid(C.cur) });
  at('a', 10.6, 4.6, 1); S.set('tlb', 1, C.bad);
  at('a', 10.6, 16, 2); S.set('tlb', 2, C.idle).set('pt', 2, C.cmp);
  at('a', 10.6, 4.6, 3); S.set('pt', 3, C.idle).set('tlb', 3, C.soft);
  at('a', 23.6, 10.3, 4); S.set('tlb', 4, C.idle).set('ram', 4, C.ok).set('a', 5, { opacity: '0' });
  S.set('b', 5, { opacity: '1' }).set('ram', 5, C.idle); at('b', 10.6, 4.6, 5); S.set('tlb', 5, C.ok);
  at('b', 23.6, 10.3, 6); S.set('tlb', 6, C.idle).set('ram', 6, C.ok);
  S.cap(1, 'TLB 미스: 최근 변환 기록에 없어요', 'TLB miss: not among recent translations').cap(2, '페이지 테이블을 읽어오고', 'so the page table is read').cap(3, 'TLB에 저장한 뒤', 'and cached in the TLB')
    .cap(4, '메모리에 접근', 'then memory is accessed').cap(5, '같은 페이지를 다시 쓰면 TLB 히트', 'The same page again: TLB hit').cap(6, '테이블을 건너뛰어 훨씬 빨라요', 'skipping the table, much faster')
    .cap(7, '대부분의 접근은 지역성 덕분에 히트 (99%+)', 'Locality makes most accesses hits (99%+)');
  return S;
}
function sFault() {
  const S = scene({ id: 'os-fault', steps: 6, per: 1.2 });
  box(S, 'cpu', 1.5, 3, 5.6, 3.4, 'CPU');
  S.label('pte', { cls: 'cz-c', x: 10.5, y: 3, w: 9.5, h: 3.4, css: 'z-index:2;background:transparent;border-color:transparent' }, [[0, ['p3 · 유효 0', 'p3 · valid 0']], [5, ['p3 → f2 · 유효 1', 'p3 → f2 · valid 1']]]);
  text(S, 'ptl', 10.5, 1.4, ['페이지 테이블', 'Page table'], { cls: 'cz-t' });
  box(S, 'os', 10.5, 13, 9.5, 3.4, ['운영체제', 'OS']);
  box(S, 'disk', 24, 13, 6.4, 3.4, ['디스크', 'Disk']);
  text(S, 'rl', 24, 1.4, ['메모리', 'RAM'], { cls: 'cz-t' });
  ['f0', 'f1', 'f2'].forEach((f, i) => cell(S, f, 24, 2.8 + i * 2.6, i === 2 ? '' : f, { w: 6.4, h: 2.2, s: i < 2 ? { opacity: '.6' } : {} }));
  S.label('f2l', { cls: 'cz-c', x: 24, y: 8, w: 6.4, h: 2.2, css: 'z-index:2;background:transparent;border-color:transparent' }, [[0, ['빈 프레임', 'free']], [4, 'f2 (p3)']]);
  S.el('pteb', { cls: 'cz-c', x: 10.5, y: 3, w: 9.5, h: 3.4 });
  const P = [[8.8, 4.7], [15.25, 7.5], [15.25, 11.9], [27.2, 11.9], [22.6, 9.1], [15.25, 7.5], [8.8, 4.7]];
  dot(S, 'd', P[0][0], P[0][1], '', { r: .8, s: C.cur });
  P.forEach(([x, y], k) => { if (k) S.move('d', k, x - .8, y - .8); });
  S.set('pteb', 1, C.bad).set('d', 2, C.warn).set('os', 2, C.cmp).set('disk', 3, C.cmp).set('os', 3, C.idle);
  S.set('f2', 4, C.ok).set('disk', 4, C.idle).set('pteb', 5, C.ok).set('d', 5, C.ok);
  S.cap(1, '페이지 3에 접근했는데 메모리에 없어요', 'Page 3 is accessed but is not in memory').cap(2, '페이지 폴트 · 운영체제가 넘겨받아요', 'Page fault: the OS takes over').cap(3, '디스크에서 페이지를 읽어', 'It reads the page from disk')
    .cap(4, '빈 프레임에 올리고', 'into a free frame').cap(5, '테이블을 고친 뒤', 'updates the table').cap(6, '명령을 다시 실행 · 폴트가 너무 잦으면 스래싱', 'and retries the instruction · too many faults = thrashing');
  return S;
}
function sLRU() {
  const refs = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3], F = 3;
  const fr = [], last = {}, cols = []; let faults = 0;
  refs.forEach((r, t) => {
    let slot = fr.indexOf(r), hit = slot >= 0;
    if (!hit) { faults++; if (fr.length < F) { fr.push(r); slot = fr.length - 1; } else { let v = 0; fr.forEach((x, i) => { if (last[x] < last[fr[v]]) v = i; }); fr[v] = r; slot = v; } }
    last[r] = t; cols.push({ snap: fr.slice(), slot, hit, faults });
  });
  const S = scene({ id: 'os-lru', steps: refs.length + 1, per: .75 });
  const x0 = 4.4, cw = 2.6;
  text(S, 'rh', .8, 3.1, ['참조', 'ref'], { cls: 'cz-t' });
  for (let f = 0; f < F; f++) text(S, 'fh' + f, .8, 5.9 + f * 2.5, ['프레임 ', 'frame '].map(s => s + f), { cls: 'cz-t' });
  cols.forEach((c, t) => {
    const x = x0 + t * cw;
    cell(S, 'r' + t, x, 2.4, String(refs[t]), { w: 2.2, h: 2.1, s: hid(C.cur) });
    for (let f = 0; f < F; f++) if (c.snap[f] != null) cell(S, `c${t}_${f}`, x, 5.2 + f * 2.5, String(c.snap[f]), { w: 2.2, h: 2.1, s: hid(f === c.slot ? (c.hit ? C.ok : C.cmp) : {}) });
    text(S, 'm' + t, x, 13, c.hit ? ['히트', 'hit'] : ['폴트', 'fault'], { w: 2.2, cls: 'cz-t cz-tc', s: hid() });
    S.set('r' + t, t + 1, { opacity: '1' }).set('m' + t, t + 1, { opacity: '1' });
    for (let f = 0; f < F; f++) if (c.snap[f] != null) S.set(`c${t}_${f}`, t + 1, { opacity: '1' });
  });
  S.label('n', { cls: 'cz-t cz-mono os-lg', x: 4.4, y: 16.3, w: 26 }, [[0, ['페이지 폴트 0회', 'page faults: 0']], ...cols.map((c, t) => [t + 1, [`페이지 폴트 ${c.faults}회`, `page faults: ${c.faults}`]])]);
  S.cap(0, '프레임 3개에 페이지 참조가 차례로 와요 (LRU)', 'Three frames, a stream of page references (LRU)').cap(4, '꽉 차면 가장 오래 안 쓴 페이지를 내보내요', 'When full, evict the least recently used page')
    .cap(5, '이미 있으면 히트', 'Already present: a hit').cap(11, 'LRU는 캐시·브라우저·Redis에서도 쓰는 교체 정책', 'LRU is also used by caches, browsers and Redis');
  return S;
}
function sFrag() {
  const S = scene({ id: 'os-frag', steps: 6, per: 1.2 });
  const X = kb => 2 + kb * .28, y = 9, h = 3.2;
  S.el('track', { x: X(0), y, w: 28, h, css: 'border:.12em dashed var(--ink-3);border-radius:.4em' });
  const blk = (k, l, a, b, st) => cell(S, k, X(a), y, l, { w: (b - a) * .28, h, s: st });
  blk('os', 'OS', 0, 20, { background: 'var(--line)' }); blk('A', 'A', 20, 35, C.soft); blk('B', 'B', 35, 50, C.soft); blk('Cc', 'C', 50, 65, C.soft); blk('D', 'D', 65, 80, C.soft); blk('E', 'E', 80, 90, C.soft);
  text(S, 'k0', X(0), y + h + .4, '0', { cls: 'cz-t' }); text(S, 'k1', X(100) - 2.6, y + h + .4, '100KB', { cls: 'cz-t' });
  cell(S, 'F', X(40), 3.6, 'F 25KB', { w: 25 * .28, h, s: hid(C.bad) });
  S.set('B', 1, { opacity: '0' }).set('D', 2, { opacity: '0' });
  S.set('F', 3, { opacity: '1' });
  S.move('Cc', 4, X(35), y).move('E', 4, X(50), y).set('F', 4, C.cmp);
  S.move('F', 5, X(60), y).set('F', 5, C.ok);
  S.label('fr', { cls: 'cz-t cz-mono os-lg', x: 2, y: 15.4, w: 28 }, [[0, ['빈 공간: 10KB', 'free: 10KB']], [1, ['빈 공간: 15 + 10 = 25KB', 'free: 15 + 10 = 25KB']], [2, ['빈 공간: 15 + 15 + 10 = 40KB', 'free: 15 + 15 + 10 = 40KB']], [4, ['빈 공간: 한 덩어리 40KB', 'free: one 40KB block']]]);
  S.cap(1, '프로세스가 끝나며 중간중간 구멍이 생겨요', 'Processes exit and leave holes').cap(3, '합은 40KB인데 25KB짜리가 들어갈 자리가 없어요 (외부 단편화)', '40KB free, but no single 25KB gap: external fragmentation')
    .cap(4, '압축: 사용 중인 블록을 한쪽으로 모아요', 'Compaction moves used blocks together').cap(5, '이제 들어가요 · 페이징은 고정 크기라 이 문제가 없어요', 'Now it fits · paging avoids this with fixed sizes');
  return S;
}

/* ---------- files, I/O, virtualization ---------- */
function sInode() {
  const S = scene({ id: 'os-inode', steps: 5, per: 1.3 });
  box(S, 'dir', 1.5, 2.2, 10, 3, ['report.txt → inode 42', 'report.txt → inode 42']);
  text(S, 'dl', 1.5, .9, ['디렉터리 = 이름 → 번호 목록', 'directory = name → number'], { cls: 'cz-t' });
  text(S, 'il', 1.5, 7, 'inode 42', { cls: 'cz-t' });
  const R = [['크기·권한·시간', 'size·mode·times'], ['직접 0', 'direct 0'], ['직접 1', 'direct 1'], ['직접 2', 'direct 2'], ['간접', 'indirect']];
  R.forEach((l, i) => cell(S, 'i' + i, 1.5, 8.4 + i * 2.2, l, { w: 10, h: 1.9 }));
  const yc = i => 8.4 + i * 2.2 + .95;
  ['B7', 'B3', 'B12'].forEach((b, i) => { cell(S, 'b' + i, 16, yc(i + 1) - .95, b, { w: 3.6, h: 1.9, s: hid(C.soft) }); link(S, 'la' + i, [11.5, yc(i + 1)], [16, yc(i + 1)], 0, .05, { s: hid() }); });
  cell(S, 'ix', 16, yc(4) - .95, ['블록 목록', 'block list'], { w: 5.4, h: 1.9, s: hid(C.cmp) }); link(S, 'lx', [11.5, yc(4)], [16, yc(4)], 0, .05, { s: hid() });
  ['B30', 'B31', 'B32'].forEach((b, i) => { const y = 13.2 + i * 2.4; cell(S, 'c' + i, 26, y, b, { w: 3.6, h: 1.9, s: hid(C.soft) }); link(S, 'lc' + i, [21.4, yc(4)], [26, y + .95], 0, .05, { s: hid() }); });
  S.set('dir', 1, C.soft); R.forEach((_, i) => S.set('i' + i, 2, i ? {} : C.soft));
  [0, 1, 2].forEach(i => S.set('b' + i, 3, { opacity: '1' }).set('la' + i, 3, { opacity: '1' }));
  S.set('ix', 4, { opacity: '1' }).set('lx', 4, { opacity: '1' }); [0, 1, 2].forEach(i => S.set('c' + i, 4, { opacity: '1' }).set('lc' + i, 4, { opacity: '1' }));
  S.cap(1, '이름으로 inode 번호를 찾고', 'The name gives the inode number').cap(2, 'inode에 메타데이터와 블록 위치가 있어요', 'The inode holds metadata and block pointers')
    .cap(3, '작은 파일은 직접 포인터로', 'Small files use direct pointers').cap(4, '큰 파일은 간접 블록으로 더 많이', 'Big files add indirect blocks')
    .cap(5, '이름은 inode에 없어서 하드 링크가 가능해요', 'Names live outside the inode, so hard links work');
  return S;
}
function sIntr() {
  const S = scene({ id: 'os-intr', steps: 4, per: 1.4 });
  text(S, 'l1', 1.2, 5.4, ['사용자 프로그램', 'user program'], { cls: 'cz-t' }); text(S, 'l2', 1.2, 11.4, ['인터럽트 핸들러', 'interrupt handler'], { cls: 'cz-t' });
  gantt(S, 'g', [['', 0, 4, C.soft, 0], ['', 6, 10, C.soft, 3]], 9.5, 4.6, 2.1, 2.4);
  gantt(S, 'h', [['', 4, 6, C.cmp, 2]], 9.5, 10.6, 2.1, 2.4);
  box(S, 'dev', 23.5, 15, 7, 3.2, ['키보드', 'Keyboard']);
  dot(S, 'irq', 27, 15, 'IRQ', { r: 1.1, s: hid(C.warn) });
  S.set('irq', 1, { opacity: '1' }).move('irq', 1, 18 - 1.1, 7.6 - 1.1).set('irq', 2, { opacity: '0' }).set('dev', 1, C.cmp).set('dev', 2, C.idle);
  arrow(S, 'down', 17.9, 7.2, 17.9, 10.4, { s: hid() }); arrow(S, 'up', 22.1, 10.4, 22.1, 7.2, { s: hid() });
  S.set('down', 2, { opacity: '1' }).set('up', 3, { opacity: '1' });
  S.cap(0, 'CPU가 프로그램을 실행하는 중', 'The CPU is running a program').cap(1, '키를 누르면 장치가 인터럽트 신호를 보내요', 'A key press makes the device raise an interrupt')
    .cap(2, '상태를 저장하고 핸들러를 실행', 'State is saved and the handler runs').cap(3, '끝나면 하던 일로 복귀', 'Then the program resumes')
    .cap(4, 'CPU가 계속 확인(폴링)하지 않아도 돼요 · 타이머 인터럽트가 스케줄링을 만들어요', 'No polling needed · timer interrupts drive scheduling');
  return S;
}
function sIO() {
  const S = scene({ id: 'os-io', steps: 6, per: 1.3 });
  const u = 1.95, x0 = 7.6;
  text(S, 'l1', 1, 4.4, ['블로킹', 'Blocking'], { cls: 'cz-t' }); text(S, 'l2', 1, 12.4, ['비동기', 'Async'], { cls: 'cz-t' }); text(S, 'l2b', 1, 13.6, ['이벤트 루프', 'event loop'], { cls: 'cz-t' });
  const wait = { background: 'transparent', 'border-style': 'dashed' };
  gantt(S, 'a', [['A', 0, 1, C.soft, 1], [['대기', 'wait'], 1, 5, wait, 2], ['A', 5, 6, C.soft, 3], ['B', 6, 7, C.cmp, 4], [['대기', 'wait'], 7, 11, wait, 4], ['B', 11, 12, C.cmp, 4]], x0, 3.6, u, 2.6);
  gantt(S, 'b', [['A', 0, 1, C.soft, 5], ['B', 1, 2, C.cmp, 5], ['C', 2, 3, C.ok, 5], ['A', 5, 6, C.soft, 6], ['B', 6, 7, C.cmp, 6], ['C', 7, 8, C.ok, 6]], x0, 11.6, u, 2.6);
  text(S, 'bi', x0 + 3 * u, 12.2, ['I/O 중…', 'I/O…'], { w: 2 * u, cls: 'cz-t cz-tc', s: hid() }); S.set('bi', 5, { opacity: '1' });
  S.cap(1, '블로킹: 요청을 보내고', 'Blocking: send a request').cap(2, '응답이 올 때까지 스레드가 놀아요', 'and the thread sits idle until it returns').cap(3, '그다음에야 처리', 'Only then does it continue')
    .cap(4, '요청 2개에 12만큼 걸려요', 'Two requests take 12 units').cap(5, '비동기: 요청만 보내 두고 다른 일을 해요', 'Async: fire requests and keep working')
    .cap(6, '응답이 오면 콜백으로 처리 · 3개를 8에 끝내요 (Node.js, epoll)', 'Handle replies in callbacks · 3 done by 8 (Node.js, epoll)');
  return S;
}
function sCont() {
  const S = scene({ id: 'os-cont', steps: 5, per: 1.2 });
  const L = (k, x, y, w, l, st, step) => { cell(S, k, x, y, l, { w, h: 2.4, s: Object.assign({ opacity: '0', transform: 'translateY(-1em)' }, st) }); S.set(k, step, { opacity: '1', transform: 'none' }); };
  text(S, 't1', 2, 3.4, ['가상 머신', 'Virtual machine'], { cls: 'cz-t' }); text(S, 't2', 17.5, 3.4, ['컨테이너', 'Container'], { cls: 'cz-t' });
  L('h1', 2, 16.6, 12.5, ['하드웨어', 'Hardware'], { background: 'var(--line)' }, 1); L('h2', 17.5, 16.6, 12.5, ['하드웨어', 'Hardware'], { background: 'var(--line)' }, 1);
  L('v1', 2, 13.8, 12.5, ['하이퍼바이저', 'Hypervisor'], C.idle, 2); L('c1', 17.5, 13.8, 12.5, ['호스트 OS (커널 공유)', 'Host OS (shared kernel)'], C.idle, 2);
  L('g1', 2, 11, 6.1, ['게스트 OS', 'Guest OS'], C.cmp, 3); L('g2', 8.4, 11, 6.1, ['게스트 OS', 'Guest OS'], C.cmp, 3); L('rt', 17.5, 11, 12.5, ['컨테이너 런타임', 'Container runtime'], C.idle, 3);
  L('a1', 2, 8.2, 6.1, ['앱 A', 'App A'], C.soft, 4); L('a2', 8.4, 8.2, 6.1, ['앱 B', 'App B'], C.soft, 4);
  L('b1', 17.5, 8.2, 4, 'A', C.soft, 4); L('b2', 21.75, 8.2, 4, 'B', C.soft, 4); L('b3', 26, 8.2, 4, 'C', C.soft, 4);
  S.cap(1, '같은 하드웨어 위에', 'On the same hardware').cap(3, 'VM은 OS를 통째로 하나씩 더 띄워요 (무겁고 격리가 강함)', 'VMs each boot a full OS (heavy, strong isolation)')
    .cap(4, '컨테이너는 커널을 함께 쓰고 프로세스만 격리 (가볍고 빠름)', 'Containers share the kernel and isolate processes (light, fast)')
    .cap(5, 'namespace로 보이는 것을, cgroup으로 쓰는 양을 제한해요', 'Namespaces limit what it sees, cgroups what it uses');
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
  S.el(k, { x: F.L, y: F.T, w: F.R - F.L, h: F.B - F.T, cls: 'osx-gs', css: `background-size:${r3(F.u)}em ${r3(F.u)}em`, s: st ? hid() : {} }); vis(S, k, st, o.off);
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
  if (xl) T(S, k + 'xl', F.R - 2.6, F.Y(Math.max(F.y0, 0)) + .2, xl, 'cz-mono osx-xs', st, { w: 2.8 }); if (yl) T(S, k + 'yl', F.X(Math.max(F.x0, 0)) + .3, F.T - .5, yl, 'cz-mono osx-xs', st); };
function bars(S, k, F, xs, ys, o = {}) { const bw = o.bw || .8; xs.forEach((x, i) => { const y = ys[i]; if (!(y > 0)) return; const c = typeof o.color === 'function' ? o.color(i, x) : (o.color || 'accent');
  rect(S, k + i, F.X(x - bw / 2), F.Y(y), F.X(x + bw / 2) - F.X(x - bw / 2), F.Y(0) - F.Y(y), c, o.pct || 50, typeof o.st === 'function' ? o.st(i, x) : o.st, { off: o.off, r: .08 }); }); }
/* area under f between a and b */
function shade(S, k, F, f, a, b, color, pct, st, o = {}) { const pts = [[F.X(a), F.Y(0)]]; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; pts.push([F.X(x), F.Y(Math.min(f(x), F.y1))]); } pts.push([F.X(b), F.Y(0)]); poly2(S, k, pts, tint(color, pct), st, o); }
const Phi = z => { const t = 1 / (1 + .2316419 * Math.abs(z)), d = .3989423 * Math.exp(-z * z / 2), p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const cell = (S, k, x, y, w, h, label, color, pct, st, o = {}) => rect(S, k, x, y, w, h, color, pct, st, { cls: 'cz-c osx-c', html: label, off: o.off, r: .2, css: o.css });
const tsets = (S, k, list) => list.forEach(([st, c, p]) => S.set(k, st, { background: tint(c, p) }));


/* ---- data-engineering helpers ---- */
function code(S, k, x, y, w, lines, hi = [], o = {}) {
  const lh = o.lh || 1.3;
  rect(S, k + 'bg', x, y, w, lines.length * lh + .6, 'ink', 6, o.st || 0, { r: .4, off: o.off });
  if (hi.length) { rect(S, k + 'hl', x + .2, y + .25 + hi[0][0] * lh, w - .4, lh, 'accent', 24, hi[0][1], { r: .2, off: o.hoff || o.off }); hi.slice(1).forEach(([l, s]) => S.move(k + 'hl', s, x + .2, y + .25 + l * lh)); }
  lines.forEach((t, i) => T(S, k + i, x + .5, y + .3 + i * lh, t, 'cz-mono osx-code', o.st || 0, { css: 'z-index:6', off: o.off }));
}
const elb = (S, k, pts, color, st, o = {}) => { for (let i = 1; i < pts.length - 1; i++) seg(S, k + 's' + i, pts[i - 1], pts[i], st, color, o.h || .12, { off: o.off }); ar(S, k, pts[pts.length - 2], pts[pts.length - 1], color, st, { h: o.h || .12, off: o.off, dash: o.dash }); };
const box = (S, k, x, y, w, h, label, color, st, o = {}) => cell(S, k, x, y, w, h, label, color, o.pct || 35, st, { off: o.off });
const box2 = (S, k, x, y, w, h, label, color, st, o = {}) => rect(S, k, x, y, w, h, color, o.pct || 35, st, { cls: 'cz-c osx-c2', html: label, off: o.off, r: .2, css: o.css });
const frame = (S, k, x, y, w, h, color, st, o = {}) => rect(S, k, x, y, w, h, color, 0, st, { r: o.r ?? .4, css: `background:transparent;border:${o.w || .16}em ${o.dash ? 'dashed' : 'solid'} ${cv(color)}`, off: o.off });
const phone = (S, k, x, y, w, h, st, o = {}) => { rect(S, k, x, y, w, h, 'ui', 0, st, { r: 1, css: 'border:.16em solid var(--ink-3)', off: o.off }); rect(S, k + 'n', x + w / 2 - 1.1, y + .3, 2.2, .28, 'ink-3', 55, st, { r: .2, off: o.off }); };
const xm = (S, k, x, y, st, o = {}) => T(S, k, x - .35, y - .55, '✗', 'osx-s osx-r', st, o);
/* table card: title + column lines; returns y of each line's center */
function tbl(S, k, x, y, w, title, cols, color, st, o = {}) {
  const lh = o.lh || 1, h = 1.3 + cols.length * lh + .3;
  rect(S, k, x, y, w, h, color, 10, st, { r: .35, css: `border:.12em solid var(--${color})`, off: o.off });
  T(S, k + 't', x + .4, y + .25, title, 'cz-mono osx-s', st, { off: o.off, css: 'font-weight:800' });
  return cols.map((c, i) => { T(S, k + 'c' + i, x + .5, y + 1.3 + i * lh, c, 'cz-mono osx-xs', st, { off: o.off }); return y + 1.3 + i * lh + .45; });
}

/* ---- state-machine helpers ---- */
const stt = (S, k, x, y, label, color, st, o = {}) => { const r = o.r || 1.1;
  rect(S, k, x - r, y - r, 2 * r, 2 * r, color, o.pct ?? 14, st, { r, css: `border:.12em solid var(--${color})`, off: o.off });
  if (o.acc) ring(S, k + 'i', x, y, r - .28, color, st, { w: .08, off: o.off });
  T(S, k + 'l', x - r, y - .45, label, 'cz-tc cz-mono osx-xs', st, { w: 2 * r, off: o.off });
  if (o.start) ar(S, k + 's', [x - r - 1.5, y], [x - r - .05, y], 'ink-3', st, { h: .1, off: o.off }); };
const trn = (S, k, a, b, label, st, o = {}) => { const r = o.r || 1.1, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, bd = o.bend || 0;
  const p1 = [a[0] + ux * r + nx * bd, a[1] + uy * r + ny * bd], p2 = [b[0] - ux * (o.rb || r) + nx * bd, b[1] - uy * (o.rb || r) + ny * bd];
  ar(S, k, p1, p2, o.color || 'ink-3', st, { h: .1, off: o.off });
  if (label !== '') { const ld = o.ld ?? .55, mx = (p1[0] + p2[0]) / 2 + nx * ld, my = (p1[1] + p2[1]) / 2 + ny * ld; T(S, k + 'l', mx - 1.5, my - .45, label, 'cz-tc cz-mono osx-xs ' + (o.lc || ''), st, { w: 3, off: o.off }); } };
const lp = (S, k, x, y, label, st, o = {}) => { const r = o.r || 1.1; ring(S, k, x, y - r - .32, .5, o.color || 'ink-3', st, { w: .1, off: o.off }); T(S, k + 'l', x - 1.5, y - r - 1.75, label, 'cz-tc cz-mono osx-xs', st, { w: 3, off: o.off }); };
const notes = (S, pre, y, list, cls) => list.forEach((t, i) => T(S, pre + i, 1, y, t, cls || 'osx-s', i + 1, { off: i + 2 }));
const fin = (S, pre, y, list) => list.forEach(([a, b, c], i) => T(S, pre + i, 1, y + i * 1.3, [a, b], c || 'osx-xs', 5));


const CSSX = `
.osx-l .in{font-size:.86em;color:var(--ink);font-weight:700}
.osx-s .in{font-size:.66em;color:var(--ink-2);font-weight:600}
.osx-xs .in{font-size:.56em;color:var(--ink-2);font-weight:600}
.osx-tiny .in{font-size:.42em;color:var(--ink-2);font-weight:600}
.osx-r .in{color:var(--danger);font-weight:800}
.osx-g .in{color:var(--ok);font-weight:800}
.osx-a .in{color:var(--accent);font-weight:800}
.osx-w .in{color:var(--warn);font-weight:800}
.osx-c .in{font-size:.6em;font-weight:700}
.osx-c2 .in{font-size:.5em;font-weight:700}
.osx-code .in{font-size:.54em;white-space:pre;color:var(--ink);font-weight:600}
.osx-gs{background-image:linear-gradient(var(--line) .07em,transparent .07em),linear-gradient(90deg,var(--line) .07em,transparent .07em)}`;

const stepT = (S, k, x, y, list, cls) => list.forEach((t, i) => T(S, k + i, x, y, t, cls || 'osx-xs', i + 1, { off: i < list.length - 1 ? i + 2 : 0 }));

/* ================= scheduling ================= */
function sCfs() {
  const S = scene({ id: 'os-cfs', steps: 5, per: 1.6 });
  const VX = v => 2 + v * .7;
  hl(S, 'ax', 2, 30, 6.4, 'ink-3', 0, { w: .08 }); [0, 10, 20, 30, 40].forEach((v, i) => { seg(S, 'tk' + i, [VX(v), 6.2], [VX(v), 6.6], 0, 'ink-3', .06); T(S, 'tl' + i, VX(v) - 1, 6.8, String(v), 'cz-tc cz-mono osx-tiny', 0, { w: 2 }); });
  T(S, 'axl', 24, 7.6, 'vruntime →', 'cz-mono osx-xs', 0);
  const P = { A: [10, 4.4], B: [14, 2.8], C: [22, 4.4], D: [30, 2.8] };
  Object.entries(P).forEach(([k, [v, y]]) => box2(S, 't' + k, VX(v) - 1, y, 2, 1.3, k, 'accent', 0, { pct: 25 }));
  S.move('tA', 2, VX(16) - 1, 4.4); S.move('tB', 3, VX(20) - 1, 2.8);
  box2(S, 'tE', VX(15) - 1, 1.2, 2, 1.3, 'E', 'warn', 4, { pct: 35 });
  tsets(S, 'tA', [[1, 'ok', 50], [2, 'accent', 25], [3, 'ok', 50], [4, 'accent', 25]]); tsets(S, 'tB', [[2, 'ok', 50], [3, 'accent', 25]]); tsets(S, 'tE', [[4, 'ok', 50]]);
  T(S, 'run', 1, .3, ['초록 = 다음에 실행 (vruntime이 가장 작은 작업)', 'green = runs next (smallest vruntime)'], 'osx-xs osx-g', 1);
  box2(S, 'n0', 1, 8.6, 9, 1.2, ['nice 0: 6ms 실행 → +6', 'nice 0: run 6 ms → +6'], 'accent', 3, { pct: 25 }); rect(S, 'nb0', 10.4, 8.75, 6 * .7, .9, 'accent', 45, 3, { r: .1 });
  box2(S, 'n1', 1, 10, 9, 1.2, ['nice −5: 6ms 실행 → +2', 'nice −5: run 6 ms → +2'], 'warn', 3, { pct: 30 }); rect(S, 'nb1', 10.4, 10.15, 2 * .7, .9, 'warn', 50, 3, { r: .1 });
  T(S, 'nt', 16, 8.9, ['우선순위가 높을수록(가중치 큼)', 'higher priority (bigger weight)'], 'osx-xs', 3); T(S, 'nt2', 16, 9.9, ['vruntime이 천천히 늘어 CPU를 더 받아요', '→ slower vruntime → more CPU'], 'osx-xs', 3);
  stepT(S, 'k', 1, 11.8, [['각 작업의 가상 실행 시간(vruntime) 순으로 레드-블랙 트리에 정렬 · 맨 왼쪽을 실행', 'tasks sit in a red-black tree ordered by virtual runtime · the leftmost runs'], ['A가 6ms 실행 → vruntime 16으로 늘어 오른쪽으로 · 이제 B가 가장 왼쪽', 'A runs 6 ms → vruntime 16, moving right · now B is leftmost'], ['B도 실행 후 오른쪽으로 · 다시 A 차례 → 모두 공평하게 돌아가요', 'B runs and moves right too · A is back in front → everyone gets a fair share'], ['잠들었다 깬 대화형 작업 E는 작은 vruntime으로 들어와 곧바로 실행돼요', 'E, waking from sleep, rejoins with a small vruntime and runs right away']], 'osx-xs osx-a');
  fin(S, 'z', 13.4, [['CFS: “모두가 똑같이 CPU를 나눠 쓰는 이상적인 CPU”를 흉내 내는 리눅스 스케줄러 (2007~)', 'CFS imitates an ideal CPU shared equally by all tasks (Linux, 2007 on)', 'osx-xs osx-a'], ['가장 덜 실행된 작업을 O(log n)에 찾고, nice 값은 가중치로 반영해요', 'it finds the least-run task in O(log n) and turns nice values into weights'], ['리눅스 6.6부터는 지연 시간까지 고려하는 EEVDF가 CFS를 대신해요', 'since Linux 6.6, EEVDF, which also accounts for latency, replaces CFS']]);
  S.cap(1, '가장 적게 실행된 작업부터', 'Least-run task first').cap(2, '실행하면 오른쪽으로', 'Running moves it right').cap(3, 'nice와 가중치', 'Nice values as weights').cap(4, '깨어난 작업은 빠르게', 'Woken tasks run soon').cap(5, '리눅스 CFS 스케줄러', 'The Linux CFS scheduler');
  return S;
}
function sPinv() {
  const S = scene({ id: 'os-pinv', steps: 5, per: 1.6 });
  const X = t => 5 + t * 2.1;
  const lanes = (p, y0, st) => ['H', 'M', 'L'].forEach((l, i) => { T(S, p + 'l' + i, 1, y0 + i * 1.4 + .2, l, 'cz-mono osx-s', st); hl(S, p + 'g' + i, X(0), X(12), y0 + i * 1.4 + 1.15, 'line', st, { w: .05 }); });
  const bar = (k, lane, y0, a, b, c, st, l, pct) => rect(S, k, X(a), y0 + lane * 1.4, (b - a) * 2.1 - .06, 1.1, c, pct || 45, st, { r: .15, html: l || '', cls: 'cz-c osx-c2' });
  T(S, 'ta', 1, .1, ['우선순위 상속 없음', 'without priority inheritance'], 'osx-xs osx-r', 1);
  lanes('a', 1, 1);
  bar('a1', 2, 1, 0, 2, 'accent', 1, ['🔒 획득', '🔒 lock']); bar('a2', 0, 1, 2, 3, 'ok', 1); bar('a3', 0, 1, 3, 10, 'danger', 1, ['락 대기…', 'waiting for lock…'], 20); bar('a4', 2, 1, 3, 4, 'accent', 1);
  bar('a5', 1, 1, 4, 9, 'warn', 2, ['M이 L을 밀어냄', 'M preempts L']); bar('a6', 2, 1, 9, 10, 'accent', 2, ['해제', 'unlock']); bar('a7', 0, 1, 10, 12, 'ok', 2);
  T(S, 'ad', X(3), 5.3, ['H가 7칸이나 기다림 → 중간 우선순위 M이 사실상 H를 막았어요', 'H waits 7 units → the medium task M effectively blocked H'], 'osx-xs osx-r', 2);
  T(S, 'tb', 1, 6.4, ['우선순위 상속', 'with priority inheritance'], 'osx-xs osx-g', 3);
  lanes('b', 7.3, 3);
  bar('b1', 2, 7.3, 0, 2, 'accent', 3, ['🔒 획득', '🔒 lock']); bar('b2', 0, 7.3, 2, 3, 'ok', 3); bar('b3', 0, 7.3, 3, 5, 'danger', 3, ['대기', 'wait'], 20); bar('b4', 2, 7.3, 3, 5, 'ok', 3, ['L ↑ H', 'L as H']); bar('b5', 0, 7.3, 5, 7, 'ok', 3); bar('b6', 1, 7.3, 7, 12, 'warn', 3);
  T(S, 'bd', X(5), 11.6, ['H의 대기는 2칸으로 줄어요', 'H now waits only 2 units'], 'osx-xs osx-g', 3);
  T(S, 'k4', 1, 12.6, ['1997년 화성 탐사선 패스파인더가 이 문제로 계속 재부팅 → 원격으로 상속을 켜서 해결', '1997: Mars Pathfinder kept rebooting from this → fixed remotely by enabling inheritance'], 'osx-xs osx-a', 4);
  fin(S, 'z', 13.8, [['우선순위 역전: 낮은 작업이 쥔 락 때문에 높은 작업이 중간 작업에게까지 밀려나는 현상', 'priority inversion: a high task, blocked on a low task’s lock, ends up waiting on a medium task too', 'osx-xs osx-a'], ['해결: 우선순위 상속(락 쥔 동안 대기자의 우선순위를 빌려줌), 우선순위 상한 프로토콜', 'fixes: priority inheritance (lend the waiter’s priority while holding the lock) or priority ceilings'], ['실시간 OS와 리눅스 rt_mutex가 상속을 지원해요', 'real-time OSes and Linux rt_mutex support inheritance']]);
  S.cap(1, 'L이 락을 쥔 채 H가 대기', 'H waits on L’s lock').cap(2, 'M이 끼어들면', 'M jumps in').cap(3, '우선순위 상속', 'Priority inheritance').cap(4, '화성 탐사선 이야기', 'The Mars Pathfinder story').cap(5, '우선순위 역전', 'Priority inversion');
  return S;
}

/* ================= synchronization ================= */
function sBanker() {
  const S = scene({ id: 'os-banker', steps: 5, per: 1.6 });
  const W = [3, 3.2, 3.2, 3.2], R = [['', 'Max', 'Alloc', 'Need'], ['P0', '10', '5', '5'], ['P1', '4', '2', '2'], ['P2', '9', '2', '7']];
  R.forEach((r, i) => { let x = 1; r.forEach((v, j) => { box2(S, `t${i}_${j}`, x, 1.2 + i * 1.4, W[j] - .1, 1.25, v, i === 0 || j === 0 ? 'accent' : j === 3 ? 'warn' : 'line', 0, { pct: 30 }); x += W[j]; }); });
  box2(S, 'av', 1, 7.2, 12.5, 1.4, ['자원 12개 · Available = 3', '12 units · Available = 3'], 'ok', 0, { pct: 35 });
  [['P1: need 2 ≤ 3 → 반납 후 5', 'P1: need 2 ≤ 3 → then 5'], ['P0: need 5 ≤ 5 → 반납 후 10', 'P0: need 5 ≤ 5 → then 10'], ['P2: need 7 ≤ 10 → 반납 후 12', 'P2: need 7 ≤ 10 → then 12']].forEach((t, i) => box2(S, 's' + i, 15.4, 1.2 + i * 1.5, 15.6, 1.25, t, 'ok', 2, { pct: 30 }));
  T(S, 'sf', 15.4, 5.8, ['안전 순서 ⟨P1, P0, P2⟩ 존재 → 안전 상태 ✓', 'safe sequence ⟨P1, P0, P2⟩ exists → safe ✓'], 'osx-xs osx-g', 2);
  T(S, 'rq', 15.4, 7.1, ['P2가 1개 더 요청 → 일단 줬다고 가정', 'P2 asks for 1 more → pretend to grant'], 'osx-xs osx-w', 3); T(S, 'rq2', 15.4, 8, 'Available 2 · P2 need 6', 'cz-mono osx-xs osx-w', 3);
  box2(S, 'r1', 15.4, 9, 15.6, 1.25, ['P1: 2 ≤ 2 → 반납 후 4', 'P1: 2 ≤ 2 → then 4'], 'ok', 3, { pct: 30 }); box2(S, 'r2', 15.4, 10.4, 15.6, 1.25, ['P0: 5 > 4 ✗ · P2: 6 > 4 ✗ → 막힘', 'P0: 5 > 4 ✗ · P2: 6 > 4 ✗ → stuck'], 'danger', 3, { pct: 30 });
  T(S, 'rd', 15.4, 11.8, ['불안전 상태 → 요청 거절(대기시킴)', 'unsafe → deny the request (make it wait)'], 'osx-xs osx-r', 3);
  stepT(S, 'k', 1, 12.9, [['각 프로세스가 최대로 필요할 양(Max)을 미리 알려줘요', 'each process declares its maximum need (Max) up front'], ['Need ≤ Available인 프로세스를 끝까지 돌려 자원을 돌려받는 순서를 찾아요', 'find an order where each Need ≤ Available, reclaiming resources as each finishes'], ['요청을 들어줘도 안전 순서가 남는지 미리 시뮬레이션해요', 'simulate the grant first: does a safe order still exist?'], ['최대 필요량을 미리 알아야 해서 범용 OS에선 드물어요', 'needing max demands up front makes it rare in general-purpose OSes']], 'osx-xs osx-a');
  fin(S, 'z', 14.2, [['은행원 알고리즘: 교착 상태가 생길 수 있는 “불안전 상태”로는 아예 들어가지 않게 피하는 방법 (다익스트라)', 'the banker’s algorithm avoids deadlock by never entering an unsafe state (Dijkstra)', 'osx-xs osx-a'], ['교착 대처 4가지: 예방(조건 깨기) · 회피(은행원) · 탐지 후 회복 · 무시(타조 알고리즘)', 'four strategies: prevention (break a condition), avoidance (banker’s), detection and recovery, ignoring it (ostrich)']]);
  S.cap(1, '최대 요구량과 현재 할당', 'Maximum demand and current allocation').cap(2, '안전 순서 찾기', 'Find a safe sequence').cap(3, '요청을 미리 시뮬레이션', 'Simulate the request').cap(4, '현실에서는', 'In practice').cap(5, '은행원 알고리즘', 'The banker’s algorithm');
  return S;
}
function sPhilo() {
  const S = scene({ id: 'os-philo', steps: 5, per: 1.6 });
  const CX = 8.6, CY = 7, P = [...Array(5)].map((_, i) => { const a = (-90 + i * 72) * Math.PI / 180; return [CX + 5.2 * Math.cos(a), CY + 5.2 * Math.sin(a)]; });
  const F = [...Array(5)].map((_, i) => { const a = (-90 + i * 72 + 36) * Math.PI / 180; return [CX + 3.6 * Math.cos(a), CY + 3.6 * Math.sin(a)]; });
  ring(S, 'tbl', CX, CY, 2.2, 'ink-3', 0, { w: .1 });
  F.forEach(([x, y], i) => box2(S, 'f' + i, x - .7, y - .45, 1.4, .9, 'F' + i, 'line', 0, { pct: 45 }));
  P.forEach(([x, y], i) => stt(S, 'p' + i, x, y, 'P' + i, 'accent', 0, { r: .95, pct: 22 }));
  const link = (k, i, f, st, c, o) => { const [x1, y1] = P[i], [x2, y2] = F[f], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy); seg(S, k, [x1 + dx / L * 1, y1 + dy / L * 1], [x2 - dx / L * .8, y2 - dy / L * .8], st, c, .12, o); };
  for (let i = 0; i < 5; i++) { link('h' + i, i, i, 2, 'ok', { off: 3 }); link('w' + i, i, (i + 4) % 5, 2, 'danger', { dash: 1, off: 3 }); }
  for (let i = 0; i < 3; i++) link('g' + i, i, i, 3, 'ok', {}); link('g4a', 4, 3, 3, 'ok', {}); link('g4b', 4, 4, 3, 'ok', {}); link('x3', 3, 3, 3, 'danger', { dash: 1 });
  tsets(S, 'p4', [[3, 'ok', 50]]); [0, 1, 2, 3].forEach(i => tsets(S, 'p' + i, [[2, 'danger', 30], [3, 'accent', 22]]));
  T(S, 'st', 17.4, 1.2, ['규칙: 왼쪽 → 오른쪽 포크를 잡고 식사', 'rule: left fork, then right, then eat'], 'osx-xs osx-a', 1);
  T(S, 'd2', 17.4, 2.6, ['모두 동시에 왼쪽을 잡으면…', 'if all grab their left fork at once…'], 'osx-xs osx-r', 2, { off: 3 }); T(S, 'd2b', 17.4, 3.6, ['전부 오른쪽을 기다리는 원형 대기 → 교착', 'all wait for the right: deadlock'], 'osx-xs osx-r', 2, { off: 3 });
  T(S, 'd3', 17.4, 2.6, ['P4만 오른쪽부터 잡게 바꾸면', 'make only P4 take its right fork first'], 'osx-xs osx-g', 3); T(S, 'd3b', 17.4, 3.6, ['원이 끊겨 P4가 식사 ✓', 'the cycle breaks and P4 eats ✓'], 'osx-xs osx-g', 3);
  [['번호 작은 자원부터 잡기 (순서 규칙)', 'lock lower-numbered resources first'], ['동시에 앉는 인원 4명으로 제한', 'seat at most four at once'], ['못 잡으면 내려놓고 재시도 (라이브락 주의)', 'release and retry (beware livelock)']].forEach((t, i) => T(S, 'm' + i, 17.4, 5.4 + i * 1.1, t, 'osx-xs', 4));
  T(S, 'mt', 17.4, 4.6, ['다른 해법', 'other fixes'], 'osx-xs osx-a', 4);
  fin(S, 'z', 13.4, [['식사하는 철학자: 공유 자원을 두 개씩 잡아야 할 때 생기는 교착·기아를 보여 주는 고전 문제 (다익스트라)', 'the dining philosophers show the deadlock and starvation of grabbing two shared resources (Dijkstra)', 'osx-xs osx-a'], ['실무 교훈: 여러 락은 항상 같은 순서로 잡아요 (DB 행 잠금, 계좌 이체)', 'the practical lesson: always acquire multiple locks in one global order (DB rows, account transfers)']]);
  S.cap(1, '포크 다섯, 철학자 다섯', 'Five forks, five philosophers').cap(2, '모두 왼쪽을 잡으면 교착', 'All take left: deadlock').cap(3, '한 명만 순서를 바꾸면', 'Flip one philosopher’s order').cap(4, '다른 해법들', 'Other solutions').cap(5, '식사하는 철학자 문제', 'The dining philosophers');
  return S;
}

/* ================= memory ================= */
function sPageTable() {
  const S = scene({ id: 'os-pagetable', steps: 5, per: 1.6 });
  rect(S, 'flat', 1, 1.2, 30, 1.2, 'line', 45, 1, { r: .2 }); [[2, .6], [17, .4], [28.5, .5]].forEach(([x, w], i) => rect(S, 'fu' + i, x, 1.2, w, 1.2, 'accent', 70, 1, { r: .05 }));
  T(S, 'fl', 1, 2.6, ['한 단계 테이블: 2²⁰개 항목 × 4 B = 프로세스마다 4 MB, 대부분 비어 있어요', 'a flat table: 2²⁰ entries × 4 B = 4 MB per process, mostly empty'], 'osx-xs osx-r', 1);
  const K = .78; [['dir (10)', 10, 'accent'], ['table (10)', 10, 'warn'], ['offset (12)', 12, 'ok']].reduce((x, [l, b, c], i) => { box2(S, 'af' + i, x, 3.8, b * K - .08, 1.3, l, c, 2, { pct: 30 }); return x + b * K; }, 1);
  T(S, 'ex', 1, 5.4, ['예: 0x000012A4 → dir 0 · table 1 · offset 0x2A4', 'e.g. 0x000012A4 → dir 0 · table 1 · offset 0x2A4'], 'cz-mono osx-xs', 2);
  T(S, 'ot', 1, 6.4, ['바깥 테이블', 'outer table'], 'osx-tiny osx-a', 3);
  ['0 → T0', '1  —', '2  —', '…', '768 → T1'].forEach((l, i) => box2(S, 'o' + i, 1, 7 + i * 1, 5.6, .9, l, i === 0 || i === 4 ? 'accent' : 'line', 3, { pct: i === 0 || i === 4 ? 30 : 45 }));
  T(S, 'it', 10, 6.4, ['안쪽 테이블 T0', 'inner table T0'], 'osx-tiny osx-w', 3);
  ['0 → frame 52', '1 → frame 9', '…'].forEach((l, i) => box2(S, 'i' + i, 10, 7 + i * 1, 6.4, .9, l, i === 1 ? 'warn' : 'line', 3, { pct: i === 1 ? 35 : 45 }));
  T(S, 'it2', 10, 10.3, ['T1 (필요할 때만 생성)', 'T1 (created only when needed)'], 'osx-tiny', 3); box2(S, 'i3', 10, 10.9, 6.4, .9, '5 → frame 300', 'line', 3, { pct: 45 });
  elb(S, 'a1', [[6.7, 7.45], [8.2, 7.45], [8.2, 8.45], [9.9, 8.45]], 'accent', 3, { h: .08 }); elb(S, 'a2', [[6.7, 11.45], [9.9, 11.35]], 'ink-3', 3, { h: .06 });
  ar(S, 'a3', [16.5, 8.45], [19.4, 8.45], 'warn', 3, { h: .08 }); box2(S, 'fr', 19.5, 7.8, 11.5, 1.3, ['프레임 9 + 0x2A4 = 0x92A4', 'frame 9 + 0x2A4 = 0x92A4'], 'ok', 3, { pct: 35 });
  T(S, 'k4', 17.4, 10, ['x86-64: 4단계 (9·9·9·9·12비트)', 'x86-64: 4 levels (9·9·9·9·12 bits)'], 'osx-xs osx-a', 4); T(S, 'k4b', 17.4, 11, ['TLB 미스 = 메모리 4번 읽기', 'a TLB miss = 4 memory reads'], 'osx-xs', 4); T(S, 'k4c', 17.4, 12, ['그래서 TLB·huge page가 중요', 'so TLBs and huge pages matter'], 'osx-xs', 4);
  fin(S, 'z', 13.2, [['다단계 페이지 테이블: 주소를 여러 인덱스로 나눠, 쓰는 영역의 테이블만 만들어 메모리를 아껴요', 'multilevel page tables split the address into several indexes and build tables only for used regions', 'osx-xs osx-a'], ['대가는 주소 변환 때 여러 번의 메모리 접근 → TLB가 대부분의 변환을 캐시해 숨겨요', 'the cost is extra memory reads per translation → the TLB caches most translations to hide it']]);
  S.cap(1, '평평한 테이블은 너무 커요', 'A flat table is too big').cap(2, '주소를 나눠요', 'Split the address').cap(3, '두 단계로 찾아가기', 'Walk two levels').cap(4, '64비트에서는 4단계', 'Four levels on 64-bit').cap(5, '다단계 페이지 테이블', 'Multilevel page tables');
  return S;
}
function sThrash() {
  const S = scene({ id: 'os-thrash', steps: 5, per: 1.6 });
  const X = n => 2.8 + n * 2.4, Y = u => 9 - u * .075, D = [[1, 20], [2, 40], [3, 60], [4, 75], [5, 85], [6, 88], [7, 70], [8, 35], [9, 15], [10, 8]];
  hl(S, 'xa', 2.8, 28, 9, 'ink-3', 0, { w: .08 }); seg(S, 'ya', [2.8, 1.2], [2.8, 9], 0, 'ink-3', .08);
  T(S, 'yl', .4, .4, ['CPU 사용률', 'CPU utilization'], 'osx-tiny', 0); T(S, 'xl', 18, 9.3, ['동시에 실행하는 프로세스 수 →', 'number of processes →'], 'osx-tiny', 0);
  poly(S, 'c1', D.slice(0, 6).map(([n, u]) => [X(n), Y(u)]), { st: 1, color: 'ok', h: .16 });
  poly(S, 'c2', D.slice(5).map(([n, u]) => [X(n), Y(u)]), { st: 2, color: 'danger', h: .16 });
  T(S, 'th', X(8) + .2, Y(40), ['스래싱!', 'thrashing!'], 'osx-s osx-r', 2);
  T(S, 'thn', X(6.5), 1.2, ['페이지 폴트 처리에 시간을 다 써요', 'all time goes to page faults'], 'osx-xs osx-r', 2);
  const R = [2, 6, 1, 5, 7, 7, 7, 5, 1, 6, 2, 3, 4];
  R.forEach((v, i) => box2(S, 'r' + i, 1 + i * 2.3, 10.4, 2.1, 1.2, String(v), i >= 4 && i <= 8 ? 'accent' : 'line', 3, { pct: i >= 4 && i <= 8 ? 30 : 40 }));
  frame(S, 'ws', 1 + 4 * 2.3 - .15, 10.25, 5 * 2.3 + .1, 1.5, 'accent', 3, { w: .12 });
  T(S, 'wsl', 1, 11.9, ['워킹 셋 WS(t, Δ = 5) = 최근 5번 참조한 페이지 {1, 5, 7}', 'working set WS(t, Δ = 5) = pages in the last 5 references {1, 5, 7}'], 'cz-mono osx-xs osx-a', 3);
  T(S, 'k4', 1, 13, ['모든 프로세스의 워킹 셋 합 > 실제 프레임 → 스래싱 · 프로세스를 줄이거나(스왑 아웃) 메모리 추가', 'sum of working sets > physical frames → thrashing · run fewer processes (swap out) or add memory'], 'osx-xs', 4);
  fin(S, 'z', 14.4, [['스래싱: 메모리가 모자라 페이지를 끝없이 내보내고 들여오느라 실제 일은 거의 못 하는 상태', 'thrashing: memory is so short that the system spends its time paging instead of working', 'osx-xs osx-a'], ['페이지 폴트 빈도 감시, 워킹 셋 모델로 막고 · 요즘은 cgroup 메모리 제한과 OOM killer가 개입해요', 'prevent it via page-fault frequency or working sets · today cgroup limits and the OOM killer step in']]);
  S.cap(1, '프로세스를 늘리면 처음엔 좋아요', 'More processes help at first').cap(2, '어느 순간 급락', 'Then a sudden collapse').cap(3, '워킹 셋', 'The working set').cap(4, '막는 방법', 'Prevention').cap(5, '스래싱과 워킹 셋', 'Thrashing and the working set');
  return S;
}

/* ================= files ================= */
function sJournal() {
  const S = scene({ id: 'os-journal', steps: 5, per: 1.6 });
  frame(S, 'jr', 1, 1.6, 14, 4, 'warn', 0, { w: .1, r: .2 }); T(S, 'jrl', 1.3, 1.7, ['저널 (로그 영역)', 'journal (log area)'], 'osx-tiny osx-w', 0);
  frame(S, 'mn', 16.4, 1.6, 14.6, 4, 'ink-3', 0, { w: .1, r: .2 }); T(S, 'mnl', 16.7, 1.7, ['실제 위치', 'final locations'], 'osx-tiny', 0);
  [['bitmap', 17], ['inode', 21.6], ['data', 26.2]].forEach(([l, x], i) => box2(S, 'm' + i, x, 2.8, 4.2, 1.6, l, 'line', 0, { pct: 45 }));
  tsets(S, 'm0', [[1, 'ok', 40], [2, 'line', 45], [3, 'ok', 40]]); tsets(S, 'm1', [[1, 'line', 45], [3, 'ok', 40]]); tsets(S, 'm2', [[1, 'line', 45], [3, 'ok', 40]]);
  xm(S, 'cr', 23.7, 3.9, 1, { off: 2 }); T(S, 'crl', 16.4, 6.4, ['bitmap만 쓰고 전원이 나감 → 블록은 사용 중인데 아무도 안 씀', 'power fails after the bitmap write → a block marked used by no one'], 'osx-tiny osx-r', 1, { off: 2 });
  [['TxB', 'accent'], ['bitmap', 'line'], ['inode', 'line'], ['data', 'line'], ['TxE', 'accent']].forEach(([l, c], i) => box2(S, 'j' + i, 1.4 + i * 2.7, 2.8, 2.5, 1.6, l, c, 2, { pct: 35 }));
  T(S, 'jn', 1, 6.4, ['먼저 저널에 “할 일”을 통째로 쓰고 TxE(커밋)로 마무리', 'first write the whole change to the journal, sealed with TxE (commit)'], 'osx-tiny osx-a', 2, { off: 3 });
  ar(S, 'ck', [14.9, 4.9], [17.1, 4.9], 'ok', 3, { h: .12 }); T(S, 'ckl', 14.3, 5.75, ['체크포인트', 'checkpoint'], 'osx-tiny osx-g', 3);
  T(S, 'cn', 1, 6.4, ['커밋된 뒤에 실제 위치로 복사 → 저널 공간 비우기', 'after the commit, copy to the final locations → free the journal space'], 'osx-tiny osx-g', 3, { off: 4 });
  [['TxB', 'accent'], ['inode', 'line']].forEach(([l, c], i) => box2(S, 'q' + i, 1.4 + i * 2.7, 7.6, 2.5, 1.4, l, c, 4, { pct: 35 }));
  T(S, 'qn', 7.2, 7.9, ['TxE가 없는 트랜잭션 → 복구 때 무시 ✓', 'no TxE → ignored during recovery ✓'], 'osx-xs osx-g', 4);
  T(S, 'qn2', 1, 9.4, ['재부팅 시: 커밋된 트랜잭션만 다시 실행(replay) · 디스크 전체를 훑는 fsck가 필요 없어요', 'on reboot, replay only committed transactions · no full-disk fsck scan needed'], 'osx-xs', 4);
  stepT(S, 'k', 1, 10.8, [['파일 하나 덧붙이기에도 bitmap, inode, data 세 곳을 고쳐야 해요', 'even appending to a file updates three places: bitmap, inode and data'], ['저널(로그 선행 기록): 바꿀 내용을 먼저 한 곳에 순서대로 기록', 'journaling (write-ahead logging): record the changes in one place first'], ['커밋 후 실제 위치에 반영 (체크포인트)', 'apply them to the final locations after the commit (checkpoint)'], ['중간에 끊긴 트랜잭션은 버리고, 커밋된 것만 다시 적용', 'discard interrupted transactions and replay committed ones']], 'osx-xs osx-a');
  fin(S, 'z', 12.4, [['저널링: 파일 시스템 갱신을 원자적으로 만들어 충돌 후에도 일관성을 지켜요 (ext4, NTFS, XFS)', 'journaling makes file-system updates atomic, keeping it consistent after crashes (ext4, NTFS, XFS)', 'osx-xs osx-a'], ['ext4 기본 data=ordered: 데이터를 먼저 쓰고 메타데이터만 저널링 · btrfs·ZFS는 복사 후 쓰기(CoW)로 해결', 'ext4’s default data=ordered writes data first and journals metadata · btrfs and ZFS use copy-on-write instead'], ['DB의 WAL과 같은 아이디어예요', 'the same idea as a database WAL']]);
  S.cap(1, '중간에 전원이 나가면', 'If power fails midway').cap(2, '먼저 저널에 기록', 'Log it first').cap(3, '체크포인트', 'Checkpoint').cap(4, '복구', 'Recovery').cap(5, '저널링 파일 시스템', 'Journaling file systems');
  return S;
}

return { css: CSSX, secs: [], add: {
  'os-sched': [
    item('os-cfs', '리눅스 CFS 스케줄러', 'The Linux CFS scheduler', '각 작업이 실제로 CPU를 쓴 시간(가상 실행 시간)을 재고, 가장 덜 실행된 작업부터 돌려 모두에게 공평하게 나눠 주는 스케줄러예요.', '작업들은 vruntime 순으로 레드-블랙 트리에 정렬되고, 맨 왼쪽(가장 작은 vruntime) 작업이 실행돼요. 실행하면 vruntime이 늘어 오른쪽으로 가고 다음 작업이 앞으로 나와요. nice 값은 가중치가 되어 우선순위가 높을수록 vruntime이 천천히 늘고, 잠들었다 깬 대화형 작업은 작은 vruntime으로 들어와 곧바로 실행돼 반응성이 좋아요. 리눅스 6.6부터는 EEVDF가 CFS를 대체했어요.', 'A scheduler that tracks how much CPU each task has used (virtual runtime) and always runs the least-run task, sharing the CPU fairly.', 'Tasks sit in a red-black tree ordered by vruntime, and the leftmost (smallest vruntime) runs. Running increases its vruntime, moving it right so the next task comes forward. Nice values become weights, so higher-priority tasks accumulate vruntime more slowly, and interactive tasks waking from sleep rejoin with a small vruntime and run promptly. Since Linux 6.6, EEVDF has replaced CFS.', sCfs()),
    item('os-pinv', '우선순위 역전', 'Priority inversion', '낮은 우선순위 작업이 쥔 락 때문에 높은 우선순위 작업이 기다리는 사이, 중간 작업이 끼어들어 높은 작업을 더 오래 막는 현상이에요.', 'L이 락을 잡은 상태에서 H가 같은 락을 기다리는데, 락과 무관한 M이 L을 밀어내면 H는 M이 끝날 때까지 사실상 막혀요. 1997년 화성 탐사선 패스파인더가 이 문제로 계속 재부팅했고, 우선순위 상속을 원격으로 켜서 해결했어요. 우선순위 상속은 락을 쥔 동안 L에게 H의 우선순위를 빌려주고, 우선순위 상한 프로토콜은 락마다 상한을 정해요. 리눅스 rt_mutex가 상속을 지원해요.', 'A high-priority task waiting on a lock held by a low-priority task gets delayed further when a medium task preempts the low one.', 'L holds a lock that H needs; when M, which doesn’t need the lock, preempts L, H is effectively blocked until M finishes. In 1997 Mars Pathfinder kept rebooting from this until engineers remotely enabled priority inheritance. Inheritance lends H’s priority to L while it holds the lock; the priority ceiling protocol gives each lock a ceiling. Linux rt_mutex supports inheritance.', sPinv())
  ],
  'os-sync': [
    item('os-banker', '은행원 알고리즘', 'The banker’s algorithm', '자원을 내줘도 모든 프로세스가 끝날 수 있는 순서(안전 순서)가 남는지 미리 확인해, 교착이 생길 수 있는 상태를 아예 피하는 방법이에요.', '자원 12개 중 P0, P1, P2가 각각 5, 2, 2개를 쓰고 최대 10, 4, 9개가 필요하면 Available은 3이에요. Need ≤ Available인 P1 → P0 → P2 순서로 끝내며 자원을 돌려받을 수 있으니 안전 상태예요. 이때 P2가 1개를 더 요청하면, 줬다고 가정하고 다시 확인해 P1 다음에 막히므로 불안전 → 거절해요. 최대 필요량을 미리 알아야 해서 범용 OS에선 드물고, 교착 대처는 예방·회피·탐지 후 회복·무시로 나뉘어요.', 'Avoid deadlock by granting a request only if an order in which every process can finish (a safe sequence) still exists.', 'With 12 units, where P0, P1 and P2 hold 5, 2 and 2 and may need up to 10, 4 and 9, Available is 3. Finishing P1 → P0 → P2, each with Need ≤ Available, reclaims everything, so the state is safe. If P2 then asks for one more, pretend to grant it and re-check: after P1 everyone is stuck, so the state is unsafe and the request waits. Needing maximum demands up front makes it rare in general-purpose OSes; deadlock strategies are prevention, avoidance, detection and recovery, or ignoring it.', sBanker()),
    item('os-philo', '식사하는 철학자 문제', 'The dining philosophers', '원탁의 철학자 다섯 명이 사이사이 놓인 포크 다섯 개 중 양옆 두 개를 잡아야 식사할 수 있는, 교착과 기아를 보여 주는 고전 문제예요.', '모두 동시에 왼쪽 포크를 잡으면 전원이 오른쪽 포크를 기다리는 원형 대기로 교착이 생겨요. 한 명(P4)만 오른쪽부터 잡게 하면 원이 끊겨 누군가는 먹을 수 있어요. 자원에 번호를 매겨 작은 번호부터 잡기, 앉는 인원을 4명으로 제한하기(세마포어), 못 잡으면 내려놓고 재시도(라이브락 주의)도 해법이에요. 여러 락을 항상 같은 순서로 잡는 실무 규칙의 근거예요.', 'Five philosophers around a table must each grab the two forks beside them to eat: the classic illustration of deadlock and starvation.', 'If everyone grabs their left fork at once, all wait for the right one in a circular wait: deadlock. Making just one philosopher (P4) take the right fork first breaks the cycle so someone can eat. Other fixes are numbering resources and locking the lower number first, seating at most four at a time (a semaphore), or releasing and retrying (beware livelock). It underpins the rule of always acquiring multiple locks in one global order.', sPhilo())
  ],
  'os-mem': [
    item('os-pagetable', '다단계 페이지 테이블', 'Multilevel page tables', '가상 주소를 여러 인덱스로 나눠 단계별로 찾아가게 해, 실제로 쓰는 영역의 테이블만 만들어 메모리를 아끼는 구조예요.', '32비트·4 KB 페이지에서 한 단계 테이블은 2²⁰개 항목 × 4 B = 프로세스마다 4 MB이고 대부분 비어 있어요. 주소를 dir 10 · table 10 · offset 12비트로 나누면 바깥 테이블에서 안쪽 테이블을 찾고, 다시 프레임을 찾아 offset을 붙여 물리 주소를 만들어요. 안쪽 테이블은 필요할 때만 생기고, x86-64는 9·9·9·9·12비트의 4단계라 TLB 미스 때 메모리를 4번 읽어서 TLB와 huge page가 중요해요.', 'Splitting a virtual address into several indexes walked level by level, so tables exist only for regions actually in use.', 'With 32-bit addresses and 4 KB pages, a flat table holds 2²⁰ entries × 4 B = 4 MB per process, mostly empty. Splitting the address into dir 10 · table 10 · offset 12 bits, the outer table points to an inner table, which gives the frame, and the offset completes the physical address. Inner tables are created on demand; x86-64 uses four levels (9·9·9·9·12 bits), so a TLB miss costs four memory reads, which is why TLBs and huge pages matter.', sPageTable()),
    item('os-thrash', '스래싱과 워킹 셋', 'Thrashing and the working set', '메모리가 모자라 페이지를 끝없이 내보내고 들여오느라 CPU가 실제 일을 거의 못 하는 상태가 스래싱이에요.', '동시에 돌리는 프로세스를 늘리면 처음엔 CPU 사용률이 오르다가, 어느 순간 페이지 폴트 처리에 시간을 다 써 급락해요. 워킹 셋은 최근 Δ번 참조한 페이지 집합으로, 모든 프로세스의 워킹 셋 합이 실제 프레임보다 크면 스래싱이 일어나요. 프로세스를 줄이거나(스왑 아웃) 메모리를 늘리고, 페이지 폴트 빈도를 감시해 조절해요. 요즘은 cgroup 메모리 제한과 OOM killer가 개입해요.', 'Thrashing is when memory is so short that the system spends its time paging pages in and out instead of doing work.', 'Adding processes raises CPU utilization at first, then it collapses as page-fault handling consumes all the time. The working set is the pages referenced in the last Δ references; when the sum of working sets exceeds physical frames, thrashing follows. Run fewer processes (swap some out), add memory, or control page-fault frequency. Today cgroup memory limits and the OOM killer step in.', sThrash())
  ],
  'os-file': [
    item('os-journal', '저널링 파일 시스템', 'Journaling file systems', '파일 시스템을 고치기 전에 바꿀 내용을 저널(로그)에 먼저 기록해, 전원이 나가도 일관성을 지키는 방법이에요.', '파일 하나에 덧붙이는 데도 bitmap, inode, data 세 곳을 고쳐야 해서, 중간에 전원이 나가면 사용 중 표시만 된 블록 같은 불일치가 생겨요. 저널링은 TxB, 바꿀 내용, TxE(커밋)를 먼저 저널에 쓰고 커밋 후 실제 위치에 반영(체크포인트)해요. 재부팅하면 커밋된 트랜잭션만 다시 적용하고 끊긴 것은 버려, 디스크 전체를 훑는 fsck가 필요 없어요. ext4 기본 모드는 data=ordered이고, btrfs·ZFS는 복사 후 쓰기로 같은 문제를 풀어요.', 'Recording intended changes in a journal (log) before touching the file system, so it stays consistent across power failures.', 'Even appending to a file updates three places, bitmap, inode and data, so a crash midway can leave inconsistencies such as a block marked used but owned by nothing. Journaling writes TxB, the changes and TxE (the commit) to the journal first, then applies them to their final locations (checkpointing). After a reboot, committed transactions are replayed and interrupted ones discarded, avoiding a full fsck scan. ext4 defaults to data=ordered, while btrfs and ZFS solve the same problem with copy-on-write.', sJournal())
  ]
} };
})();

window.UX = page([
  sec('os-proc', '프로세스', 'Processes', '프로세스와 스레드', 'Processes and threads',
    '운영체제가 프로그램을 실행하고 나누어 관리하는 단위예요.', 'The units an operating system uses to run and separate programs.', [
    item('os-state', '프로세스 상태', 'Process states', '프로세스는 생성 → 준비 → 실행 → (대기) → 종료 상태를 오가요. 실행 중이던 프로세스도 시간이 다 되거나 I/O를 기다리면 CPU를 내놓아요.', '서버가 느릴 때 CPU를 쓰는 중(실행)인지, I/O를 기다리는 중(대기)인지 구분하는 것이 성능 분석의 첫걸음이에요. top의 R/S/D 상태가 이것이에요.', 'A process moves between new, ready, running, waiting and exit. A running process gives up the CPU when its time runs out or it waits for I/O.', 'When a server is slow, first tell whether it is busy computing (running) or waiting on I/O (blocked). The R/S/D states in top are exactly these.', sState()),
    item('os-thread', '프로세스 vs 스레드', 'Process vs thread', '프로세스는 독립된 메모리를 가진 실행 단위이고, 스레드는 한 프로세스 안에서 메모리를 공유하며 따로 실행되는 흐름이에요.', '스레드는 만들고 전환하기 가볍지만 공유 데이터 때문에 동기화 버그가 생겨요. 크롬이 탭마다 프로세스를 쓰는 건 한 탭이 죽어도 나머지를 지키기 위해서예요.', 'A process is an execution unit with its own memory; threads are separate flows of execution that share one process’s memory.', 'Threads are cheap to create and switch but shared data invites synchronization bugs. Chrome uses a process per tab so one crash cannot take down the rest.', sThread()),
    item('os-layout', '메모리 구조', 'Process memory layout', '프로세스의 메모리는 코드, 데이터(전역 변수), 힙(동적 할당), 스택(함수 호출) 영역으로 나뉘어요.', '재귀가 너무 깊으면 스택 오버플로, 할당한 힙을 안 풀면 메모리 누수가 생겨요. GC 언어도 힙을 관리하는 방식만 다를 뿐 구조는 같아요.', 'A process’s memory is split into code, data (globals), heap (dynamic allocation) and stack (function calls).', 'Deep recursion overflows the stack; heap memory never freed leaks. Garbage-collected languages manage the heap differently but use the same layout.', sLayout()),
    item('os-ctx', '컨텍스트 스위칭', 'Context switch', 'CPU가 다른 프로세스로 넘어갈 때 지금 프로세스의 레지스터 상태를 PCB에 저장하고, 다음 프로세스의 상태를 불러와요.', '전환 자체는 일을 하지 않는 비용이라 스레드가 너무 많으면 오히려 느려져요. 스레드 풀 크기를 코어 수에 맞추는 이유예요.', 'To switch to another process, the CPU saves the current registers to its PCB and loads the next process’s state.', 'Switching does no useful work, so too many threads slow things down. That is why thread pools are sized to the core count.', sCtx()),
    item('os-syscall', '시스템 콜', 'System call', '앱이 파일·네트워크·메모리 같은 자원을 쓰려면 시스템 콜로 커널 모드에 들어가 운영체제에게 대신 해 달라고 요청해요.', '모드 전환은 비싸서, 작은 read/write를 여러 번 하는 대신 버퍼에 모아 한 번에 해요. strace로 프로그램의 시스템 콜을 볼 수 있어요.', 'To use files, the network or memory, an app enters kernel mode through a system call and asks the OS to do it.', 'Mode switches are expensive, so many small reads and writes are buffered into one. strace shows a program’s system calls.', sSyscall()),
    item('os-ipc', '프로세스 간 통신', 'IPC', '프로세스는 메모리가 분리되어 있어서 파이프, 소켓, 메시지 큐, 공유 메모리 같은 방법으로 데이터를 주고받아요.', '셸의 | (파이프), 도커 컨테이너 간 소켓, Redis 같은 메시지 브로커가 모두 IPC의 확장이에요.', 'Processes have separate memory, so they exchange data through pipes, sockets, message queues or shared memory.', 'The shell’s | pipe, sockets between containers and message brokers like Redis all extend IPC.', sIPC())
  ].concat(XT.add['os-proc'] || [])),
  sec('os-sched', '스케줄링', 'Scheduling', 'CPU 스케줄링', 'CPU scheduling',
    'CPU 하나를 여러 프로세스가 나눠 쓰는 순서를 정하는 방법이에요. 막대는 시간 축 위의 실행 구간이에요.', 'How processes take turns on the CPU. Bars show who runs when.', [
    item('os-fcfs', 'FCFS와 SJF', 'FCFS vs SJF', 'FCFS는 먼저 온 순서대로, SJF는 실행 시간이 짧은 작업부터 처리해요.', '긴 작업 하나가 앞을 막으면 모두가 기다리는 현상(호위 효과)은 API 서버의 느린 요청 하나가 큐 전체를 막는 것과 같아요. 느린 작업을 별도 큐로 분리하세요.', 'FCFS serves jobs in arrival order; SJF runs the shortest job first.', 'One long job blocking everyone (the convoy effect) is the same as one slow request clogging an API queue. Put slow work in its own queue.', sFCFS()),
    item('os-rr', '라운드 로빈', 'Round robin', '모든 프로세스가 정해진 시간(타임 퀀텀)씩 돌아가며 CPU를 써요. 시간이 끝나면 준비 큐 맨 뒤로 가요.', '응답 시간이 고르게 짧아 대화형 시스템에 맞아요. 퀀텀이 너무 작으면 전환 비용이 커지고, 너무 크면 FCFS와 같아져요.', 'Each process gets the CPU for a fixed time slice (quantum) in turn, then goes to the back of the ready queue.', 'Response times are evenly short, which suits interactive systems. Too small a quantum adds switching cost; too large becomes FCFS.', sRR()),
    item('os-mlfq', '다단계 피드백 큐', 'Multilevel feedback queue', '우선순위가 다른 여러 큐를 두고, CPU를 오래 쓰는 작업은 아래 큐로 내리고 금방 양보하는 작업은 위에 남겨요.', '실행 시간을 몰라도 대화형 작업을 빠르게 처리해요. 리눅스 CFS, 윈도우 스케줄러가 비슷한 아이디어를 써요. 아래 큐의 기아는 주기적인 우선순위 상승으로 막아요.', 'Several queues of different priority: jobs that use lots of CPU sink, while jobs that yield quickly stay on top.', 'It keeps interactive work snappy without knowing job lengths. Linux CFS and the Windows scheduler use similar ideas; periodic boosts stop starvation.', sMLFQ())
  ].concat(XT.add['os-sched'] || [])),
  sec('os-sync', '동기화', 'Synchronization', '동기화와 교착 상태', 'Synchronization and deadlock',
    '여러 스레드가 같은 데이터를 건드릴 때 생기는 문제와 해결 도구예요.', 'What goes wrong when threads share data, and the tools that fix it.', [
    item('os-race', '경쟁 상태', 'Race condition', '두 스레드가 같은 값을 동시에 읽고 고치면 실행 순서에 따라 결과가 달라지고, 업데이트 하나가 사라질 수 있어요.', 'count++도 읽기·더하기·쓰기 세 단계라 안전하지 않아요. 재고 차감, 좋아요 수 같은 곳에서 자주 터지고 재현이 어려워요. 원자적 연산이나 락을 쓰세요.', 'When two threads read and modify the same value at once, the result depends on timing and an update can be lost.', 'Even count++ is read, add, write. It bites stock counters and like counts and is hard to reproduce. Use atomic operations or locks.', sRace()),
    item('os-mutex', '뮤텍스', 'Mutex', '임계 구역에 한 번에 한 스레드만 들어가도록 잠금(lock)을 걸고, 끝나면 풀어요(unlock).', '잠금 구간은 최대한 짧게 하고 예외가 나도 반드시 풀리게 try-finally나 with 문을 쓰세요. 분산 환경에선 Redis 분산 락 등을 써요.', 'A lock lets only one thread into the critical section at a time; it is released afterwards.', 'Keep locked sections short and make sure they unlock even on errors (try/finally, with). Distributed systems use things like Redis locks.', sMutex()),
    item('os-sema', '세마포어', 'Semaphore', '남은 자원 개수를 세는 카운터로, 정해진 수만큼만 동시에 들어갈 수 있게 해요. wait()로 줄이고 signal()로 늘려요.', 'DB 커넥션 풀, 동시 다운로드 개수 제한, API 동시 호출 수 제한에 써요. 개수가 1이면 뮤텍스와 같아요.', 'A counter of free resources that lets only a set number in at once: wait() decrements, signal() increments.', 'Used for DB connection pools and capping concurrent downloads or API calls. With a count of 1 it acts like a mutex.', sSema()),
    item('os-pc', '생산자-소비자', 'Producer–consumer', '한쪽은 버퍼에 데이터를 넣고 다른 쪽은 꺼내요. 버퍼가 가득 차면 생산자가, 비면 소비자가 기다려요.', '로그 수집, 작업 큐, 카프카 같은 메시지 큐가 모두 이 구조예요. 속도가 다른 두 시스템 사이에서 완충 역할을 해요.', 'One side puts data into a buffer and the other takes it out; producers wait when it is full, consumers when it is empty.', 'Log pipelines, job queues and message queues like Kafka all use this shape to buffer between systems running at different speeds.', sPC()),
    item('os-dead', '교착 상태', 'Deadlock', '둘 이상의 프로세스가 서로가 가진 자원을 기다리며 영원히 멈춘 상태예요. 상호 배제, 점유 대기, 비선점, 순환 대기가 모두 성립할 때 생겨요.', 'DB 트랜잭션이 서로의 행을 잠그며 자주 생겨요. 잠그는 순서를 통일하고, 타임아웃을 두는 것이 실무 해법이에요.', 'Two or more processes wait forever for resources the others hold. It needs mutual exclusion, hold-and-wait, no preemption and circular wait.', 'Common when database transactions lock each other’s rows. In practice: lock in a consistent order and use timeouts.', sDead())
  ].concat(XT.add['os-sync'] || [])),
  sec('os-mem', '메모리', 'Memory', '메모리 관리', 'Memory management',
    '한정된 물리 메모리를 여러 프로세스에게 안전하게 나눠 주는 방법이에요.', 'How limited physical memory is shared safely among processes.', [
    item('os-paging', '페이징과 가상 메모리', 'Paging · Virtual memory', '메모리를 같은 크기의 페이지로 나누고, 페이지 테이블로 가상 주소를 물리 주소로 바꿔요. 프로그램은 자기만의 넓은 메모리를 쓰는 것처럼 느껴요.', '프로세스끼리 메모리가 격리되고, 실제 메모리보다 큰 프로그램도 돌릴 수 있어요. 컨테이너 메모리 제한, OOM도 이 위에서 동작해요.', 'Memory is cut into equal pages and a page table maps virtual addresses to physical ones, so each program sees its own large memory.', 'It isolates processes and lets programs exceed physical RAM. Container memory limits and the OOM killer sit on top of it.', sPaging()),
    item('os-tlb', 'TLB', 'TLB · Translation lookaside buffer', '최근에 쓴 주소 변환 결과를 저장해 두는 CPU 안의 작은 캐시예요. 히트하면 페이지 테이블을 읽지 않아도 돼요.', '거대한 메모리를 쓰는 DB는 2MB 이상 큰 페이지(Huge Pages)를 써서 TLB 미스를 줄여요.', 'A small cache inside the CPU holding recent address translations. On a hit the page table is not read at all.', 'Databases with huge memory use 2 MB+ huge pages to cut TLB misses.', sTLB()),
    item('os-fault', '페이지 폴트', 'Page fault', '접근한 페이지가 메모리에 없으면 운영체제가 디스크에서 읽어와 빈 프레임에 올린 뒤 명령을 다시 실행해요.', '메모리가 부족해 폴트가 계속 나면 일보다 디스크 교체만 하는 스래싱이 생겨요. 서버가 갑자기 느려지면 스왑 사용량을 확인하세요.', 'If a page is not in memory, the OS loads it from disk into a free frame and retries the instruction.', 'With too little memory, constant faults cause thrashing: all swapping, no work. When a server suddenly slows, check swap usage.', sFault()),
    item('os-lru', '페이지 교체 (LRU)', 'Page replacement · LRU', '메모리가 꽉 찼을 때 어떤 페이지를 내보낼지 정해요. LRU는 가장 오랫동안 쓰이지 않은 페이지를 내보내요.', '최근에 쓴 것을 곧 다시 쓴다는 지역성 덕분에 잘 맞아요. 캐시 서버의 eviction 정책(LRU, LFU)도 같은 문제예요.', 'Decides which page to evict when memory is full. LRU evicts the page unused for the longest time.', 'It works because recently used data tends to be reused soon. Cache servers face the same choice in their eviction policies (LRU, LFU).', sLRU()),
    item('os-frag', '단편화', 'Fragmentation', '메모리를 할당하고 해제하다 보면 작은 빈 공간이 흩어져, 합은 충분한데 큰 덩어리를 못 넣게 돼요(외부 단편화).', '페이징은 고정 크기 조각을 써서 외부 단편화를 없애지만, 페이지 안의 남는 공간(내부 단편화)이 생겨요. 메모리 할당기(jemalloc 등)가 이 문제와 싸워요.', 'Repeated allocation and freeing scatter small holes: enough free memory in total, but no single block big enough (external fragmentation).', 'Paging removes external fragmentation with fixed-size pieces but wastes space inside pages (internal fragmentation). Allocators like jemalloc fight this.', sFrag())
  ].concat(XT.add['os-mem'] || [])),
  sec('os-file', '파일·I/O', 'Files & I/O', '파일, 입출력, 가상화', 'Files, I/O and virtualization',
    '데이터를 저장하고 장치와 통신하고 환경을 격리하는 방법이에요.', 'How data is stored, devices are talked to and environments are isolated.', [
    item('os-inode', '파일 시스템과 inode', 'File system · inode', '유닉스 계열 파일 시스템은 파일의 정보와 데이터 블록 위치를 inode에 저장하고, 디렉터리는 이름과 inode 번호만 연결해요.', '디스크 공간이 남아도 inode가 바닥나면 파일을 못 만들어요(df -i). 하드 링크는 같은 inode를 가리키는 이름이고, 심볼릭 링크는 경로를 담은 파일이에요.', 'Unix file systems keep a file’s metadata and block locations in an inode; directories only map names to inode numbers.', 'You can run out of inodes with disk space left (df -i). A hard link is another name for the same inode; a symlink is a file holding a path.', sInode()),
    item('os-intr', '인터럽트', 'Interrupt', '장치가 CPU에 "일이 생겼다"고 신호를 보내면, CPU는 하던 일을 저장하고 핸들러를 실행한 뒤 돌아와요.', '키보드, 네트워크 카드, 타이머가 모두 인터럽트를 써요. 타이머 인터럽트가 있어서 운영체제가 프로세스를 강제로 바꿀 수 있어요.', 'A device signals the CPU that something happened; the CPU saves its work, runs a handler and returns.', 'Keyboards, network cards and timers all use interrupts. The timer interrupt is what lets the OS preempt processes.', sIntr()),
    item('os-io', '블로킹 vs 비동기 I/O', 'Blocking vs async I/O', '블로킹 I/O는 응답이 올 때까지 스레드가 멈추고, 비동기 I/O는 요청만 보내 두고 다른 일을 하다가 완료되면 처리해요.', 'Node.js, Nginx, 파이썬 asyncio는 스레드 하나로 수만 개의 연결을 처리해요(epoll·kqueue). 대신 CPU를 오래 쓰는 작업이 끼면 전체가 멈춰요.', 'Blocking I/O halts the thread until the reply arrives; async I/O fires the request, does other work and handles completion later.', 'Node.js, Nginx and Python asyncio serve tens of thousands of connections on one thread (epoll, kqueue), but one CPU-heavy task stalls them all.', sIO()),
    item('os-cont', '가상 머신 vs 컨테이너', 'VM vs container', 'VM은 하이퍼바이저 위에 운영체제를 통째로 올리고, 컨테이너는 호스트의 커널을 함께 쓰며 프로세스만 격리해요.', '컨테이너는 수 초 안에 뜨고 가벼워서 배포 단위로 쓰여요(Docker, Kubernetes). 보안 격리가 더 필요하면 VM이나 gVisor 같은 샌드박스를 써요.', 'A VM runs a whole OS on a hypervisor; a container shares the host kernel and only isolates processes.', 'Containers start in seconds and are light, so they are the unit of deployment (Docker, Kubernetes). For stronger isolation use VMs or sandboxes like gVisor.', sCont())
  ].concat(XT.add['os-file'] || []))
].concat(XT.secs || []));
window.UX[0].css += XT.css;
window.UX[0].css += '\n.os-lg .in{font-size:.9em;font-weight:700;color:var(--ink)}';
})();
