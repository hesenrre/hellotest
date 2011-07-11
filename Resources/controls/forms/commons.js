var createLabelAndText = function(o) {
	var label = Titanium.UI.createLabel({
		color: '#fff',
		text: o.label,
		top: o.base,
		left:30,
		width: 100,
		height: 'auto'
	});

	var text = null;
	if(o.type === undefined || o.type === 'tf') {
		text = Titanium.UI.createTextField({
			hintText:'enter '+o.label,
			height:35,
			top:o.base+25,
			left:30,
			width:250,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType: o.key
		});
	} else {
		text = Titanium.UI.createTextArea({
			editable: true,
			value:'enter '+o.label,
			height:70,
			width:250,
			top:o.base+25,
			left: 30,
			textAlign:'left',
			returnKeyType:o.key,
			borderRadius:7,
			suppressReturn:false
		});
	}
	o.container.add(label);
	o.container.add(text);
	Titanium.API.info(">"+text);
	return text;
}