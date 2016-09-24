
/*封装第一个菜单的插件*/
;(function($){
	$.fn.menu=function(opt){
		//扩展参数
		var opt=$.extend({json:null},opt);
		//遍历当前对象
		return $(this).each(function(index,first_selbox){
			//渲染一级菜单，判断当前渲染的是哪一个下面的一级菜单
			var key=$(this).data("key"),keyVal=null,options="<option>请选择</option>";
			if(Object.prototype.toString.call(opt.json[key])=="[object Array]"){
				//第一个的数据类型是数组
				keyVal=opt.json[key];
			}else{
				//第二个的是对象
				keyVal=opt.json[key].option;

			}
			//遍历json 渲染数据
			$.each(keyVal,function(i,ele){
				//判断是 id 还是value；text还是
				var value=ele.id || ele.value,
					txt=ele.name || ele.text;
				options+="<option value='"+value+"'>"+txt+"</option>";
			})
			//添加到select中
			var sel=$(this).find("select");
			sel.html(options);
			//设置一级中的label里的文字为  请选择
			$(this).find("label").text(sel.find("option").eq(0).text());

			//为一级菜单添加change事件，更改label中的文字 并且显示对应的二级菜单
			sel.on("change",function(){
				//获取当前选中的option
				var inx=this.selectedIndex,//获取选中的索引
					val=this.value,//获取选中的值
					submenu=$(this).parent().next();//二级菜单的容器

				//把选中的文本值设置成label的值
				sel.parent().find("label").text(sel.find("option").eq(inx).text());

				//判断是否显示二级菜单
				if(val!="请选择"){//显示
					//$(this)代表当前的select
					var str="",sub=submenu.find("select"),subLabel=submenu.find("label");
					submenu.css({"opacity":1});

					//渲染二级菜单
					$.each(keyVal[inx-1].option,function(i,e){
						var t=e.name || e.text,
							v=e.id || e.value;
						str+="<option value='"+v+"'>"+t+"</option>";
					})
					sub.html(str);

					//让二级菜单 选中的文本值设置成label的值
					subLabel.text(sub.find("option").first().text());

					//为二级菜单添加change事件
					sub.on("change",function(){
						subLabel.text(this.options[this.selectedIndex].text);
					})
				}else{//隐藏
					submenu.css({"opacity":0});
				}
			})

		})
	}
})(Zepto)
