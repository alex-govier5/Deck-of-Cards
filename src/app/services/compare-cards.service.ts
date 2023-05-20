import { Injectable } from '@angular/core';

const cardValues: {[key:string]: number} = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'JACK': 11,
  'QUEEN': 12,
  'KING': 13,
  'ACE': 14
};

@Injectable({
  providedIn: 'root'
})
export class CompareCardsService {

  constructor() { }

  compareCards(card1: string, card2: string): number{
    const numericValue1 = cardValues[card1];
    const numericValue2 = cardValues[card2];

    return numericValue1 - numericValue2;
  }
}
