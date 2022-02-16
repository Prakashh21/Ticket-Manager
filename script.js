let addBtn = document.querySelector(".buttons1");
let body = document.querySelector("body");
addBtn.addEventListener("click" , function(){
let div = document.createElement("div");
div.classList.add("modal");
body.append(div);
}); 