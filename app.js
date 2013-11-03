;(function(global){
	// UglifyJS define hack.  Used for unit testing.
	if (typeof APP_NOW === 'undefined') {
	  APP_NOW = function () {
	    return +new Date();
	  };
	}

	if (typeof APPS === 'undefined') {
	  var global = (function(){return this;})();
	}

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//EXPECTS <whatev class="catSlides"></whatev> in the DOM
	var app = function($,pesterizer){
		$(function(){
			var pesterizer1 = new pesterizer({
				$el:$('<div class="pesterizer"><button>Free iPad</div></button>'),
				$frame:$('.pesterizerFrame')
			});
    		$('.pesterizerFrame').append(pesterizer1.$getEl());
		});
		return 'Hi i am return app';
	};


	if (typeof exports === 'object') {
		// nodejs
		module.exports = app($,pesterizer);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jQuery','pesterizer'],function(){ 
			return app.apply(null,arguments);
		});
	} else if (typeof global.app === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.app = app($,pesterizer);
	}



})(this);


