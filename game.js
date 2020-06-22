// User click patterns
let userClickedPattern = []

// Create a pattern and save it in an array
let gamePattern = []
let buttonColours = ["red","blue","green","yellow"];

// Create a new variable called level and start at level 0
let level = 0

function nextSequence(){

     userClickedPattern = [];

     let randomNumber = Math.floor(Math.random() * 4);
     let randomChosenColour = buttonColours[randomNumber];
     gamePattern.push(randomChosenColour)
     // Show the sequence to the user
     $('#' + randomChosenColour).fadeOut(100).fadeIn(100);

     // Play audio
     playSound(randomChosenColour);

     //Increase level by 1 every time nextSequence is called
     level++;
     $('#level-title').text("Level " + level);
     return randomChosenColour
}


// Start the Game - Detect Keyboard Key, only first key pressed

$('.start-button').one("click", () => {
     nextSequence();
     $('#level-title').text("Level " + level);
})

// Detect click jQuery
$('.btn').click(function(event){
     let userChosenColour = event.currentTarget.id;
     userClickedPattern.push(userChosenColour)
     // Play audio
     playSound(userChosenColour);
     // Animation
     animatePress(userChosenColour);
     checkAnswer(userClickedPattern.length-1);
     console.log(userClickedPattern);
});

// Add Sounds to Button Clicks and random chosen color

function playSound(name){
     var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();

}

// Animations to user Clicks

function animatePress(currentColor){
     $('.' + currentColor).addClass('pressed');
     setTimeout(function () {
          $('.' + currentColor).removeClass('pressed');
     },100);
}

/* Create a new function called checkAnswer, it should take 1 input with the name currentLevel (this is the last item from let = userClickedPattern) */

function checkAnswer(currentLevel){
     console.log(currentLevel);
     /* if the last item from userClickPattern is the same that the item of that SAME PLACE(userClickpattern) in gamePattern then Success. */
     if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
          console.log("success");
          if(gamePattern.length == userClickedPattern.length){
               setTimeout(function(){
                    nextSequence()
               }, 1000);          
          }
     }else{
          wrong();
     }
}
// function wrong

function wrong(){
     let wrongColor = new Audio("sounds/wrong.mp3");
     wrongColor.play();

     $('body').addClass('game-over');

     setTimeout(function () {
          $('body').removeClass('game-over');
     },200);

     $('#level-title').text('Game Over, Press Start');
 
     startOver();
}

/***
 * Restart the game 
 * 1.Create a new function called startOver().
 * 2. Call startOver() if the user gets the sequence wrong.
 * 3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
 * */

function startOver(){

     $('.start-button').one("click", () => {
          level = 0;
          gamePattern = [];
          nextSequence();
     })
}