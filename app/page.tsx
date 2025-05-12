import {redirect} from "next/navigation";

export default function Home() {

  redirect("/dashboard")

  return (
      <h1>ntoes</h1>
  );
}
