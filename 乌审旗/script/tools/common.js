/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window) {
    var u = {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    var uzStorage = function() {
        var ls = window.localStorage;
        if (isAndroid) {
            ls = os.localStorage();
        }
        return ls;
    };
    function parseArguments(url, data, fnSuc, dataType) {
        if ( typeof (data) == 'function') {
            dataType = fnSuc;
            fnSuc = data;
            data = undefined;
        }
        if ( typeof (fnSuc) != 'function') {
            dataType = fnSuc;
            fnSuc = undefined;
        }
        return {
            url : url,
            data : data,
            fnSuc : fnSuc,
            dataType : dataType
        };
    }

    //登录失效处理
    //@path ../../
    u.loginInvalid = function(path) {
        api.alert({
            title : "登录信息失效",
            msg : "抱歉，登录信息失效，点击确定进行登录操作"
        }, function(ret, err) {
            if (ret && ret.buttonIndex === 1) {
            	//跳轉
                api.openWin({name : 'login_body',url : path+'login/login_body.html'});
                api.removePrefs({key : 'islogin'});
            }
        });
    };

    window.$common = u;
})(window);

