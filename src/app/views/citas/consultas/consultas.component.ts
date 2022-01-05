import { Component, Input, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ConsultaService } from '../../../service/consulta/consulta.service';
import { AccionesConsultaComponent } from '../acciones-consulta/acciones-consulta.component';
import { AuthService } from '../../../service/auth/auth.service';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {
  @Input() idPaciente: any;
  tablaConsultas: GridOptions;
  consultasList: any;
  consultas: number = 0;
  columnDefsFilter = [
  {
    width: 200,
    headerName: 'Fecha Consulta',
    field: 'f_consulta',
    cellRenderer: (data) => {
      console.log('Fecha', this.datepipe.transform(data.value.seconds * 1000, 'dd/MM/yyyy HH:mm'))
      return this.datepipe.transform(data.value.seconds * 1000, 'dd/MM/yyyy HH:mm')
    },
    filter: "agDateColumnFilter",
    filterParams: {
      browserDatePicker: true,
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var val = moment(cellValue.seconds * 1000).format('YYYY/MM/DD');
        var cellDate = new Date(val);
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        }
      }
    }
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
    width: 200,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Teléfono',
    field: 'consulta_pac_telefono',
    width: 130,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Celular',
    field: 'consulta_pac_celular',
    width: 130,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Hora de inicio',
    field: 'consulta_hora_inicio',
    width: 150,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Hora de termino',
    field: 'consulta_hora_fin',
    width: 150,
    filter: "agTextColumnFilter"
  },
  {
    headerName: 'Duración',
    field: 'duracion',
    width: 200,
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
    private datepipe: DatePipe
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
    if(this.idPaciente!=null)
    {
      await this.tablaPaciente();
    }
    else{
      await this.tablaParaDoctores();
    }
  }
  onQuickFilterChanged($event) {
    this.tablaConsultas.api.setQuickFilter($event.target.value);
  }

  showId(event){
    console.log('Event', event)
  }

  tablaParaDoctores(){
    return new Promise<void>(resolve => {
      this.ConsultaService.getConsultas(this.auth.currentUserId).subscribe(consultas =>{
        this.consultasList = consultas;
        this.consultas = consultas.length
        if(this.tablaConsultas.api)
        {
          this.tablaConsultas.api.setRowData(this.consultasList);
        }
        resolve();
      })
    })
  }

  tablaPaciente(){
    return new Promise<void>(resolve => {
      this.ConsultaService.getConsultasPac(this.idPaciente).subscribe(consultas =>{
        console.log('Tabla paciente', consultas)
        this.consultasList = consultas;
        this.consultas = consultas.length
        if(this.tablaConsultas.api)
        {
          this.tablaConsultas.api.setRowData(this.consultasList);
        }
        resolve();
      })
    })
  }
}
