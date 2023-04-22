'use strict';

/**
 * DIGERATI Page Transitions.
 * 
 * @author Digerati <cabal@digerati.design>
 */
class DigeratiPageTransitions {
  
    /**
     * Create a New Instance.
     *
     * @return {void} 
     */
  	constructor() {
      	this.addEventListeners = this.addEventListeners.bind(this);
        this.body = $('body');
        this.excludedClass = 'no-transition';  
        this.exitDurationMs = 1200;
      	this.init = this.init.bind(this);
        this.introDurationMs = 0;
        this.pageScrollDurationMs = 1000;
        this.transitionTrigger = $('.transition-trigger');  
        this.transitionTriggerExists = this.transitionTrigger.length > 0;
    }
  
    /**
     * Add Event Listeners.
     *
     * @return {void}             
     */
  	addEventListeners() {
        /* Hijack Link Click Event */
        $('a').on('click', function (e) {
            let $link = $(this),
                transitionUrl = $link.attr('href'),
                transitionPagePath = transitionUrl.split('#')[0],
                hasPageAnchor = transitionUrl.indexOf('#') !== -1,
                hasExcludedClass = $link.hasClass(this.excludedClass),
                opensInNewWindow = $link.attr('target') === '_blank',
                isSameDomain = $link.prop('hostname') === window.location.host,
                isSamePageLink = transitionPagePath === window.location.pathname,
                isValidLink = this.transitionTriggerExists && !hasExcludedClass && !opensInNewWindow && isSameDomain,
                isTransitionLink = isValidLink && !isSamePageLink;
            if(isTransitionLink) {
                /* Play Exit Transition Animation */
                e.preventDefault();
                this.body.addClass('no-scroll-transition');
                this.transitionTrigger.click();
                setTimeout(function () {
                    window.location = transitionUrl;
                }, this.exitDurationMs);
            }
            if(isValidLink && hasPageAnchor) {
                /**
                 * This is an internal page link,
                 * so close Mega Menu / Mobile Nav
                 * so that WebFlow scroll to section
                 * animation is visible.
                 */
                $('.w-dropdown-list, .w-nav-overlay').removeClass('w--open');
            }
        });
        /* Smooth Scroll to Page Anchor */
        window.onpageshow = function(event) {
            if(event.persisted) {
                window.location.reload();
            }
            let pageAnchor = window.location.hash.substring(1),
                transitionUrl = window.location.pathname,
                isPageAnchorLinkFromExternalPage = pageAnchor && transitionUrl !== document.referrer;
            if(isPageAnchorLinkFromExternalPage) {
                /* Page anchor has been linked to from an external page so scroll to element */
                let sectionId = '#' + pageAnchor;
                $('html').scrollTop(0).delay(this.exitDurationMs - 50).animate({
                    scrollTop: $(sectionId).scrollTop() + $(sectionId).offset().top
                }, this.pageScrollDurationMs);
            }
        };
        /* Handle Page Resize */
        setTimeout(() => {
            $(window).on('resize', function () {
                setTimeout(() => {
                    $('.transition').css('display', 'none');
                }, 50);
            });
        }, this.introDurationMs);
    }
    
    /**
     * Initialise.
     *
     * @return {void} 
     */
  	init() {
        if (this.transitionTriggerExists) {        
            /* Play Intro Transition Animation */
           	this.transitionTrigger.click();
            this.body.addClass('no-scroll-transition');
            setTimeout(() => {
                this.body.removeClass('no-scroll-transition');
            }, this.introDurationMs);
        }
        this.addEventListeners();
    }
}
