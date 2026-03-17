(function () {
  const input = document.getElementById('globalSearchInput');
  if (!input) return;

  const groups = Array.from(document.querySelectorAll('[data-search-group]'));
  groups.forEach((group) => {
    if (!group.querySelector('.search-empty')) {
      const empty = document.createElement('div');
      empty.className = 'search-empty';
      empty.textContent = 'No matches yet. Try keywords like email, meetings, redaction, summary, report, or workflow.';
      group.appendChild(empty);
    }
  });

  function visibleItems() {
    return Array.from(document.querySelectorAll('.searchable-item')).filter((item) => !item.classList.contains('search-hidden'));
  }

  function applySearch() {
    const query = input.value.trim().toLowerCase();
    groups.forEach((group) => {
      const items = Array.from(group.querySelectorAll('.searchable-item'));
      let visibleCount = 0;
      items.forEach((item) => {
        const haystack = (item.getAttribute('data-search') || item.textContent || '').toLowerCase();
        const visible = !query || haystack.includes(query);
        item.classList.toggle('search-hidden', !visible);
        if (visible) visibleCount += 1;
      });
      const empty = group.querySelector('.search-empty');
      if (empty) empty.classList.toggle('show', visibleCount === 0);
    });
  }

  function goToBestMatch() {
    const first = visibleItems()[0];
    if (!first) return;
    const link = first.querySelector('a[href]');
    if (link) window.location.href = link.href;
  }

  input.addEventListener('input', applySearch);
  input.addEventListener('search', applySearch);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      applySearch();
      goToBestMatch();
    }
  });
})();
