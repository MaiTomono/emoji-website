document.cookie = "SameSite=Strict"


$(function(){

	var
	  winW = $(window).width(),
		winH = $(window).height(),
		nav = $('#mainnav ul a'),
		curPos = $(this).scrollTop();

	if (winW < 880){
		var headerH =0;
	}
	else{
		var headerH =63;
	}

	$(nav).on('click', function(){
		nav.removeClass('active');
  	var $el = $(this),
		id = $el.attr('href');
 		$('html, body').animate({
   		scrollTop: $(id).offset().top - headerH
 		}, 500);
		$(this).addClass('active');
		if (winW < 880){
			$('#menuWrap').next().slideToggle();
			$('#menuBtn').removeClass('close');
		}
 		return false;
	});

	var timer = false;
	$(window).bind('load resize',function(){
		if (timer !== false){clearTimeout(timer);}
		timer = setTimeout(function(){
			var
				w = $(window).innerWidth(),
				bg = $('.bg'),
				bgH = bg.height();

			if(w > 800){
				$(function(){
			  	$(".vMid").css('height', bgH);
				});
			}
			else{
				$(function(){
			  	$(".vMid").css({'height':'auto','padding':'50px 20px'});
				});
			}
		});
	});

	$('.panel').hide();
	$('#menuWrap').toggle(function(){
		$(this).next().slideToggle();
		$('#menuBtn').toggleClass('close');
	},
	function(){
		$(this).next().slideToggle();
		$('#menuBtn').removeClass('close');
	});

	$(window).on('scroll', function(){
		var curPos = $(this).scrollTop();
		if(curPos > 80){
			$('#mainnav').addClass('changeNav');
		}
		else{
			$('#mainnav').removeClass('changeNav');
		}
	});

	$('#scroll-up').on('click', (e) => {
		$('html, body').animate({ scrollTop: 0 }, 500);
	})


// A point click event that uses the Renderer to draw a label next to the point
// On subsequent clicks, move the existing label instead of creating a new one.
	Highcharts.addEvent(Highcharts.Point, 'click', function () {
		if (this.series.options.className.indexOf('popup-on-click') !== -1) {
			const chart = this.series.chart;
			const date = Highcharts.dateFormat('%A, %b %e, %Y', this.x);
			const text = `<b>${date}</b><br/>${this.y} ${this.series.name}`;

			const anchorX = this.plotX + this.series.xAxis.pos;
			const anchorY = this.plotY + this.series.yAxis.pos;
			const align = anchorX < chart.chartWidth - 200 ? 'left' : 'right';
			const x = align === 'left' ? anchorX + 10 : anchorX - 10;
			const y = anchorY - 30;
			if (!chart.sticky) {
				chart.sticky = chart.renderer
					.label(text, x, y, 'callout',  anchorX, anchorY)
					.attr({
						align,
						fill: 'rgba(0, 0, 0, 0.75)',
						padding: 10,
						zIndex: 7 // Above series, below tooltip
					})
					.css({
						color: 'white'
					})
					.on('click', function () {
						chart.sticky = chart.sticky.destroy();
					})
					.add();
			} else {
				chart.sticky
					.attr({ align, text })
					.animate({ anchorX, anchorY, x, y }, { duration: 250 });
			}
		}
	});


	Highcharts.chart('chart-container', {
		chart: {
			backgroundColor: '#FFFFF0',
			scrollablePlotArea: {
				minWidth: 700
			}
		},

		data: {
			csvURL: '../Emoji2/data/Numberofemojibyyear.csv',
			beforeParse: function (csv) {
				return csv.replace(/\n\n/g, '\n');
			}
		},

		title: {
			text: 'The number of emojis by year',
			align: 'left'
		},

		subtitle: {
			text: '(unicode and statista)',
			align: 'left'
		},

		xAxis: {
			// tickInterval: 7 * 24 * 3600 * 1000, // one week
			tickWidth: 1,
			gridLineWidth: 1,
			// labels: {
			// 	align: 'left',
			// 	x: 3,
			// 	y: -3
			// }
		},

		yAxis: { // left y axis
			title: {
				text: null
			},
			labels: {
				align: 'left',
				x: 3,
				y: 16,
				format: '{value:.,0f}'
			},
			showFirstLabel: false
		},

		legend: {
			align: 'left',
			verticalAlign: 'top',
			borderWidth: 0
		},

		tooltip: {
			shared: true,
			crosshairs: true
		},

		plotOptions: {
			series: {
				cursor: 'pointer',
				className: 'popup-on-click',
				marker: {
					lineWidth: 1
				}
			}
		},

		series: [{
			lineWidth: 4,
			color: '#EB5B46',
			marker: {
				radius: 4
			}
		}, {
			name: 'New users'
		}]
	});
});


