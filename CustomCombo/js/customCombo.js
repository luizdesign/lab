/*
 * Title: CustomCombo Class
 *
 * Description: Class Javascript for create a custom combobox starting of select element
 * Author: Kota, Luiz
 * Version: 1.0
 */

CustomCombo = {
	/*
	 * Variables
	 */
	vars: {},

	/*
	 * Method for create the main structure of the new combobox
	 */
	createFakeCombo: function( selector, instancia )
	{
		//Incremental variable for create the new combo ID
		CustomCombo.vars.comboIndex ++;

		//Elements selector variables
		CustomCombo.vars.combo = $( selector );
		CustomCombo.vars.itens = CustomCombo.vars.combo.children( "option" );
		//Total original combobox itens
		CustomCombo.vars.totalItens = CustomCombo.vars.itens.size();

		//New combobox ID
		var id = "combo"+ CustomCombo.vars.comboIndex;
		//New combobox structure
		CustomCombo.vars.combo.wrap( "<div id=\""+ id +"\" class=\"customCombo\"></div>" ).css({ "display": "none" });

		//New combobox selector
		var newSelector = $( "#"+ id );
		CustomCombo.vars.newCombo = newSelector;
		//New combobox template
		newSelector.append( "<a href=\"#\" class=\"activeItem\"><strong></strong><span></span></a><ul class=\"list\">"+ CustomCombo.listItens() +"</ul>" );

		//Call the method for save selectors in variables
		CustomCombo.setElements();

		//Call the method for create the control for the new combobox
		CustomCombo.setEvents( newSelector, instancia );
	},

	/*
	 * Method for save main elements selector in variable
	 */
	setElements: function()
	{
		CustomCombo.vars.activeItem = CustomCombo.vars.newCombo.children( ".activeItem" );
		CustomCombo.vars.Label = CustomCombo.vars.activeItem.children( "strong" );
	},

	/*
	 * Method for reed the combobox itens 
	 */
	listItens: function()
	{
		//new empty variable
		var newListItens = "";

		//populate the newListItens variable
		for( var a = 0; a < CustomCombo.vars.totalItens; a++ )
		{
			var label = CustomCombo.vars.combo.children( "option:eq("+ a +")" ).text();

			newListItens += "<li title=\""+ label +"\">"+ label +"</li>";
		}

		//Return the variable
		return newListItens;
	},

	/*
	 * Method for set the control events for the new combobox
	 */
	setEvents: function( id, instancia )
	{
		//Create a instance of the CustomComboControl class using the "instance" in param
		window[ instancia ] = new CustomComboControl( id );
		//Call the init method of the class 
		window[ instancia ]._init();
	},

	/*
	 * Method for set the start value
	 */
	setValue: function()
	{
		//Get the active combobox item
		var actual = CustomCombo.vars.combo.children( ":selected" ),
			label = actual.text();

		//Pass the selected item label for the new combobox
		CustomCombo.vars.Label.text( label );
	},

	/*
	 * Method that initialize the script
	 */
	_init: function( selector, instancia )
	{
		CustomCombo.vars.comboIndex = 0;

		CustomCombo.createFakeCombo( selector, instancia );
		CustomCombo.setValue();
	}

};

/*
 * Title: CustomComboControl Class
 *
 * Description: Create a unique control for each new combobox
 * Author: Kota, Luiz
 * Version: 1.0
 */

function CustomComboControl( comboId )
{
	/*
	 * Variables
	 */
	var elmt = comboId,
		mainCombo = elmt.children( "select" ),
		mainComboItens = mainCombo.children( "option" ),
		list = elmt.children( ".list" ),
		listItens = list.children( "li" ),
		button = elmt.children( ".activeItem" ),
		activeLabel = button.children( "strong" ),
		dom = $( document ),

		//status of the combobox | 0 for close | 1 for open
		status = 0;

	/*
	 * Method that initialize the controls
	 */
	this._init = function()
	{
		events();
	}

	/*
	 * Private method for create the control events
	 */
	var events = function()
	{
		//Event for open or close the new combobox
		button.on({
			"mousedown": function( event )
			{
				event.preventDefault();

				if( status == 1 )
				{
					closeCombo();
				}
				else
				{
					openCombo();
				}
			}
		});

		//Event for select a item
		listItens.on({
			"click": function()
			{
				var actual = $( this );

				if( !actual.hasClass( "selected" ) )
				{
					setItem( actual );
				}
			}
		});

		//Event to close combobox on any click event
		dom.on({
			"mouseup": function( event )
			{
				if( event.target != button && event.target.parentNode.className != "activeItem" && event.target.className != "activeItem" )
				{
					closeCombo();
				}
			}
		});
	}

	/*
	 * Private method for open the new combobox
	 */
	var openCombo = function()
	{
		status = 1;

		list.stop().slideDown();
	}

	/*
	 * Private method for close the new combobox
	 */
	var closeCombo = function()
	{
		status = 0;

		list.stop().slideUp();
	}

	/*
	 * Method for set the selected item
	 */
	var setItem = function( actual )
	{
		var index = actual.prevAll().size();

		listItens.removeClass( "selected" );
		actual.addClass( "selected" );

		mainComboItens.removeAttr( "selected" );
		mainCombo.children( "option:eq("+ index +")" ).attr({ "selected": "selected" });

		CustomCombo.setValue();
	}
}

(function($)
{

	$( document ).on({
		"ready": function()
		{
			CustomCombo._init( "#customCombo", "teste" );
		}
	});

})( jQuery )