 initMess = function (options) {
    
      var options  = options || {};
  
      var type   =  options.type || '';

      var email_type = options.email_type || 0;

      var delApi   =  options.delApi || '';

      var params   =  options.params || {};

    

     window.vm = new Vue({
          el:'#messBox',
          data:{
            loadding      : true,
            end           : false,
            noData        : false,
            onClass       : ['on'],
            currentPage   : 1,
            catId         : 0,
            messList      : [],
            tips          : '内容', 
            postSw        : true, 
            newGoodsAPI   : '',
            userRank      : 1,
            limit         : 6,
            user          : {},
            maxMess       :[],

            // userRank      : "{$user_rank}" ? "{$user_rank}" :0,
            bFirstPost    : true,
            indexShow     : true,  
            isTip          :true
          },
          methods:{

              toDelete:function ($this,id) {

                  $this = $this.currentTarget
                
                  toDelete($this,id);
               },
               toMore:function (index,$this) {

                    toMore(index,$this.currentTarget)
                 
               },
               
              closeTips:function () {

                    $api.setStorage('messTip',this.tips);

                    this.tips = false;

              },
              setTips : function (tips) {

                if($api.getStorage('messTip') == tips){

                    this.tips = false;

                }else{
                    this.tips = tips;

                }


              },
              OpenMail:function (index,$this) {

                var mail = this.messList[index];

                if(type==='caogaoxiang'){

                       api.openWin({
                            name: '新建邮件',
                            url: 'widget://html/common/win.html',
                            delay:150,
                            bgColor:'#fff',
                            pageParam: {
                                title: '新建邮件',
                                name: '新建邮件',
                                // url: 'widget://html/demo/index.html',
                               url: 'widget://html/frame0/workMail/sendMail.html',
                               sendmail:true,
                                params : {
                                  isCaogao : true,
                                  mail : mail
                                }
                             }
                        });

                  return;
                }

                var reply = false;
                if( type === 'shoujianxiang'){ 

                   reply = true; 
                }


 
                 api.openWin({
                    name: '邮件详情',
                    url: 'widget://html/common/win.html',
                    delay:0,
                    bgColor:'#fff',
                    pageParam: {
                        title: '邮件详情',
                        name: '邮件详情',
                        // url: 'widget://html/demo/index.html',
                        url: 'widget://html/frame0/workMail/mailDetail.html',
                        reply : reply,
                        params : {
                          mail_id  : mail.id
                        }
                     }
                });
         

                    
              },
               
              dealMessList:function () {

                var  _this = this; 

                ajax({
                   aApi : 'Bgyoujian/getEmail',
                   params : {
                        jiaoshi_id : $api.getStorage('user').id,
                        page : this.currentPage  ,
                        email_type : email_type
                   }
                },function (data) { 
 
                  hideProgress();
                  hideRefresh();
//  "id": "30",
// "title": "邮件标题1",
// "send_id": "4",
// "send_mingcheng": "范斌",
// "status": "1",
// "zancun": null,
// "chengdu": "1",
// "time": "2018-08-20 15:22:49",
// "send_way_str": "1",
// "read_id": "4",
// "read_mingcheng": "范斌",
// "wenjian": [
// {
// "id": "4",
// "email_id": "30",
// "url": "https://liangcai-product-south.oss-cn-shenzhen.aliyuncs.com/liangcai-product-south/zhihuixiaoyuan/appFile/2018-8-20/b378453c4419c28dc87b7d8573107c11_v_1534745544.jpg",
// "mingcheng": "b378453c4419c28dc87b7d8573107c11_v_1534745544",
// "houzhui": "jpg",
// "time": "2018-08-20 15:22:50"
// } 
 
                  if(data.code==1){


                    if(data.data.length === 0 && _this.currentPage ==1){

                       _this.end = false;
                       _this.noData = true;
                       _this.loadding = false;
                       return; 

                    }
 
                      if(data.data.length === 0){
 
                           _this.postSw = false;
                           _this.loadding = false; 
                           _this.end = true;
                           return;
                      }

                      var count = data.count;
                      var page_count = data.page_count;
 
                          var data = data.data;

 

                          var tips = data.tips;
                          
                         
 
                          _this.setTips(data.tips);


                         for(var j = 0 ; j < data.length;  j++){

                          var wenjianData = data[j].wenjian || [];

                            for(var i = 0 ; i < wenjianData.length ; i++){

                                 wenjianData[i].mingcheng = wenjianData[i].mingcheng.split('_v_')[0].slice(0,20)  
                                

                            }



                               _this.messList.push({
                                    id  : data[j].id,
                                    title : data[j].title,
                                    send_id : data[j].send_id,
                                    send_mingcheng : data[j].send_mingcheng,
                                    status : data[j].status,
                                    zancun : data[j].zancun,
                                    chengdu : data[j].chengdu,
                                    time : data[j].time,
                                    send_way_str : data[j].send_way_str,
                                    read_id : data[j].read_id,
                                    has_read : data[j].has_read  ,
                                    read_mingcheng : data[j].read_mingcheng,
                                    wenjian : wenjianData
                                    // [
                                    // {
                                    // "id": "4",
                                    // "email_id": "30",
                                    // "url": "https://liangcai-product-south.oss-cn-shenzhen.aliyuncs.com/liangcai-product-south/zhihuixiaoyuan/appFile/2018-8-20/b378453c4419c28dc87b7d8573107c11_v_1534745544.jpg",
                                    // "mingcheng": "b378453c4419c28dc87b7d8573107c11_v_1534745544",
                                    // "houzhui": "jpg",
                                    // "time": "2018-08-20 15:22:50"
                                    // } ]
                             })

                         }

                         // alert(email_type)

                         if(email_type==0)
                         log(_this.messList,true)
 

 
 
                         _this.end = false;
                         _this.loadding = true;
                         _this.noData = false; 

                          if(_this.messList.length >= count   ){

                               _this.loadding = false; 
                               _this.end = true;
                               _this.noData = false; 
                               _this.postSw  = false;
                               return;

                        }

  
                            _this.postSw = true;

                          if(_this.bFirstPost){

                            _this.bFirstPost = false;
 
                            _this.bindScroll();

                          }
 


                  }else{


                    toast(data.msg)


                  }



                  
                });
 

                  
                
              },

              getData:function (bFirstPost) {

                this.bFirstPost = bFirstPost;

                this.loadding = true;

                var _this = this;

                $api.dom('#messBox').style.display = 'block'


                var timestamp = Date.parse(new Date())/1000;

            

                    // alert(JSON.stringify(sign));

 
                this.dealMessList();
                  


             } ,
              
             emptyData:function () {

                  this.currentPage  = 1; 

                  this.messList  = [ ]; 

 

             },

             bindScroll:function () {
               var _this = this;
 
               initLoadMore({
                   distance: 600,
                   callback:function (isBottom) {


                      if(isBottom && _this.postSw){ 

                              _this.postSw = false;
                              _this.currentPage++;
                              _this.loadding = true;
                              _this.getData(false);


                      }

                      
                   }
                })




             } ,
             initFilter:function () {

                Vue.filter('filterContent', function (value) {

                     if (!value) return ''
                    value = value.toString().substr(0,28)
                    return value
                  })

                Vue.filter('filterTitle', function (value) {

                     if (!value) return ''
                    value = value.toString().substr(0,25)
                    return value
                  })


              }
            
          },
          
          created:function () {
 

            this.initFilter();
               //同步返回结果：

             var  user =  $api.getStorage('user') || false;


            this.user =  user

            this.getData(true);

            





             //获取新品推荐
             // this.getNewGoods();
          }
    });


// loadVue


window.touchstartF = function(event) {
      x = event.changedTouches[0].pageX;
      y = event.changedTouches[0].pageY;
      swipeX = true;
      swipeY = true;
  };
window.touchmoveF = function(event, e) {

      X = event.changedTouches[0].pageX;
      Y = event.changedTouches[0].pageY;
      // 左右滑动
      if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
          // 阻止事件冒泡
          event.stopPropagation();
          if (X - x > 10) {
              event.preventDefault();
              e.style.WebkitTransform = "translateX(" + 0 + "px)";
              e.style.transition = "-webkit-transform 300ms ease-in-out";
          }
          if (x - X > 10) {
              event.preventDefault();
              e.style.WebkitTransform = "translateX(" + -120 + "px)";
              e.style.transition = "-webkit-transform 300ms ease-in-out";
          }
          swipeY = false;
      }
      // 上下滑动
      if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
        
          swipeX = false; 
      }
  };
      
window.toDelete = function(e,mail_id) {

 
    confirm('提示','确认删除?',function (data) {

      if(!data)return;

      showProgress('删除中')
 
      ajax({
         aApi : delApi,
         params:{
              email_id_str : mail_id,
              jiaoshi_id : $api.getStorage('user').id
         }
      },function (data) {
 

        if(data.code==1){ 

            var deleteL = document.querySelectorAll('.delete');
            var wrapper = document.querySelectorAll('.wrapper');

            for (var i = 0; i < wrapper.length; i++) {
                wrapper[i].style.transition = 'height 500ms';
                wrapper[i].style.webkitTransition = 'height 500ms';
                wrapper[i].style.overflow = 'hidden';
            }
            var deleteLB = e;

            var down = deleteLB.parentNode;


            down.classList.add('noheight');
 
            setTimeout(function () {

                 down.remove();

                toast(data.msg)

            }, 700);
            hideProgress();
  

        }else{
          toast(data.msg)
        }


        
      })


              
 



    })



  }

  // 更多
  window.toMore = function(index,$this) {


      var mailArr = vm.messList[index];
      var eIndex = index;

      var button = ['回复'];

      if(mailArr.has_read==0 ){
            button.push('标记为已读');
      }
      

      api.actionSheet({  
          buttons: button
      }, function(ret, err) {
 
          if (ret) {

             var index  = ret.buttonIndex;

             var allowRead = button.length ===2 ? true:false;
            

             switch(index){
              case 1 : replyMail(mailArr);break;
              case 2 : doReaded(eIndex,allowRead,$this);break;
             }


          }  


      });
   
  }

  
  moveDone = function ($this) { 



  }

  doReaded = function (index,allowRead,$this) {

    if(!allowRead)return;

    showProgress('修改中');

    var mailArr = vm.messList[index];
    
    ajax({
      aApi : 'Bgyoujian/editEmailStatus',
      params : {
        email_id : mailArr.id,
        jiaoshi_id : $api.getStorage('user').id

      }
    },function (data) { 
 

      hideProgress();

          if(data.code==1){

            var messList = vm.messList || [];

            messList[index].has_read = 1;

            vm.messList = messList;


            toast(data.msg)

          }else{
            toast(data.msg)
          }
          
    })



    
  }



  // 更多end
 



// loadVue end

 } 




  