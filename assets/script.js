// Draggable box
  $(document).ready(function() {
    var a = 3;
    $( ".draggable" ).draggable({
   start: function(event, ui) { $(this).css("z-index", a++); }
});
    $('.container').mousedown(function() {
        $(this).addClass('top').removeClass('bottom');
        $(this).siblings().removeClass('top').addClass('bottom');
        $(this).css("z-index", a++);
    });
});

(function() {
// Main content container
var $container = $('.container');
// Masonry + ImagesLoaded
$container.imagesLoaded(function(){
  $container.masonry({
    itemSelector: 'li.post',
    });
  });
$('#loading').delay(500).fadeOut(300);

// Infinite Scroll
$container.infinitescroll({
  navSelector  : ".pagination.infinite",
  nextSelector : "a#next",
  itemSelector : ".post.main",
  // finished message
  loading: {
      speed: 0,
    msgText: 'LOADING',
    finishedMsg: '',
    }
  },
// Trigger Masonry as a callback
function(newElements) {
  // hide new items while they are loading
  var $newElems = $( newElements ).css({ opacity: '0' });
  $newElems.find('.postInnerTwo').css({ opacity: '0'});
  $newElems.find('.loaderTwo').css({ 'display': 'flex' });
  // ensure that images load before adding to masonry layout
  $newElems.imagesLoaded(function(){
      $newElems.each(function (i) {
          var $item = $(this);
                  setTimeout(function() {
                      $item.animate({ opacity: 1 }, 0);
                      $item.find('.postInnerTwo').delay(500).animate({ opacity: 1 });
                      $item.find('.loaderTwo').delay(500).fadeOut();
                  }, 500*i);
              });

    $container.masonry( 'appended', $newElems, true );
    });
  });
})();
