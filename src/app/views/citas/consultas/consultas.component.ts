import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ConsultaService } from '../../../service/Consulta/consulta.service';
import { AccionesConsultaComponent } from '../acciones-consulta/acciones-consulta.component';
import { AuthService } from '../../../service/auth/auth.service';


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {
  tablaConsultas: GridOptions;
  consultasList: any;
  columnDefsFilter = [
  {
    headerName: 'Fecha de consulta',
    field: 'fecha_consulta',
    width: 200,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Nombre Paciente',
    field: 'consulta_pac_nombre_completo',
    width: 250,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Email',
    field: 'consulta_pac_email',
    width: 250,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Teléfono',
    field: 'consulta_pac_telefono',
    width: 250,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Celular',
    field: 'consulta_pac_celular',
    width: 250,
    filter: "agTextColumnFilter"
  },
  {
    headerName: "Acciones",
    field: "name",
    cellRendererFramework: AccionesConsultaComponent,
    width: 200,
    pinned: 'right'
  }
];
  constructor(
    private ConsultaService: ConsultaService,
    private auth: AuthService,
  ) {
    this.tablaConsultas = <GridOptions>{
      columnDefs: this.columnDefsFilter,
      rowData: null,
      onGridReady: () =>{
        this.tablaConsultas.api.setRowData(this.consultasList);
      }
    };
  }

  async ngOnInit(): Promise<void> {
    await new Promise<void>(resolve => {
      this.ConsultaService.getConsultas(this.auth.currentUserId).subscribe(consultas =>{
        this.consultasList = consultas;
        if(this.tablaConsultas.api)
        {
          this.tablaConsultas.api.setRowData(this.consultasList);
        }
        resolve();
      })
    })
  }
}
