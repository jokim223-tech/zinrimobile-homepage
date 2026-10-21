document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const answer = document.getElementById(question.getAttribute('aria-controls'));
    const expanded = question.getAttribute('aria-expanded') === 'true';
    question.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
    question.querySelector('span').textContent = expanded ? '+' : '−';
  });
});

function calculateFirstCharge(raw) {
  const value = String(raw).trim();
  if (!/^(?:[0-9]+|[0-9]{1,3}(?:,[0-9]{3})+)$/.test(value)) return null;
  const monthlyFee = Number(value.replace(/,/g, ''));
  if (!Number.isSafeInteger(monthlyFee) || monthlyFee <= 0 || monthlyFee > 1000000) return null;
  return { monthlyFee, firstCharge: Math.ceil(monthlyFee / 1000) * 1000 };
}
const chargeForm = document.getElementById('charge-form');
if (chargeForm) {
  const feeInput = document.getElementById('monthly-fee');
  const result = document.getElementById('charge-result');
  feeInput.addEventListener('input', () => { result.textContent = ''; });
  chargeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const amount = calculateFirstCharge(feeInput.value);
    result.textContent = amount
      ? '월 기본료 ' + amount.monthlyFee.toLocaleString('ko-KR') + '원 → 첫 충전 안내 금액 ' + amount.firstCharge.toLocaleString('ko-KR') + '원'
      : '1원부터 1,000,000원까지의 정수 금액을 입력해주세요. 예: 12,100';
  });
}


/* Click measurement without storing personal identifiers.
   To enable GA4, add the site's verified G- measurement ID to the page.
   Events are sent only when a GA4 gtag integration is actually configured. */
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link) return;
  let action = null;
  try {
    const url = new URL(link.href, location.href);
    if (url.hostname === 'pf.kakao.com' && url.pathname.startsWith('/_waaAX/')) action = 'kakao_consult_click';
    else if (url.hostname === 'www.n-telecom.co.kr' && url.pathname.includes('/selfopen_explain.aspx')) action = 'official_open_click';
    else if (url.protocol === 'tel:') action = 'phone_call_click';
  } catch (_) { return; }
  if (!action) return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, { event_category: 'conversion', page_path: location.pathname });
  }
});
