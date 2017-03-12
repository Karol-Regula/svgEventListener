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
  c.setAttribute("xplus",1);
  c.setAttribute("yplus",1);
  c.setAttribute("r","20");
  c.setAttribute("fill","#00f0fa");
  c.addEventListener("click",change);
  return c;
}

function cloneCircle(x, y, xplus, yplus, r){
  var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
  c.setAttribute("cx",x);
  c.setAttribute("cy",y);
  c.setAttribute("xplus", -xplus);
  c.setAttribute("yplus", -yplus);
  c.setAttribute("r", r);
  c.setAttribute("fill","#00f0fa");
  c.addEventListener("click", change);
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
  var xplus;
  var yplus;
  var cx;
  var cy;
  var kid
  var r;
  var ncc;
  //console.log("here");
  window.cancelAnimationFrame(requestID);

  function draw(){
    //var children = document.getElementsByTagName("circle");
    var children = esvg.children;
    var rng = children.length;
    console.log(rng);
    for (i = 0; i < rng; i++){
      kid = children[i];
      console.log("looking at this child: " + kid);
      cx = parseInt(kid.getAttribute("cx"));
      cy = parseInt(kid.getAttribute("cy"));
      xplus = parseInt(kid.getAttribute("xplus"));
      yplus = parseInt(kid.getAttribute("yplus"));
      r = parseInt(kid.getAttribute("r"));
      //console.log(cx);
      //console.log(cy);
      if (cx > 790){
        xplus = -1;
      }
      if (cx < 10){
        xplus = 1;
      }
      if (cy > 790){
        yplus = -1;
      }
      if (cy < 10){
        yplus = 1;
      }
      if (r == 1 || cx == 400){
        if (r == 1){
          esvg.removeChild(kid);
          children = esvg.children;
          rng--;
        }else{
          //console.log("r: " + r);
          r /= 2;
          kid.setAttribute("r", r);
          if (parseInt(kid.getAttribute("xplus")) == 1){
            ncc = cloneCircle(cx - 5, cy, xplus, yplus, r);
          }else{
            ncc = cloneCircle(cx + 5, cy, xplus, yplus, r);
          }
          esvg.appendChild(ncc);
          kid.setAttribute("cx", cx + xplus);
          kid.setAttribute("cy", cy + yplus);
          kid.setAttribute("xplus", xplus);
          kid.setAttribute("yplus", yplus);
          //break;
        }
      }
      if (r != 1){
        kid.setAttribute("cx", cx + xplus);
        kid.setAttribute("cy", cy + yplus);
        kid.setAttribute("xplus", xplus);
        kid.setAttribute("yplus", yplus);
      }
    }
    requestID = window.requestAnimationFrame(draw);
  }
  draw();
}

clear.addEventListener("click", erase);
esvg.addEventListener("click", circle);
move.addEventListener("click", moving);
