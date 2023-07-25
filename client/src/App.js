import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import ContactUs from './components/ContactUs';
import Authentication from './pages/Authentication';
import Upload from './components/Upload';
import Personal from './pages/Personal';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import { StoreProvider } from './utils/GlobalState';
import { Box } from '@mui/material';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <ApolloProvider client={client}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
        <StoreProvider>
          <Nav />
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
            }}>
            <Routes location={previousLocation || location}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Authentication mode="login" />} />
              <Route
                path="/signup"
                element={<Authentication mode="signup" />}
              />
              <Route path="/discover" element={<Discover />} />
              <Route path="/success" element={<Success />} />
              <Route path="/orderHistory/:id" element={<OrderHistory />} />
              <Route path="/photos/:id" element={<Detail />} />
              <Route path="/personal/:id" element={<Personal />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Box>
          <Footer />
        </StoreProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
