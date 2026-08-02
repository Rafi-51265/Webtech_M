function calculateBill(){

    let name=document.getElementById("name").value;

    let contact=document.getElementById("contact").value;

    let address=document.getElementById("address").value;

    let paperQty=parseInt(document.getElementById("paper").value)||0;

    let penQty=parseInt(document.getElementById("pen").value)||0;

    let pencilQty=parseInt(document.getElementById("pencil").value)||0;

    let paperTotal=paperQty*3;

    let penTotal=penQty*20;

    let pencilTotal=pencilQty*15;

    let total=paperTotal+penTotal+pencilTotal;

    document.getElementById("customerInfo").innerHTML=

    "<b>Name:</b> "+name+"<br>"+

    "<b>Contact:</b> "+contact+"<br>"+

    "<b>Address:</b> "+address;

    let table=`

    <tr>

    <th>Product</th>

    <th>Price</th>

    <th>Quantity</th>

    <th>Total</th>

    </tr>

    <tr>

    <td>Paper</td>

    <td>3</td>

    <td>${paperQty}</td>

    <td>${paperTotal}</td>

    </tr>

    <tr>

    <td>Pen</td>

    <td>20</td>

    <td>${penQty}</td>

    <td>${penTotal}</td>

    </tr>

    <tr>

    <td>Pencil</td>

    <td>15</td>

    <td>${pencilQty}</td>

    <td>${pencilTotal}</td>

    </tr>

    `;

    document.getElementById("billTable").innerHTML=table;

    document.getElementById("grandTotal").innerHTML=

    "Grand Total : "+total+" Tk";

}

function resetForm(){

    document.getElementById("name").value="";

    document.getElementById("contact").value="";

    document.getElementById("address").value="";

    document.getElementById("paper").value=0;

    document.getElementById("pen").value=0;

    document.getElementById("pencil").value=0;

    document.getElementById("customerInfo").innerHTML="";

    document.getElementById("billTable").innerHTML="";

    document.getElementById("grandTotal").innerHTML="";

}