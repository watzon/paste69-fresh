import { ComponentChildren, createContext } from "preact";
import state, { type AppStateType } from "../utils/state.ts";

export interface AppProps {
  children: ComponentChildren;
}

export const AppState = createContext<AppStateType>({} as AppStateType);

export default function App({ children }: AppProps) {
  return (
    <AppState.Provider value={state}>
      {children}
    </AppState.Provider>
  );
}
