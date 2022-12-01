let username;
let totalTime = 10;
let totalQuestions = 10;
let displayTime;
let totalWrongAttempt;
let points = 0;  
let counter=0;
let attemptCounter = 0;
let totalTimeSpent = 0; 
let totalCorrectResponse = 0;

// Capture the userinput from the Hompage
document.getElementsByTagName("form").item(0).addEventListener('submit',(e)=>{
        e.preventDefault();    
        username = document.getElementById("username").value;
        if (username==""){
            alert("Please enter your name!");
        }else{
            document.getElementById("category").style.display = "block";
        }
        document.getElementById("username").value = "";

    });
    //Method to display content in the quiz page
    const displayContent = (index,section)=>{

        //Display question index
        document.getElementsByClassName("questionNo").item(0).innerHTML = "Question-"+(index+1);
        //Display question text
        document.getElementById("questionText").innerHTML = section[index].question;
        //Display options
        let optionButtons = document.getElementsByClassName("quiz-container").item(0).getElementsByClassName("grp-btns").item(0);
        //Display option 1
        optionButtons.getElementsByTagName("button").item(0).innerHTML = section[index].option1;
        //Display option 2
        optionButtons.getElementsByTagName("button").item(1).innerHTML = section[index].option2;
        //Display option 3
        optionButtons.getElementsByTagName("button").item(2).innerHTML = section[index].option3;
        //Display option 4
        optionButtons.getElementsByTagName("button").item(3).innerHTML = section[index].option4;
    }
    //Method to add score after each question
    const addScore = (score)=>{
        console.log("score received:",score);
        let originalValue = parseInt(document.getElementById("score").innerHTML);
        document.getElementById("score").innerHTML = originalValue + score;
    }
    //Method to display result in the result page
    const displayResult = (totalCorrectResponse,totalWrongAttempt,totalTimeSpent,totalAttempt)=>{
        //Display username
        document.getElementsByClassName("bold-text").item(0).innerHTML = username;
        //Display totalTimetaken
        document.getElementsByClassName("bold-text").item(1).innerHTML = totalTimeSpent;
        //Display Total attempt
        document.getElementsByClassName("bold-text").item(3).innerHTML = totalAttempt;
        //Total Correct response
        document.getElementsByClassName("bold-text").item(4).innerHTML = totalCorrectResponse;
        //Total Wrong response
        document.getElementsByClassName("bold-text").item(5).innerHTML = totalWrongAttempt;
        //Total Percentage
        const regEx = new RegExp("^.[0-9]{0,2}$")
        document.getElementsByClassName("bold-text").item(6).innerHTML = ((totalCorrectResponse/totalQuestions)*100).toString()+"%";
    }
    //Counter/Timer to count seconds elapsed per question
    const startTimer = (payload)=>{
        console.log("Start timer triggered!");
        displayTime = setInterval(()=>{
            let timerSpan = document.getElementById("timer").getElementsByTagName("span").item(0);
            timerSpan.innerHTML = (totalTime <10)?"0"+totalTime:totalTime;
            //If timer runs out, switch to next question reset timer
            if (totalTime==0){
                    counter+=1;
                    if (counter >=10){  
                        //If total time is spent and no attempt was made show a default screen
                        document.getElementsByClassName("quiz-container").item(0).style.display = "none";
                        //Display the result section
                        document.getElementsByClassName("result-container").item(0).style.display = "block";
                        stopTimer();
                    }
                if (counter<10){
                    displayContent(counter,payload);
                }
                    
                //Total time exhausted is added 
                totalTimeSpent +=10;
                //Reset the timer
                totalTime = 10;
                }
            totalTime-=1;
        },1000);
    };
    const stopTimer = ()=>clearInterval(displayTime);

    const validateAnswer = (payload)=>{
        let optionButtons = document.getElementsByClassName("quiz-container").item(0).getElementsByClassName("grp-btns").item(0);
    
    //If option 1 is clicked
    optionButtons.getElementsByTagName("button").item(0).addEventListener('click',()=>{
        //Increasing the attempt count if user selects a answer
        attemptCounter+=1;
        if (optionButtons.getElementsByTagName("button").item(0).innerHTML == payload[counter].answer){
            points+=1;      
        }
    });
    //If option 2 is clicked
    optionButtons.getElementsByTagName("button").item(1).addEventListener('click',()=>{
        //Increasing the attempt count if user selects a answer
        attemptCounter+=1;
        if (optionButtons.getElementsByTagName("button").item(1).innerHTML == payload[counter].answer){
            points+=1;
        }
    });
    //If option 3 is clicked
    optionButtons.getElementsByTagName("button").item(2).addEventListener('click',()=>{
        //Increasing the attempt count if user selects a answer
        attemptCounter+=1;
        if (optionButtons.getElementsByTagName("button").item(2).innerHTML === payload[counter].answer){
            points+=1;
        }

    });
    //If option 4 is clicked
    optionButtons.getElementsByTagName("button").item(3).addEventListener('click',()=>{
        //Increasing the attempt count if user selects a answer
        attemptCounter+=1;
        if (optionButtons.getElementsByTagName("button").item(3).innerHTML === payload[counter].answer){
            points+=1;
        }
        });
        //points = (points>=2)?points-1:1;
    }
    const proceedNext = (payload)=>{
        counter+=1;
        addScore(points);
        //Storing the point if correct answer was received
        totalCorrectResponse = totalCorrectResponse + ((points==1)?1:0);
        //Storing the total time taken so far
        totalTimeSpent +=(10-totalTime);
        // Display content only till the last question in the list
        if (counter<payload.length){
            displayContent(counter,payload);
        }else{
            // Clear the timer
            stopTimer();
            totalWrongAttempt = attemptCounter - totalCorrectResponse;
            //Hide the question area
            document.getElementsByClassName("quiz-container").item(0).style.display = "none";
            //Display the result section
            document.getElementsByClassName("result-container").item(0).style.display = "block";
            //Show the result upon next click
            displayResult(totalCorrectResponse,totalWrongAttempt,totalTimeSpent,attemptCounter);

            document.getElementsByClassName("result-container").item(0).getElementsByClassName("regular-btn").item(1)
            .addEventListener('click',()=>redirectToHomepage());

            document.getElementsByClassName("result-container").item(0).getElementsByClassName("regular-btn").item(0).addEventListener("click",()=>restartQuiz(payload));
        }
        points=0; 
        totalTime = 10; 
    }

    const launchQuiz = (payload)=>{
        
        //Hide the Homepage
        document.getElementsByClassName("container").item(0).style.display = "none";
        //Show the empty quiz container
        document.getElementsByClassName("quiz-container").item(0).style.display = "block";
        //Display first question
        displayContent(counter,payload);
        startTimer(payload);
        
        //Validate the answer chosen
        validateAnswer(payload);
        //Action upon clicking on next button
        document.getElementById("next").addEventListener('click',()=>proceedNext(payload));    
        
    }

   
    const redirectToHomepage = ()=>{
        document.getElementsByClassName("result-container").item(0).style.display = "none";
        document.getElementsByClassName("container").item(0).style.display = "block";
        document.getElementById("category").style.display = "none";
        
        totalTime = 10;
        counter=0;
        totalWrongAttempt = 0;
        totalCorrectResponse = 0;
        totalTimeSpent = 0;
        attemptCounter = 0;

    }

    const restartQuiz = (payload)=>{
        totalTime = 10;
        counter=0;
        totalWrongAttempt = 0;
        totalCorrectResponse = 0;
        totalTimeSpent = 0;
        attemptCounter = 0;
        
        launchQuiz(payload);

    }

    //Payload for Pipe and Cistern section
    let payloadSection1 = [
        {
            "question":"Three pipes A, B and C can fill a tank from empty to full in 30 minutes, 20 minutes, and 10 minutes respectively. When the tank is empty, all the three pipes are opened. A, B and C discharge chemical solutions P,Q and R respectively. What is the proportion of the solution R in the liquid in the tank after 3 minutes?",
            "option1":"5/11",
            "option2":"6/11",
            "option3":"7/11",
            "option4":"8/11",
            "answer":"6/11"
        },
        {
            "question":"Pipes A and B can fill a tank in 5 and 6 hours respectively. Pipe C can empty it in 12 hours. If all the three pipes are opened together, then the tank will be filled in:",
            "option1":"30/17 hours",
            "option2":"30/11 hours",
            "option3":"60/17 hours",
            "option4":"9/2 hours",
            "answer":"60/17 hours"  
        },
        {
            "question":"A pump can fill a tank with water in 2 hours. Because of a leak, it took 2 hours to fill the tank. The leak can drain all the water of the tank in:",
            "option1":"13/3 hours",
            "option2":"7 hours",
            "option3":"8 hours",
            "option4":"14 hours",
            "answer":"14 hours" 
        },
        {
            "question":"Two pipes A and B can fill a cistern in 37 minutes and 45 minutes respectively. Both pipes are opened. The cistern will be filled in just half an hour, if the B is turned off after:",
            "option1":"5 min",
            "option2":"9 min",
            "option3":"10 min",
            "option4":"15 min",
            "answer":"9 min"    
        },
        {
            "question":"A tank is filled by three pipes with uniform flow. The first two pipes operating simultaneously fill the tank in the same time during which the tank is filled by the third pipe alone. The second pipe fills the tank 5 hours faster than the first pipe and 4 hours slower than the third pipe. The time required by the first pipe is:",
            "option1":"6 hours",
            "option2":"10 hours",
            "option3":"15 hours",
            "option4":"30 hours",
            "answer":"15 hours"  
        },
        {
            "question":"Two pipes can fill a tank in 20 and 24 minutes respectively and a waste pipe can empty 3 gallons per minute. All the three pipes working together can fill the tank in 15 minutes. The capacity of the tank is:",
            "option1":"60 gallons",
            "option2":"100 gallons",
            "option3":"120 gallons",
            "option4":"180 gallons",
            "answer":"120 gallons" 
        },
        {
            "question":"A tank is filled in 5 hours by three pipes A, B and C. The pipe C is twice as fast as B and B is twice as fast as A. How much time will pipe A alone take to fill the tank?",
            "option1":"20 hours",
            "option2":"25 hours",
            "option3":"35 hours",
            "option4":"Cannot be determined",
            "answer":"Cannot be determined" 
        },
        {
            "question":"Two pipes A and B together can fill a cistern in 4 hours. Had they been opened separately, then B would have taken 6 hours more than A to fill the cistern. How much time will be taken by A to fill the cistern separately?",
            "option1":"1 hour",
            "option2":"2 hours",
            "option3":"6 hours",
            "option4":"8 hours",
            "answer":"6 hours" 
        },
        {
            "question":"Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both the pipes are used together, then how long will it take to fill the tank?",
            "option1":"12 min",
            "option2":"15 min",
            "option3":"25 min",
            "option4":"50 min",
            "answer":"12 min"    
        },
        {
            "question":"Two pipes A and B can fill a tank in 15 minutes and 20 minutes respectively. Both the pipes are opened together but after 4 minutes, pipe A is turned off. What is the total time required to fill the tank?",
            "option1":"10 min 20 sec",
            "option2":"11 min 45 sec",
            "option3":"12 min 30 sec",
            "option4":"14 min 40 sec",
            "answer":"14 min 40 sec"  
        }
    ];
document.getElementById("section1").addEventListener('click',()=>launchQuiz(payloadSection1));
// document.getElementById("section2").addEventListener('click',launchQuiz(payloadSection1));
// document.getElementById("section3").addEventListener('click',launchQuiz(payloadSection1));
// document.getElementById("section4").addEventListener('click',launchQuiz(payloadSection1));