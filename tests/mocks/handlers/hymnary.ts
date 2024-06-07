import type { Route } from "@playwright/test";

export const createHymnaryResolver = async (route: Route) => {
  const json = {
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
    tags: [],
  };
  await route.fulfill({ json, status: 201 });
};

export const getExistingHymnaryResolver = async (route: Route) => {
  const json = {
    "count": 1,
    "results": [
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
        tags: [],
      },
    ]
  };
  await route.fulfill({ json });
};

export const detailHymnaryResolver = async (route: Route) => {
  const json = {
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
    tags: [],
  };
  await route.fulfill({ json, status: 200 });
};

export const getEmptyListHymnaryResolver = async (route: Route) => {
  const json: any[] = [];
  await route.fulfill({ json });
};

export const deleteHymnaryResolver = async (route: Route) => {
  await route.fulfill({ status: 204 });
}

export const getExistingHymnaryTitlesResolver = async (route: Route) => {
  const json = ["existing test hymnary",];
  await route.fulfill({ json });
}