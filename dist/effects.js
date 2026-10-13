// 装饰效果独立于榜单和采集逻辑；系统减少动态效果时关闭。
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const cards = [...document.querySelectorAll('.insight-card, .overview, .table-card')];
  const themeButton = document.querySelector('#themeButton');
  const themeMenu = document.querySelector('#themeMenu');
  if (themeButton && themeMenu) {
    const choices = [...themeMenu.querySelectorAll('[data-theme]')];
    const closeTheme = () => {
      themeMenu.hidden = true;
      themeButton.setAttribute('aria-expanded', 'false');
    };
    const applyTheme = theme => {
      document.documentElement.dataset.theme = theme;
      choices.forEach(button => button.setAttribute('aria-checked', String(button.dataset.theme === theme)));
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'green' ? '#071014' : '#101822');
    };
    applyTheme(document.documentElement.dataset.theme || 'blue');
    themeButton.addEventListener('click', () => {
      const open = themeMenu.hidden;
      themeMenu.hidden = !open;
      themeButton.setAttribute('aria-expanded', String(open));
      if (open) choices.find(button => button.getAttribute('aria-checked') === 'true')?.focus();
    });
    choices.forEach(button => button.addEventListener('click', () => {
      applyTheme(button.dataset.theme);
      try { localStorage.setItem('game-pulse-theme', button.dataset.theme); } catch {}
      closeTheme();
      themeButton.focus();
    }));
    document.addEventListener('click', event => {
      if (!event.target.closest('.theme-control')) closeTheme();
    });
    themeMenu.addEventListener('keydown', event => {
      if (event.key === 'Escape') { closeTheme(); themeButton.focus(); }
      if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        const index = choices.indexOf(document.activeElement);
        choices[event.key === 'Home' ? 0 : event.key === 'End' ? choices.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + choices.length) % choices.length].focus();
      }
    });
    themeMenu.addEventListener('focusout', event => {
      if (!event.relatedTarget?.closest('.theme-control')) closeTheme();
    });
  }
  // 保留原 select 的事件接口，用自定义菜单呈现交互。
  for (const select of document.querySelectorAll('select')) {
    const label = select.getAttribute('aria-label') || '选择';
    const wrapper = document.createElement('div');
    wrapper.className = 'sort-picker';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'sort-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', `${select.id}Options`);
    const menu = document.createElement('div');
    menu.id = `${select.id}Options`;
    menu.className = 'sort-options';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', label);
    menu.hidden = true;
    let active = 0;
    let options = [];
    const rebuild = () => {
    menu.replaceChildren();
    options = [...select.options].map((option, index) => {
      const button = document.createElement('div');
      button.id = `${select.id}Option${index}`;
      button.className = 'sort-option';
      button.setAttribute('role', 'option');
      button.textContent = option.textContent;
      button.addEventListener('pointerdown', event => event.preventDefault());
      button.addEventListener('click', () => {
        select.value = option.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        close();
        trigger.focus();
      });
      menu.append(button);
      return button;
    });
    close();
    update();
    };
    const highlight = index => {
      active = (index + options.length) % options.length;
      options.forEach((option, i) => option.classList.toggle('is-active', i === active));
      trigger.setAttribute('aria-activedescendant', options[active].id);
      options[active].scrollIntoView({block:'nearest'});
    };
    const update = () => {
      trigger.textContent = select.selectedOptions[0]?.textContent || '';
      trigger.setAttribute('aria-label', `${label}：${trigger.textContent}`);
      options.forEach((option, i) => option.setAttribute('aria-selected', String(i === select.selectedIndex)));
    };
    const close = () => {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.removeAttribute('aria-activedescendant');
    };
    const open = () => {
      document.dispatchEvent(new CustomEvent('dropdown-open', {detail:wrapper}));
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      highlight(select.selectedIndex);
    };
    trigger.addEventListener('click', () => menu.hidden ? open() : close());
    trigger.addEventListener('keydown', event => {
      if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        if (menu.hidden) open();
        else highlight(event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : active + (event.key === 'ArrowDown' ? 1 : -1));
      } else if ((event.key === 'Enter' || event.key === ' ') && !menu.hidden) {
        event.preventDefault();
        options[active].click();
      } else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
      else if (event.key === 'Tab') close();
    });
    document.addEventListener('click', event => { if (!wrapper.contains(event.target)) close(); });
    document.addEventListener('dropdown-open', event => { if(event.detail!==wrapper) close(); });
    wrapper.addEventListener('focusout', event => { if(!wrapper.contains(event.relatedTarget)) close(); });
    select.addEventListener('change', update);
    select.before(wrapper);
    wrapper.append(trigger, menu);
    select.hidden = true;
    rebuild();
    new MutationObserver(rebuild).observe(select,{childList:true,subtree:true,attributes:true});
  }
  let frame = 0;
  let pending = null;

  document.addEventListener('pointermove', event => {
    if (reduced.matches || !finePointer.matches) return;
    const card = event.target.closest('.insight-card, .overview, .table-card');
    if (!card) return;
    pending = { card, x: event.clientX, y: event.clientY };
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const { card, x, y } = pending;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--light-x', `${x - rect.left}px`);
      card.style.setProperty('--light-y', `${y - rect.top}px`);
    });
  }, { passive: true });

  document.addEventListener('click', event => {
    if (reduced.matches) return;
    const button = event.target.closest('.platform-tab, .refresh-button, .archive-launch, .page-button');
    if (!button || button.disabled) return;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'effect-ripple';
    ripple.setAttribute('aria-hidden', 'true');
    ripple.style.left = `${event.detail ? event.clientX - rect.left : rect.width / 2}px`;
    ripple.style.top = `${event.detail ? event.clientY - rect.top : rect.height / 2}px`;
    button.append(ripple);
    setTimeout(() => ripple.remove(), 650);
  });

  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove('effect-waiting');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.06 });
    cards.forEach(card => {
      card.classList.add('effect-reveal', 'effect-waiting');
      observer.observe(card);
    });
    reduced.addEventListener('change', () => {
      if (!reduced.matches) return;
      cards.forEach(card => card.classList.remove('effect-waiting'));
      observer.disconnect();
    });
  }
})();
