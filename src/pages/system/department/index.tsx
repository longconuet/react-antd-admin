import type { DepartmentItemType } from "#src/api/system";
import type { ActionType, ProColumns, ProCoreActionType } from "@ant-design/pro-components";
import { fetchDeleteDepartmentItem, fetchDepartmentList } from "#src/api/system";
import { BasicButton, BasicContent, BasicTable } from "#src/components";
import { useAuth } from "#src/hooks";

import { PlusCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Popconfirm } from "antd";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Detail } from "./components/detail";
import { getConstantColumns } from "./constants";

export default function Department() {
	const { t } = useTranslation();
	const hasAuth = useAuth();
	const deleteDepartmentItemMutation = useMutation({
		mutationFn: (id: number) => fetchDeleteDepartmentItem(id),
	});
	/* Detail Data */
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [detailData, setDetailData] = useState<Partial<DepartmentItemType>>({});

	const actionRef = useRef<ActionType>(null);

	const handleDeleteRow = async (id: number, action?: ProCoreActionType<object>) => {
		await deleteDepartmentItemMutation.mutateAsync(id);
		await action?.reload?.();
		window.$message?.success(`${t("common.deleteSuccess")}`);
	};

	const columns: ProColumns<DepartmentItemType>[] = [
		...getConstantColumns(t),
		{
			title: t("common.action"),
			valueType: "option",
			key: "option",
			width: 120,
			fixed: "right",
			render: (text, record, _, action) => {
				return [
					<BasicButton
						key="editable"
						type="link"
						size="small"
						// disabled={!hasAuth("update")}
						onClick={async () => {
							setIsOpen(true);
							setTitle(t("system.department.editDepartment"));
							setDetailData(record);
						}}
					>
						{t("common.edit")}
					</BasicButton>,
					<Popconfirm
						key="delete"
						title={t("common.confirmDelete")}
						onConfirm={() => handleDeleteRow(record.id, action)}
						okText={t("common.confirm")}
						cancelText={t("common.cancel")}
					>
						<BasicButton
							type="link"
							size="small"
							className="text-red-500"
						// disabled={!hasAuth("delete")}
						>{t("common.delete")}</BasicButton>
					</Popconfirm>,
				];
			},
		},
	];

	const onCloseChange = () => {
		setIsOpen(false);
		setDetailData({});
	};

	const refreshTable = () => {
		actionRef.current?.reload();
	};
	return (
		<BasicContent className="h-full">
			<BasicTable<DepartmentItemType>
				columns={columns}
				actionRef={actionRef}
				request={async (params) => {
					// console.log(sort, filter);
					const responseData = await fetchDepartmentList({
						pageNumber: params.current,
						pageSize: params.pageSize,
						searchName: params.name || "",
						searchCode: params.code || ""
					});
					return {
						...responseData,
						data: responseData.data,
						total: responseData.totalCount,
					};
				}}
				headerTitle={`${t("common.menu.department")}`}
				toolBarRender={() => [
					<Button
						key="add-department"
						icon={<PlusCircleOutlined />}
						type="primary"
						disabled={!hasAuth("add")}
						onClick={() => {
							setIsOpen(true);
							setTitle(t("system.department.addDepartment"));
						}}
					>
						{t("common.add")}
					</Button>,
				]}
			/>
			<Detail
				title={title}
				open={isOpen}
				onCloseChange={onCloseChange}
				detailData={detailData}
				refreshTable={refreshTable}
			/>
		</BasicContent>
	);
};
