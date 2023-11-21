import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import axios from "axios";
import { addPointerInfo } from "framer-motion";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  const [image, updateImage] = useImmer([]);

  // /edit/:id
  const { id } = useParams();

  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
  }, []);

  useEffect(() => {
    // axios
    //   .get("/api/edit/id/" + id)
    //   .then((response) => updateImage(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function handleSubmit() {
    // 저장 버튼 클릭 시
    // PUT방식 /api/board/edit  , get, post, delete, put, patch, head, option 방식이 있음.
    //넘겨질 데이터가 board
    axios
      .put("/api/board/edit", board)
      .then(() => {
        toast({
          description: board.id + "번 게시글이 수정되었습니다.",
          status: "success",
        });

        navigate("/board/" + id);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "요청이 잘못되었습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "수정 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  function handleDelete() {
    axios.delete();
  }

  return (
    <Box>
      <h1>{id}번 글 수정</h1>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          value={board.title}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.title = e.target.value;
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea
          value={board.content}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.content = e.target.value;
            })
          }
        />
      </FormControl>

      {/* 수정할 때 이미지 보이게 하기 */}
      <FormControl>
        <FormLabel>이미지 파일</FormLabel>
        {board.files.map((board) => (
          <Box key={board.id} my="5px" border="3px solid black">
            <Image width="100%" src={board.url} alt={board.name} />
          </Box>
        ))}
        <Input type="file" accept="image/*" multiple />
        <Button onClick={() => handleDelete(board.url)}>파일 삭제</Button>
      </FormControl>

      <Button colorScheme="blue" onClick={onOpen}>
        저장
      </Button>
      {/* navigate(-1) : 이전 경로로 이동 */}
      <Button onClick={() => navigate(-1)}>취소</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>저장 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>저장 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleSubmit} colorScheme="blue">
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
