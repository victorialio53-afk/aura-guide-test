const journeyButton =
    document.getElementById("go-to-journey");


const journey =
    document.getElementById("journey");


const messageElement =
    document.getElementById("auri-message");


const typingIndicator =
    document.getElementById("typing-indicator");



/* ========================= */
/* ПЕРЕХОД К КАРТЕ */
/* ========================= */

journeyButton.addEventListener(
    "click",
    () => {

        journey.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);



/* ========================= */
/* РЕПЛИКИ AURI */
/* ========================= */

const auriMessages = [

    "Привет, пользователь. Я помогу тебе пройти путь AURA.",

    "Следи за системой. Новые уровни будут открываться постепенно.",

    "Задания, расписание и новые данные появятся здесь, когда придет время.",

    "Если хочешь рассмотреть меня поближе — открой мою 3D-модель."

];


let currentMessageIndex = 0;



function showNextAuriMessage() {

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


    }, 250);

}



/* Новая реплика примерно раз в 6 секунд */

setInterval(
    showNextAuriMessage,
    6000
);



console.log(
    "AURA.SYSTEM / USER JOURNEY INITIALIZED"
);
