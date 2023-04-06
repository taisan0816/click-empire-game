function displayNone(ele){
    ele.classList.remove("d-block");
    ele.classList.add("display-none");
}

function displayBlock(ele){
    ele.classList.remove("display-none");
    ele.classList.add("d-block")
}

const config = {
    loginPage : document.getElementById("targetLogin"),
    gamePage : document.getElementById("targetGame"),
}

const investItem = [
    {
        objName      : "Flip machine",
        attribute    : "ability",
        maxPosession : 500,
        price        : 15000,
        income       : 25,
        img          : "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"
    },
    {
        objName      :"ETF Stock",
        attribute    :"investmentETFStock",
        maxPosession : Infinity,
        price        :300000,
        income       :0.1,
        img          :"https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
    },
    {
        objName      :"ETF Bonds",
        attribute    :"investmentETFBonds",
        maxPosession : Infinity,
        price        :300000,
        income       :0.07,
        img          :"https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
    },
    {
        objName      :"Lemonade Stand",
        attribute    :"realEstate",
        maxPosession :1000,
        price        :30000,
        income       :30,
        img          :"https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png",
    },
    {
        objName      :"Ice Cream Truck",
        attribute    :"realEstate",
        maxPosession :500,
        price        :100000,
        income       :120,
        img          :"https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png",
    },
    {
        objName      :"House",
        attribute    :"realEstate",
        maxPosession :100,
        price        :20000000,
        income       :32000,
        img          :"https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png",
    },
    {
        objName      :"TownHouse",
        attribute    :"realEstate",
        maxPosession :100, 
        price        :40000000,
        income       :64000,
        img          :"https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png",
    },
    {
        objName      :"Mansion",
        attribute    :"realEstate",
        maxPosession :20,
        price        :250000000,
        income       :500000,
        img          :"https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png",
    },
    {
        objName      :"Industrial Space",
        attribute    :"realEstate",
        maxPosession :10,
        price        :1000000000,
        income       :2200000,
        img          :"https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png",
    },
    {
        objName      :"Hotel Skyscraper",
        attribute    :"realEstate",
        maxPosession :5,
        price        :10000000000,
        income       :25000000,
        img          :"https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png",
    },
    {
        objName      :"Bullet-Speed Sky Railway",
        attribute    :"realEstate",
        maxPosession :1,
        price        :10000000000000,
        income       :30000000000,
        img          :"https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png",
    }
]


class User{
    constructor(userName, money, days, yearsOld, numOfBurger, itemList){
        this.userName = userName;
        this.money = money;
        this.days = days;
        this.yearsOld = yearsOld;
        this.numOfBurger = numOfBurger;
        this.itemList = itemList;
    }
    //リセットボタンを押したときの処理
    resetUserAccount(){
        this.money = 50000;
        this.days = 0;
        this.yearsOld = 20;
        this.numOfBurger = 0;
        this.itemList = makeInvestmentArr();
    }
    //ハンバーガーをクリックしたときの処理
    clickBurger(){
        this.money += this.itemList[0].income
        this.numOfBurger++;
        let numOfBurger = config.gamePage.querySelectorAll("#numOfBurger")[0];
        numOfBurger.innerHTML = `${this.numOfBurger} Burgers`;
        let money = config.gamePage.querySelectorAll("#money")[0];
        money.innerHTML = `¥${this.money}`
    }
}

class InvestItem{
    constructor(objName, attribute, maxPosession,price, income, img){
        this.objName = objName;
        this.attribute = attribute;
        this.numOfPossession = 0;
        this.maxPosession = maxPosession;
        this.img = img;
        this.price = price;
        this.income = income;
        this.sumOfIncome = 0;
        this.incomeDisplay ="￥" + this.income 
        this.incomeDisplay += (this.objName == "Flip machine") ? "/click" : "/sec" 
    }

    //購入可能な場合trueを返します
    purchaseCheck(number, userAccount){
        if(this.objName === "ETF Stock"){
            return userAccount.money >= Math.floor(this.price * 10 * (Math.pow(1.1,parseInt(number)) - 1))
        }else{
            return userAccount.money >= parseInt(number) * this.price && this.maxPosession >= parseInt(number) + this.numOfPossession;
        }
    }

    //購入時に所持数, 所持金を変化させます.
    puschase(number, userAccount){
        this.numOfPossession += number
        let fee;
        switch (this.attribute){
            case "ability":
                fee = this.price * number;
                this.changePossessionMoney(userAccount, fee);
                let oneClickIncome = config.gamePage.querySelectorAll("#oneClickIncome")[0];
                this.income = 25 + this.numOfPossession * 25;
                oneClickIncome.innerHTML = `one click ￥${this.income}`;
                break;

            case "investmentETFStock":
                //moneyとincomeは等比数列の和を変形して求める
                fee = Math.floor(this.price * 10 * (Math.pow(1.1,parseInt(number)) - 1));
                this.changePossessionMoney(userAccount, fee);
                this.sumOfIncome = Math.ceil(300000 * (Math.pow(1.001,this.numOfPossession) - 1));
                this.price = 300000 * Math.pow(1.1, this.numOfPossession);
                break;

            case "investmentETFBonds":
                fee = this.price * number;
                this.changePossessionMoney(userAccount, fee);
                this.sumOfIncome = this.price * this.numOfPossession * 0.0007;
                break;
            case "realEstate":
                fee = this.price * number;
                this.changePossessionMoney(userAccount, fee);
                this.sumOfIncome = this.income * this.numOfPossession;
                break;           
        }
    }

    changePossessionMoney(userAccount,fee){
        userAccount.money -= fee;
        let displayMoney = config.gamePage.querySelectorAll("#money")[0];
        displayMoney.innerHTML = `￥${userAccount.money}`
    }
}

//投資先のクラスの配列をつくる
function makeInvestmentArr(){
    let investmentArr = [];
    for(let i = 0; i < investItem.length; i++){
        investmentArr[i] = new InvestItem(investItem[i]["objName"],investItem[i]["attribute"], investItem[i]["maxPosession"],investItem[i]["price"] ,investItem[i]["income"], investItem[i]["img"]);
    }
    return investmentArr;
}

function initialize(){
    config.loginPage.append(makeLoginPage());
}

//ログインページを作成します
function makeLoginPage(){
    let container = document.createElement("div");
    container.classList.add("bg-white","w-390p","h-220p","pt-3");
    container.innerHTML =
    `
        <form class="col-12 d-flex flex-column align-items-center justify-content-center" onsubmit="event.preventDefault()">
            <h2 class="w-90 mb-4">Clicker Empire Game</h2>
            <input type="name" placeholder="Your name" class="w-90 mb-4 form-control" id="YourName" value="">
            <div class="d-flex justify-content-between w-90">
                <button class="btn btn-primary col-5 new-btn">New</button>
                <button class="btn btn-primary col-5 login-btn">Login</button>
            </div>
        </form>
    `
    let newBtn = container.querySelectorAll(".new-btn").item(0);
    let loginBtn = container.querySelectorAll(".login-btn").item(0);

    newBtn.addEventListener("click",function(){
        let yourName = container.querySelectorAll("#YourName")[0];
        switchPage(config.loginPage, config.gamePage);
        let userAccount = new User(yourName.value, 50000, 0, 20, 0, makeInvestmentArr());
        config.gamePage.append(makeGamePage(userAccount));
    })

    loginBtn.addEventListener("click",function(){
        let yourName = container.querySelectorAll("#YourName")[0].value;
        if(yourName === ""){
            alert("Please put your name")
        }
        else if(localStorage.getItem(yourName) === null){
            alert("There is no data");
        }else{
            let saveData = JSON.parse(localStorage.getItem(yourName));
            let userAccount = new User(saveData.userName, saveData.money, saveData.days, saveData.yearsOld, saveData.numOfBurger, saveData.itemList);
            switchPage(config.loginPage, config.gamePage);
            config.gamePage.append(makeGamePage(userAccount));
        }
    })
    return container;
}

//ゲームのメインページを作成します.
function makeGamePage(userAccount){    
    let container = document.createElement("div");
    container.innerHTML = 
    `
    <div class="d-flex justify-content-center align-items-center p-sm-4 pb-5 vh-100">
    <div class="bg-game-page text-white col-12 col-md-9 d-flex align-items-center h-75">
        <div id="clickBager" class="col-4 h-95 bg-body-color d-flex flex-column align-items-center">
            <div class="bg-game-page w-100 mt-2 h-20 text-center media-h">
                <h4 id="numOfBurger" class="">${userAccount.numOfBurger} Burgers</h4>
                <p id="oneClickIncome" class="">one click ￥${userAccount.itemList[0].income}</p>
            </div>
            <div class="bg-body-color d-flex justify-content-center align-items-center">
                <img id="burgerImg" src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" class="mt-5 ml-3 h-65 w-75">
            </div>
        </div>
        <div id="" class="col-8 h-95">
            <div id="userStatus" class="col-12 d-flex justify-content-end mt-4">
                <table border="0" class="text-white col-11 text-center mb-3">
                    <tr class="col-12 d-flex flex-column flex-sm-row">
                        <td class="col-sm-6 item-border">${userAccount.userName}</td>
                        <td id="yearsOld" class="col-sm-6 item-border">${userAccount.yearsOld} years old</td>
                    </tr>
                    <tr class="col-12 d-flex flex-column flex-sm-row">
                        <td id="days" class="col-sm-6 item-border">${userAccount.days} days</td>
                        <td id="money" class="col-sm-6 item-border">￥${userAccount.money}</td>
                    </tr>
                </table>
            </div>
            <div id="purchaseList" class="d-block col-12 bg-body-color p-1 mt-2 overflow-auto h-75">
            </div>
            <div id="investmentDescription" class="display-none col-12 bg-body-color p-1 mt-2 overflow-auto h-75">
            </div>
            <div class="d-flex justify-content-end mt-2">
                <button id="btn-reset" class="p-2 mx-2 border btn btn-reset text-white">
                    <i class="fas fa-undo fa-2x"></i>
                </button>
                <button id="btn-save" class="p-2 mx-2 border btn btn-save text-white">
                    <i class="fas fa-save fa-2x"></i>
                </button>
            </div>
        </div>
    </div>
    </div>
    `
    //一秒たつごとに処理を行います。
    let dayCount = setInterval(function(){
        userAccount.days++;
        if(userAccount.days % 365 == 0){
            userAccount.yearsOld = 20 + userAccount.days/365;
            let yearsOldDisplay = config.gamePage.querySelectorAll("#yearsOld")[0];
            yearsOldDisplay.innerHTML = `${userAccount.yearsOld} years old`;
        }
        userAccount.money += calculationSumOfMoney(userAccount.itemList);
        let daysDisplay =  config.gamePage.querySelectorAll("#days")[0];
        let moneyDisplay = config.gamePage.querySelectorAll("#money")[0];
        daysDisplay.innerHTML = `${userAccount.days} days`;
        moneyDisplay.innerHTML = `￥${userAccount.money}`;
    },1000);

    let burgerImg = container.querySelectorAll("#burgerImg")[0];
    burgerImg.addEventListener("click",function(){
        userAccount.clickBurger();
    })

    container.querySelectorAll(".btn-reset")[0].addEventListener("click",function(){
        if(confirm("Reset All Data?")){
            if(localStorage.getItem(userAccount.userName) !== null){
                localStorage.removeItem(userAccount.userName);
            }
            clearInterval(dayCount);
            config.gamePage.innerHTML = "";
            userAccount.resetUserAccount();
            config.gamePage.append(makeGamePage(userAccount));
        }
    })
    container.querySelectorAll(".btn-save")[0].addEventListener("click",function(){
        alert("Saved your data. Please put the same name when you login.");
        let userName = userAccount.userName;
        let saveData = JSON.stringify(userAccount);
        localStorage.setItem(userName, saveData);
        clearInterval(dayCount);
        switchPage(config.gamePage, config.loginPage);
        initialize();
    })
    let purchaseList = container.querySelectorAll("#purchaseList")[0]
    let investmentList = container.querySelectorAll("#investmentDescription")[0]
    purchaseList.append(makeInvestmentList(purchaseList,investmentList,userAccount));
    return container;    
}

//投資先のページをリストとして作成します.
//これはゲームのメインページの右下にデフォルトで表示されているページです.
function makeInvestmentList(currentNode,nextNode, userAccount){
    //html
    let investmentList = document.createElement("div");
    for(let i = 0; i < userAccount.itemList.length; i++){
        investmentList.innerHTML +=
        `
            <div id="item${i}" class="d-sm-flex align-items-center m-1 item-border item-list bg-game-page">
                <div class="p1 col-sm-3 d-none d-sm-block">
                    <img src=${userAccount.itemList[i].img} class="img-fluid">
                </div>
                <div class="col-sm-9">
                    <div class="d-flex justify-content-between">
                        <h4>${userAccount.itemList[i].objName}</h4>
                        <h4>${userAccount.itemList[i].numOfPossession}</h4>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>￥${userAccount.itemList[i].price}</p>
                        <p class="text-success">${userAccount.itemList[i].incomeDisplay}</p>
                    </div>
                </div>
            </div>
        `        
    }
    //イベントリスナー
    for(let i = 0; i < userAccount.itemList.length; i++){
        investmentList.querySelectorAll(`#item${i}`)[0].addEventListener("click",function(){
            switchPage(currentNode, nextNode);
            nextNode.append(makeInvestmentDescriptionPage(userAccount.itemList[i], userAccount,nextNode, currentNode));
        })
    }
    return investmentList;
}

//投資先を選択することで購入することができる詳細ページを開きます.
//投資先のリストと交代で表示させます
function makeInvestmentDescriptionPage(item, userAccount, currentNode, nextNode){
    let container = document.createElement("div");
    container.innerHTML =
    `
    <div class="p-1 mt-1 bg-game-page">
        <div class="d-flex justify-content-between">
            <div class="col-6 d-flex flex-column justify-content-center">
                <h4>${item.objName}</h4>
                <p>Max purchases :${item.maxPosession}</p>
                <p>price :￥${item.price}</p>
                <p>Get ${item.incomeDisplay}</p>
            </div>
            <div class="col-6">
                <img class="w-100" src="${item.img}">
            </div>
        </div>
        <form class="">
            <div>
                <p>How many would you like to buy?</p>
            </div>
            <input name="purchaseNumber" type="number" placeholder="0" class="form-control">
            <div id="total" class="d-flex justify-content-end">
                <p>total: ￥0</p>
            </div>
            <div class="d-flex justify-content-around col-12">
                <button class="btn btn-secondary col-5 btn-back">Go Back</button>
                <button class="btn btn-primary col-5 btn-purchase">Purchase</button>
            </div>
        </form>
    </div>
    `
    let btnBack = container.querySelectorAll(".btn-back")[0];
    let btnPrimary = container.querySelectorAll(".btn-purchase")[0];
    let purchaseNumber = container.querySelectorAll("input[name='purchaseNumber']")[0];

    //イベントリスナー
    purchaseNumber.addEventListener("change",function(e){
        e.preventDefault();
        let total = container.querySelectorAll("#total")[0];
        if(item.objName==="ETF Stock"){
            total.innerHTML = `<p>total :${(e.target.value > 0)?Math.floor(item.price * 10 * (Math.pow(1.1,e.target.value) - 1)):0} </p>`
        }else{
            total.innerHTML = `<p>total: ${(e.target.value > 0)?e.target.value * item.price : 0}</p>`
        }
        
    })
    btnBack.addEventListener("click",function(){
        switchPage(currentNode, nextNode);
        nextNode.append(makeInvestmentList(nextNode, currentNode, userAccount));
    })
    btnPrimary.addEventListener("click",function(){
        if(purchaseNumber.value > 0 && item.purchaseCheck(purchaseNumber.value, userAccount)){
            item.puschase(parseInt(purchaseNumber.value), userAccount);
            switchPage(currentNode, nextNode);
            nextNode.append(makeInvestmentList(nextNode, currentNode, userAccount));
        }else{
            if(purchaseNumber.value * item.price> userAccount.money){
                alert("You don't have enough money.")
            }else if(item.maxPosession < parseInt(purchaseNumber.value) + item.numOfPossession){
                alert("You can't buy anymore.");
            }
            switchPage(currentNode, nextNode);
            nextNode.append(makeInvestmentList(nextNode, currentNode, userAccount));
            
        }
    })
    return container;
}

//ページの表示切替のときにつかいます.
//switchPage(消すdiv, 表示するdiv)
function switchPage(none, display){
    none.innerHTML = "";
    displayNone(none);
    displayBlock(display);
}

//userのmoneyを更新するために1秒あたりの増加量の計算する関数
function calculationSumOfMoney(investmentArray){
    let sum = 0;
    for(let i = 0; i < investmentArray.length; i++){
       sum += investmentArray[i].sumOfIncome;
    }
    return sum;
}

initialize();