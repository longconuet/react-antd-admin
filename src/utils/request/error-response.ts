import { s } from "#node_modules/motion/dist/react-client";
import { isObject, message } from "#src/utils";

interface ValidationError {
	propertyName: string
	errorMessage: string
	attemptedValue: string
	customState: null | any
	severity: number
	errorCode: string
	formattedMessagePlaceholderValues: Record<string, string>
}

interface ApiErrorResponse {
	title: string
	status: number
	detail: string
	instance: string
	traceId: string
	ValidationErrors: ValidationError[]
}

/**
 * Handle error response
 *
 * @param response Response object
 * @returns Response object
 */
export async function handleErrorResponse(response: Response) {
	let errMsg = 'An unexpected error occurred';
	try {
		switch (response.status) {
			case 400: {
				const data = await response.json() as ApiErrorResponse;
				if (data.ValidationErrors?.length > 0) {
					errMsg = data.ValidationErrors.map(
						(err) => `${err.errorMessage}`
					).join(".\n");
				} else {
					errMsg = "Bad Request: Invalid input data";
				}
				break;
			}
			case 404: {
				const data = await response.json() as ApiErrorResponse;
				errMsg = data.detail || "Not found: Resource does not exist";
				break;
			}
			case 403:
				errMsg = "Forbidden: You do not have permission";
				break;
			case 500:
				errMsg = "Server error: Please try again later";
				break;
			default:
				errMsg = `Error ${response.status}: Something went wrong`;
				break;
		}

		message.error(errMsg);
	}
	catch (e) {
		// Display the status text of the response as an error message
		if (response.status === 404) {
			errMsg = "Not found: Resource does not exist";
		}
		message.error(response.statusText || errMsg);
	}

	// Return the response object
	return response;
}
