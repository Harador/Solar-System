const shadow = document.querySelector('.shadow');
const sel1 = document.getElementById('sel1');
const sel2 = document.getElementById('sel2');

document.querySelector('.menu-but').addEventListener('click',()=>{
    shadow.classList.toggle('active');
})

document.getElementById('submit').addEventListener('click', ()=>{

    const pl1 = planets[sel1.value];
    const pl2 = planets[sel2.value];

    if(
        pl1 !== selPlanet1 || pl2 !== selPlanet2
    ){
        selPlanet1 = pl1;
        selPlanet2 = pl2;
        ctxBack.clearRect(0, 0, canvas.width, canvas.height);
    }

    shadow.classList.toggle('active');
})

const canvas = document.getElementById('canvas');
const canvasBack = document.getElementById('canvasBack');
const ctx = canvas.getContext('2d');
const ctxBack = canvasBack.getContext('2d');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

canvasBack.width = document.documentElement.clientWidth;
canvasBack.height = document.documentElement.clientHeight;

const cw = canvas.width;
const ch = canvas.height;
const scale = cw/1200;


class Planet{
    x = 0;
    y = 0;
    angle = 0;

    constructor(
        R, r, sp, c
    ){
        this.R = R * 250 * scale,
        this.r = r/1200 * scale;
        this.sp = 365.24/sp,
        this.c = c

        this.x = cw/2 * this.R
        this.y = cw/2 * this.R
    }
}

const merc  = new Planet(0.4, 4879,  88,    '#705858');
const venus = new Planet(0.7, 12104, 224.7, '#854040');
const earth = new Planet(1,   12756, 365.24,'green');
const mars  = new Planet(1.5, 6792,  687,   'red');

const planets = {
    merc, venus, earth, mars
}

let selPlanet1 = earth;
let selPlanet2 = mars;

setInterval(()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    replacePlanets();
    drawSun()
    drawPlanets();
    drawLine(selPlanet1, selPlanet2);
}, 10)

function drawLine(pl1, pl2){
    ctxBack.beginPath();
    ctxBack.lineWidth = 0.05;
    ctxBack.strokeStyle = 'white';       
    ctxBack.moveTo(pl1.x, pl1.y);   
    ctxBack.lineTo(pl2.x, pl2.y);  
    ctxBack.stroke();  
}

function drawSun(){
    ctx.beginPath();
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'yellow';
    ctx.fillStyle='yellow';
    ctx.arc(cw/2, ch/2, 20*scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();    
}

function drawPlanet(pl){
    ctx.beginPath();
    ctx.lineWidth = 7;
    ctx.strokeStyle = pl.c;
    ctx.fillStyle=pl.c;
    ctx.arc(pl.x, pl.y, pl.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();    
}

function drawPlanets(){
    Object.keys(planets).forEach((pl)=>{
        drawPlanet(planets[pl]);
    })
}

function replacePlanets(){
    Object.keys(planets).forEach((pl)=>{
        let planet = planets[pl];
        planet.x = cw/2 - Math.cos(planet.angle) * planet.R;
        planet.y = ch/2 - Math.sin(planet.angle) * planet.R;
        planet.angle+= 0.02 * planet.sp;
    })
}