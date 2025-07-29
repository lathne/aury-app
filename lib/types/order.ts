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
  type: "CREATE_ORDER" | "UPDATE_ORDER" | "DELETE_ORDER" | "GEOCODE_ORDER";
  payload: any;
  timestamp: number;
}

