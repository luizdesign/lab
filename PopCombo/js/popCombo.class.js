/*
 * Array Model for combobox
 * 
 * Accept simple index and object:
 * if used object, is need a label and id key    
 */
var country_list = [
	{ 
		"label": "Afghanistan",
		"id": 1
	},
	"Albania",
	{
		"label": "Algeria",
		"id": 2
	},
	{
		"label": "Andorra",
		"id": 3
	},
	{
		"label": "Angola",
		"id": 4
	},
	"Anguilla",
	"Antigua & Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	{
		"label": "Brasil",
		"id": 99
	}
];

/*
 * Title: PopCombo Class
 * Description: Class to populate a combobox element with the array itens
 *
 * Author: Kota, Luiz
 * Version: 1.0
 *
 * @selector: String | Seletor do combobox
 * @arrObj: Array or Object | Array or Object com os itens do combobox
 */
PopCombo = {
	/*
	 * Variables
	 */
	vars: {},

	/*
	 * Method to init and populate variables
	 */
	setElements: function( selector, arrObj )
	{
		PopCombo.vars.elmt = $( selector );
		PopCombo.vars.itemList = arrObj;
		PopCombo.vars.totalItens = arrObj.length;
	},

	/*
	 * Method to read the array and populate the combobox element
	 */
	popCombo: function()
	{
		//Definy a variable to receive the list itens
		var comboList = "";

		//Read the array itens
		for( var a = 0; a < PopCombo.vars.totalItens; a++ )
		{
			//Create variables with the id and label values
			//If the object has id and label key use the keys, else create a generic id and use the object index for label
			var id = ( PopCombo.vars.itemList[ a ].id ) ? PopCombo.vars.itemList[ a ].id : a + 1,
				label = ( PopCombo.vars.itemList[ a ].label ) ? PopCombo.vars.itemList[ a ].label : PopCombo.vars.itemList[ a ];

			//Add the combobox item in variable
			comboList += "<option value=\""+ id +"\" title=\""+ label +"\">"+ label +"</option>";
		}

		//Add the comboList variable in combobox element
		PopCombo.vars.elmt.append( comboList );
	},

	/*
	 * Method to initialize the PopCombo class
	 */
	_init: function( selector, arrObj )
	{
		PopCombo.setElements( selector, arrObj );
		PopCombo.popCombo();
	}
};

/*
 * DOM onReady event
 */
$( document ).on({
	"ready": function()
	{
		//Create a copy of the PopCombo Class
		var pais = PopCombo;
		//Call the init method of the pais instance
		pais._init( "#pais", country_list );
	}
});