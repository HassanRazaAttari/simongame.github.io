
var gamePattern = [];
var userclickedpattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var indlastans;


$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").on('click', function (event) { 
    userclickedpattern.push(event.target.id);
    playsound(event.target.id);
    animatepress(event.target.id);
    indlastans = (userclickedpattern.length)-1;
    checkans(indlastans);
  //  console.log("user click = " + userclickedpattern);

});

function animatepress(currentcolor)
{
    $("#" + currentcolor).on("click", function()
    {
        $("#" + currentcolor).addClass("pressed");
        setTimeout(function(){
            $("#" + currentcolor).removeClass("pressed");
        }, 100);
    })
}

function nextSequence()
{
    
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    var randomChosen = "#" + randomChosenColor;
    $(randomChosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);

   // 

}


function checkans(indexx)
{
    if(userclickedpattern[indexx] === gamePattern[indexx])
    {
        

        if(userclickedpattern.length === gamePattern.length)
        {
            userclickedpattern = [];
            nextSequence();
        }
    }
    else{
        userclickedpattern = [];
        gamePattern = [];
        level = 0;
        var started = false;

        playsound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("GAME OVER PRESS ANY KEY TO RESTART");


        $(document).keypress(function() {
            if (!started) {
          
              //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
              $("#level-title").text("Level " + level);
              nextSequence();
              started = true;
            }
          });

    }
}



function playsound(name)
{
    var randomsound2 = "sounds/" + name + ".mp3"; 
    var obj = document.createElement('audio');
    obj.src = randomsound2; 
    obj.play();
}





