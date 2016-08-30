function addEvent(event, elem, fxn) {
   if (elem.addEventListener) {
      elem.addEventListener(event, fxn, false);
    }
}



function toggleCanvas(){
  var canvas = document.getElementById("CanvasID");

   if (canvas.style.display =="block"){
    canvas.style.display="none";
  } else {
    canvas.style.display="block";
    drawBox();
  }

}

function drawBox() {
  var gradiant = context.createLinearGradient(0,0,0,200);
  gradiant.addColorStop(0,"green");
  gradiant.addColorStop(1,"orange");

  context.fillStyle =  gradiant;
  context.fillRect(100,10,150,200);
  context.strokeRect(100,10,150,200);


}


var canvas = document.getElementById("simpleCanvas")
var context  = canvas.getContext("2d");


var canvasBtn = document.getElementById('canvasbutton');
addEvent('click', canvasBtn, toggleCanvas);
