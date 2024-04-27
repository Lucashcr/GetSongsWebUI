import type { Route } from "@playwright/test";

export const categoryResolver = async (route: Route) => {
  const json = [
    {
      id: 1,
      name: "Category 1",
      slug: "category-1",
    }
  ];
  await route.fulfill({ json });
};