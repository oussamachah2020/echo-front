const base_url = "http://localhost:8080/api/v1";

export async function Login(credentials: {
  username: string;
  password: string;
}) {
  try {
    const response = await fetch(`${base_url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });

    if (response.ok) {
      const token: string = await response.text();
      return token;
    }
  } catch (error) {
    console.error(error);
  }
}
