import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent,SidebarComponent,FooterComponent,RouterOutlet,LoaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  sidebarVisible = false;

  toggleSidebarDesdeHeader() {
    this.sidebarVisible = !this.sidebarVisible;
  }

}
