import { Component, OnInit, Input, Inject } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { ReservaInterface } from '../../../modelos/reserva'; 
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificacionService} from '../../../services/notificacion.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { ListaPasajerosComponent } from '../lista-pasajeros/lista-pasajeros.component';


// IMPORTACIONES PARA ROLES

import { AuthenticationService } from '../../../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioInterface } from '../../../modelos/usuario';




@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  idUser: String; // ya la puedes usar como variable, solamente la agregas


  createFormGroup(){

    return new FormGroup({
      id: new FormControl(''),
      cedula: new FormControl('', [Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      puesto: new FormControl('', [Validators.required]), 
      userUid: new FormControl('')
      

      

    });
  }

  public reservaForm: FormGroup;

  

  constructor(private reservaService: ReservaService, 
    private notificacionService: NotificacionService,
    public dialogRef: MatDialogRef<ReservaComponent>,
    private nuevoReserva: MatDialog,
    private authService: AuthenticationService
    
    ) {

    this.reservaForm = this.createFormGroup();
   }

   public isAdmin: any = null;
    public userUid: String = null;

   private reservas: ReservaInterface[];

   mostrar: boolean = true;

   onToggle(){
     this.mostrar = !this.mostrar;
     this.idUser = localStorage.getItem("idUsuario");
   }

  
  
  

 

  ngOnInit() {

    this.idUser = localStorage.getItem("idUsuario");
    console.log(this.idUser);

    this.getListReservas();
    this.getCurrentUser();
    



  }

 
  // Guardar los valores del formulario nueva RESERVA

  onSaveReserva(reservaForm: FormGroup){

  
        console.log(reservaForm.value.id);
        
        if(reservaForm){
          reservaForm.value.userUid = this.idUser;
          this.reservaService.addReserva(reservaForm.value);
          
         
          
        }

        this.reservaForm.reset();

  }

  // PARA VERIFICAR SI ES ADMIN DESPUES DE AUTENTICADO

  getCurrentUser(){
    this.authService.isAuthenticated().subscribe(auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }

      //console.log("ID USER",auth.uid);
      localStorage.setItem("idUsuario", auth.uid); //donde necesitas agregar ese dato, indicame el modal..OK
    })
  }


  getListReservas(){
    this.reservaService.getReservas().subscribe(reservas => {
    this.reservas = reservas;
 
    });
  }




  

  // Limpiar Formulario

  onResetForm(){
    this.reservaForm.reset();
  }

 
  get id() { return this.reservaForm.get('id');}
  get cedula() { return this.reservaForm.get('cedula');}
  get nombre() { return this.reservaForm.get('nombre');}
  get apellido() { return this.reservaForm.get('apellido');}
  get edad(){ return this.reservaForm.get('edad');}
  get telefono() { return this.reservaForm.get('telefono');}
  get email() { return this.reservaForm.get('email');}
  get puesto() { return this.reservaForm.get('puesto');}


  onClose(){
    
    
    this.reservaForm.reset();
    this.dialogRef.close();
  }


  initiliazeFormGroup(){

    this.reservaForm.setValue(
      {

        id:'',
        cedula: '',
        nombre: '',
        apellido:'',
        edad: '',
        telefono: '',
        email: '',
        puesto: ''
        

      }
    );

  }




  




 

  

 

  

}
