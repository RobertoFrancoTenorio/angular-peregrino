import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../../service/paciente/paciente.service';
import { ExporterService } from '../../../service/service/exporter.service';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.scss']
})


export class TablaPacientesComponent implements OnInit {
  listPacientes: unknown[];
  paciente: any[] = [{}];

  constructor(
    private pacientes: PacienteService,
    private exporter: ExporterService
  ) { }

  ngOnInit(): void {
    let pac;
    this.pacientes.getPacientes().subscribe(pacientes =>{
      pac = pacientes;
      console.log('Pacientes Totales:', pac.length)
    })
    /* this.pacientes.getPacientesTipo('titular').subscribe(pacientes =>{
      pac = pacientes;
      this.listPacientes = pacientes
      console.log('Pacientes Titulares:', pacientes)
    }) */
    /*this.pacientes.getPacientesTipo('adicional').subscribe(pacientes =>{
      console.log('Pacientes Adicionales: ', pacientes)
      pac = pacientes;
      console.log('Pacientes adicional:', pac.length)
    }) */

  }

  getXLSX(){
    this.exporter.exportToExcel(this.listPacientes, 'my_export');
  }

  guardaDatos(){
    for(let i=0; i<this.listPacientes.length; i++){
      this.paciente[i]['nombre'] = (this.listPacientes[i]['pac_nombre_completo'])
    }
    console.log('Lista de Pacientes', this.paciente)
  }

}
