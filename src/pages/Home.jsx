
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { PomodoroTimer } from "./PomodoroTimer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div>	
			<PomodoroTimer/>
		</div>
	);
}; 