/* ================================================== */
/* AURI MESSAGES */
/* ================================================== */

const messageElement =
    document.getElementById("auri-message");


const typingIndicator =
    document.getElementById("typing-indicator");



const auriMessages = [

    "Привет, пользователь. Я помогу тебе пройти путь AURA.",

    "Регистрация уже открыта. Сейчас твоя главная задача — подключиться к форуму.",

    "После регистрации система переведёт тебя к этапу формирования команды.",

    "Задания и расписание появятся здесь, когда система откроет доступ.",

    "Ты можешь открыть мою 3D-модель и рассмотреть меня поближе."

];


let currentMessageIndex = 0;



function showNextAuriMessage() {

    if (
        !messageElement ||
        !typingIndicator
    ) {
        return;
    }


    messageElement.classList.add(
        "message-hidden"
    );


    setTimeout(() => {

        messageElement.style.display =
            "none";


        typingIndicator.classList.add(
            "active"
        );


        setTimeout(() => {

            typingIndicator.classList.remove(
                "active"
            );


            currentMessageIndex =
                (
                    currentMessageIndex + 1
                )
                %
                auriMessages.length;


            messageElement.textContent =
                auriMessages[
                    currentMessageIndex
                ];


            messageElement.style.display =
                "block";


            requestAnimationFrame(() => {

                messageElement.classList.remove(
                    "message-hidden"
                );

            });


        }, 900);


    }, 220);

}



/* новая реплика примерно раз в 6.5 секунд */

setInterval(
    showNextAuriMessage,
    6500
);



/* ================================================== */
/* SCREENS */
/* ================================================== */

const mainScreen =
    document.getElementById(
        "main-screen"
    );


const checklistScreen =
    document.getElementById(
        "checklist-screen"
    );


const openChecklistButton =
    document.getElementById(
        "open-checklist"
    );


const backFromChecklistButton =
    document.getElementById(
        "back-from-checklist"
    );



function showScreen(screen) {

    if (
        !mainScreen ||
        !checklistScreen ||
        !screen
    ) {
        return;
    }


    mainScreen.classList.remove(
        "active-screen"
    );


    checklistScreen.classList.remove(
        "active-screen"
    );


    screen.classList.add(
        "active-screen"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



if (openChecklistButton) {

    openChecklistButton.addEventListener(
        "click",
        () => {

            showScreen(
                checklistScreen
            );

        }
    );

}



if (backFromChecklistButton) {

    backFromChecklistButton.addEventListener(
        "click",
        () => {

            showScreen(
                mainScreen
            );

        }
    );

}



/* ================================================== */
/* CHECKLIST */
/* ================================================== */

const checklistStorageKey =
    "aura-checklist-progress-v1";


const checklistItems =
    Array.from(
        document.querySelectorAll(
            ".checklist-item"
        )
    );


const checklistProgressNumber =
    document.getElementById(
        "checklist-progress-number"
    );


const checklistModuleProgress =
    document.getElementById(
        "checklist-module-progress"
    );


const checklistProgressBar =
    document.getElementById(
        "checklist-progress-bar"
    );


const checklistComplete =
    document.getElementById(
        "checklist-complete"
    );



let checklistState = {};



/* ========================= */
/* LOAD */
/* ========================= */

try {

    const storedChecklist =
        localStorage.getItem(
            checklistStorageKey
        );


    if (storedChecklist) {

        checklistState =
            JSON.parse(
                storedChecklist
            );

    }

}
catch (error) {

    checklistState = {};

}



/* ========================= */
/* SAVE */
/* ========================= */

function saveChecklist() {

    try {

        localStorage.setItem(
            checklistStorageKey,
            JSON.stringify(
                checklistState
            )
        );

    }
    catch (error) {

        console.log(
            "AURA.SYSTEM / CHECKLIST SAVE ERROR"
        );

    }

}



/* ========================= */
/* UPDATE */
/* ========================= */

function updateChecklist() {

    let completedCount = 0;


    checklistItems.forEach(
        (item) => {

            const checkId =
                item.dataset.checkId;


            const completed =
                Boolean(
                    checklistState[
                        checkId
                    ]
                );


            item.classList.toggle(
                "completed",
                completed
            );


            item.setAttribute(
                "aria-pressed",
                completed
                    ? "true"
                    : "false"
            );


            if (completed) {
                completedCount++;
            }

        }
    );


    const totalCount =
        checklistItems.length;


    const progressText =
        `${completedCount} / ${totalCount}`;


    if (checklistProgressNumber) {

        checklistProgressNumber.textContent =
            progressText;

    }


    if (checklistModuleProgress) {

        checklistModuleProgress.textContent =
            progressText;

    }


    if (checklistProgressBar) {

        const percentage =
            totalCount === 0
                ? 0
                : (
                    completedCount
                    /
                    totalCount
                ) * 100;


        checklistProgressBar.style.width =
            `${percentage}%`;

    }


    if (checklistComplete) {

        checklistComplete.classList.toggle(
            "visible",
            (
                totalCount > 0
                &&
                completedCount === totalCount
            )
        );

    }

}



/* ========================= */
/* CLICK */
/* ========================= */

checklistItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            () => {

                const checkId =
                    item.dataset.checkId;


                checklistState[
                    checkId
                ] =
                    !checklistState[
                        checkId
                    ];


                saveChecklist();

                updateChecklist();

            }
        );

    }
);



/* первый рендер */

updateChecklist();



/* ================================================== */
/* SYSTEM */
/* ================================================== */

console.log(
    "AURA.SYSTEM / AURI ONLINE"
);


console.log(
    "AURA.SYSTEM / CHECKLIST READY"
);
