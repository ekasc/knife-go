import React, { useState } from 'react';
import { Box } from "../../nav/bar/box"
//import "./style.css"
import {
	Button, Textarea, Grid, FormElement, Input
} from '@nextui-org/react';

export const TextForm = () => {

	let [input, setInput] = useState('');
	let [formattedText, setFormattedText] = useState('');
	let [optionInput, setOptionInput] = useState('');
	let [typeInput, setTypeInput] = useState('');
	let [_, setTextArea] = useState('');

	const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
		setInput(event.target.value);
	};
	const handleTypeChange = (event: React.ChangeEvent<FormElement>) => {
		setTypeInput(event.target.value);
	};

	const handleOptionChange = (event: React.ChangeEvent<FormElement>) => {
		setOptionInput(event.target.value);
	};

	const handleOutputChange = (event: React.ChangeEvent<FormElement>) => {
		setTextArea(event.target.value);
	};
	const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await fetch('http://localhost:8080/format/json', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Type: typeInput,
				Data: input,
				Options: Number(optionInput)
			}),
		});
		const data = await response.json();
		//		console.log(response);
		setFormattedText(data.body);
	};

	return (

		<Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
			<form onSubmit={handleSubmit}>
				<Grid.Container gap={3}>
					<Grid xs={6} >
						<Textarea
							value={input}
							onChange={handleInputChange}
							label="Input"
						/>
					</Grid>
					<Grid xs={6} >
						<Textarea
							value={formattedText}

							onChange={handleOutputChange}
							label="Output"
							readOnly
						/>
					</Grid>
					<Grid xs={3}>
						<Input label='Type' value={typeInput} onChange={handleTypeChange} />
					</Grid>
					<Grid xs={3}>
						<Input label='Options' value={optionInput} onChange={handleOptionChange} />
					</Grid>
					<Grid xs={6}>
						<Button type="submit" style={{ padding: '5px' }}>
							Submit
						</Button>
					</Grid>
				</Grid.Container>
			</form >
		</Box >
	);
};

export default TextForm;

