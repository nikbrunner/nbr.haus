type RoutePathName = "/" | "/404";

export interface Route {
  path: RoutePathName;
  name: string;
}

export const ROUTES: Route[] = [
  {
    path: "/",
    name: "Home"
  }
];
