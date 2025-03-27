import type { DepartmentItemType } from "./types";
import { request } from "#src/utils";

export * from "./types";

interface DepartmentQueryParams {
	name?: string
	pageNumber?: number
	pageSize?: number
}

/* Get the department list */
export function fetchDepartmentList(data: any) {
	return request.get<PaginatedResponse<DepartmentItemType>>("department", { searchParams: data, ignoreLoading: true }).json();
}

/* New department */
export function fetchAddDepartmentItem(data: DepartmentItemType) {
	return request.post<string>("department", { json: data, ignoreLoading: true }).json();
}

/* Modify department */
export function fetchUpdateDepartmentItem(data: Omit<DepartmentItemType, "code">) {
	return request.put("department", { json: data, ignoreLoading: true }).json();
}

/* Delete department */
export function fetchDeleteDepartmentItem(id: number) {
	return request.delete(`department/${id}`, { ignoreLoading: true }).json();
}

// /* Get menu */
// export function fetchDepartmentMenu() {
// 	return request.get<ApiResponse<DepartmentItemType[]>>("department-menu", { ignoreLoading: true }).json();
// }

// /* Department-bound menu id */
// export function fetchMenuByDepartmentId(data: { id: number }) {
// 	return request.get<ApiResponse<string[]>>("menu-by-department-id", { searchParams: data, ignoreLoading: false }).json();
// }
