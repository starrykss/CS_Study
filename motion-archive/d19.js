(window.UX = window.UX || []).push({
  id: 's-write', short: 'UX 라이팅', en: 'UX writing',
  title: '화면의 말투를 다듬는 법',
  sub: '버튼 이름 하나, 오류 문장 하나가 사용자의 다음 행동을 정해요. 고치기 전과 후를 나란히 보세요.',
  css: `
.sc .bf{position:relative;width:24em;padding:1.3em 1.4em;display:flex;flex-direction:column;gap:.8em}
.sc .bf .stk2{display:grid}
.sc .bf .stk2>*{grid-area:1/1}
.sc .bf .no{animation:wr-no 5s infinite}
.sc .bf .yes{opacity:0;animation:wr-yes 5s infinite}
.sc .bf .tag span{justify-self:start;padding:.2em .6em;border-radius:.4em;font-family:var(--f-mono);font-size:.72em;font-weight:500}
.sc .bf .tag .no{background:var(--danger-soft);color:var(--danger)}
.sc .bf .tag .yes{background:var(--accent-soft);color:var(--accent)}
.sc .bf .msg{font-size:1.05em;line-height:1.5}
.sc .bf .msg b{font-weight:700}
.sc .bf .msg .no{color:var(--ink-2)}
.sc .bf .bts{display:flex;gap:.5em}
.sc .bf .bts .bt{flex:1;font-size:.9em}
.sc .bf .sm{font-size:.82em;color:var(--ink-2)}
@keyframes wr-no{0%,40%{opacity:1;transform:none}46%,94%{opacity:0;transform:translateY(-.3em)}100%{opacity:1;transform:none}}
@keyframes wr-yes{0%,44%{opacity:0;transform:translateY(.3em)}50%,92%{opacity:1;transform:none}98%,100%{opacity:0}}
.w-load .spn{width:1.4em;height:1.4em;border-width:.2em}
.w-term .lbls{display:flex;gap:.6em;flex-wrap:wrap}
.w-term .lbls span{padding:.35em .7em;border-radius:.5em;background:var(--stage);font-size:.85em}
`,
  items: [
    {
      id: 'w-verb', k: '버튼은 동사로', e: 'Label buttons with verbs',
      d: '"확인", "예"보다 "삭제하기", "보내기"처럼 누르면 일어날 일을 버튼 이름으로 쓰면 본문을 읽지 않아도 실수하지 않아요.',
      u: '확인 창에서 사람들은 본문보다 버튼만 보고 눌러요. 버튼만 읽어도 결과를 알 수 있게 쓰세요. 같은 동작은 서비스 전체에서 같은 단어로 통일하고, "~하기"나 명사형 중 하나로 맞추세요.',
      html: `<div class="bf box"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><span class="msg"><b>사진 3장을 삭제할까요?</b></span><div class="stk2"><div class="bts no"><span class="bt g">아니요</span><span class="bt">확인</span></div><div class="bts yes"><span class="bt g">취소</span><span class="bt" style="background:var(--danger);color:var(--danger-ink)">3장 삭제하기</span></div></div></div>`
    },
    {
      id: 'w-err', k: '오류 메시지의 3요소', e: 'Error messages',
      d: '좋은 오류 메시지는 무슨 일이 생겼는지, 왜 그런지, 어떻게 하면 되는지를 사용자 말로 알려줘요.',
      u: '오류 코드와 "알 수 없는 오류" 대신 해결 방법을 쓰세요. 사용자를 탓하는 표현("잘못 입력하셨습니다")은 피하고, 시스템 문제라면 사과와 함께 다시 시도할 방법을 주세요. 입력한 내용은 지우지 마세요.',
      html: `<div class="bf box"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><div class="stk2 msg"><span class="no">오류가 발생했습니다.<br>(ERR_PAYMENT_DECLINED_051)</span><span class="yes"><b>결제하지 못했어요.</b><br>카드 한도가 부족해요. 다른 카드로 결제하거나 한도를 확인해 주세요.</span></div></div>`
    },
    {
      id: 'w-tone', k: '말투 통일', e: 'Consistent voice & tone',
      d: '한 서비스 안에서 "~습니다"와 "~해요"가 섞이면 여러 사람이 말하는 것처럼 어수선해요. 하나의 말투로 통일하세요.',
      u: '토스, 당근처럼 친근한 해요체를 쓰는 서비스가 많아요. 말투를 정했다면 버튼, 알림, 오류, 이메일까지 모두 맞추세요. 친근함과 가벼움은 달라서, 결제 실패·개인정보 같은 무거운 상황에서는 더 차분하게 쓰세요.',
      html: `<div class="bf box"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><div class="stk2 msg"><span class="no">저장이 완료되었습니다.<br>결과는 기록 탭에서 확인하세요!</span><span class="yes">저장했어요.<br>결과는 기록 탭에서 볼 수 있어요.</span></div></div>`
    },
    {
      id: 'w-plain', k: '사용자의 언어로', e: 'Use plain language',
      d: '개발자나 회사 내부에서 쓰는 단어 대신, 사용자가 실제로 쓰는 말로 바꿔요.',
      u: '"세션", "인증 토큰", "동기화 실패", "권한 없음" 같은 말은 사용자가 할 수 있는 일을 알려주지 않아요. 사용자가 겪는 상황과 해야 할 행동으로 바꿔 쓰세요. 어려운 단어가 꼭 필요하면 처음 나올 때 짧게 풀어 주세요.',
      html: `<div class="bf box"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><div class="stk2 msg"><span class="no">세션이 만료되었습니다.<br>재인증이 필요합니다.</span><span class="yes">오랫동안 사용하지 않아 로그아웃됐어요.<br>다시 로그인해 주세요.</span></div></div>`
    },
    {
      id: 'w-front', k: '핵심을 앞에', e: 'Front-load the key point',
      d: '사람들은 문장 앞부분만 훑어봐요. 사용자에게 중요한 내용을 문장 맨 앞에 두고, 꾸미는 말은 덜어내세요.',
      u: '알림·배너·제목은 앞 10자 안에 핵심이 보여야 해요. "고객님의 소중한 의견을 바탕으로" 같은 서두를 지우세요. 한 문장에는 한 가지 정보만, 길어지면 두 문장으로 나누세요.',
      html: `<div class="bf box"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><div class="stk2 msg"><span class="no">고객님의 소중한 의견을 바탕으로 서비스를 개선하여, 이제부터는 면접 결과 리포트를 PDF 파일 형태로도 내려받으실 수 있게 되었습니다.</span><span class="yes"><b>면접 리포트를 PDF로 받을 수 있어요.</b><br>기록 탭에서 내려받기를 눌러 보세요.</span></div></div>`
    },
    {
      id: 'w-confirm', k: '확인 창 문구', e: 'Confirmation dialogs',
      d: '"정말 진행하시겠습니까?" 대신 무엇이 어떻게 되는지 구체적으로 쓰고, 버튼에 두 선택의 결과를 담아요.',
      u: '제목은 질문 하나로, 본문에는 되돌릴 수 있는지와 영향을 받는 것(날짜, 금액, 개수)을 쓰세요. "예/아니요"로 답하게 하면 질문을 다시 읽어야 해요.',
      html: `<div class="bf box"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><div class="stk2 msg"><span class="no"><b>정말 진행하시겠습니까?</b></span><span class="yes"><b>구독을 해지할까요?</b><br><span class="sm">12월 1일부터 요금이 나가지 않고, 그날까지는 계속 쓸 수 있어요.</span></span></div><div class="stk2"><div class="bts no"><span class="bt g">아니요</span><span class="bt">예</span></div><div class="bts yes"><span class="bt g">계속 쓰기</span><span class="bt">해지하기</span></div></div></div>`
    },
    {
      id: 'w-empty', k: '빈 상태 문구', e: 'Empty state copy',
      d: '"데이터 없음" 대신 왜 비어 있는지, 무엇을 하면 채워지는지를 알려주는 문장과 버튼을 둬요.',
      u: '처음 쓰는 사람의 빈 화면은 첫 행동을 이끄는 기회예요. 검색 결과가 없을 때는 검색어 맞춤법 확인, 더 넓은 검색어 제안처럼 다음 할 일을 알려주세요.',
      html: `<div class="bf box"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><div class="stk2 msg"><span class="no">데이터 없음</span><span class="yes"><b>아직 연습 기록이 없어요.</b><br><span class="sm">첫 모의면접을 마치면 여기에 리포트가 쌓여요.</span></span></div><div class="stk2"><span class="no"></span><span class="yes bt" style="justify-self:start">첫 면접 시작하기</span></div></div>`
    },
    {
      id: 'w-load', k: '로딩 문구', e: 'Loading copy',
      d: '"로딩 중…"보다 지금 무엇을 하고 있는지, 얼마나 걸리는지를 알려주면 기다림이 훨씬 짧게 느껴져요.',
      u: '3초가 넘는 작업이면 무엇을 하는 중인지 써 주세요. 10초가 넘으면 예상 시간이나 단계를 보여주고, 다른 일을 해도 된다면 그렇다고 알려주세요. 재치 있는 문구는 처음엔 재밌지만 반복되면 짜증 나요.',
      html: `<div class="bf box w-load"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><div class="rw"><span class="spn"></span><div class="stk2 msg"><span class="no">로딩 중...</span><span class="yes"><b>답변을 분석하고 있어요</b><br><span class="sm">약 20초 걸려요 · 2/3단계</span></span></div></div></div>`
    },
    {
      id: 'w-done', k: '완료 메시지', e: 'Success messages',
      d: '"성공적으로 처리되었습니다" 대신 무엇이 끝났는지, 다음에 무슨 일이 일어나는지를 알려줘요.',
      u: '사용자가 궁금한 건 "그래서 이제 뭐가 돼요?"예요. 결과를 언제 알 수 있는지, 어디서 확인하는지, 추가로 할 일이 있는지 한두 문장으로 알려주세요.',
      html: `<div class="bf box"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><div class="stk2 msg"><span class="no">요청이 성공적으로 처리되었습니다.</span><span class="yes"><b>지원서를 보냈어요.</b><br><span class="sm">서류 결과는 3일 안에 알림으로 알려드릴게요.</span></span></div></div>`
    },
    {
      id: 'w-num', k: '숫자와 단위', e: 'Numbers & units',
      d: '숫자는 아라비아 숫자로, 큰 수는 쉼표를 넣고, 날짜와 시간은 사람이 읽는 방식으로 써요.',
      u: '"1만 2천 원"보다 "12,000원"이 빨리 읽혀요. 기간은 "3600초"가 아니라 "1시간", 날짜는 오늘·어제·3일 전처럼 상대적으로 쓰면 편한 경우가 많아요. 단위는 숫자 바로 옆에, 표기 방식은 서비스 전체에서 같게 맞추세요.',
      html: `<div class="bf box"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><div class="stk2 msg"><span class="no">결제 금액 12000원<br>결제일 20261108 / 남은 시간 3600초</span><span class="yes">결제 금액 <b>12,000원</b><br>결제일 11월 8일(일) · 1시간 남음</span></div></div>`
    },
    {
      id: 'w-pos', k: '긍정형으로 쓰기', e: 'Say what to do',
      d: '하지 말아야 할 것보다 해야 할 것을 말해 주면 한 번에 이해돼요. 이중 부정은 특히 헷갈려요.',
      u: '"~할 수 없습니다", "~하지 않으면 안 됩니다" 대신 "~해 주세요"로 바꿔 보세요. 꼭 금지해야 하는 경우에도 이유와 대안을 함께 쓰면 덜 차갑게 느껴져요.',
      html: `<div class="bf box"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><div class="stk2 msg"><span class="no">비밀번호는 8자 미만으로 설정할 수 없으며, 특수문자가 포함되지 않으면 안 됩니다.</span><span class="yes">비밀번호는 <b>8자 이상</b>, <b>특수문자를 넣어</b> 만들어 주세요.</span></div></div>`
    },
    {
      id: 'w-term', k: '용어 통일', e: 'Consistent terminology',
      d: '같은 것을 화면마다 다른 이름으로 부르면 사용자는 서로 다른 것이라고 생각해요. 하나의 이름을 정해 끝까지 쓰세요.',
      u: '팀에서 쓰는 용어 사전(장바구니 O, 카트·바구니 X)을 만들어 디자이너, 개발자, 마케터가 함께 쓰세요. 앱 스토어 설명, 고객센터 답변, 푸시 알림까지 같은 단어를 써야 해요.',
      html: `<div class="bf box w-term"><div class="stk2 tag"><span class="no">✗ 고치기 전</span><span class="yes">✓ 고친 후</span></div><div class="stk2"><div class="lbls no"><span>카트에 담기</span><span>바구니 보기</span><span>장바구니 비우기</span></div><div class="lbls yes"><span>장바구니에 담기</span><span>장바구니 보기</span><span>장바구니 비우기</span></div></div></div>`
    }
  ]
});
