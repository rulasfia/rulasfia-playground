import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import * as React from "react";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { CheckIcon } from "@radix-ui/react-icons";
import { styled, theme } from "~/styles/stitches.config";
import Box from "~/components/atoms/layouts/Box";
import Button from "~/components/atoms/Button";
import LinkTo from "~/components/atoms/LinkTo";
import FormControl from "~/components/atoms/forms/FormControl";
import Label from "~/components/atoms/forms/Label";
import InputText from "~/components/atoms/forms/InputText";
import InputMessage from "~/components/atoms/forms/InputMessage";
import {
  Checkbox,
  CheckboxIndicator,
} from "~/components/atoms/forms/InputCheckbox";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";

const Container = styled("main", {
  position: "relative",
  minHeight: "calc(100vh - 75px)",
  background: theme.colors.white,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Title = styled("h3", {
  fontSize: "1.25rem",
  fontWeight: "600",
  marginBottom: "1rem",
  color: theme.colors.violet10,
});

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/notes");
  const remember = formData.get("remember");

  console.log({ email, password, remember });
  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json<ActionData>(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/notes";
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Container>
      <Box css={{ mx: "auto", maxWidth: "450px", minWidth: "320px" }}>
        <Title>Login to your existing account</Title>
        <Form method="post">
          <FormControl>
            <Label htmlFor="email">Email address</Label>
            <Box>
              <InputText
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
              />
              {actionData?.errors?.email && (
                <InputMessage id="email-error">
                  {actionData.errors.email}
                </InputMessage>
              )}
            </Box>
          </FormControl>

          <FormControl>
            <Label htmlFor="password">Password</Label>
            <Box>
              <InputText
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
              />
              {actionData?.errors?.password && (
                <InputMessage id="password-error">
                  {actionData.errors.password}
                </InputMessage>
              )}
            </Box>
          </FormControl>

          <FormControl>
            <Box
              type="hstack"
              css={{ gap: "0.75rem", justifyContent: "start" }}
            >
              <Checkbox name="remember" id="remember">
                <CheckboxIndicator>
                  <CheckIcon />
                </CheckboxIndicator>
              </Checkbox>
              <Label htmlFor="remember">Remember me</Label>
            </Box>
          </FormControl>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <Button type="submit" css={{ width: "100%", marginBottom: "1rem" }}>
            Log in
          </Button>

          <Box type="vstack" css={{ gap: "0.5rem", alignItems: "start" }}>
            <Box
              css={{ textAlign: "center", fontSize: "$sm", color: "$gray10" }}
            >
              Don't have an account?{" "}
              <LinkTo
                css={{ color: "$violet10", textDecoration: "underline" }}
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </LinkTo>
            </Box>
          </Box>
        </Form>
      </Box>
    </Container>
  );
}
