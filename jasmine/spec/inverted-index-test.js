const books = require('./books.json');
const books2 = require('./books2.json');
const books3 = require('./books3.json');

describe('InvertedIndex Class', () => {
  beforeAll(() => {
    this.invertedIndex = new InvertedIndex();
    this.index = this.invertedIndex.createIndex('books', books);
    this.index2 = this.invertedIndex.createIndex('books2', books2);
    this.index3 = this.invertedIndex.createIndex('books3', books3);
  });

  describe('Constructor', () => {
    it('can create inverted index instance', () => {
      expect(typeof this.invertedIndex).toEqual('object');
      expect(this.invertedIndex instanceof InvertedIndex).toBe(true);
    });

    it('has an indexes object to hold all indexes', () => {
      expect(typeof this.invertedIndex.indexes).toEqual('object');
    });
  });

 describe('GetWords', () => {
    it('should return an array of words', () => {
      expect(InvertedIndex.getWords(books[0].title))
        .toEqual(['alice', 'in', 'wonderland']);
    });

    it('filters out symbols', () => {
      expect(InvertedIndex.getWords('alice # in* Won@derland'))
        .toEqual(['alice', 'in', 'wonderland']);
    });
  });

  describe('CreateIndex', () => {
    it('creates an index', () => {
      expect(this.invertedIndex.getIndex('books')).toBeTruthy();
      expect(this.invertedIndex.getIndex('books2')).toBeTruthy();
    });
    it('creates the correct index', () => {
      expect(this.index.a).toEqual([0, 1, 2]);
      expect(this.index.alice).toEqual([0]);
      expect(this.index2.random).toEqual([1]);
      expect(this.index2.room).toEqual([0]);
    });
  });


  describe('GetIndex', () => {
    it('should return "undefined" if index does not exist', () => {
      expect(this.invertedIndex.getIndex(' ')).toEqual(undefined);
      expect(this.invertedIndex.getIndex('books4')).toEqual(undefined);
    });
    
    it('should return a particular index', () => {
      const index1 = this.invertedIndex.getIndex('books');
      const index2 = this.invertedIndex.getIndex('books2');

      expect(index1.a).toEqual([0, 1, 2]);
      expect(index1.alice).toEqual([0]);
      expect(index2.random).toEqual([1]);
      expect(index2.room).toEqual([0]);

    });

    it('returns the exact result of the index', () => {
      const index3 = this.invertedIndex.getIndex('books3');
      expect(index3).toEqual({
        'the':[0], 
        'tipping':[0], 
        'point':[0], 
        'by':[0,1], 
        'malcolm':[0,1], 
        'gladwell':[0,1],
        'david':[1],
        'and':[1],
        'goliath':[1]
      });
    });
  });


  describe('SearchIndex', () => {
    it('should return "not exist" if index does not exist', () => {
      expect(this.invertedIndex.searchIndex('alice in wonderland', 'movies'))
        .toEqual('Index with movies does not exist.');
    });

    it('should return "not found" for words not in index', () => {
      expect(this.invertedIndex.searchIndex('', 'books'))
        .toEqual('no word found');
    });

    it('should return object with search words', () => {
      expect(this.invertedIndex.searchIndex('alice unusual wonderland', 'books'))
      .toEqual({'alice': [0], 'unusual': [1,2], 'wonderland': [0]});
      expect(this.invertedIndex.searchIndex('room', 'books2')).toEqual({'room': [0]});
      expect(this.invertedIndex.searchIndex('random', 'books2')).toEqual({'random': [1]});
    });
  });
});
