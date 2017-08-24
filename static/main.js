//
//  Natter
//  main.js
//
//  Created on 23/08/17
//

$(document).ready(function () {

	// Hide the category view initially until chosen to view
	$('#category-view').hide();
	$('#video-view').hide();
	$('#global-view').hide();

	// Handle the carousel behaviour
	$('.slick-carousel').slick({
		autoplay: true,
		infinite: true,
  		autoplaySpeed: 5000
	});

	// This will handle the showing of the category view
	$('.show-category').click(function () {
		$('#global-view').fadeOut(700);
		$('#video-view').fadeOut(700);
		$('#main-view').fadeOut(700);
		$('#category-view').fadeIn(1400);
	});

	// This will handle the showing of the main view
	$('.show-main').click(function () {
		$('#global-view').fadeOut(700);
		$('#video-view').fadeOut(700);
		$('#category-view').fadeOut(700);
		$('#main-view').fadeIn(1400);
	});

	// This will handle showing video view
	$('.show-video').click(function () {
		$('#global-view').fadeOut(700);
		$('#category-view').fadeOut(700);
		$('#main-view').fadeOut(700);
		$('#video-view').fadeIn(1400);
	});

	// This will handle showing video view
	$('.show-global').click(function () {
		$('#video-view').fadeOut(700);
		$('#category-view').fadeOut(700);
		$('#main-view').fadeOut(700);
		$('#global-view').fadeIn(1400);
	});

});

