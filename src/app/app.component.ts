import { Component } from '@angular/core';
import { ButtonProperties } from './question/question.component';

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
  public questionNumber: number;

  constructor(){
    this.start = true;
    this.question = "";
    this.buttonInputs = [];
    this.showQuestion = false;
    this.questionNumber = 0;
  }

  startGame(){
    //Goal 2
    this.start = false;
    this.question = "Is the next card going to be red or black?";
    this.buttonInputs = [{text: "Red", textColor: "white", backgroundColor: "red"}, {text: "Black", textColor: "white", backgroundColor: "black"}];
    this.showQuestion = true;
    this.questionNumber = 1;
  }

  nextQuestion(){
    this.questionNumber++;
    if(this.questionNumber === 2){
      //Goal 5
      this.question = "Is the next card going to be higher or lower than the previous card?";
      this.buttonInputs = [{text: "Higher", textColor: "black", backgroundColor: "white"}, {text: "Lower", textColor: "white", backgroundColor: "black"}];
    }
    else if(this.questionNumber === 3){
      //Goal 6
      this.question = "What is going to be the suit of the next card?";
      this.buttonInputs = [{text: "HEARTS", textColor: "white", backgroundColor: "red"}, {text: "CLUBS", textColor: "white", backgroundColor: "black"},
      {text: "DIAMONDS", textColor: "white", backgroundColor: "red"}, {text: "SPADES", textColor: "white", backgroundColor: "black"}];
    }
    else{
      this.start = true;
      this.question = "";
      this.buttonInputs = [];
      this.showQuestion = false;
      this.questionNumber = 0;
    }
  }
}
