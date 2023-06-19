import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';

const Main = () => {
  const dispatch = useDispatch();
  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(true));
    dispatch(setFooter(true));
  }, []);

  return <div>Main</div>;
};

export default Main;
