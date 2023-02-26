import { Button, FormElement, Grid, Spacer, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { Layout } from "../../nav/bar/layout";

export const ConvertForm = (props: { type: string }) => {
	let [input, setInput] = useState('');
	let [formattedText, setFormattedText] = useState('');
	let [_, setTextArea] = useState('');

	const type = props.type;

	const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
		setInput(event.target.value);
	};

	const handleOutputChange = (event: React.ChangeEvent<FormElement>) => {
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
		//		console.log(response);
		setFormattedText(data.body);
	};

	return (
		<>
			<Layout>
				<form onSubmit={handleSubmit}>
					<Spacer />
					<Grid.Container gap={0.5} >
						<Grid sm direction='column' alignItems='center' >
							<Grid >
								<Textarea
									bordered
									value={input}
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
									value={formattedText}
									bordered
									onChange={handleOutputChange}
									label="Output"
									readOnly
									rows={25}
									cols={60} />
							</Grid>
							<Spacer y={1.5} />
							<Grid css={{ display: 'flex' }}>
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
	)
}

export default ConvertForm;
