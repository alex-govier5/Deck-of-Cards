import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../services/deck-of-cards.service';

export interface DialogParameters{
  questionType: string;
  card: Card;
  success: boolean;
  correct: number;
}


@Component({
  selector: 'app-result-screen',
  templateUrl: './result-screen.component.html',
  styleUrls: ['./result-screen.component.css']
})
export class ResultScreenComponent implements OnInit{
  public title: string = "";
  public body: string = "";
  public buttonText: string = "";
  public image: string = "";
  public resultScreen: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ResultScreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogParameters
  ) {

  }

  ngOnInit(): void {
    if(this.data.questionType === "Regular"){
      this.buttonText = "Next Question";
      
      if(this.data.success){
        this.title = "That is correct!";
        this.image = this.data.card.image;
        this.body = "The card drawn was:";
      }
      else{
        this.title = "That is incorrect!";
        this.body = "The card drawn was:";
        this.image = this.data.card.image;
      }
    }
    else if(this.data.questionType === "Last"){
      this.buttonText = "See Results";
      
      if(this.data.success){
        this.title = "That is correct!";
        this.image = this.data.card.image;
        this.body = "The card drawn was:";
      }
      else{
        this.title = "That is incorrect!";
        this.body = "The card drawn was:";
        this.image = this.data.card.image;
      }
    }
    else{
      this.resultScreen = true;
      this.body = "You got "+this.data.correct+"/3!";
      this.buttonText = "End Game";
      if(this.data.correct === 3){
        this.title = "Congratulations! You Have Won!";
        this.image  ="assets/success.gif";
      }
      else{
        this.title = "You Lose! Better Luck Next Time!";
        this.image = "assets/failure.gif";
      }
    }
  
  }

  onClose(){
    this.dialogRef.close();
  }
}
