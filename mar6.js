var esvg = document.getElementById("vimage");
var clear = document.getElementById("clear");
var move = document.getElementById("move");


function erase(event) {
  while (esvg.lastChild) {
    esvg.removeChild(esvg.lastChild);
  }
  window.cancelAnimationFrame(requestID);
  requestID = 0;
}

function change(event){
  //console.log("change" + event.target);
  if (this == event.target) {
    if (this.getAttribute("fill") === "red"){
      esvg.removeChild(this);
      var nc = makeCircle(Math.random() * 750, Math.random() * 750);
      esvg.appendChild(nc);
      event.stopPropagation();
    }else{
      event.target.setAttribute("fill","red");
      event.stopPropagation();
    }
  }
}


function makeCircle(x,y){
  var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
  c.setAttribute("cx",x);
  c.setAttribute("cy",y);
  c.setAttribute("r","20");
  c.setAttribute("fill","#00f0fa");
  c.addEventListener("click",change);
  return c;
}

function circle(event) {
  //console.log("svg");
  var x = event.offsetX;     // Get the horizontal coordinate
  var y = event.offsetY;     // Get the vertical coordinate
  var c = makeCircle(x,y);
  esvg.appendChild(c);
  //}

}
var requestID = 1;

function moving() {
  var xplus = 1;
  var yplus = 1;
  //console.log("here");
  window.cancelAnimationFrame(requestID);

  function draw(){
    var children = document.getElementsByTagName("circle");
    var rng = children.length;
    console.log(rng);
    for (i = 0; i < rng; i++){
      var kid = children[i];
      console.log("looking at this child: " + children[i]);
      var x = parseInt(kid.getAttribute("cx"));
      var y = parseInt(kid.getAttribute("cy"));
      if (x > 615){
        xplus = -1;
      }
      if (x < 0){
        xplus = 1;
      }
      if (y > 715){
        yplus = -1;
      }
      if (y < 0){
        yplus = 1;
      }
      kid.setAttribute("cx", x + xplus);
      kid.setAttribute("cy", y + yplus);
    }
    requestID = window.requestAnimationFrame(draw);
  }
  draw();
}

clear.addEventListener("click", erase);
esvg.addEventListener("click", circle);
move.addEventListener("click", moving);
