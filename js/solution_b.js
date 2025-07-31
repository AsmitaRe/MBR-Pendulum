
document.getElementById("left").href = "solution.html";
document.getElementById("right").href = "overview.html";

// *********************** PENDULUM PART************** //
// volume of bob = 1
length = 1;
gravity = 9.8;
mass = 50;
density = 0;
c = 0;
let theta = Math.PI/4;
theta0 = theta;
acc = 0;
w = 0 ;
bob_r = 0.05;

dt = 0.01;
let x;
let y;


function lengthChanger(i){
    document.getElementById('lc').innerHTML = i;
    length = i;
    w = 0;
    t=-0.01;  
}
function thetaChanger(i){
    document.getElementById('tc').innerHTML = i;
    theta = i*Math.PI/180;
    theta0 = theta;
    t=-0.01;
}
function gravityChanger(i){
    document.getElementById('gc').innerHTML = i;
    gravity = i;
    t=-0.01;
    //w = 0;
}
function massChanger(i){
    document.getElementById('mc').innerHTML = i;
    mass = i;
    t=-0.01;
    //w = 0;
}
function densityChanger(i){
    document.getElementById('dc').innerHTML = i;
    density = i;
    c = 3*i;
    t=-0.01;
}
 
hist =[];
t =0;


//Create a canvas 
function setup()
{  
  p = windowWidth;
  q = windowHeight;
  var canvas =createCanvas(p*0.6,q*0.95);
  canvas.parent('section_2');
  frameRate(100);
}

//Usual Draw function//
function draw()
{
  o = createVector(p*0.3,0);
  factor = windowHeight/2;
  background(255,255,250);

  f = -mass*gravity + density*gravity ;
  let torq = f*sin(theta)/length - c*w*length*length;
  acc = torq/mass;

  w += acc*dt;
  theta += w*dt;
  
  theta = theta%(2*PI);
  x = factor*length*sin(theta) + o.x;
  y = factor*length*cos(theta) + o.y;
  
  stroke(100,100,100);
  line(o.x,o.y,x,y);
  fill(180,180,200)
  ellipse(x,y,factor*2*bob_r);

  hist.push(theta);
  hist=hist.splice(-p*2);
  noStroke();
  t += dt;
  text(round(t*100)/100+'s',20,20);

  push();
  drawingContext.setLineDash([5, 5]);
  stroke(127,127,127);
  line(0,q*0.8,p,q*0.8);
  pop();

  push();
  noFill();
  beginShape();
  stroke(255,153,51);
  for (i =0;i<hist.length;i++)
  {  
    vertex(i/2,-hist[i]*60 + q*0.8);  
  }
  endShape();
  pop();

  updateEq();
   

   if (t>=100){t=0;theta=Math.PI/4}
}
function mousePressed()
{
    if(abs(mouseX-o.x)<width/2 && abs(mouseY-o.y)<height)
    { noLoop();  }
}
function mouseReleased()
{
  loop();  
}

function mouseDragged()
{
    if(abs(mouseX-o.x)<width/2 && abs(mouseY-o.y)<height)
    {
        length = dist(mouseX,mouseY,o.x,o.y)/300;
        theta = atan((mouseX-o.x)/(mouseY-o.y));
        theta0 = theta;
        w = 0;
        t = -0.01;
        hist = [];
        redraw();   
    }
}

function windowResized() {
    p = windowWidth;
    q = windowHeight;
    resizeCanvas(p*0.6,q*0.95);
  }

function updateEq()
{
t1 = Math.round(theta*180/Math.PI);t2 = Math.round(c*10)/10;t3 =  mass;t4 =  Math.round(t*10)/10;
t5 = Math.round(theta0*180/Math.PI);t6 =  Math.round(gravity*10)/10; t7 = Math.round(length*10)/10; t8 = t4;

document.getElementById('t1').innerHTML = t1;
document.getElementById('t2').innerHTML = t2;
document.getElementById('t3').innerHTML = t3;
document.getElementById('t4').innerHTML = t4;
document.getElementById('t5').innerHTML = t5;
document.getElementById('t6').innerHTML = t6;
document.getElementById('t7').innerHTML = t7;
document.getElementById('t8').innerHTML = t8;

}