
 initUpdateHeadPic = function (callback) {
        


          UpdateHeadPic = function () {


                api.actionSheet({ 
                    cancelTitle: '取消', 
                    buttons: ['查看','拍照','从相册中获取']
                }, function(ret, err) {
                    if (ret) {
                      
                       var index  = ret.buttonIndex ;

                       switch(index){
                        case 1 :  lookPic();break;
                        case 2 :  getPicture();break;
                        case 3 :  openAlbum();break;
                       }

                        
                    } else {
                        // alert(JSON.stringify(err));
                    }
                });
       
            
          }

          lookPic = function () {

           var $this =  document.querySelector('#touxiang_url');

              showBigPic($this);
            
          }


          getPicture = function () {


            api.getPicture({
                  sourceType: 'camera',
                  encodingType: 'jpg',
                  mediaValue: 'pic',
                  destinationType: 'url',
                  allowEdit: true,
                  quality: 50,
                  targetWidth: 200, 
                  saveToPhotoAlbum: false
              }, function(ret, err) {
                
                  if (ret) {
       
                        if(ret.data){

                          var pathStr = ret.data;
       
                          doCompress(pathStr);

                        }

                  } else {

                  }
              });
          }

           doCompress = function (pathStr) {
            var options = {
              size : {
                 w : 400,
                 h : 400,
              },
              path : pathStr
            }

               imageFilterCompress(options,function (compressPath) { //压缩中

                     var pathArr = [{
                        path : compressPath,
                        url : compressPath
                     }] 

                     uploadAliOss(pathArr,function (data) {


                             doSaveHeadPic(data);

                            
                     });
          
              })

              
          }

           openAlbum = function () {
       
                var UIAlbumBrowser = api.require('UIAlbumBrowser');

                UIAlbumBrowser.open({
                    max: 1,
                    styles: {
                        bg: '#fff',
                        mark: {
                            icon: '',
                            position: 'bottom_left',
                            size: 20
                        },
                        nav: {
                            bg: '#03a9f4',
                            titleColor: '#fff',
                            titleSize: 14,
                            cancelColor: '#fff',
                            cancelSize: 14,
                            finishColor: '#333',
                            finishSize: 14
                        }
                    },
                    rotation: true
                }, function(ret) {
                    if (ret) { 

                      if(ret.eventType === 'confirm'){
       
                              var list = ret.list;


                              transPath( list[0].path,function (pathStr) {

                                    showProgress('请稍等..')
                                    
                                    doCompress(pathStr);

           

                              })


                      }



        
                    }
                });
       
            
          }

         transPath = function (path,callback) {
            var UIAlbumBrowser = api.require('UIAlbumBrowser');
              UIAlbumBrowser.transPath({
                  path: path
              }, function(ret, err) {
                  if (ret) {
                     callback(ret.path)
                  } else {
                      alert(JSON.stringify(err));
                  }
              });
          }
      doSaveHeadPic = function (headList) {

                var touxiang_url = headList[0].url 
       
                 
                showProgress('正在保存,请稍候..');
       
                      ajax({
                         aApi : 'Wdxinxi/editJiaoshi',
                         params:{
                            jiaoshi_id : $api.getStorage('user').id,
                            touxiang_url : touxiang_url
                         } 
                      },function (data) { 
             
                        hideProgress();

                        if(data.code == 1){ 
        

                                var user = $api.getStorage('user') || {};

                                user.touxiang_url = data.data;

                                $api.setStorage('user',user);

                                api.setPrefs({   key: 'user',   value : user  });

                                callback();
               
              
                                  toast(data.msg)


                        }else{

                          toast(data.msg)

                        }


                        
                      })



            
          }

}
