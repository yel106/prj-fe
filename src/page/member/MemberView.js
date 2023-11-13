import { useSearchParams } from "react-router-dom";

export function MemberView() {
  // /member?id=userid 로 넘어오는데 이걸 얻어와야함
  const [params] = useSearchParams();

  return <div>{params.get("id")}님 회원 정보 보기</div>;
}
