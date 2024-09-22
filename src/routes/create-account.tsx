import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

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

const Error = styled.div`
  font-weight: 600;
  color: red;
`;

const StyledLink = styled(Link)`
  margin-top: 30px;
  color: #0095f6;
  font-weight: 700;
  cursor: pointer;
`;

export default function CreateAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>계정 생성하기</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          onChange={handleChange}
          name="name"
          value={name}
          type="text"
          placeholder="이름을 입력하세요."
          required
          autoComplete="off"
        />
        <Input
          onChange={handleChange}
          name="email"
          value={email}
          type="email"
          placeholder="이메일을 입력하세요."
          required
          autoComplete="off"
        />
        <Input
          onChange={handleChange}
          name="password"
          value={password}
          type="password"
          placeholder="비밀번호를 입력하세요."
          required
          autoComplete="off"
        />
        <Button>{isLoading ? "계정 생성 중..." : "계정 생성하기"}</Button>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <StyledLink to="/login">로그인</StyledLink>
    </Wrapper>
  );
}
