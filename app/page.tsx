import { redirect } from "next/navigation";

// initial entrypoint should send users to the login page
export default function Home() {
  redirect("/login");
  return null;
}
