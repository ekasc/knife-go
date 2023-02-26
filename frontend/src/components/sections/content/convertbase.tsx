import { Button, Container, FormElement, Grid, Input, Spacer, } from "@nextui-org/react";
import { useState } from "react";
import { Layout } from "../../nav/bar/layout";

type BaseResponse = { body: { Decimal: string, Binary: string, Octal: string, Hexadecimal: string } }

export const ConvertFormBase = () => {
	let [numInput, setNumInput] = useState('');
	let [baseInput, setBaseInput] = useState(0);
	let [binaryOutput, setBinaryOutput] = useState('');
	let [decimalOutput, setDecimalOutput] = useState('');
	let [octalOutput, setOctalOutput] = useState('');
	let [hexOutput, setHexOutput] = useState('');


	const handleNumChange = (event: React.ChangeEvent<FormElement>) => {
		setNumInput(event.target.value);
	};

	const handleBaseChange = (event: React.ChangeEvent<FormElement>) => {
		setBaseInput(+event.target.value);
	};

	const handleOutputChange = (event: React.ChangeEvent<FormElement>) => {
		setBinaryOutput(event.target.value);
		setDecimalOutput(event.target.value);
		setOctalOutput(event.target.value);
		setHexOutput(event.target.value);
	};
	const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await fetch(`http://localhost:8080/convert/base`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Number: numInput,
				Base: baseInput,
			}),
		});
		const data: BaseResponse = await response.json();
		console.log(data);
		setDecimalOutput(data.body.Decimal);
		setBinaryOutput(data.body.Binary);
		setOctalOutput(data.body.Octal);
		setHexOutput(data.body.Hexadecimal);
	};

	return (
		<>
			<Layout>
				<form onSubmit={handleSubmit}>
					<Spacer />
					<Container md gap={0.5} >
						<Grid.Container gap={0.5}>
							<Grid sm direction='row' alignItems="center" >
								<Spacer y={2} />
								<Grid >
									<Input
										bordered
										label="Enter Number"
										value={numInput}
										type="number"
										size="xl"
										onChange={handleNumChange} />
								</Grid>
								<Spacer y={2} />

								<Grid >
									<Input
										bordered
										label="Enter Base"
										value={baseInput}
										size="xl"
										type="number"
										helperText="From base"

										onChange={handleBaseChange} />

								</Grid>
								<Spacer y={2} />
								<Grid>
									<Spacer y={1.5} />
									<Button
										size="lg"
										type="submit"
										css={{
											color: "Black",
											linearGradient: "45deg, $red600 -50%, $yellow600 200%",
										}}
									>Submit</Button>
								</Grid>
							</Grid>
						</Grid.Container>
						<Grid.Container>
							<Grid sm direction='column'
								alignItems="baseline"
							>

								<Spacer y={2} />
								<Grid >
									<Input
										css={{
											width: "750px",
											"@smMax": { width: "100%" }
										}}
										readOnly
										value={binaryOutput}
										onChange={handleOutputChange}
										label="Binary"
										size="xl"
									/>
								</Grid>
								<Spacer y={2} />
								<Grid >
									<Input
										css={{
											width: "750px",
											"@smMax": { width: "100%" }
										}}
										size="xl"
										value={decimalOutput}
										onChange={handleOutputChange}
										readOnly
										label="Decimal" />
								</Grid>
								<Spacer y={2} />
								<Grid >
									<Input
										css={{
											width: "750px",
											"@smMax": { width: "100%" }
										}}
										readOnly
										value={octalOutput}
										onChange={handleOutputChange}
										label="Octal"
										size="xl" />
								</Grid>
								<Spacer y={2} />
								<Grid >
									<Input
										css={{
											width: "750px",
											"@smMax": { width: "100%" }
										}}
										readOnly
										value={hexOutput}
										label="Hexadecimal"
										onChange={handleOutputChange}
										size="xl" />
								</Grid>

							</Grid>
						</Grid.Container>
					</Container>
				</form >
			</Layout >

		</>
	)
}

export default ConvertFormBase;
