import React, { useState } from 'react';
//import "./style.css"
import {
	Button, Textarea, Grid, FormElement, Spacer, Radio,
} from '@nextui-org/react';
import { Layout } from '../../nav/bar/layout';

export const CodecForm = (props: { type: string }) => {

	let [inputText, setInputText] = useState('');
	let [outputText, setOutputText] = useState('');
	let [checked, setChecked] = useState('');

	const type: string = props.type;


	const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
		setInputText(event.target.value);
	};


	const handleOutputChange = (event: React.ChangeEvent<FormElement>) => {
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
		//console.log(data.body);
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
									value={outputText}
									bordered
									onChange={handleOutputChange}
									label="Output"
									readOnly
									rows={25}
									cols={60} />
							</Grid>
							<Spacer y={1.5} />
							<Grid css={{ display: 'flex' }}>
								<Radio.Group orientation='horizontal'
									value={checked} onChange={setChecked}
								>
									<Radio isDisabled={props.disable1} value='encode'> Encode </Radio>
									<Radio isDisabled={props.disable2} value='decode'> Decode </Radio>
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

export default CodecForm;
