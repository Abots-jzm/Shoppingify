import { Variants } from "framer-motion";

export const ContainerVariants: Variants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.1,
			when: "afterChildren",
		},
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.1,
			when: "beforeChildren",
		},
	},
};

export const CartVariants: Variants = {
	hidden: {
		x: "100%",
		transition: {
			duration: 0.2,
		},
	},
	visible: {
		x: 0,
		transition: {
			duration: 0.3,
		},
	},
};
