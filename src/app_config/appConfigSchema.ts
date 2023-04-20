import {str} from "envalid";

const appConfigSchema = {
	OPTIONAL_HELLO_MESSAGE: str({default: "Hello World!"}),
	// REQUIRED_HELLO_MESSAGE: str(),
};

export default appConfigSchema;
