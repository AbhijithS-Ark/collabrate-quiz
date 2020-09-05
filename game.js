//grab all
const seconds = document.querySelector(".timerseconds");
let countdown = 30;
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
                    console.log("here");
                    //remove previous question from array
                    currentarray.splice(randomnumber,1);
                    displayquestions();
                    removeclasslist();
                    countdown = 30;
                    countdowntimer();
                }, 2000)
            }
        }
        if (countdown < 11) {
            seconds.classList.add("lowontime");
        }
    }, 1000)
}
countdowntimer();
//fetch all questions from json file and store them in array
//function to fetch beginner question 
fetch("beginner.json")

    .then((data) => {
        return data.json();
    }).then((data) => {
        beginnerarray = data.questions;

        displayquestions();

    })

//function to fetch intermediate questions
fetch("intermediate.json")

    .then((data) => {
        return data.json();
    }).then((data) => {
        intermediatearray = data.questions;

    })

//function to fetch expert questions
fetch("expert.json")

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
                countdown = 31;
                seconds.classList.remove("lowontime");
                countdowntimer();
                removeclasslist(option);
                //remove previous question from array
                currentarray.splice(randomnumber,1);
                displayquestions();
            }, 2000)

        }
        else {
            console.log("this faltu");
            //jump to end html file which is to be created
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
        console.log(question);
        currentarray = beginnerarray
        randomnumber = Math.floor(Math.random() * beginnerarray.length);
        questiondisplay.textContent = beginnerarray[randomnumber].question;
        optionslist.forEach((option, index) => {
            option.textContent = beginnerarray[randomnumber].answers[index];
            img.src = `${beginnerarray[randomnumber].url}`;
        })

        console.log(currentarray);
    }
    //display from intermediate question
    else if (question === 3 || question === 4) {

        console.log("here");
        currentarray = intermediatearray
        randomnumber = Math.floor(Math.random() * intermediatearray.length);
        questiondisplay.textContent = intermediatearray[randomnumber].question;
        optionslist.forEach((option, index) => {
            option.textContent = intermediatearray[randomnumber].answers[index];
            img.src = `${intermediatearray[randomnumber].url}`;
        })
        console.log({ question });
    
        console.log(currentarray);
    }
    //display from expert question
    if (question === 5) {
        console.log(question);
        currentarray = expertarray
        randomnumber = Math.floor(Math.random() * expertarray.length);
        questiondisplay.textContent = expertarray[randomnumber].question;
        optionslist.forEach((option, index) => {
            option.textContent = expertarray[randomnumber].answers[index];
            img.src = `${expertarray[randomnumber].url}`;
        })

        console.log(currentarray);
    }
    //this to jump to end.html file
    if (question === 6) {
        //go to end page
        console.log("triggered");
        // window.location.href = "end.html"

        //delete this later
        alert("now jump to end.html")
    }
    if (question < 6) {
        displayquestionnumber.textContent = question;
        progress.value = question;
    }

}
//function to remove the classlist(the red and green color on options)before displaying next question
const removeclasslist = () => {
    optionslist.forEach((option) => {
        option.classList.remove("clicked");
        option.classList.remove("right");
    })
}



