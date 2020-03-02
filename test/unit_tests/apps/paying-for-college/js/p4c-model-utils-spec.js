const BASE_JS_PATH = '../../../../../cfgov/unprocessed/apps/paying-for-college';

const financialModel = require( `${ BASE_JS_PATH }/js/models/financial-model.js` ).financialModel;
const schoolModel = require( `${ BASE_JS_PATH }/js/models/school-model.js` ).schoolModel;
const stateModel = require( `${ BASE_JS_PATH }/js/models/state-model.js` ).stateModel;
const constantsModel = require( `${ BASE_JS_PATH }/js/models/constants-model.js` ).constantsModel;

const getModelValues = require( `${ BASE_JS_PATH }/js/dispatchers/get-model-values.js` );
const getState = require( `${ BASE_JS_PATH }/js/dispatchers/get-state.js` ).getState;
const updateModels = require( `${ BASE_JS_PATH }/js/dispatchers/update-models.js` );
const updateState = require( `${ BASE_JS_PATH }/js/dispatchers/update-state.js` ).updateState;
const updateView = require( `${ BASE_JS_PATH }/js/dispatchers/update-view.js` );

describe( 'The Cost Tool model utilities', () => {

  describe( 'get-model-values', () => {
    it( 'should find the correct value inside the financial model', () => {
      financialModel.values.test = 13;
      expect( getModelValues.getFinancialValue( 'test' ) ).toEqual( 13 );
    } );

		it( 'should find the correct value inside the school model', () => {
      schoolModel.values.test = 23;
      expect( getModelValues.getSchoolValue( 'test' ) ).toEqual( 23 );
    } );

    it( 'should find the correct value inside the constants model', () => {
      constantsModel.values.test = 33;
      expect( getModelValues.getConstantsValue( 'test' ) ).toEqual( 33 );
    } );

  } );

  describe( 'get-state', () => {
  	it( 'should get a value from the state model', () => {
  		stateModel.test = 42;
  		expect( getState( 'test' ) ).toEqual( 42 );
  	} );
  });

  describe( 'update-models', () => {
  	it( 'should update the financial model', () => {
  		// We should have to create the Financial Property first
  		financialModel.values.foo = 0;
  		updateModels.updateFinancial( 'foo', 13 );
  		expect( financialModel.values.foo ).toEqual( 13 );
  	} );

  	it( 'should not update the financial model if the property is undefined', () => {
  		// We should have to create the Financial Property first
  		delete financialModel.values.foo;
  		updateModels.updateFinancial( 'foo', 13 );
  		expect( financialModel.values.foo ).toBeUndefined();
  	} );
  });

  describe( 'update-state', () => {
  	it( 'activeSection should change the activeSection', () => {
  		updateState.activeSection( 'test' );
  		expect( stateModel.activeSection ).toEqual( 'test' );
  	});

  	it( 'getStarted should change the gotStarted property', () => {
  		updateState.getStarted( true );
  		expect( stateModel.gotStarted ).toEqual( true );
  	});

  	it( 'setProgramData should set properties on the program data object', () => {
  		updateState.setProgramData( 'test', 987 );
  		expect( stateModel.programData.test ).toEqual( 987 );
  	});

  	it( 'byProperty should update a property of the state model', () => {
  		updateState.byProperty( 'test', 999 );
  		expect( stateModel.test ).toEqual( 999 );
  	});

  });

} );

