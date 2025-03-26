/**
 * The interface returns data format
 * data: The interface returns data
 */
interface ApiResponse<T> {
	code: number
	result: T
	message: string
	success: boolean
}

/**
 * The interface in array form returns data format
 * list: The interface returns data
 */
interface ApiListResponse<T> extends ApiResponse<T> {
	result: {
		list: T[]
		total: number
		current: number
	}
}

/**
 * Pull table request parameters
 */
interface ApiTableRequest extends Record<string, any> {
	cqs?: string
	pageSize?: number
	current?: number
}

interface PaginatedResponse<T> {
	pageNumber: number
	pageSize: number
	totalCount: number
	data: T[]
}

type Recordable<T = any> = Record<string, T>;
