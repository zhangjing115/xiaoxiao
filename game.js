function game(){
 this.clientw=document.documentElement.clientWidth;
 this.clienth=document.documentElement.clientHeight;
  //this.letterArr=[
  //    {url:"img/a.png",code:"65"},{url:"img/b.png",code:"66"},{url:"img/c.png",code:"67"},
  //    {url:"img/d.png",code:"68"},{url:"img/e.png",code:"69"},{url:"img/f.png",code:"70"},
  //    {url:"img/g.png",code:"71"},{url:"img/h.png",code:"72"},{url:"img/i.png",code:"73"},
  //    {url:"img/j.png",code:"74"},{url:"img/k.png",code:"75"},{url:"img/l.png",code:"76"},
  //    {url:"img/m.png",code:"77"},{url:"img/n.png",code:"78"},{url:"img/o.png",code:"79"},
  //    {url:"img/p.png",code:"80"},{url:"img/q.png",code:"81"},{url:"img/r.png",code:"82"},
  //    {url:"img/s.png",code:"83"},{url:"img/t.png",code:"84"},{url:"img/u.png",code:"85"},
  //    {url:"img/v.png",code:"86"},{url:"img/w.png",code:"87"},{url:"img/x.png",code:"88"},
  //    {url:"img/y.png",code:"89"},{url:"img/z.png",code:"90"}
  //]
 this.letterArr=["A","B","C","D","E","F","G","H","I","J","K"];
 this.letterLen=5;
 this.speed=3;
 this.spans=[];
 this.currArr=[];
 this.currPosArr=[];
 this.die=10;
 this.sore=0;
 this.currSore=0;
 this.num=10;
 this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("span")[1];
 this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
 this.aa=1;
}
game.prototype={
   play:function(){
       //将字母显示到body里面
       this.getLetter(this.letterLen);
       this.move();
       this.key();
   },
    key:function(){

        var that=this;
      document.onkeydown=function(e){
          var ev=e||window.event;
          var code=String.fromCharCode(ev.keyCode);
          for(var i=0;i<that.spans.length;i++){
              if(that.spans[i].innerHTML==code){
                  document.body.removeChild(that.spans[i]);
                  that.spans.splice(i,1);
                  that.currArr.splice(i,1);
                  that.currPosArr.splice(i,1);

                  that.getLetter(1);
                  that.sore++;
                  that.currSore++;
                  // that.num++;
                  that.soreEle.innerHTML=that.sore;
                  if(that.currSore%that.num==0){
                      that.aa++;
                      alert("第"+that.aa+"关");
                      that.next();
                  }
                  break;
              }
          }
      }
    },
   

    next:function(){
      clearInterval(this.t);
      for(var i=0;i<this.spans.length;i++){
         document.body.removeChild(this.spans[i]);
      }
        this.spans=[];
        this.currPosArr=[];
        this.currArr=[];
        this.speed++;
        this.letterLen++;
        this.currSore=0;
        this.num+=10;
        this.play();


    },



    move:function(){
       var that=this;
       this.t=setInterval(function(){
         for(var i=0;i<that.spans.length;i++){
             var top=that.spans[i].offsetTop+that.speed;
             that.spans[i].style.top=top+"px";
             if(top>that.clienth){
                 document.body.removeChild(that.spans[i]);
                 that.spans.splice(i,1);
                 that.currArr.splice(i,1);
                 that.currPosArr.splice(i,1);
                 that.getLetter(1);
                 that.die--;
                 that.dieEle.innerHTML=that.die;
                 if(that.die==0){
                     alert("game over!");
                     that.restart();
                      location.reload();
                 }


             }
         }

       },60)
    },
     restart:function(){
      clearInterval(this.t);
      for(var i=0;i<this.spans.length;i++){
         document.body.removeChild(this.spans[i]);
      }
        this.spans=[];
        this.currPosArr=[];
        this.currArr=[];
        this.speed=3;
        this.letterLen=5;
        this.currSore=0;
        this.num=10;
        this.play();


    },



    getLetter:function(num){
        //先获取到指定的字母
        var arr=this.getRand(num);
        var posArr=[];
        var eleArr=[];
        for(var i=0;i<arr.length;i++){

            var span=document.createElement("span");
            span.innerHTML=arr[i];
            console.log(span);

            var x=(100+(this.clientw-200)*Math.random());
            var y=(100*Math.random());
            var width=45;
            while (this.check1(this.currPosArr,x,width)){
                x=(100+(this.clientw-200)*Math.random());
            }
             posArr.push({minx:x,maxx:x+width});
            span.style.cssText="display:inline-block;background:url('./img/"+arr[i]+".png');background-size:cover;width:"+width+"px;position:absolute;left:"+x+"px;top:"+y+"px;color:rgba(0,0,0,0);font-size:45px;";
            document.body.appendChild(span);

            this.spans.push(span);
        }

    },
    check1:function(arr,x,width){
       for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
    getRand:function(num){
       var arr=[];
       for(var i=0;i<num;i++) {
           var rand = Math.floor(this.letterArr.length * Math.random());
           while(this.check(this.currArr,this.letterArr[rand])){
               rand = Math.floor(this.letterArr.length * Math.random());
           }
           arr.push(this.letterArr[rand]);
           this.currArr.push(this.letterArr[rand]);
       }

        return arr;

    },
    check:function(arr,val){
       for(var i=0;i<arr.length;i++){
           if(arr[i]==val){
               return true;
           }
       }
        return false;
    }

}