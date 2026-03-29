import ClientApp from "@/components/ClientApp";

async function getUser() {
  if (
    !process.env.WORKOS_API_KEY ||
    !process.env.WORKOS_CLIENT_ID ||
    !process.env.WORKOS_COOKIE_PASSWORD
  ) {
    return { id: "anonymous", name: "Student", email: "" };
  }

  try {
    const { withAuth } = await import("@workos-inc/authkit-nextjs");
    const { user } = await withAuth();
    if (!user) return null;
    return {
      id: user.id,
      name:
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.email,
      email: user.email,
    };
  } catch {
    return { id: "anonymous", name: "Student", email: "" };
  }
}

export default async function Home() {
  const workosUser = await getUser();

  if (!workosUser) {
    return null;
  }

  return <ClientApp workosUser={workosUser} />;
}
