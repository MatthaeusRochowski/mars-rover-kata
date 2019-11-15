// Rover Object Goes Here
// ======================

let obstacle = [
  { x: 3, y: 0 },
  { x: 0, y: 1 },
  { x: 5, y: 4 }
];

let kata = {
  name: "kata",
  direction: "N",
  position: { x: 0, y: 0 },
  travelLog: [],
  obstacleWarn: false
};

let ernie = {
  name: "ernie",
  direction: "N",
  position: { x: 5, y: 5 },
  travelLog: [],
  obstacleWarn: false
};

// Bonus 4 | Obstacles

// Rover move forward -> check for obstacle

function enableObstacleWarningForward(rover) {
  for (let i = 0; i < obstacle.length; i++) {
    if (
      rover.direction === "N" &&
      rover.position.y - 1 === obstacle[i].y &&
      rover.position.x === obstacle[i].x
    ) {
      rover.obstacleWarn = true;
      break;
    }
    if (
      rover.direction === "S" &&
      rover.position.y + 1 === obstacle[i].y &&
      rover.position.x === obstacle[i].x
    ) {
      rover.obstacleWarn = true;
      break;
    }
    if (
      rover.direction === "E" &&
      rover.position.x + 1 === obstacle[i].x &&
      rover.position.y === obstacle[i].y
    ) {
      rover.obstacleWarn = true;
      break;
    }
    if (
      rover.direction === "W" &&
      rover.position.x - 1 === obstacle[i].x &&
      rover.position.y === obstacle[i].y
    ) {
      rover.obstacleWarn = true;
      break;
    }
  }
}

// Rover move backward -> check for obstacle

function enableObstacleWarningBackwards(rover) {
  for (let i = 0; i < obstacle.length; i++) {
    if (
      rover.direction === "N" &&
      rover.position.y + 1 === obstacle[i].y &&
      rover.position.x === obstacle[i].x
    ) {
      rover.obstacleWarn = true;
      break;
    }
    if (
      rover.direction === "S" &&
      rover.position.y - 1 === obstacle[i].y &&
      rover.position.x === obstacle[i].x
    ) {
      rover.obstacleWarn = true;
      break;
    }
    if (
      rover.direction === "E" &&
      rover.position.x - 1 === obstacle[i].x &&
      rover.position.y === obstacle[i].y
    ) {
      rover.obstacleWarn = true;
      break;
    }
    if (
      rover.direction === "W" &&
      rover.position.x + 1 === obstacle[i].x &&
      rover.position.y === obstacle[i].y
    ) {
      rover.obstacleWarn = true;
      break;
    }
  }
}

// Iteration 2 | Turning the Rover

function turnLeft(rover) {
  console.log(`${rover.name} turnLeft was called!`);
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
  }
  console.log(`${rover.name} is now facing ${rover.direction}`);
}

function turnRight(rover) {
  console.log(`${rover.name} turnRight was called!`);
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
  console.log(`${rover.name} is now facing ${rover.direction}`);
}

// Iteration 3 | Moving the Rover

function moveForward(rover) {
  enableObstacleWarningForward(rover);
  if (
    // Bonus 1 | Enforce Boundaries
    (rover.direction === "N" && rover.position.y === 0) ||
    (rover.direction === "S" && rover.position.y === 9) ||
    (rover.direction === "W" && rover.position.x === 0) ||
    (rover.direction === "E" && rover.position.x === 9)
  ) {
    console.log("you can´t move the rover off the grid");
  } else {
    console.log(
      `${rover.name} moveForward was called, last coordinates logged`
    );
    rover.travelLog.push({ x: rover.position.x, y: rover.position.y }); //Iteration 5 | Tracking

    if (rover.obstacleWarn === false) {
      switch (rover.direction) {
        case "N":
          rover.position.y--;
          break;
        case "E":
          rover.position.x++;
          break;
        case "S":
          rover.position.y++;
          break;
        case "W":
          rover.position.x--;
          break;
      }
    } else {
      console.log(`Obstacle found! Move ${rover.name} to different direction.`);
      rover.obstacleWarn = false;
    }
  }
}

// Bonus 2 | Move Backwards

function moveBackwards(rover) {
  enableObstacleWarningBackwards(rover);
  if (
    // Bonus 1 | Enforce Boundaries
    (rover.direction === "N" && rover.position.y === 9) ||
    (rover.direction === "S" && rover.position.y === 0) ||
    (rover.direction === "W" && rover.position.x === 9) ||
    (rover.direction === "E" && rover.position.x === 0)
  ) {
    console.log("you can´t move the rover off the grid");
  } else {
    console.log(
      `${rover.name} moveBackwards was called, last coordinates logged`
    );
    rover.travelLog.push({ x: rover.position.x, y: rover.position.y }); //Iteration 5 | Tracking

    if (rover.obstacleWarn === false) {
      switch (rover.direction) {
        case "N":
          rover.position.y++;
          break;
        case "E":
          rover.position.x--;
          break;
        case "S":
          rover.position.y--;
          break;
        case "W":
          rover.position.x++;
          break;
      }
    } else {
      console.log(`Obstacle found! Move ${rover.name} to different direction.`);
      rover.obstacleWarn = false;
    }
  }
}

// Iteration 4 | Commands

function command(rover, orders) {
  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];
    switch (
      order // Bonus 3 | Validate Inputs - already done by case definition
    ) {
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
  // Implementation for successively moving Rovers -> Rovers parking position added to static obstacles
  obstacle.push(rover.position);
  console.log(`${rover.name} parking position added to obstacles`);
  console.log(`Obstacles: ${JSON.stringify(obstacle)}`);
  if (rover.travelLog.length > 0) {
    console.log(`${rover.name} travelLog: ${JSON.stringify(rover.travelLog)}`);
  }
  obstacle.push(rover.position);
}

command(kata, "rfffrff");
command(ernie, "rff");
