import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

const colorMap = {
	primary: {
		bg: "bg-primary",
		fg: "text-primary-foreground",
		shadow: "hover:shadow-[0_0_20px_-2px_#f67a7e]",
	},
	secondary: {
		bg: "bg-secondary",
		fg: "text-secondary-foreground",
		shadow: "hover:shadow-[0_0_20px_-2px_#1b71e9]",
	},
} as const;

type ColorKey = keyof typeof colorMap;

interface GlowButtonBaseProps {
	color?: ColorKey;
	className?: string;
	children: React.ReactNode;
	target?: string;
}

type GlowButtonAsLink = GlowButtonBaseProps & {
	href: string;
	disabled?: never;
} & Omit<
		ComponentProps<typeof Link>,
		"className" | "children" | "to" | "disabled"
	>;

type GlowButtonAsButton = GlowButtonBaseProps & {
	href?: undefined;
} & Omit<ComponentProps<"button">, "className" | "children">;

type GlowButtonProps = GlowButtonAsLink | GlowButtonAsButton;

export function GlowButton({
	color = "primary",
	className = "",
	children,
	target = "_self",
	...props
}: GlowButtonProps) {
	const { bg, fg, shadow } = colorMap[color];
	const base = `group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm overflow-hidden transition-all duration-300 active:scale-[0.97] cursor-pointer ${bg} ${fg} ${shadow} ${className}`;

	if (props.href !== undefined) {
		const { href, ...rest } = props;
		return (
			<Link
				target={target}
				to={href}
				className={base}
				{...(rest as Omit<
					ComponentProps<typeof Link>,
					"className" | "children" | "to" | "target"
				>)}
			>
				<span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
				<span className="relative flex items-center gap-2">{children}</span>
			</Link>
		);
	}

	const { target: _, ...buttonProps } = props as ComponentProps<"button"> & {
		target?: string;
	};
	return (
		<button className={base} {...buttonProps}>
			<span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
			<span className="relative flex items-center gap-2">{children}</span>
		</button>
	);
}
