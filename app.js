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


const gameScreen =
    document.getElementById(
        "game-screen"
    );


const openChecklistButton =
    document.getElementById(
        "open-checklist"
    );


const backFromChecklistButton =
    document.getElementById(
        "back-from-checklist"
    );


const openGameButton =
    document.getElementById(
        "open-game"
    );


const backFromGameButton =
    document.getElementById(
        "back-from-game"
    );



function showScreen(screen) {

    const screens =
        document.querySelectorAll(
            ".app-screen"
        );


    screens.forEach(
        (item) => {

            item.classList.remove(
                "active-screen"
            );

        }
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



if (openGameButton) {

    openGameButton.addEventListener(
        "click",
        () => {

            showScreen(
                gameScreen
            );


            requestAnimationFrame(
                resizeGameCanvas
            );

        }
    );

}



if (backFromGameButton) {

    backFromGameButton.addEventListener(
        "click",
        () => {

            stopGame();

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
                )
                *
                100;


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



updateChecklist();



/* ================================================== */
/* AURI SIGNAL RUN V2 */
/* ================================================== */

const gameCanvas =
    document.getElementById(
        "game-canvas"
    );


const gameStage =
    document.querySelector(
        ".game-stage-wrap"
    );


const gameHud =
    document.querySelector(
        ".game-hud"
    );


const gameScoreElement =
    document.getElementById(
        "game-score"
    );


const gameBestElement =
    document.getElementById(
        "game-best"
    );


const gameOverlay =
    document.getElementById(
        "game-overlay"
    );


const gameOverlayTitle =
    document.getElementById(
        "game-overlay-title"
    );


const gameOverlayText =
    document.getElementById(
        "game-overlay-text"
    );


const gameStartButton =
    document.getElementById(
        "game-start"
    );


const gameLeftButton =
    document.getElementById(
        "game-left"
    );


const gameRightButton =
    document.getElementById(
        "game-right"
    );


const gameContext =
    gameCanvas
        ? gameCanvas.getContext("2d")
        : null;



/* ================================================== */
/* EXTRA HUD */
/* ================================================== */

let comboElement = null;
let fragmentsElement = null;
let shieldElement = null;
let gameEventToast = null;



function createExtraGameInterface() {

    if (
        gameHud &&
        !document.getElementById(
            "game-meta-bar"
        )
    ) {

        const metaBar =
            document.createElement(
                "div"
            );


        metaBar.id =
            "game-meta-bar";


        metaBar.className =
            "game-meta-bar";


        metaBar.innerHTML = `

            <div>
                <small>COMBO</small>
                <strong id="game-combo">
                    x1
                </strong>
            </div>

            <div>
                <small>DATA</small>
                <strong id="game-fragments">
                    00
                </strong>
            </div>

            <div>
                <small>SHIELD</small>
                <strong id="game-shield">
                    OFF
                </strong>
            </div>

        `;


        gameHud.insertAdjacentElement(
            "afterend",
            metaBar
        );

    }


    comboElement =
        document.getElementById(
            "game-combo"
        );


    fragmentsElement =
        document.getElementById(
            "game-fragments"
        );


    shieldElement =
        document.getElementById(
            "game-shield"
        );



    if (
        gameStage &&
        !document.getElementById(
            "game-event-toast"
        )
    ) {

        gameEventToast =
            document.createElement(
                "div"
            );


        gameEventToast.id =
            "game-event-toast";


        gameEventToast.className =
            "game-event-toast";


        gameStage.appendChild(
            gameEventToast
        );

    }
    else {

        gameEventToast =
            document.getElementById(
                "game-event-toast"
            );

    }

}



createExtraGameInterface();



/* ================================================== */
/* STORAGE */
/* ================================================== */

const bestScoreKey =
    "aura-signal-run-best-v2";


const fragmentsKey =
    "aura-signal-run-fragments-v1";



function safeReadNumber(
    key
) {

    try {

        return (
            Number(
                localStorage.getItem(
                    key
                )
            )
            ||
            0
        );

    }
    catch (error) {

        return 0;

    }

}



function safeSaveNumber(
    key,
    value
) {

    try {

        localStorage.setItem(
            key,
            String(
                value
            )
        );

    }
    catch (error) {

        console.log(
            "AURA.SYSTEM / STORAGE ERROR"
        );

    }

}



let bestScore =
    safeReadNumber(
        bestScoreKey
    );


let totalFragments =
    safeReadNumber(
        fragmentsKey
    );



/* ================================================== */
/* GAME STATE */
/* ================================================== */

let canvasWidth = 0;
let canvasHeight = 0;

let deviceScale = 1;


let gameRunning = false;

let animationFrame = null;

let lastFrameTime = 0;

let gameStartTime = 0;


let score = 0;


/*
    было 150
    теперь старт сразу ощутимо живее
*/

let speed = 215;


let spawnTimer = 0;


let entities = [];


let currentLane = 1;

let playerX = 0;

let targetPlayerX = 0;



/* бонусы */

let combo = 0;

let comboMultiplier = 1;

let signalsCollected = 0;

let runFragments = 0;



/* shield */

let shieldActive = false;

let shieldUntil = 0;



/* random event */

let surgeActive = false;

let surgeUntil = 0;

let nextSurgeAt = 0;



/* ================================================== */
/* AURI IMAGE */
/* ================================================== */

const auriGameImage =
    new Image();


auriGameImage.src =
    "assets/auri.png";



/* ================================================== */
/* HELPERS */
/* ================================================== */

function formatGameScore(
    value
) {

    return String(
        Math.max(
            0,
            Math.floor(
                value
            )
        )
    ).padStart(
        4,
        "0"
    );

}



function updateCombo() {

    comboMultiplier =
        Math.min(
            4,
            1
            +
            Math.floor(
                combo / 5
            )
        );

}



function resetCombo() {

    combo = 0;

    comboMultiplier = 1;

}



function updateGameHud() {

    if (gameScoreElement) {

        gameScoreElement.textContent =
            formatGameScore(
                score
            );

    }


    if (gameBestElement) {

        gameBestElement.textContent =
            formatGameScore(
                bestScore
            );

    }


    if (comboElement) {

        comboElement.textContent =
            `x${comboMultiplier}`;

    }


    if (fragmentsElement) {

        fragmentsElement.textContent =
            String(
                totalFragments
            ).padStart(
                2,
                "0"
            );

    }


    if (shieldElement) {

        shieldElement.textContent =
            shieldActive
                ? "ON"
                : "OFF";


        shieldElement.classList.toggle(
            "active",
            shieldActive
        );

    }

}



updateGameHud();



/* ================================================== */
/* EVENT MESSAGE */
/* ================================================== */

let toastTimeout = null;



function showGameEvent(
    text,
    duration = 1200
) {

    if (!gameEventToast) {
        return;
    }


    gameEventToast.textContent =
        text;


    gameEventToast.classList.add(
        "visible"
    );


    if (toastTimeout) {

        clearTimeout(
            toastTimeout
        );

    }


    toastTimeout =
        setTimeout(
            () => {

                gameEventToast.classList.remove(
                    "visible"
                );

            },
            duration
        );

}



/* ================================================== */
/* CANVAS SIZE */
/* ================================================== */

function resizeGameCanvas() {

    if (
        !gameCanvas ||
        !gameStage ||
        !gameContext
    ) {
        return;
    }


    const rect =
        gameStage.getBoundingClientRect();


    if (
        rect.width <= 0
        ||
        rect.height <= 0
    ) {
        return;
    }


    canvasWidth =
        rect.width;


    canvasHeight =
        rect.height;


    deviceScale =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    gameCanvas.width =
        Math.round(
            canvasWidth
            *
            deviceScale
        );


    gameCanvas.height =
        Math.round(
            canvasHeight
            *
            deviceScale
        );


    gameContext.setTransform(
        deviceScale,
        0,
        0,
        deviceScale,
        0,
        0
    );


    playerX =
        laneCenter(
            currentLane
        );


    targetPlayerX =
        playerX;


    drawGame();

}



window.addEventListener(
    "resize",
    resizeGameCanvas
);



/* ================================================== */
/* LANES */
/* ================================================== */

function laneCenter(
    laneIndex
) {

    const positions = [
        0.25,
        0.50,
        0.75
    ];


    return (
        canvasWidth
        *
        positions[
            laneIndex
        ]
    );

}



function movePlayer(
    direction
) {

    if (!gameRunning) {
        return;
    }


    currentLane +=
        direction;


    currentLane =
        Math.max(
            0,
            Math.min(
                2,
                currentLane
            )
        );


    targetPlayerX =
        laneCenter(
            currentLane
        );

}



/* ================================================== */
/* ENTITY SPAWNING */
/* ================================================== */

function randomLane(
    excluded = []
) {

    const available = [
        0,
        1,
        2
    ].filter(
        (lane) =>
            !excluded.includes(
                lane
            )
    );


    return available[
        Math.floor(
            Math.random()
            *
            available.length
        )
    ];

}



function createObstacle(
    lane
) {

    entities.push({

        type:
            "obstacle",

        lane:
            lane,

        y:
            -60,

        passed:
            false,

        dead:
            false

    });

}



function createSignal(
    lane
) {

    entities.push({

        type:
            "signal",

        lane:
            lane,

        y:
            -40,

        dead:
            false

    });

}



function createFragment(
    lane
) {

    entities.push({

        type:
            "fragment",

        lane:
            lane,

        y:
            -40,

        dead:
            false

    });

}



function createShield(
    lane
) {

    entities.push({

        type:
            "shield",

        lane:
            lane,

        y:
            -40,

        dead:
            false

    });

}



/* создаём одну строку игрового мира */

function spawnRow(
    elapsed
) {

    /*
        Иногда вместо препятствия
        появляется полностью бонусная строка.
    */

    if (
        Math.random()
        <
        0.14
    ) {

        createSignal(
            randomLane()
        );


        if (
            Math.random()
            <
            0.45
        ) {

            createSignal(
                randomLane()
            );

        }


        return;

    }



    /*
        После ~25 секунд иногда
        появляется два препятствия,
        но одна полоса ВСЕГДА остаётся свободной.
    */

    const doubleObstacle =
        elapsed > 25
        &&
        Math.random() < 0.28;


    const obstacleLanes = [];


    const firstLane =
        randomLane();


    obstacleLanes.push(
        firstLane
    );


    createObstacle(
        firstLane
    );


    if (doubleObstacle) {

        const secondLane =
            randomLane(
                obstacleLanes
            );


        obstacleLanes.push(
            secondLane
        );


        createObstacle(
            secondLane
        );

    }



    const safeLanes =
        [
            0,
            1,
            2
        ].filter(
            (lane) =>
                !obstacleLanes.includes(
                    lane
                )
        );


    if (
        safeLanes.length === 0
    ) {
        return;
    }


    const rewardLane =
        safeLanes[
            Math.floor(
                Math.random()
                *
                safeLanes.length
            )
        ];


    const rewardRoll =
        Math.random();



    /*
        редчайший бонус — shield
    */

    if (
        rewardRoll
        <
        0.055
    ) {

        createShield(
            rewardLane
        );

    }


    /*
        редкий DATA FRAGMENT
    */

    else if (
        rewardRoll
        <
        0.13
    ) {

        createFragment(
            rewardLane
        );

    }


    /*
        обычный signal node
    */

    else if (
        rewardRoll
        <
        0.82
    ) {

        createSignal(
            rewardLane
        );

    }

}



/* ================================================== */
/* DRAW HELPERS */
/* ================================================== */

function roundedRect(
    ctx,
    x,
    y,
    width,
    height,
    radius
) {

    const r =
        Math.min(
            radius,
            width / 2,
            height / 2
        );


    ctx.beginPath();


    ctx.moveTo(
        x + r,
        y
    );


    ctx.lineTo(
        x + width - r,
        y
    );


    ctx.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + r
    );


    ctx.lineTo(
        x + width,
        y + height - r
    );


    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - r,
        y + height
    );


    ctx.lineTo(
        x + r,
        y + height
    );


    ctx.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - r
    );


    ctx.lineTo(
        x,
        y + r
    );


    ctx.quadraticCurveTo(
        x,
        y,
        x + r,
        y
    );


    ctx.closePath();

}



/* ================================================== */
/* DRAW BACKGROUND */
/* ================================================== */

function drawGameBackground() {

    gameContext.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    const background =
        gameContext.createLinearGradient(
            0,
            0,
            0,
            canvasHeight
        );


    background.addColorStop(
        0,
        "#09080d"
    );


    background.addColorStop(
        1,
        "#050507"
    );


    gameContext.fillStyle =
        background;


    gameContext.fillRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );



    /* полосы */

    gameContext.save();


    gameContext.strokeStyle =
        surgeActive
            ? "rgba(137,86,255,0.35)"
            : "rgba(108,58,199,0.20)";


    gameContext.lineWidth =
        1;


    [
        0.375,
        0.625
    ].forEach(
        (position) => {

            gameContext.beginPath();


            gameContext.moveTo(
                canvasWidth
                *
                position,
                0
            );


            gameContext.lineTo(
                canvasWidth
                *
                position,
                canvasHeight
            );


            gameContext.stroke();

        }
    );


    gameContext.restore();



    /* движущаяся сетка */

    const gridGap =
        48;


    const movement =
        gameRunning
            ?
            (
                (
                    performance.now()
                    /
                    (
                        surgeActive
                            ? 7
                            : 10
                    )
                )
                %
                gridGap
            )
            :
            0;


    gameContext.save();


    gameContext.strokeStyle =
        "rgba(255,255,255,0.035)";


    for (
        let y = -gridGap;
        y <
        canvasHeight + gridGap;
        y += gridGap
    ) {

        gameContext.beginPath();


        gameContext.moveTo(
            0,
            y + movement
        );


        gameContext.lineTo(
            canvasWidth,
            y + movement
        );


        gameContext.stroke();

    }


    gameContext.restore();



    /* нижнее фиолетовое свечение */

    const glow =
        gameContext.createRadialGradient(
            canvasWidth / 2,
            canvasHeight * 0.78,
            10,
            canvasWidth / 2,
            canvasHeight * 0.78,
            canvasWidth * 0.55
        );


    glow.addColorStop(
        0,
        surgeActive
            ?
            "rgba(137,86,255,0.23)"
            :
            "rgba(108,58,199,0.14)"
    );


    glow.addColorStop(
        1,
        "rgba(108,58,199,0)"
    );


    gameContext.fillStyle =
        glow;


    gameContext.fillRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );

}



/* ================================================== */
/* DRAW ENTITIES */
/* ================================================== */

function drawObstacle(
    entity
) {

    const center =
        laneCenter(
            entity.lane
        );


    const width =
        Math.max(
            58,
            canvasWidth * 0.17
        );


    const height =
        38;


    const x =
        center
        -
        width / 2;


    gameContext.save();


    gameContext.shadowColor =
        "rgba(108,58,199,0.9)";


    gameContext.shadowBlur =
        15;


    roundedRect(
        gameContext,
        x,
        entity.y,
        width,
        height,
        8
    );


    gameContext.fillStyle =
        "rgba(108,58,199,0.24)";


    gameContext.fill();


    gameContext.strokeStyle =
        "rgba(151,103,255,0.95)";


    gameContext.lineWidth =
        1.5;


    gameContext.stroke();


    gameContext.shadowBlur =
        0;


    gameContext.beginPath();


    gameContext.moveTo(
        x + 10,
        entity.y
        +
        height / 2
    );


    gameContext.lineTo(
        x
        +
        width
        -
        10,
        entity.y
        +
        height / 2
    );


    gameContext.strokeStyle =
        "rgba(255,255,255,0.32)";


    gameContext.stroke();


    gameContext.restore();

}



function drawSignal(
    entity
) {

    const x =
        laneCenter(
            entity.lane
        );


    const y =
        entity.y;


    gameContext.save();


    gameContext.shadowColor =
        "rgba(137,86,255,0.95)";


    gameContext.shadowBlur =
        22;


    gameContext.beginPath();


    gameContext.arc(
        x,
        y,
        10,
        0,
        Math.PI * 2
    );


    gameContext.fillStyle =
        "#8B5DFF";


    gameContext.fill();


    gameContext.shadowBlur =
        0;


    gameContext.beginPath();


    gameContext.arc(
        x,
        y,
        17,
        0,
        Math.PI * 2
    );


    gameContext.strokeStyle =
        "rgba(139,93,255,0.38)";


    gameContext.lineWidth =
        1;


    gameContext.stroke();


    gameContext.restore();

}



function drawFragment(
    entity
) {

    const x =
        laneCenter(
            entity.lane
        );


    const y =
        entity.y;


    gameContext.save();


    gameContext.translate(
        x,
        y
    );


    gameContext.rotate(
        Math.PI / 4
    );


    gameContext.shadowColor =
        "rgba(255,255,255,0.8)";


    gameContext.shadowBlur =
        20;


    gameContext.fillStyle =
        "#d8cbff";


    gameContext.fillRect(
        -9,
        -9,
        18,
        18
    );


    gameContext.strokeStyle =
        "#8B5DFF";


    gameContext.lineWidth =
        2;


    gameContext.strokeRect(
        -12,
        -12,
        24,
        24
    );


    gameContext.restore();

}



function drawShield(
    entity
) {

    const x =
        laneCenter(
            entity.lane
        );


    const y =
        entity.y;


    gameContext.save();


    gameContext.shadowColor =
        "rgba(207,190,255,0.9)";


    gameContext.shadowBlur =
        24;


    gameContext.beginPath();


    gameContext.arc(
        x,
        y,
        18,
        0,
        Math.PI * 2
    );


    gameContext.strokeStyle =
        "#d8cbff";


    gameContext.lineWidth =
        3;


    gameContext.stroke();


    gameContext.beginPath();


    gameContext.arc(
        x,
        y,
        8,
        0,
        Math.PI * 2
    );


    gameContext.fillStyle =
        "#6C3AC7";


    gameContext.fill();


    gameContext.restore();

}



/* ================================================== */
/* PLAYER */
/* ================================================== */

function getPlayerSize() {

    /*
        модель стала заметно больше,
        чем в V1
    */

    return Math.max(
        96,
        Math.min(
            122,
            canvasWidth * 0.245
        )
    );

}



function getPlayerRect() {

    const playerSize =
        getPlayerSize();


    const y =
        canvasHeight
        -
        playerSize
        -
        38;


    return {

        x:
            playerX
            -
            playerSize * 0.22,

        y:
            y
            +
            playerSize * 0.13,

        width:
            playerSize * 0.44,

        height:
            playerSize * 0.70

    };

}



function drawPlayer() {

    const playerSize =
        getPlayerSize();


    const y =
        canvasHeight
        -
        playerSize
        -
        38;


    gameContext.save();



    if (shieldActive) {

        gameContext.shadowColor =
            "rgba(190,166,255,0.95)";


        gameContext.shadowBlur =
            28;


        gameContext.beginPath();


        gameContext.arc(
            playerX,
            y + playerSize / 2,
            playerSize * 0.47,
            0,
            Math.PI * 2
        );


        gameContext.strokeStyle =
            "rgba(205,187,255,0.75)";


        gameContext.lineWidth =
            2;


        gameContext.stroke();

    }



    gameContext.shadowColor =
        "rgba(108,58,199,0.60)";


    gameContext.shadowBlur =
        24;


    if (
        auriGameImage.complete
        &&
        auriGameImage.naturalWidth > 0
    ) {

        gameContext.drawImage(
            auriGameImage,
            playerX
            -
            playerSize / 2,
            y,
            playerSize,
            playerSize
        );

    }


    gameContext.restore();

}



/* ================================================== */
/* COLLISION */
/* ================================================== */

function rectanglesOverlap(
    first,
    second
) {

    return !(
        first.x + first.width < second.x
        ||
        first.x > second.x + second.width
        ||
        first.y + first.height < second.y
        ||
        first.y > second.y + second.height
    );

}



function getEntityRect(
    entity
) {

    const center =
        laneCenter(
            entity.lane
        );


    if (
        entity.type ===
        "obstacle"
    ) {

        const width =
            Math.max(
                58,
                canvasWidth * 0.17
            );


        return {

            x:
                center
                -
                width / 2,

            y:
                entity.y,

            width:
                width,

            height:
                38

        };

    }


    return {

        x:
            center - 17,

        y:
            entity.y - 17,

        width:
            34,

        height:
            34

    };

}



/* ================================================== */
/* DRAW GAME */
/* ================================================== */

function drawGame() {

    if (
        !gameContext
        ||
        canvasWidth === 0
    ) {
        return;
    }


    drawGameBackground();


    entities.forEach(
        (entity) => {

            if (entity.dead) {
                return;
            }


            if (
                entity.type ===
                "obstacle"
            ) {

                drawObstacle(
                    entity
                );

            }


            else if (
                entity.type ===
                "signal"
            ) {

                drawSignal(
                    entity
                );

            }


            else if (
                entity.type ===
                "fragment"
            ) {

                drawFragment(
                    entity
                );

            }


            else if (
                entity.type ===
                "shield"
            ) {

                drawShield(
                    entity
                );

            }

        }
    );


    drawPlayer();

}



/* ================================================== */
/* COLLECT */
/* ================================================== */

function collectEntity(
    entity
) {

    entity.dead =
        true;



    if (
        entity.type ===
        "signal"
    ) {

        combo++;

        updateCombo();


        signalsCollected++;


        const points =
            25
            *
            comboMultiplier;


        score +=
            points;


        if (
            combo > 0
            &&
            combo % 5 === 0
        ) {

            showGameEvent(
                `COMBO x${comboMultiplier}`
            );

        }

    }



    else if (
        entity.type ===
        "fragment"
    ) {

        runFragments++;

        totalFragments++;


        safeSaveNumber(
            fragmentsKey,
            totalFragments
        );


        score +=
            150;


        showGameEvent(
            "DATA FRAGMENT +1"
        );

    }



    else if (
        entity.type ===
        "shield"
    ) {

        shieldActive =
            true;


        shieldUntil =
            performance.now()
            +
            7000;


        score +=
            50;


        showGameEvent(
            "SHIELD ONLINE"
        );

    }


    updateGameHud();

}



/* ================================================== */
/* SIGNAL SURGE */
/* ================================================== */

function updateSignalSurge(
    now
) {

    if (
        surgeActive
        &&
        now >= surgeUntil
    ) {

        surgeActive =
            false;


        showGameEvent(
            "SIGNAL NORMALIZED"
        );

    }



    if (
        !surgeActive
        &&
        now >= nextSurgeAt
    ) {

        surgeActive =
            true;


        surgeUntil =
            now
            +
            5000;


        nextSurgeAt =
            surgeUntil
            +
            15000
            +
            Math.random()
            *
            9000;


        showGameEvent(
            "SIGNAL SURGE",
            1600
        );

    }

}



/* ================================================== */
/* GAME LOOP */
/* ================================================== */

function gameLoop(
    now
) {

    if (!gameRunning) {
        return;
    }


    if (!lastFrameTime) {

        lastFrameTime =
            now;

    }


    const deltaMilliseconds =
        Math.min(
            40,
            now - lastFrameTime
        );


    const delta =
        deltaMilliseconds
        /
        1000;


    lastFrameTime =
        now;


    const elapsed =
        (
            now
            -
            gameStartTime
        )
        /
        1000;



    /* ========================= */
    /* SPEED */
    /* ========================= */

    speed =
        Math.min(
            430,

            215
            +
            elapsed
            *
            6.2
        );



    updateSignalSurge(
        now
    );



    const currentSpeed =
        speed
        *
        (
            surgeActive
                ? 1.18
                : 1
        );



    /* ========================= */
    /* PLAYER MOVEMENT */
    /* ========================= */

    playerX +=
        (
            targetPlayerX
            -
            playerX
        )
        *
        Math.min(
            1,
            delta * 14
        );



    /* ========================= */
    /* SPAWN */
    /* ========================= */

    spawnTimer -=
        deltaMilliseconds;


    if (
        spawnTimer <= 0
    ) {

        spawnRow(
            elapsed
        );


        const basicInterval =
            Math.max(
                510,

                980
                -
                elapsed
                *
                7
            );


        spawnTimer =
            (
                surgeActive
                    ?
                    basicInterval * 0.74
                    :
                    basicInterval
            )
            +
            Math.random()
            *
            220;

    }



    /* ========================= */
    /* MOVE ENTITIES */
    /* ========================= */

    entities.forEach(
        (entity) => {

            entity.y +=
                currentSpeed
                *
                delta;

        }
    );



    const playerRect =
        getPlayerRect();



    /* ========================= */
    /* COLLISIONS */
    /* ========================= */

    for (
        const entity
        of entities
    ) {

        if (entity.dead) {
            continue;
        }


        const entityRect =
            getEntityRect(
                entity
            );


        if (
            rectanglesOverlap(
                playerRect,
                entityRect
            )
        ) {


            /*
                OBSTACLE
            */

            if (
                entity.type ===
                "obstacle"
            ) {

                if (
                    shieldActive
                ) {

                    entity.dead =
                        true;


                    shieldActive =
                        false;


                    shieldUntil =
                        0;


                    score +=
                        30;


                    showGameEvent(
                        "SHIELD ABSORBED"
                    );


                    updateGameHud();


                    continue;

                }


                gameOver();

                return;

            }



            /*
                BONUS
            */

            collectEntity(
                entity
            );

        }



        /* ========================= */
        /* MISSED SIGNAL */
        /* ========================= */

        if (
            entity.type ===
            "signal"
            &&
            entity.y
            >
            canvasHeight
            +
            30
            &&
            !entity.dead
        ) {

            entity.dead =
                true;


            resetCombo();


            updateGameHud();

        }



        /* obstacle safely passed */

        if (
            entity.type ===
            "obstacle"
            &&
            !entity.passed
            &&
            entity.y
            >
            playerRect.y
            +
            playerRect.height
        ) {

            entity.passed =
                true;


            score +=
                12;

        }

    }



    /* ========================= */
    /* SHIELD TIMER */
    /* ========================= */

    if (
        shieldActive
        &&
        now >= shieldUntil
    ) {

        shieldActive =
            false;


        showGameEvent(
            "SHIELD OFFLINE"
        );


        updateGameHud();

    }



    /* ========================= */
    /* CLEANUP */
    /* ========================= */

    entities =
        entities.filter(
            (entity) =>

                !entity.dead
                &&
                entity.y
                <
                canvasHeight
                +
                100
        );



    /* passive score */

    score +=
        delta
        *
        (
            surgeActive
                ? 10
                : 6
        );



    updateGameHud();


    drawGame();



    animationFrame =
        requestAnimationFrame(
            gameLoop
        );

}



/* ================================================== */
/* START GAME */
/* ================================================== */

function startGame() {

    resizeGameCanvas();


    entities = [];


    currentLane =
        1;


    playerX =
        laneCenter(
            currentLane
        );


    targetPlayerX =
        playerX;


    score =
        0;


    speed =
        215;


    spawnTimer =
        720;


    combo =
        0;


    comboMultiplier =
        1;


    signalsCollected =
        0;


    runFragments =
        0;


    shieldActive =
        false;


    shieldUntil =
        0;


    surgeActive =
        false;


    lastFrameTime =
        0;


    gameStartTime =
        performance.now();


    nextSurgeAt =
        gameStartTime
        +
        13000
        +
        Math.random()
        *
        7000;


    gameRunning =
        true;


    updateGameHud();



    if (gameOverlay) {

        gameOverlay.classList.add(
            "hidden"
        );

    }



    showGameEvent(
        "CONNECTION STABLE"
    );



    animationFrame =
        requestAnimationFrame(
            gameLoop
        );

}



/* ================================================== */
/* STOP GAME */
/* ================================================== */

function stopGame() {

    gameRunning =
        false;


    if (animationFrame) {

        cancelAnimationFrame(
            animationFrame
        );


        animationFrame =
            null;

    }

}



/* ================================================== */
/* GAME OVER */
/* ================================================== */

function gameOver() {

    stopGame();


    const finalScore =
        Math.floor(
            score
        );


    const previousBest =
        bestScore;


    if (
        finalScore
        >
        bestScore
    ) {

        bestScore =
            finalScore;


        safeSaveNumber(
            bestScoreKey,
            bestScore
        );

    }


    updateGameHud();



    if (gameOverlayTitle) {

        gameOverlayTitle.textContent =
            finalScore > previousBest
                ?
                "NEW RECORD"
                :
                "CONNECTION LOST";

    }



    if (gameOverlayText) {

        gameOverlayText.textContent =
            `SCORE ${formatGameScore(finalScore)} / DATA +${runFragments} / BEST ${formatGameScore(bestScore)}`;

    }



    if (gameStartButton) {

        gameStartButton.textContent =
            "RECONNECT";

    }



    if (gameOverlay) {

        gameOverlay.classList.remove(
            "hidden"
        );

    }

}



/* ================================================== */
/* GAME CONTROLS */
/* ================================================== */

if (gameStartButton) {

    gameStartButton.addEventListener(
        "click",
        () => {

            gameStartButton.textContent =
                "RECONNECT";


            startGame();

        }
    );

}



if (gameLeftButton) {

    gameLeftButton.addEventListener(
        "click",
        () => {

            movePlayer(
                -1
            );

        }
    );

}



if (gameRightButton) {

    gameRightButton.addEventListener(
        "click",
        () => {

            movePlayer(
                1
            );

        }
    );

}



/* keyboard */

window.addEventListener(
    "keydown",
    (event) => {

        if (!gameRunning) {
            return;
        }


        if (
            event.key ===
            "ArrowLeft"
            ||
            event.key.toLowerCase() ===
            "a"
        ) {

            movePlayer(
                -1
            );

        }


        if (
            event.key ===
            "ArrowRight"
            ||
            event.key.toLowerCase() ===
            "d"
        ) {

            movePlayer(
                1
            );

        }

    }
);



/* ================================================== */
/* SWIPE / TAP */
/* ================================================== */

let pointerStartX =
    null;



if (gameCanvas) {

    gameCanvas.addEventListener(
        "pointerdown",
        (event) => {

            pointerStartX =
                event.clientX;

        }
    );


    gameCanvas.addEventListener(
        "pointerup",
        (event) => {

            if (
                pointerStartX === null
                ||
                !gameRunning
            ) {
                return;
            }


            const difference =
                event.clientX
                -
                pointerStartX;



            /*
                SWIPE
            */

            if (
                Math.abs(
                    difference
                )
                >
                24
            ) {

                movePlayer(
                    difference > 0
                        ? 1
                        : -1
                );

            }



            /*
                TAP
            */

            else {

                const rect =
                    gameCanvas.getBoundingClientRect();


                const relativeX =
                    event.clientX
                    -
                    rect.left;


                movePlayer(
                    relativeX
                    <
                    rect.width / 2
                        ?
                        -1
                        :
                        1
                );

            }


            pointerStartX =
                null;

        }
    );

}



/* ================================================== */
/* INITIAL DRAW */
/* ================================================== */

auriGameImage.addEventListener(
    "load",
    () => {

        drawGame();

    }
);



console.log(
    "AURA.SYSTEM / AURI ONLINE"
);


console.log(
    "AURA.SYSTEM / CHECKLIST READY"
);


console.log(
    "AURA.SYSTEM / SIGNAL RUN V2 READY"
);
