import { ref } from "vue";
import PageModal from "@/components/page-modal";

type CallbackFn = () => void;

export function usePageModal(
  newCallback?: CallbackFn,
  editCallback?: CallbackFn
): any {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();

  const defaultInfo = ref({});

  const handleNewData = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    newCallback && newCallback();
  };

  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item };
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    editCallback && editCallback();
  };

  return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
