export interface CategoryNode {
  id: string;
  title: string;
  count: number;
  items?: CategoryNode[];
}

export interface CategoryTree {
  top: CategoryNode;
  items?: CategoryNode[];
}
