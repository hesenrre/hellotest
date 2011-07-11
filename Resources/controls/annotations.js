/**
 * @author JWM Solutions
 */

var win = Titanium.UI.currentWindow;

var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {latitude:'51.51098606916964', longitude:'-0.1338958740234375', latitudeDelta:0.04, longitudeDelta:0.04},
    animate:true,
    regionFit:true,
    userLocation:true
});


var addLocation =  Titanium.UI.createButton({
	title:'I am a Button',
	height:40,
	width:200,
	top:10
});

 
win.rightNavButton = addLocation;
 
addLocation.addEventListener('click',function(){
	mapview.removeAnnotation(addAnno);
    addNewAnno();
});


var annoAdded = false;
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
    annoAdded = true;
}
 
mapview.addEventListener('regionChanged',function(evt){
    Titanium.App.Properties.setString('goLat',evt.latitude.toPrecision(10));
    Titanium.App.Properties.setString('goLong',evt.longitude.toPrecision(10));
    if (annoAdded == true){
        mapview.removeAnnotation(addAnno);
        addNewAnno();
    }
});

mapview.addEventListener("click", function(e) {
	if(e.clicksource === 'rightButton' && e.annotation.id === "new") {
		var style = Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL;
		var presentation = Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN;
		var w = Ti.UI.createWindow({
			backgroundColor:'purple'
		});
		var b = Ti.UI.createButton({
			title:'Close',
			top: "50%",
			width:100,
			height:30
		});
		b.addEventListener('click', function() {
			w.close();
		});
		
		var cr = Ti.UI.createButton({
			title:'Close and remove pin',
			top: "75%",
			width:100,
			height:30
		});
		cr.addEventListener('click', function() {
			mapview.removeAnnotation(e.annotation);
			annoAdded = false;
			w.close();
		});
		
		w.add(b);
		w.add(cr);
		
		w.open({
			modal:true,
			modalTransitionStyle:style,
			modalStyle:presentation,
			navBarHidden:true
		});
	}
});
win.add(mapview);
