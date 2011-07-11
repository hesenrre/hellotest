Titanium.include("../forms/commons.js");
Titanium.include("commons.js");

var w = Titanium.UI.currentWindow;
w.backgroundColor = "gray";
var currentPin = w.currentPin;
 
var scroll = Titanium.UI.createScrollView({contentHeight:'auto'});
w.add(scroll);
 
var cr = Ti.UI.createButton({
	title:'Cancel',
	top: 350,
	left:"15%",
	width:100,
	height:30
});

var save = Ti.UI.createButton({
	title:'save',
	top: 350,
	right:"15%",
	width:100,
	height:30
});


var name = createLabelAndText({label: 'name', base: 140, key: Titanium.UI.KEYBOARD_DEFAULT, container: scroll});
var address = createLabelAndText({label: 'address', base: 205,type: 'ta', key: Titanium.UI.KEYBOARD_DEFAULT, container: scroll});
cr.addEventListener('click', function() {
	currentPin.map.removeAnnotation(currentPin.annot);
	Titanium.App.Properties.setBool("annoAdded", false);
	w.close();
});

save.addEventListener('click', function() {
	Titanium.API.info("button clicked");
	var xhr = Titanium.Network.createHTTPClient();
	
	xhr.onload = function() {
		Titanium.API.info("server response>"+this.responseText);
		loadAnnot(currentPin.map);
		Titanium.API.info("loadAnnot called");
		Titanium.App.Properties.setBool("annoAdded", false);
		Titanium.API.info("closing window");
		w.close();
	}
	
	Titanium.API.info("opening location");
	xhr.open('GET', 'http://192.168.10.139:3000/locations/test.json');
	Titanium.API.info("opened, sending data");
	xhr.send({
		lat: currentPin.annot.latitude,
		lon: currentPin.annot.longitude,
		name: name.value,
		address: address.value
	});
})
scroll.add(cr);
scroll.add(save);
