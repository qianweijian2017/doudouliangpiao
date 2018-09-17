

     

      loadKezu = function (options) {

        options = options || {};

        var people = options.people;

          window.vm = new Vue({
             el:'#contactBox',
             data:{ 
                  contact :'' ,
                  leftBar : '',
                  rightBar : '',
                  leftCount : 0,
                  rightCount :0, 
                  allLeftBar : '',
                  allRightBar : '' ,
                  onClass : ['active'],
                  rightClass : [''],
                  showRightAllTitle:true
 
             },
             methods:{

                changeRightBar : function (id,index) {

                        this.activeClass(index);

                        setTimeout(function () {
                             this.checkAllSelect();
                            
                        }.bind(this),150)
  

                        if(!id){

                          this.onClass = [];
  
                          this.onClass = ['active'];


                          this.updateRightBarAll();
                            

                          this.showRightAllTitle = true;

                          return;
                        }  


                        this.showRightAllTitle = false;
 

                        var newRightBar = [];

                        var selectIdArr = $api.getStorage('selectIdArr') || [];
 
                        for(var i = 0; i < this.leftBar.length ; i++){


                            if( this.leftBar[i].id == id ){

                              if(!this.leftBar[i].jiaoshi_mingcheng_str) continue;
                           

                                   var currentId = this.leftBar[i].jiaoshi_id_str.split(',');
                                   var currentMingcheng = this.leftBar[i].jiaoshi_mingcheng_str.split(',');

                                    newRightBar = [];

                                     for(var k = 0 ;  k < currentId.length ; k ++){

                                            var active  = false;

                                            if(selectIdArr.indexOf(currentId[k].toString())!=-1){

                                                   active = true;

                                            }


                                               newRightBar.push({  
                                                  jiaoshi_id : currentId[k],
                                                  jiaoshi_mingcheng : currentMingcheng[k],
                                                  active : active

                                              })


                                        }
 

                                  break;
                                   
                                   

                            }

                        }
 
                           

                   this.rightBar = newRightBar.allRightBarUnique();


 

                }, 
                allSelect : function () { 

                  showProgress('处理中')

                  if(this.rightBar.length===0)return;

                    this.allActive = false;

                   var rightBar = this.rightBar;
 
                   var ulListDom = $api.domAll('#ulList li');

                   var ulListActive = $api.domAll('#ulList li.active'); 


                    var isAllCheck = false; 

                   if($api.hasCls($api.dom('#ulList li.liHeader'),'activeTitle')){ 

                         isAllCheck = true; 


                   }
                      
                   this.allActive = !isAllCheck;
 
                   if(isAllCheck)  {

                       $api.removeCls($api.dom('#ulList li.liHeader'),'activeTitle')


                   }else{

                       $api.addCls($api.dom('#ulList li.liHeader'),'activeTitle')

                   }


 
                   for(var j = 0 ; j < ulListDom.length ; j++){
                
                        if(isAllCheck){

                              $api.removeCls(ulListDom[j],'active');
   
                        }else{

                          if($api.hasCls(ulListDom[j],'liHeader')) continue; //是li第一个元素（全选） ，不需要加这个active了

                              $api.addCls(ulListDom[j],'active');

                        }


                   } 


                   for(var i = 0 ; i < rightBar.length ; i++){
  
                       rightBar[i].active = !isAllCheck;
                       !isAllCheck ? saveJiaoshiId(rightBar[i].jiaoshi_id,rightBar[i].jiaoshi_mingcheng) : removeJiaoshiId(rightBar[i].jiaoshi_id,rightBar[i].jiaoshi_mingcheng);
                  
  
                   }
 
                   this.rightBar = rightBar;


                  hideProgress()
 
                      
                },
                updateRightBarAll : function () {  

                    var allRightBar = this.allRightBar;

                    var selectIdArr = $api.getStorage('selectIdArr') || []; 

 
                    for(var i = 0 ; i < allRightBar.length; i++){

                        var active  = false;

                         if(selectIdArr.indexOf(allRightBar[i].jiaoshi_id.toString())!=-1){
  
                               active = true;

                         }

                         allRightBar[i].active = active;
 
                    }



 
                     this.allRightBar =  allRightBar.allRightBarUnique(); 

                     this.rightBar =  allRightBar.allRightBarUnique(); 


                     $api.dom('#contactBox').style.display = 'block';
                         
 

                },
                
                checkAllSelect:function () {
                   
                    var activeLi = $api.domAll('#ulList li.active')

                      if( activeLi.length === this.rightBar.length && this.rightBar.length > 0  ){

                              $api.addCls($api.dom('#ulList li.liHeader'),'activeTitle')
                              this.allActive = true;

                      }else{

                              $api.removeCls($api.dom('#ulList li.liHeader'),'activeTitle')
                              this.allActive = false;
                      }
                      

                },
                activeClass : function (index) {
 

                   this.onClass = [];
  
                   this.onClass[index+1] = 'active'

                },

                doKezu  : function (data) {  


                  this.contact = JSON.parse(data);
 
                  this.leftBar = this.contact.data;

                  this.initBarData();

 
                  this.leftCount = this.leftBar.length;

                  this.rightCount = this.rightBar.length;   

 
                  
                },
                initBarData : function () {


                    var allRightBar = [];
 
                      for(var i = 0 ; i < this.leftBar.length ; i++){

                          if(!this.leftBar[i].jiaoshi_id_str){
                                continue;
                          }


                          var currentId = this.leftBar[i].jiaoshi_id_str.split(',');
                          var currentMingcheng = this.leftBar[i].jiaoshi_mingcheng_str.split(',');

                            for(var k = 0 ;  k < currentId.length ; k ++){

                                  allRightBar.push({  
                                      jiaoshi_id : currentId[k],
                                      jiaoshi_mingcheng : currentMingcheng[k]

                                  })


                            }
       
        

                        }


 
                 this.allRightBar =  allRightBar; 

                 this.updateRightBarAll();



                  
                },
                clickJiaoshi:function (jiaoshi_id,jiaoshi_mingcheng,event) {
  
                    var target = event.currentTarget;

                    if($api.hasCls(target, 'active')){
 
                       $api.removeCls(target, 'active');

                        removeJiaoshiId(jiaoshi_id,jiaoshi_mingcheng);

                        this.removeRightBarClass(jiaoshi_id);
 

                    }else{



                         $api.addCls(target, 'active');

                         saveJiaoshiId(jiaoshi_id,jiaoshi_mingcheng)


                        this.addRightBarClass(jiaoshi_id);
 
                    }

                    this.checkAllSelect();
 

   
                },
                removeRightBarClass:function (jiaoshi_id) {

                    var rightBar = this.rightBar;
                    var allRightBar = this.allRightBar;

                    for(var i = 0 ; i < rightBar.length ; i++){

                          if(rightBar[i].jiaoshi_id == jiaoshi_id){


                               rightBar[i].active  =  false  



                          }


                    }

                    for(var i = 0 ; i < allRightBar.length ; i++){

                          if(allRightBar[i].jiaoshi_id == jiaoshi_id){


                               allRightBar[i].active  =  false  
  
                          } 

                    }

                    this.allRightBar = allRightBar;
                    this.rightBar = rightBar;


                  
                },
                addRightBarClass:function (jiaoshi_id) {


                    var rightBar = this.rightBar;
                    var allRightBar = this.allRightBar;

                    for(var i = 0 ; i < rightBar.length ; i++){

                          if(rightBar[i].jiaoshi_id == jiaoshi_id){
 
                               rightBar[i].active  =  true  



                          }


                    }

                    for(var i = 0 ; i < allRightBar.length ; i++){

                          if(allRightBar[i].jiaoshi_id == jiaoshi_id){


                               allRightBar[i].active  =  true  



                          }


                    }

                    this.allRightBar = allRightBar;
                    this.rightBar = rightBar;

                  
                },
                updateRightBar:function (jiaoshi_id) {

                    var selectIdArr = $api.getStorage('selectIdArr') || [] ;
                    var rightBar = this.rightBar ; 
    
                    this.rightBar = rightBar;

  
                }

             },
             created:function () {

                  this.doKezu(people);

               
             },
             ready:function () {

                  this.checkAllSelect();
             },
             //数据渲染完成
             compiled:function () { 

                   
              }
          })


      }



