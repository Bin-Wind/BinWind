(() => {
  const md5 = (input) => {
    const source = new TextEncoder().encode(input);
    const size = Math.ceil((source.length + 9) / 64) * 64;
    const bytes = new Uint8Array(size);
    bytes.set(source);
    bytes[source.length] = 0x80;
    const view = new DataView(bytes.buffer);
    const bitLength = source.length * 8;
    view.setUint32(size - 8, bitLength >>> 0, true);
    view.setUint32(size - 4, Math.floor(bitLength / 0x100000000), true);
    const shifts = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
    const constants = Array.from({ length: 64 }, (_, index) => Math.floor(Math.abs(Math.sin(index + 1)) * 0x100000000) >>> 0);
    let a0 = 0x67452301;
    let b0 = 0xefcdab89;
    let c0 = 0x98badcfe;
    let d0 = 0x10325476;
    for (let offset = 0; offset < size; offset += 64) {
      const words = Array.from({ length: 16 }, (_, index) => view.getUint32(offset + index * 4, true));
      let a = a0;
      let b = b0;
      let c = c0;
      let d = d0;
      for (let index = 0; index < 64; index++) {
        let f;
        let wordIndex;
        let shift;
        if (index < 16) {
          f = (b & c) | (~b & d);
          wordIndex = index;
          shift = shifts[index % 4];
        } else if (index < 32) {
          f = (d & b) | (~d & c);
          wordIndex = (5 * index + 1) % 16;
          shift = shifts[4 + index % 4];
        } else if (index < 48) {
          f = b ^ c ^ d;
          wordIndex = (3 * index + 5) % 16;
          shift = shifts[8 + index % 4];
        } else {
          f = c ^ (b | ~d);
          wordIndex = (7 * index) % 16;
          shift = shifts[12 + index % 4];
        }
        const sum = (a + f + constants[index] + words[wordIndex]) >>> 0;
        const rotated = ((sum << shift) | (sum >>> (32 - shift))) >>> 0;
        [a, d, c, b] = [d, c, b, (b + rotated) >>> 0];
      }
      a0 = (a0 + a) >>> 0;
      b0 = (b0 + b) >>> 0;
      c0 = (c0 + c) >>> 0;
      d0 = (d0 + d) >>> 0;
    }
    return [a0, b0, c0, d0].map((word) =>
      [0, 8, 16, 24].map((shift) => ((word >>> shift) & 0xff).toString(16).padStart(2, '0')).join('')
    ).join('');
  };
  const passwordHash = '3044a174d7a4e4e7b130940751a19933';
  window.verifyLovePassword = (password) => md5(`${password}ldj`) === passwordHash;
  const unlockKey = 'jiangjiang-unlock-until';
  const unlockDuration = 12 * 60 * 60 * 1000;
  const unlockForm = document.getElementById('unlockForm');
  const passwordInput = document.getElementById('password');

  const hasValidUnlock = () => {
    try {
      const unlockUntil = Number(localStorage.getItem(unlockKey));
      if (Number.isFinite(unlockUntil) && unlockUntil > Date.now()) return true;
      localStorage.removeItem(unlockKey);
    } catch (_) {}
    return false;
  };

  unlockForm.addEventListener('submit', () => {
    if (!window.verifyLovePassword(passwordInput.value.trim())) return;
    try {
      localStorage.setItem(unlockKey, String(Date.now() + unlockDuration));
    } catch (_) {}
  }, true);

  if (hasValidUnlock()) {
    setTimeout(() => {
      document.getElementById('gate').classList.add('hidden');
      document.getElementById('page').classList.add('ready');
      document.body.classList.remove('locked');
    }, 0);
  }

  const messages = [
    '从一个陌生号码，到中秋前后真正见面，原来有些选择真的会改变故事的方向。',
    '江江，从上海到深圳见到你的那一刻，隔着屏幕的期待终于有了真实的模样。',
    '九天不算漫长，却足够让深圳、福州和平潭都留下属于我们的回忆。',
    '深圳的灯火很亮，平潭的海风很温柔，但我最记得的是身边有你。',
    '旅途结束了，可那些一起走过的路、吃过的饭和笑过的瞬间都被好好留下了。',
    '见过真实的你以后，我没有减少期待，反而更期待下一次见面。',
    '仪式感不只是鲜花和惊喜，也是把与你有关的每一段回忆认真收藏。',
    '福州的烟火气、平潭的海风，还有我们一起相处的九天，我都会记得。',
    '我愿意拿出耐心和认真，让每一次靠近都自然发生。',
    '这一次是中秋和三座城市，下一次，希望还有更多地方能与你一起抵达。'
  ];
  const actions = document.querySelector('.actions');
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');
  const closeModal = document.getElementById('closeModal');
  const messageForm = document.getElementById('messageForm');
  const messageInput = document.getElementById('messageInput');
  const messageCount = document.getElementById('messageCount');
  const messageStatus = document.getElementById('messageStatus');
  const sendMessage = document.getElementById('sendMessage');
  const cancelMessage = document.getElementById('cancelMessage');
  const webhookUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=35674257-2dfa-42af-b0c4-4173e7ed1e26';
  const duplicateKey = 'jiangjiang-last-message';
  const duplicateWindow = 5 * 60 * 1000;
  let sending = false;

  const showLetter = () => {
    messageForm.classList.remove('open');
    modalMessage.hidden = false;
    closeModal.hidden = false;
    modalMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
    modal.classList.add('open');
    closeModal.focus();
  };

  const showMessageForm = () => {
    modalMessage.hidden = true;
    closeModal.hidden = true;
    messageForm.classList.add('open');
    messageStatus.textContent = '';
    messageStatus.classList.remove('error');
    modal.classList.add('open');
    setTimeout(() => messageInput.focus(), 80);
  };

  const isDuplicate = (content) => {
    try {
      const last = JSON.parse(localStorage.getItem(duplicateKey) || 'null');
      return last && last.content === content && Date.now() - last.sentAt < duplicateWindow;
    } catch (_) {
      return false;
    }
  };

  messageInput.addEventListener('input', () => {
    messageCount.textContent = `${messageInput.value.length} / 3000`;
    if (messageStatus.classList.contains('error')) {
      messageStatus.textContent = '';
      messageStatus.classList.remove('error');
    }
  });

  messageForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const content = messageInput.value.trim();
    if (sending) return;
    if (!content) {
      messageStatus.textContent = '先写下一句话再发送。';
      messageStatus.classList.add('error');
      messageInput.focus();
      return;
    }
    if (isDuplicate(content)) {
      messageStatus.textContent = '这句话刚刚已经发送过了。';
      messageStatus.classList.add('error');
      return;
    }

    sending = true;
    sendMessage.disabled = true;
    sendMessage.textContent = '发送中…';
    messageStatus.textContent = '正在把这句话送出去…';
    messageStatus.classList.remove('error');

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({ msgtype: 'text', text: { content: `【江江想对我说的话】\n${content}` } })
      });
      try {
        localStorage.setItem(duplicateKey, JSON.stringify({ content, sentAt: Date.now() }));
      } catch (_) {}
      messageInput.value = '';
      messageCount.textContent = '0 / 3000';
      messageStatus.textContent = '已经送出，谢谢你认真写下这句话。';
      sendMessage.textContent = '已发送';
      setTimeout(() => {
        sending = false;
        sendMessage.disabled = false;
        sendMessage.textContent = '发送消息';
      }, 10000);
    } catch (_) {
      sending = false;
      sendMessage.disabled = false;
      sendMessage.textContent = '重新发送';
      messageStatus.textContent = '发送失败，请检查网络后再试一次。';
      messageStatus.classList.add('error');
    }
  });

  cancelMessage.addEventListener('click', () => modal.classList.remove('open'));

  actions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button || !['letter', 'secret'].includes(button.dataset.action)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (button.dataset.action === 'secret') showMessageForm();
    else showLetter();
  }, true);
})();
