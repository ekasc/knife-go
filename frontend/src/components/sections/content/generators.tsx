import { Button, createStyles, Grid, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
	container: {
		padding: '2rem',
		paddingTop: '1rem',
	},
	btn: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[6] : theme.colors.red[6],
		'&:not([data-disabled])': theme.fn.hover({
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[8] : theme.colors.red[8]
		}),
	},
}))

export function GenerateForm() {
	let [input, setInput] = useState('');
	let [outputMD5, setMD5] = useState('');
	let [outputSHA1, setSHA1] = useState('');
	let [outputSHA256, setSHA256] = useState('');

	const { classes } = useStyles();

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(event.target.value);
	};

	const handleOutputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSHA256(event.target.value);
		setSHA1(event.target.value);
		setMD5(event.target.value);
	};

	const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()

		const response = await fetch(`http://localhost:8080/generate/hash`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Data: input
			})
		});

		const data = await response.json();
		console.log(data);
		setSHA1(data.body.SHA1);
		setSHA256(data.body.SHA256);
		setMD5(data.body.MD5);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className={classes.container}>
					<Grid justify='space-around' columns={24} gutter='xl' >
						<Grid.Col>
							<Textarea
								label='Input'
								value={input}
								onChange={handleInputChange}
								spellCheck='false'
								minRows={5}
							/>
						</Grid.Col>
						<Grid.Col>
							<Button className={classes.btn}
								type='submit'>
								Submit
							</Button>
						</Grid.Col>
						<Grid.Col>
							<TextInput
								readOnly
								value={outputSHA1}
								onChange={handleOutputChange}
								label='SHA1'
							/>
						</Grid.Col>
						<Grid.Col>
							<TextInput
								readOnly
								value={outputSHA256}
								onChange={handleOutputChange}
								label='SHA256'
							/>
						</Grid.Col>
						<Grid.Col>
							<TextInput
								readOnly
								value={outputMD5}
								onChange={handleOutputChange}
								label='MD5'
							/>
						</Grid.Col>
					</Grid>
				</div>
			</form>
		</>
	)
}

export default GenerateForm;
