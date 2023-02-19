import { Text } from "@nextui-org/react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<Text
			h1
			size={50}
			css={{
				textGradient: "45deg, $blue600 -20%, $pink600 50%",
			}}
			weight="medium"
		> Oops!
		</Text>

	);
}
