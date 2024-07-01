const typingtext = document.querySelector(".typingtext p");
const input = document.querySelector('.wrapper .inputfield');
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistakes span");
const cpm = document.querySelector(".cpm span");
const wpm = document.querySelector(".wpm span");
const button = document.querySelector("button");
const resultDiv = document.querySelector(".result");
const finalWpm = document.getElementById("final-wpm");
const finalMistakes = document.getElementById("final-mistakes");
const finalTime = document.getElementById("final-time");
let timer;
let maxtime = 60;
let timeleft = maxtime;
let charindex = 0;
let mistake = 0;
let istyping = false;

function loadparagraph() {
    const paragraph = [
        "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet, making it a popular choice for typing tests.",
        "Typing skills are essential in today's digital age. They allow you to communicate quickly and efficiently, which is crucial in both personal and professional settings.",
        "Practice makes perfect. The more you practice typing, the faster and more accurate you will become. It's important to start with proper technique to avoid developing bad habits.",
        "In a world where technology is ever-present, typing is a necessary skill. From writing emails to coding software, typing is a fundamental part of many tasks.",
        "Typing can be both an art and a science. It requires dexterity, precision, and rhythm. Many people find it meditative and satisfying as they improve over time.",
        "Accuracy is just as important as speed when typing. It's better to type slightly slower and make fewer mistakes than to type quickly and have to correct numerous errors.",
        "Ergonomics play a significant role in typing. Proper posture and keyboard placement can prevent strain and injury, making typing a more comfortable experience."
    ];

    const randomindex = Math.floor(Math.random() * paragraph.length);
    typingtext.innerHTML = '';
    for (const char of paragraph[randomindex]) {
        typingtext.innerHTML += `<span>${char}</span>`;
    }
    typingtext.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus());
    typingtext.addEventListener('click', () => input.focus());
}

function inittyping() {
    const chars = typingtext.querySelectorAll('span');
    const typed = input.value.charAt(charindex);

    if (charindex < chars.length && timeleft > 0) {
        if (!istyping) {
            timer = setInterval(inittime, 1000);
            istyping = true;
        }
        if (chars[charindex].innerText === typed) {
            chars[charindex].classList.add('correct');
        } else {
            chars[charindex].classList.add('incorrect');
            mistake++;
        }
        charindex++;
        if (charindex < chars.length) {
            chars[charindex].classList.add('active');
        } else {
            endTest();
        }

        mistakes.innerText = mistake;
        cpm.innerText = charindex - mistake;
    } else {
        endTest();
    }
}

function inittime() {
    if (timeleft > 0) {
        timeleft--;
        time.innerText = timeleft;
        const wordsPerMinute = Math.round(((charindex - mistake) / 5) / ((maxtime - timeleft) / 60));
        wpm.innerText = wordsPerMinute;
    } else {
        endTest();
    }
}

function endTest() {
    clearInterval(timer);
    input.value = '';
    finalWpm.innerText = wpm.innerText;
    finalMistakes.innerText = mistakes.innerText;
    finalTime.innerText = maxtime - timeleft;
    resultDiv.classList.add('active');
}

function reset() {
    loadparagraph();
    clearInterval(timer);
    timeleft = maxtime;
    charindex = 0;
    mistake = 0;
    istyping = false;
    input.value = '';
    mistakes.innerText = 0;
    cpm.innerText = 0;
    wpm.innerText = 0;
    time.innerText = maxtime;
    resultDiv.classList.remove('active');
}

input.addEventListener("input", inittyping);
button.addEventListener("click", reset);
loadparagraph();
