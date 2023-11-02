title = "One Button";
description = "";
characters = [];
options = {
  viewSize: { x: 100, y: 100 },
  theme: "shapeDark"
};

var maxDist = 0.15;
var radius = 30;
var speed;
var dir;
var angle_player;
var angle_goal;

function update() {

  // setup stuff
  if (!ticks) {
    speed = 0.02;
    dir = 1;
    angle_player = 0;
    moveGoal();
  }

  // key press
  if (input.isJustPressed) {

    // check if player hit goal
    var dist = Math.abs(angle_player - angle_goal);
    if (dist <= maxDist) {
      moveGoal();
      dir *= -1;
      score += 1;
    }
    
  }

  var x_goal = 50 + radius * Math.cos(angle_goal);
  var y_goal = 50 + radius * Math.sin(angle_goal);
  color("blue");
  rect(x_goal, y_goal, 6, 6);

  var x_player = 50 + radius * Math.cos(angle_player);
  var y_player = 50 + radius * Math.sin(angle_player);
  color("green");
  rect(x_player, y_player, 6, 6);

  // distance between player and goal
  var dist = Math.sqrt(Math.pow(x_goal - x_player, 2) + Math.pow(y_goal - y_player, 2));
  if (dist <= maxDist) {
    console.log("aaa");
  } else {
    // The moving square has moved past the still square.
    console.log("Moving square has moved past the still square.");
  }
  
  // rotate player, wrap around
  angle_player += (speed * dir);
  if (angle_player > 2 * Math.PI) angle_player -= 2 * Math.PI;
  if (angle_player < 0) angle_player += 2 * Math.PI;
}

function moveGoal() {
  var minDegrees = 90;
  var maxDegrees = 270;
  var randomDegrees = Math.random() * (maxDegrees - minDegrees) + minDegrees;
  angle_goal = angle_player + (randomDegrees * (Math.PI / 180));

  // wrap around
  if (angle_goal > 2 * Math.PI) angle_goal -= 2 * Math.PI;
  if (angle_goal < 0) angle_goal += 2 * Math.PI;
}