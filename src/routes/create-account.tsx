import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
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
      <EntranceLogo></EntranceLogo>
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
      <GithubButton />
      {error !== "" ? <Error>{error}</Error> : null}
      <StyledLink to="/login">이메일로 로그인하기</StyledLink>
    </Wrapper>
  );
}
