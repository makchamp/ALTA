import { SideNavOption } from './sidenavOption';

let settings: SideNavOption = {
  title: 'Settings',
  routerLink: 'settings',
  subMenuOptions: [],
}

// These are the menu options listed that can be chosen from the sidenav menu
export const SystemNavListings: SideNavOption[] = [
  {
    title: 'Manage Organizations',
    routerLink: 'manage-organizations',
    subMenuOptions: [],
  },
  {
    title: 'Manage Members',
    routerLink: 'modify-members',
    subMenuOptions: [],
  },
  settings
];

export const OrganizationNavListings: SideNavOption[] = [
  { title: 'Dashboard', routerLink: 'dashboard', subMenuOptions: [] },
  { title: 'Audits', routerLink: 'audits', subMenuOptions: [] },
  {
    title: 'Template',
    routerLink: 'template',
    subMenuOptions: [
    ],
  },
  {
    title: 'Employees',
    routerLink: 'modify-members',
    subMenuOptions: [],
  },
  settings
];
