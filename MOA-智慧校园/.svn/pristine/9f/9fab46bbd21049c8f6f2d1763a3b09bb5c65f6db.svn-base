function initTimeSelector() {

    UICalendar = function () {

        var UICalendar = api.require('UICalendar');
                    UICalendar.open({
                        rect: {
                            x: 30,
                            y: api.frameHeight / 2 - 170,
                            w: api.frameWidth - 60,
                            h: 340
                        },
                        styles: {
                            bg: 'rgba(0,0,0,0)',
                            week: {
                                weekdayColor: '#3b3b3b',
                                weekendColor: '#a8d400',
                                size: 12
                            },
                            date: {
                                color: '#3b3b3b',
                                selectedColor: '#fff',
                                selectedBg: '#a8d500',
                                size: 12
                            },
                            today: {
                                color: 'rgb(230,46,37)',
                                bg: ''
                            },
                            specialDate: {
                                color: '#a8d500',
                                bg: 'widget://image/a.png'
                            }
                        },
                        specialDate: [{
                            date: '2015-06-01'
                        }],
                        switchMode: 'vertical',
                        fixedOn: api.frameName,
                        fixed: false
                    }, function(ret, err) {
                        if (ret) {
                            alert(JSON.stringify(ret));
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
       }

    function timeSelector() {

            var timeSelector = api.require('timeSelector');
            timeSelector.open({
                x: 30,
                y: api.frameHeight / 2 - 130,
                width: api.frameWidth - 60,
                height: 260,
                fixedOn: api.frameName
            }, function(ret, err) {
                if (ret) {
                    alert(JSON.stringify(ret));
                } else {
                    alert(JSON.stringify(err));
                }
            });

    }
}