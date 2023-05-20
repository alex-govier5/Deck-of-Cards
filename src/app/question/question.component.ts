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
  @Input() public questionFunction: Function = Function();
  public previousCard: string = "";
  public correct: number = 0;
  @Output() nextQuestionEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private deckOfCardsService: DeckOfCardsService, public dialog: MatDialog, private compareCardsService: CompareCardsService){
    //Goal 1
    this.deckOfCardsService.createShuffledDeck().subscribe(result => {
      console.log(result);
    })
  }

  answerQuestion(answer:string){
    this.questionFunction(answer);
  }

  nextQuestion(){
    this.nextQuestionEmitter.emit();
  }

}
