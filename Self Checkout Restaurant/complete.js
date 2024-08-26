function greeting1(){
    location.href="choice.html"
}
function calculateTotal(){
    var total=0;
    var items=document.getElementsByClassName("item");
    for(var i=0;i<items.length;i++){
        var quantity=items[i].querySelector("select").value;
        if(quantity=="Add"){
            quantity=0;
        }
        var price=items[i].querySelector("h3").innerText.slice(1);
        price=price.replace("₹","");
        total+=quantity*parseInt(price);
        
    }
    if(total==0){
        alert("Please add items to cart !!!");
    }
    else if(total!=0){
        var move=document.getElementById("movetobill");
        move.innerText="Your total is "+"₹"+total+" Click to proceed to checkout"; 
        move.onclick=function(){
            location.href="bill.html";       
        }    
        localStorage.setItem("total",total);
    }
    
    var addedItems = [];
    var items = document.getElementsByClassName("item");
    for(var i = 0; i < items.length; i++){
        var item = items[i];
        var quantity = item.querySelector("select").value;
        if(quantity !== "Add"){
            var name = item.querySelector("h2").innerText;
            var priceText = item.querySelector("h3").innerText.slice(1);
            var price = parseInt(priceText.replace("₹", ""));
            var total = parseInt(quantity) * price;
            addedItems.push({
                name: name,
                quantity: parseInt(quantity),
                price: price,
                total: total,
            });
        }
    }
    localStorage.setItem("items", JSON.stringify(addedItems));
}

function printbill(){    
    var table=document.getElementById("billtable");
    var items=JSON.parse(localStorage.getItem("items"));
    for(var i=0;i<items.length;i++){
        var row=table.insertRow(table.rows.length);
        var cell0=row.insertCell(0);
        cell0.innerText=(i+1);
        var cell1=row.insertCell(1);
        var cell2=row.insertCell(2);
        var cell3=row.insertCell(3);
        var cell4=row.insertCell(4);

        cell1.innerText=items[i].name;
        cell2.innerText=items[i].quantity;
        cell3.innerText="₹ "+items[i].price;
        cell4.innerText="₹ "+items[i].total;

    }

    var bmd=document.getElementById("billamount");
    bmd.innerText="Bill Amount: ₹ "+localStorage.getItem("total");
    var tax=document.getElementById("taxes");
    var service=0.056*localStorage.getItem("total");
    var gst=0.18*localStorage.getItem("total");
    tax.innerText="Taxes\nCGST + SGST: 5.6% = ₹"+service.toPrecision(4)+"\nService Tax: 10% = ₹"+gst.toPrecision(5);
    var fmd=document.getElementById("finalamount");
    var final=localStorage.getItem("total")-0+service-0+gst-0;
    fmd.innerText="Total Amount: ₹"+final.toPrecision(6);
    localStorage.setItem("final",final);
}
function movetopayment(){
    const pbtn=document.getElementById("pbtn");
    pbtn.parentNode.removeChild(pbtn);
    pbtn.innerText="";
    window.print();
    location.href="main.html";
}

function orderbreakfast(){
    location.href="breakfast.html";
}

function orderlunch(){
    location.href="lunch.html";
}





    






