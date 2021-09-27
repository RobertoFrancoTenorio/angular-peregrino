import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems2 = navItems;
  public navItems = [];
  loadMenu: boolean = false;

  constructor(
    private auth: AuthService
  ) {

  }

  async ngOnInit(): Promise<void> {
    
    this.auth.getUserAccount().then(data => {
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
      console.log(this.navItems);
      this.loadMenu = true;
    });
    console.log(navItems);
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
}
