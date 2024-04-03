export interface OrganizationTreeItem {
  displayName: string;
  name: string;
  id: number;
}

export interface OrganizationTree {
  items: OrganizationTreeItem[]
}


export interface Item {
  value: string;
  displayText: string;
  isSelected: boolean
}


export interface PostOrganizationTree {
  id: number;
  name: string;
  icon: string;
  isEnabled: boolean;
}
