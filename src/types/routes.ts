export interface Route {
  path: string;
  label: string;
}

export const APP_ROUTES = {
  HOME: '/',
  EDITOR: '/editor',
  ORGANIZER: '/organizer',
} as const;
