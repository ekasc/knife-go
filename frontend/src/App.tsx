import { NextUIProvider } from '@nextui-org/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from "../src/components/nav/bar/navbar";
import TextForm from "./components/sections/content/TextForm";
import ErrorPage from './components/sections/error/errorPage';
import { Home } from './components/sections/home/home';


const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />
	},
	{
		path: "/format/json",
		element: [<NavBar />, <TextForm />],
		errorElement: <ErrorPage />
	}
])

function App() {
	return (
		<NextUIProvider>
			<RouterProvider router={router} />
		</NextUIProvider>
	)
}

export default App;

