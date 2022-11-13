const clock = document.querySelector("h2#clock");

function getClock()
{
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");//padStart(길이 지정, 빈 공간에 들어갈 글자)
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock,1000); //ms초마다 반복

//setTimeout(sayHello,3000); //ms초 후에 실행