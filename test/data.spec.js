require('../src/data.js');
const POKEMON = require('../src/data/pokemon/pokemon.json');
const pokemonFilterOrderMock = require('../src/data/pokemon/filterorder.json');
const pokemonFilterInverseOrderMock = require('../src/data/pokemon/filterInverseOrder.json');
const modaMock = require('../src/data/pokemon/moda.json');

describe('filterType', () => {

  it('it should be a function', () => {
    expect(typeof window.filterType).toBe('function');
  });

  it('returns `filterType`', () => {
      expect(window.filterType(POKEMON.pokemon, 'Grass').length).toBe(14);
    });

  it('returns `filterType`', () => {
    expect(window.filterType(POKEMON.pokemon, 'Dark')).toEqual([]);
  });


});

describe('alphabeticalOrder', () => {

  it('it should be a function', () => {
    expect(typeof window.alphabeticalOrder).toBe('function');
  });

  it('returns alphabeticalOrder', () => {
    expect(window.alphabeticalOrder(POKEMON.pokemon)).toEqual(pokemonFilterOrderMock);
  });

});

describe('alphabeticalInverseOrder', () => {

  it('it should be a function', () => {
    expect(typeof window.alphabeticalInverseOrder).toBe('function');
  });

  it('returns alphabeticalInverseOrder', () => {
    expect(window.alphabeticalInverseOrder(POKEMON.pokemon)).toEqual(pokemonFilterInverseOrderMock);
  });

});


describe('moda', () => {

  it('it should be a function', ()=>{
    expect(typeof window.moda).toBe('function');
  });

  it('returns the amount of each type of Pokemon', () => {
    expect(window.moda(POKEMON.pokemon)).toEqual(modaMock);

  });

});
