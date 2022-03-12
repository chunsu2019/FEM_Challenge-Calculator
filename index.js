//keys
const numberButtons = document.querySelectorAll("[data-num]");
const operatorButtons = document.querySelectorAll("[data-op]");
const resetButton = document.querySelector(".reset-button");
const equalButton = document.querySelector(".equal-button");
const decimalButton = document.querySelector(".decimal");

//display
const currentNumberDisplay = document.querySelector(".current-number");
const previousNumberDisplay = document.querySelector(".previous-number");
const operatorDisplay = document.querySelector(".operator");

//theme toggle
const themeToggle = document.querySelectorAll('input[name="theme"]');

//
let stringDigit = ""; //digit
let previous = null;
let current = null;
let currentOperator = null;

let lastKeyEqual = false; //
let decimalFlag = false;

//theme
themeToggle.forEach(input => {
    input.addEventListener("change", () => {
        const root = document.documentElement;
        switch (input.value) {
            case "1":
                root.style.setProperty("--main-background", "hsl(222, 26%, 31%)");
                root.style.setProperty("--toggle-background", "hsl(223, 31%, 20%)");
                root.style.setProperty("--screen-background", "hsl(224, 36%, 15%)");
                root.style.setProperty("--keypad-backgrouund", "hsl(224, 36%, 15%)");

                root.style.setProperty("--del-reset-key-background", "hsl(225, 21%, 49%)");
                root.style.setProperty("--dr-key-shadow", "hsl(224, 28%, 35%)");

                root.style.setProperty("--equal-and-toggle-key-background", "hsl(6, 63%, 50%)");
                root.style.setProperty("--eat-key-shadow", "hsl(6, 70%, 34%)");

                root.style.setProperty("--normal-key-background", "hsl(30, 25%, 89%)");
                root.style.setProperty("--normal-key-shadow", "hsl(28, 16%, 65%)");

                root.style.setProperty("--normal-key-color", "hsl(198, 20%, 13%)");
                root.style.setProperty("--header-text-color", "rgb(255, 255, 255)");
                root.style.setProperty("--del-reset-key-colo", "rgb(255, 255, 255)");
                root.style.setProperty("--equal-key-color", "rgb(255, 255, 255)");
                break;

            case "2":
                root.style.setProperty("--main-background", "hsl(0, 0%, 90%)");
                root.style.setProperty("--toggle-background", "hsl(0, 5%, 81%)");
                root.style.setProperty("--screen-background", "hsl(0, 0%, 93%)");
                root.style.setProperty("--keypad-backgrouund", "#EAE3DB");

                root.style.setProperty("--del-reset-key-background", "hsl(185, 42%, 37%)");
                root.style.setProperty("--dr-key-shadow", "hsl(185, 58%, 25%)");

                root.style.setProperty("--equal-and-toggle-key-background", "hsl(25, 98%, 40%)");
                root.style.setProperty("--eat-key-shadow", "hsl(25, 99%, 27%)");

                root.style.setProperty("--normal-key-background", "hsl(45, 7%, 89%)");
                root.style.setProperty("--normal-key-shadow", "hsl(35, 11%, 61%)");

                root.style.setProperty("--normal-key-color", "hsl(60, 10%, 19%)");
                root.style.setProperty("--header-text-color", "rgb(0, 0, 0)");
                root.style.setProperty("--del-reset-key-colo", "rgb(255, 255, 255)");
                root.style.setProperty("--equal-key-color", "rgb(0, 0, 0)");
                break;

            case "3":
                root.style.setProperty("--main-background", "hsl(268, 75%, 9%)");
                root.style.setProperty("--toggle-background", "hsl(268, 71%, 12%)");
                root.style.setProperty("--screen-background", "hsl(198, 20%, 13%)");
                root.style.setProperty("--keypad-backgrouund", "hsl(198, 20%, 13%)");

                root.style.setProperty("--del-reset-key-background", "hsl(281, 89%, 26%)");
                root.style.setProperty("--dr-key-shadow", "hsl(285, 91%, 52%)");

                root.style.setProperty("--equal-and-toggle-key-background", "hsl(176, 100%, 44%)");
                root.style.setProperty("--eat-key-shadow", "hsl(177, 92%, 70%)");

                root.style.setProperty("--normal-key-background", "hsl(268, 47%, 21%)");
                root.style.setProperty("--normal-key-shadow", "hsl(290, 70%, 36%)");

                root.style.setProperty("--normal-key-color", "hsl(52, 100%, 62%)");
                root.style.setProperty("--header-text-color", "hsl(52, 100%, 62%)");
                root.style.setProperty("--del-reset-key-colo", "hsl(0, 0, 0)");
                root.style.setProperty("--equal-key-color", "hsl(198, 20%, 13%)");
                break;
        }
    })
})

//
decimalButton.addEventListener("click", () => {
    if (!decimalFlag) {
        stringDigit += ".";
        currentNumberDisplay.textContent = stringDigit
    }
    decimalFlag = true;
})

//
numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        stringDigit = stringDigit + btn.dataset.num;
        currentNumberDisplay.textContent = stringDigit;
        current = parseFloat(stringDigit);

    })
})

operatorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        //
        stringDigit = "";
        operatorDisplay.textContent = btn.dataset.op;
        decimalFlag = false;

        //

        if (previous === null) {
            previous = current;
            current = 0;

            previousNumberDisplay.textContent = previous;
            currentNumberDisplay.textContent = current;

            currentOperator = btn.dataset.op;
            operatorDisplay.textContent = currentOperator;

        }
        else {
            if (lastKeyEqual) {
                previous = previous;
                current = 0;

                previousNumberDisplay.textContent = previous;
                currentNumberDisplay.textContent = current;

                currentOperator = btn.dataset.op;
                operatorDisplay.textContent = currentOperator;

                lastKeyEqual = false;
                decimalFlag = false;
            }
            else {
                mathOperation();
                currentOperator = btn.dataset.op;
            }

        }



    })
})

//press operators without pressing equal sign
const mathOperation = () => {
    switch (currentOperator) {
        case "+":
            //
            previous += current;
            previousNumberDisplay.textContent = previous;

            current = 0;
            currentNumberDisplay.textContent = current;

            break;

        case "-":
            //
            previous -= current;
            previousNumberDisplay.textContent = previous;

            current = 0;
            currentNumberDisplay.textContent = current;

            break;

        case "x":
            //
            previous *= current;
            previousNumberDisplay.textContent = previous;

            current = 0;
            currentNumberDisplay.textContent = current;

            break;

        case "/":
            previous /= current;
            previousNumberDisplay.textContent = previous;

            current = 0;
            currentNumberDisplay.textContent = current;

            break;
    }
}

resetButton.addEventListener("click", () => {
    current = 0;
    previous = null;
    currentOperator = null;
    stringDigit = "";

    currentNumberDisplay.textContent = current ? current : "0";
    previousNumberDisplay.textContent = previous ? previous : "";
    operatorDisplay.textContent = currentOperator ? currentOperator : "";
    decimalFlag = false;

})

equalButton.addEventListener("click", () => {


    switch (currentOperator) {
        case "+":
            previous += current;
            break;

        case "-":
            previous -= current;
            break;

        case "x":
            previous *= current;
            break;

        case "/":
            previous /= current;
            break;


    }

    previousNumberDisplay.textContent = ""
    operatorDisplay.textContent = ""
    currentNumberDisplay.textContent = previous;
    lastKeyEqual = true;
    decimalFlag = false;
})

