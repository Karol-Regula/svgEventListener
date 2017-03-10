var esvg = document.getElementById("vimage");
var clear = document.getElementById("clear");
var move = document.getElementById("move");


function erase(event) {
    while (esvg.lastChild) {
	esvg.removeChild(esvg.lastChild);
    }
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
var requestID = 0;

function moving() {
    var xplus = 1;
    var yplus = 1;
    //console.log("here");
    window.cancelAnimationFrame(requestID);
    
    function draw(kid){
	console.log("morphed into this: " + kid);
	x = parseInt(kid.getAttribute("cx"));
	y = parseInt(kid.getAttribute("cy"));
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
	kid.setAttribute("cx", x + xplus); 
	kid.setAttribute("x", x);
	kid.setAttribute("y", y);
	esvg.appendChild(kid);
    }
    var children = document.getElementsByTagName("circle");
    var cnt = 0;
    var rng = children.length;
    console.log(rng);
    while (cnt < rng ){	
	console.log("looking at this child: " + children[cnt]);
	draw(children[cnt]);
	cnt++;
    }

}



clear.addEventListener("click", erase);
esvg.addEventListener("click", circle);
move.addEventListener("click", moving);

