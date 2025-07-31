
document.getElementById('page_thumbnails_container').innerHTML = '<a class="thumbnail" href="reality.html"><img src="images/swingingGirl.webp"></a><a class="thumbnail" href="idealisation_vis.html"><img  src="images/idealisation_v.png"></a><a class="thumbnail" href="geometric_vis.html"><img  src="images/G_v.png"></a><a class="thumbnail" href="algebra_vis.html"><img  src="images/eq_v.png"></a><a class="thumbnail" href="solution_vis.html"><img  src="images/gr_v.png"></a>';

document.getElementById('page_names').innerHTML ='<text>Reality</text><text>Idealization (vis)</text><text>Geometric (vis) </text><text>Algebra (vis)</text><text>Fit Model (all) to Data</text>';

document.getElementById('progress').innerHTML= '<div id ="bar"></div><img src="images/arrow.webp">';

document.getElementById('navigator').innerHTML='<a id="left" class="nav" ><img src="images/nav_icon.webp"></a><a id="right" class="nav"><img src="images/nav_icon.webp"></a>';

const wide = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const tall = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
window.addEventListener('resize', trans);

const docx = document.documentElement;
function trans(){
    bt = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    ht = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    docx.style.setProperty('--dim1',Math.min(1,bt/wide));
    docx.style.setProperty('--dim2',Math.min(1,ht/tall));
}

function setIntervalX(callback, delay, repetitions) {
  var x = 0;
  var intervalID = window.setInterval(function () {

     callback();

     if (++x === repetitions) {
         window.clearInterval(intervalID);
     }
  }, delay);
}
z = 0;

setIntervalX(function () {
  z += 0.01
  docx.style.setProperty('--loader',z);
}, 1, 100);

