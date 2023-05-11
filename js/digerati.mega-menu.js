'use strict';

/**
 * DIGERATI Mega Menu.
 * 
 * @author Digerati <cabal@digerati.design>
 */
class DigeratiMegaMenu {

    /**
     * Create a New Instance.
     *
     * @return {void} 
     */
    constructor() {
    	this.hide = this.hideMegaMenu.bind(this);
    	this.init = this.init.bind(this);
    	this.show = this.showMegaMenu.bind(this);
    }

    /**
     * Initialise.
     *
     * @return {void} 
     */
    init() {
    	let navMenu = document.querySelector('.w-nav-menu');
		if(navMenu !== null) {
        	/* Disable native Webflow navbar behaviour */
        	let dropdowns = navMenu.querySelectorAll('.w-dropdown'),
            	dropdownLists = navMenu.querySelectorAll('.w-dropdown-list');
	        dropdowns.forEach((dropdown) => {
	            dropdown.setAttribute('data-hover', false);
	            dropdown.removeAttribute('data-delay');
	        });
	        dropdownLists.forEach((dropdownList) => {
	            dropdownList.removeAttribute('style');
	        });
	        /* Hover intent */
	        $('.w-nav-menu').hoverIntent({
	            over: this.show,
	            out: this.hide,
	            timeout: 200,
	            selector: '.w-dropdown' 
	        });
      	}
    }

    /**
     * Show Mega Menu.
     *
     * @return {void} 
     */
    show() {
		let menuItem = this,
			megaMenu = menuItem.querySelector('.w-dropdown-list'),
			dropDownToggle = menuItem.querySelector('.w-dropdown-toggle'),
			dropDownIcon = menuItem.querySelector('.dropdown-icon');
		dropDownToggle.setAttribute('aria-expanded', true);
		dropDownToggle.classList.add('w--open');
		megaMenu.classList.add('w--open');
	}

	/**
	 * Hide Mega Menu.
	 *
	 * @return {void} 
	 */
	hide() {
		let menuItem = this,
			megaMenu = menuItem.querySelector('.w-dropdown-list'),
			dropDownToggle = menuItem.querySelector('.w-dropdown-toggle'),
			dropDownIcon = menuItem.querySelector('.dropdown-icon');
		dropDownToggle.setAttribute('aria-expanded', false);
		dropDownToggle.classList.remove('w--open');
		megaMenu.classList.remove('w--open');
	}
}
