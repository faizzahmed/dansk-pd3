/**
 * DANSK PD3 KNOWLEDGE HUB - Shared App Utilities
 */

// Universal Copy to Clipboard handler
function copySnippet(btn) {
  const card = btn.closest('.template-box-card');
  if (!card) return;
  const snippet = card.querySelector('.template-snippet');
  if (!snippet) return;

  const textToCopy = snippet.innerText || snippet.textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '✓ Kopieret!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Kunne ikke kopiere tekst: ', err);
  });
}

// Ensure active tab corresponds to the current page URL
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const tabLinks = document.querySelectorAll('.exam-section-bar .tab-btn');
  
  tabLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Smooth scroll offset for sticky guide sub-nav links
  document.querySelectorAll('.guide-nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
