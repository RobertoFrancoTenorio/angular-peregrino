import { Component, OnInit } from '@angular/core';
/*Libreria para poder usar Ag Grid ↓*/
import { GridOptions } from 'ag-grid-community';
//Libreria que involucra todo lo que son rutas ↓
import { Router } from '@angular/router';
//Servicio para los doctores en este componente se encarga de vaciar los doctores en la tabla ↓↓↓
import {DoctorService } from '../../service/doctor/doctor.service';
//Componente que contiene los 2 botones para la acciones a realizar con los doctores como modificar o leer
import { AccionesDoctoresComponent } from './acciones-doctores/acciones-doctores.component';
import { DoctorAPIService } from '../../service/APIServices/DoctorAPI/doctor-api.service';
import { MetodoDeContactoAPIService } from '../../service/APIServices/MetodoDeContactoAPI/metodo-de-contacto-api.service';
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
    field: 'id',
    width: 70,
    sort: 'asc',
    filter: "agNumberColumnFilter"
  },
  {
    headerName: 'Nombre Usuario',
    field: 'doc_nombre_completo',
    width: 250,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Especialidades',
    field: 'doc_especialidades',
    width: 300,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Correo electrónico',
    field: 'doc_email',
    width: 180,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Horario de Inicio',
    field: 'doc_horario_ini',
    width: 180,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Horario de Fin',
    field: 'doc_horario_fin',
    width: 180,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Teléfono',
    field: 'doc_celular_principal',
    width: 150,
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
    private DoctorAPIService: DoctorAPIService,
    private MetodoDeContactoAPIService: MetodoDeContactoAPIService,
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
  async ngOnInit(): Promise<void> {
    this.DoctorAPIService.getDoctoresList().subscribe(doctores =>{
      this.doctoresList = doctores;
        if(this.tablaDoctores.api)
        {
          console.log('onInit')
          this.tablaDoctores.api.setRowData(this.doctoresList);
        }
    })
    this.done = true;
    //this.respaldaDoctores()
  }

  /*Metodo para filtrar a los doctores*/
  onQuickFilterChanged($event) {
    this.tablaDoctores.api.setQuickFilter($event.target.value);
  }

  /*Metodo para el alta de doctores*/
  goToAddDoc(){
    this.router.navigate(['add-doctor']);
  }

  respaldaDoctores(){
    this.DoctorService.getDoctorsList().subscribe(doctor =>{
      let doctores = doctor;
      console.log('doctores', doctores)
      for(let i = 0; i < doctores.length; i++){
        let docSQL = {};
        docSQL['activo'] = true;
        docSQL['doc_cedula'] = doctores[i]['doc_cedula'];
        docSQL['doc_celular_principal'] = doctores[i]['doc_celular_principal'];
        docSQL['doc_dir_calle'] = doctores[i]['doc_dir_calle'];
        docSQL['doc_dir_colonia'] = doctores[i]['doc_dir_colonia'];
        docSQL['doc_dir_cp'] = doctores[i]['doc_dir_cp'];
        docSQL['doc_email'] = doctores[i]['doc_email'];
        docSQL['doc_estado'] = doctores[i]['doc_estado'].toString();
        docSQL['doc_horario_fin'] = doctores[i]['doc_horario_fin'];
        docSQL['doc_horario_ini'] = doctores[i]['doc_horario_ini'];
        docSQL['doc_municipio'] = doctores[i]['doc_municipio'];
        docSQL['doc_nombre'] = doctores[i]['doc_nombre'];
        docSQL['doc_nombre_completo'] = doctores[i]['doc_nombre_completo'];
        docSQL['doc_primer_apellido'] = doctores[i]['doc_primer_apellido'];
        docSQL['doc_segundo_apellido'] = doctores[i]['doc_segundo_apellido'];
        docSQL['doc_curp'] = doctores[i]['doc_curp'];
        docSQL['user_reg'] = doctores[i]['user_reg'];
        this.DoctorAPIService.postDoctor(docSQL).subscribe(data=>{
          console.log('data', data)
          if(doctores[i]['metodos_contacto'].length > 0){
            for(let j = 0; j < doctores[i]['metodos_contacto'].length; j++){
              this.guardaMetodosDeContacto(data.id, doctores[i]['metodos_contacto'][j])
            }
          }
          else{
            console.log('No tiene metodos de contacto')
          }
        })
      }
    })
  }

  guardaMetodosDeContacto(id, POST){
    POST['idDoctor'] = id;
    POST['estatus_metodo_de_contacto'] = 'activo';
    this.MetodoDeContactoAPIService.postMetodo(POST).subscribe(data =>{})
    console.log('id', id),
    console.log('post', POST)
  }
}
