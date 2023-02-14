import React from "react";
import { Navbar, Dropdown } from "@nextui-org/react";


export default function MenuItems(props: { item: any; title: any; }) {
	const items = props.item;
	const title = props.title;
	return (
		<Navbar.Content>
			<Dropdown isBordered>
				<Navbar.Item>
					<Dropdown.Button
						auto
						light
						css={{
							px: 0,
							dflex: "center",
							svg: { pe: "none" },
						}}
						//iconRight={icons.chevron}
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
							py: "$4",
							"& .nextui-dropdown-item-content": {
								w: "100%",
								fontWeight: "$semibold",
							},
						},
					}}
					items={items}
				>

					{(items) => (
						<Dropdown.Item
							key={items.key}
							showFullDescription
							description={items.desc}
						>{items.name}
						</Dropdown.Item>
					)}
				</Dropdown.Menu>
			</Dropdown>

		</Navbar.Content>
	)

}


