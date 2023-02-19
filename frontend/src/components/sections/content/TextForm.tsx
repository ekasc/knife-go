import React, { useState } from 'react';
//import "./style.css"
import {
	Button, Textarea, Grid, FormElement, Input, Container, Spacer, Col, Row
} from '@nextui-org/react';
import { Layout } from '../../nav/bar/layout';

export const TextForm = () => {

	let [input, setInput] = useState('');
	let [formattedText, setFormattedText] = useState('');
	let [optionInput, setOptionInput] = useState('');
	let [_, setTextArea] = useState('');

	const type: string = "json";

	const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
		setInput(event.target.value);
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
				Type: type,
				Data: input,
				Options: Number(optionInput)
			}),
		});
		const data = await response.json();
		//		console.log(response);
		setFormattedText(data.body);
	};

	return (

		<>
			<Layout>
				<form onSubmit={handleSubmit}>
					<Spacer />
					<Container gap={0} md>
						<Row gap={0}>
							<Col>
								<Grid.Container justify="flex-start" >
									<Grid css={{}} >
										<Grid >
											<Textarea
												bordered
												value={input}
												onChange={handleInputChange}
												label="Input"
												rows={25}
												cols={60} />
										</Grid>
										<Grid >
											<Spacer y={2} />
											<Input
												bordered
												labelPlaceholder='Indent'
												value={optionInput}
												onChange={handleOptionChange} />
										</Grid>
									</Grid>
								</Grid.Container>
							</Col>
							<Col>
								<Grid.Container justify="flex-end" css={{}} >
									<Grid>
										<Textarea
											value={formattedText}
											bordered
											onChange={handleOutputChange}
											label="Output"
											readOnly
											rows={25}
											cols={60} />
									</Grid>
									<Grid>
										<Spacer y={2} />
										<Button type="submit"
											css={{
												color: "Black",
												linearGradient: "45deg, $red600 -50%, $yellow600 200%"
											}} >Submit
										</Button>
									</Grid>
								</Grid.Container>
							</Col>
						</Row>
					</Container>
				</form >
			</Layout >
		</>
	);
};

export default TextForm;

