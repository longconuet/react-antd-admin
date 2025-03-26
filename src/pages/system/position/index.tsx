import type { PositionItemType } from "#src/api/system";
import type { ActionType, ProColumns, ProCoreActionType } from "@ant-design/pro-components";
import { fetchDeletePositionItem, fetchPositionList } from "#src/api/system";
import { BasicButton, BasicContent, BasicTable } from "#src/components";
import { useAuth } from "#src/hooks";

import { PlusCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Popconfirm } from "antd";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Detail } from "./components/detail";
import { getConstantColumns } from "./constants";

export default function Position() {
	const { t } = useTranslation();
	const hasAuth = useAuth();
	const deletePositionItemMutation = useMutation({
		mutationFn: (id: number) => fetchDeletePositionItem(id),
	});
	/* Detail Data */
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [detailData, setDetailData] = useState<Partial<PositionItemType> & { menus?: string[] }>({});

	const actionRef = useRef<ActionType>(null);

	const handleDeleteRow = async (id: number, action?: ProCoreActionType<object>) => {
		await deletePositionItemMutation.mutateAsync(id);
		await action?.reload?.();
		window.$message?.success(`${t("common.deleteSuccess")}`);
	};

	const columns: ProColumns<PositionItemType>[] = [
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
							setTitle(t("system.position.editPosition"));
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
			<BasicTable<PositionItemType>
				columns={columns}
				actionRef={actionRef}
				request={async (params) => {
					// console.log(sort, filter);
					const responseData = await fetchPositionList({
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
				headerTitle={`${t("common.menu.position")}`}
				toolBarRender={() => [
					<Button
						key="add-position"
						icon={<PlusCircleOutlined />}
						type="primary"
						disabled={!hasAuth("add")}
						onClick={() => {
							setIsOpen(true);
							setTitle(t("system.position.addPosition"));
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
