import type { Route } from "@playwright/test";

export const getTagsResolver = async (route: Route) => {
  const json = [
    {
      id: 1,
      name: "test public tag",
      owner: null,
    },
    {
      id: 2,
      name: "test private tag",
      owner: 1,
    },
  ];
  await route.fulfill({ json, status: 201 });
};
