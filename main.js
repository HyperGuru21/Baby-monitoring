img = "";
object = [];
status1 = "";
music = "";




function setup(){
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.center();
    video.hide();


    
    objectDetector  = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML= "Status = Detecting Object";
    
    

}


function modelLoaded(){
    console.log("Model Loaded!");
    status1 = true;
}

function prelaod(){
   music = loadSound("alarm.mp3");
}




function draw(){
    image(video,0 ,0 , 380 , 380);
    
    
    if(status1 != ""){
        objectDetector.detect(video , gotResult);  
        
        for(i=0 ; i< object.length; i++){
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r,g,b);
            percent = floor(object[i].confidence*100);
            text(object[i].label + "" + percent + "%", object[i].x , object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x , object[i].y , object[i].width , object[i].height); 
            if(object[i].label == person){
                music.stop();
                console.log(stop);
                document.getElementById("numberOfObjects").innerHTML = "Baby Found";
            }
            else{
                music.play();
                console.log(play);
                document.getElementById("numberOfObjects").innerHTML = "Baby Not Found";
            }
        }

        if(object.length == 0){
            document.getElementById("numberOfObjects").innerHTML = "Baby Not Found";
            music.play();
        } 
    }

    
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
}

