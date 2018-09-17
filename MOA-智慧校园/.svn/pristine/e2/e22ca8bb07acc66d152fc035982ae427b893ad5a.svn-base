
  window.MenuGoods = function(){ 


     this.do        = 'GetMyMessage' ;  
  
     this.postSw    = true;   

     this.page = 1; 

     this.limit = 6;

     this.type = 1;
 
  


  }

  MenuGoods.prototype.init = function(){
 
         this.loadGoods(true);

  }
 
 

  MenuGoods.prototype.clearTip = function(){

      if($api.dom('.dataTip')){

            $api.html($api.dom('.dataTip'),'');
      }

  }
  MenuGoods.prototype.isLoading = function(){
    this.clearTip();
    this.postSw = false;
 
    $api.byId('dataTip').innerHTML = '上滑屏幕继续加载数据';
  }

  MenuGoods.prototype.isEnd = function(){
    this.clearTip();
    this.postSw = false;

 
    $api.byId('dataTip').innerHTML = '内容已加载完毕';
 
    
      
  }

  MenuGoods.prototype.getGoods = function(first){

      var _this = this;
 
      _this.isLoading();  
      return;


      ajax({
         do : this.do,
         params:{
             start : (this.page-1) * this.limit,
             limit : this.limit ,
             type  : this.type
         }
      },function(data){ 
            hideLoading();
            hideLoading();
            hideRefresh();
 
              
            _this.postSw = true;


            if(data.data.length==0 && _this.page==1){
              

               $api.dom('#dataTip').innerHTML = '暂无数据';

               return;
        
            }else if(data.data.length===0 && _this.page!=1){
               _this.isEnd(); 

               return;

            }else{

                _this.clearTip();

               var list = data.data; 
                

               if(list.length == 0){
                  data.isLoading =false;
                  data.noData = true;
                  _this.postSw = false;
              }
      for(var i in list){ 


 
        list[i].time = parseTime(list[i].time).Y + '.' + parseTime(list[i].time).M  + '.' + parseTime(list[i].time).d +' '+ parseTime(list[i].time).h + ':' + parseTime(list[i].time).m;
        
        log(list[i],true)

         
      }
 
              var data = {  
                  list: list  ,
                  isLoading : true,
                  noData:false 
               };



            if(_this.page == 1 &&  _this.limit >  list.length){

                data.isLoading = false;   
                data.noData   = true;   
                   
            }
             
 
              _this.clearTip();
              
              _this.clearTip();
              
              var html = template('messScript', data);
               

              $api.append(dom('#messBox'),html)  
              // $api.append(dom('#mailBox'),html)  

              
 

             if(first){

                  _this.bindScroll();

             }



            }

      })
  }


  

    

    MenuGoods.prototype.reset = function(){

           var _this = this;
   
           $api.html(dom('#dataTip'),'');

           _this.isLoading();
           
           this.postSw = true;
 
           this.page = 1;



    }

    

    MenuGoods.prototype.loadGoods = function(first){ 
 

          this.getGoods(first);
 

    }
 
    MenuGoods.prototype.bindScroll = function(){
        var _this = this;

         isBottom(function () {

              if(!_this.postSw) return; 

                _this.postSw = false;

                // alert(_this.page);

                _this.page = parseInt(_this.page)+1;

                 

                _this.loadGoods(false)
         })
     

       
    }