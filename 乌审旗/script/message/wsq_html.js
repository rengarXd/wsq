apiready = function() {
	help_id = api.pageParam.id;
	var vm = new Vue({
		el : "#record_list",
		data : {
			news_title : '',
			news_cont : '',
			edit_date : '',
			cont_type : '',
			statuss : true,
			text : false,
			productList : [],
			imgurl : []
		},
		fitlers : {
		},
		mounted : function() {
			this.$nextTick(function() {
				this.carView();
			});
		},
		methods : {
			carView : function() {
				var _this = this;
				api.getPrefs({
					key : 'userinfo'
				}, function(ret, err) {
					if (ret && ret.value) {
						user = eval('(' + ret.value + ')');
						//api.showProgress();
						$xy.ajax(function(ret, err) {
							console.log(JSON.stringify(ret));
							if (ret.success) {
								if (ret.data.length == 0) {
									//当没有订单时的处理
									var htmls = '<div class="H-position-absolute H-position-center-all" id="statuss"><div class="H-font-size-14 H-text-align-center"><i class="iconfont icon-dingwei H-font-size-32 H-theme-font-color-999"></i><div class="H-theme-font-color-999">暂无数据</div></div></div>';
									document.getElementById('record_list').innerHTML = htmls;
								} else {
									_this.news_title = ret.data[0].news_title;
									_this.news_cont = ret.data[0].news_cont;
									_this.edit_date = ret.data[0].edit_date;
									_this.cont_type = ret.data[0].cont_type;
									_this.imgurl = ret.data[0].imgurl;
									_this.productList = ret.data;
									_this.statuss = false;
									_this.text = true;
								}
							} else if (ret && !ret.success) {
								//api.hideProgress();
								api.toast({
									msg : ret.message
								});
							} else {
								//api.hideProgress();
								api.toast({
									msg : err.body
								});
							}
						}, 'selfacilitiesmx&funid=public_news&cont_type=' + help_id);
					} else {
					}
				});
			},
			openscan : function(url) {
				//引入图片预览模块
				imageBrowser = api.require('imageBrowser');
				alert(url);
				//						var arr = new Array();
				//						arr.push(url);
				//						//alert(arr);
				//						img.openImageBrowser(arr);
			}
		}
	});

}
