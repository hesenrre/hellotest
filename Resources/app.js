

Ti.UI.setBackgroundColor('#FFF');
 
var tabGroup = Ti.UI.createTabGroup();
 
var win1 = Titanium.UI.createWindow({
	url:'main_window/controls.js',
	title:'controls'
});
var tab1 = Titanium.UI.createTab({
	title:'controls',
	window:win1
});
 
tabGroup.addTab(tab1);
tabGroup.open();