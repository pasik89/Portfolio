const hero = $('.hero');


$('body').keydown(function(event) {
    console.log(event.which);
    if (event.which == 40) {
        let cssVal = hero.css('top'),
            cssVal2 = parseInt(cssVal);
        console.log(cssVal2);
        cssVal2 += 3;
        hero.css('top', cssVal2);
    } else if (event.which == 38) {
        let cssVal = hero.css('top'),
            cssVal2 = parseInt(cssVal);
        console.log(cssVal2);
        cssVal2 -= 3;
        hero.css('top', cssVal2);
    } else if (event.which == 39) {
        let cssVal = hero.css('left'),
            cssVal2 = parseInt(cssVal);
        console.log(cssVal2);
        cssVal2 += 3;
        hero.css('left', cssVal2);
    }else if (event.which == 37) {
        let cssVal = hero.css('left'),
            cssVal2 = parseInt(cssVal);
        console.log(cssVal2);
        cssVal2 -= 3;
        hero.css('left', cssVal2);
    }

});
