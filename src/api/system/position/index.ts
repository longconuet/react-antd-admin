import type { PositionItemType } from "./types";
import { request } from "#src/utils";

export * from "./types";

interface PositionQueryParams {
	name?: string
	pageNumber?: number
	pageSize?: number
}

/* Get the position list */
export function fetchPositionList(data: any) {
	return request.get<PaginatedResponse<PositionItemType>>("position", { searchParams: data, ignoreLoading: true }).json();
}

/* New position */
export function fetchAddPositionItem(data: PositionItemType) {
	return request.post<string>("position", { json: data, ignoreLoading: true }).json();
}

/* Modify position */
export function fetchUpdatePositionItem(data: Omit<PositionItemType, "code">) {
	return request.put("position", { json: data, ignoreLoading: true }).json();
}

/* Delete position */
export function fetchDeletePositionItem(id: number) {
	return request.delete(`position/${id}`, { ignoreLoading: true }).json();
}

// /* Get menu */
// export function fetchPositionMenu() {
// 	return request.get<ApiResponse<PositionItemType[]>>("position-menu", { ignoreLoading: true }).json();
// }

// /* Position-bound menu id */
// export function fetchMenuByPositionId(data: { id: number }) {
// 	return request.get<ApiResponse<string[]>>("menu-by-position-id", { searchParams: data, ignoreLoading: false }).json();
// }
