import { IBreadcrumb } from "@/base-ui/breadcrumb";
import { RouteRecordRaw } from "vue-router";

let firstMenu: any = null;

export function mapMenuToRoute(userMenu: any): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  const allRoutes: RouteRecordRaw[] = [];
  const routeFile = require.context("../router/main", true, /\.ts/);

  routeFile.keys().forEach((item) => {
    const route = require("../router/main" + item.split(".")[1]);
    allRoutes.push(route.default);
  });

  const _recurseMenuToRoute = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recurseMenuToRoute(menu.children);
      }
    }
  };

  _recurseMenuToRoute(userMenu);

  return routes;
}

// export function pathMapToBreadcrumb(userMenu: any[], currentPath: string): any {
//   const breadcrumbList: IBreadcrumb[] = [];

//   for (const menu of userMenu) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToBreadcrumb(menu.children, currentPath);
//       if (findMenu) {
//         breadcrumbList.push({ name: menu.name });
//         breadcrumbList.push({ name: findMenu.name, path: findMenu.path });
//         return findMenu;
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu;
//     }
//   }
// }

export function pathMapToBreadcrumb(userMenu: any[], currentPath: string): any {
  const breadcrumbList: IBreadcrumb[] = [];

  pathMapToMenu(userMenu, currentPath, breadcrumbList);

  return breadcrumbList;
}

export function pathMapToMenu(
  userMenu: any[],
  currentPath: string,
  breadcrumbList?: IBreadcrumb[]
): any {
  for (const menu of userMenu) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbList?.push({ name: menu.name });
        breadcrumbList?.push({ name: findMenu.name, path: findMenu.url });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export function mapMenuToPermissions(userMenu: any[]) {
  const permissions: string[] = [];

  const _recurseGetPermission = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };

  _recurseGetPermission(userMenu);

  return permissions;
}

export { firstMenu };
