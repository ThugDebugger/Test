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
    document.getElementById("Newrate").innerHTML = 0;
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
      //Notifies the user their values were sucessfully stored
      document.getElementById("00").innerHTML = "VALUES STORED !";
      document.getElementById("01").innerHTML = "VALUES STORED !";

      //push the value of p onto the services stack
      services.push(p);

      //push the values of q onto the rates stack
      rates.push(q);
    }

    //If a foreign value is in the Service textbox, decision statement will execute
    else if(!p_true)
    {
        document.getElementById("00").innerHTML = "Alphabetic and Numerical values only!";
    }

    //If a foreign value is in the Service textbox, decision statement will execute
    else if(!q_true)
    {
        document.getElementById("01").innerHTML = "Numerical values only (0-9) !";
    }

};

//Function used to display current service offered below the <hr> tag in test.html
function Display ()
{
   //counter variable init
   var i = 0;

   //rate variable init
   var rate = 0;

   //Decision statement ONLY executes if there are no values in the services array
   if (services.length == 0)
    {
        //alerts the user of the error
        window.alert("No Services Exist, please add services in the text boxes and click submit !")
    }

    //Else state executes by appending the values from the services textBox and their 
    //associated rate values from the rates array to the <div> tag with the class of "wrap" in test.html
    else
    {
      $(".wrap").empty();
       services.forEach(function(entry)
       {    
          rate = rates[i];

          //appends the service and value to the <div> tag with the class of wrap, 
          //if the 'add service' link is clicked, the increaseRate function will be called with the variable 'rate' being passed
          //if the 'decreaseRate service' link is clicked, the decreaseRate function will be called with the variable 'rate' being passed 
          $(".wrap").append(entry,': $', rate, ' ', '<br><a href = "#" id ="box'+i+'" value = "'+rate+'" onclick = "increaseRate('+rate+')">Add Service  </a><br>', '  ','<a href = "#" onclick = "decreaseRate('+rate+');">  Remove Service</a><br>', ' <br>');
            i++;
        });
    }
};

//Function used to add rate values to the currentRate variable, responds to the 'add service' tag when clicked
function increaseRate (rate)
{  
    var check = rate + currentRate;

            //error check to not allow negative final values
            if (check >= 0)
            {
            currentRate += rate;
            document.getElementById("Newrate").innerHTML =currentRate;    
            }
            else
            {
                //alert the user of the error
                window.alert("Negative rates not allowed");
            }      
};

//Function used to subtract rate values from the currentRate variable, responds to the 'decreaseRate service' tag when clicked
function decreaseRate(rate)
{
    //if the rate is negative, it will then be multiplied by negative 1 to ensure proper subtraction afterwards   
    if(rate < 0)
    {
        rate *= -1;
    }
    var check = currentRate - rate;

    //error check to not allow negative final values
    if(check >= 0)
    {
       currentRate -= rate;
       document.getElementById("Newrate").innerHTML =currentRate; 
    }
    else
    {
       //alert the user of the error
        window.alert("Negative rates not allowed");
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
    document.getElementById("Newrate").innerHTML = "0";
};

// Function used to clear the screen of available services and their prices    
function ClearScreen()
{
    //empties the <div> tag with a class of wrap in test.html
   $(".wrap").empty();
};

