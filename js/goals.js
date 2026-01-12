console.log("GOALS YÜKLENDİ");

// Hedef ekleme
function addGoal(name, amount) {
  savingsGoals.push({
    id: Date.now(),
    name,
    targetAmount: amount,
    contributions: [],
    completed: false
  });

  localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));
  render();
}

// Katkı ekleme
function addContribution(goalId, amount) {
  const goal = savingsGoals.find(g => g.id === goalId);
  if (!goal) return;

  goal.contributions.push({
    id: Date.now(),
    amount,
    month: selectedMonth
  });

  localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));
  render();
}

document.addEventListener("click", (e) => {
// Katkı silme
	if (e.target.classList.contains("delete-contribution-btn")) {
    const goalId = Number(e.target.dataset.goal);
    const contribId = Number(e.target.dataset.id);

    const goal = savingsGoals.find(g => g.id === goalId);
    if (!goal) return;

    goal.contributions = goal.contributions.filter(c => c.id !== contribId);

    localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));
    render();
	}
// Hedef silme
  if (e.target.classList.contains("delete-goal-btn")) {
    const goalId = Number(e.target.dataset.id);

    savingsGoals = savingsGoals.filter(g => g.id !== goalId);

    localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));
    render();
  }

});

window.addGoal = addGoal;
window.addContribution = addContribution;
