import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'glice-angular';

  public resultado: string;
  angForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      glicoseAtual: ['', Validators.required ],
      glicoseAnterior: [''],
      infusaoAtual: ['']
    });
  }

  ngOnInit() {
    this.resultado = '';

  }



  public calcular(infusao: number, glicoseAtual: number, glicoseAnterior: number): void {

    const gatual = this.calularFaixa(glicoseAtual);
    const ganter = this.calularFaixa(glicoseAnterior);

    if (gatual === 0) {
      this.resultado = 'Pare a infusão, administre 20ml de glicose 50% (EV), '
        + 'reavalie em 30 minutos e repita a glicose até atingir a glicemia 140 mg/dl. '
        + 'Imediatamente após, reiniciar a infusão com 50% da dose anterior ';
      return;
    } else if (gatual === 1 && ganter === 0) {
      this.resultado = 'Ajustar a infusão para ' + (infusao - 1) + ' UI/h ';
    } else if (gatual === 2 && (ganter === 0 || ganter === 1 || ganter === 2)) {
      this.resultado = 'Sem mudança';
    } else if (gatual === 3 && ganter === 0) {
      this.resultado = 'Ajustar a infusão para ' + (+infusao + 1) + ' UI/h ';
    } else if (gatual === 4 && ganter === 0) {
      this.calcularMax(infusao, 1.25, 2);
    } else if (gatual === 5 && ganter === 0) {
      this.calcularMax(infusao, 1.33, 2.5);
    } else if (gatual === 1 && (ganter === 1 || ganter === 2)) {
      this.calcularMin(infusao, 0.25, 0.5);
    } else if (gatual === 1 && (ganter === 3 || ganter === 4 || ganter === 5)) {
      this.calcularMin(infusao, 0.5, 2);

    } else if (gatual === 1 && (ganter === 6 || ganter === 7)) {
      this.calcularMin(infusao, 0.75, 2);
    } else if (gatual === 2 && ganter === 3) {
      this.calcularMin(infusao, 0.25, 0.5);
    } else if (gatual === 2 && (ganter === 4 || ganter === 5 || ganter === 6 || ganter === 7)) {
      this.calcularMin(infusao, 0.5, 2);
    } else if (gatual === 3 && ganter === 0) {
      this.resultado = 'Ajustar a infusão para ' + (+infusao + 1) + ' UI/h ';
    } else if (gatual === 3 && (ganter === 1 || ganter === 2)) {
      this.resultado = 'Ajustar a infusão para ' + (+infusao + 0.5) + ' UI/h ';
    } else if (gatual === 3 && ganter === 3) {
      this.calcularMax(infusao, 1.25, 1);
    } else if (gatual === 3) {
      this.calcularMin(infusao, 0.25, 0.5);
    } else if (gatual === 4 && (ganter === 0 || ganter === 1 || ganter === 2)) {
      this.calcularMax(infusao, 1.25, 2);
    } else if (gatual === 4 && (ganter === 3 || ganter === 4 || ganter === 5)) {
      this.calcularMax(infusao, 1.25, 1);
    } else if (gatual === 4 && ganter === 6) {
      this.calcularMax(infusao, 0, 1);
    } else if (gatual === 4 && ganter === 7) {
      this.resultado = 'Sem mudança';
    } else if (gatual === 5 && (ganter === 0 || ganter === 1)) {
      this.calcularMax(infusao, 1.33, 2.5);
    } else if (gatual === 5 && ganter === 2) {
      this.calcularMax(infusao, 1.25, 1.5);
    } else if (gatual === 5 && ganter === 3) {
      this.calcularMax(infusao, 1.25, 1);
    } else if (gatual === 5 && ganter === 4) {
      this.calcularMax(infusao, 0, 1);
    } else if (gatual === 5 && ganter === 5) {
      this.calcularMax(infusao, 0, 1.5);
    } else if (gatual === 5 && ganter === 6) {
      this.calcularMax(infusao, 1.25, 2);
    } else if (gatual === 5 && ganter === 7) {
      this.resultado = 'Sem mudança';
    } else if (gatual === 6) {
      this.calcularMax(infusao, 1.4, 3);
    } else if (gatual === 7) {
      this.calcularMax(infusao, 1.5, 4);
    }

  }
  calcularMin(infusao: number, percetual, fixo) {
    const min = Math.min((+infusao - (+infusao * percetual)), +infusao - fixo);
    this.resultado = 'Ajustar a infusão para ' + (Math.round(min * 100) / 100) + ' UI/h ';
  }


  calcularMax(infusao: number, percetual, fixo) {
    const max = Math.max((+infusao * percetual), +infusao + fixo);
    this.resultado = 'Ajustar a infusão para ' + (Math.round(max * 100) / 100) + ' UI/h ';
  }

  calularFaixa(glicose): number {
    if (glicose < 101) {
      return 0;
    } else if (glicose >= 101 && glicose <= 140) {
      return 1;
    } else if (glicose >= 141 && glicose <= 180) {
      return 2;
    } else if (glicose >= 181 && glicose <= 200) {
      return 3;
    } else if (glicose >= 201 && glicose <= 250) {
      return 4;
    } else if (glicose >= 251 && glicose <= 300) {
      return 5;
    } else if (glicose >= 301 && glicose <= 400) {
      return 6;
    } else if (glicose > 400) {
      return 7;
    }

  }

}
