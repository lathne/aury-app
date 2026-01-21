"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch } from "@/lib/hooks";
import { addOrder } from "@/lib/features/ordersSlice";
import { saveOrder, addPendingAction } from "@/lib/db";
import type { Order } from "@/lib/types/order";
import { geocodeAddress } from "@/lib/geocoding";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

const orderSchema = z.object({
  customer: z
    .string()
    .min(3, "Nome do cliente deve ter no mínimo 3 caracteres"),
  address: z.string().min(10, "Endereço deve ter no mínimo 10 caracteres"),
  items: z.string().min(3, "Adicione pelo menos um item ao pedido"),
});

type OrderFormValues = z.infer<typeof orderSchema>;

export function CreateOrderForm({ onClose, onOrderCreated }: { onClose: () => void, onOrderCreated?: () => void }) {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isOnline = useNetworkStatus();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer: "",
      address: "",
      items: "",
    },
  });

  const onSubmit = async (data: OrderFormValues) => {
    try {
      setIsSubmitting(true);
      const newOrderId = Date.now().toString();
      const coords = isOnline ? await geocodeAddress(data.address) : null;

      const newOrder: Order = {
        id: newOrderId,
        customer: data.customer,
        address: data.address,
        items: data.items.split("\n").filter((item) => item.trim() !== ""),
        status: "pending",
        timestamp: Date.now(),
        lat: coords?.lat,
        lng: coords?.lng,
      };

      await saveOrder(newOrder);
      
      if (!isOnline) {
        await addPendingAction({
          type: "CREATE_ORDER",
          payload: newOrder,
          timestamp: Date.now(),
        });
        // Ação para geocodificar mais tarde
        await addPendingAction({
          type: "GEOCODE_ORDER",
          payload: { orderId: newOrderId, address: newOrder.address },
          timestamp: Date.now(),
        });
      } else if (!coords) {
        await addPendingAction({
          type: "GEOCODE_ORDER",
          payload: { orderId: newOrderId, address: newOrder.address },
          timestamp: Date.now(),
        });
      }
     
      dispatch(addOrder(newOrder));
      onClose();
     
      if (onOrderCreated) {
        await onOrderCreated();
      }

    } catch (error) {
      console.error("Failed to create order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Cliente</FormLabel>
              <FormControl>
                <Input placeholder="João Silva" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço de Entrega</FormLabel>
              <FormControl>
                <Input placeholder="Rua Example, 123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Itens do Pedido</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="1x Pizza Margherita&#10;2x Refrigerante"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Criando..." : "Criar Pedido"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
