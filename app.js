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
/* AURI SIGNAL RUN — TEST VERSION */
/* ================================================== */

const gameCanvas =
    document.getElementById(
        "game-canvas"
    );


const gameStage =
    document.querySelector(
        ".game-stage-wrap"
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



let canvasWidth = 0;
let canvasHeight = 0;
let deviceScale = 1;


let gameRunning = false;
let animationFrame = null;

let lastFrameTime = 0;
let gameStartTime = 0;

let score = 0;

let speed = 150;

let spawnTimer = 0;

let obstacles = [];

let currentLane = 1;

let playerX = 0;

let targetPlayerX = 0;



const bestScoreKey =
    "aura-signal-run-best-v1";


let bestScore =
    Number(
        localStorage.getItem(
            bestScoreKey
        )
    ) || 0;



const auriGameImage =
    new Image();


auriGameImage.src =
    "assets/auri.png";



function formatGameScore(value) {

    return String(
        Math.max(
            0,
            Math.floor(value)
        )
    ).padStart(
        4,
        "0"
    );

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

}



updateGameHud();



/* ========================= */
/* CANVAS SIZE */
/* ========================= */

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


    if (rect.width <= 0) {
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



/* ========================= */
/* LANES */
/* ========================= */

function laneCenter(laneIndex) {

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



function movePlayer(direction) {

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



/* ========================= */
/* OBSTACLES */
/* ========================= */

function spawnObstacle() {

    const lane =
        Math.floor(
            Math.random()
            *
            3
        );


    obstacles.push({

        lane: lane,

        y: -50,

        height: 34,

        passed: false

    });

}



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



/* ========================= */
/* DRAW BACKGROUND */
/* ========================= */

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



    /* vertical lanes */

    gameContext.save();

    gameContext.strokeStyle =
        "rgba(108,58,199,0.20)";

    gameContext.lineWidth =
        1;


    [0.375, 0.625].forEach(
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



    /* moving grid */

    const gridGap =
        48;


    const movement =
        gameRunning
            ? (
                (
                    performance.now()
                    /
                    12
                )
                %
                gridGap
            )
            : 0;


    gameContext.save();

    gameContext.strokeStyle =
        "rgba(255,255,255,0.035)";

    gameContext.lineWidth =
        1;


    for (
        let y = -gridGap;
        y < canvasHeight + gridGap;
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



    /* center glow */

    const glow =
        gameContext.createRadialGradient(
            canvasWidth / 2,
            canvasHeight * 0.72,
            10,
            canvasWidth / 2,
            canvasHeight * 0.72,
            canvasWidth * 0.5
        );


    glow.addColorStop(
        0,
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



/* ========================= */
/* DRAW OBSTACLE */
/* ========================= */

function drawObstacle(obstacle) {

    const center =
        laneCenter(
            obstacle.lane
        );


    const width =
        Math.max(
            54,
            canvasWidth * 0.17
        );


    const x =
        center
        -
        width / 2;


    gameContext.save();


    gameContext.shadowColor =
        "rgba(108,58,199,0.85)";


    gameContext.shadowBlur =
        14;


    roundedRect(
        gameContext,
        x,
        obstacle.y,
        width,
        obstacle.height,
        7
    );


    gameContext.fillStyle =
        "rgba(108,58,199,0.25)";


    gameContext.fill();


    gameContext.strokeStyle =
        "rgba(151,103,255,0.95)";


    gameContext.lineWidth =
        1.5;


    gameContext.stroke();


    gameContext.shadowBlur =
        0;


    /* inner line */

    gameContext.beginPath();

    gameContext.moveTo(
        x + 10,
        obstacle.y
        +
        obstacle.height / 2
    );


    gameContext.lineTo(
        x
        +
        width
        -
        10,
        obstacle.y
        +
        obstacle.height / 2
    );


    gameContext.strokeStyle =
        "rgba(255,255,255,0.32)";


    gameContext.lineWidth =
        1;


    gameContext.stroke();


    gameContext.restore();

}



/* ========================= */
/* DRAW PLAYER */
/* ========================= */

function drawPlayer() {

    const playerSize =
        Math.max(
            72,
            Math.min(
                92,
                canvasWidth * 0.20
            )
        );


    const y =
        canvasHeight
        -
        playerSize
        -
        34;


    playerX +=
        (
            targetPlayerX
            -
            playerX
        )
        *
        0.18;


    gameContext.save();


    gameContext.shadowColor =
        "rgba(108,58,199,0.55)";


    gameContext.shadowBlur =
        22;


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
    else {

        gameContext.fillStyle =
            "#6C3AC7";


        roundedRect(
            gameContext,
            playerX
            -
            28,
            y + 8,
            56,
            70,
            24
        );


        gameContext.fill();

    }


    gameContext.restore();



    return {

        x:
            playerX
            -
            playerSize
            *
            0.24,

        y:
            y
            +
            playerSize
            *
            0.14,

        width:
            playerSize
            *
            0.48,

        height:
            playerSize
            *
            0.68

    };

}



/* ========================= */
/* COLLISION */
/* ========================= */

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



/* ========================= */
/* DRAW */
/* ========================= */

function drawGame() {

    if (
        !gameContext
        ||
        canvasWidth === 0
    ) {
        return;
    }


    drawGameBackground();


    obstacles.forEach(
        drawObstacle
    );


    drawPlayer();

}



/* ========================= */
/* LOOP */
/* ========================= */

function gameLoop(now) {

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


    speed =
        Math.min(
            350,
            150
            +
            elapsed
            *
            5
        );


    spawnTimer -=
        deltaMilliseconds;


    if (spawnTimer <= 0) {

        spawnObstacle();


        spawnTimer =
            Math.max(
                620,
                1150
                -
                elapsed
                *
                9
            )
            +
            Math.random()
            *
            280;

    }



    obstacles.forEach(
        (obstacle) => {

            obstacle.y +=
                speed
                *
                delta;

        }
    );



    const playerRectangle =
        drawPlayerCollisionPosition();



    for (
        const obstacle
        of obstacles
    ) {

        const width =
            Math.max(
                54,
                canvasWidth * 0.17
            );


        const obstacleRectangle = {

            x:
                laneCenter(
                    obstacle.lane
                )
                -
                width / 2,

            y:
                obstacle.y,

            width:
                width,

            height:
                obstacle.height

        };


        if (
            rectanglesOverlap(
                playerRectangle,
                obstacleRectangle
            )
        ) {

            gameOver();

            return;

        }


        if (
            !obstacle.passed
            &&
            obstacle.y
            >
            playerRectangle.y
            +
            playerRectangle.height
        ) {

            obstacle.passed =
                true;


            score +=
                12;

        }

    }



    obstacles =
        obstacles.filter(
            (obstacle) =>
                obstacle.y
                <
                canvasHeight
                +
                80
        );



    score +=
        delta
        *
        5;


    updateGameHud();


    drawGame();


    animationFrame =
        requestAnimationFrame(
            gameLoop
        );

}



/* player's collision rect without drawing */

function drawPlayerCollisionPosition() {

    const playerSize =
        Math.max(
            72,
            Math.min(
                92,
                canvasWidth * 0.20
            )
        );


    const y =
        canvasHeight
        -
        playerSize
        -
        34;


    return {

        x:
            playerX
            -
            playerSize
            *
            0.24,

        y:
            y
            +
            playerSize
            *
            0.14,

        width:
            playerSize
            *
            0.48,

        height:
            playerSize
            *
            0.68

    };

}



/* ========================= */
/* START */
/* ========================= */

function startGame() {

    resizeGameCanvas();


    obstacles = [];


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
        150;


    spawnTimer =
        850;


    lastFrameTime =
        0;


    gameStartTime =
        performance.now();


    gameRunning =
        true;


    updateGameHud();


    if (gameOverlay) {

        gameOverlay.classList.add(
            "hidden"
        );

    }


    animationFrame =
        requestAnimationFrame(
            gameLoop
        );

}



/* ========================= */
/* STOP */
/* ========================= */

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



/* ========================= */
/* GAME OVER */
/* ========================= */

function gameOver() {

    stopGame();


    const finalScore =
        Math.floor(
            score
        );


    if (
        finalScore
        >
        bestScore
    ) {

        bestScore =
            finalScore;


        localStorage.setItem(
            bestScoreKey,
            String(
                bestScore
            )
        );

    }


    updateGameHud();


    if (gameOverlayTitle) {

        gameOverlayTitle.textContent =
            "CONNECTION LOST";

    }


    if (gameOverlayText) {

        gameOverlayText.textContent =
            `SCORE ${formatGameScore(finalScore)} / BEST ${formatGameScore(bestScore)}`;

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



/* ========================= */
/* GAME BUTTONS */
/* ========================= */

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



/* ========================= */
/* KEYBOARD */
/* ========================= */

window.addEventListener(
    "keydown",
    (event) => {

        if (!gameRunning) {
            return;
        }


        if (
            event.key === "ArrowLeft"
            ||
            event.key.toLowerCase() === "a"
        ) {

            movePlayer(
                -1
            );

        }


        if (
            event.key === "ArrowRight"
            ||
            event.key.toLowerCase() === "d"
        ) {

            movePlayer(
                1
            );

        }

    }
);



/* ========================= */
/* SWIPE */
/* ========================= */

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
                        ? -1
                        : 1
                );

            }


            pointerStartX =
                null;

        }
    );

}



/* initial draw */

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
    "AURA.SYSTEM / SIGNAL RUN TEST READY"
);
