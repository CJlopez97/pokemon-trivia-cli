const readline = require('readline');

//Questions Array

const questions = [
    {
    question: "Other than Poison, what is the other weakness of Fairy-Type Pokémon?",
    options: ["Fire", "Steel", "Rock", "Ghost"],
    answer: 1
  },
  {
    question: "Who is the Gym Leader in Cerulean City who specializes in Water-type Pokémon?",
    options: ["Erika", "Misty", "Sabrina", "Lt. Surge"],
    answer: 1
  },
  {
    question: "How many forms does Deoxys have?",
    options: ["2", "3", "4", "5"],
    answer: 2
  },
  {
    question: "Which Pokémon has the unique ability called Wonder Guard?",
    options: ["Clefairy", "Lunala", "Zamazenta", "Shedinja"],
    answer: 3
  },
  {
    question: "How many Safari Balls are given to the player when they enter the Safari Zone?",
    options: ["20","25","30","40"],
    answer: 2
  },
  {
    question: "Which fossil, when revived, will give you Omanyte?",
    options: ["Helix Fossil", "Dome Fossil", "Old Amber", "Root Fossil"],
    answer: 0
  },
  {
    question: "What item must be held by a Sneasel to evolve into Weavile?",
    options: ["Dusk Stone", "Ice Stone", "Reaper Cloth", "Razor Claw"],
    answer: 3
  },
  {
    question: "In the third generation of Pokémon games, what is the name of the ship that transports players from Lilycove City to Slateport City?",
    options: ["S.S. Anne", "S.S.Tidal", "S.S. Aqua", "S.S. Liberty"],
    answer: 1
  },
  {
    question: "What is the name of the town where you begin your journey in Pokémon HeartGold and SoulSilver?",
    options: ["Pallet Town", "Goldenrod City", "New Bark Town", "Ecruteak City"],
    answer: 2
  },
  {
    question: "What is the first Pokémon in the National Pokédex?",
    options: ["Charmander", "Bulbasaur", "Squirtle", "Pikachu"],
    answer: 1
  }
];

//Global Variables

let score = 0;
let questionIndex = 0;
let timerId = null;
let timeRemaining = 0;
let isAnswered = false;

// Creating interface

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Welcome Screen
function initGame(){
    console.clear();
    console.log("Pokémon Trivia CLI Challenge");
    console.log("Test your knowledge to become a Champion!\n");
    
    rl.question("Press [ENTER] to start the game...", () => {
        startGame();
    });
}
function startGame(){
    score = 0;
    questionIndex = 0;
    currentQuestion();
}
//Countdown clock
function startTimer(){
    timeRemaining = 15;
    if(timerId) clearInterval(timerId);

    timerId = setInterval(() => {
        timeRemaining--;

        if(!isAnswered && timeRemaining > 0 && timeRemaining <=5){
            process.stdout.write(`\r Time running out! ${timeRemaining}s left`)
        }
        if(timeRemaining <= 0){
            clearInterval(timerId);
            if(!isAnswered){
                isAnswered = true;
                timeout();
            }
        }
    }, 1000);
}
//Questions and input
function currentQuestion(){
    if(questionIndex >= questions.length){
        endGame();
        return;
    }
    console.clear();
    isAnswered = false;
    const currentQ = questions[questionIndex];

    console.log(`Question ${questionIndex + 1} of ${questions.length}`);
    console.log(currentQ.question);
    //Options

    currentQ.options.forEach((option, index) =>{
        console.log(`${index + 1}. ${option}`);
    });
    console.log("");
    startTimer();

    rl.question("Your choice (1-4): ", (input) => {
        if (isAnswered) { return };
        isAnswered = true;
        clearInterval(timerId);
        const selectedIndex = parseInt(input.trim()) -1;

        validateAnswer(selectedIndex);
    });
}
//Evaluates the answer
function validateAnswer(selectedIndex) {
    const currentQ = questions[questionIndex];
    const isCorrect = (selectedIndex === currentQ.answer);
    console.log("");
    if(isCorrect) {
        score++;
        console.log("✅ Correct!");
    } else if (selectedIndex < 0 || selectedIndex > 3 || isNaN(selectedIndex)) {
        console.log(`❌ Invalid choice! The correct answer was: ${currentQ.options[currentQ.answer]}`);
    } else {
        console.log(`⛔ Incorrect. The correct answer was: ${currentQ.options[currentQ.answer]}`);
    }

    nextQuestion();
}
//Timeout function
function timeout(){
    console.log("\n\n⏰ Time's up!");
    const currentQ = questions[questionIndex];
    console.log(`The correct answer was ${currentQ.options[currentQ.answer]}`);
    nextQuestion();
}
//Pauses for 3 seconds before moving on
function nextQuestion(){
    console.log("\nNext question loading in 3 seconds...");
    setTimeout(()=> {
        questionIndex++;
        currentQuestion();
    }, 3000);
}
//Final result and restart game
function endGame(){
    console.clear();
    const percentage = Math.round((score / questions.length) * 100);
    console.log("🎯 GAME OVER!");
    console.log("========================================");
    console.log(`Final score: ${score} / ${questions.length} (${percentage}%)`);

      if (percentage < 70) {
        console.log("Better Luck Next Time!");
    } else {
        console.log("You have the knowledge of a Pokémon Champion! 🏆");
    }
    console.log("=========================================\n");

    rl.question("Would you like to play again? (y/n): ", (choice) => {
        if (choice.trim().toLowerCase() === 'y') {
            startGame();
        } else {
            console.log("\nThank you for playing! Goodbye!");
            rl.close();
            process.exit(0);
        }
    });
}
initGame();