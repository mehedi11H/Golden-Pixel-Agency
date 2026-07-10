function openOrder(){

    document.getElementById("orderBox").style.display="block";

    window.scrollTo({
        top: document.getElementById("orderBox").offsetTop,
        behavior:"smooth"
    });

}



function submitOrder(){

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let link = document.getElementById("link").value;
    let payment = document.getElementById("payment").value;
    let trx = document.getElementById("trx").value;


    if(name=="" || phone=="" || trx==""){

        alert("Please fill all required information");

        return;

    }


    let orderID = "GP" + Math.floor(100000 + Math.random()*900000);



    let orderData = {

        OrderID: orderID,
        Name:name,
        Phone:phone,
        Link:link,
        Payment:payment,
        TransactionID:trx,
        Status:"Payment Verification Pending"

    };


    localStorage.setItem(orderID, JSON.stringify(orderData));


    let whatsappMessage =
    "New Order Received%0A%0A"+
    "Order ID: "+orderID+"%0A"+
    "Name: "+name+"%0A"+
    "Phone: "+phone+"%0A"+
    "Payment: "+payment+"%0A"+
    "Transaction ID: "+trx;


    window.open(
    "https://wa.me/8801910525841?text="+whatsappMessage,
    "_blank"
    );


    alert(
    "Order Submitted Successfully! Your Order ID: "+orderID
    );


}



function changeLanguage(){

    let title=document.getElementById("title");

    if(title.innerHTML.includes("Facebook")){

        title.innerHTML="ফেসবুক 300K ভিউ চ্যালেঞ্জ সাপোর্ট";

        document.getElementById("desc").innerHTML=
        "প্রফেশনাল ও নিরাপদ সার্ভিসের মাধ্যমে আপনার কনটেন্ট গ্রো করুন।";

    }

    else{

        title.innerHTML="Facebook 300K Views Challenge Support";

        document.getElementById("desc").innerHTML=
        "Grow your content with professional support. Safe & Reliable Service.";

    }

}