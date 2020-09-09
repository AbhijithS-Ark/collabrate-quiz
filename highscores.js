
//add contributing.md
//update readme.md
//push

//class for high scores
class highscoreclass{
    constructor(name,score){
       this.name = name;
       this.score = score;
    }   
   }


let highscore;
let defaulthighscore;
let highscorelist = document.querySelector("table");
if (localStorage.getItem("highscore") === null) {
 
    highscore = [];
}
else {
    highscore = JSON.parse(localStorage.getItem("highscore"));

}


let currentscore = JSON.parse(localStorage.getItem("currentscore"));
let currentname = localStorage.getItem("currentname");




if(currentscore != -2){
    defaulthighscore = new highscoreclass(currentname,currentscore);
    highscore.push(defaulthighscore);
    localStorage.setItem("highscore", JSON.stringify(highscore));
}



//look into that page does not refresh while in highscore.js file or else null valu will be stored

//display all the names
highscore = JSON.parse(localStorage.getItem("highscore"));

highscore.sort((a,b)=>{
    return b.score - a.score;
})



highscore.forEach((high)=>{
let div = document.createElement("div");
div.classList.add("listitems")
div.innerHTML = `
${high.name} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   <span class="scoredisplay">${high.score}</span>`;
highscorelist.appendChild(div);


})


//put default value
localStorage.setItem("currentscore",-2);