import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFormations } from "../api/educationService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import ThemeToggle from "../components/ThemeToggle";
import SEO from "../components/SEO";

// Simplified Metadata for text badges only
const getFormationMeta = (name = "") => {
    const n = name.toLowerCase();
    // Using Solid Colors for Badges as requested (No opacity/alpha)
    if (n.includes("dev") || n.includes("full")) return { label: "Développement", color: "text-cyan-700 bg-cyan-100 dark:text-cyan-100 dark:bg-cyan-900" };
    if (n.includes("sys") || n.includes("infra")) return { label: "Infrastructure", color: "text-violet-700 bg-violet-100 dark:text-violet-100 dark:bg-violet-900" };
    if (n.includes("des") || n.includes("art")) return { label: "Design", color: "text-pink-700 bg-pink-100 dark:text-pink-100 dark:bg-pink-900" };
    return { label: "Spécialisation", color: "text-blue-700 bg-blue-100 dark:text-blue-100 dark:bg-blue-900" };
};

export default function FormationsPage() {
    const navigate = useNavigate();
    const { yearId } = useParams();
    const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getFormations(yearId);
                setFormations(data || []);
            } catch (err) {
                setError(err.message || "Échec du chargement des formations");
                setFormations([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFormations();
    }, [yearId]);

    return (
        <>
            <SEO
                title={`Formations - Année ${yearId}`}
                description="Sélectionnez votre spécialisation pour voir les modules et les ressources."
            />
            <ThemeToggle />

            <div className="page-container">
                {/* Header */}
                <div className="mb-12">
                    <button
                        onClick={() => navigate("/levels")}
                        className="mb-6 text-sm font-medium text-muted hover:text-primary flex items-center gap-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Retour aux Niveaux
                    </button>
                    <h1 className="heading-lg mb-4">Sélectionner une Filière</h1>
                    <p className="text-body max-w-2xl">
                        Choisissez votre spécialité pour accéder aux modules, résumés et examens spécifiques.
                    </p>
                </div>

                {/* Content */}
                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage message={error} onRetry={() => window.location.reload()} />
                ) : formations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {formations.map((formation) => {
                            const meta = getFormationMeta(formation.name);
                            return (
                                <div
                                    key={formation.id}
                                    onClick={() => navigate(`/modules/${formation.id}`, { state: { formation } })}
                                    className="card-interactive"
                                >
                                    {/* 1. Badge */}
                                    <div className="mb-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${meta.color}`}>
                                            {meta.label}
                                        </span>
                                    </div>

                                    {/* 2. Title */}
                                    <h3 className="heading-md mb-3 line-clamp-1" title={formation.name}>
                                        {formation.name || formation.code}
                                    </h3>

                                    {/* 3. Description (Static for now as API might not provide it, or fallback) */}
                                    <p className="text-muted mb-6 line-clamp-2">
                                        Accédez à des ressources complètes, y compris des notes de cours et des examens antérieurs pour cette filière.
                                    </p>

                                    {/* 4. Action Area */}
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:underline">
                                            Voir les Modules
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </span>

                                        {/* EFF Button - Hidden for 1st and 4th Year */}
                                        {yearId !== '1' && yearId !== '4' && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/eff/${formation.id}`, { state: { formation } });
                                                }}
                                                className="text-xs font-semibold px-3 py-1 bg-rose-100 text-rose-700 rounded-md hover:bg-rose-200 dark:bg-rose-900 dark:text-rose-100 dark:hover:bg-rose-800 transition-colors"
                                            >
                                                Examens EFF
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 rounded-lg border border-dashed border-slate-300 dark:border-slate-800">
                        <p className="text-muted">Aucune formation trouvée pour cette année.</p>
                    </div>
                )}
            </div>
        </>
    );
}
