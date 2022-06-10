import "./App.css";

import { useRive } from "@rive-app/react-canvas";

function App() {
  const { rive, RiveComponent } = useRive({
    src: "https://cdn.rive.app/animations/vehicles.riv",
    autoplay: true,
  });

  return (
    <main className="p-4 m-8 rounded-lg border-2 border-gray-600">
      <RiveComponent className="rounded-md w-fit" width={800} height={400} />
    </main>
  );
}

export default App;
