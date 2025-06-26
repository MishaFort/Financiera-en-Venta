function matchParagraphHeights() {
  if (window.innerWidth >= 768) return;

  const top = document.querySelector('.quienes-section__text-top');
  const bottom = document.querySelector('.quienes-section__text-bottom');

  if (!top || !bottom) return;

  top.style.minHeight = '';
  bottom.style.minHeight = '';

  const topHeight = top.scrollHeight;
  const bottomHeight = bottom.scrollHeight;

  const maxHeight = Math.max(topHeight, bottomHeight);

  top.style.minHeight = maxHeight + 'px';
  bottom.style.minHeight = maxHeight + 'px';
}

window.addEventListener('load', matchParagraphHeights);
window.addEventListener('resize', matchParagraphHeights);
