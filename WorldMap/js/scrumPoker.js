
Cards = {

	vars: {},

	setElements: function()
	{
		Cards.vars.container = $( "#cards" );
		Cards.vars.cards = Cards.vars.container.find( "li" );
	},

	cardEvents: function()
	{
		Cards.vars.cards.on({
			"click": function( event )
			{
				event.preventDefault();

				Cards.vars.cards.removeClass( "virada" );
				$( this ).addClass( "virada" );
			}
		});
	},

	_init: function()
	{
		Cards.setElements();
		Cards.cardEvents();
	}

};

$( document ).on({
	"ready": function()
	{
		Cards._init();
	}
});