import EditNote from '../pages/EditNote/EditNote';
import Page404 from '../pages/Page404/Page404';
import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';

export const privateRoutes = [
  { path: '/notes', component: <MainPage /> },
  { path: '/edit', component: <EditNote /> },
  { path: '/edit/:id', component: <EditNote /> },
  { path: '/error', component: <Page404 /> },
];

export const publicRoutes = [
  { path: '/login', component: <LoginPage /> },
  { path: '/error', component: <Page404 /> },
];
