import { SimilarLetterResponse } from './similar-letter.response';
import { LearnedLetterResponse } from './learned-letter.response';
import { CoordinateResponse } from './coordinate.response.model';
import { LettersResponse } from './letters.response';
import { LearnedLetter } from '../../../api/reading-course/learned-letters/interfaces/learned-letter.interface';
import { SimilarLetter } from '../../../api/reading-course/similar-letters/interfaces/similar-letter.interface';
import { WordResponse } from './word.response';
import { Coordinate } from '../../../api/reading-course/coordinates/interfaces/coordinate.interfaces';
import { Letter } from '../../../api/reading-course/letters/interfaces/letter.interface';
import { Word } from '../../../api/reading-course/words/interfaces/word.interface';

export class ReadingCourseDataResponse {

  constructor(
    public readonly          words: WordResponse[],
    public readonly        letters: LettersResponse,
    public readonly    coordinates: CoordinateResponse[],
    public readonly learnedLetters: LearnedLetterResponse[],
    public readonly similarLetters: SimilarLetterResponse[],
  ) { }

  static parse(words: Word[], coordinates: Coordinate[], letters: Letter, learnedLetters: LearnedLetter[], similarLetters: SimilarLetter[]) {

    const wordsResponse          = words.map(e => new WordResponse(e.letter, e.words) );
    const coordinatesResponse    = coordinates.map( e => new CoordinateResponse(e.letter, e.coordinates) );
    const similarLetterResponse  = similarLetters.map( e => new SimilarLetterResponse(e.letter, e.similarLetters) );
    const learnedLettersResponse = learnedLetters.map( e => new LearnedLetterResponse(e.letter, e.rating) );

    const lettersResponse = new LettersResponse(
      letters.vocals,
      letters.alphabet,
      letters.consonants,
      letters.letterSounds,
      letters.combinations
    );

    return new ReadingCourseDataResponse(
      wordsResponse,
      lettersResponse,
      coordinatesResponse,
      learnedLettersResponse,
      similarLetterResponse,
    );

  }

}
