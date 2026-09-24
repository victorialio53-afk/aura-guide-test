const CONFIG = {
  registerUrl: "https://forms.yandex.ru/cloud/6aa4274e90fa7b6d13660f66",

  auri3dUrl: "https://victorialio53-afk.github.io/aura-3d-viewer/"
};



document.addEventListener("DOMContentLoaded", () => {

  /* ========================= */
  /* ТЕКУЩИЙ ГОД */
  /* ========================= */

  const yearNode =
    document.getElementById("currentYear");

  if (yearNode) {
    yearNode.textContent =
      new Date().getFullYear();
  }



  /* ========================= */
  /* ССЫЛКА НА РЕГИСТРАЦИЮ */
  /* ========================= */

  const registerLinks =
    document.querySelectorAll(
      "[data-register-link]"
    );

  registerLinks.forEach((link) => {
    link.href = CONFIG.registerUrl;
  });



  /* ========================= */
  /* ССЫЛКА НА 3D AURI */
  /* ========================= */

  const auri3dLinks =
    document.querySelectorAll(
      "[data-auri-3d-link]"
    );

  auri3dLinks.forEach((link) => {
    link.href = CONFIG.auri3dUrl;
  });



  /* ========================= */
  /* РЕПЛИКИ AURI */
  /* ========================= */

  const auriMessage =
    document.querySelector(
      ".assistant-message"
    );


  const auriMessages = [

    "Привет, пользователь. Я помогу тебе пройти путь AURA.",

    "Регистрация уже открыта. Сейчас твоя главная задача — зарегистрироваться на форум.",

    "После регистрации система переведёт тебя к этапу формирования команды.",

    "Задания и расписание появятся здесь, когда система откроет доступ.",

    "Если хочешь рассмотреть меня поближе — открой мою 3D-модель.",

    "Следи за системой. Новые данные будут появляться здесь постепенно."

  ];


  let currentMessageIndex = 0;


  if (auriMessage) {

    auriMessage.style.transition =
      "opacity 0.25s ease";


    function showNextAuriMessage() {

      /* сначала плавно скрываем текст */

      auriMessage.style.opacity = "0";


      setTimeout(() => {

        /* имитация печати */

        auriMessage.textContent = "● ● ●";

        auriMessage.style.opacity = "1";


        setTimeout(() => {

          auriMessage.style.opacity = "0";


          setTimeout(() => {

            currentMessageIndex =
              (
                currentMessageIndex + 1
              ) % auriMessages.length;


            auriMessage.textContent =
              auriMessages[
                currentMessageIndex
              ];


            auriMessage.style.opacity =
              "1";

          }, 220);

        }, 750);

      }, 250);

    }


    /* новая реплика каждые 6.5 секунд */

    setInterval(
      showNextAuriMessage,
      6500
    );

  }



  /* ========================= */
  /* ЧЕК-ЛИСТ */
  /* ========================= */

  const checklistKey =
    "aura-checklist-progress";


  const items =
    Array.from(
      document.querySelectorAll(
        ".check-item"
      )
    );


  const counter =
    document.getElementById(
      "checkCounter"
    );


  let saved = [];


  try {

    saved =
      JSON.parse(
        localStorage.getItem(
          checklistKey
        )
      ) || [];

  } catch (error) {

    saved = [];

  }



  function updateChecklist() {

    let doneCount = 0;


    items.forEach(
      (item, index) => {

        const isDone =
          Boolean(
            saved[index]
          );


        item.classList.toggle(
          "is-done",
          isDone
        );


        if (isDone) {
          doneCount += 1;
        }

      }
    );


    if (counter) {

      counter.textContent =
        `${doneCount} / ${items.length}`;

    }

  }



  items.forEach(
    (item, index) => {

      item.addEventListener(
        "click",
        () => {

          saved[index] =
            !saved[index];


          localStorage.setItem(
            checklistKey,
            JSON.stringify(saved)
          );


          updateChecklist();

        }
      );

    }
  );


  updateChecklist();



  /* ========================= */
  /* SYSTEM LOG */
  /* ========================= */

  console.log(
    "AURA.SYSTEM / AURI ONLINE"
  );

});
