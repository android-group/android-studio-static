var current_stage_index = 1;
var last_animation_time = 0;
var quite_period = 1000;
var animation_time = 1000;


$(document).ready(
    function () {
        /*слайд шоу на телефоне*/
        $('#path-steps').on('click', 'div',
            function () {
                var current_element_index = $(this).index() / 2;
                $("#phone-slider").css("transform", "translateX(" + current_element_index * -252 + "px)");
                $("#path-steps").find("div").removeClass("selected-step");
                $(this).addClass("selected-step");


                var path_descriptions = $("#path-descriptions").find("div");
                path_descriptions.removeClass("selected-description");
                path_descriptions.eq(current_element_index).addClass("selected-description");
            }
        );
        /*перехватываем события скроллинга*/
        $('html').on('mousewheel', function (event) {
            go_to(event.deltaY);
            event.preventDefault();
        });
    });

/*листает страницы*/
$(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, animation_time);
                return false;
            }
        }
    });
});

/*определяем по смещению куда листать и делаем это*/
function go_to(y) {
    if (y === 0)return;
    var now = new Date().getTime();
    if (now - last_animation_time < (animation_time + quite_period)) return;
    last_animation_time = new Date().getTime();


    var isUpper = y >= 0;

    var target;
    if (isUpper && current_stage_index > 1) {
        current_stage_index--;

        target = $('#stage-' + current_stage_index);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, animation_time);
        }
    }
    if (!isUpper && current_stage_index < 4) {
        current_stage_index++;
        target = $('#stage-' + current_stage_index);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, animation_time);
        }
    }
}