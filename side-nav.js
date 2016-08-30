'use strict';



class SideNav {
  constructor() {
    console.log(this);
    this.showButtonEl = document.querySelector('.js-menu-show');
    this.hideButtonEl = document.querySelector('.js-menu-hide');
    this.sideNavEl = document.querySelector('.js-side-nav');
    this.sideNavContainerEl = document.querySelector('.js-side-nav-container');

    this.showSideNav = this.showSideNav.bind(this);                 // this is the sidenav object and not the window here. So we bind the SideNav object to the this.showSideNav so its stored
    this.hideSideNav = this.hideSideNav.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.update = this.update.bind(this);

    this.sideNavEl.inert = true;  // using this for tabbing and taking advantage of the inert polyfill

    this.startX = 0;
    this.currentX = 0;
    this.touchingSideNav = false;

    this.addEventListeners();

  }

  addEventListeners (){
    this.showButtonEl.addEventListener('click', this.showSideNav);
    this.hideButtonEl.addEventListener('click', this.hideSideNav);
    this.sideNavEl.addEventListener('click' , this.hideSideNav);  // this hides the side nav.
    this.sideNavContainerEl.addEventListener('click', this.blockClicks); // dont hide it and block the event if were in the side nav container
    // so if we click in the div .js-side-nav-container we stop. Thats what the above code will do
    document.addEventListener('touchstart', this.onTouchStart);  // this will allow us to swipe closed the left nav
    document.addEventListener('touchend', this.onTouchEnd);  // this will allow us to swipe closed the left nav
    document.addEventListener('touchmove', this.onTouchMove);

  }

  onTouchStart (evt) {

    if (!this.sideNavEl.classList.contains('side-nav--visible'))  // make sure were touching the right area and its expanded
      return;

    this.startX = evt.touches[0].pageX;
    this.currentX = this.startX;

    this.touchingSideNav = true;
    requestAnimationFrame(this.update);
  }

  onTouchMove (evt) {
    this.currentX = evt.touches[0].pageX;
    const translateX = Math.min(0, this.currentX - this.startX);  //this is prevent the positive numbers to drag the nav right. It is supposed to only be dragged left

    if (translateX < 0) {
      evt.preventDefault();
    }
  }

  onTouchEnd (evt) {
    this.touchingSideNav = false;

    const translateX = Math.min(0, this.currentX - this.startX);
    this.sideNavContainerEl.style.transform = '';

    if (translateX < 0) {
      this.hideSideNav();
    }
  }

  update () {
    if (!this.sideNavEl.classList.contains('side-nav--visible'))
      return;

    if (this.touchingSideNav)
      requestAnimationFrame(this.update);

    const translateX = Math.min(0, this.currentX - this.startX);
    this.sideNavContainerEl.style.transform = `translateX(${translateX}px)`;
  }

  blockClicks(evt) {
    evt.stopPropagation();  // this stops the event from doing anything. We just kill it if we click in the Side nav blank area so it doesnt close

  }

  onTransitionEnd (evt) {
    this.sideNavEl.classList.remove('side-nav--animatable');
    this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd);
  }

  showSideNav () {

    this.sideNavEl.classList.add('side-nav--animatable');
    this.sideNavEl.classList.add('side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
    this.sideNavEl.inert = false;
  }

  hideSideNav () {
    this.sideNavEl.inert = true;

    this.sideNavEl.classList.add('side-nav--animatable');
    this.sideNavEl.classList.remove('side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
  }


}

new SideNav();
