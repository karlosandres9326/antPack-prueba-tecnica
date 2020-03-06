import { Component, OnInit,Input  } from '@angular/core';
import { Router } from '@angular/router';
import { SalidaService } from '../../../services/salida.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { ReservaComponent } from '../../reservas/reserva/reserva.component';
import { ReservaService } from '../../../services/reserva.service';
import { ReservaInterface } from 'src/app/modelos/reserva';
import { FormGroup } from '@angular/forms';
//import {ViewEncapsulation} from '@angular/core';

// IMPORTACIONES PARA ROLES

import { AuthenticationService } from '../../../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioInterface } from '../../../modelos/usuario';


@Component({
  selector: 'app-salidas-lista',
  templateUrl: './salidas-lista.component.html',
  styleUrls: ['./salidas-lista.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class SalidasListaComponent implements OnInit {
  dataUser:any = null;
  salidas = null;

  constructor(public authService:AuthenticationService,
    private listSalidas: SalidaService, 
    private vehiculoService: VehiculoService,
    private nuevaReserva: MatDialog,
    private router:Router,
    private reservaService: ReservaService
    ) 
    
    { }

      // PROPIEDADES PARA VER ROL ADMIN

  public isAdmin: any = null;
  public userUid: string = null;



  ngOnInit() { 

    
    this.listSalidas.getSalidas().subscribe(
      data => {
        
        this.salidas = data;
        
        
      }
    );

    


  }

  onCreate(){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    this.nuevaReserva.open(ReservaComponent,{panelClass: 'custom-dialog-container'});
      
  }

  

  


 

  

  







  
}
