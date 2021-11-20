
        const cnv=document.querySelector('canvas');
        const ctx=cnv.getContext('2d');

        ctx.lineCap="round";
        ctx.lineWidth=1;
        ctx.lineJoin="round";

        document.body.addEventListener('mouseup', mouseUpHandler);
        document.body.addEventListener('dblclick', dblclickHandler);
        document.getElementById("bdSongButton").addEventListener('click', bdSongButtonHandler);


        let mouseDown=false;
        let nx=0;
        let ny=0;

        let recording=false;

        const audio = new Audio("./resources/audio.webm");
        audio.muted=true;
        audio.preload="auto";
        let playing = false;

        function bdSongButtonHandler(){
            console.log('ok')
            audio.muted=false;
            
            if(playing == false){
                audio.play();   
                document.getElementById("bdSongButtonImg").src="./resources/pause.png";         
            }else{
                document.getElementById("bdSongButtonImg").src="./resources/play.png";         
                audio.pause();
            }
            
            playing=!playing;
        }

        function penDown(x,y){
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        function penMove(x,y){
            ctx.lineTo(x,y);
            ctx.stroke();
        }

        function mouseDownHandler(e) {
          
        }

        function mouseUpHandler(e) {
            let elm=document.createElement("div");
            document.body.appendChild(elm);
            elm.classList.add("bubble_div");
            elm.style.left=(e.x-25)+"px";
            elm.style.top=(e.y-25)+"px";


            let ff=getRandom(8);
            elm.style.backgroundImage="url(./resources/sp"+ff+".png)";

            setTimeout(()=>{
                elm.classList.add("goup");
            },2000);
        }
        function dblclickHandler(e){
            let elm=document.createElement("div");
            document.body.appendChild(elm);
            elm.classList.add("big_bubble_div");
            elm.style.left=(e.x-50)+"px";
            elm.style.top=(e.y-50)+"px";

            let ff=getRandom(4);
            elm.style.backgroundImage="url(./resources/bp"+ff+".png)";

            setTimeout(()=>{
                elm.classList.add("goup");
            },2000);
        }
        function getRandom(up){
            return val=1+Math.floor(Math.random()*up);
        }
        function mouseMoveHandler(e) {
            
        }

        function clearCanvas(){
            ctx.clearRect(0, 0, cnv.width, cnv.height);
        }

        

        let pointer=0;
        let subPointer=0;
        let timer;

        function play(speed=30){   

            timer=setInterval(()=>{
                // console.log(pointer,subPointer);
                    
                if(pointer>=points.length){
                    document.getElementById('btn_play').innerHTML = 'Play';
                    playing = false;
                    pointer=0;
                    subpointer=0;
                    clearInterval(timer);
                    return;
                }

                if(subPointer === 0){
                    penDown(points[pointer][subPointer][0],points[pointer][subPointer][1]);
                    subPointer++;
                }else if(subPointer >= points[pointer].length){
                    pointer++;
                    subPointer=0;
                }else{
                    penMove(points[pointer][subPointer][0],points[pointer][subPointer][1]);
                    subPointer++;
                }
            },speed);
        }
        function pause(){
            
        }

        function init(){
            //omit loading wheel
            document.getElementById('loading').style.display="none";
            //play 
            play(20);
        }

        window.onload=init
        
        