var  $wrapper = $('.wrapper'),
     $slider = $('.slider'),
     len = $slider.length;

     (function addDom(len){
         if(len =>1){
            var str = '';
            for(var i=0;i<len;i++){
                if(i ==0){
                    str += ' <li class="active"></li>';
                }else{
                    str +=' <li></li>';
                }
            }

            var sPoint = ' <div class="slider-point"><ul>'+ str+'</ul></div>',
            sBtn = `<div class="slider-btn">
            <span class="prev-btn"></span>
            <span class="next-btn"></span>
        </div>`;

        $wrapper.append(sPoint).append(sBtn);
         }
       

     })(len);

    
     var $prev = $('.prev-btn'),
         $next = $('.next-btn'),
         $point = $('.slider-point li'),
         lastIndex,
         activeIndex = 0,
         flag=true;

         $.extend({
            getSliderIndex: function (direction) {
                lastIndex = activeIndex;
                if(direction == 'prev' || direction == 'next') {
                    if(direction == 'next') {
                        activeIndex = activeIndex == len - 1 ? 0 : activeIndex + 1;
                    }else {
                        activeIndex = activeIndex == 0 ? len - 1 : activeIndex - 1;
                    }
                }else {
                    activeIndex = direction;
                }
            }
        });

$slider.on('go',function(){
    $slider.eq(lastIndex).fadeOut(300).find('.slider-content').css({fontSize:'10px'}).end().find('.slider-img').css({width:'0%'});
})

$slider.on('come',function(){
    $slider.eq(activeIndex).delay(300).fadeIn(300).find('.slider-content').delay(300).animate({fontSize:'20px'}).end().find('.slider-img').delay(300).animate({width:'40%'},300,function(){flag=true})
}) 

function  domStyle(activeIndex) {
    $('.active').removeClass('active');
    $point.eq(activeIndex).addClass('active');

}


function clickFun(dir){
    $.getSliderIndex(dir);
    
    if(lastIndex != activeIndex){
        flag = false;
        $slider.eq(activeIndex).trigger('come').end().eq(lastIndex).trigger('go');
    }
   
        domStyle(activeIndex)
}

$prev.on('click',function(){
    clickFun('prev')
   
});
$next.on('click',function(){
    
   clickFun('next')
});

$point.on('click',function(){
    var index = $(this).index();
    clickFun(index)
})


    

