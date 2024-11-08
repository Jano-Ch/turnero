import { Component , AfterViewInit , ViewChild, ElementRef } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements AfterViewInit{
  @ViewChild('arrow', { static: true }) arrow!: ElementRef;

  ngAfterViewInit() {

    const arrowElement = this.arrow.nativeElement;

    arrowElement.addEventListener('click', this.onArrowClick);
    
  }
  onArrowClick() {
    console.log('¡Hiciste clic en la flecha!');
  }
}
