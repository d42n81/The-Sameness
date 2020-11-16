var N = 1600 // number of input samples
var M = 100 // number of circles
var q = 20000 // number var N = 1600 // number of input samples
var M = 425 // number of circles
var q = 20000 // number of output samples
var viewbox = {width: 1080};
var setupDone = false;
var svg;
var showCircles = true;
var showLines = true;
sceneNumber = 1;
var startX = 0;
var startY = 0;
// var date = new Date();
var startTime = 0;
var repeatTime;
var dialogueOffsetTime1 = 126;
var dialogueOffsetTime2 = 33;
var dialogueOffsetTime4 = 18; 
var audioPlaying = false;

var follow = true;

var DFT
var l
var P
var K
var t = 0;

function play() {
    var audio = document.getElementById("audio");
    audio.play();
}

function start() {
    createCanvas(1080, 720);
    // remove the button:
    let button = document.getElementById("startButton");
    button.remove();
    setupDone = true
    
    // set time
    startTime = new Date().getTime();
    console.log("Start Time is " + startTime);
    repeatTime = startTime;
    play();
}

//Step function
var first = false;
function aabs([re, im]) {
    return Math.hypot(re, im);
}

function expim(im) {
return [Math.cos(im), Math.sin(im)];
}

function add([rea, ima], [reb, imb]) {
    return [rea + reb, ima + imb];
}

function mul([rea, ima], [reb, imb]) {
    return [rea * reb - ima * imb, rea * imb + ima * reb];
}

let zoom;
let speed;
function setSpeed(num){
    speed = num;
}
function setZoom(num){
    zoom = num;
}
function toggleOnlyPicture(){
    showCircles = !showCircles;
    showLines = !showLines;
}


async function switchScene(num){
  sceneNumber = num;
  // clear canvas
  clear();
//   background(0);
//   reset();
//   remove();
//   createCanvas(1080, 720);
//   startX += 1000;
//   startY += 100;
  R = [];
  console.log("Switching Scene");
  sceneSetup();
}

async function sceneSetup() {
  setupDone = false;
  
  switch (sceneNumber) {
    case 0:
        svg = await fetch("Fourier 6 SVG-01.svg")
        .then(response => response.text())
        .then(text => (new DOMParser).parseFromString(text, "image/svg+xml"))
        .then(svg => svg.documentElement);
        // zoom = 9;
        // speed = 30;
        // showLines = false;
        // showCircles = false;  
        // follow = false;

        zoom = 12;
        speed = 6;
        showLines = true;
        showCircles = true;
        follow = false;
      break;
    case 1:
      svg = await fetch("Fourier 1 Redo SVG-01.svg")
        .then(response => response.text())
        .then(text => (new DOMParser).parseFromString(text, "image/svg+xml"))
        .then(svg => svg.documentElement);
        zoom = 40;
        speed = 1;

      break;
    case 2:
      svg = await fetch("Fourier 2 Redo SVG-01.svg")
        .then(response => response.text())
        .then(text => (new DOMParser).parseFromString(text, "image/svg+xml"))
        .then(svg => svg.documentElement);
        zoom = 24;
        speed = 4;
        showLines = true;
        showCircles = true;
        follow = true;
        
      break;
    case 3:
        svg = await fetch("Fourier 3 SVG-01.svg")
        .then(response => response.text())
        .then(text => (new DOMParser).parseFromString(text, "image/svg+xml"))
        .then(svg => svg.documentElement);
        zoom = 10;
        speed = 6;
        follow = false;
        showCircles = true;
        showLines = true;
      break;
    case 4:
        svg = await fetch("Fourier 4 SVG-01.svg")
        .then(response => response.text())
        .then(text => (new DOMParser).parseFromString(text, "image/svg+xml"))
        .then(svg => svg.documentElement);
        zoom = 12;
        speed = 9;
        showLines = true;
        showCircles = true;
        follow = true;
      break;
    case 5:
        svg = await fetch("Fourier 5 SVG-01.svg")
        .then(response => response.text())
        .then(text => (new DOMParser).parseFromString(text, "image/svg+xml"))
        .then(svg => svg.documentElement);
        zoom = 16;
        speed = 6;
        showLines = true;
        showCircles = true;
        follow = true;
      break;
    case 6:
        svg = await fetch("Fourier 6 SVG-01.svg")
        .then(response => response.text())
        .then(text => (new DOMParser).parseFromString(text, "image/svg+xml"))
        .then(svg => svg.documentElement);
        zoom = 12;
        speed = 6;
        showLines = true;
        showCircles = true;
        follow = false;
      break;
  }
  // end switch
  console.log("SVG = " + svg);
    let path2 = svg.querySelector("path")
    l = path2.getTotalLength()
    P = Array.from({length: N}, (_, i) => {
        const {x, y} = path2.getPointAtLength(i / N * l);
        return [x - viewbox.width / 2, y - viewbox.height / 2];
    })
    console.log(P)

    K = Int16Array.from({length: M}, (_, i) => (1 + i >> 1) * (i & 1 ? -1 : 1))
    console.log(K);

    DFT = Array.from(K, k => {
        let x = [0, 0];
        for (let i = 0, N = P.length; i < N; ++i) {
        x = add(x, mul(P[i], expim(k * i / N * 2 * -Math.PI)));
        }
        return [x[0] / N, x[1] / N];
    })
    console.log(DFT);
    setupDone = true
    // set time
    startTime = new Date().getTime();
    console.log("Start Time is " + startTime);
    repeatTime = startTime;
}

async function setup(){
    // let i = 0;
    // for(i; i < 1000; i++) {
    //     ;
    // }
    svg = await fetch("Fourier 1 Redo SVG-01.svg")
        .then(response => response.text())
        .then(text => (new DOMParser).parseFromString(text, "image/svg+xml"))
        .then(svg => svg.documentElement);
    // let svg = await fetch("Artboard 1.svg")
    //     .then(response => response.text())
    //     .then(text => (new DOMParser).parseFromString(text, "image/svg+xml"))
    //     .then(svg => svg.documentElement);
    // sceneSetup();

    // createCanvas(1080, 720);
    zoom = 40; // zoom is set here!
    // speed = createSlider(1,10,1);
    speed = 2; // Speed is set here!
    viewbox = svg.viewBox.baseVal


    console.log("SVG = " + svg);
    let path2 = svg.querySelector("path")
    l = path2.getTotalLength()
    P = Array.from({length: N}, (_, i) => {
        const {x, y} = path2.getPointAtLength(i / N * l);
        return [x - viewbox.width / 2, y - viewbox.height / 2];
    })
    console.log(P)

    K = Int16Array.from({length: M}, (_, i) => (1 + i >> 1) * (i & 1 ? -1 : 1))
    console.log(K);

    DFT = Array.from(K, k => {
        let x = [0, 0];
        for (let i = 0, N = P.length; i < N; ++i) {
        x = add(x, mul(P[i], expim(k * i / N * 2 * -Math.PI)));
        }
        return [x[0] / N, x[1] / N];
    })
    console.log(DFT);
    // setupDone = true
    
    // // set time
    // startTime = date.getTime();
    // console.log("Start Time is " + startTime);
    // repeatTime = startTime;
}
var width = 1080;
var R = [];
function draw() {
    // if(audioPlaying == false){
    //     audioPlaying = true;
    //     play(); // play the audio.
        
    // }

    background(0);
    //translate(600, 600);


    if(setupDone){
        // if(sceneNumber != 0){
        //     switchScene(0);
        // }
        if(sceneNumber == 0){
            // practice drawing details:
            
            currentTime = new Date().getTime();
            if(currentTime >= (startTime + 40000) && currentTime <= (startTime + 40100)){
                // show pic only for dialogue
                // speed = 8;
                zoom = 10;
                follow = false;
                showCircles = false;
                showLines = false;
            }

            // if scene 6 is out for dialogue:
            if(zoom == 10 && follow == false){
                // begin bunny details
                push(); // right eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(0.15);
                ellipse(490,260,20, 30); // 190 310 = right 300 up 50
                pop();

                push(); // left eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(.15);
                ellipse(430,260,20, 30);
                pop();

                push(); // smile
                rotate(-.2);
                stroke(200);
                arc(380, 390, 80, 80, 0, Math.PI + (Math.PI/8), PIE);
                pop();

                push(); // left cheek
                fill(192,192,192)
                ellipse(380, 310, 30);
                pop();

                // push(); // right cheek
                // fill(192,192,192)
                // ellipse(230, 360, 30);
                // pop();

                push(); // nose
                // fill(255,255,255)
                // ellipse(240, 290, 10);
                // rotate(-.75);
                triangle(440, 295, 450, 295, 440, 285 );
                pop();
                // end bunny details

                // begin bear details
                push(); // left eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(-.25);
                ellipse(515,325,10, 20);
                pop();

                push(); // right eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(-.25);
                ellipse(546,315,10, 20); // 496 315
                pop();

                push(); // Oval Face
                stroke(200);
                // rotate(-.25);
                ellipse(505,385,50, 80); // 465 355
                pop();

                push(); // nose
                fill(192, 192, 192);
                ellipse(505, 365, 10);
                pop();

                push(); // mouth
                line(505, 375, 505, 395) // top line
                line(490, 375, 505, 395); // left line
                line(520, 375, 505, 395) 
                pop();
                // end bear details

                
            }

            // if(currentTime >= (startTime + 84100 + (1000 * 0))){
            //     // transition to scene 6 now that dialogue is over.
            //     switchScene(6);
            // }
        }
        // console.log("" + date.getTime());
        // SetUp Cinematography Here:
        if(sceneNumber == 1){
            // draw details:
            // ellipse(0,0,100);
            // handle timing:
            currentTime = new Date().getTime();
            if(currentTime >= (repeatTime + 4000) && currentTime <= (repeatTime + 4100)){
                console.log("It has been four seconds! Current time is: " + currentTime);
                // increase zoom:
                repeatTime = currentTime;
                if(zoom > 14){
                    setZoom(zoom - 2);
                    console.log("Zoom is:  " + zoom);
                }
                
            }

            if (currentTime >= (startTime + 22000) && currentTime <= (startTime + 22100)){
                console.log("Been 22 seconds. Speed set to 4");
                setSpeed(4);
            }

            if (currentTime >= (startTime + 45000) && currentTime <= (startTime + 45100)){
                console.log("Been 45 seconds. Speed set to 6");
                setSpeed(6);
            }

            if (currentTime >= (startTime + 60000) && currentTime <= (startTime + 60100)){
                console.log("Been 60 seconds. Speed set to 8");
                setZoom(10);
                setSpeed(8);
            }

            if (currentTime >= (startTime + 90000) && currentTime <= (startTime + 90100)){
                console.log("Been 90 seconds. Speed set to 10");
                setSpeed(10);
            }
            // at 95000 ms after start time, cut the music down clear everything to just show the pictures.
            if (currentTime >= (startTime + 95000) && currentTime <= (startTime + 95100)){
                console.log("Been 95 seconds. Setting FOllow to false and toggling pic.");
                follow = false;
                setSpeed(15);
                // toggleOnlyPicture();
                showCircles = false;
                showLines = false;
                
            }

            if(currentTime >= (startTime + 95100)){
                // draw facial details.
                // begin bunny details
            push(); // right eye
            fill(255, 255, 255);
            stroke(75);
            rotate(-0.25);
            ellipse(180,310,20, 30);
            pop();

            push(); // left eye
            fill(255, 255, 255);
            stroke(75);
            rotate(-.25);
            ellipse(120,320,20, 30);
            pop();

            push(); // smile
            rotate(-0.55);
            stroke(200);
            arc(40, 405, 80, 80, 0, Math.PI + (Math.PI/8), PIE);
            pop();

            push(); // left cheek
            fill(192,192,192)
            ellipse(140, 360, 30);
            pop();

            push(); // right cheek
            fill(192,192,192)
            ellipse(330, 270, 30);
            pop();

            push(); // nose
            // fill(255,255,255)
            // ellipse(240, 290, 10);
            // rotate(-.1);
            triangle(230, 300, 240, 290,240, 300 );
            pop();
            // end bunny details

            // begin bear details
            push(); // left eye
            fill(255, 255, 255);
            stroke(75);
            // rotate(-.25);
            ellipse(555,280,10, 20);
            pop();

            push(); // right eye
            fill(255, 255, 255);
            stroke(75);
            // rotate(-.25);
            ellipse(615,280,10, 20);
            pop();

            push(); // Oval Face
            stroke(200);
            // rotate(-.25);
            ellipse(585,310,50, 80);
            pop();

            push(); // nose
            fill(192, 192, 192);
            ellipse(585, 290, 10);
            pop();

            push(); // mouth
            line(585,290, 585, 310) // top line
            line(575, 330, 585, 310); // left line
            line(595, 330, 585, 310) 
            pop();
            // end bear details
            }

            if(currentTime >= (startTime + 95100 + (1000 * dialogueOffsetTime1))){
                // transition to scene 2 now that dialogue is over.
                switchScene(2);
                console.log("New Start time is: " + startTime);
            }
        }

        // scene 2
        if(sceneNumber == 2 && setupDone == true){
            currentTime = new Date().getTime();
            if(currentTime >= (startTime + 4000) && currentTime <= (startTime + 4100)){
                // go faster
                speed = 8;
                zoom = 18;
            }

            if(currentTime >= (startTime + 12000) && currentTime <= (startTime + 12100)){
                // go faster
                speed = 14;
                zoom = 18;
            }

            if(currentTime >= (startTime + 20000) && currentTime <= (startTime + 20100)){
                // go faster
                speed = 20;
                zoom = 14;
            }

            if(currentTime >= (startTime + 31000) && currentTime <= (startTime + 31100)){
                // go slower
                speed = 2;
                zoom = 20;
            }

            if(currentTime >= (startTime + 56000) && currentTime <= (startTime + 56100)){
                // go out for dialogue. Music cuts out here.
                speed = 10;
                zoom = 9;
                follow = false;
                showLines = false;
                showCircles = false
            }

            // if scene 2 is out for dialogue draw shapes:
            if(zoom == 9 && follow == false){
                // begin bunny details
                push(); // right eye
                fill(255, 255, 255);
                stroke(75);
                rotate(0.15);
                ellipse(310,320,20, 30);
                pop();

                push(); // left eye
                fill(255, 255, 255);
                stroke(75);
                rotate(.15);
                ellipse(240,280,20, 30);
                pop();

                push(); // smile
                rotate(0.4);
                stroke(200);
                arc(340, 270, 80, 80, 0, Math.PI + (Math.PI/8), PIE);
                pop();

                push(); // left cheek
                fill(192,192,192)
                ellipse(150, 330, 30);
                pop();

                push(); // right cheek
                fill(192,192,192)
                ellipse(300, 410, 30);
                pop();

                push(); // nose
                // fill(255,255,255)
                // ellipse(240, 290, 10);
                // rotate(-.1);
                triangle(220, 370, 210, 360, 210, 370 );
                pop();
                // end bunny details

                // begin bear details
                push(); // left eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(-.25);
                ellipse(555,300,10, 20);
                pop();

                push(); // right eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(-.25);
                ellipse(615,300,10, 20);
                pop();

                push(); // Oval Face
                stroke(200);
                // rotate(-.25);
                ellipse(585,330,50, 80);
                pop();

                push(); // nose
                fill(192, 192, 192);
                ellipse(585, 310, 10);
                pop();

                push(); // mouth
                line(585, 310, 585, 330) // top line
                line(575, 350, 585, 330); // left line
                line(595, 350, 585, 330) 
                pop();
                // end bear details

                // begin other details:
                push(); // berries
                fill(255, 255,255)
                ellipse(830, 650, 10)
                ellipse(810, 630, 10)
                ellipse(850, 600, 10)
                ellipse(870, 650, 10)
                ellipse(920, 580, 10)
                ellipse(910, 550, 10)
                ellipse(980, 520, 10)
                pop();

                push(); // butterfly wings
                fill(255,255,255);
                ellipse(605,170, 10);
                ellipse(630,140, 10);
                ellipse(635,195, 10);
                ellipse(655,155, 10);
                pop();
            }

            if(currentTime >= (startTime + 56100 + (1000 * dialogueOffsetTime2))){
                // transition to scene 3 now that dialogue is over.
                switchScene(3);
            }
        }

        // scene 3
        if(sceneNumber == 3 && setupDone == true){
            currentTime = new Date().getTime();
            if(currentTime >= (startTime + 29000) && currentTime <= (startTime + 29100)){
                // go faster
                speed = 8;
                console.log("29 seconds into scene 3");
                // zoom = 18;
            }

            if(currentTime >= (startTime + 51000) && currentTime <= (startTime + 51100)){
                // go faster
                speed = 10;
                console.log("51 seconds into scene 3");
                // zoom = 18;
            }

            if(currentTime >= (startTime + 77000) && currentTime <= (startTime + 77100)){
                // toggle picture
                showLines = false;
                showCircles = false;
            }

            if(currentTime >= (startTime + 87000) && currentTime <= (startTime + 87100)){
                // Switch scene.
                switchScene(4)
                showCircles = true;
                showLines = true;
            }
        }

        // scene 4:
        if(sceneNumber == 4 && setupDone == true){
            currentTime = new Date().getTime();
            if(currentTime >= (startTime + 52000) && currentTime <= (startTime + 52100)){
                // show pic only for dialogue
                // speed = 8;
                zoom = 10;
                follow = false;
                showCircles = false;
                showLines = false;
            }

            // if scene 4 is out for dialogue:
            if(zoom == 10 && follow == false){
                // begin bunny details
                push(); // right eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(0.15);
                ellipse(190,310,20, 30);
                pop();

                push(); // left eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(.15);
                ellipse(130,310,20, 30);
                pop();

                push(); // smile
                rotate(-.2);
                stroke(200);
                arc(90, 380, 80, 80, 0, Math.PI + (Math.PI/8), PIE);
                pop();

                push(); // left cheek
                fill(192,192,192)
                ellipse(90, 370, 30);
                pop();

                push(); // right cheek
                fill(192,192,192)
                ellipse(230, 360, 30);
                pop();

                push(); // nose
                // fill(255,255,255)
                // ellipse(240, 290, 10);
                // rotate(-.75);
                triangle(160, 345, 170, 345, 160, 335 );
                pop();
                // end bunny details

                // begin bear details
                push(); // left eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(-.25);
                ellipse(435,325,10, 20);
                pop();

                push(); // right eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(-.25);
                ellipse(496,325,10, 20);
                pop();

                push(); // Oval Face
                stroke(200);
                // rotate(-.25);
                ellipse(465,355,50, 80);
                pop();

                push(); // nose
                fill(192, 192, 192);
                ellipse(465, 335, 10);
                pop();

                push(); // mouth
                line(465, 335, 465, 355) // top line
                line(455, 375, 465, 355); // left line
                line(475, 375, 465, 355) 
                pop();
                // end bear details

                
            }

            if(currentTime >= (startTime + 52100 + (1000 * dialogueOffsetTime4))){
                // transition to scene 5 now that dialogue is over.
                switchScene(5);
            }
        }

        // scene 5:
        if(sceneNumber == 5 && setupDone == true){
            currentTime = new Date().getTime();
            if(currentTime >= (startTime + 52000) && currentTime <= (startTime + 52100)){
                // show pic only for dialogue
                // speed = 8;
                zoom = 10;
                follow = false;
                showCircles = false;
                showLines = false;
            }
            if(currentTime >= (startTime + 84100 + (1000 * 0))){
                // transition to scene 6 now that dialogue is over.
                switchScene(6);
            }
        }

        // scene 6:
        if(sceneNumber == 6 && setupDone == true){
            currentTime = new Date().getTime();
            if(currentTime >= (startTime + 40000) && currentTime <= (startTime + 40100)){
                // show pic only for dialogue
                // speed = 8;
                zoom = 10;
                follow = false;
                showCircles = false;
                showLines = false;
            }

            // if scene 6 is out for dialogue:
            if(zoom == 10 && follow == false){
                speed = 5;
                // begin bunny details
                push(); // right eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(0.15);
                ellipse(490,260,20, 30); // 190 310 = right 300 up 50
                pop();

                push(); // left eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(.15);
                ellipse(430,260,20, 30);
                pop();

                push(); // smile
                rotate(-.2);
                stroke(200);
                arc(380, 390, 80, 80, 0, Math.PI + (Math.PI/8), PIE);
                pop();

                push(); // left cheek
                fill(192,192,192)
                ellipse(380, 310, 30);
                pop();

                // push(); // right cheek
                // fill(192,192,192)
                // ellipse(230, 360, 30);
                // pop();

                push(); // nose
                // fill(255,255,255)
                // ellipse(240, 290, 10);
                // rotate(-.75);
                triangle(440, 295, 450, 295, 440, 285 );
                pop();
                // end bunny details

                // begin bear details
                push(); // left eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(-.25);
                ellipse(515,325,10, 20);
                pop();

                push(); // right eye
                fill(255, 255, 255);
                stroke(75);
                // rotate(-.25);
                ellipse(546,315,10, 20); // 496 315
                pop();

                push(); // Oval Face
                stroke(200);
                // rotate(-.25);
                ellipse(505,385,50, 80); // 465 355
                pop();

                push(); // nose
                fill(192, 192, 192);
                ellipse(505, 365, 10);
                pop();

                push(); // mouth
                line(505, 375, 505, 395) // top line
                line(490, 375, 505, 395); // left line
                line(520, 375, 505, 395) 
                pop();
                // end bear details

                
            }
        }
        

        // End Cinematography
        const scale2 = zoom/10 * width / viewbox.width;
        const a = t * 2 / q * Math.PI;

        // Calculate the current point.
        let p = [startX, startY];
        for (let i = 0; i < M; ++i) {
        p = add(p, mul(DFT[i], expim(a * K[i])));
        }

        // Zoom.

        translate(width / 2, height / 2);
        scale(scale2);
        if(follow) translate(-p[0], -p[1]);
        // console.log("-p[0] is: " + -p[0] + " -p[1] is: " + -p[1]);
        // if(follow) translate(startX,startY);


        // Draw circles.
        if(showCircles){
            noFill();
            stroke(75);
            for (let i = 0, p = [startX, startY]; i < M; ++i) {
                const r = aabs(DFT[i]);
                ellipse(p[0], p[1],r*2);
                p = add(p, mul(DFT[i], expim(a * K[i])));
            }
        }
        


        // Draw lines.
        /*
        context.beginPath();
        context.moveTo(0, 0);
        */
        if(showLines){
                stroke(125);
            for (let i = 0, p = [startX, startY]; i < M; ++i) {
                prevP = p;
                p = add(p, mul(DFT[i], expim(a * K[i])))
                line(...prevP,...p);
            }
        }
        


        // Draw the path.
        beginShape();
        noFill();
        stroke(255)
        if (R.length < q) R.push(p);
        for (let i = 1, n = R.length; i < n; ++i) {
            vertex(...R[i]);
        }
        endShape();
        // t+=speed.value();
        t+= speed;
    }
}


function keyPressed(){
    if (key == "q"){
        follow = !follow;
    }
}