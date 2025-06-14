import "react"
import {SignIn, SignUp, SignedOut, SignedIn} from "@clerk/clerk-react";

export function AuthenticationPage(){
    return <div className="auth-container">
        <SignedOut>
            <SignIn routing="path" path="/sign-in"/>
            <SignIn routing="path" path="/sign-up"/>
        </SignedOut>
        <SignedIn>
            <div className="redirect-message">
                <p>You are Already signed in.</p>
            </div>
        </SignedIn>
    </div>
}
