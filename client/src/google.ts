const data_client_id="645008399704-qqnqru9a5ivoaus70nqg8nihucn2qruq.apps.googleusercontent.com"
const data_login_uri="https://localhost:4200"

export const google: any = undefined;

function handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
}

window.onload = function () {
    console.log('onload')

    google.accounts.id.initialize({
        client_id: data_client_id,
        login_uri: data_login_uri,
        callback: (response: any) => alert('doeet')
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {
            client_id: data_client_id,
            theme: "outline",
            size: "large"
        }
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}