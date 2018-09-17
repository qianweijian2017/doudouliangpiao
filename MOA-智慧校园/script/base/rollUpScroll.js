
function initRollUpScroll(node,num){

		//信息滚动，获取ul的dom元素
		var news_move = document.querySelector(node);

		//获取li的高度
		var li_height = news_move.children[0].offsetHeight;
		var index = 0;
		/*添加过渡*/
		function addMove(){
				news_move.style.transition = "all 1s ease-out";
		        news_move.style.webkitTransition = "all 1s ease-out";
		}
		/*移除过渡*/
		function removeMove(){
		    news_move.style.transition = "";
		    news_move.style.webkitTransition = "";
		}
		/*设置位移*/
		function setMove(index){
		    news_move.style.transform = "translateY("+(index*li_height )+"px)";
		    news_move.style.webkitTransform = "translateY("+(index*li_height )+"px)";
		}        
		/*定时器*/
		var timer= setInterval(function(){
		addMove();
		//          (index++ > 4)?index=0:index;
			index++;
			if(index>(num-1)){
				index=0;
				removeMove();
				setMove(-index);

		    }
		    setMove(-index);

		},3000);

}