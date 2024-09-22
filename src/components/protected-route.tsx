import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

// 로그인한 사용자만 접근 가능, 로그인하지 않은 경우 로그인 페이지로 리다이렉트
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
