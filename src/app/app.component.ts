import { Component } from '@angular/core';
import { ButtonProperties } from './question/question.component';
import { DeckOfCardsService } from './services/deck-of-cards.service';
import { MatDialog } from '@angular/material/dialog';
import { CompareCardsService } from './services/compare-cards.service';
import { ResultScreenComponent } from './result-screen/result-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Deck of Cards';

  public start: boolean;
  public question: string;
  public buttonInputs: ButtonProperties[];
  public showQuestion: boolean;
  public questionType: string;
  public questionFunction: Function;
  public questionNumber: number;
  public previousCard: string = "";
  public correct: number;

  constructor(private deckOfCardsService: DeckOfCardsService, public dialog: MatDialog, private compareCardsService: CompareCardsService){
    this.start = true;
    this.question = "";
    this.buttonInputs = [];
    this.showQuestion = false;
    this.questionType = "";
    this.questionNumber = 0;
    this.questionFunction = Function();
    this.correct = 0;
  }

  startGame(){
    //Goal 2
    this.start = false;
    this.question = "Is the next card going to be red or black?";
    this.buttonInputs = [{text: "Red", textColor: "white", backgroundColor: "red"}, {text: "Black", textColor: "white", backgroundColor: "black"}];
    this.showQuestion = true;
    this.questionNumber = 1;
    this.questionFunction = this.questionOne;
  }

  questionOne(answer: string){
    this.questionType = "Regular";
    this.deckOfCardsService.drawCard().subscribe(result => {
      var card = result.cards[0];
      //Goal 3
      this.previousCard = card.value;
      var dialogRef = null;
      if((answer === "Red" && (card.suit === "DIAMONDS" || card.suit === "HEARTS")) || (answer === "Black" && (card.suit === "SPADES" || card.suit === "CLUBS"))){
        this.correct++;
        //Goal 4
        dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {questionType: this.questionType, card: card, success: true, correct: this.correct }});
        dialogRef.afterClosed().subscribe(() => {
          this.nextQuestion();
        });
      }
      else{
        dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {questionType: this.questionType, card: card, success: false, correct: this.correct }});
        dialogRef.afterClosed().subscribe(() => {
          this.nextQuestion();
        });
      }
      
    });
   
  }

  questionTwo(answer: string){
    this.questionType = "Regular";
    this.deckOfCardsService.drawCard().subscribe(result => {
      var card = result.cards[0];
      var dialogRef = null;
      //Goal 3
      var value = this.compareCardsService.compareCards(card.value, this.previousCard);
      if((answer === "Higher" && value > 0) || (answer === "Lower" && value < 0)){
        this.correct++;
        //Goal 4
        dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {questionType: this.questionType, card: card, success: true, correct: this.correct }});
        dialogRef.afterClosed().subscribe(() => {
          this.nextQuestion();
        });
      }
      else{
        dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {questionType: this.questionType, card: card, success: false, correct: this.correct }});
        dialogRef.afterClosed().subscribe(() => {
          this.nextQuestion();
        });
      }
      
    });
  }

  questionThree(answer: string){
    this.questionType = "Last";
    this.deckOfCardsService.drawCard().subscribe(result => {
      var card = result.cards[0];
      var dialogRef = null;
      //Goal 3
      if(answer === card.suit){
        this.correct++;
        //Goal 4
        dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {questionType: this.questionType, card: card, success: true, correct: this.correct }});
        dialogRef.afterClosed().subscribe(() => {
          //Goal 7
          this.dialog.open(ResultScreenComponent, {disableClose: true, data: {questionType: "Final", card: card, success: true, correct: this.correct }});
          this.nextQuestion();
        });
      }
      else{
        dialogRef = this.dialog.open(ResultScreenComponent, {disableClose: true, data: {questionType: this.questionType, card: card, success: false, correct: this.correct }});
        dialogRef.afterClosed().subscribe(() => {
          //Goal 7
          this.dialog.open(ResultScreenComponent, {disableClose: true, data: {questionType: "Final", card: card, success: true, correct: this.correct }});
          this.nextQuestion();
        });
      }
    
    });
  }

  nextQuestion(){
    this.questionNumber++;
    if(this.questionNumber === 2){
      //Goal 5
      this.question = "Is the next card going to be higher or lower than the previous card?";
      this.buttonInputs = [{text: "Higher", textColor: "black", backgroundColor: "white"}, {text: "Lower", textColor: "white", backgroundColor: "black"}];
      this.questionFunction = this.questionTwo;
    }
    else if(this.questionNumber === 3){
      //Goal 6
      this.question = "What is going to be the suit of the next card?";
      this.buttonInputs = [{text: "HEARTS", textColor: "white", backgroundColor: "red"}, {text: "CLUBS", textColor: "white", backgroundColor: "black"},
      {text: "DIAMONDS", textColor: "white", backgroundColor: "red"}, {text: "SPADES", textColor: "white", backgroundColor: "black"}];
      this.questionFunction = this.questionThree;
    }
    else{
      this.start = true;
      this.question = "";
      this.buttonInputs = [];
      this.showQuestion = false;
      this.questionNumber = 0;
      this.questionFunction = Function();
      this.questionType = "";
    }
  }
}
