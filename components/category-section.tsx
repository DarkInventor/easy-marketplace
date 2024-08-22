import React from 'react';
import { Card, CardContent } from './ui/card';

interface Category {
  name: string;
  icon: string;
}

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section
      className="w-full py-10 md:py-10 lg:py-10" id="categories-section"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-2xl text-center mb-10">
          Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">{category.icon}</span>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
