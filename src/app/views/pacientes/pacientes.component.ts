import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CellClickedEvent, GridOptions } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { PacienteService } from '../../service/paciente/paciente.service';
import { AccionesPacienteComponent } from './acciones-paciente/acciones-paciente.component';
import { AngularFirestore } from '@angular/fire/firestore';

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

  prueba = {}
  total: number;
  paciente: unknown;
  opcion: string;
  pac: string;
  resultado: boolean;
  cant: number;
  pacList = {}
  buscadorActivo: boolean;
  currentPage: number = 1;

  desde: number = 1;
  hasta: number = 5;
  totalPaginasBusqueda: number;
  contadorPaginasBusqueda: number = 1;
  pacientesPorActualizar;

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
    private afs: AngularFirestore,
  ) {
    this.tablaPacientes = <GridOptions>{
      columnDefs: this.columnDefsFilter,
      rowData: null,
      onGridReady: () =>{
        this.tablaPacientes.api.setRowData(this.pacientesList)
        /* this.tablaPacientes.paginationPageSize = 100; */
        this.tablaPacientes.paginationPageSize = 5;
      }
    }
    this.prueba = false;
    this.pacienteService.getPacienteData('counter').subscribe(data => {
      console.log(data['counter'])
      this.total = data['counter'];
    })
    this.opcion = 'default';
    this.paginaActual = 0;
    this.buscadorActivo = false
    this.tablaPacientes.suppressPaginationPanel = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  async ngOnInit() {
    /* this.inicio = 0;
    this.fin = 100; */
    this.inicio = 1;
    this.fin = 6;
    this.setPacientes(this.inicio, this.fin)
  }

  goToAddPaciente(){
    this.router.navigate(['add-paciente']);
  }

  actualizaPacientes(){
    console.log('Actualización')
    let post;
    this.pacienteService.getPacientesPaginados2(31, 50).subscribe(pacientes =>{
      console.log('pacientes', pacientes)
      for(let i = 0; i < pacientes.length; i++){
        let post = pacientes[i]
        post['pac_nombres'] = post['pac_nombres'].toUpperCase();
        post['pac_primer_apellido'] = post['pac_primer_apellido'].toUpperCase();
        post['pac_segundo_apellido'] = post['pac_segundo_apellido'].toUpperCase();
        post['pac_nombre_completo'] = post['pac_nombre_completo'].toUpperCase();
        post['idNumerico'] = i + 1;
        console.log('Post',post)
        new Promise((resolve) =>{
          this.afs.collection('SegMedico').doc('peregrino').collection('Pacientes_Backup').doc(pacientes[i]['id']).set(pacientes[i])
        })

        this.pacienteService.updatePaciente(post);
      }
    })
  }

  /*Metodo para filtrar a los doctores*/
  onQuickFilterChanged($event) {
    this.tablaPacientes.api.setQuickFilter($event.target.value);
  }

  async setPacientes(ini, end){
    console.log('Inicio: ', ini, ',Fin: ', end)
    await new Promise<void>(resolve => {
      this.pacienteService.getPacientesPaginados(ini, end).subscribe(pacientes =>{
        this.pacientesList = pacientes;
        console.log('Pacientes', this.pacientesList)
          this.tablaPacientes.api.setRowData(this.pacientesList);
      })
    })
  }

  async navegacion(band){
    if(band == 1){
      this.currentPage ++
      this.inicio = this.fin
      this.fin = this.fin + 5;
      await new Promise<void>((resolve =>{
        this.pacienteService.getPacientesPaginados(0, this.fin).subscribe(pacientes =>{
          this.pacientesList = pacientes;
          this.tablaPacientes.api.setRowData(this.pacientesList);
          console.log('Pacientes siguientes', pacientes)
        })
        this.tablaPacientes.api.paginationGoToNextPage()
      }))
    }
    else if(band == 2){
      if(this.currentPage > 1){
        this.currentPage --
        this.inicio -= 5
        this.fin -= 5
        this.tablaPacientes.api.paginationGoToPreviousPage()
      }
    }
  }

  goToFirst(){
    this.currentPage = 1;
    this.inicio = 1;
    this.fin = 5;
    this.pacienteService.getPacientesPaginados(1, 6).subscribe(pacientes =>{
      this.pacientesList = pacientes;
      console.log('Type', typeof this.pacientesList)
        this.tablaPacientes.api.setRowData(this.pacientesList);
    })
  }

  goToLast(){
    this.currentPage = 1;
    this.inicio = 1;
    this.fin = 5;
    this.pacienteService.getPacientesPaginados(1468, 1472).subscribe(pacientes =>{
      this.pacientesList = pacientes;
      console.log('Type', this.pacientesList)
        this.tablaPacientes.api.setRowData(this.pacientesList);
    })
  }

  async buscarPaciente(event:any){
    this.buscadorActivo = true;
    this.tablaPacientes.suppressPaginationPanel = false;
    this.pac = (document.getElementById("filtro") as HTMLInputElement).value
    this.opcion = (document.getElementById("select") as HTMLSelectElement).value
    if(this.pac == ''){
      Swal.fire(
        'Busqueda no permitida!',
        'Ingrese un dato correcto!',
        'error'
      )
      this.buscadorActivo = false;
      this.opcion = 'default'
    }
    else{
      console.log('Select value', this.opcion)
      switch (this.opcion) {
        case 'Nombre':
          this.buscador(this.pac.toUpperCase(), 'pac_nombre_completo');
          break;
        case 'Primer Apellido':
          this.buscador(this.pac.toUpperCase(), 'pac_primer_apellido');
          break;
        case 'Segundo Apellido':
          this.buscador(this.pac.toUpperCase(), 'pac_segundo_apellido');
          break;
        default:
          await this.setPacientes(this.inicio, this.fin);
      }
    }

  }

  buscador(paciente, parametro){
    this.buscadorActivo = true;
    (document.getElementById("select") as HTMLSelectElement).value = 'default';
    (document.getElementById("filtro") as HTMLInputElement).value = '';
    this.pacienteService.buscador(paciente, parametro).subscribe(data =>{
      console.log('data', data)
      if(data.length > 0){
        this.resultado = true;
        this.pacientesList = data;
        this.cant = data.length
        this.tablaPacientes.paginationPageSize = 5;
        let paginas = Math.ceil(data.length / 5)
        this.totalPaginasBusqueda = paginas
        console.log('Paginas', paginas)

        this.tablaPacientes.api.setRowData(this.pacientesList);
      }
      else{
        Swal.fire(
          'No hay pacientes con ese dato!',
          'Intente nuevamente!',
          'error'
        )
        this.buscadorActivo = false;
        this.opcion = 'default'
      }
    })
  }

  //#region Funciones navegador para el buscadorActivo
  buscadorSiguientes(){
    if(this.contadorPaginasBusqueda < this.totalPaginasBusqueda){
      this.tablaPacientes.api.paginationGoToNextPage()
      this.desde +=5;
      this.hasta +=5;
      this.contadorPaginasBusqueda ++;
    }
  }

  buscadorAnteriores(){
    if(this.contadorPaginasBusqueda <= 0){
      this.tablaPacientes.api.paginationGoToPreviousPage()
      this.desde -=5;
      this.hasta -=5;
      this.contadorPaginasBusqueda --;
    }

  }
  //#endregion

  async borrarFiltro(){
    this.opcion = 'default'
    this.buscadorActivo = false;
    this.inicio = 1;
    this.fin = 5;
    this.currentPage = 1
    this.setPacientes(1, 6)
  }

  revisaRepetidos(){
    this.pacienteService.getPacientesPaginados(1, 1472).subscribe(pacientes =>{
      for(let i = 0; i < pacientes.length; i++){
      console.log('nombre completo:', pacientes[i]['pac_nombre_completo'])
        this.pacienteService.getIguales(pacientes[i]['pac_nombre_completo']).subscribe(iguales => {
          for(let i = 0; i < iguales.length; i++){
            console.log('nombre:', iguales[i]['pac_nombre_completo'], ' , id:', iguales[i]['id'])
          }
        })
      }
    })
  }
}
