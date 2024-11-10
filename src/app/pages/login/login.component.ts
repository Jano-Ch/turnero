import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private auth = inject(Auth);

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Error during sign in:', error);
      });
  }
}