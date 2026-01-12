/* ================================
   ACHIEVEMENT SAYFASI ÇİZİMİ
================================ */

document.addEventListener("DOMContentLoaded", () => {

const state = (() => {
  const savingsGoals = JSON.parse(localStorage.getItem("savingsGoals")) || [];

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

  return {
    totalSaved,
    completedGoals,
    totalContributions
  };
})();


const listEl = document.getElementById("achievementList");
	if (!listEl) return;

const unlocked = getUnlockedAchievements();


ACHIEVEMENTS.forEach(a => {
  const isUnlocked = unlocked.includes(a.id);
  
  const progressValue = a.progress ? a.progress(state) : 0;
  const percent = Math.round(progressValue * 100);

  const div = document.createElement("div");

  div.className = `
	achievement-card
	${isUnlocked ? "achievement-unlocked" : "achievement-locked"}
	achievement-${a.level}
  `;

  const levelMap = {
  bronze: "🟤 Bronz",
  silver: "⚪ Gümüş",
  gold: "🟡 Altın"
  };

  div.innerHTML = `
    <h3 style="margin-bottom:4px;">
		${isUnlocked ? "🏆" : "🔒"} ${a.title}
    </h3>

    <p style="margin:4px 0; font-size:14px; color:#6B7280;">
		${a.description}
    </p>
  
    <small>Seviye: ${levelMap[a.level]}</small>

    <div class="progress-container">
		<div class="progress-fill"
           style="
           width:${percent}%;
           background:${isUnlocked ? '#2ED3B7' : '#9CA3AF'};
        ">
		</div>
    </div>

    <small>
		Durum: <strong>${isUnlocked ? "Kazanıldı" : "Kilitli"}</strong>
    </small>
  `;

  listEl.appendChild(div);
});

});