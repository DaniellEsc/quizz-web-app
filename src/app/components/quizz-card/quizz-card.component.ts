import { Component, OnInit } from '@angular/core';
import { TriviaApiServiceService } from 'src/app/services/trivia-api-service.service';

@Component({
  selector: 'app-quizz-card',
  templateUrl: './quizz-card.component.html',
  styleUrls: ['./quizz-card.component.css']
})
export class QuizzCardComponent implements OnInit{


  constructor(private triviaService : TriviaApiServiceService){}

  questions: any[] = [];
  score = 0;
  preguntaActual = 0;
  randomQuestion: string [] =[];


  ngOnInit(): void {
    this.ObtenerPreguntas();
  }

  ObtenerPreguntas(){
    this.triviaService.getQuestions().subscribe( data => {
      this.questions = data.results;
      this.randomQuiz();
    })
  }

  handleAnswerClick(answer : string) {
    const currentQuestion = this.questions[this.preguntaActual];
    if (answer === currentQuestion.correct_answer) {
      this.score ++;
    }
    this.preguntaActual++;
    this.randomQuiz();
  }

  randomQuiz(){
    const pregunta = this.questions[this.preguntaActual];
    this.randomQuestion = [...pregunta.incorrect_answers, pregunta.correct_answer];
    this.randomQuestion = this.randomArray(this.randomQuestion);
  }

  randomArray(array : any[]): any[] {

     for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }



  restaurarQuizz() {
    this.preguntaActual = 0;
    this.score = 0;
    this.randomQuiz();
  }

}
