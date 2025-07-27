import '../styles/globals.css';
import { UserStoreProvider } from '../store/userStore';
import { ProjectStoreProvider } from '../store/projectStore';

function MyApp({ Component, pageProps }) {
  return (
    <UserStoreProvider>
      <ProjectStoreProvider>
        <Component {...pageProps} />
      </ProjectStoreProvider>
    </UserStoreProvider>
  );
}

export default MyApp;