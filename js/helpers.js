console.log("HELPERS YÜKLENDİ");

  function formatCurrency(amount = 0) {
	return Number(amount).toLocaleString("tr-TR", {
		style: "currency",
		currency: "TRY",
		minimumFractionDigits: 2
	});
  }
  
  window.formatCurrency = formatCurrency;