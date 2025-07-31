
document.getElementById("left").href = "algebra_vis.html";
document.getElementById("right").href = "idealisation_by.html";

// *********************** PENDULUM PART************** //
// volume of bob = 1
framerate = 50;
length = 1.0; //m
gravity = 9.8; //m/s^2
mass = 2; //kg
density = 2.4; //kg/m^3

length_new = 1.0; //m
gravity_new = 9.8; //m/s^2
mass_new = 2; //kg
density_new = 2.4; //kg/m^3
theta0_new = Math.PI/9;
bob_r_new = 0.1;

theta = Math.PI/9;
theta0 = theta;
acc = 0; //m/s^2
w = 0;  // m/s

density_real = 2.4;
theta_real = Math.PI/6;
theta0_real = theta_real;
acc_real = 0;
w_real = 0;

bob_r = 0.05; //m
bob_area = Math.PI*bob_r*bob_r;
bob_vol = 1.33*Math.PI*bob_r*bob_r*bob_r;

//dt = 1/framerate;
//let x;
//let y;

function thetaChanger(i){
    document.getElementById('tc').innerHTML = i;
    theta = i*Math.PI/180;
    theta_real = i*Math.PI/180;
    theta0 = theta;
    theta0_real = theta_real;

    length = length_new //m
    gravity = gravity_new; //m/s^2
    mass = mass_new; //kg
    density = density_new; //kg/m^3
    //r_bob = r_bob_new;
    bob_area=Math.PI*bob_r_new*bob_r_new;
    bob_vol=1.33*Math.PI*bob_r_new*bob_r_new*bob_r_new;
    
    w = 0;
    w_real=0;
    t = -dt;
    chisqq=0;
    reset();    
}
function lengthChanger(i){
    document.getElementById('lc').innerHTML = i;
    length_new = i;
    t = -dt;  
}
function gravityChanger(i){
    document.getElementById('gc').innerHTML = i;
    gravity_new = i;
    t = -dt;
}
function massChanger(i){
    document.getElementById('mc').innerHTML = i;
    mass_new = i;
    t = -dt;  
}
function radiusChanger(i){
    document.getElementById('rc').innerHTML = i;
    bob_r_new = i;
    t = -dt;
}
function densityChanger(i){
    document.getElementById('dc').innerHTML = i;
    density_new = i;
    //rhoA = density*bob_area;
    //rhoVg = density*bob_vol*gravity;
    t = -dt;
}
 
chisqq = 0;
hist_theta = [];
hist_w = [];
hist_acc =[];
hist_real = [];
t = 0;
dt = 1/framerate;
let x;
let y;

function reset(){
 noLoop();  
  hist_theta = [];
  hist_w = [];
  hist_acc = [];
  hist_real = [];
  graph_physicalworld();
  redraw();
  loop();   
}

//Create a canvas 
function setup()
{  
  p = windowWidth;
  q = windowHeight;
  var canvas =createCanvas(p*0.6,q*0.95);
  canvas.parent('section_2');
  frameRate(framerate);
}
function graph_physicalworld()
{
    // physical world
    density_real = 2.4;
    t_real=0;
    t=-dt;

    for (i = 0;i<800;i++){   
      f_real= -mass*gravity + density_real*bob_vol*gravity;
      let torq_real = f_real*sin(theta_real)/length - density_real*bob_area*w_real*length*length;
      acc_real = torq_real/mass;
      w_real += acc_real*dt;
      theta_real += w_real*dt;
      theta_real = theta_real%(2*PI);
      theta_real_w_err = theta_real*(1+(Math.random()-0.5)*0.2);

      hist_real.push(theta_real_w_err);
      t_real += dt;
      //hist_real = hist_real.splice(-p);
    }   
}

//Usual Draw function//
function draw()
{
  o = createVector(p*0.3,0);
  pixelsPerMeter = windowHeight/2;
  background(255,255,250);

  //numerical solution of the equation of motion of pendulum
  f = -mass*gravity;
  let torq = f*sin(theta)/length;
  acc = torq/mass;
  w += acc*dt;
  theta += w*dt;
  theta = theta%(2*PI);
 
  x = pixelsPerMeter*length*sin(theta) + o.x;
  y = pixelsPerMeter*length*cos(theta) + o.y;
  stroke(100,100,100);
  line(o.x,o.y,x,y);
  fill(100,100,100)
  ellipse(x,y,pixelsPerMeter*2*bob_r);

  hist_theta.push(theta);
  hist_w.push(w); 
  hist_acc.push(acc);
  hist_theta=hist_theta.splice(-p);
  hist_w=hist_w.splice(-p);
  hist_acc=hist_acc.splice(-p);

  noStroke();
  t += dt;
  text('time ' + round(t*100)/100+' s',20,10);

  push();
  drawingContext.setLineDash([5, 5]);
  stroke(127,127,127);
  line(0,q*0.8,p,q*0.8);
  pop();

//--Draw X axis
  push();
  drawingContext.setLineDash([5, 5]);
  stroke(127, 127, 127);
  line(0, q * 0.8, p, q * 0.8);
  // X-axis ticks and labels
  textAlign(CENTER, TOP);
  textSize(12);
  fill(127, 127, 127);
  let pixelsPerSecond = framerate; // 50 pixels = 1 second
  let xTickSpacing = pixelsPerSecond;
  for (let x = 0; x <= p; x += xTickSpacing*2) {
    line(x, q * 0.8 - 5, x, q * 0.8 + 5);
    let seconds = x / pixelsPerSecond;
    text(seconds + " s", x, q * 0.8 + 10);
  }
  // X-axis label
  textAlign(RIGHT, TOP);
  text("Time (s)", p/2, q * 0.8);
  pop();

  // Draw Y axis 
  push();
  drawingContext.setLineDash([5, 5]);
  stroke(127, 127, 127);
  let yAxisX = 50; // X-position of y-axis
  line(yAxisX, q * 0.65, yAxisX, q * 0.95);
  // Y-axis ticks and labels
  textAlign(RIGHT, CENTER);
  textSize(12);
  fill(127, 127, 127);
  let pixelsPerRadian = 60; // 500 pixels = 1 radian
  let thetaTickSpacing = 0.1 * pixelsPerRadian; // Ticks every 0.1 rad
  let yCenter = q * 0.8; // Zero point at canvas middle
  for (let theta = -1; theta <= 1; theta += 1) {
    let y = yCenter - theta * pixelsPerRadian; // Negative for upward theta
    line(yAxisX - 5, y, yAxisX + 5, y);
    text(theta.toFixed(1), yAxisX - 10, y);
  }
  // Y-axis label (theta)
  textAlign(CENTER, BOTTOM);
  text("θ (rad)", yAxisX, yCenter-3.14*pixelsPerRadian*0.5);
  pop();

  
  // Plot the data  
  push();
  noFill();
  beginShape();
  stroke(0,255,0);
  //if(hist_real.length==0){ 
  //      //theta0 = theta;
  //      //theta0_real = theta_real;
  //      w = 0;
  //      w_real=0;
  //      t = -dt;
  //      chisqq=0;   
  //      reset();
  //};
  for (i=0;i<hist_real.length;i++)
  {  
    vertex(i,-hist_real[i]*pixelsPerRadian + q*0.8);    
  }
  endShape();
  pop();
 
  // Plot theta, Velocity and Acceleration
  let pixelsPerUnitVel = 30; // 500 pixels = 1 radian
  let pixelsPerUnitAcc = 10; // 500 pixels = 1 radian
  push();
  noFill();
  beginShape();
  stroke(255,100,0);
  for (i =0;i<hist_theta.length;i++)
  {  
    vertex(i,-hist_theta[i]*pixelsPerRadian + q*0.8);  
  }
  endShape();
  pop();

  push();
  noFill();
  beginShape();
  stroke(255,209,0);
  for (i =0;i<hist_w.length;i++)
  {  
    vertex(i,-hist_w[i]*pixelsPerUnitVel + q*0.8);  
  }
  endShape();
  pop();

  push();
  noFill();
  beginShape();
  stroke(0,125,255);
  for (i =0;i<hist_acc.length;i++)
  {  
    vertex(i,-hist_acc[i]*pixelsPerUnitAcc + q*0.8);  
  }
  endShape();
  pop();

// Legend
  let legendItems = [
    { label: 'Fake Data: theta of the bob', color: [0,255,0, 200], value: 0 },
    { label: 'Model prediction: theta of the bob', color: [255, 100, 0, 200], value: 0 },
    { label: 'Model prediction: velocity of the bob.', color: [255, 200, 0, 200], value: 0 },
    { label: 'Model prediction: acceleration of the bob', color: [0,125,255, 200], value: 0 }
  ];

  let legendX = p*0.6-250; // Legend position
  let legendY = q*0.10;
  for (let i = 0; i < legendItems.length; i++) {
    let item = legendItems[i];
    fill(item.color);
    rect(legendX, legendY + i * 20 - 5, 20, 2); // Legend marker
    fill(0);
    text(`${item.label}`, legendX + 25, legendY + i * 20);
  }
  noFill();
  stroke(0);

  text('chisq ' + round(chisqq*100)/100,20,30);

  updateEq();

  if (hist_theta.length==hist_real.length){
      for (i = 0;i<hist_real.length;i++){   
          chisqq += (hist_real[i]-hist_theta[i])**2/hist_theta[i];
      }
      chisqq = chisqq/hist_real.length; 
      reset();
  }   
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
        theta_real = atan((mouseX-o.x)/(mouseY-o.y));
        theta0 = theta;
        theta0_real = theta_real;

        w = 0;
        w_real=0;
        t = -dt;
        chisqq=0;
        reset();  
    }
}
function windowResized() {
    p = windowWidth;
    q = windowHeight;
    resizeCanvas(p*0.6,q*0.95);
  }

function updateEq()
{
t1 = Math.round(theta*180/Math.PI); t2 = Math.round(density*10)/10;t3 =  mass;t4 =  Math.round(t*10)/10;
t5 = Math.round(theta0*180/Math.PI); t6 =  Math.round(gravity*10)/10; t7 = Math.round(length*10)/10; t8 = t4;

document.getElementById('t1').innerHTML = t1;
document.getElementById('t2').innerHTML = t2;
document.getElementById('t3').innerHTML = t3;
document.getElementById('t4').innerHTML = t4;
document.getElementById('t5').innerHTML = t5;
document.getElementById('t6').innerHTML = t6;
document.getElementById('t7').innerHTML = t7;
document.getElementById('t8').innerHTML = t8;

}