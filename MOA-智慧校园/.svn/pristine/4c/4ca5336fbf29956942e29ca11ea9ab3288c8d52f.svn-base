  
initXunfei = function () {
  

    window.getKey = function (key) {

       return  api.loadSecureValue({  sync: true,   key : key });
     
    }
    
  window.initUtility = function () { 

    window.voiceRecognizer = api.require('voiceRecognizer');

        if(api.systemType==='ios'){

           voiceRecognizer.createUtility({
              ios_appid: getKey('xunfeiIosAppid'), 
          }, function(ret, err) { 
          });


        }else if(api.systemType==='android'){

           voiceRecognizer.createUtility({
              android_appid:  getKey('xunfeiAndroidAppid'), 
          }, function(ret, err) { 
          });

        }
       
 }
 
initUtility();  

}
 
