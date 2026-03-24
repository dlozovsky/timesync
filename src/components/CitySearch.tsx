import { useState, useRef, useEffect } from "react";
import { X, Search, MapPin } from "lucide-react";
import { CITIES, type City } from "@/data/cities";

interface CitySearchProps {
  selectedCities: City[];
  onCitiesChange: (cities: City[]) => void;
  maxCities?: number;
}

const POPULAR = ["New York", "London", "Tokyo", "Sydney", "Paris", "Dubai", "Singapore", "Los Angeles", "Berlin", "Mumbai"];

const CitySearch = ({ selectedCities, onCitiesChange, maxCities = 10 }: CitySearchProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const notSelected = (c: City) => !selectedCities.some(s => s.name === c.name && s.timezone === c.timezone);

  const results = query.length > 0
    ? CITIES.filter(c =>
        notSelected(c) &&
        (c.name.toLowerCase().includes(query.toLowerCase()) ||
         c.country.toLowerCase().includes(query.toLowerCase()) ||
         c.timezone.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 15)
    : isOpen
      ? CITIES.filter(c => notSelected(c) && POPULAR.includes(c.name))
      : [];

  const addCity = (city: City) => {
    if (selectedCities.length < maxCities) {
      onCitiesChange([...selectedCities, city]);
    }
    setQuery("");
    setIsOpen(false);
  };

  const removeCity = (index: number) => {
    onCitiesChange(selectedCities.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex flex-wrap gap-1.5 p-2.5 rounded-lg glass min-h-[48px] items-center">
        {selectedCities.map((city, i) => (
          <span
            key={`${city.name}-${i}`}
            className="inline-flex items-center gap-1 rounded-md bg-primary/15 text-primary px-2.5 py-1 text-sm"
          >
            <MapPin className="h-3 w-3" />
            {city.name}
            <button onClick={() => removeCity(i)} className="hover:text-destructive ml-0.5">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <div className="flex-1 min-w-[140px] flex items-center gap-1.5">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedCities.length === 0 ? "Search cities..." : "Add another city..."}
            className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg glass border border-border/50 shadow-xl z-50 max-h-64 overflow-y-auto">
          {query.length === 0 && (
            <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/60">
              Popular cities
            </div>
          )}
          {results.map((city) => (
            <button
              key={`${city.name}-${city.timezone}`}
              onClick={() => addCity(city)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-primary/10 transition-colors text-left"
            >
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="flex-1">{city.name}</span>
              <span className="text-xs text-muted-foreground">{city.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
