const price = 100;

function calculate(){

let qty =
Number(document.getElementById("qty").value);

if(qty<=0){

alert("Quantity cannot be zero or negative");

document.getElementById("qty").value=1;

qty=1;

}

let total=qty*price;

document.getElementById("total").innerHTML=total;

if(total>500){

document.getElementById("coupon").innerHTML=
"You are now eligible for a coupon.";

}

else{

document.getElementById("coupon").innerHTML="";

}

let delivery=
Number(document.getElementById("delivery").value);

document.getElementById("grandTotal").innerHTML=
total+delivery;

}

function showButton(){

let check=
document.querySelector("input[type=checkbox]");

if(check.checked){

document.getElementById("submitBtn").style.display="block";

}

else{

document.getElementById("submitBtn").style.display="none";

}

}

calculate();