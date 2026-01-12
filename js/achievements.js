/* ================================
   ACHIEVEMENT SİSTEMİ (SADECE MANTIK)
   DOM YOK, SADECE VERİ
================================ */

const ACHIEVEMENTS = [
  {
    id: "first_contribution",
    title: "İlk Adım 👣",
    description: "Bir tasarruf hedefine ilk kez katkı yaptın.",
	level: "bronze",
    condition: (state) => state.totalContributions > 0,
	progress: (state) => state.totalContributions > 0 ? 1 : 0
  },
  {
    id: "saved_1000",
    title: "Binlik Kulüp 💰",
    description: "Toplam 1.000 ₺ tasarruf ettin.",
	level: "silver",
    condition: (state) => state.totalSaved >= 1000,
	progress: (state) => Math.min(state.totalSaved / 1000, 1)
  },
  {
    id: "goal_completed",
    title: "Hedef Avcısı 🎯",
    description: "Bir tasarruf hedefini tamamladın.",
	level: "gold",
    condition: (state) => state.completedGoals > 0,
	progress: (state) => state.completedGoals > 0 ? 1 : 0
  }
];

/* === KAZANILAN ACHIEVEMENT'LARI AL === */
function getUnlockedAchievements() {
  try {
    return JSON.parse(localStorage.getItem("ailo_achievements")) || [];
  } catch {
    return [];
  }
}

/* === ACHIEVEMENT KAYDET === */
function saveAchievement(id) {
  const unlocked = getUnlockedAchievements();
  if (!unlocked.includes(id)) {
    unlocked.push(id);
    localStorage.setItem("ailo_achievements", JSON.stringify(unlocked));
    return true; // yeni kazanıldı
  }
  return false;
}

/* === ANA KONTROL FONKSİYONU === */
function checkAchievements(state, onUnlock) {
  ACHIEVEMENTS.forEach(a => {
    if (a.condition(state)) {
      const unlockedNow = saveAchievement(a.id);
      if (unlockedNow && typeof onUnlock === "function") {
        onUnlock(a);
      }
    }
  });
}

window.ACHIEVEMENTS = ACHIEVEMENTS;
window.checkAchievements = checkAchievements;
window.getUnlockedAchievements = getUnlockedAchievements;