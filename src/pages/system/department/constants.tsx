import type { DepartmentItemType } from "#src/api/system";
import type { ProColumns } from "@ant-design/pro-components";
import type { TFunction } from "i18next";

export function getConstantColumns(t: TFunction<"translation", undefined>): ProColumns<DepartmentItemType>[] {
	return [
		{
			dataIndex: "index",
			title: t("common.index"),
			valueType: "indexBorder",
			width: 50,
		},
		{
			title: t("system.department.name"),
			dataIndex: "name",
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
			title: t("system.department.code"),
			dataIndex: "code",
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
			title: t("system.department.description"),
			dataIndex: "description",
			width: 120,
			search: false,
		},
		{
			title: t("system.department.manager"),
			dataIndex: "managerId",
			width: 120,
			search: false,
		}
	];
}
