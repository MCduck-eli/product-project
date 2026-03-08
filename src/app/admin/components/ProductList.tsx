import { Edit2, Trash2, PackageSearch } from "lucide-react";

interface Props {
    products: any[];
    onDelete: (id: string) => void;
    onEdit: (product: any) => void;
}

export default function ProductList({ products, onDelete, onEdit }: Props) {
    if (!products || products.length === 0) {
        return (
            <div className="bg-white border border-gray-200 rounded-[32px] p-20 flex flex-col items-center justify-center text-gray-400">
                <PackageSearch size={48} strokeWidth={1} className="mb-4" />
                <p className="text-sm font-medium">
                    Hozircha mahsulotlar mavjud emas.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-[32px] overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                        <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                            Mahsulot
                        </th>
                        <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                            Narxi
                        </th>
                        <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">
                            Amallar
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {products.map((p) => (
                        <tr
                            key={p.id}
                            className="group hover:bg-gray-50/80 transition-all"
                        >
                            <td className="p-6 flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    ) : (
                                        <span className="w-full h-full flex items-center justify-center text-2xl">
                                            {p.emoji || "📦"}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">
                                        {p.name}
                                    </p>
                                    <p className="text-[11px] text-gray-400 line-clamp-1">
                                        {p.sub}
                                    </p>
                                </div>
                            </td>
                            <td className="p-6 font-extrabold text-lg">
                                {p.price}
                            </td>
                            <td className="p-6 text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(p)}
                                        className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(p.id)}
                                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
