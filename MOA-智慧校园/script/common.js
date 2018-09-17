;function loadCommonJs() {

    (function () { 
  
        var dataTips = $api.domAll('.dataTip');
        for(var i = 0 ; i < dataTips.length ; i++){

              $api.addCls(dataTips[i],'iphonexBottom')

        } 

    }()) 

    UILoading = api.require('UILoading');
    window.loadingId = [];
      window.md5Sign = function (str,callback) {

               var signature = api.require('signature');
               if(!str){
                callback();
                return;
              }

                 signature.md5({
                    data:  str
                }, function(ret, err) {

                    if (ret.status) {

                         callback(ret.value.toLowerCase());
                    } else {

                      callback(JSON.stringify(err));

                    }
                });


          // })


      }

      window.getTestServerUrl = function () {
         
          return 'http://www.xiaoyuanbangong.com/webapi/';

      }

   window.getServerUrl = function () {

        return 'http://www.xiaoyuanbangong.com/appapi/';
   }
    window.openBaoxiu = function (info) {
       
        api.openWin({
              name:'报修详情',
              url: 'widget://html/common/win.html',
              reload:true,
              title : '报修详情', 
              pageParam: {
                  title: '报修详情',
                  url:'widget://html/frame0/affairsRepair/affairsDetail.html',
                  name :'报修详情',  
                  editBaoxiu:true,
                  reload:true,
                  params:{
                      info : JSON.parse(info)
                  }
              }
          });
      }

    window.ajax = function (options,callback) {




      var params = options.params ? options.params :  { 'paramsIsNull' : true };

      var serverUrl = options.isTest ? getTestServerUrl() :  getServerUrl();
      
      var url = serverUrl + options.aApi ; //http://weilaigou.com/wap/' + app_zhibo.php;


      var file = options.files ? options.files  : {};

      var method = options.method ? options.method  : 'post';

      var timeout = options.timeout ? options.timeout : 30


      //实时返回上传进度
      var report = options.report ? options.report : false;
      //实时返回上传进度end

      var timestamp = Date.parse(new Date())/1000;

      var tag = options.tag ? options.tag : 'ajax';



      if($api.getStorage('user') && !params.noneed_uid){

          var user = $api.getStorage('user');
          params.token  = user.token;
          params.username = user.username;
          params.uid =  user.uid || user.id || '';
          
 
      }
       var signStr = '';

 // sign=md5(key+uid+timestamp+key)，其中key是     ，timestamp是时间戳，传上去的参数除了uid之外，还需要timestamp，和sign

       md5Sign(signStr,function(md5Str){


         if(md5Str){

              params.timestamp  = timestamp;
              params.sign  = md5Str;

         }

           params.isapp  = 'zhxy'

            var requestStart = Date.parse(new Date())/1000;

              api.ajax({
                  url:url,
                  method:method,
                  // report:true,  //实时返回上传文件的进度 ,ret.progress
                  data: {
                      values : params,
                      files :  file
                  },
                  tag: tag  ,
                  report:report
                  // ,
                  // certificate:{
                  //  path : 'widget://cert/https.p12' ,
                  //  password:'123456'
                  // }
              },function(ret, err){


            var requestEnd = Date.parse(new Date())/1000;

  console.log( '接口：'+options.aApi + ',\n传递参数：'+JSON.stringify(options.params)+'\n耗时：' + (requestEnd - requestStart) +'s');


                    hideLoading();


                    if(ret){

                        if(ret.errcode ==2003){

                          goLogin();
                          toast('请登录')
                          return;
                        }
                       callback  ?  callback(ret) : null;


                    }else{

                      log(ret,true)
                      log(err,true)

                      // toast('网络错误','b')
                     // alert('服务器错误:'+JSON.stringify(err))
                      // callback  ?  callback(err) : null;
                    }


              });





        });
    }

    window.cancelAjax = function(tag){
      // alert('cancelAjax')
      api.cancelAjax({
          tag: tag || 'ajax'
      });

    }

    window.replyMail = function (mailArr) {

      api.openWin({
            name: 'Re:'+ mailArr.title,
            url: 'widget://html/common/win.html',
            delay:150,
            bgColor:'#fff',
            pageParam: {
               title: 'Re:'+ mailArr.title,
               name: 'Re:'+ mailArr.title,
                // url: 'widget://html/demo/index.html',
               url: 'widget://html/frame0/workMail/replyMail.html',
               sendmail:true,
                params : {
                  isCaogao : true,
                  mail : mailArr
                }
             }
        });

 
 
    
  }

   
    window.openGongGaoDetail = function (gonggao_id) {

              api.openWin({
                    name: '通知详情',
                    url: 'widget://html/common/win.html',
                    delay:150,
                    bgColor:'#fff',
                    pageParam: {
                        title: '通知详情',
                        name: '通知详情',
                        // url: 'widget://html/demo/index.html',
                        url: 'widget://html/frame0/schoolMess/messDetail.html',
                        // shareArticle : true,
                        params : {
                          gonggao_id : gonggao_id
                        }
                     }
                });
          
    }
    window.openMailDetail = function (mail) { 

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
                    reply : true,
                    params : {
                      mail_id  :　mail.id
                    }
                 }
            });
         
         
    }

    Array.prototype.arrayReverse = function () {

          var newArr = [];

 
              for(var i= 0 ; i < this[0].length;i++){

                   newArr[i] = [];

              }

              for(var i = 0 ; i < this.length;i++ ){

                    for(var j = 0 ; j < this[i].length ; j++){
                    
                       newArr[j][i] = this[i][j];

                  }
              } 

       return newArr;

  }


  //检测json是否有这个key 

   jsonHaveKey = function (json,key) {

        // 第二种
        var isKey = false;
        for (var i in json) {
            if (i == key) {
                isKey = true;
                break;
            }
        }
        return isKey;
    
  }



    window.getAllowMenu = function () {
      var newMenu = [];
      var allowMenuId = $api.getStorage('user').juese_cache_str ;
      // var allowMenuId = $api.getStorage('user').juese_cache_str +  ',' + $api.getStorage('user').zidingyi_cache_str;


      var allowMenuIdArr = allowMenuId.split(",").unique();
      
      //同步返回结果：
       var data = api.readFile({
            sync: true,
            path: 'widget://res/menu.json'
        });

       data = JSON.parse(data).slice(0,12);
  
       for(var i = 0 ; i < data.length ; i++){

              if(allowMenuIdArr.indexOf(data[i].menuid.toString())!==-1){

                     newMenu.push(data[i]);

              }

          }

         // return data;
         return newMenu;

    }

    window.checkMenu = function (number) {

      var hasMenu = false;
 
      var allowMenuId = $api.getStorage('user').juese_cache_str ;
      // var allowMenuId = $api.getStorage('user').juese_cache_str +  ',' + $api.getStorage('user').zidingyi_cache_str;


      var allowMenuIdArr = allowMenuId.split(",").unique();

          //同步返回结果：
      var data = api.readFile({
          sync: true,
          path: 'widget://res/menu.json'
      });

      data = JSON.parse(data); 
    
              // return true
 
      if(allowMenuIdArr.indexOf(number+"")!=-1){

              return true 
      } 


      
      return hasMenu;
 

  }
 
 

  window.getKey = function (key) {

       return  api.loadSecureValue({  sync: true,   key : key });

  }
 

 openClass = function (xuexiao_id,classid) {


    openWin({ title :'我的班级', name : '我的班级', url:'widget://html/frame1/myclass.html',right : true ,params : {
          classid : classid,
          xuexiao_id : xuexiao_id
    }});

  }

 // 返回end

 
 

     openDoc = function (url) {

        // excel、doc、docx、pdf 等
            if(url.match('http')){
               showLoading();

              download(url,function (path) {

                 hideLoading();

                 openFile(path);

              })

            }else{
                 openFile(url);

            }


     }
     openFile = function (path) {
      
       var docInteraction = api.require('docInteraction');
            docInteraction.open({
                path: path
            }, function(ret, err) {
                if (err) {
                    alert(JSON.stringify(err));
                } else {
                    alert(JSON.stringify(ret));
                }
            });

     }

 //登录检测


     window.checkLogin = function (callback,bool) {

       if(bool){
           callback();
           return;
       }
       if(!$api.getStorage('user')){

          goLogin();

       }else{

         callback ? callback(true) : null ;

       }
     }

 window.ISIOS = api.systemType == "ios" ? true: false;
 window.ISAN = api.systemType == "android" ? true: false;



     //登录检测end
     //登录
     goLogin = function(url){

         $api.rmStorage('user');
         api.removePrefs({  key: 'user' });

         api.openWin({
              name: 'login',
              url: 'widget://html/template/login.html',
              pageParam: {
                  name: 'value'
              },
              slidBackEnabled:false,
              scrollEnabled:false,
              animation:{
                subType : 'from_bottom',
                duration:300
              }
          });



    }
     // 登录end

    // 下载
  window.download = function (url,callback,isSavePath) {

    if(!url){callback();}

      var ext = url.split('.')[1];

 

   var downloadParams = {
        url: url,
        report: false,
        cache: true,
        allowResume: true
    };

  if(!isSavePath){

    downloadParams.savePath =  'fs://file/1'+ Math.floor(Math.random()*100000) + ext

  } 


    api.download( downloadParams , function(ret, err){
  
        hideLoading();
        if(ret.state == 1){

          callback(ret.savePath)

        }else{
          hideLoading();
          // alert(err,true)

          toast(ret.msg)



        }
    });
  }


 


  window.GetRequest = function(hurl){
      var url = hurl.split("?")[1]; //获取url中"?"符后的字串
     var theRequest = new Object();
     var strs ='';

     if( hurl.indexOf("?") != -1) {

        var str = url

        strs = str.split("&");

        for(var i = 0; i < strs.length; i ++) {

           theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
     }
    return theRequest;
  }

   window.copyInfo = function (info) {

    var clipBoard = api.require('clipBoard');

     clipBoard.set({
            value: info
        }, function(ret, err) {

            if (ret) {

                toast('复制成功')

            } else {
                // alert(JSON.stringify(err));
            }
        });
  }



  
 

    // 下载end
    // 隐藏加载状态
    hideLoading = function () {
      if(UILoading){
        for(var i = 0 ; i < 10; i++){
                UILoading.closeFlower({
                  id :loadingId[i]
                });
            }
         window.loadingId = [];

       }

    }
    parseTime = function(time){

      if(time){
           time = parseInt(time+'000');
           var date = new Date(time);

      }else{

           var date = new Date();

      }

   

      var addZero = function(number){
 
            if(number < 10){

                return '0' + number;
            }
            return number;

      }



      return {
         Y : date.getFullYear(),
         M : date.getMonth()+1,
         d : date.getDate(),
         week : date.getDay(), 
         h : addZero(date.getHours()),
         m : addZero(date.getMinutes()),
         s : addZero(date.getSeconds())

      }


    }







    window.getRadioChecked = function (nameStr) {
         var temp = document.getElementsByName(nameStr);
          for(var i = 0 ; i < temp.length ; i++ )
          {
               if(temp[i].checked){

                  return  temp[i].value; 

               }
          }

     }

      window.getCheckBoxChecked = function (nameStr) {

       var temp = document.getElementsByName(nameStr);

       var checkArr = [];
          for(var i = 0 ; i < temp.length ; i++ )
          {
               if(temp[i].checked){

                  checkArr.push(temp[i].value); 

               }
          }

       return checkArr;

   } 
   window.setCheckBoxChecked = function (nameStr,checkStr) {

       var temp = document.getElementsByName(nameStr);
 
       var checkArr = checkStr.split(",")
 
        for(var i = 0 ; i < temp.length ; i++ )
        { 

             var key = i + "";

             if(checkArr.indexOf(key)!=-1){


                temp[i].checked = true; 

             }else{

                 temp[i].checked = false; 

             }
        }

   } 
 window.setRadioChecked = function (nameStr,index) {
  
         var temp = document.getElementsByName(nameStr);

          for(var i = 0 ; i < temp.length ; i++ )
          { 
               if(i === index){

                  temp[i].checked =true; 

               }else{
                   temp[i].checked = false; 

               }
          }

     }
    window.sendSuccess = function (options) {

         api.openWin({
            name: '发送成功',
            url: 'widget://html/common/win.html',
            delay:100,
            bgColor:'#fff',
            pageParam: {
                title: '发送成功',
                name: '发送成功',
                url: 'widget://html/common/sendSuccess.html', 
                params:options
             }
        });

       
    }
    window.setHeaderBar = function(options){
        options = options || {}
        var color = options.color  ? options.color :  'light';
        var user =  $api.getStorage('user') || {};

        if( options.bar){

          var bar =  options.bar;

        }else{

          var bar = user.level == 1 ? '#f33' :  '#6ab494' ;

        }

        var full = options.full ? options.full :  false;

         api.setStatusBarStyle({
            style: color,
            color: bar
           });
          api.setFullScreen({
              fullScreen: full
          });

    }

    clearFull = function(){

           api.setFullScreen({
              fullScreen: false
          });
    }



    //警告框
    window.confirm = function (title,msg,callback) {


        if(arguments.length===3){


        }
        if(arguments.length===2){

          callback = msg;

          msg = title;

        }

        api.confirm({
            title: title || '温馨提示',
            msg: msg,
            buttons: ['确定', '取消']
        }, function(ret, err) {

          if(ret.buttonIndex==1){

             callback ?  callback(true) :null;

          }else{

             callback? callback(false) : null;

          }

        });
    }
    window.checkPhone = function(mobile){
       if( !mobile  ){
            toast('请填写手机号');
            return false;
          }

        if( mobile.length != 13  && mobile.length != 11 ){
          toast('手机号位数不正确');
          return false;
        }
        return true;

    }

    //提示气泡
    window.toast = function (msg,center) {

      if(!msg)return;
      switch(center){
         case 't' : center = 'top';break;
         case 'c' : center = 'middle';break;
         case 'b' : center = 'bottom';break;
         default:center = 'middle';break;
      }
      api.toast({
          msg: msg,
          duration: 2000,
          location: center || 'middle'
      });

    }
    // 加载框
    window.showLoading = function () {
       UILoading.flower({
           center: {
               x: api.winWidth/2,
               y: api.winHeight/2

           },
           size: 30,
           fixed: true
       }, function(ret) {
          //  alert(JSON.stringify(ret)
          loadingId.push(ret.id);

          setTimeout(function () {

            for(var i = 0 ; i < 10; i++){
                UILoading.closeFlower({
                  id :loadingId[i]
                });
            }



          },5000)
       });
    }
    window.isBottom  = function(callback){

       api.addEventListener({
          name:'scrolltobottom',
          extra:{
              threshold: 0            //设置距离底部多少距离时触发，默认值为0，数字类型
          }
      }, function(ret, err){
           callback();

      })


    }


    window.showProgress = function(text){

      api.showProgress({
        title: '',
        text: text || '加载中,请稍候..',
        modal: true
     });

      setTimeout(function(){
         hideProgress();
      },4000)

    }
    window.hideProgress = function(){
        api.hideProgress();

    }
    window.alert = function (msg,callback) {

      if(callback === true){
        alert(JSON.stringify(msg))
        return;
      }
      api.alert({
          title: '温馨提示',
          msg: msg,
      }, function(ret, err){
          if( ret ){

               callback ?  callback(ret) :null;

          }else{

              callback ?  callback(err) :null;

          }


      });

    }
    window.log =function (data,bool) {

      if(bool){

         console.log(JSON.stringify(data))

      }else{

           console.log(data)

      }

    }
    window.prompt = function (title,msg,placeholder,callback) {

      if(typeof(placeholder).toLowerCase() !='string'){  //如果是一个函数
          callback = placeholder;
          text = '';

      }else{          //如果不是一个函数，那placeholer就是一个字符串
        text = placeholder
      }

      api.prompt({
          title: title,
          msg: msg,
          text: text  || placeholder,
          buttons: ['确定', '取消']
      }, function(ret, err) {

           if(ret.buttonIndex==1){
              var call = {
                  click : true,
                  text : ret.text
              }
              callback(call)

           }else{
             var call = {
                  click : false,
                  text : ret.text
              }
             callback(call)

           }
      });

    }
    // 返回
    window.Back = function (){
      try{
        history.back();

      }catch(e){
        api.closeWin();
      }
    }
    // 下拉刷新
    window.initRefresh = function (callback) {

           api.setCustomRefreshHeaderInfo({
              bgColor: '#efefef',
              isScale: true,
              image: {
              }
          }, function() {

                  callback ? callback() : null

                  setTimeout(function () {
                      api.refreshHeaderLoadDone()
                  },3000)

          });


    }

    window.hideRefresh = function () {
        api.refreshHeaderLoadDone()

    }




   

window.openWin = function (options) {


  if(options.right){

     api.setScreenOrientation({  orientation: 'landscape_left' });

    }
   api.openWin({
          name: options.name,
          slidBackEnabled:options.right ? false:true,
          url: 'widget://html/common/win.html',
          pageParam:  options
      });

}


      window.fadeIn = function($this){
          $this.style.opacity = 1;
      }


   window.dom = function (selector) {
      return document.querySelector(selector);
   }
   window.domAll = function (selector) {
      return document.querySelectorAll(selector);
   }

   window.showBigPic = function($this,imgArr){

      var photoBrowser = api.require('photoBrowser');
  
      imgArr = imgArr ? imgArr : [ $this.src];
        
      var activeIndex = imgArr.indexOf($this.src) || 0;


      photoBrowser.open({
          images: imgArr,
          activeIndex : 0,
          bgColor: '#000',
          placeholderImg : $this.src
      }, function(ret, err) {
          if (ret) {

              if(ret.eventType ==='longPress'){

                    var index = ret.index;

                   api.actionSheet({
                      title: '是否保存至相册',
                      cancelTitle: '取消',
                      buttons: ['保存']
                  }, function(ret, err) {
                      if (ret) {

                        var buttonIndex = ret.buttonIndex;

                        if(buttonIndex == 1){

                             showLoading();

                             savePhoto(imgArr[index]);
                        }


                      }
                  });



              }

              if(ret.eventType === 'click'){

                  photoBrowser.close();

              }

              if(ret.eventType === 'show'){



               }




          }
      });

     }

     window.savePhoto = function(savePath){
 
      download(savePath,function(path){


        hideLoading();
 
         api.saveMediaToAlbum({
                  path: path
              }, function(ret, err) {
                   hideProgress();
                   hideLoading();
                if (ret && ret.status) {

                    alert('保存成功');

                } else {
                     alert('保存失败');
                }
            });


      })



     }


     window.isNewVersion = function(){

      if($api.getStorage('app_version')){

            if($api.getStorage('app_version')!= api.appVersion){

                return true

            }

        }else{

           return false



        }
     }
    //去重
     Array.prototype.unique = function(){
         var res = [];
         var json = {};

         for(var i = 0; i < this.length; i++){

            if(!json[this[i]]){

               res.push(this[i]);

               json[this[i]] = 1;


            }


         }
         return res;
    }
 //去重end
     saveJiaoshiId = function (id,name) {
            // 存储id

           var    selectIdArr=   $api.getStorage('selectIdArr') || [];

           selectIdArr.push(id);

          selectIdArr =  selectIdArr.unique()

          // 存储教师名字 

           var  selectJiaoshiArr=   $api.getStorage('selectJiaoshiArr') || [];

           selectJiaoshiArr.push(name);
 
           selectJiaoshiArr =  selectJiaoshiArr.unique()
 
           $api.setStorage('selectIdArr',selectIdArr);

           $api.setStorage('selectJiaoshiArr',selectJiaoshiArr);

      
    }

    //发送邮件时，保存的id和姓名
     saveMailPeople = function (id,name) {
            // 存储id

 
          var selectSendMailIdArr = $api.getStorage('selectSendMailIdArr') || [];

          selectSendMailIdArr.push(id);

          selectSendMailIdArr =  selectSendMailIdArr.unique()

           $api.setStorage('selectSendMailIdArr',selectSendMailIdArr);
          // 存储教师名字 

           var  selectSendMailNameArr=   $api.getStorage('selectSendMailNameArr') || [];

 
           selectSendMailNameArr.push(name);
 
           selectSendMailNameArr =  selectSendMailNameArr.unique()
 

           $api.setStorage('selectSendMailNameArr',selectSendMailNameArr);

      
    }

    //发送邮件时，移除的id和姓名
    removeMailPeople = function (id,name) {

 
           // 移除教师id

           var selectSendMailIdArr  =   $api.getStorage('selectSendMailIdArr') || [];
       
           selectSendMailIdArr.remove(id); 

           $api.setStorage('selectSendMailIdArr',selectSendMailIdArr);

           // 移除教师名字

           var selectSendMailNameArr  =   $api.getStorage('selectSendMailNameArr') || [];
        
           selectSendMailNameArr.remove(name);

           $api.setStorage('selectSendMailNameArr',selectSendMailNameArr);



      
    }
  

    removeJiaoshiId = function (id,name) {

           // 移除教师id

           var selectIdArr  =   $api.getStorage('selectIdArr') || [];
       
           selectIdArr.remove(id); 

           $api.setStorage('selectIdArr',selectIdArr);

           // 移除教师名字

           var selectJiaoshiArr  =   $api.getStorage('selectJiaoshiArr') || [];
        
           selectJiaoshiArr.remove(name);

           $api.setStorage('selectJiaoshiArr',selectJiaoshiArr);



      
    }

    Array.prototype.remove = function(val) { 

        var index = this.indexOf(val); 

            if (index > -1) { 
            this.splice(index, 1); 
        } 
   };

    Array.prototype.allRightBarUnique = function(){
         var res = [];
         var json = {};

         for(var i = 0; i < this.length; i++){

            if(!json[this[i].jiaoshi_id]){

               res.push(this[i]); 

               json[this[i].jiaoshi_id] = 1;
               

            }


         }
         return res;
    }

    Array.prototype.arrUnique = function(colm){
         var res = [];
         var json = {};

         for(var i = 0; i < this.length; i++){

            if(!json[this[i]][colm.toString()]){

               res.push(this[i]); 

               json[this[i][colm.toString()]] = 1;
               

            }


         }
         return res;
    }






 }
