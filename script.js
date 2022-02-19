let addBtn = document.querySelector(".buttons1");
let body = document.querySelector("body");
let grid = document.querySelector(".grid"); 
let colors = ["red","green","blue","yellow"];
let deleteButton  = document.querySelector(".buttons2");
let deleteMode = false;


deleteButton.addEventListener("click", function(event){
   if(event.currentTarget.classList.contains("deleteSelected")){
        event.currentTarget.classList.remove("deleteSelected");
        deleteMode = false;
    }else{
            event.currentTarget.classList.add("deleteSelected");
            deleteMode = true;
        }
   });


        


addBtn.addEventListener("click", function(){
   

    if(deleteMode){
        deleteButton.classList.remove("deleteSelected");
        deleteMode = false;
    }
    // if(!deleteMode){
    //         deleteButton.addEventListener("click",function(event){
    //             event.preventDefault();
    //         });
    // }  // Need to prevent clicking of the delete button when add is clicked.
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
        });
}





// ticket creation
let taskInnerContainer = div.querySelector(".innertext-section");
taskInnerContainer.addEventListener("keydown", function (event){
   if (event.key == "Enter"){
    //    console.log(event.currentTarget.innerText);
        // console.log(Color);
        div.remove();
        
        let id = uid();
        let template = document.createElement("div");
        template.classList.add("ticket");

        template.innerHTML = `<div class="ticketColor ${Color}"></div>
        <div class="ticketId">${id}</div>
        <div class="ticketContent">${event.currentTarget.innerText}</div>`
        
        // added delete mode functionality

        template.addEventListener("click",function(event){
            if(deleteMode){
                event.currentTarget.remove();
            }
        });

        

        // color changing logic
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

    