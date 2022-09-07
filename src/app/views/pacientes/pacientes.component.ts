import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { PacienteService } from '../../service/paciente/paciente.service';
import { PacienteAPIService } from '../../service/APIServices/PacienteAPI/paciente-api.service';
import { AccionesPacienteComponent } from './acciones-paciente/acciones-paciente.component';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit, OnChanges {
  inicio: number;
  fin: number;
  done: boolean=true;
  paginaActual: number;

  tablaPacientes: GridOptions
  pacientesList : any;
  columnDefsFilter = [
    {
      headerName: 'No.',
      field: 'idPaciente',
      width: 70,
      sort: 'asc',
      filter: "agNumberColumnFilter"
    },
    {
      headerName: 'Nombres',
      field: 'pac_Nombre_Completo',
      width: 300,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Correo electrónico',
      field: 'pac_email',
      width: 250,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Celular',
      field: 'pac_Celular',
      width: 180,
      filter: "agTextColumnFilter"
    },
    {
      headerName: 'Tipo de Paciente',
      field: 'pac_tipo',
      width: 180,
      filter: "agTextColumnFilter",
      cellRenderer: (params) => {
        if(params.data.pac_tipo=='titular'){
          var div = document.createElement('div');
          div.innerHTML = params.data.pac_tipo + '  <span class="badge" style="background-color: #d9534f"> '+ params.data.pac_cant_adicionales + '</span>';
          return div;
        }else{
          var div = document.createElement('div');
          div.innerHTML = params.data.pac_tipo;
          return div;
        }

      }
    },
    {
      headerName: "Acciones",
      cellRendererFramework: AccionesPacienteComponent,
      width: 500,
      pinned: 'right'
    }
  ]

  pacienteETLAdicional = [];
  paciente: Object;

  constructor(
    private router: Router,
    private PacienteService: PacienteService,
    private PacienteAPI: PacienteAPIService,
  ) {
    this.tablaPacientes = <GridOptions>{
      columnDefs: this.columnDefsFilter,
      rowData: null,
      onGridReady: () =>{
        this.tablaPacientes.api.setRowData(this.pacientesList)
        this.tablaPacientes.paginationPageSize = 100;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
    this.setPacientes()
  }

  /*Metodo para filtrar a los doctores*/
  onQuickFilterChanged($event) {
    this.tablaPacientes.api.setQuickFilter($event.target.value);
  }

  setPacientes(){
    this.PacienteAPI.getPacientesList().subscribe(data => {
      this.pacientesList = data
      this.tablaPacientes.api.setRowData(this.pacientesList);
    })
  }

  goToAddPaciente(){
    this.router.navigate(['add-paciente']);
  }

  guardaPacientes(){
    this.PacienteService.getPacientesPaginados(1,3).subscribe(titulares =>{
      let adicionales = [];
      for(let i = 0; i < titulares.length; i++){

        if(titulares[i]['pac_tipo'] == 'titular'){
          console.log(titulares[i]['id'])
          let pacienteETL = {};
          pacienteETL['pac_Nombres'] = titulares[i]['pac_nombres'];
          pacienteETL['pac_Primer_Apellido'] = titulares[i]['pac_primer_apellido'];
          pacienteETL['pac_Segundo_Apellido'] = titulares[i]['pac_segundo_apellido'];
          pacienteETL['pac_Nombre_Completo'] = titulares[i]['pac_nombre_completo'];
          pacienteETL['pac_CURP'] = titulares[i]['pac_curp'];
          pacienteETL['pac_f_nacimiento'] = titulares[i]['pac_f_nacimiento'];
          pacienteETL['pac_tipo'] = titulares[i]['pac_tipo'];
          pacienteETL['pac_Email'] = titulares[i]['pac_email'];
          pacienteETL['pac_Telefono'] = titulares[i]['pac_telefono'];
          pacienteETL['pac_Celular'] = titulares[i]['pac_celular'];
          pacienteETL['pac_Estado_Civil'] = titulares[i]['pac_estado_civil'];
          pacienteETL['pac_Escolaridad'] = titulares[i]['pac_Escolaridad'];
          pacienteETL['pac_Pais'] = titulares[i]['pac_pais'];
          pacienteETL['pac_Sexo'] = titulares[i]['pac_sexo'];
          pacienteETL['pac_Estado'] = titulares[i]['pac_estado'];
          pacienteETL['pac_Municipio'] = titulares[i]['pac_municipio'];
          pacienteETL['pac_Localidad'] = titulares[i]['pac_localidad'];
          pacienteETL['pac_dir_CP'] = titulares[i]['pac_dir_cp'];
          pacienteETL['pac_dir_calle'] = titulares[i]['pac_dir_calle'];
          pacienteETL['pac_dir_colonia'] = titulares[i]['pac_dir_colonia'];
          pacienteETL['pac_dir_comentarios'] = titulares[i]['pac_dir_comentarios'];
          pacienteETL['id_titular'] = '';
          pacienteETL['Parentezco'] = '';
          pacienteETL['user_reg'] = titulares[i]['user_reg'];
          pacienteETL['activo'] = titulares[i]['activo'];
          pacienteETL['empresa'] = titulares[i]['empresa'];
          pacienteETL['created_at'] = '';
          this.PacienteAPI.postPaciente(pacienteETL).subscribe(data => {
            this.paciente = data;
            for(let j = 0; j < titulares[i]['pac_adicionales'].length; j++) {
              this.PacienteService.getPacienteData(titulares[i]['pac_adicionales'][j].id).subscribe(data => {
                let pacienteETLAdicional = {};
                pacienteETLAdicional['pac_Nombres'] = data['pac_nombres'];
                pacienteETLAdicional['pac_Primer_Apellido'] = data['pac_primer_apellido'];
                pacienteETLAdicional['pac_Segundo_Apellido'] = data['pac_segundo_apellido'];
                pacienteETLAdicional['pac_Nombre_Completo'] = data['pac_nombre_completo'];
                pacienteETLAdicional['pac_CURP'] = data['pac_curp'];
                pacienteETLAdicional['pac_f_nacimiento'] = data['pac_f_nacimiento'];
                pacienteETLAdicional['pac_tipo'] = data['pac_tipo'];
                pacienteETLAdicional['pac_Email'] = data['pac_email'];
                pacienteETLAdicional['pac_Telefono'] = data['pac_telefono'];
                pacienteETLAdicional['pac_Celular'] = data['pac_celular'];
                pacienteETLAdicional['pac_Estado_Civil'] = data['pac_estado_civil'];
                pacienteETLAdicional['pac_Escolaridad'] = data['pac_escolaridad'];
                pacienteETLAdicional['pac_Pais'] = data['pac_pais'];
                pacienteETLAdicional['pac_Sexo'] = data['pac_sexo'];
                pacienteETLAdicional['pac_Estado'] = data['pac_estado'];
                pacienteETLAdicional['pac_Municipio'] = data['pac_municipio'];
                pacienteETLAdicional['pac_Localidad'] = data['pac_localidad'];
                pacienteETLAdicional['pac_dir_CP'] = data['pac_dir_cp'];
                pacienteETLAdicional['pac_dir_calle'] = data['pac_dir_calle'];
                pacienteETLAdicional['pac_dir_colonia'] = data['pac_dir_colonia'];
                pacienteETLAdicional['pac_dir_comentarios'] = data['pac_dir_comentarios'];
                pacienteETLAdicional['Parentezco'] = data['pac_parentesco'];
                pacienteETLAdicional['user_reg'] = data['user_reg'];
                pacienteETLAdicional['activo'] = data['activo'];
                pacienteETLAdicional['empresa'] = data['empresa'];
                pacienteETLAdicional['created_at'] = '';
                this.guardaAdicionales(this.paciente['idPaciente'], pacienteETLAdicional)
              })
            }
          })
        }
      }
    })
  }

  guardaAdicionales(idTitular, adicional){
    adicional['id_titular'] = idTitular;

    console.log('POST', adicional)
    this.PacienteAPI.postPaciente(adicional).subscribe(data =>{

    })
  }

}
