console.log("UI YÜKLENDİ");

/* =========================
   CATEGORY TIPS (PHASE-3)
========================= */

const categoryTips = {
  Genel: [
    "Harcamaları not ekleyerek kaydetmek farkındalık sağlar.",
    "Düzenli kayıt tutmak ay sonu sürprizlerini azaltır."
  ],

  Market: [
    "Market harcamalarını haftalık takip etmek kontrol sağlar.",
    "Listeyle alışveriş yapmak gereksiz harcamayı azaltır."
  ],

  Kira: [
    "Kira gideri gelirin %30’unu geçmemelidir.",
    "Kira sabit gider olarak işaretlenebilir."
  ],

  Fatura: [
    "Faturalar sabit gider olarak işaretlenirse takip kolaylaşır.",
    "Aylık fatura ortalamasını bilmek bütçe planlamasını güçlendirir."
  ],

  Maaş: [
    "Gelir artışı tasarruf oranını artırmak için fırsattır."
  ],

  Diğer: [
    "Bu kategorideki harcamaları gözden geçirmek faydalı olabilir."
  ]
};

/* =========================
   CATEGORY TIPS LOGIC
========================= */

const categorySelectEl = document.getElementById("category");
const categoryTipsEl = document.getElementById("categoryTips");

if (categorySelectEl && categoryTipsEl) {
  categorySelectEl.addEventListener("change", () => {
    const selectedCategory = categorySelectEl.value;
    const tips = categoryTips[selectedCategory];

    if (!tips || tips.length === 0) {
      categoryTipsEl.innerHTML = `
        <h4>💡 İpucu</h4>
        <p class="text-muted">
          Bu kategori için özel bir öneri yok.
        </p>
      `;
      return;
    }

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    categoryTipsEl.innerHTML = `
      <h4>💡 ${selectedCategory} İpucu</h4>
      <p>${randomTip}</p>
    `;
  });
}

  function render() {
    const categorySelect = document.getElementById("categoryFilter");
	categorySelect.innerHTML = `<option value="all">Tüm Kategoriler</option>`;

	const categories = [...new Set(transactions.map(t => t.category))];

	categories.forEach(cat => {
	const option = document.createElement("option");
	option.value = cat;
	option.innerText = cat;
	categorySelect.appendChild(option);
	});

	categorySelect.value = selectedCategory;
	
	const monthSelect = document.getElementById("monthFilter");
	if (monthSelect) {
	const months = [...new Set(transactions.map(t => t.month).filter(Boolean))];
	monthSelect.innerHTML = "";

	months.forEach(m => {
    const option = document.createElement("option");
    option.value = m;
    option.innerText = m;
    if (m === selectedMonth) option.selected = true;
    monthSelect.appendChild(option);
	});
	}

	
	const list = document.getElementById("list");
    list.innerHTML = "";

    let income = 0;
    let expense = 0;
	const categoryTotals = {};

    transactions
		.filter(t =>
		t.month === selectedMonth &&
		(selectedCategory === "all" || t.category === selectedCategory)
		)
		.forEach((t, index) => {
		  if (t.type === "income") income += t.amount;
		  else expense += t.amount;

		  categoryTotals[t.category] =
		  (categoryTotals[t.category] || 0) + t.amount;

    const div = document.createElement("div");
    div.className = `list-item ${t.type}`;

    const text = document.createElement("span");
    text.innerText =
	`[${t.month}] [${t.category}] ${t.note || "İşlem"} - ${formatCurrency(t.amount)} ${t.isFixed ? "🔒" : ""}`;

    const btn = document.createElement("button");
    btn.innerText = "🗑️";
    btn.onclick = () => deleteTransaction(index);
    btn.style.width = "40px";
    btn.style.background = "transparent";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
	
	if (t.isFixed) {
	const editBtn = document.createElement("button");
	editBtn.innerText = "✏️";
	editBtn.onclick = () => openFixedEdit(t.id);
	editBtn.style.background = "transparent";
	editBtn.style.border = "none";
	editBtn.style.cursor = "pointer";
	div.appendChild(editBtn);
	}

    div.appendChild(text);
    div.appendChild(btn);
    list.appendChild(div);
    });
	

    document.getElementById("income").innerText = formatCurrency(income);
	document.getElementById("expense").innerText = formatCurrency(expense);
	document.getElementById("balance").innerText = formatCurrency(income - expense);
	document.getElementById("summaryTitle").innerText =
		selectedCategory === "all"
		? `Aylık Özet (${selectedMonth})`
		: `Aylık Özet (${selectedMonth} - ${selectedCategory})`;
	
	const categorySummaryEl = document.getElementById("categorySummary");
		categorySummaryEl.innerHTML = "";

		Object.entries(categoryTotals).forEach(([category, total]) => {
	const li = document.createElement("li");
		li.innerText = `${category}: ${formatCurrency(total)}`;
		categorySummaryEl.appendChild(li);
	});
	
	let overallIncome = 0;
	let overallExpense = 0;
	const overallCategoryTotals = {};

	transactions.forEach(t => {
	if (t.type === "income") overallIncome += t.amount;
	else overallExpense += t.amount;

	if (!overallCategoryTotals[t.category]) {
    overallCategoryTotals[t.category] = 0;
	}
	overallCategoryTotals[t.category] += t.amount;
	});
	
	const overallCategorySummaryEl =
	document.getElementById("overallCategorySummary");

	overallCategorySummaryEl.innerHTML = "";

	Object.entries(overallCategoryTotals).forEach(([category, total]) => {
	const li = document.createElement("li");
	li.innerText = `${category}: ${formatCurrency(total)}`;
	overallCategorySummaryEl.appendChild(li);
	});
	
	document.getElementById("overallIncome").innerText =
	formatCurrency(overallIncome);

	document.getElementById("overallExpense").innerText =
	formatCurrency(overallExpense);

	document.getElementById("overallBalance").innerText =
	formatCurrency(overallIncome - overallExpense);
	
	const availableSavings = (income - expense) > 0 ? (income - expense) : 0;
	
	const expenseItems = transactions
	.filter(t => t.type === "expense")
	.sort((a, b) => b.amount - a.amount)
	.slice(0, 10);
	
	const topExpensesEl = document.getElementById("topExpenses");
	topExpensesEl.innerHTML = "";

	expenseItems.forEach(item => {
	const li = document.createElement("li");
	li.innerText = `${item.category} — ${formatCurrency(item.amount)}(${item.month})`;

	topExpensesEl.appendChild(li);
	});
	
	// === TASARRUF HEDEFLERİ ÇİZİMİ ===
  const goalsListEl = document.getElementById("goalsList");
  goalsListEl.innerHTML = "";

savingsGoals.forEach(goal => {
  const li = document.createElement("li");
  li.classList.add("card"); // ← BU SATIR KRİTİK

  if (!Array.isArray(goal.contributions)) {
  goal.contributions = [];
  }

  const totalSaved = goal.contributions.reduce(
  (sum, c) => sum + c.amount,
  0
  );

  const progress = Math.min(
  totalSaved / goal.targetAmount,
  1
  );
  
  const percent = Math.round(progress * 100);
  const displayPercent = percent === 0 ? 0 : percent;

  if (progress === 1 && !goal.completed) {
    goal.completed = true;
    localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));
    alert(`🎉 Tebrikler! "${goal.name}" hedefini tamamladın!`);
  }

	li.innerHTML = `
	 <strong>${goal.name}</strong>

	 <div class="text-muted">
		Hedef: ${formatCurrency(goal.targetAmount)}<br>
		Biriken: ${formatCurrency(totalSaved)}<br>
		İlerleme: %${displayPercent}
	 </div>

	 <div class="progress-container">
		<div class="progress-fill"
         style="width:${Math.max(percent, 1)}%">
     </div>
	</div>

	<ul>
     ${goal.contributions.map(c => `
      <li>
        ${formatCurrency(c.amount)} (${c.month})
        <button data-goal="${goal.id}" data-id="${c.id}" class="delete-contribution-btn">🗑️</button>
      </li>
     `).join("")}
	</ul>

	<button data-id="${goal.id}" class="delete-goal-btn">Sil</button>
	`;


  goalsListEl.appendChild(li);
});
	
	
	// === SABİT KALEMLER LİSTESİ ===
	const fixedListEl = document.getElementById("fixedList");
	fixedListEl.innerHTML = "";

	transactions
	.filter(t => t.isFixed)
	.forEach(t => {
    const li = document.createElement("li");
    li.innerText = `[${t.category}] ${t.note || "Sabit İşlem"} - ${formatCurrency(t.amount)}`;
    fixedListEl.appendChild(li);
	});


	/* =========================
	ACHIEVEMENT STATE OLUŞTUR
	========================= */

	const totalSaved = savingsGoals.reduce((sum, g) => {
	  const goalSum = g.contributions
      ? g.contributions.reduce((s, c) => s + c.amount, 0)
      : 0;
      return sum + goalSum;
	}, 0);

	const completedGoals = savingsGoals.filter(g => g.completed).length;

	const totalContributions = savingsGoals.reduce((sum, g) => {
	return sum + (g.contributions ? g.contributions.length : 0);
	}, 0);
	
	
	function renderGoalSelect() {
	const select = document.getElementById("goalSelect");
	if (!select) return;

	select.innerHTML = "";

	if (savingsGoals.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.innerText = "Önce hedef ekleyin";
    select.appendChild(option);
    select.disabled = true;
    return;
	}

	select.disabled = false;

	  savingsGoals.forEach(goal => {
    if (goal.completed) return; // tamamlanan hedefe katkı eklenmesin

    const option = document.createElement("option");
    option.value = goal.id;
    option.innerText = goal.name;
    select.appendChild(option);
	});
	}

	checkAchievements({
	totalSaved,
	completedGoals,
	totalContributions
	});

renderGoalSelect();
  }
 
 /* =========================
   BOTTOM NAV ACTIVE STATE
========================= */
 
/* =========================
   BOTTOM NAV ROUTING (v1.2-PHASE-1.1)
========================= */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      const targetView = item.dataset.target;
      if (!targetView) return;

      setView(targetView);

      // aktif nav görünümü
      document
        .querySelectorAll(".nav-item")
        .forEach(i => i.classList.remove("active"));

      item.classList.add("active");
    });
  });
});


/* =========================
   SIDE DRAWER TOGGLE
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const drawer = document.querySelector(".side-drawer");
  const openBtn = document.getElementById("openDrawerBtn");
  const overlay = document.querySelector(".drawer-overlay");

  if (!drawer || !openBtn || !overlay) return;

  function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.classList.add("drawer-open");
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.classList.remove("drawer-open");
  }

  function toggleDrawer() {
    const isOpen = drawer.classList.contains("open");
    isOpen ? closeDrawer() : openDrawer();
  }

  openBtn.addEventListener("click", toggleDrawer);
  overlay.addEventListener("click", closeDrawer);

  // ESC ile kapatma
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
});

/* =========================
   FAZ-3 / ADIM-1
   LOADER CONTROL
========================= */

function hideAppLoader() {
  const loader = document.getElementById("app-loader");
  if (!loader) return;

  loader.setAttribute("aria-hidden", "true");
}

window.addEventListener("load", () => {
  // küçük bir gecikme: algısal kalite
  setTimeout(hideAppLoader, 600);
});

/* =========================
   THEME TOGGLE
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");

  // 1. Sayfa açılırken
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  if (!toggleBtn) return;

  // 2. Tıklama
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });
});

/* =========================
   VIEW RENDERING (v1.2-PHASE-1.1)
========================= */

function renderView(viewName) {
  const views = document.querySelectorAll(".view");

  views.forEach(view => {
    const isActive = view.dataset.view === viewName;
    view.classList.toggle("active", isActive);
  });
}

function setView(viewName) {
  if (window.currentView === viewName) return;

  window.currentView = viewName;
  localStorage.setItem("currentView", viewName);
  renderView(viewName);
}

window.setView = setView;

document.addEventListener("DOMContentLoaded", () => {
  const savedView = localStorage.getItem("currentView") || "home";
  window.currentView = savedView;
  renderView(savedView);

  // bottom nav aktifliği
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle(
      "active",
      item.dataset.target === savedView
    );
  });
});

window.render = render;