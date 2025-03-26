import type { PositionItemType } from "#src/api/system";
import type { ProColumns } from "@ant-design/pro-components";
import type { TFunction } from "i18next";

export function getConstantColumns(t: TFunction<"translation", undefined>): ProColumns<PositionItemType>[] {
	return [
		{
			dataIndex: "index",
			title: t("common.index"),
			valueType: "indexBorder",
			width: 50,
		},
		{
			title: t("system.position.name"),
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
			title: t("system.position.code"),
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
			disable: true,
			title: t("system.position.description"),
			dataIndex: "description",
			width: 120,
			filters: true,
			onFilter: true,
			ellipsis: true,
		}
	];
}
