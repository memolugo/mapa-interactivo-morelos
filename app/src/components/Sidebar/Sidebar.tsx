import { useState } from 'react';
import type { Location } from '@/types';
import { categories } from '@/data/locations';
import { SidebarHeader } from './SidebarHeader';
import { CategoryItem } from './CategoryItem';
import { SidebarFooter } from './SidebarFooter';
import { LocationDetail } from '../Map/LocationDetail';

interface SidebarProps {
  locations: Location[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  selectedLocation: Location | null;
  onSelectLocation: (location: Location) => void;
  onCloseLocationDetail: () => void;
}

export function Sidebar({ locations, selectedCategory, onSelectCategory, selectedLocation, onSelectLocation, onCloseLocationDetail }: SidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
    onSelectCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || '#2E3B2B';
  };

  if (selectedLocation) {
    return (
      <aside className="w-full lg:w-[350px] bg-sidebar rounded-3xl flex flex-col overflow-hidden shadow-card h-full">
        <LocationDetail
          location={selectedLocation}
          categoryColor={getCategoryColor(selectedLocation.categoryId)}
          onClose={onCloseLocationDetail}
        />
      </aside>
    );
  }

  return (
    <aside className="w-full lg:w-[350px] bg-sidebar rounded-3xl flex flex-col overflow-hidden shadow-card h-full">
      <SidebarHeader />

      <nav className="flex-1 overflow-y-auto py-4 px-4">
        <div className="space-y-1">
          {categories.map((category) => {
            const categoryLocations = locations.filter((loc: Location) => loc.categoryId === category.id);
            const categoryWithCount = {
              ...category,
              count: categoryLocations.length
            };

            return (
              <CategoryItem
                key={category.id}
                category={categoryWithCount}
                locations={categoryLocations}
                isSelected={selectedCategory === category.id}
                isExpanded={expandedCategory === category.id}
                onClick={() => handleCategoryClick(category.id)}
                onSelectLocation={onSelectLocation}
              />
            );
          })}
        </div>
      </nav>

      <SidebarFooter />
    </aside>
  );
}
