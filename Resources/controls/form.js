Titanium.include("forms/commons.js");
var win = Titanium.UI.currentWindow;

win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
]; 

win.backgroundColor = '#6d84a2';
win.barColor = '#6d84a2';

var scroll = Titanium.UI.createScrollView({contentHeight:'auto'});
win.add(scroll);

var lat = createLabelAndText({label: 'latitude', base: 10, key: Titanium.UI.KEYBOARD_DECIMAL_PAD, container: scroll});
Titanium.API.info("lat>"+lat);
var lon = createLabelAndText({label: 'longitude', base: 75, key: Titanium.UI.KEYBOARD_DECIMAL_PAD, container: scroll});
var name = createLabelAndText({label: 'name', base: 140, key: Titanium.UI.KEYBOARD_DEFAULT, container: scroll});
var address = createLabelAndText({label: 'address', base: 205,type: 'ta', key: Titanium.UI.KEYBOARD_DEFAULT, container: scroll});
var save = Titanium.UI.createButton({title: "Save Location", height: 35, width: 250, left: 30, top: 350});
scroll.add(save);

save.addEventListener('click', function(e) {
	
	Titanium.API.info("button clicked");
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(){
		Titanium.API.info(this.responseText);
	}
	Titanium.API.info("opening location");
	xhr.open('GET', 'http://192.168.10.82:3000/locations/test.json');
	Titanium.API.info("opened, sending data");
	xhr.send({lat: lat.value, lon:lon.value, name: name.value, address: address.value});

});