import { createStyles, Textarea } from "@mantine/core";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeFormat from "rehype-format";

const useStyles = createStyles((theme) => ({
	markdowneditor: {
		'@media (max-width: 991px)': {
			marginTop: '50px',
		},
		display: 'flex',
		position: 'fixed',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		marginTop: '70px',
		backgroundColor: theme.colors.gray[0]
	},

	editor: {
		'@media (max-width: 767px)': {
			margin: '0',
		},
		width: '50%',
		overflowY: 'scroll',
		marginLeft: '18.78rem',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
	},

	preview: {
		width: '50%',
		overflowY: 'scroll',
		marginLeft: '0.25rem',
	},
}));



export function MarkdownForm() {
	const [markdown, setMarkdown] = useState("");

	const handleMarkdownInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMarkdown(event.target.value);
	};

	const { classes } = useStyles();
	return (
		<>
			<form>
				<div className={classes.markdowneditor}>
					<div className={classes.editor} >
						<Textarea
							placeholder="Enter markdown here..."
							autosize
							size='sm'
							spellCheck={false}
							variant='unstyled'
							minRows={30}
							value={markdown}
							onChange={handleMarkdownInputChange}
						/>
					</div>
					<div style={{
						width: '1px',
						height: '100%',
						backgroundColor: '#ccc',
					}} />
					<div className={classes.preview}>
						<ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeFormat]} />
					</div>
				</div>
			</form>
		</>
	)
}


export default MarkdownForm;
