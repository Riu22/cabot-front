import React, { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return setError("Selecciona un archivo PDF");
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            setResultado(data);
        } catch (err) {
            setError(err.message || "Error al procesar factura");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 text-left">
            <h1 className="text-4xl font-bold text-text-h mb-2 tracking-tight">Analizador de Facturas</h1>
            <p className="text-lg mb-8">Sube el PDF de Cabot para detectar errores en los descuentos.</p>

            <form onSubmit={handleUpload} className="flex items-center gap-4 p-6 bg-code-bg rounded-xl border border-border-main mb-10">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:opacity-90 cursor-pointer"
                />
                <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Analizando...' : 'Analizar Factura'}
                </button>
            </form>

            {error && (
                <div className="p-4 bg-accent-bg border border-accent-border text-accent rounded-lg mb-6 font-mono text-sm">
                    {error}
                </div>
            )}

            {resultado && (
                <div className={`p-8 rounded-2xl border-2 shadow-xl transition-all ${resultado.esCorrecto ? 'border-border-main bg-bg-main' : 'border-accent bg-accent-bg'}`}>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-xs uppercase tracking-widest font-bold opacity-50">Documento</span>
                            <h2 className="text-3xl font-bold text-text-h">Factura #{resultado.factura}</h2>
                        </div>
                        <div className={`px-4 py-1 rounded-full text-sm font-bold ${resultado.esCorrecto ? 'bg-green-100 text-green-700' : 'bg-accent text-white'}`}>
                            {resultado.esCorrecto ? 'VALIDADA' : 'ERROR DETECTADO'}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 py-6 border-y border-border-main border-opacity-50">
                        <div>
                            <p className="text-sm opacity-60 mb-1">Código del producto</p>
                            <code className="text-lg font-mono text-accent">{resultado.codigo}</code>
                        </div>
                        <div>
                            <p className="text-sm opacity-60 mb-1">Marca detectada</p>
                            <p className="text-lg font-semibold text-text-h">{resultado.marca || 'Sin marca'}</p>
                        </div>
                    </div>

                    <div className="flex gap-12 mt-8">
                        <div className="text-center">
                            <p className="text-xs opacity-60 mb-1 uppercase font-bold">Aplicado</p>
                            <p className="text-4xl font-bold text-text-h">{resultado.descuentoAplicado}%</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs opacity-60 mb-1 uppercase font-bold text-accent">Esperado</p>
                            <p className="text-4xl font-bold text-accent">{resultado.descuentoEsperado}%</p>
                        </div>
                    </div>

                    {!resultado.esCorrecto && (
                        <div className="mt-8 p-4 bg-white/50 rounded-lg italic text-text-h border border-accent-border">
                            "{resultado.mensaje}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;