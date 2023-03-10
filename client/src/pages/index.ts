import { Admin } from './Admin';
import { Contact } from './Contact';
import { FC } from 'react';
import { Home } from './Home';
import { Offerte } from './Offerte';
import { Paintings } from './Paintings';
import { Winkelmand } from './Winkelmand';

export type Page = {
    component: FC;
    icon: string;
    navText: string;
    inNavbar: boolean;
    path: string;
};
const pages: Page[] = [
    {
        component: Home,
        icon: 'none',
        navText: 'Home',
        inNavbar: true,
        path: '/',
    },
    {
        component: Paintings,
        icon: 'none',
        navText: 'Collecties',
        inNavbar: true,
        path: '/collecties',
    },
    {
        component: Offerte,
        icon: 'none',
        navText: 'Persoonlijk schilderij',
        inNavbar: true,
        path: '/offerte',
    },
    {
        component: Contact,
        icon: 'none',
        navText: 'Contact',
        inNavbar: true,
        path: '/contact',
    },
    {
        component: Winkelmand,
        icon: 'none',
        navText: 'Winkelmand',
        inNavbar: true,
        path: '/winkelmand',
    },
    {
        component: Admin,
        icon: 'none',
        navText: 'Admin',
        inNavbar: false,
        path: '/boekelo-zoo',
    },
];
export { pages };
