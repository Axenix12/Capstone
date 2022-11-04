import { Column } from "@carbon/icons-react";
import styled from "@emotion/styled";

const StyledSection = styled.section({
  display: 'flex',
  flexDirection: 'Column',
  alignItems: 'center',
  flex: '1 1 auto',
  background: '#dfdfdf',
  margin: 0,
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  gap: 1rem;
`;

const Section = ({ children }) => {
  return (
    <StyledSection>
      <Container>{children}</Container>
    </StyledSection>
  );
};

export default Section;
