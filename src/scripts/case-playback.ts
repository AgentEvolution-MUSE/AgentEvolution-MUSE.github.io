type Scene = { element: HTMLElement | SVGElement; label: string; prefixStep?: number };

document.querySelectorAll<HTMLElement>('[data-case-playback]').forEach(toolbar => {
  const disclosure = toolbar.closest<HTMLDetailsElement>('details')!;
  const root = disclosure.querySelector<HTMLElement>('[data-case-map]')!;
  const prefix = root.classList.contains('case-map-prefix');
  const scenes: Scene[] = [];
  const add = (selector: string, label?: string) => {
    root.querySelectorAll<HTMLElement>(selector).forEach(element => {
      scenes.push({ element, label: label || element.querySelector('h5, strong')?.textContent?.trim() || 'Outcome' });
    });
  };
  if (prefix) {
    root.querySelectorAll<SVGElement>('[data-potential-step]').forEach(element => scenes.push({
      element, label: element.getAttribute('aria-label')!.split(', potential')[0], prefixStep: Number(element.dataset.potentialStep),
    }));
  } else if (disclosure.id === 'case-supervision') {
    add('.case-map-task', 'Task: summarize, create a note, and send email');
    for (const trace of ['guided', 'free']) {
      root.querySelectorAll<HTMLElement>(`[data-case-trace="${trace}"] [data-node]`).forEach(element => {
        scenes.push({ element, label: `${trace === 'guided' ? 'Guided' : 'Free'} · ${element.querySelector('.case-step-number')!.textContent}: ${element.querySelector('strong')!.textContent}` });
      });
      add(`[data-node="${trace}-outcome"]`, trace === 'guided' ? 'Guided: complete execution · Reward 1.00' : 'Free: partial execution · Reward 0.20');
    }
  } else {
    add('.case-source-column > .case-map-block');
    add('.case-execution-column > .case-map-block');
    add('.case-execution-column [data-flow-order]');
    add('.case-execution-column > .case-map-outcome');
  }
  if (!scenes.length) return;
  const all = toolbar.querySelector<HTMLButtonElement>('[data-play-all]')!;
  const interval = 600;
  let position = -1, overview = true, playing = false, finished = false, inView = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  scenes.forEach((scene, i) => scene.element.dataset.sequenceIndex = String(i));

  function refresh() {
    toolbar.dataset.playing = String(playing);
    toolbar.dataset.position = String(position);
    all.disabled = finished;
    all.textContent = finished ? 'All shown' : 'Show all';
  }
  function suspend() { playing = false; clearTimeout(timer); refresh(); }
  function syncEdges() {
    root.querySelectorAll('[data-sequence-source]').forEach(node => node.removeAttribute('data-sequence-source'));
    if (prefix) {
      root.querySelectorAll<SVGElement>('[data-error-step]').forEach(label => label.toggleAttribute('data-sequence-pending', !overview && Number(label.dataset.errorStep) > position));
      root.querySelector('.case-map-outcome')!.toggleAttribute('data-sequence-pending', !overview && position < scenes.length - 1);
    }
    root.querySelectorAll<HTMLElement>('.case-flow-transition').forEach(arrow => {
      const next = arrow.nextElementSibling;
      const target = next?.matches('[data-sequence-index]') ? next : next?.querySelector('[data-sequence-index]');
      arrow.toggleAttribute('data-sequence-pending', !overview && !!target?.hasAttribute('data-sequence-pending'));
    });
    root.querySelectorAll<SVGPathElement>('.case-map-connections path[data-edge-from]').forEach(edge => {
      const from = root.querySelector<HTMLElement>(`[data-node="${edge.dataset.edgeFrom}"]`);
      const to = root.querySelector<HTMLElement>(`[data-node="${edge.dataset.edgeTo}"]`);
      const hidden = !overview && (!!from?.closest('[data-sequence-pending]') || !!to?.closest('[data-sequence-pending]'));
      edge.toggleAttribute('data-sequence-pending', hidden);
      const current = !overview && !hidden && !!to && (to === scenes[position].element || scenes[position].element.contains(to));
      edge.toggleAttribute('data-sequence-edge', current);
      if (current && edge.hasAttribute('data-edge-link')) from?.setAttribute('data-sequence-source', '');
    });
  }
  function show(index: number) {
    overview = false; position = Math.max(0, Math.min(scenes.length - 1, index));
    root.setAttribute('data-sequence-mode', '');
    if (prefix) {
      root.dispatchEvent(new CustomEvent('case-prefix-step', { detail: scenes[position].prefixStep }));
      root.querySelector<SVGPolylineElement>('.case-potential-map polyline')!.setAttribute('points', scenes.slice(0, position + 1).map(s => {
        const point = s.element.querySelector('circle.potential-dot')!;
        return `${point.getAttribute('cx')},${point.getAttribute('cy')}`;
      }).join(' '));
    }
    scenes.forEach((scene, i) => {
      // The table remains complete during prefix playback; only its chart unfolds.
      scene.element.toggleAttribute('data-sequence-pending', i > position);
      scene.element.toggleAttribute('data-sequence-current', i === position);
      if (!prefix) { (scene.element as HTMLElement).inert = i > position; }
    });
    syncEdges(); refresh();
  }
  function showAll() {
    suspend(); finished = true; overview = true; position = scenes.length - 1;
    root.removeAttribute('data-sequence-mode');
    scenes.forEach(scene => {
      scene.element.removeAttribute('data-sequence-pending');
      scene.element.removeAttribute('data-sequence-current');
      (scene.element as HTMLElement).inert = false;
    });
    if (prefix) {
      root.querySelector<SVGPolylineElement>('.case-potential-map polyline')!.setAttribute('points', scenes.map(scene => {
        const point = scene.element.querySelector('circle.potential-dot')!;
        return `${point.getAttribute('cx')},${point.getAttribute('cy')}`;
      }).join(' '));
    }
    syncEdges(); refresh();
  }
  function tick() {
    if (!playing) return;
    if (position >= scenes.length - 1) { showAll(); return; }
    show(position + 1);
    timer = setTimeout(tick, interval);
  }
  function updateVisibility() {
    if (finished || !inView || !disclosure.open || document.hidden) { suspend(); return; }
    if (playing) return;
    playing = true;
    if (position < 0) show(0);
    refresh(); timer = setTimeout(tick, interval);
  }
  all.addEventListener('click', showAll);
  disclosure.addEventListener('toggle', updateVisibility);
  document.addEventListener('visibilitychange', updateVisibility);
  // Scrolling and inspecting nodes never require a manual restart. No scroll-following
  // either: the reader controls the page while the diagram continues to unfold.
  new MutationObserver(syncEdges).observe(root.querySelector('[data-flow-edges]')!, { childList: true });
  refresh(); toolbar.hidden = false;
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    updateVisibility();
  }, { threshold: 0, rootMargin: '-80px 0px -40px 0px' }).observe(root);
});
