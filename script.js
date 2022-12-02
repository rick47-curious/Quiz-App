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

let mainContainer = document.getElementsByClassName("container").item(0);
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
        document.getElementsByClassName("bold-text").item(6).innerHTML = ((totalCorrectResponse/totalQuestions)*100).toString()+"%";
    }
    //Counter/Timer to count seconds elapsed per question
    const startTimer = (payload)=>{
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

    const validateAnswer = (payload,flag=true)=>{
        if(flag){
        //let optionButtons = document.getElementsByClassName("quiz-container").item(0).getElementsByClassName("grp-btns").item(0);
        let optionButtons = document.querySelector(".quiz-container > .grp-btns");
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
    }
    }
    const proceedNext = (payload,flag=true)=>{
        if (flag){
        counter+=1;
        }
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
            .addEventListener('click',()=>redirectToHomepage(payload));

            document.getElementsByClassName("result-container").item(0).getElementsByClassName("regular-btn").item(0).addEventListener("click",()=>restartQuiz(payload));
        }
        points=0; 
        totalTime = 10; 
        }
    

    const launchQuiz = (payload,flag=true)=>{
        //Hide the Homepage
        document.getElementsByClassName("container").item(0).style.display = "none";
        //Show the empty quiz container
        document.getElementsByClassName("quiz-container").item(0).style.display = "block";
        //Reset the score
        document.getElementById("score").innerHTML = "0";
        //Display first question
        displayContent(counter,payload);
        startTimer(payload);
        
        //Validate the answer chosen
        if (flag){
        validateAnswer(payload);
        }
        //Action upon clicking on next button
        document.getElementById("next").addEventListener('click',()=>proceedNext(payload,flag));    
        
    }  
    const redirectToHomepage = ()=>{
        totalTime = 10;
        counter=0;
        totalWrongAttempt = 0;
        totalCorrectResponse = 0;
        totalTimeSpent = 0;
        attemptCounter = 0;
        // Reload the page
        location.reload();
    }

    const restartQuiz = (payload)=>{
        totalTime = 10;
        counter=0;
        totalWrongAttempt = 0;
        totalCorrectResponse = 0;
        totalTimeSpent = 0;
        attemptCounter = 0;
        launchQuiz(payload,false);
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
    //Payload for Probability section
    let payloadSection2 = [
        {
            "question":"Tickets numbered 1 to 20 are mixed up and then a ticket is drawn at random. What is the probability that the ticket drawn has a number which is a multiple of 3 or 5?",
            "option1":"1/2",
            "option2":"2/5",
            "option3":"8/15",
            "option4":"9/20",
            "answer":"9/20"  
        },
        {
            "question":"A bag contains 2 red, 3 green and 2 blue balls. Two balls are drawn at random. What is the probability that none of the balls drawn is blue?",
            "option1":"10/21",
            "option2":"11/21",
            "option3":"2/7",
            "option4":"5/7",
            "answer":"10/21"
        },
        {
            "question":"In a box, there are 8 red, 7 blue and 6 green balls. One ball is picked up randomly. What is the probability that it is neither red nor green?",
            "option1":"1/3",
            "option2":"3/4",
            "option3":"7/19",
            "option4":"8/21",
            "answer":"9/21" 
        },
        {
            "question":"What is the probability of getting a sum 9 from two throws of a dice?",
            "option1":"1/6",
            "option2":"1/8",
            "option3":"1/9",
            "option4":"1/12",
            "answer":"1/9"  
        },
        {
            "question":"Three unbiased coins are tossed. What is the probability of getting at most two heads?",
            "option1":"3/4",
            "option2":"1/4",
            "option3":"3/8",
            "option4":"7/8",
            "answer":"7/8" 
        },
        {
            "question":"Two dice are thrown simultaneously. What is the probability of getting two numbers whose product is even?",
            "option1":"1/2",
            "option2":"3/4",
            "option3":"3/8",
            "option4":"5/16",
            "answer":"3/4" 
        },
        {
            "question":"In a class, there are 15 boys and 10 girls. Three students are selected at random. The probability that 1 girl and 2 boys are selected, is:",
            "option1":"21/46",
            "option2":"25/117",
            "option3":"1/50",
            "option4":"3/25",
            "answer":"21/46" 
        },
        {
            "question":"In a lottery, there are 10 prizes and 25 blanks. A lottery is drawn at random. What is the probability of getting a prize?",
            "option1":"1/10",
            "option2":"2/5",
            "option3":"2/7",
            "option4":"5/7",
            "answer":"2/7" 
        },
        {
            "question":"From a pack of 52 cards, two cards are drawn together at random. What is the probability of both the cards being kings?",
            "option1":"1/15",
            "option2":"25/57",
            "option3":"35/256",
            "option4":"1/221",
            "answer":"1/221" 
        },
        {
            "question":"Two dice are tossed. The probability that the total score is a prime number is:",
            "option1":"1/6",
            "option2":"5/12",
            "option3":"1/2",
            "option4":"7/9",
            "answer":"5/12" 
        }
    ];
    //Payload for Problems on Ages section
    let payloadSection3 = [
        {
            "question":"Father is aged three times more than his son Ronit. After 8 years, he would be two and a half times of Ronit's age. After further 8 years, how many times would he be of Ronit's age?",
            "option1":"2 times",
            "option2":"5/2 times",
            "option3":"11/4 times",
            "option4":"3 times",
            "answer":"2 times"  
        },
        {
            "question":"The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
            "option1":"4 years",
            "option2":"8 years",
            "option3":"10 years",
            "option4":"None of these",
            "answer":"4 years"
        },
        {
            "question":`A father said to his son, "I was as old as you are at the present at the time of your birth". If the father's age is 38 years now, the son's age five years back was:`,
            "option1":"14 years",
            "option2":"19 years",
            "option3":"33 years",
            "option4":"38 years",
            "answer":"14 years" 
        },
        {
            "question":"A is two years older than B who is twice as old as C. If the total of the ages of A, B and C be 27, then how old is B?",
            "option1":"7",
            "option2":"8",
            "option3":"9",
            "option4":"10",
            "answer":"10"  
        },
        {
            "question":"Present ages of Sameer and Anand are in the ratio of 5 : 4 respectively. Three years hence, the ratio of their ages will become 11 : 9 respectively. What is Anand's present age in years?",
            "option1":"24",
            "option2":"27",
            "option3":"40",
            "option4":"CND",
            "answer":"24" 
        },
        {
            "question":"A man is 24 years older than his son. In two years, his age will be twice the age of his son. The present age of his son is:",
            "option1":"14 years",
            "option2":"18 years",
            "option3":"20 years",
            "option4":"22 years",
            "answer":"22 years" 
        },
        {
            "question":"Six years ago, the ratio of the ages of Kunal and Sagar was 6 : 5. Four years hence, the ratio of their ages will be 11 : 10. What is Sagar's age at present?",
            "option1":"16 years",
            "option2":"18 years",
            "option3":"20 years",
            "option4":"CND",
            "answer":"16 years" 
        },
        {
            "question":`The sum of the present ages of a father and his son is 60 years. Six years ago, father's age was five times the age of the son. After 6 years, son's age will be:`,
            "option1":"12 years",
            "option2":"14 years",
            "option3":"18 years",
            "option4":"20 years",
            "answer":"20 years" 
        },
        {
            "question":"At present, the ratio between the ages of Arun and Deepak is 4 : 3. After 6 years, Arun's age will be 26 years. What is the age of Deepak at present ?",
            "option1":"12 years",
            "option2":"15 years",
            "option3":"19 and half",
            "option4":"21 years",
            "answer":"15 years" 
        },
        {
            "question":"Sachin is younger than Rahul by 7 years. If their ages are in the respective ratio of 7 : 9, how old is Sachin?",
            "option1":"16 years",
            "option2":"18 years",
            "option3":"28 years",
            "option4":"24.5 years",
            "answer":"24.5 years" 
        }
    ];
    //Payload for Profit and loss section
    let payloadSection4 = [
        {
            "question":"Alfred buys an old scooter for Rs. 4700 and spends Rs. 800 on its repairs. If he sells the scooter for Rs. 5800, his gain percent is:",
            "option1":"32/7%",
            "option2":"60/11%",
            "option3":"10%",
            "option4":"12%",
            "answer":"60/11%"  
        },
        {
            "question":"The cost price of 20 articles is the same as the selling price of x articles. If the profit is 25%, then the value of x is:",
            "option1":"15",
            "option2":"16",
            "option3":"18",
            "option4":"25",
            "answer":"16"
        },
        {
            "question":`If selling price is doubled, the profit triples. Find the profit percent.`,
            "option1":"200/3",
            "option2":"100",
            "option3":"316/3",
            "option4":"120",
            "answer":"100" 
        },
        {
            "question":"In a certain store, the profit is 320% of the cost. If the cost increases by 25% but the selling price remains constant, approximately what percentage of the selling price is the profit?",
            "option1":"30%",
            "option2":"70%",
            "option3":"100%",
            "option4":"250%",
            "answer":"70%"  
        },
        {
            "question":"A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?",
            "option1":"3",
            "option2":"4",
            "option3":"5",
            "option4":"6",
            "answer":"5" 
        },
        {
            "question":"The percentage profit earned by selling an article for Rs. 1920 is equal to the percentage loss incurred by selling the same article for Rs. 1280. At what price should the article be sold to make 25% profit?",
            "option1":"Rs2000",
            "option2":"Rs2200",
            "option3":"Rs2400",
            "option4":"Data inadequate",
            "answer":"Rs2000" 
        },
        {
            "question":"A shopkeeper expects a gain of 22.5% on his cost price. If in a week, his sale was of Rs. 392, what was his profit?",
            "option1":"Rs18.20",
            "option2":"Rs70",
            "option3":"Rs72",
            "option4":"Rs88.25",
            "answer":"Rs72" 
        },
        {
            "question":`A man buys a cycle for Rs. 1400 and sells it at a loss of 15%. What is the selling price of the cycle?`,
            "option1":"Rs1090",
            "option2":"Rs1160",
            "option3":"Rs1190",
            "option4":"Rs1202",
            "answer":"Rs1190" 
        },
        {
            "question":"Sam purchased 20 dozens of toys at the rate of Rs. 375 per dozen. He sold each one of them at the rate of Rs. 33. What was his percentage profit?",
            "option1":"3.5",
            "option2":"4.5",
            "option3":"5.6",
            "option4":"6.5",
            "answer":"5.6" 
        },
        {
            "question":"Some articles were bought at 6 articles for Rs. 5 and sold at 5 articles for Rs. 6. Gain percent is:",
            "option1":"33%",
            "option2":"33.33%",
            "option3":"35%",
            "option4":"44%",
            "answer":"44%" 
        }
    ];

document.getElementById("section1").addEventListener('click',()=>launchQuiz(payloadSection1));
document.getElementById("section2").addEventListener('click',()=>launchQuiz(payloadSection2));
document.getElementById("section3").addEventListener('click',()=>launchQuiz(payloadSection3));
document.getElementById("section4").addEventListener('click',()=>launchQuiz(payloadSection4));
