const CONFIG = {
  registerUrl: "https://forms.yandex.ru/cloud/6aa4274e90fa7b6d13660f66",
  // сюда вставь свою ссылку на отдельный 3D AURI, если нужно
  // пример: "https://victorialio53-afk.github.io/your-3d-page/"
  auri3dUrl: "#"
};

document.addEventListener("DOMContentLoaded", () => {
  // текущий год
  const yearNode = document.getElementById("currentYear");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  // регистрация
  const registerLinks = document.querySelectorAll("[data-register-link]");
  registerLinks.forEach((link) => {
    link.href = CONFIG.registerUrl;
  });

  // 3D AURI
  const auri3dLinks = document.querySelectorAll("[data-auri-3d-link]");
  auri3dLinks.forEach((link) => {
    link.href = CONFIG.auri3dUrl;
  });

  // чек-лист
  const checklistKey = "aura-checklist-progress";
  const items = Array.from(document.querySelectorAll(".check-item"));
  const counter = document.getElementById("checkCounter");

  let saved = [];

  try {
    saved = JSON.parse(localStorage.getItem(checklistKey)) || [];
  } catch (error) {
    saved = [];
  }

  function updateChecklist() {
    let doneCount = 0;

    items.forEach((item, index) => {
      const isDone = Boolean(saved[index]);

      item.classList.toggle("is-done", isDone);

      if (isDone) {
        doneCount += 1;
      }
    });

    if (counter) {
      counter.textContent = `${doneCount} / ${items.length}`;
    }
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      saved[index] = !saved[index];
      localStorage.setItem(checklistKey, JSON.stringify(saved));
      updateChecklist();
    });
  });

  updateChecklist();
});
