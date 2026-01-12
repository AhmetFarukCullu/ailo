console.log("TRANSACTIONS YÜKLENDİ");

// === SABİT KALEMLER ===
function applyFixedTransactionsForMonth(month) {
  const fixedItems = transactions.filter(t => t.isFixed);

  fixedItems.forEach(fixed => {
    const alreadyExists = transactions.some(t =>
      t.isFixed &&
      t.category === fixed.category &&
      t.type === fixed.type &&
      t.month === month
    );

    if (!alreadyExists) {
      transactions.push({
        id: Date.now() + Math.random(),
        type: fixed.type,
        category: fixed.category,
        amount: fixed.amount,
        month,
        isFixed: true
      });
    }
  });

  localStorage.setItem("ailo_transactions", JSON.stringify(transactions));
}

// === CRUD ===
function addTransaction() {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const month = date.slice(0, 7);

  const amount = Number(document.getElementById("amountInput").value);
  const isFixed = document.getElementById("fixedInput").checked;
  const note = document.getElementById("note").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  if (!amount) return;

  transactions.push({
    id: Date.now(),
    amount,
    note,
    type,
    category,
    date,
    month,
    isFixed
  });

  localStorage.setItem("ailo_transactions", JSON.stringify(transactions));
  render();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem("ailo_transactions", JSON.stringify(transactions));
  render();
}

function openFixedEdit(id) {
  const transaction = transactions.find(t => t.id === id);
  if (!transaction) return;

  const newAmount = prompt("Yeni tutarı girin:", transaction.amount);
  if (newAmount === null) return;

  const parsedAmount = Number(newAmount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) return;

  const removeFixed = confirm("Bu kalem sabit olmaktan çıkarılsın mı?");
  transaction.amount = parsedAmount;
  if (removeFixed) transaction.isFixed = false;

  localStorage.setItem("ailo_transactions", JSON.stringify(transactions));
  render();
}

  function changeMonth(month) {
  selectedMonth = month;
  render();
  }

window.addTransaction = addTransaction;
window.deleteTransaction = deleteTransaction;
window.openFixedEdit = openFixedEdit;
window.applyFixedTransactionsForMonth = applyFixedTransactionsForMonth;
window.changeMonth = changeMonth;
