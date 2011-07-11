/**
 * @author JWM Solutions
 */

//Titanium.UI.currentWindow.hideTabBar();
var data = [
	{title:'Map Test', hasChild:true, test:'../controls/map.js'},
	{title:'JSON Test', hasChild:true, test:'../controls/json.js'},
	{title:'Annotations Test', hasChild:true, test: '../controls/annotations.js'},
	{title: 'Form Test', hasChild:true, test: '../controls/form.js'}
];


var tableview = Titanium.UI.createTableView({
	data:data
});


tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title
		});
		win.hideTabBar();
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);
