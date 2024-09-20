import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #939393;
  color: black;
`;

const Message = styled.h1`
  font-size: 5rem;
`;

export default function LoadingScreen() {
  return (
    <>
      <Wrapper>
        <Message>Loading...</Message>
      </Wrapper>
    </>
  );
}
