import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
	children?: ReactNode;
	title: string;
};

function Category({ children, title }: Props) {
	return (
		<Container>
			<Title>{title}</Title>
			<Grid>{children}</Grid>
		</Container>
	);
}

export default Category;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(18.2rem, 1fr));
	row-gap: 2.7rem;
	column-gap: 1.9rem;
	align-items: flex-start;
`;

const Title = styled.div`
	font-size: 1.8rem;
	margin-bottom: 1.8rem;
`;

const Container = styled.div`
	margin-bottom: 4.5rem;
`;
