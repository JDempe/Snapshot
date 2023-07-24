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
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          minHeight: '100vh',
        }}>
        <StoreProvider>
          <Nav />
          <Routes location={previousLocation || location}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Authentication mode="login" />} />
            <Route path="/signup" element={<Authentication mode="signup" />} />
            <Route path="/success" element={<Success />} />
            <Route path="/orderHistory/:id" element={<OrderHistory />} />
            <Route path="/photos/:id" element={<Detail />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
          {previousLocation && (
            <Routes>
              <Route path="/upload" element={<Upload />} />
            </Routes>
          )}
          <Footer />
        </StoreProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
