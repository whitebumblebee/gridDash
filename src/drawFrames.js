const frames = [
    "+---+---+---+\n"+
    "|   |   |   |\n"+
    "+---+---+---+\n"+
    "|   |   |   |\n"+
    "+---+---+---+\n"+
    "|   |   |   |\n"+
    "+---+---+---+\n",

    "+---+---+---+\n"+
    "| X |   |   |\n"+
    "+---+---+---+\n"+
    "|   |   |   |\n"+
    "+---+---+---+\n"+
    "|   |   |   |\n"+
    "+---+---+---+\n",

    "+---+---+---+\n"+
    "| X | X |   |\n"+
    "+---+---+---+\n"+
    "|   |   |   |\n"+
    "+---+---+---+\n"+
    "|   |   |   |\n"+
    "+---+---+---+\n"
]
  
  let currentFrame = 0;
  
  function updateGrid() {
    console.clear(); 
    console.log(frames[currentFrame]);
    currentFrame = (currentFrame + 1) % frames.length; 
  }
  
  setInterval(updateGrid, 500); 
  