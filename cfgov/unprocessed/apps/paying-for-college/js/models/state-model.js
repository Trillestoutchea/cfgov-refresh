/**
 * This file contains the model for the application state - that is, an Object
 * which tracks the current app state and allows the views to update based on
 * state.
*/

import { bindEvent } from '../../../../js/modules/util/dom-events';
import { setUrlQueryString } from '../util/url-parameter-utils.js';
import { updateNavigationView } from '../dispatchers/update-view.js';

const stateModel = {
  stateDomElem: null,
  values: {
    activeSection: null,
    schoolSelected: null,
    gotStarted: false,
    handleCostsButtonClicked: false,
    programType: null,
    programLength: null,
    programRate: null,
    programHousing: null
  },

  setValue: function( name, value ) {
    if ( name !== 'activeSection' ) {
      stateModel.values[name] = value;
      this.setStateInDom( name, value );
    } else if ( value !== stateModel.values.activeSection ) {
      stateModel.values.activeSection = value;
      window.history.pushState( this.values, null, '' );
      updateNavigationView();
    }
    setUrlQueryString();

  },

  /**
   * setStateInDom - manages dataset for the MAIN element, which helps display UI elements
   * properly
   * @param {String} property - The state property to modify
   * @param {String} value - The new value of the property
   * NOTE: if the value is null or the Boolean 'false', the data attribute will be removed
   */
  setStateInDom: function( property, value ) {
    if ( value === false || value === null ) {
      this.stateDomElem.removeAttribute( property );
    } else {
      this.stateDomElem.setAttribute( 'data-state_' + property, value );
    }
  },

  /*
   * _addPopStateListener - Add a listener for "pop" events
   */
   _addPopStateListener: function() {
      const events = {
        popstate: this._handlePopState
      };
      bindEvent( window, events );
   },

  _handlePopState: function( event ) {
    console.log( '_handlePopState fired!' );
    if ( event.state ) {
      // window.history.replaceState( this.values, null, '' );
      stateModel.values.activeSection = event.state.activeSection;
      // stateModel.setValue( 'activeSection', event.state.activeSection );
    }

    updateNavigationView();

  },

  init: function() {
    window.history.replaceState( this.values, null, '' );
    this.stateDomElem = document.querySelector( 'main.college-costs' );
    this._addPopStateListener();

  }

};

export {
  stateModel
};
