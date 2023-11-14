import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NavBar() {
  const navigate = useNavigate();

  function handleLogout() {
    // TODO: 로그아웃 후 할 일 추가
    axios.post("/api/member/logout").then(() => console.log("로그아웃 성공"));
  }

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>home</Button>
      <Button onClick={() => navigate("/write")}>write</Button>
      <Button onClick={() => navigate("/signup")}>sign up</Button>
      <Button onClick={() => navigate("/member/list")}>회원목록</Button>
      <Button onClick={() => navigate("/login")}>로그인</Button>
      <Button onClick={handleLogout}>로그 아웃</Button>{" "}
      {/*로그 아웃은 이동할 필요없음*/}
    </Flex>
  );
}
