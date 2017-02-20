//上传图片JS库
//使用前必须在ready中引入相应的模块

;! function() {
	window['img'] = {
		//生成随机文件名
		NewGuid : function() {
			function S4() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}

			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		},
		// 获取文件拓展名
		getExt : function(fileName) {
			return fileName.substring(fileName.lastIndexOf('.') + 1);
		},
		// 获取当前时间
		getNowFormatDate : function() {
			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate
			return currentdate;
		},
		// 图片压缩
		// imgsrc：源图片的路径
		// quality：图片压缩质量，一般建议0.5
		// scale：图片压缩比例，也是建议0.5
		// ext：源图片拓展名
		// callback：转换成功之后回调函数
		imgCompress : function(imgsrc, quality, scale, ext, callback) {
			var that = this;
			// 压缩文件的保存目录
			var savePath = api.cacheDir + '/picture/' + that.getNowFormatDate() + '/';
			// 压缩文件生成的随机文件名称
			var savename = that.NewGuid() + "." + ext;
			imageFilter.compress({
				img : imgsrc,
				quality : quality,
				scale : scale,
				save : {
					album : false,
					imgPath : savePath,
					imgName : savename
				}
			}, function(ret, err) {
				if (ret) {
					callback(savePath + savename);
				} else {
					api.toast({
						msg : err.msg
					});
				}
			});
		},
		// 打开图片预览(imgs必须是数组)
		openImageBrowser : function(imgs) {
			imageBrowser.openImages({
				imageUrls : imgs,
				showList : false,
				activeIndex : 0,
				tapClose : true
			});
		},
		//打开照相机获取
		openCamera : function(options, callback, errmsg) {
			options = options || {};
			api.getPicture(options, function(ret, err) {
				if (ret) {
					callback(ret);
				} else {
					api.toast({
						msg : errmsg
					});
				}
			});
		},
		//获取图片的宽高
		getAttr : function(path, callback) {
			imageFilter.getAttr({
				path : path
			}, function(ret, err) {
				if (ret.status) {
					callback(ret);
				} else {
					H.toast('拍照取消');
				}
			});
		}
	};
}();
