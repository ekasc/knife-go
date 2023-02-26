import React from "react";
import { Navbar, Dropdown, Link } from "@nextui-org/react";

export type mItem = {
	key?: string;
	name?: string;
	desc?: string;
}

export default function MenuItems(props: { item: { key: string, name: string, desc: string }[], title: string }) {
	const items = props.item;
	const title = props.title;
	return (
		<Navbar.Content
			hideIn="md"
		>
			<Dropdown isBordered>
				<Navbar.Item>
					<Dropdown.Button
						auto
						light
						css={{
							px: 0,
							dflex: "center",
						}}
						ripple={false}
					>{title}
					</Dropdown.Button>
				</Navbar.Item>
				<Dropdown.Menu
					aria-label={title.toLowerCase()}
					css={{
						$$dropdownMenuWidth: "340px",
						$$dropdownMenuHeight: "70px",
						"& .nextui-dropdown-item": {
							py: "$10",
							"& .nextui-dropdown-item-content": {
								w: "100%",
								fontWeight: "$semibold",
							},
						},
					}}
					items={items}
				>

					{(items: mItem) => (
						<Dropdown.Item
							key={items.key}
							showFullDescription
							description={items.desc}
						>
							<Navbar.Link href={`/${title.toLowerCase()}/${items?.name?.toLowerCase()}`}>
								{items.name}
							</Navbar.Link>
						</Dropdown.Item>
					)}
				</Dropdown.Menu>
			</Dropdown>

		</Navbar.Content >
	)

}


