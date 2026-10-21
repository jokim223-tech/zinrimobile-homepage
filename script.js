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


document.querySelectorAll('[data-network-choice]').forEach(link => {
  link.addEventListener('click', () => {
    const network = link.dataset.networkChoice;
    const plans = document.getElementById('plans');
    if (!plans) return;
    const candidates = [...plans.querySelectorAll('button, [role="tab"], select, input[type="radio"]')];
    const matching = candidates.find(el => (el.textContent || el.value || '').trim().toUpperCase().includes(network));
    if (matching) { if (matching.tagName === 'SELECT') { const opt = [...matching.options].find(o => o.text.toUpperCase().includes(network)); if (opt) { matching.value=opt.value;matching.dispatchEvent(new Event('change',{bubbles:true})); } } else matching.click(); }
  });
});
