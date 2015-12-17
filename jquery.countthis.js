(function($) {
	/**
	 * 	countThis
	 *  - a jQuery plugin to count and display inputs - 
	 *     github: zimtimgetriebe
	 *     twitter: @krakrakrakrakra
	 *
	 *	Usage: $(element).countThis({options});
	 *
	 * @TODO aria-attr / element via jquery
	 * 		100-66 aria slider high
	 * 		65-33 medium, 32-0 low ??
	 * @TODO jumping due to position relative
	 * @TODO research: no extra element. appendTo() 
	 * @TODO delete console.logs after debugging
	 * @TODO research: security holes
	 * @TODO clean up
	 */ 
    $.fn.countThis = function(options) {
    	
    	// Oh nice, there are even adjustable settings. 
        var settings = $.extend({
 			// trigger on this kind of event
 			eventhandler: 'input focus blur',
        	// style.
        	// possible options are 'countWithText', 'belowElementIndicator', 'topIndicator' or 'default'
        	// @var countWithText shows text, e.g. "there are n characters left"
            // @var belowElementIndicator draws an individual line below the input field to indicate progress
            // @var topIndicator draws a line at top to indicate progress
            // @var default (and fallback) is just the amount of remaining characters
            style: 'default',
            // color of text. pretty self-explaining
            textColor: '#ddd',
            // color of the bar-indicators
            barColor: '#ff0000'
        }, options);
 		
        // the main stuff is done here.
		$(this).bind(settings.eventhandler, function() {

			// vars for easier handling
			max = $(this).attr('maxlength');
			current = $(this).val().length;
			remaining = max - current;
			
			console.log('max: ' + max + ', current: ' + current + ', remaining: ' + remaining);

			// reset the element to prevent glitches between style-switches
			$('.count').removeAttr('style').html('');


			// let's have a look for an (optional) style setting
			switch (settings.style) {
				case 'countWithText':
					$(this).after($('.count'));
					$('.count').css({
						'display': 'inline'
					}).html('Your remaining characters: ' + remaining);

				break;
				case 'belowElementIndicator':
					$(this).after($('.count'));
					var elementWidth = $(this).outerWidth();					
					var belowBarCurrent = 100 / (max / current);
					console.log("Elementwidth: " + elementWidth + ", belowBarCurrent: " + belowBarCurrent);

					// assure pixelperfectness when element's width is odd
					if ((elementWidth % 2) !== 0) {
						console.log('not even');
						$('.count').width() - 1;
					}

					// some adjustings for the alignment
					var offset = $(this).offset();
					$('.count').offset({ left: offset.left });

					// align that stuff
					$(this).css('margin-bottom', '0');
					$('.count').css({
						'display': 'block',
						'position': 'relative', 
						'margin-top': '0', 
						'box-sizing': 'border-box',
						'height': '1px', 
						'box-shadow': 'inset 1px 0 0 1px gray',
						'max-width': elementWidth + 'px',
						'width': (100 / (max / current)) * (elementWidth / 100) + 'px'
					});
					console.log($('.count').width());
				break;
				case 'topIndicator':
					var topBarCurrent = 100 / (max / current);
					$('.count').css({
						'display': 'block',
						'position': 'fixed',
						'top': '0',
						'left': '0',
						'right': '0', 
						'background': 'hotpink', 
						'height': '2px', 
						'box-shadow': '0 0 4px rgba(200,0,40,.8)', 
						'transition': 'width .2s ease-out',
						'width': topBarCurrent + '%'
					});
				break;
				default:
					$(this).after($('.count'));
					$('.count').css('display', 'inline').html(remaining);
			}
		});
		// Chu-Chu-Chain
        return this;
    };
}(jQuery));
