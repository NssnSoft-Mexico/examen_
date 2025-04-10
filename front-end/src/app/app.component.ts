import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './Service/authService/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'WeeClaims';
  title2 = 'Registros';
  titleV = false;
  modalV = false;
  titleModal = 'Datos guardados correctamente';
  validaRes = true;
  errores = {
    compania: false,
    persona: false,
    correo: false,
    telefono: false
  };
  items: any;
  dataFor= {
    compania: '',
    persona: '',
    correo: '',
    telefono: '',
    terminos: false
  };
  checkoutForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {

    this.checkoutForm = this.formBuilder.group({
      compania: ['', Validators.required],
      persona: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      terminos: [false, [Validators.required, Validators.requiredTrue]]
    });
    
  }

  ngOnInit() { }

  async clickTitle() {
    this.titleV = !this.titleV;
    this.title2 = this.titleV?'Formulario':'Registros';
    this.items = await this.authService.getAllRegistro();
    this.checkoutForm.reset();
  }

  async clickRegresar() {
    this.titleV = !this.titleV;
    this.title2 = this.titleV?'Formulario':'Registros';
    this.checkoutForm.reset();
  }
  
  async clickModalVal(valores:any) {
    this.dataFor=valores;
    this.items = await this.authService.setPersona(this.dataFor.compania, this.dataFor.persona, this.dataFor.correo, this.dataFor.telefono);
    console.log("this", this.items)
    if (this.items.errores) {
      this.errores = this.items.errores;
      this.validaRes=false;
      this.titleModal='Error';
    } else {
      this.validaRes=true;
      this.titleModal='Datos guardados correctamente';
    }
    this.modalV = true;
  }
  
  clickModal() {
    if (this.items.errores==undefined) {
      this.checkoutForm.reset();
    }
    this.modalV = !this.modalV;
  }
}
