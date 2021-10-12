// Intricate block of connected solids

let green, yellow;
let flip, c;
let cube = [];
let maxCubes = 9000;
let xrot=0;
let yrot=0;
let zrot=0;
let tooClose = 0;
let goodSpot = true;
let avgSize = 15; // was 20. 10 seems too small

function setup() {
createCanvas(1000,600, WEBGL); // WEBGL mode appears to put 0,0 origin at center
green = color(90,220,90);
yellow = color(220,220,90);
orange = color(250,120,20);
lightBlue = color(160,220,240);
frameRate(30);
strokeWeight(0.2);
stroke(128,128,128,192);
} // end setup()

function draw() {
background(60,10,120);
  directionalLight(220,220,220,1,0,-1); // making z -1 important.  Was 1,1,-1
  ambientLight(100);

if(cube.length < maxCubes) { // if not, then do nothing, leaving screen as is. 
  makeCube();
 }

rotateY(yrot); // do this ONCE, before cube[i].display()
rotateX(xrot);
rotateZ(zrot);

for(let i=0; i < cube.length; i++) {
  cube[i].display();
}

yrot += random(0.8,1.2)/1000;
xrot += random(0.8,1.2)/1000;
zrot += random(0.8,1.2)/1000;

} // Refresh screen

function makeCube() {
    goodSpot = true;
    flip = random(1);
    if(flip < 0.25) {c = green;}
      else if(flip < 0.5) {c = orange;}
      else if(flip < 0.75) {c = lightBlue;}      
      else {c=yellow;}
      
      if(cube.length==0) { // first cube is random, but near center
        cube.push(new Cube(random(-width/4, width/4), random(-height/4,height/4), random(-50,50), random(15,25), c));
        cube[0].display();
        } // end first cube
        
      else if(cube.length < maxCubes) { // if not, do not make new cube
      // pick one of the previous cubes, randomly. Create a new x and y near, but too near, the chosen x,y. 
        let cubeBranch = floor(random(cube.length));
        
        if(random(1) > 0.5) {flip = 1;} 
          else {flip = -1;}
        let xval = cube[cubeBranch].centerX + random(cube[cubeBranch].size * 0.6, cube[cubeBranch].size * 0.85) * flip ;
        
        if(random(1) > 0.5) {flip = 1;} 
          else {flip = -1;}
        let yval = cube[cubeBranch].centerY + random(cube[cubeBranch].size * 0.6, cube[cubeBranch].size * 0.85) * flip ;
        
        if(random(1) > 0.5) {flip = 1;} 
          else {flip = -1;}
        let zval = cube[cubeBranch].centerZ + random(cube[cubeBranch].size * 0.6, cube[cubeBranch].size * 0.85) * flip ;
        
        let sizeVal = avgSize * random(0.75,1.33);
              
        // Compare xval and yval with previous list of xvals, yvals and zvals.
        // If too close to previous cube, or beyond edge, just skip over the cube.push, and try again.
        goodSpot = true;
        for(let i = 0; i < cube.length; i++) { 
          if( dist(xval ,yval ,zval, cube[i].centerX, cube[i].centerY, cube[i].centerZ) < cube[i].size) { // test if too close
            goodSpot = false;
             }
          if( xval < -width/2 || xval > width/2 || yval < -height/2 || yval > height/2 || zval > width/2 || zval < -width/2) {
            goodSpot = false;
            }
          } // end for i
          
        // If too close to several other cubes, and number of cubes is high, try again.     
          tooClose = 0; 
          if(cube.length > 10) { // if small number of cubes ... skip this step  Was 20. 10 definitely better
            for(let j=0; j < cube.length; j++) {
            if(dist(xval,yval,zval,cube[j].centerX, cube[j].centerY, cube[j].centerZ) < avgSize * 2.2) { // Was 45
               tooClose++;
               } // end if dist < 
            } //end let j          
          } // end if cube.length >20
          if(tooClose >= 2) { // was 3
            goodSpot = false;
          }
          
        if(goodSpot == true) {        
          cube.push(new Cube(xval,yval, zval, sizeVal, c)); // After passing tests, FINALLY make a new cube Size was random(15,25)
        //  print("Cubes so far:  ", cube.length);
          }
      } // end if cube.length < maxCubes
} // end makeCube()

 class Cube {
    constructor(centerX,centerY,centerZ,size,col) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.centerZ = centerZ;
      this.size = size;
      this.col = col;
    }
  
  // function display
   display() {
     //console.log("X,Y,Z:  ",centerX,centerY,centerZ);
     push();
     translate(this.centerX,this.centerY,this.centerZ);
     fill(this.col);
     //box(this.size);
     noStroke(); // only for spheres
     sphere(this.size * 0.85);
     pop();
   }
}
