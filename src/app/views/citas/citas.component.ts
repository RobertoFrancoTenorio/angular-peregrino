import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import moment from 'moment';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { CitaService } from '../../service/cita/cita.service';
import { AccionesCitaComponent } from './acciones-cita/acciones-cita.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  done: boolean = false;

  tablaAsignadas: GridOptions;
  citasAsigData = [];
  totalAsig: number = 0;

  tablaRechazadas: GridOptions;
  citasRechazadasData = [];
  totalRec: number = 0;

  tablaReagendar: GridOptions;
  citasReagendarData = [];
  totalReagendar: number = 0;

  columGral = [
    { width: 60, headerName: 'Item', field: 'item', pinned: 'left' },
    { width: 240, headerName: 'Doctor', field: 'detDoctor.nombre', pinned: 'left' },
    { width: 240, headerName: 'Paciente', field: 'detPaciente.nombre', pinned: 'left' },
    {
      width: 200,
      headerName: 'Fecha de la cita',
      field: 'f_cita',
      cellRenderer: (data) => {
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
      width: 240, headerName: 'Horario',
      cellRenderer: (params) => {
        var div = document.createElement('div');
        div.innerHTML = '<span class="badge" style="background-color: #d9534f">' + params.data.cita_hora_ini + ' - ' + params.data.cita_hora_fin + ' </span>';
        return div;
      }
    },
    { width: 240, headerName: 'Estatus', field: 'estatus' },

  ]
  col_acciones = { width: 240, headerName: 'Acciones', field: 'name', cellRendererFramework: AccionesCitaComponent };

  constructor(
    public datepipe: DatePipe,
    public auth: AuthService,
    private citaServ: CitaService
  ) {
    this.tablaAsignadas = <GridOptions>{
      defaultColDef: {
        sortable: true
      },
      columnDefs: [
        ...this.columGral,
      ],
      onGridReady: () => {
        const allColumnIds = [];
        this.tablaAsignadas.columnApi.getAllColumns().forEach(function (column) {
          allColumnIds.push(column['colId']);
        });
        this.tablaAsignadas.api.setRowData(this.citasAsigData);
      },
      onRowClicked: ($event) => {
      },
      rowData: null,
    };

    this.tablaRechazadas = <GridOptions>{
      defaultColDef: {
        sortable: true
      },
      columnDefs: [
        ...this.columGral,
        this.col_acciones,
      ],
      onGridReady: () => {
        const allColumnIds = [];
        this.tablaRechazadas.columnApi.getAllColumns().forEach(function (column) {
          allColumnIds.push(column['colId']);
        });
        this.tablaRechazadas.api.setRowData(this.citasRechazadasData);
      },
      onRowClicked: ($event) => {
      },
      rowData: null,
    };

    this.tablaReagendar = <GridOptions>{
      defaultColDef: {
        sortable: true
      },
      columnDefs: [
        ...this.columGral,
        this.col_acciones,
      ],
      onGridReady: () => {
        const allColumnIds = [];
        this.tablaReagendar.columnApi.getAllColumns().forEach(function (column) {
          allColumnIds.push(column['colId']);
        });
        this.tablaReagendar.api.setRowData(this.citasReagendarData);
      },
      onRowClicked: ($event) => {
      },
      rowData: null,
    };
  }

  ngOnInit() {
    this.done = true
    this.citaServ.getCitasEstatus('rechazada').subscribe(data => {
      this.citasRechazadasData = data;
      this.totalRec = this.citasRechazadasData.length;
      this.tablaRechazadas.api.setRowData(this.citasRechazadasData);
    })

    this.citaServ.getCitasEstatus('asignada').subscribe(data => {
      this.citasAsigData = data;
      this.totalAsig = this.citasAsigData.length;
      this.tablaAsignadas.api.setRowData(this.citasAsigData);
    })

    this.citaServ.getCitasEstatus('reagendar').subscribe(data => {
      console.log('Reagendar', data)
      this.citasReagendarData = data;
      this.totalReagendar = this.citasReagendarData.length;
      this.tablaReagendar.api.setRowData(this.citasReagendarData);
    })
  }
}
