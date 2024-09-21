let seqOfColors = [];
let seqOfColorsByPlayer = [];
let clickCount = 0;
let levelCount = 0;
let start = true;
let end = false;

$("body").keypress((e) => {
  if (e.key.toUpperCase() === "A" && start === true) {
    correct();
  } else if (end === true) {
    levelCount = 0;
    clickCount = 0;
    start = true;
    end = false;
    seqOfColors = [];
    seqOfColorsByPlayer = [];
    correct();
  }
});

function getRandomColor() {
  const colorList = ["green", "red", "yellow", "blue"];
  const randomNumber = Math.floor(Math.random() * 4);

  return colorList[randomNumber];
}

function correct() {
  start = false;

  if (clickCount === levelCount) {
    levelCount++;
    clickCount = 0;

    // change h1 text
    $("h1").text("Level " + (seqOfColors.length + 1));
  }

  //getRandomColor
  const color = getRandomColor();
  seqOfColors.push(color);

  makeSoundAndEffect(color);
}

$("button").click(handleClick);

// handle click event
function handleClick(e) {
  if (end === false) {
    clickCount++;
    const classValue = e.target.getAttribute("class");
    const pickColor = classValue.split(" ")[1];
    makeSoundAndEffect(pickColor);
    seqOfColorsByPlayer.push(pickColor);
    console.log("seqOfColorsByPlayer :>> ", seqOfColorsByPlayer);

    if (clickCount === levelCount) {
      if (JSON.stringify(seqOfColors) === JSON.stringify(seqOfColorsByPlayer)) {
        seqOfColorsByPlayer = [];
        setTimeout(correct, 1000);
      } else {
        wrong();
      }
    } else if (clickCount > levelCount) {
      wrong();
    }
  } else {
    wrong();
  }
}

function makeSoundAndEffect(color) {
  //make sound
  const audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();

  // add effects to button that played
  $("." + color).addClass("pressed");
  setTimeout(() => {
    $("." + color).removeClass("pressed");
  }, 200);
}

function wrong() {
  // wrong answer
  end = true;
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
}
