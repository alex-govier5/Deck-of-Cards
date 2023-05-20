import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeckOfCardsService } from '../services/deck-of-cards.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResultScreenComponent } from '../result-screen/result-screen.component';
import { CompareCardsService } from '../services/compare-cards.service';

export interface ButtonProperties{
  text: string;
  textColor?: string; 
  backgroundColor?: string;
}


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  @Input() public question: string = '';
  @Input() public buttonInputs: ButtonProperties[] = [];
  @Input() public questionNumber: number = -1;
  public previousCard: string = "";
  public correct: number = 0;
  @Output() nextQuestion: EventEmitter<string> = new EventEmitter<string>();

  constructor(private deckOfCardsService: DeckOfCardsService, public dialog: MatDialog, private compareCardsService: CompareCardsService){
    //Goal 1
    this.deckOfCardsService.createShuffledDeck().subscribe(result => {
      console.log(result);
    })
  }

  answerQuestion(answer: string){
    this.deckOfCardsService.drawCard().subscribe(result => {
      var card = result.cards[0];
      //Goal 3
      if(this.questionNumber === 1){
        this.previousCard = card.value;
        var dialogRef = null;
        if((answer === "Red" && (card.suit === "DIAMONDS" || card.suit === "HEARTS")) || (answer === "Black" && (card.suit === "SPADES" || card.suit === "CLUBS"))){
          this.correct++;
          //Goal 4
          dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {question: this.questionNumber, card: card, success: true, correct: this.correct }});
          dialogRef.afterClosed().subscribe(() => {
            this.nextQuestion.emit();
          });
        }
        else{
          dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {question: this.questionNumber, card: card, success: false, correct: this.correct }});
          dialogRef.afterClosed().subscribe(() => {
            this.nextQuestion.emit();
          });
        }
      }
      //Goal 3
      else if(this.questionNumber === 2){
        var value = this.compareCardsService.compareCards(card.value, this.previousCard);
        if((answer === "Higher" && value > 0) || (answer === "Lower" && value < 0)){
          this.correct++;
          //Goal 4
          dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {question: this.questionNumber, card: card, success: true, correct: this.correct }});
          dialogRef.afterClosed().subscribe(() => {
            this.nextQuestion.emit();
          });
        }
        else{
          dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {question: this.questionNumber, card: card, success: false, correct: this.correct }});
          dialogRef.afterClosed().subscribe(() => {
            this.nextQuestion.emit();
          });
        }
      }
      //Goal 3
      else{
        if(answer === card.suit){
          this.correct++;
          //Goal 4
          dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {question: this.questionNumber, card: card, success: true, correct: this.correct }});
          dialogRef.afterClosed().subscribe(() => {
            //Goal 7
            this.dialog.open(ResultScreenComponent, {disableClose: true, data: {question: 4, card: card, success: true, correct: this.correct }});
            this.nextQuestion.emit();
          });
        }
        else{
          dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {question: this.questionNumber, card: card, success: false, correct: this.correct }});
          dialogRef.afterClosed().subscribe(() => {
            //Goal 7
            this.dialog.open(ResultScreenComponent, {disableClose: true, data: {question: 4, card: card, success: true, correct: this.correct }});
            this.nextQuestion.emit();
          });
        }
      }
    });
    
  }

}
