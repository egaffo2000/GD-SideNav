// setup functions for the button to open the dic
 function addEvent(event, elem, fxn) {
   if (elem.addEventListener) {
      elem.addEventListener(event, fxn, false);
    }
}



function toggleDND() {
  var drag = document.getElementById("DND-area");

   if (drag.style.display =="flex"){
    drag.style.display="none";
  } else {
    drag.style.display="flex";

  }
}

function hookinDragEvents() {
  var ul = document.getElementById("DND-area");
  var items = ul.getElementsByTagName("li");
  for (var i = 0; i < items.length; ++i) {
    items[i].setAttribute("id", ("row"+i));
    items[i].setAttribute("draggable","true");

  }

}


var dndBtn = document.getElementById('dndButton');
addEvent('click', dndBtn, toggleDND);
hookinDragEvents();


//functions for the actual drag and drop info
document.addEventListener("dragstart", function(event) {
    event.srcElement.classList.add("drag-element-moving");
    event.dataTransfer.setData("Text", event.target.id);
});

/* Events fired on the drop target */
document.addEventListener("dragover", function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
});

function appendChild(event){
  var data = event.dataTransfer.getData("Text");
  var dataTran = document.getElementById(data);
  event.target.appendChild(dataTran);
}

document.addEventListener("dragend", function(event) {
  var data = event.dataTransfer.getData("Text");
  var dataTran = document.getElementById(data);
  if(event.srcElement == event.toElement){
    dataTran = event.srcElement;
  }
    dataTran.classList.remove("drag-element-moving");

});

document.addEventListener("drop", function(event) {
    event.preventDefault();
    if(event.target.nodeName == 'UL' ) {
      appendChild(event);
    }
});
