
const save = document.querySelector(".save")
const inputname = document.querySelector("input");
const finalscore = document.querySelector(".finalscore")

let currentscore = JSON.parse(localStorage.getItem("currentscore"));


finalscore.innerHTML = `SCORE:   &nbsp;${currentscore} /500`;

save.addEventListener("click",(e)=>{
e.preventDefault();
if(inputname.value.length != 0){
    currentname = inputname.value;
   
    window.location.assign("./highscores.html")
 localStorage.setItem("currentname",currentname)
}
else{
    alert("enter valid input name");
}
})

