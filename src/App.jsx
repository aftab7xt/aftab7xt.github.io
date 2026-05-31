import useTheme from './hooks/useTheme';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [isDark, toggleTheme] = useTheme();

  return <HomeScreen isDark={isDark} onToggleTheme={toggleTheme} />;
}
