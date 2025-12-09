export default function Card({ title, image, price, onClick }) {
return (
<div className="border rounded-lg shadow-md hover:shadow-xl transition p-3 cursor-pointer" onClick={onClick}>
<img src={image} alt={title} className="w-full h-40 object-cover rounded" />
<h3 className="mt-2 text-lg font-semibold">{title}</h3>
{price && <p className="text-blue-600 font-bold text-md">${price}</p>}
</div>
);
}