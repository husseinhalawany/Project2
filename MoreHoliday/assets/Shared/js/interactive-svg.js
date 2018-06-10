$(function(){

    $("#stage").load('/assets/Shared/img/interactive2.svg', function (response) {

		$(this).addClass("svgLoaded");
		
		if(!response){ // Error loading SVG
			$(this).html('Error loading SVG. Be sure you are running from a the http protocol (not locally) and have read <strong><a href="http://tympanus.net/codrops/?p=13831#the-javascript">this important part of the tutorial</a></strong>');
		}

	});
});


$(function () {

    $("#eader").load('/assets/Shared/img/slider/slide1/headertAb-01.svg', function (response) {

        $(this).addClass("svgLoaded");

        if (!response) { // Error loading SVG
            $(this).html('Error loading SVG. Be sure you are running from a the http protocol (not locally) and have read <strong><a href="http://tympanus.net/codrops/?p=13831#the-javascript">this important part of the tutorial</a></strong>');
        }

    });
});