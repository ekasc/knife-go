import { NextUIProvider } from '@nextui-org/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from "../src/components/nav/bar/navbar";
import CodecForm from './components/sections/content/codec';
import CodecJWTForm from './components/sections/content/codecJWT';
import ConvertFormBase from './components/sections/content/convertbase';
import { ConvertForm } from './components/sections/content/convertyj';
import FormatForm from "./components/sections/content/formatters";
import ErrorPage from './components/sections/error/errorPage';
import { Home } from './components/sections/home/home';


const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />,

	},
	{
		path: "/formatters/json",
		element: <><NavBar /><FormatForm disabled={false} type='json' /></>,
		errorElement: <ErrorPage />,
	},
	{
		path: "/formatters/css",
		element: <><NavBar /><FormatForm disabled type='css' /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/formatters/html",
		element: <><NavBar /><FormatForm disabled type='html' /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/converters/yaml",
		element: <><NavBar /><ConvertForm type='yaml' /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/converters/json",
		element: <><NavBar /><ConvertForm type='json' /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/converters/base",
		element: <><NavBar /><ConvertFormBase /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/encode-decode/base64",
		element: <><NavBar /><CodecForm type="base64" disable1={false} disable2={false} /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/encode-decode/html",
		element: <><NavBar /><CodecForm type="html" disable1={false} disable2={false} /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/encode-decode/url",
		element: <><NavBar /><CodecForm type="url" disable1={false} disable2={false} /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/encode-decode/jwt",
		element: <><NavBar /><CodecJWTForm type="jwt" /></>,
		errorElement: <ErrorPage />
	},



])

function App() {
	return (
		<NextUIProvider>
			<RouterProvider router={router} />
		</NextUIProvider>
	)
}

export default App;

