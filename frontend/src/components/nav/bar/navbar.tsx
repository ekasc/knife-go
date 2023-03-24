import { Navbar, ScrollArea, createStyles, useMantineColorScheme, Group, SegmentedControl, Center, Box, } from '@mantine/core';
import { LinksGroup } from "../menu/menuItems";
import { IconMoon, IconSun } from "@tabler/icons-react";


const formatters = [
	{ label: "JSON", desc: "Pretty print JSON with indentation", link: "/formatters/json" },
	{ label: "HTML", desc: "Pretty print HTML", link: "/formatters/html" },
	{ label: "CSS", desc: "Minify CSS", link: "/formatters/css" }
];

const converters = [
	{ label: "YAML", desc: "Convert YAML to JSON", link: "/converters/yaml" },
	{ label: "JSON", desc: "Convert JSON to YAMl", link: "/converters/json" },
	{ label: "Base", desc: "Convert number bases", link: "/converters/base" },
]

const codec = [
	{ label: "Base64", desc: "Encode/Decode Base64", link: "/encode-decode/base64" },
	{ label: "HTML", desc: "Encode/Decode HTML", link: "/encode-decode/html" },
	{ label: "URL", desc: "Encode/Decode URL", link: "/encode-decode/url" },
	{ label: "JWT", desc: "Encode/Decode JWT", link: "/encode-decode/jwt" },
]

const generators = [
	{ label: "Hash", desc: "Generate SHA-256, SHA-1, MD5", link: "/generators/hash" },
]

const text = [
	{ label: "Difference", desc: "Compare texts", link: "/text/difference" },
	{ label: "Render", desc: "Render markdown", link: "/text/render" },
]

export const navbarItems = [
	{ label: 'Formatters', links: formatters },
	{ label: 'Converters', links: converters },
	{ label: 'Generators', links: generators },
	{ label: 'Encode-Decode', links: codec },
	{ label: 'Text', links: text },
]

const useStyles = createStyles((theme) => ({
	navbar: {
		background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.red[5],
	},
	links: {
		marginLeft: `calc(${theme.spacing.md} *-1)`,
		marginRight: `calc(${theme.spacing.md} *-1)`,
	},

	linksInner: {
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
	},
	toggle: {
		padding: 'auto',
		marginLeft: '16px'
	}
}));

export function ThemeToggle() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	return (
		<Group>
			<SegmentedControl
				value={colorScheme}
				onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
				data={[
					{
						value: 'light',
						label: (
							<Center>
								<IconSun size="1rem" stroke={1.5} />
								<Box ml={10}>Light</Box>
							</Center>
						),
					},
					{
						value: 'dark',
						label: (
							<Center>
								<IconMoon size="1rem" stroke={1.5} />
								<Box ml={10}>Dark</Box>
							</Center>
						),
					},
				]}
			/>
		</Group>
	)
}

export default function Nav(props: { opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>> }) {
	const { classes } = useStyles();
	const links = navbarItems.map((obj) => <LinksGroup {...obj} key={obj.label} />);

	return (
		<Navbar
			p="md"
			width={{ sm: 300 }} className={classes.navbar}
			hiddenBreakpoint="sm"
			hidden={!props.opened}
		>
			<Navbar.Section className={classes.toggle}>
				<ThemeToggle />
			</Navbar.Section>
			<Navbar.Section grow className={classes.links} component={ScrollArea} >
				<div className={classes.linksInner}>
					{links}
				</div>
			</Navbar.Section>
		</Navbar>
	)
}
