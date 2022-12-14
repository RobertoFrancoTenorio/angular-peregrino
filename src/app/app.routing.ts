import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { AuthGuard } from './guard/auth/auth.guard';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { AddUsuarioComponent } from './views/usuarios/add-usuario/add-usuario.component'

import { DoctoresComponent } from './views/doctores/doctores.component';

import { PacientesComponent } from './views/pacientes/pacientes.component';
import { ErrorAuthComponent } from './views/error/error-auth/error-auth.component';
import { LogoutComponent } from './views/logout/logout.component';
import { AddDoctorComponent } from './views/doctores/add-doctor/add-doctor.component';
import { AddPacienteComponent } from './views/pacientes/add-paciente/add-paciente.component';
import { CalendarioComponent } from './views/calendario/calendario.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { CitasComponent } from './views/citas/citas.component';
import { ConsultaComponent } from './views/citas/consulta/consulta.component';
import { ConsultasComponent } from './views/citas/consultas/consultas.component';
import { TablaPacientesComponent } from './views/pacientes/tabla-pacientes/tabla-pacientes.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
        data: {
          cat: true,
          categoria: 'Inicio',
          pagina: ''
        }
      },
      {
        path: '403',
        component: ErrorAuthComponent,
        data: {
          title: 'Error 403'
        }
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AuthGuard],
        data: {
          cat: false,
          categoria: 'Catalogos',
          pagina: 'Usuarios'
        }
      },

      {
        path: 'Table',
        component: TablaPacientesComponent,
      },

      {
        path: 'add-user',
        component: AddUsuarioComponent,
        data: {
          cat: false,
          categoria: 'Catalogos',
          pagina: 'Usuarios'
        }
      },
      {
        path: 'calendario',
        component: CalendarioComponent,
        data: {
          cat: false,
          categoria: 'Utilidades',
          pagina: 'Calendario'
        }
      },
      {
        path: 'consultas',
        component: ConsultasComponent,
        data: {
          cat: false,
          categoria: 'Utilidades',
          pagina: 'Calendario'
        }
      },
      {
        path: 'consulta',
        component: ConsultaComponent,
        data: {
          cat: false,
          categoria: 'Utilidades',
          pagina: 'Calendario'
        }
      },
      {
        path: 'doctores',
        component: DoctoresComponent,
        data: {
          title: 'Doctores'
        }
      },

      {
        path: 'add-doctor',
        component: AddDoctorComponent,
        data: {
          title: 'Agregar Doctores'
        }
      },

      {
        path: 'pacientes',
        component: PacientesComponent,
        canActivate: [AuthGuard],
        data: {
          cat: false,
          categoria: 'Catalogos',
          pagina: 'Pacientes'
        }
      },
      {
        path: 'citas',
        component: CitasComponent,
        canActivate: [AuthGuard],
        data: {
          cat: false,
          categoria: 'Administraci??n',
          pagina: 'Citas'
        }
      },
      {
        path: 'add-paciente',
        component: AddPacienteComponent,
        data: {
          title: 'Error 403'
        }
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },

      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
