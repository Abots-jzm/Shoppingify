import React from "react";
import styled from "styled-components";

function NewItemForm() {
	return (
		<Container>
			<h5>Add a new item</h5>
		</Container>
	);
}

export default NewItemForm;

const Container = styled.div`
	padding: 3.5rem 4rem;

	h5 {
		color: black;
		font-size: 2.4rem;
		font-weight: 500;
	}
`;
