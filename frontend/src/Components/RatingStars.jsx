
export default function RatingStars({ value = 0, onChange }) {
  return (
    <div className="rating">
      {[1,2,3,4,5].map(n => (
        <input
          key={n}
          type="radio"
          name={`rating-${Math.random()}`} 
          className="mask mask-star-2 bg-orange-400"
          checked={value === n}
          onChange={()=>onChange?.(n)}
          aria-label={`${n} stars`}
        />
      ))}
    </div>
  );
}
