import type { PositionItemType } from "#src/api/system";
import { fetchAddPositionItem, fetchUpdatePositionItem } from "#src/api/system";

import {
	DrawerForm,
	ProFormText,
} from "@ant-design/pro-components";
import { useMutation } from "@tanstack/react-query";
import { Form } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface DetailProps {
	title: React.ReactNode
	open: boolean
	detailData: Partial<PositionItemType>
	onCloseChange: () => void
	refreshTable?: () => void
}

export function Detail({ title, open, onCloseChange, detailData, refreshTable }: DetailProps) {
	const { t } = useTranslation();
	const [form] = Form.useForm<PositionItemType>();

	const addPositionItemMutation = useMutation({
		mutationFn: fetchAddPositionItem,
	});
	const updatePositionItemMutation = useMutation({
		mutationFn: fetchUpdatePositionItem,
	});

	const onFinish = async (values: PositionItemType) => {
		// console.info(values);
		/* If there is id, it is Modified, otherwise it is Added */
		if (detailData.id) {
			await updatePositionItemMutation.mutateAsync(values);
			window.$message?.success(t("common.updateSuccess"));
		}
		else {
			await addPositionItemMutation.mutateAsync(values);
			window.$message?.success(t("common.addSuccess"));
		}
		/* Refresh the form */
		refreshTable?.();
		// No return will not close the pop-up box
		return true;
	};

	useEffect(() => {
		if (open) {
			form.setFieldsValue(detailData);
		}
	}, [open]);

	return (
		<DrawerForm<PositionItemType>
			title={title}
			open={open}
			onOpenChange={(visible) => {
				if (visible === false) {
					onCloseChange();
				}
			}}
			resize={{
				onResize() {
					// console.log('resize!');
				},
				maxWidth: window.innerWidth * 0.8,
				minWidth: 500,
			}}
			labelCol={{ span: 6 }}
			wrapperCol={{ span: 24 }}
			layout="horizontal"
			form={form}
			autoFocusFirstInput
			drawerProps={{
				destroyOnClose: true,
			}}
			onFinish={onFinish}
			initialValues={{
				status: 1,
				menus: [],
			}}
		>

			<ProFormText
				name="id"
				hidden
			/>

			<ProFormText
				allowClear
				rules={[
					{
						required: true,
					},
				]}
				width="md"
				name="name"
				label={t("system.position.name")}
				tooltip={t("form.length", { length: 50 })}
			/>

			<ProFormText
				allowClear
				rules={[
					{
						required: true,
					},
				]}
				width="md"
				name="code"
				disabled={!!detailData.id}
				label={t("system.position.code")}
			/>

			<ProFormText
				allowClear
				rules={[
					{
						required: false,
					},
				]}
				width="md"
				name="description"
				label={t("system.position.description")}
			/>
		</DrawerForm>
	);
};
