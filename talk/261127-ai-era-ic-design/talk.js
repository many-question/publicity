/* =====================================================================
   talk.js — 《AI 时代的模拟 IC 设计：现状、愿景与应对》专用交互
   1. 防止点击外部 Demo 链接触发翻页
   2. 2.4 ↔ 2.5 形态蓝图无滚动淡入切换
   ===================================================================== */
(() => {
'use strict';

// 防止点击页面内外部 Demo 链接时触发翻页事件
document.addEventListener('click', e => {
  if (e.target.closest('a.demo-link, a.link-card')) {
    e.stopPropagation();
  }
}, true);

// s3-1（未来蓝图）↔ s3-2（课题组相关工作）无滚动直接淡入切换
function hookBlueprintMorph() {
  if (!window.DECK || !window.DECK.deck || !window.DECK.deck.scenes.length) {
    return setTimeout(hookBlueprintMorph, 60);
  }
  const { deck } = window.DECK;
  const origGoScene = deck.goScene.bind(deck);
  deck.goScene = function(i, toEnd) {
    const cur = deck.current();
    const target = deck.scenes[i];
    if (cur && target && (
      (cur.id === 's3-1' && target.id === 's3-2') ||
      (cur.id === 's3-2' && target.id === 's3-1')
    )) {
      if (deck.anim) { cancelAnimationFrame(deck.anim); deck.anim = 0; }
      deck.targetY = null;
      target.el.classList.add('seen');
      window.scrollTo(0, deck.top(target));
      if (toEnd) deck.setStep(target, target.maxStep);
      target.stage.classList.remove('morph-in');
      void target.stage.offsetWidth;
      target.stage.classList.add('morph-in');
      deck.frame();
      return;
    }
    return origGoScene(i, toEnd);
  };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(hookBlueprintMorph, 30));
else setTimeout(hookBlueprintMorph, 30);


})();
