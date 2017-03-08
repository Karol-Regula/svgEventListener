var esvg = document.getElementById("vimage");
var clear = document.getElementById("clear");
var move = document.getElementById("move");


function erase(event) {
    while (esvg.lastChild) {
	esvg.removeChild(esvg.lastChild);
    }
}

function change(event){
    console.log("change" + event.target);
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
    console.log("svg");
    var x = event.offsetX;     // Get the horizontal coordinate
    var y = event.offsetY;     // Get the vertical coordinate
    var c = makeCircle(x,y);
    esvg.appendChild(c);
    //}
    
}

function move() {
  xplus = 1;
  yplus = 1;

  window.cancelAnimationFrame(requestID);

  function drawDVD(){
    requestID = window.requestAnimationFrame(drawDVD);
    if (this.getAttribute("cx") > 615){
      xplus = -1;
    }
    if (this.getAttribute("cx") < 0){
      xplus = 1;
    }
    if (this.getAttribute("cy") > 715){
      yplus = -1;
    }
    if (this.getAttribute("cy") < 0){
      yplus = 1;
    }
    this.setAttribute("cx", this.getAttrubute("cx") + xplus); 
    d.setAttribute("x", x);
    d.setAttribute("y", y);
  }
  drawDVD();
}

    
clear.addEventListener("click", erase);
esvg.addEventListener("click", circle);
move.addEventListener("click", circle);

