import { Button, createStyles, Flex, Grid, Space, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

type BaseResponse = { body: { Decimal: string, Binary: string, Octal: string, Hexadecimal: string } }

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
	}
}))

export const ConvertFormBase = () => {
	let [numInput, setNumInput] = useState('');
	let [baseInput, setBaseInput] = useState(0);
	let [binaryOutput, setBinaryOutput] = useState('');
	let [decimalOutput, setDecimalOutput] = useState('');
	let [octalOutput, setOctalOutput] = useState('');
	let [hexOutput, setHexOutput] = useState('');

	const { classes } = useStyles();
	const largeScreen = useMediaQuery('(min-width: 767px)');
	const apiUrl = import.meta.env.VITE_APP_API_URL


	const handleNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNumInput(event.target.value);
	};

	const handleBaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBaseInput(+event.target.value);
	};

	const handleOutputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBinaryOutput(event.target.value);
		setDecimalOutput(event.target.value);
		setOctalOutput(event.target.value);
		setHexOutput(event.target.value);
	};
	const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await fetch(`${apiUrl}/convert/base`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Number: numInput,
				Base: baseInput,
			}),
		});
		const data: BaseResponse = await response.json();
		setDecimalOutput(data.body.Decimal);
		setBinaryOutput(data.body.Binary);
		setOctalOutput(data.body.Octal);
		setHexOutput(data.body.Hexadecimal);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className={classes.container}>
					<Grid justify='space-around' columns={24} gutter='xl' >
						<Grid.Col span={largeScreen ? 10 : 24}>
							<TextInput
								label="Enter Number"
								value={numInput}
								type="number"
								onChange={handleNumChange} />
						</Grid.Col>
						<Grid.Col span={largeScreen ? 10 : 24}>
							<TextInput
								label="Enter Base"
								value={baseInput}
								type="number"
								description="From base"
								inputWrapperOrder={['label', 'input', 'description']}
								onChange={handleBaseChange} />
						</Grid.Col>
						<Grid.Col span={largeScreen ? 4 : 24} >
							<Space h='1.4rem' />
							<Button
								className={classes.btn}
								type="submit"
							>Submit</Button>
						</Grid.Col>
					</Grid>
					<Space h='1rem' />
					<Flex direction='column' gap='xl' justify='flex-start' >
						<TextInput
							readOnly
							value={binaryOutput}
							onChange={handleOutputChange}
							label="Binary"
						/>
						<TextInput
							value={decimalOutput}
							onChange={handleOutputChange}
							readOnly
							label="Decimal" />
						<TextInput
							readOnly
							value={octalOutput}
							onChange={handleOutputChange}
							label="Octal"
						/>
						<TextInput
							readOnly
							value={hexOutput}
							label="Hexadecimal"
							onChange={handleOutputChange}
						/>
					</Flex>
				</div>
			</form >
		</>
	)
}

export default ConvertFormBase;
