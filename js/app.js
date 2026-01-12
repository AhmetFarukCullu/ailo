console.log("APP YÜKLENDİ");

// FILTERS
document.getElementById("categoryFilter")?.addEventListener("change", e => {
  selectedCategory = e.target.value;
  render();
});

document.getElementById("monthFilter")?.addEventListener("change", e => {
  selectedMonth = e.target.value;
  applyFixedTransactionsForMonth(selectedMonth);
  render();
});

// GOAL BUTTON
document.getElementById("addGoalBtn")?.addEventListener("click", () => {
  const name = document.getElementById("goalName").value.trim();
  const amount = Number(document.getElementById("goalAmount").value);
  if (!name || amount <= 0) return;
  addGoal(name, amount);
});

// CONTRIBUTION
document.getElementById("addContributionBtn")?.addEventListener("click", () => {
  const goalId = Number(document.getElementById("goalSelect").value);
  const amount = Number(document.getElementById("contributionAmount").value);
  if (!goalId || amount <= 0) return;
  addContribution(goalId, amount);
});

let currentView = "home";

// INITIAL
applyFixedTransactionsForMonth(selectedMonth);
render();
