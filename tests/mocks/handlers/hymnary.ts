import type { Route } from "@playwright/test";

export const hymnaryResolver = async (route: Route) => {
  const req = route.request();

  let json;

  switch (req.method()) {
    case "POST":
      json = {
        id: 1,
        songs: [],
        title: "test hymnary",
        created_at: "2024-04-24T22:13:00.888727-03:00",
        updated_at: "2024-04-24T22:13:00.888773-03:00",
        updated: true,
        print_category: true,
        template: "single-column",
        file: null,
        owner: 1,
      };
      break;
    case "GET":
      json = [
        {
          id: 1,
          songs: [],
          title: "existing test hymnary",
          created_at: "2024-04-24T22:13:00.888727-03:00",
          updated_at: "2024-04-24T22:13:00.888773-03:00",
          updated: true,
          print_category: true,
          template: "single-column",
          file: null,
          owner: 1,
        },
      ];
      break;
    default:
      json = {};
      break;
  }
  await route.fulfill({ json });
};
