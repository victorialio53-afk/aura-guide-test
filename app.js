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



console.log(
    "AURA.SYSTEM / AURI ONLINE"
);
