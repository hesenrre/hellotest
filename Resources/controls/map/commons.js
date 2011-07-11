var loadAnnot = function(mapview) {
	Titanium.API.info("on loadAnnot");
	mapview.removeAllAnnotations();
	Titanium.API.info("annotations removed from map");
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		Titanium.API.info("json locations load method");
		var myData = JSON.parse(this.responseText);
		//Titanium.API.info(myData);
		for(var i=0; i < myData.length; i++) {
			var anot = Titanium.Map.createAnnotation({
				latitude:myData[i].location.lat,
				longitude:myData[i].location.lon,
				title:myData[i].location.name,
				subtitle:'cafeteria',
				animate:true,
				myid:myData[i].location.id // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
			});
			mapview.addAnnotation(anot);
		}
	}
	xhr.open("GET", "http://192.168.10.139:3000/locations.json");
	xhr.send("");
	Titanium.API.info("Called json locations waiting to response");
}

var currentRegion = null;

Ti.Geolocation.preferredProvider = "gps";
Ti.Geolocation.purpose = "GPS demo";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HUNDRED_METERS;
Titanium.Geolocation.distanceFilter = 10;
var updateLocation = function(){
	Titanium.Geolocation.getCurrentPosition(function(e)
		{
			var longitude = e.coords.longitude;
			var latitude = e.coords.latitude;
			currentRegion = {latitude:latitude, longitude:longitude, latitudeDelta:0.005, longitudeDelta:0.005};
		}
	);
}

var activateCurrentLocListener = function() {
	Titanium.Geolocation.addEventListener('location', function() {
		updateLocation();
	});
}

var getCurrentRegion = function(){
	return currentRegion;
}

