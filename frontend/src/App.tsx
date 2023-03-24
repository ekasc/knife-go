import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from "../src/components/nav/bar/navbar";
import ShellHeader from './components/nav/header/header';
import CodecForm from './components/sections/content/codec';
import CodecJWTForm from './components/sections/content/codecJWT';
import ConvertFormBase from './components/sections/content/convertbase';
import ConvertForm from './components/sections/content/convertyj';
import FormatForm from './components/sections/content/formatters';
import GenerateForm from './components/sections/content/generators';
import MarkdownForm from './components/sections/content/markdown';
import TextDiffForm from './components/sections/content/textDiff';
import ErrorPage from './components/sections/error/errorPage';
import { Home } from './components/sections/home/home';


const router = createBrowserRouter([
	{
		path: "/",
		element: <><Home /></>,
		errorElement: <ErrorPage />
	},

	{
		path: "/formatters/json",
		element: <><FormatForm inputTag type="json" /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/formatters/html",
		element: <><FormatForm type="html" inputTag={false} /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/formatters/css",
		element: <><FormatForm type="css" inputTag={false} /></>,
		errorElement: <ErrorPage />
	},

	{
		path: "/converters/yaml",
		element: <><ConvertForm type="yaml" /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/converters/json",
		element: <><ConvertForm type="json" /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/converters/base",
		element: <><ConvertFormBase /></>,
		errorElement: <ErrorPage />
	},

	{
		path: "/encode-decode/base64",
		element: <><CodecForm type="base64" /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/encode-decode/html",
		element: <><CodecForm type="html" /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/encode-decode/url",
		element: <><CodecForm type="url" /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/encode-decode/jwt",
		element: <><CodecJWTForm /></>,
		errorElement: <ErrorPage />
	},

	{
		path: "/generators/hash",
		element: <><GenerateForm /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/text/difference",
		element: <><TextDiffForm /></>,
		errorElement: <ErrorPage />
	},
	{
		path: "/text/render",
		element: <><MarkdownForm /></>,
		errorElement: <ErrorPage />
	},

])

function App() {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: 'dark',
		getInitialValueInEffect: true,
	});

	useHotkeys([['mod + J', () => toggleColorScheme()]]);
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	const [opened, setOpened] = useState(false)

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{ fontFamily: "monospace", colorScheme }} >
				<AppShell
					navbar={<NavBar opened={opened} setOpened={setOpened} />}
					styles={(theme) => ({
						main: { background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
					})}
					header={<ShellHeader opened={opened} setOpened={setOpened} />}
				>
					<RouterProvider router={router} />
				</AppShell>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}

export default App;

