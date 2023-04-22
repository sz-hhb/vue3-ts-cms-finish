import PageContent from "@/components/page-content";
import { ref } from "vue";

export function usePageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();

  const handleResetClick = () => {
    pageContentRef.value?.getPageList();
  };

  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageList(queryInfo);
  };

  return [pageContentRef, handleResetClick, handleQueryClick];
}
