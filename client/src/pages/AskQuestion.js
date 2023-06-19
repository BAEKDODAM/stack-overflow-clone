import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import axios from 'axios';

// 로그인 시에만 이용 가능하도록 작성 필요

const AskQuestion = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setFooter(false));
  }, []);

  const [qna, setQna] = useState({
    title: '',
    contents: '',
  });

  const { title, contents } = qna;

  const onChange = (event) => {
    const { value, name } = event.target;
    setQna({
      ...qna,
      [name]: value,
    });
  };

  const saveQna = async () => {
    // 로그인된 사용자의 정보를 서버로 전송
    const qnaData = {
      title,
      createdBy: user?.id,
      contents,
    };

    console.log('qnaData:', qnaData);
    alert('등록되었습니다.');

    // await axios.post(`//localhost:8080/qna`, qnaData).then(() => {
    //   alert('등록되었습니다.');
    // });
  };

  return (
    <>
      <MainComponent>
        <H1>Review Your question</H1>
      </MainComponent>
      <MainComponent>
        <NoticeDiv>
          Please do a final review of your question and then post.
        </NoticeDiv>
      </MainComponent>
      <MainComponent>
        <TextAreaDiv>
          <TextDiv>Title</TextDiv>
          <textarea
            name="title"
            cols={146}
            value={title}
            onChange={onChange}
            placeholder="제목을 작성해주세요."
          ></textarea>
        </TextAreaDiv>
      </MainComponent>
      <MainComponent>
        <TextAreaDiv>
          <TextDiv>Body</TextDiv>
          <textarea
            name="contents"
            cols={146}
            rows={20}
            value={contents}
            onChange={onChange}
            placeholder="내용을 작성해주세요."
          ></textarea>
        </TextAreaDiv>
      </MainComponent>
      <MainComponent>
        <AskButton onClick={saveQna}>
          <Link to="/qna/:qna-id">Post your question</Link>
        </AskButton>
      </MainComponent>
    </>
  );
};

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
`;

const H1 = styled.h1`
  width: 100%;
  font-size: x-large;
`;

const NoticeDiv = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: var(--light-blue);
  border-radius: 5px;
`;

const AskButton = styled.button`
  height: 2.5rem;
  background-color: var(--bright-blue);
  border-radius: 5px;
  a {
    color: white;
    border: none;
    cursor: pointer;
    text-decoration: none;
  }
  :hover {
    background-color: var(--dark-blue);
  }
`;

const TextAreaDiv = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  background-color: var(--light-grey);
`;

const TextDiv = styled.div`
  margin-bottom: 0.5rem;
`;
export default AskQuestion;
