$(function(){
	var anim_id;

	//saving dom objects to variables
	var container 	= $('#container');
	var car 		= $('#car');
	var car_1 		= $('#car_1');
	var car_2 		= $('#car_2');
	var car_3 		= $('#car_3');
	var line_1		= $('#line_1');
	var line_2 		= $('#line_2');
	var line_3		= $('#line_3');
	var restart_div	= $('#restart_div');
	var restart_btn	= $('#restart');
	var score  		= $('#score');




	//cac thong so cua div container
	var container_left = parseInt(container.css('left'));
	var container_width = parseInt(container.width());
	var container_height = parseInt(container.height());
	var container_width = parseInt(container.width());

	var car_width= parseInt(car.width());
	var car_height= parseInt(car.height());


	//some other declaration
	var game_over = false;
	var score_counter = 1;

	var speed = 2;
	var line_speed = 5;


	var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

	/*----------game code start here------------*/
	$(document).on('keydown',function(e){
		if(game_over === false){
			var key = e.keyCode;
			if (key == 37 && move_left === false) {
				move_left = requestAnimationFrame(left);
			} else if (key == 39 && move_right === false) {
				move_right = requestAnimationFrame(right);
			} else if (key == 38 && move_up === false) {
				move_up = requestAnimationFrame(up);
			}else if (key == 40 && move_down === false) {
				move_down = requestAnimationFrame(down);
			}    
		}
	});
	$(document).on('keyup',function(e){
		if (game_over === false){
			var key = e.keyCode;
			if (key === 37){
				cancelAnimationFrame(move_left);
				move_left = false;
			} else if (key===39) {
				cancelAnimationFrame(move_right);
				move_right = false;
			}else if (key===38) {
				cancelAnimationFrame(move_up);
				move_up = false;
			}else if (key===40) {
				cancelAnimationFrame(move_down);
				move_down = false;
			}
		} 
	});

	function left(){
		if (game_over === false && parseInt(car.css('left'))>0){
			car.css('left', parseInt(car.css('left'))-5);
			/*Tai sao khi bo dong nay di thi car chi di chuyen tung buoc nho mot*/
			move_left = requestAnimationFrame(left);
		}
	}
	function right(){
		if (game_over === false && parseInt(car.css('left'))< container_width- car_width){
			car.css('left', parseInt(car.css('left'))+5);
			move_right = requestAnimationFrame(right);
		}
	}
	function up(){
		if (game_over === false && parseInt(car.css('top'))> 0){
			car.css('top', parseInt(car.css('top'))-5);
			move_up = requestAnimationFrame(up);
		}
	}

	function down(){
		if (game_over === false && parseInt(car.css('top')) < container_height - car_height){
			car.css('top', parseInt(car.css('top'))+5);
			move_down = requestAnimationFrame(down);
		}
	}

	anim_id = requestAnimationFrame(repeat);

	function repeat(){
		if(game_over === false){
			if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)){
				stop_the_game();
			}

			score_counter ++;
			if(score_counter %30 ==0){
				score.text(parseInt(score.text())+1);
			}

			if(score_counter %500 ==0){
				speed +=2;
				line_speed += 2;
			}

			car_down(car_1);
			car_down(car_2);
			car_down(car_3);

			line_down(line_1);
			line_down(line_2);
			line_down(line_3);

			anim_id = requestAnimationFrame(repeat);
		}
	}

	function car_down(car){
		var current_top = parseInt(car.css('top'));
		if (current_top > container_height){
			current_top = -10;
			var car_left = parseInt(Math.random()*(container_width- car_width));
			car.css('left',car_left);
		}
		car.css('top', current_top +speed);
	}

	function line_down(line){
		var line_current_top = parseInt(line.css('top'));
		if( line_current_top > container_height){
			line_current_top = - 300;
		}
		line.css('top', line_current_top+line_speed);
	}
	

	function stop_the_game(){
		game_over = true;
		//cancelAnimationFrame(move_right);
		//cancelAnimationFrame(move_left);
		//cancelAnimationFrame(move_up);
		//cancelAnimationFrame(move_down);
		restart_div.slideDown();
		restart_btn.focus();

	}
	restart_btn.click(function(){
		location.reload();
	})

	/*----------game code end here -------------*/
	function collision($div1, $div2) {
        var l1 = $div1.offset().left;       //lề bên trái của oto1
        var t1 = $div1.offset().top;        //le ben trên của oto1
        var h1 = $div1.outerHeight(true);   //chiều cao của oto1 -tinh cả margin
        var w1 = $div1.outerWidth(true);    //chiều rộng của oto1- tinh cả margin
        var b1 = t1 + h1;                   //lề bên dưới của oto1
        var r1 = l1 + w1;                   //lề bên phải của oto1
        var l2 = $div2.offset().left;       //lề bên trái của oto2
        var t2 = $div2.offset().top;        //le ben trên của oto2 
        var h2 = $div2.outerHeight(true);   //chiều cao của oto2 -tinh cả margin
        var w2 = $div2.outerWidth(true);    //chiều rộng của oto2- tinh cả margin
        var b2 = t2 + h2;                   //le be duoi cua oto2
        var r2 = l2 + w2;                   //le ben phai cua oto2


        /*xet dieu kien 2 xe dung do nhau
        
        */
        if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) return false;
        return true;
    }
	
});
$(function(){// chi chay qua day mot lan thoi
    var biendem = 1;

    $(document).on("keydown",function(e){
        biendem++;
        console.log(biendem);
    });
    console.log("chay vao day");
    
});