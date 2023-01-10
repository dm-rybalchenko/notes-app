import Notes from "../pages/NotesPage";
import EditNote from "../pages/EditNote";
import Page404 from "../pages/Page404";


export const routes = [
	{path: '/notes', component: <Notes />},
	{path: '/error', component: <Page404 />},
	{path: '/notes/:id', component: <EditNote />},
]