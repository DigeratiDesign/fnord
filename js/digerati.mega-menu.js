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
        this.get = this.get.bind(this);
    	this.hide = this.hide.bind(this);
    	this.init = this.init.bind(this);
    	this.show = this.show.bind(this);
    }
    
    /**
     * Get.
     * 
     * @return {object}
     */
    get(this) {
        let list = this.querySelector('.w-dropdown-list'),
			toggle = this.querySelector('.w-dropdown-toggle'),
            menuItem = {
                toggle: toggle,
                list: list
            };
        return elements;
    }   

	/**
	 * Hide.
	 *
	 * @return {void} 
	 */
	hide() {
        let menuItem = this.get(this);
		menuItem.toggle.setAttribute('aria-expanded', false);
		menuItem.toggle.classList.remove('w--open');
		menuItem.list.classList.remove('w--open');
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
     * Show.
     *
     * @return {void} 
     */
    show() {
        let menuItem = this.get(this);
		menuItem.toggle.setAttribute('aria-expanded', true);
		menuItem.toggle.classList.add('w--open');
		menuItem.list.classList.add('w--open');
	}
}
