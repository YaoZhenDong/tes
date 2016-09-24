
/*
	插件参数说明：
		container:添加后的容器
		counter：统计数量的容器
		file：操作的文件域
		num：最多上传的数量
		size:上传文件的大小
*/
function Upload(opt){
	var _default={
		container:"up_box",
		countent:"up_counter",
		file:"file",
		num:8,
		size:2
	}
	this.opt=$.extend({},_default,opt);
	this.init();

}
Upload.prototype={
	init:function(){//初始化
		var that=this,
		//为文件域绑定change事件
			file=$("#"+this.opt.file);
		file.on("change",function(){
			//获取上传的文件对象 
		
			//文件对象下的0属性里保存所有上传文件的信息 name文件名 size文件的体积 
			var info=this.files[0];
			//判断格式 jpg jpeg png gif 
			var reg=/(jpg|jpeg|png|gif)$/;
			container=$("#"+that.opt.container);
			if(!reg.test(info.name)){
				//文件格式有错
				
				var mes="请上传jpg、jpeg 、png或gif格式的图片";
			}else{
				//判断文件大小
				if(info.size>that.opt.size*1024*1024){
					var mes="请上传小于2M的图片";
				}
				
			}
			if(mes){
				$.dialog({
				
				conten:mes,
				btn:["关闭"]
			
			})
				return false;
			}
			var node=$('<li class="up_img">'
					+'<img src="" alt="" />'
					+'<img src="" alt="" />'
					+'<a href="javascript:;" >关闭</a>'
					+'</li>'

				)
			node.prependTo(container);
			that.counter();
		})
		
	},
	counter:function(){
		//统计已上传的数量
		var counterBox=$("#"+this.opt.countent).find("span");
		console.log(counterBox);
		already=$(".up_img").size();
		can=this.opt.num-already;
		//显示到页面
		counterBox.eq(0).text(can);
		counterBox.eq(1).text(already);
		if(already>=this.opt.num){
			$(".up").hide();
		}else{
			$(".up").show();
		}
	}
}
