import { redirect } from 'react-router-dom'

export async function requiredAuth() {
    const isLoggedIn = 1;

    if (!isLoggedIn) {
        throw redirect("/login");
    }

    return null;
}