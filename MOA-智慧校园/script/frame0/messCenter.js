


 initMess = function (param) {

  var  requestUrl = param.url;
  var  type = param.type; 
  var  msg_type = param.msg_type; 

 

     window.vm = new Vue({
          el:'#messBox',
          data:{
            loadding      : true,
            end           : false,
            noData        : false, 
            currentPage   : 1,
            catId         : 0,
            messList      : [],
            tips          : '内容',
            messTip       :'', 
            postSw        : true, 
            newGoodsAPI   : '',
            userRank      : 1,
            limit         : 6, 
            maxMess       :[],
            noReadIdArr   :[],

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
              clickTab:function (index){

               
                showProgress('加载中')

                location.reload();
 

              },
              closeTips:function () {
 
                  

              },
              setTips : function (tips) {

                var tipsDom  = $api.dom('#tips-1');
                if(tipsDom){

                  tipsDom.style.display = 'block'

                       this.tips = tips ;  

                        setTimeout(function () {

                            tipsDom.style.display = 'none';
                          
                        },3000)
                }



              },
              OpenMail : function (index) {

                var mail = this.messList[index];
        
                 api.openWin({
                    name: '消息详情',
                    url: 'widget://html/common/win.html',
                    delay:0,
                    bgColor:'#fff',
                    pageParam: {
                        title: '消息详情',
                        name: '消息详情',
                        // url: 'widget://html/demo/index.html',
                        url: 'widget://html/frame0/messCenter/messDetail.html',
                   
                        params : mail
                     }
                });
         

                    
              },
               
              dealMessList:function () {

                var  _this = this; 

                ajax({
                   aApi : requestUrl ,
                   params : {
                        jiaoshi_id : $api.getStorage('user').id,
                        msg_type : msg_type,
                        page : this.currentPage  
                   }
                },function (data) { 
 

                  hideProgress();
                  hideRefresh();

 
                  if(data.code==1){


                    if(data.count === 0  ){

                       _this.end = false;
                       _this.noData = true;
                       _this.loadding = false;
                       return; 

                    }
//                         {
//     "id": "4",
//     "send_time": "2018-08-13 21:50:49",
//     "read": "1",
//     "msg_guanlian_id": "1",
//     "read_mingcheng": "读取人2",
//     "send_mingcheng": "发送人2",
//     "read_time": "2018-08-13 21:51:12",
//     "msg_leixing_id": "1",
//     "msg_leixing_mingcheng": "测试",
//     "send_id": "1",
//     "msg_title": "标题2",
//     "read_id": "2"
// }
 

                      if(data.data.length === 0){
 
                           _this.postSw = false; 
                           _this.end = true;
                           return;
                      }

                          var count = data.count;
                          var page_count = data.page_count;
 
                          var data = data.data;

                          var tips = data.length;
                           
                          if(tips && _this.currentPage === 1) _this.setTips(tips);  ;
 

                         for(var j = 0 ; j < data.length;  j++){

                              if(data[j].has_read == 0){

                                _this.noReadIdArr.push(Number(data[j].msg_id));
 
                              }

                               _this.messList.push({
                                      "id": data[j].id,
                                      "send_time": data[j].send_time,
                                      "msg_guanlian_id": data[j].msg_guanlian_id,
                                      "read_mingcheng":  data[j].read_mingcheng,
                                      "send_mingcheng":  data[j].send_mingcheng,
                                      "read_time":  data[j].read_time,
                                      "msg_leixing_id": data[j].msg_leixing_id,
                                      "msg_leixing_mingcheng": data[j].msg_leixing_mingcheng,
                                      "send_id": data[j].send_id,
                                      "msg_id": data[j].msg_id,
                                      "msg_title":  data[j].msg_title,
                                      "read_id": data[j].read_id,
                                      "has_read": data[j].has_read,
                                      "neirong": data[j].neirong, 
                                      "msg_neirong": data[j].msg_neirong, 
                             })

                         }
 
 
 


                         if(_this.messList.length >= count   ){

                               _this.loadding = false; 
                               log('end')
                               _this.end = true;
                               _this.noData = false; 
                               _this.postSw  = false;
                               return;

                         } 

                               log('loadding')

                            _this.end = false;
                            _this.loadding = true;
                            _this.noData = false; 
                       
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
             

            this.getData(true);

            





             //获取新品推荐
             // this.getNewGoods();
          },
          beforeCreate:function(){
               log("实例创建之前"+'beforeCreate')
           },
          
           beforeMount:function() {
               log("数据编译之前"+'beforeMount')
           },
          mounted:function() {

              $api.dom('#messBox').style.display ='block'

               log("数据编译完成"+'mounted')

           },
           beforeUpdate:function () {
               console.log("数据更新之前"+'beforeUpdate')
           },
           updated:function () {

               console.log("数据解析完成"+'updated')
           },
           beforeDestroy:function () {
               log("数据销毁之前"+'beforeDestroy')
           },
           destroyed:function () {
               log("数据销毁完成"+'destroyed')
           }
    });




    }    