import { useState } from "react";
import { Box, Collapse, createStyles, Group, rem, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react"


interface LinkGroupProps {
	label: string;
	initiallyOpened?: boolean;
	links?: { label: string, link: string, desc: string }[];
}

const useStyles = createStyles((theme) => ({
	control: {
		fontWeight: 500,
		display: 'block',
		width: '100%',
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		color: theme.colorScheme === 'dark' ? theme.colors.cyan[5] : theme.white,
		fontSize: theme.fontSizes.lg,
		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[7] : theme.white,
			color: theme.colorScheme === 'dark' ? theme.white : theme.colors.red[4],
		},
	},

	link: {
		fontWeight: 500,
		display: 'block',
		textDecoration: 'none',
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		paddingLeft: rem(31),
		marginLeft: rem(30),
		fontSize: theme.fontSizes.sm,
		color: theme.colorScheme == 'dark' ? theme.colors.cyan[5] : theme.white,
		borderLeft: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white}`,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
			color: theme.colorScheme === 'dark' ? theme.white : theme.colors.red[4]
		},
	},

	chevron: {
		transition: 'transform 200ms ease',
	},
}));

export function LinksGroup({ label, initiallyOpened, links }: LinkGroupProps) {
	const { classes, theme } = useStyles();
	const hasLinks = Array.isArray(links);
	const [opened, setOpened] = useState(initiallyOpened || false);
	const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
	const items = (hasLinks ? links : []).map((link) => (
		<Text<'a'>
			component="a"
			className={classes.link}
			href={link.link}
			key={link.label}
		>
			{link.label}
		</Text>
	));
	return (
		<>
			<UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
				<Group position="apart" spacing={0}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box ml="md">{label}</Box>
					</Box>
					{hasLinks && (
						<ChevronIcon
							className={classes.chevron}
							size="1rem"
							stroke={1.5}
							style={{
								transform: opened ? `rotate(${(theme.dir === 'rtl' ? -90 : 90)}deg)` : 'none',
							}}
						/>
					)}
				</Group>
			</UnstyledButton>
			{hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
		</>
	)
}
