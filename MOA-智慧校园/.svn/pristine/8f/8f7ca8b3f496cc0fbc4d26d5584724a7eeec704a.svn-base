dialogBoxShare = function (item,callback) {
    
     var dialogBox = api.require('dialogBox');
        dialogBox.share({
            rect: {
                w: 300,
                h: 160
            },
            items : item ,
            styles: {
                bg: '#FFF',
                column: item.length,
                horizontalSpace: 15,
                verticalSpace: 30,
                itemText: {
                    color: '#000',
                    size: 15,
                    marginT: 10
                },
                itemIcon: {
                    size: 40
                }
            },
            tapClose: true
        }, function(ret) {

            var dialogBox = api.require('dialogBox');

            dialogBox.close({ dialogName: 'share' });

            var index = ret.index;  //0开始

            callback(index);
       });

}

