import { Component, inject, NgZone, OnInit } from "@angular/core";

declare const google: any;

@Component({
    selector: 'car-google',
    template: '<span id="google"></span>'
})
export class GoogleComponent implements OnInit {
    ngZone = inject(NgZone)

    ngOnInit(): void {
        this.initializeGoogleSignIn();
    }

    initializeGoogleSignIn() {
        google.accounts.id.initialize({
            client_id: '645008399704-qqnqru9a5ivoaus70nqg8nihucn2qruq.apps.googleusercontent.com',
            callback: (response: any) => this.handleCredentialResponse(response)
        });

        google.accounts.id.renderButton(
            document.getElementById('google'),
            { theme: 'outline', size: 'large' }  // customization attributes
        );

        google.accounts.id.prompt(); // also display the One Tap dialog
    }

    handleCredentialResponse(response: any) {
        // response.credential is the JWT token
        console.log('Encoded JWT ID token: ' + response.credential);

        // You can decode the JWT token here or send it to your backend for verification
        // For demonstration, we'll just log it

        // If using NgZone, ensure any UI updates are run inside Angular's zone
        this.ngZone.run(() => {
            // Update your application state here, e.g., store user info, navigate, etc.
        });
    }
}
