import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import moment from 'moment';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { CitaService } from '../../service/cita/cita.service';
import { take } from 'rxjs/operators';

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
        //this.currentProsp = $event.data;
      },
      rowData: null,
      //getRowStyle: this.styleSeg,
    };

    this.tablaRechazadas = <GridOptions>{
      defaultColDef: {
        sortable: true
      },
      columnDefs: [
        ...this.columGral,
      ],
      onGridReady: () => {
        const allColumnIds = [];
        this.tablaRechazadas.columnApi.getAllColumns().forEach(function (column) {
          allColumnIds.push(column['colId']);
        });
        this.tablaRechazadas.api.setRowData(this.citasRechazadasData);
      },
      onRowClicked: ($event) => {
        //this.currentProsp = $event.data;
      },
      rowData: null,
      //getRowStyle: this.styleSeg,
    };
  }

  async ngOnInit(): Promise<void> {

    await new Promise<void>((resolve) => {
      this.citaServ.getCitasEstatus('rechazada').pipe(take(1)).subscribe(data => {
        this.citasRechazadasData = data;
        this.totalRec = this.citasRechazadasData.length;
        if (this.tablaRechazadas.api) this.tablaRechazadas.api.setRowData(this.citasRechazadasData);
        resolve();
      })
    })

    await new Promise<void>((resolve) => {
      this.citaServ.getCitasEstatus('asignada').pipe(take(1)).subscribe(data => {
        this.citasAsigData = data;
        this.totalAsig = this.citasAsigData.length;
        if (this.tablaAsignadas.api) this.tablaAsignadas.api.setRowData(this.citasAsigData);
        resolve();
      })
    }).then(() => {
      this.done = true;
    })

  }

}
