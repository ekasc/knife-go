import { Card, createStyles, rem, SimpleGrid, Text } from "@mantine/core";
import { IconArrowsExchange, IconBrush, IconBuildingFactory2, IconCursorText, IconKey } from "@tabler/icons-react";


const cardData = [
	{ key: 'formatters', title: 'Formatters', description: ["Beautify JSON", "Beautify HTML", "Minify CSS"], icon: IconBrush },
	{ key: 'converters', title: 'Converters', description: ["Convert YAML to JSON", "Convert JSON to YAML", "Convert number bases"], icon: IconArrowsExchange },
	{ key: 'generators', title: 'Generators', description: ["Generate hashes"], icon: IconBuildingFactory2 },
	{ key: 'encode-decode', title: 'Encode/Decode', description: ["Encode/Decode Base64", "Encode/Decode HTML", "Encode/Decode URL", "Decode JWT"], icon: IconKey },
	{ key: 'text', title: 'Text', description: ["Compare texts", "Render markdown"], icon: IconCursorText },
]

const useStyles = createStyles((theme) => ({
	container: {
		padding: '1rem',
		paddingTop: 0,
	},
	card: {
		border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
	},
	cardTitle: {
		"&::after": {
			content: '""',
			display: 'block',
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[4] : theme.colors.red[4],
			width: rem(90),
			height: rem(2),
			marginTop: theme.spacing.sm,
		},
	},
}));


export function Home() {
	const { classes, theme } = useStyles();
	const features = cardData.map((data) => (
		<Card key={data.key} shadow='md' radius='md' padding='xl' className={classes.card}>
			<data.icon size={rem(50)} stroke={1.25}
				color={theme.colorScheme === 'dark' ? theme.colors.cyan[4] : theme.colors.red[4]} />
			<Text fz='lg' fw={500} mt='md' className={classes.cardTitle}>
				{data.title}
			</Text>
			{data.description.map((i) => (
				<Text key={i.toLowerCase()} fz='sm' c='dimmed' mt='sm'>
					{i}
				</Text>
			))}
		</Card>
	));
	return (
		<>
			<div className={classes.container}>
				<SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
					{features}
				</SimpleGrid>
			</div>
		</>
	)
}

