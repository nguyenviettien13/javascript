$(function () {
    var anim_id;

    //saving dom object to variables
    var container = $('#container');
    var ball = $('#ball');
    var paddle = $('.paddle');
    var paddle_1 = $('#paddle_1');
    var paddle_2 = $('#paddle_2');
    var restart_btn = $('#restart');
    var restart_div = $('#restart_div');
    var winner = $('#winner');

    //saving some initial setup.
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var paddle_width = parseInt(paddle.width());
    var ball_height = parseInt(ball.height());
    var ball_width = parseInt(ball.width());

    //some other declaration
    var game_over = false;

    var ball_center;
    var paddle_center;
    var ball_go = 'down';
    var ball_right_left = 'right';

    var top = 6;
    var right_left_angle = 0;

    var move_right_p1 = false;
    var move_left_p1 = false;

    var move_right_p2 = false;
    var move_left_p2 = false;

    var who_win;


    /* start code game*/

    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 37 && move_left_p1 === false) {
            move_left_p1 = requestAnimationFrame(left_p1);
        }
        if (key === 39 && move_right_p1 === false) {
            move_right_p1 = requestAnimationFrame(right_p1);
        }
        if (key === 65 && move_left_p2 === false) {
            move_left_p2 = requestAnimationFrame(left_p2);
        }
        if (key === 83 && move_right_p2 === false) {
            move_right_p2 = requestAnimationFrame(right_p2);
        }
    });

    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 37) {
            cancelAnimationFrame(move_left_p1);
            move_left_p1 = false;
        }
        if (key === 39) {
            cancelAnimationFrame(move_right_p1);
            move_right_p1 = false;
        }
        if (key === 65) {
            cancelAnimationFrame(move_left_p2);
            move_left_p2 = false;
        }
        if (key === 83) {
            cancelAnimationFrame(move_right_p2);
            move_right_p2 = false;
        }

    })

    function left_p1() {
        if (parseInt(paddle_1.css('left')) > 0) {
            paddle_1.css('left', parseInt(paddle_1.css('left')) - 10);
            move_left_p1 = requestAnimationFrame(left_p1);
        }

    }

    function left_p2() {
        if (parseInt(paddle_2.css('left')) > 0) {
            paddle_2.css('left', parseInt(paddle_2.css('left')) - 10);
            move_left_p2 = requestAnimationFrame(left_p2);
        }

    }


    function right_p1() {
        if (parseInt(paddle_1.css('left')) < container_width - paddle_width) {
            paddle_1.css('left', parseInt(paddle_1.css('left')) + 10);
            move_right_p1 = requestAnimationFrame(right_p1);
        }
    }

    function right_p2() {
        if (parseInt(paddle_2.css('left')) < container_width - paddle_width) {
            paddle_2.css('left', parseInt(paddle_2.css('left')) + 10);
            move_right_p2 = requestAnimationFrame(right_p2);
        }

    }

    /* ball control start here */
    anim_id = requestAnimationFrame(repeat);

    function repeat() {
        if (game_over === false) {
            if (collision(ball, paddle_1)) {
                console.log('va cham vao paddle 1');
                ball_center = parseInt(ball.css('left')) + ball_width / 2;
                console.log(ball_center);
                paddle_center = parseInt(paddle_1.css('left')) + paddle_width / 2;
                ball_right_left = (ball_center > paddle_center ? 'right' : 'left');
                right_left_angle = parseInt(Math.abs(paddle_center - ball_center) % 6);
                ball_go = 'up';
            } else if (collision(ball, paddle_2)) {
                ball_center = parseInt(ball.css('left')) + ball_width / 2;
                paddle_center = parseInt(paddle_2.css('left')) + paddle_width / 2;
                ball_right_left = (ball_center > paddle_center ? 'right' : 'left');
                right_left_angle = parseInt(Math.abs(paddle_center - ball_center) % 6);
                ball_go = 'down';
            } else if (parseInt(ball.css('left')) <= 0) {
                ball_right_left = 'right';
            } else if (parseInt(ball.css('left')) >= container_width - ball_width) {
                ball_right_left = 'left';
            } else if (parseInt(ball.css('top')) <= 0) {
                console.log("player 1 thang");
                who_win = 'Player 1';
                stop_the_game();
            } else if (parseInt(ball.css('top')) >= container_height - ball_height) {
                who_win = 'Player 2';
                stop_the_game();
            }

            if (ball_go === 'down') {
                ball_down();
            } else {
                ball_up();
            }
            anim_id = requestAnimationFrame(repeat);
        }
    }
    restart_btn.click(function(){
        location.reload();
    })

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        winner.text(who_win + ' won in the game');
        restart_div.slideDown();
        
    }

    function ball_down() {
        ball.css('top', parseInt(ball.css('top')) + top);
        if (ball_right_left == 'right') {
            ball.css('left', parseInt(ball.css('left')) + right_left_angle);
        } else {
            ball.css('left', parseInt(ball.css('left')) - right_left_angle);
        }
    }

    function ball_up() {
        ball.css('top', parseInt(ball.css('top')) - top);
        if (ball_right_left == 'right') {
            ball.css('left', parseInt(ball.css('left')) + right_left_angle);
        } else {
            ball.css('left', parseInt(ball.css('left')) - right_left_angle);
        }
    }


    /* end code game */

    function collision($div1, $div2) {
        var l1 = $div1.offset().left;
        var t1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);

        var b1 = t1 + h1;
        var r1 = l1 + w1;

        var l2 = $div2.offset().left;
        var t2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);

        var b2 = t2 + h2;
        var r2 = l2 + w2;

        if (r1 < l2 || l1 > r2 || t1 > b2 || b1 < t2) return false
        else return true;
    }

});