/**
 * @author JWM Solutions
 */

Titanium.include("map/commons.js");
var win = Titanium.UI.currentWindow;

activateCurrentLocListener();

var isAndroid = false;
if (Titanium.Platform.name == 'android') {
	isAndroid = true;
}

var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:19.43265, longitude:-99.13315, latitudeDelta:0.5, longitudeDelta:0.5},
	animate:true,
	regionFit:true,
	userLocation:true,
});

loadAnnot(mapview);
win.add(mapview);

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var add = Titanium.UI.createButton({
	title: "+",
	height:33,
	width:"auto"
});
var myLocation =  Titanium.UI.createButton({image: "../images/phone_contact.png"});
var toolbar1 = Titanium.UI.createToolbar({
	items:[myLocation,flexSpace, add],
	bottom:0,
	borderTop:true,
	borderBottom:false,
	translucent:true,
	barColor:'#999'
});	
win.add(toolbar1);

myLocation.addEventListener('click',function(){
   Titanium.API.log("show start");
   mapview.setLocation(getCurrentRegion());
});

add.addEventListener("click", function(){
	if(addAnno != null){
		mapview.removeAnnotation(addAnno);
	}
    addNewAnno();
});

Titanium.App.Properties.setBool("annoAdded", false);
var addAnno;
function addNewAnno(){
    addAnno = Titanium.Map.createAnnotation({
        latitude:Titanium.App.Properties.getString('goLat'),
        longitude:Titanium.App.Properties.getString('goLong'),
        title:"Add title",
        subtitle:'add subtitle',
        pincolor: Titanium.Map.ANNOTATION_GREEN,
        animate:false,
        draggable:true,
        rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
        id: "new"
    });
    
    mapview.addAnnotation(addAnno);
    mapview.selectAnnotation(addAnno);
    Titanium.App.Properties.setBool("annoAdded", true);
}
 
mapview.addEventListener('regionChanged',function(evt){
    Titanium.App.Properties.setString('goLat',evt.latitude.toPrecision(10));
    Titanium.App.Properties.setString('goLong',evt.longitude.toPrecision(10));
    if (Titanium.App.Properties.getBool("annoAdded") == true){
        mapview.removeAnnotation(addAnno);
        addNewAnno();
    }
});

mapview.addEventListener("click", function(e) {
	if(e.clicksource === 'rightButton' && e.annotation.id === "new") {
		var style = Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL;
		var presentation = Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN;
		var w = Ti.UI.createWindow({
			url: "map/annotation_form.js",
			currentPin: {map: mapview, annot: e.annotation}
		});

		w.open({
			modal:true,
			modalTransitionStyle:style,
			modalStyle:presentation,
			navBarHidden:true
		});
	}
});