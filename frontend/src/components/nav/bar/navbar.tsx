import React, { Component } from 'react';
import { Navbar, Button, Link, Text, Dropdown } from "@nextui-org/react";
import { Layout } from "./layout";
import MenuItem from '../menu/menuItems';

const formatters = [
	{ key: "json", name: "JSON", desc: "Pretty print JSON with indentation" },
	{ key: "html", name: "HTML", desc: "Pretty print HTML" },
	{ key: "css", name: "CSS", desc: "Minify CSS" }
];

const converters = [
	{ key: "YAMLtoJSON", name: "YAML", desc: "Convert YAML to JSON" },
	{ key: "JSONtoYAML", name: "JSON", desc: "Convert JSON to YAMl" },
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
	{ key: "text_diff", name: "Difference", desc: "Compare texts" },
	{ key: "markdown", name: "Render", desc: "Render markdown" },
]

const navbarItems = {
	"formatters": formatters,
	"converters": converters,
	"codec": codec,
	"generators": generators,
	"graphic": graphic,
	"text": text,
}

export default function Nav() {
	return (
		<Layout>
			<Navbar isBordered variant="sticky">
				<Navbar.Brand>
					<Text
						b
						size={32}
						color="inherit"
						hideIn="xs"
						css={{
							textGradient: "45deg, $yellow600 -20%, $red600 100%",
						}}
						weight="bold"
					>
						knife - go
					</Text>
				</Navbar.Brand>
				<MenuItem item={navbarItems.formatters} title="Formatters" />
				<MenuItem item={navbarItems.converters} title="Converters" />
				<MenuItem item={navbarItems.codec} title="Encode/Decode" />
				<MenuItem item={navbarItems.generators} title="Generators" />
				<MenuItem item={navbarItems.graphic} title="Graphic" />
				<MenuItem item={navbarItems.text} title="Text" />
			</Navbar>
		</Layout >
	)
}

