import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  function handleSubmit() {
    setIsSubmitting(true);


    axios
      .postForm("/api/board/add", {
        title,
        content,
        file,
      })
      .then(() => {
        toast({
          description: "새 글이 저장되었습니다",
          status: "success",
        });
        navigate("/"); //글 저장이 완료되면 home으로 이동함
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 400) {
          toast({
            description: "작성한 내용을 확인 해주세요",
            status: "error",
          });
        } else {
          toast({
            description: "저장 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Box>
      <h1>게시물 작성</h1>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Textarea>
        </FormControl>
        <FormControl>
          <FormLabel>이미지</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])} //하나의 파일이라고 0번 인덱스
          />
        </FormControl>

        <Button
          isDisabled={isSubmitting}
          onClick={handleSubmit}
          colorScheme="blue"
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}
