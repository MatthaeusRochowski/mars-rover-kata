// Rover Object Goes Here
// ======================

// Bonus 4 | Obstacles is open !!!

const util = require("util");

let grid = {
  x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  y: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  obstacle: [{x:5, y:5}, {x:2, y:3}]
};


let rover = { //Iteration 1 | The Rover Object
  compass: ["N", "E", "S", "W"], 
  direction: "N",
  x:0,
  y:0,
  travelLog: [],
  obstacleWarn: false // Preperation for Bonus 4 | Obstacles
};

// Iteration 2 | Turning the Rover

function turnLeft(rover) {
  console.log("turnLeft was called!");
  rover.direction = rover.compass[3];
  console.log(`Rover is now facing ${rover.direction}`);
  rover.compass.unshift(rover.direction);
  rover.compass.pop(rover.direction);
  //console.log(rover.compass); // uncomment for test
  return rover.direction;
}

function turnRight(rover) {
  console.log("turnRight was called!");
  rover.direction = rover.compass[1];
  console.log(`Rover is now facing ${rover.direction}`);
  rover.compass.push(rover.compass[0]);
  rover.compass.shift(rover.direction);
  //console.log(rover.compass); // uncomment for test
  return rover.direction;
}


// Iteration 3 | Moving the Rover

function moveForward(rover) {
   
  if (
    // Bonus 1 | Enforce Boundaries
    (rover.direction === "N" && rover.y === 0) ||
    (rover.direction === "S" && rover.y === 9) ||
    (rover.direction === "W" && rover.x === 0) ||
    (rover.direction === "E" && rover.x === 9)
  ) {
    console.log("you can´t move the rover off the grid");
  } else {
    console.log("moveForward was called, last coordinates logged");
    rover.travelLog.push({ x: rover.x, y: rover.y }); //Iteration 5 | Tracking

    if (rover.direction === "N") {
      rover.y--;
    }
    if (rover.direction === "E") {
      rover.x++;
    }
    if (rover.direction === "S") {
      rover.y++;
    }
    if (rover.direction[0] === "W") {
      rover.x--;
    }
  }
}

// Bonus 2 | Move Backwards

function moveBackwards(rover) {
   
  if (
    // Bonus 1 | Enforce Boundaries
    (rover.direction === "N" && rover.y === 9) ||
    (rover.direction === "S" && rover.y === 0) ||
    (rover.direction === "W" && rover.x === 9) ||
    (rover.direction === "E" && rover.x === 0)
  ) {
    console.log("you can´t move the rover off the grid");
  } else {
    console.log("moveBackwards was called, last coordinates logged");
    rover.travelLog.push({ x: rover.x, y: rover.y }); //Iteration 5 | Tracking

    if (rover.direction === "N") {
      rover.y++;
    }
    if (rover.direction === "E") {
      rover.x--;
    }
    if (rover.direction === "S") {
      rover.y--;
    }
    if (rover.direction === "W") {
      rover.x++;
    }
  }
}

// Iteration 4 | Commands

function command(rover, orders) {
  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];
    switch (order) { // Bonus 3 | Validate Inputs - already done by case definition
      case "l":
        turnLeft(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackwards(rover);
        break;
    }
  }
  if (rover.travelLog.length > 0) {
    console.log(`travelLog: ${util.inspect(rover.travelLog)}`);
  }
}

command(rover, "rffzzylf");