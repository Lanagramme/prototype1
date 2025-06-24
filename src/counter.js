let Counters = [
  {
    event: "Evelyne's birthday",
    countdown : 9
  }
]

let Events = [
  { event: "Special", date: 3 },
  { event: "Special", date: 6 },
  { event: "Special", date: 9 },
  { event: "Special", date: 12 },
  { event: "Special", date: 15 },
]

const numerator = (num) => {
  const strNum = String(num);
  const lastDigit = +strNum.slice(-1);
  const lastTwoDigits = +strNum.slice(-2);

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return "th";

  switch (lastDigit) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

export function setupCalendar(dayCounter, tomorrow, actionCounter, Event) {
  // init
  let Today = 0
  let actionsLeft = 5
  let dices = document.getElementsByClassName("die")

  for (let i=0; i<5; i++) {
    const act = (i)=> {
      if (dices[i].innerHTML == "") return
      dices[i].innerHTML = ""
      do_action()
    }
    dices[i].addEventListener('click', () => act(i) )
  }

  const updateActionCounter = () => {
    actionCounter.innerHTML = `Actions left ${actionsLeft}`;
  };

  const newDices =()=> {
    for(let die of dices) {
      die.innerHTML = Math.floor(Math.random() * 6) + 1; 
    }
  }

  const do_action = () => {
    if (actionsLeft > 0) {
      actionsLeft -= 1
      actionCounter.innerHTML = `Actions left ${actionsLeft}`
      updateActionCounter()
    }
  }
  const newDay = (count) => {
    // init
    newDices()
    Today = count
    actionsLeft = 5
    dayCounter.innerHTML = `Today is ${Today}`
    updateActionCounter()
    Event.innerHTML = ""

    // event handler by date
    document.querySelector('.futur_event').innerHTML = ""
    Events.forEach(event => {
      if (event.date > Today){
        let cal_event = document.createElement('div')
        cal_event.innerHTML = `${event.event} the ${event.date} ${numerator(event.date)}`
        document.querySelector('.futur_event').append(cal_event)
      }
      if (event.date == Today) {
        if (Event.innerHTML === "") {
          Event.innerHTML = "Today is " + event.event;
        } else {
          Event.innerHTML += "<br>Today is " + event.event;
        }
      }
    })

    // event handler by countdown
    document.querySelector('.incomming_event').innerHTML = ""
    Counters.forEach(event => {
      if (event.countdown != -1){ event.countdown -= 1
        if (event.countdown > 0){
          let cal_event = document.createElement('div')
          cal_event.innerHTML = `${event.event} in ${event.countdown} days`
          document.querySelector('.incomming_event').append(cal_event)
        }
        if (event.countdown == 0) { 
            // Event.innerHTML = Event.innerHTML + "<br>" + event.event 
          if (Event.innerHTML === "") {
            Event.innerHTML = "Today is " + event.event;
          } else {
            Event.innerHTML += "<br>Today is " + event.event;
          }
        }
      }
    })
  }
  actionCounter.innerHTML = `Actions left ${actionsLeft}`
  updateActionCounter()
  tomorrow.addEventListener('click', () => newDay(Today+1))
  newDay(Today + 1)
}
