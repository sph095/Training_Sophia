const celsiusEl= document.getElementById("celsius");
const fahrenheitEl= document.getElementById("fahrenheit"); 
let msgEL= document.getElementById("msg");


function computeTemp(event){
    const currentValue = +event.target.value;
    

    switch(event.target.id){
        case "celsius":
            fahrenheitEl.value= (currentValue * 1.8+32).toFixed(2);
            
            break;
        case "fahrenheit":
            celsiusEl.value= ((currentValue -32)/1.8).toFixed(2);
            
            break;
        default:    
            break;
            
    }
    const temp = +celsiusEl.value;
    document.getElementById("who").textContent="Aqua says: ";

    if (temp <= 0) {
        msgEL.textContent ="It's Freezing Cold!!";
        document.getElementById("waterImage").src="images/0celsius.PNG";
    }
    else if (temp <= 15) {
        msgEL.textContent =  "It's still very Cold";
        document.getElementById("waterImage").src="images/20celsius.PNG";
        }
    else if (temp <= 30) {
        msgEL.textContent = "It's moderately Cold";
        document.getElementById("waterImage").src="images/30celsius.PNG";
    }
    else if (temp <= 38) {
        msgEL.textContent = "It's Hot";
        document.getElementById("waterImage").src="images/38celsius.PNG";
    }
    else {
        msgEL.textContent = `Extremely Hot!!!!  
         Am I Sylvia Path?   `;
        document.getElementById("waterImage").src="images/38celsiusAbove.PNG";
    }
    

}