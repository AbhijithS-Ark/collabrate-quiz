//grab all
const seconds = document.querySelector(".timerseconds");
let countdown = 20;
let progress = document.querySelector("progress");
const options = document.querySelector(".options");
const optionslist = document.querySelectorAll(".options ul li");
const scorevalue = document.querySelector(".scorevalue");
const img = document.querySelector("img");
let totalscore = 0;
let question = 1;
const questiondisplay = document.querySelector(".questiondisplay");
let beginnerarray, intermediatearray, expertarray;
let randomnumber;
let currentarray;
let countdowntime;
let displayquestionnumber = document.querySelector(".displayquestionnumber");
let displaytotalquestions = document.querySelector(".displaytotalquestions");


// display total number of questions
displaytotalquestions.textContent = "5";

//to prevent errors
localStorage.setItem("currentscore",-2);

//setup timer
function countdowntimer() {
    countdowntime = setInterval(() => {
        countdown--;
        seconds.textContent = `${countdown}`;
        if (countdown === 0) {
            showrightanswer();
            clearInterval(countdowntime);
            if (question < 6) {
                setTimeout(() => {
                    seconds.classList.remove("lowontime");
                    question++;
                    
                    //remove previous question from array
                    currentarray.splice(randomnumber,1);
                    displayquestions();
                   
                    countdown = 21;
                    countdowntimer();
                    removeclasslist();
                }, 1500)
            }
        }
        if (countdown < 11) {
            seconds.classList.add("lowontime");
        }
    }, 800)
}
countdowntimer();
//fetch all questions from json file and store them in array
//function to fetch beginner question 
fetch("questions/beginner.json")

    .then((data) => {
        return data.json();
    }).then((data) => {
        beginnerarray = data.questions;

        displayquestions();

    })

//function to fetch intermediate questions
fetch("questions/intermediate.json")

    .then((data) => {
        return data.json();
    }).then((data) => {
        intermediatearray = data.questions;

    })

//function to fetch expert questions
fetch("questions/expert.json")

    .then((data) => {
        return data.json();
    }).then((data) => {
        expertarray = data.questions;
   
    })


//function to show right answer after clicking
options.addEventListener("click", (e) => {

    if (e.target.tagName === "LI") {

        let option = e.target.getAttribute("data-option");
        if (option == currentarray[randomnumber].correctIndex) {
            ;
            e.target.classList.add("right");
            totalscore += 100;
            scorevalue.textContent = totalscore;
        }
        optionslist.forEach((option) => {
            option.classList.add("clicked");
            if (option.getAttribute("data-option") == currentarray[randomnumber].correctIndex) {
                option.classList.add("right");
            }

            clearInterval(countdowntime);

        })
        if (question < 6) {
            setTimeout(() => {
                question++;
                countdown = 21  ;
                seconds.classList.remove("lowontime");
                countdowntimer();
                removeclasslist(option);
                //remove previous question from array
                currentarray.splice(randomnumber,1);
                displayquestions();
            }, 1500)

        }
        else {
          
            //jump to end html file which is to be created
            window.location.assign('./end.html')    

            // window.location.href = "end.html"
        }
    }
})



//function  to show right answer when time runs out
function showrightanswer() {
    let rightanswer = currentarray[randomnumber].correctIndex;
    optionslist.forEach((option) => {
        if (option.getAttribute("data-option") == rightanswer) {
            option.classList.add("right");
        }
        option.classList.add("clicked");
    })



}

//when page loads show a beginner question 
const displayquestions = () => {

  //display from beginner question
    if (question < 3) {
      
        currentarray = beginnerarray
        randomnumber = Math.floor(Math.random() * beginnerarray.length);
        questiondisplay.textContent = beginnerarray[randomnumber].question;
        optionslist.forEach((option, index) => {
            option.textContent = beginnerarray[randomnumber].answers[index];
            img.src = `${beginnerarray[randomnumber].url}`;
        })


    }
    //display from intermediate question
    else if (question === 3 || question === 4) {


        currentarray = intermediatearray
        randomnumber = Math.floor(Math.random() * intermediatearray.length);
        questiondisplay.textContent = intermediatearray[randomnumber].question;
        optionslist.forEach((option, index) => {
            option.textContent = intermediatearray[randomnumber].answers[index];
            img.src = `${intermediatearray[randomnumber].url}`;
        })

    }
    //display from expert question
    if (question === 5) {
    
        currentarray = expertarray
        randomnumber = Math.floor(Math.random() * expertarray.length);
        questiondisplay.textContent = expertarray[randomnumber].question;
        optionslist.forEach((option, index) => {
            option.textContent = expertarray[randomnumber].answers[index];
            img.src = `${expertarray[randomnumber].url}`;
        })

      
    }
    //this to jump to end.html file
    if (question === 6) {
        //save score to local storage
        localStorage.setItem("currentscore",totalscore);
        //go to end page

        // window.location.href = "end.html"
        window.location.assign('./end.html')    
    }
    if (question < 6) {
        displayquestionnumber.textContent = question;
        progress.value = question;
    }

}
//function to remove the classlist(the red and green color on options)before displaying next question
const removeclasslist = () => {
    seconds.textContent = `20`;
    optionslist.forEach((option) => {
        option.classList.remove("clicked");
        option.classList.remove("right");
    })
}



