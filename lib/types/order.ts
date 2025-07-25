export interface Order {
  id: string;
  address: string;
  status: "pending" | "accepted" | "completed" | "rejected";
  customer: string;
  items: string[];
  timestamp?: number;
  lat?: number;
  lng?: number;
}

export interface PendingAction {
  id?: number;
  type: "create" | "update" | "delete";
  order: Order;
  updates?: Partial<Order>;
  timestamp: number;
}

