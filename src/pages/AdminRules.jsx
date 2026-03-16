import React, { useState, useEffect } from 'react';

const AdminRules = () => {
    const [reglas, setReglas] = useState([]);
    const [nueva, setNueva] = useState({ prefijo: '', marca: '', descuento_esperado: '', descripcion: '' });

    useEffect(() => { fetchReglas(); }, []);

    const fetchReglas = () => {
        fetch('http://localhost:8080/admin/reglas')
            .then(res => res.json())
            .then(setReglas);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8080/admin/reglas/guardar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nueva)
        });
        setNueva({ prefijo: '', marca: '', descuento_esperado: '', descripcion: '' });
        fetchReglas();
    };

    return (
        <div className="p-10 text-left">
            <h1 className="text-4xl font-bold text-text-h mb-8 tracking-tight">Reglas de Descuento</h1>

            {/* Formulario de Inserción */}
            <form onSubmit={handleSave} className="grid grid-cols-5 gap-3 mb-12 p-6 bg-code-bg rounded-xl border border-border-main items-end">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase opacity-50">Prefijo</label>
                    <input type="text" maxLength="3" className="input-base" value={nueva.prefijo}
                        onChange={e => setNueva({ ...nueva, prefijo: e.target.value.toUpperCase() })} placeholder="PPX" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase opacity-50">Marca</label>
                    <input type="text" className="input-base" value={nueva.marca}
                        onChange={e => setNueva({ ...nueva, marca: e.target.value.toUpperCase() })} placeholder="Opcional" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase opacity-50">Descuento (%)</label>
                    <input type="number" step="0.01" className="input-base" value={nueva.descuento_esperado}
                        onChange={e => setNueva({ ...nueva, descuento_esperado: e.target.value })} placeholder="40.00" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase opacity-50">Descripción</label>
                    <input type="text" className="input-base" value={nueva.descripcion}
                        onChange={e => setNueva({ ...nueva, descripcion: e.target.value })} placeholder="Notas..." />
                </div>
                <button type="submit" className="btn-primary h-[42px]">Añadir Regla</button>
            </form>

            {/* Tabla de Reglas */}
            <div className="overflow-hidden rounded-xl border border-border-main shadow-sm">
                <table className="w-full border-collapse bg-white">
                    <thead>
                        <tr className="bg-code-bg text-text-h border-b border-border-main text-left">
                            <th className="px-6 py-4 font-bold text-sm uppercase">Prefijo</th>
                            <th className="px-6 py-4 font-bold text-sm uppercase">Marca</th>
                            <th className="px-6 py-4 font-bold text-sm uppercase">Dto. Esperado</th>
                            <th className="px-6 py-4 font-bold text-sm uppercase">Descripción</th>
                            <th className="px-6 py-4 font-bold text-sm uppercase text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-main">
                        {reglas.map(r => (
                            <tr key={r.id} className="hover:bg-accent-bg transition-colors">
                                <td className="px-6 py-4 font-mono text-accent font-bold">{r.prefijo}</td>
                                <td className="px-6 py-4 text-text-h">{r.marca || <span className="opacity-30 italic">Regla General</span>}</td>
                                <td className="px-6 py-4 font-bold text-text-h">{r.descuento_esperado}%</td>
                                <td className="px-6 py-4 text-sm">{r.descripcion}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-accent font-bold text-sm hover:underline">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminRules;