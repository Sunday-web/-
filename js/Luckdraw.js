// 参数设置部分
var ConstPeople=3//设置单次抽奖人数
var isAssignation=true;//设置是否有内定的一个人
var assignationName='修睿';//内定人的姓名
var assignationImg='img/7.jpg';//内定人的头像


var Lotterynumber = ConstPeople; //赋值给变量
var nametxt = $('.slot');
var phonetxt = $('.name');
var pcount = xinm.length-1;//参加人数
var runing = true;
var trigger = true;
var inUser = (Math.floor(Math.random() * 10000)) % ConstPeople + 1;
var num = 0;



$(function () {
	nametxt.css('background-image','url('+xinm[0]+')');
	phonetxt.html(phone[0]);
});

// 开始停止
function start() {

	if (runing) {

		if ( pcount <= Lotterynumber ) {
			alert("抽奖人数不足"+Lotterynumber+"人");
		}else{
			runing = false;
			$('#start').text('停止');
			startNum()
		}

	} else {
		$('#start').text('自动抽取中('+ Lotterynumber+')');
		zd();
	}
	
}

// 开始抽奖

function startLuck() {
	runing = false;
	$('#btntxt').removeClass('start').addClass('stop');
	startNum()
}

// 循环参加名单
function startNum() {
	num = Math.floor(Math.random() * pcount);
	nametxt.css('background-image','url('+xinm[num]+')');
	phonetxt.html(phone[num]);
	t = setTimeout(startNum, 0);
}

// 停止跳动
function stop() {
	pcount = xinm.length-1;
	clearInterval(t);
	t = 0;
}

// 打印中奖人

function zd() {
	if (trigger) {

		trigger = false;
		var i = 0;

		if ( pcount >= Lotterynumber ) {
			stopTime = window.setInterval(function () {
				if (runing) {
					runing = false;
					$('#btntxt').removeClass('start').addClass('stop');
					startNum();
				} else {
					runing = true;
					$('#btntxt').removeClass('stop').addClass('start');
					stop();

					i++;
					Lotterynumber--;

					$('#start').text('自动抽取中('+ Lotterynumber+')');

					if ( i == ConstPeople ) {
						console.log("抽奖结束");
						window.clearInterval(stopTime);
						$('#start').text("开始");
						Lotterynumber = ConstPeople;
						trigger = true;
					};

					if (isAssignation && Lotterynumber == inUser) {
						// 指定中奖人
						nametxt.css('background-image','url(img/7.jpg)');
						phonetxt.html(assignationName);
						$('.luck-user-list').prepend("<li><div class='portrait' style='background-image:url("+assignationImg+")'></div><div class='luckuserName'>"+assignationName+"</div></li>");
						$('.modality-list ul').append("<li><div class='luck-img' style='background-image:url("+assignationImg+")'></div><p>"+assignationName+"</p></li>");
						inUser = 9999;
					}else{
						//打印中奖者名单
						$('.luck-user-list').prepend("<li><div class='portrait' style='background-image:url("+xinm[num]+")'></div><div class='luckuserName'>"+phone[num]+"</div></li>");
						$('.modality-list ul').append("<li><div class='luck-img' style='background-image:url("+xinm[num]+")'></div><p>"+phone[num]+"</p></li>");
						//将已中奖者从数组中"删除",防止二次中奖
						xinm.splice($.inArray(xinm[num], xinm), 1);
						phone.splice($.inArray(phone[num], phone), 1);
					};
				}
			},1000);
		};
	}
}

