import { Button, createStyles, Grid, Space, Textarea } from "@mantine/core";
import { useState } from "react";
import ReactDiffViewer from 'react-diff-viewer';

const useStyles = createStyles((theme) => ({
	container: {
		'@media (max-width: 500px)': {
			padding: '1rem',
			paddingLeft: '0',
		},
		padding: '2rem',
		paddingTop: '0',
		paddingBottom: '0',
	},

	btn: {
		fontSize: '17px',
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



export function TextDiffForm() {
	const { classes, theme } = useStyles();
	let [inputText1, setInputText1] = useState('');
	let [inputText2, setInputText2] = useState('');
	let [_, setDiffText] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputText1(event.target.value);
	};

	const handleOutputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputText2(event.target.value);
	};

	const clearAll = () => {
		setInputText1("");
		setInputText2("");
		setDiffText("");
	};
	return (
		<>
			<div className={classes.container}>
				<Grid justify='space-around' columns={24} gutter='xl'>
					<Grid.Col span={12} >
						<Button type="reset" className={classes.btn}
							onClick={clearAll}
						>Clear all</Button>
						<Space h='1rem' />
						<Textarea
							value={inputText1}
							onChange={handleInputChange}
							placeholder="Enter text to compare"
							minRows={12}
							spellCheck={false}
						/>
					</Grid.Col>
					<Grid.Col span={12} >
						<Space h='3.2rem' />
						<Textarea
							value={inputText2}
							spellCheck={false}
							onChange={handleOutputChange}
							placeholder='Enter text to compare'
							minRows={12}
						/>
					</Grid.Col>
					<Grid.Col className={classes.inputCol}>
						<ReactDiffViewer
							oldValue={inputText1}
							newValue={inputText2}
							splitView
							disableWordDiff={false}
							extraLinesSurroundingDiff={10}
							useDarkTheme={theme.colorScheme === 'dark' ? true : false}
						/>
					</Grid.Col>
				</Grid>
			</div>
		</>
	)
}

export default TextDiffForm;
