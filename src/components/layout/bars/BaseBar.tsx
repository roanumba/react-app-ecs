import { styled } from '@mui/system';

const SidebarWrapper = styled('div')`
  width: 250px;
  background-color: #f0f0f0;
`;

interface Props {
  children?: React.ReactNode;
  open?: boolean;
}

export const BaseBar=(props:Props) =>{
  const { children,open } = props;
  return open?<SidebarWrapper style={{ width: open ? '250px' : '0' }}>
    {<div>
      {children}
    </div>} 
    </SidebarWrapper>:null;
}