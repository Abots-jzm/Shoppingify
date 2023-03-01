import { Variants } from "framer-motion";

export const OverlayVariants: Variants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.15,
		},
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.15,
		},
	},
};

export const ContainerVariants: Variants = {
	hidden: {
		y: -50,
	},
	visible: {
		y: 0,
	},
};
