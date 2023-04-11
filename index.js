var btnColor =["red","blue","yellow","green"]
var gamePattern=[];
var userPattern=[];
var called = false;
var level=-1;

//depart de jeu
$(document).keypress(function () {    
    if(called===false){
    nextSequance();
    called=true;
    $("h1").text("Level "+level)}
});
//btn clicked
$(".btn").click(function () { 
    var chosenColor= $(this).attr("id");
    userPattern.push(chosenColor);
    playSound(chosenColor);
    animatePress(chosenColor);
    checkAnswer(userPattern.length-1);
});
//check answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userPattern[currentLevel]){
        if(gamePattern.length===userPattern.length){
            setTimeout(function(){
                nextSequance()
            },1000);
        }
    }else{
        var udio=new Audio("sounds/wrong.mp3");
        udio.play();
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")   
        },200)
        $("h1").text("game over, press any key to restart");
        startOver();
    }
}
function nextSequance(){
    userPattern=[];
    level++;
    $("h1").text("Level "+level)
    var rndnumber=Math.floor(Math.random()*4);
    var rndmColor=btnColor[rndnumber];
    gamePattern.push(rndmColor);
    $("#"+rndmColor).fadeOut(100).fadeIn(100);
    playSound(rndmColor);
}

function startOver(){
    level=-1;
    gamePattern=[];
    called = false
}

//playing music //
function playSound(name){
    switch(name){
        case "green": var audio= new Audio("sounds/green.mp3");
        audio.play();
        break;
        case "red": var au= new Audio("sounds/red.mp3");
        au.play();
        break;
        case "yellow": var aud= new Audio("sounds/yellow.mp3");
        aud.play();
        break;
        case "blue": var audi= new Audio("sounds/blue.mp3");
        audi.play();
        break;
    }
}
//animation
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}