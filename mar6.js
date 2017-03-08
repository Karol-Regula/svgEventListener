var esvg = document.getElementById("vimage");
var clear = document.getElementById("clear");


function erase(event) {
    while (esvg.lastChild) {
	esvg.removeChild(esvg.lastChild);
    }
}

function change(event){
    console.log("change" + event.target);
    event.target.setAttribute("fill","red");
    event.stopPropagation();
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
    //if this == event.target {
    var x = event.offsetX;     // Get the horizontal coordinate
    var y = event.offsetY;     // Get the vertical coordinate
    var c = makeCircle(x,y);
    esvg.appendChild(c);
    //}
    
}

    
clear.addEventListener("click", erase);
esvg.addEventListener("click", circle);

