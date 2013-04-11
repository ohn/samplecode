/* =============================================================================
	Pub/Sub
	http://addyosmani.com/blog/jquery-1-7s-callbacks-feature-demystified/
   ========================================================================== */
ClientObject.Topics = {};
$.Topic = function(id)
{
	var callbacks, topic = id && ClientObject.Topics[id];
	
	if (!topic)
	{
		callbacks = $.Callbacks();
		
		topic = {
			publish: callbacks.fire,
			subscribe: callbacks.add,
			unsubscribe: callbacks.remove
		};
		
		if (id)
		{
			ClientObject.Topics[id] = topic;
		}
	}
	
	return topic;
};


/* =============================================================================
	Display
   ========================================================================== */
ClientObject.Display = function(config)
{
	this.config = config || {};
	
	this.init();
};
ClientObject.Display.prototype = {
	// constructor
	init: function()
	{
		// config
		this.selectors = this.config.selectors;
		
		// cache $ values
		this.$container = $(this.selectors.container);
		this.$captionContainer = $(this.selectors.captionContainer);
		this.$footer = $(this.selectors.footer);
		
		// cache DOM values
		this.$window = $(window);
		
		// cache proxy'd method calls
		this.f = { positionElements: $.proxy(this.positionElements, this) };
		
		// setup
		this.attachEvents();
		this.positionElements();
	},
	
	attachEvents: function()
	{
		this.$window.scroll(this.bPositionElements).resize(this.f.positionElements);
	},
	
	positionElements: function()
	{
		var windowWidth = this.$window.width();
		
		this.$captionContainer.css({ 'margin-left' : windowWidth/9 + 'px' });
		
		if (windowWidth < 920)
		{
			this.$container.css({ 'width': windowWidth + 'px' });
		}	
		
		this.$captionContainer.show();
		this.$footer.show();
	}
};


/* =============================================================================
	PageScroll
   ========================================================================== */
ClientObject.PageScroll = function(config)
{
	this.config = config || {};
	
	this.init();
};
ClientObject.PageScroll.prototype = {
	// constructor
	init: function()
	{
		// config
		this.selectors = this.config.selectors;
		
		// cache $ values
		this.$container = $(this.selectors.container);
		this.$next = $(this.selectors.next);
		this.$prev = $(this.selectors.prev);
		
		// cache proxy'd method calls
		this.f = { onCycleComplete: $.proxy(this.onCycleComplete, this), onNextClick: $.proxy(this.onNextClick, this), onPrevClick: $.proxy(this.onPrevClick, this), onCaptionsEnd: $.proxy(this.onCaptionsEnd, this) };
		
		// setup
		this.attachEvents();
		this.build();
	},
	
	attachEvents: function()
	{
		// DOM events
		this.$next.click(this.f.onNextClick);
		this.$prev.click(this.f.onPrevClick);
		
		// PubSub
		$.Topic('captions:end').subscribe(this.f.onCaptionsEnd);
	},
	
	build: function()
	{
		this.$container.cycle({
			fx: 'scrollHorz',
			prev: this.selectors.prev,
			next: this.selectors.next,
			timeout: 0,
			speed: 3000,
			after: this.f.onCycleComplete
		});
	},
	
	onNextClick: function()
	{
		$.Topic('page:next').publish();
	},
	
	onPrevClick: function()
	{
		$.Topic('page:prev').publish();
	},
	
	onCaptionsEnd: function()
	{
		this.$next.trigger('click');
	},
	
	onCycleComplete: function(curr, next, opts)
	{
		var index = opts.currSlide;
		// adjust prev/next display for cycle carousel
		this.$prev[index == 0 ? 'hide' : 'show']();
		this.$next[index == opts.slideCount - 1 ? 'hide' : 'show']();
	}
};


/* =============================================================================
   Captions
   ========================================================================== */
ClientObject.Captions = function(config)
{
	this.config = config || {};
	
	this.init();
};
ClientObject.Captions.prototype = {
	// constructor
	init: function()
	{
		// config
		this.selectors = this.config.selectors;
		
		// cache $ values
		this.$container = $(this.selectors.container);
		this.$captions = this.$container.find(this.selectors.captions);
		
		// cache proxy'd method calls
		this.f = { show: $.proxy(this.show, this), hide: $.proxy(this.hide, this), onCycleEnd: $.proxy(this.onCycleEnd, this) };
		
		// setup
		this.attachEvents();
		this.build();
	},
	
	attachEvents: function()
	{
		// Pub/Sub
		$.Topic('page:prev').subscribe(this.f.show);
		$.Topic('page:next').subscribe(this.f.hide);
	},
	
	build: function()
	{
		this.$captions.cycle({ 
			fx: 'fade',
			//pause: 1,
			timeoutFn: this.calculateTimeout,
			nowrap: 1,
			end: this.f.onCycleEnd
		});
	},
	
	onCycleEnd: function()
	{
		$.Topic('captions:end').publish();
	},
	
	calculateTimeout: function(currElement, nextElement, opts, isForward)
	{
		var index = opts.currSlide;
		if (index == 0) return 8000;
		if (index == 1) return 12000;
		if (index == 2) return 15000;
		return 4000;
	},
	
	show: function()
	{
		this.build();
	},
	
	hide: function()
	{
		this.$captions.cycle('destroy');
	}
};


/* =============================================================================
   DOM ready
   ========================================================================== */
$(function() {
	new ClientObject.Display({
		selectors: {
			container: '#container',
			captionContainer: '#main-background .captions',
			footer: '.copy-right'
		}
	});
	
	new ClientObject.PageScroll({
		selectors: {
			container: '#pages',
			prev: '#prev',
			next: '#next'
		}
	});
	
	new ClientObject.Captions({
		selectors: {
			container: '#main-background',
			captions: '.captions'
		}
	});
});