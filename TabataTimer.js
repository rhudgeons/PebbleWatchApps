//===============================================================
// Name: Tabata Timer
// This is a timer that runs for 8 rounds with 20sec of work
// with 10sec of rest.
//
// TODO:
// 1) vibrate only once after 20sec of work/10sec of rest is done
//    to notify user to either stop/start working
//
// 2) make a full blown customizable interval timer where user
//    where user can manually set their own interval
//===============================================================
var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');

var tabata = {workTime:20, restTime:10, roundNumber:1};
var tabataTimer;// setInterval(counter, 1000);
var NUM_ROUNDS = 8;
var element;
var timerWindow;

//menu screen that shows on start up
//TODO: change subtitle and body text
var titles = new UI.Card({
  title: 'Tabata Timer',
  subtitle: "Round #" + tabata.roundNumber,
  body: ":" + tabata.workTime,
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

//display startup screen
titles.show();

//setup click event handlers
titles.on('click', 'up', function(e) {
  //start timer and setup new window to display time
  tabataTimer = setInterval(counter, 1000);
  timerWindow = new UI.Window();
  element = new UI.Text({ 
    position: new Vector2(0, 0), 
    size: new Vector2(144, 168),
    text: "Round #" + tabata.roundNumber + "\n" + tabata.workTime + " sec",
    textAlign: 'center',
    font: 'bitham-42-bold'
  });
  timerWindow.add(element);
  timerWindow.show();
});


//=======================================================
//purpose: reset workTime and restTime tabata variables
//=======================================================
function reset(roundNum)
{
   tabata.workTime = 21;
   tabata.restTime = 11;
  
   if(roundNum)
      tabata.roundNumber = 1;
}

//==================================================================
//purpose: counts down work and rest time and keeps up with rounds
//==================================================================
function counter()
{
   //starting 20sec of work period
   if(tabata.workTime > 0)
   {
      tabata.workTime--;
      element.text("Round #" + tabata.roundNumber + "\n" + tabata.workTime + " sec");
   }

   //starting 10sec rest period after the 20sec work period
   else if(tabata.workTime === 0)
   {
      Vibe.vibrate('short');
      tabata.restTime--;
      element.text("Round #" + tabata.roundNumber + "\n" + tabata.restTime + " sec");
     
	    //increment rounds and restart the countdown; repeat 8 times
      if(tabata.restTime === 0)
      {
         Vibe.vibrate('short');
	       tabata.roundNumber++;
         element.text("Round #" + tabata.roundNumber + "\n" + tabata.workTime + " sec");
         if(tabata.roundNumber <= NUM_ROUNDS)
         {
            reset(false);
            clearInterval(tabataTimer);
            tabataTimer = 0;
            tabataTimer = setInterval(counter, 1000);
         }
		 
		     else
         {
            element.text("Finished!");
		        clearInterval(tabataTimer);
            tabataTimer = 0;
         }
      }
   }
}
