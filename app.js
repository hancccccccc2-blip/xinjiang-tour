/* ==========================================================================
   新疆 10 人行自驾看板 - 交互脚本 (app.js)
   功能：预算自动计算、路线 Tab 切换、天数折叠、备忘清单状态本地保存
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化预算计算器
  initCalculator();

  // 2. 初始化清单状态（本地存储）
  initChecklist();
});

/**
 * 预算计算器逻辑
 */
function initCalculator() {
  const daysInput = document.getElementById('calc-days');
  const carComboSelect = document.getElementById('car-combo');
  const hotelPriceInput = document.getElementById('hotel-price');
  const roomCountInput = document.getElementById('room-count');

  const resCarTotal = document.getElementById('res-car-total');
  const resHotelTotal = document.getElementById('res-hotel-total');
  const resGrandTotal = document.getElementById('res-grand-total');
  const resPerPerson = document.getElementById('res-per-person');

  // 确保页面上存在这些元素才绑定事件，防止移动版克隆报错
  if (!daysInput || !carComboSelect || !hotelPriceInput || !roomCountInput) return;

  function calculate() {
    const days = parseInt(daysInput.value) || 0;
    const carDailyPrice = parseInt(carComboSelect.value) || 0;
    const hotelPrice = parseInt(hotelPriceInput.value) || 0;
    const roomCount = parseInt(roomCountInput.value) || 0;

    // 计算车辆总租金
    const carTotal = days * carDailyPrice;
    
    // 计算住宿总预算 (10天行程实际在新疆住 10 晚)
    const hotelTotal = 10 * roomCount * hotelPrice;

    // 总计
    const grandTotal = carTotal + hotelTotal;

    // 人均 (10人)
    const perPerson = Math.round(grandTotal / 10);

    // 渲染结果
    if (resCarTotal) resCarTotal.textContent = `¥${carTotal}`;
    if (resHotelTotal) resHotelTotal.textContent = `¥${hotelTotal}`;
    if (resGrandTotal) resGrandTotal.textContent = `¥${grandTotal}`;
    if (resPerPerson) resPerPerson.textContent = `¥${perPerson}`;
  }

  // 监听输入事件
  [daysInput, carComboSelect, hotelPriceInput, roomCountInput].forEach(el => {
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });

  // 初始计算一次
  calculate();
}

/**
 * 路线 Tab 切换
 * @param {number} routeId 路线编号 1, 2, 3
 */
function switchRoute(routeId) {
  // 切换 Tab 高亮状态
  const tabs = document.querySelectorAll('.route-tab');
  tabs.forEach((tab, index) => {
    if (index === (routeId - 1)) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // 切换内容区域显示
  const contents = document.querySelectorAll('.route-content');
  contents.forEach((content, index) => {
    if (index === (routeId - 1)) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

/**
 * 展开/折叠天数卡片
 * @param {HTMLElement} headerHeader 点击的头部元素
 */
function toggleDay(header) {
  const card = header.parentElement;
  card.classList.toggle('expanded');
}

/**
 * 备忘清单的 LocalStorage 持久化
 */
function initChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');

  checkboxes.forEach(checkbox => {
    const id = checkbox.id;
    // 从 localStorage 读取状态并应用
    const savedState = localStorage.getItem(`xj_tour_chk_${id}`);
    if (savedState === 'true') {
      checkbox.checked = true;
      checkbox.parentElement.classList.add('checked');
    }

    // 监听状态改变并保存
    checkbox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      localStorage.setItem(`xj_tour_chk_${id}`, isChecked);
      
      if (isChecked) {
        checkbox.parentElement.classList.add('checked');
      } else {
        checkbox.parentElement.classList.remove('checked');
      }
    });
  });
}
