/*!
	Timeline - v0.0.1
	ilker Yılmaz
	https://github.com/ilkeryilmaz/timelinejs
 */

( function( $ ) {
	var Timeline = {
		nextY : 8,
		init : function(options, elem) {
			var self = this;
			self.$elem = $(elem);
			self.dom = $('body');
			self.wrapClass = '#'+self.$elem.attr('id').split(' ').join('.');
			self.dotsItem = self.wrapClass + " .timeline-dots li";
			self.options = $.extend({}, $.fn.Timeline.options, self.$elem.data(), options);
			if(self.options.bitycxn>self.options.EndYear){
				self.options.bitycxn = self.options.EndYear-3;
			}
			if(self.options.initYear>self.options.EndYear){
				self.options.initYear = self.options.EndYear;
			}else if(self.options.initYear<self.options.bitycxn){
				self.options.initYear = self.options.bitycxn;
			}
			self.create_timeline();
		},


		// Load Timeline
		// ----------------------------------------------------------------
		create_timeline : function(){
			var self = this;
			self.build_out();
			self.nextY = self.get_count() - (self.options.EndYear-self.options.initYear);
			//self.nextY = self.nextY<1||self.nextY>=self.get_count()?self.get_count()-1:self.nextY;
			//self.build_dots();
			self.watch_events();
		},


		// Get Total Items
		// ----------------------------------------------------------------
		get_count : function(){
			var self = this;
			var total = $(self.dotsItem).length;
			return total;
		},


		// Get Current Item Index
		// ----------------------------------------------------------------
		get_current : function(){
			var self = this;
			var nextItem;

			if (self.options.startItem === 'first') {
				nextItem = 1;
			} else if (self.options.startItem === 'last') {
				nextItem = self.get_count() - (self.options.EndYear-self.options.initYear+1);
				nextItem = nextItem<0||nextItem>=self.get_count()?self.get_count()-1:nextItem;
			} else {
				nextItem = self.options.startItem - 1;
			}
			return nextItem;
		},
		get_curr : function(){
			var self = this;			
			return self.nextY;
		},

		// Get Next Item Index
		// ----------------------------------------------------------------
		get_next : function(){
			var self = this;
			return self.get_current() + 1;
		},


		// Get Prev Item Index
		// ----------------------------------------------------------------
		get_prev : function(){
			var self = this;
			return self.get_current() - 1;
		},


		// Watch Timeline Events
		// ----------------------------------------------------------------
		watch_events : function(){
			var self = this;

			// Dots Click
			//$(document.body).on('click',self.dotsItem, function(e){
			$(document.body).on('click',self.dotsItem, function(e){	
				self.options.startItem = $(this).index() + 1;
				$(self.dotsItem).removeClass(self.options.activeClass);
				$(this).addClass(self.options.activeClass);
				self.change_timeline(self.get_current());
				self.options.click(this)
			});
		},


		// Make Timeline Calculations
		// ----------------------------------------------------------------
		timelime_calculations : function(){
			var self = this;
			
			var width = $(self.dotsItem).outerWidth(true);
			var itemWidth = $(self.wrapClass).width();
			var totalWidth = width * (self.get_count());
			$(self.wrapClass + ' .timeline-dots').width(totalWidth);
			/*if (self.options.mode === 'horizontal') {
				var leftTotal = -(width * (self.get_current()+1-5));
				leftTotal = leftTotal > 0 ?0:leftTotal;
				$(self.wrapClass + ' .timeline-dots').css({"transform": "translate3d(" + leftTotal + "px, 0px, 0px)"});
			}*/
		},


		// Make Timeline Dots Calculations
		// ----------------------------------------------------------------
		/*dots_calculations : function(){
			var self = this;
			var width = $(self.dotsItem).outerWidth(true);
			var itemWidth = $(self.wrapClass + ' .timeline-dots').width();
			var totalWidth = width * (self.get_count());
			$(self.wrapClass + ' .timeline-dots').width(totalWidth);
			if (self.options.mode === 'horizontal') {
				var leftTotal = -(width * self.get_curr()) - (-itemWidth / 2);
				$(self.wrapClass + ' .timeline-dots').css({"transform": "translate3d(" + leftTotal + "px, 0px, 0px)"});
			}

			self.dots_position();

		},*/
		moving : function(statu){
			var self = this;
			if(self.options.ShowNumber>5){
				var number =self.get_count();//总共数量
				if (statu) {//nextY 显示的最右年份的 位置
					self.nextY =self.nextY+4>=number?number:self.nextY+4;	
				}else{			
					self.nextY =self.nextY-4<5?5:self.nextY-4;
				}
				var width = $(self.dotsItem).outerWidth(true); //单个li宽度
				var itemWidth = $(self.wrapClass).width();//显示总宽度
				$(self.wrapClass).find('ul').css('margin-left','0')
				var totalWidth = width * (self.get_count());//年份总宽度
				$(self.wrapClass + ' .timeline-dots').width(totalWidth);
				if (self.options.mode === 'horizontal') {
					var leftTotal = -(width * (self.nextY-5));
					leftTotal = leftTotal > 0 ?0:leftTotal;
					$(self.wrapClass + ' .timeline-dots').css({"transform": "translate3d(" + leftTotal + "px, 0px, 0px)"});
				}
				self.dots_position();
			}
		},

		// Dots Position
		// ----------------------------------------------------------------
		dots_position : function(){
			var self = this;
			var dotsWrap = $(self.wrapClass + ' .timeline-dots-wrap')


			if (self.options.mode === 'horizontal') {
				/*if (self.options.dotsPosition === 'top') {
					dotsWrap.addClass('top')
				}else {
					dotsWrap.addClass('bottom')
				}*/
			}

		},



		// Build Timeline Dom
		// ----------------------------------------------------------------
		build_out : function(){
			var self = this;
			self.options.ShowNumber = self.options.EndYear - self.options.bitycxn+1;
			var wrap = $('<div/>')
			wrap.attr('class','timeline-dots-wrap');
			wrap.attr('style','background:url("resource/default/img/timeline-bg.png") bottom repeat-x;');
			self.$elem.append(wrap)
		//	self.$elem.children().wrap('<div class="timeline-list"/>').parent();
			var fistWidth = -(self.options.ShowNumber-5)*50
			fistWidth = fistWidth>0?0:fistWidth;
			var ul = $('<ul/>')
			/*ul.css('transform','translate('+fistWidth+'px, 0px)')*/
			ul.css('margin-left',fistWidth+'px')
			ul.attr('class','timeline-dots');
			wrap.append(ul);
			for(var i = self.options.ShowNumber;i>0;i-=1){
				var li = $('<li/>')
				ul.append(li);
				var button = $('<button/>')
				button.attr('role','button');
				button.attr('type','button');
				button.text(self.options.EndYear-i+1);
				li.append(button);
			}
			
			//计算移动位置
			self.timelime_calculations();
			self.update_ui();
		},



		// Build Dots List
		// ----------------------------------------------------------------
		build_dots : function(){
			var self = this;
			/*var dot,itemDate;

			dot = $('<ul />').addClass('timeline-dots');


			for (i = 0; i <= (self.get_count() - 1); i += 1) {
				 itemDate = $(self.wrapClass + ' .' + self.options.itemClass).eq(i).data('time');
				 dot.append($('<li />').append(self.options.customPaging.call(this, self, itemDate)));
			}

			self.$dots = dot.appendTo(self.$elem);
			$(self.wrapClass + ' .timeline-dots').wrapAll('<div class="timeline-dots-wrap"/>').parent();*/

			//self.dots_calculations();
			self.update_ui();
		},

		// Item Markup Class Update
		// ----------------------------------------------------------------
		update_ui : function(){
			var self = this;
			var timelineDot = $(self.dotsItem);
			timelineDot
				.removeClass(self.options.activeClass)
				.removeClass(self.options.prevClass)
				.removeClass(self.options.nextClass)
			timelineDot
				.eq(self.get_current())
				.addClass(self.options.activeClass);

			timelineDot
				.eq(self.get_prev())
				.addClass(self.options.prevClass);

			timelineDot
				.eq(self.get_next())
				.addClass(self.options.nextClass);
		},

		// Timeline Change
		// ----------------------------------------------------------------
		change_timeline : function(){
			var self = this;
			//self.timelime_calculations();
			//self.dots_calculations();//移动
			self.update_ui();//点击样式
		},
	}

	// jQuery method
	// ------------------------------------------------------------
	$.fn.Timeline = function(options) {
		/*return this.each(function () {
			
			$.data(this, "timeline", timeline);
		});*/
		var timeline = Object.create(Timeline);
		timeline.init(options, this);
		return timeline;
	};


	// Default options
	// ------------------------------------------------------------
	$.fn.Timeline.options = {
		// GENERAL
		mode: 'horizontal', // vertical
		itemClass: 'timeline-item',
		dotsClass: 'timeline-dots',
		activeClass: 'slide-active',
		prevClass: 'slide-prev',
		nextClass: 'slide-next',
		startItem: 'last', // first||number
		dotsPosition: 'bottom', // bottom | top
		EndYear:2018,
		bitycxn:2016,
		initYear:2018,
		ShowNumber: 11,
		click:null,
		// CONTROLS
		customPaging: function(slider, date) {
			return $('<button type="button" role="button" />').text(date);
    	},
	};

} ( jQuery, window, document ) );
