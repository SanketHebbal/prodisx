import { Component, OnInit } from '@angular/core';
import { AprojectService } from './aproject.service';
import { FormControl, FormGroup } from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  submitted: boolean;
  showSuccessMessage: boolean;
  message : any;
  form ;

  constructor(private aprojectService: AprojectService , 
              private router: Router ,
              private route : ActivatedRoute,
              private formBuilder: FormBuilder){
              this.form = this.formBuilder.group({
                $key : null,
                name: '',
                description: '' ,
                language : '',
                platform: '',
              });
  }

   ngOnInit() {
  }

  onSubmit() 
  {
    this.submitted = true;
    let key : string;
  
    if (this.form.valid) 
    {
      if (this.form.get('$key').value == null)
      { 
        key = this.aprojectService.insertcproject(this.form.value);
        this.router.navigate(['workspace'] , { queryParams:{ id : key}} )
      }
      
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.form.reset();
    }
  }
}
