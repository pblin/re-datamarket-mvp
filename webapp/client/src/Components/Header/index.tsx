import * as React from 'react';
import { ComponentClass } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.span`font-size: 20px;`;

const AppLink: ComponentClass<any> = styled(Link)`
  margin-left: 20px;
`;

const Header = () =>
  <Wrapper>
    <span>
      <h1>Rebloc Data Marketplace</h1>
      <a href="https://rebloc.auth0.com/v2/logout?returnTo=http://localhost:3000/">Logout</a>
      <AppLink to="/login">Login</AppLink>
    </span>
  </Wrapper>;

export default withRouter(Header);
