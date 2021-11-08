import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { PacienteService } from '../../service/paciente/paciente.service';
import { AccionesPacienteComponent } from './acciones-paciente/acciones-paciente.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  done: boolean=true;

  tablaPacientes: GridOptions
  pacientesList : any;
  columnDefsFilter = [
    {
      headerName: 'No.',
      field: 'idNumerico',
      width: 70,
      sort: 'asc',
      filter: "agNumberColumnFilter"
    },
    {
      headerName: 'Nombres',
      field: 'pac_nombre_completo',
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
      field: 'pac_celular',
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

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
  ) {
    this.tablaPacientes = <GridOptions>{
      columnDefs: this.columnDefsFilter,
      rowData: null,
      onGridReady: () =>{
        this.tablaPacientes.api.setRowData(this.pacientesList)
      }
    }
  }

  async ngOnInit() {
    await new Promise<void>(resolve => {
      this.pacienteService.getPacientes().subscribe(pacientes =>{
        console.log(pacientes.length)
        this.pacientesList = pacientes;
        if(this.tablaPacientes.api){
          this.tablaPacientes.api.setRowData(this.pacientesList);
        }
          
      })
    })
  }

  goToAddPaciente(){
    this.router.navigate(['add-paciente']);
  }

  /*Metodo para filtrar a los doctores*/
  onQuickFilterChanged($event) {
    this.tablaPacientes.api.setQuickFilter($event.target.value);
  }
}
