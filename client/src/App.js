import './App.css';
// import AuthUser from "./Components/AuthUser";
import Guest from './navbar/guest';
import Auth from './navbar/auth';
import AuthUser from './Components/AuthUser';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function App() {
  const queryClient = new QueryClient();
  const { getToken } = AuthUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate('/');
    }
  }, []);

  if (!getToken()) {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Guest />
        </QueryClientProvider>
      </>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Auth />
    </QueryClientProvider>
  );
}

export default App;
