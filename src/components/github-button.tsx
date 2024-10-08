import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const SocialLoginButton = styled.button`
  min-width: 300px;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  background-color: #0095f6;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export default function GithubButton() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/");
  };

  return (
    <SocialLoginButton onClick={handleClick}>
      <Logo src="/github-logo.svg" />
      깃허브로 로그인하기
    </SocialLoginButton>
  );
}
