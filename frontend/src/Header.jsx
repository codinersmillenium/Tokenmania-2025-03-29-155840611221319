import React, { useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor, canisterId } from 'declarations/backend';
import ProfileDropdown from './ProfileDropdown';
const network = process.env.DFX_NETWORK;
const identityProvider =
    network === 'ic'
        ? 'https://identity.ic0.app' // Mainnet
        : ' http://127.0.0.1:4943/?canisterId=' + process.env.CANISTER_ID_INTERNET_IDENTITY; // Local
const Header = ({ setActor, setPrincipal, principal, isAuthenticated, setIsAuthenticated, setBalance, balance }) => {
    const [authClient, setAuthClient] = useState();
    useEffect(() => {
        updateActor();
    }, []);
    async function updateActor() {
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();
        const actor = createActor(canisterId, {
            agentOptions: {
                identity
            }
        });
        const isAuthenticated = await authClient.isAuthenticated();
        setActor(actor);
        setAuthClient(authClient);
        setIsAuthenticated(isAuthenticated);
        setPrincipal(identity.getPrincipal().toString());
        setBalance((await actor.balanceOf()) || 0);
    }
    async function login() {
        await authClient.login({
            identityProvider,
            onSuccess: updateActor,
            windowOpenerFeatures:
                `left=${window.screen.width / 2 - 525}, ` +
                `top=${window.screen.height / 2 - 705},` +
                `toolbar=0,location=0,menubar=0,width=525,height=705`
        });
    }
    async function logout() {
        await authClient.logout();
        updateActor();
    }
    return (
        <header id="home" className="sticky top-0 w-full z-50">
            <nav className="flex items-center bg-white shadow h-16">
                <div className="container__main flex items-center">
                    <a href="#home" className="mr-auto text-xl font-semibold text-sky-500">
                        BionMart
                    </a>
                    <button className="text-lg ml-5 mt-2 md:hidden">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <ul className="md:flex items-center gap-7 text-sm hidden">
                        <li>
                            <svg
                                fill="#000000"
                                width="30px"
                                height="30px"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="m13.58 11.6-1.33-2.18V6.33A4.36 4.36 0 0 0 10 2.26a2.45 2.45 0 0 0 0-.38A1.94 1.94 0 0 0 8 0a1.94 1.94 0 0 0-2 1.88 1.64 1.64 0 0 0 0 .38 4.36 4.36 0 0 0-2.25 4.07v3.09L2.42 11.6a1.25 1.25 0 0 0 1.06 1.9h1.77A2.68 2.68 0 0 0 8 16a2.68 2.68 0 0 0 2.75-2.5h1.77a1.25 1.25 0 0 0 1.06-1.9zM7.25 1.88A.7.7 0 0 1 8 1.25a.7.7 0 0 1 .75.63 6 6 0 0 0-.75 0 5.9 5.9 0 0 0-.75 0zM8 14.75a1.44 1.44 0 0 1-1.5-1.25h3A1.44 1.44 0 0 1 8 14.75zm-4.52-2.5 1.34-2.17.18-.31V6.33a4 4 0 0 1 .6-2.12A2.68 2.68 0 0 1 8 3.12a2.68 2.68 0 0 1 2.4 1.09 4 4 0 0 1 .6 2.12v3.44l.18.31 1.34 2.17z" />
                            </svg>
                        </li>
                        {isAuthenticated && <ProfileDropdown logout={logout} principal={principal} balance={balance} />}
                        {!isAuthenticated && (
                            <button className="rounded__btn rounded-3xl ml-3" onClick={login}>
                                SigIn
                            </button>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};
export default Header;