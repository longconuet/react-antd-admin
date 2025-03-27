import type { DepartmentItemType } from "#src/api/system";
import { fetchAddDepartmentItem, fetchUpdateDepartmentItem } from "#src/api/system";

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
	detailData: Partial<DepartmentItemType>
	onCloseChange: () => void
	refreshTable?: () => void
}

export function Detail({ title, open, onCloseChange, detailData, refreshTable }: DetailProps) {
	const { t } = useTranslation();
	const [form] = Form.useForm<DepartmentItemType>();

	const addDepartmentItemMutation = useMutation({
		mutationFn: fetchAddDepartmentItem,
	});
	const updateDepartmentItemMutation = useMutation({
		mutationFn: fetchUpdateDepartmentItem,
	});

	const onFinish = async (values: DepartmentItemType) => {
		// console.info(values);
		/* If there is id, it is Modified, otherwise it is Added */
		if (detailData.id) {
			await updateDepartmentItemMutation.mutateAsync(values);
			window.$message?.success(t("common.updateSuccess"));
		}
		else {
			await addDepartmentItemMutation.mutateAsync(values);
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
		<DrawerForm<DepartmentItemType>
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
					{
						max: 100,
						message: t("validation.maxLength", { length: 100 }),
					}
				]}
				width="md"
				name="name"
				label={t("system.department.name")}
				tooltip={t("form.length", { length: 100 })}
			/>

			<ProFormText
				allowClear
				rules={[
					{
						required: true,
					},
					{
						max: 50,
						message: t("validation.maxLength", { length: 50 }),
					}
				]}
				width="md"
				name="code"
				disabled={!!detailData.id}
				label={t("system.department.code")}
				tooltip={t("form.length", { length: 50 })}
			/>

			<ProFormText
				allowClear
				rules={[
					{
						required: false,
					},
					{
						max: 500,
						message: t("validation.maxLength", { length: 500 }),
					}
				]}
				width="md"
				name="description"
				label={t("system.department.description")}
			/>
		</DrawerForm>
	);
};
