'use client';

import { Card } from "@/components/ui/card";

export function Map({ selectedDelivery }: { selectedDelivery: any }) {
  return (
    <Card className="p-4 h-[500px] bg-gray-100">
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">
          {selectedDelivery 
            ? `Mapa para entrega em ${selectedDelivery.address}`
            : 'Selecione uma entrega para ver o mapa'}
        </p>
      </div>
    </Card>
  );
}