"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { updateOrder, addPendingAction } from "@/lib/db";
import type { Order } from "@/lib/types/order";
import type { DeliveryLocation } from "@/lib/types/delivery";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

interface OrderListProps {
  deliveries: Order[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  onAccept?: (location: DeliveryLocation) => void;
  onReject?: (orderId: string) => void;
}

export function OrderList({ deliveries, loading, error, refetch, onAccept, onReject }: OrderListProps) {
  const isOnline = useNetworkStatus();

  const handleAcceptOrder = async (orderId: string) => {
      try {
        if (!isOnline) {
          console.log("is OFFLINE. Adding pending action for order acceptance");
          await addPendingAction({
            type: "UPDATE_ORDER",
            payload: { orderId, status: "accepted" },
            timestamp: Date.now(),
          });
        }
        await updateOrder(orderId, { status: "accepted" });

        const accepted = deliveries.find((d) => d.id === orderId);

        if (accepted && onAccept) {
          if (accepted.lat && accepted.lng) {
            const deliveryLocation: DeliveryLocation = {
              id: accepted.id,
              address: accepted.address,
              lat: accepted.lat,
              lng: accepted.lng,
            };
            onAccept(deliveryLocation);
          } else {
            console.warn(`Order ${accepted.id} has no coordinates.`);
            const fallbackLocation: DeliveryLocation = {
              id: accepted.id,
              address: accepted.address,
              lat: 0,
              lng: 0,
            };
            onAccept(fallbackLocation);
          }
        }
        await refetch();
      } catch (err) {
        console.error("Failed to accept order:", err);
      }
    };

    const handleRejectOrder = async (orderId: string) => {
      try {
        if (!isOnline) {
          console.log("is OFFLINE. Adding pending action for order rejection");
          await addPendingAction({
            type: "UPDATE_ORDER",
            payload: { orderId, status: "rejected" },
            timestamp: Date.now(),
          });
        }

        await updateOrder(orderId, { status: "rejected" });

        if (onReject) {
          onReject(orderId);
        }

        await refetch();
      } catch (err) {
        console.error("Failed to reject order:", err);
      }
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 text-red-500 text-center">
          Error loading orders: {error}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {deliveries.map((order: Order) => (
          <Card key={order.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{order.customer}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {order.address}
                </p>
                <div className="mt-2">
                  <p className="text-sm font-medium">Itens:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300">
                    {order.items.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                {/* Status do pedido */}
                <div className="mt-2">
                  <span
                    className={
                      order.status === "pending"
                        ? "text-yellow-600"
                        : order.status === "accepted"
                          ? "text-green-600"
                          : order.status === "completed"
                            ? "text-blue-600"
                            : "text-red-600"
                    }
                  >
                    Status:{" "}
                    {order.status === "pending"
                      ? "Pendente"
                      : order.status === "accepted"
                        ? "Aceito"
                        : order.status === "completed"
                          ? "Concluído"
                          : "Recusado"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleAcceptOrder(order.id)}
                >
                  Aceitar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="w-full"
                  onClick={() => handleRejectOrder(order.id)}
                >
                  Recusar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
}
