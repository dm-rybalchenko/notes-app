import EditNote from '../pages/EditNote/EditNote';
import Page404 from '../pages/Page404';
import NoteList from '../pages/NoteList/NoteList';
import Login from '../pages/Login/Login';


export const privateRoutes = [
  { path: '/notes', component: <NoteList /> },
  { path: '/error', component: <Page404 /> },
  { path: '/edit', component: <EditNote /> },
  { path: '/edit/:id', component: <EditNote /> },
];

export const publicRoutes = [{ path: '/login', component: <Login /> }];
