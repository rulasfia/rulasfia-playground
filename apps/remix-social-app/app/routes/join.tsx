import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import * as React from "react";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { styled, theme } from "~/styles/stitches.config";
import Box from "~/components/atoms/layouts/Box";
import Button from "~/components/atoms/Button";
import LinkTo from "~/components/atoms/LinkTo";
import FormControl from "~/components/atoms/forms/FormControl";
import Label from "~/components/atoms/forms/Label";
import Input from "~/components/atoms/forms/Input";

import { getUserId, createUserSession } from "~/session.server";

import { createUser, getUserByEmail } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

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

interface ActionData {
  errors: {
    email?: string;
    password?: string;
  };
}

/** forms action function */
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  /** validate email format */
  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  }

  /** validate password format */
  if (typeof password !== "string" || password.length === 0) {
    return json<ActionData>(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  }

  /** validate email length */
  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  /** check existing user */
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json<ActionData>(
      { errors: { email: "A user already exists with this email" } },
      { status: 400 }
    );
  }

  /** create new user */
  const user = await createUser(email, password);

  /** create user session */
  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
};

/** meta function for page metadata */
export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
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
        <Title>Create your free account</Title>
        <Form method="post">
          <FormControl>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </Label>
            <Box>
              <Input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.email && (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </Box>
          </FormControl>

          <FormControl>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Box>
              <Input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </Box>
          </FormControl>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <Button type="submit" css={{ width: "100%", marginBottom: "1rem" }}>
            Create Account
          </Button>
          <div className="flex items-center justify-center">
            <Box
              css={{ textAlign: "center", fontSize: "$sm", color: "$gray10" }}
            >
              Already have an account?{" "}
              <LinkTo
                css={{ color: "$violet10", textDecoration: "underline" }}
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </LinkTo>
            </Box>
          </div>
        </Form>
      </Box>
    </Container>
  );
}
