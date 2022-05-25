import { Card } from "components/Card";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <br />
      <Card>
        <h3>We are under attack!</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, id modi
          saepe facilis quia quas deserunt! Illo provident ad incidunt enim
          reiciendis, tempore quam sit nisi totam aspernatur. Corrupti,
          asperiores!
        </p>
      </Card>
    </div>
  );
}
