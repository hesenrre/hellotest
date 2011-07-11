/* 
 * Loading Script Global Variables
 */ 

var isFullscreen = true;
var win = Ti.UI.currentWindow;
win.orientationModes = [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT ];

/*
 * Common funcitions
*/

/*
 * This function loads the full screen, JUST WORKS ON IPHONE
 */
var fullScreen = function(isFS){
	if (isFS) {
		Titanium.UI.iPhone.showStatusBar();
		win.showNavBar();
	} else {
		Titanium.UI.iPhone.hideStatusBar();
		win.hideNavBar();
	}
}

/*
 * This creates an image view with the data passed to the function
 */
var getView = function(data){
	return Titanium.UI.createImageView({
		image: data.photo_m,
		animating: true,
		enableZoomControls: true,
		touchEnabled: true,
		backgroundColor: "#000000",
		height: "100%"
	});
}
/*
 * Setting fullscreen the first time it opens
 */
fullScreen(!isFullscreen);

/*
 * This seccion of code executes when page is loaded
 */
var xhr = Ti.Network.createHTTPClient();
xhr.onload = function(){
	log("html loaded")
	var myData = JSON.parse(this.responseText);
	myViews = [];
	for(var i=0; i < myData.length; i++){
		myViews[i] = getView(myData[i]);
	}
	
	var scrollView = Titanium.UI.createScrollableView({
		views: myViews,
		showPagingControl: true,
		pagingControlHeight: 10,
		backgroundColor: "#000000",
		maxZoomScale : 3.0,
		minZoomScale: 1.0,
	    currentPage : 0
	});
	
	scrollView.addEventListener('singletap', function() {
		fullScreen(isFullscreen);
		isFullscreen = !isFullscreen;
	});
	
	win.add(scrollView);
}

Titanium.API.info("calling for json");
xhr.open("GET", "http://192.168.10.139:16000/photo/set/72157625040411685.json");
xhr.send("");
