import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Button,
  Error,
  Form,
  Input,
  StyledLink,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-button";
import EntranceLogo from "../components/logo/entrance-logo";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isLoading || email === "" || password === "") return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
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
      <EntranceLogo></EntranceLogo>
      <Title>로그인 하기</Title>
      <Form onSubmit={handleSubmit}>
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
        <Button>{isLoading ? "로그인 중..." : "로그인 하기"}</Button>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <StyledLink to="/create-account">계정 생성하기</StyledLink>
      <GithubButton />
    </Wrapper>
  );
}
