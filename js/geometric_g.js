document.getElementById("left").href = "geometric_a.html";
document.getElementById("right").href = "algebra_g.html";

//******************info part***********************//
gvt_T = 'Fg'; gvt_cos = "Fg_cosθ" ; gvt_sin = "Fg_sinθ'"
const el = document.getElementById("infor");

function remov() 
{
  el.innerHTML="";
}
count_g = true; count_b = true; count_v = true;
//notes on gravity
function gnote()
{
  count_g = !count_g;
  if (count_g==false) 
  {
  el.innerHTML = '<text>The gravitational force acts on the mass in downward direction.</text><button onclick="remov()">ok</button>';
  }
  else { remov();}
}

//notes on buoyancy
function gcnote()
{
  count_b = !count_b;
  if (count_b==false) 
  {
    el.innerHTML = '<text>The cosine component of the gravitational force is balanced by the Tension on the string.</text><button onclick="remov()">ok</button>';
  }
  else { remov();}
}

//notes on viscous drag
function gsnote()
{
  count_v = !count_v;
  if (count_v==false) 
  { 
    el.innerHTML = '<text>The sine component of the gravitational force provides the restoring force, that sets the pendulum in oscillations.</text><button onclick="remov()">ok</button>';
  }
  else { 
    remov();
  }
}

// ************** PENDULUM PART************** //

// volume of bob = 1
factorz=1; 
length = 1;
gravity = 9.8;
mass = 5.0; 
density = 0;

let theta = Math.PI/4;
acc = 0;
w = 0 ;
bob_r = 0.05;

dt = 0.01;
function timeChanger(value)
{
    dt =value*0.01;
}

mg=mass*gravity;

let x;
let y;
grvty=["grvty",0]; grvty_c=["grvty_c",0]; grvty_s=["grvty_s",0];
cord=["cord",1];
ankle=["ankle",1]; legth=["legth",1]; amp=["amp",1];
x1 =0;
textop = 255;

function mark(s)
{   
    window[s[0]][1] = 255-window[s[0]][1]; 
    //const docx = document.documentElement;
    //if (s[0] =="cord") 
    //{
    //   x1 = 1-x1; 
    //  }
    //docx.style.setProperty('--x1',x1);
}


factor =300 ;

function drawArrow(x1, x2,string) 
{   push();
    line(x1.x, x1.y, x2.x, x2.y); 
    var angle = atan2(x1.y - x2.y, x1.x - x2.x); 
    translate(x2.x, x2.y); 
    noStroke();
    text(string,10,10);
    rotate(angle-HALF_PI); 
    size =5
    triangle(-size/2, size, size/2, size, 0, -size/2); 
    pop();
}

  hist = [];
function draw()
{
  /***Create a canvas aka setup***/
  const wide = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const tall = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  p = wide*0.5;
  q = tall*0.65
  var canvas =createCanvas(p,q);
  canvas.parent('section_2');
  frameRate(100);
  factor = windowHeight/2;
  o = createVector(p/2,0);

  /***Usual Draw function***/
  background(255,255,255);
  f = -mass*gravity;
  let torq = f*sin(theta)/length;
  acc = torq/mass;
  w += acc*dt;
  theta += w*dt;
 
  hist.push(theta);
  hist=hist.splice(-p*0.02/dt);

  x = factor*length*sin(theta) + o.x;
  y = factor*length*cos(theta) + o.y;

//string and bob(darkblue)
  fill(0,0,0);
  ellipse(o.x,o.y,10,10);

  stroke(100,100,100);
  line(o.x,o.y,x,y);
  fill(180,180,200); 
  ellipse(x,y,factor*2*bob_r);
  noStroke();

  //coordinate (gray)
  stroke(10,10,10);
  drawingContext.setLineDash([2,2]);
  line(o.x,0,o.x,length*factor);
  line(o.x-(length*factor),0,o.x+length*factor+50,0);
  drawingContext.setLineDash([0]);

// angle(green)
  noFill();
  stroke(100,200,100);
  if(theta<-0.05)
  {
    stroke(150,0,150);
    arc(o.x,o.y,50,50,PI/2,PI/2-theta);
    noStroke();
    fill(100,200,100);
    text('θ',o.x+20*sin(theta),o.y+20+30*cos(theta));
  }
  if(theta>0.05 )
  {
    stroke(150,0,150);
    arc(o.x,o.y,50,50,PI/2-theta,PI/2);
    noStroke();
    fill(100,200,100);
    text('θ',o.x+20*sin(theta),o.y+20+30*cos(theta));   
  }
  drawingContext.setLineDash([0]);

  //length(red)
  noFill();
  stroke(200,100,100);
  line(o.x,o.y,x,y);
  line(o.x-5*cos(theta),o.y+5*sin(theta),o.x+5*cos(theta),o.y-5*sin(theta));
  line(x-5*cos(theta),y+5*sin(theta),x+5*cos(theta),y-5*sin(theta));
  noStroke();
  fill(200,100,100);
  text('l',o.x+length*factor*sin(theta)/2,length*factor*cos(theta)/2);
  drawingContext.setLineDash([0]);
  
  //useful text
  //noStroke();
  //textSize(13);
  //fill(100,100,100);
  //text("drag and drop the bob !!",10,15);
  //fill(10,10,10,cord[1]);
  //text("x'",o.x+length*factor+55,30)
  //text("x",o.x-(length*factor+60),30)
  //text("y",o.x+5,10)
  //text("y'",o.x+5,length*factor+60)

  v1 = createVector(x,y);

  //Gravity(red)
  v2 = createVector(x,y+mg*factorz);
  stroke (150,0,0,grvty[1]);
  fill(150,0,0,grvty[1])
  drawArrow(v1,v2,gvt_T);

//vis(green) 
  v2 = createVector(x+mg*cos(theta)*sin(theta)*factorz,y+mg*cos(theta)*cos(theta)*factorz);
  stroke (0,150,0,grvty_c[1]);
  fill(0,150,0,grvty_c[1])
  drawArrow(v1,v2,gvt_cos);

//Gravity cosine component(blu) tension
  v2 = createVector(x-mg*cos(theta)*sin(theta),y-mg*cos(theta)*cos(theta));
  stroke (0,0,150,grvty_c[1]);
  fill(0,0,150,grvty_c[1])
  drawArrow(v1,v2,'T');

//vis(green) 
  v2 = createVector(x-mg*sin(theta)*cos(theta)*factorz,y+mg*sin(theta)*sin(theta)*factorz);
  stroke (0,150,0,grvty_s[1]);
  fill(0,150,0,grvty_s[1])
  drawArrow(v1,v2,gvt_sin);

}

function mousePressed()
{
    if(abs(mouseX-o.x)<width/2 && mouseY<height && mouseY>0)
    { noLoop();  }
}
function mouseReleased()
{
    loop()
}

function mouseDragged()
{
    if(abs(mouseX-o.x)<width/2 && mouseY<height && mouseY>0)
    {
        length = dist(mouseX,mouseY,o.x,o.y)/300;
        theta = atan((mouseX-o.x)/(mouseY-o.y));
        w = 0;
        redraw();   
    }
}