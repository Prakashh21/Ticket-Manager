let addBtn = document.querySelector(".buttons1");
let body = document.querySelector("body");
let grid = document.querySelector(".grid"); 
let colors = ["red","green","blue","yellow"];
addBtn.addEventListener("click" , function(){
    let modalexist = document.querySelector(".modal")

    if(modalexist){
        return;
    }
let div = document.createElement("div");
div.innerHTML = `<div class="modal">
<div class="text-section">
    <div class="innertext-section" contenteditable="true"></div>
</div>
<div class="priority-section">
    <div class="innerPrioritySection">
        <div class="pBox red"></div>
        <div class="pBox green"></div>
        <div class="pBox blue"></div>
        <div class="pBox yellow selected"></div>
    </div>
</div>
</div>`
let Color = "yellow"
let divList = div.querySelectorAll(".pBox")
for (let i = 0 ; i < divList.length ; i++){
    divList[i].addEventListener("click" , function (event){
        for (let j = 0 ; j <divList.length ; j++){
            divList[j].classList.remove("selected");
        }

        event.currentTarget.classList.add("selected");
        Color = event.currentTarget.classList[1] ;
        // console.log(Color);
        })



}

let taskInnerContainer = div.querySelector(".innertext-section");
taskInnerContainer.addEventListener("keydown", function (event){
   if (event.key == "Enter"){
       console.log(event.currentTarget.innerText);
        // console.log(Color);
        div.remove();
        

        let template = document.createElement("div");
        template.classList.add("ticket");

        template.innerHTML = `<div class="ticketColor ${Color}"></div>
        <div class="ticketId">#D412345</div>
        <div class="ticketContent">${event.currentTarget.innerText}</div>`
        
        let ticketColorDiv = template.querySelector(".ticketColor");
        ticketColorDiv.addEventListener("click",function(event){
            let currentColor = event.currentTarget.classList[1];
            let index = -1;
            for (let i =0 ; i < colors.length ; i++){
                if (colors[i] == currentColor){
                index = i;
            }
                index++;
                index = index%4;
                let newColor = colors[index];
                ticketColorDiv.classList.remove(currentColor);
                ticketColorDiv.classList.add(newColor);    
             }
        })
        grid.append(template);
   }else if(event.key === "Escape"){
       div.remove();
   }
});

div.classList.add("modal");
body.append(div);
}); 