import type { EmployeeItemType, SimpleDepartmentItemType } from "#src/api/system";
import { fetchAddEmployeeItem, fetchUpdateEmployeeItem } from "#src/api/system";

import {
	DrawerForm,
	ProFormSelect,
	ProFormText,
} from "@ant-design/pro-components";
import { useMutation } from "@tanstack/react-query";
import { Form } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface DetailProps {
	title: React.ReactNode
	open: boolean
	detailData: Partial<EmployeeItemType>
	departmentItems: SimpleDepartmentItemType[]
	onCloseChange: () => void
	refreshTable?: () => void
}

export function Detail({ title, open, onCloseChange, detailData, departmentItems, refreshTable }: DetailProps) {
	const { t } = useTranslation();
	const [form] = Form.useForm<EmployeeItemType>();

	const departmentOptions = departmentItems.map((dept) => ({
		value: dept.id,
		label: dept.name,
	}));

	const addEmployeeItemMutation = useMutation({
		mutationFn: fetchAddEmployeeItem,
	});
	const updateEmployeeItemMutation = useMutation({
		mutationFn: fetchUpdateEmployeeItem,
	});

	const onFinish = async (values: EmployeeItemType) => {
		// console.info(values);
		/* If there is id, it is Modified, otherwise it is Added */
		if (detailData.id) {
			await updateEmployeeItemMutation.mutateAsync(values);
			window.$message?.success(t("common.updateSuccess"));
		}
		else {
			await addEmployeeItemMutation.mutateAsync(values);
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
		<DrawerForm<EmployeeItemType>
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
				name="firstName"
				label={t("system.employee.firstName")}
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
				name="lastName"
				label={t("system.employee.lastName")}
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
				name="username"
				disabled={!!detailData.id}
				label={t("system.employee.username")}
			/>

			<ProFormText
				allowClear
				rules={[
					{
						required: true,
					},
				]}
				width="md"
				name="email"
				disabled={!!detailData.id}
				label={t("system.employee.email")}
			/>

			<ProFormText
				allowClear
				rules={[
					{
						required: true,
					},
				]}
				width="md"
				name="phone"
				label={t("system.employee.phoneNumber")}
			/>

			<ProFormSelect
				name="departmentId"
				label={t("system.employee.department")}
				rules={[{ required: true }]}
				options={departmentOptions}
				fieldProps={{
					showSearch: true, // Bật tìm kiếm trong Select
					optionFilterProp: 'label', // Tìm kiếm dựa trên label
				}}
			/>
		</DrawerForm>
	);
};
