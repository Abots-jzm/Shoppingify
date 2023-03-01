import React, { useRef } from "react";
import styled from "styled-components";
import Select from "react-select/creatable";
import { StylesConfig } from "react-select/dist/declarations/src";
import { ErrorMessage, Field, useField } from "formik";
import { SelectOption } from "./types";
import { useAppSelector } from "../../store/hooks";

function NewItemForm() {
	const selectStyles: StylesConfig = {
		control: (styles, { isFocused }) => ({
			...styles,
			border: isFocused ? "2px solid #f9a109" : "2px solid #bdbdbd",
			outline: "none",
			borderRadius: "12px",
			padding: "1.6rem 1.2rem",
			margin: "0",
			boxShadow: "none",
			backgroundColor: "inherit",
			"&:hover": {
				border: isFocused ? "2px solid #f9a109" : "2px solid #bdbdbd",
			},
		}),
		placeholder: (styles) => ({
			...styles,
			color: "#bdbdbd",
		}),
		clearIndicator: (styles) => ({
			...styles,
			padding: "none",
			margin: "none",
			color: "#828282",
		}),
		input: (styles) => ({
			...styles,
			padding: "none",
			margin: "none",
		}),
		menu: (styles) => ({
			...styles,
			border: "1px solid #E0E0E0",
			borderRadius: "12px",
			boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.04)",
			color: "#828282",
			padding: "0.8rem",
		}),
		option: (styles, { isSelected, isFocused }) => ({
			...styles,
			padding: "1.1rem 2.2rem",
			borderRadius: "12px",
			background: isSelected ? "#f9a109" : isFocused ? "#F2F2F2" : "inherit",
			color: isSelected ? "white" : isFocused ? "#34333A" : "inherit",
			cursor: "pointer",
		}),
	};

	const selectLabelRef = useRef<HTMLLabelElement>(null);

	const availableCategories = useAppSelector((state) => state.app.availableCategories);

	function getSelectOptions(availableCategories: string[]): SelectOption[] {
		return availableCategories.map((cateogry) => ({ value: cateogry, label: cateogry }));
	}

	const [field, _, helpers] = useField({ name: "category" });

	return (
		<Container>
			<h5>Add a new item</h5>
			<FieldsContainer>
				<div>
					<ErrorMessage component={FormError} name="name" />
					<Field as={FormInput} placeholder="Enter a name" id="name" name="name" />
					<FormLabel htmlFor="name">Name</FormLabel>
				</div>
				<div>
					<Field as={FormTextArea} placeholder="Enter a note" id="note" name="note" />
					<FormLabel htmlFor="note">Note (optional)</FormLabel>
				</div>
				<div>
					<ErrorMessage name="image" component={FormError} />
					<Field as={FormInput} placeholder="Enter a url" id="image" name="image" />
					<FormLabel htmlFor="image">Image (optional)</FormLabel>
				</div>
				<div>
					<ErrorMessage name="category" component={FormError} />
					<Select
						{...field}
						name="category"
						options={getSelectOptions(availableCategories)}
						isLoading={availableCategories.length === 0}
						placeholder="Enter a category"
						styles={selectStyles}
						isClearable
						components={{
							IndicatorSeparator: () => null,
							DropdownIndicator: () => null,
						}}
						onFocus={() => {
							if (selectLabelRef.current) selectLabelRef.current.style.color = "#f9a109";
						}}
						onBlur={() => {
							if (selectLabelRef.current) selectLabelRef.current.style.color = "#34333a";
						}}
						onChange={(e: SelectOption) => helpers.setValue(e)}
					/>
					<FormLabel htmlFor="category" ref={selectLabelRef}>
						Category
					</FormLabel>
				</div>
			</FieldsContainer>
		</Container>
	);
}

export default NewItemForm;

const FormError = styled.span`
	color: #eb5757;
	font-size: 1.4rem;
`;

const FormTextArea = styled.textarea`
	border: 2px solid #bdbdbd;
	border-radius: 12px;
	padding: 2rem;
	background-color: inherit;
	outline: none;
	font: inherit;
	height: 11rem;
	resize: none;

	&:active,
	&:focus {
		border: 2px solid #f9a109;

		& ~ label {
			color: #f9a109;
		}
	}

	&::placeholder {
		color: #bdbdbd;
	}

	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-track {
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 100rem;
	}

	&::-webkit-scrollbar-thumb {
		height: 1rem;
		background: #444;
		border-radius: 100rem;
	}
`;

const FormInput = styled.input`
	border: 2px solid #bdbdbd;
	border-radius: 12px;
	padding: 2rem;
	background-color: inherit;
	outline: none;

	&:active,
	&:focus {
		border: 2px solid #f9a109;

		& ~ label {
			color: #f9a109;
		}
	}

	&::placeholder {
		color: #bdbdbd;
	}
`;

const FormLabel = styled.label`
	font-size: 1.4rem;
	color: #34333a;
`;

const FieldsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;

	& > div {
		display: flex;
		flex-direction: column-reverse;
		gap: 0.6rem;
	}
`;

const Container = styled.div`
	padding: 3.5rem 4rem;

	h5 {
		color: black;
		font-size: 2.4rem;
		font-weight: 500;
		margin-bottom: 3.4rem;
	}
`;
