import { Button, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';


import { useEffect, useState } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import { MainContent } from './MainContent';
import NavBar from './NavBar';
import { Footer } from './bars/Footer';
import { LeftBar } from './bars/LeftBar';
import { RightBar } from './bars/RightBar';
import { Header } from './bars/Header';
import { globalState } from '../../context/models/GlobalState';



const LayoutWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainWrapper = styled('div')`
  display: flex;
  flex-grow: 1;
`;

const ContentWrapper = styled('div')`
  flex-grow: 1;
  padding: 16px;
`;

export const Layout=()=> {
    const navigate=useNavigate();
 
    const [leftSidebarOpen, setleftSidebarOpen] = useState(true);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setleftSidebarOpen(!leftSidebarOpen);
    };

    const location = useLocation();

    // Listen to route changes
    useEffect(() => {
      
      const unsub=globalState.subscribe("navigator",(st:any)=>{
            navigate(st.path,st.state);
      });
  
    globalState.navigateTo({path:'/',state:{}});

    return ()=>{
      unsub();
    }
    }, []);

    useEffect(() => {
      // Your logic here to handle route changes
      console.log('Route changed:', location.pathname  );
      
    }, [location]);
    
  return (
    <LayoutWrapper>
      <CssBaseline />
      <Header/>
      <MainWrapper>
        <LeftBar open={leftSidebarOpen}/>
        <ContentWrapper>
        <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
        <Button  variant='outlined' onClick={()=>{
        
            navigate('/home/one');

           
        }}>
          navigat to Home 1
        </Button>
          <MainContent/>
        </ContentWrapper>
        <RightBar open={rightSidebarOpen}/>
      </MainWrapper>
    
        <Footer/>
    
    </LayoutWrapper>
  );
}