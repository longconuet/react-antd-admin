export interface DepartmentItemType {
	id: string
	name: string
	code: string
	description: string | null
	managerId: string | null
}

export interface SimpleDepartmentItemType {
	id: string
	name: string
	code: string
}
