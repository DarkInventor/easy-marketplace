import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface Deal {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  tag: string;
}

interface DealsSectionProps {
  deals: Deal[];
  addToCart: (deal: Deal) => void;
}

const DealsSection: React.FC<DealsSectionProps> = ({ deals, addToCart }) => {
  return (
    <section className="w-full mt-10" id="deals">
      <div className="container px-4 md:px-6 ">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-2xl text-center">
          Hot Deals
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {deals.map((deal) => (
            <div key={deal.id}>
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-48 object-cover mb-4 rounded-md"
                    />
                    <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                      {deal.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{deal.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground line-through">
                      ${deal.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-lg font-bold text-primary">
                      ${deal.price.toFixed(2)}
                    </span>
                  </div>
                  <Button onClick={() => addToCart(deal)} className="w-full">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
