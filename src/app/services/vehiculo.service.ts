import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { VehiculoInterface } from '../modelos/vehiculo';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import {NotificacionService} from '../services/notificacion.service';
import { ConductorService} from '../services/conductor.service';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

 
  array: number[];



  constructor(private afs: AngularFirestore, 
    private notificacionService: NotificacionService,
    private storage: AngularFireStorage
    ) { 
      this.vehiculosCollection = afs.collection<VehiculoInterface>('vehiculos')
      this.vehiculos = this.vehiculosCollection.valueChanges();
    }

    private vehiculosCollection: AngularFirestoreCollection<VehiculoInterface>;
    private vehiculos: Observable<VehiculoInterface[]>;
    private vehiculoDoc: AngularFirestoreDocument<VehiculoInterface>;
    private vehiculo: Observable<VehiculoInterface>;

    public selectedVehiculo: VehiculoInterface = {id: null}
    
    

  // METODOS CRUD VEHICULOS


  getVehiculos(){
    return this.vehiculos = this.vehiculosCollection.snapshotChanges()
    .pipe(map (changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as VehiculoInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }


  getOneVehiculo(idVehiculo: string){
    this.vehiculoDoc = this.afs.doc<VehiculoInterface>(`vehiculos/${idVehiculo}`);
    return this.vehiculo = this.vehiculoDoc.snapshotChanges().pipe(map(action=>{
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as VehiculoInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  
  }

   // CREATE VEHICULO

   addVehiculo(vehiculo: VehiculoInterface): void{
    
    this.vehiculosCollection.add(vehiculo);
    this.notificacionService.exitoso("Agregado Exitosamente");
  
  }

  // UPDATE VEHICULO

  updateVehiculo(vehiculo: VehiculoInterface){
    let idVehiculo = vehiculo.id;
    this.vehiculoDoc = this.afs.doc<VehiculoInterface>(`vehiculos/${idVehiculo}`);
    this.vehiculoDoc.update(vehiculo);
 
  }

    // DELETE VEHICULO

    deleteVehiculo(idVehiculo: string): void{
      this.vehiculoDoc = this.afs.doc<VehiculoInterface>(`vehiculos/${idVehiculo}`);
      this.vehiculoDoc.delete();
      this.notificacionService.eliminado(" Eliminado Exitosamente ");
    }








 
}
