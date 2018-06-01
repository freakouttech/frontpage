/* global document: false */
/* global console: false */
/* global XMLHttpRequest: false */

class Freakout {
    constructor() {
    }
    setMovementListeners() {
    	document.addEventListener('keydown', (event) => {
    		const keyName = event.key;
    		const keyCode = event.keyCode;
    	  	const logoElm = document.body.querySelector('.hero-logo')
    	  //left 37
    	  //up 38
    	  //right 39
    	  //bottom 40
    		var addTop = function(diff) {
    			console.log('diff: ', diff);
    		    $(logoElm).css("top", ($(logoElm).position().top + diff) + "px"); 
    		};

    		var addLeft = function(diff) {
    			console.log('diff: ', diff);
    		    $(logoElm).css("left", ($(logoElm).position().left + diff) + "px");
    		};
	    	switch(keyCode) {
	    	    case 37:
	    	        addLeft(-10); 
	    	        break; 
	    	    case 38: 
	    	        addTop(-10); 
	    	        break;
	    	    case 39: 
	    	        addLeft(10); 
	    	        break;
	    	    case 40: 
	    	        addTop(10); 
	    	        break;
	    	    default:
	    	    	console.log('keyCode: ', keyCode);
	    	    	break;
	    	}

	    }, false);
    }
    moveLogo(e) {
    	console.log('e: ', e);
    }
}

$(document).ready(function() {
	new Freakout().setMovementListeners();

	$('body').on('click', '.hero-logo', function() {
		$('.hero-logo').toggleClass("shake");

		setTimeout(function() {
			$('.hero-logo').removeClass("shake");
		}, 1500);
    });

    
});

