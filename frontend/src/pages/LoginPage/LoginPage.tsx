import { useState } from "react";
import { useLogin } from "@/features/auth/hooks/useLogin";


export const LoginPage = () => {

  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {

    loginMutation.mutate({
      email,
      password,
    });
  };

  return (

    <div>

      <input
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleSubmit}>
        Login
      </button>

    </div>
  );
};
