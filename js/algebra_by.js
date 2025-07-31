
document.getElementById("left").href = "geometric_by.html";
document.getElementById("right").href = "solution_by.html";

// *********************** PENDULUM PART************** //
gvt_T = 'Fg'; boy_T = "Fb" ; vis_T = "f'"
gbv = [250,250,250];
function shw(i)
{   
    gbv = [50,50,50];
    gbv[i] =250;
}

length = 0.75;
mass = 5.0;
gravity = 9.8;
mg = mass*gravity;
density = 1.2;
factorD = 20;
bob_r = 0.05*4; //for bouyant force the volume and surface area matters. change the size appropriately
bob_vol = 1.33*Math.PI*bob_r*bob_r*bob_r;
rhoVg = density*bob_vol*gravity;

explan = [0,0];
function xplain(i)
{
    explan = [0,0];
    explan[i] = 1;
    gbv = [250,250,250];

    const docx = document.documentElement;
    docx.style.setProperty('--exp0',explan[0]);
    docx.style.setProperty('--exp1',explan[1]);
}

function drawArrow(x1, x2,string) 
{   push();
    line(x1.x, x1.y, x2.x, x2.y); 
    var angle = atan2(x1.y - x2.y, x1.x - x2.x); 
    translate(x2.x, x2.y); 
    noStroke()
    text(string,10,10);
    rotate(angle-HALF_PI); 
    size =5
    triangle(-size/2, size, size/2, size, 0, -size/2); 
    pop();
}

grvty=["grvty",0]; boy=["boy",0]; rho=["rho",0];
gvt_T = 'Fg'; boy_T = "Fb" ; vis_T = "f'"
  
function draw()
{
  /***Create a canvas aka setup***/
  const wide = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const tall = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  p = wide*0.2;
  q = tall*0.6;
  var canvas =createCanvas(p,q);
  canvas.parent('section_2');
  frameRate(100);
  factor = windowHeight/2;
  o = createVector(p/3,50);

  /***Usual Draw function***/  
  background(255,255,255);
  theta = atan(0.5);
  x = factor*length*sin(theta) + o.x;
  y = factor*length*cos(theta) + o.y;

  fill(150,150,200);
  stroke(100,100,100);
  line(o.x,o.y,x,y); 
  line(30,50,p-30,50);
  ellipse(x,y,factor*2*bob_r);
 
  //coordinate (gray)
  stroke(190,190,190);
  drawingContext.setLineDash([2,2]);
  line(o.x,o.y,o.x,y+30);
  drawingContext.setLineDash([0]);

  //angle(orange)
  noFill();
  stroke(255,128,0);
  arc(o.x,o.y,50,50,PI/2-theta,PI/2);
  noStroke();
  fill(255,128,0);
  text('θ',o.x+5,o.y+40);   

  v1 = createVector(x,y);

  //Gravity(red)
  v2 = createVector(x,y+mg);
  stroke (150,0,0,gbv[0]);
  fill(150,0,0,gbv[0])
  drawArrow(v1,v2,'mg');
  
  //buoyancy(blu)
  v2 = createVector(x,y-rhoVg*factorD);
  stroke (0,0,150,gbv[1]);
  fill(0,0,150,gbv[1])
  drawArrow(v1,v2,'rho*V*g[x10]');
}
