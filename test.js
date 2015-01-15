/* 

JavaScript File for use with test.html 

*/

//Array used to store the name of services
var services = [];

//Array used to store the rates of services
var rates = [];

//Static starting rate of $200 init
var currentRate = 200;

//Function used to display the Starting raate, and old rate  
function CurrentRate()
{
    document.getElementById("Oldrate").innerHTML = 200;
    document.getElementById("Newrate").innerHTML = 200;
};

//Function used to store the values entered into textboxes from test.html and perform error checking    
function  Store()
{  
    //gets the value from the service name textbox
    var p = document.getElementById("1").value;

    //gets the value from the rate textbox
    var q = document.getElementById("2").value;

    //Regex used to only allow numerical and alphabetic with only one white space in between words
    var p_true = p.match(/^[A-Za-z0-9]+(\s[A-Za-z0-9]+)?$/);

    //Regex used to only allow numerical values (with and without decimals)
    var q_true = q.match(/^-?[0-9]\d*(\.\d+)?$/);

    //Decision statement ONLY EXECUTES is both regex statements above evaluate to TRUE
    if(p_true && q_true)
    {

     document.getElementById("00").innerHTML = null;
     document.getElementById("01").innerHTML = null;

      //push the value of p onto the services stack
      services.push(p);   

      //push the values of q onto the rates stack
      rates.push(q);
    }

    //If a foreign value is in the Service textbox, decision statement will execute
    else if(!p_true)
    {
        document.getElementById("00").innerHTML = "Alphabetic and Numerical values only! eg: Java, Java1, Java S, or Java S1 ";
    }

    //If a foreign value is in the Service textbox, decision statement will execute
    else if(!q_true)
    {
        document.getElementById("01").innerHTML = "Numerical values only (0-9) ! eg: 2 or 2.00";
    }

   //counter variable init
   var i = 0;

   //rate variable init
   var rate = 0;


    //appending the values from the services textBox and their 
    //associated rate values from the rates array to the <div> tag with the class of "wrap" in test.html
    $(".wrap").empty();
    services.forEach(function(entry)
    {    
        rate = rates[i];

        //appends the service and value to the <div> tag with the class of wrap, 
        //if the 'add service' link is clicked, the increaseRate function will be called with the variable 'rate' being passed
        //if the 'decreaseRate service' link is clicked, the decreaseRate function will be called with the variable 'rate' being passed 
        //"i" is used as the unique identifier amoong the services, and is passed here as well to the increaseRate and decreaseRate functions to later be for identifying which id tag to be used for increasing or decrasing the quantity
        $(".wrap").append(entry,': $', rate, ' ', '<br>Quantity: <a href = "#" id = "Qty'+i+'">0</a><br><a href = "#" id ="box'+i+'" value = "'+rate+'" class = "btn btn-success" onclick = "increaseRate('+rate+','+i+')">Add Service  </a>', '  ','<a href = "#" class = "btn btn-warning" onclick = "decreaseRate('+rate+','+i+');">  Remove Service</a><br>', ' <br>');
        i++;
     });

    //Clear the Services textbox once user submitted data
    document.getElementById("1").value = null;

    //Clear the Rate textbox once user submitted data
    document.getElementById("2").value = null;

    //Move the users cursor back to the services textbox to allow for more input easily 
    document.getElementById("1").focus();

};

//Function used to add rate values to the currentRate variable, responds to the 'add service' tag when clicked, and pass the "i" counter variable number to identify the proper quantity ID
function increaseRate (rate,value)
{  
    
    var check = rate + currentRate;

    //parses the init quantity amount on the page to a INT value, to be later used to increase the amount
    var Quantity = parseInt(document.getElementById("Qty"+value).text);

            //error check to not allow negative final values and to allow the service to the "values" array, and increase the quantity amount on the page
            if (check >= 0)
            {
            currentRate += rate;
            Quantity++;
            document.getElementById("Newrate").innerHTML =currentRate;    
            document.getElementById("Qty"+value).innerHTML =Quantity;  
            
            }
            else
            {
                //alert the user of the error
                window.alert("Negative rates not allowed");
            }      
};

//Function used to subtract rate values from the currentRate variable, responds to the 'decreaseRate service' tag when clicked, and pass the "i" counter variable number to identify the proper quantity ID
function decreaseRate(rate,value)
{
    //parses the init quantity amount on the page to a INT value, to be later used to decrease the amount
    var Quantity = parseInt(document.getElementById("Qty"+value).text);

    //if the quantity is still at zero, this decision structure will execute
    if (Quantity == 0)
    {
        alert("That service was never added");
    }

    //if the the sentinel flag is set to true (the value was found to be added by the user), all code below will execute
    else
    {
    //if the rate is negative, it will then be multiplied by negative 1 to ensure proper subtraction afterwards   
    if(rate < 0)
    {
        rate *= -1;
    }
    var check = currentRate - rate;

    //error check to not allow negative final values, and decrease the quantity amount on the page
    if(check >= 0 && Quantity > 0)
    {
       currentRate -= rate;
       Quantity-- ;
       document.getElementById("Newrate").innerHTML =currentRate; 
       document.getElementById("Qty"+value).innerHTML =Quantity;  
    }
    else
    {
       //alert the user of the error
        window.alert("Negative rates not allowed");
    }
}
};
 
//Function used to empty both the service and rates arrays and update the Newrate value to ZERO 
//(since there are no service to offer)
function ClearRates()
{
   //empty the services array
    services = [];

   //empty the rates array
    rates = [];

    //update the Newrate value being displayed onto the screen
    document.getElementById("Newrate").innerHTML = "200";
    document.getElementById("00").innerHTML = null;
    document.getElementById("01").innerHTML = null;
    $(".wrap").empty();
};

