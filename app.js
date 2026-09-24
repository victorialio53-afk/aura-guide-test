const homeScreen =
    document.getElementById("home-screen");

const startScreen =
    document.getElementById("start-screen");

const openStartButton =
    document.getElementById("open-start");

const backHomeButton =
    document.getElementById("back-home");



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



backHomeButton.addEventListener(
    "click",
    () => {

        showScreen(homeScreen);

    }
);



console.log(
    "AURA.SYSTEM / GUIDE INITIALIZED"
);
