import { Component, inject, NgZone, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { carpoolAction } from "../../store";

declare const google: any;

@Component({
    selector: 'car-google',
    template: '<span id="google"></span>'
})
export class GoogleComponent implements OnInit {
    ngZone = inject(NgZone)
    store = inject(Store)

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
        this.store.dispatch(carpoolAction.token({ token: response.credential }))
    }
}
