import styled from "@emotion/styled";
import logo from "../../public/DU-Logo-Mark.svg";

const Header = () => {
    return (
        <HeaderBar> 
            <Container>
                <LogoContainer>
                  <Logo src={logo} />
                </LogoContainer>
                <Title>
                    <h1>Gardner's Capstone</h1>
                </Title>
            </Container>
        </HeaderBar>
    )
}

export default Header;

const HeaderBar = styled.div({
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    minHeight: 50,
    
    backgroundColor: 'white',
  });

  const Logo = styled.img({
    height: 60,
    width: 60,
    marginRight: 8,
  });

  const LogoContainer = styled.div({ display: 'flex', alignSelf: 'center' });

  const Title = styled.div({
    display: 'flex',
    flexDirection: 'column',
    h3: {
      lineHeight: '1em',
      marginBottom: 0,
    },
    div: {
      fontSize: '0.9em',
      lineHeight: '0.8em',
      paddingLeft: 2,
    },
  });

  const Container = styled.div({
    width: 1100,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  });