/* ==========================================================================
   西行漫记 · 亲子研学自驾指南 - 交互脚本 (app.js)
   功能：左侧导航与幻灯片联动、翻页逻辑、图片动态背景更新
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log("西行漫记 3.0 研学自驾指南已加载！");
  
  // 初始化默认显示第一天
  const firstMenuItem = document.querySelector('.sidebar-menu .menu-item');
  if (firstMenuItem) {
    showSlide(1, firstMenuItem);
  }
});

/**
 * 幻灯片翻页与底图联动
 * @param {number} slideId 天数ID 1-12
 * @param {HTMLElement} menuItem 左侧对应的菜单元素
 */
function showSlide(slideId, menuItem) {
  // 1. 隐藏所有幻灯片内容
  document.querySelectorAll('.slide-content').forEach(slide => {
    slide.style.display = 'none';
  });

  // 2. 显示当前幻灯片
  const currentSlide = document.getElementById(`slide-${slideId}`);
  if (currentSlide) {
    currentSlide.style.display = 'grid';
  }
  
  // 3. 更新左侧菜单栏的高亮状态
  document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
    item.classList.remove('active');
  });
  if (menuItem) {
    menuItem.classList.add('active');
  }

  // 4. 联动大背景图的淡入淡出切换
  const stageBg = document.getElementById('stage-bg');
  const imgMap = {
    1: 'images/kashgar.jpg',
    2: 'images/kashgar.jpg',
    3: 'images/aksu.jpg',
    4: 'images/wensu.jpg',
    5: 'images/yining.jpg',
    6: 'images/bayanbulak.jpg',
    7: 'images/nalati.jpg',
    8: 'images/zhaosu.jpg',
    9: 'images/yining.jpg',
    10: 'images/sayram.jpg',
    11: 'images/wensu.jpg',
    12: 'images/yining.jpg'
  };
  
  if (stageBg && imgMap[slideId]) {
    // 渐变淡入切换图片
    stageBg.style.opacity = '0.3';
    setTimeout(() => {
      stageBg.style.backgroundImage = `url('${imgMap[slideId]}')`;
      stageBg.style.opacity = '1';
    }, 200);
  }
}
