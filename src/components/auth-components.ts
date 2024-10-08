import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  min-width: 360px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Input = styled.input`
  min-width: 300px;
  width: 300px;
  height: 40px;
  padding: 0 10px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

export const Button = styled.button`
  min-width: 300px;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  background-color: #0095f6;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;

export const Error = styled.div`
  font-weight: 600;
  color: red;
`;

export const StyledLink = styled(Link)`
  margin-top: 30px;
  color: #0095f6;
  font-weight: 700;
  cursor: pointer;
`;
