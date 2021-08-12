function errorHandlar(error){
    console.log("Error occured: ", error);
    alert("Something went wrong. Try after some time");
}

function showres(pl, buyp, buyDate, sellDate){
    //console.log(pl);
    var qty= document.querySelector('.quantity').value;
    if(qty ==''){
        qty=1;
        alert('Bydefault quantity is 1');
    }
    var proLoss = qty * pl
    var per = ((Math.abs(pl)) * 100) / buyp;
    per = per.toFixed(2)
    if(proLoss > 0){
        //console.log(per, proLoss);
        document.querySelector('.result').innerHTML = "Yay! 🤩 You have profited "+proLoss+"₹ a total "+per+"% on your investment";
        if(per >= 50){
            document.querySelector('.app').style.backgroundColor ="green";
        }
    }
    else{
        //console.log(per, proLoss);
        document.querySelector('.result').innerHTML = "Sorry! 😔 You have Lost "+Math.abs(proLoss)+"₹ a total "+per+"% on your investment";
        if(per >= 50){
            document.querySelector('.app').style.backgroundColor ="red";
        }
    }
}

function check(){
    const stockName = document.querySelector('#stock-name').value;
    const buyDate = document.querySelector('.buy-date').value;
    const sellDate = document.querySelector('.sell-date').value;
    const date1 = new Date(buyDate);
    const date2 = new Date(sellDate);
    if(date1 > date2){
        alert('Please select proper dates. Your selldate can not be older than buydate');
        return 0;
    }
    
    document.querySelector('.result').innerHTML = "Wait your result will appear here ...";

    var urlApi = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="+stockName+".BSE&outputsize=full&apikey=BVDO64XYNKVAXYY9"
    //var urlApi = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=RELIANCE.BSE&outputsize=full&apikey=demo";
    
    fetch(urlApi)
    .then(response => response.json())
    .then(json => {
        var buyPrice = json["Time Series (Daily)"][buyDate]["4. close"];
        var sellPrice = json["Time Series (Daily)"][sellDate]["4. close"];
        var pl = parseInt(sellPrice) - parseInt(buyPrice);
        showres(pl, buyPrice);
    })
    .catch(errorHandlar);
}



