import { useAuthStore } from "#src/store";
import { rememberRoute } from "#src/utils";

/**
 * Jump to login page
 *
 * @returns No return value
 */
export function goLogin() {
	// Reset login status
	useAuthStore.getState().reset();
	// Jump to the login page and bring the routing information you need to remember
	window.location.href = `${import.meta.env.BASE_URL}login${rememberRoute()}`;
}
