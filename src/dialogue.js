import $ from 'jquery';

const lines = {
  "0": {
    voice: "",
    text: "Stars surround you as gravity release it's hold over your body. Around you, explosions of sound of light, and even more start rain down toward the ground. For a fleeting instant you feel in perfect peace, nothing matters anymore and you allow yourself to float in a sea of stars. Until gravity's hand grips your entrails. You feel a sudden tug, and you're falling.",
    options : [
      {
        text: "Think about the plan",
        effect: "next_line",
        props: "1"
      },
      {
        text: "Think about your body",
        effect: "next_line",
        props: "2"
      },
    ]
  },
  "1": {

    voice: "",
    text: "The plan has long been derailed. You were never supposed to flee through the air, but the Skulls did not really care for your plans. When they cornered you, which was NOT supposed to append, the plan ceased to care, only survival. Ironic when you ended up choosing the riskiest path. A daring pursuit through the roofs of Central Station, the faithless jump to grab on the outer shell of a flying wagon, the rush of adrenaline as you lift in the air, then something hit you in the back. The spell did a lot of hurt, but you're in no condition to estimate the damage. Still, ended up letting go of you lifeline. Hence the fall.",
    next: "3"
  },
  "2": {

    voice: "",
    text: "The spell that hit you caused a sudden pain straight through your core. The skulls surely did prioritize the recovery of the merchandize above your physical integrity. Except that when it hit you you were already high above the ground, holding to the shell of the flying wagon. Unable to hold on you fell, you quickly forget about the damage sustained by your body to focus on those it is about to receive when you reach the floor from this high. And from this height it's gonna be a lot.",
    next: "3"
  },
  "3" : {
    voice: "",
    text: "",
    options: [
      {
        text : "Terminer",
        effect: "end_dialogue",
        props: "0"
      }
    ]
  }
}

const effects = {
  end_dialogue : () => {
    $('.dialogue-text').html('')
    $('.dialogue-window').hide()
  },
  next_line : (e, props) => {
    document.querySelectorAll('.dialogue-text button').forEach(element => {
      element.remove()
    });
    $('.dialogue-text').append(`<p>${e.target.innerText}</p>`)
    $('.dialogue-text').append(`<br/>`)
    dialogue_runner(props)
    $('.dialogue-text').scrollTop($(".dialogue-text")[0].scrollHeight)

  }
}

const display_line=(line)=> {
  $('.dialogue-text').append(`<p>${line}</p>`)
}
const display_option=(option)=> {
  $('.dialogue-text').append(`<button>${option.text}</button>`)
  $('.dialogue-text').append(`<br/>`)
  let aa = document.querySelectorAll('.dialogue button')
  aa[aa.length-1].addEventListener("click", (e)=>{
    effects[option.effect](e, option.props)
  })
}
export const dialogue_runner =(index)=>{
  const line = lines[index]
  display_line(line.text)
  if (line.hasOwnProperty('next'))
    dialogue_runner(line.next)
  else if (line.hasOwnProperty('options')){
    for (let option of line.options) {
      display_option(option)
    }
  }
}

