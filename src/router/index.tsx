import EditNote from '../pages/EditNote/EditNote';
import Page404 from '../pages/Page404';
import Login from '../pages/Login/Login';
import MainPage from '../pages/NoteList/MainPage';


export const privateRoutes = [
  { path: '/notes', component: <MainPage /> },
  { path: '/error', component: <Page404 /> },
  { path: '/edit', component: <EditNote /> },
  { path: '/edit/:id', component: <EditNote /> },
];

export const publicRoutes = [{ path: '/login', component: <Login /> }];
