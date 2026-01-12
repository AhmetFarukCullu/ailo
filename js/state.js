console.log("STATE YÜKLENDİ");

window.selectedMonth = new Date().toISOString().slice(0, 7);
window.selectedCategory = "all";

window.transactions =
  JSON.parse(localStorage.getItem("ailo_transactions")) || [];

window.savingsGoals =
  JSON.parse(localStorage.getItem("savingsGoals")) || [];

// ==============================
// VIEW STATE (PHASE-1.1)
// ==============================

window.currentView = "home";