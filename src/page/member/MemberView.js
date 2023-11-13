import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

export function MemberView() {
  // /member?id=userid 로 넘어오는데 이걸 얻어와야함
  const [member, setMember] = useState(null);
  const [params] = useSearchParams();

  useEffect(() => {
    axios
      .get("/api/member?" + params.toString())
      .then((response) => setMember(response.data));
  }, []);

  if (member === null) {
    return <Spinner />;
  }
  return (
    <Box>
      <h1>{member.id}님 정보</h1>
      <FormControl>
        <FormLabel>password</FormLabel>
        <Input type="text" value={member.password} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>email</FormLabel>
        <Input value={member.email} readOnly />
      </FormControl>
      <Button colorScheme="pink">수정</Button>
      <Button colorScheme="blue">삭제</Button>
    </Box>
  );
}
