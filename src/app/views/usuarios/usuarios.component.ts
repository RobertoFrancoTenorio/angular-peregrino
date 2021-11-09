import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { AccionesUsuariosComponent } from './acciones-usuarios/acciones-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  done:boolean = false;

  tablaUsuarios: GridOptions;

  usuariosList:any;

  columnDefsFilter = [{
    headerName: 'No.',
    field: 'idNumerico',
    width: 70,
    sort: 'asc',
    filter: "agNumberColumnFilter"
  },
  {
    headerName: 'Nombre Usuario',
    field: 'user_nombre_completo',
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
    width: 100, headerName: 'Estatus', field: 'activo',
    cellRenderer: (params) => {
      var div = document.createElement('div');
      if (params.value) {
        div.innerHTML = '<span style="text-align: center; width: 30px; background-color: #5cb85c; color: white; border-radius: 50%; display: inline-block;" > <i class="fa fa-check"></i> </span>';
      } else {
        div.innerHTML = '<span style="text-align: center; width: 30px; background-color: #d9534f; color: white; border-radius: 50%; display: inline-block;" > <i class="fa fa-times"></i> </span>';
      }
      return div;
    }
  },
    {
    headerName: "Acciones",
    field: "name",
    cellRendererFramework: AccionesUsuariosComponent,
    width: 200,
    pinned: 'right'
  }
  ];

  constructor(
    private router: Router,
    private userServ: UsuarioService
    ) {
    this.tablaUsuarios = <GridOptions>{
      columnDefs: this.columnDefsFilter,
      rowData: null,
      onGridReady: () => {
        console.log('gridRedy')
        this.tablaUsuarios.api.setRowData(this.usuariosList);
      }
    };
  }

  async ngOnInit() {
    await new Promise<void>(resolve=>{
      this.userServ.getUserListAll().subscribe(usuarios=>{
        console.log(usuarios);

        this.usuariosList=usuarios;
        if (this.tablaUsuarios.api) {
          console.log('onInit')
          this.tablaUsuarios.api.setRowData(this.usuariosList);
        }
        resolve();
      })
    })

    this.done=true;
  }

  onQuickFilterChanged($event) {
    this.tablaUsuarios.api.setQuickFilter($event.target.value);
  }

  goToAddUser(){
    console.log('goto')
    this.router.navigate(['add-user']);
  }
}
