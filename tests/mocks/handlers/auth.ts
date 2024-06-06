import type { Route } from "@playwright/test";

export const loginResolver = async (route: Route) => {
  const json = {
    access: "testaccesstoken",
    refresh: "testrefreshtoken",
  };
  await route.fulfill({ json });
};

export const registerResolver = async (route: Route) => {
  const json = {
    username: "usertest",
    first_name: "User",
    last_name: "Test",
    email: "usertest@email.com",
  };
  await route.fulfill({ json });
};

export const currentUserResolver = async (route: Route) => {
  const json = {
    username: "usertest",
    first_name: "User",
    last_name: "Test",
    email: "testuser@email.com",
    full_name: "User Test",
  };
  await route.fulfill({ json });
}
