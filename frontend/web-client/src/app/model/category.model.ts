export interface ICategory {
  id: string;
  name: string;
  imageUrl?: string;
  parentId?: string | null;
  width?: number | null;
  height?: number | null;
  depth?: number | null;
  unit?: string | null;
}
