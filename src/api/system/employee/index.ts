import type { EmployeeItemType } from "./types";
import { request } from "#src/utils";

export * from "./types";

interface EmployeeQueryParams {
	name?: string
	pageNumber?: number
	pageSize?: number
}

/* Get the employee list */
export function fetchEmployeeList(data: any) {
	return request.get<PaginatedResponse<EmployeeItemType>>("employee", { searchParams: data, ignoreLoading: true }).json();
}

/* New employee */
export function fetchAddEmployeeItem(data: EmployeeItemType) {
	return request.post<string>("employee", { json: data, ignoreLoading: true }).json();
}

/* Modify employee */
export function fetchUpdateEmployeeItem(data: Omit<EmployeeItemType, "username">) {
	return request.put("employee", { json: data, ignoreLoading: true }).json();
}

/* Delete employee */
export function fetchDeleteEmployeeItem(id: string) {
	return request.delete(`employee/${id}`, { ignoreLoading: true }).json();
}

// /* Get menu */
// export function fetchEmployeeMenu() {
// 	return request.get<ApiResponse<EmployeeItemType[]>>("employee-menu", { ignoreLoading: true }).json();
// }

// /* Employee-bound menu id */
// export function fetchMenuByEmployeeId(data: { id: number }) {
// 	return request.get<ApiResponse<string[]>>("menu-by-employee-id", { searchParams: data, ignoreLoading: false }).json();
// }
