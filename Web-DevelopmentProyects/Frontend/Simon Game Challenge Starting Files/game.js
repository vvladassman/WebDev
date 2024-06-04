var buttonColours = ["red","blue","yellow","green"];
var gamePattern = [];
var userClickedPattern = [];
var hasStarted = false;
var level = 1;
function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level " + level);
    level++;
}
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if(hasStarted === true){
        checkAnswer(userClickedPattern.length-1);
    }
    
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
        
      }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        console.log("Wrong");
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        setTimeout(function() {
            $("body").removeClass("game-over");
            
          }, 200);
    }
}

function startOver(){
    level = 1;
    gamePattern = [];
    hasStarted = false;
}

$(document).keypress(function(){
    if(hasStarted === false){
        nextSequence();
        
        hasStarted = true;
        
    }
   
   
});

