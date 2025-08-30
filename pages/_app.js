import '../styles/globals.css';
import { UserStoreProvider } from '../store/userStore';
import { ProjectStoreProvider } from '../store/projectStore';
import { TaskStoreProvider } from "../store/taskStore";

function MyApp({ Component, pageProps }) {
  return (
    <UserStoreProvider>
      <ProjectStoreProvider>
        <TaskStoreProvider>
          <Component {...pageProps} />
        </TaskStoreProvider>
      </ProjectStoreProvider>
    </UserStoreProvider>
  );
}

export default MyApp;