require.config({
	//baseUrl: './',
	//THESE ARE LIBRARIES THAT AREN'T AMD COMPLIANT.
    paths: {
    	//'PATH-NICKNAME : LIBRARY-URL'
        'jQuery': 'jquery.min'
    },
    //THIS IS WHERE YOU TELL REQUIRE WHAT VARIABLE EACH LIBRARY TRIES TO ADD THE GLOBAL SO IT KNOWS WHAT TO LISTEN FOR
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});
require(['app'], function(app){
	console.log('require callback')
});