import type { ParamsType, ProTableProps } from "@ant-design/pro-components";

import type { TablePaginationConfig } from "antd";

import { cn } from "#src/utils/cn";
import { DownOutlined, LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { useSize } from "ahooks";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { BASIC_TABLE_ROOT_CLASS_NAME } from "./constants";
import { useStyles } from "./styles";

export interface BasicTableProps<D, U, V> extends ProTableProps<D, U, V> {
	/**
	 * @description Whether to fill the parent element
	 * @default true
	 */
	autoHeight?: boolean
	/**
	 * @description Offset at the bottom of the table
	 * @default 0
	 */
	offsetBottom?: number
}

/**
* When the table is always in the screen, the table height is adaptive
* If the table may not be visible on the screen or is not located in the main layout label, please set autoHeight to false to avoid jitter in the table. Refer to the warning section below
*/
export function BasicTable<
	DataType extends Record<string, any>,
	Params extends ParamsType = ParamsType,
	ValueType = "text",
>(
	props: BasicTableProps<DataType, Params, ValueType>,
) {
	const classes = useStyles();
	const { t } = useTranslation();
	const { autoHeight = true, offsetBottom } = props;
	const tableWrapperRef = useRef<HTMLDivElement>(null);
	const size = useSize(tableWrapperRef);
	const [scrollY, setScrollY] = useState(autoHeight ? 0 : undefined);

	/**
	* @description Tables are highly adaptive
	* This is a hook method, waiting for antd to fix
	* @see https://github.com/ant-design/ant-design/issues/23974
	*/
	useEffect(() => {
		const isPaginationDisabled = props.pagination === false;
		if (autoHeight && tableWrapperRef.current && size?.height) {
			const tableWrapperHeight = size.height;
			const basicTable = tableWrapperRef.current.getElementsByClassName(BASIC_TABLE_ROOT_CLASS_NAME)[0];

			if (!basicTable)
				return;

			const tableWrapperRect = tableWrapperRef.current.getBoundingClientRect();

			// If the table exceeds the screen height, no height adaptation is performed
			if (tableWrapperRect.top > window.innerHeight) {
				setScrollY(undefined);
				return;
			}

			const tableBody = basicTable.querySelector("div.ant-table-body");

			if (!tableBody)
				return;

			// Get the bounding box of the element
			const tableBodyRect = tableBody.getBoundingClientRect();
			// The height of the table header
			const tableHeaderHeight = tableBodyRect.top - tableWrapperRect.top;
			/**
			 * The height of the table pagination
			 *
			 * @warning The table must be a child element of the main tag, because the padding-bottom(16) of the main tag will affect the height of the table.
			 * height of pagination 24, upper margin 16, padding-bottom 16 of main tag
			 *
			 * Unable to get the pager DOM To calculate the height of the pager from the bottom of the screen:
			 * 1. The DOM of the paginator may be undefined, but it may be because the paginator will render after the table rendering is completed.
			 * 2. The height of the table body is not set, and it is impossible to ensure that the pager is in the correct position, resulting in inaccurate height calculations
			 *
			 */
			const paginationHeight = isPaginationDisabled ? 16 : 24 + 16 + 16;
			const realOffsetBottom = offsetBottom || paginationHeight;

			const bodyHeight = Math.max(400, tableWrapperHeight - tableHeaderHeight - realOffsetBottom);
			if (bodyHeight - tableBodyRect.height <= 10) {
				return;
			}
			tableBody.setAttribute("style", `overflow-y: auto;min-height: ${bodyHeight}px;max-height: ${bodyHeight}px;`);
		}
	}, [size, autoHeight, offsetBottom, props.pagination]);

	const getLoadingProps = () => {
		if (props.loading === false) {
			return false;
		}
		if (props.loading === true) {
			return true;
		}
		return {
			indicator: <LoadingOutlined spin />,
			...props.loading,
		};
	};

	const getPaginationProps = () => {
		if (props.pagination === false) {
			return false;
		}

		return {
			position: ["bottomRight"],
			defaultPageSize: 10,
			showQuickJumper: true,
			showSizeChanger: true,
			showTotal: total => t("common.pagination", { total }),
			...props.pagination,
		} satisfies TablePaginationConfig;
	};

	return (
		<div className="h-full" ref={tableWrapperRef}>
			<ProTable
				cardBordered
				rowKey="id"
				dateFormatter="string"
				{...props}
				options={{
					fullScreen: true,
					...props.options,
				}}
				rootClassName={cn(BASIC_TABLE_ROOT_CLASS_NAME, props.rootClassName)}
				className={cn(classes.basicTable, props.className)}
				// Set y to 0 to ensure that tableBodyRect.height is less than bodyHeight
				scroll={{ y: scrollY, ...props.scroll }}
				loading={getLoadingProps()}
				pagination={getPaginationProps()}
				expandable={{
					// expandIcon: ({ expanded, onExpand, record }) => {
					// 	return expanded
					// 		? (
					// 			<RightOutlined onClick={e => onExpand(record, e)} />
					// 		)
					// 		: (
					// 			<DownOutlined onClick={e => onExpand(record, e)} />
					// 		);
					// },
					...props.expandable,
				}}
			/>
		</div>
	);
}
