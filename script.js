// ==============================
// AILO - HELPER FUNCTIONS
// ==============================

//console.log("JS YÜKLENDİ");


//  function formatCurrency(amount) {
//	return amount.toLocaleString("tr-TR", {
//		style: "currency",
//		currency: "TRY",
//		minimumFractionDigits: 2
//	});
//  }
  
// ==============================
// GLOBAL STATE & STORAGE
// ==============================  
  
// ==============================
// FIXED TRANSACTIONS (AUTO APPLY)
// ==============================  
  
//  function applyFixedTransactionsForMonth(month) {
//  const fixedItems = transactions.filter(t => t.isFixed);

//  fixedItems.forEach(fixed => {
//    const alreadyExists = transactions.some(t =>
//      t.isFixed &&
//      t.category === fixed.category &&
//      t.type === fixed.type &&
//      t.month === month
//    );

//    if (!alreadyExists) {
//      transactions.push({
//        id: Date.now() + Math.random(),
//        type: fixed.type,
//        category: fixed.category,
//        amount: fixed.amount,
//        month: month,
//        isFixed: true
//      });
//    }
//  });

//  localStorage.setItem("ailo_transactions", JSON.stringify(transactions));
  
//  }

  
//  let selectedMonth = new Date().toISOString().slice(0, 7);
  
//  let selectedCategory = "all";
  
//  let transactions = JSON.parse(localStorage.getItem("ailo_transactions")) || [];
  
//  let savingsGoals = JSON.parse(localStorage.getItem("savingsGoals")) || [];
  

// ==============================
// TRANSACTION CRUD
// ==============================

//  function addTransaction() {
//    const now = new Date();
//	const date = now.toISOString().split("T")[0]; // 2025-01-14
//	const month = date.slice(0, 7); // 2025-01
	
//	const amount = Number(document.getElementById("amountInput").value);
//	const isFixed = document.getElementById("fixedInput").checked;
//    const note = document.getElementById("note").value;
//    const type = document.getElementById("type").value;
//	const category = document.getElementById("category").value;

//    if (!amount) return;

//    transactions.push({
//	id: Date.now(),
//	amount,
//	note,
//	type,
//	category,
//	date,
//	month,
//	isFixed: isFixed
//	});
	
//    localStorage.setItem("ailo_transactions", JSON.stringify(transactions));

    document.getElementById("amountInput").value = "";
	document.getElementById("fixedInput").checked = false;
    document.getElementById("note").value = "";

//    render();
//  }


// ==============================
// UI RENDER
// ==============================


//  function render() {
//    const categorySelect = document.getElementById("categoryFilter");
//	categorySelect.innerHTML = `<option value="all">Tüm Kategoriler</option>`;

//	const categories = [...new Set(transactions.map(t => t.category))];

//	categories.forEach(cat => {
//	const option = document.createElement("option");
//	option.value = cat;
//	option.innerText = cat;
//	categorySelect.appendChild(option);
//	});

//	categorySelect.value = selectedCategory;
	
//	const monthSelect = document.getElementById("monthFilter");
//	if (monthSelect) {
//	const months = [...new Set(transactions.map(t => t.month).filter(Boolean))];
//	monthSelect.innerHTML = "";

//	months.forEach(m => {
 //   const option = document.createElement("option");
    //option.value = m;
   // option.innerText = m;
  //  if (m === selectedMonth) option.selected = true;
 //   monthSelect.appendChild(option);
//	});
//	}

	
//	const list = document.getElementById("list");
  //  list.innerHTML = "";

 //   let income = 0;
 //   let expense = 0;
//	const categoryTotals = {};

 //   transactions
//		.filter(t =>
//		t.month === selectedMonth &&
//		(selectedCategory === "all" || t.category === selectedCategory)
//		)
//		.forEach((t, index) => {
//		  if (t.type === "income") income += t.amount;
//		  else expense += t.amount;

//		  categoryTotals[t.category] =
	//	  (categoryTotals[t.category] || 0) + t.amount;

//    const div = document.createElement("div");
//    div.className = `list-item ${t.type}`;

//    const text = document.createElement("span");
//    text.innerText =
//	`[${t.month}] [${t.category}] ${t.note || "İşlem"} - ${formatCurrency(t.amount)} ${t.isFixed ? "🔒" : ""}`;

//    const btn = document.createElement("button");
//    btn.innerText = "🗑️";
//    btn.onclick = () => deleteTransaction(index);
//    btn.style.width = "40px";
//    btn.style.background = "transparent";
//    btn.style.border = "none";
//    btn.style.cursor = "pointer";
	
//	if (t.isFixed) {
//	const editBtn = document.createElement("button");
//	editBtn.innerText = "✏️";
//	editBtn.onclick = () => openFixedEdit(t.id);
//	editBtn.style.background = "transparent";
//	editBtn.style.border = "none";
//	editBtn.style.cursor = "pointer";
//	div.appendChild(editBtn);
//	}

//    div.appendChild(text);
//    div.appendChild(btn);
//    list.appendChild(div);
//    });
	

 //   document.getElementById("income").innerText = formatCurrency(income);
//	document.getElementById("expense").innerText = formatCurrency(expense);
//	document.getElementById("balance").innerText = formatCurrency(income - expense);
//	document.getElementById("summaryTitle").innerText =
//		selectedCategory === "all"
//		? `Aylık Özet (${selectedMonth})`
//		: `Aylık Özet (${selectedMonth} - ${selectedCategory})`;
	
//	const categorySummaryEl = document.getElementById("categorySummary");
//		categorySummaryEl.innerHTML = "";

//		Object.entries(categoryTotals).forEach(([category, total]) => {
//	const li = document.createElement("li");
//		li.innerText = `${category}: ${formatCurrency(total)}`;
//		categorySummaryEl.appendChild(li);
//	});
	
//	let overallIncome = 0;
//	let overallExpense = 0;
//	const overallCategoryTotals = {};

//	transactions.forEach(t => {
//	if (t.type === "income") overallIncome += t.amount;
//	else overallExpense += t.amount;

//	if (!overallCategoryTotals[t.category]) {
 //   overallCategoryTotals[t.category] = 0;
//	}
//	overallCategoryTotals[t.category] += t.amount;
//	});
	
//	const overallCategorySummaryEl =
//	document.getElementById("overallCategorySummary");

//	overallCategorySummaryEl.innerHTML = "";

//	Object.entries(overallCategoryTotals).forEach(([category, total]) => {
//	const li = document.createElement("li");
//	li.innerText = `${category}: ${formatCurrency(total)}`;
//	overallCategorySummaryEl.appendChild(li);
//	});
	
//	document.getElementById("overallIncome").innerText =
//	formatCurrency(overallIncome);

//	document.getElementById("overallExpense").innerText =
//	formatCurrency(overallExpense);

//	document.getElementById("overallBalance").innerText =
//	formatCurrency(overallIncome - overallExpense);
	
//	const availableSavings = (income - expense) > 0 ? (income - expense) : 0;
	
//	const expenseItems = transactions
//	.filter(t => t.type === "expense")
//	.sort((a, b) => b.amount - a.amount)
//	.slice(0, 10);
	
//	const topExpensesEl = document.getElementById("topExpenses");
//	topExpensesEl.innerHTML = "";

//	expenseItems.forEach(item => {
//	const li = document.createElement("li");
//	li.innerText = `${item.category} — ${formatCurrency(item.amount)}(${item.month})`;
	//li.innerText = `${t.category} - ${formatCurrency(t.amount)}${t.isFixed ? " 🔒" : ""}`;
//	topExpensesEl.appendChild(li);
//	});
	
	// === TASARRUF HEDEFLERİ ÇİZİMİ ===
  //const goalsListEl = document.getElementById("goalsList");
  //goalsListEl.innerHTML = "";

//savingsGoals.forEach(goal => {
//  const li = document.createElement("li");
//
//  if (!Array.isArray(goal.contributions)) {
//  goal.contributions = [];
//  }
//
//  const totalSaved = goal.contributions.reduce(
//  (sum, c) => sum + c.amount,
//  0
//  );
//
//  const progress = Math.min(
//  totalSaved / goal.targetAmount,
//  1
//  );
//  
//  const percent = Math.round(progress * 100);
//
//  if (progress === 1 && !goal.completed) {
//    goal.completed = true;
//    localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));
//    alert(`🎉 Tebrikler! "${goal.name}" hedefini tamamladın!`);
//  }
//
//  li.innerHTML = `
//    <strong>${goal.name}</strong><br>
//    Hedef: ${formatCurrency(goal.targetAmount)}<br>
//	Biriken: ${formatCurrency(totalSaved)}<br>
//    İlerleme: %${percent}
//
 //   <div class="progress-container">
//	  <div class="progress-fill" style="width:${percent}%"></div>
//	</div>
//	
//	
//	<ul>
//    ${goal.contributions.map(c => `
//      <li>
//        ${formatCurrency(c.amount)} (${c.month})
//        <button data-goal="${goal.id}" data-id="${c.id}" class="delete-contribution-btn">🗑️</button>
   //   </li>
   // `).join("")}
 //   </ul>
//	
//
//    <button data-id="${goal.id}" class="delete-goal-btn">Sil</button>
//  `;
//
//  goalsListEl.appendChild(li);
//});
	
	
	// === SABİT KALEMLER LİSTESİ ===
//	const fixedListEl = document.getElementById("fixedList");
//	fixedListEl.innerHTML = "";
//
//	transactions
//	.filter(t => t.isFixed)
//	.forEach(t => {
//    const li = document.createElement("li");
//    li.innerText = `[${t.category}] ${t.note || "Sabit İşlem"} - ${formatCurrency(t.amount)}`;
  //  fixedListEl.appendChild(li);
//	});


	/* =========================
	ACHIEVEMENT STATE OLUŞTUR
	========================= */
//
//	const totalSaved = savingsGoals.reduce((sum, g) => {
//	return sum + (g.savedAmount || 0);
//	}, 0);
//
//	const completedGoals = savingsGoals.filter(g => g.completed).length;
//
//	const totalContributions = savingsGoals.reduce((sum, g) => {
//	return sum + (g.contributions ? g.contributions.length : 0);
//	}, 0);
//
//	checkAchievements({
//	totalSaved,
//	completedGoals,
//	totalContributions
//	});
//
 // }
  
//    document.addEventListener("click", (e) => {

  // === KATKI SİLME ===
//  if (e.target.classList.contains("delete-contribution-btn")) {
//    const goalId = Number(e.target.dataset.goal);
//    const contribId = Number(e.target.dataset.id);

//    const goal = savingsGoals.find(g => g.id === goalId);
//    if (!goal) return;

//    goal.contributions = goal.contributions.filter(c => c.id !== contribId);

//    localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));
//    render();
//  }

  // === HEDEF SİLME ===
//  if (e.target.classList.contains("delete-goal-btn")) {
//    const goalId = Number(e.target.dataset.id);

//    savingsGoals = savingsGoals.filter(g => g.id !== goalId);

//    localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));
//    render();
//  }

//});
  
//  applyFixedTransactionsForMonth(selectedMonth);
  
//  function openFixedEdit(id) {
//  const transaction = transactions.find(t => t.id === id);
//  if (!transaction) return;

//  const newAmount = prompt(
//    "Yeni tutarı girin:",
//    transaction.amount
//  );

//  if (newAmount === null) return;

//  const parsedAmount = Number(newAmount);
//  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    alert("Geçerli bir tutar girin.");
//    return;
//  }

//  const removeFixed = confirm(
//    "Bu kalem sabit olmaktan çıkarılsın mı?\n(Evet = sabitliği kaldırır)"
//  );

//  transaction.amount = parsedAmount;

//  if (removeFixed) {
//    transaction.isFixed = false;
//  }

  localStorage.setItem("ailo_transactions", JSON.stringify(transactions));
  render();
  }
  //Hata oluşursa bu silinecek//

  render();
  
//  function deleteTransaction(index) {
//  transactions.splice(index, 1);
//  localStorage.setItem("ailo_transactions", JSON.stringify(transactions));
//  render();
//  }

//  function changeMonth(month) {
//  selectedMonth = month;
//  render();
//  }


// ==============================
// EVENT LISTENERS
// ==============================


//	document.getElementById("categoryFilter").addEventListener("change", e => {
//  selectedCategory = e.target.value;
//  render();
  
  // İleride: sabit kalemleri düzenleme / güncelleme burada yapılacak
  
//});

//	document.getElementById("monthFilter").addEventListener("change", (e) => {
//	selectedMonth = e.target.value;
//	applyFixedTransactionsForMonth(selectedMonth);
//	render();
//	});
  
//  document.getElementById("addGoalBtn").addEventListener("click", () => {
//  const name = document.getElementById("goalName").value.trim();
//  const amount = Number(document.getElementById("goalAmount").value);

//  if (!name || amount <= 0) {
//    alert("Geçerli bir hedef adı ve tutar girin.");
//    return;
//  }

//  savingsGoals.push({
//  id: Date.now(),
//  name,
//  targetAmount: amount,
//  contributions: [],
//  completed: false
//  });

//  localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));

  document.getElementById("goalName").value = "";
  document.getElementById("goalAmount").value = "";
  
  


  localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));

  document.getElementById("contributionAmount").value = "";

//  render();
//  });

  


// ==============================
// INITIAL LOAD
// ==============================


	const goalSelect = document.getElementById("goalSelect");
	if (goalSelect) {
	goalSelect.innerHTML = "";

	savingsGoals.forEach(goal => {
    const option = document.createElement("option");
    option.value = goal.id;
    option.innerText = goal.name;
    goalSelect.appendChild(option);
	});
}


//  document.getElementById("addContributionBtn").addEventListener("click", () => {
//  const goalId = Number(document.getElementById("goalSelect").value);
//  const amount = Number(document.getElementById("contributionAmount").value);

//  if (!goalId || amount <= 0) {
//    alert("Geçerli bir hedef ve tutar girin.");
//    return;
//  }

//  const goal = savingsGoals.find(g => g.id === goalId);
//  if (!goal) return;

//  goal.contributions.push({
//    id: Date.now(),
//    amount,
//    month: selectedMonth
//  });

// 🔴 BU SATIR EKSİKTİ
//  localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));

  document.getElementById("contributionAmount").value = "";


//  render();
  
//  });
