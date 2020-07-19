// check if touch device
function isTouchDevice(){
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}


function filterEnable(){

// add class for body
(function(){
  if (isTouchDevice()) {
    $('body').addClass('touch-device');

    // navigation
    $('.nav-link-drop').on('click', function(e){
      e.preventDefault();
      $(this).next().toggleClass('visible');
    });
  }
}());

// accordion
(function(){
  var accordionItem = $('.accordion-item'),
      accordionHead = $('.accordion-head');

  accordionHead.on('click', function(){
    accordionItem.removeClass('active');
    $(this).parent().addClass('active');
  });
}());

// works
(function(){
  var works = $('.js-works');
  if (works.length) {
    var link = works.find('.js-works-link'),
        item = works.find('.js-works-item');

    link.on('click', function(e){
      e.preventDefault();

      var _this = $(this),
          type = _this.data('type');

      link.removeClass('active');
       _this.addClass('active');

      if (type == 'works-all') {
        item.addClass('visible');
      } else {
        item.removeClass('visible');
        works.find('.' + type).addClass('visible');
      }
    });
  }
}());


let cats = document.getElementsByClassName("works-counter");
let sum = 0;
for (let i=1; i<cats.length; i++){
	let cat = cats[i].parentElement.getAttribute('data-type');
	let catCnt = document.getElementsByClassName(cat).length;
  cats[i].innerText = catCnt;
  sum+=catCnt;
}
cats[0].innerText = sum;


}
