'use strict';

/**
 * DIGERATI Utilities.
 * 
 * @author Digerati <cabal@digerati.design>
 */
class DigeratiUtilities {

    /**
     * Create a New Instance.
     *
     * @return {void} 
     */
    constructor() {
        this.concatenateEmailAddresses = this.concatenateEmailAddresses.bind(this);
        this.displayCopyrightYear = this.displayCopyrightYear.bind(this);
        this.displaySearchTermInResultsPage = this.displaySearchTermInResultsPage.bind(this);
        this.focusSearchFormField = this.focusSearchFormField.bind(this);
        this.init = this.init.bind(this);
        this.skipToMainContent = this.skipToMainContent.bind(this);
    }
    
    /**
     * Concatenate Email Addresses.
     *
     * @return {void}
    */
    concatenateEmailAddresses() {
        const target = document.querySelector('[digerati-email-address="target"]');
        if(!target) {
            return;
        }
        const name = target.getAttribute('digerati-email-address-name'),
            domain = target.getAttribute('digerati-email-address-domain'),
            tld = target.getAttribute('digerati-email-address-tld'),
            subject = target.getAttribute('digerati-email-address-subject');
        if(!name || !domain || !tld) {
            return;
        }
        let emailAddress = name + '@' + domain + '.' + tld;
        target.innerText = emailAddress;
        if(subject) {
            emailAddress = emailAddress + '?subject=' + encodeURIComponent(subject);
        }
        target.href = 'mailto:' + emailAddress;
    }
    
    /**
     * Display Copyright Year
     *
     * F'in Sweet WebFlow Hacks - Current year in footer
     * 
     * @link https://finsweet.com/hacks-typescript/hacks/automatically-show-current-year-in-footer-with-span-and-js 
     *
     * @return {void}
     */
    displayCopyrightYear() {
        const target = document.querySelector('[digerati-copyright-year="target"]');
        if(!target) {
            return;
        }
        const currentYear = new Date().getFullYear();
        target.innerText = currentYear.toString();
    }
    
    /**
     * Display Search Term in Results Page.
     *
     * @link https://discourse.webflow.com/t/show-search-term-on-search-result-page/124408/4
     * 
     * @return {void} 
     */
    displaySearchTermInResultsPage() {
        const searchTermTarget = document.querySelector('[digerati-search-term="target"]');
        if(searchTermTarget) {
            const urlParams = new URLSearchParams(window.location.search),
                searchQuery = urlParams.get('query');
            searchTermTarget.innerHTML = searchQuery;
        }
    }
    
    /**
     * Focus Search Form Field.
     *
     * @return {void}
     */
    focusSearchFormField() {
        const trigger = document.querySelector('[digerati-search-form-field-focus="trigger"]');
        trigger.addEventListener('click', function() {
            const target = document.querySelector('[digerati-search-form-field-focus="target"]');
            if(!target) {
                return;
            }
            target.focus();
        });
    }
  
    /**
     * Initialise.
     *
     * @return {void}             
     */
    init() {
        this.concatenateEmailAddresses();
        this.displayCopyrightYear();
        this.displaySearchTermInResultsPage();
        this.focusSearchFormField();
        this.skipToMainContent();
    }

    /**
     * Skip to Main Content.
     *
     * @return {void}             
     */
    skipToMainContent() {
        const trigger = document.querySelector('[digerati-skip-to-main-content="trigger"]');
        if(!trigger) {
            return;
        }
        trigger.addEventListener('click', function(e) {
            if (e.type === 'keydown' && e.which !== 13) {
                return;
            }
            e.preventDefault();
            const target = $('[digerati-skip-to-main-content="target"]');
            //const target = document.querySelector('[digerati-skip-to-main-content="target"]');
            if(!target) {
                return;
            }
            target.attr('tabindex', '-1');
            target.focus();
        });
    }
}
