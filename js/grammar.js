/*js에서 변수 만드는 방법
*const의 값은 뒤에서 바뀔 수 없고
*let의 값은 바뀔 수 있다*/

const a = 5;
let b = 3;

const myName = "yeji";

const hungry = true; //boolean도
const n = null;

console.log(a/b);
console.log("hello " + myName);

/*
*Array
*/
const daysOfWeek = ["mon","tue","wed"];
const nothing = [1,"hello", false, null];

console.log(daysOfWeek, nothing);

console.log(daysOfWeek[1]);
daysOfWeek.push("thu","fri");
console.log(daysOfWeek);


/*
*Object 생성
*/
const player = {
    name : "Han",
    point : 9801,
    beauty : true,
    fat : true,

    sayHello : function(otherPersonsName) //object 내에서 function 사용법
    {
        console.log("hello " + otherPersonsName + ", nice to meet you!");
    }
};

player.fat = false;
//object가 const여도 내부요소 수정可
player.lastName = "King";
//이렇게 요소 추가 可

console.log(player);
console.log(player.name);
        //==player["name"]
player.sayHello("Han");


/*
*Function
*/
function sayHello(name, age)
{
    console.log("Hello my name is "+name + " " + age);
}

sayHello("yeji", 25);

const calculator ={
    plus: function(a,b)
    {
        return a+b;
    },
    minus: function(a,b)
    {
        return a-b;
    },
    multiple: function(a,b)
    {
        return 1*b;
    },
    divide: function(a,b)
    {
        return a/b;
    },
    power: function(a,b)
    {
        return a**b;
    }
};

const result = calculator.divide(187,74);
console.log("The result is " + result);


/*
*Conditional
*/
const age = parseInt(prompt("How old are you")); //parseInt() : string => int

if(isNaN(age))//age가 숫자인지 아닌지 판단
{
    console.log("Please write a number");
}
else
{
//console.log(typeof age);
console.log(age);
}


/*
*Interact & css 사용
*
const title = document.getElementById("title");

title.innerText = "Got you!";
console.dir(title);
console.log(title);

const hello = document.querySelector(".hello h1"); //hello class 안에 하나의 element만 반환해줌(id는 앞에 # 붙임)
const hellos = document.querySelectorAll(".hello h1"); //hello 안에 여러 h1가 있다면, 그 모두를 반환

hello.innerText = "Hello";

console.log(hello);
*/

/*
const h1 = document.querySelector("div.hello h1");

function handleTitleClick()
{
    h1.innerText = "Mouse is clicked!";

    const curruentColor = h1.style.color;
    let newColor;

    if(curruentColor == "blue")
    newColor = "tomato";
    else 
    newColor = "blue";

    h1.style.color = newColor;
    //h1 html element mdn으로 찾아보고 Web API가 포함된 제목을 찾으면, 필요한 element들을 찾을 수 있음
}

h1.onclick = handleTitleClick;




function handleMouseEnter()
{
    h1.innerText = "Mouse is here!";
    h1.style.color = "blue";
}

function handleMouseLeave()
{
    h1.innerText = "Mouse is gone!";
    h1.style.color = "black";
}


h1.onclick = handleTitleClick; //title.addEventListener("click",handleTitleClick);과 같음
h1.addEventListener("mouseenter", handleMouseEnter);//이하 동일. 하지만 이 방법을 더 선호함
h1.addEventListener("mouseleave", handleMouseLeave);

function handleWindowResize()
{
    document.body.style.backgroundColor = "tomato";
}

function handleWindowCopy()
{
    altert("copier!");
}

function handleWindowOffline()
{
    alter("SOS no WIFI");
}

function handleWindowOnline()
{
    alter("All good");
}


window.addEventListener("resize",handleWindowResize);
window.addEventListener("copy", handleWindowCopy);
window.addEventListener("offline", handleWindowOffline);
window.addEventListener("online", handleWindowOnline);
*/

const h1 = document.querySelector("div.hello h1");

function handleTitleClick()
{
    h1.classList.toggle("active");

    /* 위와 같은 내용
    const activeClass = "active";

    if(h1.classList.contains(activeClass)) //h1.className === activeClass
            h1.classList.remove(activeClass);//h1.className = "";
    else
        h1.classList.add(activeClass)//h1.className = activeClass;
    */
}

h1.addEventListener("click", handleTitleClick);

/*
*HTML에서의 정보 기억하고 사용하기
*/
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASS ="hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event)
{
    event.preventDefault();

    loginForm.classList.add(HIDDEN_CLASS);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY,username); //setItem, getItem, removeItem
    
    paintGreetings(username);
}

function paintGreetings(username)
{
    greeting.classList.remove(HIDDEN_CLASS);
    greeting.innerText = `Hello ${savedUsername}`;//== "Hello " + username;
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null)
{
    loginForm.classList.remove(HIDDEN_CLASS);
    loginForm.addEventListener("submit", onLoginSubmit);
}
else
{
    paintGreetings(savedUsername);
}
