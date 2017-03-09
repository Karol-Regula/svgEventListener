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
var requestID = 0;

function moving(event) {
    var xplus = 1;
    var yplus = 1;
    console.log("here");
    window.cancelAnimationFrame(requestID);
    
    function draw(){
	x = parseInt(this.getAttribute("cx"));
	y = parseInt(this.getAttribute("cy"));
	requestID = window.requestAnimationFrame(draw);
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
	this.setAttribute("cx", x + xplus); 
	d.setAttribute("x", x);
	d.setAttribute("y", y);
    }
    var children = document.getElementsByTagName("circle");
    console.log("and here");
//    console.log(children[0]);
    //    console.log(children[1]);
    var cnt = 0;
    for (cnt in range(len(children))){
	
	console.log(children[cnt]);
	draw();
    }
}


clear.addEventListener("click", erase);
esvg.addEventListener("click", circle);
move.addEventListener("click", moving);

