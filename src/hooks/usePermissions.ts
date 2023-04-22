import { useStore } from "@/store";

export function usePermissions(pageName: string, actionName: string): boolean {
  const store = useStore();
  const permissions = (store.state as any).login.permissions;
  const verifyPermission = `system:${pageName}:${actionName}`;

  return !!permissions.find(
    (permission: any) => permission === verifyPermission
  );
}
