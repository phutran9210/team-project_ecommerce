//prop trong UploadFormComponent
export interface ProductFormItemProps {
  sendDataToParent: (data: any) => void;
  category?: string | null;
  onCategoryChange?: (category: string) => void;
}
