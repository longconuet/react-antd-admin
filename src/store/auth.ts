import type { AuthType } from "#src/api/user/types";
import type { PasswordLoginFormType } from "#src/pages/login/components/password-login";
import { fetchLogin, fetchLogout } from "#src/api/user";
import { usePermissionStore, useTabsStore, useUserStore } from "#src/store";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
	token: "",
	refreshToken: "",
};

type AuthState = AuthType;

interface AuthAction {
	login: (loginPayload: PasswordLoginFormType) => Promise<void>
	logout: () => Promise<void>
	reset: () => void
};

export const useAuthStore = create<AuthState & AuthAction>()(

	persist((set, get) => ({
		...initialState,

		login: async (loginPayload) => {
			const response = await fetchLogin(loginPayload);
			return set({
				...response,
			});
		},

		logout: async () => {
			/**
			 * 1. logOut
			 */

			await fetchLogout();
			/**
			 * 2. Clear token and other information
			 */

			get().reset();
		},

		reset: () => {
			/**
			 * Clear token
			 */
			set({
				...initialState,
			});
			/**
			 * Clear user information
			 * @see {@link https://github.com/pmndrs/zustand?tab=readme-ov-file#read-from-state-in-actions | Read from state in actions}
			 */
			useUserStore.getState().reset();

			/**
			 * Clear permission information
			 * @see https://github.com/pmndrs/zustand?tab=readme-ov-file#readingwriting-state-and-reacting-to-changes-outside-of-components
			 */
			usePermissionStore.getState().reset();

			/**
			 * Clear the tab page
			 */
			useTabsStore.getState().resetTabs();

			/**
			 * Clear the keepAlive cache
			 * In the container-layout component, automatically refresh the keepAlive cache according to openTabs
			 */
		},

	}), { name: "access-token" }),

);
