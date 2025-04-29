const levels = [
  [ ["red", "blue", "red", "blue"], ["blue", "red", "blue", "red"], [] ],
  [ ["green", "yellow", "green", "yellow"], ["yellow", "green", "yellow", "green"], [], [] ],
  [ ["red", "blue", "yellow", "red"], ["yellow", "blue", "red", "blue"], ["blue", "yellow", "red", "yellow"], [], [] ]
];

let currentLevel = 0;
let colors = [];
let selected = null;

const container = document.querySelector(".game-container");

function loadLevel(index) {
  if (index >= levels.length) {
    alert("Congratulations! You've completed all levels!");
    return;
  }
  colors = JSON.parse(JSON.stringify(levels[index]));
  selected = null;
  render();
}

function render() {
  container.innerHTML = "";
  colors.forEach((bottle, i) => {
    const div = document.createElement("div");
    div.className = "bottle";
    div.dataset.index = i;

    bottle.forEach(color => {
      const colorDiv = document.createElement("div");
      colorDiv.className = "color";
      colorDiv.style.backgroundColor = color;
      div.appendChild(colorDiv);
    });

    div.addEventListener("click", () => handleClick(i));
    container.appendChild(div);
  });
}

function handleClick(index) {
  if (selected === null) {
    selected = index;
  } else {
    if (selected !== index) transfer(selected, index);
    selected = null;
    render();
    setTimeout(checkWin, 300);
  }
}

function transfer(from, to) {
  if (colors[from].length === 0 || colors[to].length >= 4) return;

  const top = colors[from][colors[from].length - 1];
  let count = 0;

  for (let i = colors[from].length - 1; i >= 0 && colors[from][i] === top; i--) {
    count++;
  }

  while (
    count-- &&
    colors[to].length < 4 &&
    (colors[to].length === 0 || colors[to][colors[to].length - 1] === top)
  ) {
    colors[to].push(colors[from].pop());
  }
}

function checkWin() {
  const isWin = colors.every(bottle =>
    bottle.length === 0 || (bottle.length === 4 && bottle.every(c => c === bottle[0]))
  );
  if (isWin) {
    alert(Level ${currentLevel + 1} completed!);
    currentLevel++;
    loadLevel(currentLevel);
  }
}

// Start the game
loadLevel(currentLevel);
