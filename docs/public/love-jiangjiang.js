(() => {
  const messages = [
    '江江，遇见你以后，我才知道“刚刚好”原来不是形容时间，而是形容一个人。',
    '江江，我想和你分享的，从来不只是浪漫，还有早餐、晚风和漫长岁月。',
    '江江不用一直闪闪发光。在我这里，你永远可以做最真实的自己。',
    '我的偏爱很简单：别人再好也是别人，江江不一样，江江是我的答案。',
    '江江，我想把每一个普通的明天，都慢慢变成我们的以后。',
    '我喜欢的人有一个最好听的名字，叫江江。',
    '江江，你站在那里，就已经是我奔赴的意义。',
    '想牵着江江的手，从每一次心动，走到很久很久以后。'
  ];
  const actions = document.querySelector('.actions');
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');
  const closeModal = document.getElementById('closeModal');

  actions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button || !['letter', 'secret'].includes(button.dataset.action)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    modalMessage.textContent = button.dataset.action === 'secret'
      ? '偷偷告诉江江：这个页面会旧，代码会更新，但我喜欢江江这件事，永远是最新版本。'
      : messages[Math.floor(Math.random() * messages.length)];
    modal.classList.add('open');
    closeModal.focus();
  }, true);
})();
