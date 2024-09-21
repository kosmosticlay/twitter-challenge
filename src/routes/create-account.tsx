import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-width: 360px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  min-width: 300px;
  width: 300px;
  height: 40px;
  padding: 0 10px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const Button = styled.button`
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

const StyledLink = styled(Link)`
  margin-top: 30px;
  color: #0095f6;
  font-weight: 700;
  cursor: pointer;
`;

export default function CreateAccount() {
  return (
    <Wrapper>
      <Title>계정 생성하기</Title>
      <Form>
        <Input
          name="name"
          type="text"
          placeholder="이름을 입력하세요."
          required
          autoComplete="off"
        />
        <Input
          name="email"
          type="email"
          placeholder="이메일을 입력하세요."
          required
          autoComplete="off"
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          required
          autoComplete="off"
        />
        <Button>생성하기</Button>
      </Form>
      <StyledLink to="/login">로그인</StyledLink>
    </Wrapper>
  );
}
