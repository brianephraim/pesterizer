;(function(global){
	// UglifyJS define hack.  Used for unit testing..
	if (typeof PESTERIZER_NOW === 'undefined') {
	  PESTERIZER_NOW = function () {
	    return +new Date();
	  };
	}

	if (typeof PESTERIZER === 'undefined') {
	  var global = (function(){return this;})();
	}


	var makePesterizerObject = function($){

		var pesterizer = function(options){
            var self = this;
            this.$el = options.$el;
            this.$el.css('position','absolute');
            this.$frame = options.$frame;
            this.$frame.css('position','relative');
            this.pesterizerLeft = 0;
            this.pesterizerTop = 0;
            this.pesterizerMargin = 20;
            this.pesterizerHeight = 0;
            this.pesterizerWidth = 0;
            this.pesterizerOrientBelow = true;
            this.pesterizerOrientRight = true;
            this.lastMouseX = 0;
            this.lastMouseY = 0;
            
            
        };
        pesterizer.prototype.setPesterizerPosition = function(x,y){
            this.$el.css({
                'left':x+'px',
                'top':y+'px'
            })
            this.pesterizerLeft = x;
            this.pesterizerTop = y;
        };
        pesterizer.prototype.updateSize = function(){
            this.pesterizerHeight = this.$el.outerHeight();
            this.pesterizerWidth = this.$el.outerWidth();
        };
        pesterizer.prototype.$getEl = function(){
            var self = this;
            setTimeout(function(){
                self.updateSize();
            },0);
            self.$frame.on('mousemove',function(e){
            	var parentOffset = self.$frame.offset();
                var positionPropertyName = 'page';
                var mouseXName = positionPropertyName + 'X';
                var mouseYName = positionPropertyName + 'Y';
                var mouseX = e[mouseXName] - parentOffset.left;
                var mouseY = e[mouseYName] - parentOffset.top;
                var directionUp = mouseY - self.lastMouseY > 0 ? false : true;
                var directionLeft = mouseX - self.lastMouseX > 0 ? false : true;
                
                var mouseWithinPesterizerY = mouseY > self.pesterizerTop - self.pesterizerMargin && mouseY <= self.pesterizerTop+self.pesterizerHeight+self.pesterizerMargin;
                var mouseWithinPesterizerX = mouseX > self.pesterizerLeft - self.pesterizerMargin && mouseX <= self.pesterizerLeft+self.pesterizerWidth+self.pesterizerMargin;
                
               
                var toX = self.pesterizerLeft;
                var toY = self.pesterizerTop;
                var pesterizerNeedsUpdate = false;
                //==========
                //==========
                // Y
                if(self.pesterizerOrientBelow){
                    if(directionUp && !mouseWithinPesterizerY){
                        toY = mouseY + self.pesterizerMargin;
                        pesterizerNeedsUpdate = true;
                    }
                    if(!directionUp && !mouseWithinPesterizerY){
                        self.pesterizerOrientBelow = false
                    }
                } else {
                    if(!directionUp && !mouseWithinPesterizerY){
                        toY = mouseY - self.pesterizerHeight - self.pesterizerMargin;
                        pesterizerNeedsUpdate = true;
                    }
                    if(directionUp && !mouseWithinPesterizerY){
                        self.pesterizerOrientBelow = true;
                    }
                }
                //==========
                //==========
                //    X
                if(self.pesterizerOrientRight){
                    if(directionLeft && !mouseWithinPesterizerX){
                        toX = mouseX + self.pesterizerMargin;
                        pesterizerNeedsUpdate = true;
                    }
                    if(!directionLeft && !mouseWithinPesterizerX){
                        self.pesterizerOrientRight = false
                    }
                } else {
                    if(!directionLeft && !mouseWithinPesterizerX){
                        toX = mouseX - self.pesterizerWidth - self.pesterizerMargin;
                        pesterizerNeedsUpdate = true;
                        
                    }
                    if(directionLeft && !mouseWithinPesterizerX){
                        self.pesterizerOrientRight = true;
                    }
                }
                if(pesterizerNeedsUpdate){
                    self.setPesterizerPosition(toX,toY);
                }
                
                self.lastMouseX = mouseX;
                self.lastMouseY = mouseY;
            })
            return this.$el;
        };

		return pesterizer;
	}
	//return objInstance;

	if (typeof exports === 'object') {
		// nodejs
		module.exports = makePesterizerObject($,tools);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jQuery'],function(){
			return makePesterizerObject.apply(null,arguments);
		});
	} else if (typeof global.pesterizer === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.pesterizer = makePesterizerObject($,tools);
	}



})(this);