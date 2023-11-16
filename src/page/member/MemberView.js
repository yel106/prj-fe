import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export function MemberView() {
  // /member?id=userid 로 넘어오는데 이걸 얻어와야함
  const [member, setMember] = useState(null);
  const [params] = useSearchParams();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios
      .get("/api/member?" + params.toString())
      .then((response) => setMember(response.data))
      .catch((error) => {
        navigate("/login");
        toast({
          description: "권한이 없습니다.",
          status: "warning",
        });
      });
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  function handleDelete() {
    // axios
    // delete /api/member?id=userid

    //ok -> home 이동, toast 띄우기
    // error -> toast 띄우기
    // finally -> modal 닫기

    axios
      .delete("/api/member?" + params.toString())
      .then(() => {
        toast({
          description: "회원 탈퇴하였습니다.",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 없습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "탈퇴 처리중에 문제가 발생했습니다.",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
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
      <FormControl>
        <FormLabel>nickName</FormLabel>
        <Input value={member.nickName} readOnly />
      </FormControl>
      <Button
        colorScheme="pink"
        onClick={() => navigate("/member/edit?" + params.toString())}
      >
        수정
      </Button>
      <Button colorScheme="blue" onClick={onOpen}>
        탈퇴
      </Button>

      {/* 삭제 모달*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>탈퇴 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="red">
              탈퇴
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
