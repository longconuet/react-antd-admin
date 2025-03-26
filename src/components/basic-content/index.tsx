import { clsx } from "clsx";

interface Props {
	style?: React.CSSProperties
	className?: string
	children: React.ReactNode
}

export function BasicContent(props: Props) {
	const { children, className, style } = props;

	return (
		<div
			id="basic-content"
			/**
			 * 1. When the height of children is too high and the p-4 style is set, h-full cannot be set to prevent the padding-bottom at the bottom from appearing.
			 * Please refer to src/pages/about/index.tsx
			 *
			 * 2. If the height of children is less than or equal to basic-content, please use h-full
			 * Please refer to src/pages/system/role/index.tsx
			 */
			className={clsx("p-4 box-border", className)}
			style={{ ...style }}
		>
			{
				children
			}
		</div>
	);
}
