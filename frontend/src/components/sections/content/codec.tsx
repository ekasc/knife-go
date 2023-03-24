import { Button, createStyles, Grid, Group, Radio, Textarea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react';

const useStyles = createStyles((theme) => ({
	container: {
		padding: '1rem',
		paddingTop: '0',
	},
	btn: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[6] : theme.colors.red[6],
		'&:not([data-disabled])': theme.fn.hover({
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.cyan[8] : theme.colors.red[8]
		}),
	},
}))

export const CodecForm = (props: { type: string }) => {
	const { classes, theme } = useStyles();
	let [inputText, setInputText] = useState('');
	let [outputText, setOutputText] = useState('');
	let [checked, setChecked] = useState('');
	const type: string = props.type;
	const largeScreen = useMediaQuery('(min-width: 767px)');

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(event.target.value);
	};
	const handleOutputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setOutputText(event.target.value);
	};

	const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await fetch(`http://localhost:8080/${checked}/${type}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Type: type,
				Data: inputText,
			}),
		});
		const data = await response.json();
		console.log(data)
		setOutputText(type === "jwt" ? data.body : data.body);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className={classes.container}>
					<Grid justify='space-around' columns={24} gutter='xl' >
						<Grid.Col span={largeScreen ? 12 : 24} >
							<Textarea
								value={inputText}
								onChange={handleInputChange}
								label="Input"
								spellCheck='false'
								minRows={20}
							/>
						</Grid.Col >
						<Grid.Col span={largeScreen ? 12 : 24}>
							<Textarea
								value={outputText}
								onChange={handleOutputChange}
								label="Output"
								readOnly
								minRows={20}
								spellCheck='false'
							/>
						</Grid.Col>
						<Grid.Col >
							<Group >
								<Radio.Group value={checked} onChange={setChecked} size='md' >
									<Group >
										<Radio value='encode' label='Encode'
											color={theme.colorScheme === 'dark' ? 'cyan' : 'red'}
										/>
										<Radio value='decode' label='Decode'
											color={theme.colorScheme === 'dark' ? 'cyan' : 'red'}
										/>
									</Group>
								</Radio.Group>
								<Button type="submit" className={classes.btn}
								>Submit
								</Button>
							</Group>
						</Grid.Col>
					</Grid>
				</div>
			</form >
		</>
	);
};

export default CodecForm;
