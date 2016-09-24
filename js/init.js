/*调用插件*/
;(function($){
	//获取json
	function getData(){
		var json=null;
		$.ajax({
			url:"data.json",
			type:"get",
			dataType:"json",
			async:false,
			success:function(result){
 				json=result;
			},
			error:function(){
				alert("请求失败");
			}
		})
		return json;
	}
	$(".first_menu").menu({
		json:getData()
	})
	//调用上传
	new Upload({
		container:"up_box",
		countent:"up_counter",
		file:"file"
	})

})(Zepto)

