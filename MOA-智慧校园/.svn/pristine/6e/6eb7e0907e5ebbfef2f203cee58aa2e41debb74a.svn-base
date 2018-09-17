 
  function initAliOss() {
 
		var bucketName = null,objectKey = null,endpoint = null,aliyunOSSBucketUrl = null,accessKeyId = null,accessKeySecret = null;

	 
		ajax({
			 aApi : 'index/getAliyunJiami', 
		},function (data) {

						bucketName = data.bucketName 

						endpoint =  data.endpoint
						aliyunOSSBucketUrl =  data.aliyunOSSBucketUrl
						accessKeyId =  data.accessKeyId
						accessKeySecret =  data.accessKeySecret
 
					// 初始化sdk （调用优先级最高，只需要调用一次）

			   var  aliyunOSS = api.require('aliyunOSS');
						
				aliyunOSS.initOSSClient({ 
				    endpoint : endpoint,
				    accessKeyId :accessKeyId ,
				    accessKeySecret: accessKeySecret , 
				},function(ret,err){

				  if(ret){  }

				});

			
		}) 

  

	

	

	 
 
 



     uploadAliOss = function (list,callback) {  
     	 
			    	//   list: [{                         //数组类型；返回指定的资源信息数组
				    //      gifImagePath:'',            //字符串类型；gif图路径，返回gif图在本地的绝对路径，可直接使用 注意:当gifImagePath存在，则不返回path和thumbPath路径
				    //       path: '',                   //字符串类型；资源路径，返回资源在本地的绝对路径。注意：在 iOS 平台上需要先调用 transPath 接口将路径转换之后才能读取目标资源媒体文件
				    //     thumbPath: '',               //字符串类型；缩略图路径，返回资源缩略图在本地的绝对路径
				    //     suffix: '',                  //字符串类型；文件后缀名，如：png，jpg, mp4(iOS不支持)
				    //     size: 1048576,               //数字类型；资源大小，单位（Bytes）(iOS不支持)
				    //     time: '1490580032000',       //字符串类型；资源修改时间，格式：时间戳，单位为毫秒。
				    //     mediaType:'',                //字符串类型;所在相册的类型,   Image ,Video ,Audio.
				    //     duration:50                  //数字类型；视频时长,单位为毫秒
				    // }
 		
 			var getList = function (list) {

				   var urlArr = list.split('/');


				   var ext  = urlArr[urlArr.length-1].split('.')[1];

				   	var pathlist = [{
				   		  path : list 
				   	}]

				   	return pathlist;

 				
 			}


		   list = (list instanceof Array) ? list : getList(list);
 
  				
			multiFileUpload(list,function (aliObjectPath) {

				   callback(aliObjectPath);
			});


				
		}


		multiFileUpload = function (list,callback) {

 
		   var currentTime = Date.parse(new Date())/1000;

		   var dateObj = parseTime(currentTime);

		   //去重
		   
		   var loadCount = 0;

		    var newFileUpCount = 0;
		    
  
			 log('list长度'+list.length)
			 log('list内容'+JSON.stringify(list));


			var aliObjectPath = [];
 
			 (function loopUp(i) {

			 	log('执行loopUp')
			 	++loadCount 



							 	if(i === list.length){

							 		// api.toast({   msg : '上传成功' });

							 		log('上传至ALIOSS，执行了'+loadCount+'次') 




							 		api.sendEvent({
									    name: 'uploadDone',
									    extra: { 
									        aliObjectPath : aliObjectPath
									        
									    }
									});
									 

							 		callback(aliObjectPath);

							    	api.hideProgress();
							    	return;
							 	}



								var aliyunOSS = api.require('aliyunOSS');

							 	var nowPath = list[i].path; //文件路径 

 
							 	var pathArr = nowPath.split('/');

							 	var mingcheng = pathArr[pathArr.length-1];


							 	var mingchengArr = mingcheng.split('.');

							 	var mingchengBefore = mingchengArr[mingchengArr.length-2];

							 	var mingchengExt = mingchengArr[mingchengArr.length-1];

							 	var saveMingcheng = mingchengBefore +'_v_' +currentTime  

							 	 
							 	if(list[i].path.match('https') != null ){
							 		
							 			aliObjectPath.push({
								    			houzhui : mingchengExt ,
								    			mingcheng : saveMingcheng ,
								    			url : list[i].path
								    	})

								    	// alert(JSON.stringify(ret))
						    			api.hideProgress();

								    	loopUp(++i);


							 	}else{

							 		log('新添加的图片上传次数'+ (newFileUpCount++))



			 var savePath = bucketName +'/zhihuixiaoyuan/appFile/'+ dateObj.Y + '-' + dateObj.M + '-' + dateObj.d + '/'+ saveMingcheng + '.'+ mingchengExt;

							 		aliyunOSS.upload({
									    file : nowPath, //    要上传的文件路径  fs://、cache://等
									    bucketName : bucketName, //Bucket名称。
						 				objectKey : savePath, //上传后的 Object名称。如："folder/subfolder/file" 带后缀
									    uploadType :1,
									}, function(ret, err) {
										// log(ret,true)
  
										if(ret){
  

									     var httpsPath = aliyunOSSBucketUrl  + '/' +  savePath;

 										  
											api.sendEvent({
											    name: 'uploadProgress',
											    extra: {
											        list: list, 
											        index: i,
											        progress : ret.progress,  
											        
											    }
											});

											 if(ret.oper === 'complete'){
 
												    	aliObjectPath.push({
											    			houzhui : mingchengExt ,
											    			mingcheng : saveMingcheng  ,
											    			url : httpsPath
												    	})
												    	 // log(aliObjectPath,true)
			 
												    	// alert(JSON.stringify(ret))
										    			api.hideProgress();
 
												    	loopUp(++i);


											  }


 
										}
 									    else{

									    	log(err,true)


									    }
									});


							 		
							 	}


							 }(0))

			
		}

		downloadAliOss = function (objectPath,callback) {

 
				 var aliyunOSS = api.require('aliyunOSS');
  
				aliyunOSS.download({
				    bucketName: bucketName ,
				    objectKey : objectKey + '/'+ objectPath, // 
				    saveFileName:'fs://'+saveFileName//下载文件到本地时的路径（仅支持 fs://）
				}, function(ret, err) {
    
							if(ret.oper === 'complete'){
 
								api.hideProgress();
  
								var path = '文件保存路径' +  ret.path;//文件保存路径



								callback(path) 
								return;
								// $api.text($api.dom('#path'),path);
								// $api.text($api.dom('#size'),contentLength);

  
							}


 
 					 else{

				    }
				});
		}

		deleteAliOss = function (url) {
 			 

 			var objectKey =   url.replace('https://liangcai-product-south.oss-cn-shenzhen.aliyuncs.com/liangcai-product-south/','');
  
		    var aliyunOSS = api.require('aliyunOSS');
  
			aliyunOSS.deleteObject({
			    bucketName: bucketName,//Bucket名称。
			    objectKey : objectKey ,//待删除的阿里OSS文件名，"folder/subfolder/file"
			}, function(ret, err) {
				
			      if(ret.status){
 
 			      	toast('删除成功');
 
			       }else{ 

 			      	toast('删除失败');


			    }

                hideProgress();
			});
                hideProgress();
 

		}











// init end

} 

		
  