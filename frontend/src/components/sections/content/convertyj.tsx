import { Button, createStyles, Grid, Textarea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";


const useStyles = createStyles((theme) => ({
	container: {
		padding: '2rem',
		paddingTop: '0',
	},
	btn: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[6] : theme.colors.red[6],
		'&:not([data-disabled])': theme.fn.hover({
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[8] : theme.colors.red[8]
		}),
	}
}))


export const ConvertForm = (props: { type: string }) => {
	let [input, setInput] = useState('');
	let [formattedText, setFormattedText] = useState('');
	let [_, setTextArea] = useState('');

	const { classes } = useStyles();

	const type = props.type;

	const largeScreen = useMediaQuery('(min-width: 767px)');
	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(event.target.value);
	};

	const handleOutputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextArea(event.target.value);
	};
	const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await fetch(`http://localhost:8080/convert/${type}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Type: type,
				Data: input,
			}),
		});
		const data = await response.json();
		setFormattedText(data.body);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className={classes.container}>
					<Grid justify='space-around' columns={24} gutter='xl' >
						<Grid.Col span={largeScreen ? 12 : 24} >
							<Textarea
								radius="sm"
								required
								value={input}
								onChange={handleInputChange}
								label="Input"
								minRows={20}
								spellCheck={false}
							/>
						</Grid.Col >
						<Grid.Col span={largeScreen ? 12 : 24} >
							<Textarea
								value={formattedText}
								onChange={handleOutputChange}
								label="Output"
								minRows={20}
								readOnly
								spellCheck={false}
							/>
						</Grid.Col>
						<Grid.Col >
							<Button type="submit"
								className={classes.btn}
							>Submit
							</Button>
						</Grid.Col>
					</Grid>
				</div>
			</form >
		</>
	)
}

export default ConvertForm;
