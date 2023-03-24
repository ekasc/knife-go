import { Button, createStyles, Grid, Space, Textarea } from '@mantine/core';
import React, { useState } from 'react';

const useStyles = createStyles((theme) => ({
	container: {
		'@media (max-width: 500px)': {
			padding: '1rem',
			paddingLeft: '0',
		},
		padding: '2rem',
		paddingTop: '0',
	},

	btn: {
		'@media (max-width: 500px)': {
			width: '40%',
		},
		width: '15%',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[6] : theme.colors.red[6],
		'&:not([data-disabled])': theme.fn.hover({
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[8] : theme.colors.red[8]
		}),
	},

	inputCol: {
		'@media (max-width: 500px)': {
			minHeight: '1rem'
		},
		alignItems: 'center',
		justifyContent: 'flex-start',
		display: 'flex',
	},

}))


export const CodecJWTForm = () => {
	const { classes } = useStyles();

	let [inputText, setInputText] = useState('');
	let [headerText, setHeaderText] = useState('');
	let [payloadText, setPayloadText] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(event.target.value);
	};
	const handleOutputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setHeaderText(event.target.value);
		setPayloadText(event.target.value);
	};
	const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await fetch(`http://localhost:8080/decode/jwt`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Data: inputText,
			}),
		});
		const data = await response.json();
		setHeaderText(data.body.header);
		setPayloadText(data.body.payload);
	};

	return (

		<>
			<form onSubmit={handleSubmit}>
				<div className={classes.container}>
					<Grid justify='space-around' columns={24} gutter='xl'>
						<Grid.Col span={12} >
							<Textarea
								value={inputText}
								onChange={handleInputChange}
								label="Input"
								minRows={20}
							/>
						</Grid.Col>
						<Grid.Col span={12} >
							<Textarea
								value={headerText}
								onChange={handleOutputChange}
								label="Output"
								readOnly
								placeholder='Header'
								minRows={9.5}
							/>
							<Space h='1.3rem' />
							<Textarea
								value={payloadText}
								placeholder='Payload'
								onChange={handleOutputChange}
								readOnly
								minRows={9.5}
							/>
						</Grid.Col>
						<Grid.Col className={classes.inputCol}>
							<Button type="submit" className={classes.btn} >
								Decode
							</Button>
						</Grid.Col>
					</Grid>
				</div>
			</form >
		</>
	);
};

export default CodecJWTForm;
