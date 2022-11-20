const musics = [
    {music : "L'Amour, Les Baguettes, Paris", singer : "스텔라장"},
    {music : "Angel", singer : "포레스텔라"},
    {music : " 僕が死のうと思ったのは", singer : "달마발"},
    {music : "나를 사랑하지 않는 그대에게", singer : "이소라"},
    {music : "아직도 기억하고 있어요", singer : "포레스텔라"},
    {music : "サザンカ", singer : "SEKAI NO OWARI "},
    {music : "도망가자", singer : "선우정아"},
    {music : "스토커", singer : "10cm"}
    
];

const music = document.querySelector("#music span:first-child");
const singer = document.querySelector("#music span:last-child");

const todaysMusic = musics[Math.floor(Math.random()*musics.length)];

music.innerText = "♬ "+todaysMusic.music;
singer.innerText = todaysMusic.singer;