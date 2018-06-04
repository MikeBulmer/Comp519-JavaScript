// Created by Michael Bulmer
// For Assignment 2, Comp519
// Submitted 10th Nov 2017

'use strict';


function diceGame(){
    //IE8 and less support not required.
    var startButton = document.getElementById("startButton");
    startButton.addEventListener("click", setupGame);
    var diceInput = document.getElementById("numberOfDice");
    diceInput.addEventListener("change", setupGame);
    var continueButton = document.getElementById("continueButton");
    continueButton.addEventListener("click", playGame);
    var endButton= document.getElementById("endButton");
    endButton.addEventListener("click", endGame);

    var round = 0;
    var total = 0;
    var numberOfDice=0;
    var chartResults= [];

    //Hide the divs that are not currently needed.
    document.getElementById('play').style.display = "none";
    document.getElementById('end').style.display = "none";


    //Function that start the game on valid input being
    //present in the number of dice input.
    function setupGame()
    {
        numberOfDice = document.getElementById("numberOfDice").value;

        if (validateNumberOfDice(numberOfDice)) {
            //Hides setup div and shows play stage div.
            document.getElementById('setup').style.display = "none";
            document.getElementById('play').style.display = "block";
            playGame(numberOfDice);
        }
        else {
            document.getElementById('numberOfDice').focus();
            document.getElementById("numberOfDice").value = "";
            document.getElementById('labelNumberOfDice').innerHTML = "*You must enter a whole number between 3 and 6";
            document.getElementById('labelNumberOfDice').style.color = "red";
        }

    }

    //Returns true is input is valid.
    function validateNumberOfDice(input) {

        return (input% 1 === 0) && input>=3 && input<=6;
    }

    //Function that runs one round of the game.
    function playGame() {

        round ++;

        //Highs scores and round information are removed
        //while the dice are rolled to improve the playing experience.

        clearRoundResults();

        var dice = [];

        for (var i = 0; i < numberOfDice; i++) {

            dice.push(Math.floor((Math.random() * 6) + 1));
        }

        //Updates page with the score and round details.
        displayRolls(dice);
    }

    function clearRoundResults() {

        document.getElementById('round').innerHTML = "round: " ;
        document.getElementById('score').innerHTML = "score: " ;
        document.getElementById('totalScore').innerHTML = "total balance is: " ;
    }

    function outputRoundResults(dice) {

        document.getElementById('round').innerHTML = "round: " + round;
        document.getElementById('score').innerHTML = "score: " + calculateScore(dice);
        document.getElementById('totalScore').innerHTML = "total balance is: " + total;
    }

    function displayRolls(dice) {
        //Ensures the correct number of dice can been seen.
        //On page load all 6 dice are hidden.  This loop
        //unhides the correct number.  This only needs to run on round 1.
        if(round === 1) {

            for (var i = 0; i < dice.length; i++) {

                document.getElementById(getDiceImageID(i+1)).style.display = "block";
            }
        }
        animateDice(dice);
    }


    function animateDice(dice) {
        //Buttons are disable during rolling as it makes not sense for
        //the player to start the next round until the results of this
        //round are displayed.
        document.getElementById('continueButton').disabled = true;
        document.getElementById('endButton').disabled = true;

        //animation variables.  setInterval fuction
        //setInterval function learned about using the resource from
        //w3school https://www.w3schools.com/js/tryit.asp?filename=tryjs_dom_animate_3
        var gap = 100;
        var loop = 0;
        var id = setInterval(changeDice, gap);

        function changeDice() {
            loop ++;
            //The number of times the dice should animate.
            if (loop === 5)
            {
                for (var a = 0; a < dice.length; a++) {

                    document.getElementById(getDiceImageID(a+1)).src = getDiceImageFileName(dice[a]);
                }
                //Enables the buttons so the user can again advance the program.
                document.getElementById('continueButton').disabled = false;
                document.getElementById('endButton').disabled = false;
                outputRoundResults(dice);
                //Stops the animation.
                clearInterval(id);
            }
            else {
                for (var i = 0; i < dice.length; i++) {
                    document.getElementById(getDiceImageID(i+1)).src = getRandomDice();

                }
            }
        }

    }

    //Returns the url of a random dice face image
    function getRandomDice() {
        var number = (Math.floor((Math.random() * 6) + 1));
        return "images/dice" + number+ ".png";
    }


    function getDiceImageID(i) {

        return "dice"+i;
    }

    function getDiceImageFileName(i) {

        return "images/dice"+i+".png";
    }

    function calculateScore(dice) {

        var scoreDice = dice.slice();
        var totalOfDice = 0;
        var roundscore = 0;
        var matchingValues = 0;

        //Starts on negative one as each end value with be compared with itself.

        var matchingValuesLeft = -1;
        var matchingValuesRight = -1;
        var uniqueNumbers = true;

        //Numberic sort of arrays technique from w3schools
        //https://www.w3schools.com/js/js_array_sort.asp

        scoreDice.sort(function(a, b){return a - b;});

        for (var i = 0; i < scoreDice.length; i++) {

            totalOfDice += scoreDice[i];
            //After the array is sorted we can look at numbers of either end to determine
            //how many dice of the same value have been rolled.
            if ( scoreDice[0] === scoreDice[i] ) {

                matchingValuesLeft++  ;
            }
            if ( scoreDice[scoreDice.length-1] === scoreDice[i] ) {

                matchingValuesRight++  ;
            }
            if (scoreDice[i]==scoreDice[i+1]){
                uniqueNumbers = false;
            }
        }

        //select the hightest number of matching values
        //Note the matching values number is only looking for equality with the
        //numbers on the end of the sorted array.  To know if all numbers differ the
        //uniqueNumbers value is used.
        matchingValues = (matchingValuesLeft>=matchingValuesRight)?matchingValuesLeft:matchingValuesRight;

        //Logic to test for a run.
        //If there had not been matching values then (the total - (the smallest * n))
        //must be a trianglar number for there to be a run.
        if (uniqueNumbers &&
            ((totalOfDice - (scoreDice[0]) * scoreDice.length)) === (scoreDice.length - 1.0) * scoreDice.length/2.0 ) {

            console.log( "it's a run" );
            roundscore += 20 + totalOfDice;
        }

        else if (uniqueNumbers) {
            roundscore += totalOfDice;
            console.log("all numbers differ");
        }
        else if(matchingValues === scoreDice.length -1) {

            roundscore += 60 + totalOfDice;
            console.log("bonus all the same");
        }

        else if (matchingValues === scoreDice.length-2) {

            roundscore += 40 + totalOfDice;
            console.log("bonus nearly all the same");
        }


        total += roundscore;
        console.log(scoreDice +"\tscores\t" + roundscore +"\t matching vlaues"  +matchingValues);
        chartResults.push(roundscore);

        return roundscore;
    }

    function endGame() {
        document.getElementById('play').style.display = "none";
        document.getElementById('end').style.display = "block";
        document.getElementById('end').style.height = "500px";
        var averageScore = total/round;
        document.getElementById('endRound').innerHTML = "Number of Rounds Played: " + round;
        document.getElementById('endTotal').innerHTML = "Total Number of Points: " + total ;
        document.getElementById('endAverage').innerHTML = "Average Score: " + averageScore.toFixed(2);
        drawChart(chartResults);
    }

    function drawChart( arrayin ) {
        //I learn about the HTML5 canvas from
        //https://www.w3schools.com/html/html5_canvas.asp
        //https://www.w3schools.com/html/html5_canvas.asp
        var xsize = 270;
        var ysize = 270;
        var canvasOb = document.getElementById('myCanvas');
        var canvas = canvasOb.getContext('2d');
        var results = arrayin;
        var totalOfResults = 0;

        //While total results has already been calculated else where
        //I calucaute it again so that the chart function is encapulated.

        for (var i = 0; i < results.length; i++) {
            totalOfResults += results[i];
        }

        //The chart will fill no matter the length of array inputted.

        var yIncrementFactor= ysize/totalOfResults;
        var xIncrement = xsize/results.length;

        //axis 0,0
        var x= 20;
        var y= 280;

        canvas.beginPath();
        drawAxis();
        drawGrid();

        function drawAxis() {
            canvas.strokeStyle = '#fff';
            //Back to 0,0
            canvas.moveTo(x,y);
            //Drawing y axis
            canvas.lineTo(x,10);
            canvas.stroke();
            //Back to 0,0
            canvas.moveTo(x,y);
            //Drawing x axis
            canvas.lineTo(xsize+20,y);
            canvas.stroke();

            canvas.moveTo(x,y);
            canvas.closePath();
        }

        function drawGrid() {
            canvas.strokeStyle = '#eee';
            canvas.moveTo(x+xIncrement,y);

            var limit = xsize/xIncrement+1;
            for (var i = 1; i < limit; i++) {
                canvas.moveTo(x+(xIncrement * i),y);
                canvas.lineTo(x+(xIncrement * i),10);
                canvas.stroke();
            }
            canvas.font = '8pt Calibri';
            canvas.fillText('Rounds -->',25 , 290);

        }

        canvas.beginPath();
        canvas.moveTo(x,y);
        for (var a = 0; a < results.length; a++) {
            drawline(xIncrement, results[a]);
        }

        function drawline(xIncrement, amplitude) {
            // var lineX = x;
            // var lineY = y;

            canvas.strokeStyle = '#ff2222';
            //alert(xIncrement+" "+ amplitude)
            x += xIncrement;
            y -= yIncrementFactor * amplitude;
            //alert(x+ " " +y +"xy")
            canvas.lineTo(x,y);
            canvas.stroke();
        }
    }
}
diceGame();
