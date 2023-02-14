import { TextForm } from "../../sections/content/TextForm";
import { Box } from "./box";

export const Layout = ({ children }: { children: any }) => (
	<Box css={{ maxW: "100%" }} >
		{children}
	</Box>
)

