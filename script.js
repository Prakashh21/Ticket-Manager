let addBtn = document.querySelector(".buttons1");
let body = document.querySelector("body");
let grid = document.querySelector(".grid"); 
let colors = ["red","green","blue","yellow"];
let deleteButton  = document.querySelector(".buttons2");
let deleteMode = false;

let allFiltersChildren = document.querySelectorAll(".filters div");
for(let i = 0 ; i <allFiltersChildren.length;i++){
    allFiltersChildren[i].addEventListener("click",function(e){
        if(e.currentTarget.classList.contains("color-selected")){
            e.currentTarget.classList.remove("color-selected");
            loadTasks();
            return;
        }else{
            e.currentTarget.classList.add("color-selected"); 
        }
        let filterColor = e.currentTarget.classList[0];
        loadTasks(filterColor)
    });
}

if(localStorage.getItem("AllTickets") == undefined){
    let allTickets = {};
    allTickets = JSON.stringify(allTickets);
    localStorage.setItem("AllTickets",allTickets);  
}



loadTasks();

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
        let id = uid();
        let task = event.currentTarget.innerText;


        

        

        // step 1 -- Jo bhi data local storage me hai usko lekar aao 

        let fetch = JSON.parse(localStorage.getItem("AllTickets")); // storage me object as a string stored rahega so humlog ko usko wapas se object me convert karna padega to push our ticket objects into it.
        
        
     
        // step 2 -- usko update karo

                   
        // we have 3 ingredients required to create ticket object ready
        // 1) id 2) color 3) data
        // now we will create a object out of it that would represent a ticket

        let ticketObj = {
            color:Color,
            taskValue:task,
        }
        fetch[id] = ticketObj; // fetch ke naam se save kiya hua object humlog retrieve kiye fir key ke jagah id daal ke usko save kar diye.


        // step 3 -- wapas updated object ko local storage me save kar do.

        localStorage.setItem("AllTickets",JSON.stringify(fetch));

        // wo object ko save kar do but since it only stores strings first we need to convert it to string using JSON.stringify(object).


        div.remove();
        
        
        // creating a ticket div below

        let template = document.createElement("div");
        template.classList.add("ticket");

        template.setAttribute("data-id",id);

        template.innerHTML = `<div data-id="${id}" class="ticketColor ${Color}"}></div>
        <div class="ticketId">${id}</div>
        <div ticket-id="${id}" class="ticketContent" contenteditable="true">${task}</div>`
        
        // added delete mode functionality

        template.addEventListener("click",function(event){
            if(deleteMode){
                event.currentTarget.remove();
               let currentTicketId = event.currentTarget.getAttribute("data-id");
               let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
               delete allTickets[currentTicketId];
               localStorage.setItem("AllTickets",JSON.stringify(allTickets));        
            }
        });

        

        // color changing logic
        let ticketColorDiv = template.querySelector(".ticketColor");
        
        // adding functonality such that the editing tickets gets reflected inside the storage aswell
    
        let ticketContentDiv = template.querySelector(".ticketContent");
         
        ticketContentDiv.addEventListener("input",function(event){
           let currentTask = event.currentTarget.innerText;
           let currentId  = event.currentTarget.getAttribute("ticket-id");
           let fetch = JSON.parse(localStorage.getItem("AllTickets"));
           fetch[currentId].taskValue = currentTask;
           localStorage.setItem("AllTickets",JSON.stringify(fetch));
                 });

//////////////////////////////////////////////////////////////////////// 
        ticketColorDiv.addEventListener("click",function(event){

            let currentID = event.currentTarget.getAttribute("data-id"); //fetching the id of though attribute
            

            let currentColor = event.currentTarget.classList[1];
            let index = -1;
            for (let i =0 ; i < colors.length ; i++){
                if (colors[i] == currentColor){
                index = i;
            }
                index++;
                index = index%4;
                let newColor = colors[index];
                
                // writing the code to save the changed color inside the the storage.
                let fetch = JSON.parse(localStorage.getItem("AllTickets")); // step-1 // fetching the tickets and converting them into objects.
                
                fetch[currentID].color = newColor;   // step-2 // updating it inside the storage

                localStorage.setItem("AllTickets",JSON.stringify(fetch)); // step -3 // saving the updated object inside the document -- since it only stores string hence converting it into string from object.


                /////////////////////////////////////////////////////
                ticketColorDiv.classList.remove(currentColor);
                ticketColorDiv.classList.add(newColor);    
             }
        });
        grid.append(template);
        div.remove();
   }else if(event.key === "Escape"){
    div.remove();
   }

  

});

div.classList.add("modal");
body.append(div);
});

function loadTasks(color){

    let ticketsOnUi = document.querySelectorAll(".ticket")

    for(let i = 0 ; i <ticketsOnUi.length;i++){
        ticketsOnUi[i].remove();
    }


    // fetch all tickets data

let allTicketsData = JSON.parse(localStorage.getItem("AllTickets"));

// create ticket ui for each ticket object 
for (x in allTicketsData) {

    let currentTicketId = x;
    let singleTicketObject = allTicketsData[x];
        
        if(color && color !== singleTicketObject.color)continue;
    
        let template = document.createElement("div");
        template.classList.add("ticket");

        template.setAttribute("data-id",currentTicketId);

        template.innerHTML = `<div data-id="${currentTicketId}" class="ticketColor ${singleTicketObject.color}"}></div>
        <div class="ticketId">${currentTicketId}</div>
        <div ticket-id="${currentTicketId}" class="ticketContent" contenteditable="true">${singleTicketObject.taskValue}</div>`
        
        let ticketColorDiv = template.querySelector(".ticketColor");
        
        let ticketContentDiv = template.querySelector(".ticketContent");
         
                
        ticketContentDiv.addEventListener("input",function(event){
            let currentTask = event.currentTarget.innerText;
            let currentId  = event.currentTarget.getAttribute("ticket-id");
            let fetch = JSON.parse(localStorage.getItem("AllTickets"));
            fetch[currentId].taskValue = currentTask;
            localStorage.setItem("AllTickets",JSON.stringify(fetch));
                  });
 
 //////////////////////////////////////////////////////////////////////// 
         ticketColorDiv.addEventListener("click",function(event){
 
             let currentID = event.currentTarget.getAttribute("data-id"); //fetching the id of the ticket through attribute
             
 
             let currentColor = event.currentTarget.classList[1];
             let index = -1;
             for (let i =0 ; i < colors.length ; i++){
                 if (colors[i] == currentColor){
                 index = i;
             }
                 index++;
                 index = index%4;
                 let newColor = colors[index];
                 
                 // writing the code to save the changed color inside the the storage.
                 let fetch = JSON.parse(localStorage.getItem("AllTickets")); // step-1 // fetching the tickets and converting them into objects.
                 
                 fetch[currentID].color = newColor;   // step-2 // updating it inside the storage
 
                 localStorage.setItem("AllTickets",JSON.stringify(fetch)); // step -3 // saving the updated object inside the document -- since it only stores string hence converting it into string from object.
 
 
                 /////////////////////////////////////////////////////
                 ticketColorDiv.classList.remove(currentColor);
                 ticketColorDiv.classList.add(newColor);    
              }
              
         });
         
        template.addEventListener("click",function(event){
            if(deleteMode){
                event.currentTarget.remove();
               let currentTicketId = event.currentTarget.getAttribute("data-id");
               let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
               delete allTickets[currentTicketId];
               localStorage.setItem("AllTickets",JSON.stringify(allTickets));        
            }
        });

        grid.append(template);

}
// attach required event listeners 
// add tickets in the grid section of ui


}

// loadTickets 
// on start (refresh/new tab/ browser reopen) of the app
// it will fetch the tickets data 
// create those tickets on ui 
// after creating ui will also attach the required event listners 
//
// on click the filter 
// previously jo ticket hai unhe delete maarna hai 
// if jo color hum usse denge us color ke tickets load karega sirf and if now color then saare 
//
//