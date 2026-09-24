const homeScreen =
    document.getElementById("home-screen");

const startScreen =
    document.getElementById("start-screen");

const pathScreen =
    document.getElementById("path-screen");


const openStartButton =
    document.getElementById("open-start");

const openPathButton =
    document.getElementById("open-path");


const backHomeStartButton =
    document.getElementById("back-home-start");

const backHomePathButton =
    document.getElementById("back-home-path");



function showScreen(screen) {

    const screens =
        document.querySelectorAll(".screen");


    screens.forEach((item) => {

        item.classList.remove("active");

    });


    screen.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}



openStartButton.addEventListener(
    "click",
    () => {

        showScreen(startScreen);

    }
);



openPathButton.addEventListener(
    "click",
    () => {

        showScreen(pathScreen);

    }
);



backHomeStartButton.addEventListener(
    "click",
    () => {

        showScreen(homeScreen);

    }
);



backHomePathButton.addEventListener(
    "click",
    () => {

        showScreen(homeScreen);

    }
);



console.log(
    "AURA.SYSTEM / GUIDE INITIALIZED"
);
