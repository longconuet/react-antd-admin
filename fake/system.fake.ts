import { system } from "#/src/router/extra-info";

import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { resultSuccess } from "./utils";

const systemMenu = [
	// 系统管理
	{
		id: system,
		menuType: 0, // 菜单类型（0 代表菜单、1 代表 iframe、2 代表外链、3 代表按钮）
		name: "common.menu.system",
	},
	{
		parentId: system,
		id: system + 1,
		menuType: 0,
		name: "common.menu.user",
	},
	{
		parentId: system,
		id: system + 2,
		menuType: 0,
		name: "common.menu.role",
	},
	{
		parentId: system,
		id: system + 3,
		menuType: 0,
		name: "common.menu.menu",
	},
	{
		parentId: system,
		id: system + 4,
		menuType: 0,
		name: "common.menu.dept",
	},
	{
		parentId: system + 4,
		id: system + 4 + 1,
		menuType: 3,
		name: "common.add",
	},
	{
		parentId: system + 4,
		id: system + 4 + 2,
		menuType: 3,
		name: "common.edit",
	},
	{
		parentId: system + 4,
		id: system + 4 + 3,
		menuType: 3,
		name: "common.delete",
	},
	{
		parentId: system,
		id: system + 5,
		menuType: 0,
		name: "common.menu.position",
	},
	{
		parentId: system,
		id: system + 6,
		menuType: 0,
		name: "common.menu.department",
	},
	{
		parentId: system,
		id: system + 7,
		menuType: 0,
		name: "common.menu.employee",
	},
];

export default defineFakeRoute([
	// Role Management
	{
		url: "/role-list",
		method: "get",
		response: ({ body }) => {
			let list = [
				{
					createTime: 1729752330782, // 时间戳（毫秒ms）
					updateTime: 1729752330782,
					id: 1,
					name: "Super Administrator",
					code: "admin",
					status: 1, // 状态 1 启用 0 停用
					remark: "Super administrator has the highest permissions",
				},
				{
					createTime: 1729752330782,
					updateTime: 1729752330782,
					id: 2,
					name: "Ordinary role",
					code: "common",
					status: 1,
					remark: "Ordinary roles have some permissions",
				},
			];
			// list = Array.from({ length: 10000 }).flatMap(() => list);
			list = list.filter(item =>
				item.name.includes(body?.name ?? "")
				&& String(item.status).includes(String(body?.status ?? ""))
				&& (!body?.code || item.code === body?.code),
			);
			return resultSuccess({
				list,
				total: list.length, // 总条目数
				pageSize: 10, // 每页显示条目个数
				current: 1, // 当前页数
			});
		},
	},
	// Role Management - Added Roles
	{
		url: "/role-item",
		method: "post",
		response: ({ body }) => {
			return resultSuccess(body);
		},
	},
	// Role Management - Modify Roles
	{
		url: "/role-item",
		method: "put",
		response: ({ body }) => {
			return resultSuccess(body);
		},
	},
	// Role Management - Delete Roles
	{
		url: "/role-item",
		method: "delete",
		response: ({ body }) => {
			return resultSuccess(body);
		},
	},
	// Role Management - Permissions - Menu Permissions
	{
		url: "/role-menu",
		method: "get",
		response: () => {
			return resultSuccess(systemMenu);
		},
	},
	// Role Management - Permissions - Menu Permissions, check the corresponding menu according to the role id
	{
		url: "/menu-by-role-id",
		method: "get",
		response: ({ query }) => {
			if (query.id === "1") {
				return resultSuccess(systemMenu.map(item => item.id));
			}
			else if (query.id === "2") {
				return resultSuccess([]);
			}
			return resultSuccess([]);
		},
	},

	// Position Management
	{
		url: "/Position",
		method: "get",
		response: ({ body }) => {
			return {
				"pageNumber": 1,
				"pageSize": 10,
				"totalCount": 5,
				"data": [
					{
						"id": "59489d5a-8e03-44c4-bdaf-0b2cd033809f",
						"name": "string1",
						"code": "string1",
						"description": "string"
					},
					{
						"id": "56ac0aaf-0945-4f51-b652-1c4586024fcb",
						"name": "Business Analyst",
						"code": "ba",
						"description": "Business Analyst"
					},
					{
						"id": "ff9e21c0-27f7-40e4-adaf-e138652e241c",
						"name": "QA Engineer",
						"code": "qa",
						"description": "Quality Assurance Engineer"
					},
					{
						"id": "0dc2354d-e84a-4f07-bca3-3609e0de9934",
						"name": "HR Manager",
						"code": "hrm",
						"description": "Human Resources Manager"
					},
					{
						"id": "354e7b73-2857-4aee-a2a2-b6b6966f2fb8",
						"name": "Software Developer",
						"code": "sd",
						"description": "Software Developer"
					}
				]
			};
		},
	},
	// Position Management - Permissions - Menu Permissions
	{
		url: "/position-menu",
		method: "get",
		response: () => {
			return resultSuccess(systemMenu);
		},
	},
	// Position Management - Permissions - Menu Permissions, check the corresponding menu according to the role id
	{
		url: "/menu-by-position-id",
		method: "get",
		response: ({ query }) => {
			if (query.id === "1") {
				return resultSuccess(systemMenu.map(item => item.id));
			}
			else if (query.id === "2") {
				return resultSuccess([]);
			}
			return resultSuccess([]);
		},
	},
	// Position Management - Added Position
	{
		url: "/Position",
		method: "post",
		response: ({ body }) => {
			return resultSuccess(body);
		},
	},
	// Position Management - Modify Position
	{
		url: "/Position",
		method: "put",
		response: ({ body }) => {
			return resultSuccess(body);
		},
	},
	// Position Management - Delete Position
	{
		url: "/Position",
		method: "delete",
		response: ({ body }) => {
			return resultSuccess(body);
		},
	},
	// 菜单管理
	{
		url: "/menu-list",
		method: "get",
		response: () => {
			const menuList = [
				// 系统管理
				{
					parentId: "", // 上级菜单 id
					id: system, // 菜单 id
					menuType: 0, // 菜单类型（0 代表菜单、1 代表 iframe、2 代表外链、3 代表按钮）
					name: "common.menu.system", // 菜单名称
					path: "/system", // 路由路径
					component: "/system", // 组件路径
					order: system, // 菜单顺序
					icon: "SettingOutlined", // 菜单图标
					currentActiveMenu: "", // 激活路径
					iframeLink: "", // iframe 链接
					keepAlive: true, // 是否缓存页面
					externalLink: "", // 外链地址
					hideInMenu: false, // 是否在菜单中隐藏
					ignoreAccess: false, // 是否忽略权限
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system,
					id: system + 1,
					menuType: 0,
					name: "common.menu.user",
					path: "/system/user", // 路由路径
					component: "/system/user", // 组件路径
					order: undefined, // 菜单顺序
					icon: "UserOutlined", // 菜单图标
					currentActiveMenu: "", // 激活路径
					iframeLink: "", // iframe 链接
					keepAlive: true, // 是否缓存页面
					externalLink: "", // 外链地址
					hideInMenu: false, // 是否在菜单中隐藏
					ignoreAccess: false, // 是否忽略权限
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system,
					id: system + 2,
					menuType: 0,
					name: "common.menu.role",
					path: "/system/role", // 路由路径
					component: "/system/role", // 组件路径
					order: undefined, // 菜单顺序
					icon: "TeamOutlined", // 菜单图标
					currentActiveMenu: "", // 激活路径
					iframeLink: "", // iframe 链接
					keepAlive: true, // 是否缓存页面
					externalLink: "", // 外链地址
					hideInMenu: false, // 是否在菜单中隐藏
					ignoreAccess: false, // 是否忽略权限
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system,
					id: system + 3,
					menuType: 0,
					name: "common.menu.menu",
					path: "/system/menu", // 路由路径
					component: "/system/menu", // 组件路径
					order: undefined, // 菜单顺序
					icon: "MenuOutlined", // 菜单图标
					currentActiveMenu: "", // 激活路径
					iframeLink: "", // iframe 链接
					keepAlive: true, // 是否缓存页面
					externalLink: "", // 外链地址
					hideInMenu: false, // 是否在菜单中隐藏
					ignoreAccess: false, // 是否忽略权限
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system,
					id: system + 4,
					menuType: 0,
					name: "common.menu.dept",
					path: "/system/dept", // 路由路径
					component: "/system/dept", // 组件路径
					order: undefined, // 菜单顺序
					icon: "ApartmentOutlined", // 菜单图标
					currentActiveMenu: "", // 激活路径
					iframeLink: "", // iframe 链接
					keepAlive: true, // 是否缓存页面
					externalLink: "", // 外链地址
					hideInMenu: false, // 是否在菜单中隐藏
					ignoreAccess: false, // 是否忽略权限
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system + 4,
					id: system + 4 + 1,
					menuType: 3,
					name: "common.add",
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system + 4,
					id: system + 4 + 2,
					menuType: 3,
					name: "common.edit",
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system + 4,
					id: system + 4 + 3,
					menuType: 3,
					name: "common.delete",
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system,
					id: system + 5,
					menuType: 0,
					name: "common.menu.position",
					path: "/system/position", // 路由路径
					component: "/system/position", // 组件路径
					order: undefined, // 菜单顺序
					icon: "TeamOutlined", // 菜单图标
					currentActiveMenu: "", // 激活路径
					iframeLink: "", // iframe 链接
					keepAlive: true, // 是否缓存页面
					externalLink: "", // 外链地址
					hideInMenu: false, // 是否在菜单中隐藏
					ignoreAccess: false, // 是否忽略权限
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
			];
			return resultSuccess({
				list: menuList,
				total: menuList.length, // 总条目数
				pageSize: 10, // 每页显示条目个数
				current: 1, // 当前页数
			});
		},
	},
	{
		url: "/menu-item",
		method: "post",
		response: () => {
			return resultSuccess({});
		},
	},
	{
		url: "/menu-item",
		method: "delete",
		response: () => {
			return resultSuccess({});
		},
	},
	{
		url: "/menu-item",
		method: "put",
		response: () => {
			return resultSuccess({});
		},
	},
]);
