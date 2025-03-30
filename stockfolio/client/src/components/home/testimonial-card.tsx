import { Star, StarHalf } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export default function TestimonialCard({ name, role, text, rating }: TestimonialCardProps) {
  // Create an array of stars based on the rating
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="fill-yellow-500 text-yellow-500" />);
  }
  
  if (hasHalfStar) {
    stars.push(<StarHalf key="half" className="fill-yellow-500 text-yellow-500" />);
  }
  
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="text-gray-300" />);
  }

  return (
    <div className="bg-background/80 rounded-xl p-6 shadow-md border border-border">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground font-semibold mr-4">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-foreground">{name}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
      <p className="text-muted-foreground italic mb-4">{text}</p>
      <div className="flex mt-4 text-yellow-500">
        {stars}
      </div>
    </div>
  );
}
