$(document).ready(function() {

  FlipClock.Lang.Polish = {
          'years'   : 'Lat',
          'months'  : 'Miesięcy',
          'days'    : 'Dni',
          'hours'   : 'Godziny',
          'minutes' : 'Minuty',
          'seconds' : 'Sekundy'    
      };
      FlipClock.Lang['pl']     = FlipClock.Lang.Polish;
      FlipClock.Lang['pl-pl']  = FlipClock.Lang.Polish;
      FlipClock.Lang['polish'] = FlipClock.Lang.Polish;

  // Grab the current date
  let currentDate = new Date();

  // Target future date/24 hour time/Timezone
  let targetDate = moment.tz("2025-09-17 18:27", "Europe/Warsaw"); // Hack for incorrect timezone handling? 

  // Calculate the difference in seconds between the future and current date
  let diff = targetDate / 1000 - currentDate.getTime() / 1000;

  if (diff <= 0) {
    // If remaining countdown is 0
    const el = document.querySelector('.clock');
    const clock = new FlipClock(el, 0, {
      clockFace: "DailyCounter",
      language:'pl-pl',
      countdown: true,
      autostart: false
    });
    console.log("Date has already passed!")
    
  } else {
    const el = document.querySelector('.clock');
    const clock = new FlipClock(el, diff, {
      clockFace: "DailyCounter",
      language:'pl-pl',
      countdown: true,
      callbacks: {
        stop: function() {
          console.log("Timer has ended!")
        }
      }
    });
    
    // Run countdown timer
    // Check when timer reaches 0, then stop at 0
    setTimeout(function() {
      checktime();
    }, 1000);
    
    function checktime() {
      t = clock.getTime();
      if (t <= 0) {
        clock.setTime(0);
      }
      setTimeout(function() {
        checktime();
      }, 1000);
    }
  }
});
