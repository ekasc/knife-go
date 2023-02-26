import { Collapse, Dropdown, Link, Navbar, Spacer, Switch, Text } from "@nextui-org/react";
import { Layout } from "./layout";
import MenuItem, { mItem } from '../menu/menuItems';
import { Fragment } from "react";

const formatters = [
	{ key: "json", name: "JSON", desc: "Pretty print JSON with indentation" },
	{ key: "html", name: "HTML", desc: "Pretty print HTML" },
	{ key: "css", name: "CSS", desc: "Minify CSS" }
];

const converters = [
	{ key: "yamltojson", name: "YAML", desc: "Convert YAML to JSON" },
	{ key: "jsontoyaml", name: "JSON", desc: "Convert JSON to YAMl" },
	{ key: "base", name: "Base", desc: "Convert number bases" },
]

const codec = [
	{ key: "base64", name: "Base64", desc: "Encode/Decode Base64" },
	{ key: "html", name: "HTML", desc: "Encode/Decode HTML" },
	{ key: "url", name: "URL", desc: "Encode/Decode URL" },
	{ key: "jwt", name: "JWT", desc: "Encode/Decode JWT" },
]

const generators = [
	{ key: "hash", name: "Hash", desc: "Generate SHA-256, SHA-1, MD5" },
]

const graphic = [
	{ key: "img", name: "Convertion", desc: "Change image format" },
]

const text = [
	{ key: "textdiff", name: "Difference", desc: "Compare texts" },
	{ key: "markdown", name: "Render", desc: "Render markdown" },
]

export const navbarItems = {
	"formatters": formatters,
	"converters": converters,
	"codec": codec,
	"generators": generators,
	"graphic": graphic,
	"text": text,
}

function CollapseItems(props: { item: { key: string, name: string, desc: string }[], title: string }) {
	const title = props.title;
	const item = props.item;
	return (
		<Collapse title={title}>
			{item.map((item, key) => (
				<Fragment key={key}>
					<Link href={`/${title.toLowerCase()}/${item.name.toLowerCase()}`}>{item.name}</Link>
					<Spacer />
				</Fragment>
			))}
		</Collapse >
	)
}

export default function Nav() {
	return (
		<Navbar isBordered variant="floating">
			<Navbar.Toggle showIn="md" />
			<Navbar.Brand
				css={{
					"@md": { w: "12%" }
				}}
			>
				<Text
					b
					size={40}

					css={{
						textGradient: "45deg, $red600 -50%, $yellow600 200%",
					}}
					weight="bold"
				>knife - go
				</Text>
			</Navbar.Brand>
			<MenuItem item={navbarItems.formatters} title="Formatters" />
			<MenuItem item={navbarItems.converters} title="Converters" />
			<MenuItem item={navbarItems.codec} title="Encode-Decode" />
			<MenuItem item={navbarItems.generators} title="Generators" />
			<MenuItem item={navbarItems.graphic} title="Graphic" />
			<MenuItem item={navbarItems.text} title="Text" />
			<Navbar.Content>
				<Switch />
			</Navbar.Content>

			<Navbar.Collapse>
				<Navbar.CollapseItem>
					<Collapse.Group>
						<CollapseItems title="Formatters" item={navbarItems.formatters} />
						<CollapseItems title="Converters" item={navbarItems.converters} />
						<CollapseItems title="Encode/Decode" item={navbarItems.codec} />
						<CollapseItems title="Generators" item={navbarItems.generators} />
						<CollapseItems title="Graphic" item={navbarItems.graphic} />
						<CollapseItems title="Text" item={navbarItems.text} />

					</Collapse.Group>
				</Navbar.CollapseItem>

			</Navbar.Collapse>
		</Navbar>
	)
}

