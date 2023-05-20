import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/';

export interface Deck{
  deck_id: string;
}

export interface Draw{
  cards: Card[];
}

export interface Card{
  image: string;
  suit: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeckOfCardsService {
  private deckId: string ="";

  constructor(private http: HttpClient) { }

  createShuffledDeck(): Observable<Deck>{
    return this.http.get<Deck>(API_BASE_URL + 'new/shuffle/?deck_count=1').pipe(tap((deck:Deck) => {
      this.deckId = deck.deck_id;
    }));
  }

  drawCard(): Observable<Draw>{
    return this.http.get<Draw>(API_BASE_URL +this.deckId + '/draw/?count=1');
  }
}
