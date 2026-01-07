import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div>
      <Toaster richColors closeButton position="top-right" />
      <AppRoutes />
    </div>
  );
}

export default App;
