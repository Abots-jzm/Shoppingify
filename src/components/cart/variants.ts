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

export const DeleteBtnVariants: Variants = {
	hidden: {
		x: "18.7rem",
		transition: {
			duration: 0.4,
		},
	},
	visible: {
		x: 0,
		transition: {
			duration: 0.4,
		},
	},
};

export const RevealVariants: Variants = {
	hidden: {
		backgroundImage: "linear-gradient(90deg, #fff0de 0%, #fff0de 100%, transparent 100%)",
		display: "block",
		transition: {
			duration: 0.4,
		},
	},
	visible: {
		backgroundImage: "linear-gradient(90deg, #fff0de 0%, #fff0de 0%, transparent 0%)",
		display: "none",
		transition: {
			duration: 0.4,
			display: {
				delay: 0.4,
			},
		},
	},
};
