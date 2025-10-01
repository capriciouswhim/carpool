import { Component, inject, signal, AfterViewInit } from "@angular/core";
import { Store } from "@ngrx/store";

declare const google: any;
const data_client_id = "645008399704-qqnqru9a5ivoaus70nqg8nihucn2qruq.apps.googleusercontent.com";

@Component({
    selector: 'car-google',
    templateUrl: 'google.component.html',
    styleUrl: 'google.component.scss'
})
export class GoogleComponent implements AfterViewInit {
    store = inject(Store)
    token = signal<any>(null)

    ngAfterViewInit() {
        // window.setTimeout(() => {
            const element = document.getElementById('g_id_onload')
            element?.setAttribute('data-client_id', data_client_id);
            this.initializeGoogleSignIn();
        // },1000)
    }

    decodeJWT(token: string) {
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    }

    initializeGoogleSignIn() {
        google.accounts.id.initialize({
            client_id: data_client_id,
            callback: (response: any) => this.handleCredentialResponse(response)
        });

        google.accounts.id.renderButton(
            document.getElementById('g_id_signin'),{

        });
        google.accounts.id.prompt(); // also display the One Tap dialog
    }

    handleCredentialResponse(response: any) {
        console.log("Encoded JWT ID token: " + response.credential);
        const responsePayload = this.decodeJWT(response.credential);
        console.dir(responsePayload);
        this.token.set({
            email: responsePayload.email,
            hd: responsePayload.hd,
            name: responsePayload.name,
            picture: responsePayload.picture,
            sub: responsePayload.sub,
        });
    }
}
