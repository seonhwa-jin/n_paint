const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors =document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const btnMode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0 , 0 ,canvas.width , canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5.0;


let painting = false;
let filling =  false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}


function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  }else {
    ctx.lineTo(x,y);
    ctx.stroke();
  }
  
}



function handleColorClick(event){
  const bgColor = event.target.style.backgroundColor;
  ctx.strokeStyle = bgColor;
  ctx.fillStyle = bgColor;
}

function handleRangeChange (event){
  const brushSize = event.target.value;
  ctx.lineWidth = brushSize;
}


function handleModeClick (){
  if(filling === true){
    filling = false;
    btnMode.innerText = "Fill";
  }else{
    filling = true;
    btnMode.innerText = "Paint";
  }
}

function hanCanvasClick (){
  if (filling){
    ctx.fillRect(0 , 0 ,canvas.width , canvas.height)
  }
}

function handleCM (event){
  event.preventDefault();
}


function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Jinpaint";
  link.click();
}


if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", hanCanvasClick);
  canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color=> color.addEventListener("click", handleColorClick));

if(range){
  range.addEventListener("input", handleRangeChange)
}

if(btnMode){
  btnMode.addEventListener("click",handleModeClick)
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick)
}