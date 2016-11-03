$(function(){
	//变量i用于控制图片位置
	var i = 0;
	var moveTime = 600;
	var _pic = $('#imgs');
	var size = $('#imgs li').length;	//size=4
	var width = $('#imgs li a img').width();

	//图片移动函数
	function move(set){
		if($(_pic).is(":animated"))		//判断当前是否在执行轮播，如果在执行，使本次的i重置
			i = $('#bar .on').index();
		else {	//只有当前没有在轮播的时候才能正常执行后面的轮播
			//判断图片位置的情况
			if(set == size){		//Right button
				i = 0;
				_pic.stop(true).animate({left: -set * width}, moveTime, function(){
					$(this).css('left', 0);
				});
			} else if(set < 0) {	//Left button
				i = size - 1;
				_pic.stop(true).css('left', -size * width).animate({left: -i * width}, moveTime);
			} else
				_pic.stop(true).animate({left: -set * width}, moveTime);	//移动图片
			$('#bar li').eq(i).addClass('on').siblings().removeClass('on');
		}
	}

	//将第一张图片复制并插入到图片列的最后一位
	var clone = $('#imgs li').first().clone();
	$('#imgs').append(clone);

	//生成bar的点，数量等于要显示的图片的数量
	for(var j = 0; j < size; j++)
		$('#bar').append("<li></li>");
	$('#bar li').first().addClass('on');

	//鼠标划入圆点
	$('#bar li').mouseenter(function(){
		i = $(this).index();
		_pic.stop();
		move(i);
		$(this).addClass("on").siblings().removeClass("on");
	});

	//绑定按钮事件
	$('.btn_r').click(function(){move(++i);});
	$('.btn_l').click(function(){move(--i);});

	//自动轮播
	var t = setInterval(function(){move(++i);}, 2000);
	$('#box').hover(function(){
		clearInterval(t);
	},function(){
		t = setInterval(function(){move(++i);}, 2000);
	});
});