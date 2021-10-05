import { Component, OnInit } from '@angular/core';
/*Libreria para poder usar Ag Grid ↓*/
import { GridOptions } from 'ag-grid-community';
//Libreria que involucra todo lo que son rutas ↓
import { Router } from '@angular/router';
//Servicio para los doctores en este componente se encarga de vaciar los doctores en la tabla ↓↓↓
import {DoctorService } from '../../service/doctor/doctor.service';
//Componente que contiene los 2 botones para la acciones a realizar con los doctores como modificar o leer
import { AccionesDoctoresComponent } from './acciones-doctores/acciones-doctores.component';


@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.scss']
})
export class DoctoresComponent implements OnInit {

  /*Variable encargada de definir si los datos se han cargando
  o no*/
  done: boolean = true;

  /*Variable de tipo gridOption (agGrid) */
  tablaDoctores: GridOptions;

  doctoresList:any;

  columnDefsFilter = [{
    headerName: 'No.',
    field: 'idNumerico',
    width: 70,
    sort: 'asc',
    filter: "agNumberColumnFilter"
  },
  {
    headerName: 'Nombre Usuario',
    field: 'userName',
    width: 200,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Correo electrónico',
    field: 'email',
    width: 180,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Cédula Profesional',
    field: 'cedula',
    width: 180,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Teléfono',
    field: 'telefono',
    width: 300,
    filter: "agTextColumnFilter"
  },
  {
    width: 100, headerName: 'Estatus', field: 'activo',
    cellRenderer: (params) => {
      var div = document.createElement('div');
      if (params.value) {
        div.innerHTML = '<span style="text-align: center; width: 40px; height: 40px; background-color: #5cb85c; color: white; border-radius: 50%; display: inline-block;" > <i class="fa fa-check"></i> </span>';
      } else {
        div.innerHTML = '<span style="text-align: center; width: 40px; height: 40px; background-color: #d9534f; color: white; border-radius: 50%; display: inline-block;" > <i class="fa fa-times"></i> </span>';
      }
      return div;
    }
  },
  {
    headerName: "Acciones",
    field: "name",
    cellRendererFramework: AccionesDoctoresComponent,
    width: 200,
    pinned: 'right'
  }
];

  constructor(
    private router: Router,
    private DoctorService: DoctorService,
  ) {
    this.tablaDoctores = <GridOptions>{
      columnDefs: this.columnDefsFilter,
      rowData: null,
      onGridReady: () =>{
        console.log('gridReady')
        this.tablaDoctores.api.setRowData(this.doctoresList);
      }
    };
   }
   /*Siempre que usamos una función asincrona debemos colocar el async
   y se complementa con un await*/
  async ngOnInit() {
    await new Promise<void>(resolve => {
      this.DoctorService.getDoctorsList().subscribe(doctores =>{
        console.log(doctores);

        this.doctoresList = doctores;
        if(this.tablaDoctores.api)
        {
          console.log('onInit')
          this.tablaDoctores.api.setRowData(this.doctoresList);
        }
        resolve();
      })
    })
    this.done = true;
  }

  /*Metodo para filtrar a los doctores*/
  onQuickFilterChanged($event) {
    this.tablaDoctores.api.setQuickFilter($event.target.value);
  }

  /*Metodo para el alta de doctores*/
  goToAddDoc(){
    this.router.navigate(['add-doctor']);
  }
}
