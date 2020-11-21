import { ListService } from './../../services/list.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  
  simpleForm: FormGroup;
  alertActive: boolean = false;
  showSpinner: boolean = false;

  constructor( private fb: FormBuilder, private router: Router, private dialog: MatDialog, private listService: ListService) {

   }

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    this.simpleForm = this.fb.group({
      'Name': new FormControl('', Validators.required),
      'Email': new FormControl('', [Validators.required, Validators.pattern(emailregex)]),
      'Number': new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{10}")] ),
      'Message': new FormControl(''),
      'Gender': new FormControl('', Validators.required )
    });
  }

  submit() {
    this.alertActive=true;
    this.showSpinner=true;
    this.listService.addToList(this.simpleForm.value);
    console.log(JSON.stringify(this.listService.getList()));
    this.showSpinner=false;
    this.formDirective.resetForm();
    setTimeout(() =>{
      this.alertActive=false;
    }, 2000);
  }

  getNameError() {
    return this.simpleForm.get('Name').hasError('required') ? 'Field is required' :
    this.simpleForm.get('Name').hasError('touched') ? 'Field is required' :
    this.simpleForm.get('Name').markAsTouched();
  }
  
  getEmailError() {
    return this.simpleForm.get('Email').hasError('required') ? 'Field is required' :
      this.simpleForm.get('Email').hasError('pattern') ? 'Not a valid Email' : 
      this.simpleForm.get('Email').hasError('touched') ? 'Field is required' :
      this.simpleForm.get('Email').markAsTouched();
  }
  
  getNumberError() {
    return this.simpleForm.get('Number').hasError('required') ? 'Field is required' :
      this.simpleForm.get('Number').hasError('pattern') ? 'Number must be of 10 digits' : 
      this.simpleForm.get('Number').hasError('touched') ? 'Field is required' :
      this.simpleForm.get('Number').markAsTouched();
  }


}
