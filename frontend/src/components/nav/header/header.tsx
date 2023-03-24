import { Burger, createStyles, Header, MediaQuery, Text } from "@mantine/core"

const useStyles = createStyles((theme) => ({
	header: {
		justifyContent: "center",
		display: "flex",
		alignItems: "center",
		height: "100%",
	},
	title: {
		color: theme.colorScheme === 'dark' ? theme.colors.cyan[3] : theme.colors.red[5],
		fontSize: '2.25rem',
		display: 'flex',
		'@media (max-width: 500px)': { fontSize: '1.75rem' },
	},
	err: {
		textDecorationLine: 'underline',
		textDecorationStyle: 'dotted',
		textDecorationColor: '#ef4444',
		textDecorationThickness: '1.5px',
		textUnderlineOffset: '4px'
	}
}));


export default function ShellHeader(props: {
	opened: boolean,
	setOpened: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const { classes, theme } = useStyles();
	return (
		<>
			<Header height={{ base: 50, md: 70 }} p="md">
				<div className={classes.header}>
					<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
						<Burger
							opened={props.opened}
							onClick={() => props.setOpened((o) => !o)}
							size="md"
							color={theme.colorScheme === 'dark' ? theme.colors.cyan[3] : theme.colors.red[5]}
							mr="xl"
						/>
					</MediaQuery>
					<Text<'a'>
						component="a"
						className={classes.title}
						href='/'
					>
						{'{"knife"'}<div className={classes.err}>-</div>{'"go"}'}
					</Text>
				</div>
			</Header>
		</>
	)
}
