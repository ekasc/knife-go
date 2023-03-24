import React, { useState } from 'react';
import { Grid, Textarea, TextInput, Button, Space, createStyles, CopyButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
	container: { padding: '2rem', paddingTop: '0' },
	btn: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[6] : theme.colors.red[6],
		'&:not([data-disabled])': theme.fn.hover({
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[8] : theme.colors.red[8]
		}),
	},
}));

export const FormatForm = (props: { inputTag: boolean, type: string }) => {
	const { classes, theme } = useStyles();
	let [input, setInput] = useState('');
	let [formattedText, setFormattedText] = useState('');
	let [optionInput, setOptionInput] = useState('');
	let [_, setTextArea] = useState('');
	const type: string = props.type;
	const largeScreen = useMediaQuery('(min-width: 767px)');
	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(event.target.value);
	};
	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOptionInput(event.target.value);
	};
	const handleOutputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextArea(event.target.value);
	};
	const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await fetch(`http://localhost:8080/format/${type}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Type: type,
				Data: input,
				Options: Number(optionInput)
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
							{props.inputTag ? (
								<div>
									<Space h={10} />
									<TextInput
										label="Indent"
										type="number"
										value={optionInput}
										onChange={handleOptionChange}
									/>
								</div>
							) : (<div></div>)}
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
							<Space h='2rem' />
							<CopyButton value={formattedText}>
								{({ copied, copy }) => (
									<Button
										color={copied ? 'teal' : theme.colorScheme === 'dark' ? 'cyan' : 'red'}
										onClick={copy}
									>
										{copied ? 'Copied output' : 'Copy output'}
									</Button>
								)}
							</CopyButton>
						</Grid.Col >
						<Grid.Col >
							<Button type="submit" className={classes.btn} >Submit </Button>
						</Grid.Col>
					</Grid>
				</div>
			</form >
		</>
	);
};

export default FormatForm;

