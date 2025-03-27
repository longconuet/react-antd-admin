import type { EmployeeItemType } from "#src/api/system";
import type { ProColumns } from "@ant-design/pro-components";
import type { TFunction } from "i18next";

export function getConstantColumns(t: TFunction<"translation", undefined>): ProColumns<EmployeeItemType>[] {
	return [
		{
			dataIndex: "index",
			title: t("common.index"),
			valueType: "indexBorder",
			width: 50,
		},
		{
			title: t("system.employee.name"),
			dataIndex: "fullName",
			disable: true,
			ellipsis: false,
			width: 120,
			filters: false,
			onFilter: false,
			formItemProps: {
				rules: [
					{
						required: true,
						message: t("form.required"),
					},
				],
			},
		},
		{
			disable: true,
			title: t("system.employee.username"),
			dataIndex: "username",
			width: 120,
			filters: true,
			onFilter: true,
			ellipsis: true,
			formItemProps: {
				rules: [
					{
						required: true,
						message: t("form.required"),
					},
				],
			},
		},
		{
			disable: true,
			title: t("system.employee.email"),
			dataIndex: "email",
			width: 120,
			filters: true,
			onFilter: true,
			ellipsis: true,
			formItemProps: {
				rules: [
					{
						required: true,
						message: t("form.required"),
					},
				],
			},
		},
		{
			disable: true,
			title: t("system.employee.phoneNumber"),
			dataIndex: "phone",
			width: 120,
			filters: true,
			onFilter: true,
			ellipsis: true,
			formItemProps: {
				rules: [
					{
						required: true,
						message: t("form.required"),
					},
				],
			},
		},
		{
			disable: true,
			title: t("system.employee.department"),
			dataIndex: "departmentName",
			width: 120,
			search: false,
		},
		{
			disable: true,
			title: t("system.employee.position"),
			dataIndex: "positionName",
			width: 120,
			search: false,
		}
	];
}
