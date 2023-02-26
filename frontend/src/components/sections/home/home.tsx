import NavBar from "../../nav/bar/navbar";
import { Layout } from "../../nav/bar/layout";
import {
	Button, Textarea, Grid, Input, Container, Spacer, Col, Row, Text, styled
} from '@nextui-org/react';
import { useState } from "react";
import "../../../assets/styles.css";


const BgContent: React.FC = () => {
	return (
		<>
			<NavBar />
			<Layout>
				<Spacer />
				<Grid.Container gap={0.5} >
					<Grid sm direction='column' alignItems='center' >
						<Grid >
							<Textarea
								disabled
								bordered
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
								disabled
								bordered
								label="Output"
								readOnly
								rows={25}
								cols={60} />
						</Grid>
						<Spacer y={1.5} />
						<Grid css={{ display: 'flex' }}>
							<Input
								size="sm"
								disabled
								bordered
								labelPlaceholder='Indent'
							/>
							<Spacer x={6} />
							<Button type="submit"
								size='sm'
								disabled
								css={{
									color: "Black",
									linearGradient: "45deg, $red600 -50%, $yellow600 200%"
								}} >Submit
							</Button>
						</Grid>
					</Grid>
				</Grid.Container>
			</Layout >

		</>
	)
}


export const Home = () => {
	const [isOverlay, setOverlay] = useState<boolean>(true);

	const handleStart = () => {
		setOverlay(false);

	}
	return (
		<>
			<div className="App">
				<div className="overlay" style={{ display: isOverlay ? "block" : "none" }}>
					<Text
						h1
						size={60}
					>Knife - go
					</Text>
					<Text
						size={40}
						em
					>Swiss army knife for developers
					</Text>
					<Button
						size="lg"
						css={{
							linearGradient: "45deg, $red600 -50%, $yellow600 200%",
							left: "50%",
							transform: "translate(-50%,50%)",
						}}
						onClick={handleStart}
					>Get started</Button>
				</div>

				<div style={{ filter: isOverlay ? "blur(3px)" : "none" }}>
					<BgContent />
				</div>

			</div>
		</>
	)
}
