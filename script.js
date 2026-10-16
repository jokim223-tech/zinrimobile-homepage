document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const answer = document.getElementById(question.getAttribute('aria-controls'));
    const expanded = question.getAttribute('aria-expanded') === 'true';
    question.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
    question.querySelector('span').textContent = expanded ? '+' : '−';
  });
});
