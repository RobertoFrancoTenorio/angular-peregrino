import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { navItems } from '../../_nav';
import { CitaService } from '../../service/cita/cita.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems2 = navItems;
  public navItems = [];
  notificacion: number = 0;
  loadMenu: boolean = false;
  doctor: boolean = false;
  asignadas = null;
  rechazadas = null;
  reagendar = null;

  constructor(
    private auth: AuthService,
    private CitaService: CitaService,
    private router: Router,
  ) {

  }

  ngOnInit(){
    this.auth.getUserAccount().then(data => {
      this.CitaService.getCitasAsignadasDoctor(this.auth.currentUserId).subscribe(citas =>{
        console.log('Citas', citas.length);
        this.notificacion = citas.length
        if(this.auth.userData.is_Doctor == 'Si'){
          this.doctor = true;
        }
        else{
          this.doctor = false;
          console.log('false')
        }
      })
      let categorias = Object.keys(data['permisos']);
      //let subCat = [];

      //for (let cat of categorias) {
      //  subCat = [...subCat, ...Object.keys(data['permisos'][cat])];
      //}
      //console.log(subCat);
      for (let item of this.navItems2) {
        if (item.title) {
          this.navItems.push(item);
        } else {

          if (categorias.includes(item.name)){
            if(item.children){
              let children2=[];
              for(let submenu of item.children){
                if(data['permisos'][item.name][submenu.name]) children2.push(submenu)
              }
              item['children']=children2;
              this.navItems.push(item);
            }
            else this.navItems.push(item);
          }
        }
      }
      //console.log(this.navItems);
      this.loadMenu = true;
    });

    this.CitaService.getCitasEstatus('rechazada').subscribe(data => {
      this.rechazadas = data.length;
    })

    this.CitaService.getCitasEstatus('asignada').subscribe(data => {
      this.asignadas = data.length;
    })

    this.CitaService.getCitasEstatus('reagendar').subscribe(data => {
      this.reagendar = data.length;
    })

    //console.log(navItems);
    //this.navItems=navItems;
    //this.loadMenu = true;
    //console.log(this.navItems)
  }

  toggleMinimize(e) {
    console.log(e)
    this.sidebarMinimized = e;
  }

  logout() {
    console.log('logout');
  }

  calendario(){
    this.router.navigate(['calendario']);
  }
}
