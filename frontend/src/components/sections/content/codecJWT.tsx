import React, { useState } from 'react';
//import "./style.css"
import {
	Button, Textarea, Grid, FormElement, Spacer, Radio,
} from '@nextui-org/react';
import { Layout } from '../../nav/bar/layout';

export const CodecJWTForm = () => {

	let [inputText, setInputText] = useState('');
	let [headerText, setHeaderText] = useState('');
	let [payloadText, setPayloadText] = useState('');
	let [checked, setChecked] = useState('decode');

	const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
		setInputText(event.target.value);
	};
	const handleOutputChange = (event: React.ChangeEvent<FormElement>) => {
		setHeaderText(event.target.value);
		setPayloadText(event.target.value);
	};
	const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await fetch(`http://localhost:8080/${checked}/jwt`, {
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
			<Layout>
				<form onSubmit={handleSubmit}>
					<Spacer />
					<Grid.Container gap={0.5} >
						<Grid sm direction='column' alignItems='center'>
							<Grid >
								<Textarea
									bordered
									value={inputText}
									onChange={handleInputChange}
									label="Input"
									rows={25}
									cols={60} />
							</Grid>
						</Grid>
						<Grid sm direction='column'
							alignItems='center'
						>
							<Grid >
								<Textarea
									value={headerText}
									bordered
									onChange={handleOutputChange}
									label="Output"
									readOnly
									placeholder='Header'
									rows={11}
									cols={60} />
							</Grid>
							<Spacer y={1.5} />
							<Grid >
								<Textarea
									value={payloadText}
									bordered
									placeholder='Payload'
									onChange={handleOutputChange}
									readOnly
									rows={11.5}
									cols={60} />
							</Grid>
							<Spacer y={1.5} />

							<Grid css={{ display: 'flex' }}>
								<Radio.Group orientation='horizontal'
									value={checked} onChange={setChecked}
								>
									<Radio isDisabled value='encode'> Encode </Radio>
									<Radio value='decode'> Decode </Radio>
								</Radio.Group>
								<Spacer x={6} />
								<Button type="submit"
									size='sm'
									css={{
										color: "Black",
										linearGradient: "45deg, $red600 -50%, $yellow600 200%"
									}} >Submit
								</Button>
							</Grid>
						</Grid>
					</Grid.Container>
				</form >
			</Layout >
		</>
	);
};

export default CodecJWTForm;
