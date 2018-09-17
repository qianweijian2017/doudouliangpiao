 
  
    
    
    bindAliasAndTags = function (options,callback) {

     options = options || {};

    	var alias = options.alias || 0;

    	var tags = options.tags || 0;

    	var ajpush = api.require('ajpush');
     

   
       var param = { alias : 'AA' + alias  ,tags:[  'AA' + tags ]};

          ajpush.bindAliasAndTags(param,function(ret) {

                  var statusCode = ret.statusCode;
           

                  callback(statusCode);



          });

    }

     
    
    aJPushOnClick = function (callback) {
    	var extra = extra ? extra : {};

    	callback(extra)

    }

    //监听通知事件
    setListener = function (callback) {
 
      if(api.systemType ==='android'){
 
		      api.addEventListener({
		            name: 'appintent'
		        }, function(ret, err) {

 		            if (ret && ret.appParam.ajpush) {

		                var ajpush = ret.appParam.ajpush;
		                var id = ajpush.id;
		                var title = ajpush.title;
		                var content = ajpush.content;
		                var extra = ajpush.extra;

		                // alert(extra,true)
		                callback ? callback(extra) : 0;

		            }
		        })

      } else{

       
          addEventNoticeclicked(function (extra) {

		          callback(extra)
          	
          });

          addEvenAjSetListener();
 


      }





         
    }

    //监听极光推送的信息,苹果需要越狱后，在开发环境测试
     addEvenAjSetListener = function () {
    	var ajpush = api.require('ajpush');
  
          ajpush.setListener(
            function(ret) {
                 var id = ret.id;
                 var title = ret.title;
                 var content = ret.content;
                 var extra = ret.extra;
                 //弹出状态栏通知
                  api.notification({
                      notify: {
	                      title:  title || '智慧校园',
	                      content: content,
	                      extra: extra
                      }
                  });

                  
            }
        );
    }
    //为苹果添加状态栏的点击事件
     addEventNoticeclicked = function (callback) {

       api.addEventListener({
              name: 'noticeclicked'
          }, function(ret, err) {
 
              if (ret && ret.value) {

                if(ret.type==1){  //苹果在前台点击

                  var extra = ret.value; 
  
 
                }else if(ret.type==0){//苹果在后台点击

                  var ajpush = ret.value;
                  var content = ajpush.content;
                  var extra = ajpush.extra;
 
                }

                callback(extra)
                  
 
 
              }


          })
    }


    JPushInit = function (callback) {

			if(api.systemType==='ios'){

					callback();


			}else{

				var ajpush = api.require('ajpush');

				ajpush.init(function(ret) {  //仅在Andird下有效 ios自动初始化
				    if (ret && ret.status){
				        callback(); 
				    }

				});

			}
			


		}
    // 测试end

		

		 

		addEventBindTagsTest = function (callback) {

     	var ajpush = api.require('ajpush');

			var deviceId = api.deviceId;
			if(deviceId.indexOf('-')){
				deviceId = deviceId.split('-').join("");
			}

 			var random = 'A'+  deviceId.substr(0,4);
			var random1 =  'A'+ deviceId.substr(4,4);
			var random2 =  'A'+  deviceId.substr(8,4);


			$api.dom('#userid').innerHTML = 'alias : '+  random;
 

			$api.dom('#tags1').innerHTML =  'tags1 : '+ random1;
			$api.dom('#tags2').innerHTML =  'tags2 : '+ random2;


 
 			var param = { alias : random , tags : [ random1 , random2 ] }; //标签可以多个，别名只能一个,别名设置有可能会有极光官方的后台计算不到


			ajpush.bindAliasAndTags( param , function(ret) {

			        var statusCode = ret.statusCode;
              callback(statusCode);
			});

		}

		addEventLParse = function () {
    
		    api.addEventListener({name:'pause'}, function(ret,err) {

		        onPause();//监听应用进入后台，通知jpush暂停事件

		    })
		}
		addEventLResume = function () {
     
		    api.addEventListener({name:'resume'}, function(ret,err) {

		        onResume();//监听应用恢复到前台，通知jpush恢复事件
		    }) 
		}

		addEventLIntent = function () {

			api.addEventListener({name:'appintent'}, function(ret,err) {

		        alert('通知被点击，收到数据：\n' + JSON.stringify(ret));//监听通知被点击后收到的数据

		    })
		}

//统计-app恢复
function onResume(){
    	var ajpush = api.require('ajpush');

    ajpush.onResume();
    console.log('JPush onResume');
}

//统计-app暂停
function onPause(){
    	var ajpush = api.require('ajpush');
	
    ajpush.onPause();
    console.log('JPush onPause');


}



