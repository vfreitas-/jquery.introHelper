/*
 * Author: Vitor Freitas vfreitas-
 * Author URL: http://codepen.io/vfreitas-, https://github.com/vfreitas-
 * Date: 11/08/2015
 * Version: 1.0;
 */
/**
* Usage:

introHelper have 3 data attributes that let's you define 
your awesome introduction.

data-helper-step -> step number, [1,2,3,4,5,...100...]
data-helper-text -> text to show on the step message
data-helper-position -> can be [top, left, right, bottom], define the
position of the message box, relative to his step


To begin your introduction, just select your top-level element, the
element/container that will hold all the steps.
Ex. body, main-wrapper, container-fluid, row, col-md-n

And call the plugin method

$('body').helperIntro('action');

action can be ->
'start' -> start the introduction
'finalize' -> stops the introduction
*/

/* Work in Progress:

- Add new action methods
- Make an introduction progress bar
- Improve the element 'feature' container
- Add more keyboard control and button focus
- Etc..

 */

;+function($, window) {

	'use strict';

	$.fn.helperIntro = function(action) {

		var areaHtml = '<div class="helper-area-focus"> \
				<div class="helper-box"> \
					<div class="helper-box__msg"></div> \
					<div class="helper-box__buttons">\
						<button class="helper-box__skip">Skip</button> \
						<button class="helper-box__prev">Prev</button> \
						<button class="helper-box__next">Next</button> \
					</div>	\
				</div> \
			</div>';


		var _this		= $(this),
			_body		= $('body'),
			_overlay 	= $('<div class="helper-overlay"></div>'),
			_area 		= $('<div class="helper-area"></div>'),
			_area_focus = $(areaHtml),
			_box		= _area_focus.find('.helper-box'),
			_box_msg	= _box.find('.helper-box__msg'),
			_box_prev	= _box.find('.helper-box__prev'),
			_box_next	= _box.find('.helper-box__next'),
			_box_skip 	= _box.find('.helper-box__skip');

		var $steps 			= _this.find('[data-helper-step]'),
			$currentStep	= _this.find('[data-helper-step=1]');

		var isHelperActive = false,
			isStepChanging = false;

		var changeStepInterval = 300;

		if(action === 'start')
			start();
		else if(action === 'finalize')
			finalize();

		_box_prev.on('click', function(event) {
			setCurrentStep(getStepNumber($currentStep) - 1);
		});

		_box_next.on('click', function(event) {
			setCurrentStep(getStepNumber($currentStep) + 1);
		});

		_box_skip.on('click', function(event) {
			finalize();
		});

		$(document).keydown(function(event) {
			if(isHelperActive) {

			    switch(event.which) {
			        case 37: 
			        	if( !(_box_prev.hasClass('disabled')) ) {
				        	event.preventDefault();
				        	_box_prev.trigger('click');
			        	}
			        break;

			        case 39: 
			        	if( !(_box_next.hasClass('disabled')) ) {
				        	event.preventDefault();
				        	_box_next.trigger('click');
			        	}
			        break;
			    }  
			}
		});

		$(document).on('helper-step', function(event) {
			if(getStepNumber($currentStep) === 1) 
				_box_prev.addClass('disabled').attr('disabled', true);
			else
				_box_prev.removeClass('disabled').attr('disabled', false);

			if(getStepNumber($currentStep) === stepsSize()) 
				_box_next.addClass('disabled').attr('disabled', true);
			else
				_box_next.removeClass('disabled').attr('disabled', false);
		});

		$(window).on('resize', function() {
			var position = getStepPosition($currentStep);

			_area_focus.css(position);
			_area.css(position);
		});


		function start() {
			$currentStep.addClass('helper-relative');

			_overlay.appendTo(_body);
			_area.appendTo(_body);
			_area_focus.appendTo(_body);

			setCurrentStep(1);
	
			_overlay.addClass('active');
			_area_focus.addClass('active');
			_area.addClass('active');

			isHelperActive = true;
		}

		function finalize() {
			$steps.removeClass('helper-relative');
			_overlay.removeClass('active');
			_area_focus.removeClass('active');
			_area.removeClass('active');

			isHelperActive = false;
		}

		function setCurrentStep(stepNumber) {

			var newStep = getStep(stepNumber)[0];

			var position = getStepPosition(newStep),
				place    = getStepBoxPlace(newStep);
			

			$steps.removeClass('helper-relative');
			$(newStep).addClass('helper-relative');

			_area_focus.css(position);
			_area.animate(position, changeStepInterval);

			if(place) { 
				var placeClass = 'helper-box ' + place;
				_box.attr('class', placeClass);
			}
			else {
				_box.attr('class', 'helper-box bottom');
			}

			_box_msg.text(getStepText(newStep));

			$currentStep = newStep;

			$(document).trigger('helper-step');
		}

		function getStepPosition(step) {
			return {
				'top'	: $(step).offset().top - 10,
				'left'	: $(step).offset().left - 10,
				'width'	: $(step).outerWidth() + 20,
				'height': $(step).outerHeight() + 20
			}
		}

		function getStepText(step) {
			return $(step).data('helper-text');
		}

		function getStepBoxPlace(step) {
			return $(step).data('helper-position');
		}

		function getStepNumber(step) {
			return $(step).data('helper-step');
		}

		function getStep(n) {
			return $.grep($steps, function(el, e) {
				return $(el).data('helper-step') == n;
			});
		}

		function stepsSize() {
			var numbers = $steps.map(function() {
				return $(this).data('helper-step');
			});
			return Math.max.apply( null, numbers );
		}


	}

}(jQuery, window);	