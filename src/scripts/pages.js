/* Page Transitions Function */

$(document).ready(function () {
  $('#trocarPagina').click(function () {
    $( '.page1' ).addClass( 'move-from-top-saida' )
    .css( 'opacity', '0' );
   

   setTimeout( function () {
    $( '.page1' ).removeClass( 'move-from-top-entrada' )
    .css( 'opacity', '1' );
    $( '.page2' ).addClass( 'move-from-top-saida' )
    .css( 'opacity', '1' );
    $( '#pageGame').css( 'opacity', '0' );

   },700)

  });

});



// Adicionando efeito no botao
function openMenu() {
  $('.js-menu-container').addClass('is-open'); // Find element with the class 'js-menu-container' and apply an additional class of 'is-open'
}


function closeMenu() {
  $('.js-menu-container').removeClass('is-open'); // Find element with the class 'js-menu-container' and remove the class 'is-open'
}

// Document Ready

jQuery(document).ready(function($){ // When everything has finished loading

  $('.js-menu-button').click(function(){ // When the element with the class 'js-menu-button' is clicked
    openMenu(); // Run the openMenu function
  });

  $('.js-menu-close').click(function(){ // When the element with the class 'js-menu-close' is clicked
    closeMenu(); // Run the closeMenu function
  });

});

// Keyboard Accessibility

jQuery(document).keyup(function(e) { // Listen for keyboard presses

  if (e.keyCode === 27) { // 'Esc' key

    if ($('.js-menu-container').hasClass('is-open')) { // If the menu is open close it
      closeMenu(); // Run the closeMenu function
    }

  }

});